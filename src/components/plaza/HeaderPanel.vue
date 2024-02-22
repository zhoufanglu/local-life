<script setup>
  import { ref } from 'vue'
  import useStore from '@/store/app.js'
  import { getBoundInfo } from '@/utils/index.js'

  const appStore = useStore()
  const { statusBarHeight, boundWidth, boundTop } = getBoundInfo()

  const headerTabs = ref([
    { name: '关注', value: 'follow', index: 0 },
    { name: '动态', value: 'dynamicState', index: 1 },
    { name: '美食', value: 'foods', index: 2 },
    { name: '兼职', value: 'partTimeJob', index: 3 },
    { name: '租房', value: 'tenement', index: 4 },
    { name: '转卖', value: 'resell', index: 5 },
  ])

  const current = ref(3)

  const keyword = ref('')
  // ?事件
  const emit = defineEmits(['handleTabChange'])

  const handleTabClick = (item) => {
    current.value = item.index
    // current.value = item
    emit('handleTabChange', item.value)
  }

  const handleAdd = () => {
    console.log('add')
  }
  const handlePosition = () => {
    console.log('postion')
  }
</script>
<script>
  export default {
    options: { styleIsolation: 'shared' },
  }
</script>
<template>
  <view
    class="header-panel"
    :style="{ height: statusBarHeight * 2 + 204 + 'rpx' }"
  >
    <view
      class="search-row"
      :style="{
        marginTop: boundTop + 'px',
        width: `calc(100% - ${boundWidth}px - 6px)`,
      }"
    >
      <img
        @click="handlePosition"
        class="position-img"
        src="@/static/plaza/position.png"
        alt=""
      />
      <!--      <u-search
        class="search-input"
        placeholder="搜索你感兴趣的内容"
        v-model="keyword"
      ></u-search>-->

      <input type="text" placeholder="搜索你感兴趣的内容" v-model="keyword" />
      <img
        @click="handleAdd"
        class="add-img"
        :width="26"
        src="@/static/plaza/add.png"
        alt=""
      />
    </view>

    <view class="tab-row">
      <u-tabs
        :current="current"
        v-model="current"
        class="plaza-tabs-inner"
        :list="headerTabs"
        @click="handleTabClick"
        lineColor="white"
        lineWidth="60rpx"
        lineHeight="6"
        :scrollable="false"
        :activeStyle="{
          color: 'white',
          fontWeight: 'bold',
          transform: 'scale(1.05)',
          fontSize: '34rpx',
        }"
        :inactiveStyle="{
          color: 'white',
          transform: 'scale(1)',
          fontSize: '34rpx',
        }"
      ></u-tabs>
    </view>

    <!--
    <view class="tab-row">
      <van-tabs
        v-model:active="active"
        class="plaza-tabs"
        @change="handleChange"
      >
        <van-tab
          v-for="(tab, index) in headerTabs"
          :key="index"
          :title="tab.label"
          :name="tab.value"
        ></van-tab>
      </van-tabs>
    </view>
-->
  </view>
</template>

<style scoped lang="scss">
  .header-panel {
    // height: 204rpx !important;
    width: 100vw;
    background-color: #a26d37;
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    box-sizing: border-box;
    .search-row {
      padding: 0 20rpx;
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-sizing: border-box;

      input {
        box-sizing: border-box;
        background-color: white;
        width: 375rpx;
        height: 60rpx;
        line-height: 60rpx;
        font-size: 24rpx;
        border-radius: 29rpx;
        color: #999;
        padding: 8rpx 20rpx;
      }

      input::-webkit-input-placeholder {
        /* placeholder颜色 */
        color: #999;
        /* placeholder字体大小 */
        font-size: 24rpx;
      }

      .add-img {
        width: 26px;
        height: 26px;
      }
      .position-img {
        width: 36px * 0.7;
        height: 44px * 0.7;
      }
    }
    .tab-row {
      padding: 0 20rpx;
      box-sizing: border-box;
      width: 100%;
    }
  }
</style>
<style lang="scss">
  .header-panel {
    /*    .search-row {
      border: solid 1px red;
      display: flex;
      align-items: center;
      .van-field {
        width: 100%;
        color: white;
        font-size: 32rpx;
        border-radius: 29rpx;
        height: 58rpx;
        padding: 8rpx 20rpx;
        //padding: 20rpx 20rpx;
      }
      > .van-icon:first-child {
        margin-right: 25rpx !important;
      }
      > .van-icon:last-child,
      .add-img {
        margin-left: 25rpx;
      }
    }
    .plaza-tabs {
      // border: solid 1px red;
      .van-tabs__nav {
        background-color: #a26d37 !important;
        .van-tab__text {
          color: white !important;
          font-weight: normal !important;
          font-size: 32rpx;
        }
        .van-tabs__line {
          background-color: white !important;
        }
      }
    }*/
  }
</style>
