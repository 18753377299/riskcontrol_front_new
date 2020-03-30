<template>
  <div class="fileupload-main">
    <el-upload
      class="upload-demo"
      ref="upload"
      action="https://jsonplaceholder.typicode.com/posts/"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :file-list="fileList"
      :auto-upload="false">
      <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
      <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
      <el-button size="small" type="primary" @click="transferFileSystem">调用影像系统</el-button>
      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload>
  </div>
</template>

<script>
  import {fileUploadUrl} from "@/utils/common-const"

  export default {
    name: "FileUpload",
    data() {
      return {
        fileList: [{
          name: 'food.jpeg',
          url: 'http://10.10.2.241:5001/riskcontrol_file/HeadPortrait/A0000115333077520191203.jpg'
        }]

      }
    },
    methods: {
      submitUpload() {
        this.$refs.upload.submit()
      },
      handleRemove(file, fileList) {
        console.log(file, fileList)
      },
      handlePreview(file) {
        console.log(file)
      },
      transferFileSystem() {
        let userInfo = this.$store.getters.userInfo
        //基础入参
        let obj = {
          baseData: {
            appType: 'riskcontrol',
            opId: userInfo.userCode,
            opUser: userInfo.username,
            orgNum: userInfo.comCode
          },
          metaDataList: [
            {
              appCode: 'riskcontrol',
              busiNum: 'RX001'
            }
          ]
        }
        let url = `${fileUploadUrl}${JSON.stringify(obj)}`
        window.open(url, '_blank')
      }
    }
  }
</script>

<style scoped lang="scss">
  .fileupload-main {
    padding: 24px;
  }
</style>
