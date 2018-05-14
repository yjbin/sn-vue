import request from '@/utils/request'
//超期资金查询
export function bymoneySelect(obj) {
    return request({
      url: '/zjb/select',
      method: 'post',
      data:obj
    })
}
