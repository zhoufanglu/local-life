<template>
  <view class="content">
    <!--?头部-->
    <HeaderPanel @handleTabChange="handleTabChange"></HeaderPanel>
    <!--?主体-->
    <waterFallList></waterFallList>
    <!--?底部tab-->
    <tab-bar></tab-bar>
  </view>
</template>

<script setup>
  import TabBar from '@/components/TabBar.vue'
  import HeaderPanel from '@/components/plaza/HeaderPanel.vue'
  import { ref, onMounted } from 'vue'
  import waterFallList from '@/components/plaza/WaterFallList/WaterFallList.vue'

  // import { showToast } from 'vant'
  import { login } from '@/api/api.js'
  import { useRequest } from '@/hooks/useRequest'
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
    @include vertical-center;
    flex-direction: column;
  }
</style>
