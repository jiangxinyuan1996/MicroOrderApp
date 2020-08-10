<template>
    <div id="logistics">
       <div class="create_header">
            <div class="back" @click="handleSave">
            <i class="iconfont icon-huitui" />
            <p class="header_info">返回</p>
            </div>
            <div class="header_title">物流信息配置</div>
            <div class="header_image" style="padding-right:.08rem;font-size:.3rem;color:rgb(238,120,0);font-weight:300" @click="handleAdd" ><img src="images/u60.png" alt=""/></div>
    </div>
       <div class="article" style="margin-top:.45rem;height:100%">
           <div class="article_header">
                <van-dropdown-menu>
                    <!-- <van-dropdown-item v-model="value1" :options="option1" /> -->
                    <van-dropdown-item :title="value2" ref="item">
                        <van-cell v-for="item in option2" :key="item.type_id" :title="item.name" @click="handleClick(item)">
                       <!-- <van-button plain hairline icon="cross" size="mini" type="danger" @click="handleDelCa(index)"/> -->
                        </van-cell>
                        <!-- <van-field
                            v-model="addCategoryName"
                            center
                            clearable
                            placeholder="请输入品类名"
                            >
                            <template #button>
                                <van-button size="small" type="primary" @click="addName">添加</van-button>
                            </template>
                        </van-field> -->
                    </van-dropdown-item>
                </van-dropdown-menu>
           </div>
           <div class="wrap" v-if="id!==0">
            <div class="detail_content">
                <div class="title">
                    <div class="left_container">
                        <div class="left_box"></div>
                        <span class="left_category">运费明细</span>
                    </div>
                </div>
                <div class="info">
                    <div class="info_item" v-for="item in formData" :key="item.id">
                        <div class="category">{{item.province}}</div>
                        <div class="price">{{item.price}}元/kg</div>
                        <div class="operation">
                        <span style="color:blue;margin-right:.08rem" @click="handleUpdate(item)"><i class="iconfont icon-xiugai" /></span>
                        <span style="color:red" @click="handleDel(item)"><i class="iconfont icon-lajitong" /></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-else style="width:100%;textAlign:center;color:#ccc;margin:1.5rem 0 0 0">请选择品类标签</div>
       <el-dialog
            title="提示"
            :visible.sync="dialogVisible"
            width="80%"
            :close-on-click-modal="false"
            :before-close="handleClose">
            <el-form :model="ruleForm" ref="ruleForm" label-width=".5rem" class="demo-ruleForm">
            <el-form-item label="地区" prop="province"
            :rules="[
                { required: true, message: '地区不能为空'}
                ]"
            >
                <el-select v-model="ruleForm.province" placeholder="请选择活动区域">
                <el-option  v-for="item in area" :key="item.code" :label="item.name" :value="item.name"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item
                label="价格"
                prop="price"
                :rules="[
                { required: true, message: '价格不能为空'},
                ]"
            >
                <el-input type="age" v-model="ruleForm.price" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
            </el-form-item>
            </el-form>
            <!-- <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span> -->
            </el-dialog>
       </div>
            <!-- <van-button type="primary" block style="position:fixed;bottom:0;left:0" @click="handleSave">返回并保存</van-button> -->
    </div>
