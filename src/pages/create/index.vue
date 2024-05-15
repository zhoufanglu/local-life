<script setup>
  import PartTimeJobFilter from '@/components/create/PartTimeJobFilter.vue'
  import TenementFilter from '@/components/create/TenementFilter.vue'
  import ResellFilter from '@/components/create/ResellFilter.vue'
  import { getBoundInfo } from '@/utils/index.js'
  import { onLoad } from '@dcloudio/uni-app'
  import { ref, reactive, watch } from 'vue'
  import {
    getEnumKeyByValue,
    plazaTypes2,
    rentRoomTypes,
    rentTimeUnits,
    rentTypes,
    resellType,
    reversedEnums,
  } from '@/enums'
  import { createTrend, getAreaTree } from '@/api/modules/social'
  import { uploadFile } from '@/api/modules/file'
  import { BASE_URL } from '@/config/config'

  const { boundTop } = getBoundInfo()
  /**
   * dynamicState:动态 partTimeJob:兼职 tenement:租房 resell:转卖
   */
  const createEnum = {
    dynamicState: '动态',
    partTimeJob: '兼职',
    tenement: '租房',
    resell: '转卖',
  }
  let curType = ref('dynamicState')
  onLoad((options) => {
    curType.value = options.type
  })

  /**********************主体内容***********************/
  const isSubmit = ref(false)
  const fileList = ref([]) // 存文件列表
  const filePathList = ref([]) // 存文件路径列表
  /**
   * partTimeJob 属性 -> date:时间 price:价格
   * tenement
   * resell
   */
  const form = reactive({
    title: '',
    description: '',
    partTimeJob: {
      price: 25,
      date: '每时',
    },
    tenement: {
      tenementArea: '北京市/市辖区/东城区',
      tenementType: '整租',
      tenementHouseType: '一居',
      price: 25,
      date: '每时',
    },
    resell: {
      price: 25,
      type: '二手好车',
    },
    position: '-',
  })
  const rules = reactive({
    title: [{ required: true, message: '请输入标题', trigger: 'blur' }],
    content: [{ required: true, message: '请输入内容', trigger: 'blur' }],
  })

  watch(
    form,
    (newValue) => {
      if (!form.title) {
        // uni.$u.toast('请输入标题')
        return false
      } else if (!form.description) {
        // uni.$u.toast('请输入内容')
        return false
      } else {
        isSubmit.value = true
        // uni.$u.toast('提交')
      }
    },
    { deep: true },
  )

  const handleSubmit = async () => {
    uni.showLoading({
      title: '创建中..',
      mask: true,
    })
    // ? 1、上传文件，拿到url,放入imgList
    const imgList = []
    for (const [index, file] of fileList.value.entries()) {
      const { data } = await uni.uploadFile({
        url: `${BASE_URL}/admin-api/infra/file/upload`,
        name: 'file',
        filePath: filePathList.value[index],
        formData: { file },
        header: {
          Authorization: uni.getStorageSync('token'),
        },
      })
      imgList.push(JSON.parse(data).data)
    }
    const commonParams = {
      title: form.title,
      content: form.description,
      imageList: imgList,
      type: plazaTypes2[curType.value],
      coverImage: imgList && imgList[0],
    }
    let params = {}
    // !参数分流, 动态、兼职、租房、转卖
    if (curType.value === 'dynamicState') {
      params = commonParams
    } else if (curType.value === 'partTimeJob') {
      params = {
        ...commonParams,
        partjobTimeunit: getEnumKeyByValue(
          rentTimeUnits,
          form.partTimeJob.date,
        ),
        partjobPrice: form.partTimeJob.price,
      }
    } else if (curType.value === 'tenement') {
      params = {
        ...commonParams,
        rentZone: form.tenement.tenementArea, //租房区域
        rentType: getEnumKeyByValue(rentTypes, form.tenement.tenementType), // 租房方式
        rentRoomType: getEnumKeyByValue(
          rentRoomTypes,
          form.tenement.tenementHouseType,
        ), // 房屋类型
        rentTimeunit: getEnumKeyByValue(rentTimeUnits, form.tenement.date), // 租房时间单位
        rentPrice: form.tenement.price, // 租房价格
        address: form.position,
      }
    } else if (curType.value === 'resell') {
      console.log(142, form.resell.price)
      if (!form.resell.price) {
        uni.$u.toast('请输入价格')
        return
      }
      // 转卖
      params = {
        ...commonParams,
        // resaleCategory: resellType[form.resell.type],
        resaleCategory: getEnumKeyByValue(resellType, form.resell.type),
        resalePrice: form.resell.price,
      }
    }
    createTrend(params).then(({ data }) => {
      uni.hideLoading()
      uni.$u.toast('创建成功')
      setTimeout(() => {
        uni.navigateBack({
          delta: 1,
        })
      }, 500)
    })
  }
  //https://juejin.cn/s/uniapp%E8%8E%B7%E5%8F%96%E4%BD%8D%E7%BD%AE%E4%BF%A1%E6%81%AF
  // openLocation
  const handlePosition = () => {
    console.log('xx', uni)
    // isGetLocation()
    uni.getFuzzyLocation({
      type: 'wgs84',
      success: function (res) {
        console.log('当前位置的经度：' + res.longitude)
        console.log('当前位置的纬度：' + res.latitude)
      },
    })
  }
  function isGetLocation() {
    uni.getSetting({
      success(res) {
        if (!res.authSetting['scope.userLocation']) {
          //3.1 每次进入程序判断当前是否获得授权，如果没有就去获得授权，如果获得授权，就直接获取当前地理位置
          console.log('打开位置授权')
          uni.getLocation({
            type: 'gcj02', // 默认值为wgs84；可选值（ 1.wgs84 返回 gps 坐标，2.gcj02 返回可用于 wx.openLocation 的坐标）
            wgs84: false, // 传入 true 会返回高度信息，由于获取高度需要较高精确度，会减慢接口返回速度
            sHighAccuracy: false, // 开启高精度定位
            highAccuracyExpireTime: 3000, //高精度定位超时时间(ms)，指定时间内返回最高精度，该值3000ms以上高精度定位才有效果
            success: function (res) {
              console.log('成功获取位置信息', res)
            },
            fail: function (error) {
              console.log('获取当前位置失败', error)
            },
            complete: function (com) {
              // console.log('接口调用结束的回调函数（调用成功、失败都会执行）',com)
            },
          })
        } else {
          console.log('已经打开位置授权')
        }
      },
    })
  }

  const handleBack = () => {
    uni.redirectTo({
      url: '/pages/plaza/index',
    })
  }

  /**********************文件上传***********************/
  const handleFileSelect = (value) => {
    // console.log(153, value.tempFilePaths)
    const { tempFilePaths, tempFiles } = value
    fileList.value.push(...tempFiles)
    filePathList.value.push(...tempFilePaths)
  }
  const handleFileDelete = (value) => {
    fileList.value.splice(value.index, 1)
    filePathList.value.splice(value.index, 1)
  }
