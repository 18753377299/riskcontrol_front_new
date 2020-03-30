<template>
  <div>
    <div style="padding: 10px;">
      <el-card class="box-card">
        <div class="title">
          <i icon="el-icon-search"/>
          风控报告审核
        </div>
        <div v-show="selectShowFlag">
          <el-form ref="riskInsMainVo"
                   :rules="ruleValidate"
                   :model="riskInsMainForm.riskReportMainVo"
                   label-width="140px"
                   label-position="right">
            <el-row>
              <el-col :span="8">
                <el-form-item label="投保险类：" prop="classCode">
                  <el-select v-model="riskInsMainForm.riskReportMainVo.classCode"
                             placeholder="请选择"
                             @on-change="queryRiskCode(riskInsMainForm.riskReportMainVo.classCode)">
                    <el-option v-for="classC in classCodeList" :value="classC.code" :key="classC.code"
                               :label="classC.code --- classC.name"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="投保险种：" prop="riskCode">
                  <el-select v-model="riskInsMainForm.riskReportMainVo.riskCode" placeholder="请选择">
                    <el-option v-for="riskC in riskCodeList"
                               :value="riskC.code"
                               :key="riskC.code">
                      {{ riskC.code }}---{{ riskC.name }}
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="被保险人：" prop="insuredName">
                  <el-input v-model="riskInsMainForm.riskReportMainVo.insuredName" type="text" placeholder="请点击..."
                            @on-enter="codeCodeDialog('insured')">
                    <el-button slot="append" icon="el-icon-search" @click="codeCodeDialog('insured');"/>
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col span="8">
                <el-form-item label="归属机构：" prop="comCode">
                  <el-input v-model="riskInsMainForm.riskReportMainVo.comCodeCName" placeholder="请输入..." style="width: 100%;"
                            @on-blur="queryData('comCode')">
                    <el-button slot="append" icon="ios-search" @click="codeCodeDialog('comCode');"/>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col span="8">
                <el-form-item label="风控编号：" prop="riskFileNo">
                  <el-input v-model="riskInsMainForm.riskReportMainVo.riskFileNo" placeholder="请输入..."
                            style="width: 100%;"/>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="查勘人：" prop="explorer">
                  <el-input v-model="riskInsMainForm.riskReportMainVo.explorerCName" placeholder="请输入..."
                            style="width: 100%;"
                            @on-blur="queryData('explorer')">
                    <el-button slot="append" icon="el-icon-search" @click="codeCodeDialog('explorer')"/>
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="查勘起期：" prop="exploreDateBegin">
                  <el-date-picker v-model="riskInsMainForm.riskReportMainVo.exploreDateBegin" type="date"
                                  placeholder="请选择"
                                  style="width: 100%"></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="查勘止期：" prop="exploreDateEnd">
                  <el-date-picker v-model="riskInsMainForm.riskReportMainVo.exploreDateEnd" type="date"
                                  placeholder="请选择"
                                  style="width: 100%"></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="查勘类别：" prop="exploreType">
                  <el-select v-model="riskInsMainForm.riskReportMainVo.exploreType" type="text" placeholder="请选择">
                    <el-option value="1" label="初勘"></el-option>
                    <el-option value="2" label="复勘"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="报告模板：" prop="riskModel">
                  <el-select v-model="riskInsMainForm.riskReportMainVo.riskModel" type="text" placeholder="请选择">
                    <el-option value="001" label="2017版财产险风控模板（专职版）"></el-option>
                    <el-option value="002" label="2017版财产险风控模板（兼职版）"></el-option>
                    <el-option value="004" label="机器损坏险专用风控模板"></el-option>
                    <el-option value="005" label="营业中断险专用风控模板"></el-option>
                    <el-option value="006" label="火灾风险排查（专业版）"></el-option>
                    <el-option value="007" label="火灾风险排查（简化版）"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="16">
                <el-form-item label="查勘地址：" prop="addressDetail">
                  <el-input v-model="riskInsMainForm.riskReportMainVo.addressDetail" placeholder="请输入..."
                            style="width: 100%;"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <div :style="{textAlign:center}">
              <el-button round  @click="reset('riskInsMainVo')">重置</el-button>
              <el-button round type="primary" @click="searchData()">查询</el-button>
            </div>
          </el-form>
        </div>
      </el-card>
    </div>
    <div style="padding: 10px;">
      <el-card class="box-card">
        <div :width="100" class="title" style="display:inline-block">
          <i icon="document-text"/>
          查询结果
        </div>
        <div class="result-wrapper">
          <el-table ref="selection"
                    :data="riskReportMainList"
                    stripe
                    size="small"
                    align="center"
                    @row-dblclick="rowBrowse"
          > <!--@sort-change="changeOrderType"
                    @select-all="selectAll"
                    @selection-change="selectOne"-->
            <!--            <el-table-column type="selection" min-width="40" fixed></el-table-column>-->
            <el-table-column prop="riskFileNo" label="风险编号" min-width="220"></el-table-column>
            <el-table-column prop="insuredName" label="被保险人" min-width="300"></el-table-column>
            <el-table-column prop="riskCode" label="投保险种" min-width="200"></el-table-column>
            <el-table-column prop="explorerCName" label="查勘人" min-width="200"></el-table-column>
            <el-table-column prop="comCodeCName" label="归属机构" min-width="110"></el-table-column>
            <el-table-column prop="exploreDate" label="查勘日期" min-width="110" sortable="true"></el-table-column>
            <el-table-column prop="exploreType" label="查勘类别" min-width="110"></el-table-column>
            <el-table-column prop="underwriteFlag" label="审核状态" min-width="90" slot-scope="scope">
              <!--              <span v-if="scope.underwriteFlag =="></span>-->
              <span v-if="scope.underwriteFlag === '暂存'" type="Strong"><i icom="information-circled"/>{{ scope.underwriteFlag }}</span>
              <span v-if="scope.underwriteFlag === '通过'" type="Strong"><i icom="checkmark-circled"/>{{ scope.underwriteFlag }}</span>
              <span v-if="scope.underwriteFlag === '待核保'" type="Strong"><i icon="help-circled"/>{{ scope.underwriteFlag}}</span>
              <span v-if="scope.underwriteFlag === '无需核保'" type="Strong"><i icom="checkmark-circled"/>{{ scope.underwriteFlag }}</span>
              <span v-if="scope.underwriteFlag === '待省公司审核'" type="Strong"><i icom="help-circled"/>待二级审核</span>
              <span v-if="scope.underwriteFlag === '待市公司审核'" type="Strong"><i icom="help-circled"/>待审核 </span>
              <span v-if="scope.underwriteFlag === '保存'" type="Strong"><i icom="minus-circled"/>{{ scope.underwriteFlag }}</span>
              <span v-if="scope.underwriteFlag === '不通过'" type="Strong"><i icom="close-circled"/>{{ scope.underwriteFlag }}</span>
              <span v-if="scope.underwriteFlag === '审核中'" type="Strong"><i icom="help-circled"/>{{ scope.underwriteFlag }}</span>
            </el-table-column>
            <el-table-column prop="riskFileNo" label="操作" slot-scope="scope" min-width="110">
              <!--              <span @click="deleteA(scope)">删除</span>-->
              <span v-if="scope.underwriteFlagCode !== '0' && scope.underwriteFlageCode !== 'A' && scope.underwriteFlagCode !== 'T'" @click="openModal1(scope)">流程</span>
              <!--              <span @click="changeA(scope)">修改</span>-->
            </el-table-column>
          </el-table>
          <div :style="{textAlign:center}" class="btnbox">
            <el-pagination :total="riskInsMainForm.totalCount"
                           :page-size="riskInsMainForm.pageSize"
                           :current-page="riskInsMainForm.pageNo"
                           :page-sizes="[5,15,50]"
                           :hide-on-single-page="true"
                           @size-change="changepagesize"
                           layout="total, sizes, prev, pager, next, jumper"
                           @current-change="changepage"></el-pagination>
          </div>
        </div>
      </el-card>
      <!--      <el-dialog :visible.sync="syncDialogShowFlag"-->
      <!--                 @click-on-row="CurrencyDialogClickOnRow"/>-->
    </div>
    <Modal v-model="modal1" :footer-hide="true" title="风控报告审核流程" @on-cancel="cancel">
      <Timeline>
        <div v-for="(item,index) in lctList" :key="index">
          <TimelineItem>
            <p>审核步骤：{{ item.nodeName }}</p>
            <p> 审核人名称：{{ item.operateName }}</p>
            <p>审核时间：{{ item.operateTime }}</p>
            <p v-if="item.nodeName ==='报告打回'">打回原因：{{ item.repulsesugggest }}</p>
            <p v-if="item.nodeName ==='一级审核通过'">审核意见：{{ item.repulsesugggest }}</p>
            <p v-if="item.nodeName ==='二级审核通过'">审核意见：{{ item.repulsesugggest }}</p>
          </TimelineItem>
        </div>
      </Timeline>
    </Modal>
    <!--    <div v-show="false">-->
    <!--      <el-col span="12" style="margin-bottom: 10px;position: relative;height: 300px;">-->
    <!--        <div id="myChart"-->
    <!--             style="width:330px;height: 300px;position: absolute;top: 0;left: 0;right: 0;bottom: 0;margin: auto;"/>-->
    <!--      </el-col>-->
    <!--    </div>-->
    <!--    <Modal v-model="showDownloadModal" ok-text="下载" @on-cancel="cancelDownloadWord">-->
    <!--      <Form :label-width="80">-->
    <!--        <el-form-item label="报告编号">-->
    <!--          <el-input v-model="currentRiskReportNo" readonly></el-input>-->
    <!--        </el-form-item>-->
    <!--        <el-form-item label="报告类型">-->
    <!--          <el-input v-model="downloadFireDangerWordModel.riskModel" readonly></el-input>-->
    <!--        </el-form-item>-->
    <!--        <el-form-item label="下载版本">-->
    <!--          <el-checkboxGroup v-model="downloadFireDangerWordModel.reportType">-->
    <!--            <el-checkbox label="notice">下载火灾风险隐患整改通知书doc版</el-checkbox>-->
    <!--            <el-checkbox label="doc">下载火灾报告doc版</el-checkbox>-->
    <!--            <el-checkbox label="pdf">下载火灾报告pdf版</el-checkbox>-->
    <!--          </el-checkboxGroup>-->
    <!--        </el-form-item>-->
    <!--      </Form>-->
    <!--      <p slot="header" style="text-align:center">-->
    <!--        <span>火灾报告下载</span>-->
    <!--      </p>-->
    <!--      <div slot="footer">-->
    <!--        <el-button type="default" size="default" @click="cancelDownloadWord">取消</el-button>-->
    <!--        <el-button type="primary" size="default" @click="downloadFireDangerWord">下载</el-button>-->
    <!--      </div>-->
    <!--    </Modal>-->
  </div>
