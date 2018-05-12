import request from '@/utils/request'
//资金来源列表查询
export function capotalQuery(obj) {
    return request({
        url: '/zjb/select',
        method: 'post',
        data: obj
    })
}
//资金来源新增
export function capotalAdd(obj) {
  return request({
    url: '/zjb/add',
    method: 'post',
    data: obj
  })
}
//资金来源修改
export function capotalUpdate(obj) {
  return request({
    url: '/zjb/update',
    method: 'post',
    data: obj
  })
}
//资金来源删除
export function capotalDel(obj) {
  return request({
    url: '/zjb/delete',
    method: 'post',
    data: obj
  })
}
//资金项目挂接
export function capotalHitch(obj) {
  return request({
    url: '/xmb/hook',
    method: 'post',
    data: obj
  })
}