<template>
  <view class="content">
    <HeaderPanel @handleTabChange="handleTabChange"></HeaderPanel>
    <van-cell-group>
      <van-cell title="单元格" value="内容" />
      <van-cell title="单元格" value="内容" label="描述信息" />
    </van-cell-group>
    <van-button type="primary" @click="handleRequest">模拟请求</van-button>
    <tab-bar></tab-bar>
  </view>
</template>

<script setup>
  import TabBar from '@/components/TabBar.vue'
  import HeaderPanel from '@/components/plaza/HeaderPanel.vue'
  import { login } from '@/api/api.js'
  import { useRequest } from '@/hooks/useRequest'
  import useStore from '@/store/app.js'

  const appStore = useStore()

  const { requestVariables, getRequest } = useRequest(login, {
    filterOptions: {
      username: 'admin',
    },
    immediate: false,
  })
  const handleRequest = () => {
    getRequest()
  }
  const handleTabChange = (tabActive) => {
    console.log(32, tabActive)
  }
</script>

<style lang="scss">
  .content {
    color: $theme;
    @include vertical-center;
    flex-direction: column;
  }

  .logo {
    height: 200rpx;
    width: 200rpx;
    margin-top: 200rpx;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 50rpx;
  }

  .text-area {
    display: flex;
    justify-content: center;
  }

  .title {
    font-size: 36rpx;
    color: #8f8f94;
  }
</style>
