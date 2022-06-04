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
      default: 'jack'
    }
  },
  mounted () {
    // 方式一
    // new Swiper('.swiper', { // 使用 默认的 swiper 类名 .swiper
    //   slidesPerView: auto, // 根据 swiper-slide 的宽度自动设置
    //   spaceBetween: 15
    // })
    //
    // 方式二
    new Swiper('.' + this.name, { // 使用 自定义的 swiper 类名
      slidesPerView: this.slideNum, // 根据 传进来的参数 设置
      spaceBetween: 15 // swiper-slide的间距 和 swiper-silde的宽度 的 15% 一样
    })
  }
}
</script>
