const express = require('express');
const { v4: uuidv4 } = require('uuid')

const app = express();

// --- MIDDLEWARE PARA LER O BODY DAS REQUISIÇÕES EM JSON ---
app.use(express.json());

// --- ARRAY PROVISÓRIO PARA GUARDARMOS OS CLIENTES ---
const customers = [];

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

  return res.status(201).send();
})

// --- PORTA ONDE O SERVIDOR ESTÁ RODANDO ---
app.listen(3333);