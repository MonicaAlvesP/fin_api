# FIN API

API RESTful para gerenciamento financeiro construída com Node.js e Express. Permite criar contas, realizar depósitos, saques e consultar extratos bancários.

## 🚀 Funcionalidades

- Criação de contas bancárias
- Depósitos e saques
- Consulta de extratos
- Consulta de saldo
- Filtro de extrato por data
- Atualização e exclusão de contas

## 📋 Requisitos

- Node.js 16+
- NPM ou Yarn

## ⚠️ Observações

- Os dados são armazenados em memória (reiniciar o servidor apaga os dados)
- Projeto em desenvolvimento - banco de dados será implementado em versões futuras.

## 🔧 Instalação

```bash
npm install
```

## ▶️ Executando

```bash
npm run dev
```

## 📁 Estrutura do Projeto

```
src/
├── controllers/     # Lógica das rotas
├── middlewares/     # Validações e autenticação
├── routes/          # Definição das rotas
├── services/        # Regras de negócio
├── utils/           # Funções auxiliares
└── index.js         # Servidor principal
```

## 🛠️ API Endpoints

### Contas
- `POST /account` - Criar conta
- `GET /account` - Buscar conta
- `PUT /account` - Atualizar conta
- `DELETE /account` - Deletar conta

### Operações
- `POST /deposit` - Realizar depósito
- `POST /withdraw` - Realizar saque
- `GET /balance` - Consultar saldo

### Extratos
- `GET /statement` - Consultar extrato
- `GET /statement/date` - Extrato por data

## 🤝 Contribuição
Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e pull requests.