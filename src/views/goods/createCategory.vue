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
                    <input type="text" placeholder="请输入标签" v-model.trim="addtext" @keypress.13="handleAdd" autofocus="autofocus">
                    <div class="cancel" @click="handleAdd">添加</div>
            </div>
        </div>
        <div class="createFrom">
            <ul class="categoryList" v-if="categoryList.length">
                <li v-for="(item,index) in categoryList" :key="item.category_id" class="list_item">
                    <span>{{item.category_name}}</span>
                    <div class="btnGroup">
                    <!-- <div class="edit">修改</div> -->
                    <div class="del" @click="handleDel(index,item)">删除</div>
                    </div>
                </li>
            </ul>
        </div>
        <!-- <mt-button type="primary" @click="addCategory">保存</mt-button> -->
     </div>
</template>
<script>
import { addCategoryList,delCategoryList } from '@/api'
import { MessageBox } from 'mint-ui'
export default {
    data(){
        return{   
        addtext:'',
        categoryList:[]
        }
    },
    created () {
    this.$store.state.showTab = false
  },
  mounted(){
      if(this.$route.params.categoryList){
          this.categoryList=this.$route.params.categoryList
      }
  },
  beforeDestroy () {
    this.$store.state.showTab = true
  },
  methods:{
      handleBack(){
          history.go(-1)
      },
      handleAdd(){
          if(this.addtext!=''){
            addCategoryList({category_name:this.addtext}).then(res=>{
              console.log(res)
              if(res.data.success===1){
                  this.$toast('新增标签成功')
              }
            })
              this.categoryList.push({
                  category_name:this.addtext
          })
          this.addtext=''
          }
      },
      handleDel(index,item){
          console.log(item)
           MessageBox.confirm('删除标签此标签下模板会一并删除').then(action => {
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
                font-size: .16rem;
                width: .7rem;
                height:.3rem;
                text-align: center;
                line-height: .3rem;
                font-size: .14rem;
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
                margin:0 .08rem;
                padding-left: .08rem;
                border-radius: 5px;
                    height: .3rem;
                    line-height: .3rem;
                    background: #fff;
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: .05rem;
                    .btnGroup{
                        display: flex;
                        color: #fff;
                       .edit{
                           flex: 1;
                           margin-right: 0.05rem;
                            background: skyblue;
                            border-radius: 5px;
                            padding: 0 .05rem;
                            }
                        .del{
                            padding: 0 .05rem;
                            flex: 1;
                            background: red;
                            border-radius: 5px;

                        }
                        }
                    }
                }
            }
        }
</style>