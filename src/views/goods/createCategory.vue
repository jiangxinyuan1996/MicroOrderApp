<template>
     <div id="create">
        <div class="create_header">
            <div class="back" @click="handleBack">
            <i class="iconfont icon-huitui" />
            <p class="header_info">返回</p>
            </div>
            <div class="header_title">标签</div>
        </div>
        <div class="add">
             <div class="search">
                    <input type="text" placeholder="请输入标签" v-model.trim="addtext" @keypress.13="handleAdd" >
                    <div class="cancel" @click="handleAdd" style="fontSize:.3rem;fontWeight:300;color:rgb(238,120,0)">+</div>
            </div>
        </div>
        <div class="createFrom">
            <ul class="categoryList" v-if="categoryList.length">
                <li v-for="(item,index) in categoryList" :key="item.category_id" class="list_item" >
                    <span>{{item.category_name}}</span>
                    <div class="btnGroup">
                    <!-- <div class="edit">修改</div> -->
                    <div class="edit" @click="isshow(index,item)"><i class="iconfont icon-xiugai"/></div>
                    <div class="del" @click="handleDel(index,item)"><i class="iconfont icon-lajitong"/></div>
                    </div>
                </li>
            </ul>
        </div>
        <!-- <mt-button type="primary" @click="addCategory">保存</mt-button> -->
     </div>
</template>
<script>
import { getProductCategoryInfo,addCategoryList,delCategoryList,updateCategoryList} from '@/api'
import { MessageBox } from 'mint-ui'
export default {
    data(){
        return{  
        clicked:1,
        clickedTime:{
            timeA:'',
            timeB:''
        }, 
        show:true,
        addtext:'',
        categoryList:[]
        }
    },
    created () {
    this.$store.state.showTab = false
  },
  mounted(){
      console.log(this.$route.params)
      if(this.$route.params.categoryList){
          this.categoryList=this.$route.params.categoryList
      }else{
          this.getlist()
      }
  },
  beforeDestroy () {
    // this.$store.state.showTab = true
  },
  methods:{
      getlist(){
          getProductCategoryInfo().then(res=>{
              this.categoryList=res.data.data
          })
      },
    //   clicking () {
    //   if (this.clicked === 1) {
    //     this.clickedTime.timeA = new Date()
    //     this.clicked++
    //   } else if (this.clicked === 2) {
    //     this.clickedTime.timeB = new Date()
    //     if (Math.abs(this.clickedTime.timeA - this.clickedTime.timeB) < 300) {
    //       //  双击
    //       this.isshow()
    //       this.clicked = 1
    //     } else {
    //       this.clickedTime.timeA = new Date()
    //     }
    //   }
    // },
    isshow(index,item){
        // MessageBox.prompt({
        //     message:'请输入标签名'
        //     }).then(({ value, action }) => {
        //     console.log(value)
        // })
        MessageBox({
        title: '提示',
        message: '请输入标签名',
        showCancelButton: true,
        showInput:true,
        closeOnClickModal:false,
        inputValue:item.category_name
        }).then(res=>{
           let name=document.querySelectorAll('.mint-msgbox-input')[0].children[0].value.trim()
           if(name.length<=4){
               updateCategoryList({category_id:item.category_id,category_name:name}).then(res=>{
                if(res.data.success===1){
                    this.$toast('修改标签成功')
                    this.getlist()
                }
            }).catch(err=>{
                console.log(err)
            })
           }else{
               this.$toast('修改失败,标签名长度不可超过4个字')
           }    
        })
    },
      handleBack(){
          history.go(-1)
      },
      handleAdd(){
          if(this.addtext!=''){
            if(this.categoryList.length+1>5){
                this.$toast('您最多可以拥有五个标签')
                this.addtext=''
            }else{
            addCategoryList({category_name:this.addtext}).then(res=>{
              console.log(res)
              if(res.data.success===1){
                  this.$toast('新增标签成功,还可以添加'+(5-this.categoryList.length)+'个')
              }
            })
              this.categoryList.push({
                  category_name:this.addtext
          })
          this.addtext=''
            }
          }else{
              this.$toast('请输入标签名')
          }
      },
      handleDel(index,item){
          console.log(item)
           MessageBox.confirm('是否删除此标签与此标签下所有收款单').then(action => {
               delCategoryList([item.category_id]).then(res=>{
                   console.log(res)
                   if(res.data.success===1){
                       this.$toast('删除标签成功')
                   }
               })
               this.categoryList.splice(index,1)
           })
      }
  }
}
</script>
<style lang="scss" scoped>
#create{
height: 100%;
overflow: auto;
 .create_header{
            width:100%;
            height: .45rem;
            line-height: .45rem;
            background:#fff;
            color:black;
            position: fixed;
            top: 0;
            left: 0;
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
                padding-right: .58rem;
            }
        }
        .add{
            margin: .55rem .08rem .1rem;
            .cancel{
                width: .7rem;
                height:.3rem;
                text-align: center;
                line-height: .3rem;
            }
            .search{
                display: flex;
                flex:1;
                height: .28rem;
                border: none;
                background:#f8f8f8;
                border-radius: 5px;
                overflow: hidden;
                img{
                    margin: .09rem .09rem 0 .12rem;
                    width: .11rem;
                    height: .11rem;
                }
                input{
                    outline: none;
                    border: none;
                    padding:0 .1rem;
                    flex: 1;
                    background: #fff;
                }
        }
        }
        .createFrom{
            .categoryList{
                .list_item{
                margin:0 .3rem;
                // margin-right: .7rem;
                padding-left: .18rem;
                border-radius: 5px;
                    height: .4rem;
                    line-height: .4rem;
                    background: #fff;
                    // float: left;
                    // width:40%;
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: .05rem;
                    .btnGroup{
                        display: flex;
                        color: #fff;
                        .edit{
                           flex: 1;
                            border-radius: 5px;
                            // padding: 0 .05rem;
                            color: skyblue;
                            }
                        .del{
                            padding: 0 .05rem;
                            flex: 1;
                            background: #fff;
                            color: red;
                            border-radius: 5px;

                        }
                        }
                    }
                }
            }
        }
</style>