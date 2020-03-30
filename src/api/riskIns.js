//import axios from 'axios'
import { doPost, doJSONPost, doGet } from "./index"

export function queryMain(data) {
  return doJSONPost('/riskins/queryMain', data)
}
export function deleteData(data) {
  return doJSONPost('/riskins/riskReportDelete', data)
}
export function queryRiskInsState(data) {
  return doGet('/riskins/queryRiskInsState', data)
}
export function expertRiskReportMain(data) {
  return doJSONPost('/riskins/expertRiskReportMain', data)
}
export function riskInsQueryAddress(data) {
  return doGet('/riskins/queryAddress', data)
}
export function riskInsQueryRiskMainByInsured(data) {
  return doGet('/riskins/queryRiskMainByInsured', data)
}
export function classCodeQuery(data) {
  return doJSONPost('/riskins/classCodeQuery', data)
}
export function riskCodeQuery(data) {
  return doGet('/riskins/riskCodeQuery', data)
}
export function queryRiskDaddress(data) {
  return doGet('/riskins/queryRiskDaddress', data)
}
export function queryAddressByRiskFileNo(data) {
  return doGet('/riskins/queryAddressByRiskFileNo', data)
}
export function queryRiskReportSaleMain(data) {
  return doGet('/riskins/queryRiskReportSaleMain', data)
}
export function customerQuery(data) {
  return doGet('/intf/customer/customerQuery', data)
}
export function listCodeQuery(data) {
  return doGet('/common/codeselect/listCodeQuery', data)
}
/*被保险人*/
export function insured() {
  return doJSONPost('/elasticsearch/prprisk-index-insured/Insured/_search', data)
}
export function customerModelQuery(data) {
  return doJSONPost('/intf/customer/customerModelQuery',data, true)
}
/*国民经济代码*/
export function tradeCode(data) {
  return  doJSONPost('/elasticsearch/prprisk-index/TradeCode/_search', data)
}
export function queryComCode(data) {
  return doGet('/riskins/queryComCode', data)
}
export function saveRiskInsDetailInput(data) {
  return doJSONPost('/riskins/saveRiskInsDetailInput', data)
}
// 风控报告模块接口方法
export function getUnderwriteProcess(data) {
  return doGet('/riskins/getUnderwriteProcess', data)
}
export function queryRiskReport(data) {
  return doGet('/riskins/queryRiskReport', data)
}
export function makeWord(data) {
  return doJSONPost('/riskins/makeWord', data)
}
export function temporarySave(data) {
  return doJSONPost('/riskins/temporarySave', data)
}
export function gradeAndSaveDetail(data) {
  return doJSONPost('/riskins/gradeAndSaveDetail', data)
}
export function underwrite(data) {
  return doGet('/riskins/underwrite', data)
}

/*查勘地址模块*/
export function checkRiskDnaturalAddress(data) {
  return doGet('/riskins/checkRiskDnaturalAddress', data)
}


