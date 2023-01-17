import Vue from 'vue'
import VueRouter from 'vue-router'
import Films from '@/views/FilMs'
import Cinemas from '@/views/CineMas'
import Center from '@/views/CenTer'
import Nowplaying from '@/views/films/NowPlaying'
import Comingsoon from '@/views/films/ComingSoon'
import Detail from '@/views/DeTail'
import Search from '@/views/SeaRch'
import City from '@/views/CiTy'
import store from '@/store/index'
import Login from '@/views/LogIn'
import CinemaDetail from '@/views/CinemaDetail'

Vue.use(VueRouter)

const routes = [{
  path: '/films',
  component: Films,
  children: [{
    path: '/films/nowplay',
    component: Nowplaying
  },
  {
    path: '/films/comingsoon',
    component: Comingsoon
  },
  {
    path: '/films',
    redirect: '/films/nowplay'
  }
  ]
},
{
  path: '/detail',
  component: Detail
  // meta:{
  //   isTabbarhide: true
  // }
},
{
  name: 'jack',
  path: '/detail/:id',
  component: Detail
},
{
  path: '/cinemas',
  component: Cinemas
},
{
  path: '/cinemadetail',
  component: CinemaDetail,
  meta: {
    isTabbarHide: true
  }
},
{
  name: 'tom',
  path: '/cinemadetail/:id',
  component: CinemaDetail,
  meta: {
    isTabbarHide: true
  }
},
{
  path: '/city',
  component: City
},
{
  path: '/center',
  component: Center
},
{
  path: '/search',
  component: Search,
  meta: {
    isTabbarHide: true
  }
},
{
  path: '/login',
  component: Login
},
{
  path: '/',
  redirect: '/films'
},
{
  path: '*',
  redirect: 'films'
}
]

const router = new VueRouter({
  mode: 'hash', // 路由模式，history、hash（默认）
  base: process.env.BASE_URL,
  routes
})

// 全局拦截
router.beforeEach((to, from, next) => {
  // console.log(to)
  // 设置 TabBar 显示与否
  if (to.meta.isTabbarHide) {
    // console.log('TabBar hide')
    store.commit('hide')
  } else {
    // console.log('TabBar show')
    store.commit('show')
  }
  next() // next()表示允许跳转的路由，此时任何yem表示都可以
})

export default router
