<template>
  <div >
    <div>
      <el-col>
        <div class="searchClass">
          <span>风控巡检查询</span>
        </div>
      </el-col>
      <el-card>
        <div v-show="selectShowFlag">
          <el-form ref="riskinsMainCheckForm" :model="riskCheckRequestVo.riskCheckMainQueryVo" :rules="ruleValidate" label-width="120px" label-position="right">
            <el-row>
              <el-col :span="8">
                <el-form-item label="被保险人名称：" prop="insuredName">
                  <el-input v-model="riskCheckRequestVo.riskCheckMainQueryVo.insuredName" type="text" aria-placeholder="请输入..." style="width: 100%"/>
                </el-form-item>
              </el-col>

              <el-col :span="8">
                <el-form-item label="巡检编号：" prop="riskCheckNo">
                  <el-input v-model="riskCheckRequestVo.riskCheckMainQueryVo.riskCheckNo" type="text" aria-placeholder="请输入..." style="width: 100%" />
                </el-form-item>
              </el-col>

              <el-col :span="8">
                <el-form-item label="巡检人：" prop="checker">
                  <el-input v-model="riskCheckRequestVo.riskCheckMainQueryVo.checkerName" type="text" aria-placeholder="请输入..." style="width: 100%" @on-blur="queryData('checker')" />
                  <Button slot="append" icon="ios-search" @click="codeCodeDialog('checker');"></Button>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="8">
                <el-form-item label="归属机构：" prop="comCode" >
                  <el-input v-model="riskCheckRequestVo.riskCheckMainQueryVo.comCodeCName" type="text" aria-placeholder="请输入..." style="width: 68%" @on-blur="queryData('comCode')"/>
                  <el-button icon="el-icon-search" @click="codeCodeDialog('comCode')"></el-button>
                </el-form-item>
              </el-col>

              <el-col :span="8">
                <el-form-item label="巡检起期：" prop="checkStartDate">
                  <el-date-picker v-model="riskCheckRequestVo.riskCheckMainQueryVo.checkStartDate" type="date" placeholder="请选择" style="width: 100%" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="巡检止期：" prop="checkEndDate">
                  <el-date-picker v-model="riskCheckRequestVo.riskCheckMainQueryVo.checkEndDate" type="date" placeholder="请选择" style="width: 100%" />
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="8">
                <el-form-item label="汛期报告类型：" prop="checkModel" >
                  <el-select v-model="riskCheckRequestVo.riskCheckMainQueryVo.checkModel" placeholder="请选择" style="width: 100%" >
                    <el-option selected label="请选择" :value="1" />
                    <el-option label="2019防汛报告" value="001" />
                    <el-option label="2019防汛报告（简化版）" value="002" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="巡检机构：" prop="comCode" >
                  <el-input v-model="riskCheckRequestVo.riskCheckMainQueryVo.checkComCodeCName" type="text" aria-placeholder="请输入..." style="width: 68%" @on-blur="queryData('checkComCode')"/>
                  <el-button icon="el-icon-search" @click="codeCodeDialog('comCode')"></el-button>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="24">
                <el-form-item label="巡检地址：" prop="addressDetail" >
                  <el-input v-model="riskCheckRequestVo.riskCheckMainQueryVo.addressDetail" type="text" aria-placeholder="请输入..." style="width: 100%" />
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="24">
                <el-form-item label="审核状态：" prop="underwriteFlag" >
                  <el-checkbox-group v-model="riskCheckRequestVo.riskCheckMainQueryVo.underwriteFlag">
                    <el-checkbox label="T"><span>未处理</span></el-checkbox>
                    <el-checkbox label="1"><span>已完成</span></el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <br>
              <div style="textAlign:center">
                <el-button type="dashed" icon="el-icon-refresh-right" round @click="reset('riskinsMainCheckForm')">重置</el-button>
                <el-button type="primary" icon="el-icon-search" round @click="search">查询</el-button>
              </div>
            </el-row>
          </el-form>
        </div>

        <div>
          <div class="resultClass">
            查询结果
            <div style="float:right" :width="100">
              <el-popover placement="top" width="160" v-model="exportVisible">
                <p>您确认导出这些内容吗？</p>
                <div style="text-align: right; margin: 0">
                  <el-button size="mini" type="text" @click="cancelExportPopover()">取消</el-button>
                  <el-button type="primary" size="mini" @click="exportAll(multipleSelection)">确定</el-button>
                </div>
                <el-button size="small" slot="reference">导出</el-button>
              </el-popover>
              <el-popover placement="top" width="160" v-model="delVisible">
                <p>您确认删除这些内容吗？</p>
                <div style="text-align: right; margin: 0">
                  <el-button size="mini" type="text" @click="cancelDelPopover()">取消</el-button>
                  <el-button type="primary" size="mini" @click="deleteAll(multipleSelection)">确定</el-button>
                </div>
                <el-button size="small" slot="reference">删除</el-button>
              </el-popover>
            </div>
          </div>

          <div style="padding: 10px;" >
            <el-table :data="risksMainCheckList" v-loading="loadFlag" @selection-change="handleSelectionChange" @sort-change='resultSort' @row-dblclick="rowBrowse">
              <el-table-column type="selection" prop="selection" />
              <el-table-column label="巡检编号" prop="riskCheckNo" />
              <el-table-column label="被保险人" prop="insuredName" />
              <el-table-column label="巡检人" prop="checker" />
              <el-table-column label="归属机构" prop="comCode" />
              <el-table-column label="巡检机构" prop="checkComCode" />
              <el-table-column label="巡检日期" prop="checkDate" />
              <el-table-column label="巡检地址" prop="addressDetail" />
              <el-table-column label="审核状态" prop="underwriteFlag" />
              <el-table-column label="操作" prop="action">
                <template slot-scope="scope">
                  <div v-show="scope.row.underwriteFlag === 'T'">
                    <el-popover placement="top" trigger="click" width="160" v-model="tableDelVisible[scope.$index]">
                      <p>您确认删除吗？</p>
                      <div style="text-align: right; margin: 0">
                        <el-button size="mini" type="text" @click="canceltableDelPopover(scope.$index,scope.row)">取消</el-button>
                        <el-button type="primary" size="mini" @click="deleteByRiskcheckNo(scope.$index,scope.row)">确定</el-button>
                      </div>
                      <el-button type="text" slot="reference">删除</el-button>
                    </el-popover>


                    <el-popover placement="top" trigger="click" width="160" v-model="updateVisible[scope.$index]">
                      <p>您确认修改吗？</p>
                      <div style="text-align: right; margin: 0">
                        <el-button size="mini" type="text" @click="cancelUpdateVisible(scope.$index)">取消</el-button>
                        <el-button type="primary" size="mini" @click="updateByRiskFileNo(scope.$index,scope.row)">确定</el-button>
                      </div>
                      <el-button type="text" slot="reference">修改</el-button>
                    </el-popover>
                  </div>

                  <div v-show="scope.row.underwriteFlag === '1'">
                    <el-popover placement="top" width="160" v-model="tabDownloadVisible[scope.$index]">
                      <p>您确定要下载这些内容吗？</p>
                      <div style="text-align: right; margin: 0">
                        <el-button size="mini" type="text" @click="cancelTabDownload()">取消</el-button>
                        <el-button type="primary" size="mini" @click="confirmDownloadFile(scope.$index,scope.row)">确定</el-button>
                      </div>
                      <el-button size="small" type="text" slot="reference">下载</el-button>
                    </el-popover>
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>

        <!--分页-->
        <div style="textAlign:center">
          <el-pagination
            :current-page="riskCheckRequestVo.pageNo"
            :page-sizes="[5,15,50]"
            :page-size="riskCheckRequestVo.pageSize"
            :total="riskCheckRequestVo.totalCount"
            layout="total,prev, pager, next, jumper,sizes"
            @size-change="changepagesize"
            @current-change="changepage" />
        </div>
      </el-card>
    </div>

    <currency-dialog :dialog-config="DialogConfig" />

    <el-dialog  v-model="modal1" :footer-hide="true" title="巡检报告审核流程" :visible="downWordVisible">
      <el-form label-width="110px">
        <el-row>
          <el-col :span="24">
            <el-form-item label="报告编号：">
              <el-input v-model="currentRiskCheckNo" type="text" :disabled="true" style="width: 100%"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="报告类型：">
              <el-input v-model="downloadRiskCheckWordModel.checkModel" :disabled="true" type="text" style="width: 100%"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="下载版本：" >
              <el-checkbox-group v-model="downloadRiskCheckWordModel.reportType">
                <el-checkbox label="notice">下载防汛整改通知书doc版</el-checkbox>
                <el-checkbox label="doc">下载防汛报告doc版</el-checkbox>
                <el-checkbox label="pdf">下载防汛报告pdf版</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <p slot="header" style="text-align:center">
        <span>巡检报告下载</span>
      </p>
      <div slot="footer">
        <el-button type="default" size="default" @click="cancelDownloadWord">取消</el-button>
        <el-button type="primary" size="default" @click="wordDownload">下载</el-button>
      </div>
    </el-dialog >
  </div>
