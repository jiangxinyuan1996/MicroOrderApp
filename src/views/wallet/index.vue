<template>
    <div id="wallet">
        <div class="wallet_header">
            <i class="iconfont icon-huitui" @click="handleBack"/>
            <p class="header_info">钱包<span style="float:right">账单</span></p>
        </div>
        <div class="main">
            <ul class="walletlist">
                <li v-for="(item,index) in walletList" :key="index" class="list_item">
                    <svg class="icon" aria-hidden="true">
                        <use :xlink:href="item.icon"></use>
                    </svg>
                    <p :class="'item_info'+' '+ (index===2?'clearBorder':'')">
                        <span>{{item.text}}</span>
                        <span v-if="index===0">￥{{+money?money:'0.00'}} <i class="iconfont icon-qianjin"/></span>
                        <span v-else-if="index===1">￥0.00 <i class="iconfont icon-qianjin"/></span>
                        <span v-else> <i class="iconfont icon-qianjin"/></span>
                    </p>
                </li>
            </ul>
        </div>
        <div class="wallet_footer">
            <div class="footer_left footer_info">充值</div>
            <div class="footer_right footer_info">提现</div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            money:this.$route.params.money,
            walletList:[
                {
                    text:'零钱',
                    icon:'#icon-yingbi'
                },
                {
                    text:'零钱通',
                    icon:'#icon-iconzhengli-'
                },
                {
                    text:'银行卡',
                    icon:'#icon-icon-test'
                }
            ]
        }
    },
    created () {
        this.$store.state.showTab = false
    },
    beforeDestroy () {
        this.$store.state.showTab = true
    },
    methods: {
    handleBack () {
      history.go(-1)
    }
  }
}
</script>
<style lang="scss" scoped>
#wallet{
    .wallet_header{
            width:100%;
            height: .45rem;
            line-height: .45rem;
            // background:#fff;
            color:black;
            position: fixed;
            top: 0;
            left: 0;
            text-align: center;
            .icon-huitui{
                float: left;
                font-size: .16rem;
            }
            .header_info{
                font-size: .14rem;
                padding-right: .1rem;
                padding-left: .2rem;
                text-align: left;
            }
        }
        .walletlist{
            display:flex;
            margin-top:.45rem;
            height: 1.5rem;
            flex-direction: column;
            background: #fff;
            .list_item{
                flex: 1;
                align-items: center;
                display:flex;
                .icon{
                    margin:0 .2rem;
                    font-size:.28rem;
                }
                .item_info{
                    flex: 1;
                    display:flex;
                    align-items: center;
                    justify-content: space-between;
                    padding-right: .1rem;
                    height: 100%;
                    font-size: .14rem;
                    border-bottom: 1px solid #ccc;
                }
                .clearBorder{
                    border:none;
                }
            }
        }
        .wallet_footer{
        position: fixed;
        bottom: 0;
        left: 0;
        background: #fff;
        width:100%;
        height: .45rem;
        line-height: .45rem;
        text-align: center;
        display:flex;
        .footer_info{
            flex:1;
        }
        .footer_left{
            background: #04BE02;
            border-right: 1px solid #c0c0c0;
            color: #fff;
        }
        .footer_right{
            background: #fff;
            color:#04BE02;
        }
    }
}
</style>
