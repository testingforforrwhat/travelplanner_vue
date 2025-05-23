
// 修改配置文件，记得重启开发服务器以确保更改生效
const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack: config => {
    config.plugin('define').tap(args => {
      Object.assign(args[0], {
        __VUE_OPTIONS_API__: true,  // 控制是否启用 Vue 3 的 Options API。通常设置为 true，以便支持传统的 Vue 组件写法
        __VUE_PROD_DEVTOOLS__: false,  // 控制是否在生产环境中启用 Vue Devtools。通常设置为 false，以减少生产环境的包大小
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false  // 控制是否在生产环境中提供更详细的 hydration 错误信息。通常设置为 false，以优化生产环境的性能
      })
      return args
    })
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'https://apis.map.qq.com', // 替换为你的后端服务器地址
        changeOrigin: true, // 修改请求头中的 Origin 为目标地址
        pathRewrite: { '^/api': '' }, // 重写路径，将 /api 替换为空
        secure: false // 如果使用 HTTPS 且后端证书无效，设置为 false
      }
    }
  }
})
