<template>
  <div>
    <el-card class="ivu-card-height tabcard" style="padding: 0" :class="{'ivu-card-out': outerSystemFlag}">
      <div>
        <div class="updown">
          <HeadButtonCommon :risk-file-title="riskFileTitle" :business-type="editModel" :edit-button-state="editButtonState" :back-button-state="backButtonState" :return-button-state="returnButtonState" :reviewed-button-state="reviewedButtonState" :outer-system-flag="outerSystemFlag" :import-flag="importFlag" @button-event="HeadButtonEvent"></HeadButtonCommon>
        </div>
        <article>
          <el-col style="padding: 0px 10px 0px">
            <el-form ref="riskInsInputData" :model="riskInsInputData" :rules="ruleValidate" label-width="140px">
              <el-row>
                <el-tabs v-model="currnetTabPanel" :animated=true>
                  <el-tab-pane label="基本信息" icon="el-icon-document" style="max-height: calc(100vh - 229px);overflow-y: auto;" name="name1"><!--style="height: 350px;"-->
                    <el-form ref="riskReportMainVo" :model="riskInsInputData.riskReportMainVo" label-width="140px" :rules="ruleValidate1">
                      <el-col :span="24">
                        <el-col :span="8">
                          <el-form-item label="报告编号" prop="riskFileNo"><!--style="width: 100%"-->
                            <el-input type="text" v-model="riskInsInputData.riskReportMainVo.riskFileNo" disabled></el-input>
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
                          <el-form-item label="查勘机构" prop="explorecomCodeCName"><!--style="width: 100%"-->
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
                          <el-form-item label="查勘类别" prop="exploreType">
                            <el-select type="text" v-model="riskInsInputData.riskReportMainVo.exploreType" disabled filterable>
                              <el-option label="请选择"></el-option>
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
                          <el-form-item label="总保险金额" prop="sumAmount">
                            <el-input type="text" v-model="riskInsInputData.riskReportMainVo.sumAmount" placeholder="" style="width: 100%" :disabled=browseFlag>
                              <span slot="append">万元</span>
                            </el-input>
                          </el-form-item>
                        </el-col>
                        <!--<el-col :span="8">-->
                        <!--<el-form-item label="slect框单位" prop="sumAmount" class="select-unit">-->
                        <!--<el-select type="text" v-model="riskReportMainVo.exploreType" filterable>-->
                        <!--<el-option value="1">初勘</el-option>-->
                        <!--<el-option value="2">复勘</el-option>-->
                        <!--</el-select>-->
                        <!--<div class="unit">-->
                        <!--<span>万元</span>-->
                        <!--</div>-->
                        <!--</el-form-item>-->
                        <!--</el-col>-->
                        <el-col :span="8">
                          <el-form-item label="存货比例" prop="stockRate">
                            <el-input type="text" v-model="riskInsInputData.riskReportMainVo.stockRate" :disabled=browseFlag><span slot="append">%</span></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="8" v-if="riskInsInputData.riskReportMainVo.archivesNo !== '' && riskInsInputData.riskReportMainVo.archivesNo !== null">
                          <el-form-item label="照片档案号" prop="riskCName">
                            <el-input type="text" v-model="riskInsInputData.riskReportMainVo.archivesNo" disabled></el-input>
                          </el-form-item>
                        </el-col>
                      </el-col>
                    </el-form>
                  </el-tab-pane>
                  <el-tab-pane label="企业基本信息" icon="person" style="max-height: calc(100vh - 229px);overflow-y: auto;padding: 15px;" name="name2"><!--style="height: 350px;"-->
                    <el-form ref="riskReportMainVoA" :model="riskInsInputData.riskReportMainVo"  label-width="140px" :rules="ruleValidate2">
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
                          <el-col :span="1">
                            <i v-if="!showUpload('1.1')" class="el-icon-camera" @click.native="buttonCommonEvent('1.1')" aria-readonly="true"></i>
                            <i v-if="showUpload('1.1')" class="el-icon-camera-solid" @click.native="buttonCommonEvent('1.1')" aria-readonly="true"></i>
                          </el-col>
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
                          <el-col :span="22">
                            <el-form-item label="以往承保情况" prop="underwriteStatus">
                              <el-select type="text" v-model="riskInsInputData.riskReportMainVo.underwriteStatus" filterable :disabled=browseFlag>
                                <el-option value="1" label="客户首次投保"></el-option>
                                <el-option value="2" label="续保"></el-option>
                                <el-option value="3" label="由其他公司转保"></el-option>
                              </el-select>
                            </el-form-item>
                          </el-col>
                        </el-col>
                      </el-col>
                      <el-col :span="24">
                        <el-col :span="8">
                          <el-form-item label="国民经济代码" prop="businessSourceCName"><!--:style="{marginTop:margin}"-->
                            <el-input type="text" v-model="riskInsInputData.riskReportMainVo.businessSourceCName" @on-enter="codeCodeDialog('TradeCode')" placeholder="请点击..." style="width: 100%" :disabled=browseFlag>
                              <el-button slot="append" icon="ios-search" @click="codeCodeDialog('TradeCode');" :disabled=browseFlag></el-button>
                            </el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="8">
                          <el-col :span="22">
                            <el-form-item label="行业分类代码" prop="businessClass">
                              <el-input type="text" v-model="riskInsInputData.riskReportMainVo.businessClass" style="width: 100%" disabled></el-input>
                            </el-form-item>
                          </el-col>
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
                    </el-form>
                    <el-form ref="riskReportAddressList" :model="riskInsInputData.riskReportAddressList[0]"  label-width="140px" :rules="ruleValidate3">
                      <el-col :span="24">
                        <div class="title">
                          <i class="el-icon-location-outline"></i>
                          标的地址：
                        </div>
                      </el-col>
                      <el-col :span="24" v-if="itemAddressFlag">
                        <span style="color:#FF3806;">请添加标的地址表格内容！</span>
                      </el-col>
                      <el-col :span="24">
                        <table class="mytable" border="0" cellspacing="0" cellpadding="0">
                          <thead>
                          <tr>
                            <th style="width: 5%">序号</th>
                            <th style="width: 85%">标的地址</th>
                            <th style="width: 10%">操作</th>
                          </tr>
                          </thead>
                          <tbody>
                          <tr v-for="(riskReportAddress,index) in riskInsInputData.riskReportAddressList">
                            <td style="width: 10%"><el-input type="text" class="text-center" v-bind:value="index+1" disabled></el-input></td>
                            <td style="width: 80%"><el-input type="text" v-model="riskReportAddress.itemAddress" disabled></el-input></td>
                            <td style="width:10%">
                              <el-button type="text" v-on:click="riskInsDelete(index)" :disabled=browseFlag style="color: #2d8cf0" size = "small">删除</el-button><!--class="fa fa-remove text-center"-->
                            </td><!--style="width: 10%;color:#D8504B;"-->
                          </tr>
                          </tbody>
                          <tfoot>
                          <tr>
                            <td style="width:10%"></td>
                            <td style="width:80%"></td>
                            <td style="width:10%" class="text-center"><!--;color:#D8504B;-->
                              <el-button type="text" v-on:click="riskInsAddress()" :disabled=browseFlag style="color: #2d8cf0" size = "small">增加</el-button>
                              <el-form ref="itemAddressVo" :rules="ruleValidate15" :model="itemAddressVo">
                                <el-dialog :visible.sync="modalFlag" width="800" :close-on-click-modal="false" @on-cancel="modalCancel('itemAddressVo')">
                                  <p slot="header" style="color:#2d8cf0;text-align:center">
                                    <i class="el-icon-location-outline"></i>
                                    <span>标的地址</span>
                                  </p>
                                  <div style="padding: 10px;">
                                    <el-form-item label="标的地址：" prop="itemAddress">
                                      <el-input type="text" v-model="itemAddressVo.itemAddress"></el-input>
                                    </el-form-item>
                                  </div>
                                  <div slot="footer">
                                    <el-button size="large" icon = "el-icon-edit-outline" @click="addAdress">添加</el-button>
                                  </div>
                                </el-dialog>
                              </el-form>
                            </td>
                          </tr>
                          </tfoot>
                        </table>
                      </el-col>
                    </el-form>
                    <el-form ref="riskReportClaimList" :model="riskInsInputData.riskReportClaimList[0]"  label-width="140px" :rules="ruleValidate4">
                      <el-col :span="24">
                        <div class="title">
                          <Icon type="alert-circled"></Icon>
                          历史损失记录：
                        </div>
                      </el-col>
                      <el-col :span="24">
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
                              <!--<el-input type="text"  v-model="riskReportClaim.riskReason" disabled></el-input>-->
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
                          <tr><!--v-if="riskInsInputData.riskReportClaimList.length <= 10"-->
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td class="text-center"><!-- v-if="riskInsInputData.riskReportClaimList.length <= 10"-->
                              <el-button type="text" v-on:click="createClaim()" :disabled=browseFlag style="color: #2d8cf0" size = "small">增加</el-button><!--v-show="riskInsInputData.riskReportClaimList.length !== 10"-->
                              <!--class="fa fa-plus text-center"-->
                              <el-form ref="riskReportClaimVo" :rules="ruleValidate18" :model="riskReportClaimVo">
                                <el-dialog :visible.sync="claimModal" width="800" :close-on-click-modal="false" @on-cancel="modalCancel('riskReportClaimVo')">
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
                    <el-form ref="riskReportMainVoB" :model="riskInsInputData.riskReportMainVo"  label-width="140px" :rules="ruleValidate5">
                      <el-col :span="24" class="updown">
                        <el-form-item label="客户信息补充" prop="explain">
                          <el-input type="textarea" v-model="riskInsInputData.riskReportMainVo.explain"  style="width: 100%" :disabled=browseFlag></el-input>
                        </el-form-item>
                      </el-col>
                    </el-form>
                  </el-tab-pane>
                  <el-tab-pane label="建筑物" icon="ios-home" style="max-height: calc(100vh - 229px);overflow-y: auto;padding: 15px;" name="name3"><!--style="height: 350px;"-->
                    <el-form ref="riskReportConstructInfoList" :model="riskInsInputData.riskReportConstructInfoList[0]" label-width="140px" :rules="ruleValidate6">
                      <div class="title">
                        <i class="el-icon-search"></i>
                        建筑情况：
                      </div>
                      <el-col :span="24" v-if="constructBuildFlag">
                        <span style="color:#FF3806;">请添加建筑情况表格内容！且资产占比和应等于100%</span>
                      </el-col>
                      <table class="mytable" border="0" cellspacing="0" cellpadding="0">
                        <thead>
                        <tr>
                          <th style="width: 5%">序号</th>
                          <th style="width: 15%">建筑名称</th>
                          <th style="width: 15%"> 建筑结构
                            <Icon v-if="!showUpload('2.1')" class="el-icon-camera" @click.native="buttonCommonEvent('2.1')" aria-readonly="true"></Icon>
                            <Icon v-if="showUpload('2.1')" class="el-icon-camera-solid" @click.native="buttonCommonEvent('2.1')" aria-readonly="true"></Icon>
                            <!--<Icon type="android-camera" class="cameraicon" @click.native="buttonCommonEvent('2.1')"></Icon>-->
                          </th>
                          <th style="width: 10%">建筑年份</th>
                          <th style="width: 15%">地下可水损资产额（元）</th>
                          <th style="width: 15%">占用性质</th>
                          <th style="width: 15%" >资产占比（%）</th>
                          <th style="width: 10%">操作</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr
                          v-for="(riskReportConstructInfo,index) in riskInsInputData.riskReportConstructInfoList">
                          <td style="width: 5%"><el-input type="text" v-bind:value="index+1" disabled></el-input></td>
                          <td style="width: 15%"><el-input type="text" v-model="riskReportConstructInfo.constructName" disabled></el-input></td><!--:name="'riskInsInputData.riskReportConstructInfoList['+index+'][constructName]'" :id="'constructName'+index"-->
                          <td style="width: 15%"><el-select type="text" v-model="riskReportConstructInfo.constructBuild" filterable disabled><!--:name="'riskInsInputData.riskReportConstructInfoList['+index+'][constructBuild]'" :id="'constructBuild'+index"-->
                            <el-option value="A" label="钢筋混凝土结构"></el-option>
                            <el-option value="B" label="砖混结构"></el-option>
                            <el-option value="C" label="砖木结构"></el-option>
                            <el-option value="D" label="钢结构"></el-option>
                            <el-option value="E" label="简易建筑"></el-option>
                          </el-select></td>
                          <td style="width: 10%"><el-select type="text" v-model="riskReportConstructInfo.constructYear" filterable disabled>
                            <el-option value="A" label=">20年"></el-option>
                            <el-option value="B" label="&lt=20年"></el-option>
                          </el-select></td>
                          <td style="width: 15%"><el-input type="text" v-model="riskReportConstructInfo.underWaterAssets" disabled></el-input></td><!--:name="'riskReportConstructInfoList['+index+'][underWaterAssets]'" :id="'underWaterAssets'+index"-->
                          <td style="width: 15%"><el-select type="text" v-model="riskReportConstructInfo.occupancy" placeholder="" filterable disabled>
                            <el-option value="01" label="居住建筑"></el-option>
                            <el-option value="02" label="公共建筑"></el-option>
                            <el-option value="03" label="行政办公建筑"></el-option>
                            <el-option value="04" label="商务办公建筑"></el-option>
                            <el-option value="05" label="商业建筑"></el-option>
                            <el-option value="06" label="文化建筑"></el-option>
                            <el-option value="07" label="体育建筑"></el-option>
                            <el-option value="08" label="医疗建筑"></el-option>
                            <el-option value="09" label="生产建筑"></el-option>
                            <el-option value="10" label="仓储建筑"></el-option>
                            <el-option value="11" label="科教建筑"></el-option>
                            <el-option value="12" label="科研建筑"></el-option>
                            <el-option value="13" label="教育建筑"></el-option>
                            <el-option value="14" label="交通建筑"></el-option>
                            <el-option value="15" label="公用建筑"></el-option>
                            <el-option value="16" label="特殊建筑"></el-option>
                            <el-option value="99" label="其他"></el-option>
                          </el-select></td>
                          <td style="width: 15%"><el-input type="text" v-model="riskReportConstructInfo.assetsRatio" disabled></el-input></td>
                          <td style="width: 10%;color:#D8504B;">
                            <el-button type="text" v-on:click="riskInsDeleteBuild(index)" :disabled=browseFlag style="color: #2d8cf0" size = "small">删除</el-button><!--class="fa fa-remove text-center"-->
                            <el-button type="text" v-on:click="changeBuild(riskReportConstructInfo)" :disabled=browseFlag style="color: #2d8cf0" size = "small">修改</el-button>
                          </td>
                        </tr>
                        </tbody>
                        <tfoot>
                        <tr>
                          <td style="width: 5%"></td>
                          <td style="width: 15%"></td>
                          <td style="width: 15%"></td>
                          <td style="width: 10%"></td>
                          <td style="width: 15%"></td>
                          <td style="width: 15%"></td>
                          <td style="width: 15%"></td>
                          <td class="text-center" style="width: 10%"><!--;color:#D8504B;-->
                            <el-button type="text" v-on:click="riskInsAddBuild()" :disabled="browseFlag" style="color: #2d8cf0" size = "small">增加</el-button>
                            <el-form ref="riskReportConstructInfoVo" :rules="ruleValidate16" :model="riskReportConstructInfoVo">
                              <el-dialog :visible.sync="riskReportConstructInfoModal" width="800" :close-on-click-modal="false" @on-cancel="modalCancel('riskReportConstructInfoVo')">
                                <p slot="header" style="color:#2d8cf0;text-align:center">
                                  <Icon type="search"></Icon>
                                  <span>建筑物情况</span>
                                </p>
                                <div style="padding: 10px;">
                                  <el-row>
                                    <el-col :span="24">
                                      <el-form-item label="建筑名称" prop="constructName">
                                        <el-input type="text" v-model="riskReportConstructInfoVo.constructName"></el-input>
                                      </el-form-item>
                                    </el-col>
                                    <el-col :span="24">
                                      <el-form-item label="建筑结构：" prop="constructBuild">
                                        <el-select type="text" v-model="riskReportConstructInfoVo.constructBuild">
                                          <el-option value="A" label="钢筋混凝土结构"></el-option>
                                          <el-option value="B" label="砖混结构"></el-option>
                                          <el-option value="C" label="砖木结构"></el-option>
                                          <el-option value="D" label="钢结构"></el-option>
                                          <el-option value="E" label="简易建筑"></el-option>
                                        </el-select>
                                      </el-form-item>
                                    </el-col>
                                    <el-col :span="24">
                                      <el-form-item label="建筑年份" prop="constructYear">
                                        <el-select type="text" v-model="riskReportConstructInfoVo.constructYear">
                                          <el-option value="A" label=">20年"></el-option>
                                          <el-option value="B" label="<=20年"></el-option>
                                        </el-select>
                                      </el-form-item>
                                    </el-col>
                                    <el-col :span="24">
                                      <el-form-item label="地下可水损资产额（元）" prop="underWaterAssets">
                                        <el-input type="text" v-model="riskReportConstructInfoVo.underWaterAssets"></el-input>
                                      </el-form-item>
                                    </el-col>
                                    <el-col :span="24">
                                      <el-form-item label="占用性质" prop="occupancy">
                                        <el-select type="text" v-model="riskReportConstructInfoVo.occupancy">
                                          <el-option value="01" label="居住建筑"></el-option>
                                          <el-option value="02" label="公共建筑"></el-option>
                                          <el-option value="03" label="行政办公建筑"></el-option>
                                          <el-option value="04" label="商务办公建筑"></el-option>
                                          <el-option value="05" label="商业建筑"></el-option>
                                          <el-option value="06" label="文化建筑"></el-option>
                                          <el-option value="07" label="体育建筑"></el-option>
                                          <el-option value="08" label="医疗建筑"></el-option>
                                          <el-option value="09" label="生产建筑"></el-option>
                                          <el-option value="10" label="仓储建筑"></el-option>
                                          <el-option value="11" label="科教建筑"></el-option>
                                          <el-option value="12" label="科研建筑"></el-option>
                                          <el-option value="13" label="教育建筑"></el-option>
                                          <el-option value="14" label="交通建筑"></el-option>
                                          <el-option value="15" label="公用建筑"></el-option>
                                          <el-option value="16" label="特殊建筑"></el-option>
                                          <el-option value="99" label="其他"></el-option>
                                        </el-select>
                                      </el-form-item>
                                    </el-col>
                                    <el-col :span="24">
                                      <el-form-item label="资产占比（%）：" prop="assetsRatio">
                                        <el-input type="text" v-model="riskReportConstructInfoVo.assetsRatio"></el-input>
                                      </el-form-item>
                                    </el-col>
                                  </el-row>
                                </div>
                                <div slot="footer">
                                  <div v-if="this.build === 'new'">
                                    <el-button size="large" icon = "compose" @click="addRiskReportConstructInfo">添加</el-button>
                                  </div>
                                  <div v-if="this.build === 'edit'">
                                    <el-button size="large" icon = "compose" @click="addRiskReportConstructInfo">保存</el-button>
                                  </div>
                                </div>
                              </el-dialog>
                            </el-form>
                          </td>
                        </tr>
                        </tfoot>
                      </table>
                    </el-form>
                    <el-form ref="riskReportConstructList" :model="riskInsInputData.riskReportConstructList[0]"  label-width="140px" :rules="ruleValidate7">
                      <div class="title">
                        <i class="el-icon-lock"></i>
                        地下资产：
                      </div>
                      <el-col :span="24">
                        <el-col :span="8">
                          <el-col :span="22">
                            <el-form-item label="是否存在地下资产" prop="underAssetsFlag" label-width="150px">
                              <el-select type="text" v-model="riskInsInputData.riskReportConstructList[0].underAssetsFlag" @on-change="clearShow" filterable :disabled=browseFlag>
                                <el-option value="A" label="存在地下资产"></el-option>
                                <el-option value="B" label="不存在地下资产"></el-option>
                              </el-select>
                            </el-form-item>
                          </el-col>
                        </el-col>
                        <el-col :span="8" v-if="riskInsInputData.riskReportConstructList[0].underAssetsFlag === 'A'">
                          <el-col :span="22">
                            <el-form-item label="保险资产浸水受损性质" prop="underAssetsProperty" label-width="160px">
                              <el-select type="text" v-model="riskInsInputData.riskReportConstructList[0].underAssetsProperty" filterable :disabled=browseFlag>
                                <el-option value="A" label="浸水全损"></el-option>
                                <el-option value="B" label="部分致损"></el-option>
                                <el-option value="C" label="不受影响"></el-option>
                              </el-select>
                            </el-form-item>
                          </el-col>
                          <el-col :span="1">
                            <Icon v-if="!showUpload('2.2.1')" class="el-icon-camera" @click.native="buttonCommonEvent('2.2.1')" aria-readonly="true"></Icon>
                            <Icon v-if="showUpload('2.2.1')" class="el-icon-camera-solid" @click.native="buttonCommonEvent('2.2.1')" aria-readonly="true"></Icon>
                            <!--<Icon type="android-camera" class="cameraicon" @click.native="buttonCommonEvent('2.2.1')" aria-readonly="true"></Icon>-->
                          </el-col>
                        </el-col>
                        <el-col :span="8" v-if="riskInsInputData.riskReportConstructList[0].underAssetsFlag === 'A'">
                          <el-col :span="22">
                            <el-form-item label="保险可水损资产占比" prop="underAssetsRatio">
                              <el-select type="text" v-model="riskInsInputData.riskReportConstructList[0].underAssetsRatio" :disabled=browseFlag filterable>
                                <el-option value="A" label="<10%"></el-option>
                                <el-option value="B" label="10%-80%"></el-option>
                                <el-option value="C" label=">80%"></el-option>
                              </el-select>
                            </el-form-item>
                          </el-col>
                        </el-col>
                      </el-col>
                      <el-col :span="24">
                        <el-col :span="8">
                          <el-col :span="22">
                            <el-form-item label="排水管情况" prop="pipeline" label-width="150px">
                              <el-select v-model="riskInsInputData.riskReportConstructList[0].pipeline" :disabled=browseFlag filterable>
                                <el-option value="A" label="非内置"></el-option>
                                <el-option value="B" label="内置无破损或锈蚀"></el-option>
                                <el-option value="C" label="内置有破损或锈蚀"></el-option>
                              </el-select>
                            </el-form-item>
                          </el-col>
                          <el-col :span="1">
                            <Icon v-if="!showUpload('2.3')" class="el-icon-camera" @click.native="buttonCommonEvent('2.3')" aria-readonly="true"></Icon>
                            <Icon v-if="showUpload('2.3')" class="el-icon-camera-solid" @click.native="buttonCommonEvent('2.3')" aria-readonly="true"></Icon>
                            <!--<Icon type="android-camera" class="cameraicon" @click.native="buttonCommonEvent('2.3')" aria-readonly="true"></Icon>-->
                          </el-col>
                        </el-col>
                        <el-col :span="8">
                          <el-col :span="22">
                            <el-form-item label="建筑是否高耸/孤立/突出" prop="buildOneFiveHFlag" label-width="160px">
                              <el-select type="text" v-model="riskInsInputData.riskReportConstructList[0].buildOneFiveHFlag" :disabled=browseFlag filterable>
                                <el-option value="A" label="100米范围内是"></el-option>
                                <el-option value="B" label="500米范围内是"></el-option>
                                <el-option value="C" label="否"></el-option>
                              </el-select>
                            </el-form-item>
                          </el-col>
                          <el-col :span="1">
                            <Icon v-if="!showUpload('2.6')" class="el-icon-camera" @click.native="buttonCommonEvent('2.6')" aria-readonly="true"></Icon>
                            <Icon v-if="showUpload('2.6')" class="el-icon-camera-solid" @click.native="buttonCommonEvent('2.6')" aria-readonly="true"></Icon>
                            <!--<Icon type="android-camera" class="cameraicon" @click.native="buttonCommonEvent('2.6')" aria-readonly="true"></Icon>-->
                          </el-col>
                        </el-col>
                        <el-col :span="8">
                          <el-col :span="22">
                            <el-form-item label="是否安装避雷设施" prop="lightningPro">
                              <el-select type="text" v-model="riskInsInputData.riskReportConstructList[0].lightningPro" :disabled=browseFlag filterable>
                                <el-option value="A" label="是"></el-option>
                                <el-option value="B" label="否"></el-option>
                              </el-select>
                            </el-form-item>
                          </el-col>
                          <el-col :span="1">
                            <Icon v-if="!showUpload('2.5')" class="el-icon-camera" @click.native="buttonCommonEvent('2.5')" aria-readonly="true"></Icon>
                            <Icon v-if="showUpload('2.5')" class="el-icon-camera-solid" @click.native="buttonCommonEvent('2.5')" aria-readonly="true"></Icon>
                            <!--<Icon type="android-camera" class="cameraicon" @click.native="buttonCommonEvent('2.5')" aria-readonly="true"></Icon>-->
                          </el-col>
                        </el-col>
                      </el-col>
                      <el-col :span="24">
                        <el-col :span="16">
                          <el-form-item label="建筑物内建筑防火分隔设施类型" prop="fireproofingType" label-width="200px">
                            <el-checkbox-group v-model="riskInsInputData.riskReportConstructList[0].fireproofingType" @on-change="clearShow">
                              <el-checkbox label="A" :disabled=browseFlag><span>防火门</span></el-checkbox>
                              <el-checkbox label="B" :disabled=browseFlag><span>防火墙</span></el-checkbox>
                              <el-checkbox label="C" :disabled=browseFlag><span>防火卷帘</span></el-checkbox>

                              <i v-if="!showUpload('2.4')" class="el-icon-camera" @click.native="buttonCommonEvent('2.4')" aria-readonly="true"></i>
                              <i v-if="showUpload('2.4')"  class="el-icon-camera-solid" @click.native="buttonCommonEvent('2.4')" aria-readonly="true"></i>
                              <!--<Icon type="android-camera" class="cameraicon" @click.native="buttonCommonEvent('2.4')" aria-readonly="true"></Icon>-->
                            </el-checkbox-group>
                          </el-form-item>
                        </el-col>
                        <el-col :span="8" v-if="riskInsInputData.riskReportConstructList[0].fireproofingType.length !== 0">
                          <el-col :span="22">
                            <el-form-item label="防火分隔设施是否有效" prop="fireproofingFlag">
                              <el-select type="text" v-model="riskInsInputData.riskReportConstructList[0].fireproofingFlag" :disabled=browseFlag @on-change="clearShow" filterable>
                                <el-option value="A" label="是"></el-option>
                                <el-option value="B" label="否"></el-option>
                              </el-select>
                            </el-form-item>
                          </el-col>
                        </el-col>
                      </el-col>
                      <el-col :span="24">
                        <el-col :span="24" v-if="riskInsInputData.riskReportConstructList[0].fireproofingFlag =='B' && riskInsInputData.riskReportConstructList[0].fireproofingType.length !== 0">
                          <el-form-item label="隐患部位和风险隐患描述" prop="hiddenDescription" label-width="150px">
                            <el-input type="textarea" v-model="riskInsInputData.riskReportConstructList[0].hiddenDescription"  style="width: 100%" :disabled=browseFlag></el-input>
                          </el-form-item>
                        </el-col>
                      </el-col>
                      <el-col :span="24">
                        <el-col :span="24">
                          <el-form-item label="补充说明信息" prop="addMessage" label-width="150px">
                            <el-input type="textarea" v-model="riskInsInputData.riskReportConstructList[0].addMessage"  style="width: 100%" :disabled=browseFlag></el-input>
                          </el-form-item>
                        </el-col>
                      </el-col>
                    </el-form>
                  </el-tab-pane>
                  <el-tab-pane label="占用性质" icon="ios-flag" style="max-height: calc(100vh - 229px);overflow-y: auto;padding: 15px;" name="name4"><!--style="height: 350px;"-->
                    <el-form ref="riskReportOccupationList" :model="riskInsInputData.riskReportOccupationList[0]"  label-width="140px" :rules="ruleValidate8">
                      <el-col :span="24">
                        <el-col :span="24">
                          <el-form-item label="生产工艺流程" prop="productProcess"><!--style="width: 100%"-->
                            <el-input type="textarea" v-model="riskInsInputData.riskReportOccupationList[0].productProcess" :disabled=browseFlag></el-input>
                          </el-form-item>
                        </el-col>
                      </el-col>
                      <el-col :span="24">
                        <div class="title">
                          <Icon type="ios-rose"></Icon>
                          主要原材料/半成品/成品（如有多种则列出用/产量最大一种）：
                        </div>
                      </el-col>
                      <el-col :span="24">
                        <el-col :span="8">
                          <el-form-item label="材料名称" prop="materialName">
                            <el-input type="text" id="materialName" v-model="riskInsInputData.riskReportOccupationList[0].materialName" :disabled=browseFlag></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="8">
                          <el-col :span="22">
                            <el-form-item label="物质燃烧性质" prop="ignitionQuality">
                              <el-select type="text" id="ignitionQuality" v-model="riskInsInputData.riskReportOccupationList[0].ignitionQuality" filterable :disabled=browseFlag>
                                <el-option value='A' label="不燃"></el-option>
                                <el-option value='B' label="难燃"></el-option>
                                <el-option value='C' label="可燃"></el-option>
                                <el-option value='D' label="易燃"></el-option>
                              </el-select>
                            </el-form-item>
                          </el-col>
                          <el-col :span="1">
                            <Icon v-if="!showUpload('3.2.1')" class="el-icon-camera" @click.native="buttonCommonEvent('3.2.1')" aria-readonly="true"></Icon>
                            <Icon v-if="showUpload('3.2.1')" class="el-icon-camera-solid" @click.native="buttonCommonEvent('3.2.1')" aria-readonly="true"></Icon>
                          </el-col>
                        </el-col>
                        <el-col :span="8">
                          <el-form-item label="物质对水敏感度" prop="waterSensitivity">
                            <el-select type="text" id="waterSensitivity" v-model="riskInsInputData.riskReportOccupationList[0].waterSensitivity" filterable :disabled=browseFlag>
                              <el-option value="A" label="浸水全损"></el-option>
                              <el-option value="B" label="部分致损"></el-option>
                              <el-option value="C" label="不受影响"></el-option>
                            </el-select>
                          </el-form-item>
                        </el-col>
                        <!--<table class="mytable" border="0" cellspacing="0" cellpadding="0">-->
                        <!--<thead>-->
                        <!--<tr>-->
                        <!--<th style="width: 70%">材料名称</th>-->
                        <!--<th style="width: 15%"> 物质燃烧性质-->
                        <!--<Icon v-if="!showUpload('3.2.1')" class="el-icon-camera" @click.native="buttonCommonEvent('3.2.1')" aria-readonly="true"></Icon>-->
                        <!--<Icon v-if="showUpload('3.2.1')" class="el-icon-camera-solid" @click.native="buttonCommonEvent('3.2.1')" aria-readonly="true"></Icon>-->
                        <!--</th>-->
                        <!--<th style="width: 15%">物质对水敏感度</th>-->
                        <!--</tr>-->
                        <!--</thead>-->
                        <!--<tbody>-->
                        <!--<tr>-->
                        <!--<td style="width: 60%">-->
                        <!--<el-col :span="24">-->
                        <!--<el-form-item label=" " prop="materialName" label-width="40">-->
                        <!--<el-input type="text" id="materialName" v-model="riskInsInputData.riskReportOccupationList[0].materialName" :disabled=browseFlag></el-input>-->
                        <!--</el-form-item>-->
                        <!--</el-col>-->
                        <!--</td>-->
                        <!--<td style="width: 20%">-->
                        <!--<el-col :span="24">-->
                        <!--<el-form-item label=" " prop="ignitionQuality" label-width="40">-->
                        <!--<el-select type="text" id="ignitionQuality" v-model="riskInsInputData.riskReportOccupationList[0].ignitionQuality" filterable :disabled=browseFlag>-->
                        <!--<el-option value='A'>不燃</el-option>-->
                        <!--<el-option value='B'>难燃</el-option>-->
                        <!--<el-option value='C'>可燃</el-option>-->
                        <!--<el-option value='D'>易燃</el-option>-->
                        <!--</el-select>-->
                        <!--</el-form-item>-->
                        <!--</el-col>-->
                        <!--</td>-->
                        <!--<td style="width: 20%">-->
                        <!--<el-col :span="24">-->
                        <!--<el-form-item label=" " prop="waterSensitivity" label-width="40">-->
                        <!--<el-select type="text" id="waterSensitivity" v-model="riskInsInputData.riskReportOccupationList[0].waterSensitivity" filterable :disabled=browseFlag>-->
                        <!--<el-option value="A">浸水全损</el-option>-->
                        <!--<el-option value="B">部分致损</el-option>-->
                        <!--<el-option value="C">不受影响</el-option>-->
                        <!--</el-select>-->
                        <!--</el-form-item>-->
                        <!--</el-col>-->
                        <!--</td>-->
                        <!--</tr>-->
                        <!--</tbody>-->
                        <!--</table>-->
                      </el-col>
                      <el-col :span="24">
                        <el-col :span="8">
                          <el-form-item label="场所可燃物空间占比" prop="combustibleRatio">
                            <el-select type="date" v-model="riskInsInputData.riskReportOccupationList[0].combustibleRatio" style="width: 100%" :disabled=browseFlag filterable>
                              <el-option value="A" label="0-30%"></el-option>
                              <el-option value="B" label="30%-60%"></el-option>
                              <el-option value="C" label="60%-100%"></el-option>
                            </el-select>
                          </el-form-item>
                        </el-col>
                        <el-col :span="1" style="padding-left: 10px">
                          <i v-if="!showUpload('3.2.2')" class="el-icon-camera" @click.native="buttonCommonEvent('3.2.2')" aria-readonly="true"></i>
                          <i v-if="showUpload('3.2.2')" class="el-icon-camera-solid" @click.native="buttonCommonEvent('3.2.2')" aria-readonly="true"></i>
                          <!--<Icon type="android-camera" class="cameraicon" @click.native="buttonCommonEvent('3.2.2')" aria-readonly="true"></Icon>-->
                        </el-col>
                      </el-col>
                      <el-col :span="24" class="updown">
                        <div class="title">
                          <Icon type="android-warning"></Icon>
                          生产特殊风险：
                        </div>
                      </el-col>
                      <el-col :span="24">
                        <table class="mytable" border="0" cellspacing="0" cellpadding="0">
                          <thead>
                          <tr>
                            <th>特殊风险</th>
                            <th>是否包含
                              <i v-if="!showUpload('3.4')" class="el-icon-camera" @click.native="buttonCommonEvent('3.4')" aria-readonly="true"></i>
                              <i v-if="showUpload('3.4')" class="el-icon-camera-solid" @click.native="buttonCommonEvent('3.4')" aria-readonly="true"></i>
                              <!--<Icon type="android-camera" class="cameraicon" @click.native="buttonCommonEvent('3.4')"></Icon>-->
                            </th><!--<span style="color: #EB3941;">*</sapn>-->
                            <th colspan="4">使用区域及情况</th>
                            <th>采取的保护措施</th>
                          </tr>
                          </thead>
                          <tbody>
                          <tr>
                            <td>易燃液体</td>
                            <td>
                              <el-form-item label=" " prop="flaLiquidFlag" label-width="15px">
                                <el-select type="text" v-model="riskInsInputData.riskReportOccupationList[0].flaLiquidFlag" :disabled=browseFlag filterable>
                                  <el-option value='A' label="是"></el-option>
                                  <el-option value='B' label="否"></el-option>
                                </el-select>
                              </el-form-item>
                            </td>
                            <td colspan="4">
                              <el-form-item label="" prop="flaLiquidArea" label-width="15px">
                                <el-input type="text" v-model="riskInsInputData.riskReportOccupationList[0].flaLiquidArea" :disabled=browseFlag></el-input>
                              </el-form-item>
                            </td>
                            <td>
                              <el-form-item label="" prop="flaLiquidPro" label-width="15px">
                                <el-input type="text" v-model="riskInsInputData.riskReportOccupationList[0].flaLiquidPro" :disabled=browseFlag></el-input>
                              </el-form-item>
                            </td>
                          </tr>
                          <tr>
                            <td>易燃气体</td>
                            <td>
                              <el-form-item label=" " prop="flaGasFlag" label-width="15px">
                                <el-select type="text" v-model="riskInsInputData.riskReportOccupationList[0].flaGasFlag" :disabled=browseFlag filterable>
                                  <el-option value='A' label="是"></el-option>
                                  <el-option value='B' label="否"></el-option>
                                </el-select>
                              </el-form-item>
                            </td>
                            <td colspan="4">
                              <el-form-item label="" prop="flaGasArea" label-width="15px">
                                <el-input type="text" v-model="riskInsInputData.riskReportOccupationList[0].flaGasArea" :disabled=browseFlag></el-input>
                              </el-form-item>
                            </td>
                            <td>
                              <el-form-item label="" prop="flaGasPro" label-width="15px">
                                <el-input type="text" v-model="riskInsInputData.riskReportOccupationList[0].flaGasPro" :disabled=browseFlag></el-input>
                              </el-form-item>
                            </td>
                          </tr>
                          <tr>
                            <td>爆炸性粉尘</td>
                            <td>
                              <el-form-item label=" " prop="expDustFlag" label-width="15px">
                                <el-select type="text" v-model="riskInsInputData.riskReportOccupationList[0].expDustFlag" :disabled=browseFlag filterable>
                                  <el-option value='A' label="是"></el-option>
                                  <el-option value='B' label="否"></el-option>
                                </el-select>
                              </el-form-item>
                            </td>
                            <td colspan="4">
                              <el-form-item label="" prop="expDustArea" label-width="15px">
                                <el-input type="text" v-model="riskInsInputData.riskReportOccupationList[0].expDustArea" :disabled=browseFlag></el-input>
                              </el-form-item>
                            </td>
                            <td>
                              <el-form-item label="" prop="expDustPro" label-width="15px">
                                <el-input type="text" v-model="riskInsInputData.riskReportOccupationList[0].expDustPro" :disabled=browseFlag></el-input>
                              </el-form-item>
                            </td>
                          </tr>
                          <tr>
                            <td>动火作业</td>
                            <td>
                              <el-form-item label=" " prop="hotWorkFlag" label-width="15px">
                                <el-select type="text" v-model="riskInsInputData.riskReportOccupationList[0].hotWorkFlag" :disabled=browseFlag filterable>
                                  <el-option value='A' label="是"></el-option>
                                  <el-option value='B' label="否"></el-option>
                                </el-select>
                              </el-form-item>
                            </td>
                            <td colspan="4">
                              <el-form-item label="" prop="hotWorkArea" label-width="15px">
                                <el-input type="text" v-model="riskInsInputData.riskReportOccupationList[0].hotWorkArea" :disabled=browseFlag></el-input>
                              </el-form-item>
                            </td>
                            <td>
                              <el-form-item label="" prop="hotWorkPro" label-width="15px">
                                <el-input type="text" v-model="riskInsInputData.riskReportOccupationList[0].hotWorkPro" :disabled=browseFlag></el-input>
                              </el-form-item>
                            </td>
                          </tr>
                          <tr>
                            <td>无尘车间</td>
                            <td>
                              <el-form-item label=" " prop="cleanRoomFlag" label-width="15px">
                                <el-select type="text" v-model="riskInsInputData.riskReportOccupationList[0].cleanRoomFlag" :disabled=browseFlag filterable>
                                  <el-option value='A' label="是"></el-option>
                                  <el-option value='B' label="否"></el-option>
                                </el-select>
                              </el-form-item>
                            </td>
                            <td>等级</td>
                            <td colspan="3">
                              <el-form-item label="" prop="cleanRoomArea" label-width="15px">
                                <el-select type="text" v-model="riskInsInputData.riskReportOccupationList[0].cleanRoomArea" :disabled=browseFlag filterable>
                                  <el-option value="A" label="十万级"></el-option>
                                  <el-option value="B" label="万级"></el-option>
                                  <el-option value="C" label="千级"></el-option>
                                  <el-option value="D" label="百级"></el-option>
                                </el-select>
                              </el-form-item>
                            </td>
                            <td>
                              <el-form-item label="" prop="cleanRoomPro" label-width="15px">
                                <el-input type="text" v-model="riskInsInputData.riskReportOccupationList[0].cleanRoomPro" :disabled=browseFlag></el-input>
                              </el-form-item>
                            </td>
                          </tr>
                          <tr>
                            <td>电镀工艺</td>
                            <td>
                              <el-form-item label=" " prop="eleProcessFlag" label-width="15px">
                                <el-select type="text" v-model="riskInsInputData.riskReportOccupationList[0].eleProcessFlag" :disabled=browseFlag filterable>
                                  <el-option value='A' label="是"></el-option>
                                  <el-option value='B' label="否"></el-option>
                                </el-select>
                              </el-form-item>
                            </td>
                            <td colspan="4">
                              <el-form-item label="" prop="eleProcessArea" label-width="15px">
                                <el-input type="text" v-model="riskInsInputData.riskReportOccupationList[0].eleProcessArea" :disabled=browseFlag></el-input>
                              </el-form-item>
                            </td>
                            <td>
                              <el-form-item label="" prop="eleProcessPro" label-width="15px">
                                <el-input type="text" v-model="riskInsInputData.riskReportOccupationList[0].eleProcessPro" :disabled=browseFlag></el-input>
                              </el-form-item>
                            </td>
                          </tr>
                          <tr>
                            <td>高温高压设备</td>
                            <td>
                              <el-form-item label=" " prop="highTemPreFlag" label-width="15px">
                                <el-select type="text" v-model="riskInsInputData.riskReportOccupationList[0].highTemPreFlag" :disabled=browseFlag filterable>
                                  <el-option value='A' label="是"></el-option>
                                  <el-option value='B' label="否"></el-option>
                                </el-select>
                              </el-form-item>
                            </td>
                            <td><span>保修记录</span></td>
                            <td>
                              <el-form-item label="" prop="highTemPreHistory" label-width="5px">
                                <el-select type="text" v-model="riskInsInputData.riskReportOccupationList[0].highTemPreHistory" :disabled=browseFlag filterable>
                                  <el-option value="A" label="有"></el-option>
                                  <el-option value="B" label="无"></el-option>
                                </el-select>
                              </el-form-item>
                            </td>
                            <td><span>使用年限</span></td>
                            <td>
                              <el-form-item label="" prop="highTemPreYear" label-width="5px">
                                <el-input type="text" v-model="riskInsInputData.riskReportOccupationList[0].highTemPreYear" :disabled=browseFlag></el-input>
                              </el-form-item>
                            </td>
                            <td>
                              <el-form-item label="" prop="highTemPrePro" label-width="15px">
                                <el-input type="text" v-model="riskInsInputData.riskReportOccupationList[0].highTemPrePro" :disabled=browseFlag></el-input>
                              </el-form-item>
                            </td>
                          </tr>
                          </tbody>
                        </table>
                      </el-col>
                      <el-col :span="24">
                        <el-col :span="8">
                          <el-col :span="21">
                            <el-form-item label="现场环境" prop="siteEnvironment">
                              <el-select type="text" v-model="riskInsInputData.riskReportOccupationList[0].siteEnvironment" style="width: 100%" :disabled=browseFlag filterable>
                                <el-option value="A" label="全部整洁有序"></el-option>
                                <el-option value="B" label="部分整洁有序"></el-option>
                                <el-option value="C" label="杂乱无序"></el-option>
                              </el-select>
                            </el-form-item>
                          </el-col>
                          <el-col :span="1" style="padding-left: 15px">
                            <i v-if="!showUpload('3.5')" class="el-icon-camera" @click.native="buttonCommonEvent('3.5')" aria-readonly="true"></i>
                            <i v-if="showUpload('3.5')" class="el-icon-camera-solid" @click.native="buttonCommonEvent('3.5')" aria-readonly="true"></i>
                            <!--<Icon type="android-camera" class="cameraicon" @click.native="buttonCommonEvent('3.5')" aria-readonly="true"></Icon>-->
                          </el-col>
                        </el-col>
                        <el-col :span="8">
                          <el-col :span="22">
                            <el-form-item label="生产设备泄漏情况" prop="equipmentLeak">
                              <el-select type="text" v-model="riskInsInputData.riskReportOccupationList[0].equipmentLeak" :disabled=browseFlag filterable>
                                <el-option value="A" label="有跑、冒、滴、漏的情况"></el-option>
                                <el-option value="B" label="无跑、冒、滴、漏的情况"></el-option>
                              </el-select>
                            </el-form-item>
                          </el-col>
                          <el-col :span="1">
                            <i v-if="!showUpload('3.6')" class="el-icon-camera" @click.native="buttonCommonEvent('3.6')" aria-readonly="true"></i>
                            <i v-if="showUpload('3.6')" class="el-icon-camera-solid" @click.native="buttonCommonEvent('3.6')" aria-readonly="true"></i>
                            <!--<Icon type="android-camera" class="cameraicon" @click.native="buttonCommonEvent('3.6')" aria-readonly="true"></Icon>-->
                          </el-col>
                        </el-col>
                        <el-col :span="8">
                          <el-col :span="22">
                            <el-form-item label="线路防护" prop="linePro" label-width="150px">
                              <el-select type="text" v-model="riskInsInputData.riskReportOccupationList[0].linePro" :disabled=browseFlag filterable>
                                <el-option value="A" label="明线"></el-option>
                                <el-option value="B" label="塑胶管"></el-option>
                                <el-option value="C" label="金属管"></el-option>
                                <el-option value="D" label="钢槽"></el-option>
                                <el-option value="E" label="其他"></el-option>
                              </el-select>
                            </el-form-item>
                          </el-col>
                          <el-col :span="1">
                            <i v-if="!showUpload('3.7')" class="el-icon-camera" @click.native="buttonCommonEvent('3.7')" aria-readonly="true"></i>
                            <i v-if="showUpload('3.7')" class="el-icon-camera-solid" @click.native="buttonCommonEvent('3.7')" aria-readonly="true"></i>
                            <!--<Icon type="android-camera" class="cameraicon" @click.native="buttonCommonEvent('3.7')" aria-readonly="true"></Icon>-->
                          </el-col>
                        </el-col>
                      </el-col>
                      <el-col :span="24">
                        <el-col :span="8">
                          <el-col :span="21">
                            <el-form-item label="线路布置" prop="lineLayout">
                              <el-select type="text" v-model="riskInsInputData.riskReportOccupationList[0].lineLayout":disabled=browseFlag filterable>
                                <el-option value="A" label="布置整齐"></el-option>
                                <el-option value="B" label="混乱有交错"></el-option>
                                <el-option value="C" label="有搭接线路"></el-option>
                              </el-select>
                            </el-form-item>
                          </el-col>
                          <el-col :span="1" style="padding-left: 15px">
                            <i v-if="!showUpload('3.8')" class="el-icon-camera" @click.native="buttonCommonEvent('3.8')" aria-readonly="true"></i>
                            <i v-if="showUpload('3.8')" class="el-icon-camera-solid" @click.native="buttonCommonEvent('3.8')" aria-readonly="true"></i>
                            <!--<Icon type="android-camera" class="cameraicon" @click.native="buttonCommonEvent('3.8')" aria-readonly="true"></Icon>-->
                          </el-col>
                        </el-col>
                        <el-col :span="8">
                          <el-col :span="22">
                            <el-form-item label="电气线路的使用年限" prop="lineYear">
                              <el-select type="text" v-model="riskInsInputData.riskReportOccupationList[0].lineYear" :disabled=browseFlag filterable>
                                <el-option value="A" label="5年以下"></el-option>
                                <el-option value="B" label="5-10年"></el-option>
                                <el-option value="C" label="10-15年"></el-option>
                                <el-option value="D" label="15年及以上"></el-option>
                              </el-select>
                            </el-form-item>
                          </el-col>
                        </el-col>
                        <el-col :span="8">
                          <el-col :span="22">
                            <el-form-item label="按要求使用防爆设备" prop="riotGearFlag" label-width="150px">
                              <el-select type="text" v-model="riskInsInputData.riskReportOccupationList[0].riotGearFlag" :disabled=browseFlag filterable>
                                <el-option value="A" label="是"></el-option>
                                <el-option value="B" label="否"></el-option>
                              </el-select>
                            </el-form-item>
                          </el-col>
                          <el-col :span="1">
                            <i v-if="!showUpload('3.10')" class="el-icon-camera" @click.native="buttonCommonEvent('3.10')" aria-readonly="true"></i>
                            <i v-if="showUpload('3.10')" class="el-icon-camera-solid" @click.native="buttonCommonEvent('3.10')" aria-readonly="true"></i>
                            <!--<Icon type="android-camera" class="cameraicon" @click.native="buttonCommonEvent('3.10')" aria-readonly="true"></Icon>-->
                          </el-col>
                        </el-col>
                      </el-col>
                      <el-col :span="24">
                        <el-col :span="8">
                          <el-col :span="21">
                            <el-form-item label="仓储物摆放形式" prop="layingMode">
                              <el-select type="text" v-model="riskInsInputData.riskReportOccupationList[0].layingMode" style="width: 100%" :disabled=browseFlag filterable>
                                <el-option value="A" label="垛堆"></el-option>
                                <el-option value="B" label="垫板"></el-option>
                                <el-option value="C" label="架存"></el-option>
                                <el-option value="D" label="其他"></el-option>
                              </el-select>
                            </el-form-item>
                          </el-col>
                          <el-col :span="1" style="padding-left: 2px">
                            <el-tooltip placement="bottom">
                              <Icon type="ios-information-outline"></Icon>
                              <div slot="content">
                                <p>请用户选择风险最高的一种</p>
                              </div>
                            </el-tooltip>
                          </el-col>
                          <el-col :span="1">
                            <i v-if="!showUpload('3.11')" class="el-icon-camera" @click.native="buttonCommonEvent('3.11')" aria-readonly="true"></i>
                            <i v-if="showUpload('3.11')" class="el-icon-camera-solid" @click.native="buttonCommonEvent('3.11')" aria-readonly="true"></i>
                            <!--<Icon type="android-camera" class="cameraicon" @click.native="buttonCommonEvent('3.11')" aria-readonly="true"></Icon>-->
                          </el-col>
                        </el-col>
                        <el-col :span="8">
                          <el-col :span="22">
                            <el-form-item label="作业车辆充电位置" prop="chargePosition">
                              <el-select type="text" v-model="riskInsInputData.riskReportOccupationList[0].chargePosition" :disabled=browseFlag filterable>
                                <el-option value="A" label="仓库内"></el-option>
                                <el-option value="B" label="仓库外"></el-option>
                                <el-option value="C" label="无车辆充电"></el-option>
                              </el-select>
                            </el-form-item>
                          </el-col>
                          <el-col :span="1">
                            <i v-if="!showUpload('3.12')" class="el-icon-camera" @click.native="buttonCommonEvent('3.12')" aria-readonly="true"></i>
                            <i v-if="showUpload('3.12')" class="el-icon-camera-solid" @click.native="buttonCommonEvent('3.12')" aria-readonly="true"></i>
                            <!--<Icon type="android-camera" class="cameraicon" @click.native="buttonCommonEvent('3.12')" aria-readonly="true"></Icon>-->
                          </el-col>
                        </el-col>
                        <el-col :span="8">
                          <el-col :span="22">
                            <el-form-item label="仓库内是否有生活用电" prop="lifeEleFlag" label-width="150px">
                              <el-select type="text" v-model="riskInsInputData.riskReportOccupationList[0].lifeEleFlag" :disabled=browseFlag filterable>
                                <el-option value="A" label="是"></el-option>
                                <el-option value="B" label="否"></el-option>
                              </el-select>
                            </el-form-item>
                          </el-col>
                          <el-col :span="1">
                            <i v-if="!showUpload('3.13')" class="el-icon-camera" @click.native="buttonCommonEvent('3.13')" aria-readonly="true"></i>
                            <i v-if="showUpload('3.13')" class="el-icon-camera-solid" @click.native="buttonCommonEvent('3.13')" aria-readonly="true"></i>
                            <!--<Icon type="android-camera" class="cameraicon" @click.native="buttonCommonEvent('3.13')" aria-readonly="true"></Icon>-->
                          </el-col>
                        </el-col>
                      </el-col>
                    </el-form>
                  </el-tab-pane>
                  <el-tab-pane label="保护措施" icon="ios-heart" style="max-height: calc(100vh - 229px);overflow-y: auto;padding: 15px;" name="name5"><!--style="height: 1050px;"-->
                    <el-form ref="riskReportProtectionList" :model="riskInsInputData.riskReportProtectionList[0]"  label-width="140px" :rules="ruleValidate9">
                      <el-col :span="24">
                        <div class="title">
                          <Icon type="ios-flame"></Icon>
                          消防设施：
                        </div>
                      </el-col>
                      <el-col :span="24">
                        <el-form-item label="消防器材类型" prop="fireEquipType">
                          <el-checkbox-group v-model="riskInsInputData.riskReportProtectionList[0].fireEquipType" @on-change="clearShow">
                            <el-checkbox label='A' :disabled=browseFlag><span>自动报警</span></el-checkbox>
                            <el-checkbox label='B' :disabled=browseFlag><span>自动灭火系统</span></el-checkbox>
                            <el-checkbox label='C' :disabled=browseFlag><span>消防栓</span></el-checkbox>
                            <el-checkbox label='D' :disabled=browseFlag><span>灭火器</span></el-checkbox>
                          </el-checkbox-group>
                        </el-form-item>
                      </el-col>
                      <el-col :span="24">
                        <table class="mytable mytable-notitle" border="0" cellspacing="0" cellpadding="0">
                          <tbody v-if="riskInsInputData.riskReportProtectionList[0].fireEquipType.length !== 0 ">
                          <tr>
                            <th>类型</th>
                            <th>检查项</th>
                            <th>情况</th>
                          </tr>
                          </tbody>
                          <tbody v-if="riskInsInputData.riskReportProtectionList[0].fireEquipType.indexOf('D') !== -1">
                          <tr>
                            <td rowspan="3">灭火器</td>
                            <td>布置区域
                              <i v-if="!showUpload('4.1.1.1')" class="el-icon-camera" @click.native="buttonCommonEvent('4.1.1.1')" aria-readonly="true"></i>
                              <i v-if="showUpload('4.1.1.1')" class="el-icon-camera-solid" @click.native="buttonCommonEvent('4.1.1.1')" aria-readonly="true"></i>
                              <!--<Icon type="android-camera" class="cameraicon" @click.native="buttonCommonEvent('4.1.1.1')"></Icon>-->
                            </td><!--<span style="color: #EB3941;">*</sapn>-->
                            <td>
                              <el-form-item label=" " prop="extinguisherArea" label-width="15px">
                                <el-select type="text" id="extinguisherArea" v-model="riskInsInputData.riskReportProtectionList[0].extinguisherArea" :disabled=browseFlag filterable>
                                  <el-option value='A' label="全部覆盖"></el-option>
                                  <el-option value='B' label="主要区域覆盖"></el-option>
                                  <el-option value='C' label="较少覆盖"></el-option>
                                  <el-option value='D' label="无"></el-option>
                                </el-select>
                              </el-form-item>
                            </td>
                          </tr>
                          <tr>
                            <td>气压
                              <i v-if="!showUpload('4.1.1.2')" class="el-icon-camera" @click.native="buttonCommonEvent('4.1.1.2')" aria-readonly="true"></i>
                              <i v-if="showUpload('4.1.1.2')" class="el-icon-camera-solid" @click.native="buttonCommonEvent('4.1.1.2')" aria-readonly="true"></i>
                              <!--<Icon type="android-camera" class="cameraicon" @click.native="buttonCommonEvent('4.1.1.2')"></Icon>-->
                            </td><!--<span style="color: #EB3941;">*</sapn>-->
                            <td>
                              <el-form-item label=" " prop="extinguisherPre" label-width="15px">
                                <el-select type="text" class="form-control" id="extinguisherPre" v-model="riskInsInputData.riskReportProtectionList[0].extinguisherPre" :disabled=browseFlag filterable>
                                  <el-option value='A' label="正常"></el-option>
                                  <el-option value='B' label="部分正常"></el-option>
                                  <el-option value='C' label="不正常"></el-option>
                                </el-select>
                              </el-form-item>
                            </td>
                          </tr>
                          <tr>
                            <td>摆放位置
                              <i v-if="!showUpload('4.1.1.3')" class="el-icon-camera" @click.native="buttonCommonEvent('4.1.1.3')" aria-readonly="true"></i>
                              <i v-if="showUpload('4.1.1.3')" class="el-icon-camera-solid" @click.native="buttonCommonEvent('4.1.1.3')" aria-readonly="true"></i>
                              <!--<Icon type="android-camera" class="cameraicon" @click.native="buttonCommonEvent('4.1.1.3')"></Icon>-->
                            </td><!--<span style="color: #EB3941;">*</sapn>-->
                            <td>
                              <el-form-item label=" " prop="extinguisherPos" label-width="15px">
                                <el-select type="text" id="extinguisherPos"  v-model="riskInsInputData.riskReportProtectionList[0].extinguisherPos" :disabled=browseFlag filterable>
                                  <el-option value='A' label="醒目"></el-option>
                                  <el-option value='B' label="部分隐蔽"></el-option>
                                  <el-option value='C' label="隐蔽"></el-option>
                                </el-select>
                              </el-form-item>
                            </td>
                          </tr>
                          </tbody>
                          <tbody v-if="riskInsInputData.riskReportProtectionList[0].fireEquipType.indexOf('C') !== -1">
                          <tr>
                            <td rowspan="3">室内消防栓</td>
                            <td>布置区域
                              <i v-if="!showUpload('4.1.1.4')" class="el-icon-camera" @click.native="buttonCommonEvent('4.1.1.4')" aria-readonly="true"></i>
                              <i v-if="showUpload('4.1.1.4')" class="el-icon-camera-solid" @click.native="buttonCommonEvent('4.1.1.4')" aria-readonly="true"></i>
                              <!--<Icon type="android-camera" class="cameraicon" @click.native="buttonCommonEvent('4.1.1.4')"></Icon>-->
                            </td><!--<span style="color: #EB3941;">*</sapn>-->
                            <td>
                              <el-form-item label=" " prop="insHydrantArea" label-width="15px">
                                <el-select type="text" id="insHydrantArea"  v-model="riskInsInputData.riskReportProtectionList[0].insHydrantArea" :disabled=browseFlag filterable>
                                  <!--:class="red || riskReportProtectionList[0].insHydrantArea !=''? '':'recordedPrompt'"-->
                                  <el-option value='A' label="全部覆盖"></el-option>
                                  <el-option value='B' label="主要区域覆盖"></el-option>
                                  <el-option value='C' label="较少覆盖"></el-option>
                                  <el-option value='D' label="无"></el-option>
                                </el-select>
                              </el-form-item>
                            </td>
                          </tr>
                          <tr>
                            <td>部件是否齐全完好
                              <i v-if="!showUpload('4.1.1.5')" class="el-icon-camera" @click.native="buttonCommonEvent('4.1.1.5')" aria-readonly="true"></i>
                              <i v-if="showUpload('4.1.1.5')" class="el-icon-camera-solid" @click.native="buttonCommonEvent('4.1.1.5')" aria-readonly="true"></i>
                              <!--<Icon type="android-camera" class="cameraicon" @click.native="buttonCommonEvent('4.1.1.5')"></Icon>-->
                            </td><!--<span style="color: #EB3941;">*</sapn>-->
                            <td>
                              <el-form-item label=" " prop="insHydrantPos" label-width="15px">
                                <el-select type="text" id="insHydrantPos" v-model="riskInsInputData.riskReportProtectionList[0].insHydrantPos" :disabled=browseFlag filterable>
                                  <!--:class="red || riskReportProtectionList[0].insHydrantPos !=''? '':'recordedPrompt'"-->
                                  <el-option value='A' label="全部是"></el-option>
                                  <el-option value='B' label="部分是"></el-option>
                                  <el-option value='C' label="完全不是"></el-option>
                                </el-select>
                              </el-form-item>
                            </td>
                          </tr>
                          <tr>
                            <td>周围遮挡情况
                              <i v-if="!showUpload('4.1.1.6')" class="el-icon-camera" @click.native="buttonCommonEvent('4.1.1.6')" aria-readonly="true"></i>
                              <i v-if="showUpload('4.1.1.6')" class="el-icon-camera-solid" @click.native="buttonCommonEvent('4.1.1.6')" aria-readonly="true"></i>
                              <!--<Icon type="android-camera" class="cameraicon" @click.native="buttonCommonEvent('4.1.1.6')"></Icon>-->
                            </td>
                            <td>
                              <el-form-item label=" " prop="insHydrantHade" label-width="15px">
                                <el-select type="text" class="form-control" id="insHydrantHade" v-model="riskInsInputData.riskReportProtectionList[0].insHydrantHade" :disabled=browseFlag filterable>
                                  <!--:class="red || riskReportProtectionList[0].insHydrantHade !=''? '':'recordedPrompt'"-->
                                  <el-option value='A' lable="未堆放"></el-option>
                                  <el-option value='B' lable="部分有堆放"></el-option>
                                  <el-option value='C' lable="全部都有堆放"></el-option>
                                </el-select>
                              </el-form-item>
                            </td>
                          </tr>
                          <tr>
                            <td rowspan="2">室外消防栓</td>
                            <td>布置区域</td><!--<span style="color: #EB3941;">*</sapn>-->
                            <td>
                              <el-form-item label=" " prop="outHydrantArea" label-width="15px">
                                <el-select type="text" id="outHydrantArea"  v-model="riskInsInputData.riskReportProtectionList[0].outHydrantArea" :disabled=browseFlag filterable>
                                  <!--:class="red || riskReportProtectionList[0].outHydrantArea !=''? '':'recordedPrompt'"-->
                                  <el-option value='A' label="全部覆盖"></el-option>
                                  <el-option value='B' label="主要区域覆盖"></el-option>
                                  <el-option value='C' label="较少覆盖"></el-option>
                                  <el-option value='D' label="无"></el-option>
                                </el-select>
                              </el-form-item>
                            </td>
                          </tr>
                          <tr>
                            <td>是否配备扳手水带</td><!--<span style="color: #EB3941;">*</sapn>-->
                            <td>
                              <el-form-item label=" " prop="outHydrantBag" label-width="15px">
                                <el-select type="text" id="outHydrantBag" v-model="riskInsInputData.riskReportProtectionList[0].outHydrantBag" :disabled=browseFlag filterable>
                                  <!--:class="red || riskReportProtectionList[0].outHydrantBag !=''? '':'recordedPrompt'"-->
                                  <el-option value="A" label="全部是"></el-option>
                                  <el-option value="B" label="部分是"></el-option>
                                  <el-option value="C" label="完全不是"></el-option>
                                </el-select>
                              </el-form-item>
                            </td>
                          </tr>
                          </tbody>
                          <tbody
                            v-if="riskInsInputData.riskReportProtectionList[0].fireEquipType.indexOf('B') !== -1">
                          <tr>
                            <td rowspan="7">自动灭火系统</td>
                            <td>覆盖情况
                              <i v-if="!showUpload('4.1.4.1')" class="el-icon-camera" @click.native="buttonCommonEvent('4.1.4.1')" aria-readonly="true"></i>
                              <i v-if="showUpload('4.1.4.1')" class="el-icon-camera-solid" @click.native="buttonCommonEvent('4.1.4.1')" aria-readonly="true"></i>
                              <!--<Icon type="android-camera" class="cameraicon" @click.native="buttonCommonEvent('4.1.4.1')"></Icon>-->
                            </td><!--<span style="color: #EB3941;">*</sapn>-->
                            <td>
                              <el-form-item label=" " prop="selfExtCase" label-width="15px">
                                <el-select type="text" class="form-control" id="selfExtCase" v-model="riskInsInputData.riskReportProtectionList[0].selfExtCase" :disabled=browseFlag filterable>
                                  <!--:class="red || riskReportProtectionList[0].selfExtCase !=''? '':'recordedPrompt'"-->
                                  <el-option value='A' label="全覆盖"></el-option>
                                  <el-option value='B' label="部分覆盖"></el-option>
                                  <el-option value='C' label="无"></el-option>
                                </el-select>
                              </el-form-item>
                            </td>
                          </tr>
                          <tr>
                            <td>覆盖区域
                              <i v-if="!showUpload('4.1.4.2')" class="el-icon-camera" @click.native="buttonCommonEvent('4.1.4.2')" aria-readonly="true"></i>
                              <i v-if="showUpload('4.1.4.2')" class="el-icon-camera-solid" @click.native="buttonCommonEvent('4.1.4.2')" aria-readonly="true"></i>
                              <!--<Icon type="android-camera" class="cameraicon" @click.native="buttonCommonEvent('4.1.4.2')"></Icon>-->
                            </td>
                            <td>
                              <el-form-item label="" prop="selfExtArea" label-width="15px">
                                <el-checkbox-group v-model="riskInsInputData.riskReportProtectionList[0].selfExtArea" :disabled=browseFlag>
                                  <el-checkbox label="A"><span>生产区</span></el-checkbox>
                                  <el-checkbox label="B"><span>仓储区</span></el-checkbox>
                                  <el-checkbox label="C"><span>办公区</span></el-checkbox>
                                  <el-checkbox label="D"><span>生活区</span></el-checkbox>
                                </el-checkbox-group>
                              </el-form-item>
                            </td>
                          </tr>
                          <tr>
                            <td>喷淋主控电源灯
                              <i v-if="!showUpload('4.1.5')" class="el-icon-camera" @click.native="buttonCommonEvent('4.1.5')" aria-readonly="true"></i>
                              <i v-if="showUpload('4.1.5')" class="el-icon-camera-solid" @click.native="buttonCommonEvent('4.1.5')" aria-readonly="true"></i>
                              <!--<Icon type="android-camera" class="cameraicon" @click.native="buttonCommonEvent('4.1.5')"></Icon>-->
                            </td><!--<span style="color: #EB3941;">*</sapn>-->
                            <td>
                              <el-form-item label=" " prop="powerLed" label-width="15px">
                                <el-select type="text" id="powerLed" v-model="riskInsInputData.riskReportProtectionList[0].powerLed" :disabled=browseFlag filterable>
                                  <!--:class="red || riskReportProtectionList[0].powerLed !=''? '':'recordedPrompt'"-->
                                  <el-option value="A" label="正常"></el-option>
                                  <el-option value="B" label="不正常"></el-option>
                                </el-select>
                              </el-form-item>
                            </td>
                          </tr>
                          <tr>
                            <td>喷淋泵
                              <i v-if="!showUpload('4.1.6.1')" class="el-icon-camera" @click.native="buttonCommonEvent('4.1.6.1')" aria-readonly="true"></i>
                              <i v-if="showUpload('4.1.6.1')" class="el-icon-camera-solid" @click.native="buttonCommonEvent('4.1.6.1')" aria-readonly="true"></i>
                              <!--<Icon type="android-camera" class="cameraicon" @click.native="buttonCommonEvent('4.1.6.1')"></Icon>-->
                            </td>
                            <td>
                              <el-form-item label=" " prop="sprayBolt" label-width="15px">
                                <el-select type="text" id="sprayBolt" v-model="riskInsInputData.riskReportProtectionList[0].sprayBolt" :disabled=browseFlag filterable>
                                  <el-option value="A" label="有"></el-option>
                                  <el-option value="B" label="无"></el-option>
                                </el-select>
                              </el-form-item>
                            </td>
                          </tr>
                          <tr>
                            <td>启动方式
                              <i v-if="!showUpload('4.1.6.2')" class="el-icon-camera" @click.native="buttonCommonEvent('4.1.6.2')" aria-readonly="true"></i>
                              <i v-if="showUpload('4.1.6.2')" class="el-icon-camera-solid" @click.native="buttonCommonEvent('4.1.6.2')" aria-readonly="true"></i>
                              <!--<Icon type="android-camera" class="cameraicon" @click.native="buttonCommonEvent('4.1.6.2')"></Icon>-->
                            </td>
                            <td>
                              <el-form-item label=" " prop="selfExtWay" label-width="15px">
                                <el-select type="text"  id="selfExtWay"  v-model="riskInsInputData.riskReportProtectionList[0].selfExtWay" :disabled=browseFlag filterable>
                                  <!--:class="red || riskReportProtectionList[0].selfExtWay !=''? '':'recordedPrompt'"-->
                                  <el-option value="A" label="手动启动"></el-option>
                                  <el-option value="B" label="自动启动"></el-option>
                                </el-select>
                              </el-form-item>
                            </td>
                          </tr>
                          <tr>
                            <td>消防水来源
                              <i v-if="!showUpload('4.1.7')" class="el-icon-camera" @click.native="buttonCommonEvent('4.1.7')" aria-readonly="true"></i>
                              <i v-if="showUpload('4.1.7')" class="el-icon-camera-solid" @click.native="buttonCommonEvent('4.1.7')" aria-readonly="true"></i>
                              <!--<Icon type="android-camera" class="cameraicon" @click.native="buttonCommonEvent('4.1.7')"></Icon>-->
                            </td><!--<span style="color: #EB3941;">*</sapn>-->
                            <td>
                              <el-form-item label=" " prop="waterSource" label-width="15px">
                                <el-select type="text" id="waterSource"  v-model="riskInsInputData.riskReportProtectionList[0].waterSource" :disabled=browseFlag filterable>
                                  <!--:class="red || riskReportProtectionList[0].waterSource !=''? '':'recordedPrompt'"-->
                                  <el-option value="A" label="天然水源"></el-option>
                                  <el-option value="B" label="消防水池"></el-option>
                                  <el-option value="C" label="市政公共消防水源"></el-option>
                                  <el-option value="D" label="无"></el-option>
                                </el-select>
                              </el-form-item>
                            </td>
                          </tr>
                          <tr>
                            <td>消防水池蓄水情况</td><!--<span style="color: #EB3941;">*</sapn>-->
                            <td>
                              <el-form-item label=" " prop="impoundment" label-width="15px">
                                <el-select type="text" class="form-control" id="impoundment" v-model="riskInsInputData.riskReportProtectionList[0].impoundment" :disabled=browseFlag filterable>
                                  <!--:class="red || riskReportProtectionList[0].impoundment !=''? '':'recordedPrompt'"-->
                                  <el-option value="A" label="蓄水充足"></el-option>
                                  <el-option value="B" label="蓄水半充足"></el-option>
                                  <el-option value="C" label="无"></el-option>
                                </el-select>
                              </el-form-item>
                            </td>
                          </tr>
                          </tbody>
                          <tbody v-if="riskInsInputData.riskReportProtectionList[0].fireEquipType.indexOf('A') !== -1">
                          <tr>
                            <td rowspan="2">自动报警</td>
                            <td>系统类型
                              <i v-if="!showUpload('4.1.3.1')" class="el-icon-camera" @click.native="buttonCommonEvent('4.1.3.1')" aria-readonly="true"></i>
                              <i v-if="showUpload('4.1.3.1')" class="el-icon-camera-solid" @click.native="buttonCommonEvent('4.1.3.1')" aria-readonly="true"></i>
                              <!--<Icon type="android-camera" class="cameraicon" @click.native="buttonCommonEvent('4.1.3.1')"></Icon>-->
                            </td>
                            <td>
                              <el-form-item label=" " prop="alarmType" label-width="15px">
                                <el-select type="text" id="alarmType" v-model="riskInsInputData.riskReportProtectionList[0].alarmType" :disabled=browseFlag filterable>
                                  <el-option value='A' label="火灾手动警钟"></el-option>
                                  <el-option value='B' label="火灾自动报警系统"></el-option>
                                  <el-option value='C' label="无"></el-option>
                                </el-select>
                              </el-form-item>
                            </td>
                          </tr>
                          <tr>
                            <td>工作状况
                              <i v-if="!showUpload('4.1.3.2')" class="el-icon-camera" @click.native="buttonCommonEvent('4.1.3.2')" aria-readonly="true"></i>
                              <i v-if="showUpload('4.1.3.2')" class="el-icon-camera-solid" @click.native="buttonCommonEvent('4.1.3.2')" aria-readonly="true"></i>
                              <!--<Icon type="android-camera" class="cameraicon" @click.native="buttonCommonEvent('4.1.3.2')"></Icon>-->
                            </td>
                            <td>
                              <el-form-item label=" " prop="alarmWork" label-width="15px">
                                <el-select type="text" id="alarmWork" v-model="riskInsInputData.riskReportProtectionList[0].alarmWork" :disabled=browseFlag filterable>
                                  <!--:class="red || riskReportProtectionList[0].alarmWork !=''? '':'recordedPrompt'"-->
                                  <el-option value='A' label="正常"></el-option>
                                  <el-option value='B' label="异常"></el-option>
                                </el-select>
                              </el-form-item>
                            </td>
                          </tr>
                          </tbody>
                        </table>
                      </el-col>
                      <el-col :span="24">
                        <el-col :span="8" v-if="riskInsInputData.riskReportProtectionList[0].fireEquipType.length !== 0">
                          <el-col :span="22">
                            <el-form-item label="通往消防器材通道情况" prop="equipmentChannel" label-width="150px">
                              <el-select v-model="riskInsInputData.riskReportProtectionList[0].equipmentChannel" :disabled=browseFlag filterable>
                                <el-option value="A" label="畅通无阻"></el-option>
                                <el-option value="B" label="部分畅通"></el-option>
                                <el-option value="C" label="完全被阻挡"></el-option>
                              </el-select>
                            </el-form-item>
                          </el-col>
                          <el-col :span="1">
                            <i v-if="!showUpload('4.1.2')" class="el-icon-camera" @click.native="buttonCommonEvent('4.1.2')" aria-readonly="true"></i>
                            <i v-if="showUpload('4.1.2')" class="el-icon-camera-solid" @click.native="buttonCommonEvent('4.1.2')" aria-readonly="true"></i>
                            <!--<Icon type="android-camera" class="cameraicon" @click.native="buttonCommonEvent('4.1.2')" aria-readonly="true"></Icon>-->
                          </el-col>
                        </el-col>
                        <el-col :span="8">
                          <el-col :span="22">
                            <el-form-item label="消防通道畅通情况" prop="channelClear" label-width="150px">
                              <el-select type="text" v-model="riskInsInputData.riskReportProtectionList[0].channelClear" :disabled=browseFlag filterable>
                                <el-option value="A" label="宽阔，便于车辆进出"></el-option>
                                <el-option value="B" label="较狭窄，消防车进入困难"></el-option>
                              </el-select>
                            </el-form-item>
                          </el-col>
                          <el-col :span="1">
                            <i v-if="!showUpload('4.1.9')" class="el-icon-camera" @click.native="buttonCommonEvent('4.1.9')" aria-readonly="true"></i>
                            <i v-if="showUpload('4.1.9')" class="el-icon-camera-solid" @click.native="buttonCommonEvent('4.1.9')" aria-readonly="true"></i>
                            <!--<Icon type="android-camera" class="cameraicon" @click.native="buttonCommonEvent('4.1.9')" aria-readonly="true"></Icon>-->
                          </el-col>
                        </el-col>
                        <el-col :span="8">
                          <el-col :span="22">
                            <el-form-item label="公共消防队到达最短时间" prop="shortTime" label-width="150px">
                              <el-input type="text" v-model="riskInsInputData.riskReportProtectionList[0].shortTime" :disabled=browseFlag>
                                <span slot="append">分钟</span>
                              </el-input>
                            </el-form-item>
                          </el-col>
                        </el-col>
                      </el-col>
                      <el-col :span="24" class="updown">
                        <div class="title">
                          <Icon type="ios-flame-outline"></Icon>
                          消防安全管理：
                        </div>
                      </el-col>
                      <el-col :span="24">
                        <el-col :span="8">
                          <el-col :span="22">
                            <el-form-item label="消防安全机构与人员" prop="firePrePeople" label-width="150px">
                              <el-select type="text" v-model="riskInsInputData.riskReportProtectionList[0].firePrePeople" :disabled=browseFlag filterable>
                                <el-option value="A" label="有专职安全管理人员"></el-option>
                                <el-option value="B" label="有兼职安全管理人员"></el-option>
                                <el-option value="C" label="无专兼职安全管理人员"></el-option>
                              </el-select>
                            </el-form-item>
                          </el-col>
                        </el-col>
                        <el-col :span="8">
                          <el-form-item label="消防验收合格证" prop="firePreCertification" label-width="120px">
                            <el-select type="date" v-model="riskInsInputData.riskReportProtectionList[0].firePreCertification" :disabled=browseFlag filterable>
                              <el-option value="A" label="取得标的所有建筑的消防验收合格证明"></el-option>
                              <el-option value="B" label="取得部分建筑消防验收合格证明"></el-option>
                              <el-option value="C" label="有消防报备证明的文件"></el-option>
                              <el-option value="D" label="不知道是否有验收合格证明"></el-option>
                              <el-option value="E" label="没有"></el-option>
                            </el-select>
                          </el-form-item>
                        </el-col>
                      </el-col>
                      <el-col :span="24">
                        <el-col :span="8">
                          <el-col :span="22">
                            <el-form-item label="消防应急预案" prop="firePlan" label-width="150px">
                              <el-select type="text" v-model="riskInsInputData.riskReportProtectionList[0].firePlan" :disabled=browseFlag filterable @on-change="clearShow">
                                <el-option value="A" label="有"></el-option>
                                <el-option value="B" label="无"></el-option>
                              </el-select>
                            </el-form-item>
                          </el-col>
                          <el-col :span="1">
                            <i v-if="!showUpload('4.2.5')" class="el-icon-camera" @click.native="buttonCommonEvent('4.2.5')" aria-readonly="true"></i>
                            <i v-if="showUpload('4.2.5')" class="el-icon-camera-solid" @click.native="buttonCommonEvent('4.2.5')" aria-readonly="true"></i>
                            <!--<Icon type="android-camera" class="cameraicon" @click.native="buttonCommonEvent('4.2.5')" aria-readonly="true"></Icon>-->
                          </el-col>
                        </el-col>
                        <el-col :span="8" v-if="riskInsInputData.riskReportProtectionList[0].firePlan === 'A'">
                          <el-col :span="22">
                            <el-form-item label="演练频率" prop="drillFrequency" label-width="150px">
                              <el-select type="text" v-model="riskInsInputData.riskReportProtectionList[0].drillFrequency" :disabled=browseFlag filterable>
                                <el-option value="A" label="每月一次"></el-option>
                                <el-option value="B" label="每季一次"></el-option>
                                <el-option value="C" label="每半年一次"></el-option>
                                <el-option value="D" label="每年一次"></el-option>
                                <el-option value="E" label="每两年一次"></el-option>
                                <el-option value="F" label="无演练"></el-option>
                              </el-select>
                            </el-form-item>
                          </el-col>
                        </el-col>
                      </el-col>
                      <el-col :span="24">
                        <el-col :span="8">
                          <el-col :span="22">
                            <el-form-item label="消防设施维护检查频率" prop="checkFrequency" label-width="150px"><!--style="width: 100%"-->
                              <el-select v-model="riskInsInputData.riskReportProtectionList[0].checkFrequency" :disabled=browseFlag filterable>
                                <el-option value="A" label="每月一次"></el-option>
                                <el-option value="B" label="每季一次"></el-option>
                                <el-option value="C" label="每年一次"></el-option>
                                <el-option value="D" label="无检查"></el-option>
                              </el-select>
                            </el-form-item>
                          </el-col>
                          <el-col :span="1">
                            <i v-if="!showUpload('4.2.6.1')" class="el-icon-camera" @click.native="buttonCommonEvent('4.2.6.1')" aria-readonly="true"></i>
                            <i v-if="showUpload('4.2.6.1')" class="el-icon-camera-solid" @click.native="buttonCommonEvent('4.2.6.1')" aria-readonly="true"></i>
                            <!--<Icon type="android-camera" class="cameraicon" @click.native="buttonCommonEvent('4.2.6.1')" aria-readonly="true"></Icon>-->
                          </el-col>
                        </el-col>
                        <el-col :span="8">
                          <el-col :span="22">
                            <el-form-item label="消防自动系统测试频率" prop="testFrequency" label-width="150px">
                              <el-select type="text" v-model="riskInsInputData.riskReportProtectionList[0].testFrequency" :disabled=browseFlag filterable>
                                <el-option value="A" label="每月一次"></el-option>
                                <el-option value="B" label="每季一次"></el-option>
                                <el-option value="C" label="每年一次"></el-option>
                                <el-option value="D" label="每两年一次"></el-option>
                                <el-option value="E" label="无测试频率"></el-option>
                              </el-select>
                            </el-form-item>
                          </el-col>
                          <el-col :span="1">
                            <Icon v-if="!showUpload('4.2.6.2')" class="el-icon-camera" @click.native="buttonCommonEvent('4.2.6.2')" aria-readonly="true"></Icon>
                            <Icon v-if="showUpload('4.2.6.2')" class="el-icon-camera-solid" @click.native="buttonCommonEvent('4.2.6.2')" aria-readonly="true"></Icon>
                            <!--<Icon type="android-camera" class="cameraicon" @click.native="buttonCommonEvent('4.2.6.2')" aria-readonly="true"></Icon>-->
                          </el-col>
                        </el-col>
                        <el-col :span="8">
                          <el-col :span="22">
                            <el-form-item label="员工培训" prop="staffTraining" label-width="150px">
                              <el-select type="text" v-model="riskInsInputData.riskReportProtectionList[0].staffTraining" :disabled=browseFlag filterable>
                                <el-option value="A" label="每月一次"></el-option>
                                <el-option value="B" label="每季一次"></el-option>
                                <el-option value="C" label="每半年一次"></el-option>
                                <el-option value="D" label="每年一次"></el-option>
                                <el-option value="E" label="无培训"></el-option>
                              </el-select>
                            </el-form-item>
                          </el-col>
                          <el-col :span="1">
                            <i v-if="!showUpload('4.2.7')" class="el-icon-camera" @click.native="buttonCommonEvent('4.2.7')" aria-readonly="true"></i>
                            <i v-if="showUpload('4.2.7')" class="el-icon-camera-solid" @click.native="buttonCommonEvent('4.2.7')" aria-readonly="true"></i>
                            <!--<Icon type="android-camera" class="cameraicon" @click.native="buttonCommonEvent('4.2.7')" aria-readonly="true"></Icon>-->
                          </el-col>
                        </el-col>
                      </el-col>
                      <el-col :span="24">
                        <el-col :span="8">
                          <el-col :span="22">
                            <el-form-item label="动火作业管理制度" prop="hotWorkSystem" label-width="150px">
                              <el-select v-model="riskInsInputData.riskReportProtectionList[0].hotWorkSystem" :disabled=browseFlag filterable>
                                <el-option value="A" label="有审批制度"></el-option>
                                <el-option value="B" label="无审批制度"></el-option>
                              </el-select>
                            </el-form-item>
                          </el-col>
                          <el-col :span="1">
                            <i v-if="!showUpload('4.2.3')" class="el-icon-camera" @click.native="buttonCommonEvent('4.2.3')" aria-readonly="true"></i>
                            <i v-if="showUpload('4.2.3')" class="el-icon-camera-solid" @click.native="buttonCommonEvent('4.2.3')" aria-readonly="true"></i>
                            <!--<Icon type="android-camera" class="cameraicon" @click.native="buttonCommonEvent('4.2.3')" aria-readonly="true"></Icon>-->
                          </el-col>
                        </el-col>
                        <el-col :span="8">
                          <el-col :span="22">
                            <el-form-item label="吸烟管理" prop="smokingControl" label-width="150px">
                              <el-select type="text" v-model="riskInsInputData.riskReportProtectionList[0].smokingControl" :disabled=browseFlag filterable>
                                <el-option value="A" label="全部区域禁烟，执行良好"></el-option>
                                <el-option value="B" label="全部区域禁烟，执行不足"></el-option>
                                <el-option value="C" label="指定吸烟区域，执行良好"></el-option>
                                <el-option value="D" label="指定吸烟区域，执行不足"></el-option>
                                <el-option value="E" label="无吸烟管制"></el-option>
                              </el-select>
                            </el-form-item>
                          </el-col>
                          <el-col :span="1">
                            <i v-if="!showUpload('4.2.4')" class="el-icon-camera" @click.native="buttonCommonEvent('4.2.4')" aria-readonly="true"></i>
                            <i v-if="showUpload('4.2.4')" class="el-icon-camera-solid" @click.native="buttonCommonEvent('4.2.4')" aria-readonly="true"></i>
                            <!--<Icon type="android-camera" class="cameraicon" @click.native="buttonCommonEvent('4.2.4')" aria-readonly="true"></Icon>-->
                          </el-col>
                        </el-col>
                        <el-col :span="8">
                          <el-col :span="22">
                            <el-form-item label="电气线路老化检查情况" prop="lineCheck" label-width="150px">
                              <el-select type="text" v-model="riskInsInputData.riskReportProtectionList[0].lineCheck" :disabled=browseFlag filterable>
                                <el-option value="A" label="有老化情况"></el-option>
                                <el-option value="B" label="无老化情况"></el-option>
                              </el-select>
                            </el-form-item>
                          </el-col>
                          <el-col :span="1">
                            <i v-if="!showUpload('4.2.8')" class="el-icon-camera" @click.native="buttonCommonEvent('4.2.8')" aria-readonly="true"></i>
                            <i v-if="showUpload('4.2.8')" class="el-icon-camera-solid" @click.native="buttonCommonEvent('4.2.8')" aria-readonly="true"></i>
                            <!--<Icon type="android-camera" class="cameraicon" @click.native="buttonCommonEvent('4.2.8')" aria-readonly="true"></Icon>-->
                          </el-col>
                        </el-col>
                      </el-col>
                      <el-col :span="24">
                        <el-col :span="8">
                          <el-col :span="22">
                            <el-form-item label="是否有安保巡逻" prop="patrolFlag" label-width="150px">
                              <el-select v-model="riskInsInputData.riskReportProtectionList[0].patrolFlag" :disabled=browseFlag filterable @on-change="clearShow">
                                <el-option value="A" label="有"></el-option>
                                <el-option value="B" label="无"></el-option>
                              </el-select>
                            </el-form-item>
                          </el-col>
                        </el-col>
                        <el-col :span="8" v-if="riskInsInputData.riskReportProtectionList[0].patrolFlag === 'A'">
                          <el-col :span="22">
                            <el-form-item label="巡逻区域" prop="patrolArea" label-width="150px">
                              <el-select type="text" v-model="riskInsInputData.riskReportProtectionList[0].patrolArea" :disabled=browseFlag filterable>
                                <el-option value="A" label="全部区域"></el-option>
                                <el-option value="B" label="部分区域"></el-option>
                              </el-select>
                            </el-form-item>
                          </el-col>
                        </el-col>
                        <el-col :span="8" v-if="riskInsInputData.riskReportProtectionList[0].patrolFlag === 'A'">
                          <el-col :span="22">
                            <el-form-item label="巡逻频次" prop="patrolFrequency" class="select-unit" label-width="150px">
                              <el-select type="text" v-model="riskInsInputData.riskReportProtectionList[0].patrolFrequency" :disabled=browseFlag filterable>
                                <el-option value="A" label="1"></el-option>
                                <el-option value="B" label="2"></el-option>
                                <el-option value="C" label="3"></el-option>
                                <el-option value="D" label="4"></el-option>
                              </el-select>
                              <div class="unit">
                                <span>h/次</span>
                              </div>
                            </el-form-item>
                          </el-col>
                          <el-col :span="1">
                            <i v-if="!showUpload('4.2.9')" class="el-icon-camera" @click.native="buttonCommonEvent('4.2.9')" aria-readonly="true"></i>
                            <i v-if="showUpload('4.2.9')" class="el-icon-camera-solid" @click.native="buttonCommonEvent('4.2.9')" aria-readonly="true"></i>
                            <!--<Icon type="android-camera" class="cameraicon" @click.native="buttonCommonEvent('4.2.9')" aria-readonly="true"></Icon>-->
                          </el-col>
                        </el-col>
                      </el-col>
                      <el-col :span="24">
                        <el-col :span="8">
                          <el-col :span="22">
                            <el-form-item label="近五年历史火灾次数" prop="fireTime" label-width="150px">
                              <el-select v-model="riskInsInputData.riskReportProtectionList[0].fireTime" :disabled=browseFlag filterable>
                                <el-option value="A" label="0"></el-option>
                                <el-option value="B" label="1"></el-option>
                                <el-option value="C" label="2"></el-option>
                                <el-option value="D" label="3"></el-option>
                                <el-option value="E" label="4次及以上"></el-option>
                              </el-select>
                            </el-form-item>
                          </el-col>
                        </el-col>
                      </el-col>
                      <el-col :span="24" class="updown">
                        <div class="title">
                          <Icon type="waterdrop"></Icon>
                          防水灾设施：
                        </div>
                      </el-col>
                      <el-col :span="24">
                        <el-form-item label="企业防水灾设施" prop="waterFacility" label-width="150px"><!--style="width: 100%"-->
                          <el-checkbox-group v-model="riskInsInputData.riskReportProtectionList[0].waterFacility"  @on-change="clearShow">
                            <el-checkbox label="A" :disabled=browseFlag><span>防洪墙</span></el-checkbox>
                            <el-checkbox label="B" :disabled=browseFlag><span>挡水板</span></el-checkbox>
                            <el-checkbox label="C" :disabled=browseFlag><span>沙袋</span></el-checkbox>
                            <el-checkbox label="D" :disabled=browseFlag><span>水泵</span></el-checkbox>
                            <el-checkbox label="E" :disabled=browseFlag><span>其他</span></el-checkbox>
                            <i v-if="!showUpload('4.3.1')" class="el-icon-camera" @click.native="buttonCommonEvent('4.3.1')" aria-readonly="true"></i>
                            <i v-if="showUpload('4.3.1')" class="el-icon-camera-solid" @click.native="buttonCommonEvent('4.3.1')" aria-readonly="true"></i>
                            <!--<Icon type="android-camera" class="cameraicon" @click.native="buttonCommonEvent('4.3.1')" aria-readonly="true"></Icon>-->
                          </el-checkbox-group>
                        </el-form-item>
                      </el-col>
                      <el-col :span="24">
                        <el-col :span="24" v-if="riskInsInputData.riskReportProtectionList[0].waterFacility.indexOf('E') !== -1 ">
                          <el-form-item label="防水灾设施补充说明" prop="addWaterFacility" label-width="150px">
                            <el-input type="textarea" v-model="riskInsInputData.riskReportProtectionList[0].addWaterFacility" :disabled=browseFlag></el-input>
                          </el-form-item>
                        </el-col>
                      </el-col>
                      <el-col :span="24">
                        <el-col :span="8">
                          <el-col :span="22">
                            <el-form-item label="标的总排水方式" prop="drainageMethod" label-width="150px">
                              <el-select v-model="riskInsInputData.riskReportProtectionList[0].drainageMethod" :disabled=browseFlag filterable>
                                <el-option value="A" label="排入市政管道"></el-option>
                                <el-option value="B" label="直接排入江河湖海"></el-option>
                                <el-option value="C" label="自排"></el-option>
                              </el-select>
                            </el-form-item>
                          </el-col>
                        </el-col>
                        <el-col :span="8">
                          <el-col :span="22">
                            <el-form-item label="排水系统是否有堵塞现象" prop="drainageBlock" label-width="160px">
                              <el-select type="text" v-model="riskInsInputData.riskReportProtectionList[0].drainageBlock" :disabled=browseFlag filterable>
                                <el-option value="A" label="是"></el-option>
                                <el-option value="B" label="否"></el-option>
                              </el-select>
                            </el-form-item>
                          </el-col>
                          <el-col :span="1">
                            <i v-if="!showUpload('4.3.3')" class="el-icon-camera" @click.native="buttonCommonEvent('4.3.3')" aria-readonly="true"></i>
                            <i v-if="showUpload('4.3.3')" class="el-icon-camera-solid" @click.native="buttonCommonEvent('4.3.3')" aria-readonly="true"></i>
                            <!--<Icon type="android-camera" class="cameraicon" @click.native="buttonCommonEvent('4.3.3')" aria-readonly="true"></Icon>-->
                          </el-col>
                        </el-col>
                        <el-col :span="8">
                          <el-col :span="22">
                            <el-form-item label="企业汛期抢险救灾预案" prop="waterPlan" label-width="150px">
                              <el-select type="text" v-model="riskInsInputData.riskReportProtectionList[0].waterPlan" :disabled=browseFlag filterable>
                                <el-option value="A" label="已建立"></el-option>
                                <el-option value="B" label="未建立"></el-option>
                              </el-select>
                            </el-form-item>
                          </el-col>
                          <el-col :span="1">
                            <i v-if="!showUpload('4.3.5')" class="el-icon-camera" @click.native="buttonCommonEvent('4.3.5')" aria-readonly="true"></i>
                            <i v-if="showUpload('4.3.5')" class="el-icon-camera-solid" @click.native="buttonCommonEvent('4.3.5')" aria-readonly="true"></i>
                            <!--<Icon type="android-camera" class="cameraicon" @click.native="buttonCommonEvent('4.3.5')" aria-readonly="true"></Icon>-->
                          </el-col>
                        </el-col>
                      </el-col>
                      <el-col :span="24">
                        <el-col :span="8">
                          <el-col :span="22">
                            <el-form-item label="厂区历史进水损失记录" prop="waterLossHistory" class="select-unit" label-width="150px">
                              <el-select v-model="riskInsInputData.riskReportProtectionList[0].waterLossHistory" :disabled=browseFlag filterable>
                                <el-option value="A" label="无"></el-option>
                                <el-option value="B" label="<1万"></el-option>
                                <el-option value="C" label="1-10万"></el-option>
                                <el-option value="D" label="10-50万"></el-option>
                                <el-option value="E" label="＞50万"></el-option>
                              </el-select>
                              <div class="unit">
                                <span>元</span>
                              </div>
                            </el-form-item>
                          </el-col>
                        </el-col>
                        <el-col :span="8">
                          <el-col :span="22">
                            <el-form-item label="地下低洼设备厂房排水设备" prop="lowEquipment" label-width="160px">
                              <el-select type="text" v-model="riskInsInputData.riskReportProtectionList[0].lowEquipment" :disabled=browseFlag filterable>
                                <el-option value="A" label="有"></el-option>
                                <el-option value="B" label="无"></el-option>
                              </el-select>
                            </el-form-item>
                          </el-col>
                        </el-col>
                      </el-col>
                      <el-col :span="24" class="updown">
                        <div class="title">
                          <Icon type="leaf"></Icon>
                          防风灾设施：
                        </div>
                      </el-col>
                      <el-col :span="24">
                        <el-col :span="8">
                          <el-col :span="22">
                            <el-form-item type="text" label="企业风灾应急预案" prop="windPlan" label-width="150px">
                              <el-select v-model="riskInsInputData.riskReportProtectionList[0].windPlan" :disabled=browseFlag filterable>
                                <el-option value="A" label="已建立"></el-option>
                                <el-option value="B" label="未建立"></el-option>
                              </el-select>
                            </el-form-item>
                          </el-col>
                          <el-col :span="1">
                            <i v-if="!showUpload('4.4.1')" class="el-icon-camera" @click.native="buttonCommonEvent('4.4.1')" aria-readonly="true"></i>
                            <i v-if="showUpload('4.4.1')" class="el-icon-camera-solid" @click.native="buttonCommonEvent('4.4.1')" aria-readonly="true"></i>
                            <!--<Icon type="android-camera" class="cameraicon" @click.native="buttonCommonEvent('4.4.1')" aria-readonly="true"></Icon>-->
                          </el-col>
                        </el-col>
                        <el-col :span="8">
                          <el-col :span="22">
                            <el-form-item label="风灾历史损失记录" prop="windLossHistory" class="select-unit" label-width="160px">
                              <el-select type="text" v-model="riskInsInputData.riskReportProtectionList[0].windLossHistory" :disabled=browseFlag filterable>
                                <el-option value="A" label="无"></el-option>
                                <el-option value="B" label="<1万"></el-option>
                                <el-option value="C" label="1-10万"></el-option>
                                <el-option value="D" label=">10万"></el-option>
                              </el-select>
                              <div class="unit">
                                <span>元</span>
                              </div>
                            </el-form-item>
                          </el-col>
                        </el-col>
                        <el-col :span="8">
                          <el-col :span="22">
                            <el-form-item label="轻钢房屋屋面铆钉情况" prop="rivetCondition" label-width="150px">
                              <el-select type="text" v-model="riskInsInputData.riskReportProtectionList[0].rivetCondition" :disabled=browseFlag filterable>
                                <el-option value="A" label="汛期前已检修"></el-option>
                                <el-option value="B" label="汛期前未检修"></el-option>
                              </el-select>
                            </el-form-item>
                          </el-col>
                        </el-col>
                      </el-col>
                      <el-col :span="24" class="updown">
                        <div class="title">
                          <Icon type="ios-bolt"></Icon>
                          防雷击设施：
                        </div>
                      </el-col>
                      <el-col :span="24">
                        <el-col :span="8">
                          <el-col :span="22">
                            <el-form-item label="是否定期检测防雷设施" prop="thunderCheck" label-width="150px">
                              <el-select v-model="riskInsInputData.riskReportProtectionList[0].thunderCheck" :disabled=browseFlag filterable>
                                <el-option value="A" label="是"></el-option>
                                <el-option value="B" label="否"></el-option>
                              </el-select>
                            </el-form-item>
                          </el-col>
                          <el-col :span="1">
                            <i v-if="!showUpload('4.5.1')" class="el-icon-camera" @click.native="buttonCommonEvent('4.5.1')" aria-readonly="true"></i>
                            <i v-if="showUpload('4.5.1')" class="el-icon-camera-solid" @click.native="buttonCommonEvent('4.5.1')" aria-readonly="true"></i>
                            <!--<Icon type="android-camera" class="cameraicon" @click.native="buttonCommonEvent('4.5.1')" aria-readonly="true"></Icon>-->
                          </el-col>
                        </el-col>
                        <el-col :span="8">
                          <el-col :span="22">
                            <el-form-item label="雷击历史损失记录" prop="thunderLossHistory" class="select-unit" label-width="160px">
                              <el-select type="text" v-model="riskInsInputData.riskReportProtectionList[0].thunderLossHistory" :disabled=browseFlag filterable>
                                <el-option value="A" label="无"></el-option>
                                <el-option value="B" label="<1万"></el-option>
                                <el-option value="C" label="1-10万"></el-option>
                                <el-option value="D" label="10-50万"></el-option>
                                <el-option value="E" label=">50万"></el-option>
                              </el-select>
                              <div class="unit">
                                <span>元</span>
                              </div>
                            </el-form-item>
                          </el-col>
                        </el-col>
                      </el-col>
                    </el-form>
                  </el-tab-pane>
                  <el-tab-pane label="地理及自然环境" icon="earth" style="max-height: calc(100vh - 229px);overflow-y: auto;padding: 15px;" name="name6">
                    <el-form ref="riskReportEnvironmentList" :model="riskInsInputData.riskReportEnvironmentList[0]"  label-width="140px" :rules="ruleValidate10">
                      <el-col :span="24">
                        <div class="title">
                          <Icon type="earth"></Icon>
                          地理及自然环境：
                        </div>
                      </el-col>
                      <el-col :span="24">
                        <el-col :span="8">
                          <el-col :span="22">
                            <el-form-item label="区域年平均降雨量" prop="aveRainfal"><!--style="width: 100%"-->
                              <el-input v-model="riskInsInputData.riskReportEnvironmentList[0].aveRainfal"disabled>
                                <span slot="append">mm</span>
                              </el-input>
                            </el-form-item>
                          </el-col>
                        </el-col>
                        <el-col :span="8">
                          <el-col :span="22">
                            <el-form-item label="历史是否发生过积水" prop="havePonding" label-width="150px">
                              <el-select type="text" v-model="riskInsInputData.riskReportEnvironmentList[0].havePonding" disabled filterable @on-change="clearShow">
                                <el-option value="1" label="有"></el-option>
                                <el-option value="0" label="无"></el-option>
                              </el-select>
                            </el-form-item>
                          </el-col>
                        </el-col>
                        <el-col :span="8" v-if="riskInsInputData.riskReportEnvironmentList[0].havePonding === '1'">
                          <el-col :span="22">
                            <el-form-item label="最高积水水位" prop="ponding">
                              <el-input type="text" v-model="riskInsInputData.riskReportEnvironmentList[0].ponding" disabled>
                                <span slot="append">mm</span>
                              </el-input>
                            </el-form-item>
                          </el-col>
                        </el-col>
                      </el-col>
                      <el-col :span="24">
                        <el-col :span="8">
                          <el-col :span="22">
                            <el-form-item label="区域降雪量暴雪记录" prop="haveBlizzard"><!--style="width: 100%"-->
                              <el-select v-model="riskInsInputData.riskReportEnvironmentList[0].haveBlizzard" disabled filterable>
                                <el-option value="1" label="近1年有"></el-option>
                                <el-option value="2" label="近10年有"></el-option>
                                <el-option value="3" label="近20年有"></el-option>
                                <el-option value="4" label="近50年有"></el-option>
                                <el-option value="0" label="无"></el-option>
                              </el-select>
                            </el-form-item>
                          </el-col>
                        </el-col>
                        <el-col :span="8">
                          <el-col :span="22">
                            <el-form-item label="标的所在区域类型" prop="itemAreaType" label-width="150px">
                              <el-select type="text" v-model="riskInsInputData.riskReportEnvironmentList[0].itemAreaType" :disabled=browseFlag filterable>
                                <el-option value="A" label="无积水记录区域"></el-option>
                                <el-option value="B" label="低洼易涝区域"></el-option>
                                <el-option value="C" label="蓄洪区"></el-option>
                                <el-option value="D" label="行洪区"></el-option>
                              </el-select>
                            </el-form-item>
                          </el-col>
                        </el-col>
                        <el-col :span="8">
                          <el-col :span="22">
                            <el-form-item label="标的周围环境" prop="itemEnvironment">
                              <el-select type="text" v-model="riskInsInputData.riskReportEnvironmentList[0].itemEnvironment" :disabled=browseFlag filterable>
                                <el-option value="A" label="沿江、沿河、沿湖"></el-option>
                                <el-option value="B" label="沿海"></el-option>
                                <el-option value="C" label="靠山"></el-option>
                                <el-option value="D" label="无"></el-option>
                              </el-select>
                            </el-form-item>
                          </el-col>
                          <el-col :span="1">
                            <i v-if="!showUpload('5.1.3')" class="el-icon-camera" @click.native="buttonCommonEvent('5.1.3')" aria-readonly="true"></i>
                            <i v-if="showUpload('5.1.3')" class="el-icon-camera-solid" @click.native="buttonCommonEvent('5.1.3')" aria-readonly="true"></i>
                            <!--<Icon type="android-camera" class="cameraicon" @click.native="buttonCommonEvent('5.1.3')" aria-readonly="true"></Icon>-->
                          </el-col>
                        </el-col>
                      </el-col>
                      <el-col :span="24">
                        <el-col :span="8">
                          <el-col :span="22">
                            <el-form-item label="沿江河湖海或靠山距离" prop="itemDistance">
                              <el-input type="text" v-model="riskInsInputData.riskReportEnvironmentList[0].itemDistance" :disabled=browseFlag>
                                <span slot="append">m</span>
                              </el-input>
                            </el-form-item>
                          </el-col>
                        </el-col>
                        <el-col :span="8">
                          <el-col :span="22">
                            <el-form-item label="周围道路或建筑物相比" prop="comparedTerrain" label-width="150px">
                              <el-select type="text" v-model="riskInsInputData.riskReportEnvironmentList[0].comparedTerrain" :disabled=browseFlag filterable>
                                <el-option value="A" label="地势相对较高"></el-option>
                                <el-option value="B" label="地势基本持平"></el-option>
                                <el-option value="C" label="地势相对较低"></el-option>
                              </el-select>
                            </el-form-item>
                          </el-col>
                          <el-col :span="1">
                            <i v-if="!showUpload('5.1.4')" class="el-icon-camera" @click.native="buttonCommonEvent('5.1.4')" aria-readonly="true"></i>
                            <i v-if="showUpload('5.1.4')" class="el-icon-camera-solid" @click.native="buttonCommonEvent('5.1.4')" aria-readonly="true"></i>
                            <!--<Icon type="android-camera" class="cameraicon" @click.native="buttonCommonEvent('5.1.4')" aria-readonly="true"></Icon>-->
                          </el-col>
                        </el-col>
                        <el-col :span="8">
                          <el-col :span="22">
                            <el-form-item label="比较程度" prop="comparedDegree">
                              <el-input type="text" v-model="riskInsInputData.riskReportEnvironmentList[0].comparedDegree" :disabled=browseFlag></el-input>
                            </el-form-item>
                          </el-col>
                        </el-col>
                      </el-col>
                      <el-col :span="24">
                        <el-col :span="8">
                          <el-col :span="22">
                            <el-form-item label="企业内地势情况" prop="insTerrain">
                              <el-select type="text" v-model="riskInsInputData.riskReportEnvironmentList[0].insTerrain" :disabled=browseFlag filterable @on-change="clearShow">
                                <el-option value="A" label="有明显的低洼处"></el-option>
                                <el-option value="B" label="无明显的低洼处"></el-option>
                              </el-select>
                            </el-form-item>
                          </el-col>
                          <el-col :span="1">
                            <i v-if="!showUpload('5.1.5')" class="el-icon-camera" @click.native="buttonCommonEvent('5.1.5')" aria-readonly="true"></i>
                            <i v-if="showUpload('5.1.5')" class="el-icon-camera-solid" @click.native="buttonCommonEvent('5.1.5')" aria-readonly="true"></i>
                            <!--<Icon type="android-camera" class="cameraicon" @click.native="buttonCommonEvent('5.1.5')" aria-readonly="true"></Icon>-->
                          </el-col>
                        </el-col>
                        <el-col :span="8">
                          <el-col :span="22">
                            <el-form-item label="厂区历史雪灾损失" prop="snowLossHistory" class="select-unit" label-width="150px">
                              <el-select type="text" v-model="riskInsInputData.riskReportEnvironmentList[0].snowLossHistory" :disabled=browseFlag filterable>
                                <el-option value="A" label="无"></el-option>
                                <el-option value="B" label="<10万"></el-option>
                                <el-option value="C" label="10-50万"></el-option>
                                <el-option value="D" label=">50万"></el-option>
                              </el-select>
                              <div class="unit">
                                <span>元</span>
                              </div>
                            </el-form-item>
                          </el-col>
                        </el-col>
                      </el-col>
                      <el-col :span="24">
                        <el-col :span="24" v-if="riskInsInputData.riskReportEnvironmentList[0].insTerrain === 'A'">
                          <el-form-item label="低洼处标的物存放情况" prop="lowGoods">
                            <el-input type="textarea" v-model="riskInsInputData.riskReportEnvironmentList[0].lowGoods" :disabled=browseFlag></el-input>
                          </el-form-item>
                        </el-col>
                      </el-col>
                      <el-col :span="24">
                        <el-col :span="24">
                          <el-form-item label="标的周围环境补充" prop="addEnvironment">
                            <el-input type="textarea" v-model="riskInsInputData.riskReportEnvironmentList[0].addEnvironment" :disabled=browseFlag></el-input>
                          </el-form-item>
                        </el-col>
                      </el-col>
                      <el-col :span="24">
                        <div class="title">
                          <Icon type="ios-sunny"></Icon>
                          标的所在省份近5年热带气旋情况：
                        </div>
                      </el-col>
                      <el-col :span="24">
                        <el-col :span="8">
                          <el-col :span="22">
                            <el-form-item label="热带气旋影响程度" prop="haveCyclone">
                              <el-select type="text" v-model="riskInsInputData.riskReportEnvironmentList[0].haveCyclone" disabled filterable @on-change="clearShow">
                                <el-option value="0" label="所在区域无影响"></el-option>
                                <el-option value="1" label="所在区域影响较小"></el-option>
                                <el-option value="2" label="所在区域影响一般"></el-option>
                                <el-option value="3" label="所在区域影响较大"></el-option>
                              </el-select>
                            </el-form-item>
                          </el-col>
                        </el-col>
                        <el-col :span="8" v-if="riskInsInputData.riskReportEnvironmentList[0].haveCyclone !== '' && riskInsInputData.riskReportEnvironmentList[0].haveCyclone !== '0'">
                          <el-col :span="22">
                            <el-form-item label="热带气旋影响月份" prop="cycloneMonth" label-width="150px">
                              <el-input type="text" v-model="riskInsInputData.riskReportEnvironmentList[0].cycloneMonth" disabled></el-input>
                            </el-form-item>
                          </el-col>
                        </el-col>
                      </el-col>
                      <el-col :span="24">
                        <table class="mytable" border="0" cellspacing="0" cellpadding="0"><!--class="table  table-bordered table-hover"-->
                          <thead>
                          <tr>
                            <th colspan="2" >历年情况</th>
                            <th>个数</th>
                            <th>最大等级</th>
                          </tr>
                          </thead>
                          <tbody>
                          <tr>
                            <td>登陆</td>
                            <td rowspan="2" style="vertical-align:middle;">标的所在省份近5年热带气旋</td>
                            <td><el-input type="text" id="entryNum" v-model="riskInsInputData.riskReportEnvironmentList[0].entryNum" disabled></el-input></td>
                            <td><el-input type="text" id="entryLev" v-model="riskInsInputData.riskReportEnvironmentList[0].entryLev" disabled></el-input></td>
                          </tr>
                          <tr>
                            <td>影响</td>
                            <td><el-input type="text" id="impactNum" v-model="riskInsInputData.riskReportEnvironmentList[0].impactNum" disabled></el-input></td>
                            <td><el-input type="text" id="impactLev" v-model="riskInsInputData.riskReportEnvironmentList[0].impactLev" disabled></el-input></td>
                          </tr>
                          </tbody>
                        </table>
                      </el-col>
                      <el-col :span="24">
                        <el-col :span="8">
                          <el-form-item label="是否位于地震带上" prop="haveEarthquake" label-width="120px"><!--style="width: 100%"-->
                            <el-select v-model="riskInsInputData.riskReportEnvironmentList[0].haveEarthquake" filterable disabled>
                              <el-option value="1" label="是"></el-option>
                              <el-option value="0" label="否"></el-option>
                            </el-select>
                          </el-form-item>
                        </el-col>
                        <el-col :span="8">
                          <el-col :span="22">
                            <el-form-item label="所在地区地震最高烈度" prop="earthquakeHis" label-width="230px">
                              <el-select type="text" v-model="riskInsInputData.riskReportEnvironmentList[0].earthquakeHis" filterable disabled>
                                <el-option value="1" label="5度及以下"></el-option>
                                <el-option value="2" label="6度"></el-option>
                                <el-option value="3" label="7度"></el-option>
                                <el-option value="4" label="8度及以上"></el-option>
                              </el-select>
                            </el-form-item>
                          </el-col>
                        </el-col>
                        <el-col :span="8">
                          <el-form-item label="近十年地震损失次数" prop="earthquakeNum" label-width="240px">
                            <el-select type="text" v-model="riskInsInputData.riskReportEnvironmentList[0].earthquakeNum" filterable disabled>
                              <el-option value="0" label="无"></el-option>
                              <el-option value="1" label="1-5次"></el-option>
                              <el-option value="2" label="5-10次"></el-option>
                              <el-option value="3" label="10次以上"></el-option>
                            </el-select>
                          </el-form-item>
                        </el-col>
                      </el-col>
                      <el-col :span="24">
                        <el-col :span="8">
                          <el-form-item label="所在地属于" prop="haveThunder" label-width="120px"><!--style="width: 100%"-->
                            <el-select v-model="riskInsInputData.riskReportEnvironmentList[0].haveThunder" filterable disabled>
                              <el-option value="1" label="少雷区（年平均雷暴数≤20天）"></el-option>
                              <el-option value="2" label="多雷区（20天＜年平均雷暴数≤40天）"></el-option>
                              <el-option value="3" label="高雷区（40天＜年平均雷暴数≤60天）"></el-option>
                              <el-option value="4" label="强雷区（年平均雷暴数>60天）"></el-option>
                            </el-select>
                          </el-form-item>
                        </el-col>
                        <el-col :span="8">
                          <el-col :span="22">
                            <el-form-item label="是否处于泥石流、滑坡、崩塌多发区" prop="haveCollapse" label-width="230px">
                              <el-select type="text" v-model="riskInsInputData.riskReportEnvironmentList[0].haveCollapse" filterable disabled>
                                <el-option value="1" label="是"></el-option>
                                <el-option value="0" label="否"></el-option>
                              </el-select>
                            </el-form-item>
                          </el-col>
                        </el-col>
                        <el-col :span="8">
                          <el-form-item label="是否发生过重大泥石流、滑坡、崩塌灾害" prop="collapseHis" label-width="240px">
                            <el-select type="text" v-model="riskInsInputData.riskReportEnvironmentList[0].collapseHis" filterable disabled>
                              <el-option value="1" label="是"></el-option>
                              <el-option value="0" label="否"></el-option>
                            </el-select>
                          </el-form-item>
                        </el-col>
                      </el-col>
                      <el-col :span="24">
                        <div class="title">
                          <Icon type="ios-eye"></Icon>
                          周边建筑物状况：
                        </div>
                      </el-col>
                      <el-col :span="24">
                        <table class="mytable" border="0" cellspacing="0" cellpadding="0">
                          <thead>
                          <tr>
                            <th>方位</th>
                            <th>占用性质</th>
                            <th>距离（米）</th>
                            <th>建筑结构</th>
                            <th>建筑高度（米）</th>
                          </tr>
                          </thead>
                          <tbody>
                          <tr>
                            <td>东</td>
                            <td>
                              <el-form-item label="" prop="eastOccupation" label-width="10px">
                                <el-select type="text" v-model="riskInsInputData.riskReportEnvironmentList[0].eastOccupation" :disabled=browseFlag filterable>
                                  <el-option value="01" label="居住建筑"></el-option>
                                  <el-option value="02" label="公共建筑"></el-option>
                                  <el-option value="03" label="行政办公建筑"></el-option>
                                  <el-option value="04" label="商务办公建筑"></el-option>
                                  <el-option value="05" label="商业建筑"></el-option>
                                  <el-option value="06" label="文化建筑"></el-option>
                                  <el-option value="07" label="体育建筑"></el-option>
                                  <el-option value="08" label="医疗建筑"></el-option>
                                  <el-option value="09" label="生产建筑"></el-option>
                                  <el-option value="10" label="仓储建筑"></el-option>
                                  <el-option value="11" label="科教建筑"></el-option>
                                  <el-option value="12" label="科研建筑"></el-option>
                                  <el-option value="13" label="教育建筑"></el-option>
                                  <el-option value="14" label="交通建筑"></el-option>
                                  <el-option value="15" label="公用建筑"></el-option>
                                  <el-option value="16" label="特殊建筑"></el-option>
                                  <el-option value="99" label="其他"></el-option>
                                </el-select>
                              </el-form-item>
                            </td>
                            <td>
                              <el-form-item label="" prop="eastDistance" label-width="10px">
                                <el-input type="text" id="eastDistance" v-model="riskInsInputData.riskReportEnvironmentList[0].eastDistance" :disabled=browseFlag filterable></el-input>
                              </el-form-item>
                            </td>
                            <td>
                              <el-form-item label="" prop="eastConstruction" label-width="10px">
                                <el-select type="text" id="eastConstruction" v-model="riskInsInputData.riskReportEnvironmentList[0].eastConstruction" :disabled=browseFlag filterable>
                                  <el-option value="A" label="钢筋混凝土结构"></el-option>
                                  <el-option value="B" label="砖混结构"></el-option>
                                  <el-option value="C" label="砖木结构"></el-option>
                                  <el-option value="D" label="钢结构"></el-option>
                                  <el-option value="E" label="简易建筑"></el-option>
                                </el-select>
                              </el-form-item>
                            </td>
                            <td>
                              <el-form-item label="" prop="eastHeight" label-width="10px">
                                <el-input type="text" id="eastHeight" v-model="riskInsInputData.riskReportEnvironmentList[0].eastHeight" :disabled=browseFlag></el-input>
                              </el-form-item>
                            </td>
                          </tr>
                          <tr>
                            <td>南</td>
                            <td>
                              <el-form-item label="" prop="southOccupation" label-width="10px">
                                <el-select type="text" v-model="riskInsInputData.riskReportEnvironmentList[0].southOccupation" :disabled=browseFlag filterable>
                                  <el-option value="01" label="居住建筑"></el-option>
                                  <el-option value="02" label="公共建筑"></el-option>
                                  <el-option value="03" label="行政办公建筑"></el-option>
                                  <el-option value="04" label="商务办公建筑"></el-option>
                                  <el-option value="05" label="商业建筑"></el-option>
                                  <el-option value="06" label="文化建筑"></el-option>
                                  <el-option value="07" label="体育建筑"></el-option>
                                  <el-option value="08" label="医疗建筑"></el-option>
                                  <el-option value="09" label="生产建筑"></el-option>
                                  <el-option value="10" label="仓储建筑"></el-option>
                                  <el-option value="11" label="科教建筑"></el-option>
                                  <el-option value="12" label="科研建筑"></el-option>
                                  <el-option value="13" label="教育建筑"></el-option>
                                  <el-option value="14" label="交通建筑"></el-option>
                                  <el-option value="15" label="公用建筑"></el-option>
                                  <el-option value="16" label="特殊建筑"></el-option>
                                  <el-option value="99" label="其他"></el-option>
                                </el-select>
                              </el-form-item>
                            </td>
                            <td>
                              <el-form-item label="" prop="southDistance" label-width="10px">
                                <el-input type="text" id="southDistance" v-model="riskInsInputData.riskReportEnvironmentList[0].southDistance" :disabled=browseFlag></el-input>
                              </el-form-item>
                            </td>
                            <td>
                              <el-form-item label="" prop="southConstruction" label-width="10px">
                                <el-select type="text" id="southConstruction" v-model="riskInsInputData.riskReportEnvironmentList[0].southConstruction" :disabled=browseFlag filterable>
                                  <el-option value="A" label="钢筋混凝土结构"></el-option>
                                  <el-option value="B" label="砖混结构"></el-option>
                                  <el-option value="C" label="砖木结构"></el-option>
                                  <el-option value="D" label="钢结构"></el-option>
                                  <el-option value="E" label="简易建筑"></el-option>
                                </el-select>
                              </el-form-item>
                            </td>
                            <td>
                              <el-form-item label="" prop="southHeight" label-width="10px">
                                <el-input type="text" id="southHeight" v-model="riskInsInputData.riskReportEnvironmentList[0].southHeight" :disabled=browseFlag></el-input>
                              </el-form-item>
                            </td>
                          </tr>
                          <tr>
                            <td>西</td>
                            <td>
                              <el-form-item label="" prop="westOccupation" label-width="10px">
                                <el-select type="text" v-model="riskInsInputData.riskReportEnvironmentList[0].westOccupation" :disabled=browseFlag filterable>
                                  <el-option value="01" label="居住建筑"></el-option>
                                  <el-option value="02" label="公共建筑"></el-option>
                                  <el-option value="03" label="行政办公建筑"></el-option>
                                  <el-option value="04" label="商务办公建筑"></el-option>
                                  <el-option value="05" label="商业建筑"></el-option>
                                  <el-option value="06" label="文化建筑"></el-option>
                                  <el-option value="07" label="体育建筑"></el-option>
                                  <el-option value="08" label="医疗建筑"></el-option>
                                  <el-option value="09" label="生产建筑"></el-option>
                                  <el-option value="10" label="仓储建筑"></el-option>
                                  <el-option value="11" label="科教建筑"></el-option>
                                  <el-option value="12" label="科研建筑"></el-option>
                                  <el-option value="13" label="教育建筑"></el-option>
                                  <el-option value="14" label="交通建筑"></el-option>
                                  <el-option value="15" label="公用建筑"></el-option>
                                  <el-option value="16" label="特殊建筑"></el-option>
                                  <el-option value="99" label="其他"></el-option>
                                </el-select>
                              </el-form-item>
                            </td>
                            <td>
                              <el-form-item label="" prop="westDistance" label-width="10px">
                                <el-input type="text" id="westDistance" v-model="riskInsInputData.riskReportEnvironmentList[0].westDistance" :disabled=browseFlag></el-input>
                              </el-form-item>
                            </td>
                            <td>
                              <el-form-item label="" prop="westConstruction" label-width="10px">
                                <el-select type="text" id="westConstruction" v-model="riskInsInputData.riskReportEnvironmentList[0].westConstruction" :disabled=browseFlag filterable>
                                  <el-option value="A" label="钢筋混凝土结构"></el-option>
                                  <el-option value="B" label="砖混结构"></el-option>
                                  <el-option value="C" label="砖木结构"></el-option>
                                  <el-option value="D" label="钢结构"></el-option>
                                  <el-option value="E" label="简易建筑"></el-option>
                                </el-select>
                              </el-form-item>
                            </td>
                            <td>
                              <el-form-item label="" prop="westHeight" label-width="10px">
                                <el-input type="text" id="westHeight" v-model="riskInsInputData.riskReportEnvironmentList[0].westHeight" :disabled=browseFlag></el-input>
                              </el-form-item>
                            </td>
                          </tr>
                          <tr>
                            <td>北</td>
                            <td>
                              <el-form-item label="" prop="northOccupation" label-width="10px">
                                <el-select type="text" class="form-control" v-model="riskInsInputData.riskReportEnvironmentList[0].northOccupation" :disabled=browseFlag filterable>
                                  <el-option value="01" label="居住建筑"></el-option>
                                  <el-option value="02" label="公共建筑"></el-option>
                                  <el-option value="03" label="行政办公建筑"></el-option>
                                  <el-option value="04" label="商务办公建筑"></el-option>
                                  <el-option value="05" label="商业建筑"></el-option>
                                  <el-option value="06" label="文化建筑"></el-option>
                                  <el-option value="07" label="体育建筑"></el-option>
                                  <el-option value="08" label="医疗建筑"></el-option>
                                  <el-option value="09" label="生产建筑"></el-option>
                                  <el-option value="10" label="仓储建筑"></el-option>
                                  <el-option value="11" label="科教建筑"></el-option>
                                  <el-option value="12" label="科研建筑"></el-option>
                                  <el-option value="13" label="教育建筑"></el-option>
                                  <el-option value="14" label="交通建筑"></el-option>
                                  <el-option value="15" label="公用建筑"></el-option>
                                  <el-option value="16" label="特殊建筑"></el-option>
                                  <el-option value="99" label="其他"></el-option>
                                </el-select>
                              </el-form-item>
                            </td>
                            <td>
                              <el-form-item label="" prop="northDistance" label-width="10px">
                                <el-input type="text" id="northDistance" v-model="riskInsInputData.riskReportEnvironmentList[0].northDistance" :disabled=browseFlag></el-input>
                              </el-form-item>
                            </td>
                            <td>
                              <el-form-item label="" prop="northConstruction" label-width="10px">
                                <el-select type="text" id="northConstruction" v-model="riskInsInputData.riskReportEnvironmentList[0].northConstruction" :disabled=browseFlag filterable>
                                  <el-option value="A" label="钢筋混凝土结构"></el-option>
                                  <el-option value="B" label="砖混结构"></el-option>
                                  <el-option value="C" label="砖木结构"></el-option>
                                  <el-option value="D" label="钢结构"></el-option>
                                  <el-option value="E" label="简易建筑"></el-option>
                                </el-select>
                              </el-form-item>
                            </td>
                            <td>
                              <el-form-item label="" prop="northHeight" label-width="10px">
                                <el-input type="text" id="northHeight" v-model="riskInsInputData.riskReportEnvironmentList[0].northHeight" :disabled=browseFlag></el-input>
                              </el-form-item>
                            </td>
                          </tr>
                          </tbody>
                        </table>
                      </el-col>
                      <el-col :span="24">
                        <el-col :span="8">
                          <el-col :span="22">
                            <el-form-item label="与周边建筑物间距" prop="distanceAround" label-width="120px">
                              <el-select v-model="riskInsInputData.riskReportEnvironmentList[0].distanceAround" :disabled=browseFlag filterable>
                                <el-option value="A" label="间距均符合要求"></el-option>
                                <el-option value="B" label="部分方位间距不符合要求"></el-option>
                                <el-option value="C" label="间距均不符合要求"></el-option>
                              </el-select>
                            </el-form-item>
                          </el-col>
                          <el-col :span="1">
                            <i v-if="!showUpload('5.2.1')" class="el-icon-camera" @click.native="buttonCommonEvent('5.2.1')" aria-readonly="true"></i>
                            <i v-if="showUpload('5.2.1')" class="el-icon-camera-solid" @click.native="buttonCommonEvent('5.2.1')" aria-readonly="true"></i>
                            <!--<Icon type="android-camera" class="cameraicon" @click.native="buttonCommonEvent('5.2.1')" aria-readonly="true"></Icon>-->
                          </el-col>
                        </el-col>
                        <el-col :span="8">
                          <el-col :span="22">
                            <el-form-item label="建筑物间过道是否堆放可燃物可能导致延烧" prop="burningFlag"label-width="250px">
                              <el-select type="text" v-model="riskInsInputData.riskReportEnvironmentList[0].burningFlag" :disabled=browseFlag filterable>
                                <el-option value="A" label="是"></el-option>
                                <el-option value="B" label="否"></el-option>
                              </el-select>
                            </el-form-item>
                          </el-col>
                          <el-col :span="1">
                            <i v-if="!showUpload('5.2.2')" class="el-icon-camera" @click.native="buttonCommonEvent('5.2.2')" aria-readonly="true"></i>
                            <i v-if="showUpload('5.2.2')" class="el-icon-camera-solid" @click.native="buttonCommonEvent('5.2.2')" aria-readonly="true"></i>
                            <!--<Icon type="android-camera" class="cameraicon" @click.native="buttonCommonEvent('5.2.2')" aria-readonly="true"></Icon>-->
                          </el-col>
                        </el-col>
                      </el-col>
                      <el-col :span="24" style="margin-top: 8px">
                        <el-col :span="24" class="updown">
                          <el-form-item label="信息补充" prop="addMessage" label-width="120px">
                            <el-input type="textarea" v-model="riskInsInputData.riskReportEnvironmentList[0].addMessage" :disabled=browseFlag></el-input>
                          </el-form-item>
                        </el-col>
                      </el-col>
                    </el-form>
                  </el-tab-pane>
                  <el-tab-pane label="扩展责任信息" icon="cloud" style="max-height: calc(100vh - 229px);overflow-y: auto;padding: 15px;" name="name7">
                    <el-form ref="riskReportMainVoC" :model="riskInsInputData.riskReportMainVo"  label-width="140px" :rules="ruleValidate11">
                      <el-col :span="24">
                        <el-col :span="24">
                          <el-form-item label="投保附加险情况" prop="addRisk">
                            <el-checkbox-group v-model="riskInsInputData.riskReportMainVo.addRisk" @on-change="clearShow">
                              <el-checkbox label="A" :disabled=browseFlag><span>扩展盗窃、抢劫责任</span></el-checkbox>
                              <el-checkbox label="B" :disabled=browseFlag><span>扩展供应中断责任</span></el-checkbox>
                            </el-checkbox-group>
                          </el-form-item>
                        </el-col>
                      </el-col>
                    </el-form>
                    <el-form ref="riskReportTheftList" :model="riskInsInputData.riskReportTheftList[0]"  label-width="140px" :rules="ruleValidate12">
                      <div v-if="riskInsInputData.riskReportMainVo.addRisk.indexOf('A') !== -1">
                        <el-col :span="24">
                          <div class="title">
                            <Icon type="heart-broken"></Icon>
                            扩展盗窃、抢劫责任：
                          </div>
                        </el-col>
                        <el-col :span="24">
                          <el-col :span="8">
                            <el-col :span="22">
                              <el-form-item label="被保物吸引力" prop="insuredAttraction"><!--style="width: 100%"-->
                                <el-select v-model="riskInsInputData.riskReportTheftList[0].insuredAttraction" :disabled=browseFlag filterable>
                                  <el-option value="A" label="低"></el-option>
                                  <el-option value="B" label="中"></el-option>
                                  <el-option value="C" label="高"></el-option>
                                </el-select>
                              </el-form-item>
                            </el-col>
                          </el-col>
                          <el-col :span="8">
                            <el-col :span="22">
                              <el-form-item label="是否有被盗抢记录" prop="theftHistoryFlag" label-width="150px">
                                <el-select type="text" v-model="riskInsInputData.riskReportTheftList[0].theftHistoryFlag" :disabled=browseFlag filterable>
                                  <el-option value="A" label="是"></el-option>
                                  <el-option value="B" label="否"></el-option>
                                </el-select>
                              </el-form-item>
                            </el-col>
                          </el-col>
                        </el-col>
                        <el-col :span="24">
                          <el-col :span="8">
                            <el-col :span="22">
                              <el-form-item label="是否有技术防盗设施" prop="antiTheftFlag">
                                <el-select v-model="riskInsInputData.riskReportTheftList[0].antiTheftFlag" @on-change="clearAntiTheftType" :disabled=browseFlag filterable>
                                  <el-option value="A" label="有"></el-option>
                                  <el-option value="B" label="无"></el-option>
                                </el-select>
                              </el-form-item>
                            </el-col>
                            <el-col :span="1">
                              <i v-if="!showUpload('6.1.2')" class="el-icon-camera" @click.native="buttonCommonEvent('6.1.2')" aria-readonly="true"></i>
                              <i v-if="showUpload('6.1.2')" class="el-icon-camera-solid" @click.native="buttonCommonEvent('6.1.2')" aria-readonly="true"></i>
                              <!--<Icon type="android-camera" class="cameraicon" @click.native="buttonCommonEvent('6.1.2')" aria-readonly="true"></Icon>-->
                            </el-col>
                          </el-col>
                          <el-col :span="8" v-if="riskInsInputData.riskReportTheftList[0].antiTheftFlag =='A'">
                            <el-col :span="22">
                              <el-form-item label="物理防盗设施类型" prop="antiTheftType" label-width="150px">
                                <el-input type="text" v-model="riskInsInputData.riskReportTheftList[0].antiTheftType" :disabled=browseFlag></el-input>
                              </el-form-item>
                            </el-col>
                          </el-col>
                          <el-col :span="8">
                            <el-col :span="22">
                              <el-form-item label="是否与公安机关联网" prop="netPoliceFlag" label-width="150px">
                                <el-select v-model="riskInsInputData.riskReportTheftList[0].netPoliceFlag" :disabled=browseFlag filterable>
                                  <el-option value="A" label="是"></el-option>
                                  <el-option value="B" label="否"></el-option>
                                </el-select>
                              </el-form-item>
                            </el-col>
                            <el-col :span="1">
                              <i v-if="!showUpload('6.1.3')" class="el-icon-camera" @click.native="buttonCommonEvent('6.1.3')" aria-readonly="true"></i>
                              <i v-if="showUpload('6.1.3')" class="el-icon-camera-solid" @click.native="buttonCommonEvent('6.1.3')" aria-readonly="true"></i>
                              <!--<Icon type="android-camera" class="cameraicon" @click.native="buttonCommonEvent('6.1.3')" aria-readonly="true"></Icon>-->
                            </el-col>
                          </el-col>
                        </el-col>
                        <el-col :span="24">
                          <el-col :span="8">
                            <el-col :span="22">
                              <el-form-item label="保安警卫人数" prop="securityNumber">
                                <el-select v-model="riskInsInputData.riskReportTheftList[0].securityNumber" :disabled=browseFlag filterable>
                                  <el-option value="A" label="0人"></el-option>
                                  <el-option value="B" label="1-5人"></el-option>
                                  <el-option value="C" label="6-19人"></el-option>
                                  <el-option value="D" label="20人以上"></el-option>
                                </el-select>
                              </el-form-item>
                            </el-col>
                          </el-col>
                          <el-col :span="8">
                            <el-col :span="22">
                              <el-form-item label="是否定时巡逻" prop="timingPatrol" label-width="150px">
                                <el-select type="text" v-model="riskInsInputData.riskReportTheftList[0].timingPatrol" :disabled=browseFlag filterable>
                                  <el-option value="A" label="是，且有巡逻记录"></el-option>
                                  <el-option value="B" label="是，但没有巡逻记录"></el-option>
                                  <el-option value="C" label="否"></el-option>
                                </el-select>
                              </el-form-item>
                            </el-col>
                            <el-col :span="1">
                              <i v-if="!showUpload('6.1.5')" class="el-icon-camera" @click.native="buttonCommonEvent('6.1.5')" aria-readonly="true"></i>
                              <i v-if="showUpload('6.1.5')" class="el-icon-camera-solid" @click.native="buttonCommonEvent('6.1.5')" aria-readonly="true"></i>
                              <!--<Icon type="android-camera" class="cameraicon" @click.native="buttonCommonEvent('6.1.5')" aria-readonly="true"></Icon>-->
                            </el-col>
                          </el-col>
                          <el-col :span="8">
                            <el-col :span="22">
                              <el-form-item label="所在区域社会治安情况" prop="publicSecurity" label-width="150px">
                                <el-select type="text" v-model="riskInsInputData.riskReportTheftList[0].publicSecurity" :disabled=browseFlag filterable>
                                  <el-option value="A" label="好"></el-option>
                                  <el-option value="B" label="一般"></el-option>
                                  <el-option value="C" label="差"></el-option>
                                </el-select>
                              </el-form-item>
                            </el-col>
                          </el-col>
                        </el-col>
                      </div>
                    </el-form>
                    <el-form ref="riskReportInterruptList" :model="riskInsInputData.riskReportInterruptList[0]"  label-width="140" :rules="ruleValidate13">
                      <div v-if="riskInsInputData.riskReportMainVo.addRisk.indexOf('B') !== -1">
                        <el-col :span="24" class="updown">
                          <div class="title">
                            <Icon type="battery-empty"></Icon>
                            扩展供应中断责任：
                          </div>
                        </el-col>
                        <el-col :span="24">
                          <el-col :span="8">
                            <el-col :span="22">
                              <el-form-item label="公共供电情况" prop="powerSupply">
                                <el-select v-model="riskInsInputData.riskReportInterruptList[0].powerSupply" :disabled=browseFlag filterable>
                                  <el-option value="A" label="单回路供电"></el-option>
                                  <el-option value="B" label="单电源双回路供电"></el-option>
                                  <el-option value="C" label="双电源双回路供电"></el-option>
                                </el-select>
                              </el-form-item>
                            </el-col>
                          </el-col>
                          <el-col :span="8">
                            <el-col :span="22">
                              <el-form-item label="是否拥有断电保护设施" prop="outagePro" label-width="150px">
                                <el-select type="text" v-model="riskInsInputData.riskReportInterruptList[0].outagePro" :disabled=browseFlag filterable>
                                  <el-option value="A" label="无"></el-option>
                                  <el-option value="B" label="UPS（即不间断电源）"></el-option>
                                  <el-option value="C" label="保安电源"></el-option>
                                  <el-option value="D" label="自备电厂"></el-option>
                                </el-select>
                              </el-form-item>
                            </el-col>
                          </el-col>
                          <el-col :span="8">
                            <el-col :span="22">
                              <el-form-item label="电水气等供应突然中断" prop="interruptEffect" label-width="150px">
                                <el-select type="text" v-model="riskInsInputData.riskReportInterruptList[0].interruptEffect" :disabled=browseFlag filterable>
                                  <el-option value="A" label="对设备及产品的影响程度低"></el-option>
                                  <el-option value="B" label="对设备及产品的影响程度中"></el-option>
                                  <el-option value="C" label="对设备及产品的影响程度高"></el-option>
                                </el-select>
                              </el-form-item>
                            </el-col>
                          </el-col>
                        </el-col>
                      </div>
                      <el-col :span="24">
                        <el-col :span="24">
                          <el-form-item label="信息补充" prop="addMessage">
                            <el-input type="textarea" v-model="riskInsInputData.riskReportInterruptList[0].addMessage" :disabled=browseFlag></el-input>
                          </el-form-item>
                        </el-col>
                      </el-col>
                    </el-form>
                  </el-tab-pane>
                  <el-tab-pane label="综合风险反馈" icon="image" style="max-height: calc(100vh - 229px);overflow-y: auto;padding: 15px;" name="name8">
                    <div v-show="riskInsInputData.riskReportMainVo.underwriteFlag !== 'T'">
                      <el-col :span="24">
                        <div class="title">
                          <Icon type="ios-compose"></Icon>
                          风险防范评分反馈：（<span style="color: #cb2025"> 提示：分数越高表示对应风险越低 </span>）
                        </div>
                      </el-col>
                      <div>
                        <el-col :span="12" style="margin-bottom: 10px;position: relative;height: 300px;">
                          <div id="myChart" style="width:330px;height: 300px;position: absolute;top: 0;left: 0;right: 0;bottom: 0;margin: auto;"></div>
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
                            <!--<Icon type="alert-circled" class="highLight" color="red"></Icon>-->
                            <i type="alert-circled" class="highLight" color="red"></i>
                            突出风险：<pre style="color: #333333;font-size: 14px;font-family: 'Microsoft YaHei';margin: 8px 0;padding-left: 20px;height: 150px;overflow-y: auto">{{riskInsInputData.riskReportMainVo.highlightRisk}}</pre>
                          </el-col>
                        </el-col>
                      </div>
                    </div>
                    <el-form ref="riskReportMainVoD" :model="riskInsInputData.riskReportMainVo"  label-width="140px" :rules="ruleValidate14">
                      <el-col :span="24">
                        <div class="title">
                          <Icon type="ios-bell"></Icon>
                          危险单位：
                        </div>
                      </el-col>
                      <el-col :span="24">
                        <el-col :span="8">
                          <el-form-item label="危险单位数量" prop="riskUnitNumber"><!--style="width: 100%"-->
                            <el-input v-model="riskInsInputData.riskReportMainVo.riskUnitNumber" :disabled=browseFlag>
                              <span slot="append">个</span>
                            </el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="8">
                          <el-form-item label="单次火灾可能最大损失" prop="onceAccidentLosest" label-width="150px">
                            <el-input type="text" v-model="riskInsInputData.riskReportMainVo.onceAccidentLosest" :disabled=browseFlag>
                              <span slot="append">万元</span>
                            </el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="8">
                          <el-form-item label="损失率" prop="loseRate"><!--style="width: 100%"-->
                            <el-input v-model="riskInsInputData.riskReportMainVo.loseRate" :disabled=browseFlag>
                              <span slot="append">%</span>
                            </el-input>
                          </el-form-item>
                        </el-col>
                      </el-col>
                      <el-col :span="24">
                        <el-form-item label="划分说明" prop="riskUnitExplain"><!--style="width: 100%"-->
                          <el-input type="textarea" v-model="riskInsInputData.riskReportMainVo.riskUnitExplain" :disabled=browseFlag></el-input>
                        </el-form-item>
                      </el-col>
                    </el-form>
                  </el-tab-pane>
                  <el-tab-pane label="风控影像上传" icon="images" style="max-height: calc(100vh - 229px);overflow-y: auto;padding: 15px;" name="name9">
                    <FileUploadComponent v-bind:config="FileUpLoadConfig"></FileUploadComponent>
                  </el-tab-pane>
                  <el-tab-pane label="定价信息" icon="document-text" v-if="editModel === 'browse' && pricingButtonFlag === true && riskInsInputData.riskReportMainVo.underwriteFlag !== 'T'">
                    <ReShowPrice v-bind:config="reShowPrice"></ReShowPrice>
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
    <el-dialog :visible.sync="diaModalFlag" width="770" :close-on-click-modal="false" @on-cancel="cancel">
      <br/>
      <div>
        <!--<FileUploadComponent :config= "FileUpLoadConfig"></FileUploadComponent>-->
      </div>
      <div slot="footer">
      </div>
    </el-dialog>
    <el-dialog class="mapcompontent" :visible.sync="mapFlag" width="100%" height="100%" :close-on-click-modal="false">
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
      <!--<div v-if="backFlag">
        打回原因：
        <el-input placeholder="请输入打回原因..." v-model="riskInsInputData.riskReportMainVo.repulsesugggest" type="textarea" :autosize="true"/>
      </div>-->
    </el-dialog>
    <el-dialog :visible.sync="reviewedFlag2">
      <el-form ref="riskReportMainVoF" :model="riskInsInputData.riskReportMainVo" :rules="ruleValidate21">
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
      <el-form ref="riskReportMainVoG" :model="riskInsInputData.riskReportMainVo" :rules="ruleValidate22">
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
    </el-dialog>
    <el-dialog title="打回原因" :visible.sync="backFlag2" :footer-hide="true">
      <el-timeline>
        <div v-for="(item, key) in lctList">
          <el-timeline-item v-if="item.nodeName ==='报告打回'">
            <p>审核人名称：{{item.operateName}}</p>
            <p>审核时间：{{item.operateTime}}</p>
            <p style="white-space: normal; word-break: break-word;">打回原因：{{item.repulsesugggest}}</p>
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
  import {getUnderwriteProcess,queryRiskReport,makeWord,
    temporarySave,gradeAndSaveDetail,underwrite} from '@/api/riskIns'
  import HeadButtonCommon from './HeadButtonCommon'
  //  import IFormItem from '../common/Iform-item.vue'
  import riskInsInputData from '../riskdata/riskInsInputData'
  import CurrencyDialog from '../Dialog.vue'
  //  import FileUploadComponent from '../FileUploadComponent.vue'
  //  import IEcharts from 'vue-echarts-v3'
  //  import iView from 'iview'
  import { Loading } from 'element-ui'
