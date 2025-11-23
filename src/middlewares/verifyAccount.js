const accountService = require('../services/accountService');

async function verifyExistsAccountCPF(req, res, next) {
  const { cpf } = req.headers;

  const customer = await accountService.findCustomerByCPF(cpf);

  if (!customer) {
    return res.status(404).json({ error: 'Cliente não encontrado.' });
  }

  req.customer = customer;
  return next();
}

module.exports = { verifyExistsAccountCPF };
