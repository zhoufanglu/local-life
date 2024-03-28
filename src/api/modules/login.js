import http from '@/api/index.js'

export function loginByWx(data) {
  return http({
    method: 'POST',
    url: '/app-api/member/auth/weixin-mini-app-login',
    data,
    json: 'json',
  })
}
