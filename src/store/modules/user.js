import {
  loginByUsername,
  logout,
  getUserInfo,
  getUserRole
} from '@/api/login'
import {
  getToken,
  setToken,
  removeToken
} from '@/utils/auth'
import {
  Message
} from 'element-ui'

const user = {
  state: {
    token: getToken(),
    user: {},
    tree: [],
    error: false
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_USER: (state, user) => {
      state.user = user
    },
    SET_TREE: (state, tree) => {
      state.tree = tree
    },
    SET_ERROR: (state) => {
      state.error = true
    }
  },

  actions: {
    // 用户名登录
    LoginByUsername({
      commit
    }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        loginByUsername(username, userInfo.password, userInfo.captcha).then(response => {
          const data = response.data
          if (data.success) {
            commit('SET_TOKEN', data.data.token)
            setToken(response.data.data.token)
            resolve()
          } else {
            Message.error(data.msg);
            reject()
          }
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetUserInfo({
      commit,
      state
    }) {
      return new Promise((resolve, reject) => {
        getUserInfo(state.token).then(response => {
          const data = response.data;
          if (data.success) {
            commit('SET_USER', data.data)
            resolve()
          } else {
            Message.error(data.msg);
            reject()
          }
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户角色
    GetUserRole({
      commit,
      state
    }) {
      return new Promise((resolve, reject) => {
        getUserRole(state.token).then(response => {
          const data = response.data
          if (data.success) {
            commit('SET_TREE', data.data)
            resolve(data.data)
          } else {
            reject()
          }
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 退出
    LogOut({
      commit,
      state
    }) {
      return new Promise((resolve, reject) => {
        logout().then(() => {
          commit('SET_TOKEN', '')
          commit('SET_TREE', [])
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default user
