<template>
  <div id="city">
  <van-search
    v-model="value"
    show-action
    @cancel="handleCancel()"
    placeholder="请输入城市名"
  />

  <!-- 热门城市 -->
  <ul class="hot" v-show="!show">
    <div>热门城市</div>
    <ul class="hot-city">
      <li v-for="data in citys" :key="data.cityId">
        <button v-if="data.isHot===1" @click="handleClick(data)">{{data.name}}</button>
      </li>
    </ul> 
  </ul>

  <!-- city 列表 -->
  <van-index-bar v-show="!show" :index-list="computedList" @select="handleChange" :sticky="false">
    <div v-for="data in cityList" :key="data.type">
      <van-index-anchor :index="data.type"/>
      <van-cell  v-for="item in data.list" :title="item.name"
        :key="item.cityId" @click="handleClick(item)"/>
    </div>
  </van-index-bar>

<!-- 搜索结果 -->
  <ul class="citys">
    <van-cell v-for="data in computedList02" :key="data.cityId" v-show="show"
    @click="handleClick(data)">{{data.name}}</van-cell>
  </ul>
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
      cityList: [],
      citys: [],
      value: '',
      show: false
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
      // 0、
      this.citys = res.data.data.cities
      // this.citys = this.citys.map(item=>item.name)
      // console.log(this.citys)
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
      // console.log(this.cityList)
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
    },
    handleCancel () {
      this.$router.back()
    }
  },
  computed: {
    computedList () {
      return this.cityList.map(item => item.type)
    },
    computedList02 () {
      // console.log('查找:', this.value)
      // const ll=this.citys.filter(item => item.include(this.value))
      // console.log(ll)
      if (this.value.length !== 0) {
        // eslint-disable-next-line
        this.show = true
        // console.log(this.citys.filter(item => item.name.includes(this.value)))
      } else {
        // eslint-disable-next-line
        this.show = false
      }
      return this.citys.filter(item => item.name.includes(this.value))
    }
  }
}
</script>

<style lang="scss">
.van-toast{
  min-width: 20px;
}

.van-search{
 position: relative;
//  background-color: #f00;
//  border-bottom: 1px solid #ddd;
 .van-search__content.van-search__content--square{
  border-radius: 15px;
 }
 .van-search__action{
  color: #323233;
 }
}

.hot{
  background-color: #fff;
  padding: 16px 0px;
  div{
    font-size: 14px;
    margin-left: 8px;
    margin-bottom: 8px;
    color: #aaa;
  }
  .hot-city{
    padding-left: 16px;
    li{
      display: inline-block;
      button{
        font-size: 14px;
        margin: 8px 8px;
        padding: 8px 16px;
        background-color: #f7f8fa;
        border: 0px;
        border-radius: 8px;
      }
    }
  }
  
}

.van-index-bar{
  display: block;
  font-size: 16px;
  .van-index-bar__index {
    padding: 0 8px 0 16px;
    font-size: 14px;
    line-height: 16px;
    // color: #aaa;
    opacity: 0.5;
  };
  .van-index-anchor {
    background-color: #f7f8fa;
    color: #aaa;
    padding: 0 16px;
    font-size: 14px;
    line-height: 32px;
  }
  .van-cell{
    padding: 10px 16px;
    overflow: hidden;
    color: #323233;
    font-size: 14px;
    line-height: 24px;
  }
}

.citys{
  // background-color: #fff;
  .van-cell{
    padding: 10px 20px;
  }
}
</style>
