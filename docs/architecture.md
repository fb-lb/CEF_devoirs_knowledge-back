# Architecture

## Vue d'ensemble

[Décrire en quelques paragraphes l'architecture générale du projet.]

Exemple :
- une application Frontend
- une API Backend
- une base de données relationnelle
- des services externes éventuels

## Objectifs d'architecture

Décrire les objectifs recherchés.

Exemples :
- séparation des responsabilités
- maintenabilité
- testabilité
- évolutivité
- performances
- sécurité

## Architecture retenue

Décrire le style d'architecture utilisé.

Exemples :
- MVC
- Clean Architecture
- Hexagonale
- Onion
- Vertical Slice
- Monolithe modulaire
- Microservices

Expliquer pourquoi ce choix a été fait dans decisions.md.

## Découpage du projet

Présenter les grandes parties du projet.

Exemple :

Frontend
- rôle
- responsabilités

Backend
- rôle
- responsabilités

Database
- rôle
- responsabilités

Services externes
- rôle
- responsabilités

## Communication

Décrire la communication entre les différentes parties de l'application.

Exemple :

Frontend

↓

API Backend

↓

Database

Pour les communications spécifiques entre modules :
- entre frontend et backend : API REST
- format général des données échangées
- gestion globale des erreurs
- événements
- files de messages
- WebSocket

## Dépendances autorisées

Décrire les dépendances entre les différentes couches.

Exemple :

Frontend → Backend

Backend → Couche d'accès aux données → Base de données

Préciser également les dépendances interdites.

Exemple :

Dépendance interdite :
- Frontend → Database

## Gestion de la configuration

Décrire les principes généraux de configuration du projet.

Exemples :
- séparation configuration/code
- utilisation de variables d'environnement
- gestion des environnements (développement, test, production)

## Invariants d'architecture

Ces règles ne doivent pas être enfreintes.

Exemples :
- chaque partie du système possède une responsabilité clairement définie
- la logique métier appartient au backend
- le frontend ne contient pas de logique métier serveur
- les composants ne doivent pas contourner les interfaces prévues
- les dépendances doivent respecter le sens défini par l'architecture

## Performances

Décrire les objectifs globaux du système.

Exemples :
- temps de réponse attendu
- contraintes de montée en charge
- objectifs de disponibilité
- stratégie générale de performance

Les détails techniques sont documentés dans les fichiers concernés.

## Évolutions prévues

Documenter les évolutions susceptibles d'impacter l'architecture globale.

Exemples :
- changement d'architecture
- découpage d'un monolithe
- ajout d'un service externe majeur
- migration technique importante

Les choix validés sont détaillés dans `decisions.md`.