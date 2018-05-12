import request from '@/utils/request';

//项目进度查询
export function xmjdSelect(obj){
    return request({
        url: '/xmjd/select',
        method: 'post',
        data: obj
    })
}
//项目进度添加
export function xmjdAdd(obj){
    return request({
        url: '/xmjd/add',
        method: 'post',
        data: obj
    })
}
//项目进度修改
export function xmjdUpdate(obj){
    return request({
        url: '/xmjd/update',
        method: 'post',
        data: obj
    })
}
//项目进度删除
export function xmjdDell(obj){
    return request({
        url: '/xmjd/delete',
        method: 'post',
        data: obj
    })
}