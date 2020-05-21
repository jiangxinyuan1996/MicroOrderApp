<template>
  <div id="app">
    <tabbar v-if="$store.state.showTab"/>
    <router-view/>
  </div>
</template>
<script>
import tabbar from '@/components/tabbar.vue'
export default {
  name: 'Home',
  components: {
    tabbar
  }
}
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  color: #2c3e50;
  height: 100%;

}
.introjs-prevbutton{
  display: none;

}
.introjs-skipbutton{
  font-family: "vdd_iconfont" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.introjs-button{
  font-family: "vdd_iconfont" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
