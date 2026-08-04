# Knowledge Learning — Backend (knowledge-back)

API REST (Express/TypeScript) du site e-commerce de formations en ligne Knowledge Learning. Ce dépôt gère l'authentification, le catalogue pédagogique (thèmes/cursus/leçons), les achats (Stripe) et l'accès à la base de données MySQL. Il est consommé par un frontend Angular versionné séparément (`knowledge-front`).

## Objectif

Permettre à des utilisateurs d'acheter et suivre des formations en ligne organisées en thèmes, cursus et leçons, avec une validation de progression en cascade (l'utilisateur valide ses leçons, un administrateur valide les cursus et certifie les thèmes). Voir `docs/architecture.md` et `docs/business-rules.md` pour le détail.

## Instructions générales

- Toujours consulter la documentation concernée située dans `docs/` avant toute modification importante
- Les documents dans `docs/` constituent la source de vérité du projet
- En cas de contradiction entre plusieurs informations, privilégier la documentation la plus spécifique
- Ne consulter que les documents utiles à la tâche afin de limiter le contexte chargé
- Respecter l'architecture et les conventions existantes avant de proposer une évolution
- Préférer des modifications ciblées
- Ne pas introduire de nouvelle dépendance sans justification
- Ne pas dupliquer dans un `CLAUDE.md` des informations déjà documentées dans `docs/`
- Les fichiers docs/ doivent être écrits pour être consultés par Claude : privilégier des informations structurées, concises et actionnables plutôt qu'une documentation exhaustive

## Documentation de référence

Lire la documentation présentée ci-dessous si cela semble utile pour la résolution de la tâche.

Architecture globale du projet :
@docs/architecture.md

Décisions techniques :
`docs/decisions.md`

Règles métiers :
`docs/business-rules.md`

Backend :
`docs/backend.md`

Frontend :
`docs/frontend.md`

Base de données :
`docs/database.md`

Sécurité :
`docs/security.md`

Tests :
`docs/testing.md`

Conventions :
`docs/conventions/`
Consulter uniquement les conventions pertinentes pour la tâche.
@docs/conventions/common.md

Déploiement :
`docs/deployment.md`

Workflow :
`docs/workflow.md`

## Écosystème Claude Code

- Respecter les exclusions définies dans `.claudeignore`
- Des fichiers `CLAUDE.md` peuvent être présents dans certains sous-répertoires pour apporter des règles spécifiques à leur périmètre
- Lorsque cela apporte une réelle valeur, utiliser les subagents spécialisés disponibles dans `.claude/agents/`
- Lorsque cela est pertinent, utiliser les skills disponibles dans `.claude/skills/`
- Des commandes personnalisées sont disponibles dans `.claude/commands/` et peuvent être invoquées par l'utilisateur
- La configuration de Claude Code (permissions, hooks, politiques d'approbation, MCP...) est définie dans `.claude/settings.json`