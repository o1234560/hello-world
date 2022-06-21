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
      </van-cell>
    </van-list>
    <!-- <ul>
      <li v-for="data in datalist" :key="data.filmId" @click="handleChangePage(data.filmId)">
      </li>
    </ul> -->
  </div>
</template>
<script>
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
      url: `/gateway?cityId=${this.$store.state.cityId}&pageNum=1&pageSize=10&type=2&k=8803514`,
      headers: {
        'X-Host': 'mall.film-ticket.film.list'
      }
    }).then(res => {
      // console.log(res.data.data.films)
      this.datalist = res.data.data.films
      this.total = res.data.data.total
      console.log(this.total)
    })
  },
  methods: {
    handleChangePage (id) {
      console.log('changePage:', id)
      // this.$router.push(`/detail/${id}`)//通过命名路由跳转
      this.$router.push({
        name: 'jack',
        params: {
          id
        }
      })
    },
    onLoad () {
      console.log('到底了')
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
    padding-bottom: 3.0625rem;
    .van-cell{
      // clear: both;
      overflow: hidden;
      padding: .9375rem;
      line-height: 1.25rem;
      img{
        width: 4.125rem;
        float: left;
        margin-right: .625rem;
      }
      .title{
        font-size: 1rem;
      }
      .content{
        font-size: .8125rem;
        color: gray;
        div{
          margin-top: .1875rem;
        }
        .actors{
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          width: 12.5rem;
        }
      }
    }
    .van-list__error-text, .van-list__finished-text, .van-list__loading {
    color: #969799;
    font-size: .875rem;
    line-height: 3.125rem;
    text-align: center;
}
  }
  .hidden{
    visibility: hidden;
  }
</style>
