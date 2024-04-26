const express = require('express');
const router = express.Router();
const { signup, login } = require('../Controllers/AuthController');
const { body } = require('express-validator');

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

module.exports = router
