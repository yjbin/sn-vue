import request from '@/utils/request'
//组织机构列表查询
export function zzjgListDate(obj) {
    return request({
        url: '/zzjg/select',
        method: 'post',
        data: obj
    })
}
//组织机构新增
export function zzjgAdd(obj) {
  return request({
    url: '/zzjg/add',
    method: 'post',
    data: obj
  })
}
//组织机构修改
export function zzjgUpdate(obj) {
  return request({
    url: '/zzjg/update',
    method: 'post',
    data: obj
  })
}

