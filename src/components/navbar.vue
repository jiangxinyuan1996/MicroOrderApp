<template>
    <div id="navbar">
      <router-link :to="'/order/waitshipped'" tag="li"  exactActiveClass="active"><b class="info">待付款</b><span v-if="count1!=0">{{count1}}</span></router-link>
      <router-link :to="'/order/shipped'" tag="li"  exactActiveClass="active"><b class="info">待发货</b><span v-if="count2!=0">{{count2}}</span></router-link>
       <router-link :to="'/order/success'" tag="li"  exactActiveClass="active"><b class="info">已完成</b></router-link>
      <!-- <router-link to="/order/closed" tag="li"  exactActiveClass="active">交易关闭</router-link>  -->
    </div>
</template>
<script>
import { getOrderList,getOrderCount } from '@/api'
export default {
    data(){
      return{
        count1:0,
        count2:0,
        count3:0,
        selected:''
      }
    },
     mounted(){
       getOrderCount().then(res=>{
         this.count1=res.data.data.map(item=>{
           if(item.state=='1'){
             return item.count
           }
         }).join('')
         this.count2=res.data.data.map(item=>{
           if(item.state=='2'){
             return item.count
           }
         }).join('')
       })
    }
}
</script>
<style lang="scss" scoped>
b{
  font-weight: normal;
}
#navbar{
  height:.4rem;
  width: 100%;
  line-height: .4rem;   
  display: flex;
  background: #fff;
  li{
    flex:1;
    text-align: center;
    position: relative;
    span{
      position: absolute;
      top:0.04rem;
      right: 0.24rem;
      background: red;
      height: 0.1rem;
      width: 0.1rem;
      line-height: 0.1rem;
      padding: 0.02rem;
      color: #fff;
      font-size: 2px;
      border-radius: 50%;
    }
  }
  .active{
    color:#0079c2;
    .info{
      border-bottom: 2px solid #0079c2;
      padding-bottom:2px;
      font-family: '苹方 中等', '苹方', sans-serif;
      font-weight: 600;
    }
  }
}
</style>>

