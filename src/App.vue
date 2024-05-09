<script>
  export default {
    onLaunch: function () {
      // test
      uni.setStorageSync('token', 'Bearer test1')
      uni.setStorageSync('userNo', '123')
      // console.log('App Launch')
      // uni.hideTabBar()
    },
    onShow: function () {
      // console.log('App Show')
      /*uni.hideTabBar({
        animation: false,
      })*/
    },
    onHide: function () {
      // console.log('App Hide')
    },
  }
</script>

<style lang="scss">
  /*每个页面公共css */
  page {
    height: 100%;
    background-color: #f4f4f4;
  }
  view[hidden] {
    display: none;
  }
</style>
