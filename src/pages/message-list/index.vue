<!--?关注，评论，点赞，列表-->
<script setup>
  import { ref } from 'vue'
  import { getBoundInfo } from '@/utils'
  import { onLoad } from '@dcloudio/uni-app'
  const { boundTop } = getBoundInfo()
  import followImg from '@/static/message/follow.png'
  import commentImg from '@/static/message/follow.png'
  import likeImg from '@/static/message/follow.png'

  const list = ref([
    'https://cdn.uviewui.com/uview/swiper/swiper3.png',
    'https://cdn.uviewui.com/uview/swiper/swiper2.png',
    'https://cdn.uviewui.com/uview/swiper/swiper1.png',
    'https://cdn.uviewui.com/uview/swiper/swiper1.png',
    'https://cdn.uviewui.com/uview/swiper/swiper1.png',
    'https://cdn.uviewui.com/uview/swiper/swiper1.png',
  ])

  let curType = ref('follow') // follow comment like
  onLoad((options) => {
    curType.value = options.type || 'follow'
  })

  const goDetail = () => {
    /*uni.navigateTo({
      url: '/pages/mine/index',
    })*/
  }
  const getTitle = () => {
    if (curType.value === 'follow') {
      return '关注'
    } else if (curType.value === 'comment') {
      return '评论'
    } else if (curType.value === 'like') {
      return '点赞'
    }
  }
  const getInfo = () => {
    if (curType.value === 'follow') {
      return '关注了你，快去看看吧'
    } else if (curType.value === 'comment') {
      return '评论了你，快去看看吧'
    } else if (curType.value === 'like') {
      return '点赞了你，快去看看吧！'
    }
  }
  const getUrl = () => {
    if (curType.value === 'follow') {
      return followImg
    } else if (curType.value === 'comment') {
      return commentImg
    } else if (curType.value === 'like') {
      return likeImg
    }
  }
</script>
<script>
  export default {
    options: { styleIsolation: 'shared' },
  }
</script>
<template>
  <!--  :style="{ paddingTop: statusBarHeight * 2 + 'rpx' }"-->
  <view class="p-message-list">
    <u-navbar
      bgColor="#A26D37"
      border="none"
      :autoBack="true"
      :title="getTitle()"
      leftIconColor="#fff"
      :titleStyle="{ color: '#fff', fontSize: '40rpx', fontWeight: 'bolder' }"
    >
    </u-navbar>
    <scroll-view
      class="u-scroll-view list user-message-list"
      :scroll-y="true"
      lower-threshold="100"
      :style="{
        marginTop: boundTop + 44 + 'px',
        height: `calc(100vh - ${boundTop + 44}px)`,
      }"
    >
      <view class="item" v-for="(item, index) in list" :key="index">
        <view class="pic-left" @click="goDetail">
          <u-avatar
            class="avatar"
            :src="getUrl()"
            :size="50"
            :border="false"
          ></u-avatar>
          <view class="user-info">
            <text>沃尔什</text>
            <text>{{ getInfo() }}</text>
          </view>
        </view>
        <view class="right">
          <text>{{ 10 }}分钟前</text>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<style lang="scss">
  .p-message-list {
    background: white;
    .list {
      // display: none !important;
      border-radius: 24rpx;
      background: white;
      box-sizing: border-box;
      padding: 32rpx 40rpx;
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
        align-items: center;
        justify-content: space-between;
        border-bottom: solid 1px #eee;
        padding-bottom: 40rpx;
        .pic-left {
          display: flex;
          align-items: center;
          .user-info {
            margin-left: 20rpx;
            display: flex;
            flex-direction: column;
            text:first-child {
              margin-bottom: 6rpx;
              font-size: 36rpx;
              color: #333333;
            }
            text:last-child {
              font-size: 26rpx;
              color: #333333;
            }
          }
        }
        .right {
          text {
            font-size: 20rpx;
            color: #999999;
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
    .cart-footer {
      // border: solid 1px red;
      background: white;
      height: 98rpx;
      position: fixed;
      bottom: 0;
      @include vertical-center;
      justify-content: space-between;
      width: 100%;
      padding-left: 40rpx;
      box-sizing: border-box;
      .btn {
        height: 100%;
        width: 200rpx;
        box-sizing: border-box;
        @include vertical-center;
        background-color: $theme;
        color: white;
      }
    }
  }
</style>
<style lang="scss">
  .p-message-list {
  }
</style>