//  import MapCompontent from '../MapCompontent.vue'
  //  import ReShowPrice from '../ReshowPrice.vue'
  export default {
    name: 'RiskInsMain',
    components: {HeadButtonCommon,
//      IFormItem, CurrencyDialog,
//      FileUploadComponent,
//      IEcharts,
//      MapCompontent
//      , ReShowPrice
    },
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
      // 校验存货比例
      const validateStockRate = (rule, value, callback) => {
        // 验证正数，小数点保留两位
        var reg = /^(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*))$/
        if (value !== '' && value !== null) {
          if (value.match(reg) === null) {
            if (value === '0' || value === '0.0' || value === '0.00') {
              value = '0.00'
              this.riskInsInputData.riskReportMainVo.stockRate = value
              callback()
            } else {
              this.riskInsInputData.riskReportMainVo.stockRate = ''
              callback(new Error('只能录入小于等于100的非负数!'))
            }
          } else {
            value = parseFloat(value).toFixed(2) + ''
            if (value <= 100) {
              this.riskInsInputData.riskReportMainVo.stockRate = value
              callback()
            } else {
              this.riskInsInputData.riskReportMainVo.stockRate = ''
              callback(new Error('只能录入小于等于100的非负数!'))
            }
          }
        } else {
          callback(new Error('存货比例不能为空!'))
        }
      }
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
      // 校验资产占比
      const validateAssetsRatio = (rule, value, callback) => {
        // 验证大于等于0小于等于100的数，小数点保留两位
        var reg = /^100$|^(\d|[1-9]\d)(\.\d+)*$/
        if (value !== '' && value !== null) {
          if (value.match(reg) === null) {
            if (value === '100.0' || value === '100.00') {
              value = 100
              value = parseFloat(value).toFixed(2) + ''
              this.riskReportConstructInfoVo.assetsRatio = value
              callback()
            } else {
              this.riskReportConstructInfoVo.assetsRatio = ''
              callback(new Error('只能录入小于等于100的非负数!'))
            }
          } else {
            value = parseFloat(value).toFixed(2) + ''
            this.riskReportConstructInfoVo.assetsRatio = value
            callback()
          }
        } else {
          callback(new Error('资产占比不能为空!'))
        }
      }
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
      // 校验地下可水损资产额（元）
      const validateUnderWaterAssets = (rule, value, callback) => {
        // 验证非负数，小数点保留两位
        var reg = /^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/
        if (value !== '' && value !== null) {
          value = value.replace(/,/g, '')
          if (value.match(reg) === null) {
            this.riskReportConstructInfoVo.underWaterAssets = ''
            callback(new Error('只能录入非负数!'))
          } else {
            this.riskReportConstructInfoVo.underWaterAssets = this.common.toThousands(parseFloat(value).toFixed(2))
            callback()
          }
        } else {
//          this.riskReportConstructInfoVo.underWaterAssets = this.common.toThousands(parseFloat(value).toFixed(2))
          callback()
        }
      }
      // 校验使用年限
      const validateHighTemPreYear = (rule, value, callback) => {
        // 验证正整数
        var reg = /^[1-9]*[1-9][0-9]*$/
        if (value !== '' && value !== null) {
          value = value + ''
          if (value.match(reg) === null) {
            this.riskInsInputData.riskReportOccupationList[0].highTemPreYear = ''
            callback(new Error('只能录入正整数!'))
          } else {
            this.riskInsInputData.riskReportOccupationList[0].highTemPreYear = value
            callback()
          }
        } else {
          callback()
        }
      }
      // 校验公共消防队到达最短时间
      const validateShortTime = (rule, value, callback) => {
        // 验证正整数
        var reg = /^[1-9]*[1-9][0-9]*$/
        if (value !== '' && value !== null) {
          value = value + ''
          if (value.match(reg) === null) {
            this.riskInsInputData.riskReportProtectionList[0].shortTime = ''
            callback(new Error('只能录入正整数!'))
          } else {
            var shortTime = Number(value)
            if (shortTime > 999) {
              this.riskInsInputData.riskReportProtectionList[0].shortTime = ''
              callback('公共消防队到达最短时间不能超过999')
            } else {
              this.riskInsInputData.riskReportProtectionList[0].shortTime = value
              callback()
            }
          }
        } else {
          callback()
        }
      }
      // 校验沿江河湖海或靠山距离
      const validateItemDistance = (rule, value, callback) => {
        // 验证非负数，小数点保留两位
        var reg = /^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/
        if (value !== '' && value !== null) {
          value = value + ''
          if (value.match(reg) === null) {
            this.riskInsInputData.riskReportEnvironmentList[0].itemDistance = ''
            callback(new Error('只能录入非负数!'))
          } else {
//            value = parseFloat(value).toFixed(2) + ''
            value = Math.round(value * Math.pow(10, 2)) / Math.pow(10, 2)
            this.riskInsInputData.riskReportEnvironmentList[0].itemDistance = value
            callback()
          }
        } else {
          callback()
        }
      }
      // 校验东方周边建筑物距离
      const validateEastDistance = (rule, value, callback) => {
        // 验证非负数，小数点保留两位
        var reg = /^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/
        if (value !== '' && value !== null) {
          if (value.match(reg) === null) {
            this.riskInsInputData.riskReportEnvironmentList[0].eastDistance = ''
            this.$Message.error('只能录入非负数!')
            callback()
          } else {
            value = parseFloat(value).toFixed(2) + ''
            this.riskInsInputData.riskReportEnvironmentList[0].eastDistance = value
            callback()
          }
        } else {
          callback()
        }
      }
      // 校验东方周边建筑物建筑高度
      const validateEastHeight = (rule, value, callback) => {
        // 验证非负数，小数点保留两位
        var reg = /^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/
        if (value !== '' && value !== null) {
          if (value.match(reg) === null) {
            this.riskInsInputData.riskReportEnvironmentList[0].eastHeight = ''
            this.$Message.error('只能录入非负数!')
            callback()
          } else {
            value = parseFloat(value).toFixed(2) + ''
            this.riskInsInputData.riskReportEnvironmentList[0].eastHeight = value
            callback()
          }
        } else {
          callback()
        }
      }
      // 校验南方周边你建筑物距离
      const validateSouthDistance = (rule, value, callback) => {
        // 验证非负数，小数点保留两位
        var reg = /^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/
        if (value !== '' && value !== null) {
          if (value.match(reg) === null) {
            this.riskInsInputData.riskReportEnvironmentList[0].southDistance = ''
//            callback(new Error('只能录入非负数!'))
            this.$Message.error('只能录入非负数!')
            callback()
          } else {
            value = parseFloat(value).toFixed(2) + ''
            this.riskInsInputData.riskReportEnvironmentList[0].southDistance = value
            callback()
          }
        } else {
          callback()
        }
      }
      // 校验南方周边建筑物高度
      const validateSouthHeight = (rule, value, callback) => {
        // 验证非负数，小数点保留两位
        var reg = /^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/
        if (value !== '' && value !== null) {
          if (value.match(reg) === null) {
            this.riskInsInputData.riskReportEnvironmentList[0].southHeight = ''
//            callback(new Error('只能录入非负数!'))
            this.$Message.error('只能录入非负数!')
            callback()
          } else {
            value = parseFloat(value).toFixed(2) + ''
            this.riskInsInputData.riskReportEnvironmentList[0].southHeight = value
            callback()
          }
        } else {
          callback()
        }
      }
      // 校验西方周边建筑物距离
      const validateWestDistance = (rule, value, callback) => {
        // 验证非负数，小数点保留两位
        var reg = /^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/
        if (value !== '' && value !== null) {
          if (value.match(reg) === null) {
            this.riskInsInputData.riskReportEnvironmentList[0].westDistance = ''
//            callback(new Error('只能录入非负数!'))
            this.$Message.error('只能录入非负数!')
            callback()
          } else {
            value = parseFloat(value).toFixed(2) + ''
            this.riskInsInputData.riskReportEnvironmentList[0].westDistance = value
            callback()
          }
        } else {
          callback()
        }
      }
      // 校验西方周边建筑物高度
      const validateWestHeight = (rule, value, callback) => {
        // 验证非负数，小数点保留两位
        var reg = /^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/
        if (value !== '' && value !== null) {
          if (value.match(reg) === null) {
            this.riskInsInputData.riskReportEnvironmentList[0].westHeight = ''
//            callback(new Error('只能录入非负数!'))
            this.$Message.error('只能录入非负数!')
            callback()
          } else {
            value = parseFloat(value).toFixed(2) + ''
            this.riskInsInputData.riskReportEnvironmentList[0].westHeight = value
            callback()
          }
        } else {
          callback()
        }
      }
      // 校验北方周边建筑物距离
      const validateNorthDistance = (rule, value, callback) => {
        // 验证非负数，小数点保留两位
        var reg = /^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/
        if (value !== '' && value !== null) {
          if (value.match(reg) === null) {
            this.riskInsInputData.riskReportEnvironmentList[0].northDistance = ''
//            callback(new Error('只能录入非负数!'))
            this.$Message.error('只能录入非负数!')
            callback()
          } else {
            value = parseFloat(value).toFixed(2) + ''
            this.riskInsInputData.riskReportEnvironmentList[0].northDistance = value
            callback()
          }
        } else {
          callback()
        }
      }
      // 校验北方周边建筑物高度
      const validateNorthHeight = (rule, value, callback) => {
        // 验证非负数，小数点保留两位
        var reg = /^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/
        if (value !== '' && value !== null) {
          if (value.match(reg) === null) {
            this.riskInsInputData.riskReportEnvironmentList[0].northHeight = ''
//            callback(new Error('只能录入非负数!'))
            this.$Message.error('只能录入非负数!')
            callback()
          } else {
            value = parseFloat(value).toFixed(2) + ''
            this.riskInsInputData.riskReportEnvironmentList[0].northHeight = value
            callback()
          }
        } else {
          callback()
        }
      }
      // 校验危险单位数量
      const validateRiskUnitNumber = (rule, value, callback) => {
        // 验证非负整数
        var reg = /^(0|[1-9]\d*)$/
        if (value !== '' && value !== null) {
          value = value + ''
          if (value.match(reg) === null) {
            this.riskInsInputData.riskReportMainVo.riskUnitNumber = ''
            callback(new Error('只能录入非负整数!'))
          } else {
            this.riskInsInputData.riskReportMainVo.riskUnitNumber = value
            callback()
          }
        } else {
          callback(new Error('危险单位数量不能为空!'))
        }
      }
      // 校验单次火灾事故可能最大损失
      const validateOnceAccidentLosest = (rule, value, callback) => {
        // 验证非负数，小数点保留两位
        var reg = /^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/
        if (value !== '' && value !== null) {
          value = value.replace(/,/g, '')
          if (value.match(reg) === null) {
            this.riskInsInputData.riskReportMainVo.onceAccidentLosest = ''
            callback(new Error('只能录入非负数!'))
          } else {
            this.riskInsInputData.riskReportMainVo.onceAccidentLosest = this.common.toThousands(parseFloat(value).toFixed(2)) + ''
            callback()
          }
        } else {
          callback(new Error('单次火灾可能最大损失不能为空!'))
        }
      }
      // 校验损失率
      const validateLoseRate = (rule, value, callback) => {
        // 验证大于等于0小于等于100的数，小数点保留两位
        var reg = /^100(\.\d+)*$|^(\d|[1-9]\d)(\.\d+)*$/
        if (value !== '' && value !== null) {
          if (value.match(reg) === null) {
            this.riskInsInputData.riskReportMainVo.loseRate = ''
            callback(new Error('只能录入小于等于100的非负数!'))
          } else {
            value = parseFloat(value).toFixed(2) + ''
            this.riskInsInputData.riskReportMainVo.loseRate = value
            callback()
          }
        } else {
          callback(new Error('损失率不能为空!'))
        }
      }
