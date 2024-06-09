const express = require('express');
const router = express.Router();
const { getAllColors, getOneColor, addColor, editColor, deleteColor } = require("../Controllers/ColorController");
const verifyToken = require('../../Middleware/Authenticating');

router.post('/addcolor', verifyToken, addColor);
router.get('/', getAllColors);
router.get('/:id', verifyToken, getOneColor);
router.put('/editcolor/:id', verifyToken, editColor);
router.delete('/deletecolor/:id', verifyToken, deleteColor);

module.exports = router;
