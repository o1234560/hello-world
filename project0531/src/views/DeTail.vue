<template>
  <div id="detail" v-if="filmInfo">
    <detail-header v-scroll="0">{{filmInfo.name}}</detail-header>
    <div :style="{
      backgroundImage: 'url('+filmInfo.poster+')'
    }" class="poster"></div>
    <div class="content">
      <div class="title">{{filmInfo.name}}</div>
      <div>
        <div class="detail-text">{{filmInfo.category}}</div>
        <div class="detail-text">{{filmInfo.premiereAt | dateFilter}}上映</div>
        <div class="detail-text">{{filmInfo.nation}} | {{filmInfo.runtime}}分钟</div>
        <div class="detail-text" style="line-height: 20px; " :class="isHidden?'hidden':''">{{filmInfo.synopsis}}</div>
        <div style="text-align: center;">
          <i class="iconfont" @click="isHidden=!isHidden" :class="isHidden?'icon-arrow-down-bold':'icon-arrow-up-bold'"></i>
        </div>
      </div>
    </div>
      <!-- 演职人员 -->
      <div class="content">
        <div>演职人员</div>
        <detail-swiper class="actorlist" :slideNum="3.5" name="actors">
          <detail-swiper-item v-for="actor in actorList" :key="actor.name">
            <div :style="{ backgroundImage:'url('+actor.avatarAddress+')'}" class="actorposter"></div>
            <div style="color: #000;">{{actor.name}}</div>
            <div>{{actor.role}}</div>
          </detail-swiper-item>
        </detail-swiper>
      </div>
      <!-- 剧照 -->
      <div class="content">
        <div>剧照</div>
        <detail-swiper class="photolist" :slideNum="2" name="photos">
          <!-- 带“:”传递的是非字符串类型，不带冒号传递的是字符串类型 -->
          <!-- 通过传递参数，使得两个swiper独立、互不影响。 -->
          <detail-swiper-item v-for="(photo, index) in photoList" :key="photo">
            <!-- <div :style="{ backgroundImage:'url('+photo+')'}" class="photoposter"></div> -->
            <div  class="photoposter"  @click="handleImagePreview(index)">
              <img :src="photo" />
            </div>
          </detail-swiper-item>
        </detail-swiper>
      </div>
  </div>
</template>

<script>
import http from '@/util/http'
import moment from 'moment'
import Vue from 'vue'
import { ImagePreview } from 'vant'
import detailSwiper from '@/components/detail/DetailSwiper'
import detailSwiperItem from '@/components/detail/DetailSwiperItem'
import DetailHeader from '@/components/detail/DetailHeader'
// moment.locale('zh-cn') // 设置成中文
// console.log(moment().format('YYYY-MM-DD'))
Vue.filter('dateFilter', (date) => {
  return moment(date * 1000).format('YYYY-MM-DD')
})
Vue.directive('scroll', {
  inserted (el, binding) {
    // console.log(el, binding)
    el.style.display = 'none'
    window.onscroll = () => {
      // console.log('scroll', binding.value)
      if ((document.documentElement.scrollTop || document.body.scrollTop) > binding.value) {
        el.style.display = 'block'
      } else {
        el.style.display = 'none'
      }
    }
  },
  unbind () {
    window.scroll = null
  }
})
export default {
  data () {
    return {
      filmInfo: null,
      isHidden: true,
      actorList: [],
      photoList: []
    }
  },
  components: {
    detailSwiper,
    detailSwiperItem,
    DetailHeader
  },
  created () {
    // Toast.loading({
    //   message: '加载中...',
    //   forbidClick: true,
    //   duration: 0
    // })
    // console.log('created', this.$route.params.id)
    http({
      url: `/gateway?filmId=${this.$route.params.id}&k=2128320`,
      headers: {
        'X-Host': 'mall.film-ticket.film.info'
      }
    }).then(res => {
      // console.log(res.data.data.film)
      this.filmInfo = res.data.data.film
      this.actorList = res.data.data.film.actors
      this.photoList = res.data.data.film.photos
      // 隐藏Toast
      // Toast.clear()
    })
  },
  mounted () {
    this.$store.commit('hide')
  },
  destroyed () {
    window.onscroll = null
    this.$store.commit('show')
  },
  methods: {
    handleImagePreview (index) {
      // console.log(index)
      ImagePreview({
        images: this.photoList,
        startPosition: index,
        closeable: true
      })
    }
  }
}
</script>

<style lang="scss" scoped>
#detail{
  width: 100%;
  height: 100%;
  // background-color: #eee;
  .poster{
    width: 100%;
    height: 13.125rem;
    background-position: center;
    background-size: cover;
  }
  .content{
    padding: 15px;
    border-bottom: 10px solid #eee;
    background-color: #fff;
    .title{
      font-size: 20px;
    }
    .detail-text{
      font-size: 13px;
      color: gray;
      margin-top: 10px;
    }
  }
  .actorlist{
    text-align: center;
    font-size: 13px;
    line-height: 20px;
    color: gray;
    margin-top: 20px;
    // border-top: 16px solid #eee;
    .actorposter{
      // width: 85px;
      height: 5.3125rem;
      background-position: center;
      background-size: cover;
    }
  }
  .photolist{
    text-align: center;
    margin-top: 20px;
    // border-top: 16px solid #eee;
    .photoposter{
      // width: 150px;
      height: 6.25rem;
      img{
        width: 100%;
      }
    }
  }
  .hidden{
    overflow: hidden;
    height: 38.4px;
  }
}
</style>
