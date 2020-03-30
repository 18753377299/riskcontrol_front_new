<template>
  <div class="contentBox">
    <el-card class="box-card" >
      <div>
        <div class="updown">
        <HeadButtonCommon :risk-file-title="riskFileTitle" :return-button-state="returnButtonState" :reviewed-button-state="reviewedButtonState" :back-button-state="backButtonState" :business-type="editModel" :edit-button-state="editButtonState" :outer-system-flag="outerSystemFlag" :import-flag="importFlag" @button-event="HeadButtonEvent"></HeadButtonCommon>
      </div>
<!--    <article>-->
        <el-col style="padding: 0px 10px 0px">
        <el-form ref="riskInsInputData" :model="riskInsInputData" :rules="ruleValidate" :label-width="140">
          <Row>
            <el-tabs  v-model="currnetTabPanel" :animated=true>
              <el-tab-pane label="基本信息" i="document-text" style="max-height: calc(100vh - 229px);overflow-y: auto;" name="name1">
                <el-form ref="riskReportMainVo" :model="riskInsInputData.riskReportMainVo" :rules="ruleValidate" :label-width="150">
                  <el-col span="24">
                    <el-col span="8">
                      <el-form-item label="报告编号" prop="riskFileNo">
                        <el-input v-model="riskInsInputData.riskReportMainVo.riskFileNo" disabled></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col span="8">
                      <el-form-item label="投保险类" prop="classCName">
                        <el-input type="text" v-model="riskInsInputData.riskReportMainVo.classCName" disabled></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col span="8">
                      <el-form-item label="投保险种" prop="riskCName">
                        <el-input type="text" v-model="riskInsInputData.riskReportMainVo.riskCName" disabled></el-input>
                      </el-form-item>
                    </el-col>
                  </el-col>
                  <el-col span="24">
                    <el-col span="8">
                      <el-form-item label="查勘机构" prop="explorecomCodeCName"><!--style="width: 100%"-->
                        <el-input v-model="riskInsInputData.riskReportMainVo.explorecomCodeCName" disabled></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col span="8">
                      <el-form-item label="查勘人" prop="explorerCName">
                        <el-input type="text" v-model="riskInsInputData.riskReportMainVo.explorerCName" disabled></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col span="8">
                      <el-form-item label="录入人员" prop="operator">
                        <el-input type="text" v-model="riskInsInputData.riskReportMainVo.operator" disabled></el-input>
                      </el-form-item>
                    </el-col>
                  </el-col>
                  <el-col span="24">
                    <el-col span="8">
                      <el-form-item label="查勘日期" prop="exploreDate">
                        <el-date-picker type="date" v-model="riskInsInputData.riskReportMainVo.exploreDate" placeholder="请输入时间..." style="width: 100%" disabled></el-date-picker>
                      </el-form-item>
                    </el-col>
                    <el-col span="8">
                      <el-form-item label="查勘类别" prop="exploreType">
                        <el-select type="text" v-model="riskInsInputData.riskReportMainVo.exploreType" placeholder="" disabled>
                          <el-option value="1">初勘</el-option>
                          <el-option value="2">复勘</el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col span="8" v-if="riskInsInputData.riskReportMainVo.exploreType === '2'">
                      <el-form-item label="初勘编号" prop="lastRiskFileNo">
                        <el-input type="text" v-model="riskInsInputData.riskReportMainVo.lastRiskFileNo" disabled></el-input>
                      </el-form-item>
                    </el-col>
                  </el-col>
                  <el-col span="24">
                    <el-col span="8">
                      <el-form-item label="被保险人类型" prop="insuredType">
                        <el-select v-model="riskInsInputData.riskReportMainVo.insuredType" placeholder="" disabled>
                          <el-option value="1">个人</el-option>
                          <el-option value="2">团体</el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col span="8">
                      <el-form-item label="被保险人代码" prop="insuredCode">
                        <el-input type="text" v-model="riskInsInputData.riskReportMainVo.insuredCode" disabled></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col span="8">
                      <el-form-item label="被保险人名称" prop="insuredName">
                        <el-input type="text" v-model="riskInsInputData.riskReportMainVo.insuredName" disabled></el-input>
                      </el-form-item>
                    </el-col>
                  </el-col>
                  <el-col span="24">
                    <el-col span="8">
                      <el-form-item label="被保险人性质" prop="unitNature">
                        <el-select v-model="riskInsInputData.riskReportMainVo.unitNature" placeholder="" :disabled=browseFlag>
                          <el-option value="1">行政事业单位及人民团体</el-option>
                          <el-option value="2">国有企业</el-option>
                          <el-option value="3">民营企业</el-option>
                          <el-option value="4">外商投资企业（除台资）</el-option>
                          <el-option value="5">台资企业</el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col span="8">
                      <el-form-item label="以往承保情况" prop="underwriteStatus">
                        <el-select type="text" v-model="riskInsInputData.riskReportMainVo.underwriteStatus" placeholder="" :disabled=browseFlag>
                          <!--<el-option value="">请选择</el-option>-->
                          <el-option value="1">客户首次投保</el-option>
                          <el-option value="2">续保</el-option>
                          <el-option value="3">由其他公司转保</el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col span="8">
                      <el-form-item label="总保险金额" prop="sumAmount">
                        <el-input type="text" v-model="riskInsInputData.riskReportMainVo.sumAmount"  :disabled=browseFlag>
                          <span slot="append">万元</span>
                        </el-input>
                      </el-form-item>
                    </el-col>
                  </el-col>
                  <el-col span="24">
                    <el-col span="8">
                      <el-form-item label="国民经济代码" prop="businessSourceCName">
                        <el-input type="text" v-model="riskInsInputData.riskReportMainVo.businessSourceCName" placeholder="请点击..." @blur="queryData" style="width: 100%" :disabled=browseFlag>
                          <el-button slot="append" i="el-icon-search" @click="codeCodeDialog();" :disabled=browseFlag></el-button>
                        </el-input>
                      </el-form-item>
                    </el-col>
                    <el-col span="8">
                      <el-form-item label="行业分类代码" prop="businessClass">
                        <el-input type="text" v-model="riskInsInputData.riskReportMainVo.businessClass" style="width: 100%" disabled></el-input>
                      </el-form-item>
                    </el-col>
                  </el-col>
                </el-form>
                <Form ref="riskReportMachineListA" :model="riskInsInputData.riskReportMachineList[0]" :rules="ruleValidate1" :label-width="150">
                  <el-col span="24">
                    <el-col span="8">
                      <el-form-item label="是否提供设备投保清单" prop="insuranceFlag" style="height: 50px">
                        <el-select type="text" v-model="riskInsInputData.riskReportMachineList[0].insuranceFlag" style="width: 100%" placeholder="" :disabled=browseFlag>
                          <el-option value="A">是</el-option>
                          <el-option value="B">否</el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col span="8">
                      <el-form-item label="是否存在选择性承保" prop="seleInsured" style="height: 50px">
                        <el-select type="text" v-model="riskInsInputData.riskReportMachineList[0].seleInsured" style="width: 100%" placeholder="" :disabled=browseFlag>
                          <el-option value="A">是</el-option>
                          <el-option value="B">否</el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col span="8">
                      <el-form-item label="是否属于限制承保业务" prop="compLimited" style="height: 50px">
                        <el-select type="text" v-model="riskInsInputData.riskReportMachineList[0].compLimited" style="width: 100%" placeholder="" :disabled=browseFlag>
                          <el-option value="A">是</el-option>
                          <el-option value="B">否</el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                  </el-col>
                </Form>
                <Form ref="riskReportMainVoB" :model="riskInsInputData.riskReportMainVo" :rules="ruleValidate" :label-width="150">
                  <el-col span="24">
                    <el-col span="23">
                      <el-form-item label="查勘地址" prop="addressDetail">
                        <el-input type="text" v-model="riskInsInputData.riskReportMainVo.addressDetail" style="width: 100%"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col span="1" style="padding-left: 10px;">
                      <i class="el-icon-location" @click="queryAddressDetail"></i>
                    </el-col>
                    <!--<el-col span="1" style="padding-left: 10px" v-if="browseFlag">-->
                    <!--<i type="ios-location" class="cameraicon"></i>-->
                    <!--</el-col>-->
                  </el-col>
                </Form>
              </el-tab-pane>
              <el-tab-pane label="风险评估" i="person" style="max-height: calc(100vh - 229px);overflow-y: auto;padding: 15px;" name="name2"><!--style="height: 350px;"-->
                <el-form ref="riskReportMachineList" :model="riskInsInputData.riskReportMachineList[0]" :rules="ruleValidate2" :label-width="140">
                  <el-col span="24">
                    <div class="title">
                      <i class="el-icon-lock"></i>
                      设备自身风险评估：
                    </div>
                  </el-col>
                  <el-col :md="12" :sm="24">
                    <el-form-item label="1）主要设备投入运营的时间：" class="labelLeft rightPad" prop="runYear" :label-width="340">
                      <el-input v-model="riskInsInputData.riskReportMachineList[0].runYear" :disabled=browseFlag>
                        <span slot="append">年</span>
                      </el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :md="12" :sm="24">
                    <el-form-item label="2）是否存在接近或者超过使用年限的设备：" class="labelLeft" prop="overageFlag"  :label-width="340">
                      <el-radio-group v-model="riskInsInputData.riskReportMachineList[0].overageFlag">
                        <el-radio label="A" :disabled=browseFlag>是</el-radio>
                        <el-radio label="B" :disabled=browseFlag>否</el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </el-col>
                  <el-col :md="12" :sm="24">
                    <el-form-item label="3）投保设备是否存在是已知的重大缺陷：" class="labelLeft" prop="seriousDefect" :label-width="340">
                      <el-radio-group v-model="riskInsInputData.riskReportMachineList[0].seriousDefect">
                        <el-radio label="A" :disabled=browseFlag>是</el-radio>
                        <el-radio label="B" :disabled=browseFlag>否</el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </el-col>
                  <el-col :md="12" :sm="24">
                    <el-form-item label="4）关键设备是否有原型机：" class="labelLeft" prop="prototype" :label-width="340">
                      <el-radio-group v-model="riskInsInputData.riskReportMachineList[0].prototype">
                        <el-radio label="A" :disabled=browseFlag>是</el-radio>
                        <el-radio label="B" :disabled=browseFlag>否</el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </el-col>
                  <el-col :md="12" :sm="24">
                    <el-form-item label="5）主要设备是否有合格证书或进出口商品检验证书：" class="labelLeft" prop="cerQualified" :label-width="340">
                      <el-radio-group v-model="riskInsInputData.riskReportMachineList[0].cerQualified">
                        <el-radio label="A" :disabled=browseFlag>是</el-radio>
                        <el-radio label="B" :disabled=browseFlag>否</el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </el-col>
                  <el-col :md="12" :sm="24">
                    <el-form-item label="6）大型关键设备是否有安装试车证书：" class="labelLeft" prop="installTest" :label-width="340">
                      <el-radio-group v-model="riskInsInputData.riskReportMachineList[0].installTest">
                        <el-radio label="A" :disabled=browseFlag>是</el-radio>
                        <el-radio label="B" :disabled=browseFlag>否</el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </el-col>
                  <el-col span="24">
                    <div class="title" style="margin-top: 20px">
                      <i class="el-icon-lock"></i>
                      设备运行风险评估：
                    </div>
                  </el-col>
                  <el-col :md="12" :sm="24">
                    <el-form-item label="1）操作人员是否都经过培训且持证上岗：" class="labelLeft" prop="holderWork" :label-width="340">
                      <el-radio-group v-model="riskInsInputData.riskReportMachineList[0].holderWork">
                        <el-radio label="A" :disabled=browseFlag>是</el-radio>
                        <el-radio label="B" :disabled=browseFlag>否</el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </el-col>
                  <el-col :md="12" :sm="24">
                    <el-form-item label="2）主要设备是否有完备的操作指导书：" class="labelLeft" prop="instruction" :label-width="340">
                      <el-radio-group v-model="riskInsInputData.riskReportMachineList[0].instruction">
                        <el-radio label="A" :disabled=browseFlag>是</el-radio>
                        <el-radio label="B" :disabled=browseFlag>否</el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </el-col>
                  <el-col :md="12" :sm="24">
                    <el-form-item label="3）是否建立安全生产责任制度：" class="labelLeft" prop="proSystem" :label-width="340">
                      <el-radio-group v-model="riskInsInputData.riskReportMachineList[0].proSystem">
                        <el-radio label="A" :disabled=browseFlag>是</el-radio>
                        <el-radio label="B" :disabled=browseFlag>否</el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </el-col>
                  <el-col :md="12" :sm="24">
                    <el-form-item label="4）是否建立设备状态检测制度：" class="labelLeft" prop="testSystem" :label-width="340">
                      <el-radio-group v-model="riskInsInputData.riskReportMachineList[0].testSystem">
                        <el-radio label="A" :disabled=browseFlag>是</el-radio>
                        <el-radio label="B" :disabled=browseFlag>否</el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </el-col>
                  <el-col :md="12" :sm="24">
                    <el-form-item label="5）设备运行周围的照明、湿度及清洁状况是否良好：" class="labelLeft" prop="goodCondition" :label-width="340">
                      <el-radio-group v-model="riskInsInputData.riskReportMachineList[0].goodCondition">
                        <el-radio label="A" :disabled=browseFlag>是</el-radio>
                        <el-radio label="B" :disabled=browseFlag>否</el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </el-col>
                  <el-col :md="12" :sm="24">
                    <el-form-item label="6）设备运行时是否有异常的震动或噪音：" class="labelLeft" prop="noiseFlag" :label-width="340">
                      <el-radio-group v-model="riskInsInputData.riskReportMachineList[0].noiseFlag">
                        <el-radio label="A" :disabled=browseFlag>是</el-radio>
                        <el-radio label="B" :disabled=browseFlag>否</el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </el-col>
                  <el-col :md="12" :sm="24">
                    <el-form-item label="7）设备及设备周围是否有泄漏情况：" class="labelLeft" prop="leak" :label-width="340">
                      <el-radio-group v-model="riskInsInputData.riskReportMachineList[0].leak">
                        <el-radio label="A" :disabled=browseFlag>是</el-radio>
                        <el-radio label="B" :disabled=browseFlag>否</el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </el-col>
                  <el-col :md="12" :sm="24">
                    <el-form-item label="8）设备负荷是否正常：" class="labelLeft" prop="loadEquip" :label-width="340">
                      <el-radio-group v-model="riskInsInputData.riskReportMachineList[0].loadEquip">
                        <el-radio label="A" :disabled=browseFlag>是</el-radio>
                        <el-radio label="B" :disabled=browseFlag>否</el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </el-col>
                  <el-col :md="12" :sm="24">
                    <el-form-item label="9）供水、供电、供气设备是否正常：" class="labelLeft" prop="waterPowerGas" :label-width="340">
                      <el-radio-group v-model="riskInsInputData.riskReportMachineList[0].waterPowerGas">
                        <el-radio label="A" :disabled=browseFlag>是</el-radio>
                        <el-radio label="B" :disabled=browseFlag>否</el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </el-col>
                  <el-col :md="12" :sm="24">
                    <el-form-item label="10）是否有后备供水、供电、供气设备且能够正常运行的：" class="labelLeft" prop="standbyEquip" :label-width="340">
                      <el-radio-group v-model="riskInsInputData.riskReportMachineList[0].standbyEquip">
                        <el-radio label="A" :disabled=browseFlag>是</el-radio>
                        <el-radio label="B" :disabled=browseFlag>否</el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </el-col>
                  <el-col :md="12" :sm="24">
                    <el-form-item label="11）是否有设备运行的记录：" class="labelLeft" prop="runRecord" :label-width="340">
                      <el-radio-group v-model="riskInsInputData.riskReportMachineList[0].runRecord">
                        <el-radio label="A" :disabled=browseFlag>是</el-radio>
                        <el-radio label="B" :disabled=browseFlag>否</el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </el-col>
                  <el-col :md="12" :sm="24">
                    <el-form-item label="12）近三年历史出险记录：" class="labelLeft" prop="historyRecord" :label-width="340">
                      <el-radio-group v-model="riskInsInputData.riskReportMachineList[0].historyRecord">
                        <el-radio label="A" :disabled=browseFlag>是</el-radio>
                        <el-radio label="B" :disabled=browseFlag>否</el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </el-col>
                  <el-col span="24">
                    <div class="title" style="margin-top: 20px">
                      <i class="el-icon-lock"></i>
                      设备维护及保养：
                    </div>
                  </el-col>
                  <el-col :md="12" :sm="24">
                    <el-form-item label="1）是否建立设备维修保养制度：" class="labelLeft" prop="maintenance" :label-width="340">
                      <el-radio-group v-model="riskInsInputData.riskReportMachineList[0].maintenance">
                        <el-radio label="A" :disabled=browseFlag>是</el-radio>
                        <el-radio label="B" :disabled=browseFlag>否</el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </el-col>
                  <el-col :md="12" :sm="24">
                    <el-form-item label="2）是否按照制度定期进行维护保养：" class="labelLeft" prop="byTheSystem" :label-width="340">
                      <el-radio-group v-model="riskInsInputData.riskReportMachineList[0].byTheSystem">
                        <el-radio label="A" :disabled=browseFlag>是</el-radio>
                        <el-radio label="B" :disabled=browseFlag>否</el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </el-col>
                  <el-col :md="12" :sm="24">
                    <el-form-item label="3）主要设备是否有产品保修或保证规定：" class="labelLeft" prop="proWarranty" :label-width="340">
                      <el-radio-group v-model="riskInsInputData.riskReportMachineList[0].proWarranty">
                        <el-radio label="A" :disabled=browseFlag>是</el-radio>
                        <el-radio label="B" :disabled=browseFlag>否</el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </el-col>
                  <el-col :md="12" :sm="24">
                    <el-form-item label="4）是否配备了稳定电压的装置：" class="labelLeft" prop="stableEle" :label-width="340">
                      <el-radio-group v-model="riskInsInputData.riskReportMachineList[0].stableEle">
                        <el-radio label="A" :disabled=browseFlag>是</el-radio>
                        <el-radio label="B" :disabled=browseFlag>否</el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </el-col>
                  <el-col :md="12" :sm="24">
                    <el-form-item label="5）安全保护装置是否有经过测试：" class="labelLeft" prop="protectiveGear" :label-width="340">
                      <el-radio-group v-model="riskInsInputData.riskReportMachineList[0].protectiveGear">
                        <el-radio label="A" :disabled=browseFlag>是</el-radio>
                        <el-radio label="B" :disabled=browseFlag>否</el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </el-col>
                  <el-col :md="12" :sm="24">
                    <el-form-item label="6）是否有书面的设备应急预案：" class="labelLeft" prop="urgencyPlan" :label-width="340">
                      <el-radio-group v-model="riskInsInputData.riskReportMachineList[0].urgencyPlan">
                        <el-radio label="A" :disabled=browseFlag>是</el-radio>
                        <el-radio label="B" :disabled=browseFlag>否</el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </el-col>
                  <el-col :md="12" :sm="24">
                    <el-form-item label="7）主要设备维修商：" class="labelLeft" prop="repairman" :label-width="340">
                      <el-radio-group v-model="riskInsInputData.riskReportMachineList[0].repairman">
                        <el-radio label="A" :disabled=browseFlag>国内维修商</el-radio>
                        <el-radio label="B" :disabled=browseFlag>国外维修商</el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </el-col>
                  <el-col :md="12" :sm="24">
                    <el-form-item label="8）设备关键零部件、易损件是否有备件及备件管理制度：" class="labelLeft" prop="spareParts" :label-width="340">
                      <el-radio-group v-model="riskInsInputData.riskReportMachineList[0].spareParts">
                        <el-radio label="A" :disabled=browseFlag>是</el-radio>
                        <el-radio label="B" :disabled=browseFlag>否</el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </el-col>
                  <el-col span="24" style="margin-top: 20px;">
                    <el-form-item label="最近三年设备保养维修状况" prop="repairSystem" :label-width="340" class="labelLeft">
                      <textarea type="text" v-model="riskInsInputData.riskReportMachineList[0].repairSystem" style="width: 100%" :disabled=browseFlag></textarea>
                    </el-form-item>
                  </el-col>
                  <el-col span="24">
                    <div class="title">
                      <i class="el-icon-lock"></i>
                      是否投保锅炉：
                    </div>
                  </el-col>
                  <el-col :md="12" :sm="24">
                    <el-form-item label="1）是否投保锅炉 ：" class="labelLeft" prop="boilerFlag" :label-width="340">
                      <el-radio-group v-model="riskInsInputData.riskReportMachineList[0].boilerFlag" @on-change="clearShow">
                        <el-radio label="A" :disabled=browseFlag>是</el-radio>
                        <el-radio label="B" :disabled=browseFlag>否</el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </el-col>
                  <el-col :md="12" :sm="24" v-if="riskInsInputData.riskReportMachineList[0].boilerFlag === 'A'">
                    <el-form-item label="2）是否能够全部使用符合标准水质的水：" class="labelLeft" prop="standardWater" :label-width="340">
                      <el-radio-group v-model="riskInsInputData.riskReportMachineList[0].standardWater">
                        <el-radio label="A" :disabled=browseFlag>是</el-radio>
                        <el-radio label="B" :disabled=browseFlag>否</el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </el-col>
                  <el-col :md="12" :sm="24" v-if="riskInsInputData.riskReportMachineList[0].boilerFlag === 'A'">
                    <el-form-item label="3）锅炉使用性质：" class="labelLeft" prop="boilerUsage" :label-width="340">
                      <el-radio-group v-model="riskInsInputData.riskReportMachineList[0].boilerUsage">
                        <el-radio label="A" :disabled=browseFlag>生产用</el-radio>
                        <el-radio label="B" :disabled=browseFlag>生活用</el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </el-col>
                  <el-col :md="12" :sm="24" v-if="riskInsInputData.riskReportMachineList[0].boilerFlag === 'A'">
                    <el-form-item label="4）操作人员是否持有当局或主管部门签发的上岗合格证：" class="labelLeft" prop="operatorCard" :label-width="340">
                      <el-radio-group v-model="riskInsInputData.riskReportMachineList[0].operatorCard">
                        <el-radio label="A" :disabled=browseFlag>是</el-radio>
                        <el-radio label="B" :disabled=browseFlag>否</el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </el-col>
                  <el-col :md="12" :sm="24" v-if="riskInsInputData.riskReportMachineList[0].boilerFlag === 'A'">
                    <el-form-item label="5）是否按相关使用规定进行日常检查、维护及保养：" class="labelLeft" prop="checkBoiler" :label-width="340">
                      <el-radio-group v-model="riskInsInputData.riskReportMachineList[0].checkBoiler">
                        <el-radio label="A" :disabled=browseFlag>是</el-radio>
                        <el-radio label="B" :disabled=browseFlag>否</el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </el-col>
                  <el-col :md="12" :sm="24" v-if="riskInsInputData.riskReportMachineList[0].boilerFlag === 'A'">
                    <el-form-item label="6）最近两年内是否受到过损坏：" class="labelLeft" prop="boilerDamage" :label-width="340">
                      <el-radio-group v-model="riskInsInputData.riskReportMachineList[0].boilerDamage">
                        <el-radio label="A" :disabled=browseFlag>是</el-radio>
                        <el-radio label="B" :disabled=browseFlag>否</el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </el-col>
                  <el-col span="24">
                    <div class="title" style="margin-top: 20px;">
                      <i class="el-icon-lock"></i>
                      扩展风险：
                    </div>
                  </el-col>
                  <el-col el-col :md="12" :sm="24">
                    <el-form-item label="扩展类附加险：" class="labelLeft rightPad" prop="extensionRisk" :label-width="340">
                      <el-input v-model="riskInsInputData.riskReportMachineList[0].extensionRisk" :disabled=browseFlag>
                        <span slot="append">个</span>
                      </el-input>
                    </el-form-item>
                  </el-col>
                </el-form>
              </el-tab-pane>
              <el-tab-pane label="风险综合评价" i="ios-home" style="max-height: calc(100vh - 229px);overflow-y: auto;padding: 15px;" name="name3" ><!--style="height: 350px;"-->
                <el-form ref="riskReportMainVoA" :model="riskInsInputData.riskReportMainVo" :rules="ruleValidate3" :label-width="100">
                  <el-col span="24">
                    <div class="title">
                      <i class="el-icon-lock"></i>
                      风险隐患说明：
                    </div>
                  </el-col>
                  <el-col span="24">
                    <el-form-item label="风险隐患说明" prop="supplementAppraisal">
                      <textarea type="text" v-model="riskInsInputData.riskReportMainVo.supplementAppraisal" style="width: 100%" :disabled=browseFlag></textarea>
                    </el-form-item>
                  </el-col>
                  <el-col span="24">
                    <div class="title">
                      <i class="el-icon-lock"></i>
                      风险评估：
                    </div>
                  </el-col>
                  <el-col :md="12" :sm="24">
                    <el-form-item label="风险评估等级" class="labelLeft" prop="valuation" style="height: 50px">
                      <el-radio-group v-model="riskInsInputData.riskReportMainVo.valuation"  >
                        <el-radio label="A" :disabled=browseFlag>严重</el-radio>
                        <el-radio label="B" :disabled=browseFlag>较严重</el-radio>
                        <el-radio label="C" :disabled=browseFlag>适度</el-radio>
                        <el-radio label="D" :disabled=browseFlag>适度偏下</el-radio>
                        <el-radio label="E" :disabled=browseFlag>轻微</el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </el-col>
                  <el-col :md="12" :sm="24">
                    <el-form-item label="风控建议" class="labelLeft" prop="riskSuggest" style="height: 50px">
                      <el-radio-group v-model="riskInsInputData.riskReportMainVo.riskSuggest" style="width: 100%">
                        <el-radio  label="A" :disabled=browseFlag>谨慎承保</el-radio>
                        <el-radio  label="B" :disabled=browseFlag>提高条件承保</el-radio>
                        <el-radio  label="C" :disabled=browseFlag>竞争性承保</el-radio>
                      </el-radio-group >
                    </el-form-item>
                  </el-col>
                  <el-col span="24">
                    <el-form-item label="防灾防损建议" prop="addMessage">
                      <textarea type="text" v-model="riskInsInputData.riskReportMainVo.addMessage" style="width: 100%" :disabled=browseFlag></textarea>
                    </el-form-item>
                  </el-col>
                  <el-col span="24">
                    <el-form-item label="其他意见" prop="othSuggest">
                      <textarea type="text" v-model="riskInsInputData.riskReportMainVo.othSuggest" style="width: 100%" :disabled=browseFlag></textarea>
                    </el-form-item>
                  </el-col>
                </el-form>
              </el-tab-pane>
            </el-tabs>
          </Row>
        </el-form>
      </el-col>
    <!--    </article>-->
    <!--        <Spin size="large" fix v-if="spinShow"></Spin>-->
      </div>
    </el-card>
    <CurrencyDialog :dialog-config="DialogConfig" @sync-dialog-show-flag="syncDialogShowFlag" @click-on-row="CurrencyDialogClickOnRow"></CurrencyDialog>
    <el-dialog class="mapcompontent" width="100%" height="100%" title="地图" :visible.sync="mapFlag">
      <div>
