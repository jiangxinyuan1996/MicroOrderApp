<template>
    <div id="success">
        <orderList status="3" :keyword="keyword"></orderList>   
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