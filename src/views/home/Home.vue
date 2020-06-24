<template>
  <div id="home">
      <div class="wrap">
      <!-- <ul class="chooseDate">
        <li v-for="(item,index) in datelist" :class="index===key?'active':''" :key="index" @click="handleChange(item,index)">{{item.title}}</li>
      </ul> -->
      <van-tabs v-model="active" @click="handleChange"  color="rgb(0,113,190)">
         <van-tab v-for="(item,index) in datelist" :key="index" :title='item.title'></van-tab>
      </van-tabs>
      <div class="money">总收款(元): <span style="color:red;fontSize:.12rem">￥</span><span>{{total}}</span> </div>
      <div class="count">收款笔数: <span>{{count}}</span> </div>
      </div>
      <van-cell-group>
        <van-cell title="收款" is-link to="/createGoods" @click="handleCreate"/>
        <van-cell title="货架" is-link to="/goods" @click="handleClick"/>
      </van-cell-group>
      <!-- <div class="header_title"> -->
        <!-- <div class="header_info" @click="handleCreate" data-intro="点击可创建收款单" data-step="1">收款</div>
        <div class="header_info" @click="handleClick" data-intro="点击进入货架" data-step="2">货架</div> -->
      <!-- </div> -->
      <!-- <div id="line_echarts"></div>
      <div id="pie_echarts"></div> -->
  </div>
</template>
<script>
import { HomeData,reqData } from '@/api'
import { Indicator } from 'mint-ui'
export default {
  data () {
    return {
      total:0,
      count:0,
      key:0,
      datelist:[
        {
          title:'今天'
        },
        {
          title:'近一周'
        },
        {
          title:'近一月'
        },
        {
          title:'近一年'
        }
      ],
      pieChartsData : {
    title: {
        text: '收款统计饼形图',
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
        text: '收款统计图',
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
    handleChange(index,title){
      this.key=index
      reqData({index}).then(res=>{
        this.total=res.data.data.total
        this.count=res.data.data.count
      })
    },
    handleClick(){
      this.$router.push('/goods')
    },
    handleCreate(){
      this.$router.push(
        {
          name:'createGoods',
          params:{
            val:'新增'
          }
        })
    }
  },
  beforeCreate(){
    this.$store.state.showTab=true
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
    //配置页面引导
    reqData().then(res=>{
      this.total=res.data.data.total
      this.count=res.data.data.count
    })
      if(localStorage.getItem('num')!=='1'){
        introJs().setOptions({
        prevLabel: "上一步",
        nextLabel: "\ue67b",
        skipLabel: "\ue6fb",
        doneLabel: "√"
    }).start()
        localStorage.setItem('num','1')
      }
    Indicator.close()
    // var myChart = echarts.init(document.getElementById('line_echarts'))
    // myChart.setOption(this.lineChartsData)
    // var pieChart = echarts.init(document.getElementById('pie_echarts'))
    // pieChart.setOption(this.pieChartsData)
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
      background: rgb(111, 186, 44);
    }
  }
  .wrap{
    position: relative;
    // border: 1px solid red;
    height: 2rem;
    // margin:0 .2rem;
    // border-radius: 5px;
    // background-image: linear-gradient(rgb(163, 183, 196), rgb(218, 219, 215));
    background: rgb(135,176,221);
    margin-bottom:.05rem;
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
      background: rgb(192, 163, 83);
      color: #fff;
    }
  }
  .money{
    position: absolute;
    left:.85rem;
    bottom:1.2rem;
    span:first-child{
    margin-left:.08rem;
    }
    span:nth-child(2){
      color:red
    }
  }
  .count{
    position: absolute;
    left: .85rem;
    bottom:.8rem;
    span{
      margin-left:.18rem;
      color: #fff;
    }
  }
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
