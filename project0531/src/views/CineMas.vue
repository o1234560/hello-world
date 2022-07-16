<template>
  <div id="cinemas">
    <div class="cinemabar">
 <van-nav-bar title="影院" @click-left="onClickLeft" @click-right="onClickRight">
       <template #left>
         {{$store.state.cityName}} <van-icon name="arrow-down" />
       </template>
      <template #right>
        <van-icon name="search" />
      </template>
    </van-nav-bar>
    </div>

    <div class="box">
      <ul>
        <li v-for="data in $store.state.cinemaList" :key="data.cinemaId"
        @click="handleChangePage(data.cinemaId)">
          <div class="left">
            <div>{{data.name}}</div>
            <div class="address">{{data.address}}</div>
          </div>
          <div class="right">
            <div style="color: red;">￥{{data.lowPrice/100}}起</div>
         </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
// import http from '@/util/http'
// import BetterScroll from 'better-scroll'
// betterscroll 引入，提高性能
// import { Toast } from 'vant'

export default {
  data () {
    return {
      cinemaList: []
    }
  },
  mounted () {
    // 分发，在没数据时取数据，有数据后就不再取数据
    if (this.$store.state.cinemaList.length === 0) { // 分发给 异步action
      this.$store.dispatch('getCinemaData', this.$store.state.cityId)
        .then(res => {
          console.log('cinemas 数据加载完成')
          // this.$nextTick(() => {
          //   new BetterScroll('.box', {
          //     scrollbar: {
          //       fade: true
          //     }
          //   })
          // })
        })
    } else {
      console.log('cinemas 使用缓存')
      // this.$nextTick(() => {
      //   new BetterScroll('.box', {
      //     scrollbar: {
      //       fade: true
      //     }
      //   })
      // })
    }
    // http({
    //   url: `/gateway?cityId=${this.$store.state.cityId}&ticketFlag=1&k=8708327`,
    //   headers: {
    //     'X-Host': 'mall.film-ticket.cinema.list'
    //   }
    // }).then(res => {
    //   // console.log(res.data.data.cinemas)
    //   this.cinemaList = res.data.data.cinemas
    //   this.$nextTick(() => {
    //     new BetterScroll('.box', {
    //       scrollbar: {
    //         fade: true
    //       }
    //     }) // BetterScoll引入，提高性能
    //   })
    // })
  },
  methods: {
    onClickLeft () {
      // Toast('返回')
      this.$router.push('/city')
      // 清空cinemaList
      this.$store.commit('clearCinemaList')
    },
    onClickRight () {
      // Toast('按钮')
      this.$router.push('/search')
    },
    handleChangePage (id) {
      console.log(id)
      // console.log('changePage:', id)
      // this.$router.push(`/detail/${id}`)//通过命名路由跳转
      this.$router.push({
        name: 'tom',
        params: {
          id
        }
      })
    }
  }
}

</script>

<style lang="scss">
#cinemas{
  height: 100%;
  .cinemabar{
    height: 3.0625rem;
    width: 100%;
    position: sticky;
    top: 0px;
    z-index: 100;
  }
.box{
  width: 100%;
  height: 100%;//高度未作修正，需要修正滚动条位置, 使得BetterScroll滚动条不溢出
  // padding-bottom: 3.0625rem;
  overflow: hidden;
  background-color: #fff;
  position: relative;
  li{
    padding: .9375rem;
    font-size: .9375rem;
    display: flex;
    justify-content:flex-end;
    .left{
      // flex: 4; // 两个flex可能会不好用
      width: 80%;
      .address{
        max-width: 100%;
        color: gray;
        font-size: .75rem;
        margin-top: .3125rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
    .right{
      flex: 1;
    }
  }
}
.van-nav-bar{
  line-height: 1.375rem;
  .van-nav-bar__content {
    height: 3.0625rem;
    .van-nav-bar__left, .van-nav-bar__right{
      height: 3.0625rem;
      font-size: .875rem;
      .van-icon{
        font-size: 1.25rem;
      }
    }
    .van-nav-bar__title{
      font-size: 1rem;
    }
  }
}
}
</style>
