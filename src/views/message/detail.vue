<template>
    <div id="message">
        <div class="create_header">
                <div class="back" @click="handleBack">
                <i class="iconfont icon-huitui" />
                <!-- <p class="header_info">返回</p> -->
                </div>
                <div class="header_title">订单物流</div>
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
        <van-steps direction="vertical" :active="active" inactive-color="#969799">
            <van-step v-for="item in logisList" :key="item">
                <h3>{{item.context}}</h3>
                <p>{{item.time}}</p>
            </van-step>
        </van-steps>
    </div>
</template>
<script>
import { Step, Steps } from 'vant';
import { queryPackage } from '@/api'

export default {
    data(){
        return{
            active:0,
            detailData:[],
            logisList:[]
        }
    },
    components:{
        Step,
        Steps
    },
    mounted(){
        var str =`{
            "message":"ok",
            "nu":"TT6601002463856",
            "ischeck":"1",
            "com":"tiantian",
            "status":"200",
            "data":[
                {"time":"2020-08-09 16:21:04","context":"客官，您的快件已签收，签收人【家人】，如有任何疑问，请联系【17710521621】/【北京东城天坛13131467202】，风里雨里小哥不易，贴心服务火速送达，五星好评盼您点赞！","ftime":"2020-08-09 16:21:04","areaCode":"CN110101016000","areaName":"北京,北京,东城区,天坛","status":"签收"},
                {"time":"2020-08-09 16:06:52","context":"【北京东城天坛】的杜卿赫17710521621正在派件","ftime":"2020-08-09 16:06:52","areaCode":"CN110101016000","areaName":"北京,北京,东城区,天坛","status":"派件"},
                {"time":"2020-08-09 16:05:52","context":"快件到达【北京东城天坛】","ftime":"2020-08-09 16:05:52","areaCode":"CN110101016000","areaName":"北京,北京,东城区,天坛","status":"在途"},
                {"time":"2020-08-09 15:00:56","context":"快件到达【北京东城天坛】","ftime":"2020-08-09 15:00:56","areaCode":"CN110101016000","areaName":"北京,北京,东城区,天坛","status":"在途"},
                {"time":"2020-08-09 11:58:08","context":"快件由【北京通州集散】发往【北京东城天坛】","ftime":"2020-08-09 11:58:08","areaCode":"CN110112000000","areaName":"北京,北京,通州区","status":"在途"},
                {"time":"2020-08-09 07:13:34","context":"快件到达【北京通州集散】","ftime":"2020-08-09 07:13:34","areaCode":"CN110112000000","areaName":"北京,北京,通州区","status":"在途"},
                {"time":"2020-08-09 01:28:11","context":"快件由【华北廊坊枢纽】发往【北京通州集散】","ftime":"2020-08-09 01:28:11","areaCode":"CN131000000000","areaName":"河北,廊坊市","status":"在途"},
                {"time":"2020-08-09 01:26:03","context":"快件到达【华北廊坊枢纽】","ftime":"2020-08-09 01:26:03","areaCode":"CN131000000000","areaName":"河北,廊坊市","status":"在途"},
                {"time":"2020-08-08 03:37:45","context":"快件由【东北沈阳枢纽】发往【华北廊坊枢纽】","ftime":"2020-08-08 03:37:45","areaCode":null,"areaName":null,"status":"在途"},
                {"time":"2020-08-08 03:33:33","context":"快件到达【东北沈阳枢纽】","ftime":"2020-08-08 03:33:33","areaCode":null,"areaName":null,"status":"在途"},
                {"time":"2020-08-07 19:27:14","context":"快件由【辽宁大连分拨】发往【东北沈阳枢纽】","ftime":"2020-08-07 19:27:14","areaCode":"CN210200000000","areaName":"辽宁,大连市","status":"在途"},
                {"time":"2020-08-07 19:15:36","context":"快件到达【辽宁大连分拨】","ftime":"2020-08-07 19:15:36","areaCode":"CN210200000000","areaName":"辽宁,大连市","status":"在途"},
                {"time":"2020-08-07 18:24:07","context":"快件由【H大连马栏营业"}
                ]}`
        var obj = JSON.parse(str)
        this.logisList=obj.data
        this.active=obj.ischeck
        // console.log(this.$route.params.item)
        console.log(obj)
        queryPackage({com:this.$route.params.item.express_company,num:this.$route.params.item.express_number}).then(res=>{
            console.log(res)
        })
        this.detailData=this.$route.params.item
    },
    methods:{
        handleBack(){
            this.$router.push('/message')
        }
    }
}
</script>
<style lang="scss" scoped>
h3{
    font-weight: normal;
    font-size: .14rem;
}
p{
    font-weight: normal;
    font-size: .14rem;
}
#message{
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
.wrap{
    margin:.5rem .1rem .2rem;
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