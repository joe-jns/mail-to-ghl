#!/usr/bin/env node
// mail-to-ghl : description simple d'un email (JSON) → editorData complet de l'éditeur d'email GHL
// + script Playwright qui l'injecte dans un modèle, l'enregistre et vérifie le HTML compilé par GHL.
//
//   node mail-to-ghl.mjs <email.json> [--sortie <script.js>] [--ecraser]
//
// Écrit : <dossier de email.json>/<nom>.editorData.json  (ce qui sera injecté)
//         <script.js> (par défaut ./mail-to-ghl-<nom>.js dans le dossier courant, à lancer avec
//         browser_run_code_unsafe(filename=…) — le fichier doit être dans un dossier autorisé par Playwright)
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ICI = path.dirname(fileURLToPath(import.meta.url));
const CAT = JSON.parse(fs.readFileSync(path.join(ICI, 'reference', 'catalogue-blocs.json'), 'utf8'));

const args = process.argv.slice(2);
const specPath = args.find(a => !a.startsWith('--'));
if (!specPath) { console.error('usage : node mail-to-ghl.mjs <email.json> [--sortie <script.js>] [--ecraser]'); process.exit(1); }
const iSortie = args.indexOf('--sortie');
const spec = JSON.parse(fs.readFileSync(specPath, 'utf8'));
const nom = spec.nom || path.basename(specPath, '.json');
const sortie = path.resolve(iSortie >= 0 ? args[iSortie + 1] : `mail-to-ghl-${nom}.js`);
const ecraser = args.includes('--ecraser') || spec.ecraser === true;
for (const k of ['locationId', 'templateId']) if (!spec[k]) { console.error(`clé « ${k} » manquante dans ${specPath}`); process.exit(1); }

const ALIAS = { text: 'mj-text', texte: 'mj-text', image: 'mj-image', button: 'mj-button', bouton: 'mj-button', logo: 'mj-logo',
  divider: 'mj-divider', separateur: 'mj-divider', spacer: 'mj-spacer', espace: 'mj-spacer', social: 'mj-social',
  footer: 'mj-footer', pied: 'mj-footer', code: 'mj-raw', raw: 'mj-raw', html: 'mj-raw', video: 'mj-video',
  faq: 'mj-accordion', accordion: 'mj-accordion', carrousel: 'mj-carousel', carousel: 'mj-carousel',
  compte: 'mj-countdown-timer', countdown: 'mj-countdown-timer', avis: 'mj-review-link', 'preview-url': 'mj-preview-url' };
const tag = t => ALIAS[t] || (t.startsWith('mj-') ? t : `mj-${t}`);

// ids : <tag>-mg + 6 caractères ("mg" = posé par mail-to-ghl, sert au garde-fou).
// Stables d'une génération à l'autre (nom de l'email + rang du bloc), pour qu'une réinjection reconnaisse les siens.
const CH = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
const pris = new Set();
let rang = 0;
const hache = s => { let h = 2166136261; for (const c of s) { h ^= c.charCodeAt(0); h = Math.imul(h, 16777619) >>> 0; } return h; };
const nouvelId = t => { let id, k = 0; do { let h = hache(`${nom}:${rang}:${k++}`), s = ''; for (let i = 0; i < 6; i++) { s += CH[h % 62]; h = Math.floor(h / 62) || hache(s + rang); } id = `${t}-mg${s}`; } while (pris.has(id)); pris.add(id); rang++; return id; };
const clone = o => JSON.parse(JSON.stringify(o));

