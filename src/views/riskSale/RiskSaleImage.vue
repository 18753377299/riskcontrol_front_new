<template>
  <div style="padding: 10px;">
    <div>
      <div class="title">
        <Icon type="images"></Icon>
        图片信息
      </div>
      <el-card>
        <el-form class="form1" :label-width="120">
          <el-row>
            <el-col span="24" style="padding:16px;">
              <div class="" style="width: 100%;height: calc(100vh - 224px);margin-bottom: 5px">
                <div class="ivu-card-heightImage2">
                  <div :style="{background: '#fff', borderBottom: '1px solid #e3e8ee', paddingTop: '8px'}">
                    <el-form :label-width="100">
                      <el-form-item label="选择图片类型" style="margin-bottom: 8px">
                        <el-col span="8">
                          <el-select v-model="saleImage" style="width:250px" @on-change="getSaleData">
                            <el-option-group label="建筑物">
                              <el-option v-for="(saleImage, index) in imageTypeOne" :key="index" :value="saleImage"
                                         :name="index">{{saleImage}}
                              </el-option>
                            </el-option-group>
                            <el-option-group label="占用性质">
                              <el-option v-for="(saleImage, index) in imageTypeTwo" :key="index" :value="saleImage"
                                         :name="index">{{saleImage}}
                              </el-option>
                            </el-option-group>
                            <el-option-group label="保护设施">
                              <el-option v-for="(saleImage, index) in imageTypeThree" :key="index" :value="saleImage"
                                         :name="index">{{saleImage}}
                              </el-option>
                            </el-option-group>
                            <el-option-group label="环境风险">
                              <el-option v-for="(saleImage, index) in imageTypeFour" :key="index" :value="saleImage"
                                         :name="index">{{saleImage}}
                              </el-option>
                            </el-option-group>
                            <el-option-group label="管理">
                              <el-option v-for="(saleImage, index) in imageTypeFive" :key="index" :value="saleImage"
                                         :name="index">{{saleImage}}
                              </el-option>
                            </el-option-group>
                          </el-select>
                        </el-col>
                        <el-col span="13">
                          <div>
                            <div v-show="!saleImageFlag && riskInsSaleData.checkUpFlag === '待办'" style="float: right;">
                              <el-button type="primary" icon="checkmark-round" @click="imagePass()">审核通过</el-button>
                            </div>
                            <div v-if="this.$route.query.ufinishFlag !== 'ufinishFlag'"
                                 style="float: right; margin-right: 10px;">
                              <el-button type="primary" icon="reply" @click.native="preparedSaleMain()">返回</el-button>
                            </div>
                          </div>
                        </el-col>
                      </el-form-item>
                    </el-form>
                  </div>
                  <div class="vuePictureViewer">
                    <el-col span="18" style="height: 100%;border-right:1px solid #e9e9e9;padding: 0;">
                      <el-carousel class="carousel" v-model="index"
                                   :autoplay="setting.autoplay"
                                   :autoplay-speed="setting.autoplaySpeed"
                                   :dots="setting.dots"
                                   :radius-dot="setting.radiusDot"
                                   :trigger="setting.trigger"
                                   :arrow="setting.arrow" @on-change="pieviewImage">
                        <el-carousel-item
                          v-for="(riskReportSaleImage,index) in riskReportSaleImageType.riskReportSaleImageList"
                          :key="index" :name="index" style="height: 100%;">
                          <div v-if="ImageNum===index&&gainRiskReportSaleImage(riskReportSaleImage)"></div>
                          <div v-if="riskReportSaleImage.stateFlag === '2'"
                               style="width: 100%;height: 100%;position: relative;">
                            <div style="width: 100%;height: 100%;"
                                 v-if="riskReportSaleImage.stateFlag === '2'">
                              <div style="width: 50%;height: calc(100% - 0px);float: left;position: relative;">
                                <div class="mask-layer-imgbox auto-img-center"
                                     style="width: 100%;height: calc(100% - 39px);overflow: hidden;float: left;">
                                  <p @mousedown="move($event)" @mouseup="stopmove($event)">
                                    <img :src="riskReportSaleCorrection.urlBefore"
                                         @load="imageOnload()" v-show="imageShowFlag"
                                         style="width: auto;height: auto;max-width: 100%;max-height: 100%;"
                                         alt="" ref="myimg">
                                    <Spin fix v-show="!imageShowFlag && isIEFlag">
                                      <Icon type="load-c" size="36"
                                            class="demo-spin-icon-load"></Icon>
                                      <br/>
                                      Loading
                                    </Spin>
                                    <img :src="require('@/assets/svg/loading.svg')"
                                         v-show="!imageShowFlag && !isIEFlag"
                                         style="width: auto;height: auto;max-width: 100%;max-height: 100%;">
                                  </p>
                                </div>
                                <div class="buttongroup">
                                  <div class="buttongroup-wrap" v-if="showFlag">
                                    <ul class="buttongroup1">
                                      <li><a href="javascript:;" @click="maskout()">放大
                                        <i class="el-icon-plus"></i>
                                      </a></li>
                                      <li>|</li>
                                      <li><a href="javascript:;" @click="roatate()">旋转
                                        <!--<Icon type="loop"></Icon>-->
                                        <i class="el-icon-refresh"></i>
                                      </a></li>
                                      <li>|</li>
                                      <li><a href="javascript:;" @click="resetting()">还原
                                        <!--<Icon type="refresh"></Icon>-->
                                        <i class="el-icon-refresh-right"></i>
                                      </a></li>
                                      <li>|</li>
                                      <li><a href="javascript:;" @click="maskin()">缩小
                                        <!--<Icon type="minus-round"></Icon>-->
                                        <i class="el-icon-minus"></i>
                                      </a></li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                              <div style="width: 50%;height: calc(100% - 0px);float: left;position: relative;">
                                <div class="mask-layer-imgboxT auto-img-center"
                                     style="width: 100%;height: calc(100% - 39px);overflow: hidden;float: left;">
                                  <!--v-show="riskReportSaleImage.urlAfter !== ''"-->
                                  <p @mousedown="move($event)" @mouseup="stopmove($event)">
                                    <img :src="riskReportSaleCorrection.urlBehind"
                                         @load="imageOnload()" v-show="imageShowFlag"
                                         style="vertical-align:middle;width: auto;height: auto;max-width: 100%;max-height: 100%;"
                                         alt="" ref="myimg">
                                    <Spin fix v-show="!imageShowFlag && isIEFlag">
                                      <Icon type="load-c" size=36
                                      class="demo-spin-icon-load"></Icon>
                                      <br/>
                                      Loading
                                    </Spin>
                                    <img :src="require('@/assets/svg/loading.svg')"
                                         v-show="!imageShowFlag && !isIEFlag"
                                         style="width: auto;height: auto;max-width: 100%;max-height: 100%;">
                                  </p>
                                </div>
                                <div class="buttongroup">
                                  <div class="buttongroup-wrap" v-if="showFlag">
                                    <ul class="buttongroup1">
                                      <li><a href="javascript:;" @click="maskoutT()">放大
                                        <Icon type="plus-round"></Icon>
                                      </a></li>
                                      <li>|</li>
                                      <li><a href="javascript:;" @click="roatateT()">旋转
                                        <Icon type="loop"></Icon>
                                      </a></li>
                                      <li>|</li>
                                      <li><a href="javascript:;" @click="resettingT()">还原
                                        <Icon type="refresh"></Icon>
                                      </a></li>
                                      <li>|</li>
                                      <li><a href="javascript:;" @click="maskinT()">缩小
                                        <Icon type="minus-round"></Icon>
                                      </a></li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div v-else-if="riskReportSaleImage.stateFlag !== '2'"
                               style="width: 100%;height: calc(100% - 10px);position: relative;">
                            <div class="mask-layer-imgbox auto-img-center"
                                 style="width: 100%;height: calc(100% - 29px);overflow: hidden">
                              <p @mousedown="move($event)" @mouseup="stopmove($event)">
                                <img
                                  v-show="imageShowFlag"
                                  :src="riskReportSaleImage.urlName" @load="imageOnload()"
                                  style="width: auto;height: auto;max-width: 100%;max-height: 100%;"
                                  alt="" ref="myimg">
                                <Spin fix v-show="!imageShowFlag && isIEFlag">
                                  <Icon type="load-c" size=36  class="demo-spin-icon-load"></Icon>
                                  <br/>
                                  Loading
                                </Spin>
                                <img v-show="!imageShowFlag && !isIEFlag"
                                     :src="require('@/assets/svg/loading.svg')"
                                     style="width: auto;height: auto;max-width: 100%;max-height: 100%;">
                              </p>
                            </div>
                            <div class="buttongroup">
                              <div v-if="showFlag" class="buttongroup-wrap">
                                <ul class="buttongroup1">
                                  <li><a href="javascript:;" @click="maskout($event)">放大
                                    <Icon type="plus-round"></Icon>
                                  </a></li>
                                  <li>|</li>
                                  <li><a href="javascript:;" @click="roatate($event)">旋转
                                    <Icon type="loop"></Icon>
                                  </a></li>
                                  <li>|</li>
                                  <li><a href="javascript:;" @click="resetting($event)">还原
                                    <Icon type="refresh"></Icon>
                                  </a></li>
                                  <li>|</li>
                                  <li><a href="javascript:;" @click="maskin($event)">缩小
                                    <Icon type="minus-round"></Icon>
                                  </a></li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </el-carousel-item>
                      </el-carousel>
                      <div class="vuePictureViewerImg" style="border-top: 1px solid #e3e3e3;overflow-x: auto">
                        <div class="vuePictureViewerImg-wrap">
                          <div v-for="(riskReportSaleImage,index) in riskReportSaleImageType.riskReportSaleImageList"
                               :key="index" :name="index" :class="ImageNum === index ? 'active' : ''"
                               class="vuePictureViewerImg-nav"
                               @click="open(index)">
                            <img v-show="imageShowFlag" class="imgSmall"
                                 :src="riskReportSaleImage.urlName"
                                 @load="imageOnload()">
                            <Spin v-show="!imageShowFlag && isIEFlag" fix>
                              <Icon type="load-c" size="18" class="demo-spin-icon-load"></Icon>
                            </Spin>
                            <img v-show="!imageShowFlag && !isIEFlag"
                                 :src="require('@/assets/svg/loading.svg')"
                                 class="imgSmall"
                                 style="width: auto;height: auto;max-width: 100%;max-height: 100%;">
                          </div>

                        </div>
                      </div>
                    </el-col>
                    <el-col span="6" style="background-color: #f6f6f6;padding: 16px;overflow: auto;"
                            :class="['resetgroup', riskReportSaleImage.stateFlag !== '' ? 'showClass' : '']">
                      <el-form class="form1" :label-width="110">
                        <el-row>
                          <el-col span="24" style="text-align: left;font-size: 12px;"><span
                            style="display: inline-block;width: 110px;">照片档案号：</span>{{riskInsSaleData.archivesNo}}
                          </el-col>
                          <el-col span="24" style="text-align: left;font-size: 12px;"><span
                            style="display: inline-block;width: 110px;">企业名称：</span>{{riskInsSaleData.companyName}}
                          </el-col>
                          <el-col span="24" style="text-align: left;font-size: 12px;"><span
                            style="display: inline-block;width: 110px;">查勘地址：</span>{{riskInsSaleData.exploreAddress}}
                          </el-col>
                          <el-col span="24" style="text-align: left;font-size: 12px;"><span
                            style="display: inline-block;width: 110px;">查勘人：</span>{{riskInsSaleData.explorer}}
                          </el-col>
                          <el-col span="24" style="text-align: left;font-size: 12px;"><span
                            style="display: inline-block;width: 110px;">审核人：</span>{{riskInsSaleData.checkUpCode}}
                          </el-col>
                          <el-col span="24" style="text-align: left;font-size: 12px;"><span
                            style="display: inline-block;width: 110px;">查勘机构：</span>{{riskInsSaleData.exploreComcode}}
                          </el-col>
                          <el-col span="24" style="text-align: left;font-size: 12px;"><span
                            style="display: inline-block;width: 110px;">查勘日期：</span>{{riskInsSaleData.exploreDate}}
                          </el-col>
                          <el-col span="24" style="text-align: left;font-size: 12px;"><span
                            style="display: inline-block;width: 110px;">审核状态：</span>{{riskInsSaleData.checkUpFlag}}
                          </el-col>
                          <el-col span="24" style="text-align: left;font-size: 12px;"><span
                            style="display: inline-block;width: 110px;">照片数量：</span>{{riskReportSaleImageType.imageSum}}
                          </el-col>
                          <el-col span="23" style="text-align: left;font-size: 12px;"><span
                            style="display: inline-block;width: 110px;">存在风险照片数量：</span>{{riskReportSaleImageType.imageRepulseSum}}
                          </el-col>
                          <el-col span="24" style="text-align: left;font-size: 12px;"><span
                            style="display: inline-block;width: 110px;">备注：</span>{{riskReportSaleImageType.remark}}
                          </el-col>
                          <el-col span="24" style="text-align: left;font-size: 12px;"><span
                            style="display: inline-block;width: 110px;">照片备注：</span>{{riskReportSaleImage.remark}}
                          </el-col>

                        </el-row>
                      </el-form>
                    </el-col>
                    <!--照片信息--> <!--v-if="riskReportSaleImage.stateFlag === '0'"-->
                    <el-col span="6" class="resetgroup resetgroup2"
                            style="background-color: #d8d8d8;height: 50%;padding: 16px;overflow: auto;">
                      <el-form class="form2" :label-width="75">
                        <el-col span="24" style="text-align: left;margin-bottom: 10px;">
                          <h2>照片信息</h2>
                        </el-col>
                        <el-col span="24">
                          <el-form-item label="打回原因：">
                            <el-select v-model="riskReportSaleImage.repulseReason" :disabled="saleImageFlag"
                                       @on-change="changeRepulseReason">
                              <el-option value="1">影像不清晰</el-option>
                              <el-option value="2">存在风险</el-option>
                            </el-select>
                          </el-form-item>
                        </el-col>
                        <el-col v-if="riskReportSaleImage.repulseReason == '2'" span="24">
                          <el-form-item label="风险类型：">
                            <el-select v-model="riskReportSaleImage.riskType">
                              <el-option value="01">火灾</el-option>
                              <el-option value="02">水灾</el-option>
                              <el-option value="03">风灾</el-option>
                              <el-option value="04">雷灾</el-option>
                              <el-option value="05">雪灾</el-option>
                              <el-option value="06">盗抢</el-option>
                            </el-select>
                          </el-form-item>
                        </el-col>
                        <el-col v-if="riskReportSaleImage.repulseReason == '2'" span="24">
                          <el-form-item label="整改意见：">
                            <textarea v-model="riskReportSaleImage.riskSuggest" style="width: 100%;"></textarea>
                          </el-form-item>
                        </el-col>
                        <el-col v-show="!saleImageFlag" :md="24" :lg="24"
                                style="padding:5px;padding-left:10px;text-align: center;">
                          <el-button type="primary" size="small" icon="close-round" @click="openSave">图片打回</el-button>
                          <el-button type="primary" size="small" icon="clipboard"
                                     @click="queryRiskSuggest(riskReportSaleImage)">整改历史
                          </el-button>
                        </el-col>
                      </el-form>
                    </el-col>
                    <!--打回图片详细信息-->
                    <el-col span="6" style="background-color: #d8d8d8;height: 50%;padding: 16px;overflow: auto;"
                            class="resetgroup resetgroup2"><!-- v-else-if="riskReportSaleImage.stateFlag !== '0'"-->
                      <el-form class="form3" :label-width="110">
                        <el-col span="24" style="text-align: left;margin-bottom: 10px">
                          <h2>打回图片详细信息</h2>
                        </el-col>
                        <el-col
                          v-if="riskReportSaleCorrection && riskReportSaleCorrection.riskType !== null && riskReportSaleCorrection.riskType.trim() !== ''"
                          span="24" style="text-align: left;font-size: 12px;">
                          <span style="display: inline-block;width: 110px;">风险类型：</span>
                          <span v-if="riskReportSaleCorrection.riskType === '01'">火灾</span>
                          <span v-if="riskReportSaleCorrection.riskType === '02'">水灾</span>
                          <span v-if="riskReportSaleCorrection.riskType === '03'">风灾</span>
                          <span v-if="riskReportSaleCorrection.riskType === '04'">雷灾</span>
                          <span v-if="riskReportSaleCorrection.riskType === '05'">雪灾</span>
                          <span v-if="riskReportSaleCorrection.riskType === '06'">盗抢</span>
                        </el-col>
                        <el-col span="24" style="text-align: left;font-size: 12px;">
                          <span style="display: inline-block;width: 110px;">整改意见：</span>
                          {{riskReportSaleCorrection.content}}
                        </el-col>
                        <el-col span="24" style="text-align: left;font-size: 12px;">
                          <span style="display: inline-block;width: 110px;">提交人员：</span>
                          {{riskReportSaleCorrection.operateCode}}
                        </el-col>
                        <el-col span="24" style="text-align: left;font-size: 12px;">
                          <span style="display: inline-block;width: 110px;">提交日期：</span>
                          {{riskReportSaleCorrection.submitDate}}
                        </el-col>
                        <el-col :md="24" :lg="24" style="padding:5px;padding-left:0px;text-align: center;">
                          <el-button type="primary" size="small" icon="clipboard"
                                     @click="queryRiskSuggest(riskReportSaleImage)">整改历史
                          </el-button>
                          <el-button v-if="riskReportSaleImage.stateFlag === '2' && !saleImageFlag" type="primary"
                                     size="small" icon="help" @click="haveChange()">整改确认
                          </el-button>
                        </el-col>
                      </el-form>
                    </el-col>
                  </div>
                </div>
              </div>
            </el-col>
          </el-row>


        </el-form>
      </el-card>
    </div>

  </div>
