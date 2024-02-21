<template>
  <view class="content">
    <!--?头部-->
    <HeaderPanel @handleTabChange="handleTabChange"></HeaderPanel>
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

  // import { showToast } from 'vant'
  const { statusBarHeight } = getBoundInfo()

  import { login } from '@/api/api.js'
  import { useRequest } from '@/hooks/useRequest'
  import { getBoundInfo } from '@/utils'
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
  const curPanel = ref('foods')
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

  onMounted(() => {})
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
      border: solid 1px blue;
      overflow-y: auto;
    }
  }
</style>
