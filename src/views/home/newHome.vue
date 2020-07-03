<template>
  <div id="Home">
    <div class="background">
      <img class="image" src="images/background.png" alt style="width:100%;height:100%" />
    </div>
    <div class="header">
      <div class="header_left">
        <div class="title">
          <div class="title_info">
            <p>总收入</p>
            <p class="count">
              <span>￥</span>4399.26
            </p>
          </div>
          <div class="title_info">
            <p>总成交</p>
            <p class="count count_right">
              39
              <span>笔</span>
            </p>
          </div>
        </div>
        <div id="echarts"></div>
      </div>
      <div class="header_right">
        <ul class="date_list">
          <li class="date_item">日</li>
          <li class="date_item active">周</li>
          <li class="date_item" style="border:none">月</li>
        </ul>
      </div>
    </div>
    <div class="manage">
      <div class="container">
        <div class="manage_create" v-if="true"> 
            <div class="left">
                <p class="left_top">您的货架还没有商品呢</p>
                <p class="left_bottom">快来尝试添加商品吧</p>
            </div>
            <div class="right" @click="handleCreate">
                <div class="image">
                    <img src="images/plus(white).png" alt="" />
                </div>
                <div class="info">
                    <p>添加商品</p>
                </div>
            </div>
        </div>
        <div class="manage_category" v-else>
            <div class="left">
                <div class="left_item" style="background:url(images/u71.svg) no-repeat center right">
                    <p>3种</p>
                    <p class="item_bottom">货物标签</p>
                </div>
                <div class="left_item" style="background:url(images/u71.svg) no-repeat center right">
                    <p>7类</p>
                    <p class="item_bottom">货物种类</p>
                </div>
                <div class="left_item">
                    <p>2类</p>
                    <p class="item_bottom">已售罄</p>
                </div>
            </div>
            <div class="right" @click="handleClick">
                <div class="image">
                    <img src="images/category(opacity).png" alt="" />
                </div>
                <div class="info">
                    <p>管理货架</p>
                </div>
            </div>
        </div>
      </div>
    </div>
    <div class="content" style="marginBottom:0">
      <h3 class="title">我的收款模板</h3>
      <div class="content_info">
        <ul class="list">
            <li class="list_item" v-for="item in 2" :key="item">
                <img src="images/category(opacity).png" alt="" />
            </li>
        </ul>
      </div>
    </div>
    <div class="content">
      <h3 class="title">预设模板</h3>
      <div class="content_info">
        <ul class="list">
            <li class="list_item" v-for="item in 5" :key="item">
                <img src="images/category(opacity).png" alt="" />
            </li>
        </ul>
      </div>
    </div>

  </div>
