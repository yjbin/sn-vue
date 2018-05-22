import request from '@/utils/request'

export function xmzeCount(obj) {
  return request({
    url: '/xmb/xmzeCount',
    method: 'post',
    data:obj
  })
}