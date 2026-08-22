# Décisions techniques

Ce document présente les choix techniques importants du projet et leurs justifications.

Les détails d'implémentation sont documentés dans les fichiers concernés.

## Format des décisions

### [Titre de la décision]

Date :
[YYYY-MM-DD]

Statut :
- Acceptée
- Remplacée
- En réflexion

### Contexte

Quel problème ou besoin a conduit à cette décision ?

### Décision

Quel choix a été retenu ?

### Alternatives étudiées

Quelles autres solutions ont été envisagées ?

### Raisons du choix

Pourquoi cette solution a été préférée ?

### Conséquences

Quels sont les avantages, contraintes ou compromis induits ?

## Décisions

### Authentification par en-tête Authorization plutôt que cookie

Date :
2025-12-24

Statut :
Acceptée

Contexte :

La première version de l'authentification transmettait le token JWT via un cookie envoyé au login (voir commit `9651655`, "Add login route that check email, password and send a cookie token to the client").

Décision :

Remplacement du cookie par un token transmis dans l'en-tête `Authorization: Bearer <token>`, à la fois en entrée (requête du client) et en sortie (le backend renvoie systématiquement un token rafraîchi dans l'en-tête `Authorization` de la réponse). Ajout d'un second secret JWT dédié (`JWT_IMAGE_SECRET`) pour l'accès aux images protégées (voir commit `b39377c`, "Refactor authentication from token cookie to token authorization header, add specific token for images").

Alternatives étudiées :
- conserver l'authentification par cookie de session.

Raisons du choix :

Simplifie la gestion CORS entre deux origines distinctes (frontend Angular hébergé séparément du backend) sans avoir à gérer les attributs `SameSite`/`Secure` d'un cookie cross-site, et rend le mécanisme CSRF plus simple à raisonner (voir décision suivante).

Conséquences :
- le frontend doit stocker le token côté client (`localStorage`) et le renvoyer explicitement à chaque requête ;
- nécessité d'une protection CSRF applicative dédiée, un cookie n'étant plus automatiquement rejoué par le navigateur.

### Protection CSRF applicative maison (vérification d'origine)

Date :
2025-12-08

Statut :
Acceptée

Contexte :

L'authentification ne reposant plus sur un cookie (voir décision précédente), le risque CSRF classique est réduit mais pas nul (l'en-tête `Authorization` n'est pas rejoué automatiquement par le navigateur, mais une défense en profondeur reste utile). Voir commit `9e4504c`, "Add CSRF protection middleware in app.ts".

Décision :

Middleware Express custom qui rejette (403) toute requête non-GET dont l'en-tête `Origin` ne correspond pas exactement à `FRONT_URL`.

Alternatives étudiées :
- librairie CSRF basée sur un token à double soumission (nécessite un cookie).

Raisons du choix :

Solution légère, sans dépendance supplémentaire, cohérente avec une authentification sans cookie.

Conséquences :
- toute requête de mutation doit provenir explicitement de l'origine déclarée en configuration (`FRONT_URL`) ;
- les tests/outils (Postman, etc.) doivent définir l'en-tête `Origin` pour passer ce contrôle en environnement protégé.

### Sequelize comme ORM, sans couche repository

Date :
Non renseignée précisément (choix initial du projet)

Statut :
Acceptée

Contexte :

Le projet a besoin d'un accès typé et sécurisé (paramétrage automatique, protection contre les injections SQL) à une base MySQL, avec un outillage de migrations versionnées.

Décision :

Utilisation de Sequelize (+ `sequelize-cli`) comme ORM, avec les services qui appellent directement les modèles Sequelize (pas de couche `repository` intermédiaire).

Alternatives étudiées :
- Prisma ;
- TypeORM.

Raisons du choix :

Maturité de l'écosystème Sequelize avec MySQL, CLI de migrations/seeders intégrée, typage suffisant pour la taille du projet.

Conséquences :
- pas d'abstraction supplémentaire entre services et ORM (couplage direct aux modèles Sequelize) ;
- toute évolution de schéma passe obligatoirement par une migration versionnée.

### Achat à l'unité via Stripe Payment Intents, sans panier

Date :
Non renseignée précisément (choix initial du projet)

Statut :
Acceptée

Contexte :

Le catalogue est structuré en thème/cursus/leçon, chaque niveau ayant potentiellement un prix (cursus, leçon). Le besoin fonctionnel est de permettre l'achat d'un cursus ou d'une leçon individuellement.

Décision :

Chaque achat déclenche la création d'un unique Stripe Payment Intent (`type: 'cursus' | 'lesson'`, montant recalculé côté serveur depuis le prix en base). Pas de panier multi-articles.

Alternatives étudiées :
- panier permettant de grouper plusieurs achats en un seul paiement.

Raisons du choix :

Simplicité d'implémentation adaptée au périmètre du projet (catalogue de formations, pas de volumétrie nécessitant un panier).

Conséquences :
- un utilisateur souhaitant acheter plusieurs cursus doit effectuer plusieurs paiements distincts ;
- la logique de propagation d'accès (cascade cursus → leçons → thème) reste simple à raisonner, un seul achat à la fois.

### Hébergement backend sur Render

Date :
Non renseignée précisément

Statut :
Acceptée

Contexte :

Le projet nécessite un hébergement pour l'API Express et la base MySQL en production, avec un coût adapté à un projet pédagogique.

Décision :

Déploiement du backend sur Render (scripts `migrate-render` / `seeders-render` sans `env-cmd`, variables d'environnement injectées directement par la plateforme). Le frontend Angular est déployé séparément sur GitHub Pages.

Alternatives étudiées :

Non documentées.

Raisons du choix :

Non documentées précisément ; cohérent avec un hébergement gratuit/à faible coût adapté à un projet pédagogique.

Conséquences :
- deux processus de déploiement indépendants (backend sur Render, frontend sur GitHub Pages) ;
- l'URL du backend en production (`https://knowledge-back-jrzv.onrender.com`) doit être tenue à jour dans la configuration du frontend (`environment.prod.ts`).
