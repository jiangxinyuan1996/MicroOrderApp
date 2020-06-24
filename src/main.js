// import Vue from 'vue'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import App from './App.vue'
import weui from 'weui.js'
import 'weui'
import router from './router'
import store from './store'
import './assets/icon/iconfont.css'
// import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'

// Vue.use(ElementUI)
Vue.config.productionTip = false
Vue.use(MintUI)
Vue.use(weui)



new Vue({
  el: '#app',
  router,
  store,
  // template: '<App/>',
  render (h) {
    return h('App');
  },
  components: { App }
});
