<template>
  <!--火灾风险排查（简化版）-->
  <div>
    <el-card class="ivu-card-height tabcard" style="padding: 0" :class="{'ivu-card-out': outerSystemFlag}">
      <div>
        <div class="updown">
          <HeadButtonCommon :risk-file-title="riskFileTitle" :business-type="editModel" :edit-button-state="editButtonState" :back-button-state="backButtonState" :return-button-state="returnButtonState" :reviewed-button-state="reviewedButtonState" :outer-system-flag="outerSystemFlag" :import-flag="importFlag" @button-event="HeadButtonEvent"></HeadButtonCommon>
        </div>
        <article>
          <el-col style="padding: 0px 10px 0px">
          <el-form ref="riskInsInputData" :model="riskInsInputData" label-width="140px">
            <el-row>
              <el-tabs v-model="currnetTabPanel" :animated=true>
                <el-tab-pane label="基本信息" icon="document-text" style="max-height: calc(100vh - 229px);overflow-y: auto;" name="name1" >
                  <el-form ref="riskReportMainVo" :model="riskInsInputData.riskReportMainVo" label-width="140px">
                    <el-col :span="24">
                    <el-col :span="8">
                    <el-form-item label="报告编号" prop="riskFileNo">
                      <el-input type="text" v-model="riskInsInputData.riskReportMainVo.riskFileNo" disabled ></el-input>
                    </el-form-item>
                    </el-col>
                    <el-col :span="8">
                    <el-form-item label="投保险类" prop="classCName">
                      <el-input type="text" v-model="riskInsInputData.riskReportMainVo.classCName" disabled></el-input>
                    </el-form-item>
                    </el-col>
                    <el-col :span="8">
                    <el-form-item label="投保险种" prop="riskCName">
                      <el-input type="text" v-model="riskInsInputData.riskReportMainVo.riskCName" disabled></el-input>
                    </el-form-item>
                    </el-col>
                    </el-col>
                    <el-col :span="24">
                    <el-col :span="8">
                    <el-form-item label="查勘机构" prop="explorecomCodeCName">
                      <el-input v-model="riskInsInputData.riskReportMainVo.explorecomCodeCName" disabled></el-input>
                    </el-form-item>
                    </el-col>
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
                    </el-col>
                    <el-col :span="24">
                    <el-col :span="8">
                    <el-form-item label="查勘日期" prop="exploreDate">
                      <el-date-picker type="date" v-model="riskInsInputData.riskReportMainVo.exploreDate" placeholder="请输入时间..." style="width: 100%" disabled></el-date-picker>
                    </el-form-item>
                    </el-col>
                    <el-col :span="8">
                    <el-form-item label="查勘类别" prop="exploreType" >
                      <el-select type="text" v-model="riskInsInputData.riskReportMainVo.exploreType" disabled filterable>
                        <el-option value="1" label="初勘"></el-option>
                        <el-option value="2" label="复勘"></el-option>
                      </el-select>
                    </el-form-item>
                    </el-col>
                    <el-col :span="8">
                    <el-form-item label="初勘编号" prop="lastRiskFileNo"  v-if="riskInsInputData.riskReportMainVo.exploreType === '2'">
                      <el-input type="text" v-model="riskInsInputData.riskReportMainVo.lastRiskFileNo" disabled></el-input>
                    </el-form-item>
                    </el-col>
                    </el-col>
                    <el-col :span="24">
                    <el-col :span="8" v-if="riskInsInputData.riskReportMainVo.archivesNo !== '' && riskInsInputData.riskReportMainVo.archivesNo !== null">
                    <el-form-item label="照片档案号" prop="riskCName">
                      <el-input type="text" v-model="riskInsInputData.riskReportMainVo.archivesNo" disabled></el-input>
                    </el-form-item>
                    </el-col>
                    </el-col>
                  </el-form>
                </el-tab-pane>
                <el-tab-pane label="企业基本信息" icon="person" style="height: 500px" name="name2"><!--style="max-height: calc(100vh - 229px);overflow-y: auto;padding: 15px;"-->
                  <el-form ref="riskReportMainVoA" :model="riskInsInputData.riskReportMainVo"  label-width="140px" :rules="ruleValidate1">
                    <el-col :span="24">
                    <el-col :span="8">
                    <el-form-item label="被保险人类型" prop="insuredType">
                      <el-select v-model="riskInsInputData.riskReportMainVo.insuredType"  disabled filterable>
                        <el-option value="1" label="个人"></el-option>
                        <el-option value="2" label="团体"></el-option>
                      </el-select>
                    </el-form-item>
                    </el-col>
                      <el-col :span="8">
                        <el-form-item label="被保险人名称" prop="insuredName">
                          <el-input type="text" v-model="riskInsInputData.riskReportMainVo.insuredName" disabled></el-input>
                        </el-form-item>
                      </el-col>
                    <el-col :span="8">
                    <el-form-item label="被保险人代码" prop="insuredCode">
                      <el-input type="text" v-model="riskInsInputData.riskReportMainVo.insuredCode" disabled></el-input>
                    </el-form-item>
                    </el-col>
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
                    <el-form-item label="以往承保情况" prop="underwriteStatus">
                      <el-select type="text" v-model="riskInsInputData.riskReportMainVo.underwriteStatus" filterable :disabled=browseFlag>
                        <el-option value="1" label="客户首次投保"></el-option>
                        <el-option value="2" label="续保"></el-option>
                        <el-option value="3" label="由其他公司转保"></el-option>
                      </el-select>
                    </el-form-item>
                    </el-col>
                    </el-col>
                    <el-col :span="24">
                    <el-col :span="8">
                    <el-form-item label="国民经济代码" prop="businessSourceCName">
                      <el-input type="text" v-model="riskInsInputData.riskReportMainVo.businessSourceCName"  @on-enter="codeCodeDialog('TradeCode')"  placeholder="请点击..." style="width: 100%" :disabled=browseFlag>
                      <el-button slot="append" icon="el-icon-search"  :disabled=browseFlag  @click="codeCodeDialog('TradeCode');"></el-button>
                      </el-input>
                    </el-form-item>
                    </el-col>
                    <el-col :span="8">
                    <el-form-item label="行业分类代码" prop="businessClass">
                      <el-input type="text" v-model="riskInsInputData.riskReportMainVo.businessClass" style="width: 100%" disabled></el-input>
                    </el-form-item>
                    </el-col>
                    </el-col>
                    <el-col :span="24">
                    <el-col :span="23">
                    <el-form-item label="查勘地址" prop="addressDetail">
                      <el-input type="text" v-model="riskInsInputData.riskReportMainVo.addressDetail"  style="width: 100%" disabled></el-input>
                    </el-form-item>
                    </el-col>
                    <el-col :span="1" style="padding-left: 10px">
                    <i class="el-icon-location-outline" @click.native="queryAddressDetail"></i>
                    </el-col>
                    </el-col>
                    <el-col :span="24">
                      <div class="title">
                        <Icon type="alert-circled"></Icon>
                        历史损失记录：
                      </div>
                    </el-col>
                    <el-col :span="24">
                      <el-col :span="8">
                        <el-form-item label="历史损失记录" prop="historyLoseFlag">
                          <el-select type="text" v-model="riskInsInputData.riskReportMainVo.historyLoseFlag" @on-change="changeHistoryLoseFlag" :disabled=browseFlag>
                            <el-option value="1" label="有"></el-option>
                            <el-option value="0" label="无"></el-option>
                          </el-select>
                        </el-form-item>
                      </el-col>
                    </el-col>
                  </el-form>
                  <el-form ref="riskReportClaimList" :model="riskInsInputData.riskReportClaimList[0]"  label-width="140px" :rules="ruleValidate11">
                    <el-col :span="24" v-if="riskInsInputData.riskReportMainVo.historyLoseFlag === '1'">
                      <el-col :span="24" v-if="loseHistoryFlag">
                        <span style="color:#FF3806;">请添加三年历史损失记录表格内容！</span>
                      </el-col>
                    <table class="mytable" border="0" cellspacing="0" cellpadding="0" style="word-break:break-all;">
                      <thead>
                      <tr>
                        <th style="width: 5%">序号</th>
                        <th style="width: 10%">出险原因</th>
                        <th style="width: 10%">出险时间</th>
                        <th style="width: 20%">出险地址和部位</th>
                        <th style="width: 25%">损失详细描述</th>
                        <th style="width: 10%">有无整改</th>
                        <th style="width: 10%">整改措施</th>
                        <th style="width: 10%">操作</th>
                      </tr>
                      </thead>
                      <tbody>
                      <tr v-for="(riskReportClaim,index) in riskInsInputData.riskReportClaimList" :key="index">
                        <td ><el-input type="text" v-bind:value="index+1" disabled></el-input></td>
                        <td class="text-center">
                          {{riskReportClaim.riskReason}}
                        </td>
                        <td class="text-center">
                          <el-date-picker type="date" v-model="riskReportClaim.riskDate" disabled></el-date-picker>
                        </td>
                        <td class="text-center">{{riskReportClaim.riskPosition}}</td>
                        <td class="text-center">{{riskReportClaim.loseInfo}}</td>
                        <td>
                          <el-select type="text" v-model="riskReportClaim.abarbeitungFlag" placeholder="" disabled>
                            <el-option value='A' label="有"></el-option>
                            <el-option value='B' label="无"></el-option>
                          </el-select>
                        </td>
                        <td>{{riskReportClaim.abarbeitungMeasure}}</td>
                        <td style="line-height:24px;">
                          <el-button type="text" v-on:click="claimDelete(index)" :disabled=browseFlag style="color: #2d8cf0" size = "small">删除</el-button>
                          <el-button type="text" v-on:click="changeClaim(riskReportClaim)" :disabled=browseFlag style="color: #2d8cf0" size = "small">修改</el-button>
                        </td>
                      </tr>
                      </tbody>
                      <tfoot>
                      <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td class="text-center"><!-- v-if="riskInsInputData.riskReportClaimList.length <= 10"-->
                          <el-button type="text" v-on:click="createClaim()" :disabled=browseFlag style="color: #2d8cf0" size = "small">增加</el-button><!--v-show="riskInsInputData.riskReportClaimList.length !== 10"-->
                          <el-form ref="riskReportClaimVo" :rules="ruleValidate7" :model="riskReportClaimVo">
                            <el-dialog :visible.sync="claimModal" width="800" :mask-closable="false" @on-cancel="modalCancel('riskReportClaimVo')">
                              <p slot="header" style="color:#2d8cf0;text-align:center">
                                <Icon type="alert-circled"></Icon>
                                <span>历史损失记录</span>
                              </p>
                              <div style="padding: 10px;">
                                <el-col :span="24">
                                  <el-form-item label="出险原因：" prop="riskReason">
                                    <el-input type="text" v-model="riskReportClaimVo.riskReason" placeholder="请输入出险原因..." style="width: 100%"></el-input>
                                  </el-form-item>
                                </el-col>
                                <el-col :span="24">
                                  <el-form-item label="出险时间：" prop="riskDate" class="checkDate"  :class="{ 'ivu-form-item-error': styles.ivuerro}">
                                    <el-date-picker type="date" v-model="riskReportClaimVo.riskDate" placeholder="请输入时间..." style="width: 100%" :editable="readFlag" @on-change="checkDate" @on-clear="closeDate"></el-date-picker>
                                    <div v-show="readFlag1" class="ivu-form-item-error-tip">出险时间不能为空</div>
                                  </el-form-item>
                                </el-col>
                                <el-col :span="24">
                                  <el-form-item label="出险地址和部位：" prop="riskPosition">
                                    <el-input type="text" v-model="riskReportClaimVo.riskPosition"></el-input>
                                  </el-form-item>
                                </el-col>
                                <el-col :span="24">
                                  <el-form-item label="损失详细描述：" prop="loseInfo">
                                    <el-input type="text" v-model="riskReportClaimVo.loseInfo"></el-input>
                                  </el-form-item>
                                </el-col>
                                <el-col :span="24">
                                  <el-form-item label="有无整改：" prop="abarbeitungFlag">
                                    <el-select v-model="riskReportClaimVo.abarbeitungFlag">
                                      <el-option value='A' label="有"></el-option>
                                      <el-option value='B' label="无"></el-option>
                                    </el-select>
                                  </el-form-item>
                                </el-col>
                                <el-col :span="24">
                                  <el-form-item label="整改措施：" prop="abarbeitungMeasure">
                                    <el-input type="text" v-model="riskReportClaimVo.abarbeitungMeasure"></el-input>
                                  </el-form-item>
                                </el-col>
                              </div>
                              <div slot="footer">
                                <div v-if="this.claim === 'new'">
                                  <el-button size="large" icon = "compose" @click="addClaim">添加</el-button>
                                </div>
                                <div v-if="this.claim === 'edit'">
                                  <el-button size="large" icon = "compose" @click="addClaim">保存</el-button>
                                </div>
                              </div>
                            </el-dialog>
                          </el-form>
                        </td>
                      </tr>
                      </tfoot>
                    </table>
                    </el-col>
                  </el-form>
                </el-tab-pane>
                <el-tab-pane label="建筑" icon="ios-home" style="max-height: calc(100vh - 229px);overflow-y: auto;padding: 15px;" name="name3"  >
                  <el-form ref="riskReportFireDangerPluListA" :model="riskInsInputData.riskReportFireDangerList[0]" label-width="140px" :rules="ruleValidate2">
                    <el-col :span="24">
                      <el-col :span="12">
                        <el-col :span="22">
                          <el-form-item label="防火分隔" prop="fireproofSeparate" label-width="170px">
                            <el-select v-model="riskInsInputData.riskReportFireDangerList[0].fireproofSeparate"  :disabled=browseFlag>
                              <el-option value="A" label="有完整防火墙，防火卷帘门、防火门完好，可闭合"></el-option>
                              <el-option value="B" label="无完整防火墙，防火卷帘门、防火门无法闭合"></el-option>
                            </el-select>
                          </el-form-item>
                        </el-col>
                        <el-col :span="1" style="padding-left: 10px">
                          <i v-if="!showUpload('1.1')" class="cameraicon el-icon-camera" @click.native="buttonCommonEvent('1.1')" aria-readonly="true"></i>
                          <i v-if="showUpload('1.1')" class="cameraicon el-icon-camera-solid" @click.native="buttonCommonEvent('1.1')" aria-readonly="true"></i>
                        </el-col>
                      </el-col>
                      <el-col :span="12">
                        <el-col :span="22">
                          <el-form-item label="建筑结构" prop="buildStructure" label-width="170px">
                            <el-select v-model="riskInsInputData.riskReportFireDangerList[0].buildStructure" filterable :disabled=browseFlag>
                              <el-option value="A" label="混凝土结构"></el-option>
                              <el-option value="B" label="混合结构"></el-option>
                              <el-option value="C" label="钢结构"></el-option>
                              <el-option value="D" label="砖木结构或木结构"></el-option>
                            </el-select>
                          </el-form-item>
                        </el-col>
                        <el-col :span="1" style="padding-left: 10px">
                            <i v-if="!showUpload('1.2')" class="el-icon-camera" @click.native="buttonCommonEvent('1.2')" aria-readonly="true"></i>
                            <i v-if="showUpload('1.2')" class="el-icon-camera-solid" @click.native="buttonCommonEvent('1.2')" aria-readonly="true"></i>
                        </el-col>
                      </el-col>
                    </el-col>
                  </el-form>
                </el-tab-pane>
                <el-tab-pane label="占用性质" icon="ios-flag" style="max-height: calc(100vh - 229px);overflow-y: auto;padding: 15px;" name="name4">
                  <el-form ref="riskReportFireDangerPluListB" :model="riskInsInputData.riskReportFireDangerList[0]"  label-width="140px"   :rules="ruleValidate3">
                    <el-col :span="24">
                    <el-col :span="8">
                    <el-col :span="22">
                    <el-form-item label="主要生产或仓储材料燃烧性质" prop="mainMaterialBurnNature">
                      <el-select type="text"  v-model="riskInsInputData.riskReportFireDangerList[0].mainMaterialBurnNature" filterable :disabled=browseFlag>
                        <el-option value='A' label="">不燃</el-option>
                        <el-option value='B' label="">难燃</el-option>
                        <el-option value='C' label="">可燃</el-option>
                        <el-option value='D' label="">易燃</el-option>
                      </el-select>
                    </el-form-item>
                    </el-col>
                    <el-col :span="1">
                      <i v-if="!showUpload('2.1')" class="el-icon-camera" @click.native="buttonCommonEvent('2.1')" aria-readonly="true"></i>
                      <i v-if="showUpload('2.1')" class="el-icon-camera-solid" @click.native="buttonCommonEvent('2.1')" aria-readonly="true"></i>
                    </el-col>
                    </el-col>

                    <el-col :span="8">
                    <el-col :span="22">
                    <el-form-item label="作业车充电位置" prop="chargePosition">
                      <el-select type="text"  v-model="riskInsInputData.riskReportFireDangerList[0].chargePosition" filterable :disabled=browseFlag>
                        <el-option value='A' label="充电位置在建筑外"></el-option>
                        <el-option value='B' label="充电位置在建筑内单独充电间"></el-option>
                        <el-option value='C' label="与周边可燃物距离2米以上"></el-option>
                        <el-option value='D' label="与周边可燃物距离2米以内"></el-option>
                      </el-select>
                    </el-form-item>
                    </el-col>
                    <el-col :span="1">
                      <i v-if="!showUpload('2.3')" class="el-icon-camera" @click.native="buttonCommonEvent('2.3')" aria-readonly="true"></i>
                      <i v-if="showUpload('2.3')" class="el-icon-camera-solid" @click.native="buttonCommonEvent('2.3')" aria-readonly="true"></i>
                    </el-col>
                    </el-col>
                    <el-col :span="8">
                    <el-form-item label="电气线路投入使用年限" prop="lineYear">
                      <el-select type="text"  v-model="riskInsInputData.riskReportFireDangerList[0].lineYear" filterable :disabled=browseFlag>
                        <el-option value='A' label="0-5年"></el-option>
                        <el-option value='B' label="5-10年"></el-option>
                        <el-option value='C' label="10-15年"></el-option>
                        <el-option value='D' label="15年以上"></el-option>
                      </el-select>
                    </el-form-item>
                    </el-col>
                    </el-col>

                    <el-col :span="23">
                    <el-col :span="15">
                    <el-form-item label="危险工艺部位" prop="dangerProcessPart">
                      <el-checkbox-group v-model="riskInsInputData.riskReportFireDangerList[0].dangerProcessPart" @on-change="isMoreSelect('dangerProcessPart')">
                        <el-checkbox label="A" :disabled=browseFlag><span>无</span></el-checkbox>
                        <el-checkbox label="B" :disabled=browseFlag><span>无尘车间</span></el-checkbox>
                        <el-checkbox label="C" :disabled=browseFlag><span>电镀工艺</span></el-checkbox>
                        <el-checkbox label="D" :disabled=browseFlag><span>明火工艺</span></el-checkbox>
                        <el-checkbox label="E" :disabled=browseFlag><span>高压工艺</span></el-checkbox>
                        <el-checkbox label="F" :disabled=browseFlag><span>高温工段</span></el-checkbox>
                        <el-checkbox label="G" :disabled=browseFlag><span>涂装或喷漆</span></el-checkbox>
                        <el-checkbox label="H" :disabled=browseFlag><span>充放电测试</span></el-checkbox>
                      </el-checkbox-group>
                    </el-form-item>
                    </el-col>
                    <el-col :span="1">
                      <i v-if="!showUpload('2.2')" class="el-icon-camera" @click.native="buttonCommonEvent('2.2')" aria-readonly="true"></i>
                      <i v-if="showUpload('2.2')" class="el-icon-camera-solid" @click.native="buttonCommonEvent('2.2')" aria-readonly="true"></i>
                    </el-col>
                    </el-col>

                    <el-col :span="24">
                    <el-col :span="8">
                    <el-col :span="22">
                    <el-form-item label="生产和仓储场所有其他无关电器设备" prop="proIrrelevantDevice">
                      <el-select type="text" v-model="riskInsInputData.riskReportFireDangerList[0].proIrrelevantDevice" filterable :disabled=browseFlag>
                        <el-option value='A' label="有"></el-option>
                        <el-option value='B' label="无"></el-option>
                      </el-select>
                    </el-form-item>
                    </el-col>
                    <el-col :span="1">
                      <i v-if="!showUpload('2.6')" class="el-icon-camera" @click.native="buttonCommonEvent('2.6')" aria-readonly="true"></i>
                      <i v-if="showUpload('2.6')" class="el-icon-camera-solid" @click.native="buttonCommonEvent('2.6')" aria-readonly="true"></i>
                    </el-col>
                    </el-col>
                    <el-col :span="8">
                    <el-col :span="22">
                    <el-form-item label="仓储区域灯具类型" prop="storageAreaLight">
                      <el-select type="text" v-model="riskInsInputData.riskReportFireDangerList[0].storageAreaLight" filterable :disabled=browseFlag>
                        <el-option value='A' label="防爆灯"></el-option>
                        <el-option value='B' label="冷光灯"></el-option>
                        <el-option value='C' label="其他灯具"></el-option>
                      </el-select>
                    </el-form-item>
                    </el-col>
                    <el-col :span="1">
                      <i v-if="!showUpload('2.5')" class="el-icon-camera" @click.native="buttonCommonEvent('2.5')" aria-readonly="true"></i>
                      <i v-if="showUpload('2.5')" class="el-icon-camera-solid" @click.native="buttonCommonEvent('2.5')" aria-readonly="true"></i>
                    </el-col>
                    </el-col>
                    </el-col>
                  </el-form>
                </el-tab-pane>
                <el-tab-pane label="保护措施" icon="ios-heart" style="max-height: calc(100vh - 229px);overflow-y: auto;padding: 15px;" name="name5">
                  <el-form ref="riskReportFireDangerPluListC" :model="riskInsInputData.riskReportFireDangerList[0]"  label-width="140px" :rules="ruleValidate4">
                    <el-col :span="24">
                    <!--<el-col :span="16">-->
                    <el-form-item label="消防设施" prop="fireFacility">
                      <el-checkbox-group v-model="riskInsInputData.riskReportFireDangerList[0].fireFacility" @on-change="isMoreSelect('fireFacility')">
                        <el-checkbox label='A' :disabled=browseFlag><span>自动灭火系统</span></el-checkbox>
                        <el-checkbox label='B' :disabled=browseFlag><span>火灾报警系统</span></el-checkbox>
                        <el-checkbox label='C' :disabled=browseFlag><span>消火栓</span></el-checkbox>
                        <el-checkbox label='D' :disabled=browseFlag><span>灭火器</span></el-checkbox>
                        <el-checkbox label='E' :disabled=browseFlag><span>无</span></el-checkbox>
                        <i v-if="!showUpload('3.1')" class="el-icon-camera" @click.native="buttonCommonEvent('3.1')" aria-readonly="true"></i>
                        <i v-if="showUpload('3.1')" class="el-icon-camera-solid" @click.native="buttonCommonEvent('3.1')" aria-readonly="true"></i>
                      </el-checkbox-group>
                    </el-form-item>
                    </el-col>

                    <el-col :span="24">
                    <el-col :span="8">
                    <el-col :span="22">
                    <el-form-item label="消防器材通道" prop="fireEquipmentPassage">
                      <el-select type="text"  v-model="riskInsInputData.riskReportFireDangerList[0].fireEquipmentPassage" filterable :disabled=browseFlag>
                        <el-option value='A' label="通畅"></el-option>
                        <el-option value='B' label="部分堵塞"></el-option>
                      </el-select>
                    </el-form-item>
                    </el-col>
                    <el-col :span="1">
                      <i v-if="!showUpload('3.4')" class="el-icon-camera" @click.native="buttonCommonEvent('3.4')" aria-readonly="true"></i>
                      <i v-if="showUpload('3.4')" class="el-icon-camera-solid" @click.native="buttonCommonEvent('3.4')" aria-readonly="true"></i>
                    </el-col>
                    </el-col>
                    <el-col :span="8"  v-if="riskInsInputData.riskReportFireDangerList[0].fireFacility && riskInsInputData.riskReportFireDangerList[0].fireFacility.indexOf('C') !== -1">
                    <el-col :span="22">
                    <el-form-item label="室内消火栓系统" prop="indoorHydrantSystem" label-width="150px">
                      <el-select type="text"  v-model="riskInsInputData.riskReportFireDangerList[0].indoorHydrantSystem" filterable :disabled=browseFlag>
                        <el-option value='A' label="配件齐全"></el-option>
                        <el-option value='B' label="配件缺失"></el-option>
                      </el-select>
                    </el-form-item>
                    </el-col>
                    <el-col :span="1">
                      <i v-if="!showUpload('3.2')" class="el-icon-camera" @click.native="buttonCommonEvent('3.2')" aria-readonly="true"></i>
                      <i v-if="showUpload('3.2')" class="el-icon-camera-solid" @click.native="buttonCommonEvent('3.2')" aria-readonly="true"></i>
                    </el-col>
                    </el-col>
                    <el-col :span="8" v-if="riskInsInputData.riskReportFireDangerList[0].fireFacility && riskInsInputData.riskReportFireDangerList[0].fireFacility.indexOf('D') !== -1">
                    <el-col :span="22">
                    <el-form-item label="灭火器" prop="fireExtinguisher" label-width="150px">
                      <el-select type="text"  v-model="riskInsInputData.riskReportFireDangerList[0].fireExtinguisher" filterable :disabled=browseFlag>
                        <el-option value='A' label="全部有效、配备充足"></el-option>
                        <el-option value='B' label="配备充足，部分无效"></el-option>
                        <el-option value='C' label="配备不充足、部分无效"></el-option>
                      </el-select>
                    </el-form-item>
                    </el-col>
                    <el-col :span="1">
                      <i v-if="!showUpload('3.3')" class="el-icon-camera" @click.native="buttonCommonEvent('3.3')" aria-readonly="true"></i>
                      <i v-if="showUpload('3.3')" class="el-icon-camera-solid" @click.native="buttonCommonEvent('3.3')" aria-readonly="true"></i>
                    </el-col>
                    </el-col>
                    </el-col>

                    <el-col :span="24" >
                    <el-col :span="8"  v-if="riskInsInputData.riskReportFireDangerList[0].fireFacility &&
                    (riskInsInputData.riskReportFireDangerList[0].fireFacility.indexOf('A') !== -1||riskInsInputData.riskReportFireDangerList[0].fireFacility.indexOf('B') !== -1)">
                    <el-col :span="22">
                    <el-form-item label="自动灭火系统、自动报警系统" prop="autoExtinguishSystem" label-width="150px">
                      <el-select type="text"  v-model="riskInsInputData.riskReportFireDangerList[0].autoExtinguishSystem" filterable :disabled=browseFlag>
                        <el-option value='A' label="正常"></el-option>
                        <el-option value='B' label="不正常"></el-option>
                      </el-select>
                    </el-form-item>
                    </el-col>
                    <el-col :span="1">
                      <i v-if="!showUpload('3.5')" class="el-icon-camera" @click.native="buttonCommonEvent('3.5')" aria-readonly="true"></i>
                      <i v-if="showUpload('3.5')" class="el-icon-camera-solid" @click.native="buttonCommonEvent('3.5')" aria-readonly="true"></i>
                    </el-col>
                    </el-col>
                    <el-col :span="8">
                    <el-col :span="22">
                    <el-form-item label="电气线路存在无绝缘布包裹、私拉乱接等现象" prop="electricLineProtect" label-width="150px">
                      <el-select type="text" v-model="riskInsInputData.riskReportFireDangerList[0].electricLineProtect" filterable :disabled=browseFlag>
                        <el-option value='A' label="是"></el-option>
                        <el-option value='B' label="否"></el-option>
                      </el-select>
                    </el-form-item>
                    </el-col>
                    <el-col :span="1">
                      <i v-if="!showUpload('3.6')" class="el-icon-camera" @click.native="buttonCommonEvent('3.6')" aria-readonly="true"></i>
                      <i v-if="showUpload('3.6')" class="el-icon-camera-solid" @click.native="buttonCommonEvent('3.6')" aria-readonly="true"></i>
                    </el-col>
                    </el-col>
                    </el-col>

                  </el-form>
                </el-tab-pane>
                <el-tab-pane label="暴露风险" icon="earth" style="max-height: calc(100vh - 229px);overflow-y: auto;padding: 15px;" name="name6">
                  <el-form ref="riskReportFireDangerPluListD" :model="riskInsInputData.riskReportFireDangerList[0]"  label-width="140px" :rules="ruleValidate5" >
                    <el-col :span="24">
                    <el-col :span="12">
                    <el-col :span="22">
                    <el-form-item label="防火间距" prop="fireSeparation" label-width="150px">
                      <el-select type="text" v-model="riskInsInputData.riskReportFireDangerList[0].fireSeparation"  filterable :disabled=browseFlag>
                        <el-option value="A" label="大于15m"></el-option>
                        <el-option value="B" label="10m-15m"></el-option>
                        <el-option value="C" label="小于10m"> </el-option>
                      </el-select>
                    </el-form-item>
                    </el-col>
                    <el-col :span="1">
                      <i v-if="!showUpload('4.1')" class="el-icon-camera" @click.native="buttonCommonEvent('4.1')" aria-readonly="true"></i>
                      <i v-if="showUpload('4.1')" class="el-icon-camera-solid" @click.native="buttonCommonEvent('4.1')" aria-readonly="true"></i>
                    </el-col>
                    </el-col>
                    <el-col :span="12">
                    <el-col :span="22">
                    <el-form-item label="建筑物间存在物体" prop="bodyBetweenBuild" label-width="150px">
                      <el-select type="text" v-model="riskInsInputData.riskReportFireDangerList[0].bodyBetweenBuild"  filterable :disabled=browseFlag>
                        <el-option value="A" label="可燃物"></el-option>
                        <el-option value="B" label="钢棚"></el-option>
                        <el-option value="C" label="无"></el-option>
                      </el-select>
                    </el-form-item>
                    </el-col>
                    <el-col :span="1">
                      <i v-if="!showUpload('4.2')" class="el-icon-camera" @click.native="buttonCommonEvent('4.2')" aria-readonly="true"></i>
                      <i v-if="showUpload('4.2')" class="el-icon-camera-solid" @click.native="buttonCommonEvent('4.2')" aria-readonly="true"></i>
                    </el-col>
                    </el-col>
                    </el-col>
                  </el-form>
                </el-tab-pane>
                <el-tab-pane label="消防管理" icon="cloud" style="max-height: calc(100vh - 229px);overflow-y: auto;padding: 15px;" name="name7">
                  <el-form ref="riskReportFireDangerPluListE" :model="riskInsInputData.riskReportFireDangerList[0]"  label-width="140px" :rules="ruleValidate6">
                    <el-col :span="24">
                    <el-col :span="8">
                    <el-col :span="22">
                    <el-form-item label="防火巡查、检查制度落实情况" prop="fireCheckHappen">
                      <el-select type="text" v-model="riskInsInputData.riskReportFireDangerList[0].fireCheckHappen"  filterable :disabled=browseFlag>
                        <el-option value="A" label="有，1月/次"></el-option>
                        <el-option value="B" label="有，少于1月/次"></el-option>
                        <el-option value="C" label="无制度"></el-option>
                      </el-select>
                    </el-form-item>
                    </el-col>
                    <el-col :span="1">
                      <i v-if="!showUpload('5.1')" class="el-icon-camera" @click.native="buttonCommonEvent('5.1')" aria-readonly="true"></i>
                      <i v-if="showUpload('5.1')" class="el-icon-camera-solid" @click.native="buttonCommonEvent('5.1')" aria-readonly="true"></i>
                    </el-col>
                    </el-col>
                    <el-col :span="8">
                    <el-col :span="22">
                    <el-form-item label="动火审批制度和落实情况" prop="hotFireApproval">
                      <el-select type="text" v-model="riskInsInputData.riskReportFireDangerList[0].hotFireApproval"  filterable :disabled=browseFlag>
                        <el-option value="A" label="有且落实"></el-option>
                        <el-option value="B" label="有但无落实"></el-option>
                        <el-option value="C" label="无制度"></el-option>
                      </el-select>
                    </el-form-item>
                    </el-col>
                    <el-col :span="1">
                      <i v-if="!showUpload('5.2')" class="el-icon-camera" @click.native="buttonCommonEvent('5.2')" aria-readonly="true"></i>
                      <i v-if="showUpload('5.2')" class="el-icon-camera-solid" @click.native="buttonCommonEvent('5.2')" aria-readonly="true"></i>
                    </el-col>
                    </el-col>
                    <el-col :span="8">
                    <el-col :span="22">
                    <el-form-item label="定期开展消防演练和对员工的消防培训" prop="fireDrill">
                      <el-select type="text" v-model="riskInsInputData.riskReportFireDangerList[0].fireDrill"  filterable :disabled=browseFlag>
                        <el-option value="A" label="至少半年一次"></el-option>
                        <el-option value="B" label="每年1次"></el-option>
                        <el-option value="C" label="无"></el-option>
                      </el-select>
                    </el-form-item>
                    </el-col>
                    <el-col :span="1">
                      <i v-if="!showUpload('5.3')" class="el-icon-camera" @click.native="buttonCommonEvent('5.3')" aria-readonly="true"></i>
                      <i v-if="showUpload('5.3')" class="el-icon-camera-solid" @click.native="buttonCommonEvent('5.3')" aria-readonly="true"></i>
                    </el-col>
                    </el-col>
                    </el-col>
                    <el-col :span="24">
                    <el-col :span="8">
                    <el-col :span="22">
                    <el-form-item label="消防设施维护保养" prop="fireMaintenance">
                      <el-select type="text" v-model="riskInsInputData.riskReportFireDangerList[0].fireMaintenance"  filterable :disabled=browseFlag>
                        <el-option value="A" label="指定单位驻点保养"></el-option>
                        <el-option value="B" label="非驻点定期保养"></el-option>
                        <el-option value="C" label="自行保养"></el-option>
                        <el-option value="D" label="无保养"></el-option>
                      </el-select>
                    </el-form-item>
                    </el-col>
                    <el-col :span="1">
                      <i v-if="!showUpload('5.4')" class="el-icon-camera" @click.native="buttonCommonEvent('5.4')" aria-readonly="true"></i>
                      <i v-if="showUpload('5.4')" class="el-icon-camera-solid" @click.native="buttonCommonEvent('5.4')" aria-readonly="true"></i>
                    </el-col>
                    </el-col>
                    <el-col :span="8">
                    <el-col :span="22">
                    <el-form-item label="禁烟管理情况" prop="noSmokeManage">
                      <el-select type="text" v-model="riskInsInputData.riskReportFireDangerList[0].noSmokeManage"  filterable :disabled=browseFlag>
                        <el-option value="A" label="有制度落实较好"></el-option>
                        <el-option value="B" label="有制度但未落实"></el-option>
                        <el-option value="C" label="无制度"></el-option>
                      </el-select>
                    </el-form-item>
                    </el-col>
                    <el-col :span="1">
                      <i v-if="!showUpload('5.5')" class="el-icon-camera" @click.native="buttonCommonEvent('5.5')" aria-readonly="true"></i>
                      <i v-if="showUpload('5.5')" class="el-icon-camera-solid" @click.native="buttonCommonEvent('5.5')" aria-readonly="true"></i>
                    </el-col>
                    </el-col>
                    <el-col :span="8">
                    <el-col :span="22">
                    <el-form-item label="一年内是否收到相关消防安全管理部门风险警示或整改建议函" prop="rectificateSuggest">
                      <el-select type="text" v-model="riskInsInputData.riskReportFireDangerList[0].rectificateSuggest"  filterable :disabled=browseFlag>
                        <el-option value="A" label="是"></el-option>
                        <el-option value="B" label="否"></el-option>
                      </el-select>
                    </el-form-item>
                    </el-col>
                    <el-col :span="1">
                      <i v-if="!showUpload('5.6')" class="el-icon-camera" @click.native="buttonCommonEvent('5.6')" aria-readonly="true"></i>
                      <i v-if="showUpload('5.6')" class="el-icon-camera-solid" @click.native="buttonCommonEvent('5.6')" aria-readonly="true"></i>
                    </el-col>
                    </el-col>
                    </el-col>
                  </el-form>
                </el-tab-pane>
                <el-tab-pane label="综合风险反馈" icon="image" style="max-height: calc(100vh - 229px);overflow-y: auto;padding: 15px;" name="name8" v-if="riskInsInputData.riskReportMainVo.underwriteFlag !== 'T' && riskInsInputData.riskReportMainVo.underwriteFlag !== 'undifined'">
                  <div v-show="riskInsInputData.riskReportMainVo.underwriteFlag !== 'T'">
                    <el-col :span="24">
                      <div class="title">
                        <Icon type="ios-compose"></Icon>
                        风险防范评分反馈：（<span style="color: #cb2025"> 提示：分数越高表示对应风险越低 </span>）
                      </div>
                    </el-col>
                    <div>
                      <el-col :span="12" style="margin-bottom: 10px;position: relative;height: 300px;">
                        <div id="myChart" style="width:500px;height: 500px;position: absolute;top: 0;left: 0;right: 0;bottom: 0;margin: auto;"></div>
                      </el-col>
                      <el-col :span="12" style="margin-top: 35px;">
                        <el-col :span="24" style="margin-bottom: 8px">
                          请您<span v-bind:style="styleObject">{{riskInsInputData.riskReportMainVo.riskSuggestCName}}</span>
                          <span v-show="postListFlag">综合评分<span v-bind:style="styleObject">{{riskInsInputData.riskReportMainVo.score}}</span></span>
                          <!--</el-col>-->
                        </el-col>
                        <el-col :span="24" class="updown" style="margin-top: 8px">
                          <div v-if = "riskInsInputData.riskReportMainVo.othSuggest != ''">
                            <Icon type="checkmark-circled" class="highLight"></Icon>
                            其他意见：<pre style="padding-left: 20px;margin-top: 8px;height: 100px;overflow-y: auto">{{riskInsInputData.riskReportMainVo.othSuggest}}</pre>
                          </div>
                        </el-col>
                        <el-col :span="24">
                          <Icon type="alert-circled" class="highLight" color="red"></Icon>整改建议：<pre style="color: #333333;font-size: 14px;font-family: 'Microsoft YaHei';margin: 8px 0;padding-left: 20px;height: 150px;overflow-y: auto">{{riskInsInputData.riskReportMainVo.highlightRisk}}</pre>
                        </el-col>
                      </el-col>
                    </div>
                  </div>
                </el-tab-pane>
                <el-tab-pane label="风控影像上传" icon="images" style="max-height: calc(100vh - 229px);overflow-y: auto;padding: 15px;" name="name9" >
                  <FileUploadComponent v-bind:config="FileUpLoadConfig"></FileUploadComponent>
                </el-tab-pane>
              </el-tabs>
            </el-row>
          </el-form>
          </el-col>
        </article>
        <Spin size="large" fix v-if="spinShow"></Spin>
      </div>
    </el-card>
    <CurrencyDialog :dialog-config="DialogConfig" @sync-dialog-show-flag="syncDialogShowFlag" @click-on-row="CurrencyDialogClickOnRow">
    </CurrencyDialog>
    <el-dialog :visible.sync="diaModalFlag" width="770" :mask-closable="false" @on-cancel="cancel">
      <br/>
      <div>
        <FileUploadComponent :config= "FileUpLoadConfig"></FileUploadComponent>
      </div>
      <div slot="footer">
      </div>
    </el-dialog>
    <el-dialog class="mapcompontent" :visible.sync="mapFlag" width="100%" height="100%" :mask-closable="false">
      <br/>
      <div>
        <MapCompontent v-if="mapFlag" @transfer="transfer" :config="mapCompontent"></MapCompontent>
      </div>
      <div slot="footer">
      </div>
    </el-dialog>
    <el-dialog :visible.sync="reviewedFlag">
      <el-form ref="riskReportMainVoE" :model="riskInsInputData.riskReportMainVo" :rules="ruleValidate8">
        <el-form-item label="请选择：" label-width="100px" prop="ff">
          <el-select type="text" @on-change="disposal()" v-model="riskInsInputData.riskReportMainVo.ff">
            <el-option v-for="item in (riskInsInputData.riskReportMainVo.underwriteFlag === '9' ? reviewdList3 : reviewdList)" :value="item.value" :key="item.value">{{item.label}}</el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="backFlag" :label="suggest" prop="repulsesugggest" label-width="100px">
          <el-input placeholder="请输入意见..." v-model="riskInsInputData.riskReportMainVo.repulsesugggest" type="textarea" :autosize="true"/>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button size="large" icon = "compose" @click="asyncOK('1')">确定</el-button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="reviewedFlag2">
      <el-form ref="riskReportMainVoF" :model="riskInsInputData.riskReportMainVo" :rules="ruleValidate9">
        <el-form-item label="请选择：" label-width="100px" prop="bb">
          <el-select type="text" @on-change="disposal2()" v-model="riskInsInputData.riskReportMainVo.bb">
            <el-option v-for="item in reviewdList2" :value="item.value" :key="item.value">{{item.label}}</el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="backFlag" :label="suggest" prop="repulsesugggest" label-width="100px">
          <el-input placeholder="请输入意见..." v-model="riskInsInputData.riskReportMainVo.repulsesugggest" type="textarea" :autosize="true"/>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button size="large" icon = "compose" @click="asyncOK('2')">确定</el-button>
      </div>
      <!--<div v-if="backFlag">
        打回原因：
        <el-input placeholder="请输入打回原因..." v-model="riskInsInputData.riskReportMainVo.repulsesugggest" type="textarea" :autosize="true"/>
      </div>-->
    </el-dialog>
    <el-dialog :visible.sync="reviewedFlag3">
      <el-form ref="riskReportMainVoG" :model="riskInsInputData.riskReportMainVo" :rules="ruleValidate10">
        <el-form-item label="请选择：" label-width="100px" prop="cc">
          <el-select type="text" @on-change="disposal3()" v-model="riskInsInputData.riskReportMainVo.cc">
            <el-option v-for="item in reviewdList3" :value="item.value" :key="item.value">{{item.label}}</el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="backFlag" :label="suggest" prop="repulsesugggest" label-width="100px">
          <el-input placeholder="请输入意见..." v-model="riskInsInputData.riskReportMainVo.repulsesugggest" type="textarea" :autosize="true"/>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button size="large" icon = "compose" @click="asyncOK('3')">确定</el-button>
      </div>
      <!--<div v-if="backFlag">
        打回原因：
        <el-input placeholder="请输入打回原因..." v-model="riskInsInputData.riskReportMainVo.repulsesugggest" type="textarea" :autosize="true"/>
      </div>-->
    </el-dialog>
    <el-dialog title="打回原因" :visible.sync="backFlag2" :footer-hide="true"  >
      <el-timeline>
        <div v-for="(item, index) in lctList">
          <el-timeline-item v-if="item.nodeName ==='报告打回'">
            <p>审核人名称：{{item.operateName}}</p>
            <p>审核时间：{{item.operateTime}}</p>
            <p style="white-space: normal; word-break: break-all;">打回原因：{{item.repulsesugggest}}</p>
          </el-timeline-item>
        </div>
      </el-timeline>
    </el-dialog>
    <el-dialog :visible.sync="transFlag" class="progressModal">
      <div style="text-align:center;">
        <p>{{message}}</p>
      </div>
      <div slot="footer">
        <el-button :type="footerStatus" size="large" long @click="ok">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import {getUnderwriteProcess,queryRiskReport,downloadFireReport,
    temporarySave,gradeAndSaveDetail,underwrite} from '@/api/riskIns'
  import HeadButtonCommon from './HeadButtonCommon'
  import riskInsInputData from '../riskdata/riskInsInputData'
  import CurrencyDialog from '../Dialog.vue'
  import { Loading } from 'element-ui'
