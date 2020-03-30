import { doGet, doPost, doJSONPost } from "./index"

export function queryRiskSaleMain(data) {
  return doJSONPost('/risksale/querySaleMain', data)
}
