const { body, validationResult } = require('express-validator');

const registerValidator = [
  body('name').notEmpty(),
  body('email').isEmail().withMessage('Invalid email address').normalizeEmail(),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
];

const loginValidator = [
  body('email').isEmail().withMessage('Invalid email address').normalizeEmail(),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
];

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const formattedErrors = errors.array().map(err => ({
      field: err.param,
      message: err.msg,
    }));
    return res.status(400).json({
      success: false,
      errors: formattedErrors,
    });
  }
  next();
};

module.exports = {
  registerValidator,
  loginValidator,
  validate,
};
