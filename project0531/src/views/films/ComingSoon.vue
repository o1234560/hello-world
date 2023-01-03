<template>
  <div>
    <!-- nowplaying -->
      <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      :immediate-check="false"
      @load="onLoad"
      >
        <van-cell
        v-for="data in datalist"
        :key="data.filmId"
        @click="handleChangePage(data.filmId)" >
          <img :src="data.poster">
          <div>
            <div class="title">{{data.name}}</div>
            <div class="content ">
                <div :class="data.grade?'':'hidden'">
                  观众评分: <span style="color:red">{{data.grade}}</span>
                </div>
                <div>
                  {{data.nation}} | {{data.runtime}}分钟
                </div>
                <div class="actors">
                  主演:{{data.actors | actorsFilter}}
                </div>
              </div>
          </div>
          <span class="order">即将上映</span>
        </van-cell>
      </van-list>
    <!-- <ul>
      <li v-for="data in datalist" :key="data.filmId" @click="handleChangePage(data.filmId)">
      </li>
    </ul> -->
  </div>
</template>
<script>
// import BetterScroll from 'better-scroll'
// import axios from 'axios'
import http from '@/util/http'
import Vue from 'vue'
import { List } from 'vant'
Vue.use(List)
Vue.filter('actorsFilter', (data) => {
  // console.log()
  if (data === undefined) return '暂无主演'
  return data.map(item => item.name).join(' ')
})
export default {
  data () {
    return {
      datalist: [],
      loading: false,
      finished: false,
      current: 1,
      total: 0
    }
  },
  mounted () {
    // axios({
    //   url: `https://m.maizuo.com/gateway?cityId=${this.$router.state.cityId}&pageNum=1&pageSize=10&type=1&k=9288020`,
    //   headers: {
    //     'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.2.0","e":"1653814037507184098050049","bc":"440100"}',
    //     'X-Host': 'mall.film-ticket.film.list'
    //   }
    // }).then(res => {
    //   console.log(res.data.data.films)
    //   this.datalist = res.data.data.films
    // })
    http({
      url: `/gateway?cityId=${this.$store.state.cityId}&pageNum=1&pageSize=10&type=2&k=${Math.floor(Math.random() * 10000000)}`,
      headers: {
        'X-Host': 'mall.film-ticket.film.list'
      }
    }).then(res => {
      // console.log(res.data.data.films)
      this.datalist = res.data.data.films
      this.total = res.data.data.total
      // console.log(this.total)
    })
  },
  methods: {
    handleChangePage (id) {
      // console.log('changePage:', id)
      // this.$router.push(`/detail/${id}`)//通过命名路由跳转
      this.$router.push({
        name: 'jack',
        params: {
          id
        }
      })
    },
    onLoad () {
      // console.log('到底了')
      // onLoad先于mounted，路由返回时先触发onLoad，需要特殊处理
      if (this.datalist.length === this.total && this.total !== 0) {
        this.finished = true
        return
      }
      this.current++
      http({
        url: `/gateway?cityId=${this.$store.state.cityId}&pageNum=${this.current}&pageSize=10&type=2&k=8803514`,
        headers: {
          'X-Host': 'mall.film-ticket.film.list'
        }
      }).then(res => {
        // console.log(res.data.data.films)
        this.datalist = [...this.datalist, ...res.data.data.films]
        // loading主动设置成false
        this.loading = false
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  .van-list{
    width: 100%;
    background-color: white;
    .van-cell{
      // clear: both;
      overflow: hidden;
      padding: 15px;
      line-height: 20px;
      img{
        width: 66px;
        float: left;
        margin-right: 10px;
      }
      .title{
        font-size: 16px;
      }
      .content{
        font-size: 13px;
        color: gray;
        div{
          margin-top: 3px;
        }
        .actors{
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          width: 200px;
        }
      }
        .order{
        position: absolute;
        right: 16px;
        top: 32px;
        font-size: 16px;
        padding: 0px 8px;
        border-radius: 8px;
        // border: 1px solid red;
        background-color: #aaa;
        color: #fff;
        opacity: 0.7;
      }
    }
    .van-list__error-text, .van-list__finished-text, .van-list__loading {
    color: #969799;
    font-size: 14px;
    line-height: 50px;
    text-align: center;
}
  }
  .hidden{
    visibility: hidden;
  }
</style>
