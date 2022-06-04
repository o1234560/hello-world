<template>
  <div>
    login
    <h1>登录</h1>
    <button @click="handleLogin">登录</button>
  </div>
</template>

<script>
export default {
  methods:{
    handleLogin(){
      setTimeout(() => {
        localStorage.setItem('token','后端返沪的token字段')
        this.$router.push('/films') // 登陆后回到 film 
      },0)
    }
  }
}
</script>
