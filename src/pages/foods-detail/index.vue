<script setup>
  import TabBar from '@/components/TabBar.vue'
  import { getBoundInfo } from '@/utils/index.js'

  const { statusBarHeight } = getBoundInfo()

  const handleBack = () => {
    uni.navigateTo({
      url: `/pages/plaza/index?curType=foods`,
    })
  }
</script>
<script>
  export default {
    options: { styleIsolation: 'shared' },
  }
</script>
<template>
  <view class="p-foods-detail">
    <u-navbar title="" bgColor="#F8F8F8" @leftClick="handleBack"> </u-navbar>
  </view>
</template>

<style scoped lang="scss">
  .p-foods-detail {
  }
</style>
<style lang="scss">
  .p-foods-detail {
  }
</style>
