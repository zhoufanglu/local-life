<script setup>
  import { ref } from 'vue'
  const active = ref('plaza')
  const tabs = [
    {
      label: '广场',
      value: 'plaza',
    },
    {
      label: '学习',
      value: 'study',
    },
    {
      label: '消息',
      value: 'message',
    },
    {
      label: '我的',
      value: 'mine',
    },
  ]
</script>
<template>
  <view class="tab-bar">
    <van-tabbar v-model="active" route>
      <van-tabbar-item
        v-for="(tab, index) in tabs"
        :key="index"
        icon="home-o"
        :name="tab.value"
        replace
        :to="`/pages/${tab.value}/index`"
        >{{ tab.label }}
      </van-tabbar-item>
    </van-tabbar>
  </view>
</template>

<style scoped lang="scss">
  .tab-bar {
  }
</style>
