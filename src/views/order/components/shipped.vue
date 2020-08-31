<template>
    <div id="shipped">
        <orderList :status="status" :keyword="keyword" ref="child"></orderList>   
    </div>
</template>
<script>
import orderList from '@/components/list'

export default {
    data(){
        return{
            status:'2'
        }
    },
  props:['keyword'],
    components:{
        orderList
    },
     methods:{
        init(){
            this.status='2'
         this.$refs.child.init()

        }
    }
}
</script>