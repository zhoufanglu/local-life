<script setup lang="js">
  import { useLogin } from '@/hooks/useLogin'

  const { onGetPhoneNumber } = useLogin()
</script>
<template>
  <view class="p-login-page">
    <!--    <button open-type="getPhoneNumber" @getphonenumber="onGetPhoneNumber"
      >唤起授权222</button
    >-->
    dsddd
  </view>
</template>

<style scoped lang="scss">
  .p-login-page {
    height: 100%;
    @include vertical-center;
  }
</style>
