const express = require('express');
const cors = require('cors');
const livrosRouter = require('./routes/livros');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/livros', livrosRouter);

// Rota raiz
app.get('/', (req, res) => {
  res.json({ mensagem: 'API da Biblioteca Simples está funcionando!' });
});

module.exports = app;
