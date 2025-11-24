const express = require('express');
const accountRoutes = require('./routes/accountRoutes');
const initializeTables = require('./database/initDatabase');
const { swaggerUi, specs } = require('../swagger');

const app = express();
// --- CONFIGURAÇÕES DO SWAGGER ---
app.disable('x-powered-by');

app.use(express.json());

// --- SWAGGER DOCUMENTATION ---
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, {
  customCss: `
    .swagger-ui .info .description p { color: #333 !important; }
    .swagger-ui .info .description h2 { color: #333 !important; }
    .swagger-ui .info .description ul { color: #333 !important; }
    .swagger-ui .info .description li { color: #333 !important; }
    .swagger-ui .info .description code { color: #333 !important; }
  `,
  customSiteTitle: 'Fin API - Documentação'
}));

// --- ROTA DE INSTRUÇÕES PARA ACESSAR A DOCUMENTAÇÃO ---
app.get('/', (req, res) => {
  res.json({
    message: "🏦 Fin API - Sistema Bancário",
    version: "1.0.0",
    documentation: {
      url: "/api-docs",
      access: "Público - Interface visível, testes requerem Bearer token (CPF)",
      instructions: [
        "1. Acesse /api-docs para ver a documentação",
        "2. Crie uma conta: POST /account com { name, cpf }",
        "3. No Swagger, clique em 'Authorize' e use o CPF como Bearer token",
        "4. Teste todos os endpoints autenticados na interface"
      ]
    },
    endpoints: {
      "POST /account": "Criar nova conta (não requer autenticação)",
      "GET /api-docs": "Documentação completa"
    }
  });
});

// --- INICIALIZANDO TABELAS DO BANCO DE DADOS ---
initializeTables();

app.use(accountRoutes);

app.listen(3333, () => {
  console.log('Servidor rodando na porta 3333 🚀');
  console.log('Documentação disponível em: http://localhost:3333/api-docs');
});
