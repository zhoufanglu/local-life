<script setup>
  import { reactive } from 'vue'
  import { getBoundInfo } from '@/utils/index.js'
  import useStore from '@/store/app.js'
  const { boundTop, boundWidth } = getBoundInfo()
  const appStore = useStore()
  const variables = reactive({
    value: '',
  })

  const onSearch = () => {
    appStore.addHistoryRecord(variables.value)
    console.log(variables.value)
  }

  const clearRecords = () => {
    appStore.clearHistoryRecord()
  }

  const goHome = () => {
    uni.redirectTo({
      url: '/pages/plaza/index',
    })
  }

  const handleSearchClick = (item) => {
    console.log(27, item)
  }
</script>
<script>
  export default {
    options: { styleIsolation: 'shared' },
  }
</script>
<template>
  <view class="p-search" :style="{ paddingTop: boundTop + 'px' }">
    <view
      class="search-row"
      :style="{
        width: `calc(100% - ${boundWidth}px - 6px)`,
      }"
    >
      <view class="cancel" @click="goHome">取消</view>
      <u-search
        class="input-search"
        searchIconSize="40rpx"
        height="58rpx"
        placeholder="请输入"
        v-model="variables.value"
        actionText=""
        @search="onSearch"
      ></u-search>
    </view>
    <!--?历史记录-->
    <view class="history-panel">
      <view class="history-row">
        <view class="title">历史记录</view>
        <u-icon name="trash" size="24px" @click="clearRecords"></u-icon>
      </view>
      <view class="history-list">
        <view
          class="history-item"
          v-for="item in appStore.historyRecords"
          :key="item"
          @click="handleSearchClick(item)"
        >
          {{ item }}
        </view>
      </view>
    </view>
  </view>
</template>

<style scoped lang="scss">
  .p-search {
    background-color: white;
    box-sizing: border-box;
    height: 100vh;
    .search-row {
      display: flex;
      align-items: center;
      color: #666666;
      padding-left: 30rpx;
      box-sizing: border-box;
      .cancel {
        margin-right: 14rpx;
        white-space: nowrap;
      }
    }
    .title {
      font-size: 26rpx;
      color: #333333;
    }
    .history-panel {
      padding: 33rpx;
      display: flex;
      flex-direction: column;
      .history-row {
        @include vertical-center;
        justify-content: space-between;
      }
      .history-list {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        margin-top: 28rpx;
        .history-item {
          height: 56rpx;
          line-height: 56rpx;
          padding: 0 25rpx;
          background: #ffffff;
          box-shadow: 0rpx 0rpx 1rpx 0rpx rgba(0, 0, 0, 0.24);
          border-radius: 28rpx;
          font-size: 26rpx;
          color: #333333;
          max-width: 500rpx;
          margin-right: 25rpx;
          margin-bottom: 20rpx;
          @include ellipsis(1);
        }
      }
    }
  }
</style>
<style lang="scss">
  .p-search {
    .input-search {
      .u-search__content {
        width: 400rpx;
      }
    }
  }
</style>
