module.exports = {
  publicPath: '/tlwdd/merchant/',
  lintOnSave: false,
  devServer:{
    proxy:{
      '/tlwdd':{
        target:'http://dlallinpay.sinaapp.com',
        changeOrigin:true
      }
    }
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
           }
      }
    }
}
