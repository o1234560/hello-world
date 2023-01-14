<template>
  <div id="cinemadetail">
    <van-nav-bar left-text="返回" left-arrow @click-left="onClickLeft" fixed z-index="999" />
    <div class="cinema-info" v-if="cinema">
      <div class="cinemaName">{{ cinema.name }}</div>
      <ul>
        <li v-for="data in cinema.services" :key="data.name">
          {{ data.name }}
        </li>
      </ul>
      <div class="address">
        <van-icon name="location-o" />
        <span>{{ cinema.address }}</span>
        <van-icon name="phone-o" />
      </div>
    </div>
    <div class="film-wrap">
      <!-- 背景 -->
      <div class="bg-bg">
        <div class="film-bg" ref="bg"></div>
        <div class="bg-arrow"></div>
      </div>
      <!-- 轮播 -->
      <div class="film-list">
        <cinema-swiper class="films" :slideNum="4" name="films">
          <cinema-swiper-item
            class="swiper-slide"
            v-for="(data, index) in films"
            :key="data.filmId"
          >
            <img
              :src="data.poster"
              class="img"
              @click="filmHandle(data)"
              @load="filmLoad(data, index)"
            />
          </cinema-swiper-item>
        </cinema-swiper>
      </div>
      <!-- 信息 -->
      <div class="film-info" v-if="info">
        <div class="film-header">
          {{ info.name }}<span>{{ info.grade }}<i>分</i></span>
        </div>
        <div class="film-des">
          {{ info.category }}
          | {{ info.runtime }}分钟
          <span v-for="(actor, index) in info.actors" :key="index"
            >| {{ actor.name }}
          </span>
        </div>
        <van-icon class="film-enter" name="arrow" @click="handlePage()" />
      </div>
      <!-- 时间表 -->
      <div class="film-showDate" v-if="info">
        <div class="film-showDate-head">
          <li
            v-for="item in info.showDate"
            :key="item.scheduleId"
            @click="getSchedules(item)"
          >
            {{ item | dateFilter }}
          </li>
        </div>
        <transition name="van-slide-left">

        <keep-alive>

        <div class="film-showDate-content">
           <li class="film-showDate-content-item" v-for="item in schedule" :key="item.scheduleId">
            <div class="date-left">
               <div>
              {{ item.showAt | timeFilter }}
               </div>
              <div>
              {{ item.endAt | timeFilter }}
              </div>
            </div>
            <div class="date-middle">
              <div>
              {{ item.filmLanguage }}
              {{ item.imagery }}
              </div>
              <div>
              {{ item.hallName }}
              </div>
            </div>
            <div class="date-right">
               <div>
                  ￥{{item.salePrice / 100}}
               </div>
               <div>
                  购票
               </div>
            </div>
          </li>
        </div>
        </keep-alive>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import http from '@/util/http'
