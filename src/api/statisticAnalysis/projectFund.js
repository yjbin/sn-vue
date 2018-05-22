import request from '@/utils/request'

export function selectZjFb(obj) {
  return request({
    url: '/zjb/selectZjFb',
    method: 'post',
    data:obj
  })
}