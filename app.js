//require package management

// بارگذاری و بررسی .env
require('./src/config/env');

require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const body_parser = require('body-parser');
const Dev_Debug = require('debug')('dev');
const path = require('path');
const authRoutes = require('./src/routes/authRoutes');
const errorHandler  = require('./src/middlewares/errorMiddleware');

//use middleware
const app = express();
app.use(express.json());
app.use(require('helmet')());
app.use(body_parser.json());

//Environment-based Development
Dev_Debug(process.env.NODE_ENV); 

// میدل‌ور برای سرو فایل‌های استاتیک (css, js, تصاویر و ...)
app.use(express.static(path.join(__dirname, 'public')));

// اضافه کردن روت صفحه اصلی
app.use('/', require('./src/routes/index'));

// روت‌های احراز هویت
app.use('/api/auth', authRoutes);

// میدلور بررسی خطا همه ی روت ها باید اخر همه باشد
app.use(errorHandler);


const port = process.env.PORT || 3000;
app.listen(port,()=> console.log(`server is connected ${port}`));