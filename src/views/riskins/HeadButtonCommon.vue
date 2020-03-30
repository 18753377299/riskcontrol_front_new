<template>
  <div style="padding: 15px 15px 8px;">
    <!--<h3>{{riskFileTitle}}</h3>-->
    <div style="height: 25px;">
      <div v-if="!editel-buttonState && businessType != 'browse'" style="float: right;">
        <el-tooltip confirm title="您确认暂存报告块？" @on-ok="buttonEvent('TEMPORARYSAVE')" @on-cancel="cancel">
          <el-button type="primary" icon="ios-compose-outline">暂存</el-button>
        </el-tooltip>
        <el-tooltip confirm title="您确认保存报告块？" @on-ok="buttonEvent('SAVE')" @on-cancel="cancel">
          <el-button type="primary" icon="ios-compose">保存</el-button>
        </el-tooltip>
      </div>
      <div v-if="corporateRader" style="float: right; margin-right: 5px;">
        <el-button type="primary" icon="social-codepen-outline" @click="enterpriseRadar">伝业雷达</el-button>
      </div>
      <div v-if="returnel-buttonState" style="float: right; margin-right: 5px;">
        <el-button type="primary" icon="reply" @click="buttonEvent('RETURNBEFORE')">返回</el-button>
      </div>
      <div v-if="Imageel-buttonState" style="float: right; margin-right: 5px;">
        <el-button type="primary" icon="images" @click="buttonEvent('IMAGEBUTTON')">影僝资料</el-button>
      </div>
      <div v-if="reviewedel-buttonState" style="float: right; margin-right: 5px;">
        <el-button type="primary" icon="social-codepen-outline" @click="buttonEvent('REVIEWED')">处睆</el-button>
      </div>
      <div v-if="backel-buttonState" style="float: right; margin-right: 5px;">
        <el-button type="primary" icon="social-codepen-outline" @click="buttonEvent('BACK')">打回原因</el-button>
      </div>
      <div style="float: right; margin-right: 7px;">
        <el-button v-if="editel-buttonState" @click="buttonEvent('ALTER')" icon="ios-paper" type="primary">修改</el-button>
        <el-tooltip confirm title="您确认导出风控报告块？" @on-ok="buttonEvent('IMPORT')" @on-cancel="cancel">
          <el-button v-if="!outerSystemFlag && importFlag" type="primary" icon="android-archive">导出</el-button>
        </el-tooltip>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      'riskFileTitle': {
        type: String,
        required: true
      },
      'backel-buttonState': {
        type: Boolean,
        required: false
      },
      'businessType': {
        type: String,
        required: true
      },
      'editel-buttonState': {
        type: Boolean,
        required: true
      },
      'reviewedel-buttonState': {
        type: Boolean,
        required: true
      },
      'returnel-buttonState': {
        type: Boolean,
        required: true
      },
      'outerSystemFlag': {
        type: Boolean,
        required: false
      },
      'importFlag': {
        type: Boolean,
        required: false
      },
      'Imageel-buttonState': {
        type: Boolean,
        required: false
      },
      'corporateRader': {
        type: Boolean,
        required: false
      }
    },
    methods: {
      buttonEvent: function (eventType) {
        var bizType = this.businessType
        this.$emit('button-event', eventType, bizType)
      },
      cancel: function () {
      },
      enterpriseRadar () {
        this.$emit('enterprise-radar', true)
      }
    }
  }
</script>
<style lang="scss" scoped>
/*<style lang="scss" rel="stylesheet/scss">*/
</style>
