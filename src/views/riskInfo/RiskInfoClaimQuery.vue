<template>
  <div >
    <div>
      <el-col>
        <div class="searchClass">
          <span>典型案例搜索</span>
        </div>
      </el-col>
      <el-card>
        <div v-show="selectShowFlag">
          <el-form ref="riskClaimVo" :model="riskClaimVo" :rules="rules" label-width="140px" class="form1" >
            <el-row>
              <el-col :span="12">
                <el-form-item label="案例名称：" prop="claimName">
                  <el-input v-model="riskClaimVo.claimName" type="text" aria-placeholder="请输入..." style="width: 100%"/>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="产品名称：" prop="riskCname">
                  <el-input v-model="riskClaimVo.riskCname" type="text" aria-placeholder="请输入..." style="width: 100%" />
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="出险年度：" prop="claimYear">
                  <el-date-picker v-model="riskClaimVo.claimYear" :editable="readFlag" type="year" placeholder="请选择" style="width: 100%" @on-change="checkDate" @on-clear="closeDate" />
                </el-form-item>
              </el-col>

              <el-col :span="7">
                <el-form-item label="赔款金额：" prop="claimAmountLow" >
                  <el-input v-model="riskClaimVo.claimAmountLow" type="text" aria-placeholder="请输入..." style="width: 100%"/>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label-width="50px" label="至：" prop="claimAmountHigh">
                  <el-input v-model="riskClaimVo.claimAmountHigh" type="text" aria-placeholder="请输入..." />
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="查勘险类：" prop="riskNames" >
                  <el-select v-model="riskClaimVo.riskNames" multiple filterable placeholder="请选择" >
                    <el-option v-for="item in riskNameList" :key="item.value" :label="item.label" :value="item.value" />
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="查勘行业：" prop="professions" >
                  <el-select v-model="riskClaimVo.professions" v-loading="loadingP" multiple filterable placeholder="请选择" style="width: 100%" >
                    <el-option v-for="item in professionList" :key="item.value" :label="item.label" :value="item.value" />
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="出险原因：" filterable prop="claimReasons" >
                  <el-select v-model="riskClaimVo.claimReasons" v-loading="loadingP" multiple filterable placeholder="请选择" style="width: 100%" @click="remoteMethodSelect('claimReason')">
                    <el-option v-for="item in claimReasonList" :key="item.value" :label="item.label" :value="item.value" />
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="案件来源：" prop="senders" >
                  <el-select v-model="riskClaimVo.senders" v-loading="loadingS" multiple filterable placeholder="请选择" style="width: 100%" >
                    <el-option v-for="item in sendersList" :key="item.value" :label="item.label" :value="item.value" />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <br>
              <div style="textAlign:center">
                <el-button type="dashed" icon="el-icon-refresh-right" @click="reset('riskClaimVo')" round>重置</el-button>
                <el-button type="primary" icon="el-icon-search" @click="search(1)" round>查询</el-button>
              </div>
            </el-row>
          </el-form>
        </div>

        <div>
          <div class="resultClass">
            查询结果
          </div>
          <div style="padding: 10px;" >
            <el-table :data="dataList" v-loading="loadFlag" @sort-change='resultSort' @row-dblclick='browseInfo' >
              <el-table-column label="案例名称" prop="claimName" />
              <el-table-column label="产品名称" prop="riskCname" />
              <el-table-column label="出险年度" sortable="custom" prop="claimYear" />
              <el-table-column label="查勘行业" prop="profession" />
              <el-table-column label="查勘险类" sortable="custom" prop="riskName" />
              <el-table-column label="案件来源" prop="sender" />
              <el-table-column label="赔款金额" sortable="custom" prop="claimAmount" />
              <el-table-column label="出险原因" prop="claimReason" />
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
            @current-change="changePage" />
        </div>

      </el-card>
    </div>

  </div>
</template>

