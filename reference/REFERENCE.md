# Éditeur d'email par blocs GHL — référence

Relevé en 2026-11 sur un sous-compte GHL réel (« Éditeur de conception », build email-builder-mfa 425), en déposant
chaque bloc dans un modèle de test puis en injectant un email complet. Réglages par défaut de chaque bloc : `catalogue-blocs.json`.

## Format (MJML)

Un email = `{ elements, attrs, templateSettings }`.

- `elements` : arbre `{ id, tagName, children }`. Racine = liste de `mj-section` → `mj-column` → blocs.
  Ids : `<tag>-<8 caractères>` (ex. `mj-text-t4a3sE57`).
- `attrs[id]` : `{ tagName, attributes: [{ name, default, unit? }], content? }`.
  La valeur est dans `default` (pas `value`). `content` = HTML (texte, bouton, titre accordéon…).
  `mj-section` a aussi `customFlags: { layoutId }` (1 = une colonne, 2 = 50/50, 3 = 3 colonnes, 4 = 40/60,
  5 = 60/40, 6 = 4 colonnes, 7 = 25/75, 8 = 75/25).
- `templateSettings` : `body` (largeur 600 px, couleurs du fond et du corps), `button`, `divider`, `text`
  (polices paragraphe/titres, couleur des liens, `custom-fonts: "Poppins;Roboto"`), `link`, `header`, `defaults`.

**Toujours fournir le jeu complet de réglages** (catalogue + ses valeurs par-dessus). Avec seulement quelques
réglages, l'éditeur affiche mal (fond de section et largeur du corps perdus), même si le serveur compile.

## Blocs (palette « Éléments »)

Texte `mj-text`, Image `mj-image`, Bouton `mj-button`, Logo `mj-logo`, Séparateur `mj-divider`,
Réseau social `mj-social` (+ `mj-social-element`), Pied de page `mj-footer`, Code `mj-raw`, Vidéo `mj-video`,
Panier `mj-shopping-cart`, En-tête RSS `mj-rss-header`, Éléments RSS `mj-rss-item`,
FAQ `mj-accordion` (+ `mj-accordion-element` > `mj-accordion-title` + `mj-accordion-text`), Produits `mj-product`,
Carrousel `mj-carousel` (+ `mj-carousel-image`), URL de prévisualisation `mj-preview-url`,
Compte à rebours `mj-countdown-timer`, Espacement `mj-spacer`, Lien d'avis `mj-review-link`.
Les enfants par défaut des blocs composés sont dans `defaultChildren` du catalogue.

## Colonnes, mobile, visibilité, conditions

- Colonne : `width` en `%`, `is-unstacked: true` = ne pas empiler sur mobile. Section : `direction` (`ltr`/`rtl`).
- Réglages mobiles = attributs préfixés `mobile-` dans la même liste, ajoutés seulement s'ils diffèrent :
  `mobile-padding-*`, `mobile-margin-*`, `mobile-font-size`, `mobile-font-family`, `mobile-font-weight`,
  `mobile-font-style`, `mobile-text-decoration`, `mobile-align`, `mobile-width`, `mobile-height`,
  `mobile-size-mode`, `mobile-icon-size`, `mobile-inner-padding(-horizontal|-vertical)`,
  `mobile-button-font-size`, `mobile-button-line-height`, `mobile-para-font-size`, `mobile-para-line-height`,
  `mobile-para-text-align`. Compilé en classe `mo-xxxx` dans `@media (max-width:480px)`.
- Visibilité : `hide-on-desktop: true` / `hide-on-mobile: true` → classes `mj-desktop-hidden-element` /
  `mj-small-device-hidden-element`.
- Envoi conditionnel : `is-conditional: true` + `condition` = chaîne JSON
  `{"customValue":"contact.first_name","operator":"~=","value":"…","dataType":"TEXT"}`.
  Opérateurs : `~=` est, `!~=` n'est pas, `?=` est présent, `!?=` est vide.

## Piloter l'éditeur (Playwright, page de l'éditeur)

```js
// trouver le store Vuex (build de prod : passer par vuedraggable)
const el=[...document.querySelectorAll('*')].find(e=>e.__draggable_component__ && e.closest('.builder-area'));
let c=el.__draggable_component__.$; while(c && c.type.name!=='EmailBuilderMfa') c=c.parent;
const store=c.setupState.store;           // state: elements, attrs, templateSettings…
store.dispatch('INIT_EDITOR',{editorData:{elements,attrs,templateSettings}, type:'builder'});
store.commit('UPDATE_UNSAVED_CHANGES', true);   // → l'enregistrement automatique part
```

Mutations utiles : `UPDATE_CONTENT {elementId, content}`, `UPDATE_ATTRIBUTE {elementId, attribute:{name,default,unit}}`,
`SET_LAYOUT {element, newIndex}`, `UPDATE_TEMPLATE_ATTRIBUTE {option, attribute}`.