</template>
<script>
import echarts from 'echarts'
export default {
    data(){
        return{
            echarts:{
                color: ['#7BACDC'],
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                        type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: [
                    {
                        type: 'category',
                        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                        axisTick: {
                            alignWithLabel: true
                        }
                    }
                ],
                yAxis: [
                    {
                        type: 'value'
                    }
                ],
                series: [
                    {
                        name: '直接访问',
                        type: 'bar',
                        barWidth: '60%',
                        data: [10, 52, 200, 334, 390, 330, 220]
                    }
                ]
            }
        }
    },
    mounted(){
        var myChart = echarts.init(document.getElementById('echarts'))
        myChart.setOption(this.echarts)
    },
    methods:{
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
    }
}
</script>
<style lang="scss" scoped>
#echarts{
    width: 100%;
    height: 3rem;
    margin-top:-.4rem;
}
// rgba(123, 172, 220, 1)
.background {
  width: 100%;
  height: 2rem;
}
.header {
  width: 3.4rem;
  height: 2rem;
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  margin: 0.2rem auto;
  background: #fff;
  border-radius: 10px;
  box-shadow:0px 2px 4px rgba(106, 110, 144, 0.63921568627451);
  overflow: hidden;
  .header_left {
    width: 3rem;
    height: 100%;
    margin-right: 0.4rem;
    display: flex;
    flex-direction: column;
    .title {
      height: 0.5rem;
      display: flex;
      .title_info {
        flex: 1;
        padding: 0.1rem 0 0 0.1rem;
        font-size: 0.12rem;
        color: black;
        font-weight: 600;
        .count {
          padding: 0;
          margin-left: -0.03rem;
          font-size: 0.21rem;
          font-weight: 700;
          text-align: left;
          color: rgba(123, 172, 220, 1);
          span {
            font-weight: 600;
            font-size: 0.18rem;
          }
        }
        .count_right {
          margin-left: -0.01rem;
          span {
            font-size: 0.18rem;
          }
        }
      }
    }
  }
  .header_right {
    width: 0.3rem;
    height: 100%;
    position: absolute;
    top: 0;
    right: 0.1rem;
    .date_list {
      width: 80%;
      text-align: center;
      border: 1.5px solid rgba(123, 172, 220, 1);
      overflow: hidden;
      height: 60%;
      margin-top: 0.1rem;
      display: flex;
      border-radius: 10px;
      flex-direction: column;
      .date_item {
        display: flex;
        flex-direction: column;
        justify-content: center;
        flex: 1;
        font-weight: 600;
        border-bottom: 1px solid rgba(123, 172, 220, 1);
      }
      .active {
        color: #fff;
        background: rgba(123, 172, 220, 1);
      }
    }
  }
}
.manage{
    width: 100%;
    height: 1.4rem;
    box-sizing: border-box;
    padding: .2rem;
    .container{
        width:100%;
        height: .8rem;
        margin-top: .2rem;
        background: #fff;
        border-radius: 8px;
        box-shadow:0px 2px 4px rgba(106, 110, 144, 0.63921568627451);
        overflow: hidden;
        .manage_create{
            width:100%;
            height: 100%;
            display: flex;
            .left{
                flex:1;

                .left_top{
                    font-size: .16rem;
                    margin:.2rem 0 .05rem .2rem;
                    color:rgba(51, 51, 51, 0.454901960784314);
                }
                .left_bottom{
                    font-size: .12rem;
                    margin-left: .2rem;
                }
            }
            .right{
                width:1rem;
                height: 100%;
                background:rgba(123, 172, 220, 1);
                color: white;
                display: flex;
                flex-direction: column;
                .image{
                    width:100%;
                    height: 60%;
                    display: flex;
                    justify-content: center;
                    align-items: flex-end;
                    img{
                        height: .4rem;
                        width:.4rem;
                    }
                }
                .info{
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                }
            }
        }
        .manage_category{
            width:100%;
            height: 100%;
            display: flex;
            .left{
                flex:1;
                display: flex;
                .left_item{
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    text-align: center;
                    .item_bottom{
                        margin-top:.1rem;
                        font-size: .14rem;
                    }
                }
            }
            .right{
                width:.95rem;
                height: 100%;
                background:rgba(123, 172, 220, 1);
                color: white;
                display: flex;
                flex-direction: column;
                .image{
                    width:100%;
                    height: 60%;
                    display: flex;
                    justify-content: center;
                    align-items: flex-end;
                    img{
                        height: .35rem;
                        width:.35rem;
                    }
                }
                .info{
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                }
            }
        }
    };
}
.content{
    margin:0 .2rem .48rem;
    .title{
        color: #6B6B6B;
        font-size: .16rem;
        font-weight: 600;
    }
    .content_info{
        margin-top: .1rem;
        .list{
            overflow: hidden;
            .list_item{
                width:1rem;
                height: 1rem;
                float: left;
                margin-right: .1rem;
                margin-bottom:.1rem;
                background: #7BACDC;
                img{
                    width:100%;
                    height: 100%;
                }
            }
        }
    }
}
</style>