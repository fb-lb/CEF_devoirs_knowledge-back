# Frontend

## Imports

Lire :
- `docs/conventions/frontend.md`
- `docs/conventions/typescript.md`

## Vue d'ensemble

[Description courte du rôle du frontend dans l'application.]

Exemple :

Le frontend est responsable de :
- l'interface utilisateur
- l'interaction avec l'utilisateur
- la gestion de l'état côté client
- la communication avec le backend

## Stack technique

### Framework

[Angular / React / Vue / autre]

### Langage

[TypeScript / JavaScript]

### Style

[CSS / Tailwind / SCSS / autre]

### Outils principaux

- gestion d'état :
- requêtes API :
- formulaires :
- composants UI :

## Structure du frontend

Décrire uniquement l'organisation principale.

Exemple :
```
src/

├── components/
├── pages/
├── services/
├── hooks/
├── stores/
├── models/
└── utils/
```


Rôle des principales parties :

Components :
[Responsabilité]

Pages :
[Responsabilité]

Services :
[Responsabilité]

State management :
[Responsabilité]

## Architecture frontend

Décrire le modèle d'organisation choisi.

Exemples :
- composants présentations / conteneurs
- feature-based architecture
- atomic design
- séparation pages / composants / services
- favoriser une interface réactive : les modifications de données doivent être répercutées automatiquement dans l'interface, sans rechargement complet de la page, lorsque cela est techniquement pertinent
- maintenir la cohérence entre l'état de l'interface et les données du backend après chaque opération

## Flux de données

Décrire le chemin général des données.

Exemple :

Utilisateur

↓

Composant

↓

Service frontend

↓

API Backend

↓

Mise à jour de l'état

↓

Affichage

## Principes d'organisation

Décrire les règles importantes.

Exemples :
- composants responsables uniquement de l'affichage
- logique métier limitée côté frontend
- services dédiés aux appels externes
- éviter les dépendances inutiles entre composants
- favoriser les composants réutilisables

## Gestion des dépendances

Décrire les dépendances autorisées.

Exemple :

Dépendances autorisées :

Composant → Service frontend → Base de donnée


Dépendances non autorisée :

Composant → Base de donnée