# Character Hub

Character Hub est un outil en ligne joueur-centric pour gérer des fiches de personnages de JdR.  
Il est pensé pour être :

* indépendant de tout outil MJ ou VTT
* multi-personnages par joueur
* extensible à plusieurs systèmes de jeu

## État du projet

🚧 Projet en cours — Backend MVP fonctionnel

Fonctionnalités actuelles :

* Authentification utilisateur (email + mot de passe)
* CRUD de personnages
* Isolation des données par utilisateur
* API REST sécurisée par JWT

## Stack technique

### Backend

* Node.js
* Express
* SQLite
* JWT + bcrypt

### Frontend (à venir)

* React
* Vite
* Chakra UI

## Installation (Backend)

### Prérequis

* Node.js ≥ 18
* npm

### Installation

Ouvrir un terminal et lancer :

```bash
git clone https://github.com/LeBaku/character-hub.git
cd character-hub/backend
npm install
cp .env.example .env
npm run dev
```

Le serveur démarre par défaut sur : `http://localhost:5000`

## Endpoints principaux

### Auth

* POST `/api/register`
* POST `/api/login`

### Characters (auth requis)

* GET `/api/characters`
* POST `/api/characters`
* PUT `/api/characters/:id`
* DELETE `/api/characters/:id`

## Roadmap (simplifiée)

* [x] Backend MVP
* [ ] Frontend (auth + personnages)
* [ ] Versioning des fiches
* [ ] Support multi-systèmes de jeu
* [ ] Timeline de sessions / événements
* [ ] Déploiement

## Licence

À définir

