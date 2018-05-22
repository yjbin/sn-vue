import request from '@/utils/request'

export function xmjdSelect(obj) {
  return request({
    url: '/xmb/xmjdCount',
    method: 'post',
    data:obj
  })
}