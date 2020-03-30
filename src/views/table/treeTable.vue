<template>
  <div class="entry">
    <el-card style="margin-bottom: 6px;">
      <div class="card-title">
        <span class="vertical-line"></span>
        <span style="color:#1e1e1e">查询条件</span>
        <!-- <el-button type="text" class="card-title-add" @click="add"><i class="el-icon-circle-plus-outline" />新增</el-button> -->
        <el-button type="text" class="card-title-add" @click="returnBack"><i class="el-icon-back" />返回</el-button>
      </div>

      <div class="card-cont">
        <el-row>
          <el-col :span="12">
            <el-col :span="8" class="justify-right search-label" style="text-align:right;"><span>归属险种分类代码/名称：</span></el-col>
            <el-col :span="16" class="justify-left">
              <ModalSelect ref="clasCode" title="归属险类" type="classCode"></ModalSelect>
            </el-col>
          </el-col>
          <el-col :span="12">
            <el-col :span="8" class="justify-right search-label" style="text-align:right;"><span>有效标志：</span></el-col>
            <el-col :span="16" class="justify-left">
              <el-select v-model="search.validStatus" style="width:100%">
                <el-option label="全部" :value="'2'"></el-option>
                <el-option label="有效" :value="'1'"></el-option>
                <el-option label="无效" :value="'0'"></el-option>
              </el-select>
            </el-col>
          </el-col>
        </el-row>
        <el-row style="margin-top: 20px;">
          <el-col :span="12">
            <el-col :span="8" class="justify-right search-label" style="text-align:right;"><span>产品代码/名称：</span></el-col>
            <el-col :span="16" class="justify-left">
              <ModalSelect ref="riskCode" title="产品" type="RiskCode" :additional-condtion="[{label: 'riskAttribute', value: riskAttribute}]"></ModalSelect>
            </el-col>
          </el-col>
        </el-row>
        <el-row class="card-footer" style="text-align: center;margin-top:20px;">
          <el-button type="warning" class="myBtn ivu-btn  ivu-btn-small btn_org" @click="reset">重置</el-button>
          <el-button type="primary" class="myBtn myBtn-primary ivu-btn ivu-btn-primary ivu-btn-small" @click="handleSearch()">查询</el-button>
          <el-button v-show="searchFlag" type="primary" class="btn-export" @click="exportExcel(resultData)">Excel导出</el-button>
        </el-row>
      </div>
    </el-card>

    <!--查询结果-->
    <el-card v-show="searchFlag">
      <div class="card-title">
        <span class="vertical-line"></span>
        <span style="color:#1e1e1e">查询结果</span>
      </div>
      <div class="card-cont">
        <el-table :data="resultData" border @row-dblclick="browse">
          <el-table-column type="index" label="序号" width="100" align="center" />
          <el-table-column
            prop="classCode"
            label="险种分类代码"
            align="center"
            width="110"
          />
          <el-table-column
            prop="classCName"
            label="险种分类名称"
            align="center"
            min-width="130"
          />
          <el-table-column
            prop="riskCode"
            label="产品代码"
            align="center"
            min-width="130"
          />
          <el-table-column
            prop="riskCName"
            label="产品中文名称"
            align="center"
            min-width="130"
          />
          <el-table-column
            prop="validDate"
            label="生效日期"
            align="center"
            min-width="100"
          />
          <el-table-column
            prop="validStatus"
            label="有效标志"
            :formatter="formatterValidStatus"
            align="center"
            min-width="100"
          />
          <el-table-column
            prop="auditFlag"
            label="审核状态"
            :formatter="formatter_auditFlag"
            align="center"
            min-width="100"
          />
          <el-table-column
            label="同步"
            align="center"
            min-width="100"
          > <template slot-scope="scope">
            <span v-if="scope.row.synFlag !=='1'">未同步</span>
            <span v-if="scope.row.synFlag === '1'">已同步</span>
          </template>
          </el-table-column>
          <el-table-column
            label="操作"
            fixed="right"
            align="center"
            min-width="180"
          >
            <template slot-scope="scope">
              <el-button
                v-show="scope.row.validStatus==='1'"
                size="mini"
                type="text"
                @click="edit(scope.row)"
              >修改</el-button>
              <el-button
                v-show="scope.row.validStatus==='0'"
                size="mini"
                type="text"
                @click="recover(scope.row)"
              >启用</el-button>
              <el-button
                v-show="scope.row.validStatus==='1'"
                size="mini"
                type="text"
                @click="disCover(scope.row)"
              >注销</el-button>
              <el-button
                v-show="scope.row.validStatus==='0'"
                size="mini"
                type="text"
              >已注销</el-button>
              <el-button
                size="mini"
                type="text"
                @click="copy(scope.row)"
              >复制</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="page-box">
          <el-pagination
            style="text-align: center;"
            :current-page="page.pageNo"
            :page-size="page.pageSize"
            :total="page.total"
            :page-sizes="[5,10,20]"
            layout="total, sizes, prev, pager, next, jumper"
            @size-change="changePageSize"
            @current-change="changePage"
          />
        </div>
      </div>
    </el-card>
    <el-dialog title="特别约定相关信息修改" footer-hide width="1200" :visible.sync="dialogFormEngages" :append-to-body="true">
      <el-form ref="EngagesData" :model="EngagesData" :rules="EngagesFormRules" label-width="120px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="特别约定代码">
              <ModalSelectForAdd ref="engageSelect" title="特别约定代码及名称" type="PLAN_ENGAGE_CLAUSE" :disable="actionType ==='browse'" :additional-condtion="[{label: 'classCode', value: particularForm.classCode }, {label: 'planCode', value: particularForm.planCode }, {label: 'additionalCondtion', value: 0}]" @handleComplted="(e, row) =>handlePlanEngage(e, row)"  @changeCode="(e, name, row) => handlePlanEngage_change(e, name, row)"></ModalSelectForAdd>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="特别约定名称">
              <el-input :value="EngagesData.engageCName" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="特别约定内容">
              <el-input v-model="EngagesData.engageDesc" type="textarea" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="card-footer" style="text-align: center;margin-top:20px;">
          <el-button type="primary" class="myBtn myBtn-primary ivu-btn ivu-btn-primary ivu-btn-small" @click="saveEngagesForm">确定</el-button>
          <el-button type="warning" class="myBtn ivu-btn  ivu-btn-small btn_org" @click="cancelEngages">取消
          </el-button>
        </el-row>
      </el-form>
    </el-dialog>
  </div>
</template>