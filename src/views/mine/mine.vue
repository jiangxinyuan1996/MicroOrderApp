<template>
  <div id="center">
    <h2 class="center_header">个人中心</h2>
    <div class="center_container">
      <div class="container_info">
        <div class="myOrder">
          <i class="iconfont icon-tuanduicankaoxian-"/>
          <p>订单</p>
          <p class="purse_money" style="height:0.19rem"></p>
          </div>
        <div class="purse">
          <i class="iconfont icon-qianbao"/>
          <p class="purse_title">钱包</p>
          <p class="purse_money">￥6.66</p>
        </div>
      </div>
      <div class="center_service">
        <h4 class="service_title">通联服务</h4>
        <div class="service_list">
          <div :class="'list_item'+' ' + (index===2||index===5||index===8?'item_end':'')+' '+(index<6?'item_pre':'')"
          v-for="(item,index) in centerList" :key="index" @click="handleClick(item)">
            <svg class="icon" aria-hidden="true">
              <use :xlink:href="item.icon"></use>
            </svg>
            <p>{{item.text}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      centerList: [
        {
          text: '会员',
          icon: '#icon-filedicon_memberco'
        },
        {
          text: '商品',
          icon: '#icon-shangpin'
        },
        {
          text: '店铺',
          icon: '#icon-huabanfuben'
        },
        {
          text: '模板',
          icon: '#icon-mobanxiazai-01'
        },
        {
          text: '销售',
          icon: '#icon-xiaoshou'
        },
        {
          text: '物流',
          icon: '#icon-wuliu'
        },
        {
          text: '代理',
          icon: '#icon-dailishang'
        },
        {
          text: '更多',
          icon: '#icon-gengduo'
        }]
    }
  },
  methods: {
    handleClick (item) {
      console.log(item.text)
      switch (item.text) {
        case '模板':
          this.$router.push('/template')
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.iconfont{
  font-size: .26rem;
}
.icon{
  font-size: .26rem;
  margin-bottom:.05rem;
}
.center_header{
  // background-color: #fff;
  height: .4rem;
  line-height: .4rem;
  font-size: .16rem;
}
.center_container{
  display: flex;
  flex-direction: column;
  .container_info{
    height: 1rem;
    display:flex;
    justify-content: center;
    align-items: center;
    background: #04BE02;
    color: #fff;
    font-size: 0.14rem;
    margin:0.1rem .08rem 0;
    border-radius: 0.05rem;
    .myOrder{
      flex: 1;
    }
     .purse{
       flex:1;
    }
  }
 .center_service{
    font-size: .14rem;
    background-color: #fff;
    margin:0.1rem .08rem 0;
    border-radius: 0.1rem;
    .service_title{
      height: .5rem;
      line-height: .5rem;
      padding-left: .18rem;
      text-align: left;
      font-weight: 400;
      font-size: .14rem;
      color: #c0c0c0;
      border-bottom: .001rem solid #c0c0c0;
    }
    .service_list{
      .list_item{
        border-right: .001rem solid #c0c0c0;
        box-sizing: border-box;
        float: left;
        width:33.33333333%;
        display:flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: .8rem;
      }
      .item_pre{
        border-bottom: .001rem solid #c0c0c0;
      }
      .item_end{
        border-right: .001rem solid #fff;
      }
    }
 }
}
</style>
