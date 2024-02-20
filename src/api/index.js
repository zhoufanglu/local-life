import logout from '@/utils/logout'
// import { showNotify } from 'vant'

const BASE_URL = import.meta.env.VITE_APP_WEB_URL

const DATA_TYPE = {
  form: {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    },
  },
  formData: {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  },
  blob: {
    headers: {
      'Content-Type': 'application/octet-stream',
    },
  },
  file: {
    headers: {},
  },
  json: {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  },
  html: {
    headers: {
      'Content-Type': 'text/html',
    },
  },
  xml: {
    headers: {
      'Content-Type': 'application/xml, text/xml',
    },
  },
}
const http = ({
  url,
  data = {},
  method = 'get',
  json = 'form',
  header = {
    'content-type': 'application/x-www-form-urlencoded',
  },
}) => {
  if (!url) return
  return new Promise((resolve, reject) => {
    uni.request({
      url: BASE_URL + url,
      method,
      data,
      header: {
        refresh_token: uni.getStorageSync('token'),
        ...DATA_TYPE[json].headers,
      },
      success: (res) => {
        if (res.statusCode === 200) {
          resolve(res.data)
        } else {
          // showNotify({ type: 'danger', message: '请求出错' })
          reject(res)
        }
      },
      fail: (err) => {
        console.log(err, '错误信息')
        reject(err)
      },
    })
  })
}

export default http
