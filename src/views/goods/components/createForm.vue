<template>
    <div id="createForm">
        <van-collapse v-model="activeNames">
            <van-collapse-item title="标题1" name="1">
                <template #title>
            <!-- <van-cell-group> -->
                    <van-form >
                    <van-field
                        v-model="formData.product_name"
                        label="名称"
                        clearable
                        required
                        placeholder="请输入名称"
                        right-icon="warning-o"
                        :rules="[{ required: true, message: '请填写名称' }]"
                        @click-right-icon="handleTips('名称')"
                    />
                    </van-form>
            <!-- </van-cell-group> -->
                </template>
                <van-field
                v-model="formData.introduction"
                rows="2"
                clearable
                autosize
                label="描述"
                type="textarea"
                maxlength="20"
                placeholder="请输入描述"
                />
            </van-collapse-item>
            <van-collapse-item title="标题1" name="2">
              <template #title>
                    <van-cell-group>
                        <van-form>
                            <van-field
                                v-model="formData.price"
                                label="单价(￥)"
                                required
                                clearable
                                type="number"
                                placeholder="请输入单价"
                                right-icon="warning-o"
                                @click-right-icon="handleTips('单价')"
                                @blur="change"
                                :rules="[{ required: true, message: '请填写单价' }]"
                            />
                        </van-form>
                    </van-cell-group>
                </template>
                <van-checkbox v-model="formData.num_flag" checked-color="#07c160">可购买多个</van-checkbox>
            </van-collapse-item>
        </van-collapse>
    </div>
</template>
<script>
export default {
    data(){
        return {
            activeNames:[],
            formData:{
                product_name:'',
                introduction:'',
                price:'',
                num_flag:false
            }
        }
    },
    methods:{
        handleTips(name){
            MessageBox.alert('收款单'+name+'(必填项)', '提示')
        },
    }
}
</script>
<style lang="scss" scoped>

</style>