<template>
  <div>
    <el-col style="padding: 10px">
      <el-card class="ivu-card-height">
        <div class="title">
          <i icon="document-text"/>
          基本信息
        </div>
        <el-form ref="riskReportMainVo" :model="riskInsInputData.riskReportMainVo" class="form1" label-width="120px" :rules="ruleValidate">
          <el-row>
            <el-col :span="24">
              <el-col :span="8">
                <el-form-item label="投保险类" prop="classCode">
                  <el-select v-model="riskInsInputData.riskReportMainVo.classCode" @on-change="queryRiskCode(riskInsInputData.riskReportMainVo.classCode)" filterable>
                    <el-option value="" selected >请选择</el-option>
                    <el-option v-for="classC in riskInsInputData.classCodeList" :value="classC.code"
                               :key="classC.code"  :label="classC.code---classC.name">{{classC.code}}---{{classC.name}}</el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="投保险种" prop="riskCode">
                  <el-select type="text" v-model="riskInsInputData.riskReportMainVo.riskCode"  @on-change="initRiskModelOption" filterable >
                    <el-option value="" selected >请选择</el-option>
                    <el-option v-for="riskC in riskInsInputData.riskCodeList" :value="riskC.code"
                               :key="riskC.code" :label="riskC.code---riskC.name"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8" v-if="riskInsInputData.riskReportMainVo.riskModel === '001' || riskInsInputData.riskReportMainVo.riskModel === '002'">
                <el-form-item label="照片档案号" prop="archivesNo">
                  <el-input type="text" v-model="riskInsInputData.riskReportMainVo.archivesNo" :disabled="archivesNoFlag" @on-blur="checkArchivesNo">
                    <el-button slot="append" icon="el-icon-search" @click="codeCodeDialog('archivesNo');" :disabled="archivesNoFlag"></el-button>
                  </el-input>
                </el-form-item>
              </el-col>
            </el-col>
            <el-col :span="24">
              <el-col :span="8">
                <el-form-item label="报告模板" prop="riskModel"  filterable>
                  <el-select v-if='testFlag' type="text"   v-model="riskInsInputData.riskReportMainVo.riskModel"  filterable  >
                    <el-option value="001" label="2017版财产险风控模板（专职版）"></el-option>
                    <el-option value="002" label="2017版财产险风控模板（兼职版）"></el-option>
                    <el-option value="004" :disabled="isBusinessInterruption"  label="机器损坏险专用风控模板"></el-option>
                    <el-option value="005" :disabled="isMachineShow" label="营业中断险专用风控模板"></el-option>
                    <el-option value="006"  label="火灾风险排查（专业版）"></el-option>
                    <el-option value="007"  label="火灾风险排查（简化版）"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="查勘类别" prop="exploreType">
                  <el-select type="text" v-model="riskInsInputData.riskReportMainVo.exploreType" @on-change="clearHide" filterable>
                    <el-option value="1" label="初勘"></el-option>
                    <el-option value="2" label="复勘"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8" v-if="riskInsInputData.riskReportMainVo.exploreType === '2'">
                <el-form-item label="初勘编号" prop="lastRiskFileNo">
                  <el-input type="text" v-model="riskInsInputData.riskReportMainVo.lastRiskFileNo" @on-blur="checkLastRiskFileNo">
                    <el-button slot="append" icon="el-icon-search" @click="codeCodeDialog('lastRiskFileNo');" ></el-button>
                  </el-input>
                </el-form-item>
              </el-col>
            </el-col>
            <el-col :span="24">
              <el-col :span="8">
                <el-form-item label="查勘机构" prop="explorecomCodeCName">
                  <el-input v-model="riskInsInputData.riskReportMainVo.explorecomCodeCName" placeholder="请输入..." style="width: 100%;" @on-blur="queryData('comCode')">
                    <el-button slot="append" icon="el-icon-search" @click="codeCodeDialog('comCode');" ></el-button>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="查勘人" prop="explorerCName">
                  <el-input type="text" v-model="riskInsInputData.riskReportMainVo.explorerCName" placeholder="请输入..." @on-blur="queryData('explorer')">
                    <el-button slot="append" icon="el-icon-search" @click="codeCodeDialog('explorer');" ></el-button>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="查勘日期" prop="exploreDate" class="checkDate" :class="{ 'ivu-form-item-error': styles.ivuerro}">
                  <el-date-picker type="date" v-model="riskInsInputData.riskReportMainVo.exploreDate" placeholder="请输入时间..." style="width: 100%" :editable="readFlag" @on-change="checkDate" @on-clear="closeDate"></el-date-picker>
                  <div v-show="readFlag1" class="ivu-form-item-error-tip">查勘日期不能为空</div>
                </el-form-item>
              </el-col>
            </el-col>
            <el-col :span="24">
              <el-col :span="8">
                <el-form-item label="被保险人类型" prop="insuredType">
                  <el-select v-model="riskInsInputData.riskReportMainVo.insuredType" placeholder="请选择..."  filterable @on-change="insuredTypeClear"><!--@on-change="insuredTypeClear"-->
                    <el-option value="1" label="个人"></el-option>
                    <el-option value="2" label="团体"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="被保险人名称" prop="insuredName">
                  <el-input type="text" v-model="riskInsInputData.riskReportMainVo.insuredName" placeholder="请输入..." @on-change="changeInsureName()">
                    <el-button slot="append" icon="el-icon-search" @click="insuredSearch"></el-button>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="被保险人代码" prop="insuredCode">
                  <el-input type="text" v-model="riskInsInputData.riskReportMainVo.insuredCode" placeholder="请输入...">
                    <el-button slot="append" icon="el-icon-search" @click="insuredSearch"></el-button>
                  </el-input>
                </el-form-item>
              </el-col>
            </el-col>
          </el-row>
          <div style="text-align:center">
            <el-button type="primary" icon="el-icon-document" :loading="loading" @click="open">生成风控报告</el-button>
          </div>
        </el-form>
      </el-card>
