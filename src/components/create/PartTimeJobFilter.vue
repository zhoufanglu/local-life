<script setup>
  import { reactive, ref } from 'vue'

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
      type: Number,
      required: true,
      default: 25,
    },
  })
  const priceModel = ref(props.price)
  const priceFocus = ref(false)
  // 2、注册事件，改变绑定的值
  const emit = defineEmits(['update:date', 'update:price'])

  const handlePicker = (e, type) => {
    const index = Number(e.detail.value)
    emit(`update:${type}`, pickers[type].columns[index])
  }
  const handleInput = (e) => {
    priceModel.value = e.target.value
    emit('update:price', e.target.value)
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
  <u-cell title="价格:" :isLink="true">
    <template #value>
      <view
        class="price-select-row"
        style="color: #a26d37"
        @click="priceFocus = true"
      >
        <view
          >$
          <input
            :focus="priceFocus"
            class="price-input"
            type="number"
            v-model="priceModel"
            @input="handleInput"
          /> </view
      ></view>
    </template>
  </u-cell>
  <!--  <picker
    mode="selector"
    :value="price"
    @change="handlePicker($event, 'price')"
    :range="pickers.price.columns"
    row-key="value"
  >
    <u-cell title="价格:" :isLink="true">
      <template #value>
        <view class="price" style="color: #a26d37"
          ><text>${{ price }}</text></view
        >
      </template>
    </u-cell>
  </picker>-->
</template>

<style scoped lang="scss">
  .price-select-row {
    display: flex;
    align-items: center;
    > view {
      display: flex;
      align-items: center;
    }
    .price-input {
      text-align: right;
      width: 100rpx;
    }
  }
</style>