</template>

<script>
  import { riskinsMainCheckQuery, exportRiskinsMainReport, riskCheckDelete, queryRiskcheckByNo, deleteByRiskcheckNo, riskcheckDownloadPdf, riskcheckDownloadWord } from "@/api/riskcheck"
  import CurrencyDialog from '../Dialog'
    export default {
      name: "RiskinsMainCheckQuery",
      components: {CurrencyDialog},
      data() {
        return {
          downWordVisible: false,
          updateVisible: [],
          tableDelVisible: [],
          tabDownloadVisible: [],
          delVisible: false,
          exportVisible: false,
          downloadRiskCheckWordModel: {
            checkModel: '',
            reportType: [],
          },
          message: '',
          selectShowFlag: true,
          showicon: 'fa fa-angle-double-up fa-2x',
          DialogConfig: {
            dialogFlag: false
          },
          modal1: false,
          lctList: [],
//      请求到后台的vo对象
          riskCheckRequestVo: {
            riskCheckMainQueryVo: {
              insuredCode: '',
              insuredName: '',
              insuredType: '',
              riskCheckNo: '',
              checker: '',
              checkerName: '',
              checkerComCode: '',
              checkComCodeCName: '',
              checkComCode: '',
              comCode: '',
              comCodeCName: '',
//          checkComCode: '',
              checkStartDate: '',
              checkEndDate: '',
              checkDate: '',
//          巡检报告类型
              checkModel: '',
              addressDetail: '',
//          审核状态
              underwriteFlag: [],
              riskCheckNoList: []
//          业务类型  审核/查询
//          businessType: 'query'
            },
            orderType: 'false',
            orderColumn: 'riskCheckNo',
            pageNo: 1,
            pageSize: 5,
            totalCount: 0,
            pageCount: ''
          },
//      定义表单校验规则和需要校验字段
          ruleValidate: {
          },
//      结果集显示表格table
          loading: false,
//      结果集表单所在card区域
          showFlag: false,
//      巡检查询返回结果集
          risksMainCheckList: [],
//      要修改的选中的数据集合
          multipleSelection: [],
          // 下载word弹框
          showDownloadModal: false,
          // 点击下载后当前行单号
          currentRiskCheckNo: '',
          PFlag: '',
          CDFlag: '',
          // 已完成报告不能删除，批量删除剔除已完成报告
          successMess: ''
        }
      },
      created() {
        // let theme = Cookies.get('theme')
        // if (theme !== undefined) {
        //   this.message = Cookies.get('theme')
        // } else {
        //   this.message = 'blue-skin'
        // }
        // if (this.$store.getters.getDatas !== '') {
        //   this._data = this.$store.getters.getDatas
        //   this.$store.commit('SET_DATAS', '')
        //   this.riskinsMainCheckQuery()
        // }
      },
      methods: {
        codeCodeDialog(val) {
          if (val === 'checker') {
            if (this.riskCheckRequestVo.riskCheckMainQueryVo.checkerName === '') {
              this.$message.error('请录入巡检人名称！')
              return
            }
          }
          switch (val) {
            // 归属机构
            case 'comCode':
              this.CDFlag = '2'
              // 是否取消滚动条
              this.DialogConfig.fixedHeader = true
              // 展示modal标志
              this.DialogConfig.dialogFlag = true
              // 业务类型
              this.DialogConfig.codeType = 'comCode'
              // 关键字描述
              this.DialogConfig.keyWordDesc = '归属机构'
              // 查询关键字
              this.DialogConfig.keyWord = this.riskCheckRequestVo.riskCheckMainQueryVo.comCodeCName
              // 接口地址
              this.DialogConfig.requestURL = '/riskins/queryComCode'
              // 自定义table表头
              this.DialogConfig.columnTitles = [
                {title: '序号', key: 'index', type: 'index', width: 60, align: 'center'},
                {title: '机构代码', key: 'col1', align: 'center'},
                {title: '机构简称', key: 'col2', align: 'center'},
                {title: '机构名称', key: 'col3', align: 'center'}
              ]
              break
            // 巡检人
            case 'checker':
              // 是否取消滚动条
              this.DialogConfig.fixedHeader = true
              // 展示modal标志
              this.DialogConfig.dialogFlag = true
              // 业务类型
              this.DialogConfig.codeType = 'UserCode'
              // 关键字描述
              this.DialogConfig.keyWordDesc = '巡检人'
              // 查询关键字
              this.DialogConfig.keyWord = this.riskCheckRequestVo.riskCheckMainQueryVo.checkerName
              // 接口地址
              this.DialogConfig.requestURL = '/common/codeselect/listCodeQuery'
              // 自定义table表头
              this.DialogConfig.columnTitles = [
                {title: '序号', key: 'index', type: 'index', width: 60, align: 'center'},
                {title: '巡检人代码', key: 'col1', align: 'center'},
                {title: '巡检人名称', key: 'col2', align: 'center'},
                {title: '集团工号', key: 'col3', align: 'center'}
              ]
              break
            // 巡检机构
            case 'checkComCode':
              this.PFlag = '1'
              // 是否取消滚动条
              this.DialogConfig.fixedHeader = true
              // 展示modal标志
              this.DialogConfig.dialogFlag = true
              // 业务类型
              this.DialogConfig.codeType = 'comCode'
              // 关键字描述
              this.DialogConfig.keyWordDesc = '巡检机构'
              // 查询关键字
              this.DialogConfig.keyWord = this.riskCheckRequestVo.riskCheckMainQueryVo.checkComCodeCName
              // 接口地址
              this.DialogConfig.requestURL = '/riskins/queryComCode'
              // 自定义table表头
              this.DialogConfig.columnTitles = [
                {title: '序号', key: 'index', type: 'index', width: 60, align: 'center'},
                {title: '机构代码', key: 'col1', align: 'center'},
                {title: '机构简称', key: 'col2', align: 'center'},
                {title: '机构名称', key: 'col3', align: 'center'}
              ]
              break
            default:
              this.DialogConfig.dialogFlag = false
          }
        },
        exportAll(params) {
          this.exportVisible = false
          exportRiskinsMainReport(this.riskCheckRequestVo).then((response) => {
            if (response != null) {
              const filePath = response.data
              if (filePath === null) {
                this.$Message.error('没有可导出的数据，请更换查询条件')
              } else {
                if (response.statusText === 'success') {
                  const url = '/' + filePath.substring(filePath.indexOf('downloadExcel'))
                  window.location.href = url
                  this.$Message.success('导出汛期报告清单成功')
                }
              }
            } else {
              this.$Message.error('导出汛期报告清单失败')
            }
          }, (response) => {
            this.$Message.error('导出汛期报告清单异常')
          })
        },
        //确认下载文档操作
        confirmDownloadFile(index,row) {
          this.cancelTabDownload()
          this.currentRiskCheckNo = row.riskCheckNo
          let checkModel = row.checkModel
          if (checkModel == '001') {
            this.downloadRiskCheckWordModel.checkModel = '2019防汛报告'
          } else if (checkModel == '002') {
            this.downloadRiskCheckWordModel.checkModel = '2019防汛报告（简化版）'
          }
          //this.showDownloadModal = true
          //打开下载框
          this.downWordVisible = true
        },
        deleteAll(params) {
          this.cancelDelPopover()
          let newList = []
          this.successMess = ''
          if (params.length === 0) {
            this.$message.success('请选择要删除的数据!')
          } else {
            for (var i = 0; i < params.length; i++) {
              // 循环把风控编号赋值到newList集合中
              if (params[i].underwriteFlag !== '已完成') {
                newList.push(params[i].riskCheckNo)
              } else {
                this.successMess += params[i].riskCheckNo + ','
              }
            }
          }
          if (newList.length > 0) {
            this.riskCheckRequestVo.riskCheckMainQueryVo.riskCheckNoList = newList
            this.deleteGroup()
          } else {
            if (this.successMess.length > 0) {
              this.$message.warning(this.successMess.substring(0, this.successMess.length - 1) + '已完成的报告不能删除！')
              this.multipleSelection = []
            }
            this.successMess = ''
          }
        },
        deleteGroup() {
          riskCheckDelete(this._data.riskCheckRequestVo.riskCheckMainQueryVo).then((response) => {
            if (response.message === 'success') {
              if (this.successMess.length > 0) {
                this.$message.warning(this.successMess.substring(0, this.successMess.length - 1) + '已完成的报告不能删除！')
                this.successMess = ''
              } else {
                this.$message.success('删除成功!')
              }
              this.search()
            }
            this.riskCheckRequestVo.riskCheckMainQueryVo.riskCheckNoList = []
            this.multipleSelection = []
          }, (response) => {
            // error callback
          })
        },
        riskinsMainCheckQuery() {
          //  发送请求调用后台
          riskinsMainCheckQuery(this.riskCheckRequestVo).then((response) => {
            this.risksMainCheckList = response.dataList
            this.riskCheckRequestVo.totalCount = response.totalCount
            this.riskCheckRequestVo.pageCount = response.totalPage
            // 结果集区域所在的Card区域
            this.showFlag = true
            this.loading = false
          }, (response) => {
            this.$Message.error('查询异常')
            // error callback
          })
        },
        handleSelectionChange(selection){
          console.log(selection)
          this.multipleSelection = selection
        },
        // word下载
        wordDownload() {
          this.downWordVisible = true
          let types = this.downloadRiskCheckWordModel.reportType
          console.log(types)
          if (types.length == 0) {
            this.$message.info('至少选择一个文档进行下载')
            return
          }
          //本地下载测试 拼接测试地址前缀
          // let prefix = 'http://10.10.2.241:5001'
          if (types.indexOf('pdf') != -1) {
            riskcheckDownloadPdf({riskCheckNo: this.currentRiskCheckNo}).then(res =>{
              if (res.status === 1 && res.data) {
                let path = res.data
                window.open('/' + path.substring(path.indexOf('downloadFile')), '_blank')
              }
            })
          }
          if (types.indexOf('notice') != -1 || types.indexOf('doc') != -1) {
            riskcheckDownloadWord({riskCheckNo: this.currentRiskCheckNo}).then(res =>{
              if (res.status === 1 && res.data) {
                let obj = res.data
                let fullpath = ''
                if (types.indexOf('notice') != -1) {
                  fullpath = obj['notice']
                  let path = '/' + fullpath.substring(fullpath.indexOf('downloadFile'))
                  window.open(path, '_blank')
                }
                if (types.indexOf('doc') != -1) {
                  fullpath = obj['report']
                  let path = '/' + fullpath.substring(fullpath.indexOf('downloadFile'))
                  window.open(path, '_blank')
                }
                this.$message.success('导出报告成功！')
              }
            })
          }
          this.cancelDownloadWord()
        },
        search() {
          this.multipleSelection = []
          this.$refs['riskinsMainCheckForm'].validate((valid) => {
            if (valid) {
              //  表单字段校验通过  1.设置默认查询页码
              this.riskCheckRequestVo.pageNo = 1
              this.loading = true
              this.showFlag = true
              let pageSize = this.pageSize
              //let pageSize = Cookies.get('pageSize')
              if (pageSize !== undefined && pageSize !== '') {
                this.riskCheckRequestVo.pageSize = parseInt(pageSize)
              }
              //  调用后台执行查询
              this.riskinsMainCheckQuery()
              //this.selectShowFlag = false
              this.showicon = 'fa fa-angle-double-down fa-2x'
            } else {
              this.$Message.error('查询条件错误！！！请修改')
            }
          })
        },
        deleteByRiskcheckNo(index,row){
          this.canceltableDelPopover(index,row)
          queryRiskcheckByNo({riskCheckNo: row.riskCheckNo}).then(res => {
            if ('T'.indexOf(res.message) !== -1) {
              this.riskCheckRequestVo.riskCheckMainQueryVo.riskCheckNoList = [row.riskCheckNo]
              deleteByRiskcheckNo(this._data.riskCheckRequestVo.riskCheckMainQueryVo).then((res) => {
                if (res.message === 'success') {
                  this.$message.success('删除成功!')
                  this.search()
                  this.riskCheckRequestVo.riskCheckMainQueryVo.riskCheckNoList = []
                }
              }, (response) => {
                // error callback
              })
            } else {
              this.$message.error('该巡检报告暂不支持删除!')
            }
          }, (response) => {
            // error callback
          })
        },
        updateByRiskFileNo(index,row){
          this.cancelUpdateVisible(index)
          if (row.underwriteFlag === '通过') {
            this.$message.error('已通过的巡检报告无法修改！')
            return false
          }
          this.$store.commit('SET_DATAS', this._data)
          if (row.checkModel === '001') {
            this.$router.push({
              path: '/riskcheck_normalInput',
              query: {
                riskCheckNo: row.riskCheckNo,
                editModel: 'edit',
                checkModel: row.checkModel,
                returnButtonState: true,
                ImageButtonState: true
              }
            })
          } else if (row.checkModel === '002') {
            this.$router.push({
              path: '/riskcheck_simpleInput',
              query: {
                riskCheckNo: row.riskCheckNo,
                editModel: 'edit',
                checkModel: row.checkModel,
                returnButtonState: true,
                ImageButtonState: true
              }
            })
          }
        },
        cancelUpdateVisible(index){
          this.updateVisible.splice(index,1,false)
        },
        reset(name) {
          // 设置初始页码
          this.riskCheckRequestVo.pageNo = 1
          // 清空巡检人
          this.riskCheckRequestVo.riskCheckMainQueryVo.checker = ''
          this.riskCheckRequestVo.riskCheckMainQueryVo.checkerName = ''

          // 清空归属机构
          this.riskCheckRequestVo.riskCheckMainQueryVo.comCode = ''
          this.riskCheckRequestVo.riskCheckMainQueryVo.comCodeCName = ''
          this.riskCheckRequestVo.riskCheckMainQueryVo.checkComCode = ''
          this.riskCheckRequestVo.riskCheckMainQueryVo.checkComCodeCName = ''

          this.riskCheckRequestVo.riskCheckMainQueryVo.insuredName = ''
          this.riskCheckRequestVo.riskCheckMainQueryVo.riskCheckNo = ''
          this.riskCheckRequestVo.riskCheckMainQueryVo.checkModel = ''
          this.riskCheckRequestVo.riskCheckMainQueryVo.addressDetail = ''
          this.riskCheckRequestVo.riskCheckMainQueryVo.underwriteFlag = []
          this.riskCheckRequestVo.totalCount = 0
          this.showFlag = false
          // 循环清空表单每个域字段值
          var that = this
          this.$nextTick(() => {
            that.riskCheckRequestVo.riskCheckMainQueryVo.checkStartDate = ''
            that.riskCheckRequestVo.riskCheckMainQueryVo.checkEndDate = ''
          })
          // 循环清空表单时间域字段值
          this.$refs['riskinsMainCheckForm'].fields.forEach(function (e) {
            if (e.prop === 'checkStartDate') {
              e.resetField()
            }
            if (e.prop === 'checkEndDate') {
              e.resetField()
            }
          })
        },
        cancelDownloadWord(){
          this.downWordVisible = false
        },
        changepage(index) {
          this.riskCheckRequestVo.pageNo = index
          this.loading = true
          this.riskinsMainCheckQuery()
        },
        changepagesize(value) {
          this.riskCheckRequestVo.pageNo = 1
          this.riskCheckRequestVo.pageSize = value
          this.loading = true
          //Cookies.set('pageSize', value)
          this.riskinsMainCheckQuery()
        },
        rowBrowse(data, index) {
          this.$store.commit('SET_DATAS', this._data)
          //  如果审核状态为"未处理"
          if (data.underwriteFlag === '未处理') {
            if (data.checkModel === '001') {
              // ('显示2019防汛录入页面')
              this.$router.push({
                path: '/riskcheck_normalInput',
                query: {
                  riskCheckNo: data.riskCheckNo,
                  editModel: 'browse',
                  checkModel: data.checkModel,
                  returnButtonState: true,
                  reviewedButtonState: false,
                  backButtonState: true,
                  ImageButtonState: true
                }
              })
            } else if (data.checkModel === '002') {
              // ('显示2019防汛录入页面 简易版')
              this.$router.push({
                path: '/riskcheck_simpleInput',
                query: {
                  riskCheckNo: data.riskCheckNo,
                  editModel: 'browse',
                  checkModel: data.checkModel,
                  returnButtonState: true,
                  reviewedButtonState: false,
                  backButtonState: true,
                  ImageButtonState: true
                }
              })
            }
          } else if (data.underwriteFlag === '已完成') {
            //  如果审核状态为 已完成
            if (data.checkModel === '001') {
              //('显示2019防汛录入页面')
              this.$router.push({
                path: '/riskcheck_normalInput',
                query: {
                  riskCheckNo: data.riskCheckNo,
                  editModel: 'browse',
                  checkModel: data.checkModel,
                  returnButtonState: true,
                  reviewedButtonState: false,
                  backButtonState: false,
                  ImageButtonState: true
                }
              })
            } else if (data.checkModel === '002') {
              //('显示2019防汛录入页面 简易版')
              this.$router.push({
                path: '/riskcheck_simpleInput',
                query: {
                  riskCheckNo: data.riskCheckNo,
                  editModel: 'browse',
                  checkModel: data.checkModel,
                  returnButtonState: true,
                  reviewedButtonState: false,
                  backButtonState: false,
                  ImageButtonState: true
                }
              })
            }
          }
        },
        cancelExportPopover(){
          this.exportVisible = false
        },
        cancelDelPopover(){
          this.delVisible = false
        },
        cancelDownloaadPopover(){
          this.downloadVisible = false
        },
        canceltableDelPopover(index,row){
          this.tableDelVisible.splice(index,1,false)
        },
        cancelTabDownload(index,row){
          this.tabDownloadVisible.splice(index,1,false)
        }
      }
    }
</script>

<style scoped>
  .searchClass{
    width: 1168px;
    height: 52px;
    line-height: 52px;
    text-align: left;
    padding-left: 10px;
    font-weight: 600;
  }
  .resultClass{
    width: 947px;
    height: 44px;
    background: rgba(237,238,240,1);
    line-height: 44px;
    text-align: left;
    padding-left: 10px;
    font-weight: 600;
  }
</style>
