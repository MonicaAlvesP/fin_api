# FIN API

API RESTful para gerenciamento financeiro construída com Node.js, Express e SQLite. Permite criar contas, realizar depósitos, saques e consultar extratos bancários com persistência de dados.

## 🚀 Funcionalidades

- ✅ Criação de contas bancárias
- ✅ Depósitos e saques
- ✅ Consulta de extratos
- ✅ Consulta de saldo
- ✅ Filtro de extrato por data
- ✅ Atualização e exclusão de contas
- ✅ Persistência de dados com SQLite
- ✅ Operações assíncronas com async/await

## 📋 Requisitos

- Node.js 16+
- NPM ou Yarn

## 🗄️ Banco de Dados

- **SQLite**: Banco de dados leve e serverless
- **Tabelas**: `customers` e `statements`
- **Auto-criação**: Tabelas criadas automaticamente na inicialização
- **Arquivo**: `src/database/database.sqlite`
> **Banco de Dados:** O arquivo SQLite é criado automaticamente na primeira execução. Não é necessário configuração adicional.

## 🔧 Instalação

```bash
# Instalar dependências
npm install

# Executar em modo desenvolvimento
npm run dev
```

## ▶️ Executando

```bash
npm run dev
```

O servidor será iniciado em `http://localhost:3333`

## 📁 Estrutura do Projeto

```
src/
├── controllers/     # Lógica das rotas
├── database/        # Configuração e inicialização do SQLite
│   ├── connection.js    # Conexão com SQLite
│   └── initDatabase.js  # Criação das tabelas
├── middlewares/     # Validações e autenticação
├── routes/          # Definição das rotas
├── services/        # Regras de negócio e queries
├── utils/           # Funções auxiliares
└── index.js         # Servidor principal
```

## 🛠️ API Endpoints

### Contas
- `POST /account` - Criar conta
  ```json
  {
    "name": "Joana Dark",
    "cpf": "741.695.290-57"
  }
  ```
  > **Nota:** O CPF de exemplo foi gerado automaticamente para fins de teste.

- `GET /account` - Buscar conta
  - Header: `cpf: 741.695.290-57`

- `PUT /account` - Atualizar conta
  ```json
  {
    "name": "Joana Dark"
  }
  ```

- `DELETE /account` - Deletar conta
  - Header: `cpf: 741.695.290-57`

### Operações
- `POST /deposit` - Realizar depósito
  ```json
  {
    "description": "Salário",
    "amount": 1500.00
  }
  ```

- `POST /withdraw` - Realizar saque
  ```json
  {
    "amount": 500.00
  }
  ```

- `GET /balance` - Consultar saldo
  - Header: `cpf: 741.695.290-57`

### Extratos
- `GET /statement` - Consultar extrato
  - Header: `cpf: 741.695.290-57`

- `GET /statement/date` - Extrato por data
  - Header: `cpf: 741.695.290-57`
  - Query: `?date=2025-11-23`

## 🔒 Autenticação

Todas as rotas exceto `POST /account` requerem o header `cpf` para identificar a conta.

## 📊 Exemplo de Resposta

### Extrato
```json
[
  {
    "id": 1,
    "customer_id": "uuid-da-conta",
    "description": "Depósito inicial",
    "amount": 1000,
    "type": "credit",
    "created_at": "2025-11-23T10:30:00.000Z"
  }
]
```

## 🤝 Contribuição
Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e pull requests.