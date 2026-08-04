# Backend

## Imports

Lire :
- `docs/conventions/backend.md`
- `docs/conventions/typescript.md`

## Vue d'ensemble

[Description courte du rôle du backend dans l'application.]

Exemple :
Le backend expose les fonctionnalités métier via une API et assure :
- la logique applicative
- la validation des données
- l'accès aux données
- la communication avec les services externes

## Stack technique

### Runtime

[Exemple : Node.js]

### Framework

[Exemple : Express]

### Langage

[Exemple : TypeScript]

### Outils principaux

- [ORM / ODM]
- [Validation]
- [Authentification]
- [Documentation API]

## Structure du backend

Décrire uniquement l'organisation principale.

Exemple :
```
src/
├── controllers/
├── services/
├── repositories/
├── models/
├── routes/
├── middlewares/
└── utils/
```


Rôle des principales parties :

Controllers :
[Responsabilité]

Services :
[Responsabilité]

Repositories :
[Responsabilité]

Models :
[Responsabilité]

## Flux d'une requête

Décrire le chemin général d'une requête.

Exemple :

Request

↓

Route

↓

Controller

↓

Service

↓

Repository

↓

Database

↓

Response

## Principes d'architecture backend

Décrire les règles importantes.

Exemples :
- la logique métier appartient aux services
- les controllers restent légers
- l'accès aux données passe par la couche prévue
- les dépendances respectent le sens de l'architecture

## Gestion des erreurs

Décrire le principe général.

Exemple :
- utilisation d'erreurs applicatives dédiées
- format de réponse d'erreur standardisé
- absence d'exposition des erreurs internes

## API

Style :

[REST / GraphQL / autre]

Conventions globales :
- [convention importante]
- [convention importante]

Exemples :
- format des réponses
- gestion cohérente des codes HTTP
- messages d'erreur homogènes
- versionnement
- pagination
- filtres