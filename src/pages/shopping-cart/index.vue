<script setup>
  import { ref } from 'vue'
  import { getBoundInfo } from '@/utils'
  const { boundTop } = getBoundInfo()

  const list = ref([
    'https://cdn.uviewui.com/uview/swiper/swiper3.png',
    'https://cdn.uviewui.com/uview/swiper/swiper2.png',
    'https://cdn.uviewui.com/uview/swiper/swiper1.png',
    'https://cdn.uviewui.com/uview/swiper/swiper1.png',
    'https://cdn.uviewui.com/uview/swiper/swiper1.png',
    'https://cdn.uviewui.com/uview/swiper/swiper1.png',
    'https://cdn.uviewui.com/uview/swiper/swiper1.png',
    'https://cdn.uviewui.com/uview/swiper/swiper1.png',
    'https://cdn.uviewui.com/uview/swiper/swiper1.png',
    'https://cdn.uviewui.com/uview/swiper/swiper1.png',
    'https://cdn.uviewui.com/uview/swiper/swiper1.png',
    'https://cdn.uviewui.com/uview/swiper/swiper1.png',
    'https://cdn.uviewui.com/uview/swiper/swiper1.png',
  ])

  const cartChecks = ref([])
  const isCheckAll = ref(false)

  const handleBuy = () => {}

  const handleCheckAll = (val) => {
    if (val) {
      cartChecks.value = list.value.map((i, index) => index)
    } else {
      cartChecks.value = []
    }
  }
  const handelDel = (index) => {
    console.log(35, index)
  }
</script>
<script>
  export default {
    options: { styleIsolation: 'shared' },
  }
</script>
<template>
  <!--  :style="{ paddingTop: statusBarHeight * 2 + 'rpx' }"-->
  <view class="p-shopping-cart">
    <u-navbar
      bgColor="#A26D37"
      :border="none"
      :autoBack="true"
      title="购物车"
      leftIconColor="#fff"
      :titleStyle="{ color: '#fff' }"
    >
    </u-navbar>
    <scroll-view
      class="u-scroll-view cart-list"
      :scroll-y="true"
      lower-threshold="100"
      :style="{
        marginTop: boundTop + 44 + 'px',
        height: `calc(100vh - ${boundTop + 44}px - 100px)`,
      }"
    >
      <u-checkbox-group v-model="cartChecks" placement="row">
        <div class="item" v-for="(i, index) in list" :key="i">
          <view class="pic-left">
            <u-checkbox
              :name="index"
              activeColor="#A26D37"
              shape="circle"
            ></u-checkbox>
            <img
              class="pic"
              src="https://cdn.uviewui.com/uview/swiper/swiper2.png"
              mode="widthFix"
            />
          </view>

          <div class="info">
            <view class="top">
              <view class="title">
                <text>爆炸积极{{ index }}</text>
                <u-icon
                  name="trash"
                  size="28"
                  color="#A26D37"
                  @click="handelDel(index)"
                ></u-icon>
              </view>
              <view class="insert-info">
                <text>已售: {{ 100 }}件</text>
                <text>版本: 高级版本</text>
              </view>
            </view>
            <view class="bottom">
              <text>¥{{ 999 }}</text>
              <text></text>
            </view>
          </div>
        </div>
      </u-checkbox-group>
    </scroll-view>
    <view class="cart-footer">
      <view class="add-cart">
        <u-checkbox-group>
          <u-checkbox
            @change="handleCheckAll"
            :checked="isCheckAll"
            activeColor="#A26D37"
            shape="circle"
            label="全选"
          ></u-checkbox>
        </u-checkbox-group>
      </view>
      <view class="btn" @click="handleBuy" :isCheckAll="isCheckAll">结算</view>
    </view>
  </view>
</template>

<style lang="scss">
  .p-shopping-cart {
    background: white;
    .cart-list {
      // display: none !important;
      border-radius: 24rpx;
      background: white;
      box-sizing: border-box;
      padding: 32rpx;
      font-size: 28rpx;
      // margin: 20rpx;
      display: flex;
      flex-direction: column;
      color: #333333;
      // border: solid 1px red;
      overflow-y: auto;
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
        // border: solid 1px red;
        // height: 100px !important;
        width: 100%;
        box-sizing: border-box;
        margin-bottom: 30rpx;
        background-color: white;
        overflow: hidden;
        display: flex;
        align-items: center;
        border-bottom: solid 1px #eee;
        padding-bottom: 40rpx;
        .pic-left {
          display: flex;
          .pic {
            // border-radius: 8rpx;
            width: 205rpx;
            height: 268rpx !important;
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
  .p-shopping-cart {
  }
</style>
