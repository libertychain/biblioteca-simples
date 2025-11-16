// Configuração da API
const API_URL = 'http://localhost:3000/api/livros';

// Classe da Aplicação (AGORA EXPORTADA)
class BibliotecaApp {
  constructor() {
    // Verifica se estamos no ambiente de teste ou navegador
    if (typeof document !== 'undefined') {
      this.form = document.getElementById('livroForm');
      this.lista = document.getElementById('listaLivros');
      this.loading = document.getElementById('loading');
      
      if (this.form) {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
      }
      
      this.carregarLivros();
    }
  }

  async carregarLivros() {
    // Só executa se o DOM estiver disponível
    if (!this.lista || !this.loading) return;

    try {
      this.mostrarLoading();
      const response = await fetch(API_URL);
      const livros = await response.json();
      this.renderizarLivros(livros);
    } catch (error) {
      console.error('Erro ao carregar livros:', error);
      if (this.lista) {
        this.lista.innerHTML = '<li>Erro ao carregar livros</li>';
      }
    } finally {
      this.esconderLoading();
    }
  }

  renderizarLivros(livros) {
    if (!this.lista) return;

    this.lista.innerHTML = '';
    
    livros.forEach(livro => {
      const li = document.createElement('li');
      li.className = 'livro-item';
      li.innerHTML = `
        <div class="livro-info">
          <div class="livro-titulo">${livro.titulo}</div>
          <div class="livro-detalhes">${livro.autor} - ${livro.ano}</div>
        </div>
        <button class="btn-deletar" data-id="${livro.id}">Deletar</button>
      `;
      
      const btnDeletar = li.querySelector('.btn-deletar');
      if (btnDeletar) {
        btnDeletar.addEventListener('click', () => this.deletarLivro(livro.id));
      }
      
      this.lista.appendChild(li);
    });
  }

  async handleSubmit(event) {
    event.preventDefault();
    
    const titulo = document.getElementById('titulo').value;
    const autor = document.getElementById('autor').value;
    const ano = parseInt(document.getElementById('ano').value);
    
    try {
      await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ titulo, autor, ano })
      });
      
      this.form.reset();
      this.carregarLivros();
    } catch (error) {
      console.error('Erro ao adicionar livro:', error);
    }
  }

  async deletarLivro(id) {
    if (typeof window !== 'undefined' && !window.confirm('Tem certeza que deseja deletar este livro?')) return;
    
    try {
      await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      this.carregarLivros();
    } catch (error) {
      console.error('Erro ao deletar livro:', error);
    }
  }

  mostrarLoading() {
    if (this.loading) {
      this.loading.classList.remove('hidden');
    }
  }

  esconderLoading() {
    if (this.loading) {
      this.loading.classList.add('hidden');
    }
  }
}

// Inicializar app apenas se estiver no navegador
if (typeof window !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    new BibliotecaApp();
  });
}

// EXPORTAR para os testes
if (typeof module !== 'undefined' && module.exports) {
  module.exports = BibliotecaApp;
}
