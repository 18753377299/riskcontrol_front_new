//表格格式化显示

// 获取行中对应列数据
const getData = (row, column) => {
  if (!row[column.property]) {
    return ''
  }
  return row[column.property]
}

const formatter = {}

//风控报告的版本
formatter.riskModelCheck = function (row, column) {
  const data = row.get("riskModel")
  let str = ""
  if (data === "001") {
    str += "2017版财产险风控模板（专职版）"
  } else if (data === "002") {
    str += "2017版财产险风控模板（兼职版）"
  } else if (data === "004") {
    str += "机器损坏险专用风控模板"
  } else if (data === "005") {
    str += "营业中断险专用风控模板"
  } else if (data === "006") {
    str += "火灾风险排查（专业版）"
  } else if (data === "007") {
    str += "火灾风险排查（简化版）"
  }
  return str
}

export default formatter
