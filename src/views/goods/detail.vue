<template>
    <div id="detail">
        <updateGoods></updateGoods>
    </div>
</template>
<script>
import updateGoods from './createGoods'
export default {
  components:{
    updateGoods
  },
    created () {
    this.$store.state.showTab = false
  },
  beforeDestroy () {
    this.$store.state.showTab = true
  },
}
</script>