import http from '@/api/index.js'

export function getSocialPages(data) {
  return http({
    method: 'GET',
    url: '/app-api/social/search-record/page',
    data,
    json: 'json',
  })
}
/**********************广场模块***********************/
// ?获取广场列表
export function getTrends(data) {
  return http({
    method: 'GET',
    url: '/app-api/social/trends/page',
    data,
    json: 'json',
  })
}

// ?创建动态
export function createTrend(data) {
  return http({
    method: 'POST',
    url: '/app-api/social/trends/create',
    data,
    json: 'json',
  })
}