<!--              <MapCompontent v-if="mapFlag" @transfer="transfer" :config="mapCompontent"></MapCompontent>-->
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="mapFlag = false">取 消</el-button>
        <el-button type="primary" @click="mapFlag = false">确 定</el-button>
      </div>
    </el-dialog>
    <div v-show="reviewedFlag">
      <el-card><!--v-model="reviewedFlag"-->
        <Form ref="riskReportMainVoE" :model="riskInsInputData.riskReportMainVo" :rules="ruleValidate20">
          <el-form-item label="请选择：" :label-width="100" prop="ff">
            <el-select type="text" @on-change="disposal()" v-model="riskInsInputData.riskReportMainVo.ff">
              <el-option v-for="item in (riskInsInputData.riskReportMainVo.underwriteFlag === '9' ? reviewdList3 : reviewdList)" :value="item.value" :key="item.value">{{item.label}}</el-option>
            </el-select>
          </el-form-item>
          <el-form-item v-if="backFlag" :label="suggest" prop="repulsesugggest" :label-width="100">
            <el-input placeholder="请输入意见..." v-model="riskInsInputData.riskReportMainVo.repulsesugggest" type="textarea" :autosize="true"/>
          </el-form-item>
        </Form>
        <div slot="footer">
          <el-button size="large" i = "compose" @click="asyncOK('1')">确定</el-button>
        </div>
        <!--<div v-if="backFlag">
          打回原因：
          <el-input placeholder="请输入打回原因..." v-model="riskInsInputData.riskReportMainVo.repulsesugggest" type="textarea" :autosize="true"/>
        </div>-->
      </el-card>
    </div>
    <div v-show="reviewedFlag2">
    <el-card><!--v-model="reviewedFlag2"-->
      <Form ref="riskReportMainVoF" :model="riskInsInputData.riskReportMainVo" :rules="ruleValidate21">
        <el-form-item label="请选择：" :label-width="100" prop= "bb">
          <el-select type="text" @on-change="disposal2()" v-model="riskInsInputData.riskReportMainVo.bb">
            <el-option v-for="item in reviewdList2" :value="item.value" :key="item.value">{{item.label}}</el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="backFlag" :label="suggest" prop="repulsesugggest" :label-width="100">
          <el-input placeholder="请输入意见..." v-model="riskInsInputData.riskReportMainVo.repulsesugggest" type="textarea" :autosize="true"/>
        </el-form-item>
      </Form>
      <div slot="footer">
        <el-button size="large" i = "compose" @click="asyncOK('2')">确定</el-button>
      </div>
      <!--<div v-if="backFlag">
        打回原因：
        <el-input placeholder="请输入打回原因..." v-model="riskInsInputData.riskReportMainVo.repulsesugggest" type="textarea" :autosize="true"/>
      </div>-->
    </el-card>
    </div>
    <div v-show="reviewedFlag3">
      <el-card > <!--v-model="reviewedFlag3"-->
        <Form ref="riskReportMainVoG" :model="riskInsInputData.riskReportMainVo" :rules="ruleValidate22">
          <el-form-item label="请选择：" :label-width="100" prop="cc">
            <el-select type="text" @on-change="disposal3()" v-model="riskInsInputData.riskReportMainVo.cc">
              <el-option v-for="item in reviewdList3" :value="item.value" :key="item.value">{{item.label}}</el-option>
            </el-select>
          </el-form-item>
          <el-form-item v-if="backFlag" :label="suggest" prop="repulsesugggest" :label-width="100">
            <el-input placeholder="请输入意见..." v-model="riskInsInputData.riskReportMainVo.repulsesugggest" type="textarea" :autosize="true"/>
          </el-form-item>
        </Form>
        <div slot="footer">
          <el-button size="large" i = "compose" @click="asyncOK('3')">确定</el-button>
        </div>
      <!--<div v-if="backFlag">
        打回原因：
        <el-input placeholder="请输入打回原因..." v-model="riskInsInputData.riskReportMainVo.repulsesugggest" type="textarea" :autosize="true"/>
      </div>-->
      </el-card><!--v-model="reviewedFlag3"-->
    </div>
    <div v-show="backFlag2">
      <el-card title="打回原因" :footer-hide="true"><!-- v-model="backFlag2"-->
        <Timeline>
          <div v-for="(item, index) in lctList" :key="index">
            <TimelineItem v-if="item.nodeName ==='报告打回'">
              <p>审核人名称：{{item.operateName}}</p>
              <p>审核时间：{{item.operateTime}}</p>
              <p>打回原因：{{item.repulsesugggest}}</p>
            </TimelineItem>
          </div>
        </Timeline>
      </el-card>
    </div>
    <div v-show="transFlag">
      <el-card class="progressModal"><!--v-model="transFlag"-->
        <div style="text-align:center;">
          <p>{{message}}</p>
        </div>
        <div slot="footer">
          <el-button :type="footerStatus" size="large" long @click="ok">确认</el-button>
        </div>
      </el-card>
    </div>
  </div>
