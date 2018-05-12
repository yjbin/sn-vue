import request from '@/utils/request';
//项目考核查询
export function assessSelect(obj){
    return request({
        url: '/xmkh/select',
        method: 'post',
        data: obj
    })
}
//删除
export function assessDel(obj){
    return request({
        url: '/xmkh/delete',
        method: 'post',
        data: obj
    })
}
//添加or编辑
export function assessSave(method,obj){
    return request({
        url: '/xmkh/'+ method,
        method: 'post',
        data: obj
    })
}