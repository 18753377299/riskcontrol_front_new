import {login, getUserInfo} from '@/api/user'
import {getToken, setToken, removeToken} from '@/utils/auth'
import {resetRouter} from '@/router'
import Cookies from 'js-cookie'

const getDefaultState = () => {
  return {
    token: getToken(),
    userInfo: null,
    avatar: ''
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_USERINFO: (state, userInfo) => {
    state.userInfo = userInfo
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  }
}

const actions = {
  // user login
  login({commit}, userInfo) {
    const {username, password} = userInfo
    return new Promise((resolve, reject) => {
      login({username: username.trim(), password: password}).then(response => {
        const {token} = response
        commit('SET_TOKEN', token)
        setToken(token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({commit, state}) {
    return new Promise((resolve, reject) => {
      getUserInfo({jwtToken: state.token}).then(response => {
        const {userInfo} = response

        if (!userInfo) {
          reject('Verification failed, please Login again.')
        }

        const avatar = 'http://10.10.2.241:5001/riskcontrol_file/HeadPortrait/A0000115333077520191203.jpg'
        commit('SET_USERINFO', userInfo)
        commit('SET_AVATAR', avatar)
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 统一门户 get userInfo
  getInfoProtal({ commit, state }) {
    return new Promise((resolve, reject) => {
      if (Cookies.get('jwt')) {
        let data = {
          userName: Cookies.get('userName'),
          usercode: Cookies.get('usercode'),
          userId: Cookies.get('userId'),
          comCode: Cookies.get('comCode'),
          svrCode: Cookies.get('svrCode'),
          svrScope: Cookies.get('svrScope'),
          JSESSIONID: Cookies.get('JSESSIONID')
        }
        if (data.usercode === '') {
          reject('Verification failed, please Login again.')
        }
        commit('SET_NAME', data.userName)
        commit('SET_AVATAR', 'http://10.10.2.241:5001/riskcontrol_file/HeadPortrait/A0000115333077520191203.jpg')
        commit('SET_USERINFO', data)
        resolve(data)
      }
    })
  },

  // user logout
  logout({commit, state}) {
    return new Promise((resolve, reject) => {
      removeToken() // must remove  token  first
      resetRouter()
      commit('RESET_STATE')
      resolve()
    })
  },

  // remove token
  resetToken({commit}) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

