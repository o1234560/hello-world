// 1-对于数据请求的封装
// import axios from 'axios'
// function httpForList () {
//   return axios({
//     url: 'https://m.maizuo.com/gateway?cityId=440100&pageNum=1&pageSize=10&type=1&k=9288020',
//     headers: {
//       'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.2.0","e":"1653814037507184098050049","bc":"440100"}',
//       'X-Host': 'mall.film-ticket.film.list'
//     }
//   })
// }
// function httpForDetail () {
//   return axios({
//     url: `https://m.maizuo.com/gateway?filmId=${this.$route.params.id}&k=2128320`,
//     headers: {
//       'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.2.0","e":"1653814037507184098050049","bc":"440100"}',
//       'X-Host': 'mall.film-ticket.film.info'
//     }
//   })
// }

// 2--对于数据请求的封装
import axios from 'axios'
import { Toast } from 'vant'
// 只要用到axios的地方，就能显示Toast
const http = axios.create({
  baseURL: 'https://m.maizuo.com',
  timeout: 0,
  headers: {
    'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.2.0","e":"1653814037507184098050049","bc":"440100"}'
  }
})

// 在发请求之前拦截 - -showLoading
http.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  // console.log(config)
  Toast.loading({
    message: '加载中...',
    forbidClick: true,
    duration: 0
  })
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 在成功之后拦截 -- hideLoading
http.interceptors.response.use(function (response) {
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么
  Toast.clear()
  return response
}, function (error) {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  Toast.clear()
  return Promise.reject(error)
})

export default http
