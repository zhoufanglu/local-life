import http from '@/api/index.js'
// 获取商品分类
export function getGoodsType(data) {
  return http({
    method: 'GET',
    url: '/app-api/mall/cart-type/list',
    data,
    json: 'json',
  })
}

// 获取spu
export function getGoodsSPU(data) {
  return http({
    method: 'POST',
    url: '/app-api/mall/good-spu/list',
    data,
    json: 'json',
  })
}

// 获取商品列表
export function getGoods(data) {
  return http({
    method: 'POST',
    url: '/app-api/mall/good-spu/list',
    data,
    json: 'json',
  })
}

// 获取商品列表
export function getGoodDetail(data) {
  return http({
    method: 'POST',
    url: '/app-api/mall/good-spu/detail',
    data,
    json: 'json',
  })
}
