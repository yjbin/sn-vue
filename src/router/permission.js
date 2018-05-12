import router from '../router'
import store from '../store'
import {
  Message
} from 'element-ui'
import {
  getToken
} from '@/utils/auth'

function hasPermission(id, rid) {
  if (!rid) return true
  return id == rid
}

const whiteList = ['/login']

router.beforeEach((to, from, next) => {
  if (getToken()) {
    if (to.path === '/login') {
      next({
        path: '/'
      })
    } else {
      if (store.getters.tree.length === 0) {
        store.dispatch('GetUserInfo').then(res => {
          store.dispatch('GetUserRole').then(res => {
            const tree = res
            store.dispatch('GenerateRoutes', {
              tree
            }).then(() => {
              if (store.getters.addRouters.length) {
                router.addRoutes(store.getters.addRouters)
                next({ ...to,
                  replace: true
                })
              }
            })
          }).catch(() => {
            store.dispatch('LogOut').then(() => {
              Message.error('验证失败, 请重新登录')
              next({
                path: '/login'
              })
            })
          })
        }).catch(() => {
          store.dispatch('LogOut').then(() => {
            Message.error('验证失败, 请重新登录')
            next({
              path: '/login'
            })
          })
        })
      } else {
        if (hasPermission(store.getters.user.uUser.rId, to.meta.rid)) {
          next()
        } else {
          next({
            path: '/401',
            replace: true,
            query: {
              noGoBack: true
            }
          })
        }
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next('/login')
    }
  }
})
