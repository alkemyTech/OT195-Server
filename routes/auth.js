const express = require('express');
const router = express.Router();
const {logIn, signUp } = require("../controllers/auth");
const {loginValidator, registerValidator, checkValidator} = require("../middlewares/userValidate");

router.post('/login', loginValidator, checkValidator, logIn);
router.post('/register', registerValidator, checkValidator, signUp)

module.exports = router;