import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home/Home.vue'
import consumerRoutes from './consumer/consumer.js'
import templateRouter from './template/template'
import walletRouter from './wallet/wallet'


import Order from '../views/order'
import Goods from '../views/goods/category'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/order',
    name: 'Order',
    component: Order,
    redirect:'/order/waitshipped',
    children:[{
      path:'waitshipped',
      name:'waitshipped',
      component:()=>import('@/views/order/components/waitshipped')
    },
    {
      path:'shipped',
      name:'shipped',
      component:()=>import('@/views/order/components/shipped')
    },
    {
      path:'success',
      name:'success',
      component:()=>import('@/views/order/components/success')
    },
    {
      path:'closed',
      name:'closed',
      component:()=>import('@/views/order/components/closed')
    }
    ]
  },
  {
    path: '/order/detail',
    name: 'orderDetail',
    component:()=>import('@/views/order/orderDetail'),
  },
  {
    path: '/goods',
    name: 'Goods',
    component: Goods,
  },
  {
    path:'/detail',
    component:()=>import('@/views/goods/detail'),
    name:'detail'
  },
  {
    path:'/createGoods',
    component:()=>import('@/views/goods/createGoods'),
    name:'createGoods'
  },
  
  {
    path:'/createCategory',
    component:()=>import('@/views/goods/createCategory'),
    name:'createCategory'
  },
  {
    path:'/createqr',
    component:()=>import('@/views/goods/createqr'),
    name:'createqr'
  },
  {
    path:'/register',
    component:()=>import('@/views/login/register'),
    name:'register'
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
  templateRouter,
  walletRouter,
  {
    path:'/404',
    name:'404',
    component:()=>import('@/views/error')
  },
  { path: '*', redirect: '/404', hidden: true }
]

const router = new VueRouter({
  routes
})

export default router
