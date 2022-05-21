const express = require('express');
const router = express.Router();
const {logIn} = require("../controllers/auth");
const {loginValidator, checkValidator} = require("../middlewares/userValidate");

router.post('/login', loginValidator, checkValidator, logIn);

module.exports = router;