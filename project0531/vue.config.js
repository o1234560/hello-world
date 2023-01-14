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
  lintOnSave: true,
  // 设置打包时的路径问题
  publicPath: './'
})
