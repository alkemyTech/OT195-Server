const { body, validationResult } = require('express-validator');

module.exports = {
    loginValidator: [
        body('email')
            .exists().trim().notEmpty().withMessage('Email is required')
            .isEmail().withMessage('Invalid email'),

        body('password')
            .exists().trim().notEmpty().withMessage('Password is required')
    ],

    checkValidator: (req, res, next) => {
        const err = validationResult(req);
        if(err.errors.length > 0) {
            return res.status(400).json(err.errors[0]); // Throwing errors one by one
            // to see all errors, change the code above to err.errors
        }
        next();
    }
}