<template>
  <div class="home">
    <header class="header">
      <div>总收入：元</div>
      <div>共卖出：件商品</div>
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
        title: {
          text: 'ECharts 入门示例'
        },
        tooltip: {},
        xAxis: {
          data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
        },
        yAxis: {},
        series: [
          {
            name: '销量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
          }
        ]
      }
    }
  },
  created () {
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
