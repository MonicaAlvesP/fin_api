const express = require('express');
const { v4: uuidv4 } = require('uuid')

const app = express();

// --- MIDDLEWARE PARA LER O BODY DAS REQUISIÇÕES EM JSON ---
app.use(express.json());

// --- ARRAY PROVISÓRIO PARA GUARDARMOS OS CLIENTES ---
const customers = [];

// --- Middleware PARA VERIFICAR SE O CLIENTE EXISTE ---
function verifyExistsAccountCPF(req, res, next) {
  // --- PEGANDO O CPF DOS PARÂMETROS DA ROTA ---
  const { cpf } = req.headers;

  // --- BUSCANDO O CLIENTE PELO CPF ---
  const customer = customers.find(customer => customer.cpf === cpf);

  // --- SE NÃO ENCONTRAR, RETORNAMOS UM ERRO ---
  if (!customer) {
    return res.status(400).json({ error: 'Cliente não encontrado.' });
  }

  // --- SE ENCONTRAR, ADICIONAMOS O CLIENTE NA REQUISIÇÃO ---
  req.customer = customer;

  return next();
}

// PARA CRIAR UMA CONTA, PRECISAMOS DE ALGUNS DADOS COMO:
// ID, NOME, CPF E O STATEMENT, SENDO O ÚLTIMO UM ARRAY
app.post("/account", (req, res) => {
  const { name, cpf } = req.body;

  // --- VALIDANDO SE O NOME E CPF FORAM INFORMADOS ---
  if (!name || !cpf) {
    return res.status(400).json({ error: 'Nome e CPF são obrigatórios.' });
  }

  // --- VERIFICANDO SE JÁ EXISTE UM CLIENTE COM O MESMO CPF ---
  const customerAlreadyExists = customers.some((customer) => customer.cpf === cpf);

  // --- SE JÁ EXISTIR, RETORNAMOS UM ERRO ---
  if (customerAlreadyExists) {
    return res.status(400).json({ error: 'CPF já existe.' });
  }

  // --- RANDOMIZANDO UM ID PARA O CLIENTE ---
  const id = uuidv4();

  customers.push({
    id,
    name,
    cpf,
    statement: []
  });

  return res.status(201).json({ message: 'Conta criada com sucesso.' });
})

app.get("/statement", verifyExistsAccountCPF, (req, res) => {
  // --- PEGANDO O CLIENTE DA REQUISIÇÃO NOVAMENTE ---
  const { customer } = req;

  // --- RETORNANDO O EXTRATO DO CLIENTE ---
  return res.json(customer.statement);
})

app.post("/deposit", verifyExistsAccountCPF, (req, res) => {
  const { description, amount } = req.body;

  // --- PEGANDO O CLIENTE DA REQUISIÇÃO ---
  const { customer } = req;

  // --- CRIANDO UM OBJETO DE OPERAÇÃO DE DEPÓSITO ---
  const statementOperation = {
    description,
    amount,
    created_at: new Date(),
    type: "credit"
  }

  // --- ADICIONANDO A OPERAÇÃO AO EXTRATO DO CLIENTE ---
  customer.statement.push(statementOperation);

  return res.status(201).json({ message: 'Depósito realizado com sucesso.' }).send();
});

// --- PORTA ONDE O SERVIDOR ESTÁ RODANDO ---
app.listen(3333, () => {
  console.log('Servidor rodando na porta 3333 🚀');
  // console.log('Documentação disponível em: http://localhost:3333/api-docs');
});