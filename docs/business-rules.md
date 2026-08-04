# Règles métiers

Ce document décrit les règles fonctionnelles importantes du projet.

Il explique ce que le système doit respecter indépendamment de l'implémentation technique.

## Concepts métier

Décrire les concepts principaux du domaine.

Exemple :

### Utilisateur

Description :

[Décrire ce qu'est un utilisateur dans le contexte métier.]

Attributs importants :

- [attribut]
- [attribut]


### [Autre concept métier]

Description :

[...]

## Règles générales

Lister les règles qui s'appliquent au système.

Format recommandé :

### Règle : [Nom]

Description :

[Décrire la règle.]

Exemple :

Un utilisateur ne peut pas effectuer une action si [condition].

Impact :
- frontend
- backend
- base de données

## Cycle de vie des entités

Décrire les états possibles des éléments importants.

Exemple :

### Commande

États possibles :

Créée
→ Payée
→ Expédiée
→ Livrée

Règles :
- une commande livrée ne peut plus être annulée
- une commande non payée expire après [durée]

## Permissions et rôles métier

Décrire les droits liés aux rôles fonctionnels.

Exemple :

### Administrateur

Peut :
- gérer les utilisateurs
- modifier les paramètres


### Utilisateur standard

Peut :
- consulter ses données
- modifier son profil

## Cas particuliers

Décrire les exceptions ou comportements spécifiques.

Exemple :
- suppression d'un utilisateur
- données archivées
- situations exceptionnelles

## Règles à ne pas casser

Lister les règles critiques du métier.

Exemples :
- une facture validée ne peut pas être modifiée
- un utilisateur supprimé doit conserver son historique
- une commande payée doit toujours être traçable