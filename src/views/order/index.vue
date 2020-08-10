<template>
  <div id="order">
    <!-- <h1>订单</h1> -->
    <div class="header">
      <div class="search">
        <input type="text" placeholder="搜索名称/订单号" v-model.trim="mytext" @keypress.enter="handleSearch" />
      </div>
    </div>
    <!-- <van-tabs v-model="active" color="#0079c2">
      <van-tab title="待付款" badge="1"><waitshipped :keyword="mytext"/></van-tab>
      <van-tab title="待发货" badge="1"><shipped :keyword="mytext"/></van-tab>
      <van-tab title="已完成"><success :keyword="mytext" /></van-tab>
    </van-tabs> -->
    <navbar></navbar>
    <router-view :keyword="mytext"/>
  </div>
</template>
<script>
import navbar from '@/components/navbar'
import waitshipped from './components/waitshipped'
import shipped from './components/shipped'
import success from './components/success'
import { Indicator } from 'mint-ui'
import { Tab, Tabs } from 'vant';
import { HomeData } from '@/api'
export default {
  components: {
    navbar,
    Tab,
    Tabs,
    waitshipped,
    shipped,
    success
  },
  data(){
    return{
      mytext:'',
      keyword:'',
      active:1,
    }
  },
  beforeCreate(){
    this.$store.state.showTab=true
    //  HomeData().then(res=>{
    //   if(res.data.success===1){
    //     localStorage.setItem('merchantid',res.data.data.merchant_id)
    //   }else{
    //     this.$router.push('/register')
    //   }
    // })
  },
  methods:{
    handleSearch() {
      console.log(this.mytext)
      console.log(this.active)
      switch(this.$route.name){
        case 'waitshipped':
        this.$router.push('/order/waitshipped')
        break
        case 'shipped':
        this.$router.push('/order/shipped')
        break
        case 'success':
        this.$router.push('/order/success')
        break
      }
    }
  },
  mounted(){
     Indicator.close()
  }
}
</script>
<style lang="scss" scoped>
#order{
  height: 100%;
  background: #eff1f3;
  .header {
    display: flex;
    width: 100%;
    height: 0.29rem;
    padding: 0.09rem 0;
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
      margin:0 .15rem;
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
        padding-left: 0.3rem;
        background: rgba(242,242,242,1)  10px 6px no-repeat url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAXCAMAAADX9CSSAAAAM1BMVEUAAAC8vLy8vLy9vb27u7u8vLy/v7+9vb2/v7+8vLy8vLy8vLy7u7u9vb27u7u7u7u7u7uNEF5lAAAAEHRSTlMA89tTpH4wHwy9iprlyYdxyi6iUQAAAIZJREFUKM91kVkOwyAMBbFZszSd+5+2SHEVt8D7imbCA0y4E5OKaIrBYlSxqDc7LvsPllxaK1mciMBW7++6AValHT+dXej3d6kPr2ILEuTgkiFZTfG8WJFA87yBrPiqZ7Xv8pzjvV6gkzl0TJzPjWM2ZxPjuyQTwzua+IuJayYOOMMs1/n+ALRtCdMh8+jaAAAAAElFTkSuQmCC');
        background-size: 15px 15px;
        flex: 1;
        // background: #f8f8f8;
      }
    }
  }
}
</style>
