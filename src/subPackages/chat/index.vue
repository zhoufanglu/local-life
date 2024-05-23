<script setup>
  import { registerInIM, sendMessage } from '@/api/modules/im'
  import { reactive, ref, nextTick } from 'vue'
  import { getBoundInfo, getTime } from '@/utils'
  import { onLoad } from '@dcloudio/uni-app'
  import { useChat } from '@/hooks/useChat'
  import { decode } from 'js-base64'
  import { getUserInfo as getUserInfoApi } from '@/api/modules/user'
  const { boundTop } = getBoundInfo()
  const scrollTop = ref(0)

  const variables = reactive({
    nickname: '',
    avatar: '', // 发送的对象的头像
    myAvatar: '', //自己的头像
    toUserNo: '',
    message: '',
    messageList: [],
    toView: '',
  })

  const toView = ref('')

  const getUserInfo = () => {
    uni.showLoading({
      title: '读取中...',
      mask: true,
    })
    getUserInfoApi({
      userId: uni.getStorageSync('userNo'),
    }).then(({ data }) => {
      variables.myAvatar = data.avatar
      getRecentMessage()
      uni.hideLoading()
      /*variables.nickname = data.nickname
      variables.bgUrl = data.background || '/static/mine/bg.jpeg'
      variables.mark = data.mark || "'这个人很懒，什么都没留下'"*/
    })
  }
  getUserInfo()

  onLoad((options) => {
    variables.toUserNo = options.toUserNo
    variables.nickname = options.nickname
    variables.avatar = options.avatar
    console.log('load')
    // ?链接ws
    connectWK_WK()
    // ?获取频道历史消息
    // getChanelHistoryMessages(variables.toUserNo)
  })

  const { connectWK_WK, sendMessageToUser, getRecentMessage } = useChat(
    variables,
    getAllMessageCallBack,
  )

  function getAllMessageCallBack(messageList) {
    // 过滤出当前讨论用户的人
    const curMessage = messageList.find(
      (i) => i.channel_id === variables.toUserNo,
    )

    variables.messageList = curMessage.recents.map((i) => {
      // 1、解析消息内容
      i.content = JSON.parse(decode(i.payload)).content
      // 2、拼上头像
      const senderId = uni.getStorageSync('userNo').toString()
      if (senderId === i.from_uid) {
        i.avatar = variables.myAvatar //拼上自己的头像
        i.userType = 'receiver'
      } else {
        i.avatar = variables.avatar
        i.userType = 'sender'
      }
      return {
        avatar: i.avatar,
        content: i.content,
        userType: i.userType,
        timestamp: getTime(i.timestamp),
      }
    })
    variables.messageList = variables.messageList.reverse()
    moveToBottom()
  }

  const moveToBottom = () => {}

  /**********************event***********************/
  const handleSend = () => {
    // console.log('send')
    if (!variables.message) {
      return false
    }
    const payload = {
      type: 1, // 消息类型 1.文本 2.图片
      content: variables.message, // 消息内容
    }
    sendMessageToUser(variables.toUserNo, variables.message)

    /*const params = {
      header: {
        // 消息头
        no_persist: 0, // 是否不存储消息 0.存储 1.不存储
        red_dot: 1, // 是否显示红点计数，0.不显示 1.显示
        sync_once: 0, // 是否是写扩散，这里一般是0，只有cmd消息才是1
      },
      // uid: variables.toUserNo,
      // token: uni.getStorageSync('token'),
      from_uid: uni.getStorageSync('userNo').toString(), // 发送者uid
      stream_no: '', // 流式消息编号，如果是流式消息，需要指定，否则为空
      channel_id: '', // 接收频道ID 如果channel_type=1 channel_id为个人uid 如果channel_type=2 channel_id为群id
      channel_type: 1, // 接收频道类型  1.个人频道 2.群聊频道
      payload: encode(payload), // 消息，base64编码，消息格式参考下面 【payload 内容参考】的链接
      // subscribers: ['uid123', 'uid234', '...'], // 订阅者 如果此字段有值，表示消息只发给指定的订阅者,没有值则发给频道内所有订阅者
    }
    sendMessage(params).then((res) => {
      console.log(12, res)
    })*/
  }
</script>
<template>
  <view class="p-chat">
    <u-navbar
      :autoBack="true"
      :title="variables.nickname"
      :titleStyle="{ color: '#333', fontSize: '40rpx' }"
    >
    </u-navbar>
    <scroll-view
      ref="scrollView"
      :scroll-y="true"
      id="scrollView"
      class="message-content scroll-view"
      :scroll-with-animation="true"
    >
      <!--?消息列表-->
      <template :key="index" v-for="(msg, index) in variables.messageList">
        <view
          class="message-item"
          :class="msg.userType === 'sender' ? 'left' : 'right'"
        >
          <u-avatar
            class="avatar"
            :src="msg.avatar"
            :size="38"
            :border="false"
          ></u-avatar>
          <view class="message">{{ msg.content }}</view>
        </view>
      </template>
      <view id="bottom" style="height: 1px"></view>
      <!-- 底部元素 -->
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
