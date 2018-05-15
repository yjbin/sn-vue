import request from '@/utils/request'
//资金来源列表查询
export function moneyQuery(obj) {
    return request({
        url: '/zjb/select',
        method: 'post',
        data: obj
    })
}
//资金表根据主键id查询
export function moneyById(obj) {
    return request({
        url: '/zjb/selectById',
        method: 'post',
        data: obj
    })
}