</template>
<script>
  import HeadButtonCommon from './HeadButtonCommon'
  import riskInsInputData from '@/views/riskdata/riskInsInputData'
  import CurrencyDialog from '@/views/Dialog.vue'
  // import MapCompontent from '../MapCompontent.vue'
  import{ queryRiskReport,underwrite, listCodeQuery, temporarySave, getUnderwriteProcess, makeWord, gradeAndSaveDetail } from  '@/api/riskIns'
  // import Dialog from "./Dialog"
  // import iView from 'iview'
  export default {
    name: 'riskInsMachine',
    // components: {Dialog},
    created () {
      // if (this.$route.query.systemFlag === '1') {
      //   this.outerSystemFlag = true
      //   this.postListFlag = false
      // } else {
      //   this.outerSystemFlag = false
      //   this.riskInsInputData.postListStr = this.$store.getters.getUserInfo.postList.toString()
      //   if (this.riskInsInputData.postListStr.indexOf('风控结果查询岗') !== -1) {
      //     this.postListFlag = true
      //   } else {
      //     this.postListFlag = false
      //   }
      // }
      // this.search()
    },
    data () {
      const validateFF = (rule, value, callback) => {
        if (value === '' || value === null || value === undefined) {
          this.riskInsInputData.riskReportMainVo.ff = ''
          callback(new Error('处理项不能为空'))
        } else {
          this.riskInsInputData.riskReportMainVo.ff = value
          callback()
        }
      }
      const validateBB = (rule, value, callback) => {
        if (value === '' || value === null || value === undefined) {
          this.riskInsInputData.riskReportMainVo.bb = ''
          callback(new Error('处理项不能为空'))
        } else {
          this.riskInsInputData.riskReportMainVo.bb = value
          callback()
        }
      }
      const validateCC = (rule, value, callback) => {
        if (value === '' || value === null || value === undefined) {
          this.riskInsInputData.riskReportMainVo.cc = ''
          callback(new Error('处理项不能为空'))
        } else {
          this.riskInsInputData.riskReportMainVo.cc = value
          callback()
        }
      }
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
      const validateSugggest = (rule, value, callback) => {
        if (value === '' || value === null || value === undefined) {
          var message = this.suggest.replace('：', '') + '不能为空'
          callback(new Error(message))
        } else {
          callback()
        }
      }
      /* 校验总保险金额 */
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
            if (value === '0.0000') {
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
      // 校验主要设备运行时间
      const validateRunYear = (rule, value, callback) => {
        // 验证正数
        var reg = /^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/
        if (value !== '' && value !== null) {
          if (value.match(reg) !== null) {
            this.riskInsInputData.riskReportMachineList[0].runYear = parseFloat(value).toFixed(1)
            callback()
          } else {
            value = parseFloat(value).toFixed(1) + ''
            console.log(value)
            if (value === '0.0') {
              this.riskInsInputData.riskReportMachineList[0].runYear = value
              callback()
            } else {
              this.riskInsInputData.riskReportMachineList[0].runYear = ''
              callback(new Error('只能录入正数!'))
            }
          }
        } else {
          callback(new Error('主要设备运行时间不能为空!'))
        }
      }
      const validateExtensionRisk = (rule, value, callback) => {
        // 验证正整数
        var reg = /^[0-9]*[1-9][0-9]*$/
        if (value !== '' && value !== null) {
          if (value.match(reg) === null) {
            this.riskInsInputData.riskReportMachineList[0].extensionRisk = ''
            callback(new Error('只能录入正整数!'))
          } else {
            this.riskInsInputData.riskReportMachineList[0].extensionRisk = value
            callback()
          }
        } else {
          callback(new Error('扩展类附加险不能为空!'))
        }
      }
      return {
        lctList: [],
        transFlag: false,
        backFlag: false,
        backFlag2: false,
        currnetTabPanel: 'name1',
        suggest: '',
        riskFileTitle: '机器损坏险专用风控报告模板',
        editModel: 'edit',
        myChart: '',
        message: '',
        footerStatus: 'default',
        spinShow: false,
        returnButtonState: false,
        editButtonState: false,
        reviewedButtonState: false,
        backButtonState: false,
        reviewedFlag: false,
        reviewedFlag3: false,
        reviewedFlag2: false,
        outerSystemFlag: false,
        importFlag: false,
        browseFlag: false,
        mapFlag: false,
        postListFlag: false,
        // styleObject: {
        //   display: 'inline-block',
        //   color: 'red',
        //   fontSize: '21px',
        //   margin: '0 3px',
        //   verticalAlign: 'middle',
        //   marginTop: '-3px'
        // },
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
        DialogConfig: {
          dialogFlag: false
        },
        mapCompontent: {
          ProCode: '',
          CityCode: '',
          CountryCode: '',
          addressCountry: '',
          addressProvince: '',
          addressCity: '',
          addressDetail: '',
          pointx_2000: '',
          pointy_2000: '',
          editModel: '',
          disabledFlag: false,
          exploreDate: ''
        },
        riskInsInputData: riskInsInputData.a(),
        /* 校验规则、提示语 */
        ruleValidate: {
          sumAmount: [
            {validator: validateSumAmount, type: 'number', required: true, trigger: 'blur'}
          ],
          unitNature: [
            {required: true, message: '请选择被保险人性质', trigger: 'change'}
          ],
          underwriteStatus: [
            {required: true, message: '请选择以往承保情况', trigger: 'change'}
          ],
          businessSourceCName: [
            {required: true, message: '国民经济代码不能为空', trigger: 'change'}
          ],
          businessClass: [
            {required: true, message: '行业分类代码不能为空', trigger: 'change'}
          ]
        },
        ruleValidate1: {
          insuranceFlag: [
            {required: true, message: '是否提供设备投保清单不能为空！', trigger: 'change'}
          ],
          seleInsured: [
            {required: true, message: '是否存在选择性承保不能为空！', trigger: 'change'}
          ],
          compLimited: [
            {required: true, message: '是否属于限制承保业务不能为空！', trigger: 'change'}
          ]
        },
        ruleValidate2: {
          runYear: [
            {validator: validateRunYear, type: 'number', required: true, trigger: 'blur'}
//            {required: true, message: '主要设备运营时间不能为空！', trigger: 'change'}
          ],
          overageFlag: [
            {required: true, message: '是否有接近或超过年限设备不能为空！', trigger: 'change'}
          ],
          seriousDefect: [
            {required: true, message: '设备是否存在已知重大缺陷不能为空！', trigger: 'change'}
          ],
          prototype: [
            {required: true, message: '关键设备是否有原型机不能为空！', trigger: 'change'}
          ],
          cerQualified: [
            {required: true, message: '是否有合格证书或进出口商品检验证书不能为空！', trigger: 'change'}
          ],
          installTest: [
            {required: true, message: '是否有安装试车证书不能为空！', trigger: 'change'}
          ],
          holderWork: [
            {required: true, message: '人员是否经过培训且持证上岗不能为空！', trigger: 'change'}
          ],
          instruction: [
            {required: true, message: '是否有完备操作指导书不能为空！', trigger: 'change'}
          ],
          proSystem: [
            {required: true, message: '是否建立安全生产责任制度不能为空！', trigger: 'change'}
          ],
          testSystem: [
            {required: true, message: '是否建立设备状态检测制度不能为空！', trigger: 'change'}
          ],
          goodCondition: [
            {required: true, message: '周围照明、湿度及清洁状况是否良好不能为空！', trigger: 'change'}
          ],
          noiseFlag: [
            {required: true, message: '是否有异常震动或噪音不能为空！', trigger: 'change'}
          ],
          leak: [
            {required: true, message: '是否有泄漏情况不能为空！', trigger: 'change'}
          ],
          loadEquip: [
            {required: true, message: '设备负荷是否正常不能为空！', trigger: 'change'}
          ],
          waterPowerGas: [
            {required: true, message: '供水、供电、供气是否正常不能为空！', trigger: 'change'}
          ],
          standbyEquip: [
            {required: true, message: '是否有后备供水、供电、供气设备能运行不能为空！', trigger: 'change'}
          ],
          runRecord: [
            {required: true, message: '是否有设备运行记录不能为空！', trigger: 'change'}
          ],
          historyRecord: [
            {required: true, message: '近三年历史出险记录不能为空！', trigger: 'change'}
          ],
          maintenance: [
            {required: true, message: '是否建立设备维修保养制度不能为空！', trigger: 'change'}
          ],
          byTheSystem: [
            {required: true, message: '是否定期维护保养不能为空！', trigger: 'change'}
          ],
          proWarranty: [
            {required: true, message: '是否有产品保修或保证规定不能为空！', trigger: 'change'}
          ],
          stableEle: [
            {required: true, message: '是否配备稳定电压装置不能为空！', trigger: 'change'}
          ],
          protectiveGear: [
            {required: true, message: '安全保护装置是否测试不能为空！', trigger: 'change'}
          ],
          urgencyPlan: [
            {required: true, message: '是否有设备应急预案不能为空！', trigger: 'change'}
          ],
          repairman: [
            {required: true, message: '主要设备维修商不能为空！', trigger: 'change'}
          ],
          spareParts: [
            {required: true, message: '是否有备件及备件管理制度不能为空！', trigger: 'change'}
          ],
          boilerFlag: [
            {required: true, message: '是否投保锅炉不能为空！', trigger: 'change'}
          ],
          standardWater: [
            {required: true, message: '是否全使用标准水质的水不能为空！', trigger: 'change'}
          ],
          boilerUsage: [
            {required: true, message: '锅炉使用性质不能为空！', trigger: 'change'}
          ],
          operatorCard: [
            {required: true, message: '是否有当局或主管部门签发上岗合格证不能为空！', trigger: 'change'}
          ],
          checkBoiler: [
            {required: true, message: '是否按规定日常检查、维护及保养不能为空！', trigger: 'change'}
          ],
          boilerDamage: [
            {required: true, message: '近两年是否受过损坏不能为空！', trigger: 'change'}
          ],
          extensionRisk: [
            {validator: validateExtensionRisk, type: 'number', required: true, trigger: 'blur'}
//            {required: true, message: '扩展类附加险不能为空！', trigger: 'change'}
          ]
        },
        ruleValidate3: {
          valuation: [
            {required: true, message: '风险评估等级不能为空！', trigger: 'change'}
          ],
          riskSuggest: [
            {required: true, message: '风控建议不能为空！', trigger: 'change'}
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
      ok () {
        this.transFlag = false
      },
      transfer (val, val2, val3, val4, val5, val6, val7, val8, val9, val10, val11, val12) {
        if (val === '') {
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
        this.mapCompontent.addressProvince = this.riskInsInputData.riskReportMainVo.addressProvince
        this.mapCompontent.addressCity = this.riskInsInputData.riskReportMainVo.addressCity
        this.mapCompontent.addressCountry = this.riskInsInputData.riskReportMainVo.addressCounty
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
      disposal3 () {
        if (this.riskInsInputData.riskReportMainVo.cc !== '') {
          this.backFlag = true
          if (this.riskInsInputData.riskReportMainVo.cc === 'DH') {
            this.suggest = '打回原因：'
          } else {
            this.suggest = '审核意见：'
          }
          this.resetFieldTip('riskReportMainVoF', 'repulsesugggest')
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
          this.resetFieldTip('riskReportMainVoG', 'repulsesugggest')
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
      AddressDetailCancel () {
//        alert(this.mapCompontentData.addressDetail)
//        this.riskInsInputData.riskReportMainVo.addressDetail = this.mapCompontentData.addressDetail + this.mapCompontentData.address
      },
      /* 公共按钮 */
      HeadButtonEvent (eventType, editType) {
        switch (eventType) {
          case 'TEMPORARYSAVE':
            this.TSDetail()
            break
          case 'REVIEWED':
            this.reviewed()
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
          case 'BACK':
            this.checkBack()
            break
        }
      },
      checkBack () {
        this.backFlag2 = true
        /*查询打回原因*/
        /*查询打回原因*/
        let back = {executionId: this.riskInsInputData.riskReportMainVo.executionId, underwriteFlag: this.riskInsInputData.riskReportMainVo.underwriteFlag}
        getUnderwriteProcess(back).then((response) => {
          this.lctList = response.data
        })
      },
      reviewed () {
        this.riskInsInputData.postListStr = this.$store.getters.getUserInfo.postList.toString()
        if (this.riskInsInputData.postListStr.indexOf('风控报告一级审核岗') !== -1 && this.riskInsInputData.postListStr.indexOf('风控报告二级审核岗') === -1) {
          if (this.riskInsInputData.riskReportMainVo.underwriteFlag === '9') {
            this.reviewedFlag2 = false
            this.$Message.error(this.riskInsInputData.riskReportMainVo.riskFileNo + '处于一级审核通过状态，不支持再次审核')
          } else if (this.riskInsInputData.riskReportMainVo.underwriteFlag === '2') {
            this.reviewedFlag2 = false
            this.$Message.error(this.riskInsInputData.riskReportMainVo.riskFileNo + '处于打回状态，不支持审核')
          } else {
            this.reviewedFlag2 = true
            this.riskInsInputData.riskReportMainVo.bb = ''
            this.riskInsInputData.riskReportMainVo.repulsesugggest = ''
          }
        } else if (this.riskInsInputData.postListStr.indexOf('风控报告一级审核岗') === -1 && this.riskInsInputData.postListStr.indexOf('风控报告二级审核岗') !== -1) {
          this.reviewedFlag3 = true
          this.riskInsInputData.riskReportMainVo.cc = ''
          this.riskInsInputData.riskReportMainVo.repulsesugggest = ''
        } else {
          this.reviewedFlag = true
          this.riskInsInputData.riskReportMainVo.ff = ''
          this.riskInsInputData.riskReportMainVo.repulsesugggest = ''
        }
      },
      makeWord () {
//        this.riskInsInputData.underwriteFlag = '1'
        if (this.riskInsInputData.riskReportMainVo.underwriteFlag !== '1' && this.riskInsInputData.riskReportMainVo.underwriteFlag !== '3') {
          this.$Message.success('该风控报告未审核通过，不允许导出！')
          return
        } else {
          /* 将金额数据恢复成为数字格式 */
          if (this.riskInsInputData.riskReportMainVo.sumAmount !== null && this.riskInsInputData.riskReportMainVo.sumAmount !== '') {
            this.riskInsInputData.riskReportMainVo.sumAmount = this.riskInsInputData.riskReportMainVo.sumAmount.replace(/,/g, '') + ''
          }
          makeWord(this.riskInsInputData).then((response) => {
            if (response !== null) {
              const filePath = response.data
              const url = '/' + filePath.substring(filePath.indexOf('downloadFile'))
              this.$Message.success('导出报告成功！')
              window.location.href = url
            } else {
              this.$Message.success('导出报告失败！')
            }
          }, (response) => {
            this.$Message.success('导出报告异常！')
          })
        }
      },
      /* 修改 */
      alter () {
        this.editButtonState = false
        this.browseFlag = false
      },
      /* 保存 */
      saveRiskIns () {
        let validFlag = false
        this.$refs['riskReportMainVo'].validate((valid) => {
          if (!valid) {
            validFlag = true
          }
        })
        /* 将金额数据恢复成为数字格式 */
        if (this.riskInsInputData.riskReportMainVo.sumAmount !== null && this.riskInsInputData.riskReportMainVo.sumAmount !== '') {
          this.riskInsInputData.riskReportMainVo.sumAmount = this.riskInsInputData.riskReportMainVo.sumAmount.replace(/,/g, '')
        }
        this.$refs['riskReportMainVoA'].validate((valid) => {
          if (!valid) {
            validFlag = true
          }
        })
        this.$refs['riskReportMainVoB'].validate((valid) => {
          if (!valid) {
            validFlag = true
          }
        })
        this.$refs['riskReportMachineList'].validate((valid) => {
          if (!valid) {
            validFlag = true
          }
        })
        this.$refs['riskReportMachineListA'].validate((valid) => {
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
            this.$Message.error('请使用地图选择查勘地址!')
            // this.spinShow = false
            return
          }
          gradeAndSaveDetail(this.riskInsInputData).then((response) => {
            if (response.status === 1) {
              // this.spinShow = false
              this.$Message.success(this.riskInsInputData.riskReportMainVo.riskFileNo + '保存成功！')
              this.$router.push({path: '/riskins_mcsuccess', query: {riskFileNo: this.riskInsInputData.riskReportMainVo.riskFileNo, editModel: 'browse', riskModel: this.riskInsInputData.riskReportMainVo.riskModel, returnButtonState: this.returnButtonState}})
              this.browseFlag = true
              this.editModel = 'browse'
            }
          }, (response) => {
            // error callback
          })
        }
      },
      /* 暂存 */
      TSDetail () {
        // this.spinShow = true
        /* 将金额数据恢复成为数字格式 */
        if (this.riskInsInputData.riskReportMainVo.sumAmount !== null && this.riskInsInputData.riskReportMainVo.sumAmount !== '') {
          this.riskInsInputData.riskReportMainVo.sumAmount = this.riskInsInputData.riskReportMainVo.sumAmount.replace(/,/g, '') + ''
        }
        temporarySave(this.riskInsInputData).then((response) => {
          if (response !== null) {
            parse(response.data.riskReportMainVo)
            parse(response.data.riskReportMachineList)
            this.riskInsInputData = response.data
            if (this.riskInsInputData.riskReportMainVo.sumAmount !== null && this.riskInsInputData.riskReportMainVo.sumAmount !== '') {
              this.riskInsInputData.riskReportMainVo.sumAmount = parseFloat(this.riskInsInputData.riskReportMainVo.sumAmount).toFixed(4) + ''
            }
            this.browseFlag = true
            this.editButtonState = true
            // this.spinShow = false
            this.$router.push({path: '/riskins_tsuccess', query: {riskFileNo: this.riskInsInputData.riskReportMainVo.riskFileNo, editModel: 'browse', riskModel: this.riskInsInputData.riskReportMainVo.riskModel, returnButtonState: this.returnButtonState}})
          }
        }, (response) => {
          // error callback
        })
      },
      /* 返回 */
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
      /* 模态框 */
      codeCodeDialog () {
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
        // this.DialogConfig.requestURL = 'common/codeselect/listCodeQuery'
        // 自定义table表头
        this.DialogConfig.columnTitles = [
          {title: '序号', key: 'index', type: 'index', width: 60, align: 'center'},
          {title: '国民经济代码', key: 'col1', align: 'center'},
          {title: '国民经济行业分类名称', key: 'col2', align: 'center'},
          {title: '行业分类代码', key: 'col3', align: 'center'}
        ]
      },
      /* 同步更新父子组件状态 */
      syncDialogShowFlag (val) {
        this.DialogConfig.dialogFlag = val
      },
      /* 国民经济代码添加change事件 */
      queryData () {
        // alert(111)
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
        listCodeQuery(queryPar).then(response => {
            if (response.data !== null && response.data.result.length === 1) {
              this.riskInsInputData.riskReportMainVo.businessSource = response.data.result[0][0]
              this.riskInsInputData.riskReportMainVo.businessSourceCName = response.data.result[0][1]
              this.riskInsInputData.riskReportMainVo.businessClass = response.data.result[0][2]
            } else if (response.data != null && response.data.result.length > 1) {
              this.codeCodeDialog()
            } else {
              this.riskInsInputData.riskReportMainVo.businessSourceCName = ''
              this.$Message.error('不存在此代码!')
              return
            }
          })
      },
      /* 接收数据 */
      CurrencyDialogClickOnRow (data) {
        this.riskInsInputData.riskReportMainVo.businessSource = data.col1
        this.riskInsInputData.riskReportMainVo.businessSourceCName = data.col2
        this.riskInsInputData.riskReportMainVo.businessClass = data.col3
      },
      /* 调用后台查询 */
      search () {
        // this.spinShow = true
        let riskFileNo = this.$route.query.riskFileNo
        if (this.$route.query.editModel === 'browse') {
          this.browseFlag = true
          this.editModel = 'browse'
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
        var jsonData = ''
        // if (this.outerSystemFlag) {
        //   jsonData = this.$route.query
        // } else {
        jsonData = {
          riskFileNo: riskFileNo
        }
        // }
        queryRiskReport(jsonData).then((response) => {
          if (response.qQexception !== '') {
            this.$router.push({name: 'exception', path: '/exception', params: {ex: response.qQexception}})
          } else {
            parse(response.riskReportMainVo)
            parse(response.riskReportMachineList)
            this.riskInsInputData = response
            if (this.riskInsInputData.riskReportMainVo.underwriteFlag === '1' || this.riskInsInputData.riskReportMainVo.underwriteFlag === '3') {
              this.importFlag = true
            }
            // 查勘机构
            this.riskInsInputData.riskReportMainVo.explorecomCodeCName = this.riskInsInputData.riskReportMainVo.comCodeCName
            if (response.riskReportMainVo.sumAmount !== null && response.riskReportMainVo.sumAmount !== '') {
              this.riskInsInputData.riskReportMainVo.sumAmount = this.common.toThousands(parseFloat(response.riskReportMainVo.sumAmount).toFixed(4)) + ''
            }
            if (response.riskReportMachineList[0].runYear !== null && response.riskReportMachineList[0].runYear !== '') {
              this.riskInsInputData.riskReportMachineList[0].runYear = parseFloat(response.riskReportMachineList[0].runYear).toFixed(1)
            }
            // this.spinShow = false
          }
        }, (response) => {
          // error callback
        })
      },
      underwrite (params, flag) {
        if (params.underwriteFlag === '2') {
          this.$Message.error(params.riskFileNo + '处于打回状态，不支持再次审核')
        } else if (params.underwriteFlag === '1' || params.underwriteFlag === '3') {
          this.$Message.error(params.riskFileNo + '处于审核通过状态，不支持再次审核')
        } else {
          let underwrite = (flag === 'DH' ? '2' : (flag === '4' ? '4' : (flag === '9' ? '9' : '1')))
          let params =  {riskFileNo: params.riskFileNo, executionId: params.executionId, underwriteFlag: underwrite, repulsesugggest: params.repulstesuggges}
          underwrite(params).then((response) => {
            if (response.status === 1) {
              if (underwrite !== '9') {
                var userAgent = navigator.userAgent
                var isIE = userAgent.indexOf('compatible') > -1 && userAgent.indexOf('MSIE') > -1
                var isEdge = userAgent.indexOf('Edge') > -1
                var isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf('rv:11.0') > -1
                // iView.Spin.show({
                //   render: (h) => {
                //     if (isIE || isEdge || isIE11) {
                //       return h('div', [
                //         h('i', {
                //           'class': {'demo-spin-i-load': true},
                //           props: {
                //             type: 'load-c',
                //             size: 36
                //           }
                //         }),
                //         h('div', 'Loading')
                //       ])
                //     } else {
                //       return h('div', [
                //         h('img', {
                //           attrs: {
                //             src: require('@/assets/svg/loading.svg')
                //           }
                //         })
                //       ])
                //     }
                //   }
                // })
                let _self = this

                _self.search()
                // iView.Spin.hide()
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
                this.$router.push({path: '/riskins_passmc', query: {riskFileNo: params.riskFileNo, editModel: 'browse', riskModel: this.riskInsInputData.riskReportMainVo.riskModel}})
              }
            } else {
              this.$Message.error(params.riskFileNo + '处理失败！')
            }
          }, (response) => {
            this.$Message.error(params.riskFileNo + '处理失败！')
          })
        }
      },
      // 隐藏清空
      clearShow () {
        if (this.riskInsInputData.riskReportMachineList[0].boilerFlag === 'B') {
          this.riskInsInputData.riskReportMachineList[0].standardWater = ''
          this.riskInsInputData.riskReportMachineList[0].boilerUsage = ''
          this.riskInsInputData.riskReportMachineList[0].operatorCard = ''
          this.riskInsInputData.riskReportMachineList[0].checkBoiler = ''
          this.riskInsInputData.riskReportMachineList[0].boilerDamage = ''
        }
      }
    },
    components: {HeadButtonCommon, CurrencyDialog} //, MapCompontent
  }

  /* 返回数据格式化方法处理checkbox数组等数据 */
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

<style lang="scss">
  .contentBox{
    height: 100%;
  }
  .box-card{
    height: 100%;
  }
  .title{
    margin: -5px -15px 16px;
    padding: 0 12px;
    font-size: 14px;
    line-height: 36px;
    background-color: #fafdff;
  }
  .updown {
    margin-top: 0px;
    margin-bottom: 0px;
  }
  /*.ivu-card-out{*/
  /*  height: 100vh;*/
  /*}*/
  .mapcompontent{
    .ivu-el-card{
      top: 0;
    }
  }
</style>
