<template>
  <view class="content">
    <!--?头部-->
    <HeaderPanel
      ref="headerPanelRef"
      @handleTabChange="handleTabChange"
    ></HeaderPanel>
    <!--?主体-->
    <div
      class="inner-content"
      :style="{ height: `calc(100% - ${statusBarHeight * 2 + 204 + 100}rpx)` }"
    >
      <!--关注-->
      <waterFallList v-if="curPanel === 'follow'"></waterFallList>
      <!--动态-->
      <waterFallList v-if="curPanel === 'dynamicState'"></waterFallList>
      <!--美食-->
      <foods v-if="curPanel === 'foods'"></foods>
      <!--兼职, 租房, 转卖-->
      <goods-list
        :type="curPanel"
        v-if="['partTimeJob', 'tenement', 'resell'].includes(curPanel)"
      ></goods-list>
    </div>
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

  // import { showToast } from 'vant'
  const { statusBarHeight } = getBoundInfo()

  import { login } from '@/api/api.js'
  import { useRequest } from '@/hooks/useRequest'
  import { getBoundInfo } from '@/utils'
  import { onLoad } from '@dcloudio/uni-app'
  /*const appStore = useStore()

  const { requestVariables, getRequest } = useRequest(login, {
    filterOptions: {
      username: 'admin',
    },
    immediate: false,
  })
  const handleRequest = () => {
    getRequest()
  }*/
  const curPanel = ref('follow')
  let list = ref([])
  //?test
  list.value = [
    {
      isLike: false,
      likes: 100,
      avatar:
        'https://pbs.twimg.com/media/F9NmsLia0AAw49i?format=jpg&name=900x900',
      bg: 'https://pbs.twimg.com/media/F9NmsLia0AAw49i?format=jpg&name=900x900',
    },
    {
      isSmall: true,
      isLike: false,
      likes: 100,
      avatar:
        'https://pbs.twimg.com/media/F9NmsLia0AAw49i?format=jpg&name=900x900',
      bg: 'https://pbs.twimg.com/media/F9NmsLia0AAw49i?format=jpg&name=900x900',
    },
    {
      isLike: false,
      likes: 100,
      avatar:
        'https://pbs.twimg.com/media/F9NmsLia0AAw49i?format=jpg&name=900x900',
      bg: 'https://pbs.twimg.com/media/F9NmsLia0AAw49i?format=jpg&name=900x900',
    },
    {
      isLike: false,
      likes: 100,
      avatar:
        'https://pbs.twimg.com/media/F9NmsLia0AAw49i?format=jpg&name=900x900',
      bg: 'https://pbs.twimg.com/media/F9NmsLia0AAw49i?format=jpg&name=900x900',
    },
    {
      isLike: false,
      likes: 100,
      avatar:
        'https://pbs.twimg.com/media/F9NmsLia0AAw49i?format=jpg&name=900x900',
      bg: 'https://pbs.twimg.com/media/F9NmsLia0AAw49i?format=jpg&name=900x900',
    },
    {
      isLike: false,
      likes: 100,
      avatar:
        'https://pbs.twimg.com/media/F9NmsLia0AAw49i?format=jpg&name=900x900',
      bg: 'https://pbs.twimg.com/media/F9NmsLia0AAw49i?format=jpg&name=900x900',
    },
  ]

  const headerPanelRef = ref(null)
  /**
   * route query的方式传输curType, 就能默认设置当前tab
   */
  onLoad((options) => {
    curPanel.value = options.curType || 'follow'
    onMounted(() => {
      headerPanelRef.value.setCurrent(curPanel.value)
    })
  })
  /**********************事件***********************/
  const goUserInfo = () => {
    console.log('user')
  }

  const handleLikeClick = (index, isLike) => {
    list.value[index].isLike = !isLike
    let likes = list.value[index].likes
    list.value[index].likes = !isLike ? ++likes : --likes
    console.log(list.value[0])
    // showToast(!isLike ? '取消点赞' : '点赞成功')
  }

  const handleTabChange = (tabActive) => {
    curPanel.value = tabActive
  }
</script>

<style lang="scss">
  .content {
    display: flex;
    flex-direction: column;
    height: 100%;
    .inner-content {
      box-sizing: border-box;
      // border: solid 1px blue;
      overflow-y: auto;
    }
  }
</style>
