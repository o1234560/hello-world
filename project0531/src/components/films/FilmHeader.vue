<template>
  <ul>
    <router-link to="/films/nowplay" custom v-slot="{navigate,isActive}">
      <li @click="navigate" >
        <span :class="isActive?'myActive':''">正在热映</span>
      </li>
    </router-link>
    <router-link to="/films/comingsoon" custom v-slot="{navigate,isActive}">
      <li @click="navigate" >
        <span :class="isActive?'myActive':''">即将上线</span>
      </li>
    </router-link>
  </ul>
</template>

<style lang="scss" scoped>
.myActive{
  color: red;
  border-bottom: 2px solid red;
}
ul{
  background: white;
  display: flex;
  z-index: 100;
  height: 49px;
  line-height: 49px;
  // border-bottom: 2px solid #eee;
  // box-shadow: 0px 0px 5px #efefef;
  li{
    flex: 1;
    text-align: center;
    span{
      font-size: 16px;
      padding-bottom: 10px;
    };
  }
}
</style>
