<template>
  <div style="padding: 10px;">
    <div>
      <el-col>
        <div class="searchClass">
          <span>照片档案资料查询</span>
        </div>
      </el-col>
      <el-card>
        <div v-show="selectShowFlag">
          <el-form ref="riskReportSaleMainVo" :model="riskReportSaleMainVo" :rules="rules" label-width="140px" class="form1" >
            <el-row>
              <el-col :span="12">
                <el-form-item label="照片档案号：" prop="archivesNo">
                  <el-input v-model="riskReportSaleMainVo.archivesNo" type="text" aria-placeholder="请输入..." style="width: 100%"/>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="企业名称：" prop="companyName">
                  <el-input v-model="riskReportSaleMainVo.companyName" type="text" aria-placeholder="请输入..." style="width: 100%" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="查勘机构：" prop="exploreComcodeCName">
                  <el-input v-model="riskReportSaleMainVo.exploreComcodeCName" type="text" @blur="queryData('checkUpCode')">
                    <el-button slot="append" icon="el-icon-search" @click="appendClick('comCode')"/>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="查勘人：" prop="explorerCName">
                  <el-input v-model="riskReportSaleMainVo.explorerCName" type="text" @blur="queryData('checkUpCode')">
                    <el-button slot="append" icon="el-icon-search" @click="appendClick('explorer')"/>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="审核人：" prop="checkUpCodeCName">
                  <el-input v-model="riskReportSaleMainVo.checkUpCodeCName" type="text" @blur="queryData('checkUpCode')">
                    <el-button slot="append" icon="el-icon-search" @click="appendClick('checkUpCode')" />
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="审核状态：" prop="checkUpFlag">
                  <el-checkbox-group v-model="riskReportSaleMainVo.checkUpFlag">
                    <el-checkbox label="0"><span>待办</span></el-checkbox>
                    <el-checkbox label="1"><span>办结</span></el-checkbox>
                    <el-checkbox label="2"><span>影像同步中</span></el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
              </el-col>

              <el-col span="7">
                <el-form-item label="查勘日期：" prop="exploreDateBegin">
                  <el-date-picker v-model="riskReportSaleMainVo.exploreDateBegin" type="date" placeholder="请选择" style="width: 100%"></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col span="5">
                <el-form-item label="至" prop="exploreDateEnd" label-width="20">
                  <el-date-picker v-model="riskReportSaleMainVo.exploreDateEnd" type="date" placeholder="请选择" style="width: 88%"></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <br>
              <div style="textAlign:center">
                <el-button type="dashed" icon="el-icon-refresh-right" round @click="reset('riskReportSaleMainVo')">重置</el-button>
                <el-button type="primary" icon="el-icon-search" round @click="search(1)">查询</el-button>
              </div>
            </el-row>
          </el-form>
        </div>
      </el-card>
    </div>

    <div v-show="showFlag" style="padding: 10px;">
      <el-card>
        <el-table v-loading="loading" :data="dataList" border @row-dblclick="doubleClick">
          <el-table-column label="照片档案号" prop="archivesNo" />
          <el-table-column label="企业名称" prop="companyName" />
          <el-table-column label="查勘机构" prop="exploreComcodeCName" />
          <el-table-column label="查勘人" prop="explorerCName" />
          <el-table-column label="审核人" prop="checkUpCodeCName" />
          <el-table-column label="查勘日期" prop="exploreDate" />
          <el-table-column label="审核状态" prop="checkUpFlag" />
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-popover
                v-model="tipVisibles[scope.$index]"
                placement="top"
                width="160"
                trigger="click"
              >
                <p>确定要编辑部门信息么？</p>
                <div style="text-align: right; margin: 0">
                  <el-button size="mini" type="text" @click="canelUpdate(scope.$index)">取消</el-button>
                  <el-button type="primary" size="mini" @click="handleEdit(scope.$index, scope.row)">确定</el-button>
                </div>
                <el-button slot="reference" size="mini" :disabled="$store.getters.getUserInfo.departmentID == 22 ? false : true" type="primary">编辑</el-button>
              </el-popover>
              <el-popover
                v-model="DeVisibles[scope.$index]"
                placement="top"
                width="160"
                trigger="click"
              >
                <p>将删除该部门及部门归属人员，请确认！</p>
                <div style="text-align: right; margin: 0">
                  <el-button size="mini" type="text" @click="canelDelete(scope.$index)">取消</el-button>
                  <el-button type="primary" size="mini" @click="handleDelete(scope.$index, scope.row)">确定</el-button>
                </div>
                <el-button slot="reference" size="mini" type="danger">删除</el-button>
              </el-popover>
            </template>
          </el-table-column>
        </el-table>
        <!--分页-->
        <div style="textAlign:center">
          <el-pagination
            :current-page="pageNo"
            :page-sizes="[5,15,50]"
            :page-size="pageSize"
            :total="totalCount"
            layout="total,prev, pager, next, jumper,sizes"
            @size-change="changepagesize"
            @current-change="changePage" />
        </div>
      </el-card>
    </div>
    <ELDialog v-if="dialogFlag" :dialog-config="dialogConfig" @dialogReturnData="dialogReturnData" @dialogVisable="closeDialog" />
  </div>
