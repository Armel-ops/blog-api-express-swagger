const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Blog API',
      version: '1.0.0',
      description: 'API REST simple pour gérer des articles de blog avec Express, SQLite et Swagger.'
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Serveur local'
      }
    ],
    components: {
      schemas: {
        Article: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            title: { type: 'string', example: 'Découvrir Express 5' },
            content: { type: 'string', example: 'Express facilite la création d\'API REST.' },
            author: { type: 'string', example: 'Alice' },
            date: { type: 'string', example: '2026-03-18' },
            category: { type: 'string', example: 'Tech' },
            tags: {
              type: 'array',
              items: { type: 'string' },
              example: ['nodejs', 'express', 'api']
            },
            created_at: { type: 'string', example: '2026-03-23 12:00:00' },
            updated_at: { type: 'string', example: '2026-03-23 12:00:00' }
          }
        },
        ArticleInput: {
          type: 'object',
          required: ['title', 'content', 'author', 'date', 'category'],
          properties: {
            title: { type: 'string', example: 'Découvrir Express 5' },
            content: { type: 'string', example: 'Voici un premier article de blog.' },
            author: { type: 'string', example: 'Alice' },
            date: { type: 'string', example: '2026-03-18' },
            category: { type: 'string', example: 'Tech' },
            tags: {
              type: 'array',
              items: { type: 'string' },
              example: ['nodejs', 'backend']
            }
          }
        },
        ArticleUpdate: {
          type: 'object',
          properties: {
            title: { type: 'string', example: 'Nouveau titre' },
            content: { type: 'string', example: 'Contenu mis à jour.' },
            category: { type: 'string', example: 'Programmation' },
            tags: {
              type: 'array',
              items: { type: 'string' },
              example: ['update', 'api']
            }
          }
        },
        MessageResponse: {
          type: 'object',
          properties: {
            message: { type: 'string', example: 'Opération effectuée avec succès.' }
          }
        },
        CreateArticleResponse: {
          type: 'object',
          properties: {
            message: { type: 'string', example: 'Article créé avec succès.' },
            id: { type: 'integer', example: 1 }
          }
        },
        UpdateArticleResponse: {
          type: 'object',
          properties: {
            message: { type: 'string', example: 'Article mis à jour avec succès.' },
            article: {
              $ref: '#/components/schemas/Article'
            }
          }
        },
        ErrorResponse: {
          type: 'object',
          properties: {
            message: { type: 'string', example: 'Erreur de validation.' },
            error: { type: 'string', example: 'Détail technique facultatif.' }
          }
        }
      }
    }
  },
  apis: ['./src/routes/*.js']
};

module.exports = swaggerJSDoc(options);
