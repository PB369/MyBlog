const express = require('express');
const app = express();
const port = 3001;

const articleModel = require("./articleModel");

app.use(express.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
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

app.post('/articles', (req, res) => {
  articleModel.createArticle(req.body)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
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

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});