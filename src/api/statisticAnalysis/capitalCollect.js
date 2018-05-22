import request from '@/utils/request'

export function zmlySelect(obj) {
  return request({
    url: '/zjb/selectZjly',
    method: 'post',
    data:obj
  })
}