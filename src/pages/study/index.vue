<script setup lang="ts">
  import TabBar from '@/components/TabBar.vue'
  import { getBoundInfo } from '@/utils/index.js'

  const { statusBarHeight } = getBoundInfo()
</script>
<template>
  <view class="p-study" :style="{ paddingTop: statusBarHeight * 2 + 'rpx' }">
    ?????
    <u-button class="test-btn">aaa</u-button>
    <tab-bar></tab-bar>
  </view>
</template>

<style scoped lang="scss">
  .p-study {
  }
</style>
<style lang="scss">
  .p-study {
    .test-btn {
      border: solid 1px red !important;
    }
  }
</style>
