<template>
  <div id="center">
    <h2 class="center_header">个人中心</h2>
    <div class="center_container">
      <div class="container_userinfo">
        <div class="userinfo_image">
          <img :src="src" alt="" />
        </div>
        <!-- <p v-if="false" class="username">小明</p>
        <p v-else class="username">未登录</p> -->
      </div>
      <!-- <div class="container_info">
        <div class="myOrder">
          <i class="iconfont icon-tuanduicankaoxian-"/>
          <p @click="handleOrder">明细</p>
          <p class="purse_money" style="height:0.19rem"></p>
          </div>
        <div class="purse" @click="handleWallet">
          <i class="iconfont icon-qianbao"/>
          <p class="purse_title">收款</p>
          <p class="purse_money"></p>
        </div>
      </div> -->
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
import { HomeData,getUserAvatar } from '@/api'
import { Indicator } from 'mint-ui'
import { Toast } from 'vant';

export default {
  data () {
    return {
      money:6.66,
      src:'',
      centerList: [
        // {
        //   text: '会员',
        //   icon: '#icon-filedicon_memberco'
        // },
        // {
        //   text: '商品',
        //   icon: '#icon-shangpin'
        // },
        {
          text: '店铺',
          icon: '#icon-huabanfuben'
        },
        {
          text: '货架',
          icon: '#icon-mobanxiazai-01'
        },
          {
            text: '物流',
            icon: '#icon-wuliu'
          },
        {
          text: '销售',
          icon: '#icon-xiaoshou'
        },
        {
          text: '代理',
          icon: '#icon-dailishang'
        },
        {
          text: '更多',
          icon: '#icon-gengduo'
        }
      ]
    }
  },
  beforeCreate(){
    this.$store.state.showTab=true
     Indicator.close()
    // HomeData().then(res=>{
    //   if(res.data.success===1){
    //     localStorage.setItem('merchantid',res.data.data.merchant_id)
    //   }else{
    //     this.$router.push('/register')
    //   }
    // })
    getUserAvatar().then(res=>{
      this.src=res.data.data
    })
  },
  methods: {

    // handleLogin(){
    //  window.location='http://dlallinpay.sinaapp.com/tlwdd/index.php?controller/index/index'
    // },
    handleOrder(){
          this.$router.push('/order')
    },
    handleClick (item) {
      switch (item.text) {
        case '货架':
          this.$router.push('/goods')
          break
        case '物流':
          this.$router.push('/logistics')
          break
        case '店铺':
          if(localStorage.getItem('merchantid')!=''&&localStorage.getItem('merchantid')){
          Toast.clear()
          Toast('已绑定店铺')
            break
          }else{
            this.$router.push('/register')
            break
          }
        case '销售':
          Toast.clear()
          Toast('该功能尚未开放')
          break
        case '代理':
          Toast.clear()
          Toast('该功能尚未开放')
        break
        case '更多':
          Toast.clear()
          // Toast('该功能尚未开放')
        break
      }
    },
    handleWallet(){
      this.$router.push({
        name:'wallet',
        params:{
          money:this.money
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
*{
  text-align: center;
}
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
  .container_userinfo{
    display: flex;
    flex-direction: column;
    align-items: center;
    height: .8rem;
    background: #7BACDC;
    margin:0.1rem .08rem 0;
    border-radius: 0.05rem;
    padding:0.1rem 0;
    .userinfo_image{
      width:.8rem;
      border-radius: 50%;
      flex: 2;
     overflow: hidden;
     img{
       width: 100%;
       height: 100%;
     }
    }
    .username{
      flex:1;
      font-size: .14rem;
    }
  }
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
        // border: none;
      }
      .item_end{
        border-right: .001rem solid #fff;
      }
    }
 }
}
</style>
