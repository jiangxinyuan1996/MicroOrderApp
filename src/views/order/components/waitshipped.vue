<template>
    <div id="waitshipped">
        <orderList status="1" :keyword="keyword"></orderList>   
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