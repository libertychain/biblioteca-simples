// Modelo simples de Livro (em memória)
const livros = [
  { id: 1, titulo: "O Senhor dos Anéis", autor: "J.R.R. Tolkien", ano: 1954 },
  { id: 2, titulo: "1984", autor: "George Orwell", ano: 1949 }
];

let nextId = 3;

class Livro {
  static listar() {
    return livros;
  }

  static buscarPorId(id) {
    return livros.find(l => l.id === id);
  }

  static criar(dados) {
    const novoLivro = { id: nextId++, ...dados };
    livros.push(novoLivro);
    return novoLivro;
  }

  static atualizar(id, dados) {
    const index = livros.findIndex(l => l.id === id);
    if (index === -1) return null;
    
    livros[index] = { ...livros[index], ...dados };
    return livros[index];
  }

  static deletar(id) {
    const index = livros.findIndex(l => l.id === id);
    if (index === -1) return false;
    
    livros.splice(index, 1);
    return true;
  }
}

module.exports = Livro;
