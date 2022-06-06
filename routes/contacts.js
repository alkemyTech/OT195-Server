const { Router } = require("express");
const { check } = require("express-validator");

// controllers
const {createContact} = require ("../controllers/contacts")
const { checkValidator } = require("../middlewares/userValidate");

const router = Router();

// POST contacts
router.post(
  "/",
  [
    check(
      "name",
      `The field 'name' is required on the request params.`
    ).exists(),
    check(
      "email",
      `The field 'email' is required on the request params.`
    ).exists(),
    checkValidator,
  ],
  createContact
);

module.exports = router;