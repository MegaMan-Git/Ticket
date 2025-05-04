//بارگذاری متغیرهای محیطی جهت پیش گیری از بروز مشکل عدم وجود .env

// بارگذاری متغیرهای محیطی از فایل .env

const result = require('dotenv').config();
if (result.error) {
  throw result.error;
}