const API_URL = 'http://localhost:3000/api/livros';

class BibliotecaApp {
  constructor() {
    this.form = document.getElementById('livroForm');
    this.lista = document.getElementById('listaLivros');
    this.loading = document.getElementById('loading');
    
    this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    
    this.carregarLivros();
  }

  async carregarLivros() {
    try {
      this.mostrarLoading();
      const response = await fetch(API_URL);
      const livros = await response.json();
      this.renderizarLivros(livros);
    } catch (error) {
      console.error('Erro ao carregar livros:', error);
      this.lista.innerHTML = '<li>Erro ao carregar livros</li>';
    } finally {
      this.esconderLoading();
    }
  }

  renderizarLivros(livros) {
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
      btnDeletar.addEventListener('click', () => this.deletarLivro(livro.id));
      
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
    if (!confirm('Tem certeza que deseja deletar este livro?')) return;
    
    try {
      await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      this.carregarLivros();
    } catch (error) {
      console.error('Erro ao deletar livro:', error);
    }
  }

  mostrarLoading() {
    this.loading.classList.remove('hidden');
  }

  esconderLoading() {
    this.loading.classList.add('hidden');
  }
}

// Inicializar app quando DOM carregar
document.addEventListener('DOMContentLoaded', () => {
  new BibliotecaApp();
});
