var express = require('express');
var router = express.Router();
const { getPublic,modifyPublic } = require('../controllers/organizations')
const { validateJWT } = require("../middlewares/validate-JWT");
const { adminValidate } = require("../middlewares/adminValidate");


/* GET Organizatios public listing. */
router.get('/1/public', getPublic);
router.put('/1/public',
  validateJWT,
  adminValidate,
  modifyPublic);

module.exports = router;