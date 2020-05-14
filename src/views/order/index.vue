<template>
  <div id="order">
    <!-- <h1>订单</h1> -->
    <navbar></navbar>
    <router-view/>
  </div>
</template>
<script>
import navbar from '@/components/navbar'
import { HomeData } from '@/api'
export default {
  components: {
    navbar
  },
  beforeCreate(){
     HomeData().then(res=>{
      if(res.data.success===1){
        localStorage.setItem('merchantid',res.data.data.merchant_id)
      }else{
        this.$router.push('/register')
      }
    })
  }
}
</script>
<style lang="scss" scoped>
#order{
  height: 100%;
}
</style>
