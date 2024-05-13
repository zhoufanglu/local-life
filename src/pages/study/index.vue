<script setup>
  import TabBar from '@/components/TabBar.vue'
  import { getBoundInfo } from '@/utils/index.js'
  import { ref, reactive } from 'vue'
  import {
    getGoodsType as getGoodsTypeApi,
    getGoods as getGoodsApi,
  } from '@/api/modules/mall'
  const { boundTop, boundWidth } = getBoundInfo()

  const { statusBarHeight } = getBoundInfo()
  const status = ref('loading') // loadmore loading nomore

  const searchVal = ref('')

  getGoodsType()
  function getGoodsType() {
    getGoodsTypeApi().then((res) => {
      tabs.list = res.data.list.map((item, index) => {
        return { name: item.name, value: item.typeId, index }
      })
      getGoods()
    })
  }

  function getGoods() {
    getGoodsApi({
      typeId: tabs.list[tabs.current].value,
      // typeId: 1,
      page: 1, // 当前页面
      pageNum: 1000, // 页长
    }).then((res) => {
      // console.log(33, res.data.list)
      course.value = res.data.list
      status.value = course.value.length <= 10 ? 'nomore' : 'loadmore'
    })
  }

  const tabs = reactive({
    current: 0,
    list: [],
  })

  const course = ref()

  const onSearch = () => {}

  const handleTabClick = (item) => {
    tabs.current = item.index
    getGoods()
  }

  const goCart = () => {
    uni.navigateTo({
      url: `/pages/shopping-cart/index`,
    })
  }
  const goDetail = (item) => {
    console.log('goDetail', item.spuId)
    uni.navigateTo({
      url: `/pages/course-detail/index?spuId=${item.spuId}`,
    })
  }
  const loadMore = () => {
    console.log('load more')
  }
</script>
<script>
  export default {
    options: { styleIsolation: 'shared' },
  }
</script>
<template>
  <view class="p-study" :style="{ paddingTop: statusBarHeight * 2 + 'rpx' }">
    <!--?搜索row-->
    <u-navbar bgColor="#A26D37" leftIcon="" :autoBack="false">
      <template #center>
        <view class="row-content">
          <u-search
            class="input-search"
            searchIconSize="40rpx"
            height="58rpx"
            placeholder="请输入"
            v-model="searchVal"
            actionText=""
            @search="onSearch"
          ></u-search>
          <u-icon
            name="shopping-cart"
            color="#fff"
            size="32"
            @click="goCart"
          ></u-icon>
        </view>
      </template>
    </u-navbar>
    <!--?主体-->
    <view
      class="content"
      :style="{
        marginTop: boundTop + 'px',
        height: `calc(100vh - ${boundTop * 3 + 140}rpx)`,
      }"
    >
      <!--?tabs-->
      <view class="tab-row">
        <u-tabs
          :current="tabs.current"
          class="study-tabs-inner"
          :list="tabs.list"
          @click="handleTabClick"
          lineColor="#333"
          lineWidth="60rpx"
          lineHeight="2"
          :scrollable="true"
          :activeStyle="{
            color: '#333',
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
      </view>
      <!--?list-->
      <scroll-view
        class="follow-scroll-view"
        scroll-y="true"
        scroll-x="false"
        lower-threshold="150"
        @scrolltolower="loadMore"
      >
        <view class="panel">
          <view class="item" v-for="(i, index) in course" :key="index">
            <image
              src="https://cdn.uviewui.com/uview/swiper/swiper3.png"
            ></image>
            <view class="btn" @click="goDetail(i)">课程详情</view>
          </view>
        </view>
        <up-loadmore :status="status" />
      </scroll-view>
    </view>
    <tab-bar></tab-bar>
  </view>
</template>

<style scoped lang="scss">
  .p-study {
    .follow-scroll-view {
      display: flex;
      height: calc(100% - 46px);
    }
    .content {
      width: 100%;
      padding: 20rpx;
      padding-top: 0;
      box-sizing: border-box;
      .tab-row {
      }
      .panel {
        // border: solid 1px green;
        display: flex;
        flex-wrap: wrap;
        gap: 20rpx;
        box-sizing: border-box;
        padding-top: 20rpx;
        .item {
          width: calc(50% - 20rpx);
          height: 528rpx;
          background-color: #fff;
          border-radius: 20rpx;
          overflow: hidden;
          position: relative;
          @include vertical-center;
          image {
            width: 100%;
            height: 100%;
          }
          .btn {
            position: absolute;
            bottom: 54rpx;
            background-color: $theme;
            color: #fff;
            font-size: 36rpx !important;
            width: 260rpx;
            height: 90rpx;
            @include vertical-center;
            border-radius: 45rpx;
          }
        }
      }
    }
  }
</style>
<style lang="scss">
  .p-study {
    .row-content {
      box-sizing: border-box;
      display: flex;
      align-items: center;
      position: absolute;
      left: 20rpx;
      .input-search {
        margin-right: -70rpx !important;
        .u-search__content {
          width: 400rpx;
        }
      }
    }
  }
</style>
