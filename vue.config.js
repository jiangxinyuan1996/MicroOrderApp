const CompressionWebpackPlugin = require('compression-webpack-plugin')
module.exports = {
  // publicPath: 'http://dlallinpay-source.stor.sinaapp.com/tlwdd/merchant',
  publicPath:'/wddtest/merchant/',
  lintOnSave: false,
  productionSourceMap: false,
  devServer:{
    proxy:{
      '/wdd':{
        target:'http://dlallinpay.sinaapp.com',
        changeOrigin:true
      }
    },
    // proxy:{
    //   '/wddtest':{
    //     target:'http://dlallinpay.sinaapp.com',
    //     changeOrigin:true
    //   }
    // },
    compress:true,
    open:true,
    hot:true,
  },
  configureWebpack:()=>{
      return {
          externals: {
            'vue': 'Vue',
            'vue-router': 'VueRouter',
            'vuex': 'Vuex',
            'axios': 'axios',
            'element-ui': 'ELEMENT',
            'echarts' : 'echarts'
           },
           plugins: [
             new CompressionWebpackPlugin(
               {
                 test: /\.(js|css)(\?.*)?$/i,
                threshold: 10240,
                deleteOriginalAssets: false
              })]
      }
    }
}
