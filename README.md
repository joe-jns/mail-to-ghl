# mail-to-ghl

Skill pour agent (Claude Code et compatibles) qui monte un **email en vrais blocs natifs** dans l'éditeur d'email
par blocs de **GoHighLevel** (« Éditeur de conception », y compris en marque blanche), depuis une maquette, un email
HTML ou une description — puis vérifie le HTML que GHL compile, sur ordinateur et téléphone.

*An agent skill that builds native drag-and-drop email templates in GoHighLevel's email builder from a design, and
checks the HTML GHL compiles. Docs are in French.*

## Contenu

| Fichier | Rôle |
|---|---|
| `SKILL.md` | La méthode, de rien à un modèle d'email injecté et vérifié. |
| `reference/REFERENCE.md` | Comment l'éditeur fonctionne : format MJML (`elements` / `attrs` / `templateSettings`), store Vuex, enregistrement, compilation côté serveur, mobile, visibilité, envoi conditionnel, valeurs par défaut des champs, pièges. |
| `reference/catalogue-blocs.json` | Réglages par défaut de chaque bloc (26 types : texte, image, bouton, colonnes, FAQ, carrousel, compte à rebours…) et des réglages communs de l'email. |
| `reference/champs-fusion.md` | Les champs de fusion standard du sélecteur de l'éditeur (`{{contact.first_name}}`, `{{email.unsubscribe_link}}`…). |
| `mail-to-ghl.mjs` | Transforme une description simple de l'email (`email.json`) en données complètes de l'éditeur, et écrit le script Playwright qui l'injecte dans un modèle, attend l'enregistrement et photographie le HTML compilé. |
| `exemples/exemple.json` | Un email complet : 7 sections, colonnes 50/50, 33×3, 40/60, réglages mobiles, valeur par défaut d'un champ. |

## Utilisation

1. Copier le dossier dans `~/.claude/skills/mail-to-ghl/`.
2. Il faut [Node.js](https://nodejs.org) et le serveur MCP Playwright, avec une session GHL ouverte dans son navigateur.
3. Créer un modèle vierge dans GHL (Marketing → E-mails → Modèles → Nouveau → Modèle vierge → Éditeur de conception)
   et noter son id (`/emails/templates/<id>/editor`).
4. Demander à l'agent : « mets cet email dans GHL » (ou `/mail-to-ghl`). Il suit `SKILL.md`.

À la main :

```sh
node mail-to-ghl.mjs mon-email.json --sortie ./mail-to-ghl-mon-email.js
# puis, dans l'agent : browser_run_code_unsafe(filename = "mail-to-ghl-mon-email.js")
```

## Garde-fous

- Rien n'est envoyé : on ne travaille que dans un **modèle**, jamais dans une campagne.
- Le script refuse d'écraser un modèle qui contient autre chose que sa dernière injection (retouches faites à la
  main dans GHL), sauf `--ecraser`.

## Limites

S'appuie sur le fonctionnement interne (non documenté) de l'éditeur d'email GHL, relevé en novembre 2026 : une mise à
jour de GHL peut le casser. Non affilié à HighLevel.

## Licence

MIT
