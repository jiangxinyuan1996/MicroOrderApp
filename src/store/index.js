import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    showTab: true,
    active:0,
    waybillID:'',
    req_sn:'',
    formData:{
      product_name:'',
      price:'',
      num:1,
      address_flag:false,
      introduction:'',
      image:[],
      num_flag:false, 
      total:0,
      discount:10,
      fare:0
  }
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
