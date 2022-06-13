const router = require('express').Router();

const { adminValidate } = require('../middlewares/adminValidate');
const { validateJWT } = require('../middlewares/validate-JWT');

const { createCategory, deleteCategory, listCategories, updateCategory } = require('../controllers/categories')

router.post('/', validateJWT, adminValidate, createCategory);
router.get('/', validateJWT, adminValidate, listCategories);
router.put("/:id", validateJWT, adminValidate, updateCategory);

router.delete('/delete/:id', validateJWT, adminValidate, deleteCategory);

module.exports = router;
