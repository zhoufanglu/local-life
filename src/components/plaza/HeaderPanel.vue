<script setup>
  import { ref } from 'vue'
  const active = ref('follow')
  const headerTabs = ref([
    { label: '关注', value: 'follow' },
    { label: '动态', value: 'dynamicState' },
    { label: '美食', value: 'foods' },
    { label: '兼职', value: 'partTimeJob' },
    { label: '租房', value: 'tenement' },
    { label: '转卖', value: 'resell' },
  ])
  const emit = defineEmits(['handleTabChange'])
  const handleChange = () => {
    emit('handleTabChange', active.value)
  }
</script>
<template>
  <view class="header-panel">
    <view>
      <van-icon :size="30" name="location-o" />
      <van-field rows="1" placeholder="搜索你感兴趣的内容" />
      <van-icon size="30" name="add-o" />
    </view>
    <view>
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
  </view>
</template>

<style scoped lang="scss">
  .header-panel {
    height: 204rpx;
    width: 100%;
    background-color: #a26d37;
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    > view:first-child {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 20rpx;
      height: 100%;
      padding-right: 120rpx;
    }
    > view:last-child {
      padding: 0 20rpx;
    }
  }
</style>
<style lang="scss">
  .header-panel {
    > view:first-child {
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
      > .van-icon:last-child {
        margin-left: 25rpx;
      }
    }
    .plaza-tabs {
      border: solid 1px #a26d27;
      .van-tabs__wrap {
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
      }
    }
  }
</style>
