<template>
  <el-dialog :class="message" v-model="showFlag" width="75%" :mask-closable="false"  @on-visible-change="onVisibleChange"><!--:mask-closable=true-->
    <!--<p slot="header" style="color:#f60;text-align:left"></p>-->
    <br>

    <el-card dis-hover>
      <div v-show="localDialogConfig.codeType != 'insuredCode'&&localDialogConfig.codeType != 'ArchivesNo' && localDialogConfig.codeType != 'LastRiskFileNo'">
        <el-row>
          <el-col span="24" >
            <el-col span="10" style="text-align: right">
              {{localDialogConfig.keyWordDesc}}：
            </el-col>
            <el-col span="6" >
              <el-input v-model="localDialogConfig.keyWord" @on-enter="bdforeHandlerOnVisibleChange"></el-input>
            </el-col>
          </el-col>
        </el-row>
      </div>
      <div v-show="localDialogConfig.codeType == 'ArchivesNo' || localDialogConfig.codeType == 'LastRiskFileNo'">
        <el-row>
          <el-col span="12" >
            <el-col span="10" style="text-align: right;margin-top: 4px">
              {{localDialogConfig.keyWordDesc}}：
            </el-col>
            <el-col span="12" >
              <el-input v-model="localDialogConfig.keyWord"></el-input>
            </el-col>
          </el-col>
          <el-col span="12" >
            <el-col span="10" style="text-align: right;margin-top: 4px">
              {{localDialogConfig.keyWordDescName}}：
            </el-col>
            <el-col span="12" >
              <el-input v-model="localDialogConfig.keyWordName"></el-input>
            </el-col>
          </el-col>
        </el-row>
      </div>
      <div v-show="localDialogConfig.codeType === 'insuredCode'">
        <el-row>
          <el-col span="24" >
            <el-col  span="4" style="text-align: right;line-height: 32px;" >
              {{localDialogConfig.keyWordDesc}}：
            </el-col>
            <el-col  span="4" >
              <el-select v-model="localDialogConfig.keyWord" style="width: 100%">
                <el-option value="1"  label="个人"></el-option>
                <el-option value="2"  label="团体"></el-option>
              </el-select>
            </el-col>
            <el-col span="4" style="text-align: right;line-height: 32px;">
              {{localDialogConfig.keyWordDescOne}}：
            </el-col>
            <el-col span="4" >
              <el-input v-model="localDialogConfig.keyWordOne" style="width: 100%"></el-input>
            </el-col>
            <el-col span="4" style="text-align: right;line-height: 32px;">
              {{localDialogConfig.keyWordDescTwo}}：
            </el-col>
            <el-col span="4" >
              <el-input v-model="localDialogConfig.keyWordTwo" style="width: 100%"></el-input>
            </el-col>
          </el-col>
        </el-row>
      </div>
      <div style="text-align: center;margin-top: 16px;">
        <el-button type="primary" icon="ios-search" @click="bdforeHandlerOnVisibleChange">查询</el-button>
        <el-button type="dashed" icon="refresh" @click="reset">重置</el-button>
      </div>
    </el-card>
    <br>
    <el-card style="text-align:center">
<!--      <article>-->
        <el-table stripe border :height="localDialogConfig.fixedHeader ? '' : 250" size="small" :loading="loading" :columns="localDialogConfig.columnTitles" :data="dialogData" @on-row-click="onRowClick"></el-table>
<!--      </article>-->
      <Spin size="large" fix v-if="spinShow"></Spin>
    </el-card>
    <div slot="footer" style="text-align:center">
      <Page :current.sync="pageNo" :total="total" :page-size="pageSize" :page-size-opts="[5,10]" size="small"
            show-elevator show-sizer show-total @on-change="changePageNo" @on-page-size-change="changePageSize"></Page>
    </div>
  </el-dialog>
