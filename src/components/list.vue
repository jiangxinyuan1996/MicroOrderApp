<template>
  <div id="list">
    <!-- <mt-loadmore :bottom-method="loadMore" :bottom-all-loaded="loading" ref="loadmore" :auto-fill="false"> -->
      <!-- <ul class="list"
      v-infinite-scroll="loadMore"
        infinite-scroll-disabled="loading"
        infinite-scroll-distance="50"
        infinite-scroll-immediate-check="false"
      > -->
      <van-list
      class="list"
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="loadMore"
      >
      <li class="list_item" v-for="item in orderList" :key="item.order_id">
        <div class="title">
          <div class="left_container">
            <div class="left_box"></div>
            <span class="left_category">水果生鲜</span>
          </div>
          <span class="right_status">{{currentStatus}}</span>
        </div>
        <div class="content">
          <div class="left"><img :src="item.image" alt=""/></div>
          <div class="right">
            <p class="product_name">
              <span>{{item.product_name}}</span>
              <span style="marginRight:.05rem"><b style="fontSize:.05rem">￥</b>{{item.price}}</span>
            </p>
            <p class="order_number">订单号：<span style="color:#333">{{item.req_sn}}</span><span style="fontSize:.1rem;float:right;marginRight:.05rem">x {{item.num}}</span></p>
            <p class="product_fare">运费(水果生鲜) <span style="fontSize:.05rem">￥</span>{{item.fare}}</p>
            <p class="total">应收款 <span style="fontSize:.05rem">￥</span><span style="color:#0079c2;fontSize:.14rem;marginRight:.05rem">{{item.total}}</span></p>
          </div>
        </div>
        <div class="bottom">
          <div class="time">{{item.create_time}}</div>
          <div v-if="currentStatus==='待发货'" class="send_button" @click="handleDelivery(item)" style="marginLeft:.1rem">卖家发货</div>
          <div class="detail_button" @click="handleClick(item)" >订单详情</div>
        </div>
      </li>
      </van-list>
      <!-- </ul> -->
      <!-- <p slot="top" class="mint-loadmore-top"></p> -->
    <!-- </mt-loadmore> -->
  <i @click="backTop" class="iconfont icon-huidaodingbu" style="display:none;background:#fff;opacity:.8;fontSize:.3rem;position:fixed;right:.1rem;bottom:.6rem;zIndex:999;border:1px solid #ccc;borderRadius:50%" />
  </div>
</template>
<script>
import { getOrderList } from "@/api";
import { Indicator } from "mint-ui";
import { List } from 'vant';

 window.onscroll=function(){
    if(document.documentElement.scrollTop>550||document.body.scrollTop>550){
      document.querySelector('.icon-huidaodingbu').style.display="block"
    }else{
      document.querySelector('.icon-huidaodingbu').style.display="none"
    }
 }
export default {
  props: ["status","keyword"],
  components:{
    List
  },
  data() {
    return {
      loading:false,
      finished:false,
      total: 0,
      page: 1,
      limit: 10,
      mytext: "",
      currentStatus: "",
      orderList: []
    };
  },
  mounted() {
    this.clear()
    Indicator.open({
      text: "加载中...",
      spinnerType: "fading-circle"
    });
    switch (this.status) {
      case "1":
        this.currentStatus = "待付款";
        break;
      case "2":
        this.currentStatus = "待发货";
        break
      case "3":
        this.currentStatus = "已完成";
        break
    }
    getOrderList({ status: this.status ,keyword:this.keyword}).then(res => {
      if (res.data.success === 1) {
        this.page++;
        Indicator.close();
        this.orderList = res.data.data;
      } else {
        Indicator.close();
        this.$toast("无数据");
      }
    });
  },
  destroyed(){
    Indicator.close()
  },
  methods: {
    clear(){
      setTimeout(()=>{
        Indicator.close()
      },1000*5)
    },
    backTop(){
      document.documentElement.scrollTop=0
      document.body.scrollTop=0
    },
    handleDelivery(item){
      this.$router.push({name:'orderdelivery',params:{
        item
      }})
    },
    handleSearch() {
      console.log("搜索");
    },
    handleClick(item) {
      this.$router.push({
        name: "orderDetail",
        params: {
          item
        }
      });
    },
    loadMore() {
      // this.finished=true
      if (this.orderList.length !== this.total) {
        this.loading=true
        getOrderList({
          status: this.status,
          page: this.page,
          limit: this.limit
        }).then(res => {
          console.log(res);
          if (res.data.success === 1) {
            this.total = parseInt(res.data.count);
            this.page++;
            this.orderList = [...this.orderList, ...res.data.data];
            this.loading=false
          } else {
            this.$toast("无数据");
            this.loading=false
          }
        });
      } else {
        this.finished=true
      }
    }
  }
};
</script>
<style lang="scss" scoped>
#list {
  background: rgba(239, 241, 243, 1);
  width: 100%;
  margin-bottom: 0.45rem;
  .list {
    margin-top:.15rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    .list_item {
      display: flex;
      flex-direction: column;;
      width:3.5rem;
      border-radius: 7px;
      background: #fff;
      margin-bottom: .1rem;
      overflow: hidden;
      box-shadow: 0px 2px 4px rgba(106, 110, 144, 0.63921568627451);
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
          }
        }
        .right_status{
          color: #0079c2;
          margin-right: .1rem;
        }
      }
      .content{
        display: flex;
        flex:1;
        padding:6px;
        box-sizing: border-box;
        .left{
          width:.8rem;
          height: .8rem;
          margin-right:.1rem;
          img{
            width: 100%;
            height: 100%;
          }
        }
        .right{
          flex: 1;
          display: flex;
          flex-direction: column;
          p{
            flex:1;
            width: 100%;
           
          }
          .product_name{
             display:flex;
            align-items: center;
            justify-content: space-between;
            span{
              font-size: .12rem;
              &:first-of-type{
                width:1.5rem;
                font-size: .13rem;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                color: #000000;
              }
              &:last-of-type{
                font-weight: 600;
                color: #333;
              }
            }
          }
          .order_number{
            font-size: .12rem;
            line-height: .2rem;
            color: #000000;
          }
          .product_fare{
             display:flex;
            align-items: center;
            font-size: .1rem;
          }
          .total{
            text-align: right;
            font-size: .12rem;
          }
        }
      }
      .bottom{
        width: 100%;
        height: .28rem;
        line-height: .28rem;
        font-size: .14rem;
        padding:0 .1rem;
        box-sizing: border-box;
        .time{
          float: left;
          color: #a2a2a2;
          font-size: .12rem;
        }
        .detail_button{
          float: right;
          width:.7rem;
          text-align: center;
          border-radius: .09rem;
          height: .18rem;
          line-height: .18rem;
          font-size: .12rem;
          color: #0079c2;
          border: 1px solid rgba(50, 147, 206,.5);
        }
        .send_button{
          float: right;
          width:.7rem;
          text-align: center;
          border-radius: .09rem;
          height: .18rem;
          line-height: .18rem;
          font-size: .12rem;
          color: #F47922;
          border: 1px solid #F47922;
        }
      }
    }
  }
}
</style>
