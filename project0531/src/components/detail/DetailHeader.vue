<template>
  <div class="header">
    <i class="iconfont icon-arrow-left-bold" @click="handleBack()">返回</i>
    <slot></slot>
  </div>
</template>

<script>
export default {
  methods: {
    handleBack () {
      this.$router.back() // 返回上一级路由
    }
  }
}
</script>

<style lang="scss" scoped>
 .header{
   position: fixed;
   top: 0;
   left: 0;
   width: 100%;
   height: 44px;
   line-height: 44px;
   background-color: white;
   text-align: center;
   z-index: 999;
   i{
     position: fixed;
     left: 10px;
   }
 }
</style>
