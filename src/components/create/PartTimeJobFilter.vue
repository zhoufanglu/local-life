<script setup>
  import { reactive } from 'vue'

  const pickers = reactive({
    date: {
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
    price: {
      type: String,
      required: true,
      default: 25,
    },
  })
  // 2、注册事件，改变绑定的值
  const emit = defineEmits(['update:date', 'update:price'])

  const handlePicker = (e, type) => {
    const index = Number(e.detail.value)
    emit(`update:${type}`, pickers[type].columns[index])
  }
</script>
<template>
  <picker
    mode="selector"
    :value="date"
    @change="handlePicker($event, 'date')"
    :range="pickers.date.columns"
    row-key="value"
  >
    <u-cell title="时间:" :value="date" :isLink="true">
      <template #value>
        <view class="uni-input">{{ date }}</view>
      </template>
    </u-cell>
  </picker>
  <picker
    mode="selector"
    :value="price"
    @change="handlePicker($event, 'price')"
    :range="pickers.price.columns"
    row-key="value"
  >
    <u-cell title="价格:" :isLink="true">
      <template #value>
        <view class="price" style="color: #a26d37"
          ><text>¥{{ price }}</text></view
        >
      </template>
    </u-cell>
  </picker>
</template>

<style scoped lang="scss">
  .test {
  }
</style>
