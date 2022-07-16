<template>
  <div id="center">
    <!-- 我的 -->
    <div class="header">
      <i class="iconfont icon-nickname"></i>
      <router-link to="/login" custom v-slot="{navigate}">
        <li>
          <span  @click="navigate">{{$store.state.userName}}</span>
        </li>
      </router-link>
    </div>
    <div class="nav">
      <div>电影订单</div>
      <div>商品订单</div>
    </div>
    <ul>
      <li>卖座券</li>
      <li>红包</li>
      <li>余额</li>
      <li>设置</li>
    </ul>
    <footer>
      <p>个人练习</p>
      <p>vue</p>
    </footer>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
#center{
  display: flex;
  flex-direction: column;
  .header{
    background-color: orange;
    height: 200px;
    line-height: 200px;
    display: flex;
    color: white;
    // padding: 50px 0;
    i{
      width: 60px;
      margin-left: 52px;
      font-size:60px;
    }
    li{
      flex:1;
      font-size: 20px;
    }
  }
  .nav{
    display: flex;
    flex-direction: row;
    background-color: white;
    height: 50px;
    line-height: 50px;
    font-size: 16px;
    div{
      flex:1;
      text-align: center;
    }
  }
  ul{
    border-top: 16px solid #eee;
    display: flex;
    flex-direction: column;
    background-color: white;
    // height: 50px;
    // line-height: 50px;
    font-size: 16px;
    li{
      // background-color: white;
      padding-left: 32px;
      height:48px;
      line-height:48px;
      // margin-bottom: 16px;
      border-bottom: 1px solid #f0f0f0;
    }
  }
  footer{
    // margin: 100px;
    text-align: center;
    color: #aaa;
  }
}
</style>
