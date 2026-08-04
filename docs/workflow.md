# Workflow

## Imports

Lire :
- `docs/conventions/git.md`

## Cycle de développement

Décrire les grandes étapes d'une évolution.

Exemple :
1. analyser le besoin
2. proposer un plan
3. implémenter
4. tester
5. relire
6. livrer

## Livraison

Décrire les règles générales.

Exemples :
- validation avant fusion
- déploiement automatique
- création d'une release

## Définition de terminé

Une évolution est considérée comme terminée lorsque :
- le code compile
- les tests concernés réussissent
- la documentation a été mise à jour si nécessaire
- les conventions du projet sont respectées

## Invariants

Ces règles doivent toujours être respectées.

Exemples :
- une évolution importante commence par un plan
- ne pas mélanger plusieurs fonctionnalités dans une même modification
- corriger les tests avant de demander une revue
- conserver un historique Git clair