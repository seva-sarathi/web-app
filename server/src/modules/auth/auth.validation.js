import {body, validationResult} from "express-validator";

export const registerRules = [
  body('username').notEmpty().withMessage('Username is required'),
  body('email').isEmail().withMessage('Please include a valid email'),
  body('phone')
    .isLength( 10)
    .withMessage('phone must be at 10 characters long'),
];

export const validateRegister = (req, res, next) => {
    const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // Returns 400 Bad Request with the array of errors
    return res.status(400).json({ errors: errors.array() });
  }
  next(); // If no errors, proceed to the controller
}