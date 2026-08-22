# Tests

## Stratégie

- Tests unitaires uniquement à ce jour, centrés sur les controllers.
- Les services et modèles Sequelize sont mockés (`vi.spyOn`) plutôt qu'exécutés contre une vraie base de données : les tests vérifient le comportement du controller (appels effectués, réponse HTTP renvoyée) de façon isolée.
- Pas de tests d'intégration ni E2E à ce jour.

## Outils

- Vitest (`vitest run` pour l'exécution, mode globals activé).

## Organisation

- Tous les tests sont dans `src/tests/`, un fichier par domaine fonctionnel : `authentication.test.ts`, `cursus.test.ts`, `email.test.ts`, `form.test.ts`, `lesson.test.ts`, `registration.test.ts`, `stripe.test.ts`, `user.test.ts`.
- Configuration dans `vitest.config.ts` à la racine : `include: ["src/tests/**/*.test.ts"]`, `environment: "node"`, `clearMocks`/`restoreMocks`/`unstubGlobals`/`unstubEnvs` activés automatiquement entre les tests.
- Convention de nommage : `<domaine>.test.ts`.

## Données de test

- Pas de base de données de test dédiée : les appels aux services et modèles sont mockés avec `vi.spyOn` et `vi.fn()`.
- Des objets de données factices sont construits directement dans chaque fichier de test (ex. `UserData` factice dans `authentication.test.ts`).
- Pour les tests manuels/exploratoires de l'application complète, des utilisateurs de démonstration sont fournis par les seeders (voir `README.md`, comptes `*.doe@test.com`).

## Politique de tests

À tester en priorité :
- les controllers exposant un comportement métier significatif (authentification, inscription, achats, paiement) ;
- la validation des formulaires (`form.service.ts`).

## Exécution

```bash
npm run test          # exécute l'ensemble des tests (vitest run)
```

Pas de script dédié pour un fichier unique ou pour la couverture à ce jour ; utiliser directement `npx vitest run <chemin-du-fichier>` si besoin.

## Invariants

- les tests doivent rester indépendants les uns des autres (mocks réinitialisés automatiquement entre chaque test via la configuration Vitest) ;
- un nouveau comportement dans un controller testé doit être accompagné d'un test ;
- éviter les dépendances externes non maîtrisées dans les tests (pas d'appel réseau réel à Stripe/EmailJS/la base de données).
