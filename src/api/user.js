import {doGet, doPost, doJSONPost} from "./index"

export function login(data) {
  return doGet('/login/getInfo', data)
}

export function getUserInfo(token) {
  return doGet('/login/getUserInfo', token)
}
