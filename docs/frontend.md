# Frontend

## Imports

Lire :
- `docs/conventions/frontend.md`
- `docs/conventions/typescript.md`

## Vue d'ensemble

Le frontend n'appartient pas à ce dépôt : il vit dans le dépôt séparé `knowledge-front` (dossier voisin `../knowledge-front` en local), qui possède sa propre documentation complète dans `knowledge-front/docs/`. Cette section documente uniquement ce que le backend doit savoir de son consommateur pour maintenir un contrat d'API cohérent.

Le frontend est responsable de :
- l'interface utilisateur du catalogue de formations et du parcours d'achat ;
- l'authentification (stockage du token, guards de routes) et son rafraîchissement (rolling token) ;
- l'affichage des messages d'erreur renvoyés par le backend (`ApiResponse.message`) ;
- l'intégration du paiement via Stripe Elements.

## Stack technique

### Framework

Angular 22 (composants standalone uniquement, pas de `NgModule`)

### Langage

TypeScript (mode strict)

### Style

SCSS par composant, pas de framework UI (composants maison), FontAwesome pour les icônes

### Outils principaux

- gestion d'état : services Angular exposant des `BehaviorSubject`/`Observable` RxJS (pas de state manager externe type NgRx)
- requêtes API : `HttpClient` centralisé dans des services dédiés, avec un intercepteur fonctionnel (`authInterceptor`)
- formulaires : Reactive Forms (`FormGroup`/`FormControl`), validators custom pour les mots de passe
- composants UI : composants réutilisables maison (`warning-modal`, `stripe-payment`, etc.)

## Contrat d'API avec le backend

- Toutes les réponses suivent le format `ApiResponse<T>` (`success`, `message`, `data?`), défini côté frontend dans `core/models/api-response.model.ts` en miroir de `types/Interfaces.ts` côté backend.
- Authentification : le frontend stocke le token complet (`Bearer <token>`) dans `localStorage` et le renvoie via l'en-tête `Authorization`. Comme le backend régénère un token à chaque requête authentifiée, l'intercepteur frontend relit l'en-tête `Authorization` de chaque réponse pour resynchroniser le token stocké (avec un anti-rafraîchissement de 2 secondes côté client).
- Guards de routes : `userAuthGuard` et `adminAuthGuard` n'utilisent pas seulement la présence locale du token — ils appellent réellement `GET /api/authentification/user` ou `GET /api/authentification/admin` pour vérifier l'autorisation côté serveur avant d'autoriser la navigation.
- Toute modification du format des réponses, des routes, ou des règles de validation côté backend (`form.service.ts`) doit être répercutée côté frontend (validators Reactive Forms, `form.service.ts` frontend) : ces deux couches de validation ne sont pas générées automatiquement l'une depuis l'autre.

## Principes d'organisation (frontend)

- composants responsables uniquement de l'affichage et de l'orchestration de leur page ;
- aucun composant n'appelle `HttpClient` directement : tout appel réseau passe par un service dédié ;
- après une mutation, le service met à jour son `BehaviorSubject` local plutôt que de forcer un rechargement de page.

## Gestion des dépendances

Dépendances autorisées :

Composant (page) → Service frontend → `HttpClient` (+ intercepteur) → API Backend

Dépendances non autorisées :

Composant → Base de données (aucun accès direct, tout passe par l'API backend)
