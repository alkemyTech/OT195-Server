const { body, validationResult } = require("express-validator");

module.exports = {
  loginValidator: [
    body("email")
      .exists()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Invalid email")
      .trim(),

    body("password")
      .exists()
      .withMessage("Password is required")
      .isString()
      .withMessage("Password must be a string")
      .trim(),
  ],

  registerValidator: [
    body("firstName")
      .exists()
      .withMessage("Name is required")
      .isLength({ min: 4 })
      .withMessage("Name must contain at least 4 characters")
      .isString()
      .withMessage("Name must contain only letters")
      .trim(),

    body("lastName")
      .exists()
      .withMessage("Surname is required")
      .isString()
      .withMessage("Surname must contain only letters")
      .isLength({ min: 4 })
      .withMessage("Surname must contain at least 4 characters")
      .trim(),

    body("email")
      .exists()
      .withMessage("email is required")
      .isEmail()
      .withMessage("Invalid email")
      .trim(),

    body("password")
      .exists()
      .withMessage("password is required")
      .isLength({ min: 7 })
      .withMessage("Password must contain at least 7 characters")
      .matches(/[a-z]/)
      .withMessage("Password must contain a lowercase letter")
      .matches(/[0-9]/)
      .withMessage("Password must contain a number")
      .matches(/[A-Z]/)
      .withMessage("Password must contain an uppercase letter")
      .trim(),
  ],

  checkValidator: (req, res, next) => {
    const err = validationResult(req);
    if (err.errors.length > 0) {
      return res.status(400).json(err.errors[0]); // Throwing errors one by one
      // to see all errors, change the code above to err.errors
    }
    next();
  },
};
