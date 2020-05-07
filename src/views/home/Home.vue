<template>
  <div id="home">
    <header class="header">
      <div>总收入: 10500 元</div>
      <div>共卖出: 150 件商品</div>
      <div id="line_echarts"></div>
    </header>
  </div>
</template>
<script>
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
  mounted () {
    var myChart = echarts.init(document.getElementById('line_echarts'))
    myChart.setOption(this.lineChartsData)
  }
}
</script>
<style lang="scss" scoped>
#line_echarts {
  height: 300px;
}
</style>
