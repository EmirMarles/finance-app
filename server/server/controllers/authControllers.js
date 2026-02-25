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

exports.refresh = async (req, res) => {
    try {
        const { refreshToken } = req.body;

        if (!refreshToken) {
            return res.status(401).json({ message: "No refresh token provided" });
        }

        // Verify refresh token
        const decoded = jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET
        );

        // Find user in DB
        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }

        // OPTIONAL BUT IMPORTANT:
        // Check if refresh token matches the one stored in DB
        if (user.refreshToken !== refreshToken) {
            return res.status(403).json({ message: "Invalid refresh token" });
        }

        // Create new access token
        const newAccessToken = jwt.sign(
            { id: user._id },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "15m" }
        );

        return res.json({ accessToken: newAccessToken });

    } catch (error) {
        return res.status(403).json({ message: "Invalid or expired refresh token" });
    }
};