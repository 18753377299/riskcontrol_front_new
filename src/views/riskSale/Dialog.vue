<template>
  <el-dialog :visible.sync="dialogFormVisible" width="75%" @close="closeDialog">
    <el-card>
      <div>
        <el-row>
          <el-col :span="24">
            <el-col :span="3" :offset="6">
              <div style="text-align: center;padding-top: 10px">
                {{ localDialogConfig.keyWordDesc }}：
              </div>
            </el-col>
            <el-col :span="6">
              <el-input v-model="localDialogConfig.keyWord" />
            </el-col>
          </el-col>
        </el-row>
      </div>
      <div style="text-align: center;margin-top: 16px;">
        <el-button type="primary" icon="ios-search" @click="bdforeHandlerOnVisibleChange">查询</el-button>
        <el-button type="primary" icon="refresh" @click="reset">重置</el-button>
      </div>
    </el-card>
    <br>
    <el-card>
      <el-table v-show="comcodeVisible" v-loading="loading" stripe border :data="comcodeList" @row-dblclick="rowDbClick">
        <el-table-column property="col1" label="序号" />
        <el-table-column property="col2" label="机构代码" />
        <el-table-column property="col3" label="机构简称" />
        <el-table-column property="col4" label="机构名称" />
      </el-table>

      <el-table v-show="explorerVisible" v-loading="loading" stripe border :data="explorerList" @row-dblclick="rowDbClick">
        <el-table-column property="col1" label="序号" />
        <el-table-column property="col2" label="查勘人代码" />
        <el-table-column property="col3" label="查勘人名称" />
        <el-table-column property="col4" label="集团工号" />
      </el-table>
      <el-table v-show="checkUpCodeVisible" v-loading="loading" stripe border :data="checkUpCodeList" @row-dblclick="rowDbClick">
        <el-table-column property="col1" label="序号" />
        <el-table-column property="col2" label="审核人代码" />
        <el-table-column property="col3" label="审核人名称" />
      </el-table>

    </el-card>
    <div style="padding-top: 10px;text-align: center">
      <el-pagination
        :page-sizes="[5, 10, 15]"
        :page-size="100"
        :current-page="page.pageNo"
        layout="prev, pager, next, sizes, jumper "
        :total="page.total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </el-dialog>
