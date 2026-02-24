const express = require('express');
// const { AddBudget } = require('../../../pages/Budgets/AddBudget');
const router = express.Router();
const { getBalance, createBudget, getBudgets, updateBudget, deleteBudget } = require('../controllers/budgetController')
const { getPots, createPot, updatePot, deletePot, addMoneyToPot, withdrawMoneyFromPot } = require('../controllers/potsController')
const { getTransactions, getRecurringBills, getRecurringBillsInfo } = require('../controllers/transactionsController')
const { authMiddleware } = require('../middleware/authMiddleware')

//balance

router.get('/balance/:id', getBalance)

// budgets
router.get('/budgets/:id', getBudgets)
router.post('/add-bugdet/:id', createBudget)
router.put('/update-budget/:id', updateBudget)
router.delete('/budget/:id', deleteBudget)

//pots
router.get('/pots/:id', getPots)
router.post('/create-pot/:id', createPot)
router.put('/update-pot/:id', authMiddleware, updatePot)
router.delete('/pot/:id', authMiddleware, deletePot)
router.put('/pot/add/:id', authMiddleware, addMoneyToPot)
router.put('/pot/withdraw/:id', authMiddleware, withdrawMoneyFromPot)

//transactions
router.get('/transactions/:id', getTransactions)
router.get('/recurring-bills/:id', authMiddleware, getRecurringBills)
router.get('/bills-info/:id', authMiddleware, getRecurringBillsInfo)

module.exports = router