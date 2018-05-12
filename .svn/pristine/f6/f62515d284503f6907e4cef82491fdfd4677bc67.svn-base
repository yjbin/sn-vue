import request from '@/utils/request'

//大额查询历史设置
export function searchData(obj) {
  return request({
    url: '/desz/select',
    method: 'post',
    data: obj
  })
}
//大额设置
export function addLarge(obj){
  return request({
    url:'/desz/add',
    method:'post',
    data:obj
  })
}

//实施单位查询
export function searchUnit(obj) {
  return request({
    url: '/ssdw/select',
    method: 'post',
    data: obj
  })
}
//单位添加，修改
export function addUnit(method,obj){
  return request({
    url:'/ssdw/' + method,
    method:'post',
    data:obj
  })
}
//删除单位
export function delUnit(obj){
  return request({
    url:'/ssdw/delete',
    method:'post',
    data:obj
  })
}