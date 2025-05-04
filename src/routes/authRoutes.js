//  /register, /login

const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');
const { validateRegister, validateLogin } = require('../middlewares/validationMiddleware');
// مسیر ثبت‌ نام
// BODY: { firstName, lastName, nationalCode, email, phone, password }
router.post('/register', validateRegister , register);

// مسیر ورود
// BODY: { email, password }
router.post('/login', validateLogin , login);

module.exports = router;