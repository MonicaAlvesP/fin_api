const express = require('express');
const accountRoutes = require('./routes/accountRoutes');

const app = express();

app.use(express.json());
app.use(accountRoutes);

app.listen(3333, () => {
  console.log('Servidor rodando na porta 3333 🚀');
  console.log('Documentação disponível em: http://localhost:3333/api-docs');
});
