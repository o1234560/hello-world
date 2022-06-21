const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: { // configWebpack
    resolve: {
      alias: { // alias翻译为，别名。
        assets: '@/assets',
        components: '@/components',
        views: '@/views'
      }
    }
  },
  // lintOnSave: false, // 暂时关闭代码格式检测
  lintOnSave: true,
  //设置打包时的路径问题
  publicPath: './'
})