<!--      <CurrencyDialog :dialog-config="DialogConfig" @sync-dialog-show-flag="syncDialogShowFlag" @click-on-row="CurrencyDialogClickOnRow">-->
<!--      </CurrencyDialog>-->
    </el-col>
  </div>
</template>

<script>
  import CurrencyDialog from '../Dialog.vue'
  import riskInsInputData from '@/views/riskdata/riskInsInputData'
  import { riskInsQueryAddress, riskInsQueryRiskMainByInsured, classCodeQuery, riskCodeQuery,
    queryRiskDaddress, queryAddressByRiskFileNo, queryRiskReportSaleMain, customerQuery,
    listCodeQuery, queryComCode, saveRiskInsDetailInput } from '@/api/riskIns'
  export default {
    components: {CurrencyDialog},
    data () {
      return {
        DialogConfig: {
          dialogFlag: false
        },
        testFlag: true,
        isOverLoad: true,
        // 机器损坏险专业风控模板是否显示
        isMachineShow: true,
        // 营业中断险专业风控模板是否显示
        isBusinessInterruption: true,
        addressVo: {
          addressCityCode: '',
          addressCity: '',
          addressCountyCode: '',
          addressCounty: ''
        },
        riskInsInputData: riskInsInputData.a(),
        flag: false,
        labelFlag: true,
        selectFlag: true,
        archivesNoFlag: false,
        readFlag: true,
        readFlag1: false,
        insuredCodeT: '',
        insuredNameT: '',
        styles: {
          ivuerro: false
        },
        // 生成风控报告按钮loading标志位
        loading: false,
        ruleValidate: {
          classCode: [
            {required: true, message: '投保险类不能为空', trigger: 'change'}
          ],
          riskCode: [
            {required: true, message: '投保险种不能为空', trigger: 'change'}
          ],
          riskModel: [
            { required: true, message: '报告模板不能为空', trigger: 'change'}
          ],
          exploreType: [
            {required: true, message: '查勘类别不能为空', trigger: 'change'}
          ],
          explorecomCodeCName: [
            {required: true, message: '查勘机构不能为空', trigger: 'change'}
          ],
          explorerCName: [
            {required: true, message: '查勘人不能为空', trigger: 'change'}
          ],
//          exploreDate: [
//            {validator: validateExploreDate, trigger: 'change'}
//            {required: true, type: 'date', message: '查勘日期不能为空', trigger: 'change'}
//          ],
          insuredType: [
            {required: true, message: '被保险人类型不能为空', trigger: 'change'}
          ],
          insuredName: [
            {required: true, message: '被保险人名称不能为空', trigger: 'change'}
          ],
//          insuredCode: [
//            {required: true, message: '被保险人代码不能为空', trigger: 'change'}
//          ],
          lastRiskFileNo: [
//            {validator: validateLastRiskFileNo, required: true, trigger: 'blur'}
            {required: true, message: '初勘编号不能为空', trigger: 'change'}
          ]
        }
      }
    },
    created () {
      this.queryClassCode()
      // this.getAddressProvinceList()
      // let archivesNo = this.$route.query.archivesNo
      // if (archivesNo !== null && archivesNo !== '' && archivesNo !== undefined) {
      //   this.riskInsInputData.riskReportMainVo.archivesNo = archivesNo
      //   this.archivesNoFlag = true
      //   this.selectFlag = false
      //   this.queryAddressByArchivesNo(archivesNo)
      // }
      // var myDate = new Date()
      // this.riskInsInputData.riskReportMainVo.explorecomCodeCName = this.$store.state.app.userInfo.comCName
      // this.riskInsInputData.riskReportMainVo.explorecomCode = this.$store.state.app.userInfo.comCode
      // this.riskInsInputData.riskReportMainVo.explorerCName = this.$store.state.app.userInfo.userName
      // this.riskInsInputData.riskReportMainVo.explorer = this.$store.state.app.userInfo.userCode
      // this.riskInsInputData.riskReportMainVo.exploreDate = myDate.toLocaleDateString()
    },
    methods: {
      initRiskModelOption () {
        const riskCode = this.riskInsInputData.riskReportMainVo.riskCode
        // 投保险种为：营业中断险
        if (riskCode === 'QAO' || riskCode === 'QDF' || riskCode === 'QAN' || riskCode === 'QUA' || riskCode === 'QEH') {
          // 设置机器损坏险专业风控模板不可见
          if (this.riskInsInputData.riskReportMainVo.riskModel === '004') {
            this.riskInsInputData.riskReportMainVo.riskModel = ''
          }
          this.isMachineShow = false
          this.isBusinessInterruption = true
        } else if (riskCode === 'QED' || riskCode === 'QDN' || riskCode === 'QDT' || riskCode === 'QSD') {
          // 投保险种为: 机器损坏险
          // 设置营业中断险专业风控模板不可见
          if (this.riskInsInputData.riskReportMainVo.riskModel === '005') {
            this.riskInsInputData.riskReportMainVo.riskModel = ''
          }
          this.isBusinessInterruption = false
          this.isMachineShow = true
        } else {
          this.isBusinessInterruption = false
          this.isMachineShow = false
        }
      },
      changeInsureName () {
        this.riskInsInputData.riskReportMainVo.insuredCode = ''
      },
      queryAddressByArchivesNo (archivesNo) {

        riskInsQueryAddress('/riskins/queryAddress', {archivesNo: archivesNo}).then((response) => {
          if (this.riskInsInputData.riskReportMainVo.insuredName === '') {
            this.riskInsInputData.riskReportMainVo.insuredName = response.insuredName
          }
          if (this.riskInsInputData.riskReportMainVo.addressProvinceCode === '') {
            this.riskInsInputData.riskReportMainVo.addressProvinceCode = response.addressProvinceCode
            this.riskInsInputData.riskReportMainVo.addressProvince = response.addressProvince
            this.addressVo.addressCityCode = response.addressCityCode
            this.addressVo.addressCity = response.addressCity
            this.addressVo.addressCountyCode = response.addressCountyCode
            this.addressVo.addressCounty = response.addressCounty
            this.riskInsInputData.riskReportMainVo.addressDetail = response.addressDetail
          }
        }, (response) => {
          // error callback
        })
      },
      queryAddressByRiskFileNo (lastRiskFileNo) {
        queryAddressByRiskFileNo({lastRiskFileNo: lastRiskFileNo}).then((response) => {
          this.riskInsInputData.riskReportMainVo.insuredType = response.insuredType
          setTimeout(() => {
            this.riskInsInputData.riskReportMainVo.insuredCode = response.insuredCode
            this.riskInsInputData.riskReportMainVo.insuredName = response.insuredName
          }, 100)
//          if (this.riskInsInputData.riskReportMainVo.insuredName === '') {
//            this.riskInsInputData.riskReportMainVo.insuredName = response.insuredName
//          }
//          if (this.riskInsInputData.riskReportMainVo.insuredCode === '') {
//            this.riskInsInputData.riskReportMainVo.insuredCode = response.insuredCode
//          }
//          if (response.insuredType === '1') {
//            this.riskInsInputData.riskReportMainVo.insuredType = response.insuredType
//          }
//          if (this.riskInsInputData.riskReportMainVo.addressProvinceCode === '') {
          this.riskInsInputData.riskReportMainVo.addressProvinceCode = response.addressProvinceCode
          this.riskInsInputData.riskReportMainVo.addressProvince = response.addressProvince
          this.addressVo.addressCityCode = response.addressCityCode
          this.addressVo.addressCity = response.addressCity
          this.addressVo.addressCountyCode = response.addressCountyCode
          this.addressVo.addressCounty = response.addressCounty
          this.riskInsInputData.riskReportMainVo.addressDetail = response.addressDetail
//          }
        }, (response) => {
          // error callback
        })
      },
      // 投保险种查询
      queryRiskCode (classCode) {
        this.riskCodeList = []
        riskCodeQuery({classCode: classCode}).then((response) => {
          this.riskInsInputData.riskCodeList = response.dataList
        }, (response) => {
          // error callback
        })
      },
      // 投保险类查询
      queryClassCode () {
        classCodeQuery('/riskins/classCodeQuery').then((response) => {
          this.riskInsInputData.classCodeList = response.dataList
          console.log(response.dataList)
          // this.riskInsInputData.classCodeList = response
        }, (response) => {
          // error callback
          console.log(response)
        })
      },
      CurrencyDialogClickOnRow (data) { // 接收数据
        if (this.DialogConfig.codeType === 'comCode') {
          this.riskInsInputData.riskReportMainVo.explorecomCode = data.col1
          this.riskInsInputData.riskReportMainVo.explorecomCodeCName = data.col2
        } else if (this.DialogConfig.codeType === 'UserCode') {
          this.riskInsInputData.riskReportMainVo.explorer = data.col1
          this.riskInsInputData.riskReportMainVo.explorerCName = data.col2
        } else if (this.DialogConfig.codeType === 'insuredCode') {
          this.riskInsInputData.riskReportMainVo.insuredCode = data.col1
          this.riskInsInputData.riskReportMainVo.insuredName = data.col2
          this.riskInsInputData.riskReportMainVo.identifyType = data.col3
          this.riskInsInputData.riskReportMainVo.identifyNumber = data.col4
//          this.riskInsInputData.riskReportMainVo.insuredType = data.col5
        } else if (this.DialogConfig.codeType === 'ArchivesNo') {
          this.riskInsInputData.riskReportMainVo.archivesNo = data.col1
          this.selectFlag = false
          this.queryAddressByArchivesNo(this.riskInsInputData.riskReportMainVo.archivesNo)
        } else if (this.DialogConfig.codeType === 'LastRiskFileNo') {
          this.riskInsInputData.riskReportMainVo.lastRiskFileNo = data.col1
          this.selectFlag = false
          this.queryAddressByRiskFileNo(this.riskInsInputData.riskReportMainVo.lastRiskFileNo)
        }
      },
      syncDialogShowFlag (val) { // 同步更新父子组件状态
        this.DialogConfig.dialogFlag = val
      },
      codeCodeDialog (val) {
        if (val === 'explorer') {
          if (this.riskInsInputData.riskReportMainVo.explorerCName === '') {
            this.$message.error('请录入查勘人代码或名称！')
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
            this.DialogConfig.keyWordDesc = '查勘机构'
            // 查询关键字
            this.DialogConfig.keyWord = this.riskInsInputData.riskReportMainVo.explorecomCodeCName
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
            this.DialogConfig.keyWord = this.riskInsInputData.riskReportMainVo.explorerCName
            // 接口地址
            this.DialogConfig.requestURL = '/common/codeselect/listCodeQuery'
            // 自定义table表头
            this.DialogConfig.columnTitles = [
              {title: '序号', key: 'index', type: 'index', width: 60, align: 'center'},
              {title: '查勘人代码', key: 'col1', align: 'center'},
              {title: '查勘人名称', key: 'col2', align: 'center'}
            ]
            break
          case 'archivesNo':
            // 是否取消滚动条
            this.DialogConfig.fixedHeader = true
            // 展示modal标志
            this.DialogConfig.dialogFlag = true
            // 业务类型
            this.DialogConfig.codeType = 'ArchivesNo'
            // 关键字描述
            this.DialogConfig.keyWordDesc = '照片档案号'
            this.DialogConfig.keyWordDescName = '被保险人名称'
            // 查询关键字
            this.DialogConfig.keyWord = this.riskInsInputData.riskReportMainVo.archivesNo
            this.DialogConfig.keyWordName = ''
            // 接口地址
            this.DialogConfig.requestURL = '/riskins/queryRiskReportSaleMain'
            // 自定义table表头
            this.DialogConfig.columnTitles = [
              { title: '序号', key: 'index', type: 'index', width: 60, align: 'center' },
              { title: '照片档案号', key: 'col1', align: 'center' },
              { title: '被保险人名称', key: 'col2', align: 'center' },
//              {title: '被保险人代码', key: 'col3', align: 'center'},
              { title: '查勘日期', key: 'col3', align: 'center' }
            ]
            break
          case 'lastRiskFileNo':
            // 是否取消滚动条
            this.DialogConfig.fixedHeader = true
            // 展示modal标志
            this.DialogConfig.dialogFlag = true
            // 业务类型
            this.DialogConfig.codeType = 'LastRiskFileNo'
            // 关键字描述
            this.DialogConfig.keyWordDesc = '初勘编号'
            this.DialogConfig.keyWordDescName = '被保险人名称'
            // 查询关键字
            this.DialogConfig.keyWord = this.riskInsInputData.riskReportMainVo.lastRiskFileNo
            this.DialogConfig.keyWordName = ''
            // 接口地址
            this.DialogConfig.requestURL = '/riskins/queryRiskMainByInsured'
            // 自定义table表头
            this.DialogConfig.columnTitles = [
              { title: '序号', key: 'index', type: 'index', width: 60, align: 'center' },
              { title: '初勘编号', key: 'col1', align: 'center' },
              { title: '被保险人名称', key: 'col2', align: 'center' },
              { title: '被保险人代码', key: 'col3', align: 'center' },
              { title: '报告类型', key: 'col4', align: 'center' },
              { title: '查勘日期', key: 'col5', align: 'center' }
            ]
            break
          case 'insuredCode':
            // 是否取消滚动条
            this.DialogConfig.fixedHeader = true
            // 展示modal标志
            this.DialogConfig.dialogFlag = true
            // 业务类型
            this.DialogConfig.codeType = 'insuredCode'
            // 关键字描述
            this.DialogConfig.keyWordDesc = '被保险人类型'
            this.DialogConfig.keyWordDescOne = '被保险人代码'
            this.DialogConfig.keyWordDescTwo = '被保险人名称'
            // 查询关键字
            this.DialogConfig.keyWord = this.riskInsInputData.riskReportMainVo.insuredType
            this.DialogConfig.keyWordOne = this.riskInsInputData.riskReportMainVo.insuredCode
            this.DialogConfig.keyWordTwo = this.riskInsInputData.riskReportMainVo.insuredName
            // 接口地址
            // this.DialogConfig.requestURL = '/intf/customer/customerModelQuery'
            // 自定义table表头
            this.DialogConfig.columnTitles = [
              {title: '被保险人代码', key: 'col1', align: 'center'},
              {title: '被保险人名称', key: 'col2', align: 'center'},
              {title: '证件类型', key: 'col3', align: 'center'},
              {title: '证件号码', key: 'col4', align: 'center'}
            ]
            break
          default:
            this.DialogConfig.dialogFlag = false
        }
      },
      // 切换被保险人类型，清空被保险人名称、代码
      insuredTypeClear () {
        this.riskInsInputData.riskReportMainVo.insuredName = ''
        this.riskInsInputData.riskReportMainVo.insuredCode = ''
        // if (this.insuredCodeT !== '' && this.insuredNameT !== '') {
        //   this.riskInsInputData.riskReportMainVo.insuredName = this.insuredNameT
        //   this.riskInsInputData.riskReportMainVo.insuredCode = this.insuredCodeT
        // }
      },
      /* 校验照片档案号 */
      checkArchivesNo () {
        let archivesNo = this.riskInsInputData.riskReportMainVo.archivesNo
        if (archivesNo === null || archivesNo === '') {
          return
        }
        // 1、组织查询条件
        let queryPar = {
          archivesNo: archivesNo,
          companyname: '',
          pageNo: 1,
          pageSize: 5
        }
        // 2、调用后台接口查询数据
        queryRiskReportSaleMain(queryPar, true).then((response) => {
          if (response.totalCount === 0) {
            this.riskInsInputData.riskReportMainVo.archivesNo = ''
            this.$message.error('照片档案号不存在或未办结！')
            return
          } else {
            this.selectFlag = false
            this.queryAddressByArchivesNo(this.riskInsInputData.riskReportMainVo.archivesNo)
          }
        })
      },
      /* 校验初勘编号 */
      checkLastRiskFileNo () {
        let lastRiskFileNo = this.riskInsInputData.riskReportMainVo.lastRiskFileNo
        if (lastRiskFileNo === null || lastRiskFileNo === '') {
          return
        }
        var checkLastFileNoFlag = true
        // 1、组织查询条件
        let queryPar = {
          riskFileNo: lastRiskFileNo,
          insureName: '',
          pageNo: 1,
          pageSize: 5
        }
        // 2、调用后台接口查询数据
        riskInsQueryRiskMainByInsured( queryPar).then((response) => {
          if (response.totalCount === 0) {
            this.riskInsInputData.riskReportMainVo.lastRiskFileNo = ''
            this.$message.error('风控编号不存在或核保未通过！')
            checkLastFileNoFlag = false
            return checkLastFileNoFlag
          } else {
            if (this.riskInsInputData.riskReportMainVo.lastRiskFileNo !== '') {
              this.selectFlag = false
              this.queryAddressByRiskFileNo(lastRiskFileNo)
              if (this.riskInsInputData.riskReportMainVo.riskModel !== '') {
                var riskModelFileNo = this.riskInsInputData.riskReportMainVo.lastRiskFileNo.substring(5, 8)
                if (this.riskInsInputData.riskReportMainVo.riskModel !== riskModelFileNo) {
                  this.$message.error('只能录入与报告模板相对应的初勘编号！')
                  this.riskInsInputData.riskReportMainVo.lastRiskFileNo = ''
                  checkLastFileNoFlag = false
                  return checkLastFileNoFlag
                }
                return checkLastFileNoFlag
              } else {
                this.$message.error('请录入与初勘编号相对应的报告模板！')
                checkLastFileNoFlag = false
                return checkLastFileNoFlag
              }
            }
            return checkLastFileNoFlag
          }
        })
      },
      // 被保险人校验
      insuredSearch () {
        var customerType = this.riskInsInputData.riskReportMainVo.insuredType
        var customerCode = this.riskInsInputData.riskReportMainVo.insuredCode
        var customerCName = this.riskInsInputData.riskReportMainVo.insuredName
//        if (customerCName !== '') {
//          customerCName = encodeURI(customerCName)
//        }
        if (customerType === '') {
          this.$message.error('请选择被保险人类型！')
          return
        } else {
          if (customerCName === '' && customerCode === '') {
            this.$message.error('请填写被保险人名称或者被保险人代码！')
            return
          }
        }
        // 解决get方式中文传参乱码
        // encodeURI两次：1次---编码得到的是UTF-8形式的URL
        // 2次---编码得到的依然是UTF-8形式的URL，但是在效果上相当于首先进行了一 次UTF-8编码(此时已经全部转换为ASCII字符)，再进行了一次iso-8859-1编码，因为对英文字符来说UTF-8编码和ISO- 8859-1编码的效果相同
        customerQuery({customerType: customerType, customerCode: customerCode, customerCName: customerCName}, true).then((response) => {
          if (response !== '') {
            if (response.returnDataCount === 1) {
              this.riskInsInputData.riskReportMainVo.insuredType = response.customerType
              this.riskInsInputData.riskReportMainVo.insuredName = response.customerCName
              this.riskInsInputData.riskReportMainVo.insuredCode = response.customerCode
            } else if (response.returnDataCount === '0') {
              this.$message.error('未查询到被保险人相关信息！')
            } else if (response.errorMessage && response.errorMessage !== null && response.errorMessage !== '') {
              this.$message.error(response.errorMessage)
            } else {
              this.codeCodeDialog('insuredCode')
            }
          } else {
            this.$message.error('被保险人信息错误！')
          }
        }, (response) => {
          this.$message.error('查询出错，请重试！')
          // error callback
        })
      },
      // 地址下拉框改变公共方法
//      changeAddress (id) {
//        if (id === 'addressCounty') {
//          this.riskInsInputData.addressCityList = ''
//          this.riskInsInputData.addressCountyList = ''
//        } else if (id === 'addressCity') {
//          this.riskInsInputData.addressCountyList = ''
//        }
//      },
      // 获取组合地址
      getAddress () {
        this.riskInsInputData.riskReportMainVo.address = this.riskInsInputData.riskReportMainVo.addressProvince + this.riskInsInputData.riskReportMainVo.addressCity + this.riskInsInputData.riskReportMainVo.addressCounty
      },
      // 获取省级地址
      getAddressProvinceList () {
        this.riskInsInputData.addressProvinceList = []
        queryRiskDaddress({upperCode: '', gradeFlag: '1'}).then((response) => {
          this.riskInsInputData.addressProvinceList = response.dataList
        }, (response) => {
          // error callback
        })
      },
      // 根据省查找市
      getAddressCityList (data) {
        this.selectFlag = true
        // 当省级地址为请选择时不跳转
        if (this.riskInsInputData.riskReportMainVo.addressProvinceCode === '' || this.riskInsInputData.riskReportMainVo.addressProvinceCode === null) {
          this.riskInsInputData.riskReportMainVo.addressProvince = ''
          this.riskInsInputData.riskReportMainVo.addressProvinceCode = ''
          this.riskInsInputData.riskReportMainVo.addressCity = ''
          this.riskInsInputData.riskReportMainVo.addressCityCode = ''
          this.riskInsInputData.addressCityList = []
          this.riskInsInputData.riskReportMainVo.addressCounty = ''
          this.riskInsInputData.riskReportMainVo.addressCountyCode = ''
          this.riskInsInputData.addressCountyList = []
          this.getAddress()
          return
        }
        if (data.label !== '') {
          this.riskInsInputData.riskReportMainVo.addressProvince = data.label
        }
        this.getAddress()
        this.riskInsInputData.addressCityList = []
        queryRiskDaddress('/riskins/queryRiskDaddress', {upperCode: this.riskInsInputData.riskReportMainVo.addressProvinceCode, gradeFlag: '2'}).then((response) => {
          this.riskInsInputData.addressCityList = response.dataList

          if (this.addressVo.addressCity !== '') {
            this.selectFlag = false
//            this.riskInsInputData.riskReportMainVo.addressCityCode = '370100'
            this.riskInsInputData.riskReportMainVo.addressCityCode = this.addressVo.addressCityCode
            this.riskInsInputData.riskReportMainVo.addressCity = this.addressVo.addressCity
            this.addressVo.addressCityCode = ''
            this.addressVo.addressCity = ''
          }
        }, (response) => {
          // error callback
        })
      },
      // 根据市找县（区）
      getAddressCountyList (data) {
        this.selectFlag = true
        // 当市级地址为请选择时不跳转
        if (this.riskInsInputData.riskReportMainVo.addressCityCode === '' || this.riskInsInputData.riskReportMainVo.addressCityCode === null) {
          this.riskInsInputData.riskReportMainVo.addressCity = ''
          this.riskInsInputData.riskReportMainVo.addressCityCode = ''
          this.riskInsInputData.riskReportMainVo.addressCounty = ''
          this.riskInsInputData.riskReportMainVo.addressCountyCode = ''
          this.riskInsInputData.addressCountyList = []
          this.getAddress()
          return
        }
        if (data.label !== '') {
          this.riskInsInputData.riskReportMainVo.addressCity = data.label
        }
        this.getAddress()
        this.riskInsInputData.addressCountyList = []
        queryRiskDaddress({upperCode: this.riskInsInputData.riskReportMainVo.addressCityCode, gradeFlag: '3'}).then((response) => {
          this.riskInsInputData.addressCountyList = response.dataList
          if (this.addressVo.addressCounty !== '') {
            this.selectFlag = false
            this.riskInsInputData.riskReportMainVo.addressCountyCode = this.addressVo.addressCountyCode
            this.riskInsInputData.riskReportMainVo.addressCounty = this.addressVo.addressCounty
            this.addressVo.addressCountyCode = ''
            this.addressVo.addressCounty = ''
          }
        }, (response) => {
          // error callback
        })
      },
      // 获取县级地址编号
      getAddressPostCode (data) {
        if (this.riskInsInputData.riskReportMainVo.addressCountyCode === '' || this.riskInsInputData.riskReportMainVo.addressCountyCode === null) {
          this.riskInsInputData.riskReportMainVo.addressCounty = ''
          this.riskInsInputData.riskReportMainVo.addressCountyCode = ''
          this.riskInsInputData.riskReportMainVo.postCode = ''
          this.getAddress()
          return
        }
        if (data.label !== '') {
          this.riskInsInputData.riskReportMainVo.addressCounty = data.label
        }
        this.getAddress()
        this.riskInsInputData.riskReportMainVo.postCode = this.riskInsInputData.riskReportMainVo.addressCountyCode
      },
      // 模态框 查勘机构 查勘人校验
      queryData (val) {
        var _self = this
        var fieldValue = ''
        var codeType = ''
        let userInfo = this.$store.getters.getUserInfo
//        var displayName = ''
        // 依据入参val区分双击域字段，组织关键字
        if (val === 'comCode') {
          fieldValue = _self.riskInsInputData.riskReportMainVo.explorecomCodeCName
          if (fieldValue === '' && fieldValue.trim() === '') {
            _self.riskInsInputData.riskReportMainVo.explorecomCode = ''
            return
          }
          codeType = 'CodeType_ComCode'
//          this.keyWordDesc = '查勘机构'
        } else if (val === 'explorer') {
          fieldValue = _self.riskInsInputData.riskReportMainVo.explorerCName
          if (fieldValue === '' && fieldValue.trim() === '') {
            _self.riskInsInputData.riskReportMainVo.explorer = ''
            return
          }
          codeType = 'UserCode' // UserCode
//          this.keyWordDesc = '查勘人'
        }
        if (codeType === 'UserCode') {
          listCodeQuery({userCode: userInfo.userCode, comCode: userInfo.comCode, riskCode: userInfo.riskCode, codeType: codeType, pageNo: 1, pageSize: 10, keyWord: fieldValue}).then((response) => {
            try {
              if (response.data !== null && response.data.result.length === 1) {
                _self.riskInsInputData.riskReportMainVo.explorerCName = response.data.result[0][1]
                _self.riskInsInputData.riskReportMainVo.explorer = response.data.result[0][0]
              } else if (response.data !== null && response.data.result.length > 1) {
                this.codeCodeDialog('explorer')
              } else {
                _self.riskInsInputData.riskReportMainVo.explorer = ''
                _self.riskInsInputData.riskReportMainVo.explorerCName = ''
                this.$message.error('此查勘人不存在')
                return
              }
            } catch (exception) {
              history.go(0)
            }
          }, (response) => {
            // error callback
          })
        } else if (codeType === 'CodeType_ComCode') {
          queryComCode({userCode: userInfo.userCode, pageNo: 1, pageSize: 5, keyWord: fieldValue}).then((response) => {
            try {
              if (response.dataList != null && response.dataList.length === 1) {
                _self.riskInsInputData.riskReportMainVo.explorecomCodeCName = response.dataList[0][1]
                _self.riskInsInputData.riskReportMainVo.explorecomCode = response.dataList[0][0]
              } else if (response.dataList != null && response.dataList.length > 1) {
                this.codeCodeDialog('comCode')
              } else {
                _self.riskInsInputData.riskReportMainVo.explorecomCode = ''
                _self.riskInsInputData.riskReportMainVo.explorecomCodeCName = ''
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
      // 隐藏项显示校验
      validateSpecialRequired () {
        var exploreType = this.riskInsInputData.riskReportMainVo.exploreType
        if (exploreType === '2') {
          if (this.riskInsInputData.riskReportMainVo.lastRiskFileNo.trim() === '') {
            this.$message.error('请输入初勘编号!')
            this.riskInsInputData.riskReportMainVo.lastRiskFileNo = ''
            return false
          } else {
            let riskModelFileNo = this.riskInsInputData.riskReportMainVo.lastRiskFileNo.substring(5, 8)
            if (this.riskInsInputData.riskReportMainVo.riskModel !== riskModelFileNo) {
              this.$message.error('只能录入与报告模板相对应的初勘编号！')
              this.riskInsInputData.riskReportMainVo.lastRiskFileNo = ''
//              checkLastFileNoFlag = false
              return false
            }
          }
        }
        return true
      },
      // 隐藏项隐藏状态数据清空
      clearHide () {
        if (this.riskInsInputData.riskReportMainVo.exploreType === '1') {
          // 隐藏域数据置空
          this.riskInsInputData.riskReportMainVo.lastRiskFileNo = ''
          this.riskInsInputData.riskReportMainVo.insuredType = '2'
//          this.riskInsInputData.riskReportMainVo.insuredName = ''
//          this.riskInsInputData.riskReportMainVo.insuredCode = ''
          this.riskInsInputData.riskReportMainVo.addressDetail = ''
        }
      },
      // 生成风控报告
      open () {
        this.$refs['riskReportMainVo'].validate((valid) => {
          if (this.riskInsInputData.riskReportMainVo.exploreDate === '' || this.riskInsInputData.riskReportMainVo.exploreDate === null) {
//          this.$message.error('查勘日期不能为空！')
            this.styles.ivuerro = true
            this.readFlag1 = true
            return
          }
          if (valid) {
//            this.clearHide()
            var flagT = this.validateSpecialRequired()
            if (!flagT) {
              return
            }
            this.loading = true
            // 校验被保险人信息
            var customerType = this.riskInsInputData.riskReportMainVo.insuredType
            var customerCode = this.riskInsInputData.riskReportMainVo.insuredCode
            var customerCName = this.riskInsInputData.riskReportMainVo.insuredName
//            if (customerCName !== '') {
//              customerCName = encodeURI(customerCName)
//            }
            if (customerCode === '') {
              this.$Modal.confirm({
                title: '新客户',
                content: '<p>该被保险人是否是新客户</p>',
                onOk: () => {
                  this.newOpen()
                },
                onCancel: () => {
                  this.loading = false
                  this.riskInsInputData.riskReportMainVo.insuredName = ''
                  this.riskInsInputData.riskReportMainVo.insuredCode = ''
                }
              })
            } else {
               customerQuery({
                customerType: customerType,
                customerCode: customerCode,
                customerCName: customerCName
              }).then((response) => {
                var insuredFlag = false
                if (response !== '') {
                  if (response.returnDataCount === 1) {
                    this.riskInsInputData.riskReportMainVo.insuredType = response.customerType
                    this.riskInsInputData.riskReportMainVo.insuredName = response.customerCName
                    this.riskInsInputData.riskReportMainVo.insuredCode = response.customerCode
                    insuredFlag = true
                  } else if (response.returnDataCount === 0) {
                    this.$Modal.confirm({
                      title: '新客户',
                      content: '<p>该被保险人是否是新客户</p>',
                      onOk: () => {
                        this.newOpen()
                      },
                      onCancel: () => {
                        this.loading = false
                        this.riskInsInputData.riskReportMainVo.insuredName = ''
                        this.riskInsInputData.riskReportMainVo.insuredCode = ''
                      }
                    })
                  } else {
                    this.loading = false
                    this.codeCodeDialog('insuredCode')
                  }
                } else {
                  this.loading = false
                  this.$message.error('被保险人信息错误！')
                }
                if (!insuredFlag) {
                  return
                }
                 saveRiskInsDetailInput(this.riskInsInputData).then((response) => {
                  const msg = this.$message.loading({
                    content: '查询中 请稍后',
                    duration: 0
                  })
                  setTimeout(msg, 3000)
                  var riskFileNo = response.riskFileNo
                  var riskModel = response.riskModel
                  var editModel = 'edit'
                  if (riskModel === '001') {
                    this.$router.push({
                      path: '/riskins_input',
                      query: {
                        riskFileNo: riskFileNo,
                        editModel: editModel,
                        riskModel: riskModel,
                        returnButtonState: false
                      }
                    })
                  } else if (riskModel === '002') {
                    this.$router.push({
                      path: '/riskins_pluralism',
                      query: {
                        riskFileNo: riskFileNo,
                        editModel: editModel,
                        riskModel: riskModel,
                        returnButtonState: false
                      }
                    })
                  } else if (riskModel === '004') {
                    this.$router.push({
                      path: '/riskins_machine',
                      query: {
                        riskFileNo: riskFileNo,
                        editModel: editModel,
                        riskModel: riskModel,
                        returnButtonState: false
                      }
                    })
                  } else if (riskModel === '005') {
                    this.$router.push({
                      path: '/riskins_clobusiness',
                      query: {
                        riskFileNo: riskFileNo,
                        editModel: editModel,
                        riskModel: riskModel,
                        returnButtonState: false
                      }
                    })
                  } else if (riskModel === '006') {
                    this.$router.push({
                      path: '/riskins_firePro',
                      query: {
                        riskFileNo: riskFileNo,
                        editModel: editModel,
                        riskModel: riskModel,
                        returnButtonState: false
                      }
                    })
                  } else if (riskModel === '007') {
                    this.$router.push({
                      path: '/riskins_firePlu',
                      query: {
                        riskFileNo: riskFileNo,
                        editModel: editModel,
                        riskModel: riskModel,
                        returnButtonState: false
                      }
                    })
                  }
                }, (response) => {
                  this.loading = false
                  // error callback
                })
              }, (response) => {
                this.loading = false
                // error callback
              })
            }
          }
        })
      },
      // 选择是新客户，则newInsuredFlag赋值为A,insuredCode清空
      newOpen () {
        // 选择是新客户，则newInsuredFlag赋值为A,insuredCode清空
        this.riskInsInputData.riskReportMainVo.newInsuredFlag = 'A'
        this.riskInsInputData.riskReportMainVo.insuredCode = ''
        saveRiskInsDetailInput(this.riskInsInputData).then((response) => {
          const msg = this.$message.loading({
            content: '查询中 请稍后',
            duration: 0
          })
          setTimeout(msg, 3000)
          var riskFileNo = response.riskFileNo
          var riskModel = response.riskModel
          var editModel = 'edit'
          if (riskModel === '001') {
            this.$router.push({path: '/riskins_input',
              query: {
                riskFileNo: riskFileNo,
                editModel: editModel,
                riskModel: riskModel,
                returnButtonState: false
              }
            })
          } else if (riskModel === '002') {
            this.$router.push({path: '/riskins_pluralism',
              query: {
                riskFileNo: riskFileNo,
                editModel: editModel,
                riskModel: riskModel,
                returnButtonState: false
              }
            })
          } else if (riskModel === '004') {
            this.$router.push({
              path: '/riskins_machine',
              query: {
                riskFileNo: riskFileNo,
                editModel: editModel,
                riskModel: riskModel,
                returnButtonState: false
              }
            })
          } else if (riskModel === '005') {
            this.$router.push({
              path: '/riskins_clobusiness',
              query: {
                riskFileNo: riskFileNo,
                editModel: editModel,
                riskModel: riskModel,
                returnButtonState: false
              }
            })
          } else if (riskModel === '006') {
            this.$router.push({
              path: '/riskins_firePro',
              query: {
                riskFileNo: riskFileNo,
                editModel: editModel,
                riskModel: riskModel,
                returnButtonState: false
              }
            })
          } else if (riskModel === '007') {
            this.$router.push({
              path: '/riskins_firePlu',
              query: {
                riskFileNo: riskFileNo,
                editModel: editModel,
                riskModel: riskModel,
                returnButtonState: false
              }
            })
          }
        }, (response) => {
          // error callback
        })
      },
      checkDate (val, valType) {
        if (val !== '') {
          this.readFlag = false
          this.readFlag1 = false
          this.styles.ivuerro = false
        } else {
          this.styles.ivuerro = true
          return
        }
      },
      closeDate () {
        this.readFlag = true
        this.readFlag1 = true
      }
    }

  }
</script>
<style lang="scss" scoped>
/*<style lang="scss" rel="stylesheet/less">*/
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
  .result-wrapper{
    .btnbox{
      margin: 16px 0;
    }
  }
</style>