</template>
<script>
  // import Cookies from 'js-cookie'
  // import Bus from '@/common/bus/bus'
  import { customerModelQuery, tradeCode, queryComCode, insured } from '@/api/riskIns'
  export default {
    props: ['dialogConfig'],
    data () {
      return {
        message: 'red-skin',
        pageNo: 1,
        pageSize: 5,
        total: 10,
        type: '',
        showFlag: false,
        dialogData: [],
        loading: false,
        spinShow: false,
        localDialogConfig: {
          codeType: '',
          columnTitles: [],
          dialogFlag: true,
          fixedHeader: true,
          keyWord: '',
          keyWordDesc: '',
          keyWordDescName: '',
          keyWordName: '',
          requestURL: '',
          keyWordOne: '',
          keyWordTwo: '',
          keyWordDescOne: '',
          keyWordDescTwo: ''
        }
      }
    },
    created () {
      // let theme = Cookies.get('theme')
      // if (theme !== undefined) {
      //   this.message = Cookies.get('theme')
      // } else {
      //   this.message = 'blue-skin'
      // }
    },
    mounted () {
      // Bus.$on('skin', (skin) => {
      //   this.message = skin
      // })
    },
    methods: {
      // 对话框状态改变，当状态为显示，初始化查询
      onVisibleChange () {
        if (this.showFlag) {
          this.loading = true
          this.handlerOnVisibleChange()
        }
      },
      onRowClick (data, index) {
        if (this.localDialogConfig.codeType === 'TradeCode' && (data.col3 === '' || data.col3.trim() === '')) {
          this.$Message.error('请选择有行业分类代码的国民经济行业!')
          return false
        }
        this.showFlag = false
        // 将选中数据传回父组件
        this.$emit('click-on-row', data)
      },
      changePageNo (val) {
        this.pageNo = val
        this.handlerOnVisibleChange()
      },
      changePageSize (val) {
        this.pageSize = val
        this.handlerOnVisibleChange()
      },
      bdforeHandlerOnVisibleChange () {
        if (this.localDialogConfig.keyWordDesc === '查勘人') {
          if (this.localDialogConfig.keyWord === '') {
            this.$Message.error('请录入查勘人代码或名称！')
            return
          }
        }
        if (this.localDialogConfig.keyWordDesc === '审核人') {
          if (this.localDialogConfig.keyWord === '') {
            this.$Message.error('请录入审核人代码或名称！')
            return
          }
        }
        if (this.localDialogConfig.keyWordDesc === '维护人员') {
          if (this.localDialogConfig.keyWord === '') {
            this.$Message.error('请录入维护人员代码或名称！')
            return
          }
        }
        if (this.localDialogConfig.keyWordDesc === '最后修改人') {
          if (this.localDialogConfig.keyWord === '') {
            this.$Message.error('请录入最后修改人代码或名称！')
            return
          }
        }
        if (this.localDialogConfig.keyWordDesc === '被保险人') {
          if (this.localDialogConfig.keyWord === '') {
            this.$Message.error('请录入被保险人代码或名称！')
            return
          }
        }
//        if (this.localDialogConfig.codeType === 'UserCode') {
//          if (this.localDialogConfig.keyWord === '') {
//            this.$Message.error('请录入代码或名称！')
//            return
//          }
//        }
        this.pageNo = 1
//        this.pageSize = 5
        this.total = 0
        this.handlerOnVisibleChange()
      },
      reset () {
        this.localDialogConfig.keyWord = ''
        this.localDialogConfig.keyWordName = ''
        this.localDialogConfig.keyWordOne = ''
        this.localDialogConfig.keyWordTwo = ''
        this.dialogData = []
        this.total = 0
      },
      handlerOnVisibleChange () {
        this.spinShow = true
        this.dialogData = []
        if (this.localDialogConfig.codeType === 'insuredCode') {
          var keyWord = this.localDialogConfig.keyWord
          var keyWordOne = this.localDialogConfig.keyWordOne
          var keyWordTwo = this.localDialogConfig.keyWordTwo
          if (keyWord === '') {
            this.$Message.error('请选择被保险人类型！')
            return false
          } else {
            if (keyWordOne === '' && keyWordTwo === '') {
              this.$Message.error('请填写被保险人名称或者被保险人代码！')
              return false
            }
          }
          let queryPar = {
            customerVo: {
              customerCode: this.localDialogConfig.keyWordOne,
              customerCName: this.localDialogConfig.keyWordTwo,
              customerType: this.localDialogConfig.keyWord,
              identifyType: '',
              identifyNumber: '',
              returnDataCount: ''
            },
            pageNo: this.pageNo,
            pageSize: this.pageSize,
            totalCount: '',
            pageCount: ''
          }
          customerModelQuery(queryPar).then((response) => {
            this.dialogData = []
            if (this.localDialogConfig.codeType === 'insuredCode') {
              if (response.dataList !== null) {
                for (let i = 0; i < response.dataList.length; i++) {
                  let rowdata = response.dataList[i]
                  let row = {col1: rowdata.customerCode, col2: rowdata.customerCName, col3: rowdata.identifyType, col4: rowdata.identifyNumber}
                  this.dialogData.push(row)
                }
              } else if (response.message !== null && response.message !== '') {
                this.$Message.error(response.message)
                return false
              }
            }
            // 同步更新分页数据
            this.pageNo = response.pageNo
            this.pageSize = response.pageSize
            this.total = response.totalCount
            this.loading = false
          })
          // 3、关闭loading
          this.loading = false
          this.spinShow = false
        } else if (this.localDialogConfig.codeType === 'ArchivesNo') {
          // 1、组织查询条件
          let queryPar = {
            archivesNo: this.localDialogConfig.keyWord,
            companyname: this.localDialogConfig.keyWordName,
            pageNo: this.pageNo,
            pageSize: this.pageSize
          }
          // 2、调用后台接口查询数据
          this.$api.queryJsonDataForModal(this.localDialogConfig.requestURL, queryPar, true).then((response) => {
            this.dialogData = []
            // 清空数据回避组件缓存问题，缓存问题押后解决
            if (response.dataList !== null) {
              for (let i = 0; i < response.dataList.length; i++) {
                let rowdata = response.dataList[i]
                if (rowdata.exploreDate !== '' && rowdata.exploreDate !== null) {
                  rowdata.exploreDate = rowdata.exploreDate.substring(0, 10)
                }
                let row = {col1: rowdata.archivesNo, col2: rowdata.companyName, col3: rowdata.exploreDate}
                this.dialogData.push(row)
              }
            }
            // 同步更新分页数据
            this.pageNo = response.pageNo
            this.pageSize = response.pageSize
            this.total = response.totalCount
            this.loading = false
          })
          // 3、关闭loading
          this.loading = false
          this.spinShow = false
        } else if (this.localDialogConfig.codeType === 'LastRiskFileNo') {
          // 1、组织查询条件
          let queryPar = {
            riskFileNo: this.localDialogConfig.keyWord,
            insureName: this.localDialogConfig.keyWordName,
            pageNo: this.pageNo,
            pageSize: this.pageSize
          }
          // 2、调用后台接口查询数据
          this.$api.queryJsonDataForModal(this.localDialogConfig.requestURL, queryPar, true).then((response) => {
            this.dialogData = []
            // 清空数据回避组件缓存问题，缓存问题押后解决
            if (response.dataList !== null) {
              for (let i = 0; i < response.dataList.length; i++) {
                let rowdata = response.dataList[i]
                if (rowdata.exploreDate !== '' && rowdata.exploreDate !== null) {
                  rowdata.exploreDate = rowdata.exploreDate.substring(0, 10)
                }
                if (rowdata.exploreType === '2') {
                  this.type = '复勘'
                } else {
                  this.type = '初勘'
                }
                let row = {col1: rowdata.riskFileNo, col2: rowdata.insuredName, col3: rowdata.insuredCode, col4: this.type, col5: rowdata.exploreDate}
                this.dialogData.push(row)
              }
            }
            // 同步更新分页数据
            this.pageNo = response.pageNo
            this.pageSize = response.pageSize
            this.total = response.totalCount
            this.loading = false
          })
          // 3、关闭loading
          this.loading = false
          this.spinShow = false
        } else if (this.localDialogConfig.codeType === 'TradeCode') {
          // -------国民经济代码查询切换为 elasticsearch 中英文全模糊--------
          let keyword = this.localDialogConfig.keyWord
          let data = {
            from: (this.pageNo - 1) * this.pageSize,
            size: this.pageSize,
            query: {bool: {should: [{wildcard: {businessSourceCName: '*' + keyword + '*'}}, {wildcard: {businessSourceEName: '*' + keyword + '*'}}]}}
          }
          tradeCode(data).then(response => {
            this.dialogData = []
            if (response.hits.hits.length !== 0) {
              for (let i = 0; i < response.hits.hits.length; i++) {
                let rowdata = response.hits.hits[i]._source
                let row = {col1: rowdata.businessSourceEName, col2: rowdata.businessSourceCName, col3: rowdata.businessClass}
                this.dialogData.push(row)
              }
            }
            // 同步更新分页数据
            this.pageNo = this.pageNo
            this.pageSize = this.pageSize
            this.total = response.hits.total
            this.loading = false
            this.spinShow = false
          })
          // -------国民经济代码查询切换为 elasticsearch 中英文全模糊--------
        } else if (this.localDialogConfig.codeType === 'insured') {
          // -------被保险人查询切换为 elasticsearch 中英文全模糊--------
          let keyword = this.localDialogConfig.keyWord
          let data = {
            from: (this.pageNo - 1) * this.pageSize,
            size: this.pageSize,
            query: {bool: {should: [{wildcard: {insuredCode: '*' + keyword + '*'}}, {wildcard: {insuredName: '*' + keyword + '*'}}]}}
          }
          insured().then(response => {
            this.dialogData = []
            if (response.hits.hits.length !== 0) {
              for (let i = 0; i < response.hits.hits.length; i++) {
                let rowdata = response.hits.hits[i]._source
                let row = {col1: rowdata.insuredCode, col2: rowdata.insuredName}
                this.dialogData.push(row)
              }
            }
            // 同步更新分页数据
            this.pageNo = this.pageNo
            this.pageSize = this.pageSize
            this.total = response.hits.total
            this.loading = false
            this.spinShow = false
          })
          // -------报保险人查询切换为 elasticsearch 中英文全模糊--------
        } else {
          // 1、组织查询条件
          let userInfo = this.$store.getters.getUserInfo
//          if (this.localDialogConfig.codeType === 'TradeCode') {
//            this.pageSize = 10
//            if (this.localDialogConfig.keyWord !== '') {
//              let str = []
//              str = this.localDialogConfig.keyWord.replace(/(.)(?=[^$])/g, '$1,').split(',')
//              for (let i = 0, length = str.length; i < length; i++) {
//                let s = str[i]
//                let reg = /^[A-Z]+$/
//                let reg1 = /^[a-zA-Z]+$/
//                if (s.match(reg1) !== null) {
//                  if (s.match(reg) === null) {
//                    s = s.toUpperCase()
//                  }
//                  str[i] = s
//                }
//              }
//              this.localDialogConfig.keyWord = str.join('')
//            }
//            // str.replaceAll(/,/g, '')
//          }
          let queryPar = {
            userCode: userInfo.userCode,
            comCode: userInfo.comCode,
            riskCode: 'QBB',
            keyWord: this.localDialogConfig.keyWord,
            codeType: this.localDialogConfig.codeType,
            pageNo: this.pageNo,
            pageSize: this.pageSize
          }
          // 2、调用后台接口查询数据
          queryComCode(queryPar).then(response => {
              // 清空数据回避组件缓存问题，缓存问题押后解决
              this.dialogData = []
              if (queryPar.codeType === 'comCode') {
                if (response.dataList !== null) {
                  for (let i = 0; i < response.dataList.length; i++) {
                    let rowdata = response.dataList[i]
                    let row = {col1: rowdata[0], col2: rowdata[1], col3: rowdata[2], col4: rowdata[3], col5: rowdata[4]}
                    this.dialogData.push(row)
                  }
                }
                // 同步更新分页数据
                this.pageNo = response.pageNo
                this.pageSize = response.pageSize
                this.total = response.totalCount
              }
              if (queryPar.codeType === 'UserCode') {
                if (response.data.result !== null) {
                  for (let i = 0; i < response.data.result.length; i++) {
                    let rowdata = response.data.result[i]
                    let row = {col1: rowdata[0], col2: rowdata[1], col3: rowdata[3]}
                    this.dialogData.push(row)
                  }
                }
                // 同步更新分页数据
                this.pageNo = response.data.pageNo
                this.pageSize = response.data.pageSize
                this.total = response.data.totalCount
              }
//              查询渠道代码
              if (queryPar.codeType === 'BusinessNature') {
                if (response.data.result !== null) {
                  for (let i = 0; i < response.data.result.length; i++) {
                    let rowdata = response.data.result[i]
                    let row = {col1: rowdata[0], col2: rowdata[1]}
                    this.dialogData.push(row)
                  }
                }
                // 同步更新分页数据
                this.pageNo = response.data.pageNo
                this.pageSize = response.data.pageSize
                this.total = response.data.totalCount
              }
//              if (queryPar.codeType === 'TradeCode') {
//                if (response.data.result !== null) {
//                  for (let i = 0; i < response.data.result.length; i++) {
//                    let rowdata = response.data.result[i]
//                    let row = {col1: rowdata[0], col2: rowdata[1], col3: rowdata[2]}
//                    this.dialogData.push(row)
//                  }
//                }
//                // 同步更新分页数据
//                this.pageNo = response.data.pageNo
//                this.pageSize = response.data.pageSize
//                this.total = response.data.totalCount
//              }
              this.loading = false
              this.spinShow = false
            })
        }
      }
    },
    computed: {
//      showFlag: function () {
//        return this.show
//      }
//      showFlag: {
//        get: function () {
//          return this.show
//        },
//        set: function (v) {
//          this.show = v
//        }
//      }
    },
    watch: {
      'dialogConfig.dialogFlag' (val, oldval) {
        this.showFlag = val
        this.localDialogConfig.codeType = this.dialogConfig.codeType
        this.localDialogConfig.columnTitles = this.dialogConfig.columnTitles
        this.localDialogConfig.dialogFlag = this.dialogConfig.dialogFlag
        this.localDialogConfig.fixedHeader = this.dialogConfig.fixedHeader
        this.localDialogConfig.keyWord = this.dialogConfig.keyWord
        this.localDialogConfig.keyWordDesc = this.dialogConfig.keyWordDesc
        this.localDialogConfig.keyWordDescName = this.dialogConfig.keyWordDescName
        this.localDialogConfig.keyWordName = this.dialogConfig.keyWordName
        this.localDialogConfig.keyWordDescOne = this.dialogConfig.keyWordDescOne
        this.localDialogConfig.keyWordDescTwo = this.dialogConfig.keyWordDescTwo
        this.localDialogConfig.keyWordOne = this.dialogConfig.keyWordOne
        this.localDialogConfig.keyWordTwo = this.dialogConfig.keyWordTwo
        this.localDialogConfig.requestURL = this.dialogConfig.requestURL
      },
      showFlag (val, oldval) {
        this.$emit('sync-dialog-show-flag', val)
      }
    }
  }
</script>
