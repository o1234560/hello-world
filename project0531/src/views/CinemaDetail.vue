<template>
  <div id="cinemadetail">
      <van-nav-bar
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
      />
      <div class="cinema-info" v-if="cinema">
         <div class="cinemaName">{{cinema.name}}</div>
         <ul>
            <li v-for="data in cinema.services" :key="data.name">{{data.name}}</li>
         </ul>
         <div class="address"><span><van-icon name="location-o" />{{cinema.address}}</span><van-icon name="phone-o" /></div>
      </div>
      <div class="film-wrap">
         <!-- <ul>
            <li v-for="data in films" :key="data.filmId">{{data.poster}}</li>
            <img v-for="data in films" :key="data.filmId" :src="data.poster" />
         </ul> -->
         <!-- 背景 -->
         <div class="film-bg"></div>
         <!-- 轮播 -->
         <div class="film-list">
            <cinema-swiper class="films" :slideNum="4" name="films">
               <cinema-swiper-item class="swiper-slide" v-for="data in films"
               :key="data.filmId">
                  <img :src="data.poster" class="img"
                  @click="change(data)"
                  />
               </cinema-swiper-item>
            </cinema-swiper>
         </div>
         <!-- 信息 -->
         <div class="film-info" v-if="info">
            <div class="film-header">{{info.name}}<span>{{info.grade}}<i>分</i></span></div>
            <div class="film-des">
               {{info.category}}
               | {{info.runtime}}分钟
               <span v-for="actor in info.actors" :key="actor.name">| {{actor.name}} </span>
            </div>
            <van-icon class="film-enter" name="arrow" @click="handlePage()"/>
         </div>
         <!-- 时间表 -->
         <div class="date-list" v-if="info">
            <div v-for="date in info.showDate" :key="date">{{date | dateFilter}}</div>
         </div>
         <div class="schedule-list"></div>
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
  return moment(date * 1000).format('MM月DD日')
})
export default {
  data () {
    return {
      cinema: null,
      films: null,
      info: null
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
    }).then(res => {
      // console.log(res.data.data.cinema)
      this.cinema = res.data.data.cinema
    })
    http({
      url: `/gateway/?cinemaId=${this.$route.params.id}&k=2499546`,
      headers: {
        'X-Host': 'mall.film-ticket.film.cinema-show-film'
      }
    }).then(res => {
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
      this.$router.back()
    },
    change (data) {
      // console.log(data)
      this.info = data
      // Toast('滑动了！')
      // this.infoshow = true
      // console.log(this.info.name)
    },
    handlePage () {
      const id = this.info.filmId
      console.log(id)
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
#cinemadetail{
   width: 100%;
   background-color: #fff;
   position: relative;
   .van-nav-bar .van-icon,.van-nav-bar__text{
      color: #000;
   }
   .cinema-info{
      color: #000;
      text-align: center;
      .cinemaName{
         font-size: 1.0625rem;
         margin: .625rem auto;
      }
      ul{
         margin: 1rem auto;
         padding-bottom: 1rem;
         display: flex;
         flex-direction: row;
         justify-content: center;
         font-size: .5625rem;
         li{
            margin: 0 .3125rem;
            padding: 0 .3125rem;
            color: #ffb232;
            border: .0625rem solid #ffb232;
            border-radius: .0625rem;
         }
      }
      .address{
         // color: #555;
         font-size: .875rem;
         margin: 1rem;
         display: flex;
         flex-direction: row;
         justify-content: space-between;
         .van-icon{
            font-size: 1.25rem;
            margin-right: 0.5rem;
            color: #555;
         }
      }
   }
   .film-wrap{
      ul{
         display: flex;
         flex: row;
         overflow:hidden;
         img{
            height: 8.125rem;
            width: 5.625rem;
            margin-left: 1.25rem;
         }
      }
      .film-bg{
         width: 100%;
         height: 10rem;
         background-color: #ffb232;
         position: absolute;
      }
      .film-list{
         width: 100%;
         padding-top: .9375rem;
         .films{
            width: 100%;
            .swiper-slide{
               transform: scale(0.8);
               position: relative;
               .img{
                  height: 8.125rem;
                  width: 5.625rem;
                  position: relative;
                  z-index: 999;
               }
            }
            .swiper-slide-active{
               transform: scale(1);
            }

         }
      }
      .film-info{
         margin: .625rem auto;
         text-align: center;
         position: relative;
         .film-header{
            margin-top: 1.25rem;
            margin-bottom: 0.5rem;
            font-size: 1rem;
            span{
               margin: 0 .75rem;
               color: #ffb232;
               i{
                  font-size: .75rem;
               }
            }
         }
         .film-des{
            margin: 0 auto;
            width: 18.75rem;
            height: 1.125rem;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            font-size: .8125rem;
            color: #555;
         }
         .film-enter{
            color: #555;
            position: absolute;
            right: 1rem;
            bottom: .0625rem;
            font-size: .75rem;
         }
      }
      .date-list{
         height: 3.0625rem;
         text-align: center;
         vertical-align: center;
         display: flex;
         flex-direction: row;
         padding: 0 1rem;
         div{
            line-height: 3.0625rem;
            margin: 0 1rem;
            // width: 5rem;
            border-bottom: .125rem solid #ffb232;
         }
      }
   }
}

</style>
