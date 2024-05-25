const express = require('express');
const router = express.Router();
const { signup, login, getuserDetails, editUserDetails } = require('../Controllers/AuthController');
const { body } = require('express-validator');
const verifyToken = require('../Middleware/Authenticating');

router.post('/login', [
    body('email').isEmail(),
    body('password').exists()
], login);

router.post('/signup', [
    body('name').exists(),
    body('email').isEmail(),
    body('password').exists(),
    body('mobileNo').isMobilePhone()
], signup);

router.get("/getuserdetails",verifyToken, getuserDetails)
router.put("/edituserDetails",verifyToken, editUserDetails )

module.exports = router
