<script setup>
  import WKSDK from 'wukongimjssdk'
  import { registerInIM } from '@/api/modules/im'

  const load = () => {
    registerInIM({
      uid: Number(uni.getStorageSync('userNo')), // 通信的用户唯一ID，可以随机uuid （建议自己服务端的用户唯一uid） （WuKongIMSDK需要）
      token: uni.getStorageSync('token'), // 校验的token，随机uuid（建议使用自己服务端的用户的token）（WuKongIMSDK需要）
      device_flag: 0, // 设备标识  0.app 1.web （相同用户相同设备标记的主设备登录会互相踢，从设备将共存）
      device_level: 1, // 设备等级 0.为从设备 1.为主设备
    }).then((res) => {
      console.log(12, res)
      console.log('注册成功')
    })
  }

  load()
</script>
<template>
  <view class="p-chat">chat</view>
</template>

<style scoped lang="scss">
  .test {
  }
</style>
