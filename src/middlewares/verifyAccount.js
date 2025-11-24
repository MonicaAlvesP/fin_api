const accountService = require('../services/accountService');

async function verifyExistsAccountCPF(req, res, next) {
  // --- Primeiro, verifica se tem CPF no header ---
  let cpf = req.headers.cpf;

  // --- Se não tem CPF no header, verifica se tem Bearer token (requisições do Swagger) ---
  if (!cpf) {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      cpf = authHeader.substring(7);
    }
  }

  if (!cpf) {
    return res.status(400).json({
      error: "CPF obrigatório. Adicione no header 'cpf' ou como Bearer token."
    });
  }

  try {
    const customer = await accountService.findCustomerByCPF(cpf);

    if (!customer) {
      return res.status(404).json({ error: 'Cliente não encontrado.' });
    }

    req.customer = customer;
    return next();
  } catch (error) {
    return res.status(500).json({
      error: "Erro interno do servidor"
    });
  }
}

module.exports = { verifyExistsAccountCPF };
