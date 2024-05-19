import http from '@/api/index.js'
import { WK_ADDR_URL } from '@/config/config'

/**
 * 文档： https://githubim.com/api/conversation.html#%E5%90%8C%E6%AD%A5%E6%9C%80%E8%BF%91%E4%BC%9A%E8%AF%9D
 *
 */

// ?注册用户
export function registerInIM(data) {
  return http({
    method: 'POST',
    url: `${WK_ADDR_URL}/user/token`,
    data,
    json: 'json',
  })
}

// ?创建频道-个人聊天会自动创建
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

// ?同步最近会话
export function getConversation(data) {
  return http({
    method: 'POST',
    url: `${WK_ADDR_URL}/conversation/sync`,
    data,
    json: 'json',
  })
}
