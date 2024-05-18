import http from '@/api/index.js'
import { WK_ADDR_URL } from '@/config/config'
// ?注册用户
export function registerInIM(data) {
  return http({
    method: 'POST',
    url: `${WK_ADDR_URL}/user/token`,
    data,
    json: 'json',
  })
}

// ?创建频道
export function openChannel(data) {
  return http({
    method: 'POST',
    url: `${WK_ADDR_URL}/channel`,
    data,
    json: 'json',
  })
}

// ?添加订阅者
export function addSubscriber(data) {
  return http({
    method: 'POST',
    url: `${WK_ADDR_URL}/channel/subscriber_add`,
    data,
    json: 'json',
  })
}

// ?发送消息
export function sendMessage(data) {
  return http({
    method: 'POST',
    url: `${WK_ADDR_URL}/message/send`,
    data,
    json: 'json',
  })
}
