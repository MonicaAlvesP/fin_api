const express = require('express');
const accountController = require('../controllers/accountController');
const { verifyExistsAccountCPF } = require('../middlewares/verifyAccount');

const router = express.Router();

router.post("/accounts", accountController.createAccount);
/**
 * @swagger
 * /accounts:
 *   post:
 *     tags:
 *       - Contas
 *     summary: Criar uma nova conta
 *     description: Cria uma nova conta bancária com CPF e nome (não requer autenticação)
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateAccountRequest'
 *     responses:
 *       201:
 *         description: Conta criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Conta criada com sucesso!"
 *       400:
 *         description: CPF já existe
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/me/transactions", verifyExistsAccountCPF, accountController.getAllTransactions);

/**
 * @swagger
 * /me/transactions:
 *   get:
 *     tags:
 *       - Transações
 *     summary: Listar todas as transações
 *     description: Retorna todas as transações da conta do usuário logado (extrato completo)
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Transações obtidas com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Transaction'
 *       404:
 *         description: Conta não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /me/transactions/date:
 *   get:
 *     tags:
 *       - Transações
 *     summary: Listar transações por data
 *     description: Retorna as transações da conta filtradas por data específica
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: date
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *         description: Data para filtrar (YYYY-MM-DD)
 *         example: '2025-11-23'
 *     responses:
 *       200:
 *         description: Transações filtradas obtidas com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Transaction'
 *       404:
 *         description: Conta não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/me/transactions/date", verifyExistsAccountCPF, accountController.getTransactionsByDate);

/**
 * @swagger
 * /me/transactions:
 *   post:
 *     tags:
 *       - Transações
 *     summary: Criar transação (depósito/saque)
 *     description: Cria uma nova transação na conta do usuário logado
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: ['type', 'amount']
 *             properties:
 *               type:
 *                 type: string
 *                 enum: ['credit', 'debit']
 *                 description: Tipo da transação
 *                 example: 'credit'
 *               amount:
 *                 type: number
 *                 minimum: 0.01
 *                 description: Valor da transação
 *                 example: 500.00
 *               description:
 *                 type: string
 *                 description: Descrição da transação
 *                 example: 'Depósito em conta'
 *     responses:
 *       201:
 *         description: Transação criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Transação realizada com sucesso!"
 *       400:
 *         description: Dados inválidos ou saldo insuficiente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Conta não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post("/me/transactions", verifyExistsAccountCPF, accountController.createTransaction);

/**
 * @swagger
 * /me:
 *   put:
 *     tags:
 *       - Contas
 *     summary: Atualizar conta
 *     description: Atualiza as informações da conta do usuário logado
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateAccountRequest'
 *     responses:
 *       200:
 *         description: Conta atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Conta atualizada com sucesso!"
 *       404:
 *         description: Conta não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.put("/me", verifyExistsAccountCPF, accountController.updateAccount);

/**
 * @swagger
 * /me:
 *   get:
 *     tags:
 *       - Contas
 *     summary: Obter informações da conta
 *     description: Retorna as informações da conta do usuário logado
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Informações da conta obtidas com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Account'
 *       404:
 *         description: Conta não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/me", verifyExistsAccountCPF, accountController.getAccount);

/**
 * @swagger
 * /me:
 *   delete:
 *     tags:
 *       - Contas
 *     summary: Deletar conta
 *     description: Remove a conta do usuário logado do sistema
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Conta deletada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Conta deletada com sucesso!"
 *       400:
 *         description: Conta com saldo não pode ser deletada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Conta não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.delete("/me", verifyExistsAccountCPF, accountController.deleteAccount);

/**
 * @swagger
 * /me/balance:
 *   get:
 *     tags:
 *       - Contas
 *     summary: Obter saldo da conta
 *     description: Retorna o saldo atual da conta do usuário logado
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Saldo obtido com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 balance:
 *                   type: number
 *                   description: Saldo atual da conta
 *                   example: 1500.75
 *       404:
 *         description: Conta não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/me/balance", verifyExistsAccountCPF, accountController.getBalance);

module.exports = router;