import request from '@/utils/request'
//项目预警列表查询
export function areProQuery(obj) {
    return request({
        url: '/xmb/selectXmbPage',
        method: 'post',
        data: obj
    })
}