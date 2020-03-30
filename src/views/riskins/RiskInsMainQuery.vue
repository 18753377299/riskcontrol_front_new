<template>
  <div>
    <div style="padding: 10px;">
      <el-card class="box-card">
        <div class="title">
          <i icon="el-icon-search"/>
          风控报告查询
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
              <el-col :span="8">
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
              <el-col :span="8">
                <el-form-item label="归属机构：" prop="comCode">
                  <el-input v-model="riskInsMainForm.riskReportMainVo.comCodeCName" placeholder="请输入..."
                            style="width: 100%;"
                            @on-blur="queryData('comCode')">
                    <el-button slot="append" icon="el-icon-search" @click="codeCodeDialog('comCode');"/>
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
            <el-row>
              <el-col :span="24">
                <el-form-item label="审核状态：" prop="underwriteFlag">
                  <el-checkbox-group v-model="riskInsMainForm.riskReportMainVo.underwriteFlag" align="left">
                    <el-checkbox label="T">
                      <span>暂存</span>
                    </el-checkbox>
                    <el-checkbox label="0">
                      <span>保存</span>
                    </el-checkbox>
                    <el-checkbox label="4">
                      <span>待审核</span>
                    </el-checkbox>
                    <el-checkbox label="1">
                      <span>通过</span>
                    </el-checkbox>
                    <el-checkbox label="2">
                      <span>不通过</span>
                    </el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
              </el-col>
            </el-row>
            <div :style="{textAlign:center}">
              <el-button round  @click="reset('riskInsMainVo')">重置</el-button>
              <el-button round type="primary" @click="searchData">查询</el-button>
            </div>
          </el-form>
        </div>
        <!--        <div class="hideel-button">-->
        <!--          <div class="iconBox" @click="changeSelect">-->
        <!--            <i :class="showicon" aria-hidden="true"/>-->
        <!--          </div>-->
        <!--        </div>-->
      </el-card>
    </div>
    <div style="padding: 10px;">
      <!--      <el-card v-if="showFlag" class="box-card">-->
      <el-card class="box-card">
        <div :width="100" class="title" style="display:inline-block">
          <i icon="document-text"/>
          查询结果
        </div>
        <div :width="100" style="float:right">
          <el-popconfirm title="您确认删除这些内容吗？" @onConfirm="deleteAll(multipleSelection)">
            <el-button slot="reference" type="primary" size="mini">删除</el-button>
          </el-popconfirm>
        </div>
        <div :width="100" style="padding-right:20px;float:right">
          <el-popconfirm title="您确认导出这些数据吗？" @onConfirm="exportRiskInsMainResult()">
            <el-button slot="reference" type="primary" size="mini">导出</el-button>
          </el-popconfirm>
          <!--<el-button type="primary" size="small" v-on:click="exportRiskInsMainResult() ">导出</el-button>-->
        </div>
        <div class="result-wrapper">
          <el-table ref="selection"
                    :data="riskReportMainList"
                    stripe
                    size="small"
                    align="center"
                    @row-dblclick="rowBrowse"
                    @sort-change="changeOrderType"
                    @select-all="selectAll"
                    @selection-change="selectOne"
          >
            <el-table-column type="selection" min-width="40" fixed></el-table-column>
            <el-table-column prop="riskFileNo" label="风险编号" min-width="220"></el-table-column>
            <el-table-column prop="riskModel" label="报告模板" min-width="320">
              <template slot-scope="scope">
                <span v-if="scope.row.riskModel === '001'">2017版财产险风控模板（专职版）</span>
                <span v-if="scope.row.riskModel === '002'">2017版财产险风控模板（兼职版）</span>
                <span v-if="scope.row.riskModel === '004'">机器损坏险专用风控模板</span>
                <span v-if="scope.row.riskModel === '005'">营业中断险专用风控模板</span>
                <span v-if="scope.row.riskModel === '006'">火灾风险排查（专业版）</span>
                <span v-if="scope.row.riskModel === '007'">火灾风险排查（简化版）</span>
              </template>
            </el-table-column>
            <el-table-column prop="insuredName" label="被保险人" min-width="300"></el-table-column>
            <el-table-column prop="riskCode" label="投保险种" min-width="200"></el-table-column>
            <el-table-column prop="explorerCName" label="查勘人" min-width="200"></el-table-column>
            <el-table-column prop="comCodeCName" label="归属机构" min-width="110"></el-table-column>
            <el-table-column prop="exploreDate" label="查勘日期" min-width="110" sortable="true"></el-table-column>
            <el-table-column prop="exploreType" label="查勘类别" min-width="110"></el-table-column>
            <el-table-column prop="mobileFlag" label="录入终端" min-width="100"></el-table-column>
            <el-table-column prop="underwriteFlag" label="审核状态" min-width="90">
              <template slot-scope="scope">
                <span v-if="scope.row.underwriteFlag === '暂存'" type="Strong"><i icom="information-circled"/>{{ scope.row.underwriteFlag }}</span>
                <span v-if="scope.row.underwriteFlag === '通过'" type="Strong"><i icom="checkmark-circled"/>{{ scope.row.underwriteFlag }}</span>
                <span v-if="scope.row.underwriteFlag === '自动审核通过'" type="Strong"><i icom="checkmark-circled"/>{{ scope.row.underwriteFlag }}</span>
                <span v-if="scope.row.underwriteFlag === '待省公司审核'" type="Strong"><i icom="help-circled"/>{{ scope.row.underwriteFlag }}</span>
                <span v-if="scope.row.underwriteFlag === '待市公司审核'" type="Strong"><i icom="help-circled"/>{{ scope.row.underwriteFlag }}</span>
                <span v-if="scope.row.underwriteFlag === '保存'" type="Strong"><i icom="minus-circled"/>{{ scope.row.underwriteFlag }}</span>
                <span v-if="scope.row.underwriteFlag === '不通过'" type="Strong"><i icom="close-circled"/>{{ scope.row.underwriteFlag }}</span>
                <span v-if="scope.row.underwriteFlag === '审核中'" type="Strong"><i icom="help-circled"/>{{ scope.row.underwriteFlag }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="riskFileNo" label="操作" min-width="110">
              <template slot-scope="scope">
               `<span @click="deleteA(scope)">删除</span>
                <span>修改</span>
              </template>
            </el-table-column>
          </el-table>
          <div :style="{textAlign:center}" class="btnbox">
            <el-pagination :total="riskInsMainForm.totalCount"
                           :page-size="riskInsMainForm.pageSize"
                           :current-page="riskInsMainForm.pageNo"
                           :page-sizes="[5,15,50]"
                           :hide-on-single-page="true"
                           @size-change="changepagesize"
                           @current-change="changepage"
                           layout="total, sizes, prev, pager, next, jumper"></el-pagination>
          </div>
        </div>
      </el-card>
      <!--      <el-dialog :visible.sync="syncDialogShowFlag"-->
      <!--                 @click-on-row="CurrencyDialogClickOnRow"/>-->
    </div>
    <!--    <Modal v-model="modal1" :footer-hide="true" title="风控报告审核流程" @on-cancel="cancel">-->
    <!--      <Timeline>-->
    <!--        <div v-for="item in lctList">-->
    <!--          <TimelineItem>-->
    <!--            <p>审核步骤：{{ item.nodeName }}</p>-->
    <!--            <p> 审核人名称：{{ item.operateName }}</p>-->
    <!--            <p>审核时间：{{ item.operateTime }}</p>-->
    <!--            <p v-if="item.nodeName ==='报告打回'">打回原因：{{ item.repulsesugggest }}</p>-->
    <!--            <p v-if="item.nodeName ==='一级审核通过'">审核意见：{{ item.repulsesugggest }}</p>-->
    <!--            <p v-if="item.nodeName ==='二级审核通过'">审核意见：{{ item.repulsesugggest }}</p>-->
    <!--          </TimelineItem>-->
    <!--        </div>-->
    <!--      </Timeline>-->
    <!--    </Modal>-->
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
  import { expertRiskReportMain, queryMain, queryRiskInsState } from '@/api/riskIns'
  import { deleteData } from "../../api/riskIns"

  export default {
    name: 'RiskInsMain',
    // components: {CurrencyDialog, IEcharts},
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
        showDownloadModal: false,
        downloadFireDangerWordModel: {
          reportNo: this.currentRiskReportNo,
          riskModel: '',
          reportType: []
        },
        currentRiskReportNo: '',
        currentRiskReportUnderwriteflag: '',
        orderColumn: 'riskFileNo',
        showicon: 'fa fa-angle-double-up fa-2x',
        selectShowFlag: true,
        postListFlag: false,
        myChart: '',
        lctList: [],
        multipleSelection: [],
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
            underwriteFlag: [],
            riskFileNoList: [],
            businessType: 'query'
          },
          repulsesugggest: '',
          pageNo: 1,
          pageSize: 5,
          totalCount: 0,
          pageCount: ''
        },
        ruleValidate:
          {
            exploreDateBegin: [
              { validator: validateExploreDateBegin }
            ],
            exploreDateEnd:
              [
                { validator: validateExploreDateEnd }
              ]
          },
        m: '',
        postListStr:
          [],
        loading:
          false,
        showFlag:
          false,
        classCodeList:
          [],
        riskCodeList:
          [],
        center:
          'center',
        riskReportMainList:
          [],
        Option:
          {
            tooltip: {
              show: 'postListFlag',
              trigger:
                'item'
            },
            radar: {
              grid: { // 控制图的大小，调整下面这些值就可以，
                x: 30,
                x2:
                  70,
                y2:
                  170// y2可以控制 X轴跟Zoom控件之间的间隔，避免以为倾斜后造成 label重叠到zoom上
              },
              radius: 106,
              center:
                ['50%', '50%'],
              name:
                {
                  textStyle: {
                    color:
                      '#fff',
                    backgroundcolor:
                      '#999',
                    borderRadius:
                      3,
                    padding:
                      [3, 5]

                  }
                },
              splitArea: {
                areaStyle: {
                  color:
                    ['rgba(255,23,33,0.5)',
                      'rgba(255,204,153,0.5)', 'rgba(255,255,204,0.5)',
                      'rgba(153,204,255,0.5)', 'rgba(119,155,255,0.5)']
                }
              },
              indicator: [
                { text: '防火灾', max: 100 },
                { text: '防水灾', max: 100 },
                { text: '防风灾', max: 100 },
                { text: '防雷击', max: 100 },
                { text: '防雪灾', max: 100 },
                { text: '防盗抢', max: 100 },
                { text: '防地震', max: 100 },
                { text: '防地质灾害', max: 100 }
              ]
            },
            series: [
              {
                name: '标的评估风险值',
                type: 'radar',
                lineStyle: {
                  normal: {
                    color:
                      '#FF9900'// 图表中各个图区域的颜色
                  }
                },

                data: [
                  {
                    value: [],
                    name: '标的评估风险值',
                    itemStyle: {
                      normal: {
                        areaStyle: {
                          type: 'default',
                          opacity: 0 // 图表中各个图区域的透明度
//                        color: '#D8504B' // "#af2009"  //  图表中各个图区域的颜色
                        }
                      }
                    },
                    label: {
                      normal: {
                        show: 'postListFlag',
                        color:
                          '#16d820'
                      }
                    }
                  }
                ]
              }
            ]
          }
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
      selectOne(val) {
        this.multipleSelection = val
      },
      selectAll(val) {
        this.multipleSelection = val
      },
      deleteAll(params) {
        if (params.length === 0) {
          this.$Message.success('请选择要删除的数据!')
        } else {
          const newList = []
          for (var i = 0; i < params.length; i++) {
            if (params[i].underwriteFlag === '通过' || params[i].underwriteFlag === '自动审核通过') {
              this.$Message.warning('报告：' + params[i].riskFileNo + ' 已提交审核或审核通过，不允许删除！')
              this.multipleSelection = []
            } else {
              newList.push(params[i].riskFileNo)
            }
          }
          if (newList.length > 0) {
            this.riskInsMainForm.riskReportMainVo.riskFileNoList = newList
            this.deleteGroup()
          }
        }
      },
      exportRiskInsMainResult() {
//        对查询条件进行校验和处理
        if (this.riskInsMainForm.riskReportMainVo.underwriteFlag.indexOf('4') !== -1) {
          if (this.riskInsMainForm.riskReportMainVo.underwriteFlag.indexOf('9') === -1) {
            this.riskInsMainForm.riskReportMainVo.underwriteFlag.push('9')
          }
        } else {
          const index = this.riskInsMainForm.riskReportMainVo.underwriteFlag.indexOf('9')
          if (index !== -1) {
            this.riskInsMainForm.riskReportMainVo.underwriteFlag.splice(index, 1)
          }
        }
        if (this.riskInsMainForm.riskReportMainVo.underwriteFlag.indexOf('1') !== -1) {
          if (this.riskInsMainForm.riskReportMainVo.underwriteFlag.indexOf('3') === -1) {
            this.riskInsMainForm.riskReportMainVo.underwriteFlag.push('3')
          }
        } else {
          const index = this.riskInsMainForm.riskReportMainVo.underwriteFlag.indexOf('3')
          if (index !== -1) {
            this.riskInsMainForm.riskReportMainVo.underwriteFlag.splice(index, 1)
          }
        }
        //      发送请求到后台
        expertRiskReportMain(this.riskInsMainForm).then((response) => {
          if (response !== null) {
            const filePath = response.data
            if (filePath == null) {
              this.$Message.success('没有可导出的数据  请更换查询条件')
            } else {
              window.location.href = '/' + filePath.substring(filePath.indexOf('downloadExcel'))
              this.$Message.success('导出风控报告清单成功')
            }
          } else {
            this.$Message.error('导出风控报告清单失败')
          }
        }, (response) => {
          this.$Message.error('导出风控报告清单异常')
        })
      },
      reset(name) {
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
        this.riskInsMainForm.riskReportMainVo.underwriteFlag = []
        this.multipleSelection = []
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
      deleteOne(params) {
        queryRiskInsState({ riskFileNo: params.riskFileNo }).then((response) => {
          if ('T,0,2'.indexOf(response.message) !== -1) {
            this.riskCodeList = response.dataList
            this.riskInsMainForm.riskReportMainVo.riskFileNoList = [params.riskFileNo]
            deleteData(this.riskInsMainForm.riskReportMainVo).then((response) => {
              if (response.message === 'success') {
                this.$Message.success('删除成功!')
              }
              this.mm.riskReportMainVo.riskFileNoList = []
            }, (response) => {
              // error callback
            })
          } else {
            this.$Message.error(params.riskFileNo + '该风控报告暂不支持删除!')
          }
        }, (response) => {
          // error callback
        })
      },
      deleteGroup() {
        deleteData(this.riskInsMainForm.riskReportMainVo).then((response) => {
          if (response.message === 'success') {
            this.$Message.success('删除成功!')
            this.multipleSelection = []
            this.searchData()
          }
          this.riskInsMainForm.riskReportMainVo.riskFileNoList = []
        }, (response) => {
          // error callback
        })
      },
      searchData() {
        this.multipleSelection = []
        console.log(this.$refs)
        this.$refs.riskInsMainVo.validate((valid) => {
          if (valid) {
            this.riskInsMainForm.pageNo = 1
            this.loading = true
            this.showFlag = true
            // const pageSize = Cookies.get('pageSize')
            const pageSize = 5
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
        if (this.riskInsMainForm.riskReportMainVo.underwriteFlag.indexOf('4') !== -1) {
          if (this.riskInsMainForm.riskReportMainVo.underwriteFlag.indexOf('9') === -1) {
            this.riskInsMainForm.riskReportMainVo.underwriteFlag.push('9')
          }
        } else {
          const index = this.riskInsMainForm.riskReportMainVo.underwriteFlag.indexOf('9')
          if (index !== -1) {
            this.riskInsMainForm.riskReportMainVo.underwriteFlag.splice(index, 1)
          }
        }
        if (this.riskInsMainForm.riskReportMainVo.underwriteFlag.indexOf('1') !== -1) {
          if (this.riskInsMainForm.riskReportMainVo.underwriteFlag.indexOf('3') === -1) {
            this.riskInsMainForm.riskReportMainVo.underwriteFlag.push('3')
          }
        } else {
          const index = this.riskInsMainForm.riskReportMainVo.underwriteFlag.indexOf('3')
          if (index !== -1) {
            this.riskInsMainForm.riskReportMainVo.underwriteFlag.splice(index, 1)
          }
        }
        queryMain(this.riskInsMainForm).then((response) => {
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
        if (data.underwriteFlag === '不通过') {
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
      changeOrderType(column) {
        this.loading = true
        this.orderColumn = column.key
        if (column.order === 'asc') {
          this.orderType = false
          this.queryRiskInsMain()
        }
        if (column.order === 'desc') {
          this.orderType = true
          this.queryRiskInsMain()
        }
        if (column.order === 'normal') {
          this.orderColumn = 'riskFileNo'
          this.queryRiskInsMain()
        }
      },
    },
  }

</script>
<style lang="scss" scoped>
/*<style lang="scss" rel="stylesheet/less">*/

</style>
