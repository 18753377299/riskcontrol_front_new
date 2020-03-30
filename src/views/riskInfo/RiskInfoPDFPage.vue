<template>
  <div class="pdfbox">
    <div class="returnbox" v-if="pageFlag">
      <el-button type="primary" icon="reply" @click="returnBefore" class="return-buttton">返回</el-button>
    </div>
    <br>
    <div>
      <iframe :height="height" :width="width" :src="url" style="border: none;"></iframe>
    </div>
  </div>
</template>

<script>
    export default {
      name: "PDF",
      props: {
        srcUrl: {
          type: String,
          default: ''
        },
        isHideFooter: {
          type: Boolean,
          default: true
        },
        height: {
          type: String,
          default: '700px'
        },
        width: {
          type: String,
          default: '100%'
        }
      },
      data() {
        return {
          url: 'http://10.10.2.241:5001/static/pdf/viewer.html?',
          srcUrlMe: '',
          pageFlag: '',
          myData: '',
          returnFlag: true
        }
      },
      created() {
        this.srcUrlMe = this.$route.query.srcUrlMe
        this.url = 'http://10.10.2.241:5001/static/pdf/viewer.html?' + this.srcUrlMe
        this.pageFlag = this.$route.query.flag
        this.myData = this.$route.query.myData
      },
      watch: {
        srcUrl: function setUrl (val) {
          this.returnFlag = false
          this.url = 'http://10.10.2.241:5001/static/pdf/viewer.html?' + val
        }
      },
      methods: {
        returnBefore () {
            if (this.pageFlag === 'riskInfoClaimQuery') {
              this.$router.push({ path: '/riskInfo_claimQuery' })
            } else if (this.pageFlag === 'riskInfoFileQuery') {
              this.$router.push({ path: '/riskInfo_fileQuery' })
            } else if (this.pageFlag === 'riskclaim') {
              this.$router.push({ path: '/riskinfo_ClaimQueryDetail', query: { serialNo: this.myData.serialNo, editModel: this.$route.query.editModel, modifyFlag: this.$route.query.showFlag } })
            } else if (this.pageFlag === 'riskfile') {
              this.$router.push({ path: '/riskinfo_fileQueryDetail', query: { serialNo: this.myData.serialNo, editModel: this.$route.query.editModel, modifyFlag: this.$route.query.showFlag } })
            }
          }
      }

    }
</script>

<style lang="scss" scoped>
  .return-buttton {
    float: right
  }
  .pdfbox{
    height: auto;
  }
  .returnbox{
    height: 32px;
  }
</style>
