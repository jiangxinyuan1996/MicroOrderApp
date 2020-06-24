<template>
    <div id="navbar">
      <router-link to="/order/waitshipped" tag="li"  exactActiveClass="active">待付款<span v-if="count1!=0">{{count1}}</span></router-link>
      <router-link to="/order/shipped" tag="li"  exactActiveClass="active">已付款<span v-if="count2!=0">{{count2}}</span></router-link>
       <router-link to="/order/success" tag="li"  exactActiveClass="active">已发货</router-link>
      <!-- <router-link to="/order/closed" tag="li"  exactActiveClass="active">交易关闭</router-link>  -->
    </div>
</template>
<script>
import { getOrderList } from '@/api'
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
        getOrderList({status:'1'}).then(res=>{
            if(res.data.success===1){
                if(res.data.count){
                this.count1=res.data.count
              }else{
                this.count1=0
              }
            }else{
            Indicator.close()
                this.$toast('无数据')
            }
        })
        getOrderList({status:'2'}).then(res=>{
            if(res.data.success===1){
              if(res.data.count){
                this.count2=res.data.count
              }else{
                this.count2=0
              }
            }else{
            Indicator.close()
                this.$toast('无数据')
            }
        })
         getOrderList({status:'3'}).then(res=>{
            if(res.data.success===1){
              if(res.data.count){
                this.count3=res.data.count
              }else{
                this.count3=0
              }
            }else{
            Indicator.close()
                this.$toast('无数据')
            }
        })
    }
}
</script>
<style lang="scss" scoped>
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
    color: red;
  }
}
</style>>

