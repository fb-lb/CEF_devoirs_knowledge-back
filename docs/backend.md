# Backend

## Imports

Lire :
- `docs/conventions/backend.md`
- `docs/conventions/typescript.md`

## Vue d'ensemble

Le backend expose l'API REST de Knowledge Learning et assure :
- l'authentification et l'autorisation des utilisateurs (rôles `user` / `admin`) ;
- la gestion du contenu pédagogique (thèmes, cursus, leçons, éléments texte/image) ;
- la gestion des achats (thème, cursus ou leçon à l'unité) et le paiement via Stripe ;
- la validation des données entrantes ;
- l'envoi d'emails transactionnels (vérification de compte) via EmailJS.

## Stack technique

### Runtime

Node.js

### Framework

Express 5.1.0

### Langage

TypeScript 5.9.2 (ESM natif, `"type": "module"` dans `package.json`)

### Outils principaux

- ORM : Sequelize (+ `sequelize-cli` pour migrations et seeders)
- Base de données : MySQL (`mysql2`)
- ODM : Mongoose, pour les logs applicatifs (base MongoDB séparée, voir `database.md`)
- Authentification : JWT (`jsonwebtoken`), mots de passe hashés avec `bcrypt`
- Upload de fichiers : `multer` (images des leçons)
- Paiement : `stripe`
- Email : `@emailjs/nodejs`
- Logs HTTP : `morgan`
- Documentation du code : TypeDoc (JSDoc → `typedoc/`, commande `npm run docs`)
- Tests : Vitest

## Structure du backend

```
src/
├── bin/            # point d'entrée (www.ts)
├── config/         # configuration DB MySQL (database.ts), Sequelize CLI (config.cjs) et connexion MongoDB (mongo.ts)
├── controllers/     # gestion HTTP : parsing requête, appel des services, formatage réponse
├── services/         # logique métier et accès aux données via les modèles Sequelize / Mongoose
├── models/           # modèles Sequelize + associations (databaseAssociations.ts), modèle Mongoose Log.ts
├── routes/          # déclaration des routes Express, montées dans routes/index.ts
├── middlewares/    # authentification (private.middleware.ts), upload (uploadImage.middleware.ts)
├── migrations/     # migrations Sequelize (une par table)
├── seeders/          # jeux de données de test/démo (MySQL)
├── data-mongo-db/  # jeu de données et script de seed pour les logs MongoDB (seed-logs.ts, logs.json)
├── types/           # interfaces et types partagés (Interfaces.ts, types.ts, env.d.ts, express.d.ts)
├── utils/            # utilitaires (AppError.ts)
├── tests/            # tests Vitest
└── app.ts            # configuration Express (middlewares globaux, routes, gestion d'erreurs)
```

Rôle des principales parties :

Controllers :
Reçoivent la requête HTTP, en extraient les données, appellent le(s) service(s) nécessaires et renvoient une réponse JSON au format `ApiResponse`. Contiennent peu ou pas de logique métier.

Services :
Contiennent la logique métier et l'accès aux données (via les modèles Sequelize, ou via le modèle Mongoose `Log` pour les logs). Un service par domaine métier (`authentication`, `user`, `theme`, `cursus`, `lesson`, `element`, `user-theme`, `user-cursus`, `user-lesson`, `token`, `email`, `form`, `log`).

Models :
Définissent le schéma Sequelize de chaque entité (typé via des interfaces `Attributes`/`CreationAttributes`) ainsi que les associations entre entités (`databaseAssociations.ts`). `Log.ts` définit de la même façon le schéma Mongoose du modèle `Log`.

Il n'y a pas de couche `repositories/` distincte : les services appellent directement les modèles Sequelize (ou Mongoose pour les logs).

## Flux d'une requête

```
Request
  ↓
Route (src/routes/*.ts)
  ↓
Middleware (privateUser / privateAdmin si la route est protégée)
  ↓
Controller (src/controllers/*.ts)
  ↓
Service (src/services/*.ts)
  ↓
Model Sequelize (src/models/*.ts)
  ↓
Base de données MySQL
  ↓
Response (format ApiResponse)
```

## Principes d'architecture backend

- la logique métier appartient aux services, les controllers restent légers (parsing + appel service + réponse) ;
- l'accès aux données passe exclusivement par les modèles Sequelize ;
- la consultation du catalogue (`GET .../all`) est publique ; toute création/modification/suppression de contenu est protégée par `privateAdmin`, tout accès aux achats et à la progression d'un utilisateur par `privateUser` (voir `security.md` pour le détail route par route) ;
- toute entrée utilisateur est validée via `form.service.ts` avant traitement.

## Gestion des erreurs

- une classe unique `AppError` (`src/utils/AppError.ts`) porte : `status` (code HTTP), `message` (technique, loggué côté serveur) et `messageFront` (destiné à l'utilisateur, jamais de détail technique) ;
- un middleware d'erreur central dans `app.ts` intercepte toutes les erreurs, logge le détail technique côté serveur (`console.error`) et ne renvoie que `messageFront` au client ;
- les erreurs non prévues (hors `AppError`) renvoient un message générique HTTP 500, sans exposer la stack ni le détail interne.

## API

Style :

REST (JSON)

Conventions globales :
- toutes les routes sont préfixées par `/api` (sauf `GET /` qui sert de healthcheck) ;
- réponses au format `{ success: boolean, message: string, data?: T }` (`ApiResponse<T>` dans `types/Interfaces.ts`) ;
- authentification par en-tête `Authorization: Bearer <token>` ; un nouveau token est renvoyé à chaque requête authentifiée (rolling token, voir `security.md`) ;
- routes principales (préfixe `/api`) :
  - `/inscription` : inscription et vérification d'email
  - `/authentification` : connexion
  - `/utilisateurs` : gestion des utilisateurs
  - `/stripe` : création de payment intent
  - `/content/theme`, `/content/cursus`, `/content/lesson`, `/content/element` : catalogue pédagogique
  - `/user-theme`, `/user-cursus`, `/user-lesson` : achats et progression des utilisateurs
  - `/logs` : consultation des logs applicatifs (MongoDB), réservée aux administrateurs
- pas de versionnement d'API à ce jour (une seule version) ;
- pas de pagination généralisée (catalogue de taille réduite).
