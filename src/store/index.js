import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    showTab: true,
    active:0,
    formData:{
      product_name:'',
      price:'0.00',
      address_flag:false,
      introduction:'',
      image:[],
      num_flag:false,
  }
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
