<template>
  <div id="order">
    <!-- <h1>订单</h1> -->
    <orderList></orderList>
  </div>
</template>
<script>
import orderList from '@/components/list'
export default {
  components: {
    orderList
  }
}
</script>
<style lang="scss" scoped>
#order{
  height: 100%;
}
</style>
