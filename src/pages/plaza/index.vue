<template>
  <view class="content">
    <!--?头部-->
    <HeaderPanel
      ref="headerPanelRef"
      @handleTabChange="handleTabChange"
      @scrollToTop="scrollToTop"
    ></HeaderPanel>
    <!--?主体-->
    <view
      v-if="componentVisible"
      class="inner-content"
      :style="{ height: `calc(100% - ${statusBarHeight * 2 + 204 + 116}rpx)` }"
      @touchstart="touchStart"
      @touchmove="touchMove"
      @touchend="touchEnd"
    >
      <!--关注-->
      <waterFallList
        ref="waterFallListFollowRef"
        type="follow"
        v-if="curPanel === 'follow'"
      ></waterFallList>
      <!--动态-->
      <waterFallList
        ref="waterFallListDynamicStateRef"
        type="dynamicState"
        v-if="curPanel === 'dynamicState'"
      ></waterFallList>
      <!--美食-->
      <foods ref="foodsRef" type="foods" v-if="curPanel === 'foods'"></foods>
      <!--兼职, 租房, 转卖-->
      <goods-list
        ref="goodsRef"
        :type="curPanel"
        v-if="['partTimeJob', 'tenement', 'resell'].includes(curPanel)"
      ></goods-list>
    </view>
    <!--?底部tab-->
    <tab-bar></tab-bar>
  </view>
</template>

<script setup>
  import TabBar from '@/components/TabBar.vue'
  import HeaderPanel from '@/components/plaza/HeaderPanel.vue'
  import { ref, onMounted } from 'vue'
  import waterFallList from '@/components/plaza/WaterFallList/WaterFallList.vue'
  import Foods from '@/components/plaza/Foods.vue'
  import GoodsList from '@/components/plaza/GoodsList.vue'
  import { useLogin } from '@/hooks/useLogin'
  import { useSlipDirection } from '@/hooks/useSlipDirection.js'

  import { login } from '@/api/api.js'
  import { useRequest } from '@/hooks/useRequest'
  import { getBoundInfo } from '@/utils'
  import { onLoad, onPageScroll } from '@dcloudio/uni-app'
  import { useRefreshComponent } from '@/hooks/useRefreshComponent'

  const { statusBarHeight } = getBoundInfo()
  const { refresh, componentVisible } = useRefreshComponent()

  const { touchStart, touchMove, touchEnd } = useSlipDirection(handleTouchMove)

  const curPanel = ref('follow')

  const headerPanelRef = ref(null)

  function handleTouchMove(direction) {
    headerPanelRef.value.setCurrent(direction)
  }

  /**
   * route query的方式传输curType, 就能默认设置当前tab
   */
  onLoad((options) => {
    curPanel.value = options?.curType || 'follow'
    onMounted(() => {
      headerPanelRef.value.setCurrentByCurType(curPanel.value)
      uni.$on('refreshPlazaData', () => {
        refresh()
      })
      // ?测试test
      /*curPanel.value = 'follow'
      console.log(119, headerPanelRef.value)
      headerPanelRef.value.setCurrent(curPanel.value)*/
    })
  })
  /**********************事件***********************/

  const handleTabChange = (tabActive) => {
    curPanel.value = tabActive
  }

  const waterFallListFollowRef = ref(null)
  const waterFallListDynamicStateRef = ref(null)
  const foodsRef = ref(null)
  const goodsRef = ref(null)
  const scrollToTop = () => {
    console.log('返回顶部')
    if (curPanel.value === 'follow') {
      waterFallListFollowRef.value.scrollToTop()
    } else if (curPanel.value === 'dynamicState') {
      waterFallListDynamicStateRef.value.scrollToTop()
    } else if (curPanel.value === 'foods') {
      foodsRef.value.scrollToTop()
    } else if (['partTimeJob', 'tenement', 'resell'].includes(curPanel.value)) {
      goodsRef.value.scrollToTop()
    }
  }
</script>

<style lang="scss">
  .content {
    display: flex;
    flex-direction: column;
    height: 100%;
    .inner-content {
      box-sizing: border-box;
      overflow-y: auto;
    }
  }
</style>
