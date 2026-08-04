# Conventions communes

## Langue

- code (noms de variables, fonctions, fichiers) : anglais ;
- commentaires et JSDoc : anglais ;
- messages destinés à l'utilisateur final (`messageFront` d'`AppError`, `message` des réponses `ApiResponse`) : français ;
- documentation du projet (`docs/`, `CLAUDE.md`) : français ;
- messages de commit : anglais historiquement (avant l'intégration de la convention Conventional Commits), format Conventional Commits pour les nouveaux commits (voir `docs/conventions/git.md`).

## Nommage

- voir `docs/conventions/typescript.md` (code) et `docs/conventions/database.md` (base de données) pour le détail par domaine ;
- principe général : noms explicites plutôt que des abréviations ambiguës (`requestorId` plutôt que `reqId`, `checkUserThemeCertification` plutôt que `checkCert`).

## Organisation des fichiers

- un fichier = une responsabilité principale (un controller par domaine métier, un service par domaine métier, un modèle par entité) ;
- fichiers regroupés par rôle technique (`controllers/`, `services/`, `models/`, `routes/`) plutôt que par fonctionnalité transverse ;
- pas de fichier "fourre-tout" (`utils.ts` générique) : `src/utils/AppError.ts` est le seul fichier utilitaire, dédié à une seule classe.

## Commentaires et documentation du code

- documenter le comportement public via JSDoc systématique (description, `@route` pour les controllers, `@param`, `@returns`, `@throws`) — cette documentation alimente directement la génération TypeDoc (`npm run docs`) ;
- éviter les commentaires redondants avec un nom de fonction/variable déjà explicite ;
- commenter le pourquoi d'un choix non évident (ex. le commentaire dans `User.ts` rappelant de synchroniser les validateurs frontend/backend en cas de modification des contraintes du modèle).

## Formatage

- pas d'outil de formatage automatique configuré dans ce dépôt (pas d'ESLint ni de Prettier, contrairement au frontend `knowledge-front` qui utilise Prettier) ;
- encodage UTF-8, fin de ligne standard de l'éditeur (pas de règle `.editorconfig` définie) ;
- indentation à 2 espaces, cohérente dans l'ensemble du code source observé.

## Gestion des dates et formats

- timestamps Sequelize (`createdAt`/`updatedAt`) au format natif `Date`, convertis en chaîne localisée française lors de la sérialisation vers les DTO (`toLocaleString('fr-FR', { timeZone: 'Europe/Paris' })`, voir par exemple `user-theme.service.ts`) ;
- fuseau horaire applicatif : `Europe/Paris`.

## Principes généraux

- privilégier la simplicité et éviter la duplication (ex. `form.service.ts` centralise l'ensemble des validateurs plutôt que de les disperser dans chaque controller) ;
- préférer des solutions explicites (types explicites, JSDoc complet, messages d'erreur différenciés technique/utilisateur) ;
- ne pas introduire de complexité ou de dépendance sans besoin avéré (ex. pas de state manager, pas de couche repository, pas de framework de validation tiers — `form.service.ts` maison suffit au périmètre du projet).
