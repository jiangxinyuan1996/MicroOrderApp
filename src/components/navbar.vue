<template>
    <div id="navbar">
      <router-link to="/order/waitshipped" tag="li"  exactActiveClass="active">待付款</router-link>
      <router-link to="/order/shipped" tag="li"  exactActiveClass="active">已付款</router-link>
      <!-- <router-link to="/order/success" tag="li"  exactActiveClass="active">交易成功</router-link>
      <router-link to="/order/closed" tag="li"  exactActiveClass="active">交易关闭</router-link> -->
    </div>
</template>
<script>
export default {
    data(){
      return{
        selected:''
      }
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
    font-size: .12rem;
  }
  .active{
    color: red;
  }
}
</style>>

