# 📚 Biblioteca Simples - Projeto com Testes e CI/CD

Projeto web completo de uma biblioteca simples com testes automatizados e pipeline CI/CD.

## 🚀 Tecnologias

- **Backend**: Node.js + Express
- **Frontend**: HTML/CSS/JavaScript Vanilla
- **Testes Backend**: Vitest + Supertest
- **Testes Frontend**: Jest + JSDOM
- **CI/CD**: GitHub Actions
- **Deploy**: Railway

## 📁 Estrutura

biblioteca-simples/
├── backend/          # API REST
├── frontend/         # Interface web
├── .github/workflows # Config CI/CD
└── README.md


## 🛠️ Instalação

```bash
# Clonar repositório
git clone https://github.com/seu-usuario/biblioteca-simples.git
cd biblioteca-simples

# Instalar todas as dependências
npm run install:all

# Testar tudo
npm test

# Testar apenas backend
npm run test:backend

# Testar apenas frontend
npm run test:frontend

# Terminal 1 - Backend
npm run dev:backend

# Terminal 2 - Frontend (servir na porta 5500)
npm run dev:frontend

Acesse: http://localhost:5500/frontend/


