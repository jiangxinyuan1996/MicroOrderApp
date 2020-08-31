<template>
  <div id="Home">
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
    <div class="background">
      <img class="image" src="images/background.png" alt style="width:100%;height:100%" />
    </div>
    <div class="header">
      <div class="header_left">
        <div class="title">
          <div class="title_info">
            <p>总收入</p>
            <p class="count">
              <span>￥</span>{{countData.amount}}
            </p>
          </div>
          <div class="title_info">
            <p>总成交</p>
            <p class="count count_right">
              {{countData.pay_count}}
              <span>笔</span>
            </p>
          </div>
        </div>
        <div id="echarts" ></div>
      </div>
      <div class="header_right">
        <ul class="date_list">
          <li :class="'date_item'+(activeIndex===index?' active':'')" v-for="(item,index) in date" :key="index" @click="change(item,index)">{{item}}</li>
        </ul>
      </div>
    </div>
    <div class="manage">
      <div class="container">
        <div class="manage_category" v-if="countData.category_count>0">
            <div class="left" @click="handleClick">
                <div class="left_item" style="background:url(images/u71.svg) no-repeat center right">
                    <p>{{countData.category_count}}</p>
                    <p class="item_bottom">货物标签</p>
                </div>
                <div class="left_item" >
                    <p>{{countData.product_count}}</p>
                    <p class="item_bottom">货物种类</p>
                </div>
                <!-- <div class="left_item">
                    <p>2类</p>
                    <p class="item_bottom">已售罄</p>
                </div> -->
            </div>
            <div class="right" @click="handleCreate">
                <div class="image">
                    <img src="images/plus(white).png" alt="" />
                </div>
                <div class="info">
                    <p>新建海报</p>
                </div>
            </div>
        </div>
        <div class="manage_create" v-else  @click="handleCreate"> 
            <div class="left" >
                <p class="left_top">您的货架还没有商品呢</p>
                <p class="left_bottom">快来尝试添加商品吧</p>
            </div>
            <div class="right">
                <div class="image">
                    <img src="images/plus(white).png" alt="" />
                </div>
                <div class="info">
                    <p>新建海报</p>
                </div>
            </div>
        </div>
      </div>
    </div>
    <div class="content" style="marginBottom:0" v-if="showUser">
      <h3 class="title">我的收款模板</h3>
      <div class="content_info">
        <ul class="list">
            <li class="list_item" v-for="item in userMould" :key="item.id" @click="handleShowUser(item)">
                <img :src="item.img" alt="" />
            </li>
        </ul>
      </div>
    </div>
     <div v-if="isShow" class="weui-gallery" style="display:block">
                    <span class="weui-gallery__img" :style="'background-image: url('+src+');'" @click="()=>{this.isShow=false}"></span>
                    <div class="weui-gallery__opr" @click="handleDel" v-if="status==='自定义'">
                        <a href="javascript:" class="weui-gallery__del">
                            <i class="weui-icon-delete weui-icon_gallery-delete"></i>
                        </a>
                    </div>
                </div>
    <div class="content">
      <h3 class="title">预设模板</h3>
      <div class="content_info">
        <ul class="list">
            <li class="list_item" v-for="item in mouldData" :key="item" @click="handleShow(item)">
                <img :src="item.example" alt="" />
            </li>
        </ul>
      </div>
    </div>
    </van-pull-refresh>
  </div>
</template>
<script>
import echarts from 'echarts'
import { reqData,chooseMould,reqAmount,HomeData,getUserMould,deleteUserMould } from '@/api'
import { Notify } from 'vant'
import { Indicator } from 'mint-ui'
import { PullRefresh } from 'vant';

