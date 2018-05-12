import request from '@/utils/request'

//打包用
// export function loginByUsername(name, passwd, captcha) {
//   return request({
//     url: '/security/login',
//     method: 'get',
//     params: {
//       name,
//       passwd,
//       captcha
//     }
//   })
// }

//开发用
export function loginByUsername(name, passwd) {
  return request({
    url: '/user/login',
    method: 'get',
    params: {
      name,
      passwd
    }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'get'
  })
}

export function getUserInfo(token) {
  return request({
    url: '/user/queryBytoken',
    method: 'get',
    params: {
      token
    }
  })
}

export function getUserRole(token) {
  return request({
    url: '/permission/user',
    method: 'get',
    params: {
      token
    }
  })
}
