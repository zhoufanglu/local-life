import http from '@/api/index.js'

export function loginByWx(data) {
  return http({
    method: 'POST',
    url: '/app-api/member/auth/weixin-mini-app-login',
    data,
    json: 'json',
  })
}

export function logoutApi(data) {
  return http({
    method: 'POST',
    url: '/app-api/member/auth/logout',
    data,
    json: 'json',
  })
}

export function getUserInfo(data) {
  return http({
    method: 'GET',
    url: '/app-api/member/user/get',
    data,
    json: 'form',
  })
}

export function getFansAndFollow(data) {
  return http({
    method: 'GET',
    url: '/app-api/social/fans/page',
    data,
    json: 'form',
  })
}
