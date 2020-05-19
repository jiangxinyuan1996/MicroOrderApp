<template>
  <div id="home">
      <div class="header_title">
        <div class="header_info" @click="handleCreate">收款</div>
        <div class="header_info" @click="handleClick">货架</div>
      </div>
      <ul class="chooseDate">
        <router-link to="/" tag="li" exactActiveClass="active">今天</router-link>
        <router-link to="/x" tag="li" exactActiveClass="active">近一周</router-link>
        <router-link to="/xx" tag="li" exactActiveClass="active">近一月</router-link>
        <router-link to="/xxx" tag="li" exactActiveClass="active">近一年</router-link>
      </ul>
      <div class="money">总收款: 10500 元</div>
      <!-- <div class="count">共卖出: 150 件商品</div> -->
      <div id="line_echarts"></div>
      <div id="pie_echarts"></div>
  </div>
</template>
<script>
import { HomeData } from '@/api'
import { Indicator } from 'mint-ui'

var echarts = require('echarts')
export default {
  data () {
    return {
      pieChartsData : {
    title: {
        text: '收入统计饼形图',
        // subtext: '虚构数据',
        left: 'center'
    },
    tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
    },
    legend: {
        bottom: 10,
        left: 'center',
        data: ['1月', '2月', '3月', '4月', '5月','6月','7月']
    },
    series: [
        {
            name:'收款(百分比)',
            type: 'pie',
            radius: '65%',
            center: ['50%', '50%'],
            selectedMode: 'single',
            data: [
                {value: 1200, name: '1月'},
                {value: 1400, name: '2月'},
                {value: 1500, name: '3月'},
                {value: 1700, name: '4月'},
                {value: 1900, name: '5月'},
                {value: 2000, name: '6月'},
                {value: 2800, name: '7月'}
            ],
            emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]
},
      lineChartsData: {
        title: {
        text: '收入统计',
        // subtext: '虚构数据',
        left: 'center'
        },
        xAxis: {
          type: 'category',
          data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月']
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
    },
    handleCreate(){
      this.$router.push('/createGoods')
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
     Indicator.close()
    var myChart = echarts.init(document.getElementById('line_echarts'))
    myChart.setOption(this.lineChartsData)
    var pieChart = echarts.init(document.getElementById('pie_echarts'))
    pieChart.setOption(this.pieChartsData)
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
  .chooseDate{
    height: .25rem;
    line-height: .25rem;
    li{
      
      height: 100%;
      width:.6rem;
      border-radius: 5px;
      margin-left: .2rem;
      float: left;
    }
    .active{
      background: #04BE02;
      color: #fff;
    }
  }
  .money{
    position: absolute;
    left:.28rem;
    top:1.5rem;
  }
  .count{
    position: absolute;
    left:.28rem;
    top:1.8rem;
  }
#line_echarts {
  margin-top: 1rem;
  height:300px;
}
#pie_echarts {
  height: 500px;
  z-index: 20;
  margin-bottom: .55rem;
}
</style>
