import request from '@/utils/request'

export function zjycSelect(obj) {
  return request({
    url: '/zjb/selectZjYc',
    method: 'post',
    data:obj
  })
}