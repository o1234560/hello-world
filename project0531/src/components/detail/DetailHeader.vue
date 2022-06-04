<template>
  <div class="header">
    <i class="iconfont icon-arrow-left-bold" @click="handleBack()"></i>
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
   height: 2.75rem;
   line-height: 2.75rem;
   background-color: white;
   text-align: center;
   i{
     position: fixed;
     left: .625rem;
   }
 }
</style>
