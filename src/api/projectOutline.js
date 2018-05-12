import request from '@/utils/request';
//项目概述列表查询
export function xmlbList(obj){
    return request({
        url: '/xmb/selectXmbPage',
        method: 'post',
        data: obj
    })
}
//项目描述新增
export function xmmsAdd(obj){
    return request({
        url: '/xmb/addXmb',
        method: 'post',
        data: obj
    })
}
//项目描述修改
export function xmmsChange(obj){
    return request({
        url: '/xmb/updateXmb',
        method: 'post',
        data: obj
    })
}
//项目描述刪除
export function xmmsDelete(obj){
    return request({
        url: '/xmb/delete',
        method: 'post',
        data: obj
    })
}