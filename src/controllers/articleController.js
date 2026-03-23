const articleModel = require('../models/articleModel');

const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;

function isNonEmptyString(value) {
  return typeof value === 'string' && value.trim().length > 0;
}

function isValidDate(value) {
  return typeof value === 'string' && DATE_REGEX.test(value);
}

function normalizeTags(tags) {
  if (tags === undefined) return undefined;
  if (!Array.isArray(tags)) return null;

  return tags
    .filter((tag) => typeof tag === 'string')
    .map((tag) => tag.trim())
    .filter(Boolean);
}

function parseId(idParam) {
  const id = Number(idParam);
  return Number.isInteger(id) && id > 0 ? id : null;
}

function createArticle(req, res) {
  try {
    const { title, content, author, date, category, tags } = req.body;

    if (!isNonEmptyString(title)) {
      return res.status(400).json({ message: 'Le titre est obligatoire et ne peut pas être vide.' });
    }

    if (!isNonEmptyString(content)) {
      return res.status(400).json({ message: 'Le contenu est obligatoire et ne peut pas être vide.' });
    }

    if (!isNonEmptyString(author)) {
      return res.status(400).json({ message: 'L\'auteur est obligatoire.' });
    }

    if (!isValidDate(date)) {
      return res.status(400).json({ message: 'La date est obligatoire au format YYYY-MM-DD.' });
    }

    if (!isNonEmptyString(category)) {
      return res.status(400).json({ message: 'La catégorie est obligatoire.' });
    }

    const normalizedTags = normalizeTags(tags);
    if (normalizedTags === null) {
      return res.status(400).json({ message: 'Le champ tags doit être un tableau de chaînes.' });
    }

    const newArticle = {
      title: title.trim(),
      content: content.trim(),
      author: author.trim(),
      date: date.trim(),
      category: category.trim(),
      tags: normalizedTags || []
    };

    const articleId = articleModel.createArticle(newArticle);

    return res.status(201).json({
      message: 'Article créé avec succès.',
      id: articleId
    });
  } catch (error) {
    return res.status(500).json({ message: 'Erreur interne du serveur.', error: error.message });
  }
}

function getArticles(req, res) {
  try {
    const { category, auteur, author, date } = req.query;

    const filters = {
      category: category ? String(category).trim() : undefined,
      author: author ? String(author).trim() : auteur ? String(auteur).trim() : undefined,
      date: date ? String(date).trim() : undefined
    };

    if (filters.date && !isValidDate(filters.date)) {
      return res.status(400).json({ message: 'Le filtre date doit être au format YYYY-MM-DD.' });
    }

    const articles = articleModel.getAllArticles(filters);
    return res.status(200).json(articles);
  } catch (error) {
    return res.status(500).json({ message: 'Erreur interne du serveur.', error: error.message });
  }
}

function getArticleById(req, res) {
  try {
    const id = parseId(req.params.id);

    if (!id) {
      return res.status(400).json({ message: 'ID invalide.' });
    }

    const article = articleModel.getArticleById(id);

    if (!article) {
      return res.status(404).json({ message: 'Article introuvable.' });
    }

    return res.status(200).json(article);
  } catch (error) {
    return res.status(500).json({ message: 'Erreur interne du serveur.', error: error.message });
  }
}

function updateArticle(req, res) {
  try {
    const id = parseId(req.params.id);

    if (!id) {
      return res.status(400).json({ message: 'ID invalide.' });
    }

    const updates = {};

    if (req.body.title !== undefined) {
      if (!isNonEmptyString(req.body.title)) {
        return res.status(400).json({ message: 'Le titre ne peut pas être vide.' });
      }
      updates.title = req.body.title.trim();
    }

    if (req.body.content !== undefined) {
      if (!isNonEmptyString(req.body.content)) {
        return res.status(400).json({ message: 'Le contenu ne peut pas être vide.' });
      }
      updates.content = req.body.content.trim();
    }

    if (req.body.category !== undefined) {
      if (!isNonEmptyString(req.body.category)) {
        return res.status(400).json({ message: 'La catégorie ne peut pas être vide.' });
      }
      updates.category = req.body.category.trim();
    }

    if (req.body.tags !== undefined) {
      const normalizedTags = normalizeTags(req.body.tags);
      if (normalizedTags === null) {
        return res.status(400).json({ message: 'Le champ tags doit être un tableau de chaînes.' });
      }
      updates.tags = normalizedTags;
    }

    if (!Object.keys(updates).length) {
      return res.status(400).json({
        message: 'Aucune donnée valide à mettre à jour. Champs autorisés: title, content, category, tags.'
      });
    }

    const existingArticle = articleModel.getArticleById(id);
    if (!existingArticle) {
      return res.status(404).json({ message: 'Article introuvable.' });
    }

    const updatedArticle = articleModel.updateArticle(id, updates);

    return res.status(200).json({
      message: 'Article mis à jour avec succès.',
      article: updatedArticle
    });
  } catch (error) {
    return res.status(500).json({ message: 'Erreur interne du serveur.', error: error.message });
  }
}

function deleteArticle(req, res) {
  try {
    const id = parseId(req.params.id);

    if (!id) {
      return res.status(400).json({ message: 'ID invalide.' });
    }

    const existingArticle = articleModel.getArticleById(id);
    if (!existingArticle) {
      return res.status(404).json({ message: 'Article introuvable.' });
    }

    articleModel.deleteArticle(id);

    return res.status(200).json({
      message: 'Article supprimé avec succès.',
      id
    });
  } catch (error) {
    return res.status(500).json({ message: 'Erreur interne du serveur.', error: error.message });
  }
}

function searchArticles(req, res) {
  try {
    const { query } = req.query;

    if (!isNonEmptyString(query)) {
      return res.status(400).json({ message: 'Le paramètre query est obligatoire.' });
    }

    const articles = articleModel.searchArticles(query.trim());
    return res.status(200).json(articles);
  } catch (error) {
    return res.status(500).json({ message: 'Erreur interne du serveur.', error: error.message });
  }
}

module.exports = {
  createArticle,
  getArticles,
  getArticleById,
  updateArticle,
  deleteArticle,
  searchArticles
};
