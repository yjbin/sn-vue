import request from '@/utils/request'

//全部的字典项接口
export function dictionaries(key) {
  return request({
    url: "/udict/findBydicttype/" + key,
    method: 'get'
  })
}
export function xzqhDict(obj) {
  return request({
    url: "/xzqh/selectAll",
    method: 'post',
    data:obj?obj:{}
  })
}
export function bmbmDict(obj) {
  return request({
    url: "/dept/selectAllTo",
    method: 'post',
    data:obj?obj:{}
  })
}
//多级下拉接口
export function duojiDict() {
  return request({
    url: "/uMultidictType/selectAll",
    method: 'post'
  })
}
