module.exports = {
  lintOnSave: false,
  devServer: {
    open: true,
    https: false,
    port: 9527,
    hotOnly: false,
    // 设置代理
    proxy: {
      "^/hid": {
        // 域名
        target: "http://118.24.254.100",
        // target: "http://localhost:443",
        // 是否启用websockets
        ws: true,
        changOrigin: true,
        pathRewrite: {
          "^/hid/": ""
        }
      }
    }
  },
  assetsDir: "static",
  pages: {
    index: {
      // page 的入口
      entry: "src/main.js",
      // 模板来源
      template: "public/index-prod.html", // 这里用来区分加载那个 html
      // 在 dist/index.html 的输出
      filename: "index.html",
      // 当使用 title 选项时，
      // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
      // title: "",
      // 在这个页面中包含的块，默认情况下会包含
      // 提取出来的通用 chunk 和 vendor chunk。
      chunks: ["chunk-vendors", "chunk-common", "index"]
    }
  },
  configureWebpack: {
    externals: {
      vue: "Vue",
      vuex: "Vuex",
      "vue-router": "VueRouter"
    }
  }
};
