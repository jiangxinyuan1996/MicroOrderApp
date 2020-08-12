<template>
    <div class="delivery">
        <div class="create_header">
            <div class="back" @click="handleBack">
            <i class="iconfont icon-huitui" />
            <p class="header_info">返回</p>
            </div>
            <div class="header_title">订单发货</div>
        </div>
        <van-cell-group 
            style="marginTop:.45rem;"
        >
        <van-field
            v-model="waybillID"
            label="快递单号"
            right-icon="scan"
            @click-right-icon="scanQr"
            placeholder="请填写或扫一扫快递单号"
        />
        </van-cell-group>
        <van-field
            readonly
            clickable
            label="快递公司"
            :value="company"
            placeholder="选择快递"
            @click="showPicker = true"
            />
            <van-popup v-model="showPicker" round position="bottom">
            <van-picker
                show-toolbar
                :columns="columns"
                @cancel="showPicker = false"
                @confirm="onConfirm"
            />
        </van-popup>
        <div class="fixed-bar bottom" style="margin-bottom: 0px;">
            <div class="f-flex cover-f-flex" style="background-color: rgb(255, 255, 255); border-top: 1px solid rgb(238, 238, 238); height: 39px;">
                <div class="f-flex f-vc weui_cells_checkbox f-flex-1 wsxc_all_election custom_bury" style="padding: 0px 10px;">
                   
                    <div class="f-flex f-sub-mr f-vc success-color" style="line-height: 1.2;">
                        <div class="f-flex f-flex-wrap f-sub-mr" v-if="isShow">
                            <span class="g9" style="margin-right: 0.2em;">共</span>
                            <span class="warn-color ellipsis-one" style="margin-right: 0.2em; max-width: 85px;">{{this.$route.params.item.num}}</span>
                        </div>
                    </div>
                </div>
                <div class="flex-menu w-1-3">
                    <button class="weui_btn weui_btn_primary cover_f16 wsxc_deliver_goods wsxc_bury" @click="sendOrder">发货</button>
                </div>
            </div>
            <div style="height: env(safe-area-inset-bottom); background-color: rgba(239, 239, 244, 0.95);"></div>
        </div>
        </div>
</template>
<script>
import { getConfig,send,getPackageCom } from '@/api'
import { initWxconfig } from '@/utils/initWxConfig.js'

