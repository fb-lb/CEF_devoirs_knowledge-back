# Base de données

## Imports

Lire :
- `docs/conventions/database.md`

## SGBD

Système de gestion de base de données utilisé :
- [MariaDB / PostgreSQL / SQLite / ...]

ORM / ODM utilisé :
- [Prisma / Sequelize / TypeORM / ...]

## Principes

- une table représente une entité métier ;
- toute modification passe par l'ORM ;
- les migrations sont versionnées ;
- les contraintes d'intégrité sont définies en base.

## Identifiants

Exemple :
- UUID v7

## Gestion des suppressions

Décrire la stratégie retenue.

Exemples :
- suppression physique pour les tables techniques
- suppression logique (Soft Delete) sur les données métier
- soft delete
- suppression en cascade
- restriction des suppressions

## Performances

Décrire les principes généraux.

Exemples :
- index sur les colonnes utilisées pour les recherches
- pagination obligatoire sur les listes importantes
- limitation des requêtes
- éviter les requêtes N+1

## Invariants

Décrire les règles à toujours respecter.

Exemples :
- préserver l'intégrité référentielle
- éviter les duplications de données
- ne jamais contourner l'ORM sans justification
- respecter les conventions de nommage