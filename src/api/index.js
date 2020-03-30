/**
 * @fileoverview 封装常用http请求
 * @author wangwenjie | wangwenjie@sinosoft.com.cn
 */

import request from '@/utils/request'
import qs from 'qs'
const jwtToken = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ7XCJ1c2VyTmFtZVwiOlwi6aOO5o6n5YWo5Zu9XCIsXCJyaXNrQ29kZVwiOm51bGwsXCJjb21Db2RlXCI6XCIwMDAwMDAwMFwiLFwidXNlckNvZGVcIjpcIkEwMDAwMTE1MzNcIixcInJpc2tDb21Db2RlXCI6bnVsbCxcImNsYXNzQ29kZVwiOm51bGwsXCJlbWFpbFwiOm51bGwsXCJ2ZXJzaW9uXCI6XCJ2MS4wLjEuMFwiLFwiY29tQ05hbWVcIjpcIuaAu-WFrOWPuFwiLFwic2Vzc2lvbklEXCI6bnVsbCxcImxvZ2luQ29tQ29kZVwiOm51bGwsXCJncm91cFVzZXJDb2RlXCI6bnVsbCxcInRhc2tDb2RlTGlzdFwiOltcInJpc2tjb250cm9sXCIsXCJyaXNraW5zXCIsXCJyaXNraW5zXCIsXCJyaXNrc2FsZVwiLFwicmlza3NldFwiLFwicmlza2luc19pbnB1dFwiLFwicmlza2luc19xdWVyeVwiLFwicmlza2luc19xdWVyeVwiLFwicmlza3NhbGVfZXhhbWluZVwiLFwicmlza3NhbGVfY29sbGVjdFwiLFwicmlza3NldF9jbGVhckNhY2hlXCIsXCJyaXNrc2V0X3Jpc2tEbmF0dXJhbFwiLFwicmlza3NldF9yaXNrRG5hdHVyYWxcIixcInJpc2tJbmZvXCIsXCJyaXNraW5zX3NldFwiLFwicmlza2luc191bmRcIixcInJpc2tpbnNleHBfc2V0XCIsXCJyaXNraW5zX3VuZGZpclwiLFwicmlza2luc191bmRzZWNcIixcInJpc2tjaGVja19pbnB1dEFuZFF1ZXJ5XCIsXCJyaXNrY2hlY2tfZGlzdHJpYnV0ZVwiLFwicmlza2luc19zY29yZVwiXSxcInBvc3RMaXN0XCI6W1wicmlza2luc191bmRzZWMt6aOO5o6n5oql5ZGK5LqM57qn5a6h5qC45bKXXCIsXCJyaXNraW5zX3NldC3po47mjqfkv6Hmga_nu7TmiqTlspdcIixcInJpc2tpbnNfdW5kZmlyLemjjuaOp-aKpeWRiuS4gOe6p-WuoeaguOWyl1wiLFwicmlza2luc19pbnB1dC3po47mjqfmiqXlkYrlvZXlhaXlspdcIixcInJpc2tpbnMt6aOO5o6n57uT5p6c5p-l6K-i5bKXXCIsXCJyaXNraW5zZXhwX3NldC3po47mjqfkuJPlrrbnu7TmiqTlspdcIixcInJpc2tjaGVja19pbnB1dEFuZFF1ZXJ5LemjjuaOp-W3oeajgOWyl1wiLFwicmlza3NhbGVfY29sbGVjdC3nhafniYfmoaPmoYjph4fpm4blspdcIixcInJpc2tpbnNfdW5kLemjjuaOp-S_oeaBr-WuoeaguOWyl1wiLFwicmlza3NldC3po47mjqfnrqHnkIblspdcIixcInJpc2tjaGVja19kaXN0cmlidXRlLemjjuaOp-W3oeajgOa0vuWPkeWyl1wiLFwicmlza2luc19xdWVyeS3po47mjqfmiqXlkYrmn6Xor6LlspdcIixcInJpc2tzYWxlX2V4YW1pbmUt54Wn54mH5qGj5qGI5a6h5qC45bKXXCIsXCJyaXNraW5mby3po47mjqfkv6Hmga_lspdcIl0sXCJpc1BDXCI6dHJ1ZSxcImlzT3V0ZXJTeXN0ZW1cIjpmYWxzZX0iLCJleHAiOjE1ODQyNzEwMTh9.cNKSVf5mM_rwKRoWMx3Zas0F8exBLGzxCYOOQbxia3qpw5gnltMI0W5yGcJtRf78oCQdhCESzKhEMG2gWKaQRg'

//get请求
export function doGet(url, params) {
  return request({
    url,
    method: 'get',
    params,
    headers: {
      'jwtToken': jwtToken
    }
  })
}

//post表单
export function doPost(url, data) {
  return request({
    url,
    method: 'post',
    data: qs.stringify(data)
  })
}

//@RequestBody json方式
export function doJSONPost(url, data) {
  return request({
    url,
    method: 'post',
    data: typeof data === 'string' ? data : JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json;',
      // 'jwtToken': jwtToken
    }
  })
}
