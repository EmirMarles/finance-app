const mongoose = require('mongoose')

const potSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    name: String,
    target: Number,
    total: Number,
    theme: String
});

module.exports = mongoose.model("Pot", potSchema);