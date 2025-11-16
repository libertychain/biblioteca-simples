/**
 * @jest-environment jsdom
 */

// Mock do fetch global ANTES de tudo
global.fetch = jest.fn();

// HTML Mock para os testes
const html = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
</head>
<body>
    <div class="container">
        <form id="livroForm">
            <input type="text" id="titulo" value="Teste">
            <input type="text" id="autor" value="Autor Teste">
            <input type="number" id="ano" value="2024">
        </form>
        <ul id="listaLivros"></ul>
        <div id="loading" class="hidden"></div>
    </div>
</body>
</html>
`;

// Configurar DOM
document.documentElement.innerHTML = html;

// Importar a classe APÓS o DOM estar pronto
const BibliotecaApp = require('../js/app.js');

describe('BibliotecaApp - Frontend', () => {
  let app;

  beforeEach(() => {
    // Resetar mocks antes de cada teste
    fetch.mockClear();
    jest.clearAllMocks();
    
    // Recriar DOM limpo
    document.documentElement.innerHTML = html;
    
    // Mock de resposta padrão para fetch
    global.fetch.mockResolvedValue({
      json: async () => [],
      ok: true
    });
    
    // Instanciar a aplicação
    app = new BibliotecaApp();
  });

  it('deve inicializar corretamente', () => {
    expect(app).toBeDefined();
    expect(app.form).toBeTruthy();
    expect(app.lista).toBeTruthy();
    expect(app.loading).toBeTruthy();
  });

  it('deve carregar livros ao iniciar', async () => {
    // Mock específico para este teste
    global.fetch.mockResolvedValueOnce({
      json: async () => [
        { id: 1, titulo: 'Livro Teste', autor: 'Autor Teste', ano: 2023 }
      ],
      ok: true
    });

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
    expect(itens[0].textContent).toContain('Mario - 2023');
  });

  it('deve adicionar livro ao submeter formulário', async () => {
    // Mock para POST
    global.fetch.mockResolvedValueOnce({
      json: async () => ({ ok: true }),
      ok: true
    });

    // Mock para GET após criação
    global.fetch.mockResolvedValueOnce({
      json: async () => [
        { id: 1, titulo: 'Novo Livro', autor: 'Novo Autor', ano: 2024 }
      ],
      ok: true
    });

    // Criar evento de submit
    const event = new Event('submit');
    event.preventDefault = jest.fn();

    // Executar ação
    await app.handleSubmit(event);
    
    // Verificar se fetch foi chamado com dados corretos
    expect(fetch).toHaveBeenCalledWith(
      'http://localhost:3000/api/livros',
      expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          titulo: 'Teste',
          autor: 'Autor Teste',
          ano: 2024
        })
      })
    );
  });
});
