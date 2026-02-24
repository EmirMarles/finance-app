const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt");
const User = require("../models/User")


exports.register = async (req, res) => {

    try {
        const { email, password } = req.body

        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(400).json({ message: "Such user already exists" })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = await User.create(
            {
                email,
                password: hashedPassword,
                role: "user"
            }
        )

        return res.status(201).json({
            message: "User registered successfully",
            userId: newUser._id
        });

    } catch (err) {
        return res.status(500).json({ message: "internal server error" })
    }
}

exports.login = async (req, res) => {
    try {
        const SECRET_KEY = process.env.JWT_SECRET;
        const { email, password } = req.body

        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ message: "No such user exists" })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return res.status(400).json({ message: "invalid password" })
        }

        const token = jwt.sign({
            id: user._id,
            role: user.role
        },
            SECRET_KEY,
            {
                expiresIn: "1h"
            }
        )

        return res.status(200).json({
            token,
            user: {
                _id: user._id,
                email: user.email,
                role: user.role
            }
        })
    } catch (err) {
        return res.status(500).json({ message: "Internal server problem" })
    }
}