/**
 * @jest-environment jsdom
 */

// Mock do fetch global
global.fetch = jest.fn();

// Carregar o código da aplicação
const fs = require('fs');
const path = require('path');

// Simular o DOM
const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');
document.documentElement.innerHTML = html;

// Carregar o app após o DOM estar pronto
require('../js/app.js');

describe('BibliotecaApp - Frontend', () => {
  let app;

  beforeEach(() => {
    // Resetar mocks
    fetch.mockClear();
    jest.clearAllMocks();
    
    // Recarregar o DOM limpo
    document.documentElement.innerHTML = html;
    
    // Mock de livros de exemplo
    global.fetch.mockResolvedValueOnce({
      json: async () => [
        { id: 1, titulo: 'Livro Teste', autor: 'Autor Teste', ano: 2023 }
      ]
    });
    
    // Inicializar app
    app = new BibliotecaApp();
  });

  it('deve inicializar corretamente', () => {
    expect(app.form).toBeTruthy();
    expect(app.lista).toBeTruthy();
    expect(app.loading).toBeTruthy();
  });

  it('deve carregar livros ao iniciar', async () => {
    await app.carregarLivros();
    
    expect(fetch).toHaveBeenCalledWith('http://localhost:3000/api/livros');
    expect(app.lista.children.length).toBeGreaterThan(0);
  });

  it('deve renderizar livros corretamente', () => {
    const livrosMock = [
      { id: 1, titulo: 'JavaScript Moderno', autor: 'Mario', ano: 2023 }
    ];
    
    app.renderizarLivros(livrosMock);
    
    const itens = document.querySelectorAll('.livro-item');
    expect(itens.length).toBe(1);
    expect(itens[0].textContent).toContain('JavaScript Moderno');
  });

  it('deve adicionar livro ao submeter formulário', async () => {
    // Mock para POST e GET após criação
    fetch.mockResolvedValueOnce({ ok: true });
    fetch.mockResolvedValueOnce({
      json: async () => [
        { id: 1, titulo: 'Novo Livro', autor: 'Novo Autor', ano: 2024 }
      ]
    });
    
    // Preencher formulário
    document.getElementById('titulo').value = 'Novo Livro';
    document.getElementById('autor').value = 'Novo Autor';
    document.getElementById('ano').value = '2024';
    
    // Submeter formulário
    const event = new Event('submit');
    event.preventDefault = jest.fn();
    
    await app.handleSubmit(event);
    
    expect(fetch).toHaveBeenCalledWith(
      'http://localhost:3000/api/livros',
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify({
          titulo: 'Novo Livro',
          autor: 'Novo Autor',
          ano: 2024
        })
      })
    );
  });
});
