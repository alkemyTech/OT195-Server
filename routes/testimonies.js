const { Router } = require("express");
const { check } = require("express-validator");

const {
  createTestimony,
  modifyTestimony,
  allTestimonies,
  deletedTestimony,
  detailTestimonies,
} = require("../controllers/testimonies");
const { validateJWT } = require("../middlewares/validate-JWT");
const { adminValidate } = require("../middlewares/adminValidate");
const { upload } = require("../middlewares/multer");

const router = Router();

router.post(
  "/",
  [
    validateJWT,
    check("name", "'name' field is required in the request's body'.")
      .notEmpty()
      .isString()
      .withMessage("'name' field must be a string."),
    check("content", "'content' field is required in the request's body'.")
      .notEmpty()
      .isString()
      .withMessage("'content' field must be a string."),
    adminValidate,
  ],
  createTestimony
);

router.put(
  "/:id",
  [
    validateJWT,
    check("id", "'id' is required on the request params.")
      .notEmpty()
      .isInt()
      .withMessage("'id' must be a integer number."),
    check("name", "'name' field must be a string.").isString().optional(),
    check("content", "'content' field must be a string.").isString().optional(),
    adminValidate,
  ],
  modifyTestimony
);

router.get("/", allTestimonies);

router.delete(
  "/:id",
  [
    validateJWT,
    check("id", "'id' is required on the request params.")
      .notEmpty()
      .isInt()
      .withMessage("'id' must be a integer number."),

    adminValidate,
  ],
  deletedTestimony
);

router.get(
  "/:id",
  [
    validateJWT,
    check("id", "'id' is required on the request params.")
      .notEmpty()
      .isInt()
      .withMessage("'id' must be a integer number."),
    adminValidate,
  ],
  detailTestimonies
);

module.exports = router;
