<template>
  <div id="class">
    <div class="head">
      <!-- <i class="iconfont"></i> -->
      <span>分类</span>
    </div>
    <div class="main">
      <div class="wrapper" ref="wrapper">
        <ul class="content">
          <!-- 分类列表 -->
          <li v-for="(item,index) in categoryList" :key="item.id" @click="listClick(index,item.list)" :class="index===active?'active':''">{{item.list}}</li>
          <!-- <li style="fontSize:.4rem;color:#ccc;lineHeight" @click="handleAddCategory">+分类</li> -->
          <li style="fontSize:.14rem;color:#ccc;lineHeight:.4rem" @click="handleAddCategory">新增分类<span style="fontSize:.2rem">+</span></li>

        </ul>
      </div>
      <div class="detailList_box">
        <mt-loadmore :bottom-method="loadBottom" ref="loadmore" :auto-fill="false">
        <!-- 分类详情列表 -->
        <ul class="detailList clearfix"
        v-infinite-scroll="loadBottom"
        infinite-scroll-disabled="loading"
        infinite-scroll-distance="10"
        >
          <li class="detail_title"><h4 style="fontSize:.14rem;color:#333">{{detailtext}}</h4></li>
          <li style="fontSize:.16rem;color:#ccc;lineHeight:.4rem" @click="handleAddCategory">{{'添加'+ detailtext}}<span style="fontSize:.2rem">+</span></li>

          <li class="detail_item" v-for="(item,index) in detailList" :key="index">
            <div class="item_image">
              <img :src="item.src" alt="">
            </div>
            <div class="item_info">
              <p>{{item.text}}</p>
            </div>
            <div class="item_handle">
              <p>编辑</p>
              <p>海报</p>
            </div>
          </li>
        </ul>
        <p slot="top" class="mint-loadmore-top"></p>
      </mt-loadmore>
      </div>
    </div>
    <div v-show="backTopShow" class="backtoTop" @click="backtoTop">回到顶部</div>
  </div>
</template>
<script>
import BScroll from 'better-scroll'
export default {

  data () {
    return {
      categoryList: [{
        id: 1,
        list: '食品'
      },
      {
        id: 2,
        list: '化妆品'
      },
      {
        id: 3,
        list: '母婴'
      },
      {
        id: 4,
        list: '农产品'
      }
      ],
      detailList: [ // 分类数据
        { src: require('@/assets/images/logo.png'), text: '薯片' },
        { src: require('@/assets/images/logo.png'), text: '奶糖' },
        { src: require('@/assets/images/logo.png'), text: '旺旺仙贝' },
        { src: require('@/assets/images/logo.png'), text: '面包' },
        { src: require('@/assets/images/logo.png'), text: '巧克力' },
        { src: require('@/assets/images/logo.png'), text: '益达' }
      ],
      active: 0,
      detailtext: '食品',
      backTopShow: false,
      loading: false
    }
  },
  methods: {
    listClick (index, val) { // 显示隐藏分类详情
      if (this.active !== index) {
        document.documentElement.scrollTop = 0
      }
      this.active = index
      this.detailtext = val
    },
    handleAddCategory () {
      console.log('新增分类')
    },
    backtoTop () {
      document.documentElement.scrollTop = 0
    },
    loadBottom () {
      console.log('到底了')
      setTimeout(() => {
        this.detailList = [...this.detailList, ...[{ src: require('@/assets/images/logo.png'), text: '薯片' },
          { src: require('@/assets/images/logo.png'), text: '奶糖' },
          { src: require('@/assets/images/logo.png'), text: '旺旺仙贝' },
          { src: require('@/assets/images/logo.png'), text: '面包' },
          { src: require('@/assets/images/logo.png'), text: '巧克力' },
          { src: require('@/assets/images/logo.png'), text: '益达' }]]
        this.$refs.loadmore.onBottomLoaded()
      }, 2000)
    }
  },
  created () {
    // mockjs模拟数据
    // this.$http.get("/detail").then(res => {
    //   this.detailList=res.data.details
    // });
  },
  mounted () {
    this.$nextTick(() => {
      this.scroll = new BScroll(this.$refs.wrapper, { // better-scroll初始化
        scrollY, // 竖向滚动
        click: true // 滚动区域可触发点击事件
      })
    })
  }
}
</script>
<style lang="scss" scoped>
#class {
  // height: 100%;
  font-family: '微软雅黑';
  .head {
    position: fixed;
    z-index: 999;
    top: 0;
    left: 0;
    height: .44rem;
    width: 100%;
    line-height: .44rem;
    text-align: center;
    color: #fff;
    background-color: #ff8c3c;
    i {
      position: absolute;
      left: .1rem;
    }
  }
  .main {
    display: flex;
    // height: 100%;
    .wrapper {
      position: fixed;
      z-index: 100;
      top:.44rem;
      left: 0;
      overflow: hidden;
      width: 0.8rem;
      height: 100%;
      background-color: #fff;
      .content {
        // padding-top: 0.4rem;
        padding-bottom: .8rem;
        li {
          height: .4rem;
          width: .8rem;
          line-height: .4rem;
          padding-left: .1rem;
          text-align: left;
          background-color: #fff;
          border: 1px solid #efeff4;
        }
        .active {
          color:#e93b3d;
          background-color: #efeff4;
          border-left: 2px solid #ff0000;
        }
      }
    }
    .detailList_box {
      flex: 1;
      overflow: auto;
      // margin: 0 0.08rem;
      margin-left: .88rem;
      background-color: #fff;
      margin-bottom:.45rem;
      .detailList {
        display: flex;
        flex-direction: column;
        background: #f1f1f1;
        li {
          // float: left;
          background: #fff;
          flex: 1;
          width: 100%;
          img {
            width: 100%;
          }
        }
        .detail_title{
        height: .4rem;
        width: 100%;
        line-height: .4rem;
        margin-top: .4rem;
        background-color: #fff;
        }
        .detail_item{
          display: flex;
          flex: 1;
          margin-bottom: .1rem;
          .item_image{
            flex: 2;
            width:.6rem;
            height: .8rem;
            border:1px solid red;
            border-radius: 0.06rem;
            img{
              width: 100%;
              height: 100%;
            }
          }
          .item_info{
            flex: 5;
          }
          .item_handle{
            display:flex;
            flex-direction: column;
            flex:1.5;
            p{
              flex: 1;
              line-height: .4rem;
            }
          }
        }
      }
      .padding_color {
        background-color: #fff;
        height: 100%;
      }
    }
  }
  .backtoTop{
    position: fixed;
    right:.3rem;
    bottom:.8rem;
    z-index:200;
    font-size: .14rem;
  }
}
</style>
