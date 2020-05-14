<template>
  <div id="class">
     <div class="create_header">
            <div class="back" @click="handleBack">
            <i class="iconfont icon-huitui" />
            <p class="header_info">返回</p>
            </div>
            <div class="header_title">收款单列表</div>
            <div style="padding-right:.08rem" @click="handleAddGoods">新建</div>
        </div>
    <div class="main">
      <div class="wrapper" ref="wrapper">
        
        <ul class="content"
        v-infinite-scroll="cateloadMore"
        infinite-scroll-disabled="loading"
        infinite-scroll-distance="10"
        infinite-scroll-immediate-check="false">
          <!-- 分类列表 -->
          <li v-for="(item,index) in categoryList" :key="item.category_id" @click="listClick(index,item)" :class="index===active?'active':''">{{item.category_name}}</li>
          <li style="fontSize:.14rem;color:#ccc;lineHeight:.4rem" @click="handleAddCategory">编辑标签<span style="fontSize:.2rem">+</span></li>
        </ul>
      </div>
      <div class="detailList_box">
        <mt-loadmore :bottom-method="loadMore" ref="loadmore" :auto-fill="false">
        <!-- 分类详情列表 -->
        <ul class="detailList"
        v-infinite-scroll="loadMore"
        infinite-scroll-disabled="loading"
        infinite-scroll-distance="10"
        infinite-scroll-immediate-check="false"
        >
          <li class="detail_title"><h4 style="fontSize:.14rem;color:#333">{{detailtext}}</h4></li>
          <!-- <li style="fontSize:.16rem;color:#ccc;lineHeight:.4rem;margin-bottom:0.1rem" @click="handleAddGoods">{{'添加'+ detailtext}}<span style="fontSize:.2rem">+</span></li> -->
          
          <li class="detail_item" v-for="(item,index) in detailList" :key="index" @click="handleDetail(item,'修改')">
        <mt-cell-swipe   
            :right='rightDelete(item,index)'
          >
				 <div slot="icon" class="item_wrap">
           <div class="item_image" >
              <img :src="item.image[0]" alt="">
           </div>
               <div class="item_info">
              <p>{{item.product_name}}</p>
              <p>{{item.price}}元</p>
            </div>
				 </div>
           
			</mt-cell-swipe>
     
           
            <!-- <div class="item_handle">
              <p @click="handleDetail(item,'修改')">编辑</p>
              <p @click="handlePhoto(item)">海报</p>
              <p @click="handleDel(index)">删除</p>
            </div> -->
          </li>
        </ul>
        <p slot="top" class="mint-loadmore-top"></p>
      </mt-loadmore>
      </div>
    </div>
    <!-- <div v-show="backTopShow" class="backtoTop" @click="backtoTop">回到顶部</div> -->
  </div>
</template>
<script>
import BScroll from 'better-scroll'
import { HomeData } from '@/api'
import { Indicator,MessageBox } from 'mint-ui'
import { getProductCategoryInfo,getProductList,delProductList } from '@/api'
  let a
