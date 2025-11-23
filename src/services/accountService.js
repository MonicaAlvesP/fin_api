const { v4: uuidv4 } = require('uuid');

const customers = [];

const accountService = {
  createAccount: (name, cpf) => {
    const customerAlreadyExists = customers.some((customer) => customer.cpf === cpf);

    if (customerAlreadyExists) {
      throw new Error('CPF já existe.');
    }

    const id = uuidv4();
    const newCustomer = {
      id,
      name,
      cpf,
      statement: []
    };

    customers.push(newCustomer);
    return newCustomer;
  },

  findCustomerByCPF: (cpf) => {
    return customers.find(customer => customer.cpf === cpf);
  },

  updateCustomerName: (customer, name) => {
    customer.name = name;
    return customer;
  },

  deleteCustomer: (customer) => {
    const index = customers.indexOf(customer);
    customers.splice(index, 1);
    return customers;
  },

  addStatement: (customer, statementOperation) => {
    customer.statement.push(statementOperation);
  }
};

module.exports = accountService;
