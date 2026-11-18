---
name: mail-to-ghl
description: Monte un email dans l'éditeur d'email par blocs (« Éditeur de conception ») de GoHighLevel (GHL, y compris en marque blanche), en vrais blocs natifs, depuis une maquette (Figma, Maquette, .pen, image), un email HTML existant ou une simple description — et vérifie le HTML que GHL compile, sur ordinateur et téléphone. Emails uniquement (pas les pages de site ni les funnels). À utiliser dès que l'utilisateur dit « mets cet email dans GHL », « fais le modèle d'email sur GHL », « convertis cette maquette d'email », « injecte l'email dans le modèle », « /mail-to-ghl », ou demande un modèle / une campagne d'email construit avec les blocs GHL (pas l'IA, pas le code).
---

# Email → modèle GHL (éditeur par blocs)

Tout ce qu'il faut est dans ce dossier :
- `reference/REFERENCE.md` — **à lire d'abord** : format MJML de l'éditeur, store Vuex, enregistrement, pièges.
- `reference/catalogue-blocs.json` — réglages par défaut de chaque bloc (26 types), des blocs composés
  (réseaux sociaux, FAQ, carrousel) et des réglages communs. Ne jamais deviner un nom de réglage : le chercher ici.
- `mail-to-ghl.mjs` — transforme une description simple (`email.json`) en `editorData` complet (catalogue +
  vos valeurs par-dessus) et écrit le script Playwright qui l'injecte, l'enregistre et vérifie.
- `reference/champs-fusion.md` — les 566 champs de fusion du sélecteur de l'éditeur (`{{contact.first_name}}`,
  `{{email.unsubscribe_link}}`…). N'utiliser que des champs de cette liste.
- `exemples/exemple.json` — un email complet (7 sections, colonnes, mobile, valeur par défaut) à copier.

## Règles

