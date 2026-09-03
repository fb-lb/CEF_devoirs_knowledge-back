# Architecture

## Vue d'ensemble

Knowledge Learning est un site e-commerce de formations en ligne. Ce dépôt (`knowledge-back`) est le backend de l'application. Il est consommé par un frontend Angular versionné dans un dépôt Git séparé (`knowledge-front`, dossier voisin en local, documentation propre dans `knowledge-front/docs/`).

L'application est composée de :
- un frontend Angular (dépôt Git séparé, voir `frontend.md` pour le contrat d'intégration) ;
- une API backend Express/TypeScript (ce dépôt) ;
- une base de données relationnelle MySQL (données métier) ;
- une base de données MongoDB (logs applicatifs, voir `database.md`) ;
- des services externes : Stripe (paiement), EmailJS (envoi d'email).

## Objectifs d'architecture

- séparation des responsabilités (couche HTTP / logique métier / accès aux données) ;
- typage strict via TypeScript ;
- validation systématique des données entrantes ;
- traçabilité des créations/modifications de contenu (`createdBy` / `updatedBy` sur les entités de contenu).

## Architecture retenue

Architecture en couches de type MVC adaptée à une API REST : Route → Controller → Service → Model (Sequelize) → Base de données.

Il n'y a pas de couche "repository" séparée : les services appellent directement les modèles Sequelize.

## Découpage du projet

Backend (ce dépôt)
- expose l'API REST consommée par le frontend Angular
- authentification et autorisation (JWT, rôles `user`/`admin`)
- logique métier (formations, achats, progression)
- accès à la base de données via Sequelize
- intégration Stripe (paiement) et EmailJS (email transactionnel)

Database (MySQL, via XAMPP en local)
- persistance des utilisateurs, du contenu pédagogique et des achats

Database (MongoDB)
- persistance des logs applicatifs (authentification, audit, erreurs), voir `database.md`

Services externes
- Stripe : création de payment intents pour l'achat de cursus ou de leçons
- EmailJS : envoi de l'email de vérification de compte

## Communication

```
Frontend Angular
      ↓ HTTP (REST, JSON)
API Backend Express
      ↓ Sequelize (ORM)        ↓ Mongoose (ODM)
Base de données MySQL       Base de données MongoDB
(données métier)             (logs applicatifs)
```

- Frontend ↔ Backend : API REST, réponses JSON au format `{ success, message, data? }` (voir `types/Interfaces.ts` → `ApiResponse`).
- Authentification : token JWT transmis dans l'en-tête `Authorization: Bearer <token>` (pas de cookies pour l'auth applicative).
- Backend ↔ Stripe : SDK `stripe` côté serveur, création de payment intents.
- Backend ↔ EmailJS : SDK `@emailjs/nodejs`, envoi de l'email de vérification d'inscription.
- Backend ↔ MongoDB : SDK `mongoose` côté serveur, écriture/lecture des logs applicatifs.

## Dépendances autorisées

```
Route → Controller → Service → Model (Sequelize) → Base de données
```

- Les controllers ne doivent pas accéder directement aux modèles Sequelize : ils passent par les services.
- Les services centralisent la logique métier et les accès aux données.
- Les middlewares (`private.middleware.ts`, `uploadImage.middleware.ts`) interviennent avant les controllers, au niveau des routes.

Dépendances interdites :
- Frontend → Database (aucun accès direct, tout passe par l'API) ;
- Controller → Model directement (doit passer par un service).

Le même découpage Route → Controller → Service → Model s'applique aux logs, avec le modèle `Log` (Mongoose) à la place d'un modèle Sequelize (voir `backend.md` et `database.md`).

## Gestion de la configuration

- Les variables d'environnement sont définies dans `env/.env` (non versionné) et chargées via `env-cmd` (scripts `dev`, `migrate`, `seeders`).
- En production (déploiement Render), les variables sont injectées directement par la plateforme (scripts `migrate-render`, `seeders-render` sans `env-cmd`).
- `NODE_ENV` détermine notamment l'activation SSL sur la connexion MySQL (`src/config/database.ts`).
- Aucun secret n'est codé en dur dans le code source.

## Invariants d'architecture

- la logique métier appartient aux services, pas aux controllers ;
- le frontend ne contient aucune logique métier serveur (validation dupliquée côté frontend pour l'UX, mais la validation serveur fait foi) ;
- tout accès aux données passe par les modèles Sequelize (jamais de SQL brut) ;
- les erreurs applicatives utilisent la classe `AppError` (séparant message technique loggué et message destiné au frontend) ;
- les routes de contenu et d'achat sont protégées par les middlewares `privateUser` / `privateAdmin` selon le besoin.

## Performances

Pas d'objectif de montée en charge formalisé (projet pédagogique / petite structure). Bonnes pratiques appliquées :
- pagination non systématique (volumes de données réduits : catalogue de formations) ;
- utilisation des associations Sequelize (`include`) pour limiter les requêtes N+1.

## Évolutions prévues

Aucune évolution architecturale majeure documentée à ce jour. Les décisions techniques ponctuelles sont consignées dans `decisions.md`.
