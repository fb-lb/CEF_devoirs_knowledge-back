# Conventions Backend

## Contrôleurs

- extraient les données de la requête (`req.body`, `req.params`) et les typent explicitement dans des variables locales avant usage ;
- délèguent la validation métier des données à `form.service.ts` (fonctions `validate...Form`), jamais de validation ad hoc dans le controller ;
- délèguent toute la logique métier et l'accès aux données aux services ;
- récupèrent l'ID de l'utilisateur requêteur via `getRequestorId(req.headers.authorization?.split(" ")[1]!)` sur les routes protégées ;
- renvoient systématiquement une réponse au format `ApiResponse<T>` (`success`, `message`, `data?`).

## Services

- un service par domaine métier (`theme.service.ts`, `cursus.service.ts`, `lesson.service.ts`, `element.service.ts`, `user.service.ts`, `user-theme.service.ts`, `user-cursus.service.ts`, `user-lesson.service.ts`, `authentication.service.ts`, `token.service.ts`, `email.service.ts`, `form.service.ts`) ;
- accès aux données directement via les modèles Sequelize (pas de couche repository) ;
- chaque fonction exportée est documentée en JSDoc (description, `@param`, `@returns`, `@throws`), utilisé pour générer la documentation TypeDoc.

## Accès aux données

- utiliser exclusivement les modèles Sequelize (`Model.findAll`, `findByPk`, `create`, `update`, `destroy`) ;
- utiliser `include` avec les alias définis dans `databaseAssociations.ts` pour les jointures, plutôt que des requêtes séparées en boucle quand c'est possible ;
- ne jamais écrire de requête SQL brute.

## Transactions

Aucune transaction Sequelize n'est utilisée à ce jour dans le code, y compris pour des séquences d'écritures multi-tables (ex. suppression en cascade de `user_cursus`/`user_lesson` lors de la suppression d'un cursus). Ce point n'est pas une convention établie mais un état de fait à garder à l'esprit : une évolution touchant ces séquences d'écriture est un bon candidat pour introduire des transactions afin de garantir l'atomicité.

## Gestion des erreurs

- toute erreur métier ou technique prévisible est levée via `new AppError(status, message, messageFront, { cause? })` ;
- `message` est un message technique destiné aux logs serveur (inclut le nom de la fonction et le contexte de l'échec) ;
- `messageFront` est le message affiché à l'utilisateur, toujours en français, jamais de détail technique ;
- les erreurs sont interceptées et journalisées de façon centralisée dans le middleware d'erreur de `app.ts`, jamais gérées ponctuellement dans un controller (hors cas de nettoyage de fichier uploadé en cas d'échec, voir `element.controller.ts`).

## Validation

- toute donnée entrante est validée par une fonction dédiée de `form.service.ts` (une fonction par formulaire : `validateRegistrationForm`, `validateLoginForm`, `validateAddThemeForm`, etc.) ;
- ne jamais faire confiance à une validation déjà effectuée côté frontend ;
- toute règle de validation modifiée côté backend doit être répercutée côté frontend (et inversement), un commentaire explicite le rappelle dans le modèle `User.ts`.

## Journalisation

- `console.error` pour les erreurs interceptées par le middleware global (avec `status`, `name`, `message`, `stack`, `cause`) ;
- `morgan` (mode `dev`) pour les logs d'accès HTTP ;
- ne jamais journaliser un mot de passe, un token ou une clé secrète.

## Performances

- utiliser `include` (associations Sequelize) plutôt que des requêtes en boucle quand la structure du besoin le permet ;
- limiter les recalculs redondants dans les cascades de validation (`checkUserCursusValidation`/`checkUserThemeCertification` ne réécrivent en base que si la valeur change réellement).

## Invariants

- aucune logique métier dans les contrôleurs ;
- toutes les entrées sont validées via `form.service.ts` ;
- les erreurs sont gérées de manière centralisée via `AppError` ;
- aucune donnée sensible n'est exposée dans `messageFront` ni dans les réponses API.
