import { doPost, doJSONPost, doGet } from "./index"


export function queryDetailAddress(data) {
  return doJSONPost('/riskmap/queryDetailAddress', data)
}

export function searchAddress(data) {
  return doGet('/riskmap/searchAddress', data)
}
