<template>
  <div id="goods">
    <!-- <h1>商品</h1> -->
    <div class="left">
      <goodsList></goodsList>
    </div>
    <div class="rightContainer">
      <div class="right">
        <goodsList></goodsList>
      </div>
    </div>
  </div>
</template>
<script>
import goodsList from '@/components/list'
export default {
  components:{
    goodsList,

  },
  data(){
    return {
      active:1
    }
  }
}
</script>
<style lang="scss" scoped>

.left{
  float: left;
  width:.85rem;
  overflow: hidden;
}
.right{
  margin-left:.85rem;
  border: 1px solid red;
}
</style>