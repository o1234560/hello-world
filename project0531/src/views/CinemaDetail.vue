<template>
  <div id="cinema-detail">
    <!-- 导航栏 -->
    <van-nav-bar left-arrow @click-left="handleBack" fixed z-index="99" />

    <!-- 影院信息 -->
    <div class="cinema-name">
      {{ cinema.name }}
    </div>
    <div class="cinema-service">
      <li v-for="(item, index) in cinema.services" :key="index">
        {{ item.name }}
      </li>
      <van-icon name="arrow" @click="toggleService()"></van-icon>
    </div>

    <div v-show="showService" class="show-service">
      <div class="serviceContent">
        <li v-for="(item, index) in cinema.services" :key="index">
          <div class="left">
            <span>{{ item.name }}</span>
          </div>
          <div class="right">{{ item.description }}</div>
        </li>
        <div class="serviceClose" @click="toggleService()">
          <van-icon name="close" size="30"></van-icon>
        </div>
      </div>
    </div>

    <div class="cinema-address">
      <van-icon name="location-o" />
      <span>{{ cinema.address }}</span>
      <van-icon name="phone-o" />
    </div>

    <!-- 电影信息 -->
    <!-- 背景 -->
    <div class="film-bg">
      <div ref="bg" class="bg-bg"></div>
      <div class="bg-fix"></div>
    </div>

    <!-- 图片 -->
    <div class="film-list">
      <div class="swiper1">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="film in films" :key="film.filmId">
            <img :src="film.poster" alt="图片加载失败" />
          </div>
        </div>
      </div>
    </div>

    <!-- 信息 -->
    <div class="film-info">
      <div class="film-info-head">
        {{ film.name }}
        <span>{{ film.grade }}分</span>
      </div>
      <div class="film-info-des">
        {{ film.category }}
        | {{ film.runtime }}分钟
        <span v-for="(person, index) in film.actors" :key="index">
          | {{ person.name }}
        </span>
      </div>
      <van-icon name="arrow" @click="handleToPage(film.filmId)" />
    </div>

    <!-- 日期表 -->
    <div class="date-list-box">
      <div class="date-list">
        <li
          v-for="(date, index) in film.showDate"
          :key="date"
          :ref="'date' + index"
          @click="getSchedule(date)"
        >
          {{ formatDate(date) }}
        </li>
      </div>
    </div>

    <!-- 放映时间表 -->
    <keep-alive>
      <div class="show-list" v-if="schedule.length !== 0">
        <li
          class="show-list-item"
          v-for="item in schedule"
          :key="item.scheduleId"
        >
          <div class="left">
            <span>{{ formatTime(item.showAt) }}</span>
            <span>{{ formatTime(item.endAt) }} 散场</span>
          </div>
          <div class="middle">
            <span>{{ item.filmLanguage }}{{ item.imagery }}</span>
            <span>{{ item.hallName }}</span>
          </div>
          <div class="right">
            <span>￥{{ item.salePrice / 100 }}</span>
            <span>购票</span>
          </div>
        </li>
        <div class="no-more">没有更多了</div>
      </div>
      <div class="show-list-empty" v-else>暂无场次</div>
    </keep-alive>
  </div>
</template>

<script>
import http from '@/util/http'
import Swiper from 'swiper'
import moment from 'moment'

export default {
  data () {
    return {
      cinema: {},
      showService: false,
      films: {},
      film: {},
      schedule: [],
      ready: false
    }
  },
  created () {
    this.getCinemaInfo()
    this.getFimeList()
  },
  mounted () {
    this.initSwiper()
  },
  updated () {
    this.$store.commit('hide')
  },
  methods: {
    getCinemaInfo () {
      // 获取影院信息
      http({
        url: `/gateway/?cinemaId=${this.$route.params.id}&k=${Math.floor(
          Math.random() * 10000000
        )}`,
        headers: {
          'X-Host': 'mall.film-ticket.cinema.info'
        }
      }).then((res) => {
        console.log(res.data.data.cinema)
        this.cinema = res.data.data.cinema
      })
    },
    getFimeList () {
      // 获取电影列表
      http({
        url: `/gateway/?cinemaId=${this.$route.params.id}&k=${Math.floor(
          Math.random() * 10000000
        )}`,
        headers: {
          'X-Host': 'mall.film-ticket.film.cinema-show-film'
        }
      }).then((res) => {
        // console.log(res.data.data.films)
        this.films = res.data.data.films
        this.handleFilm(0)
      })
    },
    getSchedule (date) {
      // 获取放映时间表
      // console.log(date)
      // return
      http({
        url: `/gateway/?filmId=${this.film.filmId}&cinemaId=${this.$route.params.id
          }&date=${date}&k=${Math.floor(Math.random() * 10000000)}`,
        headers: {
          'X-Host': 'mall.film-ticket.schedule.list'
        }
      }).then((res) => {
        // console.log(res.data.data.schedules)
        this.schedule = res.data.data.schedules
      })
    },
    initSwiper () {
      const vm = this
      new Swiper('.swiper1', {
        slidesPerView: 'auto',
        // spaceBetween: 10,
        slideToClickedSlide: true,
        centeredSlides: true,
        on: {
          // tap: function () {
          //   vm.handleFilm(this.activeIndex)
          // },
          slideChangeTransitionEnd: function () {
            vm.handleFilm(this.activeIndex)
          }
        }
      })
      // const swiper2 = new Swiper('.swiper2', {})
      // swiper1.controller.control = swiper2
    },
    handleBack () {
      this.$router.back()
    },
    handleFilm (index) {
      // console.log(index)
      const film = this.films[index]
      // console.log(film)
      this.film = film
      // console.log(film.showDate)
      this.getSchedule(film.showDate[0])
      this.$refs.bg.style.background = 'url(' + film.poster + ')'
      this.$refs.bg.style.filter = 'blur(20px)'
    },
    toggleService () {
      this.showService = !this.showService
    },
    handleToPage (id) {
      this.$router.push({
        name: 'jack',
        params: {
          id
        }
      })
    },
    formatDate (date) {
      moment.locale('zh-CN') // 选择语言环境，中文简体
      return moment(date * 1000).format('M月D日(dddd)')
    },
    formatTime (time) {
      return moment(time * 1000).format('HH:mm')
    }
  }
}
</script>

