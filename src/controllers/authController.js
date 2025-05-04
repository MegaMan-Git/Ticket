//ثبت‌ نام، ورود

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models/User'); // مدل Sequelize


// تابع ثبت‌ نام
exports.register = async (req, res, next) => {
  try {
    const { firstName, lastName, nationalCode, email, phone, password } = req.body;

    // چک ایمیل یا کدملی یکتا
    const exists = await User.findOne({ where: { [User.sequelize.Op.or]: [{ email }, { nationalCode }] } });
    if (exists) {
      return res.status(400).json({ message: 'کاربری با ایمیل یا کد ملی وارد شده موجود است' });
    }

    // هش پسورد
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    // ذخیره کاربر
    const user = await User.create({ firstName, lastName, nationalCode, email, phone, password: hashed });

    // ساخت توکن بعد از ثبت‌نام موفق
    const payload = { id: user.id, email: user.email };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '24h' });

    return res.status(201).json({
      message: 'ثبت‌ نام با موفقیت انجام شد',
      token,
      redirect: '/products'
    });
  } catch (err) {
    next(err);
  }
};

// تابع ورود
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: 'ایمیل یا رمز عبور اشتباه است' });
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(401).json({ message: 'ایمیل یا رمز عبور اشتباه است' });
    }

    // ساخت توکن
    const payload = { id: user.id, email: user.email };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '24h' });

    return res.json({
      message: 'ورود موفق',
      token,
      redirect: '/products'
    });
  } 
  catch (err) {
    next(err);
  }
};