const router = require('express').Router();
const { check } = require("express-validator");

const { validateJWT } = require('../middlewares/validate-JWT');
const { createContact, listContacts , portfolioContact } = require ("../controllers/contacts")
const { checkValidator } = require("../middlewares/userValidate");
const { adminValidate } = require("../middlewares/adminValidate");

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
    check(
      "message",
      `The field 'message' is required on the request params.`
    ).exists(),
    checkValidator,
  ],
  createContact
);

//ruta post para mi portfolio
router.post("/portfolio" , portfolioContact)

module.exports = router;