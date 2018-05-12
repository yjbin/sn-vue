import request from '@/utils/request';
//项目效益查询
export function xmxySelect(obj){
    return request({
        url: '/xmxy/select',
        method: 'post',
        data: obj
    })
}
//删除
export function xmxyDel(obj){
    return request({
        url: '/xmxy/delete',
        method: 'post',
        data: obj
    })
}
//添加or编辑
export function xmxySave(method,obj){
    return request({
        url: '/xmxy/'+ method,
        method: 'post',
        data: obj
    })
}