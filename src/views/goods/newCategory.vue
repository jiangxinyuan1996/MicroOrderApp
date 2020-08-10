<template>
    <div id="category">
        <div class="create_header">
            <div class="back" @click="handleBack">
            <i class="iconfont icon-huitui" />
            </div>
            <div class="header_title">货架</div>
            <div class="header_image" style="padding-right:.08rem;font-size:.3rem;color:rgb(238,120,0);font-weight:300" @click="handleAddGoods" ><img src="images/u60.png" alt=""/></div>
        </div>
        <div class="main" >
            <div class="main_left">
                <ul class="cate_list"
                >
                    <li v-for="(item,index) in categoryList" :key="item.category_id" :class="'list_item '+(index===activeIndex?'active':'')" @click="listClick(index,item)"><span class="item_info">{{item.category_name}}</span></li>
                    <li class="list_item" style="border:none" @click="handleAddCategory"><img src="images/u60.png" alt=""/></li>
                </ul>
            </div>
            <div class="main_right">
        <!-- <mt-loadmore :bottom-method="loadMore" ref="loadmore" :auto-fill="false"> -->
        <!-- 分类详情列表 -->
        <ul class="detailList"
       
        >
          <!-- <li class="detail_title"><h4 style="fontSize:.14rem;color:#333">{{detailtext}}</h4></li> -->
          <!-- <li style="fontSize:.16rem;color:#ccc;lineHeight:.4rem;margin-bottom:0.1rem" @click="handleAddGoods">{{'添加'+ detailtext}}<span style="fontSize:.2rem">+</span></li> -->
          
          <li class="detail_item" v-for="(item,index) in detailList" :key="index" @click="handleDetail(item,'修改')">
        <mt-cell-swipe   
            :right='rightDelete(item,index)'
          >
				 <div slot="icon" class="item_wrap">
           <div class="item_image" >
              <img :src="item.image[0]" alt="">
           </div>
               <div class="item_info" style="fontSize:.14rem">
              <p  class="info_title">{{item.product_name}}</p>
              <p class="info_bottom">库存剩余: 12件</p>
              <p class="info_bottom">商品单价:<span style="fontSize:.06rem;marginLeft:.05rem"> ￥</span><span>{{item.price}}</span></p>
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
        <!-- <p slot="top" class="mint-loadmore-top"></p>
      </mt-loadmore> -->
      </div>
            </div>
        </div>
