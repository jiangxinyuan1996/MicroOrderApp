<template>
  <div class="dome">
    <div class="cropper">
      <img :src="img" class="img" />
      <!-- option是配置，格式是对象，getbase64Data是组件的一个方法获取裁剪完的头像 2.14新增一个获取getblobData的方法 -->
      <h5-cropper :option="option" @getbase64Data="getbase64Data" @getblobData="getblobData" @getFile="getFile"></h5-cropper>
    </div>
    <div class="info">
      <div>作者：居里栈栈</div>
      <div>Wechat：812936565</div>
    </div>
  </div>
</template>

<script>
import H5Cropper from "vue-cropper-h5";
export default {
  components: { H5Cropper },
  data() {
    return {
      option: {
          fixedBox:false
      }, //配置
      img:
        "images/3.jpg"
    };
  },
  created () {
    this.$store.state.showTab = false
  },
  methods: {
    getbase64Data(data) {
        console.log(data)
      this.img = data;
    },
    getFile(data){
        console.log(data)    
    }
  }
};
</script>

<style scoped>
.dome {
  display: flex;
  position: fixed;
  top:0;
  left: 0;
  z-index:999;
  justify-content: space-between;
  padding-left: 22px;
}
.cropper {
  width: 80px;
  height: 80px;
  line-height: 80px;
  /* 切记position: relative一定要有 */
  position: relative;
  /* border-radius: 80px; */
  overflow: hidden;
  text-align: center;
}
.img {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
}
.info {
  font-size: 18px;
  height: 40px;
  line-height: 40px;
  margin-left: 30px;
  flex: 1;
  text-align: left;
}
</style>