</script>
<script>
  export default {
    options: { styleIsolation: 'shared' },
  }
</script>
<template>
  <view class="p-create">
    <u-navbar
      bgColor="#F8F8F8"
      :title="`发布${createEnum[curType]}`"
      @leftClick="handleBack"
    >
    </u-navbar>
    <view
      class="content"
      :style="{
        marginTop: boundTop + 44 + 'px',
      }"
    >
      <uni-file-picker
        v-model="fileList"
        limit="5"
        title="最多选择5张图片"
        @select="handleFileSelect"
        @delete="handleFileDelete"
      ></uni-file-picker>
      <!--?文件-->
      <!--视频预览组件https://ext.dcloud.net.cn/plugin?id=11560-->
      <!--
      <u-upload
        :fileList="fileList"
        accept="media,image"
        @afterRead="afterRead"
        @delete="deletePic"
        name="file"
        multiple
        width="192rpx"
        height="192rpx"
        :maxCount="10"
        :previewFullImage="true"
      >
        <image
          src="@/static/upload_create.png"
          mode="widthFix"
          style="width: 192rpx; height: 192px"
        ></image>
      </u-upload>
-->
      <!--?内容-->
      <view class="submit-form">
        <!--!标题-->
        <u--input
          fontSize="16px"
          class="form-title"
          placeholder="填写有趣的标题会有更多赞哦~"
          v-model="form.title"
          border="none"
        ></u--input>
        <!--!正文-->
        <u--textarea
          class="form-description"
          v-model="form.description"
          placeholder="新增正文"
          border="none"
          height="200rpx"
          maxlength="1000"
        ></u--textarea>
        <u-cell-group class="form-position" :border="false">
          <!--*兼职-->
          <part-time-job-filter
            v-if="curType === 'partTimeJob'"
            v-model:date="form.partTimeJob.date"
            v-model:price="form.partTimeJob.price"
          ></part-time-job-filter>
          <!--*租房-->
          <tenement-filter
            v-else-if="curType === 'tenement'"
            v-model:tenementArea="form.tenement.tenementArea"
            v-model:tenementType="form.tenement.tenementType"
            v-model:tenementHouseType="form.tenement.tenementHouseType"
            v-model:price="form.tenement.price"
            v-model:date="form.tenement.date"
          ></tenement-filter>
          <!--*转卖-->
          <resell-filter
            v-else-if="curType === 'resell'"
            v-model:price="form.resell.price"
            v-model:type="form.resell.type"
          ></resell-filter>
          <!--*定位-->
          <u-cell
            class="position-cell"
            :isLink="true"
            @click="handlePosition"
            arrow-direction="right"
            title="新增地点"
            value="标记位置让更多人看到"
          >
            <template #icon>
              <image
                src="@/static/create_position.png"
                style="height: 41rpx; width: 35rpx; margin-right: 10rpx"
              ></image>
            </template>
          </u-cell>
        </u-cell-group>
      </view>
    </view>
    <!--?发布-->
    <view class="submit-panel">
      <up-button
        :disabled="!(form.description && form.title)"
        type="primary"
        shape="circle"
        color="#A26D37"
        @click="handleSubmit"
        >发布</up-button
      >
    </view>
  </view>