- **Ne rien inventer** : textes, couleurs, polices, images, liens viennent de la source ou de l'utilisateur.
  Ce qui manque (lien d'un bouton, adresse de désinscription, image non fournie) est signalé, pas deviné.
- **Jamais d'envoi** : pas de campagne programmée ni envoyée, pas d'« Aperçu de la boîte de réception »
  (consomme des crédits). On travaille dans un **modèle** ; l'envoi reste à l'utilisateur.
- **Ne pas écraser un modèle existant** : par défaut un modèle neuf. Le script refuse un modèle qui contient
  autre chose que sa dernière injection (blocs ajoutés ou textes retouchés à la main dans GHL) : montrer le refus
  à l'utilisateur ; `--ecraser` seulement sur sa demande explicite. Petite retouche demandée sur un modèle déjà
  en place → modifier une copie de l'état et la réinjecter avec `INIT_EDITOR` (voir REFERENCE : une mutation en
  place n'est jamais enregistrée), ou corriger `email.json` et relancer.
- **Blocs natifs** : `mj-raw` (bloc Code) seulement si aucun bloc ne peut le faire, et le dire.
- Sous-compte (`locationId`) : celui que nomme l'utilisateur ; dans le doute, demander. Il est dans l'URL `/location/<locationId>/…`.

## Ce qu'un email peut et ne peut pas faire

Largeur fixe (600 px par défaut), **des sections empilées**, chaque section coupée en colonnes (1 à 4, largeurs
en % : 100, 50/50, 33/33/33, 40/60, 60/40, 25/75, 75/25, 25×4). Pas de superposition, pas de positionnement libre,
pas d'image de fond sous du texte dans une colonne (fond possible sur la section : `background-url`), pas d'ombre
fiable, polices : web-safe ou Google Fonts déclarées dans `texte.custom-fonts` (Outlook retombe sur la police de
secours). Sur téléphone (≤ 480 px) les colonnes s'empilent, sauf `is-unstacked`.
Une maquette qui ne respecte pas ça se **traduit** (une superposition devient deux sections, un texte sur photo
devient une photo puis un texte, ou une section avec `background-url`) : dire à l'utilisateur ce qui a changé.

## Déroulé

1. **Lire la source.**
   - Maquette (Figma, Maquette, image…) : la lire et la capturer sans la modifier.
     Repérer les bandes horizontales (= sections), dans chaque bande les colonnes, dans chaque colonne les blocs
     de haut en bas. Relever couleurs, polices, tailles, marges, rayons, textes exacts.
   - Email HTML : ses tables donnent directement sections et colonnes.
   - Description seule : proposer la structure, la faire valider avant d'écrire.
2. **Images** : un email n'affiche que des images en ligne. Les envoyer dans les Médias GHL du sous-compte
   (Marketing → Médias, un dossier au nom de l'email) ou réutiliser une URL déjà dans les Médias (`assets.cdn.filesafe.space/...`). Exporter de la maquette
   en 2× pour la netteté, largeur affichée fixée par `width`.
3. **Le modèle cible** : modèle neuf, sauf demande contraire. Dans GHL : Marketing → E-mails → Modèles →
   Nouveau → Modèle vierge → **Éditeur de conception** ; renommer (clic sur le titre). Son id est dans l'URL
   `/emails/templates/<templateId>/editor`. Domaine en marque blanche : clé `appUrl` de `email.json`
   (défaut `https://app.gohighlevel.com`). (Connexion GHL : la session du navigateur Playwright ; si elle tombe,
   demander à l'utilisateur de se reconnecter.)
4. **Écrire `email.json`** dans un dossier de projet (`<projet>/email/`) (copier `exemples/exemple.json`) :
   ```json
   { "nom": "bienvenue", "locationId": "…", "templateId": "…",
     "corps":  { "width": 600, "background-color": "#F4F1EA", "body-color": "#FFFFFF" },
     "texte":  { "font-family-paragraph": "Inter, arial, sans-serif", "font-family-heading1": "…", "custom-fonts": "Inter;Fraunces", "text-color": "#1E2A24", "text-link-color": "#C9502F" },
     "sections": [
       { "attrs": { "background-color": "#24493A", "padding-top": 48, "padding-bottom": 48, "padding-left": 40, "padding-right": 40 },
         "colonnes": [ { "largeur": 100, "blocs": [
           { "type": "texte", "contenu": "<h1 style=\"…\">Titre</h1>", "attrs": { "align": "left", "padding-bottom": 16 }, "mobile": { "padding-left": 0 } },
           { "type": "bouton", "contenu": "Réserver", "attrs": { "href": "https://…", "background-color": "#C9502F", "border-radius": 8 } } ] } ] },
       { "colonnes": [ { "largeur": 40, "blocs": [ { "type": "image", "attrs": { "src": "https://…", "alt": "…", "width": 220 } } ] },
                       { "largeur": 60, "blocs": [ { "type": "texte", "contenu": "<p>…</p>" } ] } ] } ] }
   ```
   - `attrs` = réglages du catalogue (nom exact) ; nombre → unité du catalogue (sinon px), ou chaîne `"50%"`.
   - `mobile` = mêmes noms, devient `mobile-<nom>` ; `masquer`: `"mobile"` | `"ordinateur"` ;
     `condition`: `{ "champ": "contact.first_name", "op": "?=" }` (ops `~=` `!~=` `?=` `!?=`).
   - Blocs : texte, image, bouton, logo, separateur, espace, social, pied, code, video, faq, carrousel, compte,
     avis (ou le nom `mj-…`). Blocs composés : `enfants` = liste dans l'ordre (`attrs`, `contenu`, `enfants`).
   - Le texte va dans `contenu` en HTML avec **styles en ligne** (`<p style="margin:0;…">`, `<h1>`, `<a>`,
     `<span>`). Un lien prend la couleur de son `<p>` : mettre la couleur sur le `<p>`.
   - Champs dynamiques tels quels, pris dans `reference/champs-fusion.md`. Valeur si le champ est vide :
     `"defauts": { "contact.first_name": "à vous" }` sur le bloc (le contenu doit commencer par une balise).
     Pied de page : `{{email.unsubscribe_link}}` obligatoire.
   - Ce qu'on ne règle pas reste au défaut du catalogue (texte : marges 10/20 px) : régler explicitement marges
     (`padding-*` à 0 puis `padding-bottom` pour l'espacement) et couleurs.
   - Mobile : `mobile` sur les sections et les blocs (pas sur les colonnes, sans effet) ; pas de taille mobile pour
     un `<h1>`/`<h2>` (`para-font-size` ne vise que les `<p>`).
5. **Générer** : `node <dossier du skill>/mail-to-ghl.mjs <email.json> --sortie <cwd>/mail-to-ghl-<nom>.js`
   (le script doit être dans le dossier de travail de la session, sinon Playwright le refuse).
6. **Injecter** : `mcp__plugin_playwright_playwright__browser_run_code_unsafe(filename = "mail-to-ghl-<nom>.js")`.
   Le script ouvre le modèle, applique le garde-fou, injecte (`INIT_EDITOR`), attend l'enregistrement (201),
   relit le modèle sur le serveur, récupère le HTML compilé (`previewUrl`) et le photographie à 700 et 390 px.
   Le script lit ses données dans `<nom>.paquet.json` (écrit à côté d'`email.json`) ; l'historique des versions
   générées (`<nom>.historique.json`) sert au garde-fou — ne pas le supprimer entre deux injections.
   Résultat `refus` → montrer `retouches` / `extraits` à l'utilisateur, ne relancer avec `--ecraser` que sur sa demande.
7. **Juger** : `enregistrement` = 201 (ou « déjà à jour »), `blocsManquantsServeur` et `textesAbsentsDuHTML` vides, pas de
   `debordement` ; **regarder** les deux captures (`<nom>-ordinateur.png`, `<nom>-mobile.png`) contre la source,
   et l'éditeur GHL lui-même (une capture de la page). Un écart → corriger `email.json` et relancer 5-6.
8. **Rendre compte** : nom et lien du modèle (`…/emails/templates/<id>/editor`), captures (chemins complets), ce qui
   a été traduit (superpositions, polices de secours), ce qui manque (liens, images, objet de l'email à saisir).
   Un nouveau piège GHL appris → l'ajouter à `reference/REFERENCE.md`.
