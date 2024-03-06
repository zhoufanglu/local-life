<script setup>
  import comment from '@/components/foods-detail/Comment.vue'
  import { getBoundInfo, getElRectAsync } from '@/utils/index.js'
  import { onMounted, reactive } from 'vue'

  const { boundTop } = getBoundInfo()

  const variables = reactive({
    data: {
      list: [
        'https://cdn.uviewui.com/uview/swiper/swiper3.png',
        'https://cdn.uviewui.com/uview/swiper/swiper2.png',
        'https://cdn.uviewui.com/uview/swiper/swiper1.png',
      ],
      title: '大萨达撒迪士',
      content:
        '威少：扣篮王威少的暴力扣篮不仅让球迷们大呼过瘾，更是在全联盟都有所名气。他拥有出色的身威少：扣篮王威少的暴力扣篮不仅让球迷们大呼过瘾，更是在全联盟都有所名气。他拥有出色的身体素质和爆发力，总能在比赛中奉献出令人震体素质和爆发力，总能在比赛中奉献出令人震威少：扣篮王威少的暴力扣篮不仅让球迷们大呼过瘾，更是在全联盟都有所名气。他拥有出色的身威少：扣篮王威少的暴力扣篮不仅让球迷们大呼过瘾，更是在全联盟都有所名气。他拥有出色的身体素质和爆发力，总能在比赛中奉献出令人震体素质和爆发力，总能在比赛中奉献出令人震',
      date: '2021-08-12',
    },
  })

  onMounted(() => {})

  const handleBack = () => {
    uni.navigateTo({
      url: `/pages/plaza/index?curType=foods`,
    })
  }

  const goAllGoods = () => {
    uni.navigateTo({
      url: '/pages/all-foods/index',
    })
  }
</script>
<script>
  export default {
    options: { styleIsolation: 'shared' },
  }
</script>
<template>
  <view class="p-foods-detail">
    <u-navbar
      class="foods-navbar"
      title=""
      bgColor="#F8F8F8"
      @leftClick="handleBack"
    >
    </u-navbar>
    <view
      class="foods-content"
      :style="{
        marginTop: boundTop + 44 + 'px',
      }"
    >
      <u-swiper
        height="370rpx"
        class="detail-swiper"
        :list="variables.data.list"
        imgMode=""
        indicator
        indicatorMode="line"
        circular
      ></u-swiper>
      <view class="foods-panel">
        <text class="title">{{ variables.data.title }}</text>
        <view class="info">
          <view>中餐{{ '  ' }} 营业时间: 15:55:32</view>
          <view>
            <view>
              <text>地址:{{ '  ' }} </text>
              <text class="address"
                >撒旦撒大大大撒大声地阿是多爽啊 撒啊迪士</text
              >
            </view>
            <text>(1条评论)</text>
          </view>
        </view>
        <view class="position">
          <img src="@/static/detail/position.png" alt="" />
          <text>12.3Km 洛杉矶快船主场篮球馆3232</text>
        </view>
      </view>
    </view>
    <!--?菜名列表-->
    <view class="foods-list">
      <view class="row" @click="goAllGoods">
        <text class="title">推荐菜</text>
        <view>
          <text>全部菜单 </text>
          <u-icon color="#666" size="18" name="arrow-right-double"></u-icon>
        </view>
      </view>
      <div class="item" v-for="i in variables.data.list" :key="i">
        <img
          class="pic"
          src="https://cdn.uviewui.com/uview/swiper/swiper2.png"
          mode="widthFix"
        />
        <div class="info">
          <text class="title">爆炸积极</text>
          <view class="bottom">
            <text>周一-周五</text>
            <text>¥ 24</text>
          </view>
        </div>
      </div>
    </view>
    <!--?评论-->
    <view class="comment-panel">
      <comment></comment>
    </view>
  </view>
</template>

<style scoped lang="scss">
  .p-foods-detail {
    .foods-content {
      // border: solid 1px red;
      position: relative;
      // border: solid 1px red;
      box-sizing: border-box;
      height: 100%;
      border-radius: 24rpx;
      background: white;
      margin: 20rpx;
      padding: 32rpx;
      font-size: 28rpx;
      .foods-panel {
        display: flex;
        flex-direction: column;
        padding: 30rpx;
        color: #333333;
        .title {
          font-size: 42rpx;
          color: #333333;
          margin: 30rpx 0;
        }
        .info {
          font-size: 26rpx;
          color: #222222;
          margin-bottom: 30rpx;
          display: flex;
          flex-direction: column;
          white-space: pre-wrap;
          > view:first-child {
            font-size: 26rpx;
            margin-bottom: 6rpx;
          }
          > view:last-child {
            font-size: 26rpx;
            display: flex;
            justify-content: space-between;
            > view {
              font-size: 26rpx;
              display: flex;
              align-items: center;
              .address {
                ///border: solid 1px red;
                width: 200rpx;
                @include ellipsis(1);
              }
            }
            > text {
              font-size: 26rpx;
              color: $theme;
            }
          }
        }
        .position {
          @include vertical-center;
          justify-content: space-between;
          image {
            width: 35rpx;
            height: 34rpx;
            margin-right: 20rpx;
          }
          text {
            @include ellipsis(1);
            width: 392rpx;
            font-size: 26rpx;
            color: #222222;
          }
        }
      }
    }
    .foods-list {
      // display: none !important;
      border-radius: 24rpx;
      background: white;
      padding: 32rpx;
      font-size: 28rpx;
      margin: 20rpx;
      display: flex;
      flex-direction: column;
      color: #333333;
      .row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20rpx;
        .title {
          font-weight: bolder;
          color: #333;
          font-size: 38rpx;
        }
        > view {
          display: flex;
          align-items: center;
          font-size: 34rpx;
          text {
            margin-right: 20rpx;
          }
        }
      }
      .item {
        box-sizing: border-box;
        margin-bottom: 30rpx;
        background-color: white;
        overflow: hidden;
        display: flex;
        align-items: center;
        border-bottom: solid 1px #eee;
        padding-bottom: 32rpx;
        .pic {
          // border-radius: 8rpx;
          width: 255rpx;
          height: 170rpx !important;
        }
        .info {
          width: calc(100% - 255rpx - 30rpx);
          // border: solid 1px red;
          display: flex;
          height: 170rpx !important;
          flex-direction: column;
          justify-content: space-between;
          box-sizing: border-box;
          padding: 8rpx;
          padding-left: 28rpx;
          .title {
            color: #333333;
            display: inline-block;
            @include ellipsis(1);
            font-size: 36rpx;
          }

          .bottom {
            @include vertical-center;
            justify-content: space-between;
            > text:first-child {
              color: #999999;
              font-size: 26rpx;
            }
            > text:last-child {
              font-size: 36rpx;
              color: $theme;
            }
          }
        }
      }
    }
    .comment-panel {
      border-radius: 24rpx;
      background: white;
      padding: 32rpx;
      font-size: 28rpx;
      margin: 20rpx;
      //border: solid 1px red;
    }
  }
</style>
<style lang="scss">
  .p-foods-detail {
  }
</style>
