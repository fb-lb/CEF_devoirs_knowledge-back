# Conventions Database

## Nommage

Décrire les conventions de nommage.

Exemples :
- tables au singulier ou pluriel
- colonnes en snake_case ou camelCase
- nommage des clés primaires
- nommage des clés étrangères
- nommage des index

## Modèles et entités

Décrire les conventions générales.

Exemples :
- une entité représente une responsabilité métier claire
- éviter les modèles trop volumineux
- ne pas mélanger plusieurs domaines métier

## Identifiants

Décrire la stratégie utilisée.

Exemples :
- UUID (Universally Unique Identifier)
- auto-incrément
- autre stratégie

Préciser les conventions associées.

## Colonnes communes

Décrire les colonnes standardisées.

Exemples :
- createdAt
- updatedAt
- deletedAt
- version

## Relations

Décrire uniquement les conventions générales.

Exemples :
- nommage des relations
- gestion des suppressions
- utilisation des relations obligatoires ou optionnelles

Les relations entre entités spécifiques sont documentées dans les modèles ou dans la documentation métier.

## Migrations

Décrire les règles.

Exemples :
- toujours créer une migration pour modifier le schéma
- ne jamais modifier une migration déjà appliquée
- tester les migrations avant déploiement

## Requêtes

Décrire les bonnes pratiques.

Exemples :
- éviter les requêtes inutiles
- éviter les requêtes N+1
- sélectionner uniquement les données nécessaires

## Données sensibles

Décrire les règles.

Exemples :
- ne jamais stocker de données sensibles en clair
- chiffrer les données nécessaires
- limiter les données récupérées

## Invariants

Ces règles doivent toujours être respectées.

Exemples :
- aucune modification directe de la base hors migration
- les conventions de nommage sont respectées
- les contraintes importantes sont définies au niveau de la base