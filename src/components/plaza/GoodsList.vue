<script setup>
  import { getTrends } from '@/api/modules/social'
  import { ref, watch, reactive, computed } from 'vue'
  import { plazaTypes2, rentTimeUnits, rentTypes, rentRoomTypes } from '@/enums'
  import { useEnums } from '@/hooks/useEnums'

  const props = defineProps({
    type: {
      type: String,
      default: 'partTimeJob', //'partTimeJob', 'tenement', 'resell'
    },
  })
  const goods = ref([])
  const loading = ref(false)
  const variables = reactive({
    pageNo: 1,
    pageSize: 10,
    status: 'loadmore', // loadmore loading nomore
  })
  /**********************过滤项***********************/
  const filterOptions = reactive({
    pickerVisible: false,
    pickerType: '区域',
    options: [
      [
        { label: '全部', id: '' },
        { label: '中国', id: 'china' },
        { label: '美国', id: 'china' },
      ],
    ],
    resaleCategory: 2,
    rentZone: '', // 租房区域
    rentType: '', // 租房类型  1整租，2合租
    rentRoomType: '', // 租房房屋类型，1一居，2两居，3三居，4四居
  })
  // 过滤项名字
  const rentTypeName = computed(() => {
    return rentTypes[filterOptions.rentType]
  })
  const rentRoomName = computed(() => {
    return rentRoomTypes[filterOptions.rentRoomType]
  })
  // 如果是过滤的话，就是重新获取数据
  const getGoods = (isFilter = false) => {
    /**********************处理入参***********************/
    //? 在不同的界面，过滤项不同, 这三个：兼职, 租房, 转卖，'partTimeJob', 'tenement', 'resell'
    let separateParams = {}
    if (props.type === 'partTimeJob') {
      separateParams = {}
    } else if (props.type === 'tenement') {
      // ''空字符串代表全部
      separateParams = {
        rentZone: filterOptions.rentZone, // 租房区域
        rentType: filterOptions.rentType, // 租房类型  1整租，2合租
        rentRoomType: filterOptions.rentRoomType, // 租房房屋类型，1一居，2两居，3三居，4四居
      }
    } else if (props.type === 'resell') {
      separateParams = {
        resaleCategory: filterOptions.resaleCategory, // 租房的过滤项 1闲置好物，2二手好车
      }
    }
    /**********************调用***********************/
    if (isFilter) {
      variables.pageNo = 1
    }
    getTrends({
      pageNo: variables.pageNo,
      pageSize: variables.pageSize,
      type: plazaTypes2[props.type],
      ...separateParams,
    })
      .then(({ data }) => {
        // console.log(22, data)
        if (isFilter) {
          goods.value = data.list
        } else {
          goods.value.push(...data.list)
        }

        variables.status = data.list.length >= 10 ? 'loadmore' : 'nomore'
      })
      .finally(() => {
        // state.status = 'loading'
      })
  }
  getGoods()

  watch(
    () => props.type,
    (newValue) => {
      goods.value = []
      variables.pageNo = 1
      getGoods()
    },
  )

  const loadMore = () => {
    variables.pageNo++
    getGoods()
  }
  //?picker确认事件 [整租， 房屋类型]
  const handleFilterConfirm = (e) => {
    const curSelectObj = e.value[0]
    console.log(104, filterOptions.pickerType, curSelectObj)
    filterOptions.pickerVisible = false
    if (filterOptions.pickerType === '整租') {
      filterOptions.rentType = curSelectObj.id
    } else if (filterOptions.pickerType === '房屋类型') {
      filterOptions.rentRoomType = curSelectObj.id
    }
    getGoods(true)
  }
  /**
   *
   * @param type 区域 整租 房屋类型
   */
  const openPicker = (type) => {
    if (type === '区域') {
    } else if (type === '整租') {
      filterOptions.options = [
        [
          { label: '全部', id: '' },
          { label: '整租', id: 1 },
          { label: '合租', id: 2 },
        ],
      ]
    } else if (type === '房屋类型') {
      filterOptions.options = [
        [
          { label: '全部', id: '' },
          { label: '一居', id: 1 },
          { label: '二居', id: 2 },
          { label: '三居', id: 3 },
          { label: '四居', id: 4 },
        ],
      ]
    }
    filterOptions.pickerType = type
    filterOptions.pickerVisible = true
  }

  //? 闲置好物
  const handleTabChange = (val) => {
    filterOptions.resaleCategory = val
    getGoods(true)
  }
  //?详情页面  兼职、租房、转卖 这3个通用
  const goDetail = (item) => {
    console.log(88, props.type)
    uni.navigateTo({
      url: `/pages/detail/index?type=${props.type}&row=${JSON.stringify(item)}`,
    })
  }
  const { getPrice, getUnit } = useEnums(props.type)
  /*const getPrice = (i) => {
    const propEnum = {
      partTimeJob: 'partjobPrice',
      tenement: 'rentPrice',
      resell: 'resalePrice',
    }
    return i[propEnum[props.type]] || '-'
  }
  const getUnit = (i) => {
    const propEnum = {
      partTimeJob: 'partjobTimeunit',
      tenement: 'rentTimeunit',
      // resell: 'resalePrice',
    }
    return rentTimeUnits[i[propEnum[props.type]] || 1]
  }*/
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
      <view class="item" @click="openPicker('区域')">
        {{ filterOptions.rentZone || '区域' }}

        <image src="@/static/plaza/triangle.png" />
      </view>
      <view class="left-line right-line item" @click="openPicker('整租')"
        >{{ rentTypeName }}<image src="@/static/plaza/triangle.png"
      /></view>
      <view class="item" @click="openPicker('房屋类型')"
        >{{ rentRoomName }}<image src="@/static/plaza/triangle.png"
      /></view>
    </view>
    <!--?转卖-->
    <view v-if="type === 'resell'" class="pickers">
      <view
        @click="handleTabChange(2)"
        class="right-line item"
        :class="filterOptions.resaleCategory === 2 ? 'active' : null"
        >二手好车
      </view>
      <view
        @click="handleTabChange(1)"
        class="item"
        :class="filterOptions.resaleCategory === 1 ? 'active' : null"
        >闲置好物</view
      >
    </view>
    <scroll-view
      class="u-scroll-view"
      :scroll-y="true"
      lower-threshold="100"
      @scrolltolower="loadMore"
    >
      <view
        class="item"
        v-for="(i, index) in goods"
        :key="index"
        @click="goDetail(i)"
      >
        <up-image
          class="cover"
          :show-loading="true"
          :src="i.coverImage"
          width="202rpx"
          height="158rpx"
        ></up-image>
        <view class="info">
          <view class="top"> {{ i.content }} </view>
          <view class="bottom">
            <view class="location">-</view>
            <view class="price">
              <text>¥{{ getPrice(i, props.type) }} </text>
              <text v-if="props.type !== 'resell'">
                /{{ getUnit(i, props.type) }}</text
              >
            </view>
          </view>
        </view>
      </view>
      <up-loadmore :status="variables.status" />
      <!--      <loading-com v-show="loading"></loading-com>-->
    </scroll-view>
    <u-picker
      @cancel="filterOptions.pickerVisible = false"
      @confirm="handleFilterConfirm"
      :show="filterOptions.pickerVisible"
      :columns="filterOptions.options"
      keyName="label"
      :closeOnClickOverlay="true"
      @close="filterOptions.pickerVisible = false"
    ></u-picker>
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
      // border: solid 1px red;
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
      /*picker {
        border: solid 1px green;
        flex: 1;
      }*/
      .item {
        flex: 1;
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
          // border: solid 1px red;
          width: 100%;
          .top {
            @include ellipsis(2);
            font-size: 28rpx;
            font-weight: 400;
            color: #333333;
          }
          .bottom {
            @include vertical-center;
            justify-content: space-between;
            // border: solid 1px red;
            width: 100%;
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
                white-space: nowrap;
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
