const express = require("express");
const router = express.Router();
const { logIn, signUp, getUserDetails } = require("../controllers/auth");
const {
  loginValidator,
  registerValidator,
  checkValidator,
} = require("../middlewares/userValidate");
const { validateJWT } = require("../middlewares/validate-JWT");

router.post("/login", loginValidator, checkValidator, logIn);
router.post("/register", registerValidator, checkValidator, signUp);

router.get("/me", [validateJWT], getUserDetails);

module.exports = router;
