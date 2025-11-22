const express = require('express');
const accountController = require('../controllers/accountController');
const { verifyExistsAccountCPF } = require('../middlewares/verifyAccount');

const router = express.Router();

router.post("/account", accountController.createAccount);
router.get("/statement", verifyExistsAccountCPF, accountController.getStatement);
router.post("/deposit", verifyExistsAccountCPF, accountController.deposit);
router.post("/withdraw", verifyExistsAccountCPF, accountController.withdraw);
router.get("/statement/date", verifyExistsAccountCPF, accountController.getStatementByDate);
router.put("/account", verifyExistsAccountCPF, accountController.updateAccount);
router.get("/account", verifyExistsAccountCPF, accountController.getAccount);
router.delete("/account", verifyExistsAccountCPF, accountController.deleteAccount);
router.get("/balance", verifyExistsAccountCPF, accountController.getBalance);

module.exports = router;
