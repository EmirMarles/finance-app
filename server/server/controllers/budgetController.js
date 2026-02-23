const User = require("../models/User")
const Budget = require("../models/Budget")

exports.getBalance = async (req, res) => {
    try {
        const userId = req.params.id

        const user = await User.findOne({ _id: userId })

        if (!user) {
            return res.status(400).json({ message: "User not found" })
        }
        const balance = user.balance;
        return res.status(200).json(balance)
    }
    catch (err) {
        return res.status(500).json({ message: `error brochacho !${err}` })
    }
}

exports.createBudget = async (req, res) => {
    try {
        const userId = req.params.id
        const budgetObject = req.body;
        const user = await User.findOne({ _id: userId })
        if (!user) {
            console.error('User not found', userId)
            return res.status(404).json({ message: "Not authorized!" })
        }
        if (Number(budgetObject.maximum) < 0) {
            return res.status(400).json({ message: "Error" })
        }
        const newBudget = new Budget({
            user: userId,
            category: budgetObject.category,
            maximum: Number(budgetObject.maximum),
            theme: budgetObject.theme
        })

        await newBudget.save();

        res.status(201).json({
            message: "Budget saved succesfully",
            budget: newBudget
        })
    }
    catch (err) {
        return res.status(500).json({ message: err })
    }
    ///
    return
}

exports.getBudgets = async (req, res) => {
    try {
        const userId = req.params.id

        if (!userId) {
            return res.status(400).json({ message: "Not authorized" })
        }
        if (userId === undefined) {
            return res.status(400).json({ message: "Not authorized" })
        }

        const budgets = await Budget.find({ user: userId })
        if (!budgets) {
            return res.status(400).json({ message: "No budgets" })
        }
        return res.status(200).json(budgets)

    }
    catch (err) {
        console.error(err)
        return res.status(500).json({ message: err })
    }
}

exports.updateBudget = async (req, res) => {
    try {
        const budgetId = req.params.id
        const updatedBudget = req.body

        const category = updatedBudget.category
        const theme = updatedBudget.theme
        const maximum = Number(updatedBudget.maximum)

        const budget = await Budget.findOne({ _id: budgetId })
        console.log(budget)
        if (!budget) {
            return res.status(404).json({ message: "Not Found!" })
        }
        budget.category = category ?? budget.category;
        budget.maximum = maximum ?? budget.maximum;
        budget.theme = theme ?? budget.theme;

        await budget.save();

        return res.status(200).json({ message: "Updated Successfully" })

    } catch (err) {
        console.error(err)
        return res.status(500).json({ message: "Internal server error" })
    }
}

exports.deleteBudget = async (req, res) => {
    try {
        const budgetId = req.params.id

        console.log(budgetId)

        if (!budgetId) {
            return res.status(400).json({ message: "Missing Data!" })
        }

        // const user = await User.findOne({ _id: userId })
        const budget = await Budget.findById(budgetId)
        if (!budget) {
            return res.status(404).json({ message: "Not found!" })
        }
        // if (budget.user.toString() !== user._id) {
        //     return res.status(403).json({ message: "Not authorized!" })
        // }
        await Budget.findByIdAndDelete({ _id: budget._id })
        return res.status(201).json({ message: "Budget Deleted succesfully" })
    }
    catch (err) {
        return res.status(500).json({ message: "Internal Server Error" })
    }
}