export default {
    components:{
      PullRefresh
    },
    data(){
        return{
            userMould:[],
            src:'',
            id:'',
            showUser:true,
            isShow:false,
            isLoading:false,
            total:'0',
            count:'0',
            status:'预设',
            countData:{},
            showData:{},
            mouldData:[],
            date:['日','周','月'],
            activeIndex:0,
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
                        data: [],
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
                        name: '收入',
                        type: 'bar',
                        barWidth: '60%',
                        data: []
                    }
                ]
            }
        }
    },
     beforeCreate(){
    this.$store.state.showTab=true
     },
    mounted(){
        this.init()
        this.clear()
        // HomeData().then(res=>{
        // if(res.data.success===1){
        //   localStorage.setItem('merchantid',res.data.data.merchant_id)
        // }else{
        //   this.$router.push('/register')
        // }
    // })
    },
    methods:{
      clear(){
        setTimeout(()=>{
          Indicator.close()
          this.isLoading=false
        },1000*5)
      },
      onRefresh(){
        this.init()
        this.clear()
      },
      init(){
        Indicator.open({
            text: '加载中...',
            spinnerType: 'fading-circle'
        });
        getUserMould().then(res=>{
          if(res.data.data){
            if(res.data.success===1){
            this.userMould=res.data.data
            }else{
            this.showUser=false
            }
          }else{
            this.userMould=[]
          }
          if(this.userMould.length===0){
              this.showUser=false
            }
          
        })
        var myChart = echarts.init(document.getElementById('echarts'))
        reqData().then(res=>{
          this.showData=res.data.data
          this.echarts.xAxis[0].data=this.showData.day.map(item=>{
              return item.category_name
          })
          this.echarts.series[0].data=this.showData.day.map(item=>{
              return Number(item.amount)/100
          })
          myChart.setOption(this.echarts)
          this.isLoading=false
          Indicator.close()
        }).catch(err=>{
          Indicator.close()
        })
        reqAmount().then(res=>{
          this.countData=res.data.data
          this.isLoading=false
          Indicator.close()
        }).catch(err=>{
          Indicator.close()
        })
          chooseMould().then(res=>{
            if(res.data.success===1){
                this.mouldData=res.data.data
            }else{
              // Notify({type:'danger',message:res.data.message,duration:2000})
            }
          Indicator.close()
          this.isLoading=false
        }).catch(err=>{
          Indicator.close()
        })
      },
      change(item,index){
        this.activeIndex=index
        var myChart = echarts.init(document.getElementById('echarts'))
        switch(item){
          case '日':
            this.echarts.xAxis[0].data=this.showData.day.map(item=>{
              return item.category_name
          })
          this.echarts.series[0].data=this.showData.day.map(item=>{
              return Number(item.amount)/100
          })
            break
          case '周':
            this.echarts.xAxis[0].data=this.showData.week.map(item=>{
              return item.category_name
          })
          this.echarts.series[0].data=this.showData.week.map(item=>{
              return Number(item.amount)/100
          })
            break
          case '月':
            this.echarts.xAxis[0].data=this.showData.month.map(item=>{
              return item.category_name
          })
          this.echarts.series[0].data=this.showData.month.map(item=>{
              return Number(item.amount)/100
          })
            break
          default:
            break
        }
          myChart.setOption(this.echarts)
      },
      handleShow(item){
        this.status='预设'
        this.isShow=true
        this.src=item.example
      },
      handleShowUser(item){
        this.status='自定义'
        this.isShow=true
        this.src=item.img
        this.id=item.id
      },
      handleDel(){
        deleteUserMould({id:this.id}).then(res=>{
          console.log(res)
          if(res.data.success===1){
            this.isShow=false
            this.init()
          }else{
            
          }
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
    }
}
</script>
<style lang="scss" scoped>
#Home{
  height: 100%;
  box-sizing: border-box;
  overflow: auto;
  padding-bottom:.46rem;
}
#echarts{
    width: 100%;
    height: 3rem;
    margin-top:-.4rem;
}
.van-pull-refresh{
  height: 100%;
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
          color: #3477bc;
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
    width: 0.27rem;
    height: 100%;
    position: absolute;
    top: 0;
    right: 0.1rem;
    .date_list {
      width: .24rem;
      text-align: center;
      border: 1px solid rgba(123, 172, 220, 1);
      overflow: hidden;
      height: 60%;
      margin-top: 0.1rem;
      display: flex;
      border-radius: .1rem;
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
                background:#3477bc;
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
                    font-size: .16rem;
                    .item_bottom{
                        margin-top:.1rem;
                        font-size: .14rem;
                    }
                }
            }
            .right{
                width:.95rem;
                height: 100%;
                background:#3477bc;
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
                img{
                    width:100%;
                    height: 100%;
                }
            }
        }
    }
}
</style>