<script setup>
  import { reactive } from 'vue'

  const pickers = reactive({
    tenementArea: {
      columns: ['上海', '北京', '广州'],
    },
    tenementType: {
      columns: ['整租', '合租'],
    },
    tenementHouseType: {
      columns: ['一居室', '两居室', '三居室', '四居室'],
    },
    price: {
      columns: [20, 40, 60, 80, 100, 120, 140, 160, 180, 200],
    },
    date: {
      columns: ['每时', '每天'],
    },
  })

  // 1、接收参数
  const props = defineProps({
    tenementArea: {
      type: String,
      required: true,
      default: '每周',
    },
    tenementType: {
      type: String,
      required: true,
      default: '每周',
    },
    tenementHouseType: {
      type: String,
      required: true,
      default: '每周',
    },
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
  const emit = defineEmits([
    'update:tenementArea',
    'update:tenementType',
    'update:tenementHouseType',
    'update:date',
    'update:price',
  ])

  const handlePicker = (e, type) => {
    const index = Number(e.detail.value)
    emit(`update:${type}`, pickers[type].columns[index])
  }
</script>
<template>
  <picker
    mode="selector"
    :value="tenementArea"
    @change="handlePicker($event, 'tenementArea')"
    :range="pickers.tenementArea.columns"
    row-key="value"
  >
    <u-cell title="租房区域:" :isLink="true">
      <template #value>
        <view class="uni-input">{{ tenementArea }}</view>
      </template>
    </u-cell>
  </picker>
  <picker
    mode="selector"
    :value="tenementType"
    @change="handlePicker($event, 'tenementType')"
    :range="pickers.tenementType.columns"
    row-key="value"
  >
    <u-cell title="租房方式:" :value="tenementType" :isLink="true">
      <template #value>
        <view class="uni-input">{{ tenementType }}</view>
      </template>
    </u-cell>
  </picker>
  <picker
    mode="selector"
    :value="tenementHouseType"
    @change="handlePicker($event, 'tenementHouseType')"
    :range="pickers.tenementHouseType.columns"
    row-key="value"
  >
    <u-cell title="房屋类型:" :value="tenementHouseType" :isLink="true">
      <template #value>
        <view class="uni-input">{{ tenementHouseType }}</view>
      </template>
    </u-cell>
  </picker>
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
    :custom-item="'aaa'"
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
