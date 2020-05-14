<template>
  <div id="home">
      <div class="header_title">
        <div class="header_info" @click="handleClick">收款</div>
        <div class="header_info">商品</div>
      </div>
      <div>总收入: 10500 元</div>
      <div>共卖出: 150 件商品</div>
      <div id="line_echarts"></div>
  </div>
</template>
<script>
import { HomeData } from '@/api'
var echarts = require('echarts')
export default {
  data () {
    return {
      lineChartsData: {
        xAxis: {
          type: 'category',
          data: ['1月', '2月', '3月', '4月', '5月', '7月', '8月']
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: [1200, 1400, 1500, 1700, 1900, 2000, 2800],
          type: 'line'
        }]
      }
    }
  },
  // beforeRouteEnter(to,from,next){

  // },
  methods:{
    handleClick(){
      this.$router.push('/goods')
    }
  },
  beforeCreate(){
    HomeData().then(res=>{
      if(res.data.success===1){
        localStorage.setItem('merchantid',res.data.data.merchant_id)
      }else{
        this.$router.push('/register')
      }
      // console.log(res)
    })
  },
  mounted () {
    var myChart = echarts.init(document.getElementById('line_echarts'))
    myChart.setOption(this.lineChartsData)
    //  if(localStorage.getItem('merchantid')!=''&&localStorage.getItem('merchantid')){
    //         // this.$toast('已绑定店铺')
    //       }else{
    //         this.$router.push('/register')
    //     }
    
  }
}
</script>
<style lang="scss" scoped>
*{
  text-align: center;
}
.header_title{
    display: flex;
    height: 1rem;
    .header_info{
      flex: 1;
      margin:.25rem;
      line-height: .5rem;
      color: #fff;
      border-radius: 5px;
      background: #04BE02;
    }
  }
#line_echarts {
  height: 300px;
}
</style>
