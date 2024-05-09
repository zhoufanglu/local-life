<script setup>
  import { useLogin } from '@/hooks/useLogin'

  const { onGetPhoneNumber } = useLogin('login')
</script>
<template>
  <view class="p-login-page">
    <button open-type="getPhoneNumber" @getphonenumber="onGetPhoneNumber"
      >授权手机</button
    >
  </view>
</template>

<style scoped lang="scss">
  .p-login-page {
    height: 100%;
    @include vertical-center;
  }
</style>
