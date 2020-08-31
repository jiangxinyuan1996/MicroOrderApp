<template>
    <div id="waitshipped">
        <orderList :status="status" :keyword="keyword" ref="child"></orderList>   
    </div>
</template>
<script>
import orderList from '@/components/list'

export default {
    data(){
        return{
            status:'1'
        }
    },
 props:['keyword'],
 components:{
     orderList
 },
 methods:{
     init(){
         this.status='1'
         this.$refs.child.init()
     }
 }
}
</script>