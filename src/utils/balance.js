function getBalance(statement) {
  // --- REDUZINDO O EXTRATO PARA CALCULAR O SALDO ---
  const balance = statement.reduce((acc, operation) => {
    // --- SE FOR CRÉDITO, SOMAMOS, SE FOR DÉBITO, SUBTRAÍMOS ---
    if (operation.type === 'credit') {
      return acc + operation.amount;
    } else {
      return acc - operation.amount;
    }
  }, 0);

  return balance;
}

module.exports = { getBalance };