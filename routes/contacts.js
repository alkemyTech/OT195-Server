const router = require('express').Router();
const { check } = require("express-validator");

const { validateJWT } = require('../middlewares/validate-JWT');
const { adminValidate } = require('../middlewares/adminValidate');
const {createContact} = require ("../controllers/contacts")
const { checkValidator } = require("../middlewares/userValidate");

const { contact } = require('../models');

router.get('/', validateJWT, adminValidate, async(req, res) => {
    try {
        const results = await contact.findAll({
            where: {
                deletedAt: null
            }
        });
        res.json({
            results,
            ok: true
        })
    } catch (error) {
        res.json({
            msg: error.message,
            ok: false
        })
    }
})

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
