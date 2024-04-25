import http from '@/api/index.js'
// 获取商品分类
export function getGoodsType(data) {
  return http({
    method: 'GET',
    url: '/app-api/app/mall/cart-type/list',
    data,
    json: 'json',
  })
}
