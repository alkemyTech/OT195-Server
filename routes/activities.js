const { Router } = require("express");
const { check } = require("express-validator");

// Controllers

const {
  createActivity,
  putActivity,
  getActivityById,
  getActivities,
  deletedActivity
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
    check("name", `The field 'name' is required on the request params.`)
      .exists()
      .isString()
      .withMessage("The field 'name' must be a string."),
    check("content", `The field 'content' is required on the request params.`)
      .exists()
      .isString()
      .withMessage("The field 'content' must be a string."),
    checkValidator,
  ],
  createActivity
);

router.get("/", 
// [validateJWT, adminValidate],
 getActivities);

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
    check("name", "The field 'name' must be a string.").isString().optional(),
    check("content", "The field 'content' must be a string.")
      .isString()
      .optional(),
    checkValidator,
  ],
  putActivity
);

//ruta para eleminar la actividad
router.delete( 
  "/:id",
  [
    validateJWT,
    adminValidate,
    check("id", "'id' is required on the request params.")
      .notEmpty()
      .isInt()
      .withMessage("'id' must be a integer number."),

  ],
  deletedActivity
);

module.exports = router;
