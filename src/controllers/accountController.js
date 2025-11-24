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

  createTransaction: async (req, res) => {
    const { type, amount, description } = req.body;
    const { customer } = req;

    if (!type || !amount || amount <= 0) {
      return res.status(400).json({ error: 'Tipo e valor são obrigatórios.' });
    }

    if (!['credit', 'debit'].includes(type)) {
      return res.status(400).json({ error: 'Tipo deve ser "credit" ou "debit".' });
    }

    try {
      if (type === 'debit') {
        const statements = await accountService.getStatements(customer.id);
        const balance = getBalance(statements);
        
        if (balance < amount) {
          return res.status(400).json({ error: "Saldo insuficiente!" });
        }
      }

      const statementOperation = {
        description: description || (type === 'credit' ? 'Depósito' : 'Saque'),
        amount,
        type
      };

      await accountService.addStatement(customer.id, statementOperation);
      const message = type === 'credit' ? 'Depósito realizado com sucesso.' : 'Saque realizado com sucesso.';
      return res.status(201).json({ message });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },

  getAllTransactions: async (req, res) => {
    const { customer } = req;
    try {
      const transactions = await accountService.getStatements(customer.id);
      return res.json(transactions);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },

  getTransactionsByDate: async (req, res) => {
    const { customer } = req;
    const { date } = req.query;

    if (!date) {
      return res.status(400).json({ error: 'Parâmetro date é obrigatório.' });
    }

    try {
      const transactions = await accountService.getStatements(customer.id);
      const filteredTransactions = transactions.filter((stmt) => {
        const stmtDate = new Date(stmt.created_at).toISOString().split('T')[0];
        return stmtDate === date;
      });

      return res.json(filteredTransactions);
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
