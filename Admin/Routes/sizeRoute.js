const express = require('express');
const router = express.Router();
const { getAllSizes, addSize, editSize, deleteSize, getOneSize } = require("../Controllers/SizeController")
const verifyToken = require('../../Middleware/Authenticating');

router.post('/addsize', verifyToken, addSize);
router.get('/', verifyToken, getAllSizes);
router.get('/:id', verifyToken, getOneSize);
router.put('/editsize/:id', verifyToken, editSize);
router.delete('/deletesize/:id', verifyToken, deleteSize);

module.exports = router;
