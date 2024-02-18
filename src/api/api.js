import http from '@/api/index'

export function login(data) {
  return http({
    method: 'POST',
    url: '/v1/login/login-mobile',
    data: data,
  })
}
