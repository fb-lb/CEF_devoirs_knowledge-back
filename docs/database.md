# Base de données

## Imports

Lire :
- `docs/conventions/database.md`

## SGBD

Système de gestion de base de données utilisé :
- MySQL (via `mysql2`), servi localement par XAMPP en développement

ORM / ODM utilisé :
- Sequelize (`sequelize` + `sequelize-cli` pour les migrations et seeders)

## Schéma

Entités principales (une migration et un modèle par table, voir `src/migrations/` et `src/models/`) :

- `user` : compte utilisateur (`firstName`, `lastName`, `email` unique, `password` hashé, `roles` (JSON, `user`/`admin`), `isVerified`)
- `theme` : catégorie de haut niveau du catalogue (`name`, `order`)
- `cursus` : parcours de formation, rattaché à un `theme` (`theme_id`, `name`, `price`, `order`)
- `lesson` : leçon, rattachée à un `cursus` (`cursus_id`, `name`, `price`, `order`)
- `element` : bloc de contenu d'une leçon, rattaché à une `lesson` (`lesson_id`, `type`: `text` | `image`, `order`)
- `text` : contenu texte d'un `element` (relation 1-1)
- `image` : contenu image d'un `element` (relation 1-1)
- `user_theme`, `user_cursus`, `user_lesson` : tables d'association représentant l'achat/l'accès d'un utilisateur à un thème, un cursus ou une leçon (`user_id`, `<entité>_id`, plus l'indicateur de progression : `isCertified` sur `user_theme`, `isValidated` sur `user_cursus` et `user_lesson`)

Hiérarchie du contenu pédagogique :

```
Theme
 └── Cursus (payant)
      └── Lesson (payante)
           └── Element (text | image)
```

## Principes

- une table représente une entité métier ;
- toute modification du schéma passe par une migration Sequelize (`src/migrations/`) ;
- les migrations sont numérotées par timestamp et versionnées dans le dépôt ;
- les contraintes de nullabilité et de longueur sont définies au niveau du modèle Sequelize (`allowNull`, `STRING(n)`, etc.).

## Identifiants

- clé primaire auto-incrémentée (`INTEGER.UNSIGNED`, `autoIncrement: true`) sur toutes les tables.

## Traçabilité

Les entités de contenu (`theme`, `cursus`, `lesson`, `element`, `text`, `image`) et les tables d'association (`user_theme`, `user_cursus`, `user_lesson`) portent :
- `createdAt` / `updatedAt` (timestamps automatiques Sequelize) ;
- `createdBy` / `updatedBy` (référence vers `user.id` de l'utilisateur — généralement un admin — ayant créé/modifié la ligne), nullable.

## Gestion des suppressions

- suppression physique (pas de soft delete implémenté sur les modèles actuels) ;
- pas de `ON DELETE CASCADE` au niveau de la base de données : la cohérence entre contenu pédagogique et associations d'achat (`user_theme`/`user_cursus`/`user_lesson`) est assurée entièrement par la couche service (suppression manuelle des lignes dépendantes puis recalcul des indicateurs de validation en amont). Voir `business-rules.md` pour le détail de cette cascade applicative.

## Performances

- utilisation des associations Sequelize (`belongsTo` / `hasMany` / `hasOne` avec alias explicites, voir `src/models/databaseAssociations.ts`) et de `include` pour éviter les requêtes N+1 lors de la récupération de contenu hiérarchique ;
- pas d'index applicatif documenté au-delà des clés primaires/étrangères et de la contrainte `unique` sur `user.email`.

## Invariants

- préserver l'intégrité référentielle entre `theme` → `cursus` → `lesson` → `element` → (`text` | `image`) ;
- ne jamais contourner Sequelize par du SQL brut ;
- toute modification de schéma doit passer par une nouvelle migration (jamais de modification directe en base ni de migration déjà appliquée modifiée a posteriori) ;
- les prix (`cursus.price`, `lesson.price`) sont stockés en `DECIMAL(10,2)` et convertis en centimes uniquement au moment de l'appel Stripe.

## Logs applicatifs (MongoDB)

En complément de la base MySQL (données métier), une base **MongoDB** dédiée stocke les logs applicatifs (authentification, audit, erreurs).

### SGBD / ODM

- MongoDB, connexion établie via `mongoose` (`src/config/mongo.ts`, `connectMongoDB()`, appelée au démarrage dans `app.ts`) ;
- URI de connexion fournie par la variable d'environnement `DATABASE_MONGO_DB_URI`.

### Schéma

Une seule collection `Log` (`src/models/Log.ts`), avec un schéma Mongoose validé côté application :
- `level` : `'info' | 'warn' | 'error'` (`LOG_LEVELS`) ;
- `type` : `'audit' | 'auth' | 'error'` (`LOG_TYPES`) ;
- `event` : évènement précis parmi `LOG_EVENTS` (ex. `LOGIN_SUCCESS`, `LOGIN_FAILED`, `DATABASE_ERROR`, `USER_ROLE_CHANGED`) ;
- `userId` : identifiant de l'utilisateur MySQL à l'origine du log, optionnel selon l'évènement ;
- `metadata` : objet libre (`Schema.Types.Mixed`), dont la forme dépend de l'`event` (ex. `ip`/`email` pour un échec de connexion, `model`/`operation`/`errorCode` pour une erreur base de données) ;
- `createdAt` : horodatage automatique (`updatedAt` désactivé, un log n'est jamais modifié).

Ces combinaisons `event`/`level`/`type`/`metadata` sont typées côté TypeScript par le type discriminé `NewLog` (`src/types/types.ts`), qui fait foi pour ajouter un nouvel évènement de log.

### Principes

- `userId` référence un utilisateur MySQL (`user.id`) sans contrainte de clé étrangère (les deux bases sont indépendantes, la cohérence entre `userId` et l'utilisateur MySQL n'est pas garantie par la base) ;
- pas de migrations Sequelize pour cette collection : le schéma est défini et validé uniquement côté Mongoose (`enum`, `required`), pas de `src/migrations/` associé ;
- jeu de données de test/démo dans `src/data-mongo-db/` (`logs.json` + script `seed-logs.ts`, exécuté via `tsx` et non `sequelize-cli`, commandes `npm run seeders-logs` / `seeders-logs-render`).

### Données sensibles

- certains `metadata` contiennent des données personnelles (`email`, `ip` sur les évènements d'authentification) : voir `security.md` pour les implications et la restriction d'accès à ces logs.

### Invariants

- toute écriture de log passe par `addNewLog` (`log.service.ts`), jamais d'insertion Mongoose directe depuis un controller ;
- un log n'est jamais modifié après création (`updatedAt` désactivé) ;
- l'accès en lecture aux logs (`GET /api/logs/getAll`) est réservé aux administrateurs (`privateAdmin`).
