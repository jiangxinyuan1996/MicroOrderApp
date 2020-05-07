import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home/Home.vue'
import consumerRoutes from './consumer/consumer.js'
import templateRouter from './template/template'

import Order from '../views/order'
import Goods from '../views/goods/category'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/order',
    name: 'Order',
    component: Order
  },
  {
    path: '/goods',
    name: 'Goods',
    component: Goods
  },
  {
    path: '/mine',
    name: 'Mine',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/mine/mine.vue')
  },
  consumerRoutes,
  templateRouter
]

const router = new VueRouter({
  routes
})

export default router
