const jwt = require('jsonwebtoken');
const User = require('../Model/Auth');


const authenticateToken = async (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user;

        // Check if the user exists in the database
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(401).json({ message: 'Invalid token. User not found.' });
        }

        // Check if the user has admin access by searching for any user with authenticator as "admin"
        const adminUser = await User.findOne({ authenticator: "admin" });
        if (adminUser && adminUser._id.equals(user._id)) {
            req.user.adminAccess = true;
        } else {
            req.user.adminAccess = false;
        }

        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token.' });
    }
};

module.exports = authenticateToken;