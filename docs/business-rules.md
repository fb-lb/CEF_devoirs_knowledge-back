# Règles métiers

Ce document décrit les règles fonctionnelles importantes du projet Knowledge Learning, indépendamment de l'implémentation technique.

## Concepts métier

### Utilisateur (`User`)

Description :

Personne inscrite sur la plateforme, pouvant acheter et suivre des formations. Peut avoir le rôle `user` (par défaut) et/ou `admin`.

Attributs importants :
- `email` (unique, sert d'identifiant de connexion)
- `password` (hashé)
- `roles` (`user`, `admin`)
- `isVerified` (compte activé après vérification de l'email)

### Thème (`Theme`)

Description :

Catégorie de haut niveau du catalogue, regroupant plusieurs cursus. N'a pas de prix propre : son acquisition découle de l'achat de tous ses cursus, et sa **certification** découle de la validation de tous ses cursus.

### Cursus (`Cursus`)

Description :

Parcours de formation payant, rattaché à un thème, composé de plusieurs leçons.

Attributs importants :
- `price`
- `theme_id`

### Leçon (`Lesson`)

Description :

Unité pédagogique payante, rattachée à un cursus, composée d'éléments de contenu (texte, image).

Attributs importants :
- `price`
- `cursus_id`

### Élément (`Element`)

Description :

Bloc de contenu d'une leçon, de type `text` (avec un sous-type `title1`/`title2`/`title3`/`paragraph`) ou `image`. Chaque élément possède exactement un contenu associé (`Text` ou `Image`).

## Règles générales

### Règle : achat en cascade

Description :

L'achat propage l'accès vers le haut de la hiérarchie :
- l'achat d'une **leçon** crée un `user_lesson`, et crée (ou réutilise) le `user_cursus` du cursus parent ainsi que le `user_theme` du thème parent ;
- l'achat d'un **cursus** crée un `user_cursus`, un `user_lesson` pour **chacune** de ses leçons, et le `user_theme` du thème parent.

Un achat déjà existant n'est pas dupliqué (vérification préalable avant création).

Impact :
- backend (`user-cursus.controller.ts` → `addUserCursusController`, `user-lesson.controller.ts` → `addUserLessonController`)
- base de données (`user_theme`, `user_cursus`, `user_lesson`)

### Règle : validation en cascade à trois niveaux, avec des acteurs différents

Description :

Le suivi de progression repose sur trois indicateurs booléens distincts, chacun avec sa propre logique de calcul et un acteur différent pour le déclenchement :

| Niveau | Colonne | Qui déclenche | Condition pour passer à `true` |
|---|---|---|---|
| Leçon | `user_lesson.isValidated` | **L'utilisateur lui-même** (`PATCH /api/user-lesson/:id`, `privateUser`) | Aucune précondition : l'utilisateur déclare la leçon terminée |
| Cursus | `user_cursus.isValidated` | **Un administrateur** (`PATCH /api/user-cursus/:id`, `privateAdmin`) | L'utilisateur doit avoir acheté (accès à) toutes les leçons du cursus |
| Thème | `user_theme.isCertified` | **Un administrateur** (`PATCH /api/user-theme/:id`, `privateAdmin`) | L'utilisateur doit avoir acheté (accès à) tous les cursus du thème |

Chaque changement se propage automatiquement dans les deux sens :
- **Vers le haut** : valider une leçon recalcule automatiquement `isValidated` du cursus parent (`true` seulement si l'utilisateur a acheté ET validé toutes les leçons du cursus), ce qui recalcule à son tour `isCertified` du thème parent (`true` seulement si toutes les cursus du thème sont validés).
- **Vers le bas** : lorsqu'un administrateur certifie/décertifie un thème, la certification est répercutée de force sur tous les `user_cursus` de ce thème, et donc sur tous les `user_lesson` de ces cursus (`updateUserTheme`, `updateUserCursus`). À l'inverse, dévalider un cursus ne force pas la dévalidation de ses leçons (seule la validation `true` déclenche la propagation descendante, cf. `updateUserCursus`/`updateUserTheme`).

Impact :
- backend (`user-theme.service.ts`, `user-cursus.service.ts`, `user-lesson.service.ts` : `checkUserThemeCertification`, `checkUserCursusValidation`, `updateUserTheme`, `updateUserCursus`, `updateUserLesson`)

### Règle : recalcul automatique lors de l'évolution du catalogue

Description :

Quand un administrateur **ajoute** un cursus à un thème (ou une leçon à un cursus), la validation/certification de tous les utilisateurs ayant déjà de l'accès à ce thème/cursus est recalculée : comme ils n'ont pas encore acheté le nouveau contenu, leur validation repasse automatiquement à `false` en cascade.

Quand un administrateur **supprime** un thème, un cursus ou une leçon, les associations d'achat correspondantes (`user_theme`/`user_cursus`/`user_lesson`) sont supprimées manuellement en cascade (il n'y a pas de `ON DELETE CASCADE` au niveau de la base de données) :
- supprimer un thème supprime tous ses `user_theme` (et, en cascade applicative, les `user_cursus`/`user_lesson` associés) ;
- supprimer un cursus supprime tous ses `user_cursus` (et les `user_lesson` de ses leçons), puis recalcule la certification du thème parent pour chaque utilisateur concerné ;
- supprimer une leçon supprime tous ses `user_lesson`, puis recalcule la validation du cursus parent et la certification du thème parent.

Lorsqu'un utilisateur perd son dernier `user_cursus` dans un thème, le `user_theme` correspondant est supprimé (l'utilisateur ne possède plus aucun contenu du thème).

Impact :
- backend (`theme.controller.ts`, `cursus.controller.ts`, `lesson.controller.ts` : gestion explicite de la suppression/recalcul en cascade, appelée à chaque mutation de catalogue)
- base de données (pas de cascade native ; toute la cohérence est assurée par la couche service)

### Règle : achat à l'unité, pas de panier

Description :

Un utilisateur peut acheter un thème (via ses cursus), un cursus ou une leçon indépendamment ; il n'existe pas de panier multi-articles. Chaque paiement Stripe correspond à un seul élément de type `cursus` ou `lesson` (`stripe.controller.ts`, propriété `type` du corps de requête). Le montant facturé est toujours recalculé côté serveur à partir du prix stocké en base, jamais accepté depuis le corps de la requête.

Impact :
- backend, frontend, paiement (Stripe)

### Règle : compte non vérifié = accès limité

Description :

Un utilisateur doit valider son adresse email (`isVerified = true`) via le lien reçu par email avant de pouvoir se connecter et acheter du contenu.

Impact :
- backend (`registration.controller.ts` → `checkEmail`, `GET /api/utilisateurs/isVerified`)

### Règle : catalogue public en lecture, gestion réservée aux administrateurs

Description :

La consultation du catalogue (liste des thèmes/cursus/leçons) est accessible sans authentification (`GET .../all` non protégé). En revanche, la création, modification, suppression et réorganisation (`up`/`down`) de tout contenu pédagogique sont réservées aux administrateurs. La consultation du détail d'un cursus (`GET /api/content/cursus/:id`) requiert en revanche d'être connecté (`privateUser`).

Impact :
- backend (routes `src/routes/theme.ts`, `cursus.ts`, `lesson.ts`, `element.ts`)

## Cycle de vie des entités

### Inscription utilisateur

Créé (compte créé, email non vérifié)
→ Vérifié (email validé via token, `isVerified = true`)
→ Actif (peut se connecter et acheter)

### Progression d'un utilisateur sur un cursus

Non acquis
→ Acquis (leçons et cursus achetés, `isValidated = false`)
→ Leçons validées par l'utilisateur au fur et à mesure (`user_lesson.isValidated = true`)
→ Cursus validé par un administrateur une fois toutes les leçons validées et achetées (`user_cursus.isValidated = true`)
→ Thème certifié par un administrateur une fois tous les cursus du thème validés (`user_theme.isCertified = true`)

## Permissions et rôles métier

### Administrateur (`admin`)

Peut :
- gérer le contenu pédagogique (créer/modifier/supprimer/réordonner thèmes, cursus, leçons, éléments) ;
- gérer les utilisateurs (lister, modifier, supprimer) ;
- valider un cursus ou certifier un thème pour un utilisateur ;
- consulter l'ensemble des associations utilisateur/contenu (`GET .../all` sur `user-theme`, `user-cursus`, `user-lesson`).

### Utilisateur standard (`user`)

Peut :
- consulter le catalogue public et le détail d'un cursus une fois connecté ;
- acheter des thèmes/cursus/leçons ;
- consulter ses propres achats et sa progression ;
- valider lui-même une leçon comme terminée (mais pas un cursus ni un thème).

## Cas particuliers

- Un utilisateur peut avoir plusieurs rôles simultanément (`roles` est un tableau : un compte peut être `user` et `admin`).
- Les entités de contenu conservent une référence à l'utilisateur (généralement un admin) qui les a créées/modifiées (`createdBy` / `updatedBy`), pour la traçabilité.
- Un administrateur qui ajoute du nouveau contenu à un thème/cursus déjà (partiellement) certifié/validé pour des utilisateurs fait perdre automatiquement cette certification/validation à ces utilisateurs, sans notification explicite documentée.

## Règles à ne pas casser

- un utilisateur non vérifié ne doit pas pouvoir se connecter ni acheter de contenu ;
- l'achat d'une leçon ou d'un cursus doit toujours propager l'accès vers le haut de la hiérarchie (cursus/thème parents) ;
- un `user_cursus` ne peut être validé par un admin que si l'utilisateur a effectivement acheté toutes les leçons du cursus correspondant ; un `user_theme` ne peut être certifié que si l'utilisateur a acheté tous les cursus du thème ;
- seul l'utilisateur lui-même peut valider une leçon lui appartenant ; seul un administrateur peut valider un cursus ou certifier un thème ;
- la suppression d'un contenu pédagogique doit toujours entraîner la suppression des associations d'achat correspondantes et le recalcul de la validation/certification en amont ;
- le prix facturé via Stripe doit toujours provenir de la base de données (`cursus.price` / `lesson.price`), jamais d'une valeur transmise par le client.
