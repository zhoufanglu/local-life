import http from '@/api/index.js'
// data = {path: 'string'}
export function uploadFile(data) {
  console.log(4, uni.uploadFile)
  /*return http({
    method: 'POST',
    url: '/app-api/infra/file/upload',
    data,
    json: 'file',
  })*/
}

// data = {id: 'string'}
export function delFile(data) {
  return http({
    method: 'DELETE',
    url: '/admin-api/infra/file/delete',
    data,
    json: 'json',
  })
}
