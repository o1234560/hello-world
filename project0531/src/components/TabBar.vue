<template>
  <footer>
    <ul>
      <!-- <router-link to="/films" tag="li">电影</router-link> -->
      <!-- <router-link to="/cinemas" tag="li">影院</router-link> -->
      <!-- <router-link to="/center" tag="li">我的</router-link> -->
      <!-- vue4 -->
      <router-link to="/films" custom v-slot="{navigate,isActive}">
        <li @click="navigate" :class="isActive?'myActive':''">
          <i class="iconfont icon-dianyingpiao"></i>
          <span>电影</span>
        </li>
      </router-link>
      <router-link to="/cinemas" custom v-slot="{navigate,isActive}">
        <li @click="navigate" :class="isActive?'myActive':''">
          <i class="iconfont icon-shangquan"></i>
          <span>影院</span>
        </li>
      </router-link>
      <router-link to="/center" custom v-slot="{navigate,isActive}">
        <li @click="navigate" :class="isActive?'myActive':''">
          <i class="iconfont icon-shezhi"></i>
          <span>我的</span>
        </li>
      </router-link>
    </ul>
  </footer>
</template>

<script>
</script>

<style lang="scss" scoped>
  // .router-link-active{
  //   color: red
  // }
  .myActive{
    color: red
  }
  footer{
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 3.0625rem;
    background: white;
    z-index: 100;
    ul{
      display: flex;
      li{
        flex: 1;
        line-height: 1.5625rem;
        text-align: center;
        display: flex;
        flex-direction: column;
        i{
          font-size: 1.25rem;
        };
        span{
          font-size: 1rem;
        }
      }
    }
  }
</style>
