<script setup>
  import { getBoundInfo, getElRectAsync } from '@/utils/index.js'
  import { onMounted, reactive } from 'vue'
  import { onLoad } from '@dcloudio/uni-app'
  import { addGoodInCart, createCart, getGoodDetail } from '@/api/modules/mall'

  const { boundTop, boundHeight } = getBoundInfo()

  const variables = reactive({
    data: {},
    curData: {},
    curType: '基础课程',
  })

  onMounted(() => {})

  onLoad((options) => {
    const spuId = +options?.spuId
    getGoodDetail({ spuId }).then((res) => {
      variables.data = res.data
      setCurData()
      console.log(34, variables.curData)
    })
  })

  const handleBack = () => {
    uni.navigateBack({
      delta: 1,
    })
  }
  const handleTypeChange = (type) => {
    variables.curType = type
    setCurData()
  }
  const setCurData = () => {
    variables.curData = variables.data.skuList.find(
      (item) => item.goodsName === variables.curType,
    )
    console.log(39, variables.curData)
  }

  const handleCart = () => {
    // ?1 获取购物车id
    createCart({
      userNo: uni.getStorageSync('userNo'),
    }).then((res) => {
      const { cartId } = JSON.parse(res.data)
      // ?2 添加物品到购物车
      addGoodInCart({
        cartId: cartId,
        skuId: variables.curData.skuId,
        goodsName: variables.curData.goodsName,
        num: 1,
      }).then((res) => {
        uni.$u.toast('加入成功')
        console.log(49, res)
      })
    })
  }
  const handleBuyNow = () => {
    console.log(45, variables.curData)

    uni.navigateTo({
      url: '/pages/shopping-cart/index',
    })
  }
</script>
<script>
  export default {
    options: { styleIsolation: 'shared' },
  }
</script>
<template>
  <view class="p-course-detail">
    <view
      class="top-row"
      :style="{
        top: boundTop + 'px',
        height: boundHeight + 'px',
      }"
    >
      <u-icon
        @click="handleBack"
        name="arrow-left"
        color="white"
        size="28"
      ></u-icon>
    </view>
    <view class="course-content">
      <!--      <img
        src="http://124.223.32.35:48080/admin-api/infra/file/4/get/c1f26a1478517a085875791545dbebb5c777ac0e21d29fafc62785304be2627d.jpg"
        alt=""
        style="width: 100px; height: 100px"
      />-->
      <u-swiper
        height="700rpx"
        class="detail-swiper"
        :list="variables.data.skuImageList"
        imgMode=""
        indicator
        indicatorMode="line"
        circular
      ></u-swiper>
      <view class="course-info">
        <view class="row-1">
          <text>{{ variables.curData.goodsName }}</text>
          <text>已售 {{ variables.curData.saleNum }} 件</text>
        </view>
        <text class="info">{{ variables.curData.goodsDesc }}</text>
        <text class="course-price">¥{{ variables.curData.goodsPrice }}</text>
      </view>
      <u-divider style="width: 90%; margin: 0 auto"></u-divider>
      <view class="version">
        <text>版本</text>
        <view class="panel">
          <view
            class="version-item"
            :class="variables.curType === '基础课程' ? 'active' : ''"
            @click="handleTypeChange('基础课程')"
          >
            基础课程
          </view>
          <view
            class="version-item"
            :class="variables.curType === '高级课程' ? 'active' : ''"
            @click="handleTypeChange('高级课程')"
          >
            高级课程
          </view>
        </view>
      </view>
    </view>
    <view class="footer-content">
      <view class="add-cart" @click="handleCart">
        <img src="@/static/detail/shopping-cart.png" alt="" />
      </view>
      <view class="btn" @click="handleBuyNow">立即购买</view>
    </view>
  </view>
</template>

<style scoped lang="scss">
  .p-course-detail {
    position: relative;
    .top-row {
      // border: solid 1px red;
      box-sizing: border-box;
      display: flex;
      padding-left: 36rpx;
      position: absolute;
      z-index: 222;
    }
    .course-content {
      // border: solid 1px red;
      z-index: -1;
      // border: solid 1px red;
      box-sizing: border-box;
      height: 100vh;
      width: 100%;
      font-size: 28rpx;
      .course-info {
        display: flex;
        flex-direction: column;
        padding: 30rpx;
        background-color: white;
        .row-1 {
          display: flex;
          justify-content: space-between;
          > text:first-child {
            color: #333;
            font-size: 30rpx;
          }
          > text:last-child {
            color: #999;
            font-size: 24rpx;
          }
        }
        .info {
          color: #999;
          font-size: 24rpx;
          margin-top: 23rpx;
        }
        .course-price {
          color: #000000;
          font-size: 36rpx;
          margin-top: 40rpx;
        }
      }
      .version {
        padding: 30rpx;
        background-color: white;
        > text {
          color: #333;
          font-size: 30rpx;
        }
        .panel {
          display: flex;
          margin-top: 30rpx;
        }
        .version-item {
          width: 154rpx;
          height: 54rpx;
          @include vertical-center;
          color: #999;
          border: solid 1px #999;
          font-size: 26rpx;
          margin-right: 40rpx;
        }
        .active {
          color: #000;
          border: solid 1px #000;
        }
      }
    }
    .footer-content {
      background: white;
      height: 98rpx;
      position: fixed;
      bottom: 0;
      @include vertical-center;
      justify-content: space-between;
      width: 100%;
      .add-cart {
        width: 123rpx;
        height: 100%;
        @include vertical-center;
        image {
          width: 44rpx;
          height: 40rpx;
        }
      }
      .btn {
        height: 100%;
        width: calc(100% - 123rpx);
        @include vertical-center;
        background-color: $theme;
        color: white;
      }
    }
  }
</style>
<style lang="scss">
  .p-course-detail {
  }
</style>
