<script setup>
  import { ref } from 'vue'
  import plaza from '@/static/tab-bar/plaza.png'
  import plazaActive from '@/static/tab-bar/plaza-active.png'
  const active = ref(getCurrentPath())

  const tabs = [
    {
      label: '广场',
      path: '/pages/plaza/index',
      src: '/static/tab-bar/plaza.png',
      srcActive: '/static/tab-bar/plaza-active.png',
    },
    {
      label: '学习',
      path: '/pages/study/index',
      src: '/static/tab-bar/study.png',
      srcActive: '/static/tab-bar/study-active.png',
    },
    {
      label: '消息',
      path: '/pages/message/index',
      src: '/static/tab-bar/message.png',
      srcActive: '/static/tab-bar/message-active.png',
    },
    {
      label: '我的',
      path: '/pages/mine/index',
      src: '/static/tab-bar/mine.png',
      srcActive: '/static/tab-bar/mine-active.png',
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
<script>
  export default {
    options: { styleIsolation: 'shared' },
  }
</script>
<template>
  <view class="tab-bar">
    <u-tabbar
      activeColor="#A26D37"
      :value="active"
      :placeholder="false"
      :safeAreaInsetBottom="true"
    >
      <u-tabbar-item
        @click="onTabClick(tab.path)"
        v-for="(tab, index) in tabs"
        :key="index"
        :name="tab.path"
        :text="tab.label"
      >
        <template #active-icon>
          <image class="u-page__item__slot-icon" :src="tab.srcActive"></image>
        </template>
        <template #inactive-icon>
          <image class="u-page__item__slot-icon" :src="tab.src"></image>
        </template>
      </u-tabbar-item>
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

<style lang="scss">
  .u-page__item__slot-icon {
    // border: solid 1px red;
    width: 48rpx;
    height: 48rpx;
  }
</style>
