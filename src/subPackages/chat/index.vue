<script setup>
  import { registerInIM } from '@/api/modules/im'
  import { reactive } from 'vue'
  import { getBoundInfo } from '@/utils'

  const { boundTop } = getBoundInfo()

  const variables = reactive({
    username: 'sss',
    message: '',
    messageList: [],
  })

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
    getMessages()
  }
  load()

  function getMessages() {
    // test
    variables.messageList = [
      {
        header: {
          // 消息头
          no_persist: 0, // 是否不存储消息 0.存储 1.不存储
          red_dot: 1, // 是否显示红点计数，0.不显示 1.显示
          sync_once: 0, // 是否是写扩散，这里一般是0，只有cmd消息才是1
        },
        setting: 0, // 消息设置 消息设置是一个 uint8的数字类型 为1个字节，完全由第三方自定义 比如定义第8位为已读未读回执标记，开启则为0000 0001 = 1
        message_id: 122323343445, // 消息全局唯一ID
        client_msg_no: 'xxxxx', // 客户端消息编号，可用此字段去重
        message_seq: 1, // 消息序列号 （用户唯一，有序递增）
        from_uid: 'xxxx', // 发送者用户id
        channel_id: 'xxxx', // 频道ID
        channel_type: 2, // 频道类型 1.个人频道 2.群频道
        timestamp: 1223434512, // 消息10位到秒的时间戳
        payload: 'xxxx', // base64编码的消息内容
      },
      {
        header: {
          // 消息头
          no_persist: 0, // 是否不存储消息 0.存储 1.不存储
          red_dot: 1, // 是否显示红点计数，0.不显示 1.显示
          sync_once: 0, // 是否是写扩散，这里一般是0，只有cmd消息才是1
        },
        setting: 0, // 消息设置 消息设置是一个 uint8的数字类型 为1个字节，完全由第三方自定义 比如定义第8位为已读未读回执标记，开启则为0000 0001 = 1
        message_id: 122323343445, // 消息全局唯一ID
        client_msg_no: 'xxxxx', // 客户端消息编号，可用此字段去重
        message_seq: 1, // 消息序列号 （用户唯一，有序递增）
        from_uid: 'xxxx', // 发送者用户id
        channel_id: 'xxxx', // 频道ID
        channel_type: 2, // 频道类型 1.个人频道 2.群频道
        timestamp: 1223434512, // 消息10位到秒的时间戳
        payload: 'xxxx', // base64编码的消息内容
      },
    ]
  }

  /**********************event***********************/
  const handleSend = () => {
    console.log('send')
  }
</script>
<template>
  <view class="p-chat">
    <u-navbar
      :autoBack="true"
      :title="variables.username"
      :titleStyle="{ color: '#333', fontSize: '40rpx' }"
    >
    </u-navbar>
    <scroll-view :scroll-y="true" class="message-content">
      <!--?消息列表-->
      <template :key="index" v-for="(msg, index) in variables.messageList">
        <view class="message-item" :class="index / 2 ? 'left' : 'right'">
          <u-avatar
            class="avatar"
            src="https://www.logosc.cn/uploads/resources/2023/03/17/1679045108_thumb.jpg"
            :size="38"
            :border="false"
          ></u-avatar>
          <view class="message">xxx</view>
        </view>
      </template>
    </scroll-view>
    <div class="footer">
      <u-input
        class="u-send-message"
        placeholder="请输入内容"
        border="surround"
        v-model="variables.message"
      ></u-input>
      <view class="send-btn" @click="handleSend">发送</view>
    </div>
  </view>
</template>

<style scoped lang="scss">
  //env(safe-area-inset-top)
  //env(safe-area-inset-bottom)
  .p-chat {
    height: 100vh;
    box-sizing: border-box;
    .message-content {
      margin-top: calc(env(safe-area-inset-top) + 44px + 60px);
      height: calc(
        100vh - 44px - 50px - calc(env(safe-area-inset-top)) - env(
            safe-area-inset-bottom
          ) - 60px
      );
      //margin-top: 86rpx;
      // border: solid 1px red;
      // border: solid 1px red;
      display: flex;
      flex-direction: column;
      box-sizing: border-box;
      padding: 30rpx;
      .message-item {
        @include vertical-center;
        justify-content: flex-start;
        margin-bottom: 40rpx;
        .message {
          margin: 0 10rpx;
          padding: 24rpx;
          border-radius: 10rpx;
          box-shadow: 0rpx 0rpx 1rpx 0rpx rgba(0, 0, 0, 0.24);
          max-width: 452rpx;
          text-align: left;
        }
      }
      .left {
        .message {
          background-color: white;
          color: #333;
        }
      }
      .right {
        flex-direction: row-reverse;
        .message {
          background-color: $theme;
          color: white;
          text-align: right;
        }
      }
    }
    .footer {
      box-sizing: border-box;
      padding: 10rpx 20rpx;
      height: 100rpx;
      background-color: white;
      display: flex;
      position: fixed;
      bottom: env(safe-area-inset-bottom);
      width: 100%;
      align-items: center;
      .send-btn {
        @include vertical-center;
        justify-content: center;
        width: 120rpx;
        height: 60rpx;
        border-radius: 40rpx;
        font-size: 24rpx;
        color: white;
        background-color: $theme;
        margin-right: 20rpx;
      }
      .u-send-message {
        // border: solid 1px #333;
        background-color: #eee;
        border-radius: 40rpx;
        margin-right: 10rpx;
      }
    }
  }
</style>
