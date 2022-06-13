var express = require('express');
var router = express.Router();
const {getPublic} = require("../controllers/organizations");

/* GET Organizatios public listing. */
router.get('/1/public', getPublic);

module.exports = router;