//      var score = this.riskInsInputData.riskReportMainVo.score
      return {
        lctList: [],
        transFlag: false,
        backFlag: false,
        backFlag2: false,
        footerStatus: 'default',
        currnetTabPanel: 'name1',
        riskFileTitle: '2017版财产险风控模板（专职版）',
        editModel: 'edit',
        pricingButtonFlag: false,
        myChart: '',
        myChart2: '',
        message: '',
        suggest: '',
        raderFlag: true,
        spinShow: false,
        returnButtonState: false,
        editButtonState: false,
        reviewedButtonState: false,
        backButtonState: false,
        outerSystemFlag: false,
        importFlag: false,
        constructBuildFlag: false,
        itemAddressFlag: false,
        diaModalFlag: false,
        mapFlag: false,
        reviewedFlag: false,
        reviewedFlag2: false,
        reviewedFlag3: false,
        postListFlag: false,
        address: '',
        addressDetail: '',
        riskInsInputData: riskInsInputData.a(),
        itemAddressVo: {
          itemAddress: ''
        },
        riskReportClaimVo: {
          riskReason: '',
          riskDate: '',
          riskPosition: '',
          loseInfo: '',
          abarbeitungFlag: '',
          abarbeitungMeasure: ''
        },
        riskReportConstructInfoVo: {
          constructName: '',
          constructBuild: '',
          constructYear: '',
          underWaterAssets: '',
          occupancy: '',
          assetsRatio: ''
        },
        showFlag: false,
        modalFlag: false,
        claimModal: false,
        browseFlag: false,
        readFlag: true,
        readFlag1: false,
        styles: {
          ivuerro: false
        },
        riskReportConstructInfoModal: false,
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
        reShowPrice: {
          riskFileNo: ''
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
        originalHistory: '',
        build: 'new',
        constructInfo: '',
        oldValue: [],
        ruleValidate: {

        },
        ruleValidate1: {
          sumAmount: [
            {validator: validateSumAmount, type: 'number', required: true, trigger: 'blur'}
          ],
          stockRate: [
            {validator: validateStockRate, type: 'number', required: true, trigger: 'blur'}
          ]
        },
        ruleValidate2: {
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
          ]
        },
        ruleValidate3: {},
        ruleValidate4: {},
        ruleValidate5: {},
        ruleValidate6: {
//          pipeline: [
//           {required: true, message: '排水管情况不能为空', trigger: 'blur'}
//          ]
        },
        ruleValidate7: {
          pipeline: [
            {required: true, message: '排水管情况不能为空', trigger: 'change'}
          ],
          underAssetsFlag: [
            {required: true, message: '是否存在地下资产不能为空', trigger: 'change'}
          ],
          underAssetsProperty: [
            {required: true, message: '保险资产浸水受损性质不能为空', trigger: 'change'}
          ],
          underAssetsRatio: [
            {required: true, message: '保险可水损资产占比不能为空', trigger: 'change'}
          ],
          buildOneFiveHFlag: [
            {required: true, message: '建筑是否高耸/孤立/突出不能为空', trigger: 'change'}
          ],
          lightningPro: [
            {required: true, message: '是否安装避雷设施不能为空', trigger: 'change'}
          ]
        },
        ruleValidate8: {
          materialName: [
            {required: true, message: '材料名称不能为空', trigger: 'blur'}
          ],
          ignitionQuality: [
            {required: true, message: '物质燃烧性质不能为空', trigger: 'change'}
          ],
          waterSensitivity: [
            {required: true, message: '物质对水敏感度不能为空', trigger: 'change'}
          ],
          combustibleRatio: [
            {required: true, message: '场所内可燃物空间占比不能为空', trigger: 'change'}
          ],
          flaLiquidFlag: [
            {required: true}
          ],
          flaGasFlag: [
            {required: true}
          ],
          expDustFlag: [
            {required: true}
          ],
          hotWorkFlag: [
            {required: true}
          ],
          cleanRoomFlag: [
            {required: true}
          ],
          eleProcessFlag: [
            {required: true}
          ],
          highTemPreFlag: [
            {required: true}
          ],
          siteEnvironment: [
            {required: true, message: '现场环境不能为空', trigger: 'change'}
          ],
          equipmentLeak: [
            {required: true, message: '生产设备泄漏情况不能为空', trigger: 'change'}
          ],
          linePro: [
            {required: true, message: '线路防护不能为空', trigger: 'change'}
          ],
          lineLayout: [
            {required: true, message: '线路布置不能为空', trigger: 'change'}
          ],
          lineYear: [
            {required: true, message: '电气线路的使用年限不能为空', trigger: 'change'}
          ],
          riotGearFlag: [
            {required: true, message: '按要求使用防爆设备不能为空', trigger: 'change'}
          ],
          layingMode: [
            {required: true, message: '仓储物摆放形式不能为空', trigger: 'change'}
          ],
          chargePosition: [
            {required: true, message: '作业车辆充电位置不能为空', trigger: 'change'}
          ],
          lifeEleFlag: [
            {required: true, message: '仓库内是否有生活用电不能为空', trigger: 'change'}
          ],
          highTemPreYear: [
            {validator: validateHighTemPreYear, type: 'number', trigger: 'blur'}
          ]
        },
        ruleValidate9: {
          extinguisherArea: [
            {required: true}
          ],
          extinguisherPre: [
            {required: true}
          ],
          extinguisherPos: [
            {required: true}
          ],
          insHydrantArea: [
            {required: true}
          ],
          insHydrantPos: [
            {required: true}
          ],
          insHydrantHade: [
            {required: true}
          ],
          outHydrantArea: [
            {required: true}
          ],
          outHydrantBag: [
            {required: true}
          ],
          selfExtCase: [
            {required: true}
          ],
          powerLed: [
            {required: true}
          ],
          sprayBolt: [
            {required: true}
          ],
          selfExtWay: [
            {required: true}
          ],
          waterSource: [
            {required: true}
          ],
          impoundment: [
            {required: true}
          ],
          alarmType: [
            {required: true}
          ],
          alarmWork: [
            {required: true}
          ],
          equipmentChannel: [
            {required: true, message: '通往消防器材通道情况不能为空', trigger: 'change'}
          ],
          channelClear: [
            {required: true, message: '消防通道畅通情况不能为空', trigger: 'change'}
          ],
          firePrePeople: [
            {required: true, message: '消防安全机构与人员不能为空', trigger: 'change'}
          ],
          firePlan: [
            {required: true, message: '消防应急预案不能为空', trigger: 'change'}
          ],
          checkFrequency: [
            {required: true, message: '消防设施维护检查频率不能为空', trigger: 'change'}
          ],
          testFrequency: [
            {required: true, message: '消防自动系统测试频率不能为空', trigger: 'change'}
          ],
          staffTraining: [
            {required: true, message: '员工培训不能为空', trigger: 'change'}
          ],
          hotWorkSystem: [
            {required: true, message: '动火作业管理制度不能为空', trigger: 'change'}
          ],
          smokingControl: [
            {required: true, message: '吸烟管理不能为空', trigger: 'change'}
          ],
          lineCheck: [
            {required: true, message: '电气线路老化检查情况不能为空', trigger: 'change'}
          ],
          fireTime: [
            {required: true, message: '近五年历史火灾次数不能为空', trigger: 'change'}
          ],
          patrolFlag: [
            {required: true, message: '是否有安保巡逻不能为空', trigger: 'change'}
          ],
          patrolArea: [
            {required: true, message: '巡逻区域不能为空', trigger: 'change'}
          ],
          patrolFrequency: [
            {required: true, message: '巡逻频次不能为空', trigger: 'change'}
          ],
          drainageBlock: [
            {required: true, message: '排水系统是否有堵塞现象不能为空', trigger: 'change'}
          ],
          waterPlan: [
            {required: true, message: '企业汛期抢险救灾预案不能为空', trigger: 'change'}
          ],
          waterLossHistory: [
            {required: true, message: '厂区历史进水损失记录不能为空', trigger: 'change'}
          ],
          windPlan: [
            {required: true, message: '企业风灾应急预案不能为空', trigger: 'change'}
          ],
          windLossHistory: [
            {required: true, message: '风灾历史损失记录不能为空', trigger: 'change'}
          ],
          rivetCondition: [
            {required: true, message: '轻钢房屋屋面铆钉情况不能为空', trigger: 'change'}
          ],
          thunderCheck: [
            {required: true, message: '是否定期检测防雷设施不能为空', trigger: 'change'}
          ],
          thunderLossHistory: [
            {required: true, message: '雷击历史损失记录不能为空', trigger: 'change'}
          ],
          shortTime: [
            {validator: validateShortTime, type: 'number', trigger: 'blur'}
          ]
        },
        ruleValidate10: {
          havePonding: [
            {required: true, message: '历史是否发生过积水不能为空', trigger: 'change'}
          ],
          haveBlizzard: [
            {required: true, message: '区域降雪量暴雪记录不能为空', trigger: 'change'}
          ],
          itemAreaType: [
            {required: true, message: '标的所在区域类型不能为空', trigger: 'change'}
          ],
          itemEnvironment: [
            {required: true, message: '标的周围环境不能为空', trigger: 'change'}
          ],
          comparedTerrain: [
            {required: true, message: '周围道路或建筑物相比不能为空', trigger: 'change'}
          ],
          insTerrain: [
            {required: true, message: '企业内地势情况不能为空', trigger: 'change'}
          ],
          snowLossHistory: [
            {required: true, message: '厂区历史雪灾损失不能为空', trigger: 'change'}
          ],
          haveCyclone: [
            {required: true, message: '热带气旋影响程度不能为空', trigger: 'change'}
          ],
          haveEarthquake: [
            {required: true, message: '是否位于地震带上不能为空', trigger: 'change'}
          ],
          earthquakeHis: [
            {required: true, message: '所在地区地震最高烈度不能为空', trigger: 'change'}
          ],
          earthquakeNum: [
            {required: true, message: '近十年地震损失次数不能为空', trigger: 'change'}
          ],
          haveThunder: [
            {required: true, message: '所在地属于不能为空', trigger: 'change'}
          ],
          haveCollapse: [
            {required: true, message: '是否处于泥石流、滑坡、崩塌多发区不能为空', trigger: 'change'}
          ],
          collapseHis: [
            {required: true, message: '是否发生过重大泥石流、滑坡、崩塌灾害不能为空', trigger: 'change'}
          ],
          distanceAround: [
            {required: true, message: '与周边建筑物间距不能为空', trigger: 'change'}
          ],
          burningFlag: [
            {required: true, message: '建筑物间过道是否堆放可燃物可能导致延烧不能为空', trigger: 'change'}
          ],
          itemDistance: [
            {validator: validateItemDistance, type: 'number', trigger: 'blur'}
          ],
          eastDistance: [
            {validator: validateEastDistance, type: 'number', trigger: 'blur'}
          ],
          eastHeight: [
            {validator: validateEastHeight, type: 'number', trigger: 'blur'}
          ],
          southDistance: [
            {validator: validateSouthDistance, type: 'number', trigger: 'blur'}
          ],
          southHeight: [
            {validator: validateSouthHeight, type: 'number', trigger: 'blur'}
          ],
          westDistance: [
            {validator: validateWestDistance, type: 'number', trigger: 'blur'}
          ],
          westHeight: [
            {validator: validateWestHeight, type: 'number', trigger: 'blur'}
          ],
          northDistance: [
            {validator: validateNorthDistance, type: 'number', trigger: 'blur'}
          ],
          northHeight: [
            {validator: validateNorthHeight, type: 'number', trigger: 'blur'}
          ]
        },
        ruleValidate11: {},
        ruleValidate12: {
          insuredAttraction: [
            {required: true, message: '被保物吸引力不能为空', trigger: 'change'}
          ],
          theftHistoryFlag: [
            {required: true, message: '是否有被盗抢记录不能为空', trigger: 'change'}
          ],
          antiTheftFlag: [
            {required: true, message: '是否有技术防盗设施不能为空', trigger: 'change'}
          ],
          netPoliceFlag: [
            {required: true, message: '是否与公安机关联网不能为空', trigger: 'change'}
          ],
          securityNumber: [
            {required: true, message: '保安警卫人数不能为空', trigger: 'change'}
          ],
          timingPatrol: [
            {required: true, message: '是否定时巡逻不能为空', trigger: 'change'}
          ],
          publicSecurity: [
            {required: true, message: '所在区域社会治安情况不能为空', trigger: 'change'}
          ]
        },
        ruleValidate13: {
          powerSupply: [
            {required: true, message: '公共供电情况不能为空', trigger: 'change'}
          ],
          outagePro: [
            {required: true, message: '是否拥有断电保护设施不能为空', trigger: 'change'}
          ],
          interruptEffect: [
            {required: true, message: '电水气等供应突然中断不能为空', trigger: 'change'}
          ]
        },
        ruleValidate14: {
          riskUnitNumber: [
            {validator: validateRiskUnitNumber, type: 'number', required: true, trigger: 'blur'}
          ],
          onceAccidentLosest: [
            {validator: validateOnceAccidentLosest, type: 'number', required: true, trigger: 'blur'}
          ],
          loseRate: [
            {validator: validateLoseRate, type: 'number', required: true, trigger: 'blur'}
          ]
        },
        ruleValidate15: {
          itemAddress: [
            {required: true, message: '标的地址不能为空', trigger: 'blur'}
          ]
        },
        ruleValidate16: {
          constructName: [
            {required: true, message: '建筑名称不能为空', trigger: 'blur'}
          ],
          constructBuild: [
            {required: true, message: '建筑结构不能为空', trigger: 'change'}
          ],
          constructYear: [
            {required: true, message: '建筑年份不能为空', trigger: 'change'}
          ],
          underWaterAssets: [
            {validator: validateUnderWaterAssets, type: 'number', trigger: 'blur'}
          ],
          assetsRatio: [
            {validator: validateAssetsRatio, type: 'number', required: true, trigger: 'blur'}
          ]
        },
        ruleValidate18: {
          riskReason: [
            {required: true, message: '出险原因不能为空', trigger: 'change'}
          ],
//          riskDate: [
//            {required: true, type: 'date', message: '风险日期不能为空', trigger: 'change'}
//          ],
          riskPosition: [
            {required: true, message: '出险地址和部位不能为空', trigger: 'blur'}
          ],
          loseInfo: [
            {required: true, message: '损失详细描述不能为空', trigger: 'blur'}
          ]
        },
        ruleValidate20: {
          ff: [
            {validator: validateFF, required: true, trigger: 'change'}
          ],
          repulsesugggest: [
            {validator: validateSugggest, required: true, trigger: 'blur'}
          ]
        },
        ruleValidate21: {
          bb: [
            {validator: validateBB, required: true, trigger: 'change'}
          ],
          repulsesugggest: [
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
        },
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
            radius: 106,
            center: ['50%', '50%'],
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
              { text: '防火灾', max: 100 },
              { text: '防水灾', max: 100 },
              { text: '防风灾', max: 100 },
              { text: '防雷击', max: 100 },
              { text: '防雪灾', max: 100 },
              { text: '防盗抢', max: 100 },
              { text: '防地震', max: 100 },
              { text: '防地质灾害', max: 100 }
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
                      show: 'postListFlag',
                      color: '#16d820'
                    }
                  }
                }
              ]
            }
          ]
        }
