<script setup>
  import comment from '@/components/foods-detail/Comment.vue'
  import { getBoundInfo, getElRectAsync } from '@/utils/index.js'
  import { onMounted, reactive, ref } from 'vue'
  import { onLoad } from '@dcloudio/uni-app'
  import { getFoodDetail } from '@/api/modules/social'

  const { boundTop } = getBoundInfo()
  const foodId = ref(-1)
  onLoad((options) => {
    const id = +options?.id
    foodId.value = id
    getFoodDetail({ id }).then(({ data }) => {
      variables.data = data
    })
  })

  const variables = reactive({
    data: {},
  })

  onMounted(() => {})

  const handleBack = () => {
    uni.navigateTo({
      url: `/pages/plaza/index?curType=foods`,
    })
  }

  const goAllGoods = () => {
    uni.navigateTo({
      url: `/pages/all-foods/index?id=${foodId.value}`,
    })
  }

  const refreshData = () => {
    getFoodDetail({ id: foodId.value }).then(({ data }) => {
      variables.data = data
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
        :list="variables.data.imageList"
        imgMode=""
        indicator
        indicatorMode="line"
        circular
      ></u-swiper>
      <view class="foods-panel">
        <text class="title">{{ variables.data.title }}</text>
        <view class="info">
          <view
            >{{ variables.data.foodCategory }}{{ '  ' }} 营业时间:
            {{ variables.data.foodOpenTime }}</view
          >
          <view>
            <view>
              <text>地址:{{ '  ' }} </text>
              <text class="address">{{ variables.data.foodAddress }}</text>
            </view>
            <text
              >({{
                variables.data?.commentRespVOPageResult?.total
              }}条评论)</text
            >
          </view>
        </view>
        <view class="position">
          <img src="@/static/detail/position.png" alt="" />
          <text>{{ variables.data.foodAddress }}</text>
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
      <div
        class="item"
        v-for="i in variables?.data?.foodItemDOPageResult?.list"
        :key="i"
      >
        <img class="pic" :src="i.coverImage" mode="widthFix" />
        <div class="info">
          <text class="title">{{ i.title }}</text>
          <view class="bottom">
            <text>{{ i.foodOpenTime }}</text>
            <text>$ {{ i.price }}</text>
          </view>
        </div>
      </div>
    </view>
    <!--?评论-->
    <view class="comment-panel">
      <comment
        :data="variables.data.commentRespVOPageResult"
        @refreshData="refreshData"
        :trendsId="variables.data.id"
        :publisher="variables.data.publisher"
      ></comment>
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
