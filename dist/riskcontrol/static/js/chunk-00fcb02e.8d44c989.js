(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-00fcb02e"],{"0df7":function(e,t,i){"use strict";var r=i("6a7a"),a=i.n(r);a.a},"6a7a":function(e,t,i){},b58d:function(e,t,i){"use strict";i.r(t);var r=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticStyle:{width:"1447px",height:"340px"}},[i("div",[i("el-col",[i("div",{staticClass:"searchClass"},[i("span",[e._v("优秀风控报告搜索")])])]),e._v(" "),i("el-card",[i("div",[i("el-form",{ref:"riskInfoFileVo",staticClass:"form1",attrs:{model:e.riskFileVo,"label-position":"right",rules:e.ruleValidate,"label-width":"150px"}},[i("el-row",[i("el-col",{attrs:{span:12}},[i("el-form-item",{attrs:{label:"风控报告名称：",prop:"riskFileName"}},[i("el-input",{staticStyle:{width:"100%"},attrs:{"aria-placeholder":"请输入..."},model:{value:e.riskFileVo.riskFileName,callback:function(t){e.$set(e.riskFileVo,"riskFileName",t)},expression:"riskFileVo.riskFileName"}})],1)],1),e._v(" "),i("el-col",{attrs:{span:12}},[i("el-form-item",{style:{marginTop:e.margin},attrs:{label:"出具报告年度：",prop:"riskYear"}},[i("el-date-picker",{staticStyle:{width:"100%"},attrs:{type:"year","aria-placeholder":"请输入...",editable:e.readFlag},on:{"on-change":e.checkDate,"on-clear":e.closeDate},model:{value:e.riskFileVo.riskYear,callback:function(t){e.$set(e.riskFileVo,"riskYear",t)},expression:"riskFileVo.riskYear"}})],1)],1)],1),e._v(" "),i("el-row",[i("el-col",{attrs:{span:12}},[i("el-form-item",{style:{marginTop:e.margin},attrs:{label:"查勘行业：",prop:"professions"}},[i("el-select",{directives:[{name:"loading",rawName:"v-loading",value:e.loadingP,expression:"loadingP"}],staticStyle:{width:"100%"},attrs:{multiple:"",filterable:""},model:{value:e.riskFileVo.professions,callback:function(t){e.$set(e.riskFileVo,"professions",t)},expression:"riskFileVo.professions"}},e._l(e.professionsList,(function(e){return i("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})),1)],1)],1),e._v(" "),i("el-col",{attrs:{span:12}},[i("el-form-item",{style:{marginTop:e.margin},attrs:{label:"查勘险类：",prop:"riskNames"}},[i("el-select",{staticStyle:{width:"100%"},attrs:{multiple:"",filterable:""},model:{value:e.riskFileVo.riskNames,callback:function(t){e.$set(e.riskFileVo,"riskNames",t)},expression:"riskFileVo.riskNames"}},e._l(e.riskNamesList,(function(e){return i("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})),1)],1)],1)],1),e._v(" "),i("el-row",[i("el-col",{attrs:{span:12}},[i("el-form-item",{style:{marginTop:e.margin},attrs:{label:"出具报告机构：",prop:"senders"}},[i("el-select",{directives:[{name:"loading",rawName:"v-loading",value:e.loadingS,expression:"loadingS"}],staticStyle:{width:"100%"},attrs:{multiple:"",filterable:""},model:{value:e.riskFileVo.senders,callback:function(t){e.$set(e.riskFileVo,"senders",t)},expression:"riskFileVo.senders"}},e._l(e.sendersList,(function(e){return i("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})),1)],1)],1),e._v(" "),i("el-col",{attrs:{span:12}},[i("el-form-item",{style:{marginTop:e.margin},attrs:{label:"风控报告来源：",prop:"ascNames"}},[i("el-select",{directives:[{name:"loading",rawName:"v-loading",value:e.loadingA,expression:"loadingA"}],staticStyle:{width:"100%"},attrs:{multiple:"",filterable:""},model:{value:e.riskFileVo.ascNames,callback:function(t){e.$set(e.riskFileVo,"ascNames",t)},expression:"riskFileVo.ascNames"}},e._l(e.ascNamesList,(function(e){return i("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})),1)],1)],1)],1),e._v(" "),i("br"),e._v(" "),i("div",{staticStyle:{textAlign:"center"}},[i("el-button",{attrs:{type:"dashed",icon:"el-icon-refresh-right",round:""},on:{click:function(t){return e.reset("riskInfoFileVo")}}},[e._v("重置")]),e._v(" "),i("el-button",{attrs:{type:"primary",icon:"el-icon-search",round:""},on:{click:e.search}},[e._v("查询")])],1)],1)],1),e._v(" "),i("div",[i("div",{staticClass:"resultClass"},[e._v("\n          查询结果\n        ")]),e._v(" "),i("div",{staticClass:"result-wrapper"},[i("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],attrs:{data:e.riskFiles},on:{"row-dblclick":e.rowBrowse,"sort-change":e.order}},[i("el-table-column",{attrs:{label:"风控报告名称",prop:"riskFileName"}}),e._v(" "),i("el-table-column",{attrs:{label:"查勘行业",prop:"profession"}}),e._v(" "),i("el-table-column",{attrs:{label:"报告年度",sortable:"custom",prop:"riskYear"}}),e._v(" "),i("el-table-column",{attrs:{label:"查勘险类",sortable:"custom",prop:"riskName"}}),e._v(" "),i("el-table-column",{attrs:{label:"报告来源",prop:"ascName"}}),e._v(" "),i("el-table-column",{attrs:{label:"报告机构",prop:"sender"}})],1)],1)]),e._v(" "),i("div",{staticStyle:{textAlign:"center"}},[i("el-pagination",{attrs:{"current-page":e.pageNo,"page-sizes":[5,15,50],"page-size":e.pageSize,total:e.totalCount,layout:"total,prev, pager, next, jumper,sizes"},on:{"size-change":e.changepagesize,"current-change":e.changepage}})],1)])],1)])},a=[],s=(i("7f7f"),i("f6f2")),o={name:"RiskInfoFileQuery",data:function(){return{loadingP:!1,loadingA:!1,loadingS:!1,showicon:"fa fa-angle-double-up fa-2x",validStatusFlag:!1,hideOneFlage:"none",hideTwoFlage:"none",riskFileVo:{riskFileName:"",riskYear:"",professions:[],riskNames:[],senders:[],ascNames:[],validStatus:[]},professionsList:[],ascNamesList:[],sendersList:[],riskNamesList:[{value:"G",label:"工程险"},{value:"Q",label:"企财险"},{value:"9",label:"未说明"}],hideOne:!1,hideTwo:!1,hideThree:!1,riskFiles:[],pageNo:1,pageSize:5,totalCount:0,pageCount:"",orderColumn:"serialNo",orderTitle:"",orderType:!0,showFlag:!1,margin:"1px",center:"center",loading:!1,readFlag:!0,ruleValidate:{}}},created:function(){this.pageNo=1,this.pdfFlag="",this.pdfFlag=this.$route.query.returnBefore,this.remoteMethodProfession(" "),this.remoteMethodAscName(" "),this.remoteMethodSender(" ")},methods:{search:function(){var e=this;this.$refs.riskInfoFileVo.validate((function(t){if(t){e.pageNo=1;//!!let pageSize = Cookies.get('pageSize')
var i=e.pageSize;void 0!==i&&""!==i&&(e.pageSize=parseInt(i)),e.queryRiskFile(),e.showFlag=!0,e.loading=!0,e.showicon="fa fa-angle-double-down fa-2x"}else e.$Message.error("查询条件错误!!!请修改")}))},rowBrowse:function(e,t){this.open(e.url)},open:function(e){this.$store.commit("SET_DATAS",this._data),this.$router.push({path:"/pdf_page",query:{srcUrlMe:e,myData:this._data,flag:"riskInfoFileQuery"}})},queryRiskFile:function(){var e=this;Object(s["e"])(this._data).then((function(t){t.qCexception&&e.$router.push({name:"exception",path:"/exception",params:{ex:t.qCexception,Flag:"1"}}),e.riskFiles=t.dataList,e.totalCount=t.totalCount,e.pageCount=t.totalPage,e.showFlag=!0,e.loading=!1,""!==e.$store.getters.getDatas&&(e.$store.commit("SET_DATAS",""),"serialNo"===e.orderColumn||(!0===e._data.orderType?e.orderType=e._data.orderType:e._data.orderType))}),(function(e){}))},order:function(e){this.loading=!0,this.orderColumn=e.prop,"descending"===e.order?this.orderType=!0:"ascending"===e.order?this.orderType=!1:(this.orderColumn="serialNo",this.orderType=!0),this.queryRiskFile()},reset:function(e){this.$refs[e].resetFields(),this.orderColumn="serialNo",this.orderType=!0,this.orderTitle="",this.pageNo=1,this.riskFiles=[],this.riskFileVo.riskFileName="",this.riskFileVo.riskYear="",this.riskFileVo.professions=[],this.riskFileVo.riskNames=[],this.riskFileVo.senders=[],this.riskFileVo.ascNames=[],this.totalCount=0,this.showFlag=!1},checkDate:function(e,t){""!==e&&(this.readFlag=!1)},closeDate:function(){this.readFlag=!0},remoteMethodProfession:function(e){var t=this;e&&Object(s["f"])({codeType:"profession"}).then((function(e){var i=e.map((function(e){return{value:e.id.codeCode,label:e.codeCname}}));t.professionsList=i}),(function(e){}))},remoteMethodAscName:function(e){var t=this;e&&Object(s["h"])({codeType:"riskFileAscName"}).then((function(e){var i=e.map((function(e){return{value:e.id.codeCode,label:e.codeCname}}));t.ascNamesList=i}),(function(e){}))},remoteMethodSender:function(e){var t=this;e&&Object(s["h"])({codeType:"riskFileSender"}).then((function(e){var i=e.map((function(e){return{value:e.id.codeCode,label:e.codeCname}}));t.sendersList=i}),(function(e){}))},changepage:function(e){this.pageNo=e,this.loading=!0,this.queryRiskFile()},changepagesize:function(e){this.pageNo=1,this.pageSize=e,this.loading=!0,this.queryRiskFile()}}},l=o,n=(i("0df7"),i("2877")),c=Object(n["a"])(l,r,a,!1,null,"a120f454",null);t["default"]=c.exports},f6f2:function(e,t,i){"use strict";i.d(t,"f",(function(){return a})),i.d(t,"h",(function(){return s})),i.d(t,"c",(function(){return o})),i.d(t,"b",(function(){return l})),i.d(t,"d",(function(){return n})),i.d(t,"g",(function(){return c})),i.d(t,"i",(function(){return u})),i.d(t,"a",(function(){return d})),i.d(t,"e",(function(){return p}));var r=i("365c");function a(e){return Object(r["a"])("/riskinfo/claim/riskDCodeQuery",e)}function s(e){return Object(r["a"])("/riskinfo/superRiskReport/riskDCodeQuery",e)}function o(e){return Object(r["b"])("/riskinfo/claim/queryClaim",e)}function l(e){return Object(r["b"])("/riskinfo/expert/queryExpert",e)}function n(e){return Object(r["a"])("/riskinfo/expert/queryRiskInfoExpert",e)}function c(e){return Object(r["a"])("/riskinfo/expert/riskInfoExpertByIntroduce.dialog",e)}function u(e){return Object(r["b"])("/riskinfo/expert/updateExpertDiscuss",e)}function d(e){return Object(r["a"])("/riskinfo/Report/list",e)}function p(e){return Object(r["b"])("/riskinfo/superRiskReport/queryFile",e)}}}]);