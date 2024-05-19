const express = require('express');
const router = express.Router();
const {
    addAdminUser,
    getAllAdminUsers,
    getAdminUserById,
    editAdminUser,
    deleteAdminUser
} = require('../../Admin/Controllers/UserController');
const verifyToken = require('../../Middleware/Authenticating');

router.post('/adduser', addAdminUser);
router.get('/getAdmins', verifyToken, getAllAdminUsers);
router.get('/getAdmin/:id', verifyToken, getAdminUserById);
router.put('/editAdmin/:id', verifyToken, editAdminUser);
router.delete('/deleteAdmin/:id', verifyToken, deleteAdminUser);

module.exports = router;
