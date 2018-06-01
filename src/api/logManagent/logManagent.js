import request from '@/utils/request'
//日志列表查询
export function logQuery(obj) {
    return request({
        url: '/logger/select',
        method: 'post',
        data: obj
    })
}
export function logfindById(obj) {
    return request({
        url: '/history/select',
        method: 'post',
        data: obj
    })
}
