import { doGet, doPost, doJSONPost } from "./index"

export function riskDCodeQuery(data) {
  return doGet('/riskinfo/claim/riskDCodeQuery', data)
}
export function riskReportDCodeQuery(data) {
  return doGet('/riskinfo/superRiskReport/riskDCodeQuery', data)
}
export function queryRiskInfoClaim(data) {
  return doJSONPost('/riskinfo/claim/queryClaim', data)
}
export function queryExpert(data) {
  return doJSONPost('/riskinfo/expert/queryExpert', data)
}
export function queryRiskInfoExpert(data) {
  return doGet('/riskinfo/expert/queryRiskInfoExpert', data)
}
export function riskInfoExpertByIntroduce(data) {
  return doGet('/riskinfo/expert/riskInfoExpertByIntroduce.dialog', data)
}
export function updateExpertDiscuss(data) {
  return doJSONPost('/riskinfo/expert/updateExpertDiscuss', data)
}
export function list(data) {
  return doGet('/riskinfo/Report/list', data)
}
export function queryRiskInfoFile(data) {
  return doJSONPost('/riskinfo/superRiskReport/queryFile', data)
}
