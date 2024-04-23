<script setup>
  import PartTimeJobFilter from '@/components/create/PartTimeJobFilter.vue'
  import TenementFilter from '@/components/create/TenementFilter.vue'
  import ResellFilter from '@/components/create/ResellFilter.vue'
  import { getBoundInfo } from '@/utils/index.js'
  import { onLoad } from '@dcloudio/uni-app'
  import { ref, reactive, watch } from 'vue'
  import { plazaTypes2 } from '@/enums'
  import { createTrend } from '@/api/modules/social'
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
  /*const variables = reactive({
    fileList: [],
  })*/
  const isSubmit = ref(false)
  const fileList = ref([])
  /**
   * partTimeJob 属性 -> date:时间 price:价格
   * tenement
   * resell
   */
  const form = reactive({
    title: '1',
    description: '1',
    partTimeJob: {
      price: 25,
      date: '每时',
    },
    tenement: {
      tenementArea: '',
      tenementType: '',
      tenementHouseType: '',
      price: 25,
      date: '每时',
    },
    resell: {
      price: 25,
      type: '#二手好车',
    },
    position: {},
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
    // ? 1、上传文件，拿到url,放入imgList
    const imgList = []
    for (const file of fileList.value) {
      const formData = new FormData()
      formData.append('file', file)
      const { data } = await uni.uploadFile({
        url: `${BASE_URL}/admin-api/infra/file/upload`, //仅为示例，非真实的接口地址
        name: 'file',
        formData: formData,
        header: {
          Authorization: uni.getStorageSync('token'),
        },
      })
      imgList.push(JSON.parse(data).data)
    }
    const commonParams = {
      title: form.title,
      content: form.description,
      imgList,
      type: plazaTypes2[curType.value],
      coverImage: imgList && imgList[0],
    }
    if (curType.value === 'dynamicState') {
      uni.showLoading({
        title: '创建中..',
        mask: true,
      })
      createTrend(commonParams).then(({ data }) => {
        console.log(89, data)
        uni.hideLoading()
        uni.$u.toast('创建成功')
      })
    }
  }

  const handlePosition = () => {
    console.log('position')
  }

  const handleBack = () => {
    uni.redirectTo({
      url: '/pages/plaza/index',
    })
  }

  /**********************文件上传***********************/
  const handleFileSelect = (value) => {
    fileList.value.push(...value.tempFiles)
  }
  const handleFileDelete = (value) => {
    fileList.value.splice(value.index, 1)
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
</style>
