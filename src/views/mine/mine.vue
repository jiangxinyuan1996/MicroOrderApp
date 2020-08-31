<template>
  <div id="center">
    <div class="center_container">
      <div class="container_userinfo">
        <div class="userinfo_image">
          <img :src="src" alt="" />
        </div>
        <div class="userinfo_name">
          <p style="overflow:hidden;margin-bottom:.13rem"><span style="float:left">{{nickname}}</span></p>
          <p>
            <img v-if="bindShow" style="height:.2rem;float:left" src="images/店铺未绑定.svg" alt="">
            <img v-else style="height:.2rem;float:left" src="images/店铺已绑定.svg" alt="">
          </p>
        </div>
      </div>
      <div class="center_service">
        <!-- <h4 class="service_title">通联服务</h4> -->
        <div class="service_list">
          <div class="list_item" v-for="(item,index) in centerList" :key="index" @click="handleClick(item)">
            <div class="item_left">
            <svg class="icon" aria-hidden="true">
              <use :xlink:href="item.icon"></use>
            </svg>
            </div>
            <div class="item_right">
              <span style="font-size:.15rem;color:#707275">{{item.text}}</span>
              <i class="iconfont icon-qianjin" style="color:#707275;margin-right:.15rem"></i>
            </div>
          </div>
          <!-- <div :class="'list_item'+' ' + (index===2||index===5||index===8?'item_end':'')+' '+(index<6?'item_pre':'')"
          v-for="(item,index) in centerList" :key="index" @click="handleClick(item)">
            <svg class="icon" aria-hidden="true">
              <use :xlink:href="item.icon"></use>
            </svg>
            <p>{{item.text}}</p>
          </div> -->
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
      nickname:'',
      bindShow:true,
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
          text: '我的店铺',
          icon: '#icon-huabanfuben'
        },
        {
          text: '商品货架',
          icon: '#icon-mobanxiazai-01'
        },
          {
            text: '物流配置',
            icon: '#icon-wuliu'
          },
        {
          text: '我的销售',
          icon: '#icon-xiaoshou'
        },
        {
          text: '我的代理',
          icon: '#icon-dailishang'
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
    
  },
  mounted(){
    getUserAvatar().then(res=>{
      this.src=res.data.data.headimgurl
      this.nickname=res.data.data.nickname
    })
          if(localStorage.getItem('merchantid')!=''&&localStorage.getItem('merchantid')){
            this.bindShow=false
          }else{
            this.bindShow=true
          }
  },
  methods: {
    handleOrder(){
          this.$router.push('/order')
    },
    handleClick (item) {
      console.log(item.text)
      switch (item.text) {
        case '商品货架':
          this.$router.push('/goods')
          break
        case '物流配置':
          this.$router.push('/logistics')
          break
        case '我的店铺':
          if(localStorage.getItem('merchantid')!=''&&localStorage.getItem('merchantid')){
          Toast.clear()
          Toast('已绑定店铺')
            break
          }else{
            this.$router.push('/register')
            break
          }
        case '我的销售':
          Toast.clear()
          Toast('该功能尚未开放')
          break
        case '我的代理':
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
  float: left;
  font-size: .18rem;
  margin-bottom:.05rem;
}
#center{
  height: 100%;
  background: #f4f6f8;
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
    // flex-direction: column;
    // align-items: center;
    height: 1.06rem;
    background: #fff;
    margin-bottom:0.1rem;
    .userinfo_image{
      margin-left: .2rem;
      margin-top:.16rem;
      width:.8rem;
      height:.8rem;
      border-radius: 50%;
     overflow: hidden;
     img{
       width: 100%;
       height: 100%;
     }
    }
    .userinfo_name{
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding-left: .18rem;
      flex: 1;
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
    margin:0.1rem  0;
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
        display: flex;
        justify-content: space-between;
        width:100%;
        height: .62rem;
        line-height: .62rem;
        .item_left{
          width:.54rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .item_right{
          flex:1;
          display: flex;
          justify-content: space-between;
          border-bottom: 1px solid #eeeef0;
        }
      }
    }
 }
}
</style>
