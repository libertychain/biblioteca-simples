import { describe, it, expect, beforeEach } from 'vitest';
import request from 'supertest';
import app from '../src/app';

describe('Testes da API de Livros', () => {
  
  // Reseta o banco de dados em memória antes de cada teste
  beforeEach(() => {
    const Livro = require('../src/models/Livro');
    Livro.resetar(); // Garante estado limpo com IDs sempre 1 e 2
  });

  it('GET /api/livros - deve listar todos os livros', async () => {
    const response = await request(app).get('/api/livros');
    
    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(2);
    expect(response.body[0]).toHaveProperty('titulo');
    expect(response.body[0].titulo).toBe('O Senhor dos Anéis');
  });

  it('GET /api/livros/:id - deve buscar livro por ID', async () => {
    const response = await request(app).get('/api/livros/1');
    
    expect(response.status).toBe(200);
    expect(response.body.titulo).toBe('O Senhor dos Anéis');
    expect(response.body.autor).toBe('J.R.R. Tolkien');
  });

  it('POST /api/livros - deve criar um novo livro', async () => {
    const novoLivro = {
      titulo: 'Dom Quixote',
      autor: 'Miguel de Cervantes',
      ano: 1605
    };
    
    const response = await request(app)
      .post('/api/livros')
      .send(novoLivro);
    
    expect(response.status).toBe(201);
    expect(response.body.titulo).toBe('Dom Quixote');
    expect(response.body.id).toBe(3); // ID 3 porque 1 e 2 já existem
  });

  it('PUT /api/livros/:id - deve atualizar um livro', async () => {
    const dadosAtualizados = { titulo: '1984 - Edição Especial', ano: 1949 };
    
    const response = await request(app)
      .put('/api/livros/2')
      .send(dadosAtualizados);
    
    expect(response.status).toBe(200);
    expect(response.body.titulo).toBe('1984 - Edição Especial');
    expect(response.body.autor).toBe('George Orwell');
  });

  it('DELETE /api/livros/:id - deve deletar um livro', async () => {
    const response = await request(app).delete('/api/livros/1');
    
    expect(response.status).toBe(204);
    
    // Verifica se foi realmente deletado
    const getResponse = await request(app).get('/api/livros/1');
    expect(getResponse.status).toBe(404);
  });

  it('GET /api/livros/:id - deve retornar 404 para livro inexistente', async () => {
    const response = await request(app).get('/api/livros/999');
    
    expect(response.status).toBe(404);
    expect(response.body.erro).toBe('Livro não encontrado');
  });
});
