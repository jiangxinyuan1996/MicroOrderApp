<template>
    <div id="success">
        <orderList :status="status" :keyword="keyword" ref="child"></orderList>   
    </div>
</template>
<script>
import orderList from '@/components/list'

export default {
    data(){
        return{
            status:'3'
        }
    },
  props:['keyword'],
    components:{
        orderList
    },
    methods:{
        init(){
            this.status='3'
         this.$refs.child.init()
        }
    }
}
</script>