import request from '@/utils/request'

export function treeQuery(obj) {
  return request({
    url: '/uMultidict/findUMultidictByDictType',
    method: 'post',
    data:obj
  })
}
export function formSave(url, obj) {
  return request({
    url: '/uMultidict/' + url,
    method: 'post',
    data: obj
  })
}
export function treeDel(obj) {
  return request({
    url: '/uMultidict/deleteAll',
    method: 'post',
    data: obj
  })
}
