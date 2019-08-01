import { getToken, setToken } from '@/assets/utils/token'
import API from '@/api/apiUrl'
import Request from '@/assets/http'

const user = {
  state: {
    token: getToken(),
    user: {},
    uid: '',
    channelId: ''
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_USER: (state, data) => {
      localStorage.setItem('avatarUrl', data.headerPath)
      localStorage.setItem('userName', data.name)
      state.user = data
    },
    SET_USER_CHANNEL_ID: (state, data) => {
      localStorage.setItem('uid', data.userId)
      localStorage.setItem('channelId', data.channelId)
      state.uid = data.userId
      state.channelId = data.channelId
    }
  },

  actions: {
    // 获取token
    GetToken({ commit }) {
      return new Promise((resolve, reject) => {
        // 请求接口
        Request.httpRequest({
          method: 'post',
          url: API.GetToken,
          returnFullData: true,
          params: {},
          success: (data) => {
            setToken(data.token)
            commit('SET_TOKEN', data.token)
            resolve()
          },
          error: res => {
            reject(res)
          }
        })
      })
    },

    // 获取用户信息
    GetInfo({ commit }) {
      return new Promise((resolve, reject) => {
        // 请求接口
        Request.httpRequest({
          method: 'get',
          url: API.GetUserInfo,
          params: {
            channelId: localStorage.getItem('channelId'),
            uid: localStorage.getItem('uid')
          },
          success: (data) => {
            // 设置用户信息
            commit('SET_USER', data)
            resolve(data)
          },
          error: res => {
            reject(res)
          }
        })
      })
    },

    SetUserChannelId({ commit }, data) {
      return new Promise(resolve => {
        commit('SET_USER_CHANNEL_ID', data)
        resolve(data)
      })
    }
  }
}

export default user
