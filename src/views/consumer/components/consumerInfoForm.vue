<template>
  <div class="home" v-show="visiable">
    <header class="header" style="margin-top:15px;">
      <span>收货信息</span>
    </header>
    <body style="margin-top:15px;">
      <span>收货人信息</span>
      <mt-field label="收货人姓名" style="margin:15px;" placeholder="请输入收货人姓名" v-model="userForm.username"></mt-field>
      <mt-field label="收货人电话" style="margin:15px;" placeholder="请输入收货人电话" v-model="userForm.tel"></mt-field>

      <span>收货地址信息</span>
      <!-- <mt-cell title="标题" label="描述信息" @click="showPop()" is-link></mt-cell> -->
      <br>
      <span class="mint-cell-text" style="margin-top:15px;">收货地址</span>
      <el-cascader :props="props" style="margin-top:15px;" size="mini"></el-cascader>
      <br>
      <div id="button" style="margin-top:15px;">
        <mt-button type="danger" style="margin-left:15px;">退出</mt-button>
        <mt-button type="primary" style="float:right;margin-right:15px;">保存</mt-button>
      </div>

    </body>
  </div>
</template>
<script>
let id = 0
export default {
  props: {
    visiable: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      userForm: {
        username: '',
        tel: ''
      },
      slots: [
        {
          flex: 1,
          values: ['请选择', '北京', '上海', '辽宁', '广东'],
          className: 'slot1',
          textAlign: 'center'
        },
        {
          flex: 2,
          values: ['请选择', '北京', '上海', '辽宁', '广东'],
          className: 'slot2',
          textAlign: 'center'
        }
      ],
      popupVisible: false,
      position: '',
      props: {
        lazy: true,
        lazyLoad (node, resolve) {
          const { level } = node
          setTimeout(() => {
            const nodes = Array.from({ length: level + 1 })
              .map(item => ({
                value: ++id,
                label: `选项${id}`,
                leaf: level >= 2
              }))
              // 通过调用resolve将子节点数据返回，通知组件数据加载完成
            resolve(nodes)
          }, 1000)
        }
      }
    }
  },
  created () {

  },
  methods: {
    onValuesChange (picker, values) {
      console.log('onValuesChange', values)
      this.position = values
      picker.setSlotValues(2, {
        flex: 2,
        values: ['沈阳', '大连'],
        className: 'slot2',
        textAlign: 'center'
      })
      console.log('====:', picker.getSlotValues(2))
      // this.slots.push()
    },
    confirmCity () {
      console.log('confirmCity')
      this.popupVisible = false
      console.log('position---:', this.position)
    },
    showPop () {
      console.log('showPop')
      this.popupVisible = true
    }
  }
}
</script>
<style lang="scss" scoped>
.mint-popup-bottom {
    top: auto;
    right: auto;
    bottom: 0;
    left: 50%;
    transform: translate3d(-50%, 0, 0);
    width: 100%;
}
</style>
