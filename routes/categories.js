const router = require('express').Router();

const { adminValidate } = require('../middlewares/adminValidate');
const { validateJWT } = require('../middlewares/validate-JWT');

const { createCategory } = require('../controllers/categories')

router.post('/', validateJWT, adminValidate, createCategory);


module.exports = router;