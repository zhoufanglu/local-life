<template>
  <view class="ccMyNum">
    <text class="ccMyNum-title">{{ title }}</text>
    <view class="numBox">
      <view class="ccMyNumBox">
        <text @click="minus">-</text>
        <view>{{ num }}</view>
        <text @click="add">+</text>
      </view>
      <view v-if="isSetMax" class="stock"
        >(库存:<text>{{ maxNum }}</text
        >件)</view
      >
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        num: 1,
      }
    },
    created() {
      console.log('xx')
    },

    methods: {
      minus() {
        if (this.num === 1) {
          uni.showToast({
            title: '数量不能小于1',
            icon: 'none',
          })
          return
        }
        this.num--
        this.$emit('change', this.num)
      },
      add() {
        if (this.num >= this.maxNum) {
          uni.showToast({
            title: '数量不能大于库存',
            icon: 'none',
          })
          return
        }
        this.num++
        this.$emit('change', this.num)
      },
    },

    watch: {
      value: {
        handler(val) {
          this.num = val
        },
        immediate: true,
      },
    },

    props: {
      title: {
        type: String,
        default: '',
      },
      value: {
        type: Number,
        default: 1,
      },
      maxNum: {
        type: [Number, String],
        default: 9999999999,
      },
      isSetMax: {
        type: Boolean,
        default: false,
      },
    },
  }
</script>

<style>
  .ccMyNum {
    clear: both;
    margin: 0 30rpx;
    //border: solid 1px red;
  }

  .numBox {
    display: flex;
    margin-top: 14rpx;
  }

  .stock {
    line-height: 70rpx;
    color: #999;
    font-size: 24rpx;
    height: 70rpx;
    margin-left: 20rpx;
  }

  .stock text {
    padding: 0 5rpx;
  }

  .ccMyNum-title {
    font-size: 28rpx;
    color: #999;
  }

  .ccMyNumBox {
    display: flex;
    border: 1rpx solid #e5e5e5;
    width: 200rpx;
    font-size: 28rpx;
  }

  .ccMyNumBox text {
    width: 50rpx;
    height: 70rpx;
    text-align: center;
    line-height: 70rpx;
    color: #666;
  }

  .ccMyNumBox view {
    flex: 1;
    border-left: 1rpx solid #e5e5e5;
    border-right: 1rpx solid #e5e5e5;
    text-align: center;
    line-height: 70rpx;
  }
</style>
