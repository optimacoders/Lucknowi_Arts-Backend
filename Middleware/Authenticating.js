const jwt = require('jsonwebtoken');
const User = require('../Models/Usermodel');
const dotenv = require("dotenv")

dotenv.config();
const jwt_key = process.env.JWT_SECRET;
const verifyToken = (req, res, next) => {
    let token = req.headers.authorization
    if (!token) {
        return res.status(401).json({
            data: { status: false, msg: "Unauthorized - No token" }
        })
    }

    token = token.split(' ')[1];
    jwt.verify(token, jwt_key, async (err, valid) => {
        if (err) {
            return res.status(401).json({
                data: { status: false, msg: "Unauthorized - Invalid Token" }
            })
        } else {
            const user = await User.findById(valid.user.id);
            if (!user) {
                return res.status(401).json({ message: 'Invalid token. User not found.' });
            }
            req.user = user;
            next();
        }
    })
}

module.exports = verifyToken;