</template>

<style scoped lang="scss">
  .p-create {
    .content {
      position: relative;
      // border: solid 1px red;
      box-sizing: border-box;
      // height: 1001rpx;
      border-radius: 34rpx;
      background: white;
      margin: 20rpx;
      padding: 32rpx;
      font-size: 28rpx;
      height: calc(100vh - 98rpx - 92rpx - 180rpx);
    }
  }
</style>
<style lang="scss">
  .p-create {
    .submit-panel {
      box-sizing: border-box;
      height: 98rpx;
      @include vertical-center;
      background: white;
      width: 100%;
      position: fixed;
      bottom: 0;
      padding: 10rpx 112rpx;
    }
    .submit-form {
      margin-top: 40rpx;
      .form-title {
        margin-bottom: 36rpx;
        input {
          font-weight: bolder;
        }
      }
      .form-description {
        margin-bottom: 36rpx;
        // border: solid 1px red;
      }
      .form-position {
        position: absolute;
        width: 100%;
        bottom: 0;
        left: 0;
        // border-top: solid 1px #eee !important;
        .u-line {
          //border-bottom-width: 0 !important;
        }
      }
    }
  }
  .position-cell {
    .u-line {
      display: none !important;
    }
  }
  .u-upload__wrap__preview__other {
    width: 192rpx !important;
    height: 192rpx !important;
  }
  .file-picker__box-content {
    border-radius: 8px !important;
  }
</style>
