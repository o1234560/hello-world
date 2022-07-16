import Vue from 'vue'
import Vuex from 'vuex'
import http from '@/util/http'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedState({ // vuex 持久化
    reducer: (state) => {
      return {
        cityId: state.cityId,
        cityName: state.cityName
      }
    }
  }
  )],
  state: { // 公共状态
    cityId: '110100',
    cityName: '北京',
    cinemaList: [],
    isTabBarShow: true,
    userName: '请登录'
  },
  getters: {
  },
  mutations: { // 支持同步，监控
    changeCityName (state, cityName) {
      // console.log(cityName)
      state.cityName = cityName
    },
    changeCityId (state, cityId) {
      // console.log(cityName)
      state.cityId = cityId
    },
    changeCinemaData (state, data) {
      state.cinemaList = data // 设置缓存
      // console.log('state', state.cinemaList)
    },
    clearCinemaList (state) {
      state.cinemaList = []
    },
    show (state) {
      state.isTabBarShow = true
    },
    hide (state) {
      state.isTabBarShow = false
    },
    setUsername (state, userName) {
      state.userName = userName
    }
  },
  actions: { // 支持异步,同步
    getCinemaData (store, cityId) {
      // console.log('getCinemaData')
      return http({ // 返回 promise 对象
        url: `/gateway?cityId=${cityId}&ticketFlag=1&k=8708327`,
        headers: {
          'X-Host': 'mall.film-ticket.cinema.list'
        }
      }).then(res => {
        console.log(res.data.data.cinemas)
        store.commit('changeCinemaData', res.data.data.cinemas)
      })
    }
  },
  modules: {
  }
})
// vuex 默认是管理在内存，一刷新页面，公共状态就丢失了

/* vuex 项目应用
1、非父子的通信
2、后端数据的缓存快照，减少重复数据请求，减轻服务器压力
*/
