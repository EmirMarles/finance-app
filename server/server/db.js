const mongoose = require('mongoose')
require("dotenv").config()
const mongoUrl = process.env.MONGO_URL


const connectDB = async () => {
    try {
        await mongoose.connect(mongoUrl)
        console.log('MongoDb connected')
    }
    catch (err) {
        console.error('error!', err)
        process.exit(1)
    }
}

module.exports = connectDB

