import { showNotify } from 'vant'
import { reactive } from 'vue'

const useRequest = (request, options) => {
  const {
    filterOption = reactive({}),
    transformFn = undefined,
    immediate = true,
  } = options
  // ?定义抛出的变量
  const requestVariables = reactive({
    loading: false,
    data: {},
  })
  const getRequest = async () => {
    requestVariables.loading = true
    const params = {
      // 分页数据
      // ...pick(requestVariables.pagination, ['pageNo', 'pageSize']),
      // 过滤数据
      ...filterOption,
    }
    try {
      const { data } = await request(params)
      // 格式化一下数据
      requestVariables.data = transformFn ? transformFn(data) : data
      requestVariables.loading = false
    } catch (err) {
      showNotify({ type: 'danger', message: '请求出错' })
    } finally {
      requestVariables.loading = false
    }
  }

  // 判断是否立即请求
  if (immediate) {
    getRequest()
  }

  return {
    getRequest,
    requestVariables,
  }
}

export { useRequest }
