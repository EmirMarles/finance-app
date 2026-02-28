const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const authRoutes = require('./routes/authRoutes')
const crudRoutes = require('./routes/crudRoutes')
// const db = require('./db')
const connectDB = require('./db')


const app = express();


app.use(cors({
    origin: [
        "https://finance-app-website.onrender.com",
        "http://localhost:5173"
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

app.use(express.json());

const PORT = 5000

app.use('/api/auth', authRoutes)
app.use('/api/crud', crudRoutes)

connectDB();

// https://finance-app-website.onrender.com

app.listen(PORT, () => {
    console.log('server is running on PORT 5000')
})