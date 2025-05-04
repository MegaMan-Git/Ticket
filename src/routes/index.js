// show first page
const express = require('express');
const path = require('path');
const router = express.Router();

// روت صفحه اصلی
router.get('/', (req, res) => {
  // نمایش فایل فرانت در پوشه پابلیک
  res.sendFile(path.join(__dirname, '.../public/index.html'));
});

module.exports = router;
