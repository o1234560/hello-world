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
    height: 12.5rem;
    line-height: 12.5rem;
    display: flex;
    color: white;
    // padding: 3.125rem 0;
    i{
      width: 3.75rem;
      margin-left: 3.25rem;
      font-size:3.75rem;
    }
    li{
      flex:1;
      font-size: 1.25rem;
    }
  }
  .nav{
    display: flex;
    flex-direction: row;
    background-color: white;
    height: 3.125rem;
    line-height: 3.125rem;
    font-size: 1.25rem;
    div{
      flex:1;
      text-align: center;
    }
  }
  ul{
    border-top: 1rem solid #eee;
    display: flex;
    flex-direction: column;
    background-color: white;
    // height: 3.125rem;
    // line-height: 3.125rem;
    font-size: 1rem;
    li{
      // background-color: white;
      padding-left: 2rem;
      height:3rem;
      line-height:3rem;
      border-bottom: 1px solid #f0f0f0;
    }
  }
  footer{
    // margin: 6.25rem;
    text-align: center;
    color: #aaa;
  }
}
</style>
