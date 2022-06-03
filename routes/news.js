const { Router } = require("express");
const { check } = require("express-validator");

// controllers

const {
  getNewsDetails,
  getNewsList,
  createNews,
  modifyNews,
  deleteNew,
} = require("../controllers/news");
const { checkValidator } = require("../middlewares/userValidate");
const { validateJWT } = require("../middlewares/validate-JWT");
const { adminValidate } = require("../middlewares/adminValidate");

const router = Router();

// GET news list
router.get("/", getNewsList);

// GET news details
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

// POST news
router.post(
  "/",
  validateJWT,
  adminValidate,
  [
    check("name", `The field 'name' is required on the request body.`).exists(),
    check(
      "content",
      `The field 'content' is required on the request body.`
    ).exists(),
    check(
      "image",
      `The field 'image' is required on the request body.`
    ).exists(),
    check(
      "categoryId",
      `The field 'categoryId' is required on the request body.`
    ).exists(),
    checkValidator,
  ],
  createNews
);

router.put("/:id", validateJWT, adminValidate, modifyNews);

router.delete(
  "/:id",
  [
    validateJWT,
    check("id", `The field 'id' is required on the request params.`)
      .notEmpty()
      .isInt()
      .withMessage(`The field 'id' must be a number.`),
  ],
  deleteNew
);

module.exports = router;
