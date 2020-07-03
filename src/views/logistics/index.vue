<template>
    <div id="logistics">
       <div class="header">
           物流信息配置
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
           <table border="1" style="width:99%;border-collapse:collapse" cellpadding='0' cellspacing='0' bgcolor="#fff" v-if="id!==0">
           <thead>
               <tr align="center">
                    <td>地区(省)</td>
                    <td>价格(元/kg)</td>
                    <td>操作</td>
               </tr>
           </thead>
           <tbody>
               <tr align="center" v-for="item in formData" :key="item.id" height="2">
                   <td>{{item.province}}</td>
                   <td>{{item.price}}</td>
                   <td>
                       <van-button plain hairline icon="cross" size="mini" type="danger" @click="handleDel(item)"/>
                   </td>
               </tr>
               <tr align="center">
                   <td colspan="3">
                       <van-button icon="plus" size="mini" color="linear-gradient(to right, #4bb0ff, #6149f6)" @click="handleAdd"/>
                   </td>
               </tr>
           </tbody>
       </table>
        <div v-else style="width:100%;textAlign:center;color:#ccc;margin:.5rem 0 0 0">请选择品类标签</div>
       <el-dialog
            title="提示"
            :visible.sync="dialogVisible"
            width="80%"
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
                { type: 'number', message: '价格必须为数字值'}
                ]"
            >
                <el-input type="age" v-model.number="ruleForm.price" autocomplete="off"></el-input>
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
            <van-button type="primary" block style="position:fixed;bottom:0;left:0" @click="handleSave">保存</van-button>
       
    </div>
</template>
<script>
import { MessageBox,Toast } from 'mint-ui';
import { getPackageTypeList,getPackageList,addPackage,delPackage } from  '@/api/index'
import adcode from '@/constant/adcode'
export default {
    data(){
        return {
            isdel:true,
            value:'',
            value1: 0,
            value2: '请选择品类标签',
            dialogVisible:false,
            addCategoryName:'',
            id:0,
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

        console.log("kkk",adcode)
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
              addPackage({type_id:this.id,...this.ruleForm}).then(res=>{
                  if(res.data.success===1){
                      this.queryTableData()
                      Toast({
                          message:res.data.message
                      })
                  }
              })
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
                Toast({
                    message: '保存成功',
                });
                this.$router.push({
                    name:'createGoods',
                    params:{
                        val:this.$route.params.val,
                        item:this.$route.params.item,
                        options:this.option2
                    }
                    })
            }else{
                Toast({
                    message: '保存成功',
                });
                history.go(-1)
            }
        }
    }  
}
</script>
<style lang="scss" scoped>
#logistics{
    height: 100%;
    overflow: hidden;
    .header{
        position: fixed;
        top:0;
        left: 0;
        background: #fff;
        height: .45rem;
        line-height: .45rem;
        width: 100%;
        text-align: center;
    }
}
</style>