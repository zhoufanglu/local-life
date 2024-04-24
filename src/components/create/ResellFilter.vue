<script setup>
  import { reactive, ref } from 'vue'

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
    price: {
      type: String,
      required: true,
      default: 0,
    },
    type: {
      type: String,
      required: true,
      default: '#二手好车',
    },
  })
  // 2、注册事件，改变绑定的值
  const emit = defineEmits(['update:type', 'update:price'])

  const list = ['二手好车', '闲置好物']

  const handleType = (val) => {
    emit(`update:type`, val)
  }
  const handelPriceChange = (val) => {
    emit(`update:price`, val)
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
          >#{{ i }}</text
        >
      </view>
    </template>
  </u-cell>
  <u-cell title="价格:" :isLink="false">
    <template #value>
      <view class="price-input-panel">
        <text>¥</text>

        <uni-easyinput
          style="color: #a26c38; font-size: 16px; font-weight: 600"
          type="number"
          :inputBorder="false"
          :clearable="false"
          :value="props.price"
          @input="handelPriceChange"
        ></uni-easyinput>
        <!--        <up-input
          :value="value"
          placeholder=""
          type="number"
          border="surround"
          @change="handelPriceChange"
        ></up-input>-->
      </view>
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
  .price-input-panel {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    text,
    input {
      color: #a26c38 !important;
      font-size: 16px;
      font-weight: bolder;
    }
    input {
      width: 100rpx;
    }
  }
</style>
