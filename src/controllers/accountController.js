const accountService = require('../services/accountService');
const { getBalance } = require('../utils/balance');

const accountController = {
  createAccount: (req, res) => {
    const { name, cpf } = req.body;

    if (!name || !cpf) {
      return res.status(400).json({ error: 'Nome e CPF são obrigatórios.' });
    }

    try {
      accountService.createAccount(name, cpf);
      return res.status(201).json({ message: 'Conta criada com sucesso.' });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },

  getStatement: (req, res) => {
    const { customer } = req;
    return res.json(customer.statement);
  },

  deposit: (req, res) => {
    const { description, amount } = req.body;
    const { customer } = req;

    if (!amount || amount <= 0) {
      return res.status(400).json({ error: 'Valor inválido.' });
    }

    const statementOperation = {
      description,
      amount,
      created_at: new Date(),
      type: "credit"
    };

    accountService.addStatement(customer, statementOperation);
    return res.status(201).json({ message: 'Depósito realizado com sucesso.' });
  },

  withdraw: (req, res) => {
    const { amount } = req.body;
    const { customer } = req;

    if (!amount || amount <= 0) {
      return res.status(400).json({ error: 'Valor inválido.' });
    }

    const balance = getBalance(customer.statement);

    if (balance < amount) {
      return res.status(400).json({ error: "Dinheiro insuficiente!" });
    }

    const statementOperation = {
      amount,
      created_at: new Date(),
      type: "debit",
    };

    accountService.addStatement(customer, statementOperation);
    return res.status(201).json({ message: 'Saque realizado com sucesso.' });
  },

  getStatementByDate: (req, res) => {
    const { customer } = req;
    const { date } = req.query;

    const dateFormat = new Date(date);
    const statement = customer.statement.filter((statement) => {
      return statement.created_at.toDateString() === dateFormat.toDateString();
    });

    return res.json(statement);
  },

  updateAccount: (req, res) => {
    const { name } = req.body;
    const { customer } = req;

    accountService.updateCustomerName(customer, name);
    return res.status(200).json({ message: 'Nome atualizado com sucesso.' });
  },

  getAccount: (req, res) => {
    const { customer } = req;
    return res.json(customer);
  },

  deleteAccount: (req, res) => {
    const { customer } = req;
    const customers = accountService.deleteCustomer(customer);
    return res.status(200).json(customers);
  },

  getBalance: (req, res) => {
    const { customer } = req;
    const balance = getBalance(customer.statement);
    return res.json({ balance });
  }
};

module.exports = accountController;
