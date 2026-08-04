# Déploiement

## Environnements

Décrire les environnements disponibles.

Exemple :
- Développement
- Recette
- Préproduction
- Production

Préciser le rôle de chacun.

## Variables d'environnement

Décrire l'organisation générale.

Exemples :
- variables communes
- variables spécifiques à chaque environnement
- gestion des secrets

Ne jamais stocker de secrets dans le dépôt.

## Pipeline

Décrire les principales étapes du pipeline de déploiement.

Exemple :
- installation
- compilation
- tests
- build
- déploiement

## Stratégie de déploiement

Décrire la procédure générale.

Exemples :
- déclenchement automatique
- validation manuelle
- stratégie de mise en production

## Rollback

Décrire la procédure de retour arrière.

Exemple :
- restauration de la version précédente
- restauration de la base si nécessaire

## Dépendances externes

Lister les services nécessaires au fonctionnement.

Exemples :
- base de données
- stockage d'objets
- serveur SMTP
- fournisseur OAuth
- cache Redis

Préciser lesquels sont indispensables selon l'environnement.

## Invariants

Ces règles doivent toujours être respectées.

Exemples :
- ne jamais déployer sans validation des tests
- les migrations doivent être compatibles avec le déploiement
- les secrets ne doivent jamais être exposés