//        rader: {
//          series: [
//            {
//              name: '业务指标',
//              type: 'gauge',
//  //              detail: {formatter: '{value}分'},
//              data: [{value: [], name: '综合风险评价'}],
//              center: ['50%', '50%'],
//              axisLine: {            // 坐标轴线
//                lineStyle: {       // 属性lineStyle控制线条样式
//                  color: [[0.4, '#D8504B'], [0.8, '#feba04'], [1, '#228b22']],
//                  width: 10
//                }
//              }
//            }
//          ]
//        }
      }
    },
    methods: {
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
      clearAntiTheftType () {
        if (this.riskInsInputData.riskReportTheftList[0].antiTheftFlag === 'B') {
          this.riskInsInputData.riskReportTheftList[0].antiTheftType = ''
        }
      },
      /* 显示是否上传照片 */
      showUpload (val) {
        var result = false
        for (let item of this.FileUpLoadConfig.riskDcodeList) {
          if (val === item.codeEname) {
            if (item.configList !== null && item.configList.configs !== null && item.configList.configs.length !== 0) {
              result = true
              return result
            } else {
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
      checkBack () {
        this.backFlag2 = true
        /*查询打回原因*/
        getUnderwriteProcess({executionId: this.riskInsInputData.riskReportMainVo.executionId, underwriteFlag: this.riskInsInputData.riskReportMainVo.underwriteFlag}).then((response) => {
          this.lctList = response.data
        })
      },
      reviewed () {
//        this.riskInsInputData.postListStr = this.$store.getters.getUserInfo.postList.toString()
        if (this.riskInsInputData.postListStr.indexOf('风控报告一级审核岗') !== -1 && this.riskInsInputData.postListStr.indexOf('风控报告二级审核岗') === -1) {
          if (this.riskInsInputData.riskReportMainVo.underwriteFlag === '9') {
            this.reviewedFlag2 = false
            this.$Message.error(this.riskInsInputData.riskReportMainVo.riskFileNo + '处于一级审核通过状态，不支持再次审核')
          } else if (this.riskInsInputData.riskReportMainVo.underwriteFlag === '2') {
            this.reviewedFlag2 = false
            this.$Message.error(this.riskInsInputData.riskReportMainVo.riskFileNo + '处于打回状态，不支持审核')
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
          this.$Message.success('该风控报告未审核通过，不允许导出！')
          return
        } else {
          this.riskInsInputData.picBase64Info = this.myChart.getDataURL()
//          console.log(this.riskInsInputData.picBase64Info)
          /* 将金额数据恢复成为数字格式 */
          if (this.riskInsInputData.riskReportMainVo.sumAmount !== null && this.riskInsInputData.riskReportMainVo.sumAmount !== '') {
            this.riskInsInputData.riskReportMainVo.sumAmount = this.riskInsInputData.riskReportMainVo.sumAmount.replace(/,/g, '') + ''
          }
          let constructInListPre = this.riskInsInputData.riskReportConstructInfoList
          if (constructInListPre !== null) {
            for (let i = 0; i < constructInListPre.length; i++) {
              if (constructInListPre[i].underWaterAssets && constructInListPre[i].underWaterAssets !== null && constructInListPre[i].underWaterAssets !== '') {
                this.riskInsInputData.riskReportConstructInfoList[i].underWaterAssets = parseFloat(this.riskInsInputData.riskReportConstructInfoList[i].underWaterAssets.replace(/,/g, ''))
              } else {
                this.riskInsInputData.riskReportConstructInfoList[i].underWaterAssets = ''
              }
            }
          }
          if (this.riskInsInputData.riskReportMainVo.onceAccidentLosest !== null && this.riskInsInputData.riskReportMainVo.onceAccidentLosest !== '') {
            this.riskInsInputData.riskReportMainVo.onceAccidentLosest = this.riskInsInputData.riskReportMainVo.onceAccidentLosest.replace(/,/g, '') + ''
          }
          makeWord(this.riskInsInputData).then((response) => {
            if (response !== null) {
              const filePath = response.data
//              const url = this.SERVER_BASE_URL + '/' + filePath.substring(filePath.indexOf('downloadFile'))
              const url = '/' + filePath.substring(filePath.indexOf('downloadFile'))
              this.$Message.success('导出报告成功！')
              window.location.href = url
//              const that = this.riskInsInputData
//              this.download(that, filePath)
            } else {
              this.$Message.success('导出报告失败！')
            }
          }, (response) => {
            this.$Message.success('导出报告异常！')
          })
        }
      },
//      download (that, filePath) {
//        this.$api.getMethodParam('/riskins/downloadWorld', {filePath: filePath}).then((response) => {
//          if (response !== null) {
//            const content = response
//            const blob = new Blob([content])
//            const fileName = that.riskReportMainVo.riskFileNo + '.doc'
//            if ('download' in document.createElement('a')) { // 非IE下载
//              const elink = document.createElement('a')
//              elink.download = fileName
//              elink.style.display = 'none'
//              elink.href = URL.createObjectURL(blob)
//              document.body.appendChild(elink)
//              elink.click()
//              URL.revokeObjectURL(elink.href) // 释放URL 对象
//              document.body.removeChild(elink)
//            } else { // IE10+下载
//              navigator.msSaveBlob(blob, fileName)
//            }
//          }
//        }, (response) => {
//          // this.$Message.success('导出文档失败！')
//        })
//      },
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
      riskInsDelete (index) {
        // 从 index 开始 删除 1 条
        this.riskInsInputData.riskReportAddressList.splice(index, 1)
      },
      /* 关闭模态框重置校验 */
      modalCancel (val) {
        this.$refs[val].resetFields()
      },
      // 标的地址多行域添加一行方法
      riskInsAddress () {
        this.itemAddressVo.itemAddress = ''
        this.$refs['itemAddressVo'].resetFields()
        this.modalFlag = true
      },
      // 标的地址模态框校验回传
      addAdress () {
        this.$refs['itemAddressVo'].validate((valid) => {
          if (valid) {
            this.modalFlag = false
            this.itemAddressFlag = false
            if (this.riskInsInputData.riskReportAddressList === null || this.riskInsInputData.riskReportAddressList === '') {
              this.riskInsInputData.riskReportAddressList = []
            }
            this.riskInsInputData.riskReportAddressList.push(this.itemAddressVo)
            this.itemAddressVo = {itemAddress: ''}
          } else {
            return false
          }
        })
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
      // 接收数据
      CurrencyDialogClickOnRow (data) {
        this.riskInsInputData.riskReportMainVo.businessSource = data.col1
        this.riskInsInputData.riskReportMainVo.businessSourceCName = data.col2
        this.riskInsInputData.riskReportMainVo.businessClass = data.col3
      },
      // 建筑物多行域增加
      riskInsAddBuild () {
        this.build = 'new'
        this.riskReportConstructInfoVo = {constructName: '', constructBuild: '', constructYear: '', underWaterAssets: '', occupancy: '', assetsRatio: ''}
        this.$refs['riskReportConstructInfoVo'].resetFields()
        this.riskReportConstructInfoModal = true
      },
      // 建筑物多行域删除
      riskInsDeleteBuild (index) {
        this.riskInsInputData.riskReportConstructInfoList.splice(index, 1)
      },
      // 建筑物情况模态框添加
      addRiskReportConstructInfo () {
        this.$refs['riskReportConstructInfoVo'].validate((valid) => {
          if (valid) {
            this.riskReportConstructInfoModal = false
            if (this.riskInsInputData.riskReportConstructInfoList === null || this.riskInsInputData.riskReportConstructInfoList === '') {
              this.riskInsInputData.riskReportConstructInfoList = []
            }
            if (this.build === 'new') {
              this.riskInsInputData.riskReportConstructInfoList.push(this.riskReportConstructInfoVo)
              this.riskReportConstructInfoVo = {constructName: '', constructBuild: '', constructYear: '', underWaterAssets: '', occupancy: '', assetsRatio: ''}
            } else if (this.build === 'edit') {
              this.constructInfo.constructName = this.riskReportConstructInfoVo.constructName
              this.constructInfo.constructBuild = this.riskReportConstructInfoVo.constructBuild
              this.constructInfo.constructYear = this.riskReportConstructInfoVo.constructYear
              this.constructInfo.underWaterAssets = this.riskReportConstructInfoVo.underWaterAssets
              this.constructInfo.occupancy = this.riskReportConstructInfoVo.occupancy
              this.constructInfo.assetsRatio = this.riskReportConstructInfoVo.assetsRatio
            }
          } else {
            return false
          }
        })
      },
      // 隐藏域数据清除
      clearShow () {
        if (this.riskInsInputData.riskReportConstructList[0].underAssetsFlag === 'B') {
          this.riskInsInputData.riskReportConstructList[0].underAssetsProperty = ''
          this.riskInsInputData.riskReportConstructList[0].underAssetsRatio = ''
        }
        if (this.riskInsInputData.riskReportConstructList[0].fireproofingType.length === 0) {
          this.riskInsInputData.riskReportConstructList[0].fireproofingFlag = ''
        }
        if (this.riskInsInputData.riskReportConstructList[0].fireproofingFlag !== 'B') {
          this.riskInsInputData.riskReportConstructList[0].hiddenDescription = ''
        }
        if (this.riskInsInputData.riskReportProtectionList[0].firePlan !== 'A') {
          this.riskInsInputData.riskReportProtectionList[0].drillFrequency = ''
        }
        if (this.riskInsInputData.riskReportProtectionList[0].patrolFlag !== 'A') {
          this.riskInsInputData.riskReportProtectionList[0].patrolArea = ''
          this.riskInsInputData.riskReportProtectionList[0].patrolFrequency = ''
        }
        if (this.riskInsInputData.riskReportProtectionList[0].waterFacility.indexOf('E') === -1) {
          this.riskInsInputData.riskReportProtectionList[0].addWaterFacility = ''
        }
        if (this.riskInsInputData.riskReportEnvironmentList[0].havePonding !== '1') {
          this.riskInsInputData.riskReportEnvironmentList[0].ponding = ''
        }
        if (this.riskInsInputData.riskReportEnvironmentList[0].insTerrain !== 'A') {
          this.riskInsInputData.riskReportEnvironmentList[0].lowGoods = ''
        }
        if (this.riskInsInputData.riskReportEnvironmentList[0].haveCyclone === '0' || this.riskInsInputData.riskReportEnvironmentList[0].haveCyclone === '') {
          this.riskInsInputData.riskReportEnvironmentList[0].cycloneMonth = ''
        }
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
      // 验证资产占比总和是否等于100
      validateAssetsRatio () {
        let infoList = this.riskInsInputData.riskReportConstructInfoList
        let sum = 0
        for (let i = 0; i < infoList.length; i++) {
          sum += parseFloat(infoList[i].assetsRatio)
        }
        sum = sum.toFixed(2)
        if (sum !== '100.00') {
          this.$Message.error('资产占比总和不等于100，请您修改！!')
          return false
        }
        return true
      },
      //  暂存
      TSDetail () {
        this.spinShow = true
        /* 将金额数据恢复成为数字格式 */
        if (this.riskInsInputData.riskReportMainVo.sumAmount !== null && this.riskInsInputData.riskReportMainVo.sumAmount !== '') {
          this.riskInsInputData.riskReportMainVo.sumAmount = this.riskInsInputData.riskReportMainVo.sumAmount.replace(/,/g, '') + ''
        }
        let constructInListPre = this.riskInsInputData.riskReportConstructInfoList
        if (constructInListPre !== null) {
          for (let i = 0; i < constructInListPre.length; i++) {
            if (constructInListPre[i].underWaterAssets && constructInListPre[i].underWaterAssets !== null && constructInListPre[i].underWaterAssets !== '') {
              this.riskInsInputData.riskReportConstructInfoList[i].underWaterAssets = parseFloat(this.riskInsInputData.riskReportConstructInfoList[i].underWaterAssets.replace(/,/g, ''))
            } else {
              this.riskInsInputData.riskReportConstructInfoList[i].underWaterAssets = ''
            }
          }
        }
        if (this.riskInsInputData.riskReportMainVo.onceAccidentLosest !== null && this.riskInsInputData.riskReportMainVo.onceAccidentLosest !== '') {
          this.riskInsInputData.riskReportMainVo.onceAccidentLosest = this.riskInsInputData.riskReportMainVo.onceAccidentLosest.replace(/,/g, '') + ''
        }
//        this.riskInsInputData.riskDcodeListDel = this.FileUpLoadConfig.riskDcodeListDel
        this.riskInsInputData.riskDcodeList = this.FileUpLoadConfig.riskDcodeList
//        this.riskInsInputData.riskReportMainVo.sumAmount = this.common.toThousands(this.riskInsInputData.riskReportMainVo.sumAmount)
//        console.log(this.riskInsInputData.riskReportMainVo.sumAmount)
//        return
        console.log(JSON.stringify(this.riskInsInputData))
        temporarySave(this.riskInsInputData).then((response) => {
          if (response !== null) {
            parse(response.data.riskReportMainVo)
            parse(response.data.riskReportConstructList)
            parse(response.data.riskReportOccupationList)
            parse(response.data.riskReportProtectionList)
            parse(response.data.riskReportEnvironmentList)
            parse(response.data.riskReportTheftList)
            parse(response.data.riskReportAirStorageList)
            parse(response.data.riskReportTheftList)
            parse(response.data.riskReportAssessList)
            parse(response.data.riskReportInterruptList)
            parse(response.data.riskReportClaimList)
            parse(response.data.riskReportConstructInfoList)
            parse(response.data.riskReportAddressList)
            parse(response.data.riskDcodeList)
            this.riskInsInputData = response.data
            if (this.riskInsInputData.riskReportMainVo.sumAmount !== null && this.riskInsInputData.riskReportMainVo.sumAmount !== '') {
              this.riskInsInputData.riskReportMainVo.sumAmount = parseFloat(this.riskInsInputData.riskReportMainVo.sumAmount).toFixed(4) + ''
            }
            if (this.riskInsInputData.riskReportMainVo.stockRate !== null && this.riskInsInputData.riskReportMainVo.stockRate !== '') {
              this.riskInsInputData.riskReportMainVo.stockRate = parseFloat(this.riskInsInputData.riskReportMainVo.stockRate).toFixed(2) + ''
            }
            if (this.riskInsInputData.riskReportMainVo.onceAccidentLosest !== null && this.riskInsInputData.riskReportMainVo.onceAccidentLosest !== '') {
              this.riskInsInputData.riskReportMainVo.onceAccidentLosest = parseFloat(this.riskInsInputData.riskReportMainVo.onceAccidentLosest).toFixed(2) + ''
            }
            if (this.riskInsInputData.riskReportMainVo.loseRate !== null && this.riskInsInputData.riskReportMainVo.loseRate !== '') {
              this.riskInsInputData.riskReportMainVo.loseRate = parseFloat(this.riskInsInputData.riskReportMainVo.loseRate).toFixed(2) + ''
            }
            let constructInList = this.riskInsInputData.riskReportConstructInfoList
            if (constructInList !== null) {
              for (let i = 0; i < constructInList.length; i++) {
                if (constructInList[i].underWaterAssets && constructInList[i].underWaterAssets !== null && constructInList[i].underWaterAssets !== '') {
                  constructInList[i].underWaterAssets = parseFloat(constructInList[i].underWaterAssets).toFixed(2)
                } else {
                  constructInList[i].underWaterAssets = ''
                }
                constructInList[i].assetsRatio = parseFloat(constructInList[i].assetsRatio).toFixed(2)
              }
            }
            if (this.riskInsInputData.riskReportEnvironmentList[0].eastDistance !== null && this.riskInsInputData.riskReportEnvironmentList[0].eastDistance !== '') {
              this.riskInsInputData.riskReportEnvironmentList[0].eastDistance = parseFloat(this.riskInsInputData.riskReportEnvironmentList[0].eastDistance).toFixed(2) + ''
            }
            if (this.riskInsInputData.riskReportEnvironmentList[0].eastHeight !== null && this.riskInsInputData.riskReportEnvironmentList[0].eastHeight !== '') {
              this.riskInsInputData.riskReportEnvironmentList[0].eastHeight = parseFloat(this.riskInsInputData.riskReportEnvironmentList[0].eastHeight).toFixed(2) + ''
            }
            if (this.riskInsInputData.riskReportEnvironmentList[0].southDistance !== null && this.riskInsInputData.riskReportEnvironmentList[0].southDistance !== '') {
              this.riskInsInputData.riskReportEnvironmentList[0].southDistance = parseFloat(this.riskInsInputData.riskReportEnvironmentList[0].southDistance).toFixed(2) + ''
            }
            if (this.riskInsInputData.riskReportEnvironmentList[0].southHeight !== null && this.riskInsInputData.riskReportEnvironmentList[0].southHeight !== '') {
              this.riskInsInputData.riskReportEnvironmentList[0].southHeight = parseFloat(this.riskInsInputData.riskReportEnvironmentList[0].southHeight).toFixed(2) + ''
            }
            if (this.riskInsInputData.riskReportEnvironmentList[0].westDistance !== null && this.riskInsInputData.riskReportEnvironmentList[0].westDistance !== '') {
              this.riskInsInputData.riskReportEnvironmentList[0].westDistance = parseFloat(this.riskInsInputData.riskReportEnvironmentList[0].westDistance).toFixed(2) + ''
            }
            if (this.riskInsInputData.riskReportEnvironmentList[0].westHeight !== null && this.riskInsInputData.riskReportEnvironmentList[0].westHeight !== '') {
              this.riskInsInputData.riskReportEnvironmentList[0].westHeight = parseFloat(this.riskInsInputData.riskReportEnvironmentList[0].westHeight).toFixed(2) + ''
            }
            if (this.riskInsInputData.riskReportEnvironmentList[0].northDistance !== null && this.riskInsInputData.riskReportEnvironmentList[0].northDistance !== '') {
              this.riskInsInputData.riskReportEnvironmentList[0].northDistance = parseFloat(this.riskInsInputData.riskReportEnvironmentList[0].northDistance).toFixed(2) + ''
            }
            if (this.riskInsInputData.riskReportEnvironmentList[0].northHeight !== null && this.riskInsInputData.riskReportEnvironmentList[0].northHeight !== '') {
              this.riskInsInputData.riskReportEnvironmentList[0].northHeight = parseFloat(this.riskInsInputData.riskReportEnvironmentList[0].northHeight).toFixed(2) + ''
            }
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
        this.$refs['riskReportMainVo'].validate((valid) => {
          if (!valid) {
            validFlag = true
          }
        })
        /* 将金额数据回复成为数字格式 */
        if (this.riskInsInputData.riskReportMainVo.sumAmount !== null && this.riskInsInputData.riskReportMainVo.sumAmount !== '') {
          this.riskInsInputData.riskReportMainVo.sumAmount = this.riskInsInputData.riskReportMainVo.sumAmount.replace(/,/g, '')
        }
//        if (this.riskInsInputData.riskReportMainVo.onceAccidentLosest !== null && this.riskInsInputData.riskReportMainVo.onceAccidentLosest !== '') {
//          this.riskInsInputData.riskReportMainVo.onceAccidentLosest = this.riskInsInputData.riskReportMainVo.onceAccidentLosest.replace(/,/g, '')
//        }
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
        this.$refs['riskReportMainVoC'].validate((valid) => {
          if (!valid) {
            validFlag = true
          }
        })
        this.$refs['riskReportMainVoD'].validate((valid) => {
          if (!valid) {
            validFlag = true
          }
        })
        this.$refs['riskReportConstructList'].validate((valid) => {
          if (!valid) {
            validFlag = true
          }
        })
        this.$refs['riskReportOccupationList'].validate((valid) => {
          if (!valid) {
            validFlag = true
          }
        })
        this.$refs['riskReportProtectionList'].validate((valid) => {
          if (!valid) {
            validFlag = true
          }
        })
        this.$refs['riskReportEnvironmentList'].validate((valid) => {
          if (!valid) {
            validFlag = true
          }
        })
        this.$refs['riskReportTheftList'].validate((valid) => {
          if (!valid) {
            validFlag = true
          }
        })
        this.$refs['riskReportAddressList'].validate((valid) => {
          if (!valid) {
            validFlag = true
          }
        })
        this.$refs['riskReportClaimList'].validate((valid) => {
          if (!valid) {
            validFlag = true
          }
        })
        this.$refs['riskReportConstructInfoList'].validate((valid) => {
          if (!valid) {
            validFlag = true
          }
        })
        /* 将金额从千分符格式化为合法数字 */
        let constructInListPre = this.riskInsInputData.riskReportConstructInfoList
        if (constructInListPre !== null) {
          for (let i = 0; i < constructInListPre.length; i++) {
            if (constructInListPre[i].underWaterAssets && constructInListPre[i].underWaterAssets !== null && constructInListPre[i].underWaterAssets !== '') {
              this.riskInsInputData.riskReportConstructInfoList[i].underWaterAssets = parseFloat(this.riskInsInputData.riskReportConstructInfoList[i].underWaterAssets.replace(/,/g, '')).toFixed(2)
            } else {
              this.riskInsInputData.riskReportConstructInfoList[i].underWaterAssets = ''
            }
          }
        }
        this.$refs['riskReportInterruptList'].validate((valid) => {
          if (!valid) {
            validFlag = true
          }
        })
        if (validFlag) {
          this.$Notice.error({
            title: '必录项存在未录入字段，请修改！'
          })
        } else {
          this.riskInsInputData.showTabFlag = false
          if (this.riskInsInputData.riskReportAddressList === [] || this.riskInsInputData.riskReportAddressList === null) {
            this.itemAddressFlag = true
            this.riskInsInputData.showTabFlag = true
          } else {
            if (this.riskInsInputData.riskReportAddressList.length === 0) {
              this.itemAddressFlag = true
              this.riskInsInputData.showTabFlag = true
            } else {
              this.itemAddressFlag = false
            }
          }
          if (this.riskInsInputData.riskReportConstructInfoList === [] || this.riskInsInputData.riskReportConstructInfoList === null) {
            this.constructBuildFlag = true
            this.riskInsInputData.showTabFlag = true
          } else {
            if (this.riskInsInputData.riskReportConstructInfoList.length === 0) {
              this.constructBuildFlag = true
              this.riskInsInputData.showTabFlag = true
            } else {
              this.constructBuildFlag = false
            }
          }
          if (this.riskInsInputData.showTabFlag) {
            this.$Message.error('存在表格未录入内容!')
            return false
          }
          /* 验证影像是否至少上传了五个目录 */
          const riskDcodeLists = this.riskInsInputData.riskDcodeList
          let pathHaveImageNum = 0
          let buildGateFlag = false
          for (let i = 0; i < riskDcodeLists.length; i++) {
            if (riskDcodeLists[i].configList !== null && riskDcodeLists[i].configList.urls.length !== 0) {
              pathHaveImageNum = pathHaveImageNum + 1
              if (riskDcodeLists[i].codeEname === '1.1') {
                buildGateFlag = true
              }
            }
          }
          if (pathHaveImageNum < 5) {
            this.$Message.error('请上传至少5个目录的图片!')
            return
          } else if (!buildGateFlag) {
            this.$Message.error('请上传大门照，上传图片中必须包含大门照!')
            return
          }
          let assetsRatioFlag = this.validateAssetsRatio()
          if (!assetsRatioFlag) {
            this.constructBuildFlag = true
            return
          } else {
            this.constructBuildFlag = false
            this.spinShow = true
          }
//          this.riskInsInputData.riskDcodeListDel = this.FileUpLoadConfig.riskDcodeListDel
          this.riskInsInputData.riskDcodeList = this.FileUpLoadConfig.riskDcodeList
          if (this.riskInsInputData.riskReportMainVo.onceAccidentLosest !== null && this.riskInsInputData.riskReportMainVo.onceAccidentLosest !== '') {
            this.riskInsInputData.riskReportMainVo.onceAccidentLosest = this.riskInsInputData.riskReportMainVo.onceAccidentLosest.replace(/,/g, '')
          }
          if (this.riskInsInputData.riskReportMainVo.pointy_2000 === '' && this.riskInsInputData.riskReportMainVo.pointx_2000 === '') {
            this.$Message.error('请使用地图选择查勘地址!')
            this.spinShow = false
            return
          }
          gradeAndSaveDetail(this.riskInsInputData).then((response) => {
            if (response.status === 1) {
              this.spinShow = false
              this.$Message.success(this.riskInsInputData.riskReportMainVo.riskFileNo + '保存成功！')
              this.$router.push({path: '/riskins_success', query: {riskFileNo: this.riskInsInputData.riskReportMainVo.riskFileNo, editModel: 'browse', riskModel: this.riskInsInputData.riskReportMainVo.riskModel, returnButtonState: this.returnButtonState}})
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
        this.reShowPrice.riskFileNo = riskFileNo
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
            parse(response.riskReportConstructList)
            parse(response.riskReportOccupationList)
            parse(response.riskReportProtectionList)
            parse(response.riskReportEnvironmentList)
            parse(response.riskReportTheftList)
            parse(response.riskReportAirStorageList)
            parse(response.riskReportTheftList)
            parse(response.riskReportAssessList)
            parse(response.riskReportInterruptList)
            parse(response.riskReportClaimList)
            parse(response.riskReportConstructInfoList)
            parse(response.riskReportAddressList)
            parse(response.riskDcodeList)
//          parse(response.riskDcodeListDel)
            if (response.riskReportAddressList === null) {
              response.riskReportAddressList = []
            }
            if (response.riskReportClaimList === null) {
              response.riskReportClaimList = []
            }
            if (response.riskReportConstructInfoList === null) {
              response.riskReportConstructInfoList = []
            }
            if (response.riskReportMainVo.riskCode == 'QBB') {
              this.pricingButtonFlag = true
            } else if (response.riskReportMainVo.riskCode == 'QBA') {
              this.pricingButtonFlag = true
            } else if (response.riskReportMainVo.riskCode == 'QYC') {
              this.pricingButtonFlag = true
            }
            this.riskInsInputData = response
            if (this.riskInsInputData.riskReportMainVo.underwriteFlag === '1' || this.riskInsInputData.riskReportMainVo.underwriteFlag === '3') {
              this.importFlag = true
            }
            if (this.riskInsInputData.riskReportOccupationList[0].flaLiquidFlag === '') {
              this.riskInsInputData.riskReportOccupationList[0].flaLiquidFlag = 'B'
            }
            if (this.riskInsInputData.riskReportOccupationList[0].flaGasFlag === '') {
              this.riskInsInputData.riskReportOccupationList[0].flaGasFlag = 'B'
            }
            if (this.riskInsInputData.riskReportOccupationList[0].expDustFlag === '') {
              this.riskInsInputData.riskReportOccupationList[0].expDustFlag = 'B'
            }
            if (this.riskInsInputData.riskReportOccupationList[0].hotWorkFlag === '') {
              this.riskInsInputData.riskReportOccupationList[0].hotWorkFlag = 'B'
            }
            if (this.riskInsInputData.riskReportOccupationList[0].cleanRoomFlag === '') {
              this.riskInsInputData.riskReportOccupationList[0].cleanRoomFlag = 'B'
            }
            if (this.riskInsInputData.riskReportOccupationList[0].eleProcessFlag === '') {
              this.riskInsInputData.riskReportOccupationList[0].eleProcessFlag = 'B'
            }
            if (this.riskInsInputData.riskReportOccupationList[0].highTemPreFlag === '') {
              this.riskInsInputData.riskReportOccupationList[0].highTemPreFlag = 'B'
            }
            this.FileUpLoadConfig.riskDcodeList = this.riskInsInputData.riskDcodeList
//          this.FileUpLoadConfig.riskDcodeListDel = this.riskInsInputData.riskDcodeListDel
            this.FileUpLoadConfig.riskFileNo = riskFileNo
            this.FileUpLoadConfig.editModel = this.editModel
            this.oldValue = this.riskInsInputData.riskReportProtectionList[0].fireEquipType
            // 录入人员
//          if (this.riskInsInputData.riskReportMainVo.operatorCode !== this.$store.state.app.userInfo.userCode) {
//            this.riskInsInputData.riskReportMainVo.operatorCode = this.$store.state.app.userInfo.userCode
//            this.riskInsInputData.riskReportMainVo.operator = this.$store.state.app.userInfo.userName
//          }
            // 查勘机构
            this.riskInsInputData.riskReportMainVo.explorecomCodeCName = this.riskInsInputData.riskReportMainVo.comCodeCName
            if (this.riskInsInputData.riskReportMainVo.sumAmount !== null && this.riskInsInputData.riskReportMainVo.sumAmount !== '') {
              this.riskInsInputData.riskReportMainVo.sumAmount = this.common.toThousands(parseFloat(this.riskInsInputData.riskReportMainVo.sumAmount).toFixed(4)) + ''
            }
            if (this.riskInsInputData.riskReportMainVo.stockRate !== null && this.riskInsInputData.riskReportMainVo.stockRate !== '') {
              this.riskInsInputData.riskReportMainVo.stockRate = parseFloat(this.riskInsInputData.riskReportMainVo.stockRate).toFixed(2) + ''
            }
            if (this.riskInsInputData.riskReportMainVo.onceAccidentLosest !== null && this.riskInsInputData.riskReportMainVo.onceAccidentLosest !== '') {
              this.riskInsInputData.riskReportMainVo.onceAccidentLosest = this.common.toThousands(parseFloat(this.riskInsInputData.riskReportMainVo.onceAccidentLosest).toFixed(2)) + ''
            }
            if (this.riskInsInputData.riskReportMainVo.loseRate !== null && this.riskInsInputData.riskReportMainVo.loseRate !== '') {
              this.riskInsInputData.riskReportMainVo.loseRate = parseFloat(this.riskInsInputData.riskReportMainVo.loseRate).toFixed(2) + ''
            }
            let constructInList = this.riskInsInputData.riskReportConstructInfoList
            if (constructInList !== null) {
              for (let i = 0; i < constructInList.length; i++) {
                if (constructInList[i].underWaterAssets && constructInList[i].underWaterAssets !== null && constructInList[i].underWaterAssets !== '') {
                  constructInList[i].underWaterAssets = this.common.toThousands(parseFloat(constructInList[i].underWaterAssets).toFixed(2))
                } else {
                  constructInList[i].underWaterAssets = ''
                }
//              constructInList[i].underWaterAssets = parseFloat(constructInList[i].underWaterAssets).toFixed(2)
                constructInList[i].assetsRatio = parseFloat(constructInList[i].assetsRatio).toFixed(2)
              }
            }
            if (this.riskInsInputData.riskReportEnvironmentList[0].eastDistance !== null && this.riskInsInputData.riskReportEnvironmentList[0].eastDistance !== '') {
              this.riskInsInputData.riskReportEnvironmentList[0].eastDistance = parseFloat(this.riskInsInputData.riskReportEnvironmentList[0].eastDistance).toFixed(2) + ''
            }
            if (this.riskInsInputData.riskReportEnvironmentList[0].eastHeight !== null && this.riskInsInputData.riskReportEnvironmentList[0].eastHeight !== '') {
              this.riskInsInputData.riskReportEnvironmentList[0].eastHeight = parseFloat(this.riskInsInputData.riskReportEnvironmentList[0].eastHeight).toFixed(2) + ''
            }
            if (this.riskInsInputData.riskReportEnvironmentList[0].southDistance !== null && this.riskInsInputData.riskReportEnvironmentList[0].southDistance !== '') {
              this.riskInsInputData.riskReportEnvironmentList[0].southDistance = parseFloat(this.riskInsInputData.riskReportEnvironmentList[0].southDistance).toFixed(2) + ''
            }
            if (this.riskInsInputData.riskReportEnvironmentList[0].southHeight !== null && this.riskInsInputData.riskReportEnvironmentList[0].southHeight !== '') {
              this.riskInsInputData.riskReportEnvironmentList[0].southHeight = parseFloat(this.riskInsInputData.riskReportEnvironmentList[0].southHeight).toFixed(2) + ''
            }
            if (this.riskInsInputData.riskReportEnvironmentList[0].westDistance !== null && this.riskInsInputData.riskReportEnvironmentList[0].westDistance !== '') {
              this.riskInsInputData.riskReportEnvironmentList[0].westDistance = parseFloat(this.riskInsInputData.riskReportEnvironmentList[0].westDistance).toFixed(2) + ''
            }
            if (this.riskInsInputData.riskReportEnvironmentList[0].westHeight !== null && this.riskInsInputData.riskReportEnvironmentList[0].westHeight !== '') {
              this.riskInsInputData.riskReportEnvironmentList[0].westHeight = parseFloat(this.riskInsInputData.riskReportEnvironmentList[0].westHeight).toFixed(2) + ''
            }
            if (this.riskInsInputData.riskReportEnvironmentList[0].northDistance !== null && this.riskInsInputData.riskReportEnvironmentList[0].northDistance !== '') {
              this.riskInsInputData.riskReportEnvironmentList[0].northDistance = parseFloat(this.riskInsInputData.riskReportEnvironmentList[0].northDistance).toFixed(2) + ''
            }
            if (this.riskInsInputData.riskReportEnvironmentList[0].northHeight !== null && this.riskInsInputData.riskReportEnvironmentList[0].northHeight !== '') {
              this.riskInsInputData.riskReportEnvironmentList[0].northHeight = parseFloat(this.riskInsInputData.riskReportEnvironmentList[0].northHeight).toFixed(2) + ''
            }
            this.spinShow = false
//          this.Config.riskDcodeList = this.riskInsInputData.riskDcodeList
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
//            if (userinfo.taskCodeList !== null && userinfo.taskCodeList !== '' && userinfo.taskCodeList.indexOf('riskins_score') === -1) {
//              this.raderFlag = false
//            } else {
//              this.raderFlag = true
//            }
              this.option.series[0].data[0].value.push(response.riskReportAssessList[0].fireDanger)
              this.option.series[0].data[0].value.push(response.riskReportAssessList[0].waterDanger)
              this.option.series[0].data[0].value.push(response.riskReportAssessList[0].windDanger)
              this.option.series[0].data[0].value.push(response.riskReportAssessList[0].thunderDanger)
              this.option.series[0].data[0].value.push(response.riskReportAssessList[0].snowDanger)
              this.option.series[0].data[0].value.push(response.riskReportAssessList[0].theftDanger)
              this.option.series[0].data[0].value.push(response.riskReportAssessList[0].earthquakeDanger)
              this.option.series[0].data[0].value.push(response.riskReportAssessList[0].geologyDanger)
              this.option.series[0].data[0].label.normal.show = this.postListFlag
//            this.rader.series[0].data[0].value.push(response.riskReportMainVo.score)
              this.myChart.setOption(this.option)
//            this.myChart2.setOption(this.rader)
//            this.bar.series[0].data[0].value = [response.riskReportAssessList[0].fireDanger, response.riskReportAssessList[0].waterDanger, response.riskReportAssessList[0].windDanger, response.riskReportAssessList[0].thunderDanger, response.riskReportAssessList[0].snowDanger, response.riskReportAssessList[0].theftDanger, response.riskReportAssessList[0].earthquakeDanger, response.riskReportAssessList[0].geologyDanger]
            }
//            else {
//              if (!isNaN(response.riskReportMainVo.score)) {
//                response.riskReportMainVo.score = 0
//              }
//            }
          }
        }, (response) => {
          // error callback
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
//              for (var i = 0; i < this.riskInsInputData.riskReportClaimList.length; i++) {
//                if (i + 1 === this.riskInsInputData.riskReportClaimList.length) {
//                  this.riskInsInputData.riskReportClaimList[i].riskReason = this.riskReportClaimVo.riskReason
//                  this.riskInsInputData.riskReportClaimList[i].riskDate = this.riskReportClaimVo.riskDate
//                  this.riskInsInputData.riskReportClaimList[i].riskPosition = this.riskReportClaimVo.riskPosition
//                  this.riskInsInputData.riskReportClaimList[i].loseInfo = this.riskReportClaimVo.loseInfo
//                  this.riskInsInputData.riskReportClaimList[i].abarbeitungFlag = this.riskReportClaimVo.abarbeitungFlag
//                  this.riskInsInputData.riskReportClaimList[i].abarbeitungMeasure = this.riskReportClaimVo.abarbeitungMeasure
//                  break
//                }
//              }
            }
          } else {
            return false
          }
        })
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
      /* 建筑情况信息修改 */
      changeBuild (riskReportConstructInfo) {
        this.build = 'edit'
        this.riskReportConstructInfoModal = true
        this.constructInfo = riskReportConstructInfo
        this.riskReportConstructInfoVo.constructName = riskReportConstructInfo.constructName
        this.riskReportConstructInfoVo.constructBuild = riskReportConstructInfo.constructBuild
        this.riskReportConstructInfoVo.constructYear = riskReportConstructInfo.constructYear
        this.riskReportConstructInfoVo.underWaterAssets = riskReportConstructInfo.underWaterAssets
        this.riskReportConstructInfoVo.occupancy = riskReportConstructInfo.occupancy
        this.riskReportConstructInfoVo.assetsRatio = riskReportConstructInfo.assetsRatio
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
      underwrite (params, flag) {
        if (params.underwriteFlag === '2') {
          this.$Message.error(params.riskFileNo + '处于打回状态，不支持再次审核')
        } else if (params.underwriteFlag === '1' || params.underwriteFlag === '3') {
          this.$Message.error(params.riskFileNo + '处于审核通过状态，不支持再次审核')
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
//                iView.Spin.hide()
                loadingInstance.close()
                this.$router.push({path: '/riskins_pass', query: {underwriteFlag: '1', riskFileNo: params.riskFileNo, editModel: 'browse', riskModel: this.riskInsInputData.riskReportMainVo.riskModel}})
              } else {
                this.$router.push({path: '/riskins_pass', query: {riskFileNo: params.riskFileNo, editModel: 'browse', riskModel: this.riskInsInputData.riskReportMainVo.riskModel}})
              }
            } else {
              this.$Message.error(params.riskFileNo + '处理失败！')
            }
          }, (response) => {
            this.$Message.error(params.riskFileNo + '处理失败！')
          })
        }
      }
      // 分页
//      queryByPage (index) {
//        this.riskInsInputData.pageNo = index
//      },
      // 历史损失记录--损失详细描述模态框
//      moreDesc (index) {
//        this.$Modal.info({
//          title: '损失详细描述',
//          content: `<p>${this.riskInsInputData.riskReportClaimList[index].loseInfo}</p>`
//        })
//      }
    },
    mounted () {
      /* ECharts图表 */
      this.myChart = this.$echarts.init(document.getElementById('myChart'))
      this.myChart.setOption(this.option)
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

<!--<style lang="less" rel="stylesheet/less" scoped>-->
<style lang="scss" scoped>
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
  /*.cameraicon{
    font-size: 20px;
    margin-top: 9px;
    margin-left: 8px
  }*/
  .ivu-card-out{
    height: 100vh;
  }
  .mapcompontent{
    .ivu-modal{
      top: 0;
    }
  }


</style>
