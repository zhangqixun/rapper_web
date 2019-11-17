// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: ' /',
    productionSourceMap: true,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: true,
    productionGzipExtensions: ['js', 'css']
  },
  dev: {
    env: require('./dev.env'),
    host: '0.0.0.0',
    disableHostCheck: true,
    port: 8880,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      '/imdb': {
        target: 'http://www.omdbapi.com',//设置你调用的接口域名和端口号 别忘了加http
        changeOrigin: true,//如果需要跨域
        pathRewrite: {
          '^/imdb': '/',//调用接口直接写‘/api/user/add’即可
        }
      },
      '/api': {
        target: 'http://47.92.86.194:8080',//设置你调用的接口域名和端口号 别忘了加http
        changeOrigin: true,//如果需要跨域
        pathRewrite: {
          '^/api': '/',//调用接口直接写‘/api/user/add’即可
        }
      },
    },
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  }
}

