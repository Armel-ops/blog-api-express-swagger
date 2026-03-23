const express = require('express');
const controller = require('../controllers/articleController');

const router = express.Router();

/**
 * @openapi
 * /api/articles:
 *   post:
 *     summary: Créer un article
 *     tags:
 *       - Articles
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ArticleInput'
 *     responses:
 *       201:
 *         description: Article créé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreateArticleResponse'
 *       400:
 *         description: Données invalides
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Erreur interne du serveur
 */
router.post('/', controller.createArticle);

/**
 * @openapi
 * /api/articles:
 *   get:
 *     summary: Récupérer tous les articles
 *     tags:
 *       - Articles
 *     parameters:
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filtrer par catégorie
 *       - in: query
 *         name: author
 *         schema:
 *           type: string
 *         description: Filtrer par auteur
 *       - in: query
 *         name: auteur
 *         schema:
 *           type: string
 *         description: Alias français pour author
 *       - in: query
 *         name: date
 *         schema:
 *           type: string
 *           example: 2026-03-18
 *         description: Filtrer par date exacte au format YYYY-MM-DD
 *     responses:
 *       200:
 *         description: Liste des articles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Article'
 *       400:
 *         description: Filtre invalide
 *       500:
 *         description: Erreur interne du serveur
 */
router.get('/', controller.getArticles);

/**
 * @openapi
 * /api/articles/search:
 *   get:
 *     summary: Rechercher des articles par texte
 *     tags:
 *       - Articles
 *     parameters:
 *       - in: query
 *         name: query
 *         required: true
 *         schema:
 *           type: string
 *         description: Texte à rechercher dans le titre ou le contenu
 *     responses:
 *       200:
 *         description: Résultat de la recherche
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Article'
 *       400:
 *         description: Paramètre query manquant ou invalide
 *       500:
 *         description: Erreur interne du serveur
 */
router.get('/search', controller.searchArticles);

/**
 * @openapi
 * /api/articles/{id}:
 *   get:
 *     summary: Récupérer un article par son ID
 *     tags:
 *       - Articles
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Article trouvé
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Article'
 *       400:
 *         description: ID invalide
 *       404:
 *         description: Article introuvable
 *       500:
 *         description: Erreur interne du serveur
 */
router.get('/:id', controller.getArticleById);

/**
 * @openapi
 * /api/articles/{id}:
 *   put:
 *     summary: Modifier un article existant
 *     tags:
 *       - Articles
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ArticleUpdate'
 *     responses:
 *       200:
 *         description: Article mis à jour
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UpdateArticleResponse'
 *       400:
 *         description: Requête invalide
 *       404:
 *         description: Article introuvable
 *       500:
 *         description: Erreur interne du serveur
 */
router.put('/:id', controller.updateArticle);

/**
 * @openapi
 * /api/articles/{id}:
 *   delete:
 *     summary: Supprimer un article
 *     tags:
 *       - Articles
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Article supprimé
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/MessageResponse'
 *                 - type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *       400:
 *         description: ID invalide
 *       404:
 *         description: Article introuvable
 *       500:
 *         description: Erreur interne du serveur
 */
router.delete('/:id', controller.deleteArticle);

module.exports = router;
