const { Router } = require("express");
const { check } = require("express-validator");

// Controllers

const {
  createActivity,
  putActivity,
  getActivityById,
  getActivities,
} = require("../controllers/activities");
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

router.get("/", [validateJWT, adminValidate], getActivities);

router.get(
  "/:id",
  [
    check("id", `The field 'id' is required on the request params.`)
      .notEmpty()
      .isInt()
      .withMessage(`The field 'id' must be a number.`),
    checkValidator,
  ],
  getActivityById
);

router.put(
  "/:id",
  [
    validateJWT,
    adminValidate,
    check("id", `The field 'id' is required on the request params.`)
      .notEmpty()
      .isInt()
      .withMessage(`The field 'id' must be a number.`),
    checkValidator,
  ],
  putActivity
);

module.exports = router;
