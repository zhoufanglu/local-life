<script setup>
  import TabBar from '@/components/TabBar.vue'
  import followImg from '@/static/message/follow.png'
  import commentImg from '@/static/message/comment.png'
  import likeImg from '@/static/message/like.png'
  import message from '@/static/message/message.png'
  import { decode } from 'js-base64'
  import { onLoad, onPullDownRefresh } from '@dcloudio/uni-app'
  import { onBeforeUnmount, reactive, ref } from 'vue'
  import { getBoundInfo, getTime } from '@/utils'
  import { useChat } from '@/hooks/useChat'
  import { getUserInfoByIds } from '@/api/modules/user'
  import { getConversation } from '@/api/modules/im'
  import { MessageText, Channel, WKSDK } from 'wukongimjssdk'

  onLoad(() => {
    uni.$on('refreshData', () => {
      getRecentMessage()
    })
  })

  const { connectWK_WK, getRecentMessage, listener } = useChat(
    {},
    getAllMessageCallBack,
  )
  const { boundTop } = getBoundInfo()
  const menuList = reactive([
    {
      title: '点赞',
      type: 'like',
      img: likeImg,
    },
    {
      title: '评论',
      type: 'comment',
      img: commentImg,
    },
    {
      title: '关注',
      type: 'follow',
      img: followImg,
    },
    {
      title: '通知',
      type: 'message',
      img: message,
    },
  ])
  const goMineList = (type) => {
    if (type !== 'message') {
      uni.navigateTo({
        url: `/pages/message-list/index?type=${type}`,
      })
    } else {
      console.log('通知')
    }
  }

  /***********************WK 会话 -----S**********************/
  /*// ?链接ws
  connectWK_WK()
  // ?最近会话数据源
  WKSDK.shared().config.provider.syncConversationsCallback = async () => {
    // 后端提供的获取最近会话列表的接口数据 然后构建成 Conversation对象数组返回
    let conversations = []
    const { data } = await getConversation({
      uid: uni.getStorageSync('userNo').toString(), // 当前登录用户uid
      version: 0, //  当前客户端的会话最大版本号(从保存的结果里取最大的version，如果本地没有数据则传0)，
      // last_msg_seqs: 'xxx:2:123|xxx:1:3434', //   客户端所有频道会话的最后一条消息序列号拼接出来的同步串 格式： channelID:channelType:last_msg_seq|channelID:channelType:last_msg_seq  （此字段非必填，如果不填就获取全量数据，填写了获取增量数据，看你自己的需求。）
      msg_count: 2000, // 每个会话获取最大的消息数量，一般为app点进去第一屏的数据
    })
    conversations = data
    return conversations
  }
  // ?同步最近会话
  const conversations = await WKSDK.shared().conversationManager.sync({})
  console.log(67, conversations)
  /!*try {
    listener()
    const conversations = await WKSDK.shared().conversationManager.sync({})
  } catch (e) {
    console.log(e)
  }*!/
  const conversationListen = (conversation, action) => {
    console.log(51, conversation)
    if (action === conversation.add) {
      // 新增最近会话
    }
  }
  WKSDK.shared().conversationManager.addConversationListener(conversationListen)

  onBeforeUnmount(() => {
    WKSDK.shared().conversationManager.removeConversationListener(
      conversationListen,
    )
  })*/
  /***********************WK 会话 -----E**********************/

  getRecentMessage()
  // ?用户列表
  const messageList = ref([])

  function getAllMessageCallBack(res) {
    messageList.value = res.filter((msg) => {
      if (/^\d+$/.test(msg.channel_id)) {
        msg.content = JSON.parse(decode(msg.recents[0].payload)).content
        return msg
      }
    })
    const ids = messageList.value.map((msg) => msg.channel_id)
    uni.showLoading({
      title: '读取中...',
      mask: true,
    })
    // 根据获取到的id进行拼接
    getUserInfoByIds({ userIdListStr: ids.join(',') }).then(({ data }) => {
      messageList.value = messageList.value.map((msg, index) => {
        // 找出id相同
        return {
          ...msg,
          ...data.find((i) => i.id === Number(msg.channel_id)),
        }
      })
      console.log(70, messageList.value)
      uni.hideLoading()
    })
  }

  const goUserMessageDetail = (i) => {
    uni.navigateTo({
      url: `/subPackages/chat/index?toUserNo=${i.channel_id}&nickname=${i.nickname}&avatar=${i.avatar}`,
    })
  }

  onPullDownRefresh(() => {
    console.log('refresh')
    getRecentMessage()
  })

  onBeforeUnmount(() => {
    uni.$off('refreshData')
  })
</script>
<script>
  export default {
    options: { styleIsolation: 'shared' },
  }
