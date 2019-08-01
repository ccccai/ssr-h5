/* eslint-disable */

/**
 * 环境变量全局 定义和本地存储
 */

const EnvironmentKey = 'environment'

export function getEnvironment() {
  return sessionStorage.getItem(EnvironmentKey)
}

export function setEnvironment(environment) {
  const ENVIRONMENTS = {
    '1': {
      host: '/dev/',
      name: '测试环境'
    },
    '2': {
      host: '/demo/',
      name: '演示环境'
    },
    '3': {
      host: '/production/',
      name: '正式环境'
    }
  }
  if (['1', '2', '3'].includes(environment)) {
    sessionStorage.setItem('host', ENVIRONMENTS[environment].host)
  } else {
    sessionStorage.setItem('host', ENVIRONMENTS['1'].host)
  }
  return sessionStorage.setItem(EnvironmentKey, environment)
}

export function removeEnvironment() {
  sessionStorage.removeItem('host')
  return sessionStorage.removeItem(EnvironmentKey)
}
