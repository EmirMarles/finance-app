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

exports.getRecurringBills = async (req, res) => {
    try {
        const userId = req.params.id;
        const transactions = await Transaction.find({ user: userId })
        if (!transactions) {
            return res.status(400).json({ message: "No transactions!" })
        }
        const recurringBills = transactions.filter((transaction) => transaction.recurring === true)
        if (!recurringBills) {
            return res.status(400).json({ message: "No recurring transactions!" })
        }
        return res.status(200).json(recurringBills)
    }
    catch (err) {
        return res.status(500).json({ message: "Internal Server Error!" })
    }
}

exports.getRecurringBillsInfo = async (req, res) => {
    try {
        const userId = req.user.id;
        const now = new Date();
        const sevenDaysLater = new Date();
        sevenDaysLater.setDate(now.getDate() + 7);

        const bills = await Transaction.find({
            user: userId,
            recurring: true
        });

        let upcomingBills = 0;
        let paidBills = 0;
        let dueSoonBills = 0;

        bills.forEach((bill) => {
            const billDate = new Date(bill.date);
            const amount = Math.abs(bill.amount);

            if (billDate < now) {
                paidBills += amount;
            }

            if (billDate > now) {
                upcomingBills += amount;
            }

            if (billDate > now && billDate <= sevenDaysLater) {
                dueSoonBills += amount;
            }
        });

        return res.status(200).json({
            upcomingBills,
            paidBills,
            dueSoonBills
        });

    } catch (err) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
};