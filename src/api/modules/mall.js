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

/**********************购物车***********************/
export function createCart(data) {
  return http({
    method: 'POST',
    url: '/app-api/mall/cart/create',
    data,
    json: 'json',
  })
}
export function addGoodInCart(data) {
  return http({
    method: 'POST',
    url: '/app-api/mall/cart/add',
    data,
    json: 'json',
  })
}

export function delGoodInCart(data) {
  return http({
    method: 'POST',
    url: '/app-api/mall/cart/del',
    data,
    json: 'json',
  })
}

export function queryCart(data) {
  return http({
    method: 'POST',
    url: '/app-api/mall/cart/query',
    data,
    json: 'json',
  })
}

/**********************订单***********************/
export function getOrders(data) {
  return http({
    method: 'POST',
    url: '/app-api/mall/order/list',
    data,
    json: 'json',
  })
}
export function getOrderDetail(data) {
  return http({
    method: 'POST',
    url: '/app-api/mall/order/detail',
    data,
    json: 'json',
  })
}

export function createOrderBySku(data) {
  return http({
    method: 'POST',
    url: '/app-api/mall/order/createBySku',
    data,
    json: 'json',
  })
}

export function createOrderByCartId(data) {
  return http({
    method: 'POST',
    url: '/app-api/mall/order/createByCartId',
    data,
    json: 'json',
  })
}

export function getMyOrders(data) {
  return http({
    method: 'POST',
    url: '/app-api/mall/order/details',
    data,
    json: 'json',
  })
}

/**********************支付***********************/
export function payApi(data) {
  return http({
    method: 'POST',
    url: '/app-api/pay/trans',
    data,
    json: 'json',
  })
}
