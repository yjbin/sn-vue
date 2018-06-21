import request from '@/utils/request'
//友情链接列表查询
export function listQuery(obj) {
    return request({
        url: '/wzb/selectWzbPage',
        method: 'post',
        data: obj
    })
}
export function blogrollAdd(obj) {
    return request({
        url: '/wzb/add',
        method: 'post',
        data: obj
    })
}
export function blogrollUpdate(obj) {
    return request({
        url: '/wzb/update',
        method: 'post',
        data: obj
    })
}
export function blogrollDel(obj) {
    return request({
        url: '/wzb/delete',
        method: 'post',
        data: obj
    })
}

