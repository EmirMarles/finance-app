const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    balance: {
        current: { type: Number, default: 0 },
        income: { type: Number, default: 0 },
        expenses: { type: Number, default: 0 }
    },
    role: {
        type: String,
        default: "user"
    }

}, { timestamps: true })

module.exports = mongoose.model("User", userSchema)