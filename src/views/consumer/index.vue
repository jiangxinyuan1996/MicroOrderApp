<template>
  <div id="home">
    <DataForm :visiable="ui.DataFormVisiable"/>
    <div id="swiper" style="">
      <mt-swipe :auto="4000">
        <mt-swipe-item>1</mt-swipe-item>
        <mt-swipe-item>2</mt-swipe-item>
        <mt-swipe-item>3</mt-swipe-item>
      </mt-swipe>
    </div>
    <div id="goodsInfo">
      <span>商品名称:</span><span>XXXXXXX</span><br>
      <span>数量:</span><el-input-number v-model="num" size="mini" @change="handleChange" :min="1" :max="10" label="购买数量:"></el-input-number><br>
      <span>金额:</span><span>{{total}}元</span><br>
      <span>收货地址:</span>
      <el-select v-model="address" size="mini" placeholder="请选择">
        <el-option
          v-for="item in cities"
          :key="item.key"
          :label="item.position"
          :value="item.key">
          <span style="float: right;">地址:{{ item.position }}</span>
        </el-option>
        <el-option ><span @click="showDataForm">新建</span></el-option>
      </el-select>
    </div>
  </div>
</template>
<script>
import DataForm from './components/consumerInfoForm.vue'
export default {
  components: {
    DataForm
  },
  data () {
    return {
      ui: {
        DataFormVisiable: false
      },
      address: null,
      num: 1,
      price: 9.99,
      total: 0,
      cities: [{
        key: '1',
        name: '张三',
        position: '辽宁省大连市中山区中南路18号'
      }]
    }
  },
  created () {
    this.total = this.price * this.num
  },
  methods: {
    showDataForm () {
      console.log('showDataForm')
      this.ui.DataFormVisiable = true
    },
    handleChange () {
      console.log('handleChange')
      this.total = this.price * this.num
    }
  }
}
</script>
<style lang="scss" scoped>
#home{
  height: 100vh;
}
#swiper{
  width: auto;
  height: 30vh;
}
.mint-swipe-item {
  background-color: #0089dc;
  width: 100%;
  height: 100%;
}
</style>
