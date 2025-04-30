require('dotenv').config();
const { GetObjectCommand } = require('@aws-sdk/client-s3');
const pool = require('./db');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
const { generateGetURL } = require('./s3');

const getArticlesWithBannersURLs = async () => {
  const result = await pool.query('SELECT * FROM articles ORDER BY id');
  
  const articlesWithBannersURLs = await Promise.all(
    result.rows.map(async (article) => {
      // if(!article.banner_url) return article;

      try {
        const bannerUrl = await generateGetURL(article.banner_name);

        return {
          ...article,
          banner_url: bannerUrl,
        }
      } catch (error) {
        console.error(`Presigned URL generation failed to ${article.banner_name}:`, error);
        return article;
      }
    })
  );
  return articlesWithBannersURLs;
}

const getArticlesByIdWithBannersURLs = async (id) => {
  const result = await pool.query('SELECT * FROM articles WHERE id = $1', [id]);

  const article = result.rows[0];

  if(!article) {
    console.log("caiu aqui 1");
    return null;
  }

  // if(!article.banner_url){
  //   console.log(result)
  //   return article;
  // }

  try {
    const bannerUrl = await generateGetURL(article.banner_name);
    console.log(bannerUrl);
    return {
      ...article,
      banner_url: bannerUrl,
    };
  } catch (error) {
    console.error(`Erro ao gerar presigned URL para ${article.banner_name}:`, error);
    return article; // Retorna o artigo mesmo sem a URL se houver erro
  }
}

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
          resolve(results.rows[0]);
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
  console.log(body)
  return new Promise((resolve, reject) => {
    pool.query("INSERT INTO articles (title, tags, is_published, publish_date, banner_name, banner_alt, hearts_amount, views_amount, article_content) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *", [body.title, body.tags, body.is_published, body.publish_date, body.banner_name, body.banner_alt, body.hearts_amount, body.views_amount, body.article_content], (error, results) => {
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
    pool.query("UPDATE articles SET title = $1, tags = $2, is_published = $3, publish_date = $4, banner_name = $5, banner_alt = $6, hearts_amount = $7, views_amount = $8, article_content = $9 WHERE id = $10 RETURNING *", [body.title, body.tags, body.is_published, body.publish_date, body.banner_name, body.banner_alt, body.hearts_amount, body.views_amount, body.article_content, body.id], (error, results) => {
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
  getArticlesWithBannersURLs,
  getArticlesByIdWithBannersURLs,
  getArticles,
  getArticleById,
  createArticle,
  deleteArticle,
  updateArticle
}