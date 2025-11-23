const { v4: uuidv4 } = require('uuid');
const db = require('../database/connection');

const accountService = {
  createAccount: (name, cpf) => {
    return new Promise((resolve, reject) => {
      const id = uuidv4();
      db.run(
        'INSERT INTO customers (id, name, cpf) VALUES (?, ?, ?)',
        [id, name, cpf],
        function (err) {
          if (err) {
            reject(new Error('CPF já existe.'));
          } else {
            resolve({ id, name, cpf, statement: [] });
          }
        }
      );
    });
  },

  findCustomerByCPF: (cpf) => {
    return new Promise((resolve, reject) => {
      db.get(
        'SELECT * FROM customers WHERE cpf = ?',
        [cpf],
        (err, row) => {
          if (err) reject(err);
          else resolve(row);
        }
      );
    });
  },

  updateCustomerName: (id, name) => {
    return new Promise((resolve, reject) => {
      db.run(
        'UPDATE customers SET name = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
        [name, id],
        function (err) {
          if (err) reject(err);
          else resolve({ changes: this.changes });
        }
      );
    });
  },

  deleteCustomer: (id) => {
    return new Promise((resolve, reject) => {
      db.run('DELETE FROM customers WHERE id = ?', [id], function (err) {
        if (err) reject(err);
        else resolve({ changes: this.changes });
      });
    });
  },

  addStatement: (customerId, statementOperation) => {
    return new Promise((resolve, reject) => {
      db.run(
        'INSERT INTO statements (customer_id, description, amount, type) VALUES (?, ?, ?, ?)',
        [customerId, statementOperation.description, statementOperation.amount, statementOperation.type],
        function (err) {
          if (err) reject(err);
          else resolve({ id: this.lastID });
        }
      );
    });
  },

  getStatements: (customerId) => {
    return new Promise((resolve, reject) => {
      db.all(
        'SELECT * FROM statements WHERE customer_id = ? ORDER BY created_at DESC',
        [customerId],
        (err, rows) => {
          if (err) reject(err);
          else resolve(rows || []);
        }
      );
    });
  }
};

module.exports = accountService;
