<template>
    <div id="shipped">
        <orderList status="2" :keyword="keyword"></orderList>   
    </div>
</template>
<script>
import orderList from '@/components/list'

export default {
  props:['keyword','status'],
    components:{
        orderList
    },
}
</script>