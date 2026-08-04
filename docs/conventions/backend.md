# Conventions Backend

## Contrôleurs

Décrire les conventions.

Exemples :
- valider les entrées
- déléguer la logique métier aux services
- retourner uniquement des réponses HTTP

## Services

Décrire les conventions.

Exemples :
- une responsabilité par service
- logique métier centralisée
- services indépendants lorsque possible

## Accès aux données

Décrire les conventions.

Exemples :
- utiliser exclusivement l'ORM retenu
- ne pas contourner les couches d'accès aux données
- centraliser les requêtes complexes

## Transactions

Décrire les conventions.

Exemples :
- utiliser une transaction lorsque plusieurs écritures doivent rester cohérentes
- limiter leur durée
- éviter les transactions imbriquées

## Gestion des erreurs

Décrire les conventions.

Exemples :
- utiliser les classes d'erreur du projet
- ne jamais exposer les erreurs internes
- centraliser le traitement des erreurs

## Validation

Décrire les conventions.

Exemples :
- valider toutes les entrées
- ne jamais faire confiance aux données reçues
- utiliser les validateurs du projet

## Journalisation

Décrire les conventions.

Exemples :
- journaliser les erreurs importantes
- éviter les logs inutiles
- ne jamais enregistrer de données sensibles

## Performances

Décrire les conventions.

Exemples :
- limiter les accès à la base
- éviter les traitements inutiles
- privilégier les traitements asynchrones lorsque pertinent

## Invariants

Ces règles doivent toujours être respectées.

Exemples :
- aucune logique métier dans les contrôleurs
- toutes les entrées sont validées
- les erreurs sont gérées de manière centralisée
- aucune donnée sensible n'est exposée