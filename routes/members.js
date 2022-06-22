var express = require("express");
var router = express.Router();
const { check } = require("express-validator");


const { adminValidate } = require("../middlewares/adminValidate");
const { validateJWT } = require("../middlewares/validate-JWT");
const { checkValidator } = require("../middlewares/userValidate");

const {
  createMember,
  listMembers,
  updateMember,
  deleteMember,
} = require("../controllers/members");

/* GET members. */
router.get("/", validateJWT, adminValidate, listMembers);

// Create members
router.post("/", validateJWT, adminValidate,   [
  check("name", `The field 'name' is required.`)
    .exists()
    .isString()
    .withMessage("The field 'name' must be a string."),
  check("description", `The field 'description' is required.`)
    .exists()
    .isString()
    .withMessage("The field 'description' must be a string."),
  check("role", `The field 'role' is required.`)
    .exists()
    .isString()
    .withMessage("The field 'role' must be a string."),
  check("image", `The field 'image' is required.`)
    .exists()
    .isString()
    .withMessage("The field 'image' must be a string."),
  checkValidator,
] , createMember);

// Update members
router.put("/:id", [validateJWT, adminValidate],  [
  check("id", `The field 'id' is required.`)
    .notEmpty()
    .isInt()
    .withMessage(`The field 'id' must be a number.`),
  check("name", "The field 'name' must be a string.").isString().optional(),
  check("image", "The field 'image' must be a string.")
    .isString()
    .optional(),
  check("role" , "the field 'role' must be a string").isString().optional(),
  check("description" , "the field 'description' must be a string").isString().optional(),
  checkValidator,
] , updateMember);

// Delete member
router.delete("/:id", validateJWT, adminValidate, check("id", `The field 'id' is required.`)
.notEmpty()
.isInt()
.withMessage(`The field 'id' must be a number.`), checkValidator, deleteMember);

module.exports = router;
