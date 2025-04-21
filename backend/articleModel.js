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

const createArticle = (body) => {
  return new Promise((resolve, reject) => {
    pool.query("INSERT INTO articles (title, tags, isPublished, publishDate, bannerURL, bannerAlt, heartsAmount, viewsAmount, content) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *", [body.title, body.tags, body.isPublished, body.publishDate, body.bannerURL, body.bannerAlt, body.heartsAmount, body.viewsAmount, body.content], (error, results) => {
      if (error){
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
  return Promise((resolve, reject) => {
    pool.query("UPDATE articles SET title = $1, tags = $2, isPublished = $3, publishDate = $4, bannerURL = $5, bannerAlt = $6, heartsAmount = $7, viewsAmount = $8, content = $9 WHERE id = $10 RETURNING *", [body.title, body.tags, body.isPublished, body.publishDate, body.bannerURL, body.bannerAlt, body.heartsAmount, body.viewsAmount, body.content, body.id], (error, results) => {
        if(error){
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
  createArticle,
  deleteArticle,
  updateArticle
}