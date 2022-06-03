var express = require("express");
const { getPublic } = require("../controllers/organizations");
var router = express.Router();

/* GET Organizatios public listing. */
router.get("/1/public", getPublic);

module.exports = router;
