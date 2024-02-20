<script setup>
  import { ref } from 'vue'

  const active = ref(getCurrentPath())

  const tabs = [
    {
      label: '广场',
      path: '/pages/plaza/index',
    },
    {
      label: '学习',
      path: '/pages/study/index',
    },
    {
      label: '消息',
      path: '/pages/message/index',
    },
    {
      label: '我的',
      path: '/pages/mine/index',
    },
  ]

  const onTabClick = (path) => {
    active.value = path
    uni.reLaunch({
      url: path,
      success: (res) => {
        /* console.log('---')
        active.value = path
        console.log(34, path)
        console.log(32, getCurrentPath())*/
      },
    })

    // console.log(active.value)

    /*uni.redirectTo({
      url: `/${val}`,
      animationType: 'none',
    })*/
  }

  function getCurrentPath() {
    // 获取当前页面栈
    const pages = getCurrentPages()

    // 获取当前页面对象
    const currentPage = pages[pages.length - 1]

    // 获取当前页面路径
    return `/${currentPage.route}`
  }
</script>
<template>
  <view class="tab-bar">
    <u-tabbar :value="active" :placeholder="false" :safeAreaInsetBottom="true">
      <u-tabbar-item
        @click="onTabClick(tab.path)"
        v-for="(tab, index) in tabs"
        :key="index"
        :name="tab.path"
        :text="tab.label"
        icon="home"
      ></u-tabbar-item>
    </u-tabbar>
    <!--
    <van-tabbar :active="active">
      <van-tabbar-item
        @click="onTabClick(tab.path)"
        v-for="(tab, index) in tabs"
        :key="index"
        icon="home-o"
        :name="tab.path"
        >{{ tab.label }}
      </van-tabbar-item>
    </van-tabbar>
-->
  </view>
</template>

<style scoped lang="scss">
  .tab-bar {
  }
</style>
