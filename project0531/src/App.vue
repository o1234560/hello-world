<template>
  <div id="app">
    <!-- hello -->
    <tab-bar v-show="$store.state.isTabBarShow"></tab-bar>
    <section :style="$store.state.isTabBarShow ? 'padding-bottom: 49px;': ''">
      <!-- 路由容器 -->
      <router-view></router-view>
    </section>
  </div>
</template>
<script>
import Vue from 'vue'
import Vant from 'vant'
import 'vant/lib/index.css'
import TabBar from '@/components/TabBar'

Vue.use(Vant)
export default {
  components: {
    TabBar
  }
}
</script>
<style lang="scss">
*{
  margin: 0;
  padding: 0;
  // font-size: 20px;
}
html,body{
  height: 100%;
  width: 100%;
  background-color: #f0f0f0;
  // overflow-x: hidden; // 禁止界面左右滑动,会影响对scroll的监听
}
body{
  font-size: 16px;
}
ul,li{
  list-style: none;
}
// 页面控制
#app{
  //  height: 100%;
   width: 100%;
  //  background-color: #eee;
  section{
    height: 100%;
    // padding-bottom: 0px;
    // background-color: #eee;
  }
}
</style>
