<template>
  <div>
    <el-col>
      <div class="searchClass">
        <el-icon type="document-text"></el-icon>
        个人信息
      </div>
    </el-col>
    <div style="padding: 10px;">
      <el-card class="cardclass">
        <el-row type="flex">
          <el-col style="text-align: right">
            <el-button type="primary" icon="reply" size = "large" @click.native="preparedExpert()">返回</el-button>
          </el-col>
        </el-row>
        <br>
        <br>
        <el-row type="flex" justify="center">
          <el-col :span="6">
            <div style="text-align: center">
              <el-image :src="riskInfoExpertDetailVo.url" width="150px" height="150px" style="margin: 0 auto" />
              <h2 style="text-align: center;">{{riskInfoExpertDetailVo.expertName}}</h2>
              <div v-if="riskInfoExpertDetailVo.score!=0">
                <h3 style="text-align: center;" >{{riskInfoExpertDetailVo.score}}分</h3>
              </div>
              <div v-else>
                <h3 style="text-align: center;" >未评分</h3>
              </div>
            </div>
          </el-col>
          <el-col :span="14" :push ="1" style="text-align: left;">
            <el-col :span="24">
              <h4 class="hClass">学历：{{riskInfoExpertDetailVo.education}}</h4>
            </el-col>
            <el-col :span="24">
              <h4 class="hClass">邮箱：{{riskInfoExpertDetailVo.mailAddr}}</h4>
            </el-col>
            <el-col :span="24">
              <h4 class="hClass">联系电话：{{riskInfoExpertDetailVo.phoneNumber}}</h4>
            </el-col>
            <el-col :span="24">
              <h4 class="hClass">所属机构：<a data-toggle="collapse" class="ascription" v-on:click="instance">{{riskInfoExpertDetailVo.ascName}}</a></h4>
              <el-dialog :visible.sync="modalIntroduce" width="770" :mask-closable="false">
                <div>
                  <h2><p>{{codeCname}}</p></h2>
                  <br>
                  <p>公司简介：{{introduce}}</p>
                </div>
                <div slot="footer">
                </div>
              </el-dialog>
            </el-col>
            <el-col :span="24">
              <h4 class="hClass">机构性质：{{riskInfoExpertDetailVo.ascNature}}</h4>
            </el-col>
            <el-col :span="24">
              <h4 class="hClass">查勘险类：{{riskInfoExpertDetailVo.riskName}}</h4>
            </el-col>
            <el-col :span="24">
              <h4 class="hClass">专业方向：{{riskInfoExpertDetailVo.specialty}}</h4>
            </el-col>
            <el-col :span="24">
              <h4 class="hClass">查勘行业： {{riskInfoExpertDetailVo.profession}}</h4>
            </el-col>
            <el-col :span="24">
              <h4 class="hClass">个人资质：{{riskInfoExpertDetailVo.qualification}}</h4>
            </el-col>
            <el-col :span="24">
              <h4 class="hClass">推荐公司：{{riskInfoExpertDetailVo.sender}}</h4>
            </el-col>
          </el-col>
        </el-row>
        <br>
        <el-row>
          <el-col :span="24">
            <el-tabs value="name1" v-model="currnetTabPanel">
              <el-tab-pane label="工作专长" name="工作专长" icon="document-text">
                <el-row type="flex" justify="start">
                  <el-col :span="21">
                    <h4>{{riskInfoExpertDetailVo.workSpecialty}}</h4>
                    <br>
                    <br>
                  </el-col>
                </el-row>
              </el-tab-pane>
              <el-tab-pane label="项目经验" name="项目经验" icon="document-text" >
                <el-row type="flex" justify="start">
                  <el-col :span="21">
                    <h4>{{riskInfoExpertDetailVo.projectExp}}</h4>
                    <br>
                    <br>
                  </el-col>
                </el-row>
              </el-tab-pane>
              <el-tab-pane label="工作经验" name="工作经验" icon="document-text">
                <el-row type="flex" justify="start">
                  <el-col :span="21">
                    <h4>{{riskInfoExpertDetailVo.experience}}</h4>
                    <br>
                    <br>
                  </el-col>
                </el-row>
              </el-tab-pane>
            </el-tabs>
          </el-col>
        </el-row>
      </el-card>
    </div>
    <div style="padding: 10px;">
      <el-card class="editclass">
        <div class="btn-toolbar" style="text-align: right;margin-bottom:5px;" v-show="preparedExpertFlag === 0">
          <el-button type="primary" @click.native="edit()" icon = "compose" size = "large">留言及评分
          </el-button>
        </div>
        <el-form ref="riskDiscussVo" :rules="ruleValidate" :model="riskDiscussVo">
          <el-dialog :visible.sync="modalDiscuss" width="800" :mask-closable="false">
            <div style="padding: 10px;">
              <el-form-item label="评分：" prop="scoreTemp">
                <el-rate allow-half v-model="riskDiscussVo.scoreTemp"></el-rate>
              </el-form-item>
              <el-form-item label="留言：" prop="discussTemp">
                <textarea v-model="riskDiscussVo.discussTemp"  style="width: 100%;padding: 15px;" placeholder="请输入留言...">
                </textarea>
              </el-form-item>
            </div>
            <div slot="footer">
              <el-button size="large" icon = "compose" @click="submitDiscuss">发布</el-button>
            </div>
          </el-dialog>
        </el-form>
        <div class="result-wrapper" v-if="totalCount!=0">
          <!--<Table size="default" :columns='historyColumns'  :data='riskInfoDiscuss'></Table>-->
          <div class="row table-bordered" id="userResultDataTable">
            <div v-for="(riskInfoDiscussVo,index) in riskInfoDiscuss">
              <!-- 用户名、评分 -->
              <div>
                <el-col :span="24">
                  <el-col :span="24">
                    {{riskInfoDiscussVo.userName}}：
                    <!--{{riskInfoDiscussVo.score}}分-->
                    <el-rate disabled allow-half v-model="riskInfoDiscussVo.score"></el-rate>
                  </el-col>
                  留言内容：{{riskInfoDiscussVo.discuss}}
                  <div class="ant-divider"></div>
                </el-col>
              </div>
            </div>
          </div>
          <div style="text-align: center;">
            <el-pagination :total='totalCount' :page-size='pageSize' :current="pageNo" show-total class='paging' @on-change='changepage' show-elevator></el-pagination>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
  import { queryRiskInfoExpert, riskInfoExpertByIntroduce, updateExpertDiscuss } from '@/api/riskInfo'
  export default {
    name: 'RiskInfoExpertView',
    data () {
      const validateScore = (rule, value, callback) => {
        if (value === 0) {
          return callback(new Error('请进行评分'))
        } else {
          callback()
        }
      }
      const validateDiscuss = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请留言'))
        } else if (value.trim() === '') {
          callback(new Error('请留言'))
        } else {
          callback()
        }
      }
      return {
        riskInfoExpertDetailVo: {
          expertNo: '',
          expertName: '',
          score: 0,
          education: '',
          phoneNumber: '',
          mailAddr: '',
          ascName: '',
          ascNameCode: '',
          riskName: '',
          specialty: '',
          profession: '',
          qualification: '',
          sender: '',
          workSpecialty: '',
          projectExp: '',
          experience: '',
          url: '',
          ascNature: ''
        },
        riskDiscussVo: {
          scoreTemp: 0,
          discussTemp: ''
        },
        riskInfoDiscuss: [],
        pageNo: 1,
        pageSize: 5,
        totalCount: 0,
        pageCount: '',
        showFlag: true,
        modalIntroduce: false,
        modalDiscuss: false,
        codeCname: '',
        introduce: '',
        currnetTabPanel: '工作专长',
        // 返回有无删除权限的标志位
        preparedExpertFlag: 0,
        historyColumns: [
          {
            title: '',
            key: 'userName'
          },
          {
            title: '',
            key: 'score'
          },
          {
            title: '',
            key: 'discuss'
          }
        ],
        // 表单校验
        ruleValidate: {
          scoreTemp: [
            { required: true, validator: validateScore }
          ],
          discussTemp: [
            { required: true, validator: validateDiscuss }
          ]
        }
      }
    },
    created () {
      this.query(this.pageNo)
      // 返回有无删除权限页面的标志位
      this.preparedExpertFlag = this.$route.query.preparedExpertFlag ? 1 : 0
    },
    methods: {
      // 分页
      query (index) {
        this.expertNo = this.$route.query.expertNo
        queryRiskInfoExpert({ expertNo: this.expertNo, pageNo: index, pageSize: this.pageSize }).then((res) => {
          this.riskInfoDiscuss = res.riskInfoDiscussList
          this.riskInfoExpertDetailVo = res.riskinfoExpert
          this.totalCount = res.totalCount
          this.pageCount = res.pageCount
        })
      },
      instance () {
        riskInfoExpertByIntroduce({ ascNameCode: this.riskInfoExpertDetailVo.ascNameCode }).then((res) => {
          this.codeCname = res.codeCname
          this.introduce = res.introduce
        })
        this.modalIntroduce = true
      },
      submitDiscuss () {
        //  表单校验
        this.$refs['riskDiscussVo'].validate((valid) => {
          if (valid) {
            // 1、组织查询条件
            const userInfo = this.$store.getters.getUserInfo
//          this.riskDiscussVo.discussTemp = encodeURI(this.riskDiscussVo.discussTemp)
            const queryPar = {
              userCode: userInfo.userCode,
              comCode: userInfo.comCode,
              riskCode: userInfo.riskCode === undefined ? '' : userInfo.riskCode,
              discuss: this.riskDiscussVo.discussTemp,
              score: this.riskDiscussVo.scoreTemp,
              expertNo: this.expertNo
            }
            updateExpertDiscuss(queryPar).then((res) => {
              this.$Message.success('提交成功!')
              this.query(1)
            })
            this.modalDiscuss = false
            this.riskDiscussVo.discussTemp = ''
            this.riskDiscussVo.scoreTemp = 0
          } else {
            this.$Message.error('必录验证失败!')
            return false
          }
        })
      },
      // 页码改变方法
      changepage (index) {
        this.pageNo = index
        this.query(index)
      },
      // 返回专家页面
      preparedExpert () {
        if (this.preparedExpertFlag === 0) {
          this.$router.push({ path: '/riskInfo_expertQuery', query: { show: true } })
        }
        if (this.preparedExpertFlag === 1) {
          this.$router.push({ path: '/riskInfo_expertDelQuery', query: { show: true } })
        }
      },
      edit () {
        this.modalDiscuss = true
        this.riskDiscussVo.scoreTemp = 0
        this.riskDiscussVo.discussTemp = ''
      }
    }
  }
</script>

<style lang="scss" scoped>
 .title{
    text-align: left;
   height: 54px;
   line-height: 54px;
 }
 .cardclass{
   width:1120px;
   height:668px;
   border-radius:4px;
   border:1px solid rgba(205,205,205,1);
   font-size: 14px;
 }
 .searchClass{
   width: 1168px;
   height: 52px;
   line-height: 52px;
   text-align: left;
   padding-left: 10px;
   font-weight: 600;
 }
  .hClass{
    margin: 3px;
    padding: 0px;
  }
 .editclass{
   width:1120px;
   height:200px;
   border-radius:4px;
   border:1px solid rgba(205,205,205,1);
   font-size: 14px;
 }
</style>

