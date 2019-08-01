/* 全局定义接口url */
// 获取token
const GetToken = 'byingcar/token'
// 获取用户协议
const GetAgreement = 'rest/drivingBonusRace/userAgreement'
// 用户报名参赛接口
const applyingGame = 'rest/drivingBonusRace/enter'
// 获取比赛内容
const GetGameInfo = 'rest/drivingBonusRace/info'
// 获取某个赛事的详细信息
const GetGameDetail = 'rest/drivingBonusRace/detail'
// 排行榜变化
const GetUserRankingInfo = 'rest/drivingBonusRace/getUserRankingInfo'
// 获取用户车币数
const GetUserInfo = 'rest/drivingBonusRace/getUserInfo'
// 赛况查询接口
const GetGameCondition = 'rest/drivingBonusRace/gameSituation'
// 我的记录及更多接口
const GetGameRecord = 'rest/drivingBonusRace/gameRecord'

export default {
  GetAgreement,
  applyingGame,
  GetGameInfo,
  GetGameDetail,
  GetUserRankingInfo,
  GetUserInfo,
  GetGameCondition,
  GetGameRecord,
  GetToken
}
