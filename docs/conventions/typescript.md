# Conventions TypeScript

## Configuration

`tsconfig.json` active `strict: true`, `noImplicitAny`, `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`, `isolatedModules`, `moduleResolution: NodeNext`. Modules ESM natifs (`"type": "module"` dans `package.json`, imports relatifs avec extension `.js` même en TypeScript, ex. `import { User } from "./User.js"`).

## Nommage

- variables et fonctions : camelCase (`getRequestorId`, `validateLoginForm`) ;
- classes et interfaces : PascalCase (`AppError`, `UserData`, `ApiResponse<T>`) ;
- fichiers : `<domaine>.<rôle>.ts` en kebab-case/point (`authentication.controller.ts`, `token.service.ts`, `User-Cursus.ts` pour les modèles composés) ;
- constantes de rôle/type : chaînes littérales typées en union (`("user" | "admin")[]`, `"text" | "image"`) plutôt que des enums.

## Types

- une interface `XAttributes` par modèle Sequelize, dérivée en `XCreationAttributes` via `Optional<XAttributes, "champ1" | "champ2">` pour les champs optionnels à la création (`id`, timestamps, associations) ;
- les interfaces de DTO/réponse API sont centralisées dans `src/types/Interfaces.ts` (`ApiResponse<T>`, `UserData`, `TokenPayload`, etc.) ;
- éviter `any` ; utilisé ponctuellement uniquement dans les blocs `catch (error: any)` pour accéder à `error.cause`/`error.message` sans complexifier le typage des erreurs.

## Fonctions

- une fonction exportée par responsabilité, documentée en JSDoc complet (description, `@param`, `@returns`, `@throws`) ;
- signature explicite du type de retour sur toutes les fonctions publiques (controllers, services).

## Asynchronisme

- `async/await` systématique pour les fonctions de service et de controller interagissant avec la base de données ou des services externes ;
- gestion des erreurs via `try/catch` avec relance systématique en `AppError` (`if (error instanceof AppError) throw error; throw new AppError(...)`).

## Gestion des erreurs

- toujours lever une instance d'`AppError` (jamais une chaîne de caractères ou une `Error` générique) pour toute erreur prévisible ;
- `AppError` porte `status`, `message` (technique) et `messageFront` (utilisateur), avec un `cause` optionnel pour chaîner l'erreur d'origine.

## Imports

- imports relatifs avec extension `.js` explicite (résolution ESM `NodeNext`), pas d'alias de chemin configuré ;
- import des types Express (`Request`, `Response`, `NextFunction`) explicitement typés sur chaque fonction de controller/middleware.

## Invariants

- `strict` reste activé dans `tsconfig.json` ;
- pas de `any` non justifié ;
- toute fonction publique (controller, service) documente son comportement en JSDoc, y compris les cas d'erreur (`@throws`).
