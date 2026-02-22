const Pot = require('../models/Pot')

exports.getPots = async (req, res) => {
    try {
        const userId = req.params.id
        if (!userId) {
            return res.status(400).json({ message: "Not authorized" })
        }
        const pots = await Pot.find({ user: userId })
        if (!pots) {
            return res.status(400).json({ message: "No Pots" })
        }
        return res.status(200).json(pots)
    }
    catch (err) {
        console.error(err)
        return res.status(500).json({ message: err })
    }
}

exports.createPot = async (req, res) => {
    return
}

exports.updatePot = async (req, res) => {
    return
}

exports.deletePot = async (req, res) => {
    return
}