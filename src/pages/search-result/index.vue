<script setup>
  import TabBar from '@/components/TabBar.vue'
  import { getBoundInfo } from '@/utils/index.js'

  const { statusBarHeight } = getBoundInfo()
  const handleBack = () => {
    uni.navigateTo({
      url: '/pages/plaza/index',
    })
  }
</script>
<script>
  export default {
    options: { styleIsolation: 'shared' },
  }
</script>
<template>
  <!--  :style="{ paddingTop: statusBarHeight * 2 + 'rpx' }"-->
  <view class="p-search-result">
    <u-navbar bgColor="#F8F8F8" @leftClick="handleBack"> </u-navbar>
  </view>
</template>

<style scoped lang="scss">
  .p-search-result {
  }
</style>
<style lang="scss">
  .p-search-result {
  }
</style>
