# Sécurité

## Authentification

- JWT (`jsonwebtoken`), transmis par le client dans l'en-tête `Authorization: Bearer <token>` (pas de cookie de session pour l'authentification applicative).
- Le payload du token (`TokenPayload`) contient `id` et `roles` de l'utilisateur.
- À chaque requête authentifiée, un nouveau token est régénéré et renvoyé dans l'en-tête `Authorization` de la réponse (rolling token), via `generateUserToken` dans `token.service.ts`.
- Deux secrets JWT distincts sont utilisés (`JWT_USER_SECRET` pour l'authentification utilisateur, `JWT_IMAGE_SECRET` pour sécuriser l'accès aux images), limitant l'impact d'une éventuelle fuite de l'un des deux.
- Le token d'inscription (vérification d'email) est un token JWT à courte durée de vie (24h, voir `generateUserToken(user, 24)` dans `registration.controller.ts`).
- Mots de passe hashés avec `bcrypt` avant stockage (jamais en clair).

## Autorisation

- Modèle basé sur les rôles : `user` et `admin` (colonne `roles`, tableau JSON sur le modèle `User`).
- Deux middlewares dédiés (`src/middlewares/private.middleware.ts`) :
  - `privateUser` : vérifie que le token est valide et correspond à un utilisateur enregistré ;
  - `privateAdmin` : vérifie en plus que l'utilisateur possède le rôle `admin`.
- Vérification effective de l'autorisation via `checkAuthorization` (`authentication.service.ts`), qui recharge l'utilisateur en base plutôt que de faire confiance uniquement au contenu du token.
- Répartition observée dans les routes (`src/routes/*.ts`) :
  - consultation du catalogue (`GET .../all`) : publique, sans middleware ;
  - création/modification/suppression/réorganisation de contenu pédagogique : `privateAdmin` ;
  - achat, consultation de ses propres achats, validation de ses propres leçons : `privateUser` ;
  - validation d'un cursus, certification d'un thème, listing global des achats : `privateAdmin`.
- `getRequestorId` (`token.service.ts`) utilise `jwt.decode` (sans vérification de signature) pour extraire l'ID depuis le token déjà présent dans l'en-tête : cette fonction n'est sûre que parce qu'elle est utilisée dans des controllers dont la route est déjà passée par `privateUser`/`privateAdmin`, qui ont vérifié la signature au préalable. Elle ne doit jamais être utilisée seule sur une route non protégée.
- **Point d'attention** : la route `GET /api/utilisateurs/isVerified` (`src/routes/users.ts`) n'est protégée par aucun middleware (`privateUser`/`privateAdmin`) alors que son controller appelle `getRequestorId` sur le token fourni. Comme `getRequestorId` ne vérifie pas la signature du token, un attaquant pourrait forger un JWT non signé valide (payload arbitraire contenant un `id`) pour interroger le statut de vérification d'un compte quelconque. Cette route mériterait a minima le middleware `privateUser`.

## Gestion des secrets

- Secrets stockés dans des variables d'environnement, chargées depuis `env/.env` (non versionné, exclu par `.gitignore`) via `env-cmd` en local.
- En production, les variables sont injectées par la plateforme d'hébergement (Render).
- Secrets concernés : identifiants base de données, `JWT_USER_SECRET`, `JWT_IMAGE_SECRET`, clés EmailJS, clés Stripe (publique et secrète).
- Ne jamais committer le dossier `env/` ni sa clé `.env`.

## Données sensibles

- Mots de passe utilisateurs : hashés (`bcrypt`), jamais journalisés ni renvoyés dans les réponses API.
- Clés Stripe et EmailJS : utilisées uniquement côté serveur pour les clés secrètes/privées.
- Emails : utilisés pour l'authentification et la vérification de compte.

## Communications

- CORS restreint à une seule origine autorisée (`FRONT_URL`), avec une liste explicite de méthodes et d'en-têtes autorisés (`app.ts`).
- Protection CSRF applicative maison : toute requête non-GET dont l'en-tête `Origin` ne correspond pas à `FRONT_URL` est rejetée (403) — voir le middleware dédié dans `app.ts`.
- `credentials: false` en CORS : aucun cookie n'est utilisé pour transporter l'authentification, ce qui limite la surface CSRF classique basée sur les cookies (le mécanisme ci-dessus reste une défense en profondeur).

## Journalisation

- Logs HTTP via `morgan` (mode `dev`).
- Les erreurs applicatives (`AppError`) et les erreurs inattendues sont journalisées côté serveur avec leur détail technique (`status`, `name`, `message`, `stack`, `cause`), jamais renvoyées telles quelles au client.
- Aucun mot de passe ni secret n'est journalisé.

## Invariants

Ne jamais :
- exposer un secret (toujours via variables d'environnement) ;
- stocker un mot de passe en clair (toujours hashé via `bcrypt`) ;
- contourner les middlewares `privateUser` / `privateAdmin` sur une route qui doit être protégée ;
- renvoyer le détail technique d'une erreur (`message`, `stack`) au frontend — seul `messageFront` est exposé ;
- construire une requête SQL manuellement (toujours passer par Sequelize).

Toujours :
- valider les données entrantes côté serveur, même si une validation existe déjà côté frontend ;
- vérifier l'origine des requêtes de mutation (protection CSRF applicative).