</template>
<script>
  import { queryComCode, queryInsuredList, queryInsuredListInModle, queryInsuredListByName } from '@/api/risk'
  export default {
    props: ['dialogConfig'],
    data() {
      return {
        loading: false,
        dialogFormVisible: true,
        comcodeVisible: false,
        explorerVisible: false,
        checkUpCodeVisible: false,
        localDialogConfig: {
          codeType: '',
          columnTitles: [],
          dialogFlag: true,
          keyWord: '',
          keyWordDesc: '',
          keyWordDescName: '',
          keyWordName: '',
          requestURL: '',
          keyWordOne: '',
          keyWordTwo: '',
          keyWordDescOne: '',
          keyWordDescTwo: ''
        },
        comcodeList: [],
        explorerList: [],
        checkUpCodeList: [],
        insuredNameList: [],
        page: {
          pageNo: 1,
          pageSize: 5,
          total: 0
        }
      }
    },
    created() {
      this.localDialogConfig.codeType = this.dialogConfig.codeType
      this.localDialogConfig.keyWordDesc = this.dialogConfig.keyWordDesc
      this.localDialogConfig.keyWord = this.dialogConfig.keyWord
      this.localDialogConfig.dialogFlag = this.dialogConfig.dialogFlag

      if (this.localDialogConfig.codeType === 'comCode') {
        this.comcodeVisible = true
      } else if (this.localDialogConfig.codeType === 'explorer') {
        this.explorerVisible = true
      }else if (this.localDialogConfig.codeType === 'checkUpCode') {
        this.checkUpCodeVisible = true
      }
      this.HandlerOnVisibleChange()
    },
    methods: {
      // 查询
      bdforeHandlerOnVisibleChange() {
        if (this.localDialogConfig.keyWordDesc === '查勘机构') {
          if (this.localDialogConfig.keyWord === '') {
            this.$message.error('请输入查勘机构')
          } else {
            this.HandlerOnVisibleChange()
          }
        } else if (this.localDialogConfig.keyWordDesc === '查勘人') {
          if (this.localDialogConfig.keyWord === '') {
            this.$message.error('请输入查勘人名称')
          } else {
            this.HandlerOnVisibleChange()
          }
        }
        if (this.localDialogConfig.keyWordDesc === '审核人') {
          if (this.localDialogConfig.keyWord === '') {
            this.$message.error('请输入审核人名称')
          } else {
            this.HandlerOnVisibleChange()
          }
        }
      },
      reset() {
        this.localDialogConfig.keyWord = ''
        this.comcodeList = []
        this.explorerList = []
        this.checkUpCodeList = []
        this.page.pageNo = 1
        this.page.pageSize = 5
        this.page.total = 0
      },
      HandlerOnVisibleChange() {
        this.loading = true
        if (this.localDialogConfig.codeType === 'comCode') {
          const userInfo = this.$store.getters.getUserInfo
          queryComCode({ comCode: userInfo.comCode, pageNo: this.page.pageNo, pageSize: this.page.pageSize, keyWord: this.localDialogConfig.keyWord }).then(res => {
            // 清空数组原数据
            this.comcodeList = []
            this.page.total = res.data.totalCount
            // 查询结果组装后放入this.comcodeList数组
            if (res.data.dataList != null) {
              for (var i = 0; i < res.data.dataList.length; i++) {
                const rowdata = res.data.dataList[i]
                const row = { col1: i + 1, col2: rowdata[0], col3: rowdata[1], col4: rowdata[2] }
                this.comcodeList.push(row)
              }
              this.loading = false
            } else {
              this.loading = false
            }
          })
        } else if (this.localDialogConfig.codeType === 'explorer') {
          // 查勘人查询
          const keyword = this.localDialogConfig.keyWord
          var data = { customerType: '', customerCode: '', customerCName: keyword }
          const queryPar = {
            customerVo: {
              customerCName: keyword,
              customerType: '',
              identifyType: '',
              identifyNumber: '',
              returnDataCount: ''
            },
            pageNo: this.page.pageNo,
            pageSize: this.page.pageSize,
            totalCount: '',
            pageCount: ''
          }
          queryInsuredListInModle(queryPar).then(res => {
            this.insuredNameList = []
            if (res.data.dataList !== null) {
              for (let i = 0; i < res.data.dataList.length; i++) {
                const rowdata = res.data.dataList[i]
                const row = { col1: rowdata.customerCode, col2: rowdata.customerCName, col3: rowdata.identifyType, col4: rowdata.identifyNumber }
                this.insuredNameList.push(row)
              }
              this.loading = false
            }else {
              this.loading = false
            }
          })
        } else if(this.localDialogConfig.codeType === 'checkUpCode') {
          //审核人查询
          const keyword = this.localDialogConfig.keyWord
          queryInsuredListByName({ InsuredName: keyword, pageNo: this.page.pageNo, pageSize: this.page.pageSize }).then(res => {
            this.insuredNameList = []
            if(res.data.data != null) {
              for (let i = 0; i < res.data.data.result.length; i++) {
                const rowdata = res.data.data.result[i]
                const row = { col1: rowdata.insuredCode, col2: rowdata.insuredName }
                this.insuredNameList.push(row)
              }
              this.page.total = res.data.data.totalCount
              this.page.pageNo = res.data.data.currentPageNo
              this.loading = false
            } else {
              this.loading = false
            }
          })
        }
      },
      rowDbClick(row) {
        // 1.关闭模态框
        this.dialogFormVisible = false
        // 2.选中的数据传回父组件，显示到父组件相应input中
        this.$emit('dialogReturnData', row)
      },
      handleCurrentChange(val) {
        this.page.pageNo = val
        this.HandlerOnVisibleChange()
      },
      handleSizeChange(val) {
        this.page.pageSize = val
        this.page.pageNo = 1
        this.HandlerOnVisibleChange()
      },
      closeDialog() {
        this.dialogFormVisible = false
        this.$emit('dialogVisable', this.dialogFormVisible)
      }
    }
  }
</script>
<style>
</style>
