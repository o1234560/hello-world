<template>
  <div class="swiper">
    <div class="swiper-wrapper">
      <!-- <div class="swiper-slide">111</div>
      <div class="swiper-slide">222</div>
      <div class="swiper-slide">333</div> -->
      <slot></slot>
    </div>

    <div class="swiper-pagination"></div>
  </div>
</template>

<script>
import Swiper from 'swiper/bundle'
import 'swiper/css/bundle'
export default {
  mounted () {
    new Swiper('.swiper', {
      sidesPerView: 1,
      loop: true,
      effect: 'slide',
      autoplay: {
        delay: 3000,
        stopOnLastSlide: false,
        disableOnInteraction: true
      },
      pagination: {
        el: '.swiper-pagination'
      }
    })
  }
}
</script>