// import { Toast } from 'vant'
import moment from 'moment'
import Vue from 'vue'
import CinemaSwiper from '@/components/cinemaDetail/CinemaSwiper'
import CinemaSwiperItem from '@/components/cinemaDetail/CinemaSwiperItem'
Vue.filter('dateFilter', (date) => {
  return moment(date * 1000).format('M月D日')
})
Vue.filter('timeFilter', (date) => {
  return moment(date * 1000).format('HH:mm')
})
export default {
  data () {
    return {
      cinema: {},
      films: {},
      info: {},
      active: 0,
      schedule: []
    }
  },
  components: {
    CinemaSwiper,
    CinemaSwiperItem
  },
  created () {
    http({
      url: `/gateway/?cinemaId=${this.$route.params.id}&k=2783822`,
      headers: {
        'X-Host': 'mall.film-ticket.cinema.info'
      }
    }).then((res) => {
      // console.log(res.data.data.cinema)
      this.cinema = res.data.data.cinema
    })
    http({
      url: `/gateway/?cinemaId=${this.$route.params.id}&k=2499546`,
      headers: {
        'X-Host': 'mall.film-ticket.film.cinema-show-film'
      }
    }).then((res) => {
      // console.log(res.data.data.films)
      this.films = res.data.data.films
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
    onClickLeft () {
      // Toast('返回')
      this.$router.push('/cinemas')
    },
    filmLoad (data, index) {
      // console.log(data)
      if (index === 0) {
        this.filmHandle(data)
      }
    },
    filmHandle (data) {
      // console.log(data)
      this.info = data
      this.getSchedules(this.info.showDate[0])
      // Toast('滑动了！')
      // this.infoshow = true
      // console.log(this.info.name)
      this.$refs.bg.style.background =
        'url(' + data.poster + ')' + 'center / cover no-repeat'
      this.$refs.bg.style.filter = 'blur(10px)'
      // this.$refs.bg.style.tansform = 'scale(5)'
      // console.log(this.info.actors)
      // console.log(data.filmId)
    },
    getSchedules (date) {
      // console.log(date)
      http({
        url: `/gateway/?filmId=${this.info.filmId}&cinemaId=${this.$route.params.id}&date=${date}&k=2499546`,
        // url: `/gateway/?filmId=6165&cinemaId=2800&date=1672675200&k=7901726`,
        headers: {
          'X-Host': 'mall.film-ticket.schedule.list'
        }
      }).then((res) => {
        console.log(res.data.data.schedules)
        this.schedule = res.data.data.schedules
      })
    },
    handlePage () {
      const id = this.info.filmId
      // console.log(id)
      this.$router.push({
        name: 'jack',
        params: {
          id
        }
      })
    }
  }
}
</script>

<style lang="scss">
#cinemadetail {
  width: 100%;
  background-color: #fff;
  position: relative;
  .van-nav-bar .van-icon,
  .van-nav-bar__text {
    color: #000;
  }
  .cinema-info {
    padding-top: 49px;
    color: #000;
    text-align: center;
    .cinemaName {
      font-size: 17px;
      margin: 10px auto;
    }
    ul {
      margin: 16px auto;
      padding-bottom: 16px;
      display: flex;
      flex-direction: row;
      justify-content: center;
      font-size: 9px;
      li {
        margin: 0 5px;
        padding: 0 5px;
        color: #ffb232;
        border: 1px solid #ffb232;
        border-radius: 1px;
      }
    }
    .address {
      // color: #555;
      width: 100%;
      font-size: 14px;
      padding: 16px;
      box-sizing: border-box;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      .van-icon {
        width: 20px;
        font-size: 20px;
        margin-right: 8px;
        color: #aaa;
      }
      span{
         // width: calc(100% - 40px);
         flex: 1;
         height: 20px;
         line-height: 20px;
         text-align: left;
         white-space: nowrap;
         overflow: hidden;
         text-overflow: ellipsis;
      }
    }
  }
  .film-wrap {
    ul {
      display: flex;
      flex: row;
      overflow: hidden;
      img {
        height: 130px;
        width: 90px;
        margin-left: 20px;
      }
    }
    // .film-bg{
    //    width: 100%;
    //    height: 160px;
    //    overflow: hidden;
    //    background-color: #ffb232;
    //    position: absolute;
    // }
    .bg-bg {
      width: 100%;
      height: 160px;
      overflow: hidden;
      position: absolute;
      .film-bg {
        width: 100%;
        height: 160px;
        background-color: #ffb232;
        position: absolute;
      }
      .bg-arrow {
        position: absolute;
        bottom: -2px;
        left: calc(50% - 10px);
        border: 10px solid;
        border-color: transparent transparent white;
      }
    }
    .film-list {
      width: 100%;
      // background-color: #555;
      padding-top: 15px;
      padding-bottom: 15px;
      position: relative;
      z-index: 0;
      .films {
        width: 100%;
        .swiper-slide {
          width: 100%;
          transform: scale(0.8);
          position: relative;
          padding: 0 auto;
          text-align: center;
          .img {
            height: 130px;
            width: 90px;
            position: relative;
            z-index: 10;
          }
        }
        .swiper-slide-active {
          transform: scale(1);
        }
      }
    }
    .film-info {
      margin: 10px auto;
      text-align: center;
      position: relative;
      .film-header {
        margin-top: 20px;
        margin-bottom: 8px;
        font-size: 16px;
        span {
          margin: 0 12px;
          color: #ffb232;
          i {
            font-size: 12px;
          }
        }
      }
      .film-des {
        margin: 0 auto;
        width: 18.75rem;
        height: 18px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 13px;
        color: #555;
      }
      .film-enter {
        color: #555;
        position: absolute;
        right: 16px;
        bottom: 1px;
        font-size: 12px;
      }
    }
    .film-showDate {
      .film-showDate-head {
        overflow: auto;
        width: 100%;
        height: 30px;
        white-space: nowrap;
        li {
          display: inline-block;
          // width: 30%;
          margin: 0 5px;
        }
      }
      .film-showDate-content-item{
         display: flex;
         justify-content: space-around;
         width: 100%;
         height: 74px;
         padding: 15px;
         box-sizing: border-box;
         .date-left{
            display: flex;
            width: 84px;
            flex-direction: column;
            div{
               height: 22px;
               line-height: 22px;
            }
            div:last-child{
               font-size: 14px;
               color: #aaa;
            }
         }
         .date-middle{
            display: flex;
            width: calc(100% - 184px);
            flex-direction: column;
            div{
               height: 22px;
               width: 100%;
               line-height: 22px;
               white-space: nowrap;
               overflow: hidden;
               text-overflow: ellipsis;
            }
            div:last-child{
               font-size: 14px;
               color: #aaa;
            }
         }
         .date-right{
            // height: 10px;
            width: 100px;
            color: red;
            display: flex;
            align-items: center;
            div{
               width: 50%;
               height: 22px;
               line-height: 22px;
            }
            div:last-child{
               text-align: center;
               padding: 2px;
               transform: scale(.8);
               border: 1px solid red;
               border-radius: 2px;
            }
         }
      }
    }
  }
}
</style>
