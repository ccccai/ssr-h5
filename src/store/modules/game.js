import API from '@/api/apiUrl'
import Request from '@/assets/http'
import { parseTime } from '@/assets/utils'

const game = {
  state: {
    lastItem: {},
    activeIndex: 1
  },

  mutations: {
    SET_LAST_ITEM: (state, data) => {
      state.lastItem = data
    },
    SET_ACTIVE_INDEX: (state, data) => {
      state.activeIndex = data
    }
  },

  actions: {
    GetLastItem({ commit }) {
      return new Promise((resolve, reject) => {
        // 请求接口
        Request.httpRequest({
          method: 'get',
          url: API.GetGameDetail,
          params: {
            channelId: localStorage.getItem('channelId'),
            uid: localStorage.getItem('uid')
          },
          success: (data) => {
            if (data) {
              const notStartItem = {
                gameState: '-1',
                ...data
              }
              notStartItem.startDate = parseTime(notStartItem.startDate)
              notStartItem.endDate = parseTime(notStartItem.endDate)
              commit('SET_LAST_ITEM', notStartItem)
              resolve(notStartItem)
            } else {
              resolve(null)
            }
          },
          error: res => {
            reject(res)
          }
        })
      })
    },
    GetGameDetail({ commit }, gameId) {
      return new Promise((resolve, reject) => {
        // 请求接口
        Request.httpRequest({
          method: 'get',
          url: API.GetGameDetail,
          params: {
            channelId: localStorage.getItem('channelId'),
            uid: localStorage.getItem('uid'),
            id: gameId
          },
          success: (data) => {
            const item = {
              ...data
            }
            item.startDate = parseTime(item.startDate)
            item.endDate = parseTime(item.endDate)
            resolve(item)
          },
          error: res => {
            reject(res)
          }
        })
      })
    },
    GetGameCondition({ commit }, gameId = '') {
      return new Promise((resolve, reject) => {
        const params = {
          channelId: localStorage.getItem('channelId'),
          uid: localStorage.getItem('uid')
        }
        if (gameId !== '') {
          params.id = gameId
        }
        // 请求接口
        Request.httpRequest({
          method: 'get',
          url: API.GetGameCondition,
          params: params,
          success: (data) => {
            resolve(data)
          },
          error: res => {
            reject(res)
          }
        })
      })
    }
  }
}

export default game
