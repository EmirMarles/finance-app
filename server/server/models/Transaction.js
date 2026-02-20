const mongoose = require('mongoose')

const transactionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    avatar: String,
    name: String,
    category: String,
    date: Date,
    amount: Number,
    recurring: Boolean
}, { timestamps: true });


module.exports = mongoose.model("Transaction", transactionSchema)