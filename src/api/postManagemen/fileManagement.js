import request from '@/utils/request'
//文件管理查询
export function fileQuery(obj) {
  return request({
    url: '/fwtz/select',
    method: 'post',
    data:obj
  })
}
//文件添加
export function fileAdd(obj) {
  return request({
    url: '/fwtz/add',
    method: 'post',
    data: obj
  })
}
//文件编辑
export function fileUpdate(option) {
  return request({
    url: '/fwtz/update',
    method: 'post',
    data: option
  })
}
//文件删除
export function fileDel(option) {
  return request({
    url: '/fwtz/delete',
    method: 'post',
    data: option
  })
}
//浏览人数查询
export function pageQuery(option) {
  return request({
    url: '/fwtz/selectYdb',
    method: 'post',
    data: option
  })
}
//浏览人数添加
export function pageQueryAdd(option) {
  return request({
    url: '/fwtz/addYdb',
    method: 'post',
    data: option
  })
}
//发布接口
export function pageQueryRelease(option) {
  return request({
    url: '/fwtz/updateFb',
    method: 'post',
    data: option
  })
}