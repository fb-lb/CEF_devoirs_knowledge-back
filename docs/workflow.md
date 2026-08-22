# Workflow

## Imports

Lire :
- `docs/conventions/git.md`

## Cycle de développement

Déduit de l'historique Git (branches `feature/<description>/<numéro>`, PR systématiques avant fusion sur `main`) :
1. création d'une branche dédiée à partir de `main` (`feature/...`, `fix/...`, `refactor/...`) ;
2. implémentation ;
3. tests (`npm run test`) ;
4. ouverture d'une Pull Request vers `main` ;
5. fusion via merge commit ("Merge pull request #N from ...").

## Livraison

- Chaque évolution passe par une Pull Request avant fusion sur `main` (aucun commit direct sur `main` observé dans l'historique).
- Pas de déploiement automatique constaté : le déploiement sur Render s'effectue indépendamment de la fusion (voir `deployment.md`).
- Pas de tag de version ni de release GitHub utilisés à ce jour.

## Définition de terminé

Une évolution est considérée comme terminée lorsque :
- le code compile (`npm run build`) ;
- les tests concernés réussissent (`npm run test`) ;
- la documentation (`docs/`) a été mise à jour si le changement l'impacte ;
- les conventions du projet sont respectées (`docs/conventions/`).

## Invariants

- une branche par évolution, nommée `feature/<description>/<numéro-issue>` (ou `fix/`, `refactor/` selon la nature du changement) ;
- aucune fusion directe sur `main` sans Pull Request ;
- les messages de commit suivent le format Conventional Commits (voir `docs/conventions/git.md` et le skill `commit-message`) ;
- corriger les tests avant de demander une revue ;
- conserver un historique Git clair (un commit = un changement cohérent).
