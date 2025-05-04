// بررسی و اعتبارسنجی

const { body, validationResult } = require('express-validator');

const validateRegister = [
  body('firstName').trim().notEmpty().withMessage('نام الزامی است'),
  body('lastName').trim().notEmpty().withMessage('نام خانوادگی الزامی است'),
  body('nationalCode').trim().isLength({ min:10, max:10 }).withMessage('کد ملی 10 رقمی'),
  body('email').trim().isEmail().withMessage('ایمیل نامعتبر'),
  body('phone').matches(/^09\d{9}$/).withMessage('تلفن نامعتبر'),
  body('password').isLength({ min:6 }).withMessage('رمز حداقل 6 کاراکتر'),
  (req, res, next) => {
    const errs = validationResult(req);
    if (!errs.isEmpty()) return res.status(422).json({ errors: errs.array() });
    next();
  }
];

const validateLogin = [
  body('email').isEmail().withMessage('ایمیل نامعتبر'),
  body('password').notEmpty().withMessage('رمز الزامی'),
  (req, res, next) => {
    const errs = validationResult(req);
    if (!errs.isEmpty()) return res.status(422).json({ errors: errs.array() });
    next();
  }
];

module.exports = { validateRegister, validateLogin };