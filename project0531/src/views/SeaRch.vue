<template>
  <div id="search">
    <!-- search -->
    <van-search
      v-model="value"
      show-action
      placeholder="请输入搜索关键词"
      @search="onSearch"
      @cancel="onCancel"
    />
    <!-- {{value}} -->
    <div class="box">
      <ul v-if="value">
        <li v-for="data in computedList" :key="data.cinemaId"
        @click="handleChangePage(data.cinemaId)">
          <div class="left">
            <div>{{data.name}}</div>
            <div class="address">{{data.address}}</div>
          </div>
          <div class="right">
            <div style="color: red;">￥{{data.lowPrice/100}}起</div>
         </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      value: ''
    }
  },
  methods: {
    onSearch () {
      // this.$router.back()
    },
    onCancel () {
      this.$router.back()
    },
    handleChangePage (id) {
      this.$router.push({
        name: 'tom',
        params: {
          id
        }
      })
    }
  },
  computed: {
    computedList () {
      return this.$store.state.cinemaList.filter(item => item.name.toUpperCase()
        .includes(this.value.toUpperCase()) || item.address.toUpperCase()
        .includes(this.value.toUpperCase()))
    }
  },
  mounted () {
    if (this.$store.state.cinemaList.length === 0) {
      this.$store.dispatch('getCinemaData', this.$store.state.cityId)
    } else {
      // console.log('search 使用缓存')
    }
  }
}
</script>

<style lang="scss">
.van-search {
    padding: 14px 12px;
    .van-search__content{
      padding-left: 12px;
      border-radius: 2px;

    }
}
  .van-cell{
    font-size: 14px;
    line-height: 24px;
    padding: 10px 0px;
  }
  .van-search__action {
    padding: 0 8px;
    font-size: 14px;
    line-height: 34px;
  }
  .van-field__left-icon {
    margin-right: 4px;
}
.van-field__left-icon .van-icon, .van-field__right-icon .van-icon {
    display: block;
    font-size: 16px;
    line-height: inherit;
}
.van-icon-clear, .van-field-clear {
  font-size: 16px;
}
//组件元素大小控制不了时，关闭scoped，然后自己的设置才能起作用。
//组件库元素css需要在外边，不能在自己设置的css的里面，在里面不起作用。
.box{
  min-height: 740px;
  overflow: hidden;
  background-color: #fff;
  position: relative; //修正滚动条位置, 使得BetterScroll滚动条不溢出
  li{
    padding: 15px;
    font-size: 15px;
    display: flex;
    justify-content: space-between;
    .left{
      // flex: 4; // 两个flex不好用
      width: 18.4375rem;
      .address{
        max-width: 14rem;
        color: gray;
        font-size: 12px;
        margin-top: 5px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
    .right{
      flex: 1;
    }
  }
}
</style>
