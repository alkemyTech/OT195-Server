const { Router } = require("express");
const { check } = require("express-validator");

// controllers
const { getNewsDetails, getNewsList } = require("../controllers/news");
const { checkValidator } = require("../middlewares/userValidate");
const { validateJWT } = require('../middlewares/validate-JWT')
const { adminValidate } = require('../middlewares/adminValidate')

const router = Router();

// GET News details
router.get(
  "/:id",
  [
    checkValidator,
    check("id", `The field 'id' is required on the request params.`)
      .notEmpty()
      .isInt()
      .withMessage(`The field 'id' must be a number.`),
  ],
  getNewsDetails
);

// GET News list
router.get('/', validateJWT, adminValidate, getNewsList);

module.exports = router;