</template>
<script>
import { MessageBox,Toast } from 'mint-ui';
import { getPackageTypeList,getPackageList,addPackage,updatePackage,delPackage } from  '@/api/index'
import adcode from '@/constant/adcode'
export default {
    data(){
        return {
            status:'新增',
            isdel:true,
            value:'',
            value1: 0,
            value2: '请选择品类标签',
            dialogVisible:false,
            addCategoryName:'',
            id:0,
            id1:0,
            area:['辽宁','吉林','黑龙江','北京','天津','四川','内蒙'],
            ruleForm:{
                    province:'',
                    price:''
                },
            option1: [
                { text: '品类', value: 0 },
          
            ],
            option2: [],
            formData:[]
        }
    },
    beforeMount(){
        this.$store.state.showTab=false
    },
    mounted(){
        this.area=adcode
        this.option2=this.$route.params.options
        getPackageTypeList().then(res=>{
           this.option2=res.data.data
        })

    },
    methods:{
        queryTableData(){
            getPackageList({type_id:this.id}).then(res=>{
                    console.log('获取运费地区价格',res)
                    this.formData=res.data.data
            })
        },
        addName(){
            if(this.addCategoryName!==''){
                this.option2.push({
                    text:this.addCategoryName,
                    value:this.addCategoryName
                })
                this.addCategoryName=''
            }
        },
        handleAdd(){
            this.status="新增"
            if(this.id===0){
                Toast({
                    message: '请选择品类标签',
                });
                }else{
                    this.dialogVisible=true
                }
        },
         submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
              console.log(this.ruleForm)
              if(this.status=='新增'){
                addPackage({type_id:this.id,...this.ruleForm}).then(res=>{
                      if(res.data.success===1){
                        Toast({
                            message:res.data.message
                        })
                    }else{
                        Toast({
                          message:res.data.message
                        })
                    }
                          this.queryTableData()
                })
              }else{
                 updatePackage({type_id:this.id,id:this.id1,...this.ruleForm}).then(res=>{
                      console.log('更新',res)
                      if(res.data.success===1){
                          Toast({
                            message:res.data.message
                            })
                      }else{
                          Toast({
                            message:res.data.message
                            })
                      }
                          this.queryTableData()
                  })
              }
            this.ruleForm={
                province:'',
                price:''
            }
            console.log(this.formData)
            this.dialogVisible=false
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
        // handleDelCa(index){
        //     this.option2.splice(index,1)
        //     if(this.option2.length!=0){
        //         this.value2=this.option2[0].text
        //     }else{
        //         this.value2='筛选'
        //     }
        // },
        handleClose(){
            this.dialogVisible=false
        },
        handleClick(item){
                this.value2=item.name
                console.log('id----->',item.type_id)
                this.id=item.type_id
                this.$refs.item.toggle();
                this.queryTableData()
        },
        handleUpdate(item){
            this.status="更新"
            this.dialogVisible=true
                  this.ruleForm.price=item.price
                  this.ruleForm.province=item.province
                  this.id1=item.id
                  
        },
        handleDel(item){
            console.log(item)
            MessageBox.confirm('确定删除此地区配置?').then(action => {
                delPackage([item.id]).then(res=>{
                    Toast({
                        message: res.data.message,
                    });
                    this.queryTableData()
                })
            });
        },
        handleSave(){
            if(this.$route.params.item){
                // Toast({
                //     message: '保存成功',
                // });
                this.$router.push({
                    name:'createGoods',
                    params:{
                        image:this.$route.params.image,
                        val:this.$route.params.val,
                        item:this.$route.params.item,
                        options:this.option2,
                        checked1:this.$route.params.checked1
                    }
                    })
            }else{
                // Toast({
                //     message: '保存成功',
                // });
                history.go(-1)
            }
        }
    }  
}
</script>
<style lang="scss" scoped>
#logistics{
    height: 100%;
    background:rgba(239, 241, 243, 1);
    overflow: hidden;
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
            z-index:200;
            box-shadow: 0px 1px 2px rgba(106, 110, 144, 0.63921568627451);
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
        .article_header{
            width:3.51rem;
            height:.47rem;
            border-radius: .06rem;
            overflow: hidden;
            position: absolute;
            left:0;
            top:0;
            bottom:0;
            right:0;
            margin:0 auto;
            margin-top:.41rem;
            box-shadow: 0px 1px 2px rgba(106, 110, 144, 0.63921568627451);
        }
        .wrap{
    margin:1rem .1rem;
.detail_content{
    background: #fff;
    width: 3.51rem;
    border-radius: 6px;
    overflow: hidden;
    box-shadow: 0px 1px 2px rgba(106, 110, 144, 0.63921568627451);
    .title{
        display:flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        height: .28rem;
        line-height: .28rem;
        font-size: .14rem;
        border-bottom: 1px solid rgba(106, 110, 144, 0.3);
        .left_container{
          display:flex;
          align-items: center;
          .left_box{
            width:.03rem;
            height: .15rem;
            background: rgba(0, 121, 194, 1);
          }
          .left_category{
            float: left;
            margin-left: .1rem;
            font-weight: 600;
            color: #333;
            font-size: .16rem;
          }
        }
      }
      .info{
          display: flex;
          width: 100%;
          flex-direction: column;
          box-sizing: border-box;
          .info_item{
            //   flex:1;
              display: flex;
              height: .35rem;
              padding-left:.2rem;
              box-sizing: border-box;
              font-size: .15rem;
              border-bottom: 1px solid #ccc;
            //   justify-content: space-between;
              align-items: center;
              color: #000;
              .category{
                  width:1.5rem;
              }
              .price{
                  color:#333;
                  font-size: .14rem;
                  opacity: .7;
                  width:1rem;
              }
              .operation{
                  i{
                font-size: .2rem;
                  }
              }
          }
      }
      .bottom{
          width:100%;
          height: 1.2rem;;
          display: flex;
          padding:.13rem;
          padding-right:.05rem;
          box-sizing: border-box;
          .image{
              width:.92rem;
              height: .92rem;
              margin-right:.1rem;
              img{
                  width:100%;
                  height:100%;
              }
          }
      }
      .bottom_right{
          flex:1;
          display: flex;
          flex-direction: column;
          padding-top:.22rem;
          .bottom_right_item{
              flex:1;
              display: flex;
              justify-content: space-between;
              align-items: center;
              font-size: .12rem;
              color: #333;
              opacity: .7;
              .smallSize{
                  font-size: .04rem;
              }
              .bottom_right_item_last{
                  font-size: .13rem;
                  color: #000;
              }
          }
      }
    }
}
}
</style>