<script>
  //import Cookies from 'js-cookie'
  import { riskDCodeQuery, queryRiskInfoClaim } from "@/api/riskInfo"
    export default {
      name: "RiskInfoClaimQuery",
      data() {
        const validateClaimAmountLow = (rule, value, callback) => {
          var reg = /^\d+(\.{0,1}\d+){0,1}$/
          value = value.replace(/,/g, '')
          if (value !== '') {
            if (value.match(reg) === null) {
              callback(new Error('赔款金额只能录入非负数!'))
            } else {
              var claimAmountHigh = this.riskClaimVo.claimAmountHigh.replace(/,/g, '')
              if (claimAmountHigh !== null && claimAmountHigh !== '' && claimAmountHigh.match(reg) !== null) {
                if (parseFloat(value) > parseFloat(claimAmountHigh)) {
                  callback(new Error('金额不能大于终止赔款金额'))
                } else {
                  this.riskClaimVo.claimAmountLow = this.toThousands(parseFloat(value).toFixed(2))
                  callback()
                }
              }
              this.riskClaimVo.claimAmountLow = this.toThousands(parseFloat(value).toFixed(2))
              callback()
            }
          } else {
            callback()
          }
        }
        const validateClaimAmountHigh = (rule, value, callback) => {
          var reg = /^\d+(\.{0,1}\d+){0,1}$/
          value = value.replace(/,/g, '')
          if (value !== '') {
            if (value.match(reg) === null) {
              callback(new Error('赔款金额只能录入非负数!'))
            } else {
              var claimAmountLow = this.riskClaimVo.claimAmountLow.replace(/,/g, '')
              if (claimAmountLow !== null && claimAmountLow !== '' && claimAmountLow.match(reg) !== null) {
                if (parseFloat(value) < parseFloat(claimAmountLow)) {
                  callback(new Error('金额不能小于起始赔款金额'))
                } else {
                  this.riskClaimVo.claimAmountHigh = this.toThousands(parseFloat(value).toFixed(2))
                  callback()
                }
              }
              this.riskClaimVo.claimAmountHigh = this.toThousands(parseFloat(value).toFixed(2))
              callback()
            }
          } else {
            callback()
          }
        }
        return {
          codeType: '',
          loading: false,
          loadingS: false,
          loadingP: false,
          pdfFlag: '',
          showicon: 'fa fa-angle-double-up fa-2x',
          selectShowFlag: true,
          validStatusFlag: false,
          hideOneFlage: 'none',
          hideTwoFlage: 'none',
          riskClaimVo: {
            claimName: '',
            riskCname: '',
            claimYear: '',
            claimAmountLow: '',
            claimAmountHigh: '',
            riskNames: [],
            professions: [],
            claimReasons: [],
            senders: [],
            validStatus: []
          },
          claimReasonList: [],
          pageNo: 1,
          pageSize: 5,
          totalCount: 0,
          margin: '1px',
          center: 'center',
          orderType: true,
          serialNo: '',
          orderColumn: 'serialNo',
          orderTitle: '',
          showFlag: false,
          loadFlag: false,
          dataList: [],
          sendersList: [],
          professionList: [],
          readFlag: true,
          riskNameList: [
            {
              value: 'G',
              label: '工程险'
            },
            {
              value: 'Q',
              label: '企财险'
            },
            {
              value: 'J',
              label: '家财险'
            },
            {
              value: '9',
              label: '未说明'
            }
          ],
          riskInfoClaimColumns: [
            {
              title: '案例名称',
              key: 'claimName',
              minWidth: 280,
              align: 'center'
            },
            {
              title: '产品名称',
              key: 'riskCname',
              minWidth: 110,
              align: 'center'
            },
            {
              title: '出险年度',
              key: 'claimYear',
              sortable: 'custom',
              minWidth: 110,
              align: 'center'
            },
            {
              title: '查勘行业',
              key: 'profession',
              minWidth: 110,
              align: 'center'
            },
            {
              title: '查勘险类',
              key: 'riskName',
              minWidth: 110,
              sortable: 'custom',
              align: 'center'
            },
            {
              title: '案件来源',
              key: 'sender',
              minWidth: 150,
              align: 'center'
            },
            {
              title: '赔款金额',
              key: 'claimAmount',
              minWidth: 150,
              sortable: 'custom',
              align: 'center',
              render: (h, params) => {
                return h('div', this.toThousands((parseFloat(params.row.claimAmount)).toFixed(2)))
              }
            },
            {
              title: '出险原因',
              key: 'claimReason',
              minWidth: 200,
              align: 'center'
            }
          ],
          // 表单校验
          rules: {
            claimAmountLow: [
              { validator: validateClaimAmountLow, trigger: 'blur' }
            ],
            claimAmountHigh: [
              { validator: validateClaimAmountHigh, trigger: 'blur' }
            ]
          }
        }
      },
      created() {
        this.pdfFlag = ''
        this.pdfFlag = this.$route.query.returnBefore
        // if (this.$store.getters.getDatas !== '') {
        //   this.loadFlag = true
        //   this.showFlag = true
        //   this._data = this.$store.getters.getDatas
        //   this.queryRiskInfoClaim()
        //   this.selectShowFlag = false
        // }
        // 远程搜索
        this.remoteMethodProfession({ codeType: "profession" })
        this.remoteMethodSender({ codeType: "claimSender" })
        this.remoteMethodClaimReason({ codeType: "claimReason" })
      },
      methods: {
        toThousands: function (num) {
          var result = ''
          var numP = ''
          var numS = ''
          if (num === '' || num === null) {
            return ''
          }
          if (((num || 0) + '').indexOf('.')) {
            numP = parseInt(num) + ''
            numS = (num + '').split('.')[1]
            while (numP.length > 3) {
              result = ',' + numP.slice(-3) + result
              numP = numP.slice(0, numP.length - 3)
            }
            if (numP) {
              result = numP + result
            }
            return result + '.' + numS + ''
          } else {
            numP = (num || 0) + ''
            while (numP.length > 3) {
              result = ',' + numP.slice(-3) + result
              numP = numP.slice(0, numP.length - 3)
            }
            if (numP) {
              result = numP + result
            }
            return result
          }
        },
        // 页码改变方法
        changePage(index) {
          this.pageNo = index
          this.search(index)
        },
        changepagesize(value) {
          this.pageNo = 1
          this.pageSize = value
          //Cookies.set('pageSize', value)
          this.search(this.pageNo)
        },
        checkDate(val, valType) {
          if (val !== '') {
            this.readFlag = false
          }
        },
        closeDate() {
          this.readFlag = true
        },
        search (index) {
          //  表单校验
          this.$refs['riskClaimVo'].validate((valid) => {
           if (valid) {
              this.loadFlag = true
              this.showFlag = true
              if (index !== null && index !== '') {
                this.pageNo = index
              } else {
                this.pageNo = 1
              }
              //let pageSize = Cookies.get('pageSize')
              const pageSize = this.pageSize
              if (pageSize !== undefined && pageSize !== '') {
                this.pageSize = parseInt(pageSize)
              }
              this.queryRiskInfoClaim()
              //this.selectShowFlag = false
              this.showicon = 'fa fa-angle-double-down fa-2x'
           } else {
              this.$Message.error('查询条件错误，请修改!')
           }
          })
        },
        queryRiskInfoClaim () {
          this.riskClaimVo.claimAmountLow = this.riskClaimVo.claimAmountLow.replace(/,/g, '')
          this.riskClaimVo.claimAmountHigh = this.riskClaimVo.claimAmountHigh.replace(/,/g, '')
          queryRiskInfoClaim(this._data).then((response) => {
            if (response.qCexception) {
              this.$router.push({ name: 'exception', path: '/exception', params: { ex: response.qCexception, Flag: '1' } })
            }
            this.dataList = response.dataList
            this.totalCount = response.totalCount
            this.loadFlag = false
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
          if (this.riskClaimVo.claimAmountHigh === null || this.riskClaimVo.claimAmountHigh !== '' || this.riskClaimVo.claimAmountHigh === 0) {
            this.riskClaimVo.claimAmountHigh = this.toThousands(parseFloat(this.riskClaimVo.claimAmountHigh).toFixed(2))
          }
          if (this.riskClaimVo.claimAmountLow === null || this.riskClaimVo.claimAmountLow !== '' || this.riskClaimVo.claimAmountLow === 0) {
            this.riskClaimVo.claimAmountLow = this.toThousands(parseFloat(this.riskClaimVo.claimAmountLow).toFixed(2))
          }
        },
        // 结果排序
        resultSort (column) {
          //!!$('.ivu-table-cell .ivu-icon.ivu-icon-arrow-down-b').removeClass('on')
          //!!$('.ivu-table-cell .ivu-icon.ivu-icon-arrow-up-b').removeClass('on')
          //this.orderTitle = column.column.title
          this.orderColumn = column.prop
          if (column.order === 'descending') {
            this.orderType = true
          } else if (column.order === 'ascending') {
            this.orderType = false
          } else {
            this.orderType = true
            this.orderColumn = 'serialNo'
          }
          this.queryRiskInfoClaim()
        },
        browseInfo (row, index) {
          this.$store.commit('SET_DATAS', this._data)
          this.$router.push({ path: '/pdf_page', query: { srcUrlMe: row.url, myData: this._data, flag: 'riskInfoClaimQuery' } })
        },
        // 重置方法
        reset (name) {
          this.riskClaimVo.riskNames = []
          this.riskClaimVo.claimReasons = []
          this.riskClaimVo.professions = []
          this.riskClaimVo.senders = []
          this.riskClaimVo.claimName = ''
          this.riskClaimVo.riskCname = ''
          this.riskClaimVo.claimYear = ''
          this.riskClaimVo.claimAmountLow = ''
          this.riskClaimVo.claimAmountHigh = ''
          this.pageNo = 1
          this.dataList = []
          this.totalCount = 0
          this.orderType = true
          this.orderColumn = 'serialNo'
          this.showFlag = false
          this.orderTitle = ''
        },
        //查勘行业下拉列表数据查询
        remoteMethodProfession (query) {
          if (query) {
            riskDCodeQuery(query).then(res => {
              const list = res.map(item => {
                return {
                  value: item.id.codeCode,
                  label: item.codeCname
                }
              })
              this.professionList = list
            })
          }
        },
        //出险原因下拉列表数据查询
        remoteMethodClaimReason (query) {
          if (query) {
            riskDCodeQuery(query).then(res => {
              const list = res.map(item => {
                return {
                  value: item.id.codeCode,
                  label: item.codeCname
                }
              })
              this.claimReasonList = list
            }, (response) => {
              // error callback
            })
          }
        },
        //案件来源下拉列表数据查询
        remoteMethodSender (query) {
          if (query) {
            riskDCodeQuery(query).then(res => {
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
      }
    }
</script>

<style lang="scss" scoped>
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
  .resultClass{
    width: 100%;
    height: 44px;
    background: rgba(237,238,240,1);
    line-height: 44px;
    text-align: left;
    padding-left: 10px;
    font-weight: 600;
  }
  .result-wrapper{
    .btnbox{
      margin: 16px 0;
    }
  }
  .searchClass{
    width: 1168px;
    height: 52px;
    line-height: 52px;
    text-align: left;
    padding-left: 10px;
    font-weight: 600;
  }
</style>
