<script setup>
  import TabBar from '@/components/TabBar.vue'
  import GoodsList from '@/components/mine/GoodsList.vue'
  import OrderList from '@/components/mine/OrderList.vue'
  import { reactive, ref } from 'vue'
  import { onBackPress, onLoad } from '@dcloudio/uni-app'
  import {
    getUserInfo as getUserInfoApi,
    getFansAndFollow as getFansAndFollowApi,
  } from '@/api/modules/user'
  import { getMyOrders as getMyOrdersApi } from '@/api/modules/mall'

  const variables = reactive({
    bgUrl: '',
    gender: '',
    username: '',
    mark: '这个人很懒，什么都没留下',
    fansList: [], // 粉丝列表
    followList: [], // 关注列表
  })

  const userType = ref('mine') // mine/other
  const searchUserNo = ref(Number(uni.getStorageSync('userNo')))

  const tabs = reactive({
    current: 0,
    list: [
      { name: '动态', value: 'dynamicState', index: 0 },
      { name: '点赞', value: 'like', index: 1 },
      { name: '订单', value: 'order', index: 2 },
    ],
  })
  // ?获取用户信息
  const getUserInfo = () => {
    getUserInfoApi({
      userId: searchUserNo.value,
    }).then(({ data }) => {
      variables.avatar = data.avatar
      variables.nickname = data.nickname
      variables.bgUrl = data.background || '/static/mine/bg.jpeg'
      variables.mark = data.mark || "'这个人很懒，什么都没留下'"
    })
  }
  // ?获得粉丝&关注 0=粉丝  1=关注
  const getFansAndFollow = () => {
    const params = {
      pageNo: 1,
      pageSize: 100,
      userId: searchUserNo.value,
    }
    getFansAndFollowApi({
      ...params,
      type: 0,
    }).then(({ data }) => {
      variables.fansList = data.list
    })
    getFansAndFollowApi({
      ...params,
      type: 1,
    }).then(({ data }) => {
      variables.followList = data.list
    })
  }

  // ?获取订单信息
  const orders = ref([])
  const getMyOrders = async () => {
    const { data } = await getMyOrdersApi({
      userNo: uni.getStorageSync('userNo'),
      page: 1,
      pageNum: 100,
    })
    orders.value = data.list
  }

  /*createCart({
    userNo: uni.getStorageSync('userNo'),
  }).then((res) => {
    const cartId = JSON.parse(res.data).cartId
    getOrders({
      cartId: cartId,
      userNo: uni.getStorageSync('userNo'),
    }).then(({ data }) => {
      orders.value = data.list
    })
  })*/

  // ?load
  const load = () => {
    getUserInfo()
    getFansAndFollow()
    if (userType.value === 'mine') {
      getMyOrders()
    }
  }
  /**********************event***********************/

  onLoad((options) => {
    userType.value = options?.userType || 'mine'
    searchUserNo.value = Number(
      options?.userNo || Number(uni.getStorageSync('userNo')),
    )
    if (searchUserNo.value === Number(uni.getStorageSync('userNo'))) {
      userType.value = 'mine'
    }
    if (userType.value === 'other') {
      tabs.list = [
        { name: '动态', value: 'dynamicState', index: 0 },
        { name: '点赞', value: 'like', index: 1 },
      ]
    }
    uni.$on('refreshData', () => {
      console.log('refresh-userinfo')
      getUserInfo()
    })
    load()
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
  const openConsole = () => {
    // const vConsole = new VConsole()
    // 打开调试
    uni.setEnableDebug({
      enableDebug: true,
    })
  }
  const goUserChat = () => {}
</script>
<template>
  <tab-bar v-if="userType === 'mine'"></tab-bar>
  <div class="p-mine">
    <view class="mine-content">
      <!--?顶部-->
      <view
        class="mine-top"
        :style="{ backgroundImage: `url(${variables.bgUrl})` }"
      >
        <view class="avatar-row">
          <!--          <img class="user_avatar" :src="variables.avatar" alt="" />-->
          <up-avatar :size="60" :src="variables.avatar"></up-avatar>
          <view class="btn" @click="goEditProfile" v-if="userType === 'mine'"
            >编辑资料</view
          >
          <view class="btn" v-if="userType === 'other'" @click="goUserChat"
            >私信一下</view
          >
        </view>
        <view class="username">{{ variables.nickname }}</view>
        <view class="follow-and-fans">
          <view @click="goMineList('follow')">
            <text>{{ variables.followList.length }}</text>
            <text>关注</text>
          </view>
          <view @click="goMineList('fans')">
            <text>{{ variables.fansList.length }}</text>
            <text>粉丝</text>
          </view>
        </view>
        <view class="signature" @click="openConsole()">
          {{ variables.mark }}
        </view>
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
          <goods-list
            v-if="tabs.current === 0"
            :type="0"
            :searchUserNo="searchUserNo"
          ></goods-list>
          <goods-list
            v-if="tabs.current === 1"
            :type="1"
            :searchUserNo="searchUserNo"
          ></goods-list>
          <order-list v-if="tabs.current === 2" :orders="orders"></order-list>
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
    // background-color: white;
    .mine-content {
      position: relative;
      .mine-top {
        // no-repeat center center;
        background-size: cover;
        // background: 100% 100% no-repeat;
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
          .user_avatar {
            width: 68rpx;
            height: 68rpx;
            border-radius: 50%;
            margin-right: 12rpx;
          }
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
          // border: solid 1px red;
          width: 50%;
          .u-tabs__wrapper__nav__item {
            /*border: solid 1px red;
            width: 80rpx;*/
          }
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
