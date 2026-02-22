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
    /// json structure
    const budget = {
        category: "Entertainment",
        maximum: 50,
        theme: "#277C78"
    }
    ///
    return
}

exports.getBudgets = async (req, res) => {
    try {
        const userId = req.params.id

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
    // db query 

    const budgets = [{
        category: "Entertainment",
        maximum: 50,
        theme: "#277C78"
    }, {
        category: "Entertainment",
        maximum: 50,
        theme: "#277C78"
    }, {
        category: "Entertainment",
        maximum: 50,
        theme: "#277C78"
    }]

    return budgets
}

exports.updateBudget = async (req, res) => {
    return
}

exports.deleteBudget = async (req, res) => {
    return
}