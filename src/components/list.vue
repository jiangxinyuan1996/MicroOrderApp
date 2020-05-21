<template>
  <div id="list">
    <div class="header">
      <div class="search">
        <!-- <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAXCAMAAADX9CSSAAAAM1BMVEUAAAC8vLy8vLy9vb27u7u8vLy/v7+9vb2/v7+8vLy8vLy8vLy7u7u9vb27u7u7u7u7u7uNEF5lAAAAEHRSTlMA89tTpH4wHwy9iprlyYdxyi6iUQAAAIZJREFUKM91kVkOwyAMBbFZszSd+5+2SHEVt8D7imbCA0y4E5OKaIrBYlSxqDc7LvsPllxaK1mciMBW7++6AValHT+dXej3d6kPr2ILEuTgkiFZTfG8WJFA87yBrPiqZ7Xv8pzjvV6gkzl0TJzPjWM2ZxPjuyQTwzua+IuJayYOOMMs1/n+ALRtCdMh8+jaAAAAAElFTkSuQmCC" alt=""> -->
        <input type="text" placeholder="姓名/运单号" v-model.trim="mytext" @keypress.13="handleSearch" />
        <div class="cancel" @click="handleSearch">
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAXCAMAAADX9CSSAAAAM1BMVEUAAAC8vLy8vLy9vb27u7u8vLy/v7+9vb2/v7+8vLy8vLy8vLy7u7u9vb27u7u7u7u7u7uNEF5lAAAAEHRSTlMA89tTpH4wHwy9iprlyYdxyi6iUQAAAIZJREFUKM91kVkOwyAMBbFZszSd+5+2SHEVt8D7imbCA0y4E5OKaIrBYlSxqDc7LvsPllxaK1mciMBW7++6AValHT+dXej3d6kPr2ILEuTgkiFZTfG8WJFA87yBrPiqZ7Xv8pzjvV6gkzl0TJzPjWM2ZxPjuyQTwzua+IuJayYOOMMs1/n+ALRtCdMh8+jaAAAAAElFTkSuQmCC"
            alt
          />
        </div>
      </div>
    </div>
    <mt-loadmore :bottom-method="loadMore" ref="loadmore" :auto-fill="false">
      <div 
        v-for="(item,index) in orderList"
        :key="index"
        share="[object Object]"
        time_stamp="1589958462070"
        style="background-color:#fff;margin-bottom:.1rem"
      >
        <div>
          <div
            createtime="1589958446000"
            discount="0"
            discounttype="-1"
            priceid="2"
            pricerange="12"
            skusstr="默认"
            class="f-flex f-vc f-sub-mr g8 weui_padding f14 wsxc_purchase_order_details custom_bury"
          >
            <div>
              <div class="avatar img-rounded" style="width: 72px; height: 72px;">
                <img
                style="width:100%;height:100%"
                  class="img-rounded"
                  src="https://xcimg.szwego.com/o_1e8oc0l1i1mmv3cl1sla2nr13ab16.jpg?imageMogr2/auto-orient/thumbnail/!310x310r/quality/100/format/jpg"
                />
              </div>
            </div>
            <div class="f-flex-1" style="flex:1;width:0">
              <div class="word-break ellipsis-two" style="-webkit-line-clamp: 1;">{{item.product_name}}</div>
              <div
                class="word-break ellipsis-one"
                style="margin-top: 8px; white-space: nowrap;"
              >货号：{{item.req_sn}}</div>
            </div>
            <div class="text-right">
              <div class="warn-color">¥ 12</div>
              <div class="f12">x 4</div>
            </div>
          </div>
        </div>
        <div class="f-flex f-vc f-flex-wrap f-flex-hr" style="padding: 0px 15px;"></div>
        <div class="weui_cells wsxc_purchase_order_details custom_bury" style="margin-top: 0px;">
          <div class="weui_cell f-sub-mr f-sub-mr f14 g8">
            <div class="weui_cell_bd weui_cell_primary">
              <div class="f-flex f-sb">
                <div>快递</div>
                <div class="text-right">
                  <div>
                    <div style="display: inline-block;">05-20 15:07</div>
                    <span>【卖家开单】</span>
                    <div style="display: inline-block; vertical-align: middle;"></div>
                  </div>共4件 合计：¥
                  <span class="f16 g6">49</span>
                  <span class="g6">(含运费1)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="flex-nav cover-flex-nav" style="background-color: rgb(255, 255, 255);">
          <div class="flex-tab" style="color: rgb(102, 102, 102);"></div>
          <div class="flex-tab" style="color: rgb(102, 102, 102);"></div>
          <div class="flex-tab" style="color: rgb(60, 197, 31);" @click="handleDelivery(item)">发货</div>
        </div>
      </div>
      <!-- <ul class="navlist"  v-infinite-scroll="loadMore"
        infinite-scroll-disabled="loading"
        infinite-scroll-distance="50"
        infinite-scroll-immediate-check="false">
            <li v-for="(item,index) in orderList" :key="index" :class="'list_item '+(currentStatus==='待付款'?'red':'green')" @click="handleClick(item)">
                <p>订单号:{{item.req_sn}}</p>
                <p>收款单名称:{{item.product_name}}</p>
                <p>日期:{{item.create_time}}</p>
                <p>总价:{{item.total}}</p>
                <p>买家:{{item.receiver_name}}</p>
                <p>状态:{{currentStatus}}</p>
            </li>
      </ul>-->
      <p slot="top" class="mint-loadmore-top"></p>
    </mt-loadmore>
  </div>
