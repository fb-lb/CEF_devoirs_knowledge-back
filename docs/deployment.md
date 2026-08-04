# Déploiement

## Environnements

- Développement : local, base MySQL servie par XAMPP, variables chargées depuis `env/.env` via `env-cmd` (`npm run dev`, avec `tsx --watch` et l'inspecteur Node sur le port 9229).
- Production : backend hébergé sur Render (URL observée côté frontend : `https://knowledge-back-jrzv.onrender.com`), variables d'environnement injectées directement par la plateforme.

Pas d'environnement de recette/préproduction distinct documenté.

## Variables d'environnement

Définies dans `env/.env` en local (non versionné, chargé via `env-cmd -f ./env/.env`). Liste complète documentée dans `README.md` :

- `NODE_ENV`, `FRONT_URL`, `FRONT_BASE_HREF`, `BACK_URL`
- `DATABASE_NAME`, `DATABASE_USERNAME`, `DATABASE_PASSWORD`, `DATABASE_HOST`, `DATABASE_PORT`, `DATABASE_URL`
- `EMAILJS_PUBLIC_API_KEY`, `EMAILJS_PRIVATE_API_KEY`, `EMAILJS_SERVICE_ID`, `EMAILJS_TEMPLATE_ID`
- `JWT_USER_SECRET`, `JWT_IMAGE_SECRET`
- `PORT`
- `STRIPE_PUBLIC_KEY`, `STRIPE_SECRET_KEY`

Il n'existe pas de fichier `.env.example` versionné ; le `README.md` sert actuellement de référence pour la liste des variables attendues.

En production (Render), les mêmes variables sont injectées directement par la plateforme (pas de fichier `.env`, scripts `migrate-render`/`seeders-render` sans `env-cmd`).

## Pipeline

Pas de pipeline CI/CD automatisé (aucun dossier `.github/workflows`, aucune configuration CI trouvée). Le déploiement sur Render s'appuie a priori sur son intégration Git native (build à partir du dépôt), sans étape de test automatisée avant déploiement.

Étapes de mise en production manuelles déduites des scripts disponibles :
1. `npm install`
2. `npm run build` (compilation TypeScript → `dist/`)
3. `npm run migrate-render` (application des migrations Sequelize sur la base de production)
4. `npm run seeders-render` (uniquement lors de l'initialisation d'un nouvel environnement, pas à chaque déploiement)
5. `npm start` (`node ./dist/bin/www`)

## Stratégie de déploiement

Non formalisée : pas de validation manuelle ni de fenêtre de déploiement documentée. Projet à échelle pédagogique.

## Rollback

Non documenté. Aucune procédure de restauration automatisée n'est en place ; un retour arrière nécessiterait un redéploiement manuel d'une version antérieure et, si nécessaire, l'exécution manuelle de `npm run migrate-undo` (en adaptant la variante `-render` sans `env-cmd` pour la production).

## Dépendances externes

- Base de données MySQL (obligatoire, tous environnements).
- Stripe (obligatoire pour toute fonctionnalité d'achat).
- EmailJS (obligatoire pour l'envoi de l'email de vérification de compte à l'inscription).
- Frontend Angular, hébergé séparément (GitHub Pages), consommant cette API via `FRONT_URL`/`BACK_URL`.

Pas de stockage objet externe (les images uploadées sont stockées sur le système de fichiers local du serveur, `uploads/elements_images/`), pas de cache Redis, pas de fournisseur OAuth.

## Invariants

- ne jamais commiter le dossier `env/` ni son fichier `.env` ;
- toute migration de schéma doit être appliquée (`migrate-render`) avant que le code qui en dépend soit mis en production ;
- les secrets de production (Stripe, JWT, base de données, EmailJS) sont gérés exclusivement via les variables d'environnement de la plateforme d'hébergement.
