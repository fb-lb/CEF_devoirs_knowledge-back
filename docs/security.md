# Sécurité

## Authentification

Décrire le mécanisme d'authentification.

Exemple :
- JWT
- OAuth
- Sessions
- SSO

Préciser uniquement le fonctionnement général.

## Autorisation

Décrire le modèle d'autorisation.

Exemples :
- rôles
- permissions
- politiques d'accès
- contrôle par ressource

## Gestion des secrets

Décrire où sont stockés les secrets.

Exemples :
- variables d'environnement
- coffre-fort de secrets
- service cloud

Ne jamais stocker de secrets dans le dépôt.

## Données sensibles

Identifier les données nécessitant une protection particulière.

Exemples :
- mots de passe
- données personnelles
- clés API
- informations bancaires

Préciser les règles de protection associées.

## Communications

Décrire les règles générales.

Exemples :
- HTTPS obligatoire
- chiffrement des échanges
- API sécurisées

## Journalisation

Décrire les règles concernant les logs.

Exemples :
- ne jamais enregistrer de mot de passe
- masquer les données sensibles
- journaliser les actions critiques

## Invariants

Ces règles ne doivent jamais être enfreintes.

Exemples :

Ne jamais :
- exposer un secret
- stocker un mot de passe en clair
- contourner un contrôle d'autorisation
- désactiver une validation des données provenant de l'extérieur
- concaténer directement des requêtes SQL

Toujours :
- appliquer le principe du moindre privilège