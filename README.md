# FIN API

API RESTful para gerenciamento financeiro com Node.js, Express e SQLite.

## Funcionalidades

- Criação e gerenciamento de contas
- Transações (depósitos e saques)
- Consulta de extratos e saldo
- Persistência com SQLite
- Documentação interativa

## Requisitos

- Node.js 16+
- NPM

## Instalação

```bash
npm install
npm run dev
```

Servidor: `http://localhost:3333`

## Documentação

Acesse: `http://localhost:3333/api-docs`

## API Endpoints

### Público
- `POST /accounts` - Criar conta

### Autenticado (Bearer token: CPF)
- `GET /me` - Dados da conta
- `PUT /me` - Atualizar conta
- `DELETE /me` - Deletar conta
- `GET /me/balance` - Saldo
- `POST /me/transactions` - Nova transação
- `GET /me/transactions` - Listar transações
- `GET /me/transactions/date?date=YYYY-MM-DD` - Filtrar por data

## Autenticação

Header: `cpf: 12345678901` ou `Authorization: Bearer 12345678901`

## Estrutura

```
src/
├── controllers/
├── database/
├── middlewares/
├── routes/
├── services/
└── utils/
```

## Banco de Dados

SQLite com auto-criação de tabelas. Arquivo: `src/database/database.sqlite`