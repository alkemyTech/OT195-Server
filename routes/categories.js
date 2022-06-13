const router = require('express').Router();

const { adminValidate } = require('../middlewares/adminValidate');
const { validateJWT } = require('../middlewares/validate-JWT');

const { createCategory, listCategories } = require('../controllers/categories');

router.post('/', validateJWT, adminValidate, createCategory);
router.get('/', validateJWT, adminValidate, listCategories);


module.exports = router;