</template>

<script>
  // import Cookies from 'js-cookie'
  import { queryMain } from '@/api/riskIns'
  import { getUnderwriteProcess, queryComCode } from '@/api/riskIns'

  export default {
    name: 'RiskInsUnderwrite',
    data() {
      const validateExploreDateBegin = (rule, value, callback) => {
        if (value !== '' && this.riskInsMainForm.riskReportMainVo.exploreDateEnd !== '') {
          if (new Date(value).getTime() > new Date(this.riskInsMainForm.riskReportMainVo.exploreDateEnd).getTime()) {
            callback(new Error('查勘起期不能大于查询止期'))
          } else {
            callback()
          }
        } else {
          callback()
        }
      }
      const validateExploreDateEnd = (rule, value, callback) => {
        if (value !== '' && this.riskInsMainForm.riskReportMainVo.exploreDateBegin !== '') {
          if (new Date(value).getTime() < new Date(this.riskInsMainForm.riskReportMainVo.exploreDateBegin).getTime()) {
            callback(new Error('查勘止期不能小于查询起期'))
          } else {
            callback()
          }
        } else {
          callback()
        }
      }
      return {
        // showDownloadModal: false,
        // downloadFireDangerWordModel: {
        //   reportNo: this.currentRiskReportNo,
        //   riskModel: '',
        //   reportType: []
        // },
        // currentRiskReportNo: '',
        // currentRiskReportUnderwriteflag: '',
        // orderColumn: 'riskFileNo',
        showicon: 'fa fa-angle-double-up fa-2x',
        selectShowFlag: true,
        // postListFlag: false,
        // myChart: '',
        lctList: [],
        // multipleSelection: [],
        modal1: false,
        riskInsMainForm: {
          riskReportMainVo: {
            classCode: '',
            riskCode: '',
            insuredName: '',
            insuredCode: '',
            riskFileNo: '',
            explorer: '',
            explorerCode: '',
            explorerCName: '',
            comCode: '',
            comCodeCName: '',
            exploreDateBegin: '',
            exploreDateEnd: '',
            exploreType: '',
            riskModel: '',
            addressDetail: '',
            // underwriteFlag: [],
            riskFileNoList: [],
            businessType: 'underwrite'
          },
          repulsesugggest: '',
          pageNo:
            1,
          pageSize:
            5,
          totalCount:
            0,
          pageCount:
            ''
        }
        ,
        ruleValidate:
          {
            exploreDateBegin: [
              { validator: validateExploreDateBegin }
            ],
            exploreDateEnd: [
              { validator: validateExploreDateEnd }
            ]
          },
        // m: '',
        // postListStr:
        //   [],
        loading: false,
        showFlag: false,
        classCodeList: [],
        riskCodeList: [],
        center: 'center',
        riskReportMainList: [],
//         Option:
//           {
//             tooltip: {
//               show: 'postListFlag',
//               trigger:
//                 'item'
//             },
//             radar: {
//               grid: { // 控制图的大小，调整下面这些值就可以，
//                 x: 30,
//                 x2:
//                   70,
//                 y2:
//                   170// y2可以控制 X轴跟Zoom控件之间的间隔，避免以为倾斜后造成 label重叠到zoom上
//               },
//               radius: 106,
//               center:
//                 ['50%', '50%'],
//               name:
//                 {
//                   textStyle: {
//                     color:
//                       '#fff',
//                     backgroundcolor:
//                       '#999',
//                     borderRadius:
//                       3,
//                     padding:
//                       [3, 5]
//
//                   }
//                 },
//               splitArea: {
//                 areaStyle: {
//                   color:
//                     ['rgba(255,23,33,0.5)',
//                       'rgba(255,204,153,0.5)', 'rgba(255,255,204,0.5)',
//                       'rgba(153,204,255,0.5)', 'rgba(119,155,255,0.5)']
//                 }
//               },
//               indicator: [
//                 { text: '防火灾', max: 100 },
//                 { text: '防水灾', max: 100 },
//                 { text: '防风灾', max: 100 },
//                 { text: '防雷击', max: 100 },
//                 { text: '防雪灾', max: 100 },
//                 { text: '防盗抢', max: 100 },
//                 { text: '防地震', max: 100 },
//                 { text: '防地质灾害', max: 100 }
//               ]
//             },
//             series: [
//               {
//                 name: '标的评估风险值',
//                 type: 'radar',
//                 lineStyle: {
//                   normal: {
//                     color:
//                       '#FF9900'// 图表中各个图区域的颜色
//                   }
//                 },
//
//                 data: [
//                   {
//                     value: [],
//                     name: '标的评估风险值',
//                     itemStyle: {
//                       normal: {
//                         areaStyle: {
//                           type: 'default',
//                           opacity: 0 // 图表中各个图区域的透明度
// //                        color: '#D8504B' // "#af2009"  //  图表中各个图区域的颜色
//                         }
//                       }
//                     },
//                     label: {
//                       normal: {
//                         show: 'postListFlag',
//                         color:
//                           '#16d820'
//                       }
//                     }
//                   }
//                 ]
//               }
//             ]
//           }
      }
    },
    created() {
      // this.queryClassCode()
      // if (this.$store.getters.getDatas !== '') {
      //   this._data = this.$store.getters.getDatas
      //   this.$store.commit('SET_DATAS', '')
      // this.queryRiskInsMain()
      // }
    },
    methods: {
      // selectOne(val) {
      //   this.multipleSelection = val
      // },
      // selectAll(val) {
      //   this.multipleSelection = val
      // },
      openModal1(scope) {
        this.modal1 = true
        let executionId = scope.executionId
        let underwriteFlagCode = scope.underwriteFlagCode
        const data = { executionId: executionId, underwriteFlag: underwriteFlagCode}
        getUnderwriteProcess(data)
          .then(response => {
            this.lctList = response.data
          })

      },
      reset() {
        this.riskInsMainForm.pageNo = 1
        this.riskInsMainForm.totalCount = 0
        this.showFlag = false
        this.riskInsMainForm.riskReportMainVo.classCode = ''
        this.riskInsMainForm.riskReportMainVo.riskCode = ''
        this.riskInsMainForm.riskReportMainVo.insuredName = ''
        this.riskInsMainForm.riskReportMainVo.insuredCode = ''
        this.riskInsMainForm.riskReportMainVo.riskFileNo = ''
        this.riskInsMainForm.riskReportMainVo.explorer = ''
        this.riskInsMainForm.riskReportMainVo.explorerCode = ''
        this.riskInsMainForm.riskReportMainVo.explorerCName = ''
        this.riskInsMainForm.riskReportMainVo.comCode = ''
        this.riskInsMainForm.riskReportMainVo.comCodeCName = ''
        this.riskInsMainForm.riskReportMainVo.exploreType = ''
        this.riskInsMainForm.riskReportMainVo.riskModel = ''
        this.riskInsMainForm.riskReportMainVo.addressDetail = ''
        this.riskReportMainList = []
        // this.riskInsMainForm.riskReportMainVo.underwriteFlag = []
        // this.multipleSelection = []
        this.$nextTick(function () {
          this.riskInsMainForm.riskReportMainVo.exploreDateBegin = ''
          this.riskInsMainForm.riskReportMainVo.exploreDateEnd = ''
        })
        // 循环清空表单时间域字段值
        this.$refs.riskInsMainVo.fields.forEach(function (e) {
          if (e.prop === 'exploreDateBegin') {
            e.resetField()
          }
          if (e.prop === 'exploreDateEnd') {
            e.resetField()
          }
        })
      },
      cancel() {
        this.modal1 = false
      },
      CurrencyDialogClickOnRow (data) { // 接收数据
        if (this.DialogConfig.codeType === 'comCode') {
          this.riskReportMainVo.comCode = data.col1
          this.riskReportMainVo.comCodeCName = data.col2
        } else if (this.DialogConfig.codeType === 'UserCode') {
          this.riskReportMainVo.explorer = data.col1
          this.riskReportMainVo.explorerCName = data.col2
        } else if (this.DialogConfig.codeType === 'insured') {
          this.riskReportMainVo.insuredCode = data.col1
          this.riskReportMainVo.insuredName = data.col2
        }
      },
      syncDialogShowFlag (val) { // 同步更新父子组件状态
        this.DialogConfig.dialogFlag = val
      },
      codeCodeDialog (val) {
        if (val === 'explorer') {
          if (this.riskReportMainVo.explorerCName === '') {
            this.$Message.error('请录入查勘人代码或名称！')
            return
          }
        }
        switch (val) {
          case 'comCode':
            // 是否取消滚动条
            this.DialogConfig.fixedHeader = true
            // 展示modal标志
            this.DialogConfig.dialogFlag = true
            // 业务类型
            this.DialogConfig.codeType = 'comCode'
            // 关键字描述
            this.DialogConfig.keyWordDesc = '查询机构'
            // 查询关键字
            this.DialogConfig.keyWord = this.riskReportMainVo.comCodeCName
            // 接口地址
            // this.DialogConfig.requestURL = '/riskins/queryComCode'
            // 自定义table表头
            this.DialogConfig.columnTitles = [
              {title: '序号', key: 'index', type: 'index', width: 60, align: 'center'},
              {title: '机构代码', key: 'col1', align: 'center'},
              {title: '机构简称', key: 'col2', align: 'center'},
              {title: '机构名称', key: 'col3', align: 'center'}
            ]
            break
          case 'explorer':
            // 是否取消滚动条
            this.DialogConfig.fixedHeader = true
            // 展示modal标志
            this.DialogConfig.dialogFlag = true
            // 业务类型
            this.DialogConfig.codeType = 'UserCode'
            // 关键字描述
            this.DialogConfig.keyWordDesc = '查勘人'
            // 查询关键字
            this.DialogConfig.keyWord = this.riskReportMainVo.explorerCName
            // 接口地址
            // this.DialogConfig.requestURL = '/common/codeselect/listCodeQuery'
            // 自定义table表头
            this.DialogConfig.columnTitles = [
              {title: '序号', key: 'index', type: 'index', width: 60, align: 'center'},
              {title: '查勘人代码', key: 'col1', align: 'center'},
              {title: '查勘人名称', key: 'col2', align: 'center'}
            ]
            break
          case 'insured':
            // 是否取消滚动条
            this.DialogConfig.fixedHeader = true
            // 展示modal标志
            this.DialogConfig.dialogFlag = true
            // 业务类型
            this.DialogConfig.codeType = 'insured'
            // 关键字描述
            this.DialogConfig.keyWordDesc = '被保险人'
            // 查询关键字
            this.DialogConfig.keyWord = this.riskReportMainVo.insuredName
            // 接口地址
            // this.DialogConfig.requestURL = '/common/codeselect/listCodeQuery'
            // 自定义table表头
            this.DialogConfig.columnTitles = [
              {title: '序号', key: 'index', type: 'index', width: 60, align: 'center'},
              {title: '被保险人代码', key: 'col1', align: 'center'},
              {title: '被保险人名称', key: 'col2', align: 'center'},
            ]
            break
          default:
            this.DialogConfig.dialogFlag = false
        }
      },
      queryData (val) {
        var _self = this
        var fieldValue = ''
        var codeType = ''
        let userInfo = this.$store.getters.getUserInfo
//        var displayName = ''
        // 依据入参val区分双击域字段，组织关键字
        if (val === 'comCode') {
          fieldValue = _self.riskReportMainVo.comCodeCName
          if (fieldValue === '' && fieldValue.trim() === '') {
            _self.riskReportMainVo.comCode = ''
            return
          }
          codeType = 'CodeType_ComCode'
        } else if (val === 'explorer') {
          fieldValue = _self.riskReportMainVo.explorerCName
          if (fieldValue === '' && fieldValue.trim() === '') {
            _self.riskReportMainVo.explorer = ''
            return
          }
          codeType = 'UserCode' // UserCode
        }
        if (codeType === 'UserCode') {
          this.$api.getMethodParam('/common/codeselect/listCodeQuery', {userCode: userInfo.userCode, comCode: userInfo.comCode, riskCode: userInfo.riskCode, codeType: codeType, pageNo: 1, pageSize: 10, keyWord: fieldValue}, true).then((response) => {
            try {
              if (response.data !== null && response.data.result.length === 1) {
                _self.riskReportMainVo.explorerCName = response.data.result[0][1]
                _self.riskReportMainVo.explorer = response.data.result[0][0]
              } else if (response.data !== null && response.data.result.length > 1) {
                this.codeCodeDialog('explorer')
              } else {
                this.$Message.error('此查勘人不存在')
                return
              }
            } catch (exception) {
              history.go(0)
            }
          }, (response) => {
            // error callback
          })
        } else if (codeType === 'CodeType_ComCode') {
          let param = {userCode: userInfo.userCode, pageNo: 1, pageSize: 5, keyWord: fieldValue}
          queryComCode(param).then((response) => {
            try {
              if (response.dataList != null && response.dataList.length === 1) {
                _self.riskReportMainVo.comCodeCName = response.dataList[0][1]
                _self.riskReportMainVo.comCode = response.dataList[0][0]
              } else if (response.dataList != null && response.dataList.length > 1) {
                this.codeCodeDialog('comCode')
              } else {
                _self.riskReportMainVo.comCode = ''
                _self.riskReportMainVo.comCodeCName = ''
                this.$Message.error('此查勘机构不存在')
                return
              }
            } catch (exception) {
              history.go(0)
            }
          }, (response) => {
            // error callback
          })
        }
      },


      // deleteA(params) {
      //   this.$api.postMethodParam('/riskins/queryRiskInsState', { riskFileNo: params.riskFileNo }).then((response) => {
      //     if ('T,0,2'.indexOf(response.message) !== -1) {
      //       this.riskCodeList = response.dataList
      //       this.riskInsMainForm.riskReportMainVo.riskFileNoList = [params.riskFileNo]
      //       this.$api.postMethodBody('/riskins/riskReportDelete', this._data.riskInsMainForm.riskReportMainVo).then((response) => {
      //         if (response.message === 'success') {
      //           this.$Message.success('删除成功!')
      //         }
      //         this.riskInsMainForm.riskReportMainVo.riskFileNoList = []
      //       }, (response) => {
      //         // error callback
      //       })
      //     } else {
      //       this.$Message.error(params.riskFileNo + '该风控报告暂不支持删除!')
      //     }
      //   }, (response) => {
      //     // error callback
      //   })
      // },
      // deleteGroup() {
      //   this.$api.postMethodBody('/riskins/riskReportDelete', this._data.riskInsMainForm.riskReportMainVo).then((response) => {
      //     if (response.message === 'success') {
      //       this.$Message.success('删除成功!')
      //       this.multipleSelection = []
      //       this.search()
      //     }
      //     this.riskInsMainForm.riskReportMainVo.riskFileNoList = []
      //   }, (response) => {
      //     // error callback
      //   })
      // },
      searchData() {
        // this.multipleSelection = []
        this.$refs.riskInsMainVo.validate((valid) => {
          if (valid) {
            this.riskInsMainForm.pageNo = 1
            this.loading = true
            this.showFlag = true
            // const pageSize = Cookies.get('pageSize')
            const pageSize = 1
            if (pageSize !== undefined && pageSize !== '') {
              this.riskInsMainForm.pageSize = parseInt(pageSize)
            }
            this.queryRiskInsMain()
            this.selectShowFlag = false
            this.showicon = 'fa fa-angle-double-down fa-2x'
          } else {
            // this.$Message.error('查询条件错误!!!请修改')
          }
        })
      },
      changepage(index) {
        this.riskInsMainForm.pageNo = index
        this.loading = true
        this.queryRiskInsMain()
      },
      changepagesize(value) {
        this.riskInsMainForm.pageNo = 1
        this.riskInsMainForm.pageSize = value
        this.loading = true
        // Cookies.set('pageSize', value)
        this.queryRiskInsMain()
      },
      queryRiskInsMain() {
        // alert(1111)
        // if (this.riskInsMainForm.riskReportMainVo.underwriteFlag.indexOf('4') !== -1) {
        //   if (this.riskInsMainForm.riskReportMainVo.underwriteFlag.indexOf('9') === -1) {
        //     this.riskInsMainForm.riskReportMainVo.underwriteFlag.push('9')
        //   }
        // } else {
        //   const index = this.riskInsMainForm.riskReportMainVo.underwriteFlag.indexOf('9')
        //   if (index !== -1) {
        //     this.riskInsMainForm.riskReportMainVo.underwriteFlag.splice(index, 1)
        //   }
        // }
        // if (this.riskInsMainForm.riskReportMainVo.underwriteFlag.indexOf('1') !== -1) {
        //   if (this.riskInsMainForm.riskReportMainVo.underwriteFlag.indexOf('3') === -1) {
        //     this.riskInsMainForm.riskReportMainVo.underwriteFlag.push('3')
        //   }
        // } else {
        //   const index = this.riskInsMainForm.riskReportMainVo.underwriteFlag.indexOf('3')
        //   if (index !== -1) {
        //     this.riskInsMainForm.riskReportMainVo.underwriteFlag.splice(index, 1)
        //   }
        // }
        queryMain(this.riskInsMainForm).then((response) => {
          // console.log(response)
          if (response.qCexception !== '') {
            this.$router.push({ name: 'exception', path: '/exception', params: { ex: response.qCexception, Flag: '1' } })
          } else {
            this.riskReportMainList = response.dataList
            this.riskInsMainForm.totalCount = response.totalCount
            this.pageCount = response.totalPage
            this.showFlag = true
            this.loading = false
          }
        }, (response) => {

        })
//         this.$api.postMethodBody('/riskins/queryMain', this._data.riskInsMainForm).then((response) => {
//           if (response.qCexception !== '') {
//             this.$router.push({ name: 'exception', path: '/exception', params: { ex: response.qCexception, Flag: '1' } })
//           } else {
//             this.riskReportMainList = response.dataList
// //          console.log(this.riskReportMainList)
//             this.riskInsMainForm.totalCount = response.totalCount
//             this.pageCount = response.totalPage
//             this.showFlag = true
//             this.loading = false
//           }
//         }, (response) => {
//           // error callback
//         })
      },

      rowBrowse(data, index) {
        this.$store.commit('SET_DATAS', this._data)
        if (data.underwriteFlag !== '审核中') {
          if (data.riskModel === '001') {
//          this.$Message.success('显示专职页面')
            this.$router.push({
              path: '/riskins_input',
              query: {
                riskFileNo: data.riskFileNo,
                editModel: 'browse',
                riskModel: data.riskModel,
                returnButtonState: true,
                reviewedButtonState: false,
                backButtonState: true
              }
            })
          } else if (data.riskModel === '002') {
            this.$router.push({
              path: '/riskins_pluralism',
              query: {
                riskFileNo: data.riskFileNo,
                editModel: 'browse',
                riskModel: data.riskModel,
                returnButtonState: true,
                reviewedButtonState: false,
                backButtonState: true
              }
            })
          } else if (data.riskModel === '004') {
            this.$router.push({
              path: '/riskins_machine',
              query: {
                riskFileNo: data.riskFileNo,
                editModel: 'browse',
                riskModel: data.riskModel,
                returnButtonState: true,
                reviewedButtonState: false,
                backButtonState: true
              }
            })
          } else if (data.riskModel === '005') {
            this.$router.push({
              path: '/riskins_clobusiness',
              query: {
                riskFileNo: data.riskFileNo,
                editModel: 'browse',
                riskModel: data.riskModel,
                returnButtonState: true,
                reviewedButtonState: false,
                backButtonState: true
              }
            })
          } else if (data.riskModel === '006') {
            this.$router.push({
              path: '/riskins_firePro',
              query: {
                riskFileNo: data.riskFileNo,
                editModel: 'browse',
                riskModel: data.riskModel,
                returnButtonState: true,
                reviewedButtonState: false,
                backButtonState: true
              }
            })
          } else if (data.riskModel === '007') {
            this.$router.push({
              path: '/riskins_firePlu',
              query: {
                riskFileNo: data.riskFileNo,
                editModel: 'browse',
                riskModel: data.riskModel,
                returnButtonState: true,
                reviewedButtonState: false,
                backButtonState: true
              }
            })
          }
        } else {
          if (data.riskModel === '001') {
            //          this.$Message.success('显示专职页面')
            this.$router.push({
              path: '/riskins_input',
              query: {
                riskFileNo: data.riskFileNo,
                editModel: 'browse',
                riskModel: data.riskModel,
                returnButtonState: true,
                reviewedButtonState: false,
                backButtonState: false
              }
            })
          } else if (data.riskModel === '002') {
            this.$router.push({
              path: '/riskins_pluralism',
              query: {
                riskFileNo: data.riskFileNo,
                editModel: 'browse',
                riskModel: data.riskModel,
                returnButtonState: true,
                reviewedButtonState: false,
                backButtonState: false
              }
            })
          } else if (data.riskModel === '004') {
            this.$router.push({
              path: '/riskins_machine',
              query: {
                riskFileNo: data.riskFileNo,
                editModel: 'browse',
                riskModel: data.riskModel,
                returnButtonState: true,
                reviewedButtonState: false,
                backButtonState: false
              }
            })
          } else if (data.riskModel === '005') {
            this.$router.push({
              path: '/riskins_clobusiness',
              query: {
                riskFileNo: data.riskFileNo,
                editModel: 'browse',
                riskModel: data.riskModel,
                returnButtonState: true,
                reviewedButtonState: false,
                backButtonState: false
              }
            })
          } else if (data.riskModel === '006') {
            this.$router.push({
              path: '/riskins_firePro',
              query: {
                riskFileNo: data.riskFileNo,
                editModel: 'browse',
                riskModel: data.riskModel,
                returnButtonState: true,
                reviewedButtonState: false,
                backButtonState: false
              }
            })
          } else if (data.riskModel === '007') {
            this.$router.push({
              path: '/riskins_firePlu',
              query: {
                riskFileNo: data.riskFileNo,
                editModel: 'browse',
                riskModel: data.riskModel,
                returnButtonState: true,
                reviewedButtonState: false,
                backButtonState: false
              }
            })
          }
        }
      },
      // changeOrderType(column) {
      //   this.loading = true
      //   this.orderColumn = column.key
      //   if (column.order === 'asc') {
      //     this.orderType = false
      //     this.queryRiskInsMain()
      //   }
      //   if (column.order === 'desc') {
      //     this.orderType = true
      //     this.queryRiskInsMain()
      //   }
      //   if (column.order === 'normal') {
      //     this.orderColumn = 'riskFileNo'
      //     this.queryRiskInsMain()
      //   }
      // },
    },
  }

</script>

<style lang="scss">

</style>
