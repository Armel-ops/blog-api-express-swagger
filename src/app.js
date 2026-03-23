const express = require('express');
const swaggerUi = require('swagger-ui-express');
const articleRoutes = require('./routes/articleRoutes');
const swaggerSpec = require('./swagger');
require('./config/db');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: 'Bienvenue sur la Blog API.',
    documentation: `http://localhost:${PORT}/api-docs`
  });
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api/articles', articleRoutes);

app.use((req, res) => {
  res.status(404).json({ message: 'Route introuvable.' });
});

app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).json({ message: 'Erreur interne du serveur.' });
});

app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
  console.log(`Swagger disponible sur http://localhost:${PORT}/api-docs`);
});

module.exports = app;
