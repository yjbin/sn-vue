import {
  asyncRouterMap,
  constantRouterMap
} from '@/router'
import {
  pathRole
} from '@/api/pathRole'
import store from '../'

/**
 * 获取匹配路由
 */
function matchRoute(asyncRouter, path) {
  let route = asyncRouter.filter(p => {
    return p.path == path
  });
  let returnRoute = [];
  if (route.length) {
    returnRoute = route
  } else {
    asyncRouter.map(r => {
      if (r.children && !returnRoute.length) {
        returnRoute = matchRoute(r.children, path)
      }
    });
  }
  return returnRoute
}

/**
 * 设置path对应的role
 */
function setPathRole(getRouter) {
  return getRouter.map((r, i) => {
    let match = matchRoute(asyncRouterMap, r.uri);
    match = match && match[0];
    if (match) {
      r = Object.assign({}, match, r);
      r.meta.rid = r.rid;
      r.meta.title = r.label;
      if (r.children) {
        r.children = setPathRole(r.children)
      }
    }
    return r
  });
}

/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param rid
 * @param route
 */
function hasPermission(rid, route) {
  if (!route.path) {
    return false
  } else if (route.meta && route.meta.rid) {
    return route.meta.rid == rid
  } else {
    return true
  }
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param asyncRouterMap
 * @param rid
 */
function filterAsyncRouter(asyncRouterMap, rid) {
  const accessedRouters = asyncRouterMap.filter(route => {
    if (hasPermission(rid, route)) {
      if (route.children && route.children.length) {
        route.children = filterAsyncRouter(route.children, rid)
        if (route.children.length) {
          return true
        } else {
          return false
        }
      } else {
        return true
      }
    }
    return false
  })
  return accessedRouters
}

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    }
  },
  actions: {
    GenerateRoutes({
      commit
    }, data) {
      return new Promise(resolve => {
        let {
          tree
        } = data
        let accessedRouters;
        tree = setPathRole(tree);
        accessedRouters = filterAsyncRouter(tree, store.getters.user.uUser.rId);
        commit('SET_ROUTERS', accessedRouters);
        resolve()
      })
    }
  }
}

export default permission
