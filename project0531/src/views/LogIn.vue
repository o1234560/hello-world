<template>
  <div id="login">
    <!-- login -->
    <h1>登录页面</h1>
    <van-form @submit="onSubmit">
      <van-field
        v-model="username"
        name="用户名"
        label="用户名"
        placeholder="用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
        v-model="password"
        type="password"
        name="密码"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">提交</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { Toast } from 'vant'

export default {
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    onSubmit (values) {
      // console.log('submit', values)
      Toast('登录成功')
      setTimeout(() => {
        this.$store.commit('setUsername', this.username)
        this.$router.push('/films')
      }, 1000)
    }
  }
}
</script>

<style lang="scss" scoped>
#login{
  height: 100%;
  width: 100%;
  // background: white;
  text-align: center;
  overflow: hidden;
  h1{
    margin: 20px;
  }
}
.van-form{
  height: 100%;
  margin: 20% 10%;
  width: 80%;
}
.van-cell, .van-field, .van-field--error{
  // width: 100;
  margin-bottom: 16px;
  font-size: 20px;
}
.van-button, .van-button--info, .van-button--normal, .van-button--block, .van-button--round{
  // width: 80%;
  font-size: 20px;
}
</style>