//  import FileUploadComponent from '../FileUploadComponent.vue'
//  import IEcharts from 'vue-echarts-v3'
//  import iView from 'iview'
  import MapCompontent from '../MapCompontent.vue'
  export default {
    name: 'RiskInsFireDangerPluralism',
    components: {HeadButtonCommon,
//      IFormItem,
      CurrencyDialog,
//      FileUploadComponent, IEcharts,
      MapCompontent},
    created () {
      this.spinShow = true
      // 页面初始化
      if (this.$route.query.systemFlag === '1') {
        this.outerSystemFlag = true
        this.postListFlag = false
      } else {
        this.outerSystemFlag = false
//        this.riskInsInputData.postListStr = this.$store.getters.getUserInfo.postList.toString()
        if (this.riskInsInputData.postListStr.indexOf('风控结果查询岗') !== -1) {
          this.postListFlag = true
        } else {
          this.postListFlag = false
        }
      }
      this.search()
      this.FileUpLoadConfig.riskModel = this.$route.query.riskModel
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
      const validateSugggest = (rule, value, callback) => {
        if (value === '' || value === null || value === undefined) {
          var message = this.suggest.replace('：', '') + '不能为空'
          callback(new Error(message))
        } else {
          callback()
        }
      }
      //      必传照片校验
      const validateFireproofSeparateFlag = (rule, value, callback) => {
        value = this.riskInsInputData.riskReportFireDangerList[0].fireproofSeparate
        if (value === '' || value === null || value === undefined) {
          callback(new Error('防火分隔不能为空'))
        } else if (this.isActive.isActive1_1 && this.isActive.isActive) {
          callback(new Error('防火分隔的照片为必传项，点击右侧图标上传'))
        } else {
          callback()
        }
      }
      const validateBuildStructureFlag = (rule, value, callback) => {
        value = this.riskInsInputData.riskReportFireDangerList[0].buildStructure
        if (value === '' || value === null || value === undefined) {
          callback(new Error('建筑结构不能为空'))
        } else if (this.isActive.isActive1_2 && this.isActive.isActive) {
          callback(new Error('建筑结构的照片为必传项，点击右侧图标上传'))
        } else {
          callback()
        }
      }
      const validateMainMaterialBurnNatureFlag = (rule, value, callback) => {
        value = this.riskInsInputData.riskReportFireDangerList[0].mainMaterialBurnNature
        if (value === '' || value === null || value === undefined) {
          callback(new Error('主要生产或仓储材料燃烧性质不能为空'))
        } else if (this.isActive.isActive2_1 && this.isActive.isActive) {
          callback(new Error('主要生产或仓储材料燃烧性质的照片为必传项，点击右侧图标上传'))
        } else {
          callback()
        }
      }
      const validateDangerProcessPartFlag = (rule, value, callback) => {
        value = this.riskInsInputData.riskReportFireDangerList[0].dangerProcessPart
        if (value === [] || value === null || value.length === 0) {
          callback(new Error('危险工艺部位不能为空'))
        } else if (this.isActive.isActive2_2 && this.isActive.isActive) {
          callback(new Error('危险工艺部位的照片为必传项，点击右侧图标上传'))
        } else {
          callback()
        }
      }
      const validateStorageAreaLightFlag = (rule, value, callback) => {
        value = this.riskInsInputData.riskReportFireDangerList[0].storageAreaLight
        if (value === '' || value === null || value === undefined) {
          callback(new Error('仓储区域灯具类型不能为空'))
        } else if (this.isActive.isActive2_5 && this.isActive.isActive) {
          callback(new Error('仓储区域灯具类型的照片为必传项，点击右侧图标上传'))
        } else {
          callback()
        }
      }
      const validateFireFacilityFlag = (rule, value, callback) => {
        value = this.riskInsInputData.riskReportFireDangerList[0].fireFacility
        if (value === [] || value === null || value.length === 0) {
          callback(new Error('消防设施不能为空'))
        } else if (this.isActive.isActive3_1 && this.isActive.isActive) {
          callback(new Error('消防设施的照片为必传项，点击右侧图标上传'))
        } else {
          callback()
        }
      }
      const validateFireSeparationFlag = (rule, value, callback) => {
        value = this.riskInsInputData.riskReportFireDangerList[0].fireSeparation
        if (value === '' || value === null || value === undefined) {
          callback(new Error('防火间距不能为空'))
        } else if (this.isActive.isActive4_1 && this.isActive.isActive) {
          callback(new Error('防火间距的照片为必传项，点击右侧图标上传'))
        } else {
          callback()
        }
      }
      const validateBodyBetweenBuildFlag = (rule, value, callback) => {
        value = this.riskInsInputData.riskReportFireDangerList[0].bodyBetweenBuild
        if (value === '' || value === null || value === undefined) {
          callback(new Error('建筑物间存在物体不能为空'))
        } else if (this.isActive.isActive4_2 && this.isActive.isActive) {
          callback(new Error('建筑物间存在物体的照片为必传项，点击右侧图标上传'))
        } else {
          callback()
        }
      }
      const validateFireCheckHappenFlag = (rule, value, callback) => {
        value = this.riskInsInputData.riskReportFireDangerList[0].fireCheckHappen
        if (value === '' || value === null || value === undefined) {
          callback(new Error('防火巡查、检查制度及落实情况不能为空'))
        } else if (this.isActive.isActive5_1 && this.isActive.isActive) {
          callback(new Error('防火巡查、检查制度及落实情况的照片为必传项，点击右侧图标上传'))
        } else {
          callback()
        }
      }
      return {
        lctList: [],
        isActive: {
          isActive: false,
          isActive1_1: false,
          isActive1_2: false,
          isActive2_1: false,
          isActive2_2: false,
          isActive2_5: false,
          isActive3_1: false,
          isActive4_1: false,
          isActive4_2: false,
          isActive5_1: false,
        },
        errorHint: {
//          ['1.1', '1.2', '2.1', '2.2', '2.5', '3.1', '4.1', '4.2', '5.1']
          '1.1': 'riskReportFireDangerPluListA.fireproofSeparate',
          '1.2': 'riskReportFireDangerPluListA.buildStructure',
          '2.1': 'riskReportFireDangerPluListB.mainMaterialBurnNature',
          '2.2': 'riskReportFireDangerPluListB.dangerProcessPart',
          '2.5': 'riskReportFireDangerPluListB.storageAreaLight',
          '3.1': 'riskReportFireDangerPluListC.fireFacility',
          '4.1': 'riskReportFireDangerPluListD.fireSeparation',
          '4.2': 'riskReportFireDangerPluListD.bodyBetweenBuild',
          '5.1': 'riskReportFireDangerPluListE.fireCheckHappen'
        },
        transFlag: false,
        backFlag: false,
        backFlag2: false,
        footerStatus: 'default',
        currnetTabPanel: 'name1',
        suggest: '',
        riskFileTitle: '火灾风险排查模板(简化版)',
        editModel: 'edit',
        myChart: '',
        myChart2: '',
        message: '',
        raderFlag: true,
        spinShow: false,
        returnButtonState: false,
        editButtonState: false,
        reviewedButtonState: false,
        backButtonState: false,
        outerSystemFlag: false,
        importFlag: false,
        loseHistoryFlag: false,
        diaModalFlag: false,
        mapFlag: false,
        reviewedFlag: false,
        reviewedFlag2: false,
        reviewedFlag3: false,
        postListFlag: false,
        address: '',
        addressDetail: '',
        riskInsInputData: riskInsInputData.a(),
        showFlag: false,
        modalFlag: false,
        claimModal: false,
        browseFlag: false,
        readFlag: true,
        readFlag1: false,
        styles: {
          ivuerro: false
        },
        styleObject: {
          display: 'inline-block',
          color: 'red',
          fontSize: '21px',
          margin: '0 3px',
          verticalAlign: 'middle',
          marginTop: '-3px'
        },
        DialogConfig: {
          dialogFlag: false
        },
        riskReportClaimVo: {
          riskReason: '',
          riskDate: '',
          riskPosition: '',
          loseInfo: '',
          abarbeitungFlag: '',
          abarbeitungMeasure: ''
        },
        FileUpLoadConfig: {
          childPath: '',
          riskDcodeList: [],
//          riskDcodeListDel: [],
          riskFileNo: '',
          editModel: '',
          disabledFlag: false,
          riskModel: ''
        },
        mapCompontent: {
          ProCode: '',
          CountryCode: '',
          CityCode: '',
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
        // 区别历史损失记录增加还是修改
        claim: 'new',
        oldValue: [],
        ruleValidate1: {
          unitNature: [
            {required: true, message: '被保险人性质不能为空', trigger: 'change'}
          ],
          underwriteStatus: [
            {required: true, message: '以往承保情况不能为空', trigger: 'change'}
          ],
          businessSourceCName: [
            {required: true, message: '国民经济代码不能为空', trigger: 'change'}
          ],
          businessClass: [
            {required: true, message: '行业分类代码不能为空', trigger: 'change'}
          ],
          historyLoseFlag: [
            {required: true, message: '历史损失记录不能为空', trigger: 'change'}
          ]
        },
        ruleValidate2: {
          fireproofSeparate: [/* message: '防火分隔不能为空',*/
            {validator: validateFireproofSeparateFlag, required: true, trigger: 'change'}
          ],
          buildStructure: [/*message: '建筑结构不能为空',*/
            {validator: validateBuildStructureFlag, required: true, trigger: 'change'}
          ]
        },
        ruleValidate3: {
          mainMaterialBurnNature: [/* message: '主要生产或仓储材料燃烧性质不能为空',*/
            {validator: validateMainMaterialBurnNatureFlag, required: true, trigger: 'change'}
          ],
          dangerProcessPart: [/*message: '危险工艺部位不能为空',*/
            {validator: validateDangerProcessPartFlag, type: 'array', required: true, trigger: 'change'}
          ],
          storageAreaLight: [ /*message: '仓储区域灯具类型不能为空',*/
        {validator: validateStorageAreaLightFlag, required: true, trigger: 'change'}
          ]
        },
        ruleValidate4: {
          fireFacility: [ /*message: '消防设施不能为空',*/
            {validator: validateFireFacilityFlag, type: 'array', required: true, trigger: 'change'}
          ]
        },
        ruleValidate5: {
          fireSeparation: [ /* message: '防火间距不能为空',*/
            {validator: validateFireSeparationFlag, required: true, trigger: 'change'}
          ],
          bodyBetweenBuild: [ /*message: '建筑物间存在物体不能为空',*/
            {validator: validateBodyBetweenBuildFlag, required: true, trigger: 'change'}
          ]
        },
        ruleValidate6: {
          fireCheckHappen: [/*message: '防火巡查、检查制度及落实情况不能为空',*/
            {validator: validateFireCheckHappenFlag, required: true, trigger: 'change'}
            ]
        },
        ruleValidate7: {
          riskReason: [
            {required: true, message: '出险原因不能为空', trigger: 'change'}
          ],
          riskPosition: [
            {required: true, message: '出险地址和部位不能为空', trigger: 'blur'}
          ],
          loseInfo: [
            {required: true, message: '损失详细描述不能为空', trigger: 'blur'}
          ]},
        ruleValidate8: {
          ff: [
            {validator: validateFF, required: true, trigger: 'change'}
          ],
          repulsesugggest: [
            {validator: validateSugggest, required: true, trigger: 'blur'}
          ]
        },
        ruleValidate9: {
          bb: [
            {validator: validateBB, required: true, trigger: 'change'}
          ],
          repulsesugggest: [
            {validator: validateSugggest, required: true, trigger: 'blur'}
          ]
        },
        ruleValidate10: {
          cc: [
            {validator: validateCC, required: true, trigger: 'change'}
          ],
          repulsesugggest: [
            {validator: validateSugggest, required: true, trigger: 'blur'}
          ]
        },
        ruleValidate11: {},
        option: {
          tooltip: {
            show: 'postListFlag',
            trigger: 'item'
          },
          radar: {
            grid: { // 控制图的大小，调整下面这些值就可以，
              x: 30,
              x2: 70,
              y2: 170// y2可以控制 X轴跟Zoom控件之间的间隔，避免以为倾斜后造成 label重叠到zoom上
            },
            radius: 180,
            center: ['50%', '60%'],
            name: {
              textStyle: {
                color: '#fff',
                backgroundColor: '#999',
                borderRadius: 3,
                padding: [3, 5]

              }
            },
            splitArea: {
              areaStyle: {
                color: ['rgba(255,23,33,0.5)',
                  'rgba(255,204,153,0.5)', 'rgba(255,255,204,0.5)',
                  'rgba(153,204,255,0.5)', 'rgba(119,155,255,0.5)']
              }
            },
            indicator: [
              {text: '建筑', max: 100},
              {text: '占用性质', max: 100},
              {text: '保护措施', max: 100},
              {text: '暴露风险', max: 100},
              {text: '消防管理', max: 100}
            ]
          },
          series: [
            {
              name: '标的评估风险值',
              type: 'radar',
              lineStyle: {
                normal: {
                  color: '#FF9900'// 图表中各个图区域的颜色
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
                      position: 'top',
                      fontSize: 10,
                      fontWeight: 700,
                      show: 'postListFlag',
                      /*color: '#16d820'*/
                      color: '#3c3c3c',
                    }
                  }
                }
              ]
            }
          ]
        }
      }
    },
    methods: {
      ok () {
        this.transFlag = false
      },
      // 复选框清空
      isMoreSelect (val) {
        if (val === 'dangerProcessPart') {
          //危险工艺部位多选框判断
          if (this.riskInsInputData.riskReportFireDangerList[0].dangerProcessPart != null) {
            var list = this.riskInsInputData.riskReportFireDangerList[0].dangerProcessPart
            if (list[list.length - 1] === 'A') {
              this.riskInsInputData.riskReportFireDangerList[0].dangerProcessPart = ['A']
            } else if (list[list.length - 1] !== 'A') {
              if (list[0] === 'A') {
                this.riskInsInputData.riskReportFireDangerList[0].dangerProcessPart.splice(0, 1)
              }
            }
          }
        }
        // 消防设施多选框判断
        if (val === 'fireFacility') {
          if (this.riskInsInputData.riskReportFireDangerList[0].fireFacility != null) {
            var listFire = this.riskInsInputData.riskReportFireDangerList[0].fireFacility
            if (listFire[listFire.length - 1] === 'E') {
              this.riskInsInputData.riskReportFireDangerList[0].fireFacility = ['E']
            } else if (listFire[listFire.length - 1] !== 'E') {
              if (listFire[0] === 'E') {
                this.riskInsInputData.riskReportFireDangerList[0].fireFacility.splice(0, 1)
              }
            }
          }
          var valList = this.riskInsInputData.riskReportFireDangerList[0].fireFacility
          if (valList && (valList.indexOf('A') === -1 && valList.indexOf('B') === -1)) {
            this.riskInsInputData.riskReportFireDangerList[0].autoExtinguishSystem = ''
          }
          if (valList && valList.indexOf('C') === -1) {
            this.riskInsInputData.riskReportFireDangerList[0].indoorHydrantSystem = ''
          }
          if (valList && valList.indexOf('D') === -1) {
            this.riskInsInputData.riskReportFireDangerList[0].fireExtinguisher = ''
          }
        }
      },
      //  返回
      returnBefore () {
        if (this.reviewedButtonState === false) {
          this.$router.push({path: '/riskins_query'})
        } else {
          this.$router.push({path: '/riskins_underwrite'})
        }
      },
      //  暂存
      TSDetail () {
        this.spinShow = true
        this.riskInsInputData.riskDcodeList = this.FileUpLoadConfig.riskDcodeList
        temporarySave(this.riskInsInputData).then((response) => {
          if (response !== null) {
            parse(response.data.riskReportMainVo)
            parse(response.data.riskReportFireDangerList)
            parse(response.data.riskReportClaimList)
            parse(response.data.riskDcodeList)
            this.riskInsInputData = response.data
            this.browseFlag = true
            this.editButtonState = true
            this.spinShow = false
            this.$router.push({path: '/riskins_tsuccess', query: {riskFileNo: this.riskInsInputData.riskReportMainVo.riskFileNo, editModel: 'browse', riskModel: this.riskInsInputData.riskReportMainVo.riskModel, returnButtonState: this.returnButtonState}})
          }
        }, (response) => {
          // error callback
        })
      },
      // 保存
      saveRiskIns () {
        let validFlag = false
        this.isActive.isActive = true
        this.$refs['riskReportMainVo'].validate((valid) => {
          if (!valid) {
            validFlag = true
          }
        })
        this.$refs['riskReportMainVoA'].validate((valid) => {
          if (!valid) {
            validFlag = true
          }
        })
        this.$refs['riskReportFireDangerPluListA'].validate((valid) => {
          if (!valid) {
            validFlag = true
          }
        })
        this.$refs['riskReportFireDangerPluListB'].validate((valid) => {
          if (!valid) {
            validFlag = true
          }
        })
        this.$refs['riskReportFireDangerPluListC'].validate((valid) => {
          if (!valid) {
            validFlag = true
          }
        })
        this.$refs['riskReportFireDangerPluListD'].validate((valid) => {
          if (!valid) {
            validFlag = true
          }
        })
        this.$refs['riskReportFireDangerPluListE'].validate((valid) => {
          if (!valid) {
            validFlag = true
          }
        })
        // 校验必录照片
        let vals = ['1.1', '1.2', '2.1', '2.2', '2.5', '3.1', '4.1', '4.2', '5.1']
        for (let val in vals) {
          if (!this.showUploadForValualid(vals[val])) {
            let valtemp = vals[val].replace('.', '_')
            valtemp = 'isActive' + valtemp
            // 必录数组
            this.isActive[valtemp] = false
            this.isActive[valtemp] = true
            validFlag = true
          }
        }
          if (validFlag) {
            this.$Notice.error({
              title: '必录项存在未录入字段或存在未上传影像，请修改！'
            })
            return false
          } else {
            this.riskInsInputData.showTabFlag = false
            if (this.riskInsInputData.riskReportMainVo.historyLoseFlag === '1') {
              if (this.riskInsInputData.riskReportClaimList === [] || this.riskInsInputData.riskReportClaimList === null) {
                this.loseHistoryFlag = true
                this.riskInsInputData.showTabFlag = true
              } else {
                if (this.riskInsInputData.riskReportClaimList.length === 0) {
                  this.loseHistoryFlag = true
                  this.riskInsInputData.showTabFlag = true
                } else {
                  this.loseHistoryFlag = false
                }
              }
              if (this.riskInsInputData.showTabFlag) {
                this.$message.error('存在表格未录入内容!')
                return false
              }
            }
          /*// 验证上传影像
          this.riskInsInputData.riskDcodeList = this.FileUpLoadConfig.riskDcodeList
          const riskDcodeLists = this.riskInsInputData.riskDcodeList
          let pathHaveImageNum = 0
          let fireproofSeparateFlag = false
          let buildingStructureFlag = false
          let mainMaterialBurnNatureFlag = false
          let dangerProcessPartFlag = false
          let storageAreaLightFlag = false
          let fireFacilityFlag = false
          let fireSeparationFlag = false
          let bodyBetweenBuildFlag = false
          let fireCheckHappenFlag = false
          for (let i = 0; i < riskDcodeLists.length; i++) {
            if (riskDcodeLists[i].configList !== null && riskDcodeLists[i].configList.urls.length !== 0) {
              pathHaveImageNum = pathHaveImageNum + 1
              if (riskDcodeLists[i].codeEname === '1.1') {
                fireproofSeparateFlag = true
              } else if (riskDcodeLists[i].codeEname === '1.2') {
                buildingStructureFlag = true
              } else if (riskDcodeLists[i].codeEname === '2.1') {
                mainMaterialBurnNatureFlag = true
              } else if (riskDcodeLists[i].codeEname === '2.2') {
                dangerProcessPartFlag = true
              } else if (riskDcodeLists[i].codeEname === '2.5') {
                storageAreaLightFlag = true
              } else if (riskDcodeLists[i].codeEname === '3.1') {
                fireFacilityFlag = true
              } else if (riskDcodeLists[i].codeEname === '4.1') {
                fireSeparationFlag = true
              } else if (riskDcodeLists[i].codeEname === '4.2') {
                bodyBetweenBuildFlag = true
              } else if (riskDcodeLists[i].codeEname === '5.1') {
                fireCheckHappenFlag = true
              }
            } else {
             //
            }
          }
          if (!fireproofSeparateFlag) {
            this.$message.error('请上传防火分隔的照片，上传图片中必须包含防火分隔!')
            return
          }
          if (!buildingStructureFlag) {
            this.$message.error('请上传建筑结构的照片，上传图片中必须包含建筑结构!')
            return
          }
          if (!mainMaterialBurnNatureFlag) {
            this.$message.error('请上传主要生产或仓储材料燃烧性质的照片，上传图片中必须包含主要生产或仓储材料燃烧性质!')
            return
          }
          if (!dangerProcessPartFlag) {
            this.$message.error('请上传危险工艺部位的照片，上传图片中必须包含危险工艺部位!')
            return
          }
          if (!storageAreaLightFlag) {
            this.$message.error('请上传仓储区域灯具类型的照片，上传图片中必须包含仓储区域灯具类型!')
            return
          }
          if (!fireFacilityFlag) {
            this.$message.error('请上传消防设施的照片，上传图片中必须包含消防设施!')
            return
          }
          if (!fireSeparationFlag) {
            this.$message.error('请上传防火间距的照片，上传图片中必须包含防火间距!')
            return
          }
          if (!bodyBetweenBuildFlag) {
            this.$message.error('请上传建筑物间存在物体的照片，上传图片中必须包含建筑物间存在物体!')
            return
          }
          if (!fireCheckHappenFlag) {
            this.$message.error('请上传防火巡查、检查制度及落实情况的照片，上传图片中必须包含防火巡查、检查制度及落实情况!')
            return
          }*/
         if (this.riskInsInputData.riskReportMainVo.pointy_2000 === '' && this.riskInsInputData.riskReportMainVo.pointx_2000 === '') {
            this.$message.error('请使用地图选择查勘地址!')
            this.spinShow = false
            return
          }
            gradeAndSaveDetail(this.riskInsInputData).then((response) => {
              if (response.status === 1) {
                this.spinShow = false
                this.$message.success(this.riskInsInputData.riskReportMainVo.riskFileNo + '保存成功！')
                this.$router.push({path: '/riskins_success', query: {riskFileNo: this.riskInsInputData.riskReportMainVo.riskFileNo, editModel: 'browse', riskModel: this.riskInsInputData.riskReportMainVo.riskModel, returnButtonState: this.returnButtonState}})
                this.browseFlag = true
                this.editModel = 'browse'
              }
          }, (response) => {
            // error callback
          })
        }
      },
      checkBack () {
        this.backFlag2 = true
        /*查询打回原因*/
        getUnderwriteProcess({executionId: this.riskInsInputData.riskReportMainVo.executionId, underwriteFlag: this.riskInsInputData.riskReportMainVo.underwriteFlag}).then((response) => {
          this.lctList = response.data
        })
      },
      alter () {
        this.editButtonState = false
        this.browseFlag = false
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
          // this.riskInsInputData.riskReportFireDangerList[0] = val3
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
      // 初始化 调用后台查询
      search () {
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
        queryRiskReport(jsonData).then((response) => {
          if (response.qQexception !== '') {
            this.$router.push({name: 'exception', path: '/exception', params: {ex: response.qQexception}})
          } else {
            parse(response.riskReportMainVo)
            parse(response.riskReportFireDangerList)
            parse(response.riskReportClaimList)
            parse(response.riskDcodeList)
            this.riskInsInputData = response
            if (this.riskInsInputData.riskReportMainVo.underwriteFlag === '1' || this.riskInsInputData.riskReportMainVo.underwriteFlag === '3') {
              this.importFlag = true
            }
              this.FileUpLoadConfig.riskDcodeList = this.riskInsInputData.riskDcodeList
            this.FileUpLoadConfig.riskFileNo = riskFileNo
            this.FileUpLoadConfig.editModel = this.editModel
            // 三年历史赔付记录
            if (this.riskInsInputData.riskReportClaimList !== null && this.riskInsInputData.riskReportClaimList.length > 0) {
              this.riskInsInputData.riskReportMainVo.historyLoseFlag = '1'
            }
            // 查勘机构
            this.riskInsInputData.riskReportMainVo.explorecomCodeCName = this.riskInsInputData.riskReportMainVo.comCodeCName
            this.spinShow = false
            if (response.riskReportMainVo.score !== null) {
              // 外系统清分不能根据分数进行承保建议显示
              if (this.riskInsInputData.riskReportMainVo.riskSuggest === null || this.riskInsInputData.riskReportMainVo.riskSuggest === '') {
                if (response.riskReportMainVo.score < 40) {
                  this.riskInsInputData.riskReportMainVo.riskSuggestCName = '谨慎承保'
                  this.riskInsInputData.riskReportMainVo.riskSuggest = 'A'
                  this.styleObject.color = 'red'
                } else if (response.riskReportMainVo.score > 80) {
                  this.riskInsInputData.riskReportMainVo.riskSuggestCName = '竞争性承保'
                  this.riskInsInputData.riskReportMainVo.riskSuggest = 'C'
                  this.styleObject.color = 'green'
                } else {
                  this.riskInsInputData.riskReportMainVo.riskSuggestCName = '提高条件承保'
                  this.riskInsInputData.riskReportMainVo.riskSuggest = 'B'
                  this.styleObject.color = 'orange'
                }
              } else {
                if (response.riskReportMainVo.riskSuggest === 'A') {
                  this.riskInsInputData.riskReportMainVo.riskSuggestCName = '谨慎承保'
                  this.styleObject.color = 'red'
                } else if (response.riskReportMainVo.riskSuggest === 'C') {
                  this.riskInsInputData.riskReportMainVo.riskSuggestCName = '竞争性承保'
                  this.styleObject.color = 'green'
                } else if (response.riskReportMainVo.riskSuggest === 'B') {
                  this.riskInsInputData.riskReportMainVo.riskSuggestCName = '提高条件承保'
                  this.styleObject.color = 'orange'
                }
              }
              this.option.series[0].data[0].value.push(response.riskReportAssessList[0].fireDanger)
              this.option.series[0].data[0].value.push(response.riskReportAssessList[0].waterDanger)
              this.option.series[0].data[0].value.push(response.riskReportAssessList[0].windDanger)
              this.option.series[0].data[0].value.push(response.riskReportAssessList[0].thunderDanger)
              this.option.series[0].data[0].value.push(response.riskReportAssessList[0].snowDanger)
              this.option.series[0].data[0].value.push(response.riskReportAssessList[0].theftDanger)
              this.option.series[0].data[0].value.push(response.riskReportAssessList[0].earthquakeDanger)
              this.option.series[0].data[0].value.push(response.riskReportAssessList[0].geologyDanger)
              this.option.series[0].data[0].label.normal.show = this.postListFlag
              this.myChart.setOption(this.option)
            }
          }
        }, (response) => {
          // error callback
        })
      },
      // 模态框
      /* 关闭模态框重置校验 */
      modalCancel (val) {
        this.$refs[val].resetFields()
      },
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
      // 接收数据
      CurrencyDialogClickOnRow (data) {
        this.riskInsInputData.riskReportMainVo.businessSource = data.col1
        this.riskInsInputData.riskReportMainVo.businessSourceCName = data.col2
        this.riskInsInputData.riskReportMainVo.businessClass = data.col3
      },
      // 隐藏域数据清除
      changeHistoryLoseFlag () {
        if (this.riskInsInputData.riskReportClaimList !== null) {
          if (this.riskInsInputData.riskReportMainVo.historyLoseFlag !== '1') {
            this.riskInsInputData.riskReportClaimList.splice(0, this.riskInsInputData.riskReportClaimList.length)
          }
        }
      },
      //勘察地址
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
      /* 显示是否上传照片 */
      showUpload (val) {
        var result = false
        for (let item of this.FileUpLoadConfig.riskDcodeList) {
          if (val === item.codeEname) {
            if (item.configList !== null && item.configList.configs !== null && item.configList.configs.length !== 0) {
              result = true
              // 已经上传照片，隐藏提示语
              this.clearValidPictureTip(val)
//              this.isActive.isActive = true
              return result
            } else {
              this.addInvalidPictureTip(val)
              return result
            }
          }
        }
        return result
      },
      /* 保存时校验专用判断是否上传照片 */
      showUploadForValualid (val) {
        var result = false
        for (let item of this.FileUpLoadConfig.riskDcodeList) {
          if (val === item.codeEname) {
            if (item.configList !== null && item.configList.configs !== null && item.configList.configs.length !== 0) {
              result = true
              return result
            } else {
//              this.addInvalidPictureTip(val)
              return result
            }
          }
        }
        return result
      },
      /* 影像上传 */
      buttonCommonEvent (val1) {
        this.diaModalFlag = true
        this.FileUpLoadConfig.childPath = val1
        this.FileUpLoadConfig.disabledFlag = true
        //  跳转到影像面板
//        this.currnetTabPanel = 'name9'
      },
      cancel () {
        this.FileUpLoadConfig.childPath = ''
        this.FileUpLoadConfig.disabledFlag = false
      },
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
      // 历史损失信息
      addClaim () {
        this.$refs['riskReportClaimVo'].validate((valid) => {
          if (this.riskReportClaimVo.riskDate === '' || this.riskReportClaimVo.riskDate === null) {
            this.styles.ivuerro = true
            this.readFlag1 = true
            return
          }
          if (valid) {
            this.claimModal = false
            this.loseHistoryFlag = false
            if (this.riskInsInputData.riskReportClaimList === null || this.riskInsInputData.riskReportClaimList === '') {
              this.riskInsInputData.riskReportClaimList = []
            }
            if (this.claim === 'new') {
              this.riskInsInputData.riskReportClaimList.push(this.riskReportClaimVo)
              this.riskReportClaimVo = {
                riskReason: '',
                riskDate: '',
                riskPosition: '',
                loseInfo: '',
                abarbeitungFlag: '',
                abarbeitungMeasure: ''
              }
            } else if (this.claim === 'edit') {
              this.originalHistory.riskReason = this.riskReportClaimVo.riskReason
              this.originalHistory.riskDate = this.riskReportClaimVo.riskDate
              this.originalHistory.riskPosition = this.riskReportClaimVo.riskPosition
              this.originalHistory.loseInfo = this.riskReportClaimVo.loseInfo
              this.originalHistory.abarbeitungFlag = this.riskReportClaimVo.abarbeitungFlag
              this.originalHistory.abarbeitungMeasure = this.riskReportClaimVo.abarbeitungMeasure
            }
          } else {
            return false
          }
        })
      },
      // 历史损失信息
      createClaim () {
        this.claim = 'new'
        this.readFlag = true
        this.readFlag1 = false
        this.styles.ivuerro = false
        this.riskReportClaimVo = {
          riskReason: '',
          riskDate: '',
          riskPosition: '',
          loseInfo: '',
          abarbeitungFlag: '',
          abarbeitungMeasure: ''
        }
        this.$refs['riskReportClaimVo'].resetFields()
        this.claimModal = true
      },
      /* 历史损失信息删除 */
      claimDelete (index) {
        this.riskInsInputData.riskReportClaimList.splice(index, 1)
      },
      /* 历史损失信息修改 */
      changeClaim (History) {
        this.claim = 'edit'
        this.claimModal = true
        this.originalHistory = History
        this.riskReportClaimVo.riskReason = History.riskReason
        this.riskReportClaimVo.riskDate = History.riskDate
        this.riskReportClaimVo.riskPosition = History.riskPosition
        this.riskReportClaimVo.loseInfo = History.loseInfo
        this.riskReportClaimVo.abarbeitungFlag = History.abarbeitungFlag
        this.riskReportClaimVo.abarbeitungMeasure = History.abarbeitungMeasure
      },
      //必录照片
      clearValidPictureTip (val) {
        let valtemp = val.replace('.', '_')
        valtemp = 'isActive' + valtemp
        // 必录数组
        this.isActive[valtemp] = false
      },
      addInvalidPictureTip (val) {
        let valtemp = val.replace('.', '_')
        valtemp = 'isActive' + valtemp
        // 必录数组
        this.isActive[valtemp] = true
      },
      // 查勘日期控制
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
      },
      //报告审核
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
        if (this.riskInsInputData.riskReportMainVo.underwriteFlag !== '1' && this.riskInsInputData.riskReportMainVo.underwriteFlag !== '3') {
          this.$message.success('该风控报告未审核通过，不允许导出！')
          return
        } else {
          this.riskInsInputData.picBase64Info = this.myChart.getDataURL()

          downloadFireReport({
            fireNo: this.riskInsInputData.riskReportMainVo.riskFileNo,
            flag: 'doc'
          }, true)
            .then(res => {
              if (res.status == 1) {
                let path = res.data
                window.open(path, '_blank')
                this.$message.success('导出报告成功！')
              } else {
                this.$message.success('导出报告失败！')
              }
            })
            .catch(() => {
              this.$message.success('导出报告失败！')
            })
        }
      },
      underwrite (params, flag) {
        if (params.underwriteFlag === '2') {
          this.$message.error(params.riskFileNo + '处于打回状态，不支持再次审核')
        } else if (params.underwriteFlag === '1' || params.underwriteFlag === '3') {
          this.$message.error(params.riskFileNo + '处于审核通过状态，不支持再次审核')
        } else {
          let underwrite = (flag === 'DH' ? '2' : (flag === '4' ? '4' : (flag === '9' ? '9' : '1')))
          underwrite({riskFileNo: params.riskFileNo, executionId: params.executionId, underwriteFlag: underwrite, repulsesugggest: params.repulsesugggest}).then((response) => {
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
                this.$router.push({path: '/riskins_pass', query: {underwriteFlag: '1', riskFileNo: params.riskFileNo, editModel: 'browse', riskModel: this.riskInsInputData.riskReportMainVo.riskModel}})
              } else {
                this.$router.push({path: '/riskins_pass', query: {riskFileNo: params.riskFileNo, editModel: 'browse', riskModel: this.riskInsInputData.riskReportMainVo.riskModel}})
              }
            } else {
              this.$message.error(params.riskFileNo + '处理失败！')
            }
          }, (response) => {
            this.$message.error(params.riskFileNo + '处理失败！')
          })
        }
      },
      //提交审核处理
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
      resetFieldTip(name, filedName) {
        this.$refs[name].fields.forEach(function (e) {
          if (e.prop === filedName) {
            e.resetField()
          }
        })
      }
    },
    /* ECharts图表 */
    mounted () {
      this.myChart = this.$echarts.init(document.getElementById('myChart'))
      this.myChart.setOption(this.option)
    },
    computed: {
      isActive1_1() {
        return this.isActive.isActive1_1
      },
      isActive1_2() {
        return this.isActive.isActive1_2
      },
      isActive2_1() {
        return this.isActive.isActive2_1
      },
      isActive2_2() {
        return this.isActive.isActive2_2
      },
      isActive2_5() {
        return this.isActive.isActive2_5
      },
      isActive3_1() {
        return this.isActive.isActive3_1
      },
      isActive4_1() {
        return this.isActive.isActive4_1
      },
      isActive4_2() {
        return this.isActive.isActive4_2
      },
      isActive5_1() {
        return this.isActive.isActive5_1
      },
    },
    watch: {
      isActive1_1: function(val, oldVal) {
        if (this.isActive.isActive) {
          var items = this.errorHint['1.1'].split('.')
          this.$refs[items[0]].validateField(items[1])
        }
      },
      isActive1_2: function(val, oldVal) {
        if (this.isActive.isActive) {
          var items = this.errorHint['1.2'].split('.')
          this.$refs[items[0]].validateField(items[1])
        }
      },
      isActive2_1: function(val, oldVal) {
        if (this.isActive.isActive) {
          var items = this.errorHint['2.1'].split('.')
          this.$refs[items[0]].validateField(items[1])
        }
      },
      isActive2_2: function(val, oldVal) {
        if (this.isActive.isActive) {
          var items = this.errorHint['2.2'].split('.')
          this.$refs[items[0]].validateField(items[1])
        }
      },
      isActive2_5: function(val, oldVal) {
        if (this.isActive.isActive) {
          var items = this.errorHint['2.5'].split('.')
          this.$refs[items[0]].validateField(items[1])
        }
      },
      isActive3_1: function(val, oldVal) {
        if (this.isActive.isActive) {
          var items = this.errorHint['3.1'].split('.')
          this.$refs[items[0]].validateField(items[1])
        }
      },
      isActive4_1: function(val, oldVal) {
        if (this.isActive.isActive) {
          var items = this.errorHint['4.1'].split('.')
          this.$refs[items[0]].validateField(items[1])
        }
      },
      isActive4_2: function(val, oldVal) {
        if (this.isActive.isActive) {
          var items = this.errorHint['4.2'].split('.')
          this.$refs[items[0]].validateField(items[1])
        }
      },
      isActive5_1: function(val, oldVal) {
        if (this.isActive.isActive) {
          var items = this.errorHint['5.1'].split('.')
          this.$refs[items[0]].validateField(items[1])
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
                if (obj[index].indexOf('""')) {
                  obj[index] = obj[index].replace(/""/g, '"')
                }
                obj[index] = JSON.parse(obj[index])
              }
            }
          }
        } else if (data[key] instanceof Object) {
          for (let ikey in data[key]) {
            if (typeof (data[key][ikey]) === 'string' && data[key][ikey].match(/^\[(.*)\]$/)) {
              if (data[key][ikey].indexOf('""')) {
                data[key][ikey] = data[key][ikey].replace(/""/g, '"')
              }
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
  .title{
    margin: -5px -15px 16px;
    padding: 0 12px;
    font-size: 14px;
    line-height: 36px;
    background-color: #fafdff;
  }
  .cameraicon{
    font-size: 20px;
    margin-top: 9px;
    margin-left: 8px
  }
  .ivu-card-out{
    height: 100vh;
  }
  .mapcompontent{
    .ivu-modal{
      top: 0;
    }
  }
</style>
