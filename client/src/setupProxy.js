const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = (app) => {
  app.use(
    "/api",
    createProxyMiddleware({
      target: process.env.REACT_APP_API_URL,
      changeOrigin: true,
      pathRewrite: {
        "^/api": "", // Remove /api base path when forwarding to server
      },
    }),
  );
};