</template>
<script>
import { getOrderList } from "@/api";
import { Indicator } from "mint-ui";

export default {
  props: ["status"],
  data() {
    return {
      total: 0,
      page: 1,
      limit: 10,
      mytext: "",
      currentStatus: "",
      orderList: []
    };
  },
  mounted() {
    Indicator.open({
      text: "加载中...",
      spinnerType: "fading-circle"
    });
    switch (this.status) {
      case "1":
        this.currentStatus = "待付款";
        break;
      case "2":
        this.currentStatus = "已付款";
    }
    getOrderList({ status: this.status }).then(res => {
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
  methods: {
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
      if (this.orderList.length !== this.total) {
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
          } else {
            this.$toast("无数据");
          }
        });
      } else {
        this.$toast("到底了");
      }
    }
  }
};
</script>
<style lang="scss" scoped>
body{
    background-color: #efeff4;
}
#list {
  width: 100%;
  margin-bottom: 0.45rem;
  .header {
    display: flex;
    width: 100%;
    height: 0.29rem;
    padding: 0.09rem 0;
    border-top: 0.5px solid #ebebeb;
    border-bottom: 0.5px solid #ebebeb;
    background: #fff;
    .cancel {
      background: #f1f1f1;
      font-size: 0.16rem;
      width: 0.7rem;
      height: 0.3rem;
      text-align: center;
      line-height: 0.3rem;
      color: rgb(38, 38, 247);
      font-size: 0.14rem;
    }
    .search {
      display: flex;
      flex: 1;
      height: 0.28rem;
      border: none;
      background: #f8f8f8;
      border-radius: 0.15rem;
      overflow: hidden;
      img {
        margin: 0.09rem 0.09rem 0 0.12rem;
        width: 0.11rem;
        height: 0.11rem;
      }
      input {
        outline: none;
        border: none;
        padding-left: 0.2rem;
        flex: 1;
        background: #f8f8f8;
      }
    }
  }
  .weui_cell {
    padding: 10px 15px;
    position: relative;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    -webkit-box-align: center;
    -webkit-align-items: center;
    align-items: center;
}
.flex-nav {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    background-color: #fff;
    outline: 0;
    -webkit-align-items: center;
    align-items: center;
    -ms-flex-align: center;
}
  .weui_padding{
      padding: .1rem .15rem;
  }
  .flex-nav {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    background-color: #fff;
    outline: 0;
    -webkit-align-items: center;
    align-items: center;
    -ms-flex-align: center;
}
.flex-nav .flex-tab {
    -webkit-box-flex: 1;
    position: relative;
    padding: .5em;
    width: 0;
    text-align: center;
    color: #000;
    -webkit-flex: 1;
    -ms-flex: 1;
    flex: 1;
}
.before-border-right:before, .flex-nav .flex-tab:not(:last-child):before {
    position: absolute;
    top: 0;
    right: 0;
    border-right: 1px solid #d9d9d9;
    width: 1px;
    height: 100%;
    -webkit-transform: scale(.5,.5);
    transform: scale(.5,.5);
    content: " ";
}
.text-right {
    text-align: right;
}
  .f-vc{
      align-items: center;
  }
  .f-flex{
      display:flex;
  }
  .weui_cell_primary {
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    flex: 1;
}
  .f-sb {
    -webkit-box-pack: justify;
    -webkit-justify-content: space-between;
    justify-content: space-between;
}
  .f14{
      font-size: .14rem;
  }
  .f12{
      font-size: .12rem;
  }
  .g8{
      color: #888;
  }
  .deep-gray{
      color: #888;
  }
  .warn-color {
    color: #ffbe00;
}
  .navlist {
    .list_item {
      display: flex;
      flex-direction: column;
      // height: 0.5rem;
      background: #fff;
      margin: 0.06rem 0.08rem;
      padding: 0 0.06rem;
      border-radius: 5px;
      p {
        flex: 1;
      }
    }
    .red {
      border-bottom: 1px solid red;
    }
    .green {
      border-bottom: 1px solid #04be02;
    }
  }
}
</style>
