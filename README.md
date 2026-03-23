# Blog API – Express + SQLite + Swagger

Projet de départ pour une API backend simple de blog.

## Fonctionnalités

- Créer un article
- Lire tous les articles
- Filtrer les articles par catégorie, auteur ou date
- Lire un article par son ID
- Modifier un article
- Supprimer un article
- Rechercher un article par texte dans le titre ou le contenu
- Documenter et tester l'API via Swagger UI

## Stack technique

- **Node.js**
- **Express**
- **SQLite** via le module natif `node:sqlite` de Node.js
- **Swagger** avec `swagger-jsdoc` et `swagger-ui-express`

## Structure du projet

```bash
blog-api-express-swagger/
├── database/
│   └── blog.db
├── src/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   └── articleController.js
│   ├── models/
│   │   └── articleModel.js
│   ├── routes/
│   │   └── articleRoutes.js
│   ├── app.js
│   └── swagger.js
├── package.json
└── README.md
```

## Prérequis

- Node.js **22.13+**
- npm

## Installation

```bash
npm install
npm start
```

Sous PowerShell, tu peux aussi écrire :

```md
Sous PowerShell :
```powershell
npm.cmd install
npm.cmd start

L'application démarre par défaut sur :

```bash
http://localhost:3000
```

Documentation Swagger :

```bash
http://localhost:3000/api-docs
```

> Note : sur certaines versions 22.x de Node.js, `node:sqlite` peut afficher un `ExperimentalWarning`. Le projet fonctionne quand même normalement.

## Endpoints

### 1. Créer un article

**POST** `/api/articles`

Exemple de body JSON :

```json
{
  "title": "Découvrir Express 5",
  "content": "Express permet de créer rapidement une API REST.",
  "author": "Alice",
  "date": "2026-03-18",
  "category": "Tech",
  "tags": ["nodejs", "express", "backend"]
}
```

Réponse attendue :

```json
{
  "message": "Article créé avec succès.",
  "id": 1
}
```

### 2. Lire tous les articles

**GET** `/api/articles`

Filtres possibles :

- `/api/articles?category=Tech`
- `/api/articles?author=Alice`
- `/api/articles?date=2026-03-18`
- `/api/articles?category=Tech&date=2026-03-18`

### 3. Lire un article unique

**GET** `/api/articles/1`

### 4. Modifier un article

**PUT** `/api/articles/1`

Exemple de body JSON :

```json
{
  "title": "Nouveau titre",
  "content": "Contenu mis à jour.",
  "category": "Programmation",
  "tags": ["update", "express"]
}
```

### 5. Supprimer un article

**DELETE** `/api/articles/1`

### 6. Rechercher des articles

**GET** `/api/articles/search?query=Express`

## Exemples avec cURL

### Créer un article

```bash
curl -X POST http://localhost:3000/api/articles \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Premier article",
    "content": "Contenu du premier article",
    "author": "Alice",
    "date": "2026-03-18",
    "category": "Tech",
    "tags": ["demo", "api"]
  }'
```

### Récupérer tous les articles

```bash
curl http://localhost:3000/api/articles
```

### Rechercher un article

```bash
curl "http://localhost:3000/api/articles/search?query=article"
```

### Modifier un article

```bash
curl -X PUT http://localhost:3000/api/articles/1 \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Article modifié",
    "category": "Tech avancée",
    "tags": ["node", "swagger"]
  }'
```

### Supprimer un article

```bash
curl -X DELETE http://localhost:3000/api/articles/1
```

## Validation intégrée

- `title` obligatoire et non vide
- `content` obligatoire et non vide
- `author` obligatoire
- `date` obligatoire au format `YYYY-MM-DD`
- `category` obligatoire
- `tags` doit être un tableau de chaînes
- Codes HTTP utilisés : `200`, `201`, `400`, `404`, `500`

## Exemple

### Créer un article

```bash
curl -X POST http://localhost:3000/api/articles \
-H "Content-Type: application/json" \
-d "{\"title\":\"Premier article\",\"content\":\"Bonjour\",\"author\":\"Armel\",\"date\":\"2026-03-23\",\"category\":\"Tech\",\"tags\":[\"nodejs\"]}"

```md
## Documentation Swagger

http://localhost:3000/api-docs

## Idées d'amélioration

- Ajouter la pagination
- Ajouter l'authentification
- Ajouter la gestion des commentaires
- Ajouter les tests unitaires et d'intégration
- Dockeriser le projet
