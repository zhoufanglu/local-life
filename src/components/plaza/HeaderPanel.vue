<script setup>
  import { ref } from 'vue'
  import useStore from '@/store/app.js'
  import { getBoundInfo } from '@/utils/index.js'
  import dynamicState from '@/static/plaza/dynamicState.png'
  import partTimeJob from '@/static/plaza/partTimeJob.png'
  import tenement from '@/static/plaza/tenement.png'
  import resell from '@/static/plaza/resell.png'

  const appStore = useStore()
  const { statusBarHeight, boundWidth, boundTop } = getBoundInfo()

  const addList = ref([
    { name: '动态', value: 'dynamicState', src: dynamicState },
    { name: '兼职', value: 'partTimeJob', src: partTimeJob },
    { name: '租房', value: 'tenement', src: tenement },
    { name: '转卖', value: 'resell', src: resell },
  ])

  const headerTabs = ref([
    { name: '关注', value: 'follow', index: 0 },
    { name: '动态', value: 'dynamicState', index: 1 },
    { name: '美食', value: 'foods', index: 2 },
    { name: '兼职', value: 'partTimeJob', index: 3 },
    { name: '租房', value: 'tenement', index: 4 },
    { name: '转卖', value: 'resell', index: 5 },
  ])

  const current = ref(0)

  const keyword = ref('')
  // ?事件
  const emit = defineEmits(['handleTabChange'])

  const handleTabClick = (item) => {
    // current.value = item.value
    current.value = item.index
    emit('handleTabChange', item.value)
  }

  const handleAdd = () => {
    console.log('add')
  }

  const goSearch = () => {
    console.log('go-search')
    uni.navigateTo({
      url: '/pages/search/index',
    })
  }

  const goCreate = (val) => {
    uni.navigateTo({
      url: `/subPackages/create/index?type=${val}`,
    })
  }

  const handlePosition = () => {
    console.log('postion')
  }

  const setCurrent = (direction) => {
    if (direction === 'right') {
      current.value = current.value === 0 ? 0 : current.value - 1
    } else if (direction === 'left') {
      current.value = current.value === 5 ? 5 : current.value + 1
    }
    const value = headerTabs.value.find((i) => i.index === current.value).value
    emit('handleTabChange', value)
  }
  /**
   *
   * @param curType = follow, dynamicState, foods, partTimeJob, tenement, resell
   */
  const setCurrentByCurType = (curType) => {
    current.value = headerTabs.value.find((i) => i.value === curType).index
  }

  defineExpose({
    setCurrent,
    setCurrentByCurType,
  })
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

      <input
        @click.stop="goSearch"
        disabled
        type="text"
        placeholder="搜索你感兴趣的内容"
        v-model="keyword"
      />
      <uni-tooltip placement="bottom">
        <template #content>
          <view class="tip-content">
            <view
              v-for="(i, index) in addList"
              :key="index"
              @click="goCreate(i.value)"
            >
              <img class="logo" :src="i.src" alt="" />
              <text>{{ i.name }}</text>
            </view>
          </view>
        </template>
        <img
          @click="handleAdd"
          class="add-img"
          :width="26"
          src="@/static/plaza/add.png"
          alt=""
        />
      </uni-tooltip>
    </view>

    <view class="tab-row">
      <u-tabs
        :current="current"
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
        position: relative;
        top: 2px;
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
  }
  .tip-content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 300rpx;
    height: 432rpx;
    view {
      flex: 1;
      @include vertical-center;
      .logo {
        width: 50rpx;
        height: 50rpx;
        margin-right: 26rpx;
      }
      text {
        font-size: 32rpx;
        color: white;
      }
    }
  }
</style>
