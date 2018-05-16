import request from '@/utils/request'
//通知公告查询
export function noticeQuery(obj) {
  return request({
    url: '/fwtz/select',
    method: 'post',
    data:obj
  })
}
//通知公告添加
export function noticeAdd(obj) {
  return request({
    url: '/fwtz/add',
    method: 'post',
    data: obj
  })
}
//通知公告编辑
export function noticeUpdate(option) {
  return request({
    url: '/fwtz/update',
    method: 'post',
    data: option
  })
}
//通知公告删除
export function noticeDel(option) {
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