const UNITE_PX = /(padding|margin|width|height|font-size|radius|border-width|icon-size|letter-spacing)/;
// valeur → {default, unit} ; "20px" / "50%" / 20 (unité du catalogue ou px) / true / "texte"
function valeur(nomAttr, v, base) {
  if (typeof v === 'string') {
    const m = v.match(/^(-?\d+(?:\.\d+)?)(px|%)$/);
    if (m) return { default: Number(m[1]), unit: m[2] };
    return { default: v, ...(base?.unit && v === '' ? { unit: base.unit } : {}) };
  }
  if (typeof v === 'number') {
    const unit = base?.unit ?? (UNITE_PX.test(nomAttr) && nomAttr !== 'line-height' ? 'px' : undefined);
    return unit ? { default: v, unit } : { default: v };
  }
  return { default: v };
}
function poser(attributes, nomAttr, v) {
  const i = attributes.findIndex(a => a.name === nomAttr);
  const val = valeur(nomAttr, v, i >= 0 ? attributes[i] : null);
  const a = { name: nomAttr, ...val };
  if (i >= 0) attributes[i] = a; else attributes.push(a);
}

const attrs = {};
const textes = []; // morceaux de texte à retrouver dans le HTML compilé

function appliquer(id, b) {
  const a = attrs[id];
  for (const [k, v] of Object.entries(b.attrs || {})) poser(a.attributes, k, v);
  for (const [k, v] of Object.entries(b.mobile || {})) poser(a.attributes, `mobile-${k}`, v);
  if (b.masquer === 'mobile') poser(a.attributes, 'hide-on-mobile', true);
  if (b.masquer === 'ordinateur' || b.masquer === 'desktop') poser(a.attributes, 'hide-on-desktop', true);
  if (b.condition) {
    poser(a.attributes, 'is-conditional', true);
    const c = b.condition;
    poser(a.attributes, 'condition', JSON.stringify({ customValue: c.champ, operator: c.op || '~=', value: c.valeur ?? '', dataType: c.type || 'TEXT' }));
  }
  if (b.contenu !== undefined) {
    a.content = b.contenu;
    // valeurs de secours des champs ({{contact.first_name}} vide → « à vous ») : attribut data-cv-defaults
    // sur la première balise du texte, clés « champ:rang » (rang = n-ième apparition du champ, à partir de 0)
    if (b.defauts && Object.keys(b.defauts).length) {
      const d = Object.fromEntries(Object.entries(b.defauts).map(([k, v]) => [k.replace(/^\{\{|\}\}$/g, '').includes(':') ? k.replace(/^\{\{|\}\}$/g, '') : `${k.replace(/^\{\{|\}\}$/g, '')}:0`, v]));
      const j = JSON.stringify(d).replace(/&/g, '&amp;').replace(/'/g, '&#39;');
      if (/^\s*<[a-z0-9]+/i.test(a.content)) a.content = a.content.replace(/^(\s*<[a-z0-9]+)/i, `$1 data-cv-defaults='${j}'`);
      else throw new Error('« defauts » demande un contenu qui commence par une balise (<p>, <h1>…)');
    }
    const brut = String(b.contenu).replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();
    if (brut) textes.push(brut.slice(0, 40));
  }
}

// bloc simple : catalogue.blocks[tag] ; bloc composé : catalogue.composites[tag] (sous-arbre cloné)
function bloc(b) {
  const t = tag(b.type);
  const comp = CAT.composites?.[t];
  if (comp) {
    const map = {};
    const refaire = n => { const id = nouvelId(n.tagName); map[n.id] = id; attrs[id] = clone(comp.attrs[n.id]); return { id, tagName: n.tagName, ...(n.children ? { children: n.children.map(refaire) } : {}) }; };
    const el = refaire(comp.element);
    applyEnfants(el, b.enfants);
    appliquer(el.id, b);
    return el;
  }
  const base = CAT.blocks[t];
  if (!base) throw new Error(`bloc inconnu : ${b.type} (${t}) — voir reference/catalogue-blocs.json`);
  const id = nouvelId(t);
  attrs[id] = clone(base);
  appliquer(id, b);
  return { id, tagName: t };
}
// enfants d'un bloc composé : liste dans l'ordre ; si plus d'enfants que le modèle, on duplique le dernier du même type
function applyEnfants(el, enfants) {
  if (!enfants || !el.children) return;
  const proto = el.children;
  const out = [];
  enfants.forEach((e, i) => {
    let src = proto[i] && (!e.type || proto[i].tagName === tag(e.type)) ? proto[i] : [...proto].reverse().find(p => !e.type || p.tagName === tag(e.type));
    if (!src) throw new Error(`enfant ${i} de ${el.tagName} : pas de modèle`);
    const dup = n => { const id = nouvelId(n.tagName); attrs[id] = clone(attrs[n.id]); return { id, tagName: n.tagName, ...(n.children ? { children: n.children.map(dup) } : {}) }; };
    const c = out.some(o => o.id === src.id) || !proto.includes(src) ? dup(src) : src;
    if (e.enfants) applyEnfants(c, e.enfants);
    appliquer(c.id, e);
    out.push(c);
  });
  for (const p of proto) if (!out.includes(p)) { const del = n => { delete attrs[n.id]; (n.children || []).forEach(del); }; del(p); }
  el.children = out;
}

const LAYOUTS = { '100': 1, '50,50': 2, '33.33,33.33,33.33': 3, '40,60': 4, '60,40': 5, '25,25,25,25': 6, '25,75': 7, '75,25': 8 };
const elements = (spec.sections || []).map((s, si) => {
  const sid = nouvelId('mj-section');
  attrs[sid] = clone(CAT.blocks['mj-section']);
  const cols = s.colonnes || [{ largeur: 100, blocs: s.blocs || [] }];
  const larg = cols.map(c => c.largeur ?? +(100 / cols.length).toFixed(2));
  attrs[sid].customFlags = { layoutId: LAYOUTS[larg.join(',')] ?? 1 };
  appliquer(sid, s);
  const children = cols.map((c, ci) => {
    const cid = nouvelId('mj-column');
    attrs[cid] = clone(CAT.blocks['mj-column']);
    poser(attrs[cid].attributes, 'width', `${larg[ci]}%`);
    appliquer(cid, c);
    return { id: cid, tagName: 'mj-column', children: (c.blocs || []).map(bloc) };
  });
  return { id: sid, tagName: 'mj-section', children };
});

// réglages communs : catalogue + surcharges (corps, texte, bouton, lien, separateur)
const ts = clone(CAT.templateSettings);
const GROUPES = { corps: 'body', body: 'body', texte: 'text', text: 'text', bouton: 'button', button: 'button', lien: 'link', link: 'link', separateur: 'divider', divider: 'divider' };
for (const [k, g] of Object.entries(GROUPES)) for (const [n, v] of Object.entries(spec[k] || {})) { ts[g] = ts[g] || []; poser(ts[g], n, v); }
ts.body = ts.body.filter(a => a.name !== 'summary');

const editorData = { elements, attrs, templateSettings: ts };
const dossier = path.dirname(path.resolve(specPath));
fs.writeFileSync(path.join(dossier, `${nom}.editorData.json`), JSON.stringify(editorData, null, 1));

const contenus = Object.fromEntries(Object.entries(attrs).filter(([, a]) => typeof a.content === 'string').map(([id, a]) => [id, a.content]));
// historique de toutes les versions générées (on ne sait pas laquelle a été injectée en dernier) :
// un bloc est « retouché à la main » si son contenu actuel ne correspond à AUCUNE version générée.
const histPath = path.join(dossier, `${nom}.historique.json`);
const hist = fs.existsSync(histPath) ? JSON.parse(fs.readFileSync(histPath, 'utf8')) : { ids: {}, contenus: {} };
const avant = Object.keys(hist.ids).length ? hist : null;
for (const id of Object.keys(attrs)) hist.ids[id] = 1;
for (const [id, c] of Object.entries(contenus)) { const l = hist.contenus[id] || []; if (!l.includes(c)) l.push(c); hist.contenus[id] = l.slice(-20); }

const appUrl = spec.appUrl || 'https://app.gohighlevel.com'; // domaine en marque blanche : clé "appUrl"
const base = path.basename(sortie, '.js');
const paquet = path.join(dossier, `${nom}.paquet.json`);
fs.writeFileSync(paquet, JSON.stringify({ DATA: editorData, AVANT: avant, TEXTES: textes }));
const paquetUrl = 'file:///' + paquet.split(path.sep).join('/');
const code = `async (page) => {
  // données lues dans le paquet local (fichier JSON) pour garder ce script court
  const lecteur = await page.context().newPage();
  await lecteur.goto(${JSON.stringify(paquetUrl)});
  const P = JSON.parse(await lecteur.evaluate(() => (document.querySelector('pre') || document.body).textContent));
  await lecteur.close();
  const DATA = P.DATA;
  const CIBLE = ${JSON.stringify({ locationId: spec.locationId, templateId: spec.templateId, ecraser, appUrl, objet: spec.objet || null, apercu: spec.apercu || null })};
  const AVANT = P.AVANT;
  const TEXTES = P.TEXTES;
  const IMG = ${JSON.stringify(path.join(path.dirname(sortie), base))};
  const url = CIBLE.appUrl + '/v2/location/' + CIBLE.locationId + '/marketing/emails/templates/' + CIBLE.templateId + '/editor';
  if (!page.url().includes('/templates/' + CIBLE.templateId + '/editor')) await page.goto(url);
  const trouver = () => page.evaluate(() => {
    const el = [...document.querySelectorAll('*')].find(e => e.__draggable_component__ && e.closest('.builder-area'));
    if (!el) return false;
    let c = el.__draggable_component__.$; while (c && (c.type.name || c.type.__name) !== 'EmailBuilderMfa') c = c.parent;
    if (!c) return false; window.__mtg = c.setupState.store; return true; });
  let ok = false; for (let i = 0; i < 40 && !ok; i++) { ok = await trouver(); if (!ok) await page.waitForTimeout(1000); }
  if (!ok) return { erreur: "éditeur d'email introuvable (connecté ? bon modèle ? éditeur de conception ?)", url: page.url() };
  if (!page.url().includes(CIBLE.templateId)) return { erreur: 'mauvais modèle ouvert', url: page.url() };

  // garde-fou : ne pas écraser un modèle qui contient autre chose que la dernière injection
  const etat = await page.evaluate(() => { const s = window.__mtg.state; const ids = Object.keys(s.attrs);
    return { ids, contenus: Object.fromEntries(ids.filter(i => typeof s.attrs[i].content === 'string').map(i => [i, s.attrs[i].content])) }; });
  if (!CIBLE.ecraser && etat.ids.length) {
    const etrangers = etat.ids.filter(i => !/^mj-[a-z-]+-mg/.test(i) || (AVANT && !(i in AVANT.ids)));
    const retouches = AVANT ? Object.keys(etat.contenus).filter(i => i in AVANT.contenus && !AVANT.contenus[i].includes(etat.contenus[i])) : [];
    const vierge = etat.ids.length <= 4 && etat.ids.every(i => /mj-(section|column|text|preview-url)-/.test(i));
    if (!vierge && (etrangers.length || retouches.length || !AVANT))
      return { refus: 'le modèle contient du contenu qui ne vient pas de la dernière injection (retouches à la main ?) — montrer à l’utilisateur et relancer avec --ecraser seulement sur sa demande',
        etrangers: etrangers.slice(0, 20), retouches, extraits: [...etrangers, ...retouches].slice(0, 8).map(i => (etat.contenus[i] || '').replace(/<[^>]+>/g, ' ').trim().slice(0, 60)) };
  }

  const reponse = page.waitForResponse(r => /emails\\/builder\\/data$/.test(r.url()) && r.request().method() === 'POST', { timeout: 45000 }).catch(() => null);
  await page.evaluate((d) => { const s = window.__mtg; s.dispatch('INIT_EDITOR', { editorData: d, type: 'builder' }); s.commit('UPDATE_UNSAVED_CHANGES', true); }, DATA);
  let r = await reponse;
  if (!r) { await page.locator('button[aria-label="Enregistrer le modèle"]').click({ force: true }).catch(() => {});
    r = await page.waitForResponse(x => /emails\\/builder\\/data$/.test(x.url()) && x.request().method() === 'POST', { timeout: 30000 }).catch(() => null); }
    await page.waitForTimeout(1500);

  const srv = await page.evaluate(async (c) => { const s = window.__mtg.state;
    const res = await fetch('https://backend.leadconnectorhq.com/emails/builder/data/' + c.locationId + '/' + c.templateId + '?isInternal=false',
      { headers: { 'token-id': s.tokenId, version: '2021-07-28', channel: 'APP', source: 'WEB_USER' } });
    const j = await res.json(); return { name: j.name, ids: Object.keys(j.editorData?.attrs || {}), previewUrl: j.previewUrl, updatedAt: j.updatedAt, errorsPresent: j.errorsPresent, errorItems: j.errorItems, contenus: Object.fromEntries(Object.entries(j.editorData?.attrs || {}).map(([k, v]) => [k, v.content])) }; }, CIBLE);
  const manquants = Object.keys(DATA.attrs).filter(i => !srv.ids.includes(i));
  const sansDef = (c) => typeof c === 'string' ? c.replace(/ data-cv-defaults='[^']*'/g, '') : c;
  const differents = Object.keys(DATA.attrs).filter(i => sansDef(DATA.attrs[i].content) !== sansDef(srv.contenus[i]));
  const etatServeur = r ? r.status() : (differents.length ? 'NON ENREGISTRÉ — le serveur diffère sur ' + differents.length + ' bloc(s)' : 'déjà à jour (rien à enregistrer)');
  let html = ''; for (let i = 0; i < 5; i++) { html = await (await page.request.get(srv.previewUrl + '&t=' + Date.now())).text(); if (TEXTES.every(t => html.replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/\\s+/g, ' ').includes(t.slice(0, 20)))) break; await page.waitForTimeout(2000); }
  const plat = html.replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/&#39;|&rsquo;/g, "'").replace(/\\s+/g, ' ');
  const textesAbsents = TEXTES.filter(t => !plat.includes(t.slice(0, 20)));

  // rendu réel du HTML compilé, ordinateur et téléphone
  const p2 = await page.context().newPage();
  const captures = {};
  for (const [nom, w] of [['ordinateur', 700], ['mobile', 390]]) {
    await p2.setViewportSize({ width: w, height: 900 }); await p2.setContent(html, { waitUntil: 'load' }); await p2.waitForTimeout(800);
    const deb = await p2.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1);
    const f = IMG + '-' + nom + '.png'; await p2.screenshot({ path: f, fullPage: true }); captures[nom] = { fichier: f, debordement: deb };
  }
  await p2.close();
  return { enregistrement: etatServeur, modele: srv.name, misAJour: srv.updatedAt, erreursGHL: srv.errorsPresent ? srv.errorItems : [],
    blocsInjectes: Object.keys(DATA.attrs).length, blocsManquantsServeur: manquants, textesAbsentsDuHTML: textesAbsents,
    tailleHTML: html.length, previewUrl: srv.previewUrl, captures };
}
`;
fs.writeFileSync(sortie, code);
fs.writeFileSync(histPath, JSON.stringify(hist));
console.log(`editorData : ${path.join(dossier, `${nom}.editorData.json`)} (${Object.keys(attrs).length} blocs, ${elements.length} sections)`);
console.log(`script     : ${sortie}`);
console.log(`→ browser_run_code_unsafe(filename = "${path.relative(process.cwd(), sortie) || sortie}")`);
