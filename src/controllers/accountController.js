const accountService = require('../services/accountService');
const { getBalance } = require('../utils/balance');

const accountController = {
  createAccount: async (req, res) => {
    const { name, cpf } = req.body;

    if (!name || !cpf) {
      return res.status(400).json({ error: 'Nome e CPF são obrigatórios.' });
    }

    try {
      await accountService.createAccount(name, cpf);
      return res.status(201).json({ message: 'Conta criada com sucesso.' });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },

  getStatement: async (req, res) => {
    const { customer } = req;
    try {
      const statement = await accountService.getStatements(customer.id);
      return res.json(statement);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },

  deposit: async (req, res) => {
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

    try {
      await accountService.addStatement(customer.id, statementOperation);
      return res.status(201).json({ message: 'Depósito realizado com sucesso.' });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },

  withdraw: async (req, res) => {
    const { amount } = req.body;
    const { customer } = req;

    if (!amount || amount <= 0) {
      return res.status(400).json({ error: 'Valor inválido.' });
    }

    try {
      const statements = await accountService.getStatements(customer.id);
      const balance = getBalance(statements);

      if (balance < amount) {
        return res.status(400).json({ error: "Dinheiro insuficiente!" });
      }

      const statementOperation = {
        amount,
        created_at: new Date(),
        type: "debit",
      };

      await accountService.addStatement(customer.id, statementOperation);
      return res.status(201).json({ message: 'Saque realizado com sucesso.' });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },

  getStatementByDate: async (req, res) => {
    const { customer } = req;
    const { date } = req.query;

    try {
      const statements = await accountService.getStatements(customer.id);
      const dateFormat = new Date(date);
      const statement = statements.filter((stmt) => {
        return new Date(stmt.created_at).toDateString() === dateFormat.toDateString();
      });

      return res.json(statement);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },

  updateAccount: async (req, res) => {
    const { name } = req.body;
    const { customer } = req;

    try {
      await accountService.updateCustomerName(customer.id, name);
      return res.status(200).json({ message: 'Nome atualizado com sucesso.' });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },

  getAccount: async (req, res) => {
    const { customer } = req;
    return res.json(customer);
  },

  deleteAccount: async (req, res) => {
    const { customer } = req;

    try {
      await accountService.deleteCustomer(customer.id);
      return res.status(200).json({ message: 'Conta deletada com sucesso.' });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },

  getBalance: async (req, res) => {
    const { customer } = req;

    try {
      const statements = await accountService.getStatements(customer.id);
      const balance = getBalance(statements);
      return res.json({ balance });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
};

module.exports = accountController;
