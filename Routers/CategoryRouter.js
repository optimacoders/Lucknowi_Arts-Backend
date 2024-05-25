const express = require('express');
const router = express.Router();
const { addCategory, getAllCategories, deleteCategory, editCategory, getCategoryById } = require('../Controllers/CategoryController');
const verifyToken = require('../Middleware/Authenticating');

router.post("/add-category", verifyToken, addCategory);
router.get("/", getAllCategories);
router.get("/:id", verifyToken, getCategoryById);

router.delete("/delete-category/:id", verifyToken, deleteCategory);
router.put("/edit-category/:id", verifyToken, editCategory);

module.exports = router;
