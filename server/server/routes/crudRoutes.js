const express = require('express');
// const { AddBudget } = require('../../../pages/Budgets/AddBudget');
const router = express.Router();
const { createBudget, getBudgets, updateBudget, deleteBudget } = require('../controllers/budgetController')
const { getPots, createPot, updatePot, deletePot } = require('../controllers/potsController')
const { getTransactions } = require('../controllers/transactionsController')

// budgets
router.get('/budgets', getBudgets)
router.post('/add-bugdet', createBudget)
router.put('/update-budget', updateBudget)
router.delete('/budget', deleteBudget)

//pots
router.get('/pots', getPots)
router.post('/create-pot', createPot)
router.put('/update-pot', updatePot)
router.delete('/pot', deletePot)

//transactions
router.get('/transactions', getTransactions)

module.exports = router