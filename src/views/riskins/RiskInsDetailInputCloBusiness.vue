<template>
  <!--营业中断险专用风控模板-->
  <div>
    <el-card class="ivu-card-height tabcard" style="padding: 0" :class="{'ivu-card-out': outerSystemFlag}">
      <div>
        <div class="updown">
          <HeadButtonCommon :risk-file-title="riskFileTitle" :business-type="editModel"
                            :edit-button-state="editButtonState" :back-button-state="backButtonState"
                            :return-button-state="returnButtonState" :reviewed-button-state="reviewedButtonState"
                            :outer-system-flag="outerSystemFlag" :import-flag="importFlag"
                            @button-event="HeadButtonEvent"></HeadButtonCommon>
        </div>
        <article>
          <el-col style="padding: 0px 10px 0px">
          <el-form ref="riskInsInputData" :model="riskInsInputData" label-width="140px">
            <el-row>
              <el-tabs v-model="currnetTabPanel" :animated=true>
                <el-tab-pane label="基本信息" icon="document-text" style="max-height: calc(100vh - 229px);overflow-y: auto;"
                         name="name1"><!--style="height: 350px;"-->
                  <el-form ref="riskReportMainVoA" :model="riskInsInputData.riskReportMainVo" label-width="140px" :rules="ruleValidate1"
                        >
                    <el-col :span="24">
                    <el-col :span="8">
                    <el-form-item label="报告编号" prop="riskFileNo"><!--style="width: 100%"-->
                      <el-input type="text" v-model="riskInsInputData.riskReportMainVo.riskFileNo" disabled></el-input>
                    </el-form-item>
                    </el-col>
                    <el-col :span="8">
                    <el-form-item label="投保险类" prop="classCode">
                      <el-input type="text" v-model="riskInsInputData.riskReportMainVo.classCName" disabled></el-input>
                    </el-form-item>
                    </el-col>
                    <el-col :span="8">
                    <el-form-item label="投保险种" prop="riskCode">
                      <el-input type="text" v-model="riskInsInputData.riskReportMainVo.riskCName" disabled></el-input>
                    </el-form-item>
                    </el-col>
                    </el-col>

                    <el-col :span="24">
                    <el-col :span="8">
                    <el-form-item label="查勘人" prop="explorerCName">
                      <el-input type="text" v-model="riskInsInputData.riskReportMainVo.explorerCName" disabled></el-input>
                    </el-form-item>
                    </el-col>
                    <el-col :span="8">
                    <el-form-item label="录入人员" prop="operator">
                      <el-input type="text" v-model="riskInsInputData.riskReportMainVo.operator" disabled></el-input>
                    </el-form-item>
                    </el-col>
                    <el-col :span="8">
                    <el-form-item label="查勘机构" prop="explorecomCodeCName"><!--style="width: 100%"-->
                      <el-input v-model="riskInsInputData.riskReportMainVo.explorecomCodeCName" disabled></el-input>
                    </el-form-item>
                    </el-col>
                    </el-col>
                    <el-col :span="24">
                    <el-col :span="8">
                    <el-form-item label="查勘日期" prop="exploreDate">
                      <el-date-picker type="date" v-model="riskInsInputData.riskReportMainVo.exploreDate"
                                  placeholder="请输入时间..." style="width: 100%" disabled></el-date-picker>
                    </el-form-item>
                    </el-col>
                    <el-col :span="8">
                    <el-form-item label="查勘类别" prop="exploreType">
                      <el-select type="text" v-model="riskInsInputData.riskReportMainVo.exploreType" disabled filterable>
                        <el-option value="1" label="初勘"></el-option>
                        <el-option value="2" label="复勘"></el-option>
                      </el-select>
                    </el-form-item>
                    </el-col>
                    <el-col :span="8" v-if="riskInsInputData.riskReportMainVo.exploreType === '2'">
                    <el-form-item label="初勘编号" prop="lastRiskFileNo">
                      <el-input type="text" v-model="riskInsInputData.riskReportMainVo.lastRiskFileNo" disabled></el-input>
                    </el-form-item>
                    </el-col>
                    </el-col>
                    <el-col :span="24">
                    <el-col :span="8">
                    <el-form-item label="报告模板" prop="riskModel">
                      <el-select type="text" v-model="riskInsInputData.riskReportMainVo.riskModel" disabled filterable>
                        <el-option value="001" label="2017版财产险专用风控模板（核保专用专职版）"></el-option>
                        <el-option value="002" label="2017版财产险专用风控模板（核保专用兼职版）"></el-option>
                        <el-option value="004" label="机器损坏险专用风控模板"></el-option>
                        <el-option value="005" label="营业中断险专用风控模板"></el-option>
                      </el-select>
                    </el-form-item>
                    </el-col>
                    <el-col :span="8">
                    </el-col>
                    </el-col>
                    <el-col :span="24">
                    <el-col :span="8">
                    <el-form-item label="被保险人类型" prop="insuredType">
                      <el-select v-model="riskInsInputData.riskReportMainVo.insuredType" disabled filterable>
                        <el-option value="1" label="个人"></el-option>
                        <el-option value="2" label="团体"></el-option>
                      </el-select>
                    </el-form-item>
                    </el-col>
                    <el-col :span="8">
                    <el-col :span="22">
                    <el-form-item label="被保险人名称" prop="insuredName">
                      <el-input type="text" v-model="riskInsInputData.riskReportMainVo.insuredName" disabled></el-input>
                    </el-form-item>
                    </el-col>
                    <!--<el-col :span="1">-->
                    <!--<Icon v-if="!showUpload('1.1')" type="ios-camera-outline" class="cameraicon"-->
                          <!--@click.native="buttonCommonEvent('1.1')" aria-readonly="true"></Icon>-->
                    <!--<Icon v-if="showUpload('1.1')" type="ios-camera" class="cameraicon"-->
                          <!--@click.native="buttonCommonEvent('1.1')" aria-readonly="true"></Icon>-->
                    <!--</el-col>-->
                    </el-col>
                    <el-col :span="8">
                    <el-col :span="21">
                    <el-form-item label="被保险人代码" prop="insuredCode">
                      <el-input type="text" v-model="riskInsInputData.riskReportMainVo.insuredCode" disabled></el-input>
                    </el-form-item>
                    </el-col>
                    </el-col>
                    </el-col>
                    <el-col :span="24">
                    <el-col :span="23">
                    <el-form-item label="查勘地址" prop="addressDetail">
                      <el-input type="text" v-model="riskInsInputData.riskReportMainVo.addressDetail" style="width: 100%"
                             disabled></el-input>
                    </el-form-item>
                    </el-col>
                    <el-col :span="1" style="padding-left: 10px;">
                    <Icon type="ios-location" class="cameraicon" @click.native="queryAddressDetail"></Icon>
                    </el-col>
                    <!--<el-col :span="1" style="padding-left: 10px" v-if="browseFlag">-->
                    <!--<Icon type="ios-location" class="cameraicon"></Icon>-->
                    <!--</el-col>-->
                    </el-col>
                    <el-col :span="24">
                    <el-col :span="8">
                    <el-form-item label="被保险人性质" prop="unitNature">
                      <el-select v-model="riskInsInputData.riskReportMainVo.unitNature" filterable :disabled=browseFlag>
                        <el-option value="1" label="行政事业单位及人民团体"></el-option>
                        <el-option value="2" label="国有企业"></el-option>
                        <el-option value="3" label="民营企业"></el-option>
                        <el-option value="4" label="外商投资企业（除台资）"></el-option>
                        <el-option value="5" label="台资企业"></el-option>
                      </el-select>
                    </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="国民经济代码" prop="businessSourceCName"><!--:style="{marginTop:margin}"-->
                        <el-input type="text" v-model="riskInsInputData.riskReportMainVo.businessSourceCName"
                               placeholder="请点击..." @on-enter="codeCodeDialog('TradeCode')" @on-blur="queryData" style="width: 100%" :disabled=browseFlag>
                        <Button slot="append" icon="ios-search" @click="codeCodeDialog('TradeCode');"
                                :disabled=browseFlag></Button>
                        </el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                    <el-col :span="22">
                    <el-form-item label="行业分类代码" prop="businessClass">
                      <el-input type="text" v-model="riskInsInputData.riskReportMainVo.businessClass" style="width: 100%"
                             disabled></el-input>
                    </el-form-item>
                    </el-col>
                    </el-col>
                    </el-col>
                    <el-col :span="24">
                    <el-col :span="8">
                    <el-col :span="22">
                    <el-form-item label="以往承保情况" prop="underwriteStatus">
                      <el-select type="text" v-model="riskInsInputData.riskReportMainVo.underwriteStatus" filterable
                              :disabled=browseFlag>
                        <el-option value="1" label="客户首次投保"></el-option>
                        <el-option value="2" label="续保"></el-option>
                        <el-option value="3" label="由其他公司转保"></el-option>
                      </el-select>
                    </el-form-item>
                    </el-col>
                    </el-col>
                    <el-col :span="8">
                    <el-form-item label="总保险金额" prop="sumAmount">
                      <el-input type="text" v-model="riskInsInputData.riskReportMainVo.sumAmount" placeholder=""
                             style="width: 100%" :disabled=browseFlag>
                      <span slot="append">万元</span>
                      </el-input>
                    </el-form-item>
                    </el-col>
                    </el-col>
                  </el-form>
                  <el-form ref="riskReportCloBusinessListA" :model="riskInsInputData.riskReportCloBusinessList[0]"
                          label-width="140px" :rules="ruleValidate4">
                    <el-col :span="24">
                    <el-col :span="8">
                    <el-form-item label="营业利润" prop="operatProfit">
                      <el-input type="text" v-model="riskInsInputData.riskReportCloBusinessList[0].operatProfit"
                             placeholder="" style="width: 100%" :disabled=browseFlag>
                      <span slot="append">万元</span>
                      </el-input>
                    </el-form-item>
                    </el-col>
                    <el-col :span="8">
                    <el-form-item label="约定维持费用" prop="convenCost">
                      <el-input type="text" v-model="riskInsInputData.riskReportCloBusinessList[0].convenCost"
                             placeholder="" style="width: 100%" :disabled=browseFlag>
                      <span slot="append">万元</span>
                      </el-input>
                    </el-form-item>
                    </el-col>
                    <el-col :span="8">
                    <el-form-item label="审计师费用" prop="auditorFee">
                      <el-input type="text" v-model="riskInsInputData.riskReportCloBusinessList[0].auditorFee"
                             placeholder="" style="width: 100%" :disabled=browseFlag>
                      <span slot="append">万元</span>
                      </el-input>
                    </el-form-item>
                    </el-col>
                    </el-col>
                    <el-col :span="24">
                    <el-col :span="8" v-if="(riskInsInputData.riskReportCloBusinessList[0].convenCost !== '' && riskInsInputData.riskReportCloBusinessList[0].convenCost !== null)">
                    <el-form-item label="维持费用是否列明项目及金额" prop="itemsAmountFlag">
                      <el-select v-model="riskInsInputData.riskReportCloBusinessList[0].itemsAmountFlag" :disabled=browseFlag @on-change="changeItem()"
                              filterable>
                        <el-option value="A" label="列明"></el-option>
                        <el-option value="B" label="不详"></el-option>
                      </el-select>
                    </el-form-item>
                    </el-col>
                    <el-col :span="8">
                    <el-form-item label="是否列明保额确定方式及依据" prop="certainWayFlag">
                      <el-select v-model="riskInsInputData.riskReportCloBusinessList[0].certainWayFlag" :disabled=browseFlag @on-change="changeCentain()"
                              filterable>
                        <el-option value="A" label="列明"></el-option>
                        <el-option value="B" label="不详"></el-option>
                      </el-select>
                    </el-form-item>
                    </el-col>
                    </el-col>

                    <el-col :span="24" v-if="riskInsInputData.riskReportCloBusinessList[0].itemsAmountFlag === 'A'">
                      <el-form-item label="项目及金额" prop="itemsAmount" label-width="150px">
                        <el-input type="textarea" v-model="riskInsInputData.riskReportCloBusinessList[0].itemsAmount" placeholder="请输入...."
                               style="width: 100%" :disabled=browseFlag></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="24" v-if="riskInsInputData.riskReportCloBusinessList[0].certainWayFlag === 'A'">
                      <el-form-item label="保额确定方式及依据" prop="certainWay" label-width="150px">
                        <el-input type="textarea" v-model="riskInsInputData.riskReportCloBusinessList[0].certainWay"
                               style="width: 100%" :disabled=browseFlag placeholder="请输入...."></el-input>
                      </el-form-item>
                    </el-col>

                    <el-col :span="24">
                      <el-form-item label="三年营利和维持费用情况" prop="maintainCost" label-width="150px">
                        <el-input type="textarea" v-model="riskInsInputData.riskReportCloBusinessList[0].maintainCost" placeholder="请输入...."
                               style="width: 100%" :disabled=browseFlag></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="24">
                      <el-col :span="8">
                      <el-form-item label="最大赔偿期" prop="maxPayoutDate">
                        <el-input type="text" v-model="riskInsInputData.riskReportCloBusinessList[0].maxPayoutDate"
                               placeholder="" style="width: 100%" :disabled=browseFlag></el-input>
                      </el-form-item>
                      </el-col>
                      <el-col :span="8">
                      <el-form-item label="免赔期" prop="franchiseDate">
                        <el-input type="text" v-model="riskInsInputData.riskReportCloBusinessList[0].franchiseDate"
                               placeholder="" style="width: 100%" :disabled=browseFlag></el-input>
                      </el-form-item>
                      </el-col>
                      <el-col :span="8">
                      <el-form-item label="保险合同主险条款" prop="mainClause">
                        <el-select v-model="riskInsInputData.riskReportCloBusinessList[0].mainClause" :disabled=browseFlag filterable>
                          <el-option value="A" label="财产综合险/一切险"></el-option>
                          <el-option value="B" label="财产基本险"></el-option>
                          <el-option value="C" label="机器损坏险"></el-option>
                        </el-select>
                      </el-form-item>
                      </el-col>
                    </el-col>
                    <el-col :span="24">
                      <el-col :span="8">
                      <el-form-item label="是否属于限制或禁止承保范围" prop="noCoverage">
                        <el-select v-model="riskInsInputData.riskReportCloBusinessList[0].noCoverage" :disabled=browseFlag filterable>
                          <el-option value="A" label="是"></el-option>
                          <el-option value="B" label="否"></el-option>
                        </el-select>
                      </el-form-item>
                      </el-col>
                      <el-col :span="8">
                      <el-form-item label="近三年营业中断赔付记录" prop="paymentRecords">
                        <el-select v-model="riskInsInputData.riskReportCloBusinessList[0].paymentRecords" :disabled=browseFlag
                                filterable>
                          <el-option value="A" label="有"></el-option>
                          <el-option value="B" label="无"></el-option>
                        </el-select>
                      </el-form-item>
                      </el-col>
                    </el-col>
                  </el-form>
                </el-tab-pane>
                <el-tab-pane label="风险评估" icon="person"
                         style="max-height: calc(100vh - 229px);overflow-y: auto;padding: 15px;" name="name2">
                  <el-form ref="riskReportCloBusinessListB" :model="riskInsInputData.riskReportCloBusinessList[0]"
                        label-width="140px" :rules="ruleValidate2">
                    <el-col :span="24">
                      <div class="title">
                        <Icon type="search"></Icon>
                        生产运营风险：
                      </div>
                    </el-col>
                    <el-col :span="24">
                      <el-col :span="8">
                        <el-form-item label="是否有完整财务记录及会计账册" prop="finaRecords">
                          <el-select v-model="riskInsInputData.riskReportCloBusinessList[0].finaRecords" :disabled=browseFlag filterable>
                            <el-option value="A" label="有"></el-option>
                            <el-option value="B" label="无"></el-option>
                          </el-select>
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                      <el-form-item label="会计资料是否存放良好且有备份" prop="accountData">
                        <el-select v-model="riskInsInputData.riskReportCloBusinessList[0].accountData" :disabled=browseFlag filterable>
                          <el-option value="A" label="是"></el-option>
                          <el-option value="B" label="否"></el-option>
                        </el-select>
                      </el-form-item>
                      </el-col>
                      <el-col :span="8">
                      <el-form-item label="生产线类型" prop="proLineType">
                        <el-select v-model="riskInsInputData.riskReportCloBusinessList[0].proLineType" :disabled=browseFlag filterable>
                          <el-option value="A" label="单一"></el-option>
                          <el-option value="B" label="多样但集中"></el-option>
                          <el-option value="C" label="多样且独立"></el-option>
                        </el-select>
                      </el-form-item>
                      </el-col>
                    </el-col>

                    <el-col :span="24">
                      <el-col :span="8">
                      <el-form-item label="是否有关键设备" prop="keyEquipFlag">
                        <el-select v-model="riskInsInputData.riskReportCloBusinessList[0].keyEquipFlag" :disabled=browseFlag filterable>
                          <el-option value="A" label="有"></el-option>
                          <el-option value="B" label="无"></el-option>
                        </el-select>
                      </el-form-item>
                      </el-col>
                      <el-col :span="8">
                      <el-tooltip content="对正常生产有重大影响的设备" style="white-space: normal;">
                        <el-form-item label="关键设备名称" prop="keyEquip">
                          <el-input type="text" v-model="riskInsInputData.riskReportCloBusinessList[0].keyEquip" placeholder=""
                                 style="width: 100%" :disabled=browseFlag></el-input>
                        </el-form-item>
                      </el-tooltip>
                      </el-col>
                      <el-col :span="8">
                      <el-form-item label="设备类型" prop="equipType">
                        <el-select v-model="riskInsInputData.riskReportCloBusinessList[0].equipType" :disabled=browseFlag filterable>
                          <el-option value="A" label="标准"></el-option>
                          <el-option value="B" label="定制"></el-option>
                        </el-select>
                      </el-form-item>
                      </el-col>
                    </el-col>

                    <el-col :span="24">
                      <el-col :span="8">
                        <el-form-item label="是否有备件" prop="spareParts">
                          <el-select v-model="riskInsInputData.riskReportCloBusinessList[0].spareParts" :disabled=browseFlag filterable>
                            <el-option value="A" label="有"></el-option>
                            <el-option value="B" label="无"></el-option>
                          </el-select>
                        </el-form-item>
                      </el-col>
                    </el-col>

                    <el-col :span="24">
                      <el-col :span="8">
                        <el-form-item label="制造商" prop="manufacturer">
                          <el-select v-model="riskInsInputData.riskReportCloBusinessList[0].manufacturer" :disabled=browseFlag filterable>
                            <el-option value="A" label="国内"></el-option>
                            <el-option value="B" label="国外"></el-option>
                          </el-select>
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item label="维修商" prop="repairman">
                          <el-select v-model="riskInsInputData.riskReportCloBusinessList[0].repairman" :disabled=browseFlag filterable>
                            <el-option value="A" label="国内"></el-option>
                            <el-option value="B" label="国外"></el-option>
                          </el-select>
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item label="设备供应商数量" prop="supplierNum">
                          <el-select v-model="riskInsInputData.riskReportCloBusinessList[0].supplierNum" :disabled=browseFlag filterable>
                            <el-option value="A" label="单一"></el-option>
                            <el-option value="B" label="非单一"></el-option>
                          </el-select>
                        </el-form-item>
                      </el-col>
                    </el-col>

                    <el-col :span="24">
                      <el-col :span="8">
                        <el-form-item label="供应商供货维修水平" prop="supplierLevel">
                          <el-select v-model="riskInsInputData.riskReportCloBusinessList[0].supplierLevel" :disabled=browseFlag filterable>
                            <el-option value="A" label="良好"></el-option>
                            <el-option value="B" label="较差"></el-option>
                          </el-select>
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item label="关键设备预计最长恢复时间" prop="maxRecovTime">
                          <el-input type="text" v-model="riskInsInputData.riskReportCloBusinessList[0].maxRecovTime"
                                 placeholder="" style="width: 100%" :disabled=browseFlag></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item label="是否有产品及市场情况" prop="marketSitu">
                          <el-select v-model="riskInsInputData.riskReportCloBusinessList[0].marketSitu" :disabled=browseFlag filterable>
                            <el-option value="A" label="有"></el-option>
                            <el-option value="B" label="无"></el-option>
                          </el-select>
                        </el-form-item>
                      </el-col>
                    </el-col>

                    <el-col :span="24" v-if="riskInsInputData.riskReportCloBusinessList[0].marketSitu == 'A'">
                      <el-col :span="8">
                        <el-form-item label="库存能保证供货时间" prop="sureTime">
                          <el-input type="text" v-model="riskInsInputData.riskReportCloBusinessList[0].sureTime" placeholder=""
                                 style="width: 100%" :disabled=browseFlag>
                          <span slot="append">个月</span>
                          </el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item label="产品销售是否存在季节性" prop="seasonal">
                          <el-select v-model="riskInsInputData.riskReportCloBusinessList[0].seasonal" :disabled=browseFlag filterable>
                            <el-option value="A" label="是"></el-option>
                            <el-option value="B" label="否"></el-option>
                          </el-select>
                        </el-form-item>
                      </el-col>
                    </el-col>
                    <el-col :span="24" v-if="riskInsInputData.riskReportCloBusinessList[0].seasonal == 'A'">
                      <el-col :span="8">
                        <el-form-item label="销售旺季起期" prop="seasonStart">
                          <el-input type="text" v-model="riskInsInputData.riskReportCloBusinessList[0].seasonStart"
                                 placeholder="" style="width: 100%" :disabled=browseFlag>
                          <span slot="append">月</span>
                          </el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item label="销售旺季止期" prop="seasonEnd">
                          <el-input type="text" v-model="riskInsInputData.riskReportCloBusinessList[0].seasonEnd" placeholder=""
                                 style="width: 100%" :disabled=browseFlag>
                          <span slot="append">月</span>
                          </el-input>
                        </el-form-item>
                      </el-col>
                    </el-col>
                    <el-col :span="24">
                      <el-col :span="8" v-if="riskInsInputData.riskReportCloBusinessList[0].marketSitu == 'A'">
                        <el-form-item label="被保险人产品竞争力" prop="competition">
                          <el-select v-model="riskInsInputData.riskReportCloBusinessList[0].competition" :disabled=browseFlag filterable>
                            <el-option value="A" label="较强"></el-option>
                            <el-option value="B" label="一般"></el-option>
                            <el-option value="C" label="较差"></el-option>
                          </el-select>
                        </el-form-item>
                      </el-col>
                      <el-col :span="8" v-if="riskInsInputData.riskReportCloBusinessList[0].marketSitu == 'A'">
                        <el-form-item label="被保险人所处行业情况" prop="boomCondition">
                          <el-select v-model="riskInsInputData.riskReportCloBusinessList[0].boomCondition" :disabled=browseFlag filterable>
                            <el-option value="A" label="景气"></el-option>
                            <el-option value="B" label="一般"></el-option>
                            <el-option value="C" label="不景气"></el-option>
                          </el-select>
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item label="是否建立有效应急预案" prop="concyPlan">
                          <el-select v-model="riskInsInputData.riskReportCloBusinessList[0].concyPlan" :disabled=browseFlag filterable>
                            <el-option value="A" label="是"></el-option>
                            <el-option value="B" label="否"></el-option>
                          </el-select>
                        </el-form-item>
                      </el-col>
                    </el-col>
                    <el-col :span="24">
                      <div class="title">
                        <Icon type="search"></Icon>
                        扩展风险：
                      </div>
                    </el-col>
                    <el-col :span="24">
                      <el-col :span="8">
                        <el-form-item label="扩展类附加险" prop="additionRisk">
                          <el-input type="text" v-model="riskInsInputData.riskReportCloBusinessList[0].additionRisk"
                                 placeholder="" style="width: 100%" :disabled=browseFlag>
                          <span slot="append">个</span>
                          </el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                      <!--<el-tooltip  max-width="30" content="CBI包括附加通道堵塞条款/附加公共事业设备条款/附加供应商条款/附加购买商条款/公共设备供应中断条款" style="white-space: normal;">-->

                        <el-tooltip placement="top">
                        <el-form-item label="属于CBI范围条款" prop="scopItem">
                          <el-input type="text" v-model="riskInsInputData.riskReportCloBusinessList[0].scopItem" placeholder=""
                                 style="width: 100%" :disabled=browseFlag>
                          <span slot="append">个</span>
                          </el-input>
                        </el-form-item>
                          <div slot="content">
                            <p slot="content" style="white-space: normal;">CBI包括附加通道堵塞条款/附加公共事业设备条款/附加供应商条款/附加购买商条款/公共设备供应中断条款</p>
                          </div>
                      </el-tooltip>
                      </el-col>
                    </el-col>
                  </el-form>
                </el-tab-pane>

                <el-tab-pane label="风险综合评价" icon="person"
                         style="max-height: calc(100vh - 229px);overflow-y: auto;padding: 15px;" name="name3">
                  <el-form ref="riskReportCloBusinessListC" :model="riskInsInputData.riskReportCloBusinessList[0]"
                        label-width="140px" :rules="ruleValidate3">
                    <el-col :span="24">
                      <div class="title">
                    <Icon type="search"></Icon>
                    风险评估：
                  </div>
                    </el-col>
                    <el-col :span="24">
                    <el-col :span="8">
                    <el-form-item label="预计最长恢复时间" prop="maxBusiTime">
                      <el-input type="text" v-model="riskInsInputData.riskReportCloBusinessList[0].maxBusiTime"
                             placeholder="" style="width: 100%" :disabled=browseFlag></el-input>
                    </el-form-item>
                    </el-col>
                    <el-col :span="8">
                    <el-form-item label="预计最大可能损失" prop="maxLoss">
                      <el-input type="text" v-model="riskInsInputData.riskReportCloBusinessList[0].maxLoss" placeholder=""
                             style="width: 100%" :disabled=browseFlag></el-input>
                    </el-form-item>
                    </el-col>
                    </el-col>
                  </el-form>
                  <el-form ref="riskReportMainVoB" :model="riskInsInputData.riskReportMainVo"
                        label-width="140px" :rules="ruleValidate32">
                    <el-col :span="24">
                    <el-col :span="8">
                    <el-form-item label="风险评估等级" prop="valuation">
                      <el-select v-model="riskInsInputData.riskReportMainVo.valuation" :disabled=browseFlag filterable>
                        <el-option value="A" label="严重"></el-option>
                        <el-option value="B" label="较严重"></el-option>
                        <el-option value="C" label="适度"></el-option>
                        <el-option value="D" label="适度偏下"></el-option>
                        <el-option value="E" label="轻微"></el-option>
                      </el-select>
                    </el-form-item>
                    </el-col>
                    </el-col>
                    <el-col :span="24">
                      <div class="title">
                        <Icon type="search"></Icon>
                        风险隐患说明：
                      </div>
                    </el-col>
                    <el-col :span="24">
                    <el-form-item label="风险隐患说明" prop="supplementAppraisal">
                      <el-input type="text" v-model="riskInsInputData.riskReportMainVo.supplementAppraisal"
                             style="width: 100%" :disabled=browseFlag></el-input>
                    </el-form-item>
                    </el-col>
                    <el-col :span="24">
                    <div class="title">
                      <Icon type="search"></Icon>
                      防灾防损建议：
                    </div>
                    </el-col>
                    <el-col :span="24">
                    <el-form-item label="防灾防损建议" prop="addMessage">
                      <el-input type="text" v-model="riskInsInputData.riskReportMainVo.addMessage" style="width: 100%"
                             :disabled=browseFlag></el-input>
                    </el-form-item>
                    </el-col>
                    <el-col :span="24">
                      <div class="title">
                        <Icon type="search"></Icon>
                        承保建议：
                      </div>
                    </el-col>
                    <el-col :span="24">
                    <el-form-item label="风控建议" prop="riskSuggest">
                      <template>
                        <el-radio-group v-model="riskInsInputData.riskReportMainVo.riskSuggest">
                          <el-radio label="A" :disabled=browseFlag>谨慎承保</el-radio>
                          <el-radio label="B" :disabled=browseFlag>提高条件承保</el-radio>
                          <el-radio label="C" :disabled=browseFlag>竞争性承保</el-radio>
                        </el-radio-group>
                      </template>
                    </el-form-item>
                    </el-col>
                    <el-col :span="24">
                    <el-form-item label="其他意见" prop="othSuggest">
                      <el-input type="text" v-model="riskInsInputData.riskReportMainVo.othSuggest" style="width: 100%"
                             :disabled=browseFlag></el-input>
                    </el-form-item>
                    </el-col>
                  </el-form>
                </el-tab-pane>
              </el-tabs>
            </el-row>
          </el-form>
          </el-col>
        </article>
        <Spin size="large" fix v-if="spinShow"></Spin>
      </div>
    </el-card>
    <CurrencyDialog :dialog-config="DialogConfig" @sync-dialog-show-flag="syncDialogShowFlag"
                    @click-on-row="CurrencyDialogClickOnRow">
    </CurrencyDialog>
    <el-dialog class="mapcompontent" :visible.sync="mapFlag" width="100%" height="100%" :mask-closable="false">
      <br/>
      <div>
        <MapCompontent v-if="mapFlag" @transfer="transfer" :config="mapCompontent"></MapCompontent>
      </div>
      <div slot="footer">
      </div>
    </el-dialog>
    <el-dialog :visible.sync="reviewedFlag">
      <el-form ref="riskReportMainVoE" :model="riskInsInputData.riskReportMainVo" :rules="ruleValidate20">
        <el-form-item label="请选择：" label-width="100px" prop="ff">
          <el-select type="text" @on-change="disposal()" v-model="riskInsInputData.riskReportMainVo.ff">
            <el-option
              v-for="item in (riskInsInputData.riskReportMainVo.underwriteFlag === '9' ? reviewdList3 : reviewdList)"
              :value="item.value" :key="item.value">{{item.label}}
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="backFlag" :label="suggest" prop="repulsesugggest" label-width="100px">
          <el-input placeholder="请输入意见..." v-model="riskInsInputData.riskReportMainVo.repulsesugggest" type="textarea"
                 :autosize="true"/>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <Button size="large" icon="compose" @click="asyncOK('1')">确定</Button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="reviewedFlag2">
      <el-form ref="riskReportMainVoF" :model="riskInsInputData.riskReportMainVo" :rules="ruleValidate21">
        <el-form-item label="请选择：" label-width="100px" prop="bb">
          <el-select type="text" @on-change="disposal2()" v-model="riskInsInputData.riskReportMainVo.bb">
            <el-option v-for="item in reviewdList2" :value="item.value" :key="item.value">{{item.label}}</el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="backFlag" :label="suggest" prop="repulsesugggest" label-width="100px">
          <el-input placeholder="请输入意见..." v-model="riskInsInputData.riskReportMainVo.repulsesugggest" type="textarea"
                 :autosize="true"/>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <Button size="large" icon="compose" @click="asyncOK('2')">确定</Button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="reviewedFlag3">
      <el-form ref="riskReportMainVoG" :model="riskInsInputData.riskReportMainVo" :rules="ruleValidate22">
        <el-form-item label="请选择：" label-width="100px" prop="cc">
          <el-select type="text" @on-change="disposal3()" v-model="riskInsInputData.riskReportMainVo.cc">
            <el-option v-for="item in reviewdList3" :value="item.value" :key="item.value">{{item.label}}</el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="backFlag" :label="suggest" prop="repulsesugggest" label-width="100px">
          <el-input placeholder="请输入意见..." v-model="riskInsInputData.riskReportMainVo.repulsesugggest" type="textarea"
                 :autosize="true"/>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <Button size="large" icon="compose" @click="asyncOK('3')">确定</Button>
      </div>
    </el-dialog>
    <el-dialog title="打回原因" :visible.sync="backFlag2" :footer-hide="true">
      <el-timeline>
        <div v-for="(item, index) in lctList">
          <el-timeline-item v-if="item.nodeName ==='报告打回'">
            <p>审核人名称：{{item.operateName}}</p>
            <p>审核时间：{{item.operateTime}}</p>
            <p style="white-space: normal; word-break:break-word;">打回原因：{{item.repulsesugggest}}</p>
          </el-timeline-item>
        </div>
      </el-timeline>
    </el-dialog>
    <el-dialog :visible.sync="transFlag" class="progressModal">
      <div style="text-align:center;">
        <p>{{message}}</p>
      </div>
      <div slot="footer">
        <Button :type="footerStatus" size="large" long @click="ok">确认</Button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import HeadButtonCommon from './HeadButtonCommon'
  import riskInsInputData from '../riskdata/riskInsInputData'
  import CurrencyDialog from '../Dialog.vue'
