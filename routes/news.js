const { Router } = require("express");
const { check } = require("express-validator");

// controllers
const { getNewsDetails } = require("../controllers/news");

// middlewares
const { checkValidator } = require("../middlewares/userValidate");
const { validateJWT } = require("../middlewares/validate-JWT");

const router = Router();

// GET News details
router.get(
  "/:id",
  [
    validateJWT,
    check("id", `The field 'id' is required on the request params.`)
      .notEmpty()
      .isInt()
      .withMessage(`The field 'id' must be a number.`),
    checkValidator,
  ],
  getNewsDetails
);

module.exports = router;
