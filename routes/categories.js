const router = require('express').Router();

const { adminValidate } = require('../middlewares/adminValidate');
const { validateJWT } = require('../middlewares/validate-JWT');

const { createCategory, deleteCategory } = require('../controllers/categories')

router.post('/', validateJWT, adminValidate, createCategory);

router.delete('/delete/:id', validateJWT, adminValidate, deleteCategory);

module.exports = router;