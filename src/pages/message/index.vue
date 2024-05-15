<script setup>
  import TabBar from '@/components/TabBar.vue'
  import followImg from '@/static/message/follow.png'
  import commentImg from '@/static/message/follow.png'
  import likeImg from '@/static/message/follow.png'
  import message from '@/static/message/message.png'
  import { reactive, ref } from 'vue'
  import { getBoundInfo } from '@/utils'

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
        url: `/pages/mine-list/index?type=${type}`,
      })
    } else {
      console.log('通知')
    }
  }
  // ?用户列表
  const list = ref([1, 2, 3, 4, 5, 6, 7, 8])
  const goUserMessageDetail = (i) => {}
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
      :titleStyle="{ color: '#fff' }"
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
      <view class="user-message-list"></view>
      <scroll-view
        class="u-scroll-view list"
        :scroll-y="true"
        lower-threshold="100"
      >
        <view class="item" v-for="(i, index) in list" :key="index">
          <view class="pic-left" @click="goUserMessageDetail(i)">
            <u-avatar
              class="avatar"
              src="@/static/plaza/add.png"
              :size="50"
              :border="false"
            ></u-avatar>
            <view class="user-info">
              <view class="text-row">
                <text class="username">沃尔什</text>
                <text class="text">大萨达算多爽啊是的都是大萨达</text>
              </view>
            </view>
          </view>
          <view class="right">
            <text>2024-05-14 </text>
          </view>
        </view>
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
      .user-message-list {
        // border: solid 1px red;
      }
      .list {
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
