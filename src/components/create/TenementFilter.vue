<script setup>
  import { reactive, ref } from 'vue'
  import { getAreaTree } from '@/api/modules/social'
  import { areaTree } from './area.js'
  /*const areaTree = ref([])
  getAreaTree().then(({ data }) => {
    console.log(23, data)
    areaTree.value = data
  })*/
  const testValue = ref('110101000000')
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
      type: Number,
      required: true,
      default: 25,
    },
  })
  const priceModel = ref(props.price)
  const priceFocus = ref(false)
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

  const onAreaChange = (e) => {
    const value = e.detail.value
    const text = value.map((v) => v.text).join('/')
    emit(`update:tenementArea`, text)
  }
  const onAreaNodeClick = (node) => {
    // console.log(74, node)
  }
  const handleInput = (e) => {
    priceModel.value = e.target.value
    emit('update:price', e.target.value)
  }
</script>
<script>
  export default {
    options: { styleIsolation: 'shared' },
  }
</script>
<template>
  <!--  <picker
    mode="selector"
    :value="tenementArea"
    @change="handlePicker($event, 'tenementArea')"
    :range="pickers.tenementArea.columns"
    row-key="value"
  >-->
  <u-cell title="租房区域:" :isLink="true">
    <template #value>
      <uni-data-picker
        v-model="testValue"
        class="area-picker"
        :border="false"
        placeholder=" "
        v-if="areaTree.length"
        :localdata="areaTree"
        popup-title="请选择地区"
        @change="onAreaChange"
        @nodeclick="onAreaNodeClick"
        :clear-icon="false"
      >
      </uni-data-picker>
      <!--        <view class="uni-input">{{ tenementArea }}</view>-->
    </template>
  </u-cell>
  <!--  </picker>-->
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
  <u-cell title="价格:" :isLink="true">
    <template #value>
      <view
        class="price-select-row"
        style="color: #a26d37"
        @click="priceFocus = true"
      >
        <view
          >¥
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
  <!--
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
--></template>

<style lang="scss">
  .area-picker {
    .arrow-area {
      display: none !important;
    }
    // border: solid 1px red;
  }
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
