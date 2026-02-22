const User = require('../models/User')
const Transaction = require('../models/Transaction')

exports.getTransactions = async (req, res) => {
    try {
        const userId = req.params.id;
        
        const transactions = await Transaction.find({ user: userId })
        if (!transactions) {
            return res.status(400).json({ message: "No transcations" })
        }
        return res.status(200).json(transactions)
    }
    catch (err) {
        console.error('error', err)
    }
}