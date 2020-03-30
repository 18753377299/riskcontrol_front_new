<template>
  <div>
    <el-col>
      <div class="searchClass">
        <span>专家资源库搜索</span>
      </div>
    </el-col>
    <el-card class="cardclass">
      <el-row class="card-height">
<!--        <el-col>
          <div class="title">
            <el-icon type="document-text"></el-icon>
            专业风控模板
          </div>
        </el-col>-->
        <!--<Card class="card-nav">-->
        <div >
          <div class="menu">
            <el-form :model="formItem" label-width="140px">
              <el-row>
                <el-col :span="12">
                  <el-form-item label="行业类型：">
                    <el-select v-model="select" style="width:100%" :placement="'bottom'" filterable  @change="getID" ><!--@on-change="changeMenuItem"-->
                      <el-option-group v-for="(model,index) in childModels" :key="index" :label="model.nodeCName" :name="index" >
                        <el-option v-for="(child,index1) in model.childModel" :name="child.url" :key="child.url" :value="child.url" :label="child.nodeCName">{{ child.nodeCName }}</el-option>
                      </el-option-group>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
        </div>
        <div data-v-4d980865 class="ant-divider"></div>
        <div class="card-height2">
          <div v-show="hide" class="pdf-hide">
            <PDF :srcUrl="url"></PDF>
          </div>
        </div>
        <!--</Card>-->
      </el-row>
    </el-card>
  </div>
</template>
<script>
  import { list } from '@/api/riskInfo'
  import PDF from './RiskInfoPDFPage.vue'
  export default {
    data () {
      return {
        formItem: {},
        select: '',
        hide: false,
        jsonData: '',
        url: '',
        childModels: [],
        childModel: []
      }
    },
    components: { PDF },
    created () {
      // Vue对象的data数据
      list().then((res) => {
        this.jsonData = res
        var obj = JSON.parse(this.jsonData)
        this.childModels = obj
      })
    },
    methods: {
      getID (val) {
        this.url = val
        this.hide = true
      }
    }
  }

</script>

<style scoped lang="scss">
  .title{
    margin: -16px -15px 16px;
    padding: 0 12px;
    font-size: 14px;
    line-height: 36px;
    background-color: #fafdff;
  }
  .card-height{
    height: calc(100vh - 126px);
    .ivu-card-body{
      height: 100%;
      .ivu-row{
        height: calc(100% - 32px);
      }
    }
  }
  .card-height2{
    height: calc(100% - 59px);
    overflow: hidden;
    .pdf-hide{
      width: 100%;
      height: 100%;
    }
  }
  .menu {
    padding: 0 16px;
    .ivu-form-item {
      margin-top: 10px;
      margin-bottom: 10px;
    }
  }
  .searchClass{
    width: 100%;
    height: 52px;
    line-height: 52px;
    text-align: left;
    padding-left: 10px;
    font-weight: 600;
  }
  .ant-divider {
    display: block;
    height: 1px;
    width: 100%;
    margin: 12px 0;
    margin-bottom: 12px;
    background-color: #e8e8e8;
  }
  .card-nav{
    height: 100%;
  }
  .cardclass{
    width:100%;
    height:100%;
    border-radius:4px;
    border:1px solid rgba(205,205,205,1);
    font-size: 14px;
  }
  .el-select-dropdown__list {
    width: 400px;
  }
</style>