export default {
    data(){
        return{
            value: '',
            showPicker: false,
            columns: [],
            reqlist:[],
            isShow:false,
            waybillID:'',
            company:''
        }
    },
        beforeMount () {
        this.$store.state.showTab = false
    },
    mounted(){
        this.reqlist.push(this.$route.params.item.req_sn)
      let url = location.href.split('#')[0]
        // console.log('url---:',this.$route.params.item);
      getConfig({url:url}).then(res=>{
        let wxConfig = res.data.data.config
        initWxconfig(wxConfig)
      })
      getPackageCom().then(res=>{
         for(let value in res.data.data){
             this.columns.push(value)
         }
     })
    },
    methods:{
        onChange(){
            console.log(this.waybillID,this.company)
        },
        onConfirm(value) {
            this.company = value;
            this.showPicker = false;
        },
        handleBack(){
            this.$router.push('/order/shipped')
            this.$store.state.showTab = true
        },
        sendOrder(){
            if(this.waybillID==''){
                this.$toast('请填写快递单号')
            }else if(this.company===''){
                this.$toast('请选择快递公司')
            }else{
                send({
                        reqsn:this.reqlist,
                        express_number:this.waybillID,
                        express_company:this.company
                    }).then(res=>{
                    if(res.data.success===1){
                        this.$toast('操作成功')
                        this.$router.push('/order/success')
                    }else{
                        this.$toast('操作失败')
                    }
                })
            }
        },
        scanQr(){
            console.log('扫一扫')
            let that=this
            wx.scanQRCode({
                needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
                scanType: ["qrCode","barCode"], // 可以指定扫二维码还是一维码，默认二者都有
                success: function(res){
                    that.waybillID=res.resultStr.split(',')[1]
                }
          });
        }
    }
}
</script>
<style lang="scss" scoped>
.delivery{
    height: 100%;
    overflow: hidden;
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
.wrap{
    margin-top:.55rem;
    height: 100%;
    margin-bottom: .4rem;
}
.marginRight-p8em {
    margin-right: 0.8em;
}
.delivery-header-label {
    width: 70px;
}
.weui_padding {
    padding: 10px 15px;
    background: #fff;
    margin: .1rem;
}
.f-sub-mb>:not(:last-child) {
    margin-bottom: .8em;
}
.f-flex {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
}
.f-sub-mr>:not(:last-child) {
    margin-right: .8em;
}
.f-vc {
    -webkit-box-align: center;
    -webkit-align-items: center;
    align-items: center;
    -ms-flex-align: center;
}
.f-flex-1 {
    -webkit-box-flex: 1;
    width: 0;
    -webkit-flex: 1;
    -ms-flex: 1;
    flex: 1;
}
.text-right {
    text-align: right;
}
.warn-color {
    color: #ffbe00;
}
.word-break {
    word-wrap: break-word;
    -ms-word-break: break-all;
    word-break: break-all;
}
.ellipsis-two {
    display: -webkit-box;
    overflow: hidden;
    -webkit-box-orient: vertical;
    text-align: left;
    -webkit-line-clamp: 2;
}
.ellipsis-one {
    display: block;
    overflow: hidden;
    white-space: nowrap;
    -ms-text-overflow: ellipsis;
    text-overflow: ellipsis;
}
.f-flex-wrap {
    -webkit-box-lines: multiple;
    -webkit-flex-wrap: wrap;
    flex-wrap: wrap;
}
.img-rounded {
    border-radius: 6px;
}
.avatar {
    margin: 0 auto;
}
.avatar, .thumbnail {
    display: block;
    position: relative;
    width: 60px;
    height: 60px;
}
.avatar a>img, .avatar>img, .thumbnail a>img, .thumbnail>img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    -webkit-user-select: none;
    user-select: none;
}
.g3 {
    color: #333;
}
.deep-gray, .g8{
    color:#888;
}
.weui_check {
    position: absolute;
    left: -9999em;
}
.weui_input {
    width: 100%;
    border: 0;
    border-radius: 0;
    outline: 0;
    -webkit-appearance: none;
    background-color: transparent;
    font-size: inherit;
    color: inherit;
    height: 1.41176471em;
    line-height: 1.41176471;
}
.text-center {
    text-align: center;
}
.weui_cells_checkbox .weui_icon_checked:before {
    content: '\EA01'!important;
    color: #c9c9c9!important;
    font-size: 23px;
    display: block;
}
[class*=" weui_icon_"]:before, [class^=weui_icon_]:before {
    margin: 0;
}
[class*=" weui_icon_"]:before, [class^=weui_icon_]:before {
    font-family: weui;
    font-style: normal;
    font-weight: 400;
    display: inline-block;
    vertical-align: middle;
    text-decoration: inherit;
    width: 1em;
    text-align: center;
    font-variant: normal;
    text-transform: none;
    line-height: 1em;
}
.fixed-bar {
    position: fixed;
    right: 0;
    left: 0;
    z-index: 99;
}
.fixed-bar.bottom {
    bottom: 0;
}
.flex-menu>.weui_btn {
    -webkit-box-flex: 1;
    margin-top: 0;
    border-radius: 0;
    -webkit-flex: 1;
    -ms-flex: 1;
    flex: 1;
}
button.weui_btn, input.weui_btn {
    width: 100%;
    border-width: 0;
    outline: 0;
    -webkit-appearance: none;
}
.cover_f16 {
    padding-left: 10px;
    padding-right: 10px;
}
.weui_btn_primary {
    background-color: #04be02;
}
.weui_btn {
    position: relative;
    display: block;
    margin-left: auto;
    margin-right: auto;
    padding-left: 14px;
    padding-right: 14px;
    box-sizing: border-box;
    font-size: 18px;
    text-align: center;
    text-decoration: none;
    color: #fff;
    line-height: 2.33333333;
    border-radius: 5px;
    -webkit-tap-highlight-color: transparent;
    overflow: hidden;
}
</style>