<style lang="scss" scoped>
#cinema-detail {
  width: 100%;
  padding-top: 46px;
  background: white;
  font-size: 17px;
}

.cinema-name {
  width: 100%;
  height: 44px;
  position: sticky;
  top: 0;
  z-index: 999;
  line-height: 44px;
  margin: 0 auto;
  text-align: center;
}

.cinema-service {
  display: flex;
  justify-content: center;
  color: #ffb232;
  font-size: 12px;
  align-items: center;
  li {
    margin: 4px;
    padding: 2px 6px;
    border: 1px solid #ffb232;
  }
}

.show-service {
  position: absolute;
  top: 0;
  z-index: 99999;
  width: 100vw;
  height: 100vh;
  background: rgba($color: #000, $alpha: 0.8);
  .serviceContent {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;
    height: 50%;
    width: 80%;
    top: 20%;
    background: #fff;
    margin: 0 auto;
    font-size: 14px;
    border-radius: 10px;
    li {
      padding: 10px;
      display: flex;
      .left {
        width: 80px;
        span {
          width: 50px;
          color: #ffb232;
          padding: 2px 6px;
          border: 1px solid #ffb232;
        }
      }
      .right {
        flex: 1;
      }
    }
    .serviceClose {
      position: absolute;
      bottom: -50px;
      right: calc(50% - 15px);
      color: #aaa;
    }
  }
}

.cinema-address {
  padding: 26px 16px 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #aaa;
  font-size: 20px;
  span {
    margin: 0 6px;
    flex: 1;
    color: #000;
    line-height: 20px;
    font-size: 14px;
    text-align: left;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}

.film-bg {
  width: 100%;
  height: 160px;
  overflow: hidden;
  // background-color: red;
  position: absolute;
  .bg-bg {
    width: 100%;
    height: 160px;
    position: relative;
  }
  .bg-fix {
    border: solid #fff;
    border-width: 10px;
    border-color: transparent transparent #fff transparent;
    position: absolute;
    bottom: 0;
    left: calc(50% - 5px);
  }
}

.film-list {
  .swiper1 {
    background: #fff;
    width: 100%;
    overflow: hidden;
    .swiper-slide {
      height: 130px;
      width: 90px;
      margin: 15px 5px;
      overflow: hidden;
      align-items: center;
      // border: 1px solid #000;
      transition: 300ms;
      transform: scale(0.8);
      img {
        width: 100%;
      }
    }
    .swiper-slide-active,
    .swiper-slide-duplicate-active {
      transform: scale(1);
    }
  }
}

.film-info {
  padding: 10px;
  text-align: center;
  position: relative;
  .film-info-head {
    padding: 10px;
    span {
      color: #ffb232;
    }
  }
  .film-info-des {
    width: 80%;
    margin: auto;
    font-size: 13px;
    color: #666;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .van-icon {
    position: absolute;
    top: 50%;
    left: 90%;
    font-size: 13px;
  }
}

.date-list-box {
  // 用于隐藏滚动条
  height: 49px;
  overflow: hidden;
}
.date-list {
  width: 100%;
  height: 49px;
  padding-bottom: 10px; // 用于隐藏滚动条
  display: flex;
  align-items: center;
  overflow-x: auto;
  li {
    margin: 0 10px;
    // width: 30%;
    font-size: 15px;
    white-space: nowrap;
  }
}

.show-list {
  .show-list-item {
    display: flex;
    justify-content: space-around;
    padding: 10px;
    border-bottom: 0.5px solid rgba($color: #aaa, $alpha: 0.1);
    div {
      overflow: hidden;
      align-self: center;
      span {
        width: 100%;
        height: 20px;
        line-height: 20px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      span:nth-child(2) {
        color: #666;
        font-size: 13px;
      }
    }
    .left {
      width: 84px;
      display: flex;
      flex-direction: column;
    }
    .middle {
      flex: 1;
      display: flex;
      flex-direction: column;
      flex-wrap: nowrap;
    }
    .right {
      width: 100px;
      color: red;
      align-self: center;
      display: flex;
      span:last-child {
        width: 50px;
        text-align: center;
        color: red;
        border: 1px solid red;
      }
    }
  }
}

.no-more {
  width: 100%;
  height: 50px;
  line-height: 50px;
  font-size: 13px;
  text-align: center;
  background: #f0f0f0;
  color: #aaa;
}

.show-list-empty {
  width: 100%;
  height: 100px;
  background: #eee;
  line-height: 100px;
  text-align: center;
}
</style>
