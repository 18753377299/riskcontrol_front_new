<template>
  <div>
    <div>
      <el-card>
        <div>
          <div class="updown">
            <HeadButtonCommon></HeadButtonCommon>
          </div>
          <article>
            <el-col>
              <el-form :label-width="140" style="max-height: calc(100vh - 229px);overflow-y: auto;padding: 15px;">
                <el-row>
                  <Tabs :animated=true>
                    <TabPane style="padding-bottom: 42px">
                      <el-form :label-width="140" ref="riskCheckMainVo" :model="riskInsInputData.riskCheckMainVo" :rules="ruleValidate">
                        <el-col :span="24">
                          <div class="title" style="margin-top: 5px; margin-left: 2px">
                            <Icon type="locked"></Icon>
                            基本信息：
                          </div>
                        </el-col>
                        <el-col :span="24">
                          <el-col :span="8">
                            <el-form label="巡检编号" prop="riskCheckNo">
                              <Input v-model="riskInsInputData.riskCheckMainVo.riskCheckNo" disabled></Input>
                            </el-form>
                          </el-col>
                          <el-col :span="8">
                            <el-form label="巡检日期" prop="checkDate">
                              <el-date-picker type="date" v-model="riskInsInputData.riskCheckMainVo.checkDate" placeholder="请输入时间..." style="width: 100%" :disabled="browseFlag"></el-date-picker>
                            </el-form>
                          </el-col>
                          <el-col :span="8">
                            <el-form label="巡检人" prop="checkerName">
                              <el-input v-model="riskInsInputData.riskCheckMainVo.checkerName" @on-blur="queryData('checker')" :disabled="browseFlag">
                                <Button slot="append" icon="ios-search" @click="codeCodeDialog('checker');" :disabled="browseFlag"></Button>
                              </el-input>
                            </el-form>
                          </el-col>
                        </el-col>
                        <el-col :span="24">
                          <el-col :span="8">
                            <el-form label="巡检机构" prop="checkComCodeCName">
                              <el-input v-model="riskInsInputData.riskCheckMainVo.checkComCodeCName" @on-blur="queryData('checkComCode')" :disabled="browseFlag">
                                <Button slot="append" icon="ios-search" @click="codeCodeDialog('checkComCode');" :disabled="browseFlag"></Button>
                              </el-input>
                            </el-form>
                          </el-col>
                        </el-col>
                        <el-col :span="24">
                          <div class="title" style="margin-top: 5px; margin-left: 2px">
                            <Icon type="locked"></Icon>
                            企业基本信息：
                          </div>
                        </el-col>
                        <el-col :span="24">
                          <el-col :span="8">
                            <el-form label="被保险人类型" prop="insuredType">
                              <el-select v-model="riskInsInputData.riskCheckMainVo.insuredType" type="text"
                                      placeholder="请选择..." disabled>
                                <el-option value="1">个人</el-option>
                                <el-option value="2">团体</el-option>
                              </el-select>
                            </el-form>
                          </el-col>
                          <el-col :span="8">
                            <el-form label="被保险人名称" prop="insuredName">
                              <el-input v-model="riskInsInputData.riskCheckMainVo.insuredName" disabled></el-input>
                            </el-form>
                          </el-col>
                          <el-col :span="8">
                            <el-form label="被保险人代码" prop="insuredCode">
                              <el-input v-model="riskInsInputData.riskCheckMainVo.insuredCode" disabled></el-input>
                            </el-form>
                          </el-col>
                        </el-col>
                        <el-col :span="24">
                          <el-col :span="8">
                            <el-form label="被保险人性质" prop="unitNature">
                              <el-select v-model="riskInsInputData.riskCheckMainVo.unitNature" type="text"
                                      placeholder="请选择..." :disabled="browseFlag">
                                <el-option value="A">行政事业单位及人民团体</el-option>
                                <el-option value="B">国有企业</el-option>
                                <el-option value="C">民营企业</el-option>
                                <el-option value="D">外商投资企业（除台资）</el-option>
                                <el-option value="E">台资企业</el-option>
                              </el-select>
                            </el-form>
                          </el-col>
                          <el-col :span="8">
                            <el-form label="国民经济代码" prop="businessSourceCName">
                              <el-input type="text" v-model="riskInsInputData.riskCheckMainVo.businessSourceCName"
                                     placeholder="请点击..." style="width: 100%" @on-enter="codeCodeDialog('businessSource')"
                                     @on-blur="queryData('businessSource')" :disabled="browseFlag">
                                <Button slot="append" icon="ios-search" @click="codeCodeDialog('businessSource')"
                                        :disabled="browseFlag"></Button>
                              </el-input>
                            </el-form>
                          </el-col>
                          <el-col :span="8">
                            <el-form label="行业分类代码" prop="businessClass">
                              <el-input type="text" v-model="riskInsInputData.riskCheckMainVo.businessClass"
                                     style="width: 100%" disabled></el-input>
                            </el-form>
                          </el-col>
                        </el-col>
                        <el-col :span="24">
                          <el-col :span="23">
                            <el-form label="巡检地址" prop="addressDetail">
                              <el-input type="text" v-model="riskInsInputData.riskCheckMainVo.addressDetail"
                                     style="width: 100%" disabled></el-input>
                            </el-form>
                          </el-col>
                          <el-col :span="1" style="padding-left: 10px;">
                            <Icon type="ios-location" class="cameraicon" @click.native="queryAddressDetail"></Icon>
                          </el-col>
                        </el-col>
                      </el-form>
                    </TabPane>
                  </Tabs>
                </el-row>
              </el-form>
              <el-form :label-width="140" ref="riskCheckVentureList" :model="riskInsInputData.riskCheckVentureList[0]">
                <el-col span="24">
                  <div class="title" style="margin-top: 5px; margin-left: 2px">
                    <Icon type="locked"></Icon>
                    环境信息：
                  </div>
                </el-col>
                <el-col :span="24">
                  <el-col :span="8">
                    <el-form label="风险特征（暴雨）" prop="characteristicsName">
                      <el-input type="text" placeholder="根据巡检地址带出" v-model="riskInsInputData.riskCheckVentureList[0].characteristicsName" disabled></el-input>
                    </el-form>
                  </el-col>
                  <el-col :span="8">
                    <el-form label="区域历史积水记录" prop="rainRecord">
                      <el-select v-model="riskInsInputData.riskCheckVentureList[0].rainRecord" type="text" placeholder="请选择..." :disabled="browseFlag">
                        <el-option value="A">三年内0次</el-option>
                        <el-option value="B">三年内1次</el-option>
                        <el-option value="C">三年内2次</el-option>
                        <el-option value="D">三年内超过（含）3次</el-option>
                      </el-select>
                    </el-form>
                  </el-col>
                  <el-col :span="8">
                    <el-form label="与周边水体距离" prop="itemDistance">
                      <el-select v-model="riskInsInputData.riskCheckVentureList[0].itemDistance" type="text" placeholder="请选择..." :disabled="browseFlag">
                        <el-option value="A">周边无水体（江河湖海）</el-option>
                        <el-option value="B">大于1公里（8）</el-option>
                        <el-option value="C">小于1公里大于500米</el-option>
                        <el-option value="D">小于500米</el-option>
                      </el-select>
                    </el-form>
                  </el-col>
                </el-col>
                <el-col :span="24">
                  <el-col :span="8">
                    <el-col :span="22">
                      <el-form label="厂区地面相比周边地势高差" prop="comparedDegree">
                        <el-select v-model="riskInsInputData.riskCheckVentureList[0].comparedDegree" type="text" placeholder="请选择..." :disabled="browseFlag">
                          <el-option value="A">高于周边地势</el-option>
                          <el-option value="B">与周边地势基本持平</el-option>
                          <el-option value="C">低于周边地势</el-option>
                        </el-select>
                      </el-form>
                    </el-col>
                    <el-col :span="1">
                      <Icon v-if="!showUpload('2.4')" type="ios-camera-outline" class="cameraicon"
                            @click.native="buttonCommonEvent('2.4')" aria-readonly="true"></Icon>
                      <Icon v-if="showUpload('2.4')" type="ios-camera" class="cameraicon"
                            @click.native="buttonCommonEvent('2.4')" aria-readonly="true"></Icon>
                    </el-col>
                  </el-col>
                  <el-col :span="8">
                    <el-form label="所处地形 " prop="comparedTerrain">
                      <el-select v-model="riskInsInputData.riskCheckVentureList[0].comparedTerrain" type="text" placeholder="请选择..." :disabled="browseFlag">
                        <el-option value="A">平原</el-option>
                        <el-option value="B">丘陵</el-option>
                        <el-option value="C">山地</el-option>
                        <el-option value="D">盆地</el-option>
                      </el-select>
                    </el-form>
                  </el-col>
                  <el-col :span="8">
                    <el-form label="是否临近山边、山坡 " prop="itemEnvironment">
                      <el-select v-model="riskInsInputData.riskCheckVentureList[0].itemEnvironment" type="text" placeholder="请选择..." :disabled="browseFlag">
                        <el-option value="A">否</el-option>
                        <el-option value="B">是</el-option>
                      </el-select>
                    </el-form>
                  </el-col>
                </el-col>
                <el-col :span="24">
                  <el-col :span="8">
                    <el-form label="周围有无大型施工工程" prop="largeProjects">
                      <el-select v-model="riskInsInputData.riskCheckVentureList[0].largeProjects" @on-change="changeLargeProjects" type="text" placeholder="请选择..." :disabled="browseFlag">
                        <el-option value="A">无</el-option>
                        <el-option value="B">有</el-option>
                      </el-select>
                    </el-form>
                  </el-col>
                  <el-col :span="8" v-if="riskInsInputData.riskCheckVentureList[0].largeProjects === 'B'">
                    <el-form label="大型施工工程影响" prop="largeProImpact">
                      <el-select v-model="riskInsInputData.riskCheckVentureList[0].largeProImpact" type="text" placeholder="请选择..." :disabled="browseFlag">
                        <el-option value="A">无</el-option>
                        <el-option value="B">影响较小</el-option>
                        <el-option value="C">影响较大</el-option>
                      </el-select>
                    </el-form>
                  </el-col>
                </el-col>
                <el-col :span="24">
                  <div class="title" style="margin-top: 5px; margin-left: 2px">
                    <Icon type="locked"></Icon>
                    重要水灾、风灾风险要素：
                  </div>
                </el-col>
                <el-col :span="24">
                  <el-col :span="12">
                    <el-col :span="22">
                      <el-form label="设备水敏感性 " prop="waterSensitivity">
                        <el-select v-model="riskInsInputData.riskCheckVentureList[0].waterSensitivity" type="text" placeholder="请选择..." :disabled="browseFlag">
                          <el-option value="A">不敏感（浸水损失金额10万以下）</el-option>
                          <el-option value="B">比较敏感(浸水损失金额占比10万至50万)</el-option>
                          <el-option value="C">严重敏感（浸水损失金额50万以上）</el-option>
                        </el-select>
                      </el-form>
                    </el-col>
                    <el-col :span="1">
                      <Icon v-if="!showUpload('3.1')" type="ios-camera-outline" class="cameraicon"
                            @click.native="buttonCommonEvent('3.1')" aria-readonly="true"></Icon>
                      <Icon v-if="showUpload('3.1')" type="ios-camera" class="cameraicon"
                            @click.native="buttonCommonEvent('3.1')" aria-readonly="true"></Icon>
                    </el-col>
                  </el-col>
                  <el-col :span="12">
                    <el-col :span="22">
                      <el-form label="有无地下资产 " prop="underAssetsFlag">
                        <el-select v-model="riskInsInputData.riskCheckVentureList[0].underAssetsFlag" type="text" placeholder="请选择..." :disabled="browseFlag">
                          <el-option value="A">无</el-option>
                          <el-option value="B">有，但无浸水损失风险</el-option>
                          <el-option value="C">有，浸水损失较大</el-option>
                        </el-select>
                      </el-form>
                    </el-col>
                    <el-col :span="1">
                      <Icon v-if="!showUpload('3.2')" type="ios-camera-outline" class="cameraicon"
                            @click.native="buttonCommonEvent('3.2')" aria-readonly="true"></Icon>
                      <Icon v-if="showUpload('3.2')" type="ios-camera" class="cameraicon"
                            @click.native="buttonCommonEvent('3.2')" aria-readonly="true"></Icon>
                    </el-col>
                  </el-col>
                </el-col>
                <el-col :span="24">
                  <el-col :span="12">
                    <el-col :span="22">
                      <el-form label="历史水渍线高度 " prop="historicWater">
                        <el-select v-model="riskInsInputData.riskCheckVentureList[0].historicWater" type="text" placeholder="请选择..." :disabled="browseFlag">
                          <el-option value="A">无</el-option>
                          <el-option value="B">0-10cm</el-option>
                          <el-option value="C">＞10cm</el-option>
                        </el-select>
                      </el-form>
                    </el-col>
                    <el-col :span="1">
                      <Icon v-if="!showUpload('3.3')" type="ios-camera-outline" class="cameraicon"
                            @click.native="buttonCommonEvent('3.3')" aria-readonly="true"></Icon>
                      <Icon v-if="showUpload('3.3')" type="ios-camera" class="cameraicon"
                            @click.native="buttonCommonEvent('3.3')" aria-readonly="true"></Icon>
                    </el-col>
                  </el-col>
                  <el-col :span="12">
                    <el-form label="企业经营状况" prop="manSituation">
                      <el-select v-model="riskInsInputData.riskCheckVentureList[0].manSituation" type="text" placeholder="请选择..." :disabled="browseFlag">
                        <el-option value="A">正常</el-option>
                        <el-option value="B">不正常</el-option>
                      </el-select>
                    </el-form>
                  </el-col>
                </el-col>
                <el-col :span="24">
                  <div class="title" style="margin-top: 5px; margin-left: 2px">
                    <Icon type="locked"></Icon>
                    建筑物信息：
                  </div>
                </el-col>
                <el-col :span="24">
                  <el-col :span="8">
                    <el-col :span="22">
                      <el-form label="建筑结构 " prop="constructBuild">
                        <el-select v-model="riskInsInputData.riskCheckVentureList[0].constructBuild" type="text" placeholder="请选择..." :disabled="browseFlag">
                          <el-option value="A">混凝土、砖混结构</el-option>
                          <el-option value="B">砖木结构</el-option>
                          <el-option value="C">钢结构（含砖墙钢顶）</el-option>
                          <el-option value="D">其它简易建筑</el-option>
                        </el-select>
                      </el-form>
                    </el-col>
                    <el-col :span="1">
                      <Icon v-if="!showUpload('4.1')" type="ios-camera-outline" class="cameraicon"
                            @click.native="buttonCommonEvent('4.1')" aria-readonly="true"></Icon>
                      <Icon v-if="showUpload('4.1')" type="ios-camera" class="cameraicon"
                            @click.native="buttonCommonEvent('4.1')" aria-readonly="true"></Icon>
                    </el-col>
                  </el-col>
                  <el-col :span="8">
                    <el-col :span="23">
                      <el-form label="门窗是否完好 " prop="doorFlag">
                        <el-select v-model="riskInsInputData.riskCheckVentureList[0].doorFlag" type="text" placeholder="请选择..." :disabled="browseFlag">
                          <el-option value="A">完好，能正常关闭</el-option>
                          <el-option value="B">有破损，能正常关闭</el-option>
                          <el-option value="C">破损严重或较多不能正常关闭</el-option>
                        </el-select>
                      </el-form>
                    </el-col>
                    <el-col :span="1">
                      <Icon v-if="!showUpload('4.2')" type="ios-camera-outline" class="cameraicon"
                            @click.native="buttonCommonEvent('4.2')" aria-readonly="true"></Icon>
                      <Icon v-if="showUpload('4.2')" type="ios-camera" class="cameraicon"
                            @click.native="buttonCommonEvent('4.2')" aria-readonly="true"></Icon>
                    </el-col>
                  </el-col>
                  <el-col :span="8">
                    <el-col :span="22">
                      <el-form label="排水沟/井疏通状况" prop="dredgeCondition">
                        <el-select v-model="riskInsInputData.riskCheckVentureList[0].dredgeCondition" type="text" placeholder="请选择..." :disabled="browseFlag">
                          <el-option value="A">有排水沟/井，通畅</el-option>
                          <el-option value="B">有排水沟/井，部分堵塞</el-option>
                          <el-option value="C">无排水沟/井或堵塞严重</el-option>
                        </el-select>
                      </el-form>
                    </el-col>
                    <el-col :span="1">
                      <Icon v-if="!showUpload('4.3')" type="ios-camera-outline" class="cameraicon"
                            @click.native="buttonCommonEvent('4.3')" aria-readonly="true"></Icon>
                      <Icon v-if="showUpload('4.3')" type="ios-camera" class="cameraicon"
                            @click.native="buttonCommonEvent('4.3')" aria-readonly="true"></Icon>
                    </el-col>
                  </el-col>
                </el-col>
                <el-col :span="24">
                  <el-col :span="8">
                    <el-form label="厂房所有权性质" prop="ownership">
                      <el-select v-model="riskInsInputData.riskCheckVentureList[0].ownership" type="text" placeholder="请选择..." :disabled="browseFlag">
                        <el-option value="A">自有建筑</el-option>
                        <el-option value="B">租赁建筑</el-option>
                      </el-select>
                    </el-form>
                  </el-col>
                  <el-col :span="8">
                    <el-form label="厂区内是否有露天堆放资产" prop="airStorageFlag">
                      <el-select v-model="riskInsInputData.riskCheckVentureList[0].airStorageFlag" type="text" placeholder="请选择..." :disabled="browseFlag">
                        <el-option value="A">否</el-option>
                        <el-option value="B">是</el-option>
                      </el-select>
                    </el-form>
                  </el-col>
                  <el-col :span="8">
                    <el-form label="钢结构建筑年限" prop="buildYears">
                      <el-select v-model="riskInsInputData.riskCheckVentureList[0].buildYears" type="text" placeholder="请选择..." :disabled="browseFlag">
                        <el-option value="A">无钢结构</el-option>
                        <el-option value="B">10年以下</el-option>
                        <el-option value="C">10-20年</el-option>
                        <el-option value="D">20年以上</el-option>
                      </el-select>
                    </el-form>
                  </el-col>
                </el-col>
                <el-col :span="24">
                  <el-col :span="8">
                    <el-form label="仓库是否有顶峰错层结构" prop="staggeredFlag">
                      <el-select v-model="riskInsInputData.riskCheckVentureList[0].staggeredFlag" type="text" placeholder="请选择..." :disabled="browseFlag">
                        <el-option value="A">否</el-option>
                        <el-option value="B">是</el-option>
                      </el-select>
                    </el-form>
                  </el-col>
                  <el-col :span="8">
                    <el-form label="屋顶排水方式" prop="drainageMethod">
                      <el-select v-model="riskInsInputData.riskCheckVentureList[0].drainageMethod" type="text" placeholder="请选择..." :disabled="browseFlag">
                        <el-option value="A">外排水</el-option>
                        <el-option value="B">内外均有</el-option>
                        <el-option value="C">内排水</el-option>
                        <el-option value="D">内外均无</el-option>
                      </el-select>
                    </el-form>
                  </el-col>
                  <el-col :span="8">
                    <el-form label="室内排水管道维护状况" prop="drainageBlock">
                      <el-select v-model="riskInsInputData.riskCheckVentureList[0].drainageBlock" type="text" placeholder="请选择..." :disabled="browseFlag">
                        <el-option value="A">畅通，正常维护</el-option>
                        <el-option value="B">管径过小、堵塞</el-option>
                        <el-option value="C">破损、老化</el-option>
                        <el-option value="D">无</el-option>
                      </el-select>
                    </el-form>
                  </el-col>
                </el-col>
                <el-col :span="24">
                  <el-col :span="8">
                    <el-form label="排水沟（管）与河道是否相连" prop="connectedFlag">
                      <el-select v-model="riskInsInputData.riskCheckVentureList[0].connectedFlag" type="text" placeholder="请选择..." :disabled="browseFlag">
                        <el-option value="A">不直接相连</el-option>
                        <el-option value="B">直接相连，有设置水闸</el-option>
                        <el-option value="C">直接相连，未设置水闸屋顶</el-option>
                      </el-select>
                    </el-form>
                  </el-col>
                  <el-col :span="8">
                    <el-form label="屋顶排水是否通畅" prop="unobstructedFlag">
                      <el-select v-model="riskInsInputData.riskCheckVentureList[0].unobstructedFlag" type="text" placeholder="请选择..." :disabled="browseFlag">
                        <el-option value="A">无杂物，定期清理，排水通畅</el-option>
                        <el-option value="B">有杂物，定期清理，排水通畅</el-option>
                        <el-option value="C">有杂物，未定期清理，排水堵塞</el-option>
                      </el-select>
                    </el-form>
                  </el-col>
                  <el-col :span="8">
                    <el-form label="建筑物内部地面是否有水井盖或管渠" prop="haveCanal">
                      <el-select v-model="riskInsInputData.riskCheckVentureList[0].haveCanal" type="text" placeholder="请选择..." :disabled="browseFlag">
                        <el-option value="A">无</el-option>
                        <el-option value="B">有，但建筑物地势较高，不会倒灌</el-option>
                        <el-option value="C">有，建筑物地势低，会发生倒灌</el-option>
                      </el-select>
                    </el-form>
                  </el-col>
                </el-col>
                <el-col :span="24">
                  <el-col :span="24">
                    <el-form label="厂区内有无投保资产位于低洼区域" prop="lowEquipment">
                      <el-select v-model="riskInsInputData.riskCheckVentureList[0].lowEquipment" type="text" placeholder="请选择..." :disabled="browseFlag">
                        <el-option value="A">无</el-option>
                        <el-option value="B">有，但该位置资产浸水损失风险较低</el-option>
                        <el-option value="C">有，浸水损失风险可能较高</el-option>
                      </el-select>
                    </el-form>
                  </el-col>
                </el-col>
                <el-col :span="24">
                  <div class="title" style="margin-top: 5px; margin-left: 2px">
                    <Icon type="locked"></Icon>
                    存货信息：
                  </div>
                </el-col>
                <el-col :span="24">
                  <el-col :span="8">
                    <el-col :span="22">
                      <el-form label="存放形式 " prop="stoForm">
                        <el-select v-model="riskInsInputData.riskCheckVentureList[0].stoForm" type="text" placeholder="请选择..." :disabled="browseFlag">
                          <el-option value="A">货架</el-option>
                          <el-option value="B">货架及垫仓板</el-option>
                          <el-option value="C">垫仓板</el-option>
                          <el-option value="D">直接放地面</el-option>
                        </el-select>
                      </el-form>
                    </el-col>
                    <el-col :span="1">
                      <Icon v-if="!showUpload('5.1')" type="ios-camera-outline" class="cameraicon"
                            @click.native="buttonCommonEvent('5.1')" aria-readonly="true"></Icon>
                      <Icon v-if="showUpload('5.1')" type="ios-camera" class="cameraicon"
                            @click.native="buttonCommonEvent('5.1')" aria-readonly="true"></Icon>
                    </el-col>
                  </el-col>
                  <el-col :span="8">
                    <el-form label="存放位置 " prop="stoLocation">
                      <el-select v-model="riskInsInputData.riskCheckVentureList[0].stoLocation" type="text" placeholder="请选择..." :disabled="browseFlag">
                        <el-option value="A">二楼及以上位置</el-option>
                        <el-option value="B">一楼及以上</el-option>
                        <el-option value="C">全部在一楼</el-option>
                        <el-option value="D">地下</el-option>
                      </el-select>
                    </el-form>
                  </el-col>
                  <el-col :span="8">
                    <el-form label="存货水敏性 " prop="cargoWaterSen">
                      <el-select v-model="riskInsInputData.riskCheckVentureList[0].cargoWaterSen" type="text" placeholder="请选择..." :disabled="browseFlag">
                        <el-option value="A">无影响</el-option>
                        <el-option value="B">遇水部分损失</el-option>
                        <el-option value="C">遇水全损</el-option>
                      </el-select>
                    </el-form>
                  </el-col>
                </el-col>
                <el-col :span="24">
                  <div class="title" style="margin-top: 5px; margin-left: 2px">
                    <Icon type="locked"></Icon>
                    企业防台防汛措施：
                  </div>
                </el-col>
                <el-col :span="24">
                  <el-col :span="8">
                    <el-form label="厂区雨水排放形式" prop="emiForm">
                      <el-select v-model="riskInsInputData.riskCheckVentureList[0].emiForm" type="text" placeholder="请选择..." :disabled="browseFlag">
                        <el-option value="A">纳入市政管网</el-option>
                        <el-option value="B">排入河道</el-option>
                        <el-option value="C">自然流出</el-option>
                      </el-select>
                    </el-form>
                  </el-col>
                  <el-col :span="8">
                    <el-col :span="22">
                      <el-form label="厂区防汛挡水物资" prop="conMaterials">
                        <el-select v-model="riskInsInputData.riskCheckVentureList[0].conMaterials" type="text" placeholder="请选择..." :disabled="browseFlag">
                          <el-option value="A">有充足挡水板、沙袋等</el-option>
                          <el-option value="B">有，但挡水板、沙袋不充足</el-option>
                          <el-option value="C">无</el-option>
                        </el-select>
                      </el-form>
                    </el-col>
                    <el-col :span="1">
                      <Icon v-if="!showUpload('6.2')" type="ios-camera-outline" class="cameraicon"
                            @click.native="buttonCommonEvent('6.2')" aria-readonly="true"></Icon>
                      <Icon v-if="showUpload('6.2')" type="ios-camera" class="cameraicon"
                            @click.native="buttonCommonEvent('6.2')" aria-readonly="true"></Icon>
                    </el-col>
                  </el-col>
                  <el-col :span="8">
                    <el-col :span="22">
                      <el-form label="是否设置紧急排水装备" prop="draEquipment">
                        <el-select v-model="riskInsInputData.riskCheckVentureList[0].draEquipment" type="text" placeholder="请选择..." :disabled="browseFlag">
                          <el-option value="A">有，且可正常使用</el-option>
                          <el-option value="B">有，但不能正常使用</el-option>
                          <el-option value="C">无</el-option>
                        </el-select>
                      </el-form>
                    </el-col>
                    <el-col :span="1">
                      <Icon v-if="!showUpload('6.3')" type="ios-camera-outline" class="cameraicon"
                            @click.native="buttonCommonEvent('6.3')" aria-readonly="true"></Icon>
                      <Icon v-if="showUpload('6.3')" type="ios-camera" class="cameraicon"
                            @click.native="buttonCommonEvent('6.3')" aria-readonly="true"></Icon>
                    </el-col>
                  </el-col>
                </el-col>
                <el-col :span="24">
                  <div class="title" style="margin-top: 5px; margin-left: 2px">
                    <Icon type="locked"></Icon>
                    企业防汛制度：
                  </div>
                </el-col>
                <el-col :span="24">
                  <Col :span="8">
                    <el-form label="企业有无汛期抢险救灾应急预案" prop="conPlan">
                      <el-select v-model="riskInsInputData.riskCheckVentureList[0].conPlan" type="text" placeholder="请选择..." :disabled="browseFlag">
                        <el-option value="A">是</el-option>
                        <el-option value="B">否</el-option>
                      </el-select>
                    </el-form>
                  </Col>
                  <el-col :span="8">
                    <el-form label="汛期是否实行24小时值班制度" prop="dutyFlag">
                      <el-select v-model="riskInsInputData.riskCheckVentureList[0].dutyFlag" type="text" placeholder="请选择..." :disabled="browseFlag">
                        <el-option value="A">是</el-option>
                        <el-option value="B">否</el-option>
                      </el-select>
                    </el-form>
                  </el-col>
                  <el-col :span="8">
                    <el-form label="汛期是否对重点区域进行监控" prop="monitorFlag">
                      <el-select v-model="riskInsInputData.riskCheckVentureList[0].monitorFlag" type="text" placeholder="请选择..." :disabled="browseFlag">
                        <el-option value="A">是</el-option>
                        <el-option value="B">否</el-option>
                      </el-select>
                    </el-form>
                  </el-col>
                </el-col>
                <el-col :span="24">
                  <el-col :span="8">
                    <el-form label="汛期是否有可行的紧急转移制度" prop="transferFlag">
                      <el-select v-model="riskInsInputData.riskCheckVentureList[0].transferFlag" type="text" placeholder="请选择..." :disabled="browseFlag">
                        <el-option value="A">是</el-option>
                        <el-option value="B">否</el-option>
                      </el-select>
                    </el-form>
                  </el-col>
                </el-col>

              </el-form>
            </el-col>
          </article>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
  import HeadButtonCommon from './HeadButtonCommon'
  import riskInsInputData from '@/views/riskcheck/riskInsInputData'
    export default {
      name: "RiskCheckNormalInput",
      data() {
        return {
          riskInsInputData: riskInsInputData.a()
        }
      },
    }
</script>

<style scoped>

</style>
