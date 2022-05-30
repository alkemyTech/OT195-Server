const { Router } = require("express");
const { check } = require("express-validator");

// Controllers
const { getNewsDetails, createNews } = require("../controllers/news");

// Middleware
const { checkValidator } = require("../middlewares/userValidate");
const { validateJWT } = require("../middlewares/validate-JWT");
const { adminValidate } = require("../middlewares/adminValidate");

const router = Router();

// GET news details
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

// POST news
router.post(
  "/",
  validateJWT,
  adminValidate,
  [
    check(
      "name",
      `The field 'name' is required on the request params.`
    ).exists(),
    check(
      "content",
      `The field 'content' is required on the request params.`
    ).exists(),
    check(
      "image",
      `The field 'image' is required on the request params.`
    ).exists(),
    check(
      "categoryId",
      `The field 'categoryId' is required on the request params.`
    ).exists(),
    checkValidator,
  ],
  createNews
);

module.exports = router;
