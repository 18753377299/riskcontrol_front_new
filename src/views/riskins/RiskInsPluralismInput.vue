<template>
  <div class="contentBox">
    <el-card class="box-card"> <!--class="ivu-el-card-height tabcard" style="padding: 0" :class="{'ivu-el-card-out': outerSystemFlag}"-->
      <div>
        <div class="updown">
          <HeadButtonCommon :risk-file-title="riskFileTitle" :return-button-state="returnButtonState" :reviewed-button-state="reviewedButtonState" :back-button-state="backButtonState" :business-type="editModel" :edit-button-state="editButtonState" :outer-system-flag="outerSystemFlag" :import-flag="importFlag" @button-event="HeadButtonEvent"></HeadButtonCommon>
        </div>
        <article>
          <el-col style="padding: 0px 10px 0px">
            <el-form ref="riskInsInputData" :model="riskInsInputData" :rules="ruleValidate" :label-width="140">
              <Row>
                <el-tabs  v-model="currnetTabPanel" :animated=true>
                  <el-tab-pane label="基本信息" class="document-text" style="max-height: calc(100vh - 229px);overflow-y: auto;" name="name1">
                    <el-form ref="riskReportMainVo" :model="riskInsInputData.riskReportMainVo" :rules="ruleValidate" :label-width="140">
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
                          <el-form-item label="总保险金额" prop="sumAmount">
                            <el-input type="text" v-model="riskInsInputData.riskReportMainVo.sumAmount"  :disabled=browseFlag>
                              <span slot="append">万元</span>
                            </el-input>
                          </el-form-item>
                        </el-col>
                        <el-col span="8">
                          <el-form-item label="存货比例" prop="stockRate">
                            <el-input type="text" v-model="riskInsInputData.riskReportMainVo.stockRate" :disabled=browseFlag>
                              <span slot="append">%</span>
                            </el-input>
                          </el-form-item>
                        </el-col>
                        <el-col span="8" v-if="riskInsInputData.riskReportMainVo.archivesNo !== '' && riskInsInputData.riskReportMainVo.archivesNo !== null">
                          <el-form-item label="照片档案号" prop="archivesNo">
                            <el-input type="text" v-model="riskInsInputData.riskReportMainVo.archivesNo" disabled></el-input>
                          </el-form-item>
                        </el-col>
                      </el-col>
                    </el-form>
                  </el-tab-pane>
                  <el-tab-pane label="企业基本信息" class="person" style="max-height: calc(100vh - 229px);overflow-y: auto;padding: 15px;" name="name2"><!--style="height: 350px;"-->
                    <el-form ref="riskReportMainVoA" :model="riskInsInputData.riskReportMainVo" :rules="ruleValidate" :label-width="140">
                      <el-col span="24">
                        <el-col span="8">
                          <el-form-item label="被保险人类型" prop="insuredType" :label-width="150">
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
                          <el-col span="21">
                            <el-form-item label="被保险人名称" prop="insuredName">
                              <el-input type="text" v-model="riskInsInputData.riskReportMainVo.insuredName" disabled></el-input>
                            </el-form-item>
                          </el-col>
                          <el-col span="1" style="padding-left: 10px">
                            <i v-if="!showUpload('1.1')" class="el-icon-camerae"  @click.native="buttonCommonEvent('1.1')"></i>
                            <i v-if="showUpload('1.1')" class="el-icon-camera"  @click.native="buttonCommonEvent('1.1')"></i>
                            <!--<i icon="el-icon-camera" size="15"  @click.native="buttonCommonEvent('1.1')" aria-readonly="true"></i>-->
                          </el-col>
                        </el-col>
                      </el-col>
                      <el-col span="24">
                        <el-col span="8">
                          <el-form-item label="被保险人性质" prop="unitNature" :label-width="150">
                            <el-select v-model="riskInsInputData.riskReportMainVo.unitNature" placeholder=""  :disabled=browseFlag>
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
                      </el-col>
                      <el-col span="24">
                        <el-col span="8">
                          <el-form-item label="国民经济代码" prop="businessSourceCName" :label-width="150"><!--:style="{marginTop:margin}"-->
                            <el-input type="text" v-model="riskInsInputData.riskReportMainVo.businessSourceCName" placeholder="请点击..." @blur="queryData" style="width: 100%" :disabled=browseFlag>
                              <el-button slot="append" icon="el-icon-search" @click="codeCodeDialog();" :disabled=browseFlag></el-button>
                            </el-input>
                          </el-form-item>
                        </el-col>
                        <el-col span="8">
                          <el-form-item label="行业分类代码" prop="businessClass">
                            <!--<el-select type="text" v-model="riskInsInputData.riskReportMainVo.businessClass" disabled>-->
                            <!--<el-option value="1">初勘</el-option>-->
                            <!--<el-option value="2">复勘</el-option>-->
                            <!--</el-select>-->
                            <el-input type="text" v-model="riskInsInputData.riskReportMainVo.businessClass" style="width: 100%" disabled></el-input>
                          </el-form-item>
                        </el-col>
                      </el-col>
                      <el-col span="24">
                        <el-col span="23">
                          <el-form-item label="查勘地址" prop="addressDetail" :label-width="150">
                            <el-input type="text" v-model="riskInsInputData.riskReportMainVo.addressDetail" disabled  style="width: 100%"></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col span="1" style="padding-left: 10px;">
                          <!--<i icon="ios-map-outline"  @click.native="buttonCommonEvent('1.1')"></i>-->
                          <i icon="el-icon-location"  @click.native="queryAddressDetail"></i>
                          <!--<i icon="el-icon-camerae" size="15"  @click.native="buttonCommonEvent('1.2')"></i>-->
                        </el-col>
                      </el-col>
                      <el-col span="24">
                        <el-col span="8">
                          <el-form-item label="三年历史赔付损失记录" prop="historyLoseFlag" :label-width="150" style="height: 50px">
                            <el-select type="date" v-model="riskInsInputData.riskReportMainVo.historyLoseFlag" @on-change="changeHistoryLoseFlag" placeholder="" style="width: 100%" :disabled=browseFlag>
                              <el-option value="1">有</el-option>
                              <el-option value="0">无</el-option>
                            </el-select>
                          </el-form-item>
                        </el-col>
                      </el-col>
                    </el-form>
                    <el-col span="24" v-if="riskInsInputData.riskReportMainVo.historyLoseFlag === '1'">
                      <el-col span="24" v-if="loseHistoryFlag">
                        <span style="color:#FF3806;">请添加三年历史损失记录表格内容！</span>
                      </el-col>
                      <el-col span="24">
                        <div class="title" style="margin-top: 1px">
                          <i icon="el-icon-document"></i>
                          三年历史损失记录：
                        </div>
                      </el-col>
                      <table border="0" cellspacing="0" cellpadding="0" style="word-break:break-all;"> <!--class="mytable" border="0" cellspacing="0" cellpadding="0" style="word-break:break-all;"-->
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
                              <!--<el-input type="textarea"  v-model="riskReportClaim.riskReason" disabled>-->
                              <!--<el-option value='H'>火灾</el-option>-->
                              <!--<el-option value='A'>水灾</el-option>-->
                              <!--<el-option value='B'>风灾</el-option>-->
                              <!--<el-option value='C'>雪灾</el-option>-->
                              <!--<el-option value='D'>雷击</el-option>-->
                              <!--<el-option value='E'>盗抢</el-option>-->
                              <!--<el-option value='F'>地质灾害</el-option>-->
                              <!--<el-option value='G'>意外事故</el-option>-->
                              <!--</el-input>-->
                              {{riskReportClaim.riskReason}}
                            </td>
                            <td class="text-center">
                              <el-date-picker type="date" v-model="riskReportClaim.riskDate" disabled></el-date-picker>
                            </td>
                            <!--<el-input type="textarea"  v-model="riskReportClaim.riskPosition" disabled></el-input>-->
                            <!--<el-input type="textarea"  v-model="riskReportClaim.loseInfo" disabled></el-input>-->
                            <td class="text-center">{{riskReportClaim.riskPosition}}</td>
                            <td class="text-center">{{riskReportClaim.loseInfo}}</td>
                            <td>
                              <el-select type="text" v-model="riskReportClaim.abarbeitungFlag" placeholder="" disabled >
                                <el-option value='A'>有</el-option>
                                <el-option value='B'>无</el-option>
                              </el-select>
                            </td>
                            <!--<el-input type="textarea"  v-model="riskReportClaim.abarbeitungMeasure" disabled></el-input>-->
                            <td>{{riskReportClaim.abarbeitungMeasure}}</td>
                            <td style="line-height:24px;">
                              <el-button type="text" v-on:click="claimDelete(index)" :disabled=browseFlag style="color: #2d8cf0" size = "small">删除</el-button>
                              <el-button type="text" v-on:click="changeClaim(riskReportClaim)" :disabled=browseFlag style="color: #2d8cf0" size = "small">修改</el-button>
                            </td>
                          </tr>
                        </tbody>
                        <tfoot>
                          <tr><!--v-if="riskInsInputData.riskReportClaimList.length <= 10"-->
                            <td style="width:10%"></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td style="width:10%" class="text-center"><!--v-if="riskInsInputData.riskReportClaimList.length <= 10"-->
                              <el-button type="text" v-on:click="createClaim()" :disabled=browseFlag style="color: #2d8cf0" size = "small">增加</el-button><!--v-show="riskInsInputData.riskReportClaimList.length !== 10"-->
                              <!--class="fa fa-plus text-center"-->
                              <el-form ref="riskReportClaimVo" :rules="ruleValidate8" :model="riskReportClaimVo">
                                <el-dialog v-model="claimModal" width="800" :mask-closable="false" @on-cancel="modalCancel('riskReportClaimVo')">
                                  <p slot="header" style="color:#2d8cf0;text-align:center">
                                    <i icon="el-icon-document"></i>
                                    <span>历史损失记录</span>
                                  </p>
                                  <div style="padding: 10px;">
                                    <el-col span="24">
                                      <el-form-item label="出险原因：" prop="riskReason">
                                        <el-input type="text" v-model="riskReportClaimVo.riskReason" placeholder="请输入出险原因..." style="width: 100%"></el-input>
                                      </el-form-item>
                                    </el-col>
                                    <el-col span="24">
                                      <el-form-item label="出险时间：" prop="riskDate">
                                        <el-date-picker type="date" v-model="riskReportClaimVo.riskDate" placeholder="请输入时间..." style="width: 100%"></el-date-picker>
                                      </el-form-item>
                                    </el-col>
                                    <el-col span="24">
                                      <el-form-item label="出险地址和部位：" prop="riskPosition">
                                        <el-input type="text" v-model="riskReportClaimVo.riskPosition"></el-input>
                                      </el-form-item>
                                    </el-col>
                                    <el-col span="24">
                                      <el-form-item label="损失详细描述：" prop="loseInfo">
                                        <el-input type="text" v-model="riskReportClaimVo.loseInfo"></el-input>
                                      </el-form-item>
                                    </el-col>
                                    <el-col span="24">
                                      <el-form-item label="有无整改：" prop="abarbeitungFlag">
                                        <el-select v-model="riskReportClaimVo.abarbeitungFlag" placeholder="">
                                          <el-option value='A'>有</el-option>
                                          <el-option value='B'>无</el-option>
                                        </el-select>
                                      </el-form-item>
                                    </el-col>
                                    <el-col span="24">
                                      <el-form-item label="整改措施：" prop="abarbeitungMeasure">
                                        <el-input type="text" v-model="riskReportClaimVo.abarbeitungMeasure"></el-input>
                                      </el-form-item>
                                    </el-col>
                                  </div>
                                  <div slot="footer">
                                    <div v-if="this.claim === 'new'">
                                      <el-button size="large" class = "compose" @click="addClaim">添加</el-button>
                                    </div>
                                    <div v-if="this.claim === 'edit'">
                                      <el-button size="large" class = "compose" @click="addClaim">保存</el-button>
                                    </div>
                                  </div>
                                </el-dialog>
                              </el-form>
                            </td>
                          </tr>
                        </tfoot>
                      </table>
                    </el-col>
                    <el-col span="24" style="height: 25px;">
                      <div class="title">
                        <i icon="el-icon-location-information"></i>
                        标的地址：
                      </div>
                    </el-col>
                    <el-col span="24" v-if="itemAddressFlag">
                      <span style="color:#FF3806;">请添加标的地址表格内容！</span>
                    </el-col>
                    <el-col span="24">
                      <table  border="0" cellspacing="0" cellpadding="0"><!--class="mytable"-->
                        <thead>
                          <tr>
                            <th style="width: 5%">序号</th>
                            <th style="width: 85%">标的地址</th>
                            <th style="width: 10%">操作</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="(riskReportAddress,index) in riskInsInputData.riskReportAddressList" :key="index">
                            <td style="width: 10%"><el-input type="text" class="text-center" v-bind:value="index+1" disabled></el-input></td>
                            <td style="width: 80%"><el-input type="text" v-model="riskReportAddress.itemAddress" disabled></el-input></td>
                            <td style="width:10%">
                              <el-button type="text" v-on:click="addressDelete(index)" :disabled=browseFlag style="color: #2d8cf0" size = "small">删除</el-button><!--class="fa fa-remove text-center"-->
                            </td>
                          </tr>
                        </tbody>
                        <tfoot>
                          <tr>
                            <td style="width:10%"></td>
                            <td style="width:80%"></td>
                            <td style="width:10%" class="text-center"><!--;color:#D8504B;-->
                              <el-button type="text" v-on:click="createAddress()" :disabled=browseFlag style="color: #2d8cf0" size = "small">增加</el-button>
                              <el-form ref="itemAddressVo" :rules="ruleValidate7" :model="itemAddressVo">
                                <el-dialog v-model="addressModal" width="800" :mask-closable="false" @on-cancel="modalCancel('itemAddressVo')">
                                  <p slot="header" style="color:#2d8cf0;text-align:center">
                                    <i icon="el-icon-location-information"></i>
                                    <span>标的地址</span>
                                  </p>
                                  <div style="padding: 10px;">
                                    <el-form-item label="标的地址：" prop="itemAddress">
                                      <el-input type="text" v-model="itemAddressVo.itemAddress"></el-input>
                                    </el-form-item>
                                  </div>
                                  <div slot="footer">
                                    <el-button size="large" class = "compose" @click="addAdress">添加</el-button>
                                  </div>
                                </el-dialog>
                              </el-form>
                            </td>
                          </tr>
                        </tfoot>
                      </table>
                    </el-col>
                  </el-tab-pane>
                  <el-tab-pane label="建筑物" class="ios-home" style="max-height: calc(100vh - 229px);overflow-y: auto;padding: 15px;" name="name3" ><!--style="height: 350px;"-->
                    <el-form ref="riskReportConstructList" :model="riskInsInputData.riskReportConstructList[0]" :rules="ruleValidate1" :label-width="140">
                      <div class="title">
                        <i icon="el-icon-search"></i>
                        建筑情况：
                      </div>
                      <el-col span="24" v-if="constructBuildFlag">
                        <span style="color:#FF3806;">请添加建筑情况表格内容！且资产占比和应等于100%</span>
                      </el-col>
                      <table  border="0" cellspacing="0" cellpadding="0"><!--class="mytable"-->
                        <thead>
                          <tr>
                            <th>序号</th>
                            <th>
                              建筑结构
                              <i v-if="!showUpload('2.1')" class="el-icon-camerae"  @click.native="buttonCommonEvent('2.1')"></i>
                              <i v-if="showUpload('2.1')" class="el-icon-camera"  @click.native="buttonCommonEvent('2.1')"></i>
                              <!--<i icon="android-camera" size="15"  @click.native="buttonCommonEvent('2.1')"></i>-->
                            </th>
                            <th>资产占比（%）</th>
                            <th>操作</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="(riskReportConstructInfo,index) in riskInsInputData.riskReportConstructInfoList" :key="index">
                            <td><el-input type="text" v-bind:value="index+1" disabled></el-input></td>
                            <td><el-select type="text" v-model="riskReportConstructInfo.constructBuild" placeholder="" disabled>
                              <el-option value="A">钢筋混凝土结构</el-option>
                              <el-option value="B">砖混结构</el-option>
                              <el-option value="C">砖木结构</el-option>
                              <el-option value="D">钢结构</el-option>
                              <el-option value="E">简易建筑</el-option>
                            </el-select></td>
                            <td style="width: 20%"><el-input v-model="riskReportConstructInfo.assetsRatio" disabled></el-input></td>
                            <td style="width: 5%;color:#D8504B;">
                              <el-button type="text" v-on:click="riskInsDeleteBuild(index)" :disabled=browseFlag style="color: #2d8cf0" size = "small">删除</el-button><!--class="fa fa-remove text-center"-->
                              <el-button type="text" v-on:click="changeBuild(riskReportConstructInfo)" :disabled=browseFlag style="color: #2d8cf0" size = "small">修改</el-button>
                            </td>
                          </tr>
                        </tbody>
                        <tfoot>
                          <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td class="text-center">
                              <el-button type="text" v-on:click="riskInsAddBuild()" :disabled=browseFlag style="color: #2d8cf0" size = "small">增加</el-button>
                              <el-form ref="riskReportConstructInfoVo" :rules="ruleValidate9" :model="riskReportConstructInfoVo">
                                <el-dialog v-model="riskReportConstructInfoModal" width="800" :mask-closable="false" @on-cancel="modalCancel('riskReportConstructInfoVo')">
                                  <p slot="header" style="color:#2d8cf0;text-align:center">
                                    <i icon="el-icon-search"></i>
                                    <span>建筑物情况</span>
                                  </p>
                                  <div style="padding: 10px;">
                                    <Row>
                                      <el-col span="24">
                                        <el-form-item label="建筑结构：" prop="constructBuild">
                                          <el-select type="text" v-model="riskReportConstructInfoVo.constructBuild" placeholder="">
                                            <el-option value="A">钢筋混凝土结构</el-option>
                                            <el-option value="B">砖混结构</el-option>
                                            <el-option value="C">砖木结构</el-option>
                                            <el-option value="D">钢结构</el-option>
                                            <el-option value="E">简易建筑</el-option>
                                          </el-select>
                                        </el-form-item>
                                      </el-col>
                                      <el-col span="24">
                                        <el-form-item label="资产占比（%）：" prop="assetsRatio">
                                          <el-input type="text" v-model="riskReportConstructInfoVo.assetsRatio"></el-input>
                                        </el-form-item>
                                      </el-col>
                                    </Row>
                                  </div>
                                  <div slot="footer">
                                    <div v-if="this.build === 'new'">
                                      <el-button size="large" class = "compose" @click="addRiskReportConstructInfo">添加</el-button>
                                    </div>
                                    <div v-if="this.build === 'edit'">
                                      <el-button size="large" class = "compose" @click="addRiskReportConstructInfo">保存</el-button>
                                    </div>
                                  </div>
                                </el-dialog>
                              </el-form>
                            </td>
                          </tr>
                        </tfoot>
                      </table>
                      <div class="title">
                        <i icon="el-icon-lock"></i>
                        地下资产：
                      </div>
                      <el-col span="24">
                        <el-col span="8">
                          <el-col span="22">
                            <el-form-item label="是否存在地下资产" prop="underAssetsFlag" :label-width="170">
                              <el-select type="text" v-model="riskInsInputData.riskReportConstructList[0].underAssetsFlag" placeholder="" :disabled=browseFlag>
                                <el-option value="A">存在地下资产</el-option>
                                <el-option value="B">不存在地下资产</el-option>
                              </el-select>
                            </el-form-item>
                          </el-col>
                          <el-col span="1">
                            <i v-if="!showUpload('2.2')" class="el-icon-camerae"  @click.native="buttonCommonEvent('2.2')"></i>
                            <i v-if="showUpload('2.2')" class="el-icon-camera"  @click.native="buttonCommonEvent('2.2')"></i>
                            <!--<i icon="android-camera" size="15"  @click.native="buttonCommonEvent('2.2')"></i>-->
                          </el-col>
                        </el-col>
                        <el-col span="8">
                          <el-col span="22">
                            <el-form-item label="是否有内置排水管" prop="pipelineFlag">
                              <el-select v-model="riskInsInputData.riskReportConstructList[0].pipelineFlag" placeholder="" :disabled=browseFlag>
                                <el-option value="A">是</el-option>
                                <el-option value="B">否</el-option>
                              </el-select>
                            </el-form-item>
                          </el-col>
                          <el-col span="1">
                            <i v-if="!showUpload('2.3')" class="el-icon-camerae"  @click.native="buttonCommonEvent('2.3')"></i>
                            <i v-if="showUpload('2.3')" class="el-icon-camera"  @click.native="buttonCommonEvent('2.3')"></i>
                            <!--<i icon="android-camera" size="15"  @click.native="buttonCommonEvent('2.3')"></i>-->
                          </el-col>
                        </el-col>
                        <el-col span="8">
                          <el-col span="22">
                            <el-form-item label="是否安装避雷设施" prop="lightningPro">
                              <el-select type="text" v-model="riskInsInputData.riskReportConstructList[0].lightningPro" placeholder="" :disabled=browseFlag>
                                <el-option value="A">是</el-option>
                                <el-option value="B">否</el-option>
                              </el-select>
                            </el-form-item>
                          </el-col>
                          <el-col span="1">
                            <i v-if="!showUpload('2.5')" class="el-icon-camerae"  @click.native="buttonCommonEvent('2.5')"></i>
                            <i v-if="showUpload('2.5')" class="el-icon-camera"  @click.native="buttonCommonEvent('2.5')"></i>
                            <!--<i icon="android-camera" size="15"  @click.native="buttonCommonEvent('2.5')"></i>-->
                          </el-col>
                        </el-col>
                      </el-col>
                      <el-col span="24">
                        <el-col span="8">
                          <el-col span="22">
                            <el-form-item label="建筑是否高耸/孤立/突出" :label-width="170" prop="highBuildFlag">
                              <el-select type="text" v-model="riskInsInputData.riskReportConstructList[0].highBuildFlag" placeholder="" :disabled=browseFlag>
                                <el-option value="A">是</el-option>
                                <el-option value="B">否</el-option>
                              </el-select>
                            </el-form-item>
                          </el-col>
                          <el-col span="1">
                            <i v-if="!showUpload('2.6')" class="el-icon-camerae"  @click.native="buttonCommonEvent('2.6')"></i>
                            <i v-if="showUpload('2.6')" class="el-icon-camera"  @click.native="buttonCommonEvent('2.6')"></i>
                            <!--<i icon="android-camera" size="15"  @click.native="buttonCommonEvent('2.6')"></i>-->
                          </el-col>
                        </el-col>
                        <el-col span="16">
                          <el-col span="16">
                            <el-form-item label="建筑物内建筑防火分隔设施类型" :label-width="200" prop="fireproofingType">
                              <el-checkbox-group v-model="riskInsInputData.riskReportConstructList[0].fireproofingType">
                                <el-checkbox label="A" :disabled=browseFlag><span>防火门</span></el-checkbox>
                                <el-checkbox label="B" :disabled=browseFlag><span>防火墙</span></el-checkbox>
                                <el-checkbox label="C" :disabled=browseFlag><span>防火卷帘</span></el-checkbox>
                              </el-checkbox-group>
                            </el-form-item>
                          </el-col>
                          <el-col span="1" style="margin-left:-54px">
                            <i v-if="!showUpload('2.4')" class="el-icon-camerae"  @click.native="buttonCommonEvent('2.4')"></i>
                            <i v-if="showUpload('2.4')" class="el-icon-camera"  @click.native="buttonCommonEvent('2.4')"></i>
                            <!--<i icon="android-camera" size="15"  @click.native="buttonCommonEvent('2.4')"></i>-->
                          </el-col>
                        </el-col>
                      </el-col>
                    </el-form>
                  </el-tab-pane>
                  <el-tab-pane label="占用性质" class="ios-flag" style="max-height: calc(100vh - 229px);overflow-y: auto;padding: 15px;" name="name4">
                    <el-form ref="riskReportOccupationList" :model="riskInsInputData.riskReportOccupationList[0]" :rules="ruleValidate2" :label-width="140">
                      <el-col span="24">
                        <el-form-item label="生产工艺流程" prop="productProcess"><!--tyle="width: 100%"-->
                          <el-input type="textarea" v-model="riskInsInputData.riskReportOccupationList[0].productProcess" :disabled=browseFlag></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col span="24">
                        <div class="title">
                          <i icon="el-icon-paperclip"></i>
                          主要原材料/成品（如有多种则列出用/产量最大一种）：
                        </div>
                      </el-col>
                      <el-col span="24">
                        <el-col span="8">
                          <el-form-item label="材料名称" prop="materialName">
                            <el-input type="text" id="materialName" v-model="riskInsInputData.riskReportOccupationList[0].materialName" :disabled=browseFlag></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col span="8">
                          <el-col span="22">
                            <el-form-item label="物质燃烧性质" prop="ignitionQuality">
                              <el-select type="text" id="ignitionQuality" v-model="riskInsInputData.riskReportOccupationList[0].ignitionQuality" placeholder="" filterable :disabled=browseFlag>
                                <el-option value='A'>不燃</el-option>
                                <el-option value='B'>难燃</el-option>
                                <el-option value='C'>可燃</el-option>
                                <el-option value='D'>易燃</el-option>
                              </el-select>
                            </el-form-item>
                          </el-col>
                          <el-col span="1">
                            <i v-if="!showUpload('3.2')" class="el-icon-camerae"  @click.native="buttonCommonEvent('3.2')" ></i><!--aria-readonly="true"-->
                            <i v-if="showUpload('3.2')" class="el-icon-camera"  @click.native="buttonCommonEvent('3.2')" ></i>
                          </el-col>
                        </el-col>
                        <el-col span="8">
                          <el-form-item label="物质对水敏感度" prop="waterSensitivity">
                            <el-select type="text" id="waterSensitivity" v-model="riskInsInputData.riskReportOccupationList[0].waterSensitivity" placeholder="" filterable :disabled=browseFlag>
                              <el-option value="A">浸水全损</el-option>
                              <el-option value="B">部分致损</el-option>
                              <el-option value="C">不受影响</el-option>
                            </el-select>
                          </el-form-item>
                        </el-col>
                        <!--<table class="mytable" border="0" cellspacing="0" cellpadding="0">-->
                        <!--<thead>-->
                        <!--<tr>-->
                        <!--<th style="width: 70%">材料名称</th>&lt;!&ndash;<span-->
                        <!--style="color: #EB3941; width: 70%">*</sapn>&ndash;&gt;-->
                        <!--<th style="width: 15%">-->
                        <!--物质燃烧性质-->
                        <!--<i v-if="!showUpload('3.2')" class="el-icon-camerae"  @click.native="buttonCommonEvent('3.2')"></i>-->
                        <!--<i v-if="showUpload('3.2')" class="el-icon-camera"  @click.native="buttonCommonEvent('3.2')"></i>-->
                        <!--&lt;!&ndash;<i icon="android-camera" size="15"  @click.native="buttonCommonEvent('3.2')"></i>&ndash;&gt;-->
                        <!--</th>-->
                        <!--<th style="width: 15%">物质对水敏感度</th>-->
                        <!--</tr>-->
                        <!--</thead>-->
                        <!--<tbody>-->
                        <!--<tr>-->
                        <!--<td style="width: 60%">-->
                        <!--<el-col span="24">-->
                        <!--<el-form-item label=" " prop="materialName" :label-width="40">-->
                        <!--<el-input type="text" id="materialName" v-model="riskInsInputData.riskReportOccupationList[0].materialName" :disabled=browseFlag></el-input>-->
                        <!--</el-form-item>-->
                        <!--</el-col>-->
                        <!--</td>-->
                        <!--<td style="width: 20%">-->
                        <!--<el-col span="24">-->
                        <!--<el-form-item label=" " prop="ignitionQuality" :label-width="40">-->
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
                        <!--<el-col span="24">-->
                        <!--<el-form-item label=" " prop="waterSensitivity" :label-width="40">-->
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
                      <el-col span="24">
                        <div class="title">
                          <i icon="el-icon-warning"></i>
                          生产特殊风险：
                          <i v-if="!showUpload('3.3')" class="el-icon-camerae"  @click.native="buttonCommonEvent('3.3')"></i>
                          <i v-if="showUpload('3.3')" class="el-icon-camera"  @click.native="buttonCommonEvent('3.3')"></i>
                        </div>
                      </el-col>
                      <el-col span="24">
                        <el-col span="8">
                          <el-form-item label="易燃液体" prop="flaLiquidFlag">
                            <el-select type="text" v-model="riskInsInputData.riskReportOccupationList[0].flaLiquidFlag" placeholder="" :disabled=browseFlag>
                              <el-option value="A">包含</el-option>
                              <el-option value="B">不包含</el-option>
                            </el-select>
                          </el-form-item>
                        </el-col>
                        <el-col span="8">
                          <el-col span="22">
                            <el-form-item label="易燃气体" prop="flaGasFlag">
                              <el-select type="text" v-model="riskInsInputData.riskReportOccupationList[0].flaGasFlag" placeholder="" :disabled=browseFlag>
                                <el-option value="A">包含</el-option>
                                <el-option value="B">不包含</el-option>
                              </el-select>
                            </el-form-item>
                          </el-col>
                        </el-col>
                        <el-col span="8">
                          <el-form-item label="爆炸性粉尘" prop="expDustFlag">
                            <el-select type="text" v-model="riskInsInputData.riskReportOccupationList[0].expDustFlag" placeholder="" :disabled=browseFlag>
                              <el-option value="A">包含</el-option>
                              <el-option value="B">不包含</el-option>
                            </el-select>
                          </el-form-item>
                        </el-col>
                        <!--<table class="mytable" border="0" cellspacing="0" cellpadding="0">-->
                        <!--<thead>-->
                        <!--<tr>-->
                        <!--<th style="width: 10%">-->
                        <!--特殊风险-->
                        <!--<i v-if="!showUpload('3.3')" class="el-icon-camerae"  @click.native="buttonCommonEvent('3.3')"></i>-->
                        <!--<i v-if="showUpload('3.3')" class="el-icon-camera"  @click.native="buttonCommonEvent('3.3')"></i>-->
                        <!--</th>-->
                        <!--<th style="width: 12%">易燃液体</th>-->
                        <!--<th style="width: 13%">易燃气体</th>-->
                        <!--<th style="width: 12%">爆炸性粉尘</th>-->
                        <!--<th style="width: 13%">动火作业</th>-->
                        <!--<th style="width: 15%">无尘车间</th>-->
                        <!--<th style="width: 12%" >电镀工艺</th>-->
                        <!--<th style="width: 13%">高温高压设备</th>-->
                        <!--</tr>-->
                        <!--</thead>-->
                        <!--<tbody>-->
                        <!--<tr>-->
                        <!--<td style="width: 5%">是否包含</td>-->
                        <!--<td style="width: 15%">-->
                        <!--<el-col span="24">-->
                        <!--<el-form-item label=" " prop="flaLiquidFlag" :label-width="40">-->
                        <!--<el-select type="text" v-model="riskInsInputData.riskReportOccupationList[0].flaLiquidFlag":disabled=browseFlag>-->
                        <!--<el-option value="A">是</el-option>-->
                        <!--<el-option value="B">否</el-option>-->
                        <!--</el-select>-->
                        <!--</el-form-item>-->
                        <!--</el-col>-->
                        <!--</td>-->
                        <!--<td style="width: 15%">-->
                        <!--<el-col span="24">-->
                        <!--<el-form-item label=" " prop="flaGasFlag" :label-width="40">-->
                        <!--<el-select type="text" v-model="riskInsInputData.riskReportOccupationList[0].flaGasFlag" :disabled=browseFlag>-->
                        <!--<el-option value="A">是</el-option>-->
                        <!--<el-option value="B">否</el-option>-->
                        <!--</el-select>-->
                        <!--</el-form-item>-->
                        <!--</el-col>-->
                        <!--</td>-->
                        <!--<td style="width: 10%">-->
                        <!--<el-col span="24">-->
                        <!--<el-form-item label=" " prop="expDustFlag" :label-width="40">-->
                        <!--<el-select type="text" v-model="riskInsInputData.riskReportOccupationList[0].expDustFlag" :disabled=browseFlag>-->
                        <!--<el-option value="A">是</el-option>-->
                        <!--<el-option value="B">否</el-option>-->
                        <!--</el-select>-->
                        <!--</el-form-item>-->
                        <!--</el-col>-->
                        <!--</td>-->
                        <!--<td style="width: 15%">-->
                        <!--<el-col span="24">-->
                        <!--<el-form-item label=" " prop="hotWorkFlag" :label-width="40">-->
                        <!--<el-select type="text" v-model="riskInsInputData.riskReportOccupationList[0].hotWorkFlag" :disabled=browseFlag>-->
                        <!--<el-option value="A">是</el-option>-->
                        <!--<el-option value="B">否</el-option>-->
                        <!--</el-select>-->
                        <!--</el-form-item>-->
                        <!--</el-col>-->
                        <!--</td>-->
                        <!--<td style="width: 15%">-->
                        <!--<el-col span="24">-->
                        <!--<el-form-item label=" " prop="cleanRoomFlag" :label-width="40">-->
                        <!--<el-select type="text" v-model="riskInsInputData.riskReportOccupationList[0].cleanRoomFlag" :disabled=browseFlag>-->
                        <!--<el-option value="A">是</el-option>-->
                        <!--<el-option value="B">否</el-option>-->
                        <!--</el-select>-->
                        <!--</el-form-item>-->
                        <!--</el-col>-->
                        <!--</td>-->
                        <!--<td style="width: 20%">-->
                        <!--<el-col span="24">-->
                        <!--<el-form-item label=" " prop="eleProcessFlag" :label-width="40">-->
                        <!--<el-select type="text" v-model="riskInsInputData.riskReportOccupationList[0].eleProcessFlag" :disabled=browseFlag>-->
                        <!--<el-option value="A">是</el-option>-->
                        <!--<el-option value="B">否</el-option>-->
                        <!--</el-select>-->
                        <!--</el-form-item>-->
                        <!--</el-col>-->
                        <!--</td>-->
                        <!--<td style="width: 5%;color:#D8504B;">-->
                        <!--<el-col span="24">-->
                        <!--<el-form-item label=" " prop="highTemPreFlag" :label-width="40">-->
                        <!--<el-select type="text" v-model="riskInsInputData.riskReportOccupationList[0].highTemPreFlag" :disabled=browseFlag>-->
                        <!--<el-option value="A">是</el-option>-->
                        <!--<el-option value="B">否</el-option>-->
                        <!--</el-select>-->
                        <!--</el-form-item>-->
                        <!--</el-col>-->
                        <!--</td>-->
                        <!--</tr>-->
                        <!--</tbody>-->
                        <!--</table>-->
                      </el-col>
                      <el-col span="24">
                        <el-col span="8">
                          <el-form-item label="动火作业" prop="hotWorkFlag">
                            <el-select type="text" v-model="riskInsInputData.riskReportOccupationList[0].hotWorkFlag" placeholder="" :disabled=browseFlag>
                              <el-option value="A">包含</el-option>
                              <el-option value="B">不包含</el-option>
                            </el-select>
                          </el-form-item>
                        </el-col>
                        <el-col span="8">
                          <el-col span="22">
                            <el-form-item label="无尘车间" prop="cleanRoomFlag">
                              <el-select type="text" v-model="riskInsInputData.riskReportOccupationList[0].cleanRoomFlag" placeholder="" :disabled=browseFlag>
                                <el-option value="A">包含</el-option>
                                <el-option value="B">不包含</el-option>
                              </el-select>
                            </el-form-item>
                          </el-col>
                        </el-col>
                        <el-col span="8">
                          <el-form-item label="电镀工艺" prop="eleProcessFlag">
                            <el-select type="text" v-model="riskInsInputData.riskReportOccupationList[0].eleProcessFlag" placeholder="" :disabled=browseFlag>
                              <el-option value="A">包含</el-option>
                              <el-option value="B">不包含</el-option>
                            </el-select>
                          </el-form-item>
                        </el-col>
                      </el-col>

                      <el-col span="24">
                        <el-col span="8">
                          <el-form-item label="高温高压设备" prop="highTemPreFlag">
                            <el-select type="text" v-model="riskInsInputData.riskReportOccupationList[0].highTemPreFlag" placeholder="" :disabled=browseFlag>
                              <el-option value="A">包含</el-option>
                              <el-option value="B">不包含</el-option>
                            </el-select>
                          </el-form-item>
                        </el-col>
                      </el-col>

                      <el-col span="24">
                        <el-col span="8">
                          <el-form-item label="仓储物摆放形式" prop="layingMode">
                            <el-select type="text" v-model="riskInsInputData.riskReportOccupationList[0].layingMode" style="width: 100%" placeholder="" :disabled=browseFlag>
                              <el-option value="A">垛堆</el-option>
                              <el-option value="B">垫板</el-option>
                              <el-option value="C">架存</el-option>
                              <el-option value="D">其他</el-option>
                            </el-select>
                          </el-form-item>
                        </el-col>
                        <el-col span="1" style="padding-left: 2px">
                          <Tooltip placement="bottom">
                            <i icon="el-icon-warning-outlinee"></i>
                            <div slot="content">
                              <p>请用户选择风险最高的一种</p>
                            </div>
                          </Tooltip>
                        </el-col>
                      </el-col>
                    </el-form>
                  </el-tab-pane>
                  <el-tab-pane label="保护措施" class="ios-heart" style="max-height: calc(100vh - 229px);overflow-y: auto;padding: 15px;" name="name5"><!--style="height: 1050px;"-->
                    <el-form ref="riskReportProtectionList" :model="riskInsInputData.riskReportProtectionList[0]" :rules="ruleValidate3" :label-width="140">
                      <el-col span="24">
                        <div class="title">
                          <i icon="el-icon-no-smoking"></i>
                          消防设施：
                        </div>
                      </el-col>
                      <el-col span="24">
                        <el-form-item label="消防器材类型" prop="fireEquipType" :label-width="160">
                          <el-checkbox-group v-model="riskInsInputData.riskReportProtectionList[0].fireEquipType" @on-change="changeFireEquipType">
                            <el-checkbox label="A" :disabled=browseFlag><span>自动报警</span></el-checkbox>
                            <el-checkbox label="B" :disabled=browseFlag><span>自动灭火系统</span></el-checkbox>
                            <el-checkbox label="C" :disabled=browseFlag><span>消防栓</span></el-checkbox>
                            <el-checkbox label="D" :disabled=browseFlag><span>灭火器</span></el-checkbox>
                          </el-checkbox-group>
                        </el-form-item>
                      </el-col>
                      <el-col span="24">
                        <el-col span="8" v-if="riskInsInputData.riskReportProtectionList[0].fireEquipType.indexOf('A') !==-1">
                          <el-col span="22">
                            <el-form-item label="火灾报警系统类型" prop="alarmType" :label-width="160">
                              <el-select v-model="riskInsInputData.riskReportProtectionList[0].alarmType" placeholder="" :disabled=browseFlag>
                                <el-option value="A">火灾手动警钟</el-option>
                                <el-option value="B">火灾自动报警系统</el-option>
                                <el-option value="C">无</el-option>
                              </el-select>
                            </el-form-item>
                          </el-col>
                          <el-col span="1">
                            <i v-if="!showUpload('4.1.3')" class="el-icon-camerae"  @click.native="buttonCommonEvent('4.1.3')"></i>
                            <i v-if="showUpload('4.1.3')" class="el-icon-camera"  @click.native="buttonCommonEvent('4.1.3')"></i>
                            <!--<i icon="android-camera" size="15"  @click.native="buttonCommonEvent('4.1.3')"></i>-->
                          </el-col>
                        </el-col>
                        <el-col span="8" v-if="riskInsInputData.riskReportProtectionList[0].fireEquipType.indexOf('D') !==-1">
                          <el-col span="22">
                            <el-form-item label="灭火器布置区域" :label-width="150" prop="extinguisherArea">
                              <el-select v-model="riskInsInputData.riskReportProtectionList[0].extinguisherArea" placeholder="" :disabled=browseFlag>
                                <el-option value="A">全部覆盖</el-option>
                                <el-option value="B">主要区域覆盖</el-option>
                                <el-option value="C">较少覆盖</el-option>
                                <el-option value="D">无</el-option>
                              </el-select>
                            </el-form-item>
                          </el-col>
                          <el-col span="1">
                            <i v-if="!showUpload('4.1.1.1')" class="el-icon-camerae"  @click.native="buttonCommonEvent('4.1.1.1')"></i>
                            <i v-if="showUpload('4.1.1.1')" class="el-icon-camera"  @click.native="buttonCommonEvent('4.1.1.1')"></i>
                            <!--<i icon="android-camera" size="15"  @click.native="buttonCommonEvent('4.1.1.1')"></i>-->
                          </el-col>
                        </el-col>
                      </el-col>
                      <el-col span="24">
                        <el-col span="8" v-if="riskInsInputData.riskReportProtectionList[0].fireEquipType.indexOf('C') !==-1">
                          <el-col span="22">
                            <el-form-item label="室内消防栓布置区域" :label-width="160" prop="insHydrantArea">
                              <el-select v-model="riskInsInputData.riskReportProtectionList[0].insHydrantArea" placeholder="" :disabled=browseFlag>
                                <el-option value="A">全部覆盖</el-option>
                                <el-option value="B">主要区域覆盖</el-option>
                                <el-option value="C">较少覆盖</el-option>
                                <el-option value="D">无</el-option>
                              </el-select>
                            </el-form-item>
                          </el-col>
                          <el-col span="1">
                            <i v-if="!showUpload('4.1.1.2')" class="el-icon-camerae"  @click.native="buttonCommonEvent('4.1.1.2')"></i>
                            <i v-if="showUpload('4.1.1.2')" class="el-icon-camera"  @click.native="buttonCommonEvent('4.1.1.2')"></i>
                            <!--<i icon="android-camera" size="15"  @click.native="buttonCommonEvent('4.1.1.2')"></i>-->
                          </el-col>
                        </el-col>
                        <el-col span="8" v-if="riskInsInputData.riskReportProtectionList[0].fireEquipType.indexOf('C') !==-1">
                          <el-col span="22">
                            <el-form-item label="室外消防栓布置区域" prop="outHydrantArea" :label-width="150">
                              <el-select v-model="riskInsInputData.riskReportProtectionList[0].outHydrantArea" placeholder="" :disabled=browseFlag>
                                <el-option value="A">全部覆盖</el-option>
                                <el-option value="B">主要区域覆盖</el-option>
                                <el-option value="C">较少覆盖</el-option>
                                <el-option value="D">无</el-option>
                              </el-select>
                            </el-form-item>
                          </el-col>
                        </el-col>
                      </el-col>
                      <el-col span="24" style="margin-bottom: 5px">
                        <el-col span="16" v-if="riskInsInputData.riskReportProtectionList[0].fireEquipType.indexOf('B') !==-1">
                          <!--<el-col span="22">-->
                          <el-form-item label="自动灭火系统覆盖区域" :label-width="160" prop="selfExtArea">
                            <el-checkbox-group v-model="riskInsInputData.riskReportProtectionList[0].selfExtArea" style="width: auto;">
                              <el-checkbox label="A" :disabled=browseFlag><span>生产区</span></el-checkbox>
                              <el-checkbox label="B" :disabled=browseFlag><span>仓储区</span></el-checkbox>
                              <el-checkbox label="C" :disabled=browseFlag><span>办公区</span></el-checkbox>
                              <el-checkbox label="D" :disabled=browseFlag><span>生活区</span></el-checkbox>
                              <div style="display: inline-block;">
                                <i v-if="!showUpload('4.1.4.2')" style="margin: 0;vertical-align: middle;" class="el-icon-camerae"  @click.native="buttonCommonEvent('4.1.4.2')"></i>
                                <i v-if="showUpload('4.1.4.2')" style="margin: 0;vertical-align: middle;" class="el-icon-camera"  @click.native="buttonCommonEvent('4.1.4.2')"></i>
                              </div>
                            </el-checkbox-group>
                          </el-form-item>
                          <!--</el-col>-->
                          <!--<el-col span="1" style="margin-top:7px; margin-left:-220px">-->
                          <!--<i v-if="!showUpload('4.1.4.2')" class="el-icon-camerae"  @click.native="buttonCommonEvent('4.1.4.2')"></i>-->
                          <!--<i v-if="showUpload('4.1.4.2')" class="el-icon-camera"  @click.native="buttonCommonEvent('4.1.4.2')"></i>-->
                          <!--&lt;!&ndash;<i icon="android-camera" size="15"  @click.native="buttonCommonEvent('4.1.4.2')"></i>&ndash;&gt;-->
                          <!--</el-col>-->
                        </el-col>
                        <el-col span="8" v-if="riskInsInputData.riskReportProtectionList[0].fireEquipType.indexOf('B') !==-1">
                          <el-col span="21">
                            <el-form-item label="自动灭火系统覆盖情况" :label-width="180" prop="selfExtCase">
                              <el-select v-model="riskInsInputData.riskReportProtectionList[0].selfExtCase" placeholder="" :disabled=browseFlag>
                                <el-option value="A">全部覆盖</el-option>
                                <el-option value="B">部分覆盖</el-option>
                                <el-option value="C">无</el-option>
                              </el-select>
                            </el-form-item>
                          </el-col>
                          <el-col span="1" style="padding-left: 10px">
                            <i v-if="!showUpload('4.1.4.1')" class="el-icon-camerae"  @click.native="buttonCommonEvent('4.1.4.1')"></i>
                            <i v-if="showUpload('4.1.4.1')" class="el-icon-camera"  @click.native="buttonCommonEvent('4.1.4.1')"></i>
                            <!--<i icon="android-camera" size="15"  @click.native="buttonCommonEvent('4.1.4.1')"></i>-->
                          </el-col>
                        </el-col>
                      </el-col>
                      <el-col span="24" v-if="riskInsInputData.riskReportProtectionList[0].fireEquipType !=''">
                        <el-col span="23">
                          <el-form-item label="通往消防器材通道情况" :label-width="160" prop="equipmentChannel">
                            <el-select v-model="riskInsInputData.riskReportProtectionList[0].equipmentChannel" placeholder="" :disabled=browseFlag>
                              <el-option value="A">畅通无阻</el-option>
                              <el-option value="B">部分畅通</el-option>
                              <el-option value="C">完全被阻挡</el-option>
                            </el-select>
                          </el-form-item>
                        </el-col>
                        <el-col span="1" style="padding-left: 10px">
                          <i v-if="!showUpload('4.1.2')" class="el-icon-camerae"  @click.native="buttonCommonEvent('4.1.2')"></i>
                          <i v-if="showUpload('4.1.2')" class="el-icon-camera"  @click.native="buttonCommonEvent('4.1.2')"></i>
                          <!--<i icon="android-camera" size="15"  @click.native="buttonCommonEvent('4.1.2')"></i>-->
                        </el-col>
                      </el-col>
                      <el-col span="24">
                        <div class="title">
                          <i icon="ios-flame-outline"></i>
                          消防安全管理：
                        </div>
                      </el-col>
                      <el-col span="24">
                        <el-col span="8">
                          <el-col span="22">
                            <el-form-item label="消防安全管理人员" prop="firePrePeople" :label-width="160">
                              <el-select type="text" v-model="riskInsInputData.riskReportProtectionList[0].firePrePeople" placeholder="" :disabled=browseFlag>
                                <el-option value="A">有专职安全管理人员</el-option>
                                <el-option value="B">有兼职安全管理人员</el-option>
                                <el-option value="C">无专兼职安全管理人员</el-option>
                              </el-select>
                            </el-form-item>
                          </el-col>
                        </el-col>
                        <el-col span="8">
                          <el-col span="22">
                            <el-form-item label="动火作业管理制度" prop="hotWorkSystem" :label-width="160">
                              <el-select v-model="riskInsInputData.riskReportProtectionList[0].hotWorkSystem" placeholder="" :disabled=browseFlag>
                                <el-option value="A">有审批制度</el-option>
                                <el-option value="B">无审批制度</el-option>
                              </el-select>
                            </el-form-item>
                          </el-col>
                          <el-col span="1">
                            <i v-if="!showUpload('4.2.2')" class="el-icon-camerae"  @click.native="buttonCommonEvent('4.2.2')"></i>
                            <i v-if="showUpload('4.2.2')" class="el-icon-camera"  @click.native="buttonCommonEvent('4.2.2')"></i>
                            <!--<i icon="android-camera" size="15"  @click.native="buttonCommonEvent('4.2.2')"></i>-->
                          </el-col>
                        </el-col>
                        <el-col span="8">
                          <el-col span="21">
                            <el-form-item label="吸烟管理" prop="smokingControl">
                              <el-select type="text" v-model="riskInsInputData.riskReportProtectionList[0].smokingControl" placeholder="" :disabled=browseFlag>
                                <el-option value="A">全部区域禁烟，执行良好</el-option>
                                <el-option value="B">全部区域禁烟，执行不足</el-option>
                                <el-option value="C">指定吸烟区域，执行良好</el-option>
                                <el-option value="D">指定吸烟区域，执行不足</el-option>
                                <el-option value="E">无吸烟管制</el-option>
                              </el-select>
                            </el-form-item>
                          </el-col>
                          <el-col span="1" style="padding-left: 10px">
                            <i v-if="!showUpload('4.2.3')" class="el-icon-camerae"  @click.native="buttonCommonEvent('4.2.3')"></i>
                            <i v-if="showUpload('4.2.3')" class="el-icon-camera"  @click.native="buttonCommonEvent('4.2.3')"></i>
                            <!--<i icon="android-camera" size="15"  @click.native="buttonCommonEvent('4.2.3')"></i>-->
                          </el-col>
                        </el-col>
                      </el-col>
                      <el-col span="24">
                        <el-col span="8">
                          <el-col span="22">
                            <el-form-item label="消防应急预案" prop="firePlan" :label-width="160">
                              <el-select type="text" v-model="riskInsInputData.riskReportProtectionList[0].firePlan" placeholder="" :disabled=browseFlag>
                                <el-option value="A">有</el-option>
                                <el-option value="B">无</el-option>
                              </el-select>
                            </el-form-item>
                          </el-col>
                          <el-col span="1">
                            <i v-if="!showUpload('4.2.4')" class="el-icon-camerae"  @click.native="buttonCommonEvent('4.2.4')"></i>
                            <i v-if="showUpload('4.2.4')" class="el-icon-camera"  @click.native="buttonCommonEvent('4.2.4')"></i>
                            <!--<i icon="android-camera" size="15"  @click.native="buttonCommonEvent('4.2.4')"></i>-->
                          </el-col>
                        </el-col>
                        <el-col span="8">
                          <el-col span="22">
                            <el-form-item label="消防设施维护检查频率" :label-width="160" prop="checkFrequency">
                              <el-select v-model="riskInsInputData.riskReportProtectionList[0].checkFrequency" placeholder="" :disabled=browseFlag>
                                <el-option value="A">每月一次</el-option>
                                <el-option value="B">每季一次</el-option>
                                <el-option value="C">每年一次</el-option>
                                <el-option value="D">无检查</el-option>
                              </el-select>
                            </el-form-item>
                          </el-col>
                          <el-col span="1">
                            <i v-if="!showUpload('4.2.5')" class="el-icon-camerae"  @click.native="buttonCommonEvent('4.2.5')"></i>
                            <i v-if="showUpload('4.2.5')" class="el-icon-camera"  @click.native="buttonCommonEvent('4.2.5')"></i>
                            <!--<i icon="android-camera" size="15"  @click.native="buttonCommonEvent('4.2.5')"></i>-->
                          </el-col>
                        </el-col>
                      </el-col>
                      <el-col span="24">
                        <el-col span="8">
                          <el-col span="22">
                            <el-form-item label="是否有安保巡逻" prop="patrolFlag" :label-width="160" style="height: 50px">
                              <el-select v-model="riskInsInputData.riskReportProtectionList[0].patrolFlag" placeholder="" :disabled=browseFlag @on-change="changePatrolFlag">
                                <el-option value="A">有</el-option>
                                <el-option value="B">无</el-option>
                              </el-select>
                            </el-form-item>
                          </el-col>
                        </el-col>
                        <el-col span="8" v-if="riskInsInputData.riskReportProtectionList[0].patrolFlag === 'A'">
                          <el-col span="22">
                            <el-form-item label="巡逻区域" prop="patrolArea" :label-width="160">
                              <el-select type="text" v-model="riskInsInputData.riskReportProtectionList[0].patrolArea" placeholder="" :disabled=browseFlag>
                                <el-option value="A">全部区域</el-option>
                                <el-option value="B">部分区域</el-option>
                              </el-select>
                            </el-form-item>
                          </el-col>
                          <el-col span="1">
                            <i v-if="!showUpload('4.2.6')" class="el-icon-camerae"  @click.native="buttonCommonEvent('4.2.6')"></i>
                            <i v-if="showUpload('4.2.6')" class="el-icon-camera"  @click.native="buttonCommonEvent('4.2.6')"></i>
                            <!--<i icon="android-camera" size="15"  @click.native="buttonCommonEvent('4.2.6')"></i>-->
                          </el-col>
                        </el-col>
                        <el-col span="8" v-if="riskInsInputData.riskReportProtectionList[0].patrolFlag === 'A'">
                          <el-col span="21">
                            <el-form-item label="巡逻频次" prop="patrolFrequency" class="el-select-unit">
                              <el-select type="text" v-model="riskInsInputData.riskReportProtectionList[0].patrolFrequency" placeholder="" :disabled=browseFlag>
                                <el-option value="A">1</el-option>
                                <el-option value="B">2</el-option>
                                <el-option value="C">3</el-option>
                                <el-option value="D">4</el-option>
                              </el-select>
                              <div class="unit">
                                <span>h/次</span>
                              </div>
                            </el-form-item>
                          </el-col>
                        </el-col>
                      </el-col>
                      <el-col span="24">
                        <div class="title">
                          <i icon="waterdrop"></i>
                          防水灾设施：
                        </div>
                      </el-col>
                      <el-col span="24">
                        <el-col span="24">
                          <el-col span="22">
                            <el-form-item label="企业防水灾设施" prop="waterFacility" :label-width="160" >
                              <el-checkbox-group v-model="riskInsInputData.riskReportProtectionList[0].waterFacility" @on-change="changeWaterFacility" style="width: auto;">
                                <el-checkbox label="A" :disabled=browseFlag><span>防洪墙</span></el-checkbox>
                                <el-checkbox label="B" :disabled=browseFlag><span>挡水板</span></el-checkbox>
                                <el-checkbox label="C" :disabled=browseFlag><span>沙袋</span></el-checkbox>
                                <el-checkbox label="D" :disabled=browseFlag><span>水泵</span></el-checkbox>
                                <el-checkbox label="E" :disabled=browseFlag><span>其他</span></el-checkbox>
                                <div style="display: inline-block;">
                                  <i v-if="!showUpload('4.3.1')" style="margin: 0;vertical-align: middle;" class="el-icon-camerae"  @click.native="buttonCommonEvent('4.3.1')"></i>
                                  <i v-if="showUpload('4.3.1')"  style="margin: 0;vertical-align: middle;" class="el-icon-camera"  @click.native="buttonCommonEvent('4.3.1')"></i>
                                </div>
                              </el-checkbox-group>
                            </el-form-item>
                          </el-col>
                          <!--<el-col span="1" style="margin-top:7px; margin-left:-514px">-->
                          <!--<i v-if="!showUpload('4.3.1')" class="el-icon-camerae"  @click.native="buttonCommonEvent('4.3.1')"></i>-->
                          <!--<i v-if="showUpload('4.3.1')" class="el-icon-camera"  @click.native="buttonCommonEvent('4.3.1')"></i>-->
                          <!--&lt;!&ndash;<i icon="android-camera" size="15"  @click.native="buttonCommonEvent('4.3.1')"></i>&ndash;&gt;-->
                          <!--</el-col>-->
                        </el-col>
                      </el-col>
                      <el-col span="24">
                        <el-col span="23" v-if="riskInsInputData.riskReportProtectionList[0].waterFacility.indexOf('E') !== -1 ">
                          <el-form-item label="防水灾设施补充说明" prop="addWaterFacility" :label-width="160">
                            <el-input type="textarea" v-model="riskInsInputData.riskReportProtectionList[0].addWaterFacility" :disabled=browseFlag></el-input>
                          </el-form-item>
                        </el-col>
                      </el-col>
                      <el-col span="24">
                        <el-col span="8">
                          <el-col span="22">
                            <el-form-item label="排水系统是否有堵塞现象" prop="drainageBlock" :label-width="160" :selfIcon="'android-camera'">
                              <el-select type="text" v-model="riskInsInputData.riskReportProtectionList[0].drainageBlock" placeholder="" :disabled=browseFlag>
                                <el-option value="A">是</el-option>
                                <el-option value="B">否</el-option>
                              </el-select>
                            </el-form-item>
                          </el-col>
                          <el-col span="1">
                            <i v-if="!showUpload('4.3.2')" class="el-icon-camerae"  @click.native="buttonCommonEvent('4.3.2')"></i>
                            <i v-if="showUpload('4.3.2')" class="el-icon-camera"  @click.native="buttonCommonEvent('4.3.2')"></i>
                            <!--<i icon="android-camera" size="15"  @click.native="buttonCommonEvent('4.3.2')"></i>-->
                          </el-col>
                        </el-col>
                      </el-col>
                    </el-form>
                  </el-tab-pane>
                  <el-tab-pane label="地理及自然环境" class="earth" style="max-height: calc(100vh - 229px);overflow-y: auto;padding: 15px;" name="name6">
                    <el-form ref="riskReportEnvironmentList" :model="riskInsInputData.riskReportEnvironmentList[0]" :rules="ruleValidate4" :label-width="140">
                      <el-col span="24">
                        <el-col span="8">
                          <el-col span="22">
                            <el-form-item label="标的周围环境" prop="itemEnvironment">
                              <el-select type="text" v-model="riskInsInputData.riskReportEnvironmentList[0].itemEnvironment" placeholder="" :disabled=browseFlag>
                                <el-option value="A">沿江、沿河、沿湖</el-option>
                                <el-option value="B">沿海</el-option>
                                <el-option value="C">靠山</el-option>
                                <el-option value="D">无</el-option>
                              </el-select>
                            </el-form-item>
                          </el-col>
                          <el-col span="1">
                            <i v-if="!showUpload('5.1')" class="el-icon-camerae"  @click.native="buttonCommonEvent('5.1')"></i>
                            <i v-if="showUpload('5.1')" class="el-icon-camera"  @click.native="buttonCommonEvent('5.1')"></i>
                            <!--<i icon="android-camera" size="15"  @click.native="buttonCommonEvent('5.1')"></i>-->
                          </el-col>
                        </el-col>
                        <el-col span="8">
                          <el-form-item label="周围道路或建筑物地势相比" :label-width="220" prop="comparedTerrain" style="height: 50px">
                            <el-select type="text" v-model="riskInsInputData.riskReportEnvironmentList[0].comparedTerrain" placeholder="" :disabled=browseFlag>
                              <el-option value="A">地势相对较高</el-option>
                              <el-option value="B">地势基本持平</el-option>
                              <el-option value="C">地势相对较低</el-option>
                            </el-select>
                          </el-form-item>
                        </el-col>
                        <el-col span="1">
                          <i v-if="!showUpload('5.1.4')" class="el-icon-camerae"  @click.native="buttonCommonEvent('5.1.4')"></i> <!--class="cameraicon"-->
                          <i v-if="showUpload('5.1.4')" class="el-icon-camera"  @click.native="buttonCommonEvent('5.1.4')"></i>
                          <!--<i icon="android-camera" size="15"  @click.native="buttonCommonEvent('5.1.4')"></i>-->
                        </el-col>
                      </el-col>
                      <el-col span="24">
                        <el-form-item label="标的周围环境补充" prop="addEnvironment">
                          <el-input type="textarea" v-model="riskInsInputData.riskReportEnvironmentList[0].addEnvironment" :disabled=browseFlag></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col span="24">
                        <div class="title">
                          <i icon="earth"></i>
                          地理及自然环境：
                        </div>
                      </el-col>
                      <el-col span="24">
                        <el-col span="8">
                          <el-form-item label="区域年平均降雨量" prop="aveRainfal">
                            <el-input v-model="riskInsInputData.riskReportEnvironmentList[0].aveRainfal" disabled>
                              <span slot="append">mm</span>
                            </el-input>
                          </el-form-item>
                        </el-col>
                        <el-col span="8">
                          <el-form-item label="历史是否发生过积水" prop="havePonding" :label-width="220">
                            <el-select type="text" v-model="riskInsInputData.riskReportEnvironmentList[0].havePonding" placeholder="" disabled>
                              <el-option value="1">有</el-option>
                              <el-option value="0">无</el-option>
                            </el-select>
                          </el-form-item>
                        </el-col>
                        <el-col span="8" v-if="riskInsInputData.riskReportEnvironmentList[0].havePonding === '1'">
                          <el-form-item label="最高积水水位" prop="ponding">
                            <el-input type="text" v-model="riskInsInputData.riskReportEnvironmentList[0].ponding" disabled>
                              <span slot="append">mm</span>
                            </el-input>
                          </el-form-item>
                        </el-col>
                      </el-col>
                      <el-col span="24">
                        <el-col span="8">
                          <el-form-item label="区域降雪量暴雪记录" prop="haveBlizzard">
                            <el-select v-model="riskInsInputData.riskReportEnvironmentList[0].haveBlizzard" placeholder="" disabled>
                              <el-option value="1">近1年有</el-option>
                              <el-option value="2">近10年有</el-option>
                              <el-option value="3">近20年有</el-option>
                              <el-option value="4">近50年有</el-option>
                              <el-option value="0">无</el-option>
                            </el-select>
                          </el-form-item>
                        </el-col>
                        <el-col span="8">
                          <el-form-item label="热带气旋影响程度" prop="haveCyclone" :label-width="220">
                            <el-select type="text" v-model="riskInsInputData.riskReportEnvironmentList[0].haveCyclone" placeholder="" disabled>
                              <el-option value="0">所在区域无影响</el-option>
                              <el-option value="1">所在区域影响较小</el-option>
                              <el-option value="2">所在区域影响一般</el-option>
                              <el-option value="3">所在区域影响较大</el-option>
                            </el-select>
                          </el-form-item>
                        </el-col>
                        <el-col span="8" v-if="riskInsInputData.riskReportEnvironmentList[0].haveCyclone !== '' && riskInsInputData.riskReportEnvironmentList[0].haveCyclone !== '0'">
                          <el-form-item label="热带气旋影响月份" prop="cycloneMonth">
                            <el-input type="text" v-model="riskInsInputData.riskReportEnvironmentList[0].cycloneMonth" disabled></el-input>
                          </el-form-item>
                        </el-col>
                      </el-col>
                      <el-col span="24">
                        <table  border="0" cellspacing="0" cellpadding="0"><!-- class="mytable"  class="table  table-bordered table-hover"-->
                          <thead>
                            <tr>
                              <th colspan="2" >历年情况</th>
                              <th>个数</th>
                              <th>最大等级</th>
                            </tr>
                          </thead>
                          <tbody disabled>
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
                      <el-col span="24">
                        <el-col span="8">
                          <el-form-item label="是否位于地震带上" prop="haveEarthquake" :label-width="120">
                            <el-select v-model="riskInsInputData.riskReportEnvironmentList[0].haveEarthquake" placeholder="" disabled>
                              <el-option value="1">是</el-option>
                              <el-option value="0">否</el-option>
                            </el-select>
                          </el-form-item>
                        </el-col>
                        <el-col span="8">
                          <el-form-item label="所在地区地震最高烈度" prop="earthquakeHis" :label-width="220">
                            <el-select type="text" v-model="riskInsInputData.riskReportEnvironmentList[0].earthquakeHis" placeholder="" disabled>
                              <el-option value="1">5度及以下</el-option>
                              <el-option value="2">6度</el-option>
                              <el-option value="3">7度</el-option>
                              <el-option value="4">8度及以上</el-option>
                            </el-select>
                          </el-form-item>
                        </el-col>
                        <el-col span="8">
                          <el-form-item label="近十年地震损失次数" prop="earthquakeNum">
                            <el-select type="text" v-model="riskInsInputData.riskReportEnvironmentList[0].earthquakeNum" placeholder="" disabled>
                              <el-option value="0">无</el-option>
                              <el-option value="1">1-5次</el-option>
                              <el-option value="2">5-10次</el-option>
                              <el-option value="3">10次以上</el-option>
                            </el-select>
                          </el-form-item>
                        </el-col>
                      </el-col>
                      <el-col span="24">
                        <el-col span="8">
                          <el-form-item label="所在地属于" prop="haveThunder" :labelWidth="120"><!--style="width: 100%"-->
                            <el-select v-model="riskInsInputData.riskReportEnvironmentList[0].haveThunder" placeholder="" disabled>
                              <el-option value="1">少雷区(年平均雷暴数≤20天)</el-option>
                              <el-option value="2">多雷区(20天＜年平均雷暴数≤40天)</el-option>
                              <el-option value="3">高雷区(40天＜年平均雷暴数≤60天)</el-option>
                              <el-option value="4">强雷区(年平均雷暴数>60天)</el-option>
                            </el-select>
                          </el-form-item>
                        </el-col>
                        <!--<el-form :label-width="230">-->
                        <el-col span="8">
                          <el-form-item label="是否处于泥石流、滑坡、崩塌多发区" :label-width="220" prop="haveCollapse">
                            <el-select type="text" v-model="riskInsInputData.riskReportEnvironmentList[0].haveCollapse" placeholder="" disabled>
                              <el-option value="1">是</el-option>
                              <el-option value="0">否</el-option>
                            </el-select>
                          </el-form-item>
                        </el-col>
                        <!--</el-form>-->
                      </el-col>
                    </el-form>
                  </el-tab-pane>
                  <el-tab-pane label="扩展责任信息" class="cloud" style="max-height: calc(100vh - 229px);overflow-y: auto;padding: 15px;" name="name7">
                    <el-col span="24">
                      <el-col span="24">
                        <el-form-item label="投保附加险情况" prop="addRisk" :label-width="160">
                          <el-checkbox-group v-model="riskInsInputData.riskReportMainVo.addRisk" :disabled=browseFlag @on-change="changeAddRisk">
                            <el-checkbox label="A" :disabled=browseFlag><span>扩展盗窃、抢劫责任</span></el-checkbox>
                            <el-checkbox label="C" :disabled=browseFlag><span>扩展露天堆放责任</span></el-checkbox>
                          </el-checkbox-group>
                        </el-form-item>
                      </el-col>
                    </el-col>
                    <el-form ref="riskReportTheftList" :model="riskInsInputData.riskReportTheftList[0]" :rules="ruleValidate5" :label-width="140">
                      <!--{{riskInsInputData.riskReportMainVo.addRisk+'111'}}-->
                      <div v-if="riskInsInputData.riskReportMainVo.addRisk.indexOf('A') !==-1">
                        <el-col span="24">
                          <div class="title">
                            <i icon="heart-broken"></i>
                            扩展盗窃、抢劫责任：
                          </div>
                        </el-col>
                        <el-col span="24">
                          <el-col span="8">
                            <el-col span="22">
                              <el-form-item label="被保物吸引力" prop="insuredAttraction" :label-width="160">
                                <el-select v-model="riskInsInputData.riskReportTheftList[0].insuredAttraction" placeholder="" :disabled=browseFlag>
                                  <el-option value="A">低</el-option>
                                  <el-option value="B">中</el-option>
                                  <el-option value="C">高</el-option>
                                </el-select>
                              </el-form-item>
                            </el-col>
                          </el-col>
                          <el-col span="8">
                            <el-col span="22">
                              <el-form-item label="是否有被盗抢记录" prop="theftHistoryFlag" :label-width="160">
                                <el-select type="text" v-model="riskInsInputData.riskReportTheftList[0].theftHistoryFlag" placeholder="" :disabled=browseFlag>
                                  <el-option value="A">是</el-option>
                                  <el-option value="B">否</el-option>
                                </el-select>
                              </el-form-item>
                            </el-col>
                          </el-col>
                        </el-col>
                        <el-col span="24">
                          <el-col span="8">
                            <el-col span="22">
                              <el-form-item label="保安警卫人数" prop="securityNumber" :label-width="160">
                                <el-select v-model="riskInsInputData.riskReportTheftList[0].securityNumber" placeholder="" :disabled=browseFlag>
                                  <el-option value="A">0人</el-option>
                                  <el-option value="B">1-5人</el-option>
                                  <el-option value="C">6-19人</el-option>
                                  <el-option value="D">20人以上</el-option>
                                </el-select>
                              </el-form-item>
                            </el-col>
                          </el-col>
                          <el-col span="8">
                            <el-col span="22">
                              <el-form-item label="所在区域社会治安情况" :label-width="160" prop="publicSecurity">
                                <el-select type="text" v-model="riskInsInputData.riskReportTheftList[0].publicSecurity" placeholder="" :disabled=browseFlag>
                                  <el-option value="A">好</el-option>
                                  <el-option value="B">一般</el-option>
                                  <el-option value="C">差</el-option>
                                </el-select>
                              </el-form-item>
                            </el-col>
                          </el-col>
                          <el-col span="8">
                            <el-col span="22">
                              <el-form-item label="是否定时巡逻" prop="timingPatrol" :label-width="160">
                                <el-select type="text" v-model="riskInsInputData.riskReportTheftList[0].timingPatrol" placeholder="" :disabled=browseFlag>
                                  <el-option value="A">是，且有巡逻记录</el-option>
                                  <el-option value="B">是，但没有巡逻记录</el-option>
                                  <el-option value="C">否</el-option>
                                </el-select>
                              </el-form-item>
                            </el-col>
                            <el-col span="1">
                              <i v-if="!showUpload('6.1.5')" class="el-icon-camerae"  @click.native="buttonCommonEvent('6.1.5')"></i>
                              <i v-if="showUpload('6.1.5')" class="el-icon-camera"  @click.native="buttonCommonEvent('6.1.5')"></i>
                              <!--<i icon="android-camera" size="15"  @click.native="buttonCommonEvent('6.1.5')"></i>-->
                            </el-col>
                          </el-col>
                        </el-col>
                        <el-col span="24">
                          <el-col span="8">
                            <el-col span="22">
                              <el-form-item label="是否有技术防盗设施" :label-width="160" prop="antiTheftFlag">
                                <el-select v-model="riskInsInputData.riskReportTheftList[0].antiTheftFlag" placeholder="" :disabled=browseFlag @on-change="changeAntiTheftFlag">
                                  <el-option value="A">有</el-option>
                                  <el-option value="B">无</el-option>
                                </el-select>
                              </el-form-item>
                            </el-col>
                            <el-col span="1">
                              <i v-if="!showUpload('6.1.2')" class="el-icon-camerae"  @click.native="buttonCommonEvent('6.1.2')"></i>
                              <i v-if="showUpload('6.1.2')" class="el-icon-camera"  @click.native="buttonCommonEvent('6.1.2')"></i>
                              <!--<i icon="android-camera" size="15"  @click.native="buttonCommonEvent('6.1.2')"></i>-->
                            </el-col>
                          </el-col>
                          <el-col span="8" v-if="riskInsInputData.riskReportTheftList[0].antiTheftFlag === 'A'">
                            <el-col span="22">
                              <el-form-item label="物理防盗设施类型" prop="antiTheftType" :label-width="160">
                                <el-input type="text" v-model="riskInsInputData.riskReportTheftList[0].antiTheftType" :disabled=browseFlag></el-input>
                              </el-form-item>
                            </el-col>
                          </el-col>
                          <el-col span="8">
                            <el-col span="22">
                              <el-form-item label="是否与公安机关联网" :label-width="160" prop="netPoliceFlag">
                                <el-select v-model="riskInsInputData.riskReportTheftList[0].netPoliceFlag" placeholder="" :disabled=browseFlag>
                                  <el-option value="A">是</el-option>
                                  <el-option value="B">否</el-option>
                                </el-select>
                              </el-form-item>
                            </el-col>
                            <el-col span="1">
                              <i v-if="!showUpload('6.1.3')" class="el-icon-camerae"  @click.native="buttonCommonEvent('6.1.3')"></i>
                              <i v-if="showUpload('6.1.3')" class="el-icon-camera"  @click.native="buttonCommonEvent('6.1.3')"></i>
                              <!--<i icon="android-camera" size="15"  @click.native="buttonCommonEvent('6.1.3')"></i>-->
                            </el-col>
                          </el-col>
                        </el-col>
                      </div>
                    </el-form>
                    <el-form ref="riskReportAirStorageList" :model="riskInsInputData.riskReportAirStorageList[0]" :rules="ruleValidate6" :label-width="140">
                      <div v-if="riskInsInputData.riskReportMainVo.addRisk.indexOf('C') !==-1">
                        <el-col span="24">
                          <div class="title">
                            <i icon="battery-empty"></i>
                            扩展露天堆放责任：
                          </div>
                        </el-col>
                        <el-col span="24">
                          <el-col span="8">
                            <el-col span="22">
                              <el-form-item label="是否存在露天堆放财产" :label-width="160" prop="airStorageFlag">
                                <el-select v-model="riskInsInputData.riskReportAirStorageList[0].airStorageFlag" placeholder="" @on-change="changeAddRisk" :disabled=browseFlag>
                                  <el-option value="A">有</el-option>
                                  <el-option value="B">无</el-option>
                                </el-select>
                              </el-form-item>
                            </el-col>
                          </el-col>
                          <el-col span="8" v-if="riskInsInputData.riskReportAirStorageList[0].airStorageFlag =='A'">
                            <el-col span="22">
                              <el-form-item label="是否有防护措施" prop="protectionFlag" :label-width="160">
                                <el-select type="text" v-model="riskInsInputData.riskReportAirStorageList[0].protectionFlag" placeholder="" @on-change="changeAddRisk" :disabled=browseFlag>
                                  <el-option value="A">有</el-option>
                                  <el-option value="B">无</el-option>
                                </el-select>
                              </el-form-item>
                            </el-col>
                          </el-col>
                        </el-col>
                      </div>
                      <el-col span="24" v-if="riskInsInputData.riskReportAirStorageList[0].airStorageFlag =='A'">
                        <el-form-item label="主要堆放物" prop="storageGoods" :label-width="160">
                          <el-input type="textarea" v-model="riskInsInputData.riskReportAirStorageList[0].storageGoods"  style="width: 100%" :disabled=browseFlag></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col span="24" v-if="riskInsInputData.riskReportAirStorageList[0].protectionFlag =='A'">
                        <el-form-item label="防护措施说明" prop="addProtection" :label-width="160">
                          <el-input type="textarea" v-model="riskInsInputData.riskReportAirStorageList[0].addProtection"  style="width: 100%" :disabled=browseFlag></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col span="24">
                        <el-form-item label="其他补充说明" prop="addMessage" :label-width="160">
                          <el-input type="textarea" v-model="riskInsInputData.riskReportMainVo.addMessage"  style="width: 100%" :disabled=browseFlag></el-input>
                        </el-form-item>
                      </el-col>
                    </el-form>
                  </el-tab-pane>
                  <el-tab-pane label="综合风险反馈" class="image" style="max-height: calc(100vh - 229px);overflow-y: auto;padding: 15px;" name="name8">
                    <!--<div v-show="riskInsInputData.riskReportMainVo.underwriteFlag === '1'">-->
                    <!--<el-col span="24">-->
                    <!--<div class="title">-->
                    <!--<i icon="android-el-checkbox-outline"></i>-->
                    <!--风险防范评分反馈：（<span style="color: #cb2025">提示：分数越高表示对应风险越低</span>）-->
                    <!--</div>-->
                    <!--</el-col>-->
                    <!--<el-col span="12">-->
                    <!--<div id="myChart" style="width:330px;height: 300px;marginLeft: 170px;marginTop: 50px"></div>-->
                    <!--</el-col>-->
                    <!--&lt;!&ndash;<el-col span="12" v-show="postListFlag">&ndash;&gt;-->
                    <!--&lt;!&ndash;<div id="myChart2" :style="{width: '320px', height: '300px', marginLeft:'170px', marginTop: '50px'}"></div>&ndash;&gt;-->
                    <!--&lt;!&ndash;</el-col>&ndash;&gt;-->
                    <!--<el-col span="12">-->
                    <!--<el-col span="24">-->
                    <!--<el-form-item label="风控建议" prop="riskSuggest">-->
                    <!--<RadioGroup v-model="riskInsInputData.riskReportMainVo.riskSuggest">-->
                    <!--<Radio label="A" disabled>谨慎承保</Radio>-->
                    <!--<Radio label="B" disabled>提高条件承保</Radio>-->
                    <!--<Radio label="C" disabled>竞争性承保</Radio>-->
                    <!--</RadioGroup>-->
                    <!--</el-form-item>-->
                    <!--</el-col>-->
                    <!--<el-col span="24">-->
                    <!--<el-form-item label="突出风险因素" prop="highlightRisk">-->
                    <!--<el-input type="textarea" v-model="riskInsInputData.riskReportMainVo.highlightRisk"  style="width: 100%" disabled></el-input>-->
                    <!--</el-form-item>-->
                    <!--</el-col>-->
                    <!--<el-col span="24">-->
                    <!--<el-form-item label="其他意见" prop="supplementAppraisal">-->
                    <!--<el-input type="textarea" v-model="riskInsInputData.riskReportMainVo.othSuggest"  style="width: 100%" :disabled=browseFlag></el-input>-->
                    <!--</el-form-item>-->
                    <!--</el-col>-->
                    <!--</el-col>-->
                    <!--</div>-->
                    <div v-show="riskInsInputData.riskReportMainVo.underwriteFlag !== 'T'">
                      <el-col span="24">
                        <div class="title">
                          <i icon="ios-compose"></i>
                          风险防范评分反馈：（<span style="color: #cb2025"> 提示：分数越高表示对应风险越低 </span>）
                        </div>
                      </el-col>
                      <div>
                        <el-col span="12" style="margin-bottom: 10px;position: relative;height: 300px;">
                          <div id="myChart" style="width:330px;height: 300px;position: absolute;top: 0;left: 0;right: 0;bottom: 0;margin: auto;"></div>
                        </el-col>
                        <el-col span="12" style="margin-top: 35px;">
                          <el-col span="24" style="margin-bottom: 8px">
                            请您<span v-bind:style="styleObject">{{riskInsInputData.riskReportMainVo.riskSuggestCName}}</span>
                            <span v-show="postListFlag">
                              综合评分<span v-bind:style="styleObject">{{riskInsInputData.riskReportMainVo.score}}</span>
                            </span>
                            <!--</el-col>-->
                          </el-col>
                          <el-col span="24" class="updown" style="margin-top: 8px">
                            <div v-if = "riskInsInputData.riskReportMainVo.othSuggest != ''">
                              <i icon="checkmark-circled" class="highLight"></i>
                              其他意见：<pre style="padding-left: 20px;margin-top: 8px;height: 100px;overflow-y: auto">{{riskInsInputData.riskReportMainVo.othSuggest}}</pre>
                            </div>
                          </el-col>
                          <el-col span="24">
                            <i icon="alert-circled" class="highLight" color="red"></i>突出风险：<pre style="color: #333333;font-size: 14px;font-family: 'Microsoft YaHei';margin: 8px 0;padding-left: 20px;height: 150px;overflow-y: auto">{{riskInsInputData.riskReportMainVo.highlightRisk}}</pre>
                          </el-col>
                        </el-col>
                      </div>
                    </div>
                    <el-col span="24">
                      <el-form-item label="现场补充说明" prop="supplementAppraisal">
                        <el-input type="textarea" v-model="riskInsInputData.riskReportMainVo.supplementAppraisal"  style="width: 100%" :disabled=browseFlag></el-input>
                      </el-form-item>
                    </el-col>
                  </el-tab-pane>
                  <el-tab-pane label="风控影像上传" class="images" style="max-height: calc(100vh - 229px);overflow-y: auto;padding: 15px;" name="name9">
                    <FileUploadComponent :config="FileUpLoadConfig"></FileUploadComponent>
                  </el-tab-pane>
                  <el-tab-pane label="定价信息" class="document-text" v-if="editModel === 'browse' && pricingButtonFlag === true && riskInsInputData.riskReportMainVo.underwriteFlag !== 'T'">
                    <ReShowPrice v-bind:config="reShowPrice"></ReShowPrice>
                  </el-tab-pane>
                </el-tabs>
              </Row>
            </el-form>
          </el-col>
        </article>
        <Spin size="large" fix v-if="spinShow"></Spin>
      </div>
    </el-card>
    <CurrencyDialog :el-dialog-config="DialogConfig" @sync-el-dialog-show-flag="syncDialogShowFlag" @click-on-row="CurrencyDialogClickOnRow">
    </CurrencyDialog>
    <el-dialog v-model="modalFlag" width="770" :mask-closable="false" @on-cancel="cancel">
      <br/>
      <div>
        <FileUploadComponent :config= "FileUpLoadConfig"></FileUploadComponent>
      </div>
      <div slot="footer">
      </div>
    </el-dialog>
    <el-dialog class="mapcompontent" v-model="mapFlag" width="100%" height="100%" :mask-closable="false">
      <br/>
      <div>