**Attention, l'enregistrement automatique compare les références** (`elements` / `attrs` / `html` remplacés ?), pas
le contenu : une mutation qui modifie en place (`UPDATE_CONTENT`, `UPDATE_ATTRIBUTE`, `SET_DEFAULT_VALUE`) **n'est
jamais enregistrée**, même avec `UPDATE_UNSAVED_CHANGES` et le bouton Enregistrer. Pour une retouche : copier l'état
(`JSON.parse(JSON.stringify({elements, attrs, templateSettings}))`), modifier la copie, `INIT_EDITOR` avec elle, puis
`UPDATE_UNSAVED_CHANGES` → POST 201. Si l'état injecté est identique à ce qui est enregistré, rien ne part (normal).

## Champs de fusion et valeurs par défaut

- Liste complète du sélecteur « Valeurs personnalisées » de l'éditeur : `champs-fusion.md` (566 champs, 29 catégories ;
  la catégorie Contact contient aussi les champs personnalisés du sous-compte relevé). Brut : `champs-fusion.json`.
  Dans l'éditeur : composant `CustomValueSelect`, prop `menus`. Champs du sous-compte : `store.state.customFieldsLocation`.
- Liens obligatoires d'un email : `{{email.unsubscribe_link}}`, `{{email.view_in_browser_url}}`,
  `{{email.preference_management_link}}`.
- **Valeur par défaut d'un champ** (« Texte par défaut » quand on clique un champ dans l'éditeur ; affichée si le champ
  est vide) : attribut sur la **première balise** du contenu :
  `<h1 data-cv-defaults='{"contact.first_name:0":"à vous"}' style="…">Bonjour {{contact.first_name}}…</h1>`.
  Clé = `champ:rang` (rang = n-ième apparition du champ dans ce bloc, à partir de 0). JSON échappé (`&` → `&amp;`,
  `'` → `&#39;`). `INIT_EDITOR` le retire du texte et le range dans `state.customValueDefaults[id]`, l'enregistrement
  le recolle ; il est présent dans le HTML compilé. Dans `email.json` : clé `defauts` d'un bloc.

## Enregistrement

- `GET  backend.leadconnectorhq.com/emails/builder/data/<locationId>/<templateId>?isInternal=false`
  → `{ name, editorData, previewUrl, versionId, … }`.
- `POST backend.leadconnectorhq.com/emails/builder/data`
  `{ locationId, templateId, updatedBy, dnd:{elements,attrs,templateSettings}, html:"", editorType:"builder",
  previewText, isAutoSave, isNewVersion }` → 201.
- `html` est envoyé vide : **le serveur compile le MJML** et range le HTML final à `previewUrl`
  (`…/emails/<templateId>/index.html`). Vérifié : textes, champs `{{contact.*}}`, couleurs, colonnes 40/60,
  masquage et marges mobiles s'y retrouvent.
- GHL enregistre tout seul à l'ouverture d'un modèle (ajoute des réglages par défaut, contenu intact).

## Pièges

- **Couleur des liens** : le HTML compilé impose `p a, h1 a… { color: inherit !important }` → un `<a>` prend la couleur
  du `<p>` parent, pas la sienne. Mettre la couleur voulue sur le `<p>` (et sur le `<a>` pour l'éditeur).
- **Réglages mobiles inopérants** : `mobile-padding-*` sur une **colonne** n'est pas appliqué (le mettre sur un bloc
  de la colonne) ; `mobile-para-font-size` ne touche que les `<p>`, pas un `<h1>`/`<h2>` (pas de taille mobile pour un titre).
- Un `{{champ}}` long dans un grand titre se coupe au milieu sur téléphone (le HTML ne sait pas qu'il sera remplacé) :
  normal, le vrai prénom est court.
- Les hauteurs de colonnes ne s'égalisent pas et leur fond ne s'étire pas : pas de « cartes » côte à côte de même
  hauteur avec fond de colonne ; préférer un fond de section.
- Un titre pleine largeur au-dessus de colonnes = deux sections (une section ne mélange pas les deux).
- Boutons sans lien (`href: ""`) : acceptés par GHL (aucune erreur), mais à signaler.
- `browser_run_code_unsafe` recopie tout le script dans sa réponse : garder les gros JSON hors du script (le script
  de `mail-to-ghl.mjs` lit son `<nom>.paquet.json` en l'ouvrant en `file:///` dans un onglet).
- Le « Aperçu de la boîte de réception » consomme des crédits (1000 aperçus) : ne pas le lancer.
- Captures à 1920 px pour une page de ~1745 px CSS : cliquer par sélecteur, pas par coordonnées.
- Le panneau de droite (Style / Visibility) suit la vue Ordinateur/Mobile active : en vue mobile, les marges
  modifiées deviennent des `mobile-*`.
