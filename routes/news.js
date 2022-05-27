const { Router } = require("express");
const { check } = require("express-validator");

// controllers
const { getNewsDetails } = require("../controllers/news");
const { checkValidator } = require("../middlewares/userValidate");

const router = Router();

// GET News details
router.get(
  "/:id",
  [
    checkValidator,
    check("id", `The field 'id' is required on the request params.`)
      .notEmpty()
      .isInt()
      .withMessage(`The field 'id' must be a number.`),
  ],
  getNewsDetails
);

module.exports = router;
