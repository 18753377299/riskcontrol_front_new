import { doGet, doPost, doJSONPost } from "./index"

export function queryComCodeCName(data) {
  return doGet('/riskfun/trade/queryComCodeCName', data)
}
export function queryInsuredList(data) {
  return doGet('/intf/customer/customerQuery', data)
}
export function queryInsuredListInModle(data) {
  return doJSONPost('/intf/customer/customerModelQuery', data)
}
export function queryInsuredListByName(data) {
  return doGet('/riskfun/trade/queryInsuredListByName', data)
}
