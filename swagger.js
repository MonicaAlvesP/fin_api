const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Fin API',
      version: '1.0.0',
      description: `API financeira desenvolvida para fins de estudos e aprendizado em Node.js.`,
      contact: {
        name: 'Mônica Alves',
      },
    },
    servers: [
      {
        url: 'http://localhost:3333',
        description: 'Servidor de desenvolvimento',
      },
    ],
    security: [
      {
        BearerAuth: []
      }
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'CPF',
          description: 'Digite o CPF de uma conta existente como Bearer token para autenticação.'
        }
      },
      schemas: {
        Account: {
          type: 'object',
          required: ['cpf', 'name'],
          properties: {
            id: {
              type: 'string',
              format: 'uuid',
              description: 'ID único da conta',
              example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890'
            },
            cpf: {
              type: 'string',
              description: 'CPF do titular da conta',
              example: '12345678901'
            },
            name: {
              type: 'string',
              description: 'Nome do titular da conta',
              example: 'João Silva'
            },
            balance: {
              type: 'number',
              description: 'Saldo da conta',
              example: 1000.50
            },
            statement: {
              type: 'array',
              description: 'Extrato da conta',
              items: {
                $ref: '#/components/schemas/Transaction'
              }
            }
          }
        },
        Transaction: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              format: 'uuid',
              description: 'ID único da transação',
              example: 'b2c3d4e5-f6a7-8901-bcde-f23456789012'
            },
            description: {
              type: 'string',
              description: 'Descrição da transação',
              example: 'Depósito em conta'
            },
            amount: {
              type: 'number',
              description: 'Valor da transação',
              example: 500.00
            },
            type: {
              type: 'string',
              enum: ['credit', 'debit'],
              description: 'Tipo da transação',
              example: 'credit'
            },
            created_at: {
              type: 'string',
              format: 'date-time',
              description: 'Data e hora da transação',
              example: '2025-11-23T10:30:00.000Z'
            }
          }
        },
        CreateAccountRequest: {
          type: 'object',
          required: ['cpf', 'name'],
          properties: {
            cpf: {
              type: 'string',
              description: 'CPF do titular da conta',
              example: '12345678901'
            },
            name: {
              type: 'string',
              description: 'Nome do titular da conta',
              example: 'João Silva'
            }
          }
        },
        DepositRequest: {
          type: 'object',
          required: ['description', 'amount'],
          properties: {
            description: {
              type: 'string',
              description: 'Descrição do depósito',
              example: 'Depósito em conta'
            },
            amount: {
              type: 'number',
              minimum: 0.01,
              description: 'Valor do depósito',
              example: 500.00
            }
          }
        },
        WithdrawRequest: {
          type: 'object',
          required: ['description', 'amount'],
          properties: {
            description: {
              type: 'string',
              description: 'Descrição do saque',
              example: 'Saque em conta'
            },
            amount: {
              type: 'number',
              minimum: 0.01,
              description: 'Valor do saque',
              example: 200.00
            }
          }
        },
        UpdateAccountRequest: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              description: 'Novo nome do titular da conta',
              example: 'João Silva Santos'
            }
          }
        },
        Error: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              description: 'Mensagem de erro',
              example: 'Erro interno do servidor'
            }
          }
        }
      },
      parameters: {
        cpfHeader: {
          in: 'header',
          name: 'cpf',
          required: true,
          schema: {
            type: 'string'
          },
          description: 'CPF do titular da conta',
          example: '12345678901'
        },
        dateQuery: {
          in: 'query',
          name: 'date',
          required: true,
          schema: {
            type: 'string',
            format: 'date'
          },
          description: 'Data para filtrar o extrato (formato: YYYY-MM-DD)',
          example: '2025-11-23'
        }
      }
    }
  },
  apis: ['./src/routes/*.js'],
};

const specs = swaggerJsdoc(options);

module.exports = {
  swaggerUi,
  specs
};