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

const userUpdateValidator = [
  body('id').notEmpty().withMessage("id is required"),
  body('data').notEmpty().withMessage("data (array of object) is required")
]

const userDeleteValidator = [
  body('id').notEmpty().withMessage("id is required"),
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
  userUpdateValidator,
  userDeleteValidator,
  loginValidator,
  validate,
};
