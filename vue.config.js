const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: process.env.NODE_ENV === 'production'
    ? '/alpaca-image-generator/'           //這邊是 repo 專案名稱
    : '/'                          //根目錄
})

vue.config.js