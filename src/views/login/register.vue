<template>
    <div id="login">
       <div class="create_header">
            <div class="back" @click="handleBack">
            <i class="iconfont icon-huitui" />
            <p class="header_info">返回</p>
            </div>
            <div class="header_title">绑定店铺</div>
        </div>
        <div class="createFrom">
        <mt-field label="商户名" placeholder="请输入商户名" type="text" v-model="reqData.cusname"></mt-field>
        <mt-field label="商户号" placeholder="请输入商户号" type="text" v-model="reqData.cusid"></mt-field>
        <mt-field label="appid" placeholder="请输入appid" type="text" v-model="reqData.appid" ></mt-field>
        <mt-field label="MD5key" placeholder="请输入MD5key" type="text" v-model="reqData.md5key" ></mt-field>
        <mt-button type="primary" style="width:100%" @click="handleBind">确定</mt-button>
        </div>
    </div>
</template>
<script>
import { bindMerchant } from "@/api";
export default {
    data(){
        return{
            reqData:{
                cusname:'',
                cusid:'',
                appid:'',
                md5key:''
            }
        }
    },
     created () {
    this.$store.state.showTab = false
  },
  beforeDestroy () {
    this.$store.state.showTab = true
  },
    methods:{
        handleBack(){
            history.go(-1)
        },
        handleBind(){
            if(this.reqData.cusname!=''&&this.reqData.cusid!=''&&this.reqData.appid!=''&this.reqData.md5key!='')
            bindMerchant(this.reqData).then(res=>{
                console.log(res)
                if(res.data.success===1){
                    this.$toast({
                        message:res.data.message,
                    })
                localStorage.setItem('merchantid',this.reqData.cusid)
                
                this.$router.push('/mine')
                }else{
                    this.$toast({
                        message:res.data.message,
                    })
                }
            })
        }
    }
}
</script>
<style lang="scss" scoped>
#login{
    .create_header{
            width:100%;
            height: .45rem;
            line-height: .45rem;
            // background:#fff;
            color:black;
            position: fixed;
            top: 0;
            left: 0;
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
        .createFrom{
            margin: .45rem 0;
            .weui-cell{
                background: #fff;
            }
        }
}
</style>