</script>
<template>
  <tab-bar></tab-bar>
  <div class="p-message-index">
    <u-navbar
      bgColor="#A26D37"
      border="none"
      :autoBack="false"
      title="消息"
      leftIconColor="#A26D37"
      :titleStyle="{ color: '#fff', fontSize: '40rpx', fontWeight: 'bolder' }"
    >
    </u-navbar>
    <view
      class="content"
      :style="{
        marginTop: boundTop + 44 + 'px',
        height: `calc(100vh - ${boundTop + 44}px - 15rpx)`,
      }"
    >
      <view class="state-panel">
        <view
          class="item has-value"
          v-for="i in menuList"
          :key="i.title"
          @click="goMineList(i.type)"
        >
          <up-badge class="dot" :isDot="false" type="error"></up-badge>
          <image :src="i.img" alt="" />
          <text>{{ i.title }}</text>
        </view>
      </view>
      <view class="user-message-messageList"></view>
      <scroll-view
        class="u-scroll-view messageList"
        :scroll-y="true"
        lower-threshold="100"
      >
        <view
          class="item"
          @click="goUserMessageDetail(i)"
          v-for="(i, index) in messageList"
          :key="index"
        >
          <view class="pic-left">
            <u-avatar
              class="avatar"
              :src="i.avatar"
              :size="50"
              :border="false"
            ></u-avatar>
            <view class="user-info">
              <view class="text-row">
                <text class="username">{{ i.nickname }}</text>
                <text class="text">{{ i.content }}</text>
              </view>
            </view>
          </view>
          <view class="right">
            <text>{{ getTime(i.timestamp * 1000) }}</text>
          </view>
        </view>
        <view
          style="font-size: 12px; text-align: center"
          v-if="messageList.length === 0"
          >暂无消息</view
        >
      </scroll-view>
    </view>
  </div>
</template>

<style scoped lang="scss">
  .p-message-index {
    background: #f0f2f5;
    .content {
      // border: solid 1px red;
      box-sizing: border-box;
      .state-panel {
        height: 223rpx;
        width: 100%;
        @include vertical-center;
        padding: 55rpx 60rpx;
        background: white;
        box-sizing: border-box;
        border-radius: 26rpx;
        margin-bottom: 20rpx;
        .item {
          display: flex;
          flex-direction: column;
          flex: 1;
          align-items: center;
          position: relative;
          .dot {
            z-index: 1;
            position: absolute;
            right: 40rpx;
            top: 0;
          }
          .has-value {
          }
          image {
            width: 80rpx;
            height: 80rpx;
            margin-bottom: 10rpx;
          }
          text {
            font-size: 24rpx;
          }
        }
      }
      .user-message-messageList {
        // border: solid 1px red;
      }
      .messageList {
        // display: none !important;
        // height: calc(100vh - 223rpx - 15rpx);
        border-radius: 24rpx;
        background: white;
        box-sizing: border-box;
        padding: 32rpx 40rpx;
        padding-bottom: 200rpx;
        font-size: 28rpx;
        // margin: 20rpx;
        display: flex;
        flex-direction: column;
        color: #333333;
        // border: solid 1px red;
        overflow-y: auto;
        .item {
          // border: solid 1px red;
          // height: 100px !important;
          width: 100%;
          box-sizing: border-box;
          margin-bottom: 30rpx;
          background-color: white;
          overflow: hidden;
          display: flex;
          justify-content: space-between;
          border-bottom: solid 1px #eee;
          padding-bottom: 40rpx;
          .pic-left {
            display: flex;
            align-items: center;
            .user-info {
              margin-left: 20rpx;
              // border: solid 1px red;
              .text-row {
                display: flex;
                flex-direction: column;
                .username {
                  font-size: 36rpx;
                  color: #333;
                }
                .text {
                  margin-top: 20rpx;
                  @include ellipsis(1);
                  color: #666;
                  font-size: 28rpx;
                }
              }
            }
            /*text {
              margin-left: 20rpx;
            }*/
          }
          .right {
            text {
              color: #999999;
              font-size: 20rpx;
            }
            .followed {
              color: $theme;
              font-size: 26rpx;
              border-radius: 20px;
              padding: 3px 12px;
              @include vertical-center;
              border: solid 1px $theme;
            }
          }
          .info {
            width: calc(100% - 205rpx - 30rpx);
            // border: solid 1px red;
            display: flex;
            height: 268rpx !important;
            flex-direction: column;
            justify-content: space-between;
            box-sizing: border-box;
            padding: 8rpx;
            padding-left: 38rpx;
            .top {
              display: flex;
              flex-direction: column;
              .title {
                // border: solid 1px red;
                width: 100%;
                @include vertical-center;
                justify-content: space-between;
                text {
                  color: #333333;
                  display: inline-block;
                  @include ellipsis(1);
                  font-size: 36rpx;
                }
              }
              .insert-info {
                display: flex;
                flex-direction: column;
                // border: solid 1px red;
                text {
                  color: #999999;
                  font-size: 26rpx;
                  margin-top: 12rpx;
                }
              }
            }

            .bottom {
              @include vertical-center;
              justify-content: space-between;
              > text:first-child {
                color: #333;
                font-size: 34rpx;
                font-weight: bolder;
              }
              > text:last-child {
                font-size: 36rpx;
                color: $theme;
              }
            }
          }
        }
      }
    }
  }
</style>