//  import FileUploadComponent from '../FileUploadComponent.vue'
//  import IEcharts from 'vue-echarts-v3'
//  import iView from 'iview'
  import { Loading } from 'element-ui'
  import MapCompontent from '../MapCompontent.vue'

  export default {
    name: 'riskInsMain',
    components: {HeadButtonCommon, CurrencyDialog,
//      FileUploadComponent,
//      IEcharts,
      MapCompontent},
    created () {
      this.spinShow = true
      // 页面初始化
      if (this.$route.query.systemFlag === '1') {
        this.outerSystemFlag = true
        this.postListFlag = false
      } else {
        this.outerSystemFlag = false
        this.riskInsInputData.postListStr = this.$store.getters.getUserInfo.postList.toString()
        if (this.riskInsInputData.postListStr.indexOf('风控结果查询岗') !== -1) {
          this.postListFlag = true
        } else {
          this.postListFlag = false
        }
      }
      this.search()
      this.spinShow = false
    },
    data () {
      // 校验总保险金额
      const validateSumAmount = (rule, value, callback) => {
        // 验证正数，小数点保留两位
        var reg = /^(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*))$/
        // 验证是否大于0
        var reg1 = /(([1-9][0-9]*)(\.[0-9]+)*)|([0.][1-9]+)/i
        if (value !== '' && value !== null) {
          value = value.replace(/,/g, '')
          if (value.match(reg) === null) {
            this.riskInsInputData.riskReportMainVo.sumAmount = ''
            callback(new Error('只能录入正数!'))
          } else {
            value = parseFloat(value).toFixed(4) + ''
            if (value === '0.00') {
              if (value.match(reg1) === null) {
                this.riskInsInputData.riskReportMainVo.sumAmount = ''
                callback(new Error('只能录入正数!'))
              }
            } else {
              if (!this.common.checkNumber(value)) {
                callback(new Error('您输入数值过大，请重新确认数值!'))
              } else {
                this.riskInsInputData.riskReportMainVo.sumAmount = this.common.toThousands(parseFloat(value).toFixed(4))
                callback()
              }
            }
          }
        } else {
          callback(new Error('总保险金额不能为空!'))
        }
      }
//      // 校验营业利润
      const validateoperatProfit = (rule, value, callback) => {
        // 验证正数，小数点保留四位
        var reg = /^(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*))$/
        // 验证是否大于0
        var reg1 = /(([1-9][0-9]*)(\.[0-9]+)*)|([0.][1-9]+)/i
        if (value !== '' && value !== null) {
          value = value.replace(/,/g, '')
          if (value.match(reg) === null) {
            this.riskInsInputData.riskReportCloBusinessList[0].operatProfit = ''
            callback(new Error('只能录入正数!'))
          } else {
            value = parseFloat(value).toFixed(4) + ''
            if (value === '0.00') {
              if (value.match(reg1) === null) {
                this.riskInsInputData.riskReportCloBusinessList[0].operatProfit = ''
                callback(new Error('只能录入正数!'))
              }
            } else {
              this.riskInsInputData.riskReportCloBusinessList[0].operatProfit = this.common.toThousands(parseFloat(value).toFixed(4))
              callback()
            }
          }
        } else {
          callback()
        }
      }
      // 校验约定维持费用
      const validateconvenCost = (rule, value, callback) => {
        // 验证正数，小数点保留四位
        var reg = /^(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*))$/
        // 验证是否大于0
        var reg1 = /(([1-9][0-9]*)(\.[0-9]+)*)|([0.][1-9]+)/i
        if (value !== '' && value !== null) {
          value = value.replace(/,/g, '')
          if (value.match(reg) === null) {
            this.riskInsInputData.riskReportCloBusinessList[0].convenCost = ''
            callback(new Error('只能录入正数!'))
          } else {
            value = parseFloat(value).toFixed(4) + ''
            if (value === '0.00') {
              if (value.match(reg1) === null) {
                this.riskInsInputData.riskReportCloBusinessList[0].convenCost = ''
                callback(new Error('只能录入正数!'))
              }
            } else {
              this.riskInsInputData.riskReportCloBusinessList[0].convenCost = this.common.toThousands(parseFloat(value).toFixed(4))
              callback()
            }
          }
        } else {
          this.riskInsInputData.riskReportCloBusinessList[0].itemsAmountFlag = ''
          this.riskInsInputData.riskReportCloBusinessList[0].itemsAmount = ''
          callback()
        }
      }
      // 校验约定维持费用
      const validateauditorFee = (rule, value, callback) => {
        // 验证正数，小数点保留四位
        var reg = /^(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*))$/
        // 验证是否大于0
        var reg1 = /(([1-9][0-9]*)(\.[0-9]+)*)|([0.][1-9]+)/i
        if (value !== '' && value !== null) {
          value = value.replace(/,/g, '')
          if (value.match(reg) === null) {
            this.riskInsInputData.riskReportCloBusinessList[0].auditorFee = ''
            callback(new Error('只能录入正数!'))
          } else {
            value = parseFloat(value).toFixed(4) + ''
            if (value === '0.00') {
              if (value.match(reg1) === null) {
                this.riskInsInputData.riskReportCloBusinessList[0].auditorFee = ''
                callback(new Error('只能录入正数!'))
              }
            } else {
              this.riskInsInputData.riskReportCloBusinessList[0].auditorFee = this.common.toThousands(parseFloat(value).toFixed(4))
              callback()
            }
          }
        } else {
          callback()
        }
      }
      // 校验库存能保证供货时间
      const validateSureTime = (rule, value, callback) => {
        var reg = /^[1-9]\d*$/
        if (value !== '' && value !== null) {
          value = value + ''
          if (value.match(reg) === null) {
            this.riskInsInputData.riskReportCloBusinessList[0].sureTime = ''
            callback(new Error('只能录入正整数!'))
          } else {
            this.riskInsInputData.riskReportCloBusinessList[0].sureTime = value
            callback()
          }
        } else {
          callback(new Error('库存能保证供货时间不能为空!'))
        }
      }
      // 校验销售旺季起期
      const validateSeasonStart = (rule, value, callback) => {
        var reg = /^([1-9]|1[0-2])$/
        if (value !== '' && value !== null) {
          value = value + ''
          if (value.match(reg) === null) {
            this.riskInsInputData.riskReportCloBusinessList[0].seasonStart = ''
            callback(new Error('只能录入正整数!'))
          } else {
            this.riskInsInputData.riskReportCloBusinessList[0].seasonStart = value
            callback()
          }
        } else {
          callback(new Error('销售旺季起期不能为空!'))
        }
      }
      // 校验销售旺季止期
      const validateSeasonEnd = (rule, value, callback) => {
        var reg = /^([1-9]|1[0-2])$/
        if (value !== '' && value !== null) {
          value = value + ''
          if (value.match(reg) === null) {
            this.riskInsInputData.riskReportCloBusinessList[0].seasonEnd = ''
            callback(new Error('只能录入正整数!'))
          } else {
            this.riskInsInputData.riskReportCloBusinessList[0].seasonEnd = value
            callback()
          }
        } else {
          callback(new Error('销售旺季止期不能为空!'))
        }
      }
      // 校验扩展类附加险个数
      const validateAdditionRisk = (rule, value, callback) => {
        // 验证正数 带0，非负数（^[+]{0,1}(\d+)$）
        var reg = /^[1-9]\d*$/
        if (value !== '' && value !== null) {
          value = value + ''
          if (value.match(reg) === null) {
            this.riskInsInputData.riskReportCloBusinessList[0].additionRisk = ''
            callback(new Error('只能录入正整数!'))
          } else {
            this.riskInsInputData.riskReportCloBusinessList[0].additionRisk = value
            callback()
          }
        } else {
          callback(new Error('扩展类附加险个数不能为空!'))
        }
      }
      // 校验属于CBI范围条款个数
      const validateScopItem = (rule, value, callback) => {
        // 验证正数
        var reg = /^[1-9]\d*$/
        if (value !== '' && value !== null) {
          value = value + ''
          if (value.match(reg) === null) {
            this.riskInsInputData.riskReportCloBusinessList[0].scopItem = ''
            callback(new Error('只能录入正整数!'))
          } else {
            this.riskInsInputData.riskReportCloBusinessList[0].scopItem = value
            callback()
          }
        } else {
          callback(new Error('属于CBI范围条款个数不能为空!'))
        }
      }
      // 校验
      const validateFF = (rule, value, callback) => {
        if (value === '' || value === null || value === undefined) {
          this.riskInsInputData.riskReportMainVo.ff = ''
          callback(new Error('处理项不能为空'))
        } else {
          this.riskInsInputData.riskReportMainVo.ff = value
          callback()
        }
      }
      // 校验
      const validateBB = (rule, value, callback) => {
        if (value === '' || value === null || value === undefined) {
          this.riskInsInputData.riskReportMainVo.bb = ''
          callback(new Error('处理项不能为空'))
        } else {
          this.riskInsInputData.riskReportMainVo.bb = value
          callback()
        }
      }
      // 校验
      const validateCC = (rule, value, callback) => {
        if (value === '' || value === null || value === undefined) {
          this.riskInsInputData.riskReportMainVo.cc = ''
          callback(new Error('处理项不能为空'))
        } else {
          this.riskInsInputData.riskReportMainVo.cc = value
          callback()
        }
      }
      const validateSugggest = (rule, value, callback) => {
        if (value === '' || value === null || value === undefined) {
          var message = this.suggest.replace('：', '') + '不能为空'
          callback(new Error(message))
        } else {
          callback()
        }
      }
      return {
        lctList: [],
        transFlag: false,
        backFlag: false,
        backFlag2: false,
        footerStatus: 'default',
        suggest: '',
        currnetTabPanel: 'name1',
        riskFileTitle: '营业中断险专用风控模板',
        editModel: 'edit',
        message: '',
//        raderFlag: true,
        spinShow: false,
        centainFlag: false,
        itemFlag: false,
        returnButtonState: false,
        editButtonState: false,
        reviewedButtonState: false,
        backButtonState: false,
        outerSystemFlag: false,
        importFlag: false,
//        constructBuildFlag: false,
//        itemAddressFlag: false,
//        diaModalFlag: false,
        mapFlag: false,
        reviewedFlag: false,
        reviewedFlag2: false,
        reviewedFlag3: false,
        postListFlag: false,
        address: '',
        addressDetail: '',
        riskInsInputData: riskInsInputData.a(),
//        showFlag: false,
//        modalFlag: false,
//        claimModal: false,
        browseFlag: false,
//        readFlag: true,
//        readFlag1: false,
//        styles: {
//          ivuerro: false
//        },
        DialogConfig: {
          dialogFlag: false
        },
//        FileUpLoadConfig: {
//          childPath: '',
//          riskDcodeList: [],
//          riskDcodeListDel: [],
//          riskFileNo: '',
//          editModel: '',
//          disabledFlag: false,
//          riskModel: ''
//        },
        mapCompontent: {
          ProCode: '',
          CityCode: '',
          CountryCode: '',
          addressProvince: '',
          addressCity: '',
          addressCountry: '',
          addressDetail: '',
          pointx_2000: '',
          pointy_2000: '',
          editModel: '',
          disabledFlag: false,
          editFlag: '1',
          exploreDate: ''
        },
        reviewdList: [
          {
            value: '4',
            label: '一级审核通过'
          },
          {
            value: 'DH',
            label: '打回原报告'
          },
          {
            value: '9',
            label: '审核通过'
          }
        ],
        reviewdList2: [
          {
            value: '4',
            label: '一级审核通过'
          },
          {
            value: 'DH',
            label: '打回原报告'
          }
        ],
        reviewdList3: [
          {
            value: 'DH',
            label: '打回原报告'
          },
          {
            value: '9',
            label: '审核通过'
          }
        ],
        ruleValidate1: {
          sumAmount: [
            {validator: validateSumAmount, type: 'number', required: true, trigger: 'blur'}
          ],
          riskModel: [
            {required: true, message: '报告模板不能为空', trigger: 'change'}
          ],
          insuredType: [
            {required: true, message: '被保险人类型不能为空', trigger: 'change'}
          ],
          insuredName: [
            {required: true, message: '被保险人名称不能为空', trigger: 'change'}
          ],
          addressProvince: [
            {required: true, message: '查勘地址（省）不能为空', trigger: 'change'}
          ],
          addressCity: [
            {required: true, message: '查勘地址（市）不能为空', trigger: 'change'}
          ],
          addressCounty: [
            {required: true, message: '查勘地址（区或县）不能为空', trigger: 'change'}
          ],
          addressDetail: [
            {required: true, message: '查勘地址（详细地址）不能为空', trigger: 'change'}
          ],
          unitNature: [
            {required: true, message: '被保险人性质不能为空', trigger: 'change'}
          ],
          businessSourceCName: [
            {required: true, message: '国民经济代码不能为空', trigger: 'change'}
          ],
          businessClass: [
            {required: true, message: '行业分类代码不能为空', trigger: 'change'}
          ],
          underwriteStatus: [
            {required: true, message: '以往承保情况不能为空', trigger: 'change'}
          ]
        },
        ruleValidate2: {
          finaRecords: [
            {required: true, message: '是否有完整财务记录及会计账册不能为空', trigger: 'change'}
          ],
          accountData: [
            {required: true, message: '会计资料是否存放良好且有备份不能为空', trigger: 'change'}
          ],
          proLineType: [
            {required: true, message: '生产线类型不能为空', trigger: 'change'}
          ],
          keyEquipFlag: [
            {required: true, message: '是否有关键设备不能为空', trigger: 'change'}
          ],
          keyEquip: [
            {required: true, message: '关键设备名称不能为空', trigger: 'blur'}
          ],
          equipType: [
            {required: true, message: '设备类型不能为空', trigger: 'change'}
          ],
          spareParts: [
            {required: true, message: '是否有备件不能为空', trigger: 'change'}
          ],
          manufacturer: [
            {required: true, message: '制造商不能为空', trigger: 'change'}
          ],
          repairman: [
            {required: true, message: '维修商不能为空', trigger: 'change'}
          ],
          supplierNum: [
            {required: true, message: '设备供应商数量不能为空', trigger: 'change'}
          ],
          supplierLevel: [
            {required: true, message: '供应商供货维修水平不能为空', trigger: 'change'}
          ],
          maxRecovTime: [
            {required: true, message: '关键设备预计最长恢复时间不能为空', trigger: 'change'}
          ],
          marketSitu: [
            {required: true, message: '是否有产品及市场情况不能为空', trigger: 'change'}
          ],
          sureTime: [
            {validator: validateSureTime, type: 'number', required: true, trigger: 'blur'}
          ],
          seasonal: [
            {required: true, message: '产品销售是否存在季节性不能为空', trigger: 'change'}
          ],
          seasonStart: [
            {validator: validateSeasonStart, type: 'number', required: true, trigger: 'blur'}
          ],
          seasonEnd: [
            {validator: validateSeasonEnd, type: 'number', required: true, trigger: 'blur'}
          ],
          competition: [
            {required: true, message: '被保险人产品竞争力不能为空', trigger: 'change'}
          ],
          boomCondition: [
            {required: true, message: '被保险人所处行业情况不能为空', trigger: 'change'}
          ],
          concyPlan: [
            {required: true, message: '是否建立有效应急预案不能为空', trigger: 'change'}
          ],
          additionRisk: [
            {validator: validateAdditionRisk, type: 'number', required: true, trigger: 'blur'}
          ],
          scopItem: [
            {validator: validateScopItem, type: 'number', required: true, trigger: 'blur'}
          ]
        },
        ruleValidate3: {
          maxBusiTime: [
            {required: true, message: '预计最长恢复时间不能为空', trigger: 'blur'}
          ],
          maxLoss: [
            {required: true, message: '预计最大可能损失不能为空', trigger: 'blur'}
          ]
        },
        ruleValidate4: {
          itemsAmountFlag: [
            {required: true, message: '维持费用是否列明项目及金额不能为空', trigger: 'change'}
          ],
          certainWayFlag: [
            {required: true, message: '是否列明保额确定方式及依据不能为空', trigger: 'change'}
          ],
          itemsAmount: [
            {required: true, message: '项目及金额不能为空', trigger: 'blur'}
          ],
          certainWay: [
            {required: true, message: '保额确定方式及依据不能为空', trigger: 'blur'}
          ],
          maxPayoutDate: [
            {required: true, message: '最大赔偿期不能为空', trigger: 'blur'}
          ],
          franchiseDate: [
            {required: true, message: '免赔期不能为空', trigger: 'blur'}
          ],
          mainClause: [
            {required: true, message: '保险合同主险条款不能为空', trigger: 'change'}
          ],
          noCoverage: [
            {required: true, message: '是否属于限制或禁止承保范围不能为空', trigger: 'change'}
          ],
          paymentRecords: [
            {required: true, message: '近三年营业中断赔付记录不能为空', trigger: 'change'}
          ],
          operatProfit: [
            {validator: validateoperatProfit, type: 'number', required: false, trigger: 'blur'}
          ],
          convenCost: [
            {validator: validateconvenCost, type: 'number', required: false, trigger: 'blur'}
          ],
          auditorFee: [
            {validator: validateauditorFee, type: 'number', required: false, trigger: 'blur'}
          ]
        },
        ruleValidate32: {
          valuation: [
            {required: true, message: '风险评估等级不能为空', trigger: 'change'}
          ],
          riskSuggest: [
            {required: true, message: '风控建议不能为空', trigger: 'change'}
          ]
        },
        ruleValidate20: {
          ff: [
            {validator: validateFF, required: true, trigger: 'change'}
          ],
          repulsesugggest: [
//            {required: true, message: '打回原因不能为空', trigger: 'blur'}
            {validator: validateSugggest, required: true, trigger: 'blur'}
          ]
        },
        ruleValidate21: {
          bb: [
            {validator: validateBB, required: true, trigger: 'change'}
          ],
          repulsesugggest: [
//            {required: true, message: '打回原因不能为空', trigger: 'blur'}
            {validator: validateSugggest, required: true, trigger: 'blur'}
          ]
        },
        ruleValidate22: {
          cc: [
            {validator: validateCC, required: true, trigger: 'change'}
          ],
          repulsesugggest: [
//            {required: true, message: '打回原因不能为空', trigger: 'blur'}
            {validator: validateSugggest, required: true, trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      changeItem () {
        if (this.riskInsInputData.riskReportCloBusinessList[0].itemsAmountFlag === 'B') {
          this.riskInsInputData.riskReportCloBusinessList[0].itemsAmount = ''
        }
      },
      changeCentain () {
        if (this.riskInsInputData.riskReportCloBusinessList[0].certainWayFlag === 'B') {
          this.riskInsInputData.riskReportCloBusinessList[0].certainWay = ''
        }
      },
      ok () {
        this.transFlag = false
      },
      transfer (val, val2, val3, val4, val5, val6, val7, val8, val9, val10, val11, val12) {
        if (val12 === '') {
          this.mapFlag = false
          this.transFlag = true
          this.message = '查勘地址未使用地图选择！'
        } else {
          this.address = val
          this.addressDetail = val2
          this.riskInsInputData.riskReportMainVo.addressDetail = this.address + this.addressDetail
          this.riskInsInputData.riskReportEnvironmentList[0] = val3
          this.riskInsInputData.riskReportMainVo.pointx_2000 = val4
          this.riskInsInputData.riskReportMainVo.pointy_2000 = val5
          this.riskInsInputData.riskReportMainVo.addressProvince = val6
          this.riskInsInputData.riskReportMainVo.addressCity = val7
          this.riskInsInputData.riskReportMainVo.addressCounty = val8
          this.riskInsInputData.riskReportMainVo.addressProvinceCode = val9
          this.riskInsInputData.riskReportMainVo.addressCityCode = val10
          this.riskInsInputData.riskReportMainVo.addressCountyCode = val11
          this.mapFlag = false
        }
      },
      queryAddressDetail () {
        this.mapFlag = true
        this.mapCompontent.pointx_2000 = this.riskInsInputData.riskReportMainVo.pointx_2000
        this.mapCompontent.pointy_2000 = this.riskInsInputData.riskReportMainVo.pointy_2000
        this.mapCompontent.editModel = this.editModel
        this.mapCompontent.addressDetail = this.riskInsInputData.riskReportMainVo.addressDetail
        this.mapCompontent.addressCountry = this.riskInsInputData.riskReportMainVo.addressCounty
        this.mapCompontent.addressProvince = this.riskInsInputData.riskReportMainVo.addressProvince
        this.mapCompontent.addressCity = this.riskInsInputData.riskReportMainVo.addressCity
        this.mapCompontent.ProCode = this.riskInsInputData.riskReportMainVo.addressProvinceCode
        this.mapCompontent.CityCode = this.riskInsInputData.riskReportMainVo.addressCityCode
        this.mapCompontent.CountryCode = this.riskInsInputData.riskReportMainVo.addressCountyCode
        this.mapCompontent.exploreDate = new Date(this.riskInsInputData.riskReportMainVo.exploreDate).getFullYear()
      },
      disposal () {
        if (this.riskInsInputData.riskReportMainVo.ff !== '') {
          this.backFlag = true
          if (this.riskInsInputData.riskReportMainVo.ff === 'DH') {
            this.suggest = '打回原因：'
          } else {
            this.suggest = '审核意见：'
          }
          this.resetFieldTip('riskReportMainVoE', 'repulsesugggest')
        } else {
          this.backFlag = false
        }
      },
      resetFieldTip(name, filedName) {
        this.$refs[name].fields.forEach(function (e) {
          if (e.prop === filedName) {
            e.resetField()
          }
        })
      },
      disposal3 () {
        if (this.riskInsInputData.riskReportMainVo.cc !== '') {
          this.backFlag = true
          if (this.riskInsInputData.riskReportMainVo.cc === 'DH') {
            this.suggest = '打回原因：'
          } else {
            this.suggest = '审核意见：'
          }
          this.resetFieldTip('riskReportMainVoG', 'repulsesugggest')
        } else {
          this.backFlag = false
        }
      },
      disposal2 () {
        if (this.riskInsInputData.riskReportMainVo.bb !== '') {
          this.backFlag = true
          if (this.riskInsInputData.riskReportMainVo.bb === 'DH') {
            this.suggest = '打回原因：'
          } else {
            this.suggest = '审核意见：'
          }
          this.resetFieldTip('riskReportMainVoF', 'repulsesugggest')
        } else {
          this.backFlag = false
        }
      },
      asyncOK (mm) {
        if (mm === '1') {
          this.$refs['riskReportMainVoE'].validate((valid) => {
            if (valid) {
              this.underwrite(this.riskInsInputData.riskReportMainVo, this.riskInsInputData.riskReportMainVo.ff)
              this.reviewedFlag = false
            }
          })
        } else if (mm === '2') {
          this.$refs['riskReportMainVoF'].validate((valid) => {
            if (valid) {
              this.underwrite(this.riskInsInputData.riskReportMainVo, this.riskInsInputData.riskReportMainVo.bb)
              this.reviewedFlag2 = false
            }
          })
        } else {
          this.$refs['riskReportMainVoG'].validate((valid) => {
            if (valid) {
              this.underwrite(this.riskInsInputData.riskReportMainVo, this.riskInsInputData.riskReportMainVo.cc)
              this.reviewedFlag3 = false
            }
          })
        }
      },
//      /* 显示是否上传照片 */
//      showUpload (val) {
//        var result = false
//        for (let item of this.FileUpLoadConfig.riskDcodeList) {
//          if (val === item.codeEname) {
//            if (item.configList !== null && item.configList.configs !== null && item.configList.configs.length !== 0) {
//              result = true
//              return result
//            } else {
//              return result
//            }
//          }
//        }
//        return result
//      },
//      /* 影像上传 */
//      buttonCommonEvent(val1) {
//        this.diaModalFlag = true
//        this.FileUpLoadConfig.childPath = val1
//        this.FileUpLoadConfig.disabledFlag = true
//        //  跳转到影像面板
//        this.currnetTabPanel = 'name9'
//      },
//      cancel() {
//        this.FileUpLoadConfig.childPath = ''
//        this.FileUpLoadConfig.disabledFlag = false
//      },
      //  公共按钮
      HeadButtonEvent (eventType, editType) {
        switch (eventType) {
          case 'TEMPORARYSAVE':
            this.TSDetail()
            break
          case 'RETURNBEFORE':
            this.returnBefore()
            break
          case 'SAVE':
            this.saveRiskIns()
            break
          case 'ALTER':
            this.alter()
            break
          case 'IMPORT':
            this.makeWord()
            break
          case 'REVIEWED':
            this.reviewed()
            break
          case 'BACK':
            this.checkBack()
            break
        }
      },
      checkBack () {
        this.backFlag2 = true
        /*查询打回原因*/
        this.$api.postMethodParam('/riskins/getUnderwriteProcess', {executionId: this.riskInsInputData.riskReportMainVo.executionId, underwriteFlag: this.riskInsInputData.riskReportMainVo.underwriteFlag}).then((response) => {
          this.lctList = response.data
        })
      },
      reviewed () {
        this.riskInsInputData.postListStr = this.$store.getters.getUserInfo.postList.toString()
        if (this.riskInsInputData.postListStr.indexOf('风控报告一级审核岗') !== -1 && this.riskInsInputData.postListStr.indexOf('风控报告二级审核岗') === -1) {
          if (this.riskInsInputData.riskReportMainVo.underwriteFlag === '9') {
            this.reviewedFlag2 = false
            this.$message.error(this.riskInsInputData.riskReportMainVo.riskFileNo + '处于一级审核通过状态，不支持再次审核')
          } else if (this.riskInsInputData.riskReportMainVo.underwriteFlag === '2') {
            this.reviewedFlag2 = false
            this.$message.error(this.riskInsInputData.riskReportMainVo.riskFileNo + '处于打回状态，不支持审核')
          } else {
            this.riskInsInputData.riskReportMainVo.bb = ''
            this.riskInsInputData.riskReportMainVo.repulsesugggest = ''
            this.reviewedFlag2 = true
          }
        } else if (this.riskInsInputData.postListStr.indexOf('风控报告一级审核岗') === -1 && this.riskInsInputData.postListStr.indexOf('风控报告二级审核岗') !== -1) {
          this.riskInsInputData.riskReportMainVo.cc = ''
          this.riskInsInputData.riskReportMainVo.repulsesugggest = ''
          this.reviewedFlag3 = true
        } else {
          this.riskInsInputData.riskReportMainVo.ff = ''
          this.riskInsInputData.riskReportMainVo.repulsesugggest = ''
          this.reviewedFlag = true
        }
      },
      makeWord () {
        // IEcharts.
//        this.riskInsInputData.underwriteFlag = '1'
        if (this.riskInsInputData.riskReportMainVo.underwriteFlag !== '1' && this.riskInsInputData.riskReportMainVo.underwriteFlag !== '3') {
          this.$message.success('该风控报告未审核通过，不允许导出！')
          return
        } else {
//          this.riskInsInputData.picBase64Info = this.myChart.getDataURL()
          /* 将金额数据恢复成为数字格式 */
          if (this.riskInsInputData.riskReportMainVo.sumAmount !== null && this.riskInsInputData.riskReportMainVo.sumAmount !== '') {
            this.riskInsInputData.riskReportMainVo.sumAmount = this.riskInsInputData.riskReportMainVo.sumAmount.replace(/,/g, '') + ''
          }
          if (this.riskInsInputData.riskReportCloBusinessList[0].operatProfit !== null && this.riskInsInputData.riskReportCloBusinessList[0].operatProfit !== '') {
            this.riskInsInputData.riskReportCloBusinessList[0].operatProfit = this.riskInsInputData.riskReportCloBusinessList[0].operatProfit.replace(/,/g, '') + ''
          }
          if (this.riskInsInputData.riskReportCloBusinessList[0].convenCost !== null && this.riskInsInputData.riskReportCloBusinessList[0].convenCost !== '') {
            this.riskInsInputData.riskReportCloBusinessList[0].convenCost = this.riskInsInputData.riskReportCloBusinessList[0].convenCost.replace(/,/g, '') + ''
          }
          if (this.riskInsInputData.riskReportCloBusinessList[0].auditorFee !== null && this.riskInsInputData.riskReportCloBusinessList[0].auditorFee !== '') {
            this.riskInsInputData.riskReportCloBusinessList[0].auditorFee = this.riskInsInputData.riskReportCloBusinessList[0].auditorFee.replace(/,/g, '') + ''
          }
          this.$api.postMethodBody('/riskins/makeWord', this.riskInsInputData).then((response) => {
            if (response !== null) {
              const filePath = response.data
//              const url = this.SERVER_BASE_URL + '/' + filePath.substring(filePath.indexOf('downloadFile'))
              const url = '/' + filePath.substring(filePath.indexOf('downloadFile'))
              this.$message.success('导出报告成功！')
              window.location.href = url
//              const that = this.riskInsInputData
//              this.download(that, filePath)
            } else {
              this.$message.success('导出报告失败！')
            }
          }, (response) => {
            this.$message.success('导出报告异常！')
          })
        }
      },
      // 修改
      alter () {
        this.editButtonState = false
        this.browseFlag = false
      },
      //  返回
      returnBefore () {
        if (this.reviewedButtonState === false) {
          this.$router.push({path: '/riskins_query'})
//          if (this.$route.query.ufinishFlag === 'ufinishFlag') {
//            this.$router.push({path: '/unfinish'})
//          } else {
//            this.$router.push({path: '/riskins_query'})
//          }
        } else {
          this.$router.push({path: '/riskins_underwrite'})
//          if (this.$route.query.ufinishFlag === 'ufinishFlag') {
//            this.$router.push({path: '/unfinish'})
//          } else {
//            this.$router.push({path: '/riskins_underwrite'})
//          }
        }
      },
      // 模态框
      codeCodeDialog (val) {
        // 是否取消滚动条
        this.DialogConfig.fixedHeader = true
        // 展示modal标志
        this.DialogConfig.dialogFlag = true
        // 业务类型
        this.DialogConfig.codeType = 'TradeCode'
        // 关键字描述
        this.DialogConfig.keyWordDesc = '国民经济代码'
        // 查询关键字
        this.DialogConfig.keyWord = this.riskInsInputData.riskReportMainVo.businessSourceCName
        // 接口地址
        this.DialogConfig.requestURL = 'common/codeselect/listCodeQuery'
        // 自定义table表头
        this.DialogConfig.columnTitles = [
          {title: '序号', key: 'index', type: 'index', width: 60, align: 'center'},
          {title: '国民经济代码', key: 'col1', align: 'center'},
          {title: '国民经济行业分类名称', key: 'col2', align: 'center'},
          {title: '行业分类代码', key: 'col3', align: 'center'}
        ]
      },
      // 同步更新父子组件状态
      syncDialogShowFlag (val) {
        this.DialogConfig.dialogFlag = val
      },
      /* 国民经济代码添加change事件 */
      queryData () {
        let businessValue = ''
        // 依据入参val区分双击域字段，组织关键字
        businessValue = this.riskInsInputData.riskReportMainVo.businessSourceCName
        if (businessValue === '' && businessValue.trim() === '') {
          return
        }
        // 1、组织查询条件
        let userInfo = this.$store.getters.getUserInfo
        let queryPar = {
          userCode: userInfo.userCode,
          comCode: userInfo.comCode,
          riskCode: 'QBB',
          keyWord: businessValue,
          codeType: 'TradeCode',
          pageNo: 1,
          pageSize: 5
        }
        // 2、调用后台接口查询数据
        this.$api.queryJsonDataForModal('common/codeselect/listCodeQuery', queryPar)
          .then(response => {
            if (response.data !== null && response.data.result.length === 1) {
              this.riskInsInputData.riskReportMainVo.businessSource = response.data.result[0][0]
              this.riskInsInputData.riskReportMainVo.businessSourceCName = response.data.result[0][1]
              this.riskInsInputData.riskReportMainVo.businessClass = response.data.result[0][2]
            } else if (response.data != null && response.data.result.length > 1) {
              this.codeCodeDialog()
            } else {
              this.riskInsInputData.riskReportMainVo.businessSourceCName = ''
              this.$message.error('不存在此代码!')
              return
            }
          })
      },
      // 接收数据
      CurrencyDialogClickOnRow (data) {
        this.riskInsInputData.riskReportMainVo.businessSource = data.col1
        this.riskInsInputData.riskReportMainVo.businessSourceCName = data.col2
        this.riskInsInputData.riskReportMainVo.businessClass = data.col3
      },
      // 隐藏域数据清除
      clearShow () {
        if (this.riskInsInputData.riskReportMainVo.addRisk.indexOf('B') === -1) {
          this.riskInsInputData.riskReportInterruptList[0].interruptEffect = ''
          this.riskInsInputData.riskReportInterruptList[0].powerSupply = ''
          this.riskInsInputData.riskReportInterruptList[0].outagePro = ''
        }
        if (this.riskInsInputData.riskReportProtectionList[0].fireEquipType.length === 0) {
          this.riskInsInputData.riskReportProtectionList[0].equipmentChannel = ''
        }
        if (this.riskInsInputData.riskReportMainVo.addRisk.indexOf('A') === -1) {
          this.riskInsInputData.riskReportTheftList[0].insuredAttraction = ''
          this.riskInsInputData.riskReportTheftList[0].antiTheftFlag = ''
          this.riskInsInputData.riskReportTheftList[0].antiTheftType = ''
          this.riskInsInputData.riskReportTheftList[0].netPoliceFlag = ''
          this.riskInsInputData.riskReportTheftList[0].securityNumber = ''
          this.riskInsInputData.riskReportTheftList[0].timingPatrol = ''
          this.riskInsInputData.riskReportTheftList[0].publicSecurity = ''
          this.riskInsInputData.riskReportTheftList[0].theftHistoryFlag = ''
        }
        // 复选框 点击 默认赋值
        for (let a = 0; this.riskInsInputData.riskReportProtectionList[0].fireEquipType.length > a; a++) {
          var valueOne = this.riskInsInputData.riskReportProtectionList[0].fireEquipType[a]
          if (this.oldValue.indexOf(valueOne) === -1) {
            if (valueOne === 'A') {
              this.riskInsInputData.riskReportProtectionList[0].alarmType = 'B'
              this.riskInsInputData.riskReportProtectionList[0].alarmWork = 'A'
            } else if (valueOne === 'B') {
              this.riskInsInputData.riskReportProtectionList[0].selfExtCase = 'A'
              this.riskInsInputData.riskReportProtectionList[0].powerLed = 'A'
              this.riskInsInputData.riskReportProtectionList[0].sprayBolt = 'A'
              this.riskInsInputData.riskReportProtectionList[0].selfExtWay = 'B'
              this.riskInsInputData.riskReportProtectionList[0].waterSource = 'B'
              this.riskInsInputData.riskReportProtectionList[0].impoundment = 'A'
              this.riskInsInputData.riskReportProtectionList[0].selfExtArea.push('A')
              this.riskInsInputData.riskReportProtectionList[0].selfExtArea.push('B')
              this.riskInsInputData.riskReportProtectionList[0].selfExtArea.push('C')
              this.riskInsInputData.riskReportProtectionList[0].selfExtArea.push('D')
            } else if (valueOne === 'C') {
              this.riskInsInputData.riskReportProtectionList[0].insHydrantArea = 'A'
              this.riskInsInputData.riskReportProtectionList[0].insHydrantPos = 'A'
              this.riskInsInputData.riskReportProtectionList[0].insHydrantHade = 'A'
              this.riskInsInputData.riskReportProtectionList[0].outHydrantArea = 'A'
              this.riskInsInputData.riskReportProtectionList[0].outHydrantBag = 'A'
            } else if (valueOne === 'D') {
              this.riskInsInputData.riskReportProtectionList[0].extinguisherArea = 'A'
              this.riskInsInputData.riskReportProtectionList[0].extinguisherPre = 'A'
              this.riskInsInputData.riskReportProtectionList[0].extinguisherPos = 'A'
            }
          }
        }
        this.oldValue = this.riskInsInputData.riskReportProtectionList[0].fireEquipType
        if (this.riskInsInputData.riskReportProtectionList[0].fireEquipType.indexOf('A') === -1) {
          this.riskInsInputData.riskReportProtectionList[0].alarmType = ''
          this.riskInsInputData.riskReportProtectionList[0].alarmWork = ''
        }
        if (this.riskInsInputData.riskReportProtectionList[0].fireEquipType.indexOf('B') === -1) {
          this.riskInsInputData.riskReportProtectionList[0].selfExtCase = ''
          this.riskInsInputData.riskReportProtectionList[0].selfExtArea = []
          this.riskInsInputData.riskReportProtectionList[0].powerLed = ''
          this.riskInsInputData.riskReportProtectionList[0].sprayBolt = ''
          this.riskInsInputData.riskReportProtectionList[0].selfExtWay = ''
          this.riskInsInputData.riskReportProtectionList[0].waterSource = ''
          this.riskInsInputData.riskReportProtectionList[0].impoundment = ''
        }
        if (this.riskInsInputData.riskReportProtectionList[0].fireEquipType.indexOf('C') === -1) {
          this.riskInsInputData.riskReportProtectionList[0].insHydrantArea = ''
          this.riskInsInputData.riskReportProtectionList[0].insHydrantPos = ''
          this.riskInsInputData.riskReportProtectionList[0].insHydrantHade = ''
          this.riskInsInputData.riskReportProtectionList[0].outHydrantArea = ''
          this.riskInsInputData.riskReportProtectionList[0].outHydrantBag = ''
        }
        if (this.riskInsInputData.riskReportProtectionList[0].fireEquipType.indexOf('D') === -1) {
          this.riskInsInputData.riskReportProtectionList[0].extinguisherArea = ''
          this.riskInsInputData.riskReportProtectionList[0].extinguisherPre = ''
          this.riskInsInputData.riskReportProtectionList[0].extinguisherPos = ''
        }
      },
      //  暂存
      TSDetail () {
        this.spinShow = true
        /* 将金额数据恢复成为数字格式 */
        if (this.riskInsInputData.riskReportMainVo.sumAmount !== null && this.riskInsInputData.riskReportMainVo.sumAmount !== '') {
          this.riskInsInputData.riskReportMainVo.sumAmount = this.riskInsInputData.riskReportMainVo.sumAmount.replace(/,/g, '') + ''
        }
        if (this.riskInsInputData.riskReportCloBusinessList[0].operatProfit !== null && this.riskInsInputData.riskReportCloBusinessList[0].operatProfit !== '') {
          this.riskInsInputData.riskReportCloBusinessList[0].operatProfit = this.riskInsInputData.riskReportCloBusinessList[0].operatProfit.replace(/,/g, '') + ''
        }
        if (this.riskInsInputData.riskReportCloBusinessList[0].convenCost !== null && this.riskInsInputData.riskReportCloBusinessList[0].convenCost !== '') {
          this.riskInsInputData.riskReportCloBusinessList[0].convenCost = this.riskInsInputData.riskReportCloBusinessList[0].convenCost.replace(/,/g, '') + ''
        }
        if (this.riskInsInputData.riskReportCloBusinessList[0].auditorFee !== null && this.riskInsInputData.riskReportCloBusinessList[0].auditorFee !== '') {
          this.riskInsInputData.riskReportCloBusinessList[0].auditorFee = this.riskInsInputData.riskReportCloBusinessList[0].auditorFee.replace(/,/g, '') + ''
        }
        this.$api.postMethodBody('/riskins/temporarySave', this.riskInsInputData).then((response) => {
          if (response !== null) {
            parse(response.data.riskReportMainVo)
            parse(response.data.riskReportCloBusinessList[0])
            this.riskInsInputData = response.data
            if (this.riskInsInputData.riskReportMainVo.sumAmount !== null && this.riskInsInputData.riskReportMainVo.sumAmount !== '') {
              this.riskInsInputData.riskReportMainVo.sumAmount = parseFloat(this.riskInsInputData.riskReportMainVo.sumAmount).toFixed(4) + ''
            }
            if (this.riskInsInputData.riskReportCloBusinessList[0].operatProfit !== null && this.riskInsInputData.riskReportCloBusinessList[0].operatProfit !== '') {
              this.riskInsInputData.riskReportCloBusinessList[0].operatProfit = parseFloat(this.riskInsInputData.riskReportCloBusinessList[0].operatProfit).toFixed(4) + ''
            }
            if (this.riskInsInputData.riskReportCloBusinessList[0].convenCost !== null && this.riskInsInputData.riskReportCloBusinessList[0].convenCost !== '') {
              this.riskInsInputData.riskReportCloBusinessList[0].convenCost = parseFloat(this.riskInsInputData.riskReportCloBusinessList[0].convenCost).toFixed(4) + ''
            }
            if (this.riskInsInputData.riskReportCloBusinessList[0].auditorFee !== null && this.riskInsInputData.riskReportCloBusinessList[0].auditorFee !== '') {
              this.riskInsInputData.riskReportCloBusinessList[0].auditorFee = parseFloat(this.riskInsInputData.riskReportCloBusinessList[0].auditorFee).toFixed(4) + ''
            }
            this.spinShow = false
            this.$router.push({
              path: '/riskins_tsuccess',
              query: {
                riskFileNo: this.riskInsInputData.riskReportMainVo.riskFileNo,
                riskModel: this.riskInsInputData.riskReportMainVo.riskModel
              }
            })
          }
        }, (response) => {
          // error callback
        })
      },
      // 保存 ruleValidate1
      saveRiskIns () {
        let validFlag = false
        this.$refs['riskReportMainVoA'].validate((valid) => {
          console.log(valid)
          if (!valid) {
            validFlag = true
          }
        })
        this.$refs['riskReportCloBusinessListA'].validate((valid1) => {
          console.log(valid1)
          if (!valid1) {
            validFlag = true
          }
        })
        /* 将金额数据回复成为数字格式 */
        if (this.riskInsInputData.riskReportMainVo.sumAmount !== null && this.riskInsInputData.riskReportMainVo.sumAmount !== '') {
          this.riskInsInputData.riskReportMainVo.sumAmount = this.riskInsInputData.riskReportMainVo.sumAmount.replace(/,/g, '')
        }
        if (this.riskInsInputData.riskReportCloBusinessList[0].operatProfit !== null && this.riskInsInputData.riskReportCloBusinessList[0].operatProfit !== '') {
          this.riskInsInputData.riskReportCloBusinessList[0].operatProfit = this.riskInsInputData.riskReportCloBusinessList[0].operatProfit.replace(/,/g, '')
        }
        if (this.riskInsInputData.riskReportCloBusinessList[0].convenCost !== null && this.riskInsInputData.riskReportCloBusinessList[0].convenCost !== '') {
          this.riskInsInputData.riskReportCloBusinessList[0].convenCost = this.riskInsInputData.riskReportCloBusinessList[0].convenCost.replace(/,/g, '')
        }
        if (this.riskInsInputData.riskReportCloBusinessList[0].auditorFee !== null && this.riskInsInputData.riskReportCloBusinessList[0].auditorFee !== '') {
          this.riskInsInputData.riskReportCloBusinessList[0].auditorFee = this.riskInsInputData.riskReportCloBusinessList[0].auditorFee.replace(/,/g, '')
        }
//        this.$refs['riskReportCloBusinessListA'].validate((valid) => {
//          console.log(valid)
//          if (!valid) {
//            validFlag = true
//          }
//        })
        this.$refs['riskReportCloBusinessListB'].validate((valid) => {
          console.log(valid)
          if (!valid) {
            validFlag = true
          }
        })
        this.$refs['riskReportCloBusinessListC'].validate((valid) => {
          console.log(valid)
          if (!valid) {
            validFlag = true
          }
        })
        this.$refs['riskReportMainVoB'].validate((valid) => {
          console.log(valid)
          if (!valid) {
            validFlag = true
          }
        })
        if (validFlag) {
          this.$Notice.error({
            title: '必录项存在未录入字段，请修改！'
          })
        } else {
          if (this.riskInsInputData.riskReportMainVo.pointy_2000 === '' && this.riskInsInputData.riskReportMainVo.pointx_2000 === '') {
            this.$message.error('请使用地图选择查勘地址!')
            this.spinShow = false
            return
          }
          this.$api.postMethodBody('/riskins/gradeAndSaveDetail', this.riskInsInputData).then((response) => {
            if (response.status === 1) {
              this.spinShow = false
              this.$message.success(this.riskInsInputData.riskReportMainVo.riskFileNo + '保存成功！')
              this.$router.push({
                path: '/riskins_mcsuccess',
                query: {
                  riskFileNo: this.riskInsInputData.riskReportMainVo.riskFileNo,
                  editModel: 'browse',
                  riskModel: this.riskInsInputData.riskReportMainVo.riskModel,
                  returnButtonState: this.returnButtonState
                }
              })
              this.browseFlag = true
              this.editModel = 'browse'
            }
          }, (response) => {
            // error callback
          })
        }
      },
      // 初始化 调用后台查询
      search () {
//        let userinfo = this.$store.getters.getUserInfo
        let riskFileNo = this.$route.query.riskFileNo
        if (this.$route.query.editModel === 'browse') {
          this.browseFlag = true
          this.editModel = 'browse'
        }
        if (this.$route.query.reviewedButtonState === 'true') {
          this.reviewedButtonState = true
        } else if (this.$route.query.reviewedButtonState === 'false') {
          this.reviewedButtonState = false
        } else if (this.$route.query.reviewedButtonState === undefined) {
          this.reviewedButtonState = false
        } else {
          this.reviewedButtonState = this.$route.query.reviewedButtonState
        }
        if (this.$route.query.backButtonState === 'true') {
          this.backButtonState = true
        } else if (this.$route.query.backButtonState === 'false') {
          this.backButtonState = false
        } else if (this.$route.query.backButtonState === undefined) {
          this.backButtonState = false
        } else {
          this.backButtonState = this.$route.query.backButtonState
        }
        if (this.$route.query.returnButtonState === 'true') {
          this.returnButtonState = true
        } else if (this.$route.query.returnButtonState === 'false') {
          this.returnButtonState = false
        } else if (this.$route.query.returnButtonState === undefined) {
          this.returnButtonState = false
        } else {
          this.returnButtonState = this.$route.query.returnButtonState
        }
        if (this.$route.query.editModel === 'edit' && this.editModel === 'browse') {
          this.browseFlag = true
          this.editModel = 'browse'
        }
        var jsonData = ''
        if (this.outerSystemFlag) {
          jsonData = this.$route.query
        } else {
          jsonData = {
            riskFileNo: riskFileNo
          }
        }
        this.$api.postMethodParam('/riskins/queryRiskReport', jsonData).then((response) => {
          if (response.qQexception !== '') {
            this.$router.push({name: 'exception', path: '/exception', params: {ex: response.qQexception}})
          } else {
            parse(response.riskReportMainVo)
            parse(response.riskReportCloBusinessList)
            this.riskInsInputData = response
            if (this.riskInsInputData.riskReportMainVo.underwriteFlag === '1' || this.riskInsInputData.riskReportMainVo.underwriteFlag === '3') {
              this.importFlag = true
            }
            // 查勘机构
            this.riskInsInputData.riskReportMainVo.explorecomCodeCName = this.riskInsInputData.riskReportMainVo.comCodeCName
            if (this.riskInsInputData.riskReportMainVo.sumAmount !== null && this.riskInsInputData.riskReportMainVo.sumAmount !== '') {
              this.riskInsInputData.riskReportMainVo.sumAmount = this.common.toThousands(parseFloat(this.riskInsInputData.riskReportMainVo.sumAmount).toFixed(4)) + ''
            }
            if (this.riskInsInputData.riskReportCloBusinessList[0].operatProfit !== null && this.riskInsInputData.riskReportCloBusinessList[0].operatProfit !== '') {
              this.riskInsInputData.riskReportCloBusinessList[0].operatProfit = this.common.toThousands(parseFloat(this.riskInsInputData.riskReportCloBusinessList[0].operatProfit).toFixed(4)) + ''
            }
            if (this.riskInsInputData.riskReportCloBusinessList[0].convenCost !== null && this.riskInsInputData.riskReportCloBusinessList[0].convenCost !== '') {
              this.riskInsInputData.riskReportCloBusinessList[0].convenCost = this.common.toThousands(parseFloat(this.riskInsInputData.riskReportCloBusinessList[0].convenCost).toFixed(4)) + ''
            }
            if (this.riskInsInputData.riskReportCloBusinessList[0].auditorFee !== null && this.riskInsInputData.riskReportCloBusinessList[0].auditorFee !== '') {
              this.riskInsInputData.riskReportCloBusinessList[0].auditorFee = this.common.toThousands(parseFloat(this.riskInsInputData.riskReportCloBusinessList[0].auditorFee).toFixed(4)) + ''
            }
            this.spinShow = false
          }
        }, (response) => {
          // error callback
        })
      },
      closeDate () {
        this.readFlag = true
        this.readFlag1 = true
      },
      underwrite (params, flag) {
        if (params.underwriteFlag === '2') {
          this.$message.error(params.riskFileNo + '处于打回状态，不支持再次审核')
        } else if (params.underwriteFlag === '1' || params.underwriteFlag === '3') {
          this.$message.error(params.riskFileNo + '处于审核通过状态，不支持再次审核')
        } else {
          let underwrite = (flag === 'DH' ? '2' : (flag === '4' ? '4' : (flag === '9' ? '9' : '1')))
          this.$api.getMethodParam('/riskins/underwrite', {
            riskFileNo: params.riskFileNo,
            executionId: params.executionId,
            underwriteFlag: underwrite,
            repulsesugggest: params.repulsesugggest
          }).then((response) => {
            if (response.status === 1) {
              if (underwrite !== '9') {
                var userAgent = navigator.userAgent
                var isIE = userAgent.indexOf('compatible') > -1 && userAgent.indexOf('MSIE') > -1
                var isEdge = userAgent.indexOf('Edge') > -1
                var isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf('rv:11.0') > -1
                let loadingInstance = Loading.service({
                  render: (h) => {
                    if (isIE || isEdge || isIE11) {
                      return h('div', [
                        h('Icon', {
                          'class': {'demo-spin-icon-load': true},
                          props: {
                            type: 'load-c',
                            size: 36
                          }
                        }),
                        h('div', 'Loading')
                      ])
                    } else {
                      return h('div', [
                        h('img', {
                          attrs: {
                            src: require('@/assets/svg/loading.svg')
                          }
                        })
                      ])
                    }
                  }
                })
                let _self = this

                  _self.search()
//                  iView.Spin.hide()
                loadingInstance.close()
                this.$router.push({
                  path: '/riskins_pass',
                  query: {
                    underwriteFlag: '1',
                    riskFileNo: params.riskFileNo,
                    editModel: 'browse',
                    riskModel: this.riskInsInputData.riskReportMainVo.riskModel
                  }
                })
              } else {
                this.$router.push({
                  path: '/riskins_pass',
                  query: {
                    riskFileNo: params.riskFileNo,
                    editModel: 'browse',
                    riskModel: this.riskInsInputData.riskReportMainVo.riskModel
                  }
                })
              }
//              console.log(this.riskInsInputData)
            } else {
              this.$message.error(params.riskFileNo + '处理失败！')
            }
          }, (response) => {
            this.$message.error(params.riskFileNo + '处理失败！')
          })
        }
      }
    }
  }

  // 返回数据格式化方法，处理checkbox数组等数据
  function parse (data) {
    for (var key in data) {
      if (data[key]) {
        if (typeof (data[key]) === 'string' && data[key].match(/^\[(.*)\]$/)) {
          data[key] = JSON.parse(data[key])
        } else if (data[key] instanceof Array) {
          for (let ikey in data[key]) {
            var obj = data[key][ikey]
            for (var index in obj) {
              if (typeof (obj[index]) === 'string' && obj[index].match(/^\[(.*)\]$/)) {
                obj[index] = JSON.parse(obj[index])
              }
            }
          }
        } else if (data[key] instanceof Object) {
          for (let ikey in data[key]) {
            if (typeof (data[key][ikey]) === 'string' && data[key][ikey].match(/^\[(.*)\]$/)) {
              data[key][ikey] = JSON.parse(data[key][ikey])
            }
          }
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
/*<style lang="less" rel="stylesheet/less" scoped>*/
  .echarts {
    height: 400px;
  }

  .updown {
    margin-top: 0px;
    margin-bottom: 0px;
  }

  .title {
    margin: -5px -15px 16px;
    padding: 0 12px;
    font-size: 14px;
    line-height: 36px;
    background-color: #fafdff;
  }

  /*.cameraicon{
    font-size: 20px;
    margin-top: 9px;
    margin-left: 8px
  }*/
  .ivu-card-out {
    height: 100vh;
  }

  .mapcompontent {
    .ivu-modal {
      top: 0;
    }
  }
</style>
