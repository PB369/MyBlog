const pool = require('./db');

const getArticles = async () => {
  try {
    return await new Promise((resolve, reject) => {
      pool.query("SELECT * FROM articles ORDER BY id", (error, results) => {
        if(error){
          reject(error);
        }
        if(results && results.rows){
          resolve(results.rows);
        } else {
          reject(new Error("No results found"));
        }
      });
    });
  } catch (error1) {
    console.error(error1);
  }
}

const getArticleById = async (id) => {
  try {
    return await new Promise((resolve, reject) => {
      pool.query("SELECT * FROM articles WHERE id = $1", [id], (error, results) => {
        if(error){
          reject(error);
        }
        if(results && results.rows){
          resolve(results.rows);
        } else {
          reject(new Error("No results found"));
        }
      });
    });
  } catch (error1) {
    console.error(error1);
  }
}

const createArticle = (body) => {
  return new Promise((resolve, reject) => {
    pool.query("INSERT INTO articles (title, tags, is_published, publish_date, banner_url, banner_alt, hearts_amount, views_amount, article_content) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *", [body.title, body.tags, body.is_published, body.publish_date, body.banner_url, body.banner_alt, body.hearts_amount, body.views_amount, body.article_content], (error, results) => {
      if (error){
        console.log('Erro ao inserir', error)
        reject(error);
      }
      if (results && results.rows){
        resolve(`New article added to DB.`);
      } else {
        reject(new Error("No results found"));
      }
    });
  });
}

const deleteArticle = (id) => {
  return new Promise((resolve, reject) => {
    pool.query("DELETE FROM articles WHERE id = $1", [id], (error, results) => {
      if(error){
        reject(error);
      }
      resolve(`Article with id ${id} was deleted from DB`)
    })
  });
}

const updateArticle = (id, body) => {
  console.log(body)
  return new Promise((resolve, reject) => {
    pool.query("UPDATE articles SET title = $1, tags = $2, is_published = $3, publish_date = $4, banner_url = $5, banner_alt = $6, hearts_amount = $7, views_amount = $8, article_content = $9 WHERE id = $10 RETURNING *", [body.title, body.tags, body.is_published, body.publish_date, body.banner_url, body.banner_alt, body.hearts_amount, body.views_amount, body.article_content, body.id], (error, results) => {
        if(error){
          console.log('Erro ao inserir', error)
          reject(error);
        }
        if(results && results.rows){
          resolve(`Article with id ${body.id} was updated.`);
        } else {
          reject(new Error("No results found"));
        }
    });
  });
}

module.exports = {
  getArticles,
  getArticleById,
  createArticle,
  deleteArticle,
  updateArticle
}