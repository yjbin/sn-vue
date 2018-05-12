import request from '@/utils/request';
//项目拨款查询
export function appropSelect(obj){
    return request({
        url: '/xmzj/selectByXmId',
        method: 'post',
        data: obj
    })
}
//删除
export function appropDel(obj){
    return request({
        url: '/zjbfjl/deleteById',
        method: 'post',
        data: obj
    })
}
//添加or编辑
export function appropSave(obj){
    return request({
        url: '/xmzj/appropriate',
        method: 'post',
        data: obj
    })
}
//拨付记录查询
export function appropRecord(obj){
    return request({
        url: '/zjbfjl/select',
        method: 'post',
        data: obj
    })
}