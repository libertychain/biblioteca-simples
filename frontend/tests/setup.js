// Configuração global dos testes frontend
global.API_URL = 'http://localhost:3000/api/livros';

// Mock do localStorage se necessário
global.localStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn()
};

// Suprimir logs de erro durante testes
global.console = {
  ...console,
  error: jest.fn(),
  warn: jest.fn()
};
