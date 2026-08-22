# Conventions Git

## Stratégie de branches

GitHub Flow : une branche par évolution, créée depuis `main`, fusionnée dans `main` via Pull Request. Pas de branche de développement long-terme (`develop`) ni de branches de release.

## Nommage des branches

`feature/<description-courte>/<numéro-issue>`, ex. `feature/authentication_refactoring/37`, `feature/add_unit_tests_vitest/23`. Ce schéma est utilisé pour toute évolution observée dans l'historique, y compris les refactorings (pas de préfixe `fix/`/`refactor/` distinct constaté à ce jour, mais ces préfixes restent cohérents avec la convention si le besoin s'en fait sentir).

## Commits

Format **Conventional Commits** (voir skill `.claude/skills/commit-message/`) :

```
<type>(<scope optionnel>): <description courte>

<corps optionnel>

<footer optionnel>
```

Types autorisés : `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `chore`, `build`, `ci`.

Règles :
- description courte à l'impératif présent, sans majuscule initiale ni point final ;
- le corps explique le pourquoi, pas le comment ;
- changement cassant : `BREAKING CHANGE:` en footer ou `!` après le type/scope.

Note : l'historique antérieur à l'intégration de cette convention utilise des messages descriptifs libres en anglais (ex. "Refactor authentication from token cookie to token authorization header"). La convention Conventional Commits s'applique pour toute évolution nouvelle.

## Pull Requests

- revue avant fusion (process observé : toutes les fusions sur `main` passent par une PR) ;
- tests attendus avant fusion (`npm run test`) ;
- résolution des conflits avant fusion.

## Fusion

Merge commit (`Merge pull request #N from fb-lb/<branche>`), pas de squash ni de rebase constaté dans l'historique.

## Releases

Pas de tag de version ni de release GitHub utilisés à ce jour. `package.json` reste à la version `0.0.0`.

## Versionnement

Pas de Semantic Versioning appliqué au projet dans son ensemble (projet pédagogique, déploiement continu implicite via Render plutôt que par version taguée).

## Invariants

- une branche par évolution, nommée selon le schéma `feature/<description>/<numéro>` ;
- aucune fusion directe sur `main` sans Pull Request ;
- les commits suivent Conventional Commits pour toute nouvelle évolution ;
- un historique Git clair, sans commits fourre-tout mélangeant plusieurs sujets.
