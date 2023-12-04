# <center>Projet pointeuse</center> <!-- omit in toc -->
<center>Auteur : Jules Hemery</center>

## Table des matières <!-- omit in toc -->
- [Introduction](#introduction)
- [Choix de technologie](#choix-de-technologie)
  - [Backend](#backend)
  - [Frontend](#frontend)
- [Installation](#installation)
- [TODO](#todo)

## Introduction
Mon ami Mael a besoin d'une application pour pointer ses heures de travail. Il m'a donc demandé de lui en faire une.
L'app doit permettre de :

- Pointer ses heures de travail/trajet/pause
- Voir ses heures de travail par jour
- Voir ses heures de travail par mois
- voir le temps écouler depuis le dernier pointage

## Choix de technologie

### Backend
Ayant déja utilisé Laravel pour un projet précédent, j'ai décidé de l'utiliser pour ce projet. De plus, j'ai déja utilisé Laravel Sanctum pour gérer l'authentification d'une API, ce qui me permettra de gagner du temps.

### Frontend
J'ai choisi de réaliser ce projet en utilisant le framework React Native afin d'approfondir mes connaissance et de pouvoir en exporter une app native et l'installer sur n'importe quel téléphone android.

Grace à Expo je vais pouvoir tester dynamiquement l'application sur un téléphone Android.

J'utilises les packages Node suivants :

  - BottomTabNavigation (pour gérer les onglets)
  - React-navigation (pour gérer les pages)
  - React-Query avec Axios (pour gérer les requêtes api)
  - React-icons (pour les icônes)
  - React-native-date-picker (pour des calendriers)

## Installation

- Pré-requis :

  - Node.js v20.9 (LTS)
  - React 18.2
  - React-native v0.72

- Installation de l'application sur machine locale :
  1. Clone le projet sur votre machine
  2. Executer dans l'ordre les commandes suivante dans un terminal :
     - npm install
     - expo start

- Installation de l'application sur un téléphone Android :
  1. S'assurer que le téléphone est en mode développement
  2. Brancher le téléphone a votre machine
  3. Exporter l'APK dans un des dossiers de votre téléphone
  4. Installer l'APK sur votre téléphone


## TODO

- [x] Créer les models/controllers/migrations/routes de l'API
- [x] Créer un projet React Native
- [x] Créer une interface basique
- [ ] Stopwatch depuis le dernier pointage
- [ ] Recap journées
- [ ] Recap mois
- [ ] Export pdf ou csv
