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
  }
}
