<template>
  <div class="swiper" :class="name">
  <!-- :class="name" 添加自己的类名，以区分不同的swiper组件 -->
    <div class="swiper-wrapper">
      <slot></slot>
    </div>

    <div class="swiper-pagination"></div>
  </div>
</template>

<script>
import Swiper from 'swiper/bundle'
import 'swiper/css/bundle'
export default {
  props: {
    slideNum: {
      type: Number,
      default: 3.5
    },
    name: {
      type: String,
      default: 'tom'
    }
  },
  mounted () {
    new Swiper('.' + this.name, { // 使用 自定义的 swiper 类名
      slidesPerView: this.slideNum, // 根据 传进来的参数 设置
      // spaceBetween: 40, // 不好用。不要和slideToClickedSlide同时使用，不要slidesPerView同时使用，和swiper-slide的间距 和 swiper-silde的宽度 的 15% 一样,
      slideToClickedSlide: true,
      centeredSlides: true,
      speed: 1000,
      // allowTouchMove: false, // 禁止滑动
      on: {
        slideChangeTransitionEnd: function () {
          // alert(this.activeIndex); // 切换结束时，告诉我现在是第几个slide

        }
      }
    })
  }
}
</script>
