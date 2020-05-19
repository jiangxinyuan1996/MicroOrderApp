<template>
<div id="orderDetail">
    <div class="create_header">
            <div class="back" @click="handleBack">
            <i class="iconfont icon-huitui" />
            <p class="header_info">返回</p>
            </div>
            <div class="header_title">订单详情</div>
        </div>
        <div class="order_content" v-if="detailData">
            <mt-cell title="收款单名称" :label="detailData.product_name"></mt-cell>
            <mt-cell title="订单号" :label="detailData.req_sn"></mt-cell>
            <mt-cell title="收货人姓名" :label="detailData.receiver_name"></mt-cell>
            <mt-cell title="联系电话" :label="detailData.receiver_telephone"></mt-cell>
            <mt-cell title="收货地址" :label="detailData.receiver_address"></mt-cell>
            <mt-cell title="创建日期" :label="detailData.create_time"></mt-cell>
            <mt-cell title="数量" :label="detailData.num"></mt-cell>
            <mt-cell title="总价" :label="detailData.total"></mt-cell>
            <mt-cell title="订单状态" :label="state"></mt-cell>
        </div>
</div>
</template>
<script>
import { Indicator } from 'mint-ui'
export default {
    data(){
        return{
            state:'',
            detailData:null
        }
    },
    methods:{
        handleBack(){
            this.$router.push('/order')
        }
    },
    beforeMount () {
        this.$store.state.showTab = false
    },
    mounted(){
     Indicator.close()
        console.log(this.$route.params.item)
        if(this.$route.params.item){
        this.detailData=this.$route.params.item
        switch(this.detailData.state){
            case '1':
                this.state='待付款'
                break
            case '2':
                this.state='已付款'
                break
        }
        }
    },
    beforeDestroy(){
        this.$store.state.showTab = true
    }
}
</script>
<style lang="scss" scoped>
#orderDetail{
    font-size: .14rem;
}
.create_header{
            width:100%;
            height: .45rem;
            line-height: .45rem;
            background:#fff;
            color:black;
            position: fixed;
            top: 0;
            left: 0;
            z-index: 999;
            text-align: center;
            display:flex;
            .back{
                float: left;
                .icon-huitui{
                    float: left;
                    font-size: .16rem;
                }
            }
            .header_info{
                font-size: .14rem;
                padding-right: .1rem;
                padding-left: .2rem;
                text-align: left;
            }
            .header_title{
                flex: 1;
                padding-right: .58rem;
            }
}
.order_content{
    margin-top:.45rem;
}
</style>