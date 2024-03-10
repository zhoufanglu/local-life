<script setup>
  import TabBar from '@/components/TabBar.vue'
  import GoodsList from '@/components/mine/GoodsList.vue'
  import OrderList from '@/components/mine/OrderList.vue'
  import { reactive } from 'vue'
  const variables = reactive({
    bgUrl: 'https://cdn.uviewui.com/uview/swiper/swiper3.png',
    gender: '男',
    username: '张三',
  })

  const tabs = reactive({
    current: 0,
    list: [
      { name: '动态', value: 'dynamicState', index: 0 },
      { name: '点赞', value: 'like', index: 1 },
      { name: '订单', value: 'order', index: 2 },
    ],
  })

  const handleTabClick = (item) => {
    tabs.current = item.index
  }
  const goEditProfile = () => {
    uni.navigateTo({
      url: '/pages/edit-profile/index',
    })
  }
  const goMineList = (type) => {
    uni.navigateTo({
      url: `/pages/mine-list/index?type=${type}`,
    })
  }
</script>
<template>
  <tab-bar></tab-bar>
  <div class="p-mine">
    <view class="mine-content">
      <!--?顶部-->
      <view
        class="mine-top"
        :style="{ backgroundImage: `url(${variables.bgUrl})` }"
      >
        <view class="avatar-row">
          <up-avatar
            :size="60"
            src="https://cdn.uviewui.com/uview/swiper/swiper3.png"
          ></up-avatar>
          <view class="btn" @click="goEditProfile">编辑资料</view>
        </view>
        <view class="username">{{ variables.username }}</view>
        <view class="follow-and-fans">
          <view @click="goMineList('follow')">
            <text>0</text>
            <text>关注</text>
          </view>
          <view @click="goMineList('fans')">
            <text>0</text>
            <text>粉丝</text>
          </view>
        </view>
        <view class="signature"> 这个人很懒,什么都没有留下。 </view>
      </view>
      <!--?内容-->
      <view class="mine-tabs">
        <u-tabs
          :current="tabs.current"
          class="mine-tabs-inner"
          :list="tabs.list"
          @click="handleTabClick"
          lineColor="#333"
          lineWidth="0"
          lineHeight="2"
          :scrollable="false"
          :activeStyle="{
            color: '#a26d37',
            fontWeight: 'bold',
            transform: 'scale(1.05)',
            fontSize: '32rpx',
          }"
          :inactiveStyle="{
            color: '#666',
            transform: 'scale(1)',
            fontSize: '32rpx',
          }"
        ></u-tabs>
        <u-divider style="width: 95%; margin: 0 auto"></u-divider>
        <view class="tab-inner-panel">
          <goods-list v-show="tabs.current !== 2"></goods-list>
          <order-list v-show="tabs.current === 2"></order-list>
        </view>
      </view>
    </view>
    <!--?-->
  </div>
</template>

<style scoped lang="scss">
  .p-mine {
    position: relative;
    box-sizing: border-box;
    .mine-content {
      position: relative;
      .mine-top {
        // no-repeat center center;
        background-size: cover;
        height: 543rpx !important;
        padding: 30rpx;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        padding-top: 163rpx;
        .avatar-row {
          align-items: center;
          justify-content: space-between;
          display: flex;
          .btn {
            @include vertical-center;
            width: 140rpx;
            height: 50rpx;
            background: #a26d37;
            border-radius: 8rpx;
            font-size: 26rpx;
            color: #ffffff;
          }
        }
        .username {
          @include text-shadow;
          font-size: 36rpx;
          color: #ffffff;
          text-shadow: 1px 2px 10px 0 rgba(0, 0, 0, 1);
          margin: 10rpx 0;
        }
        .follow-and-fans {
          margin: 20rpx 0;
          display: flex;
          align-items: center;
          > view {
            display: flex;
            margin-right: 40rpx;
            align-items: center;
            text {
              font-size: 28rpx;
              color: #ffffff;
              margin-right: 10rpx;
              @include text-shadow;
            }
            > text:first-child {
              font-weight: bold;
              font-size: 44rpx;
            }
          }
        }
        .signature {
          @include text-shadow;
          color: white;
        }
      }
      .mine-tabs {
        background: white;
        // border: solid 1px green;
        height: calc(100vh - 543rpx - 40rpx);
        box-sizing: border-box;
        padding: 30rpx;
        border-top-left-radius: 20px;
        border-top-right-radius: 20px;
        position: relative;
        top: -40rpx;
        .mine-tabs-inner {
          width: 50%;
        }
      }
      .tab-inner-panel {
        // border: solid 1px red;
        height: calc(100% - 44px);
        overflow-y: auto;
      }
    }
  }
</style>
