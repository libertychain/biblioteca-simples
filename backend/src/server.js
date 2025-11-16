const app = require('./app');

const PORT = process.env.PORT || 3000;

// OBRIGATÓRIO: escutar em 0.0.0.0 para containers
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
