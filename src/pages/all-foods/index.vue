<script setup>
  import { ref } from 'vue'
  import { getBoundInfo } from '@/utils'
  import { onLoad } from '@dcloudio/uni-app'
  import { getFoodDetail } from '@/api/modules/social'
  const { boundTop } = getBoundInfo()
  const foodsMenus = ref([])
  onLoad((options) => {
    const id = +options?.id
    getFoodDetail({ id }).then(({ data }) => {
      foodsMenus.value = data.foodItemDOPageResult.list
    })
  })
</script>
<script>
  export default {
    options: { styleIsolation: 'shared' },
  }
</script>
<template>
  <!--  :style="{ paddingTop: statusBarHeight * 2 + 'rpx' }"-->
  <view class="p-all-foods">
    <u-navbar bgColor="#F8F8F8" :autoBack="true" title="全部菜单"> </u-navbar>
    <view
      class="foods-list"
      :style="{
        marginTop: boundTop + 44 + 'px',
      }"
    >
      <div class="item" v-for="i in foodsMenus" :key="i">
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
  </view>
</template>

<style scoped lang="scss">
  .p-all-foods {
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
  }
</style>
<style lang="scss">
  .p-all-foods {
  }
</style>
