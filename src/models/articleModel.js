const db = require('../config/db');

function mapArticle(row) {
  if (!row) return null;

  return {
    ...row,
    tags: JSON.parse(row.tags || '[]')
  };
}

function createArticle(article) {
  const stmt = db.prepare(`
    INSERT INTO articles (title, content, author, date, category, tags)
    VALUES (?, ?, ?, ?, ?, ?)
  `);

  const result = stmt.run(
    article.title,
    article.content,
    article.author,
    article.date,
    article.category,
    JSON.stringify(article.tags || [])
  );

  return Number(result.lastInsertRowid);
}

function getAllArticles(filters = {}) {
  const conditions = [];
  const values = [];

  if (filters.category) {
    conditions.push('category = ?');
    values.push(filters.category);
  }

  if (filters.author) {
    conditions.push('author = ?');
    values.push(filters.author);
  }

  if (filters.date) {
    conditions.push('date = ?');
    values.push(filters.date);
  }

  const whereClause = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';
  const stmt = db.prepare(`
    SELECT id, title, content, author, date, category, tags, created_at, updated_at
    FROM articles
    ${whereClause}
    ORDER BY date DESC, id DESC
  `);

  return stmt.all(...values).map(mapArticle);
}

function getArticleById(id) {
  const stmt = db.prepare(`
    SELECT id, title, content, author, date, category, tags, created_at, updated_at
    FROM articles
    WHERE id = ?
  `);

  return mapArticle(stmt.get(id));
}

function updateArticle(id, updates) {
  const fields = [];
  const values = [];

  if (updates.title !== undefined) {
    fields.push('title = ?');
    values.push(updates.title);
  }

  if (updates.content !== undefined) {
    fields.push('content = ?');
    values.push(updates.content);
  }

  if (updates.category !== undefined) {
    fields.push('category = ?');
    values.push(updates.category);
  }

  if (updates.tags !== undefined) {
    fields.push('tags = ?');
    values.push(JSON.stringify(updates.tags));
  }

  if (!fields.length) {
    return null;
  }

  fields.push("updated_at = CURRENT_TIMESTAMP");
  values.push(id);

  const stmt = db.prepare(`
    UPDATE articles
    SET ${fields.join(', ')}
    WHERE id = ?
  `);

  const result = stmt.run(...values);

  if (!result.changes) {
    return null;
  }

  return getArticleById(id);
}

function deleteArticle(id) {
  const stmt = db.prepare('DELETE FROM articles WHERE id = ?');
  const result = stmt.run(id);
  return result.changes > 0;
}

function searchArticles(query) {
  const pattern = `%${query}%`;
  const stmt = db.prepare(`
    SELECT id, title, content, author, date, category, tags, created_at, updated_at
    FROM articles
    WHERE title LIKE ? OR content LIKE ?
    ORDER BY date DESC, id DESC
  `);

  return stmt.all(pattern, pattern).map(mapArticle);
}

module.exports = {
  createArticle,
  getAllArticles,
  getArticleById,
  updateArticle,
  deleteArticle,
  searchArticles
};
