const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:5087',
      changeOrigin: true,
      logLevel: 'debug' // 👈 добавлено для отладки
    })
  );
};