<template>
    <div id="orderDetail" v-if="detailData">
        <div class="create_header">
                <div class="back" @click="handleBack">
                <i class="iconfont icon-huitui" />
                <!-- <p class="header_info">返回</p> -->
                </div>
                <div class="header_title">订单详情</div>
        </div>
        <div class="title_wrap">
            <div class="detail_title">
                <div class="title">
                    <div class="left_container">
                        <div class="left_box"></div>
                        <span class="left_category" v-if="state==='待付款'">买家未付款</span>
                        <span class="left_category" v-else-if="state==='待发货'">买家已付款，请尽快发货</span>
                        <span class="left_category" v-else>交易已完成</span>
                    </div>
                </div>
                <div class="detail_title_content">
                    <div v-if="state==='待付款'" class="tips">
                        买家暂未填写收货信息
                    </div>
                    <div v-else class="userinfo">
                        <div>
                            <p>
                                <img class="icon_user" src="images/user.png" alt="">
                                <span class="info">{{detailData.receiver_name}}</span>
                                <span class="phoneNumber">{{detailData.receiver_telephone}}</span>
                            </p>
                            <p>
                                <img class="icon_position" src="images/position.png" alt="">
                                <span class="info">{{detailData.receiver_address}}</span>
                            </p>
                            <p v-if="state==='已完成'" >
                                <span style="marginLeft:.22rem">运单号: {{detailData.express_number}}</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="wrap">
            <div class="detail_content">
                <div class="title">
                    <div class="left_container">
                        <div class="left_box"></div>
                        <span class="left_category">商品信息</span>
                    </div>
                </div>
                <div class="info">
                    <p class="info_item">
                        <span class="category">水果生鲜</span>
                        <span class="time">{{detailData.create_time}}</span>
                    </p>
                    <p class="info_item">{{detailData.product_name}}</p>
                    <p class="info_item">订单号: {{detailData.req_sn}}</p>
                </div>
                <div class="bottom">
                    <div class="image">
                        <img :src="detailData.image" alt="">
                    </div>
                    <div class="bottom_right">
                        <p class="bottom_right_item">
                            <span>商品总价</span>
                            <span style="marginRight:.05rem"><b class="smallSize">￥</b>{{detailData.price}} x{{detailData.num}}</span>
                        </p>
                        <p class="bottom_right_item">
                            <span>运费(水果生鲜)</span>
                            <span style="marginRight:.05rem"><b class="smallSize">￥</b>{{detailData.fare}}</span>
                        </p>
                        <p class="bottom_right_item bottom_right_item_last" style="opacity:1">
                            <span>实付款</span>
                            <span style="marginRight:.05rem"><b class="smallSize">￥</b>{{detailData.total}}</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { Indicator } from 'mint-ui'
import { queryPackage } from '@/api'
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
     queryPackage({com:this.$route.params.item.express_company,num:this.$route.params.item.express_number}).then(res=>{
        console.log(res)
     })
        console.log(this.$route.params.item)
        if(this.$route.params.item){
        this.detailData=this.$route.params.item
        switch(this.detailData.state){
            case '1':
                this.state='待付款'
                break
            case '2':
                this.state='待发货'
                break
            case '3':
                this.state='已完成'
                break
        }
        console.log('订单详情信息',this.detailData)
        }
    },
    beforeDestroy(){
        this.$store.state.showTab = true
    }
}
</script>
<style lang="scss" scoped>
#orderDetail{
    height: 100%;
    overflow: hidden;
    font-size: .14rem;
    background: rgba(239, 241, 243, 1);;
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
            box-shadow: 0px 1px 2px rgba(106, 110, 144, 0.63921568627451);
            .back{
                float: left;
                .icon-huitui{
                    float: left;
                    margin-left: .15rem;
                    font-size: .22rem;
                    font-weight: 800;
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
                font-weight: 600;
                padding-right: .58rem;
                color: #333;
            }
}
.title_wrap{
        margin:0 .1rem;
        margin-top: .45rem;
    .detail_title{
        background: #fff;
        margin-bottom:.1rem;
        box-shadow: 0px 1px 2px rgba(106, 110, 144, 0.63921568627451);
        border-radius: 0 0 6px 6px;
        .title{
        display:flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        height: .28rem;
        line-height: .28rem;
        font-size: .14rem;
        border-bottom: 1px solid rgba(106, 110, 144, 0.3);
        .left_container{
          display:flex;
          align-items: center;
          .left_box{
            width:.03rem;
            height: .15rem;
            background: rgba(0, 121, 194, 1);
          }
          .left_category{
            float: left;
            margin-left: .1rem;
            font-weight: 600;
            color: #0079c2;
            font-size: .15rem;
          }
        }
      }
      .detail_title_content{
          .tips{
              height:.59rem;
              width: 100%;
              color:#333;
              opacity: .7;
              text-align: center;
              line-height: .59rem;
          }
          .userinfo{
              width:100%;
              box-sizing: border-box;
              padding:.1rem;
              padding-bottom: .15rem;
              p{
                  display: flex;
                  align-items: flex-end;
                  height: .25rem;
                //   line-height: .25rem;
                  color:#333;
                .icon_user{
                    width:.17rem;
                    height: .17rem;
                    margin-right: .05rem;
                }
                .icon_position{
                    width:.14rem;
                    height: .17rem;
                    margin-right: .06rem;
                    margin-left:.015rem;
                }
                .phoneNumber{
                    margin-left: .1rem;
                    font-size: .13rem;
                    opacity: .7;
                }
              }
          }
      }
    }
}
.wrap{
    margin:0 .1rem;
.detail_content{
    background: #fff;
    width: 3.51rem;
    border-radius: 6px;
    overflow: hidden;
    box-shadow: 0px 1px 2px rgba(106, 110, 144, 0.63921568627451);
    .title{
        display:flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        height: .28rem;
        line-height: .28rem;
        font-size: .14rem;
        border-bottom: 1px solid rgba(106, 110, 144, 0.3);
        .left_container{
          display:flex;
          align-items: center;
          .left_box{
            width:.03rem;
            height: .15rem;
            background: rgba(0, 121, 194, 1);
          }
          .left_category{
            float: left;
            margin-left: .1rem;
            font-weight: 600;
            color: #333;
            font-size: .16rem;
          }
        }
      }
      .info{
          display: flex;
          width: 100%;
          height: .8rem;
          flex-direction: column;
          box-sizing: border-box;
          padding: .13rem;
          .info_item{
              flex:1;
              display: flex;
              justify-content: space-between;
              font-size: .13rem;
              align-items: center;
              margin-bottom: .05rem;
              color: #000;
              .time{
                  color:#333;
                  font-size: .12rem;
                  opacity: .7;
              }
          }
      }
      .bottom{
          width:100%;
          height: 1.2rem;;
          display: flex;
          padding:.13rem;
          padding-right:.05rem;
          box-sizing: border-box;
          .image{
              width:.92rem;
              height: .92rem;
              margin-right:.1rem;
              img{
                  width:100%;
                  height:100%;
              }
          }
      }
      .bottom_right{
          flex:1;
          display: flex;
          flex-direction: column;
          padding-top:.22rem;
          .bottom_right_item{
              flex:1;
              display: flex;
              justify-content: space-between;
              align-items: center;
              font-size: .12rem;
              color: #333;
              opacity: .7;
              .smallSize{
                  font-size: .04rem;
              }
              .bottom_right_item_last{
                  font-size: .13rem;
                  color: #000;
              }
          }
      }
    }
}
</style>