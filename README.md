# Système d'authentification avec NextAuth, Prisma et PostgreSQL

Ce projet est un exemple d'implémentation d'un système d'authentification complet utilisant NextAuth pour l'authentification, Prisma comme ORM pour interagir avec la base de données PostgreSQL et bcrypt pour le hachage des mots de passe.

## Prérequis

Avant de commencer, assurez-vous d'avoir les éléments suivants installés sur votre machine :

- Node.js et npm
- PostgreSQL
- Prisma CLI (installé globalement ou localement dans le projet)

## Configuration

1. Cloner le dépôt : `git clone https://github.com/votre-utilisateur/votre-projet.git`
2. Installer les dépendances : `npm install`
3. Configurer les variables d'environnement :
   - Copier le fichier `.env.example` en `.env`
   - Remplir les variables d'environnement nécessaires dans le fichier `.env` (par exemple, la chaîne de connexion à la base de données)
4. Créer et initialiser la base de données : `npx prisma migrate dev`

## Utilisation

Pour lancer l'application, exécutez la commande suivante :

```bash
npm run dev
```

L'application sera accessible à l'adresse [http://localhost:3000](http://localhost:3000).

## Fonctionnalités

- **Inscription** : Les utilisateurs peuvent créer un compte en fournissant leur adresse e-mail et un mot de passe sécurisé.
- **Connexion** : Les utilisateurs peuvent se connecter à leur compte en fournissant leur adresse e-mail et leur mot de passe.
- **Mot de passe sécurisé** : Les mots de passe des utilisateurs sont hachés avant d'être stockés dans la base de données à l'aide de l'algorithme bcrypt.
- **Deconnexion** : Les utilisateurs peuvent se déconnecter de leur compte à tout moment.

## Structure du projet

- **`app/api/auth`** : Contient la configuration de NextAuth et les endpoints pour l'authentification.
- **`app/api/user`** : Endpoints pour gérer les utilisateurs (par exemple, obtenir les détails de l'utilisateur actuellement connecté).
- **`app`** : Contient les pages de l'application, telles que la page d'inscription, la page de connexion, etc.
- **`prisma`** : Contient les fichiers de configuration et les migrations pour Prisma.