</template>

<script>
  import { queryRiskSaleMain } from "@/api/riskSale"
  import { queryComCode,queryInsuredListByName } from '@/api/risk'

  import ELDialog from './Dialog.vue'
  export default {
    components: {
      ELDialog },
    name: "RiskSaleMainQuery",
    data() {
      const validateExploreDateBegin = (rule, value, callback) => {
        if (value !== '' && value !== null) {
          var exploreDateEnd = this.riskReportSaleMainVo.exploreDateEnd
          if (exploreDateEnd !== '' && exploreDateEnd !== null) {
            if (new Date(value).getTime() > new Date(exploreDateEnd).getTime()) {
              callback(new Error('查勘起期不能大于查勘止期!'))
            } else {
              callback()
            }
          } else {
            callback()
          }
        } else {
          callback()
        }
      }
      const validateExploreDateEnd = (rule, value, callback) => {
        if (value !== '' && value !== null) {
          var exploreDateBegin = this.riskReportSaleMainVo.exploreDateBegin
          if (exploreDateBegin !== '' && exploreDateBegin !== null) {
            if (new Date(value).getTime() < new Date(exploreDateBegin).getTime()) {
              callback(new Error('查勘止期不能小于查勘起期!'))
            } else {
              callback()
            }
          } else {
            callback()
          }
        } else {
          callback()
        }
      }
      return {
        //form表单
        selectShowFlag: true,
        riskReportSaleMainVo: {
          archivesNo: '',
          companyName: '',
          exploreComcode: '',
          exploreComcodeCName: '',
          explorer: '',
          explorerCName: '',
          explorerCode: '',
          checkUpCode: '',
          checkUpCodeCName: '',
          exploreDateBegin: '',
          exploreDateEnd: '',
          checkUpFlag: [],
          exploreDate: ''
        },
        //模态框
        dialogFlag: false,
        dialogConfig: {
          fixedHeader: '',
          dialogFlag: '',
          codeType: '',
          keyWordDesc: '',
          requestURL: ''
        },
        //审核状态
        checkUpFlag: [],
        //分页
        pageNo: 1,
        pageSize: 5,
        totalCount: 0,
        center: 'center',
        //查询结果
        dataList: [],
        loadFlag: false,
        loading: false,
        showFlag: true,
        // 表单校验
        rules: {
          exploreDateBegin: [
            {validator: validateExploreDateBegin, trigger: 'change'}
          ],
          exploreDateEnd: [
            {validator: validateExploreDateEnd, trigger: 'change'}
          ]
        }
      }
    },
    created() {

    },
    methods: {
      // 重置方法
      reset (name) {
        this.riskReportSaleMainVo.exploreComcode = ''
        this.riskReportSaleMainVo.explorer = ''
        this.riskReportSaleMainVo.explorerCode = ''
        this.riskReportSaleMainVo.checkUpCode = ''
        this.riskReportSaleMainVo.companyName = ''
        this.riskReportSaleMainVo.exploreComcodeCName = ''
        this.riskReportSaleMainVo.archivesNo = ''
        this.riskReportSaleMainVo.explorerCName = ''
        this.riskReportSaleMainVo.checkUpCodeCName = ''
        this.riskReportSaleMainVo.exploreDateBegin = ''
        this.riskReportSaleMainVo.exploreDateEnd = ''
        this.riskReportSaleMainVo.checkUpFlag = []
        this.riskReportSaleMainVo.exploreDate = ''
        this.pageNo = 1
        this.dataList = []
        this.totalCount = 0
        this.showFlag = false
      },

      // 接受数据
      dialogReturnData(row) {
          //查勘机构
        if (this.dialogConfig.codeType === 'comCode') {
          this.riskReportSaleMainVo.exploreComcode = row.col2
          this.riskReportSaleMainVo.exploreComcodeCName = row.col3
          //查勘人
        } else if (this.dialogConfig.codeType === 'explorer') {
          this.riskReportSaleMainVo.explorer = row.col2
          this.riskReportSaleMainVo.explorerCName = row.col3
          this.riskReportSaleMainVo.explorerCode = row.col4
          //审核人
        } if (this.dialogConfig.codeType === 'checkUpCode') {
          this.riskReportSaleMainVo.checkUpCode = row.col2
          this.riskReportSaleMainVo.checkUpCodeCName = row.col3
        }
        this.dialogFlag = false
      },
      // 关闭对话框，传递显隐标志位给父组件
      closeDialog(val) {
        this.dialogFlag = val
        if('comCode' === this.dialogConfig.codeType){
          this.riskReportSaleMainVo.exploreComcode = ''
          this.riskReportSaleMainVo.exploreComcodeCName = ''
        }
        if('explorer' === this.dialogConfig.codeType){
          this.riskReportSaleMainVo.explorer = ''
          this.riskReportSaleMainVo.explorerCName = ''
          this.riskReportSaleMainVo.explorerCode = ''
        }
        if('checkUpCode' === this.dialogConfig.codeType){
          this.riskReportSaleMainVo.checkUpCode = ''
          this.riskReportSaleMainVo.checkUpCodeCName = ''
        }
      },
      /*queryData (val) {
        var fieldValue = ''
        if (val === 'comCode') {
          const userInfo = this.$store.getters.getUserInfo
          fieldValue = this.riskReportSaleMainVo.exploreComcodeCName
          if(fieldValue === ''){
            this.$message('请输入归属机构')
          }else{
            queryComCode({ comCode: userInfo.comCode, pageNo: 1, pageSize: 5, keyWord: fieldValue }).then((response) => {
              if (response.data.dataList != null && response.data.dataList.length > 0) {
                this.appendClick('comCode')
              } else {
                this.$message('归属机构不存在')
                this.riskFunIndustryManagementVo.comCode = ''
                this.riskFunIndustryManagementVo.comCodeCName = ''
                return
              }
            }, (response) => {
              // error callback
            })
          }
        }
        if(val === 'insuredQuery') {
          fieldValue = this.riskFunIndustryManagementVo.insuredName
          queryInsuredListByName({ InsuredName: fieldValue, pageNo: 1, pageSize: 5  }).then(res => {
            if(res.data.data.result != null  && res.data.data.result.length > 0) {
              this.appendClick('insuredQuery')
            } else {
              this.$message('被保险人信息不存在或未录入数据')
              this.riskFunIndustryManagementVo.insuredName = ''
              this.riskFunIndustryManagementVo.insuredCode = ''
              return
            }
          }, (response) => {
            // error callback
          })
        }
      },*/
      // 模态框 查勘机构 查勘人校验 审核人校验
      queryData (val) {
        var _self = this
        var fieldValue = ''
        var codeType = ''
        console.log(codeType)
        const userInfo = this.$store.getters.getUserInfo
        console.log(userInfo)
//        var displayName = ''
        // 依据入参val区分双击域字段，组织关键字
        if (val === 'comCode') {//查勘机构
          console.log(userInfo)
          fieldValue = _self.riskReportSaleMainVo.exploreComcodeCName
          if (fieldValue === '' && fieldValue.trim() === '') {
            _self.riskReportSaleMainVo.exploreComcode = ''
            return
          }
          codeType = 'CodeType_ComCode'

        } else if (val === 'explorer') {//查勘人
          fieldValue = _self.riskReportSaleMainVo.explorerCName
          if (fieldValue === '' && fieldValue.trim() === '') {
            _self.riskReportSaleMainVo.explorer = ''
            return
          }
          codeType = 'UserCode'

        } else if (val === 'checkUpCode') {//审核人
          fieldValue = _self.riskReportSaleMainVo.checkUpCodeCName
          if (fieldValue === '' && fieldValue.trim() === '') {
            _self.riskReportSaleMainVo.checkUpCode = ''
            return
          }
          codeType = 'UserCode'
        }
        if (codeType === 'UserCode') {
          this.$api.getMethodParam('/common/codeselect/listCodeQuery', {userCode: userInfo.userCode, comCode: userInfo.comCode, riskCode: userInfo.riskCode, codeType: codeType, pageNo: 1, pageSize: 10, keyWord: fieldValue}).then((response) => {
            try {
              if (val === 'explorer') {
                if (response.data !== null && response.data.result.length === 1) {
                  _self.riskReportSaleMainVo.explorerCName = response.data.result[0][1]
                  _self.riskReportSaleMainVo.explorer = response.data.result[0][0]
                  _self.riskReportSaleMainVo.explorerCode = response.data.result[0][3]
                } else if (response.data !== null && response.data.result.length > 1) {
                  this.appendClick('explorer')
                } else {
                  _self.riskReportSaleMainVo.explorer = ''
                  _self.riskReportSaleMainVo.explorerCName = ''
                  this.$message.error('此查勘人不存在')
                  return
                }
              } else if (val === 'checkUpCode') {
                if (response.data !== null && response.data.result.length === 1) {
                  _self.riskReportSaleMainVo.checkUpCodeCName = response.data.result[0][1]
                  _self.riskReportSaleMainVo.checkUpCode = response.data.result[0][0]
                } else if (response.data !== null && response.data.result.length > 1) {
                  this.appendClick('checkUpCode')
                } else {
                  _self.riskReportSaleMainVo.checkUpCode = ''
                  _self.riskReportSaleMainVo.checkUpCodeCName = ''
                  this.$message.error('此审核人不存在')
                  return
                }
              }
            } catch (exception) {
              history.go(0)
            }
          }, (response) => {
            // error callback
          })
        } else if (codeType === 'CodeType_ComCode') {
          this.$api.getMethodParam('/riskins/queryComCode', {userCode: userInfo.userCode, pageNo: 1, pageSize: 5, keyWord: fieldValue}).then((response) => {
            try {
              if (response.dataList != null && response.dataList.length === 1) {
                _self.riskReportSaleMainVo.exploreComcodeCName = response.dataList[0][1]
                _self.riskReportSaleMainVo.exploreComcode = response.dataList[0][0]
              } else if (response.dataList != null && response.dataList.length > 1) {
                this.appendClick('comCode')
              } else {
                _self.riskReportSaleMainVo.exploreComcode = ''
                _self.riskReportSaleMainVo.exploreComcodeCName = ''
                this.$message.error('此查勘机构不存在')
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
      appendClick(val) {
        this.dialogFlag = true
        switch (val) {
          case 'comCode':
            // 是否取消滚动条
            this.dialogConfig.fixedHeader = true
            // 展示modal标志
            this.dialogConfig.dialogFlag = true
            // 业务类型
            this.dialogConfig.codeType = 'comCode'
            // 关键字描述
            this.dialogConfig.keyWordDesc = '查勘机构'
            // 查询关键字
            this.dialogConfig.keyWord = this.riskReportSaleMainVo.exploreComcodeCName
            console.log(this.dialogConfig.dialogFlag)
            break
          case 'explorer':
            // 是否取消滚动条
            this.dialogConfig.fixedHeader = true
            // 展示modal标志
            this.dialogConfig.dialogFlag = true
            // 业务类型
            this.dialogConfig.codeType = 'explorer'
            // 关键字描述
            this.dialogConfig.keyWordDesc = '查勘人'
            // 查询关键字
            this.dialogConfig.keyWord = this.riskReportSaleMainVo.explorerCName
            break
          case 'checkUpCode':
            // 是否取消滚动条
            this.dialogConfig.fixedHeader = true
            // 展示modal标志
            this.dialogConfig.dialogFlag = true
            // 业务类型
            this.dialogConfig.codeType = 'checkUpCode'
            // 关键字描述
            this.dialogConfig.keyWordDesc = '审核人'
            // 查询关键字
            this.dialogConfig.keyWord = this.riskReportSaleMainVo.checkUpCodeCName
            break
        }
      },



      // 查询方法
      search (index) {
        //  表单校验
        this.$refs['riskReportSaleMainVo'].validate(valid => {
          if (valid) {
            this.loadFlag = true
            this.showFlag = true
            if (index !== null && index !== '') {
              this.pageNo = index
            } else {
              this.pageNo = 1
            }
            const pageSize = this.pageSize
            if (pageSize !== undefined && pageSize !== '') {
              this.pageSize = parseInt(pageSize)
            }
            var exploreComcodeCName = this.riskReportSaleMainVo.exploreComcodeCName
            var explorerCName = this.riskReportSaleMainVo.explorerCName
            var checkUpCodeCName = this.riskReportSaleMainVo.checkUpCodeCName
            if (exploreComcodeCName === '' || exploreComcodeCName === null) {
              this.riskReportSaleMainVo.exploreComcode = ''
            }
            if (explorerCName === '' || explorerCName === null) {
              this.riskReportSaleMainVo.explorer = ''
            }
            if (checkUpCodeCName === '' || checkUpCodeCName === null) {
              this.riskReportSaleMainVo.checkUpCode = ''
            }
            this.queryRiskSaleMain()
//            this.selectShowFlag = false
            this.showicon = 'fa fa-angle-double-down fa-2x'
          } else {
            this.$Message.error('查询条件错误，请修改!')
          }
        })
      },
      // 调用后台查询
      queryRiskSaleMain () {
        console.log(this._data)
        queryRiskSaleMain(this._data).then((response) => {
          console.log(response)
          if (response.qCexception == '') {
            this.$router.push({name: 'exception', path: '/exception', params: {ex: response.qCexception, Flag: '1'}})
          }
          this.dataList = response.dataList
          this.totalCount = response.totalCount
          this.loadFlag = false
        }, (response) => {
          // error callback
          alert("aa")
        })
      },

      // 页码改变方法
      changePage(index) {
        this.pageNo = index
        this.search(index)
      },
      changepagesize(value) {
        this.pageNo = 1
        this.pageSize = value
        this.search()
//        this.search(this.pageNo)
      },

    }
  }
</script>

<style scoped>
  .form1{
    margin-bottom: 32px;
  }
  .title{
    margin: -16px -15px 16px;
    padding: 0 12px;
    font-size: 14px;
    line-height: 36px;
    background-color: #fafdff;
  }
</style>
