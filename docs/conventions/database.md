# Conventions Database

## Nommage

- tables au singulier, en snake_case (`user`, `theme`, `cursus`, `lesson`, `element`, `text`, `image`, `user_theme`, `user_cursus`, `user_lesson`) ;
- colonnes en camelCase pour les entités propres au modèle (`firstName`, `isVerified`, `createdAt`), en snake_case pour les clés étrangères (`theme_id`, `cursus_id`, `lesson_id`, `element_id`, `user_id`) ;
- clé primaire nommée `id` sur toutes les tables ;
- alias d'association Sequelize explicites et descriptifs plutôt que génériques (`IncludedInTheme`, `IncludesCursus`, `PurchasedByUser`, `RelatedToCursus`, `UpdatedByUser`...), définis une fois pour toutes dans `databaseAssociations.ts`.

## Modèles et entités

- une entité = une responsabilité métier claire (`Theme`, `Cursus`, `Lesson`, `Element`, `Text`, `Image`) ;
- chaque modèle définit deux interfaces TypeScript (`XAttributes`, `XCreationAttributes` via `Optional<...>`) en plus de la classe `Model` ;
- les associations ne sont pas déclarées dans les fichiers de modèle individuels mais centralisées dans `databaseAssociations.ts` (`setupAssociations()`), appelée une fois au démarrage de l'application (`app.ts`).

## Identifiants

- clé primaire auto-incrémentée (`INTEGER.UNSIGNED`, `autoIncrement: true`) sur toutes les tables, pas d'UUID.

## Colonnes communes

- `createdAt` / `updatedAt` : timestamps automatiques Sequelize (`timestamps: true`) sur toutes les tables ;
- `createdBy` / `updatedBy` : sur les entités de contenu et les tables d'association, référence vers `user.id` de l'utilisateur ayant créé/modifié la ligne (nullable, pas de contrainte de clé étrangère stricte observée dans les migrations).

## Relations

- toutes les associations sont déclarées avec un alias (`as: '...'`) explicite, jamais l'alias par défaut de Sequelize ;
- pas de suppression en cascade au niveau base de données (`ON DELETE CASCADE`) : la cohérence entre entités liées est assurée manuellement par la couche service (voir `docs/business-rules.md`).

## Migrations

- une migration par table, fichier `.cjs`, nommé `<timestamp>-<nom-entité>.cjs`, dans `src/migrations/` ;
- ne jamais modifier une migration déjà appliquée : toute évolution de schéma passe par une nouvelle migration ;
- exécution via `sequelize-cli` (`npm run migrate` en local, `npm run migrate-render` en production, sans chargement de `.env` car les variables sont déjà injectées par la plateforme).

## Requêtes

- utiliser `include` avec l'alias approprié pour récupérer des données liées plutôt que d'enchaîner des requêtes séparées, sauf quand une boucle est nécessaire pour appliquer une logique par élément (ex. cascade de validation) ;
- pas de pagination généralisée (volumes de données réduits, catalogue de formations).

## Données sensibles

- le mot de passe (`user.password`) est stocké hashé (`bcrypt`), jamais en clair ;
- aucune autre donnée bancaire n'est stockée en base : le paiement est entièrement délégué à Stripe (seul un `payment_intent` transitoire est créé, sans persistance côté application).

## Invariants

- aucune modification directe de la base hors migration ;
- les conventions de nommage ci-dessus sont respectées pour toute nouvelle table/colonne ;
- toute écriture passe par Sequelize, jamais de SQL brut.
