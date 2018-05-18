import request from '@/utils/request'

export function zjtjQuery(obj) {
  return request({
    url: '/zjb/selectZjbCount',
    method: 'post',
    data:obj
  })
}
export function zjtjlineQuery(obj) {
  return request({
    url: '/zjb/selectZjbLine',
    method: 'post',
    data:obj
  })
}
export function xmtjQuery(obj) {
  return request({
    url: '/xmb/selectXmCount',
    method: 'post',
    data:obj
  })
}
export function xmtjlineQuery(obj) {
  return request({
    url: '/xmb/selectXmLine',
    method: 'post',
    data:obj
  })
}