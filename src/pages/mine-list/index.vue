<!--?关注和粉丝列表-->
<script setup>
  import { ref } from 'vue'
  import { getBoundInfo } from '@/utils'
  import { onLoad } from '@dcloudio/uni-app'
  import { getFansAndFollow as getFansAndFollowApi } from '@/api/modules/user'
  const { boundTop } = getBoundInfo()

  const list = ref([])

  let curType = ref('follow') // follow: 关注列表, fans: 粉丝列表

  const getFansAndFollow = () => {
    const params = {
      pageNo: 1,
      pageSize: 100,
    }
    getFansAndFollowApi({
      ...params,
      type: curType.value === 'follow' ? 1 : 0,
    }).then(({ data }) => {
      list.value = data.list
    })
  }

  onLoad((options) => {
    curType.value = options.type || 'follow'
    getFansAndFollow()
  })

  const goUserDetail = () => {
    uni.navigateTo({
      url: '/pages/mine/index',
    })
  }
</script>
<script>
  export default {
    options: { styleIsolation: 'shared' },
  }
</script>
<template>
  <!--  :style="{ paddingTop: statusBarHeight * 2 + 'rpx' }"-->
  <view class="p-mine-list">
    <u-navbar
      bgColor="#A26D37"
      border="none"
      :autoBack="true"
      :title="curType === 'follow' ? '关注' : '粉丝'"
      leftIconColor="#fff"
      :titleStyle="{ color: '#fff' }"
    >
    </u-navbar>
    <scroll-view
      class="u-scroll-view list"
      :scroll-y="true"
      lower-threshold="100"
      :style="{
        marginTop: boundTop + 44 + 'px',
        height: `calc(100vh - ${boundTop + 44}px)`,
      }"
    >
      <view class="item" v-for="(item, index) in list" :key="index">
        <view class="pic-left" @click="goUserDetail">
          <u-avatar
            class="avatar"
            :src="item.avatar"
            :size="50"
            :border="false"
          ></u-avatar>
          <text>{{ item.nickname }}</text>
        </view>
        <view class="right">
          <view class="followed" v-if="curType === 'follow'">已关注</view>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<style lang="scss">
  .p-mine-list {
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
          text {
            margin-left: 20rpx;
          }
        }
        .right {
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
  .p-mine-list {
  }
</style>
