const express = require('express');
// const { AddBudget } = require('../../../pages/Budgets/AddBudget');
const router = express.Router();
const { getBalance, createBudget, getBudgets, updateBudget, deleteBudget } = require('../controllers/budgetController')
const { getPots, createPot, updatePot, deletePot } = require('../controllers/potsController')
const { getTransactions } = require('../controllers/transactionsController')


//balance

router.get('/balance/:id', getBalance)

// budgets
router.get('/budgets/:id', getBudgets)
router.post('/add-bugdet/:id', createBudget)
router.put('/update-budget/:id', updateBudget)
router.delete('/budget/:id', deleteBudget)

//pots
router.get('/pots/:id', getPots)
router.post('/create-pot', createPot)
router.put('/update-pot', updatePot)
router.delete('/pot', deletePot)

//transactions
router.get('/transactions/:id', getTransactions)

module.exports = router