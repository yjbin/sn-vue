import request from '@/utils/request'

export function zzHome() {
  return request({
    url: '/user/zzName',
    method: 'get'
  })
}

export function wpHome() {
  return request({
    url: '/user/wpName',
    method: 'get'
  })
}
