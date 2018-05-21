import request from '@/utils/request'
//首页资金接口
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
//首页项目统计
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
//首页使用层级 大环
export function sycjPieBigQuery(obj) {
  return request({
    url: '/zjb/selectZjBySycj',
    method: 'post',
    data:obj
  })
}
//首页使用层级 小环
export function sycjPieSmallQuery(obj) {
  return request({
    url: '/zjb/selectTotalAndYbf',
    method: 'post',
    data:obj
  })
}
//首页发文通知查询
export function FwtzQuery(obj) {
  return request({
    url: '/fwtz/selectFwCount',
    method: 'post',
    data:obj
  })
}
//首页预警查询
export function yjtjQuery(obj) {
  return request({
    url: '/xmb/selectYujingCount',
    method: 'post',
    data:obj
  })
}