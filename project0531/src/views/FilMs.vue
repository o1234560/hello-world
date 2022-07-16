<template>
  <div>
    <!-- <film-swiper>
      <film-swiper-item>
        <div>
          <img src="https://pic.maizuo.com/usr/movie/c151962e41cb282f09b7855261841da7.jpg" />
        </div>
      </film-swiper-item>
      <film-swiper-item>
        <div>
          <img src="https://pic.maizuo.com/usr/movie/d8419057142d94750cfcbaa69f5fd16b.jpg" />
        </div>
      </film-swiper-item>
      <film-swiper-item>
        <div>
          <img src="https://pic.maizuo.com/usr/movie/594ded98490b61549be7ecb5a9355b79.jpg" />
        </div>
      </film-swiper-item>
    </film-swiper> -->
    <film-header class="sticky"></film-header>
    <router-view></router-view>
  </div>
</template>

<script>
// import FilmSwiper from '@/components/films/FilmSwiper.vue'
// import FilmSwiperItem from '@/components/films/FilmSwiperItem.vue'
import FilmHeader from '@/components/films/FilmHeader.vue'
export default {
  components: {
    // FilmSwiper,
    // FilmSwiperItem,
    FilmHeader
  }
}
</script>

<style lang="scss" scoped>
 .swiper{
   width: 100%;
   height: 12.5rem;
   img{
    //  margin-top: -10%;
     width: 100%;
   }
 }
  .sticky{
    position: sticky;
    top: 0rem;
  }
</style>
