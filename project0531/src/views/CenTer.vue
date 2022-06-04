<template>
  <div>
    我的
    <van-button type="primary">主要按钮</van-button>
    <log-in></log-in>
  </div>
</template>

<script>
import LogIn from '@/views/LogIn.vue'
export default {
  components:{
    LogIn
  }
}
</script>
