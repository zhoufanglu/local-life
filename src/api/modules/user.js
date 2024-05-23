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
// ?粉丝/关注列表
export function getFansAndFollow(data) {
  return http({
    method: 'GET',
    url: '/app-api/social/fans/page',
    data,
    json: 'form',
  })
}

// ?发布点赞社交
export function getPublishLikePage(data) {
  return http({
    method: 'GET',
    url: '/app-api/social/trends/publishLikePage',
    data,
    json: 'json',
  })
}

// ?修改基本信息
export function updateUserInfo(data) {
  return http({
    method: 'PUT',
    url: '/app-api/member/user/update',
    data,
    json: 'json',
  })
}

// ?获取社交隐私
export function getPrivacy(data) {
  return http({
    method: 'GET',
    url: '/app-api/social/privacy/get',
    data,
    json: 'json',
  })
}

// ?更新社交隐私
export function updatePrivacy(data) {
  return http({
    method: 'PUT',
    url: '/app-api/social/privacy/update',
    data,
    json: 'json',
  })
}

export function getUserInfoByIds(data) {
  return http({
    method: 'GET',
    url: '/app-api/member/user/getBatchUserInfo',
    data,
    json: 'json',
  })
}
