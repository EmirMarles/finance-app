const User = require("../models/User")

exports.getBalance = async (req, res) => {
    try {
        let balance = {
            "current": 4836.00,
            "income": 3814.25,
            "expenses": 1700.50
        }
        // const { _id } = req.body
        // const user = await User.findOne({ _id: _id })
        // console.log('user found!', user)
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