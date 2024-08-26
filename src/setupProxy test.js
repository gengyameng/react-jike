const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = app => {
  app.use(
    createProxyMiddleware('/api', {
      // api是需要转发的请求（所有带 /api前缀的请求都会转发给 target）
      target: 'http://geek.itheima.net',  // 配置转发目标地址
      changeOrigin: true,  // 控制服务器接收到的请求中host字段的值
      pathRewrite: { '^/api': ''}  // 去除请求前缀，保证交给后台服务器正常的请求地址
    })
  )
}