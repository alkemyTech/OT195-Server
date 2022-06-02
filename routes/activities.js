const { Router } = require("express");
const { check } = require("express-validator");

// Controllers

const { createActivity } = require("../controllers/activities");
const { checkValidator } = require("../middlewares/userValidate");
const { validateJWT } = require("../middlewares/validate-JWT");
const { adminValidate } = require("../middlewares/adminValidate");

const router = Router();

// POST activities
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
    checkValidator,
  ],
  createActivity
);

module.exports = router;
