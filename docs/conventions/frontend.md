# Conventions Frontend

## Composants

Décrire les conventions de développement.

Exemples :
- composants courts et spécialisés
- une responsabilité par composant
- privilégier la composition à l'héritage

## Gestion de l'état

Décrire les conventions.

Exemples :
- état local
- état global
- synchronisation avec le backend

## Réactivité

Décrire les conventions permettant de conserver une interface réactive.

Exemples :
- mettre à jour l'interface après une modification sans rechargement de page
- éviter les rechargements complets lorsque seules certaines données changent
- privilégier les mécanismes réactifs du framework utilisé

## Appels API

Décrire les conventions.

Exemples :
- centraliser les appels HTTP
- ne jamais effectuer d'appel HTTP directement depuis un composant si une couche de service existe
- gérer systématiquement les états de chargement et d'erreur

## Formulaires

Décrire les conventions.

Exemples :
- validation côté client
- validation côté serveur
- affichage des messages d'erreur

## Interface utilisateur

Décrire les conventions.

Exemples :
- accessibilité
- responsive
- cohérence visuelle
- réutilisation des composants existants

## Performances

Décrire les principes importants.

Exemples :
- lazy loading
- limiter les re-rendus inutiles
- optimiser les listes volumineuses

## Invariants

Ces règles doivent toujours être respectées.

Exemples :
- ne pas dupliquer les composants
- conserver une interface réactive
- respecter le design system
- privilégier la réutilisation