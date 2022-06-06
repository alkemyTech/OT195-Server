const { Router } = require("express");
const { check } = require("express-validator");

// controllers
const { createContact, listContacts } = require ("../controllers/contacts")
const { checkValidator } = require("../middlewares/userValidate");

const router = Router();

const { Contact } = require('../models');

router.get('/', validateJWT, adminValidate, listContacts)

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
