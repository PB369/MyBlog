const express = require('express');
const app = express();
const cors = require('cors');
const port = 3001;
const articleModel = require("./articleModel");
const { uploadFile, generatePutURL, generateGetURL } = require('./s3');
const { v4: uuid } = require('uuid');

app.use(express.json());

app.use(cors({
  origin: ["http://localhost:5173", "https://pb369-projects-myblog.vercel.app"],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type"],
}));

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

app.get('/images/:fileName', async (req, res) => {
  const { fileName } = req.params;

  const getURL = await generateGetURL(fileName);
  res.json({ url: getURL});
});

app.post('/images/put-url', async (req, res) => {
  const { fileType } = req.body;
  if(!fileType) return res.status(400).json({ error: 'Missing fileType' });

  const fileExtension = fileType.split('/')[1];
  const fileName = `${uuidv4()}.${fileExtension}`;

  const putURL = await generatePutURL(fileName, fileType);
  res.json({ putURL, fileName });
});

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});