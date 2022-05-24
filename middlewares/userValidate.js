const { body, validationResult } = require('express-validator');

module.exports = {
    loginValidator: [
        body('email')
            .exists().trim().notEmpty().withMessage('Email is required')
            .isEmail().withMessage('Invalid email'),

        body('password')
            .exists().trim().notEmpty().withMessage('Password is required')],
    
    registerValidator: [
        body('firstName')
            .exists().trim().notEmpty().withMessage('Name is required')
            .isLength({min:4}).withMessage('Name must contain at least 4 characters')
            .isAlpha().withMessage('Name must contains only letters'),

        body('lastName')
            .exists().trim().notEmpty().withMessage('Surname is required')
            .isAlpha().withMessage('Surname must contains only letters')
            .isLength({min:4}).withMessage('Surname must contain at least 4 characters'),

        body('email')
            .exists().trim().notEmpty().withMessage('email is required')
            .isEmail().withMessage('Invalid email'),

        body('password')
            .exists().trim().notEmpty().withMessage('password is required')
            .isLength({min:7}).withMessage('Password must contain at least 7 characters')
            .matches(/[a-z]/).withMessage('Password must contain a lowercase letter')
            .matches(/[0-9]/).withMessage('Password must contain a number')
            .matches(/[A-Z]/).withMessage('Password must contain an uppercase letter')
    ],

    checkValidator: (req, res, next) => {
        const err = validationResult(req);
        if(err.errors.length > 0) {
            return res.json(err.errors[0]); // Throwing errors one by one
            // to see all errors, change the code above to err.errors
        }
        next();
    }
}