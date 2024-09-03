const jwt = require('jsonwebtoken');
const User = require('../Models/User');

const authMiddleware = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Authentication failed: No token provided' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded._id);
        if (!req.user) {
            return res.status(401).json({ message: 'Authentication failed: User not found' });
        }
        next();
    } catch (err) {
        res.status(401).json({ message: "Authentication failed: Invalid token." });
    }
};

module.exports = authMiddleware;
