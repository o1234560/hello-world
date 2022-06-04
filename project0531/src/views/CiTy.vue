<template>
  <div id="city">
    <!-- city -->
    <van-index-bar :index-list="computedList" @select="handleChange" :sticky="false">
      <div v-for="data in cityList" :key="data.tyoe">
        <van-index-anchor :index="data.type"/>
        <van-cell  v-for="item in data.list" :title="item.name"
          :key="item.cityId" @click="handleClick(item)"/>
      </div>
  </van-index-bar>
  </div>
</template>

<script>
import http from '@/util/http'
import { Toast } from 'vant'

const obj = {
  created () {
    this.$store.commit('hide')
  },
  destroyed () {
    this.$store.commit('show')
  }
}
export default {
  mixins: [obj], // 混入mixin,不会删除原来的
  data () {
    return {
      cityList: []
    }
  },
  mounted () {
    // this.$store.commit('hide')
    http({
      url: '/gateway?k=129332',
      headers: {
        'X-Host': 'mall.film-ticket.city.list'
      }
    }).then(res => {
      // console.log(res.data.data.cities)
      // 1、 数据分组
      this.renderCity(res.data.data.cities)
      // 2、 数据渲染
    })
  },
  destroyed () {
    // this.$store.commit('show')
  },
  methods: {
    renderCity (list) {
      // console.log(list)
      const lettrList = []
      for (let i = 65; i < 91; i++) {
        // console.log(String.fromCharCode(i))
        lettrList.push(String.fromCharCode(i))
      }
      // console.log(lettrList)
      lettrList.forEach(letter => {
        const newList = list.filter(item => item.pinyin.substring(0, 1)
          .toUpperCase() === letter)
        // console.log(newList)
        newList.length > 0 && this.cityList.push({
          type: letter,
          list: newList
        })
      })
      console.log(this.cityList)
    },
    handleChange (data) {
      // console.log('change', data)
      Toast(data)
    },
    handleClick (item) {
      // Toast('点击了')
      // console.log(item.name, item.cityId)
      //
      // 传统的多页面方案
      // 1、locattion.herf = '#/cimemas?cityname=' + item.name
      // 2、cookie,localStorage
      //
      // 单页面方案
      // 1、中间人模式
      // 2、bus事件总线
      //
      // vuex 公共状态管理器
      // this.$store.state.cityName = item.name // 直接修改无法监控
      this.$store.commit('changeCityName', item.name) // mutation 监控, 同步
      this.$store.commit('changeCityId', item.cityId) // mutation 监控
      this.$router.back()
    }
  },
  computed: {
    computedList () {
      return this.cityList.map(item => item.type)
    }
  }
}
</script>

<style lang="scss">
.van-toast{
  min-width: 20px;
}
.van-index-bar{
  font-size: 1rem;
  .van-index-bar__index {
    padding: 0 0.5rem 0 1rem;
    font-weight: 500;
    font-size: .625rem;
    line-height: 1rem;
};
.van-index-anchor {
    padding: 0 1rem;
    font-size: .625rem;
    line-height: 2rem;
}
.van-cell{
  padding: .625rem 1rem;
  overflow: hidden;
  color: #323233;
  font-size: .875rem;
  line-height: 1.5rem;
}
}
</style>
