<template>
    <div class="delivery">
        <div class="create_header">
            <div class="back" @click="handleBack">
            <i class="iconfont icon-huitui" />
            <p class="header_info">返回</p>
            </div>
            <div class="header_title">订单详情</div>
        </div>
        <div class="wrap">
            <div style="width: 100%;">
                <div class="weui_cells">
                    <div class="weui_cell wsxc_scan wsxc_bury">
                        <div class="weui_cell_hd">
                            <label class="weui_label delivery-header-label marginRight-p8em">快递单号</label>
                        </div>
                        <div class="weui_cell_bd weui_cell_primary">
                            <input class="weui_input" autocomplete="off" type="text" name="waybillId" placeholder="请填写快递单号" hdstyle="[object Object]" value="" v-model="waybillID">
                        </div>
                            <i class="iconfont icon-saoyisao" style="float:right" @click="scanQr"/>
                    </div>
                    <div class="weui_cell f-sub-mr weui_cells_access wsxc_courier_services_company wsxc_bury">
                        <div class="weui_cell_hd" style="width: 70px;">快递公司</div>
                        <div class="weui_cell_bd weui_cell_primary f-flex" @click="chooseCompany">
                            <div style="color: rgb(121, 121, 121);">{{company}}</div>
                        </div>
                        <div class="weui_cell_ft"> </div>
                    </div>
            </div>
        </div>
        <!-- <div class="weui_padding f-sub-mb">
            <div class="f-flex f-sub-mr">
                <div class="f-flex f-vc weui_cells_checkbox">
                    <div>
                        <input class="weui_check" type="checkbox" readonly checked>
                        <div class="f-flex f-vc" v-if="isShow" @click="isShow=!isShow">
                            <img src="data:image/png;base64,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" style="width: 23px; height: 23px; user-select: none;">
                        </div>
                        <i  v-else class="weui_icon_checked" @click="isShow=!isShow"></i>
                    </div>
                </div>
                <div class="f-flex-1">
                    <div class="f-flex f-vc f-sub-mr g8">
                        <div>
                            <div class="avatar img-rounded" style="width: 72px; height: 72px;">
                                <img class="img-rounded" src="https://xcimg.szwego.com/o_1e8oc0l1i1mmv3cl1sla2nr13ab16.jpg?imageMogr2/auto-orient/thumbnail/!310x310r/quality/100/format/jpg"></div></div><div class="f-flex-1">
                                    <div class="word-break ellipsis-two" style="-webkit-line-clamp: 1;">{{this.$route.params.item.product_name}}</div>
                                    <div class="word-break ellipsis-one " style="margin-top: 8px; white-space: nowrap;">货号：{{this.$route.params.item.req_sn}}</div>
                            </div>
                            <div class="text-right">
                                <div class="warn-color">¥ {{this.$route.params.item.price}}</div>
                                <div class="f12">x {{this.$route.params.item.num}}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="f-sub-mb">
                    <div class="f-flex f-sub-mr">
                        <div class="f-flex f-vc weui_cells_checkbox">
                            <div>
                                <input class="weui_check" type="checkbox" readonly checked>
                                <div class="f-flex f-vc" v-if="isShow" @click="isShow=!isShow">
                                    <img src="data:image/png;base64,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" style="width: 23px; height: 23px; user-select: none;">
                                </div>
                                <i v-else class="weui_icon_checked" @click="isShow=!isShow"></i>
                            </div>
                        </div> 
                         <div class="f-flex-1">
                            <div>
                                <div class="g3">
                                    <div class="f-flex f-vc f-sub-mr">
                                        <div class="f-flex-1">
                                            <div class="word-break ellipsis-two" style="-webkit-line-clamp: 1;"></div>
                                        </div>
                                        <div class="f-flex-1">
                                            <div class="f-flex f-vc" style="border: 1px solid rgb(187, 187, 187); border-radius: 5px;">
                                                <i style="padding: 0px 1em; font-style: normal; user-select: none; opacity: 1;">-</i>
                                                <input class="weui_input text-center" autocomplete="off" id="default" type="tel" pattern="[0-9]*" value="3" style="border-radius: 0px; border-width: 0px 1px; border-style: solid; border-color: rgb(187, 187, 187);">
                                                <i style="padding: 0px 1em; font-style: normal; user-select: none; opacity: 0.2;">+</i>
                                            </div>
                                        </div>
                                    </div>
                                <div class="f-flex f-vt f-sub-mr f12">
                                    <div class="f-flex-1 f-flex f-vc f-sub-mr f-flex-wrap"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div> -->
        <div class="fixed-bar bottom" style="margin-bottom: 0px;">
            <div class="f-flex cover-f-flex" style="background-color: rgb(255, 255, 255); border-top: 1px solid rgb(238, 238, 238); height: 39px;">
                <div class="f-flex f-vc weui_cells_checkbox f-flex-1 wsxc_all_election custom_bury" style="padding: 0px 10px;">
                    <!-- <div>
                        <input class="weui_check" type="checkbox" readonly checked>
                        <div class="f-flex f-vc" v-if="isShow"  @click="isShow=!isShow">
                            <img src="data:image/png;base64,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" style="width: 23px; height: 23px; user-select: none;">
                        </div>
                        <i v-else class="weui_icon_checked" @click="isShow=!isShow"></i>
                    </div> -->
                    <div class="f-flex f-sub-mr f-vc success-color" style="line-height: 1.2;">
                        <!-- <span class="nowrap" style="margin-right: 0.2em;">&nbsp;全选</span> -->
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
    </div>
</template>
<script>
import { getConfig,send } from '@/api'
import { initWxconfig } from '@/utils/initWxConfig.js'

export default {
    data(){
        return{
            reqlist:[],
            isShow:false,
            waybillID:'',
            company:'请选择快递公司'
        }
    },
        beforeMount () {
        this.$store.state.showTab = false
    },
    mounted(){
        this.waybillID=this.$store.state.waybillID
        this.reqlist.push(this.$route.params.item.req_sn)
      let url = location.href.split('#')[0]
        console.log('url---:',url);
      getConfig({url:url}).then(res=>{
        let wxConfig = res.data.data.config
        initWxconfig(wxConfig)
      })
        console.log(this.$route.params)
        if(this.$route.params.category){
            this.company=this.$route.params.category
        }
    },
    methods:{
        handleBack(){
            this.$router.push('/order/shipped')
            this.$store.state.showTab = true
        },
        chooseCompany(){
            this.$store.state.waybillID=this.waybillID
            this.$router.push({name:'closed',
            params:{
                item:this.$route.params.item
            }
            })
        },
        sendOrder(){
            send({
                    reqsn:this.reqlist,
                    express_number:this.waybillID,
                    express_company:this.company
                }).then(res=>{
                if(res.data.success===1){
                    this.$toast('操作成功')
                    this.$store.state.waybillID=''
                    this.$router.push('/order/success')
                }else{
                    this.$toast('操作失败')
                }
            })

        },
        scanQr(){
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
#delivery{
    height: 100%;
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