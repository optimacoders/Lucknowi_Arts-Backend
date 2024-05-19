const express = require('express');
const router = express.Router();
const { addAdminUser, getAllAdminUsers } = require('../../Admin/Controllers/UserController');
const verifyToken = require('../../Middleware/Authenticating');

router.post('/adduser', addAdminUser);
router.get('/getAdmins', verifyToken, getAllAdminUsers);

module.exports = router
