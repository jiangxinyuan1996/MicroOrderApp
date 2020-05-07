<template>
  <div class="home">
    <header class="header">
      <span>收货信息</span>
    </header>
    <body>
      <span>收货人信息</span>
      <mt-field label="收货人姓名" placeholder="请输入收货人姓名" v-model="userForm.username"></mt-field>
      <mt-field label="收货人电话" placeholder="请输入收货人电话" v-model="userForm.tel"></mt-field>
      <span>收货地址信息</span>
      <mt-picker :slots="slots" @change="onValuesChange"></mt-picker>

    </body>
  </div>
</template>
<script>
export default {
  data () {
    return {
      userForm: {
        username: '',
        tel: ''
      },
      slots: [
        {
          flex: 1,
          values: ['2015-01', '2015-02', '2015-03', '2015-04', '2015-05', '2015-06'],
          className: 'slot1',
          textAlign: 'right'
        }, {
          divider: true,
          content: '-',
          className: 'slot2'
        }, {
          flex: 1,
          values: ['2015-01', '2015-02', '2015-03', '2015-04', '2015-05', '2015-06'],
          className: 'slot3',
          textAlign: 'left'
        }
      ]
    }
  },
  created () {

  },
  methods: {
    onValuesChange () {
      console.log('onValuesChange')
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
