const CompressionWebpackPlugin = require('compression-webpack-plugin')
module.exports = {
  configureWebpack: config => {
    // 开发环境不需要gzip
    config.externals = {
      vue: 'Vue',
      vuex: 'Vuex',
      'vue-router': 'VueRouter'
    }
    if (process.env.NODE_ENV !== 'production') return
    config.plugins.push(
      new CompressionWebpackPlugin({
        // 正在匹配需要压缩的文件后缀
        test: /\.(js|css|svg|woff|ttf|json|html)$/,
        // 大于10kb的会压缩
        threshold: 10240
        // 其余配置查看compression-webpack-plugin
      })
    )
  },
  lintOnSave: false,
  productionSourceMap: false,
  devServer: {
    open: true,
    https: false,
    port: 9527,
    hotOnly: false,
    // 设置代理
    proxy: {
      '^/hid': {
        // 域名
        target: 'http://119.3.251.24',
        // target: "http://localhost:443",
        // 是否启用websockets
        ws: true,
        changOrigin: true,
        pathRewrite: {
          '^/hid/': ''
        }
      }
    }
  },
  assetsDir: 'static',
  filenameHashing: false,
  pages: {
    index: {
      // page 的入口
      entry: 'src/main.js',
      // 模板来源
      template: 'public/index-prod.html', // 这里用来区分加载那个 html
      // template: 'public/index-prod.html', // 这里用来区分加载那个 html
      // 在 dist/index.html 的输出
      filename: 'index.html',
      // 当使用 title 选项时，
      // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
      // title: "",
      // 在这个页面中包含的块，默认情况下会包含
      // 提取出来的通用 chunk 和 vendor chunk。
      chunks: ['chunk-vendors', 'chunk-common', 'index']
    }
  }
  // configureWebpack: {
  //   externals: {
  //     vue: 'Vue',
  //     vuex: 'Vuex',
  //     'vue-router': 'VueRouter'
  //   }
  // }
}
