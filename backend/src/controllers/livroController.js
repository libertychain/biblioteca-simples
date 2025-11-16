const Livro = require('../models/Livro');

const livroController = {
  listar: (req, res) => {
    try {
      const livros = Livro.listar();
      res.json(livros);
    } catch (error) {
      res.status(500).json({ erro: 'Erro ao listar livros' });
    }
  },

  buscarPorId: (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const livro = Livro.buscarPorId(id);
      
      if (!livro) {
        return res.status(404).json({ erro: 'Livro não encontrado' });
      }
      
      res.json(livro);
    } catch (error) {
      res.status(500).json({ erro: 'Erro ao buscar livro' });
    }
  },

  criar: (req, res) => {
    try {
      const { titulo, autor, ano } = req.body;
      
      if (!titulo || !autor || !ano) {
        return res.status(400).json({ erro: 'Dados incompletos' });
      }
      
      const novoLivro = Livro.criar({ titulo, autor, ano });
      res.status(201).json(novoLivro);
    } catch (error) {
      res.status(500).json({ erro: 'Erro ao criar livro' });
    }
  },

  atualizar: (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const dados = req.body;
      
      const livroAtualizado = Livro.atualizar(id, dados);
      
      if (!livroAtualizado) {
        return res.status(404).json({ erro: 'Livro não encontrado' });
      }
      
      res.json(livroAtualizado);
    } catch (error) {
      res.status(500).json({ erro: 'Erro ao atualizar livro' });
    }
  },

  deletar: (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const deletado = Livro.deletar(id);
      
      if (!deletado) {
        return res.status(404).json({ erro: 'Livro não encontrado' });
      }
      
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ erro: 'Erro ao deletar livro' });
    }
  }
};

module.exports = livroController;
