const accountService = require('../services/accountService');

function verifyExistsAccountCPF(req, res, next) {
  const { cpf } = req.headers;

  const customer = accountService.findCustomerByCPF(cpf);

  if (!customer) {
    return res.status(404).json({ error: 'Cliente não encontrado.' });
  }

  req.customer = customer;
  return next();
}

module.exports = { verifyExistsAccountCPF };
