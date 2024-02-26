<script setup>
  import { reactive } from 'vue'

  const pickers = reactive({
    type: {
      columns: ['每时', '每天', '每周', '每月'],
    },
    price: {
      columns: [20, 40, 60, 80, 100, 120, 140, 160, 180, 200],
    },
  })

  // 1、接收参数
  const props = defineProps({
    date: {
      type: String,
      required: true,
      default: '每周',
    },
    type: {
      type: String,
      required: true,
      default: '#二手好车',
    },
  })
  // 2、注册事件，改变绑定的值
  const emit = defineEmits(['update:type', 'update:price'])

  const list = ['#二手好车', '#闲置好物']

  const handleType = (val) => {
    emit(`update:type`, val)
  }
</script>
<script>
  export default {
    options: { styleIsolation: 'shared' },
  }
</script>
<template>
  <u-cell title="发布分类:" :isLink="false" class="resell-filter-type">
    <template #value>
      <view class="type-panel">
        <text
          :class="type === i ? 'active' : null"
          v-for="i in list"
          :key="i"
          @click="handleType(i)"
          >{{ i }}</text
        >
      </view>
    </template>
  </u-cell>
  <u-cell title="价格:" :isLink="true">
    <template #value>
      <view class="uni-input">{{ date }}</view>
    </template>
  </u-cell>
</template>

<style lang="scss">
  .resell-filter-type {
    .type-panel {
      display: flex;
      align-items: center;
      text {
        @include vertical-center;
        margin-right: 20rpx;
        width: 171rpx;
        height: 48rpx;
        border-radius: 24rpx;
      }
      .active {
        background: #a26d37;
        color: white;
      }
    }
  }
</style>
