// import { showNotify } from 'vant'
import { BASE_URL } from '@/config/config'

import { useLogout } from '@/hooks/useLogout'
const { logout } = useLogout()

// const BASE_URL = import.meta.env.VITE_APP_WEB_URL

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
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
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
  json = 'json',
  header = {
    // 'content-type': 'application/x-www-form-urlencoded',
    'content-type': 'application/json',
  },
}) => {
  if (!url) return
  return new Promise((resolve, reject) => {
    const urlTemp = url.includes('http') ? url : BASE_URL + url
    uni.request({
      url: urlTemp,
      method,
      data,
      header: {
        Authorization: uni.getStorageSync('token'),
        ...DATA_TYPE[json].headers,
      },
      success: (res) => {
        if (res.statusCode === 200) {
          const code = res.data.code
          if (code !== 0) {
            uni.$u.toast(res.data.msg || '网络错误')
            if (code === 401 || code === 403) {
              logout()
            }
            reject(res)
          } else {
            resolve(res.data)
          }
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
