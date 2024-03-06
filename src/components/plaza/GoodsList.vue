<script setup>
  const props = defineProps({
    type: {
      type: String,
      default: 'partTimeJob', //'partTimeJob', 'tenement', 'resell'
    },
  })
  import { ref, watch, reactive } from 'vue'
  import { data } from '@/components/plaza/WaterFallList/data.js'
  import { sleep } from '@/utils'
  import loadingCom from '@/components/loading.vue'
  const foods = ref([...data])
  const loading = ref(false)
  /**********************过滤项***********************/
  const filterOptions = reactive({
    options: [
      { text: '全部', value: '' },
      { text: '中国', value: 'china' },
    ],
    curTab: 0,
  })

  const handleAreaConfirm = (e) => {
    const index = Number(e.detail.value)
    console.log(24, index)
  }

  watch(
    () => props.type,
    (newValue) => {
      console.log(16, newValue)
    },
  )

  const loadMore = () => {
    loading.value = true
    sleep(2000).then(() => {
      foods.value.push(...data)
      loading.value = false
    })
  }
  //?租房
  const handleFilterChange = (val) => {
    console.log(38, val)
  }
  const items = [
    {
      text: '一年级',
      value: '1-0',
      children: [
        {
          text: '1.1班',
          value: '1-1',
        },
        {
          text: '1.2班',
          value: '1-2',
        },
      ],
    },
    {
      text: '二年级',
      value: '2-0',
    },
    {
      text: '三年级',
      value: '3-0',
    },
  ]
  const handleFilterConfirm = () => {}
  /**
   *
   * @param type 区域 整租 房屋类型
   */
  /*const openPicker = (type) => {
    filterOptions.pickerVisible = true
  }*/
  const onchange = (val, type) => {
    console.log(55, val, type)
  }
  const onnodeclick = () => {}

  //? 闲置好物
  const handleTabChange = (val) => {
    filterOptions.curTab = val
  }
</script>
<script>
  export default {
    options: { styleIsolation: 'shared' },
  }
</script>
<template>
  <view class="p-goods-list">
    <!--?租房项-->
    <view v-if="type === 'tenement'" class="pickers">
      <!--!区域-->
      <uni-badge text="1"></uni-badge>

      <!--
      <picker
        mode="selector"
        :value="filterOptions.curTab"
        @change="handleAreaConfirm"
        :range="filterOptions.options"
        range-key="label"
      >
        <view class="item"
          >区域
          <image src="@/static/plaza/triangle.png" />
        </view>
      </picker>
-->
      <uni-data-picker
        :localdata="items"
        popup-title="请选择班级"
        @change="onchange"
        @nodeclick="onnodeclick"
      ></uni-data-picker>

      <view class="left-line right-line item"
        >整租<image src="@/static/plaza/triangle.png"
      /></view>
      <view class="item"
        >房屋类型<image src="@/static/plaza/triangle.png"
      /></view>
    </view>
    <!--?转卖-->
    <view v-if="type === 'resell'" class="pickers">
      <view
        @click="handleTabChange(0)"
        class="right-line"
        :class="filterOptions.curTab === 0 ? 'active' : null"
        >二手好车
      </view>
      <view
        @click="handleTabChange(1)"
        :class="filterOptions.curTab === 1 ? 'active' : null"
        >闲置好物</view
      >
    </view>
    <scroll-view
      class="u-scroll-view"
      :scroll-y="true"
      lower-threshold="100"
      @scrolltolower="loadMore"
    >
      <view class="item" v-for="(food, index) in foods" :key="index">
        <up-image
          class="cover"
          :show-loading="true"
          :src="food.imgUrl"
          width="202rpx"
          height="158rpx"
        ></up-image>
        <view class="info">
          <view class="top">
            CHINA
            TOWN蜜雪冰城招聘兼职啦!!!!每周周末一天6小时，每每周周末一天6小时，每.
          </view>
          <view class="bottom">
            <view class="location"
              >城招聘兼职啦!!!!每周周末一城招聘兼职啦!!!!每周周末一</view
            >
            <view class="price"><text>¥25</text>/小时</view>
          </view>
        </view>
      </view>
      <loading-com v-show="loading"></loading-com>
    </scroll-view>
    <!--    <u-picker
      @cancel="filterOptions.pickerVisible = false"
      @change="handleFilterChange"
      @confirm="handleFilterConfirm"
      :show="filterOptions.pickerVisible"
      :columns="filterOptions.options"
      keyName="label"
      :closeOnClickOverlay="true"
      @close="filterOptions.pickerVisible = false"
    ></u-picker>-->
  </view>
</template>

<style scoped lang="scss">
  .p-goods-list {
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    overflow: hidden;
    height: 100%;
    .pickers {
      border: solid 1px red;
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      background-color: white;
      border-bottom: #f3f3f3 solid 1px;
      height: 84rpx;
      box-sizing: border-box;
      .active {
        color: #a26d37;
      }
      picker {
        border: solid 1px green;
        flex: 1;
      }
      .item {
        text-align: center;
        @include vertical-center;
        image {
          width: 13rpx;
          height: 9rpx;
          margin-left: 12rpx;
        }
      }
      .left-line {
        border-left: #999 solid 1px;
      }
      .right-line {
        border-right: #999 solid 1px;
      }
    }
    .u-scroll-view {
      box-sizing: border-box;
      height: calc(100% - 84rpx);
      .item {
        background: #ffffff;
        //border-radius: 24rpx;
        //margin-bottom: 24rpx;
        display: flex;
        align-items: center;
        box-sizing: border-box;
        padding: 20rpx 40rpx 20rpx 40rpx;
        border-bottom: solid 1px #f3f3f3;
        .cover {
        }
        .info {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          height: 157rpx;
          margin-left: 24rpx;
          .top {
            @include ellipsis(2);
            font-size: 28rpx;
            font-weight: 400;
            color: #333333;
          }
          .bottom {
            @include vertical-center;
            justify-content: space-between;
            .location {
              font-size: 20rpx;
              color: #666666;
              @include ellipsis(1);
              width: calc(100% - 150rpx);
            }
            .price {
              font-size: 20rpx;
              color: #666666;
              width: 150rpx;
              text-align: right;
              text {
                font-size: 30rpx;
                color: #a26d37;
              }
            }
          }
        }
      }
    }
  }
</style>
