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
    try {
        const userId = req.user.id; // from auth middleware
        const { name, target, total, theme } = req.body;

        const newPot = new Pot({
            user: userId,
            name,
            target,
            total: total || 0,
            theme
        });

        await newPot.save();

        res.status(201).json({
            message: "Pot created successfully",
            pot: newPot
        });

    } catch (err) {
        res.status(500).json({ message: "Internal Server Error" });
    }
};

exports.updatePot = async (req, res) => {
    try {
        const { potId } = req.params;
        const userId = req.user.id;
        const { name, target, total, theme } = req.body;

        const pot = await Pot.findById(potId);

        if (!pot) {
            return res.status(404).json({ message: "Pot not found" });
        }

        if (pot.user.toString() !== userId) {
            return res.status(403).json({ message: "Not authorized" });
        }

        pot.name = name ?? pot.name;
        pot.target = target ?? pot.target;
        pot.total = total ?? pot.total;
        pot.theme = theme ?? pot.theme;

        await pot.save();

        res.status(200).json({
            message: "Pot updated successfully",
            pot
        });

    } catch (err) {
        res.status(500).json({ message: "Internal Server Error" });
    }
}

exports.deletePot = async (req, res) => {
    try {
        const { potId } = req.params;
        const userId = req.user.id;

        const pot = await Pot.findById(potId);

        if (!pot) {
            return res.status(404).json({ message: "Pot not found" });
        }

        if (pot.user.toString() !== userId) {
            return res.status(403).json({ message: "Not authorized" });
        }

        await Pot.findByIdAndDelete(potId);

        res.status(200).json({ message: "Pot deleted successfully" });

    } catch (err) {
        res.status(500).json({ message: "Internal Server Error" });
    }
};