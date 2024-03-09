const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authmiddleware.js');
const transactionController = require('../controller/transactioncontroller.js');

router.post('/', authenticateToken, transactionController.addTransaction);
router.get('/',authenticateToken, transactionController.getTransactions);
router.get('/summary', authenticateToken, transactionController.getTransactionSummary);
router.delete('/:id', authenticateToken, transactionController.deleteTransaction);

module.exports = router;
