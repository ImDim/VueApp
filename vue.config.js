const webpackConfig = require('./webpack.config');

module.exports = {
  configureWebpack: webpackConfig,
  transpileDependencies: [
    'vuetify'
  ],
  devServer: {
    port: 8081
  }
}