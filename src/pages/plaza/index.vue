<template>
  <view class="content">
    {{ requestVariables.loading }}
    <tab-bar></tab-bar>
    <div>----</div>
    <van-cell-group>
      <van-cell title="单元格" value="内容" />
      <van-cell title="单元格" value="内容" label="描述信息" />
    </van-cell-group>
    <van-button type="primary" @click="handleRequest">模拟请求</van-button>
  </view>
</template>

<script setup>
  import TabBar from '@/components/TabBar.vue'
  import { login } from '@/api/api.js'
  import { useRequest } from '@/hooks/useRequest'

  const { requestVariables, getRequest } = useRequest(login, {
    filterOptions: {
      username: 'admin',
    },
    immediate: false,
  })
  const handleRequest = () => {
    getRequest()
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
