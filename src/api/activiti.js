/**
 * @fileoverview activiti工作流接口api
 * @author wangwenjie | wangwenjie@sinosoft.com.cn
 */

import { doGet, doPost, doJSONPost } from "./index"

export function getUnderwriteProcess(data) {
  return doGet('/riskins/getUnderwriteProcess', data)
}
