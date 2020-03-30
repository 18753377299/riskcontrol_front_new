import { doGet, doPost, doJSONPost } from "./index"

export function riskinsMainCheckQuery(data) {
  return doJSONPost('/riskcheck/queryMain',data)
}

export function exportRiskinsMainReport(data){
  return doJSONPost('/riskcheck/exportRiskinsMainReport',data)
}

export function riskCheckDelete(data){
  return doJSONPost('/riskcheck/riskCheckDelete',data)
}

export function queryRiskcheckByNo(data){
  return doGet('/riskcheck/queryCheckNo', data)
}

export function deleteByRiskcheckNo(data){
  return doJSONPost('/riskcheck/riskCheckDelete', data)
}

export function  riskcheckDownloadPdf(data) {
  return doGet('/riskcheck/downloadPdf',data)
}

export function riskcheckDownloadWord(data){
  return doGet('/riskcheck/downloadWord',data)
}