</template>
<script>
import { Notify } from 'vant';
import BScroll from 'better-scroll'
import { HomeData } from '@/api'
import { Indicator,MessageBox } from 'mint-ui'
import { getProductCategoryInfo,getProductList,delProductList,startSale,stopSale } from '@/api'
export default {
    data(){
        return{
            activeIndex:0,
            title:'下架',
            currentId:1,
            currentItem:{},
            status:{
              '1':'下架',
              '-1':'上架'
            },
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
    beforeMount(){
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
  },
  destroyed(){
    Indicator.close()
  },
    methods: {
    listClick (index, item) { // 显示隐藏分类详情
    Indicator.open({
      text: '加载中...',
      spinnerType: 'fading-circle'
    });
    this.activeIndex=index
    this.currentItem=item
    this.page=1
      if (this.active !== index) {
        if(document.documentElement.scrollTop){
          document.documentElement.scrollTop = 0
          }else{
            document.body.scrollTop=0
          }
        }
        this.currentId=item.category_id
        getProductList({page:this.page,limit:this.limit,category_id:item.category_id}).then(res=>{
        this.detailList=res.data.data
        Indicator.close()
    })
      this.active = index
      this.detailtext = item.category_name
    },

    rightDelete(item,index){
			return [
        {
            content: this.status[item.sale_state],
            style: { background: '#6fba2c', color: '#fff',lineHeight:'.99rem'},
            handler: () => this.pullAndUp(item,index)
        },
      {
					content: '删除',
					style: { background: 'red', color: '#fff',lineHeight:'.99rem'},
					handler: () => this.handleDel(item,index) 
      }
      ]},
    pullAndUp(item,index){
      if(this.status[item.sale_state]==='下架'){
        stopSale({product_id:item.product_id}).then(res=>{
          console.log('下架',res.data)
          if(res.data.success===1){
            Notify({ type: 'success', message: '商品已下架',duration:2000 });
          }else{
            Notify({ type: 'danger', message: '商品下架失败',duration:2000 });
          }
          this.listClick(this.activeIndex,this.currentItem)
        })
      }else{
        startSale({product_id:item.product_id}).then(res=>{
          console.log('上架',res.data)
          if(res.data.success===1){
            Notify({ type: 'success', message: '商品已上架',duration:2000 });
          }else{
            Notify({ type: 'danger', message: '商品上架失败',duration:2000 });
          }
          this.listClick(this.activeIndex,this.currentItem)

        })
      }
    },
    handleDetail(item,val){
      this.$router.push({name:'createGoods',params:{item,val,image:item.image}})
    },
    handlePhoto(item){
      this.$router.push({name:'createqr',params:{
        item
      }})
    },
    handleAddCategory () {
      this.$router.push({
        name:'createCategory',
        params:{
          categoryList:this.categoryList
        }
        })
    },
    handleAddGoods () {
      this.$router.push({name:'createGoods',params:{
        list:this.categoryList,
        val:'新增'
      }})
    },
    handleDel(item,index){
      MessageBox.confirm('确定删除此收款单?').then(action => {
      let datalist=[]
        datalist.push(item.product_id)
        delProductList(datalist).then(res=>{
          console.log(res)
          if(res.data.success===1){
            this.$toast('删除收款单成功')
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
        getProductList({page:this.page,limit:this.limit,category_id:this.currentId}).then(res=>{
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
  }
}
</script>
<style lang="scss" scoped>
#category{
    height: 99%;
    overflow: hidden;
    .create_header{
            width:100%;
            height: .45rem;
            line-height: .45rem;
            color:black;
            position: fixed;
            top: 0;
            left: 0;
            z-index: 999;
            text-align: center;
            display:flex;
            background: #fff;
            box-shadow: 0px 0px 2px rgba(106, 110, 144, 0.63921568627451);
            .back{
                float: left;
                .icon-huitui{
                    margin-left: .1rem;
                    float: left;
                    font-size: .22rem;
                    font-weight: 700;
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
                font-weight: 600;
                color: #333;
            }
            .header_image{
                display: flex;
                align-items: center;
                img{
                    width:.2rem;
                    height: .2rem;
                    margin-right: .15rem;
                }
            }
        }
        .main{
            width: 100%;
            height: 100%;
            margin-top:.45rem;
            overflow: auto;
            .main_left{
                float: left;
                width:.61rem;
                height: 100%;
                box-shadow:1px 0px 1px rgba(106, 110, 144, 0.63921568627451);
                .cate_list{
                    width:100%;
                    .list_item{
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        height: .5rem;
                        font-size: .13rem;
                        color: #333;
                        opacity: .7;
                        border-bottom: 1px solid #ccc;
                        img{
                            width:.2rem;
                            height: .2rem;
                            margin-bottom:.1rem;
                            opacity: .7;
                        }
                        .item_info{
                            float: left;
                            width:.26rem;
                        }
                    }
                     .active{
                        background: #3394CE;
                        color: #fff;
                        font-weight: 700;
                        opacity: 1;
                    }
                }
            }
            .main_right{
                margin-left: .63rem;
                height: 100%;
                background-color: rgba(239, 241, 243, 1);
                box-sizing: border-box;
                padding-bottom:.4rem;
                .detailList {
                    display: flex;
                    height: 100%;
                    flex-direction: column;
                    overflow: auto;
                    li {
                    // float: left;
                    background: #fff;
                    // flex: 1;
                    height: .99rem;
                    margin-top:.05rem;
                    width: 100%;
                    }  
                    }
                    .detail_title{
                    height: .46rem;
                    width: 100%;
                    line-height: .46rem;
                    margin-top: .4rem;
                    background-color: #fff;
                    }
                    .detail_item{
                    display: flex;
                    margin-bottom: .1rem;
                    .mint-cell{
                        height: .99rem;
                        display: flex;
                        width: 100%;
                    }
                    .item_wrap{
                        display: flex;
                    .item_image{
                        // flex: 2;
                        width:.89rem;
                        height: .89rem;
                        line-height: .89rem;
                        display:flex;
                        align-items: center;
                        img{
                        border-radius: 5px;
                        width: 100%;
                        height: 100%;
                        }
                    }
                    .item_info{
                        margin-left:.1rem;
                        display: flex;
                        flex-direction: column;
                        flex: 5;
                        p{
                        flex: 2;
                        }
                        .info_title{
                        display: flex;
                        margin-top:.1rem;
                        font-size: .16rem;
                        color: #040404;
                        width: 1.95rem;
                        flex:3;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        }
                        .info_bottom{
                            display: flex;
                            align-items: center;
                            color:#333;
                            opacity: .7;
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
}
</style>