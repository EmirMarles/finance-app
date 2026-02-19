const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt");
const { use } = require("react");


let users = []
const SECRET_KEY = "supersecretkey";

exports.register = async (req, res) => {
    const { email, password } = req.body

    const existingUser = users.find(user => user.email === email)
    if (existingUser) {
        return res.status(400).json({ message: "such user already exists brochacho" })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = {
        id: Date.now(),
        email,
        password: hashedPassword,
        role: "user"
    }

    users.push(newUser)
    return res.status(201).json({ message: "User registered successfully" });
}

exports.login = async (req, res) => {
    const { email, password } = req.body

    const user = users.find(user => user.email === email)
    if (!user) {
        res.status(400).json({ message: "no such user brochacho" })
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        res.status(400).json({ message: "invalid password brochacho" })
    }

    const token = jwt.sign({
        id: user.id,
        role: user.role
    },
        SECRET_KEY,
        {
            expiresIn: "1h"
        }
    )

    res.json({
        token,
        user: {
            id: user.id,
            email: user.email,
            role: user.role
        }
    })
}