</template>
<script>
  import riskInsSaleData from '@/views/riskdata/riskInsSaleData'

  export default {
    name: "RiskSaleImage",
    data() {
      return {
        saleImageFlag: true,
        imageShowFlag: false,
        isIEFlag: false,
        riskInsSaleData: riskInsSaleData.a(),
        riskReportSaleImage: {
          repulseReason: '',
          riskType: '',
          riskSuggest: '',
          stateFlag: '2',
          remark: '',
          feedbackFlag: '',
          riskReportSaleCorrectionList: {
            id: {
              archivesNo: '',
              serialNo: '',
              imageName: '',
              imageType: ''
            },
            title: '',
            operateCode: '',
            submitDate: '',
            content: '',
            feedbackFlag: '',
            feedbackConfirm: '',
            correctionFlag: '',
            urlBefore: '',
            urlBehind: ''
          },
        },
        riskReportSaleImageType: '',
        riskReportSaleCorrection: '',
        ModalConfig: {
          modalFlag: false
        },
        setting: {
          autoplay: false,
          autoplaySpeed: 2000,
          dots: 'none',
          radiusDot: false,
          trigger: 'click',
          arrow: 'hover'
        },
      }
    },
    methods: {
      // 整改历史
      queryRiskSuggest(val) {
        // 是否取消滚动条
        this.ModalConfig.fixedHeader = false
        // 展示modal标志
        this.ModalConfig.modalFlag = true
        // 查询关键字
        this.ModalConfig.riskReportSaleImage = val
        // 接口地址
        this.ModalConfig.requestURL = '/risksale/riskSuggestQuery'
      },
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  .buttongroup {
    width: 100%;
    height: 24px;
    margin-top: 5px;
    border-top: 1px solid #dfdfdf;
    border-right: 1px solid #dfdfdf;
    text-align: center;
    position: absolute;
    bottom: 0;
    left: 0;
    .buttongroup-wrap {
      width: 100%;
      height: 100%;
      position: relative;
      .buttongroup1 {
        width: 224px;
        height: auto;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        li {
          width: auto;
          height: 100%;
          float: left;
          overflow: hidden;
          &:hover {
            background-color: #e3e3e3;
          }
          a {
            display: inline-block;
            width: auto;
            height: 100%;
            margin: 0 10px;
            font-size: 12px;
            color: #666666;
            line-height: 100%;
          }
        }
      }
    }
  }

  .ivu-card-heightImage2 {
    height: 100%;
    overflow: auto;
    border: 1px solid #e3e8ee;
    .ivu-card-body {
      height: 100%;
      padding: 0;
    }
  }

</style>
