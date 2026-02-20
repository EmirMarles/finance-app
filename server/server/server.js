const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const authRoutes = require('./routes/authRoutes')
const crudRoutes = require('./routes/crudRoutes') 
// const db = require('./db')
const connectDB = require('./db')

const app = express();

app.use(express.json());
app.use(cors())

const PORT = 5000

app.use('/api/auth', authRoutes)
app.use('/api/crud', crudRoutes)

connectDB();

app.listen(PORT, ()=>{
    console.log('server is running on PORT 5000')
})