# Conventions Frontend

Ce fichier appartient au dépôt backend ; il résume les conventions du frontend (`knowledge-front`, dépôt Git séparé) utiles pour comprendre le contrat d'intégration. La documentation détaillée et faisant foi se trouve dans `knowledge-front/docs/conventions/frontend.md`.

## Composants

- composants standalone Angular uniquement (pas de `NgModule`) ;
- classes de composants nommées sans suffixe `Component` (ex. `Register`, `Login`, `Home`) ;
- composants de `pages/` : orchestration (appel des services, formulaires, affichage des erreurs) + affichage ;
- composants de `components/` : purement pilotés par `@Input()`/`@Output()`, aucun appel HTTP direct.

## Gestion de l'état

- pas de state manager externe (pas de NgRx) ;
- état partagé via des services Angular exposant des `BehaviorSubject`/`Observable` RxJS, jamais exposés en écriture hors du service.

## Réactivité

- après une mutation (POST/PATCH/DELETE), le service met à jour son `BehaviorSubject` local pour resynchroniser tous les composants abonnés, sans rechargement de page.

## Appels API

- tout appel HTTP passe par un service dédié (`authentication.service.ts`, `courses.service.ts`, `user-courses.ts`, `user.service.ts`) ; aucun composant n'appelle `HttpClient` directement ;
- un intercepteur fonctionnel unique (`authInterceptor`) gère l'ajout de l'en-tête `Authorization` sur chaque requête et la resynchronisation du token à chaque réponse (rolling token renvoyé par le backend).

## Formulaires

- Reactive Forms exclusivement (pas de template-driven forms) ;
- validation client via les `Validators` natifs Angular et des validators custom (mots de passe) ;
- toute règle de validation dupliquée entre backend (`form.service.ts` de `knowledge-back`) et frontend doit rester synchronisée manuellement ; la validation serveur fait foi.

## Interface utilisateur

- réutilisation systématique des composants existants pour les interactions récurrentes (ex. `WarningModal` pour toute confirmation, jamais `confirm()` natif) ;
- messages utilisateur toujours en français, alignés sur les messages `messageFront` renvoyés par le backend.

## Performances

- chargement eager des routes (pas de lazy loading à ce jour, voir `knowledge-front/docs/architecture.md`).

## Invariants

- aucun accès direct à la base de données ou contournement de l'API backend depuis le frontend ;
- toute donnée affichée provient d'un service frontend, jamais d'un appel HTTP fait dans un composant ;
- le contrat de réponse `ApiResponse<T>` doit rester synchronisé entre `knowledge-back/src/types/Interfaces.ts` et `knowledge-front/src/app/core/models/api-response.model.ts`.
