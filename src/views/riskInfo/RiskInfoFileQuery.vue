<template>
  <div>
    <div>
      <el-col>
        <div class="searchClass">
          <span>优秀风控报告搜索</span>
        </div>
      </el-col>
      <el-card>
        <div>
          <el-form ref="riskInfoFileVo" :model="riskFileVo" label-position="right" :rules="ruleValidate" class="form1" label-width="150px">
            <el-row>
              <el-col :span="12">
                <el-form-item label="风控报告名称：" prop="riskFileName">
                  <el-input v-model="riskFileVo.riskFileName" aria-placeholder="请输入..." style="width: 100%"/>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="出具报告年度：" :style="{marginTop:margin}" prop="riskYear">
                  <el-date-picker v-model="riskFileVo.riskYear" type="year" aria-placeholder="请输入..." style="width: 100%" :editable="readFlag" @on-change="checkDate" @on-clear="closeDate"/>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="查勘行业：" :style="{marginTop:margin}" prop="professions" >
                  <el-select v-model="riskFileVo.professions" v-loading="loadingP" multiple filterable style="width: 100%" >
                    <el-option v-for="profession in professionsList" :key="profession.value" :label="profession.label" :value="profession.value" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="查勘险类：" :style="{marginTop:margin}" prop="riskNames" >
                  <el-select v-model="riskFileVo.riskNames" multiple filterable style="width: 100%" >
                    <el-option v-for="riskName in riskNamesList" :key="riskName.value" :label="riskName.label" :value="riskName.value" />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="出具报告机构：" :style="{marginTop:margin}" prop="senders" >
                  <el-select v-model="riskFileVo.senders" v-loading="loadingS" multiple filterable style="width: 100%" >
                    <el-option v-for="sender in sendersList" :key="sender.value" :label="sender.label" :value="sender.value" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="风控报告来源：" :style="{marginTop:margin}" prop="ascNames" >
                  <el-select v-model="riskFileVo.ascNames" v-loading="loadingA" multiple filterable style="width: 100%" >
                    <el-option v-for="ascName in ascNamesList" :key="ascName.value" :label="ascName.label" :value="ascName.value" />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <br>
            <div style="textAlign:center">
              <el-button type="dashed" icon="el-icon-refresh-right" round @click="reset('riskInfoFileVo')" >重置</el-button>
              <el-button type="primary" icon="el-icon-search" round @click="search" >查询</el-button>
            </div>
          </el-form>
        </div>

        <div>
          <div class="resultClass">
            查询结果
          </div>
          <div class="result-wrapper">
            <el-table v-loading="loading" :data="riskFiles" @row-dblclick="rowBrowse" @sort-change="order">
              <el-table-column label="风控报告名称" prop="riskFileName" />
              <el-table-column label="查勘行业" prop="profession" />
              <el-table-column label="报告年度" sortable="custom" prop="riskYear" />
              <el-table-column label="查勘险类" sortable="custom" prop="riskName" />
              <el-table-column label="报告来源" prop="ascName" />
              <el-table-column label="报告机构" prop="sender" />
            </el-table>
          </div>
        </div>

        <!--分页-->
        <div style="textAlign:center">
          <el-pagination
            :current-page="pageNo"
            :page-sizes="[5,15,50]"
            :page-size="pageSize"
            :total="totalCount"
            layout="total,prev, pager, next, jumper,sizes"
            @size-change="changepagesize"
            @current-change="changepage" />
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
  import { riskDCodeQuery, queryRiskInfoFile, riskReportDCodeQuery } from "@/api/riskInfo"
  export default {
    name: "RiskInfoFileQuery",
    data() {
      return {
        loadingP: false,
        loadingA: false,
        loadingS: false,
        showicon: 'fa fa-angle-double-up fa-2x',
        validStatusFlag: false,
        hideOneFlage: 'none',
        hideTwoFlage: 'none',
        riskFileVo: {
          riskFileName: '',
          riskYear: '',
          professions: [],
          riskNames: [],
          senders: [],
          ascNames: [],
          validStatus: []
        },
        professionsList: [],
        ascNamesList: [],
        sendersList: [],
        riskNamesList: [
          {
            value: 'G',
            label: '工程险'
          },
          {
            value: 'Q',
            label: '企财险'
          },
          {
            value: '9',
            label: '未说明'
          }
        ],
        hideOne: false,
        hideTwo: false,
        hideThree: false,
        riskFiles: [],
        pageNo: 1,
        pageSize: 5,
        totalCount: 0,
        pageCount: '',
        orderColumn: 'serialNo',
        orderTitle: '',
        orderType: true,
        showFlag: false,
        margin: '1px',
        center: 'center',
        loading: false,
        readFlag: true,
        ruleValidate: {}
      }
    },
    created() {
      this.pageNo = 1
      this.pdfFlag = ''
      this.pdfFlag = this.$route.query.returnBefore
      //以下代码暂时注掉
      // if (this.$store.getters.getDatas !== '') {
      //   this._data = this.$store.getters.getDatas
      //   this.queryRiskFile()
      //   this.showFlag = true
      //   this.loading = true
      //   this.showicon = 'fa fa-angle-double-down fa-2x'
      // }

      this.remoteMethodProfession(' ')
      this.remoteMethodAscName(' ')
      this.remoteMethodSender(' ')
    },
    methods: {
      search () {
        this.$refs.riskInfoFileVo.validate((valid) => {
        if (valid) {
          this.pageNo = 1
          //!!let pageSize = Cookies.get('pageSize')
          const pageSize = this.pageSize
          if (pageSize !== undefined && pageSize !== '') {
            this.pageSize = parseInt(pageSize)
          }
          this.queryRiskFile()
          this.showFlag = true
          this.loading = true
          this.showicon = 'fa fa-angle-double-down fa-2x'
        } else {
          this.$Message.error('查询条件错误!!!请修改')
        }
        })
      },
      rowBrowse (data, index) {
        this.open(data.url)
      },
      open (url) {
        this.$store.commit('SET_DATAS', this._data)
        this.$router.push({ path: '/pdf_page', query: { srcUrlMe: url, myData: this._data, flag: 'riskInfoFileQuery' } })
      },
      queryRiskFile () {
        queryRiskInfoFile(this._data).then((response) => {
          if (response.qCexception) {
            this.$router.push({ name: 'exception', path: '/exception', params: { ex: response.qCexception, Flag: '1' } })
          }
          this.riskFiles = response.dataList
          this.totalCount = response.totalCount
          this.pageCount = response.totalPage
          this.showFlag = true
          this.loading = false
          if (this.$store.getters.getDatas !== '') {
            this.$store.commit('SET_DATAS', '')
              // $('.ivu-table-cell .ivu-icon.ivu-icon-arrow-down-b').removeClass('on')
              // $('.ivu-table-cell .ivu-icon.ivu-icon-arrow-up-b').removeClass('on')
              // let arrowDown = $('.ivu-table-cell .ivu-icon.ivu-icon-arrow-down-b')
              // let arrowUp = $('.ivu-table-cell .ivu-icon.ivu-icon-arrow-up-b')
            if (this.orderColumn === 'serialNo') {
               // $('.ivu-table-cell .ivu-icon.ivu-icon-arrow-down-b').removeClass('on')
               // $('.ivu-table-cell .ivu-icon.ivu-icon-arrow-up-b').removeClass('on')
            } else {
              if (this._data.orderType === true) {
                // for (let i = 0; i < arrowDown.length; i++) {
                //   let arrowText = arrowDown.eq(i).parent().prev().text()
                //   if (arrowText === this._data.orderTitle) {
                //     arrowDown.eq(i).addClass('on')
                //   }
                // }
                this.orderType = this._data.orderType
              } else if (this._data.orderType === false) {
                // for (let i = 0; i < arrowUp.length; i++) {
                //   let arrowText = arrowDown.eq(i).parent().prev().text()
                //   if (arrowText === this._data.orderTitle) {
                //     arrowUp.eq(i).addClass('on')
                //   }
                // }
              }
            }
          }
        }, (response) => {
          // error callback
        })
      },
      order (column) {
         // $('.ivu-table-cell .ivu-icon.ivu-icon-arrow-down-b').removeClass('on')
         // $('.ivu-table-cell .ivu-icon.ivu-icon-arrow-up-b').removeClass('on')
        this.loading = true
        //this.orderTitle = column.column.title
        this.orderColumn = column.prop
        if (column.order === 'descending') {
          this.orderType = true
        } else if (column.order === 'ascending') {
          this.orderType = false
        } else {
          this.orderColumn = 'serialNo'
          this.orderType = true
        }
        this.queryRiskFile()
      },
      reset (name) {
        this.$refs[name].resetFields()
        this.orderColumn = 'serialNo'
        this.orderType = true
        this.orderTitle = ''
        this.pageNo = 1
        this.riskFiles = []
        this.riskFileVo.riskFileName = ''
        this.riskFileVo.riskYear = ''
        this.riskFileVo.professions = []
        this.riskFileVo.riskNames = []
        this.riskFileVo.senders = []
        this.riskFileVo.ascNames = []
        this.totalCount = 0
        this.showFlag = false
      },
      checkDate (val, valType) {
        if (val !== '') {
          this.readFlag = false
        }
      },
      closeDate () {
        this.readFlag = true
      },
      remoteMethodProfession (query) {
        if (query) {
          riskDCodeQuery({ codeType: 'profession' }).then(res => {
            const list = res.map(item => {
              return {
                value: item.id.codeCode,
                label: item.codeCname
              }
            })
            this.professionsList = list
          }, (response) => {
            // error callback
          })
        }
      },
      remoteMethodAscName (query) {
        if (query) {
          riskReportDCodeQuery({ codeType: 'riskFileAscName' }).then(res => {
            const list = res.map(item => {
              return {
                value: item.id.codeCode,
                label: item.codeCname
              }
            })
            this.ascNamesList = list
          }, (response) => {
            // error callback
          })
        }
      },
      remoteMethodSender (query) {
        if (query) {
          riskReportDCodeQuery({ codeType: 'riskFileSender' }).then(res => {
            const list = res.map(item => {
              return {
                value: item.id.codeCode,
                label: item.codeCname
              }
            })
            this.sendersList = list
          }, (response) => {
            // error callback
          })
        }
      },
      changepage (index) {
        this.pageNo = index
        this.loading = true
        this.queryRiskFile()
      },
      changepagesize (value) {
        this.pageNo = 1
        this.pageSize = value
        this.loading = true
        //Cookies.set('pageSize', value)
        this.queryRiskFile()
      },
    }
  }
</script>

<style lang="scss" scoped>
  .form1{
    margin-bottom: 32px;
  }
  .searchClass{
    width: 1168px;
    height: 52px;
    line-height: 52px;
    text-align: left;
    padding-left: 10px;
    font-weight: 600;
  }
  .resultClass{
    width: 100%;
    height: 44px;
    background: rgba(237,238,240,1);
    line-height: 44px;
    text-align: left;
    padding-left: 10px;
    font-weight: 600;

  }
  .title{
    margin: -16px -15px 16px;
    padding: 0 12px;
    font-size: 14px;
    line-height: 36px;
    background-color: #fafdff;
  }
  .result-wrapper{
  .btnbox{
    margin: 16px 0;
  }
  }
</style>
