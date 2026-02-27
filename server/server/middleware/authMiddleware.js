const jwt = require('jsonwebtoken')

exports.authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]

    if (!token) {
        return res.status(401).json({ message: "No token" })
    }
    try {
        console.log(process.env.JWT_SECRET)
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded   // 👈 attaching user to request
        next();
    } catch (err) {
        return res.status(401).json({ message: "Invalid token" })
    }
}