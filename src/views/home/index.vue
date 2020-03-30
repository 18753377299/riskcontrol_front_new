<template>
  <div style="height:100%">
    <div class="home_box">
      <div class="home_box_content">
        <el-row>
          <!--     欢迎语     -->
          <el-col :span="24">
            <el-card style="min-height: 166px; border: none; margin: 16px;" class="welcome">
              <div class="welcome-wrapper">
                <h2 style="margin-bottom: 20px; font-size: 20px;color: #292B34;">您好！欢迎使用{{ projectName }}系统</h2>
                <p style="margin-bottom: 5px; color: #6A6B74;font-size: 14px;">当前版本：1.0.0.0</p>
                <p style="color: #6A6B74;font-size: 14px;">版权所有·2020·中国人民财产保险股份有限公司</p>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>

</template>

<script>
  import settings from '@/settings'

  export default {

    components: {},
    data() {
      return {
        projectName: ''
      }
    },
    created() {
      this.projectName = settings.title
    }
  }
</script>

<style lang="scss" scoped>
  .app_style .fond_style {
    color: #F05B50;
    font-size: 30px;
  }

  .app_style2 .fond_style {
    color: #4152e0;
    font-size: 30px;
  }

  .chuli {
    position: absolute;
    bottom: -15px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 32px;
    line-height: 8px;
  }

  .renwuWrap {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 200px;

    .renwuInfo {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      border: 1px dashed #8C8C8C;
      border-radius: 4px;
      height: 162px;
      width: 420px;
    }
  }

  .renwu-SH {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    height: 40%;
    border-right: 1px solid #8C8C8C;
  }

  .renwu-BM {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    height: 100%;
  }

  .wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 220px;
  }

  .appwrap {
    display: flex;
    justify-content: center;
  }

  .app {
    height: 90px;
    width: 90px;
    border: 1px dashed #8C8C8C;
    border-radius: 4px;
    margin: 0px 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }

  .title {
    font-size: 16px;
    height: 32px;
    line-height: 20px;
    text-align: left;
    /* border-bottom: 1px solid #e5e5e5; */
    margin-bottom: 37px;
    padding-left: 4px;
    position: relative;
  }

  .more {
    position: absolute;
    right: 0;
    cursor: pointer;
  }

  .home_box_content .ivu-card {
    border-radius: 2px;
    margin: 5px;
  }

  .welcome {
    display: flex;
    align-items: center;
    height: 210.4px;
    background-image: url("../../assets/images/xxbg.png");
    background-position: right 124px;
    background-repeat: no-repeat;
    /* background-position: bottom right; */
    .welcome-wrapper {
      margin-left: 20px;
    }
  }
</style>
