// هندل خطاهای گلوبال

// هندلر خطاهای سراسری
module.exports = function errorHandler(err, req, res, next) {
  // لاگ کردن خطا برای دیباگینگ
  console.error(err.stack);

  // پاسخ مناسب به کلاینت
  const status = err.statusCode || 500;

  const message = err.message || 'خطای داخلی سرور';
  res.status(status).json({
    error: true,
    message
  });
}
