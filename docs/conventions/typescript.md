# Conventions TypeScript

## Nommage

Décrire les conventions.

Exemples :
- variables
- fonctions
- classes
- interfaces
- types
- enums
- constantes

## Types

Décrire les conventions utilisées.

Exemples :
- préférer `type` ou `interface`
- éviter `any`
- privilégier `unknown`
- typer les retours de fonctions publiques

## Fonctions

Décrire les règles générales.

Exemples :
- privilégier les fonctions courtes
- limiter le nombre de paramètres
- utiliser des objets de paramètres lorsque nécessaire

## Asynchronisme

Décrire les conventions.

Exemples :
- privilégier `async/await`
- éviter les chaînes de `.then()`
- toujours gérer les erreurs

## Gestion des erreurs

Décrire les conventions.

Exemples :
- préférer des exceptions métier
- ne jamais lancer une chaîne de caractères
- utiliser les classes d'erreur du projet

## Immutabilité

Décrire les conventions.

Exemples :
- utiliser `readonly` lorsque pertinent
- éviter les mutations inutiles
- privilégier les fonctions pures lorsque possible

## Imports

Décrire les conventions.

Exemples :
- ordre des imports
- alias
- imports absolus ou relatifs

## Invariants

Ces règles doivent toujours être respectées.

Exemples :
- éviter `any` sans justification
- conserver un typage explicite lorsque cela améliore la lisibilité
- privilégier un code simple et fortement typé