export default {
  data () {
    return {
      currentId:1,
      categoryList: [],
      detailList: [],
      active: this.$store.state.active,
      page:1,
      limit:10,
      detailtext: '',
      backTopShow: true,
      loading: false
    }
  },
  methods: {
    listClick (index, item) { // 显示隐藏分类详情
    Indicator.open({
      text: '加载中...',
      spinnerType: 'fading-circle'
    });
      this.page=1
      if (this.active !== index) {
        if(document.documentElement.scrollTop){
          document.documentElement.scrollTop = 0
          }else{
            document.body.scrollTop=0
          }
        }
        this.$store.state.active=index
        this.currentId=item.category_id
        getProductList({page:this.page,limit:this.limit,category_id:item.category_id}).then(res=>{
        this.detailList=res.data.data
        Indicator.close()
        // JSON.parse(res.data.data[0].image)
        console.log(res.data.data)
    })
      this.active = index
      this.detailtext = item.category_name
    },

    rightDelete(item,index){
			return [{
					content: '删除',
					style: { background: 'red', color: '#fff','align-items':'center','display': 'flex'},
					handler: () => this.handleDel(item,index) 
      }]
      },
    handleDetail(item,val){
      this.$router.push({name:'createGoods',params:{item,val}})
    },
    handlePhoto(item){
      this.$router.push({name:'createqr',params:{
        item
      }})
    },
    handleAddCategory () {
      this.$router.push({
        name:'createCategory',
        })
    },
    handleAddGoods () {
      console.log('新增商品')
      this.$router.push({name:'createGoods',params:{
        list:this.categoryList,
        val:'新增'
      }})
    },
    handleDel(item,index){
      MessageBox.confirm('确定删除此模板?').then(action => {
      let datalist=[]
        datalist.push(item.product_id)
        delProductList(datalist).then(res=>{
          console.log(res)
          if(res.data.success===1){
            this.$toast('删除模板成功')
          }else{
            this.$toast('删除失败')
          }
        })
        this.detailList.splice(index,1)
    })
    },
    handleBack(){
    this.$store.state.showTab = true
    this.$router.push('/')
    },
    backtoTop () {
      if(document.documentElement.scrollTop){
        document.documentElement.scrollTop = 0
          }else{
            document.body.scrollTop=0
          }
      },
    loadMore () {
      getProductCategoryInfo().then(res=>{
      if(res.data.success===1){
        this.categoryList=res.data.data
        this.detailtext=res.data.data[this.$store.state.active].category_name
        getProductList({page:this.page,limit:this.limit,category_id:currentId}).then(res=>{
        this.detailList=res.data.data
        this.page++
      })
        }else{
          console.log('获取分类失败')
        }
      })
       
    },
    cateloadMore(){
      console.log('1111')
    }
  },
  beforeCreate(){
    HomeData().then(res=>{
      if(res.data.success===1){
        localStorage.setItem('merchantid',res.data.data.merchant_id)
      }else{
        this.$router.push('/register')
      }
    })
  },
   beforeMount () {
    this.$store.state.showTab = false
    },
  mounted () {
    Indicator.open({
      text: '加载中...',
      spinnerType: 'fading-circle'
    });
     getProductCategoryInfo().then(res=>{
        Indicator.close()
      if(res.data.success===1){
        this.categoryList=res.data.data
        this.detailtext=res.data.data[this.$store.state.active].category_name
        this.currentId=res.data.data[this.$store.state.active].category_id
        console.log(this.$store.state.active,this.active)
        getProductList({page:this.page,limit:this.limit,category_id:res.data.data[this.$store.state.active].category_id}).then(res=>{
        this.detailList=res.data.data
        this.page++
    })
      }else{
        this.$toast('获取标签失败')
      }
    }).catch(err=>{
        Indicator.close()
        this.$toast('无数据')
      
    })
    // this.$nextTick(() => {
    //   this.scroll = new BScroll(this.$refs.wrapper, { // better-scroll初始化
    //     scrollY, // 竖向滚动
    //     click: true // 滚动区域可触发点击事件
    //   })
    // })
  }
}
</script>
<style lang="scss" scoped>
#class {
  // height: 100%;
  text-align: center;
  font-family: '微软雅黑';
  .create_header{
            width:100%;
            height: .45rem;
            line-height: .45rem;
            background:#fff;
            color:black;
            position: fixed;
            top: 0;
            left: 0;
            z-index: 999;
            text-align: center;
            display:flex;
            .back{
                float: left;
                .icon-huitui{
                    float: left;
                    font-size: .16rem;
                }
            }
            .header_info{
                font-size: .14rem;
                padding-right: .1rem;
                padding-left: .2rem;
                text-align: left;
            }
            .header_title{
                flex: 1;
                // padding-right: .58rem;
            }
        }
  .main {
    display: flex;
    height: 100%;
    .wrapper {
      position: fixed;
      z-index: 100;
      top:.44rem;
      left: 0;
      overflow: auto;
      width: 0.8rem;
      height: 100%;
      background-color: #fff;
      .content {
        // padding-top: 0.4rem;
        padding-bottom: .8rem;
        li {
          height: .4rem;
          width:100%;
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
      margin-left: .82rem;
      background-color: #fff;
      // margin-bottom:.45rem;
      .detailList {
        display: flex;
        height: 100%;
        flex-direction: column;
        background: #f1f1f1;
        li {
          // float: left;
          background: #fff;
          flex: 1;
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
          margin-bottom: .1rem;
          .mint-cell{
            display: flex;
            width: 100%;
          }
          .item_wrap{
              display: flex;
          .item_image{
            flex: 2;
            width:.6rem;
            height: .8rem;
            display:flex;
            align-items: center;
            border-radius: 0.06rem;
            img{
              width: 100%;
              height: 90%;
            }
           }
           .item_info{
             display: flex;
             flex-direction: column;
             line-height: .4rem;
             flex: 5;
             p{
               flex: 1;
             }
            }
        }
          
          .item_handle{
            display:flex;
            flex-direction: column;
            flex:1.5;
            p{
              flex: 1;
              line-height: .266rem;
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
