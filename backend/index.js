const express = require('express');
const app = express();
const port = 3001;

const articleModel = require("./articleModel");
// const { uploadFile } = require('./s3');

app.use(express.json());
app.use((req, res, next) => {
  const allowedOrigins = ["http://localhost:5173", "https://pb369-projects-myblog.vercel.app"]
  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers");
  next();
})

app.get('/', (req, res) => {
  articleModel.getArticles()
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  });
});

app.get('/articles/:id', (req, res) => {
  articleModel.getArticleById(req.params.id)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  });
});

app.get('/teste', (req, res) => {
  res.send('Servidor funcionando!');
});

app.post('/articles', (req, res) => {
  articleModel.createArticle(req.body)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    console.error("Erro ao inserir no DB")
    res.status(500).send(error);
  });
});

app.delete('/articles/:id', (req, res) => {
  articleModel.deleteArticle(req.params.id)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  });
});

app.put('/articles/:id', (req, res) => {
  articleModel.updateArticle(req.params.id, req.body)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  });
});

// app.post('/images', upload.single('image'), async (req, res) => {
//   const file = req.file;
//   console.log(file);
//   await uploadFile(file);
//   res.send("Image upload successfully done!")
// })

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});