<!--        <MapCompontent v-if="mapFlag" @transfer="transfer" :config="mapCompontent"></MapCompontent>-->
      </div>
      <div slot="footer">
      </div>
    </el-dialog>
    <el-dialog v-model="reviewedFlag">
      <el-form ref="riskReportMainVoE" :model="riskInsInputData.riskReportMainVo" :rules="ruleValidate20">
        <el-form-item label="请选择：" :label-width="100" prop="ff">
          <el-select type="text" @on-change="disposal()" v-model="riskInsInputData.riskReportMainVo.ff" placeholder="">
            <el-option v-for="item in (riskInsInputData.riskReportMainVo.underwriteFlag === '9' ? reviewdList3 : reviewdList)" :value="item.value" :key="item.value">{{item.label}}</el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="backFlag" :label="suggest" prop="repulsesugggest" :label-width="100">
          <el-input placeholder="请输入意见..." v-model="riskInsInputData.riskReportMainVo.repulsesugggest" type="textarea" :autosize="true"/>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button size="large" class = "compose" @click="asyncOK('1')">确定</el-button>
      </div>
      <!--<div v-if="backFlag">
        打回原因：
        <el-input placeholder="请输入打回原因..." v-model="riskInsInputData.riskReportMainVo.repulsesugggest" type="textarea" :autosize="true"/>
      </div>-->
    </el-dialog>
    <el-dialog v-model="reviewedFlag2">
      <el-form ref="riskReportMainVoF" :model="riskInsInputData.riskReportMainVo" :rules="ruleValidate21">
        <el-form-item label="请选择：" :label-width="100" prop= "bb">
          <el-select type="text" @on-change="disposal2()" v-model="riskInsInputData.riskReportMainVo.bb" placeholder="">
            <el-option v-for="item in reviewdList2" :value="item.value" :key="item.value">{{item.label}}</el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="backFlag" :label="suggest" prop="repulsesugggest" :label-width="100">
          <el-input placeholder="请输入意见..." v-model="riskInsInputData.riskReportMainVo.repulsesugggest" type="textarea" :autosize="true"/>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button size="large" class = "compose" @click="asyncOK('2')">确定</el-button>
      </div>
      <!--<div v-if="backFlag">
        打回原因：
        <el-input placeholder="请输入打回原因..." v-model="riskInsInputData.riskReportMainVo.repulsesugggest" type="textarea" :autosize="true"/>
      </div>-->
    </el-dialog>
    <el-dialog v-model="reviewedFlag3">
      <el-form ref="riskReportMainVoG" :model="riskInsInputData.riskReportMainVo" :rules="ruleValidate22">
        <el-form-item label="请选择：" :label-width="100" prop="cc">
          <el-select type="text" @on-change="disposal3()" v-model="riskInsInputData.riskReportMainVo.cc" placeholder="">
            <el-option v-for="item in reviewdList3" :value="item.value" :key="item.value">{{item.label}}</el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="backFlag" :label="suggest" prop="repulsesugggest" :label-width="100">
          <el-input placeholder="请输入意见..." v-model="riskInsInputData.riskReportMainVo.repulsesugggest" type="textarea" :autosize="true"/>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button size="large" class = "compose" @click="asyncOK('3')">确定</el-button>
      </div>
      <!--<div v-if="backFlag">
        打回原因：
        <el-input placeholder="请输入打回原因..." v-model="riskInsInputData.riskReportMainVo.repulsesugggest" type="textarea" :autosize="true"/>
      </div>-->
    </el-dialog>
    <el-dialog title="打回原因" v-model="backFlag2" :footer-hide="true">
      <Timeline>
        <div v-for="(item, index) in lctList" :key="index">
          <TimelineItem v-if="item.nodeName ==='报告打回'">
            <p>审核人名称：{{item.operateName}}</p>
            <p>审核时间：{{item.operateTime}}</p>
            <p style="white-space: normal; word-break:break-word;">打回原因：{{item.repulsesugggest}}</p>
          </TimelineItem>
        </div>
      </Timeline>
    </el-dialog>
    <el-dialog v-model="transFlag" class="progressModal">
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
  import HeadButtonCommon from './HeadButtonCommon'
  import riskInsInputData from '@/views/riskdata/riskInsInputData'
  import CurrencyDialog from '@/views/Dialog.vue'
  // import MapCompontent from '@/view/MapCompontent.vue'
  import{ queryRiskReport,underwrite, listCodeQuery, gradeAndSaveDetail, temporarySave, getUnderwriteProcess, makeWord } from  '@/api/riskIns'
    export default {
        name: "RiskInsPluralismInput",
      data () {
        /* 校验存货比例 */
        const validateStockRate = (rule, value, callback) => {
          // 验证正数，小数点保留两位
          var reg = /^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/
          if (value !== '' && value !== null) {
            if (value.match(reg) === null) {
              this.riskInsInputData.riskReportMainVo.stockRate = ''
              callback(new Error('只能录入小于等于100的非负数!'))
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
        /* 校验资产占比 */
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
//      const validaterepulsesugggest = (rule, value, callback) => {
//        alert(value)
//        if (value !== '' || value !== null) {
//          this.riskInsInputData.riskReportMainVo.repulsesugggest = value
//          callback()
//        } else {
//          this.riskInsInputData.riskReportMainVo.repulsesugggest = ''
//          callback(new Error('打回原因不能为空'))
//        }
//      }
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
//            var sumAmount = this.riskInsInputData.riskReportMainVo.sumAmount
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
        return {
          lctList: [],
          transFlag: false,
          backFlag: false,
          backFlag2: false,
          currnetTabPanel: 'name1',
          riskFileTitle: '2017版财产险风控模板（兼职版）',
          editModel: 'edit',
          suggest: '',
          pricingButtonFlag: false,
          reShowPrice: {
            riskFileNo: ''
          },
          myChart: '',
          message: '',
          footerStatus: 'default',
//        myChart2: '',
          raderFlag: true,
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
          addressModal: false,
          claimModal: false,
          modalFlag: false,
          mapFlag: false,
          riskReportConstructInfoModal: false,
          loseHistoryFlag: false,
          itemAddressFlag: false,
          constructBuildFlag: false,
          postListFlag: false,
          styleObject: {
            display: 'inline-block',
            color: 'red',
            fontSize: '21px',
            margin: '0 3px',
            verticalAlign: 'middle',
            marginTop: '-3px'
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
          itemAddressVo: {
            itemAddress: ''
          },
          // 区别历史损失记录增加和修改
          claim: 'new',
          originalHistory: '',
          build: 'new',
          constructInfo: '',
          oldValue: [],
          riskReportClaimVo: {
            riskReason: '',
            riskDate: '',
            riskPosition: '',
            loseInfo: '',
            abarbeitungFlag: '',
            abarbeitungMeasure: ''
          },
          riskReportConstructInfoVo: {
            constructBuild: '',
            assetsRatio: ''
          },
          DialogConfig: {
            dialogFlag: false
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
            exploreDate: ''
          },
          riskInsInputData: riskInsInputData.a(),
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
            series: [{
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
//                      color: '#D8504B' // "#af2009"  //  图表中各个图区域的颜色
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
            }]
          },
//        rader: {
//          series: [
//            {
//              name: '业务指标',
//              type: 'gauge',
// //              detail: {formatter: '{value}分'},
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
//        },
          /* 校验规则、提示语 */
          ruleValidate: {
            stockRate: [
              {validator: validateStockRate, type: 'number', required: true, trigger: 'blur'}
            ],
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
            ],
            itemAddress: [
              {required: true, message: '标的地址不能为空', trigger: 'blur'}
            ],
            historyLoseFlag: [
              {required: true, message: '请选择三年历史赔付损失记录', trigger: 'change'}
            ]
          },
          ruleValidate1: {
            underAssetsFlag: [
              {required: true, message: '是否存在地下资产不能为空', trigger: 'change'}
            ],
            pipelineFlag: [
              {required: true, message: '是否有内置排水管不能为空', trigger: 'change'}
            ],
            lightningPro: [
              {required: true, message: '是否安装避雷设施不能为空', trigger: 'change'}
            ],
            highBuildFlag: [
              {required: true, message: '建筑是否高耸/孤立/突出不能为空', trigger: 'change'}
            ]
          },
          ruleValidate2: {
            materialName: [
              {required: true, message: '材料名称不能为空', trigger: 'blur'}
            ],
            ignitionQuality: [
              {required: true, message: '请选择材料燃烧性质', trigger: 'change'}
            ],
            waterSensitivity: [
              {required: true, message: '请选择物质对水敏感度', trigger: 'change'}
            ],
            flaLiquidFlag: [
              {required: true, message: '易燃液体不能为空', trigger: 'change'}
            ],
            flaGasFlag: [
              {required: true, message: '易燃气体不能为空', trigger: 'change'}
            ],
            expDustFlag: [
              {required: true, message: '爆炸性粉尘不能为空', trigger: 'change'}
            ],
            hotWorkFlag: [
              {required: true, message: '动火作业不能为空', trigger: 'change'}
            ],
            cleanRoomFlag: [
              {required: true, message: '无尘车间不能为空', trigger: 'change'}
            ],
            eleProcessFlag: [
              {required: true, message: '电镀工艺不能为空', trigger: 'change'}
            ],
            highTemPreFlag: [
              {required: true, message: '高温高压设备不能为空', trigger: 'change'}
            ],
            layingMode: [
              {required: true, message: '仓储物摆放形式不能为空', trigger: 'change'}
            ]
          },
          ruleValidate3: {
            alarmType: [
              {required: true, message: '自动报警系统类型不能为空', trigger: 'blur'}
            ],
            extinguisherArea: [
              {required: true, message: '灭火器布置区域不能为空', trigger: 'blur'}
            ],
            insHydrantArea: [
              {required: true, message: '室内消防栓布置区域不能为空', trigger: 'blur'}
            ],
            outHydrantArea: [
              {required: true, message: '室外消防栓布置区域不能为空', trigger: 'blur'}
            ],
            selfExtCase: [
              {required: true, message: '自动灭火系统覆盖情况不能为空', trigger: 'blur'}
            ],
            equipmentChannel: [
              {required: true, message: '通往消防器材通道情况不能为空', trigger: 'blur'}
            ],
            firePrePeople: [
              {required: true, message: '消防安全管理人员不能为空', trigger: 'change'}
            ],
            hotWorkSystem: [
              {required: true, message: '动火管理作业制度不能为空', trigger: 'change'}
            ],
            smokingControl: [
              {required: true, message: '吸烟管理不能为空', trigger: 'change'}
            ],
            firePlan: [
              {required: true, message: '消防应急预案不能为空', trigger: 'change'}
            ],
            checkFrequency: [
              {required: true, message: '消防设施维护检查频率不能为空', trigger: 'change'}
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
            ]
          },
          ruleValidate4: {
            itemEnvironment: [
              {required: true, message: '标的周围环境不能为空', trigger: 'change'}
            ],
            comparedTerrain: [
              {required: true, message: '周围道路或建筑物地势相比不能为空', trigger: 'change'}
            ],
            havePonding: [
              {required: true, message: '历史是否发生过积水不能为空', trigger: 'change'}
            ],
            haveBlizzard: [
              {required: true, message: '区域降雪量暴雪记录不能为空', trigger: 'change'}
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
            ]
          },
          ruleValidate5: {
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
          ruleValidate6: {
            airStorageFlag: [
              {required: true, message: '是否存在露天堆放财产不能为空', trigger: 'change'}
            ],
            protectionFlag: [
              {required: true, message: '是否有防护措施不能为空', trigger: 'change'}
            ],
            storageGoods: [
              {required: true, message: '主要堆放物不能为空', trigger: 'change'}
            ]
          },
          ruleValidate7: {
            itemAddress: [
              {required: true, message: '标的地址不能为空', trigger: 'blur'}
            ]
          },
          ruleValidate8: {
            riskReason: [
              {required: true, message: '出险原因不能为空', trigger: 'change'}
            ],
            riskDate: [
              {required: true, type: 'date', message: '出险时间不能为空', trigger: 'change'}
            ],
            riskPosition: [
              {required: true, message: '出险地址和部位不能为空', trigger: 'blur'}
            ],
            loseInfo: [
              {required: true, message: '损失详细描述不能为空', trigger: 'blur'}
            ]
          },
          ruleValidate9: {
            constructBuild: [
              {required: true, message: '建筑结构不能为空', trigger: 'change'}
            ],
            assetsRatio: [
//            {required: true, message: '资产占比不能为空', trigger: 'blur'},
              {validator: validateAssetsRatio, required: true, trigger: 'blur'}
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
          if (val12 === '') {
            this.mapFlag = false
            this.transFlag = true
            this.message = '查勘地址未使用地图选择！'
          } else {
            this.riskInsInputData.riskReportMainVo.addressDetail = val + val2
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
        AddressDetailCancel () {
//        alert(this.mapCompontentData.addressDetail)
//        this.riskInsInputData.riskReportMainVo.addressDetail = this.mapCompontentData.addressDetail + this.mapCompontentData.address
        },
        cancel () {
          this.FileUpLoadConfig.childPath = ''
          this.FileUpLoadConfig.disabledFlag = false
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
          this.modalFlag = true
          this.FileUpLoadConfig.childPath = val1
          this.FileUpLoadConfig.disabledFlag = true
          //  跳转到影像面板
//        this.currnetTabPanel = 'name9'
        },
        /* 报告导出*/
        makeWord () {
          // IEcharts.
//        this.riskInsInputData.underwriteFlag = '1'
          if (this.riskInsInputData.riskReportMainVo.underwriteFlag !== '1' && this.riskInsInputData.riskReportMainVo.underwriteFlag !== '3') {
            this.$Message.success('该风控报告未审核通过，不允许导出！')
            return
          } else {
            this.riskInsInputData.picBase64Info = this.myChart.getDataURL()
            /* 将金额数据回复成为数字格式 */
            if (this.riskInsInputData.riskReportMainVo.sumAmount !== null && this.riskInsInputData.riskReportMainVo.sumAmount !== '') {
              this.riskInsInputData.riskReportMainVo.sumAmount = this.riskInsInputData.riskReportMainVo.sumAmount.replace(/,/g, '') + ''
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
        /* 暂存 */
        TSDetail () {
          this.spinShow = true
          /* 将金额数据回复成为数字格式 */
          if (this.riskInsInputData.riskReportMainVo.sumAmount !== null && this.riskInsInputData.riskReportMainVo.sumAmount !== '') {
            this.riskInsInputData.riskReportMainVo.sumAmount = this.riskInsInputData.riskReportMainVo.sumAmount.replace(/,/g, '') + ''
          }
//        this.riskInsInputData.riskDcodeListDel = this.FileUpLoadConfig.riskDcodeListDel
          this.riskInsInputData.riskDcodeList = this.FileUpLoadConfig.riskDcodeList
          temporarySave(this.riskInsInputData).then((response) => {
            if (response !== null) {
              parse(response.data.addRisk)
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
              parse(response.data.riskReportAddressList)
              parse(response.data.riskDcodeList)
//            parse(response.data.riskDcodeListDel)
              this.riskInsInputData = response.data
              if (this.riskInsInputData.riskReportMainVo.sumAmount !== null && this.riskInsInputData.riskReportMainVo.sumAmount !== '') {
                this.riskInsInputData.riskReportMainVo.sumAmount = parseFloat(this.riskInsInputData.riskReportMainVo.sumAmount).toFixed(4) + ''
              }
              if (this.riskInsInputData.riskReportMainVo.stockRate !== null && this.riskInsInputData.riskReportMainVo.stockRate !== '') {
                this.riskInsInputData.riskReportMainVo.stockRate = parseFloat(this.riskInsInputData.riskReportMainVo.stockRate).toFixed(2) + ''
              }
              let constructInList = this.riskInsInputData.riskReportConstructInfoList
              if (constructInList !== null) {
                for (let i = 0; i < constructInList.length; i++) {
                  constructInList[i].assetsRatio = parseFloat(constructInList[i].assetsRatio).toFixed(2)
                }
              }
              this.browseFlag = true
              this.editButtonState = true
              this.spinShow = false
//            this.$Message.success(this.riskInsInputData.riskReportMainVo.riskFileNo + '暂存成功！')
              this.$router.push({path: '/riskins_tsuccess', query: {riskFileNo: this.riskInsInputData.riskReportMainVo.riskFileNo, editModel: 'browse', riskModel: this.riskInsInputData.riskReportMainVo.riskModel, returnButtonState: this.returnButtonState}})
//            this.$router.push({path: '/riskins_pluralism', query: {riskFileNo: this.riskInsInputData.riskReportMainVo.riskFileNo, editModel: 'edit', riskModel: this.riskInsInputData.riskReportMainVo.riskModel, returnButtonState: this.returnButtonState}})
            }
          }, (response) => {
            // error callback
          })
        },
        /* 保存 */
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
          this.$refs['riskReportMainVoA'].validate((valid) => {
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
          this.$refs['riskReportAirStorageList'].validate((valid) => {
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
            }
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
            let buildFlag = false
            let occupancyFlag = false
            let protectFlag = false
            let environmentFlag = false
            let manageFlag = false
            /* 大门照必须上传 */
            let buildGateFlag = false
            for (let i = 0; i < riskDcodeLists.length; i++) {
              let codeEname = ''
              if (riskDcodeLists[i].codeEname !== null && riskDcodeLists[i].codeEname !== '') {
                codeEname = ';' + riskDcodeLists[i].codeEname.trim() + ';'
              }
              if (';1.1;,;1.2;,;2.1;'.indexOf(codeEname) > -1) {
                if (riskDcodeLists[i].configList !== null && riskDcodeLists[i].configList.urls.length !== 0) {
                  buildFlag = true
                  if (';1.1;'.indexOf(codeEname) > -1) {
                    buildGateFlag = true
                  }
                }
              }
              if (';3.2;,;3.3;'.indexOf(codeEname) > -1) {
                if (riskDcodeLists[i].configList !== null && riskDcodeLists[i].configList.urls.length !== 0) {
                  occupancyFlag = true
                }
              }
              if (';2.4;,;4.1.1.1;,;4.1.1.2;,;4.1.3;,;4.1.4.1;,;4.1.4.2;,;4.1.2;,;4.3.1;,;2.5;,;6.1.2;,;6.1.3;'.indexOf(codeEname) > -1) {
                if (riskDcodeLists[i].configList !== null && riskDcodeLists[i].configList.urls.length !== 0) {
                  protectFlag = true
                }
              }
              if (';5.1.4;,;5.1;,;2.6;,;2.2;'.indexOf(codeEname) > -1) {
                if (riskDcodeLists[i].configList !== null && riskDcodeLists[i].configList.urls.length !== 0) {
                  environmentFlag = true
                }
              }
              if (';4.2.3;,;4.2.2;,;4.2.4;,;4.2.5;,;4.2.6;,;2.3;,;4.3.2;,;6.1.5;'.indexOf(codeEname) > -1) {
                if (riskDcodeLists[i].configList !== null && riskDcodeLists[i].configList.urls.length !== 0) {
                  manageFlag = true
                }
              }
            }
            var errorMessage = ''
            if (!buildFlag) {
              errorMessage += '建筑物 '
            } else if (!buildGateFlag) {
              errorMessage += '建筑物的大门照 '
            }
            if (!occupancyFlag) {
              errorMessage += '占用性质 '
            }
            if (!protectFlag) {
              errorMessage += '保护设施 '
            }
            if (!environmentFlag) {
              errorMessage += '环境风险 '
            }
            if (!manageFlag) {
              errorMessage += '管理 '
            }
            if (!(buildFlag && occupancyFlag && protectFlag && environmentFlag && manageFlag && buildGateFlag)) {
              this.$Message.error(errorMessage + '类图片至少一张!')
              return false
            }
//          this.spinShow = true
            let assetsRatioFlag = this.validateAssetsRatio()
            if (!assetsRatioFlag) {
              this.constructBuildFlag = true
              return
            } else {
              this.spinShow = true
              this.constructBuildFlag = false
            }
//          this.riskInsInputData.riskDcodeListDel = this.FileUpLoadConfig.riskDcodeListDel
            this.riskInsInputData.riskDcodeList = this.FileUpLoadConfig.riskDcodeList
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
        checkBack () {
          this.backFlag2 = true
          /*查询打回原因*/
          let params =  {executionId: this.riskInsInputData.riskReportMainVo.executionId, underwriteFlag: this.riskInsInputData.riskReportMainVo.underwriteFlag}
          getUnderwriteProcess(params).then((response) => {
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
        /* 修改 */
        alter () {
          this.editButtonState = false
          this.browseFlag = false
        },
        /* 验证资产占比总和是否等于100 */
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
        /* 标的地址 */
        createAddress () {
          this.itemAddressVo = {itemAddress: ''}
          this.$refs['itemAddressVo'].resetFields()
          this.addressModal = true
        },
        /* 关闭模态框重置校验 */
        modalCancel (val) {
          this.$refs[val].resetFields()
        },
        /* 历史损失信息 */
        createClaim () {
          this.claim = 'new'
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
        /* 建筑结构 */
        riskInsAddBuild () {
          this.build = 'new'
          this.riskReportConstructInfoVo = {constructBuild: '', assetsRatio: ''}
          this.$refs['riskReportConstructInfoVo'].resetFields()
          this.riskReportConstructInfoModal = true
        },
        /* 历史损失信息 */
        addClaim () {
          this.$refs['riskReportClaimVo'].validate((valid) => {
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
        /* 标的地址 */
        addAdress () {
          this.$refs['itemAddressVo'].validate((valid) => {
            if (valid) {
              this.addressModal = false
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
        /* 建筑结构 */
        addRiskReportConstructInfo () {
          this.$refs['riskReportConstructInfoVo'].validate((valid) => {
            if (valid) {
              this.riskReportConstructInfoModal = false
              this.constructBuildFlag = false
              if (this.riskInsInputData.riskReportConstructInfoList === null || this.riskInsInputData.riskReportConstructInfoList === '') {
                this.riskInsInputData.riskReportConstructInfoList = []
              }
              if (this.build === 'new') {
                this.riskInsInputData.riskReportConstructInfoList.push(this.riskReportConstructInfoVo)
                this.riskReportConstructInfoVo = {constructBuild: '', assetsRatio: ''}
              } else if (this.build === 'edit') {
                this.constructInfo.constructBuild = this.riskReportConstructInfoVo.constructBuild
                this.constructInfo.assetsRatio = this.riskReportConstructInfoVo.assetsRatio
              }
            } else {
              return false
            }
          })
        },
        /* 标的地址删除 */
        addressDelete (index) {
//      删一个数组元素
          this.riskInsInputData.riskReportAddressList.splice(index, 1)
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
          this.riskReportConstructInfoVo.constructBuild = riskReportConstructInfo.constructBuild
          this.riskReportConstructInfoVo.assetsRatio = riskReportConstructInfo.assetsRatio
        },
        /* 建筑结构删除 */
        riskInsDeleteBuild (index) {
          this.riskInsInputData.riskReportConstructInfoList.splice(index, 1)
        },
        /* 模态框 */
        codeCodeDialog () {
          alert(111)
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
        changeHistoryLoseFlag () {
          if (this.riskInsInputData.riskReportClaimList !== null) {
            if (this.riskInsInputData.riskReportMainVo.historyLoseFlag !== '1') {
              this.riskInsInputData.riskReportClaimList.splice(0, this.riskInsInputData.riskReportClaimList.length)
            }
          }
        },
        changeFireEquipType (data) {
          var fireEquipType = this.riskInsInputData.riskReportProtectionList[0].fireEquipType
          if (fireEquipType === '' || fireEquipType.length === 0) {
            this.riskInsInputData.riskReportProtectionList[0].equipmentChannel = ''
          }
          // 复选框 点击 默认赋值
          if (this.oldValue.length === 0) {
            this.riskInsInputData.riskReportProtectionList[0].equipmentChannel = 'A'
          }
          for (let i = 0; this.riskInsInputData.riskReportProtectionList[0].fireEquipType.length > i; i++) {
            var valueOne = this.riskInsInputData.riskReportProtectionList[0].fireEquipType[i]
            if (this.oldValue.indexOf(valueOne) === -1) {
              if (valueOne === 'A') {
                this.riskInsInputData.riskReportProtectionList[0].alarmType = 'B'
              } else if (valueOne === 'B') {
                this.riskInsInputData.riskReportProtectionList[0].selfExtCase = 'A'
                this.riskInsInputData.riskReportProtectionList[0].selfExtArea.push('A')
                this.riskInsInputData.riskReportProtectionList[0].selfExtArea.push('B')
                this.riskInsInputData.riskReportProtectionList[0].selfExtArea.push('C')
                this.riskInsInputData.riskReportProtectionList[0].selfExtArea.push('D')
              } else if (valueOne === 'C') {
                this.riskInsInputData.riskReportProtectionList[0].insHydrantArea = 'A'
                this.riskInsInputData.riskReportProtectionList[0].outHydrantArea = 'A'
              } else if (valueOne === 'D') {
                this.riskInsInputData.riskReportProtectionList[0].extinguisherArea = 'A'
              }
            }
          }
          this.oldValue = this.riskInsInputData.riskReportProtectionList[0].fireEquipType
          if (fireEquipType.indexOf('A') === -1) {
            this.riskInsInputData.riskReportProtectionList[0].alarmType = ''
          }
          if (fireEquipType.indexOf('B') === -1) {
            this.riskInsInputData.riskReportProtectionList[0].selfExtCase = ''
            this.riskInsInputData.riskReportProtectionList[0].selfExtArea = []
          }
          if (fireEquipType.indexOf('C') === -1) {
            this.riskInsInputData.riskReportProtectionList[0].insHydrantArea = ''
            this.riskInsInputData.riskReportProtectionList[0].outHydrantArea = ''
          }
          if (fireEquipType.indexOf('D') === -1) {
            this.riskInsInputData.riskReportProtectionList[0].extinguisherArea = ''
          }
        },
        changeWaterFacility (data) {
          if (this.riskInsInputData.riskReportProtectionList[0].waterFacility.indexOf('E') === -1) {
            this.riskInsInputData.riskReportProtectionList[0].addWaterFacility = ''
          }
        },
        changePatrolFlag () {
          if (this.riskInsInputData.riskReportProtectionList[0].patrolFlag !== 'A') {
            this.riskInsInputData.riskReportProtectionList[0].patrolArea = ''
            this.riskInsInputData.riskReportProtectionList[0].patrolFrequency = ''
          }
        },
        changeAddRisk () {
          let addRisk = this.riskInsInputData.riskReportMainVo.addRisk
          if (addRisk.indexOf('A') === -1) {
            this.riskInsInputData.riskReportTheftList[0].insuredAttraction = ''
            this.riskInsInputData.riskReportTheftList[0].antiTheftFlag = ''
            this.riskInsInputData.riskReportTheftList[0].antiTheftType = ''
            this.riskInsInputData.riskReportTheftList[0].netPoliceFlag = ''
            this.riskInsInputData.riskReportTheftList[0].securityNumber = ''
            this.riskInsInputData.riskReportTheftList[0].timingPatrol = ''
            this.riskInsInputData.riskReportTheftList[0].publicSecurity = ''
            this.riskInsInputData.riskReportTheftList[0].theftHistoryFlag = ''
          }
          if (addRisk.indexOf('C') === -1) {
            this.riskInsInputData.riskReportAirStorageList[0].airStorageFlag = ''
            this.riskInsInputData.riskReportAirStorageList[0].storageGoods = ''
            this.riskInsInputData.riskReportAirStorageList[0].protectionFlag = ''
            this.riskInsInputData.riskReportAirStorageList[0].addProtection = ''
          } else {
            if (this.riskInsInputData.riskReportAirStorageList[0].airStorageFlag !== 'A') {
              this.riskInsInputData.riskReportAirStorageList[0].storageGoods = ''
              this.riskInsInputData.riskReportAirStorageList[0].protectionFlag = ''
              this.riskInsInputData.riskReportAirStorageList[0].protectionFlag = ''
            }
            if (this.riskInsInputData.riskReportAirStorageList[0].protectionFlag !== 'A') {
              this.riskInsInputData.riskReportAirStorageList[0].addProtection = ''
            }
          }
        },
        changeAntiTheftFlag () {
          if (this.riskInsInputData.riskReportTheftList[0].antiTheftFlag !== 'A') {
            this.riskInsInputData.riskReportTheftList[0].antiTheftType = ''
          }
        },
        /* 调用后台查询 */
        search () {
//        let userinfo = this.$store.getters.getUserInfo
          this.spinShow = true
          let riskFileNo = this.$route.query.riskFileNo
          this.reShowPrice.riskFileNo = riskFileNo
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
              parse(response.addRisk)
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
              parse(response.riskReportAddressList)
              parse(response.riskDcodeList)
//          parse(response.riskDcodeListDel)
              this.riskInsInputData = response
              if (response.riskReportMainVo.riskCode == 'QBB') {
                this.pricingButtonFlag = true
              } else if (response.riskReportMainVo.riskCode == 'QBA') {
                this.pricingButtonFlag = true
              } else if (response.riskReportMainVo.riskCode == 'QYC') {
                this.pricingButtonFlag = true
              }
              // 录入人员
//          if (this.riskInsInputData.riskReportMainVo.operatorCode !== this.$store.state.app.userInfo.userCode) {
//            this.riskInsInputData.riskReportMainVo.operatorCode = this.$store.state.app.userInfo.userCode
//            this.riskInsInputData.riskReportMainVo.operator = this.$store.state.app.userInfo.userName
//          }
              if (this.riskInsInputData.riskReportMainVo.underwriteFlag === '1' || this.riskInsInputData.riskReportMainVo.underwriteFlag === '3') {
                this.importFlag = true
              }
              // 三年历史赔付记录
              if (this.riskInsInputData.riskReportClaimList !== null && this.riskInsInputData.riskReportClaimList.length > 0) {
                this.riskInsInputData.riskReportMainVo.historyLoseFlag = '1'
              }
              // 查勘机构
              this.riskInsInputData.riskReportMainVo.explorecomCodeCName = this.riskInsInputData.riskReportMainVo.comCodeCName
              if (this.riskInsInputData.riskReportMainVo.historyLoseFlag === '' || this.riskInsInputData.riskReportMainVo.historyLoseFlag === null) {
                this.riskInsInputData.riskReportClaimList = []
              }
              this.FileUpLoadConfig.riskDcodeList = this.riskInsInputData.riskDcodeList
//          this.FileUpLoadConfig.riskDcodeListDel = this.riskInsInputData.riskDcodeListDel
              this.FileUpLoadConfig.riskFileNo = riskFileNo
              this.FileUpLoadConfig.editModel = this.editModel
              this.oldValue = this.riskInsInputData.riskReportProtectionList[0].fireEquipType
              if (response.riskReportMainVo.sumAmount !== null && response.riskReportMainVo.sumAmount !== '') {
                this.riskInsInputData.riskReportMainVo.sumAmount = this.common.toThousands(parseFloat(response.riskReportMainVo.sumAmount).toFixed(4)) + ''
              }
              if (response.riskReportMainVo.stockRate !== null && response.riskReportMainVo.stockRate !== '') {
                this.riskInsInputData.riskReportMainVo.stockRate = parseFloat(response.riskReportMainVo.stockRate).toFixed(2) + ''
              }
              let constructInList = this.riskInsInputData.riskReportConstructInfoList
              if (this.riskInsInputData.riskReportConstructInfoList !== null) {
                for (let i = 0; i < constructInList.length; i++) {
                  constructInList[i].assetsRatio = parseFloat(constructInList[i].assetsRatio).toFixed(2)
                }
              }
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
              } else {
                if (!isNaN(response.riskReportMainVo.score)) {
                  response.riskReportMainVo.score = null
                }
              }
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
            let params = {riskFileNo: params.riskFileNo, executionId: params.executionId, underwriteFlag: underwrite, repulsesugggest: params.repulsesugggest}
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
                  //         h('Icon', {
                  //           'class': {'demo-spin-icon-load': true},
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
                  this.$router.push({path: '/riskins_pass', query: {underwriteFlag: '1', riskFileNo: params.riskFileNo, editModel: 'browse', riskModel: this.riskInsInputData.riskReportMainVo.riskModel}})
                } else {
                  this.$router.push({path: '/riskins_pass', query: {riskFileNo: params.riskFileNo, editModel: 'browse', riskModel: this.riskInsInputData.riskReportMainVo.riskModel}})
                }
//              this.search()
//              console.log(this.riskInsInputData)
//              this.$Message.success(params.riskFileNo + '处理完成！')
              } else {
                this.$Message.error(params.riskFileNo + '处理失败！')
              }
            }, (response) => {
              this.$Message.error(params.riskFileNo + '处理失败！')
            })
          }
        }
      },
      mounted () {
        /* ECharts图表 */
        this.myChart = this.$echarts.init(document.getElementById('myChart'))
//      this.myChart2 = this.$echarts.init(document.getElementById('myChart2'))
        this.myChart.setOption(this.option)
//      this.myChart2.setOption(this.rader)
      },
      components: {HeadButtonCommon, CurrencyDialog } // FileUploadComponent ReShowPrice MapCompontent
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

<style lang="scss" >
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
