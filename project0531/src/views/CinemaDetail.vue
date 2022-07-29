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
          <!-- <div class="film-bg"  ref="bg"></div> -->
         <div class="bg-bg">
            <div class="film-bg"  ref="bg"></div>
            <div class="bg-arrow"></div>
         </div>
         <!-- 轮播 -->
         <div class="film-list">
            <cinema-swiper class="films" :slideNum="4" name="films">
               <cinema-swiper-item class="swiper-slide" v-for="(data, index) in films"
               :key="data.filmId">
                  <img :src="data.poster" class="img"
                  @load="imageLoad(data, index)" @click="imageChange(data)"
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
               <span v-for="(actor, index) in info.actors" :key="index">| {{actor.name}} </span>
            </div>
            <van-icon class="film-enter" name="arrow" @click="handlePage()"/>
         </div>
         <!-- 时间表 -->
         <div class="date-list" v-if="info">
            <div v-for="(date, index) in info.showDate" :key="date"
            :class="{'active' : index === active}" @click="active=index"
            >
            {{date | dateFilter}}
            </div>
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
      info: null,
      active: 0
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
      this.$router.push('/cinemas')
    },
    imageLoad (data, index) {
      // console.log(data)
      if (index === 0) {
        this.info = data
        this.$refs.bg.style.background = 'url(' + data.poster + ')' + 'center / cover no-repeat'
        this.$refs.bg.style.filter = 'blur(10px)'
        // this.$refs.bg.style.tansform = 'scale(5)'
      }
    },
    imageChange (data) {
      // console.log(data)
      this.info = data
      // Toast('滑动了！')
      // this.infoshow = true
      // console.log(this.info.name)
      this.$refs.bg.style.background = 'url(' + data.poster + ')' + 'center / cover no-repeat'
      this.$refs.bg.style.filter = 'blur(10px)'
      // this.$refs.bg.style.tansform = 'scale(5)'
      // console.log(this.info.actors)
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
         font-size: 17px;
         margin: 10px auto;
      }
      ul{
         margin: 16px auto;
         padding-bottom: 16px;
         display: flex;
         flex-direction: row;
         justify-content: center;
         font-size: 9px;
         li{
            margin: 0 5px;
            padding: 0 5px;
            color: #ffb232;
            border: 1px solid #ffb232;
            border-radius: 1px;
         }
      }
      .address{
         // color: #555;
         font-size: 14px;
         margin: 16px;
         display: flex;
         flex-direction: row;
         justify-content: space-between;
         .van-icon{
            font-size: 20px;
            margin-right: 8px;
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
      .bg-bg{
         width: 100%;
         height: 160px;
         overflow: hidden;
         position: absolute;
         .film-bg{
            width: 100%;
            height: 160px;
            background-color: #ffb232;
            position: absolute;
         }
         .bg-arrow{
            position: absolute;
            bottom: -2px;
            left: calc(50% - 10px);
            border: 10px solid;
            border-color: transparent transparent white;
         }
      }
      .film-list{
         width: 100%;
         // background-color: #555;
         padding-top: 15px;
         padding-bottom: 15px;
         position: relative;
         z-index: 0;
         .films{
            width: 100%;
            .swiper-slide{
               width: 100%;
               transform: scale(0.8);
               position: relative;
               padding: 0 auto;
               text-align: center;
               .img{
                  height: 130px;
                  width: 90px;
                  position: relative;
                  z-index: 10;
               }
            }
            .swiper-slide-active{
               transform: scale(1);
            }
         }
      }
      .film-info{
         margin: 10px auto;
         text-align: center;
         position: relative;
         .film-header{
            margin-top: 20px;
            margin-bottom: 8px;
            font-size: 16px;
            span{
               margin: 0 12px;
               color: #ffb232;
               i{
                  font-size: 12px;
               }
            }
         }
         .film-des{
            margin: 0 auto;
            width: 18.75rem;
            height: 18px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            font-size: 13px;
            color: #555;
         }
         .film-enter{
            color: #555;
            position: absolute;
            right: 16px;
            bottom: 1px;
            font-size: 12px;
         }
      }
      .date-list{
         // height: 49px;
         text-align: center;
         vertical-align: center;
         display: flex;
         flex-direction: row;
         // padding: 0 16px;
         overflow-x: auto;
         div{
            line-height: 49px;
            margin: 0 8px;
            width: 80px;
            // border-bottom: 2px solid #ffb232;
            // 控制flex子项的大小，使得子项不被压缩。
            flex-basis: 80px;
            flex-shrink: 0;

         }
      }
      // 隐藏滚动条
      .date-list{
         scrollbar-width: none;
         -ms-overflow-style: none;
      }
      .date-list::-webkit-scrollbar{
         display: none;
      }
   }
}
.active{
   border-bottom: 2px solid #ffb232;
}

</style>
