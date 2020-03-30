<template>
  <div>
    <el-col>
      <div class="searchClass">
        <span>专家资源库搜索</span>
      </div>
    </el-col>
    <el-col>
      <el-card class="cardclass">
        <div>
          <el-form ref="riskExpertVo" :model="riskExpertVo" class="form1" label-width="140px">
            <el-row style="height: 60px;">
              <el-col :span="12">
                <el-form-item label="姓名：" prop="expertName" >
                  <el-input v-model="riskExpertVo.expertName" type="text" placeholder="请输入..." style="width: 100%"/>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="学历：" prop="educations" >
                  <el-select v-model="riskExpertVo.educations" multiple style="width: 100%">
                    <el-option v-for="education in educationsList" :value="education.value" :key="education.value" :label="education.label"/>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row style="height: 60px;">
              <el-col :span="12">
                <el-form-item label="机构性质：" prop="ascNatures" >
                  <el-select v-model="riskExpertVo.ascNatures" multiple style="width: 100%">
                    <el-option v-for="ascNature in ascNaturesList" :value="ascNature.value" :key="ascNature.value" :label="ascNature.label"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="推荐公司：" prop="senders" >
                  <el-select v-model="riskExpertVo.senders" multiple style="width: 100%">
                    <el-option v-for="sender in sendersList" :value="sender.value" :key="sender.value" :label="sender.label" />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row style="height: 60px;">
              <el-col :span="12">
                <el-form-item label="查勘行业：" prop="professions" >
                  <el-select v-model="riskExpertVo.professions" multiple>
                    <el-option v-for="profession in professionsList" :key="profession.value" :label="profession.label" :value="profession.value"  />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <br>
            <div style="text-align: center">
              <el-button type="dashed" icon="el-icon-refresh-right" @click="reset('riskExpertVo')" round>重置</el-button>
              <el-button type="primary" icon="el-icon-search" @click="query(1)" round>查询</el-button>
            </div>
          </el-form>
        </div>
        <div v-show="Hide">
          <div class="resultClass">
            查询结果
          </div>
          <el-table :data="tableData" v-loading="loading" @row-dblclick="queryDetail" @sort-change="sortMethods">
            <el-table-column label="姓名" prop="expertName" />
            <el-table-column label="专业方向" prop="apecialty" />
            <el-table-column label="学历" prop="education" sortable />
            <el-table-column label="查勘险类" prop="riskName" sortable />
            <el-table-column label="查勘行业" prop="profession" />
            <el-table-column label="评分" prop="score" sortable />
          </el-table>
          <div class="block" style="text-align: center">
            <el-pagination background layout="prev, pager, next, sizes, total" :current-page.sync="pageNo" :page-size="pageSize" :page-sizes="[5,10,15]" :total="totalCount" @current-change="changepage" @size-change="changepagesize" />
          </div>
        </div>
      </el-card>
    </el-col>
  </div>
</template>
<script>
  import { queryExpert } from '@/api/riskInfo'
    export default {
        name: "RiskInfoExpertQuery",
      data: function() {
        return {
          riskExpertVo: {
            expertName: '',
            score: '',
            specialty: '',
            riskName: '',
            professions: [],
            educations: [],
            ascNatures: [],
            senders: []
          },
          professionsList: [
            {
              value: '01',
              label: '火电'
            },
            {
              value: '02',
              label: '石油化工及相关化学工业'
            },
            {
              value: '03',
              label: '商业楼宇'
            },
            {
              value: '04',
              label: '轨道交通'
            },
            {
              value: '05',
              label: '纺织制造'
            },
            {
              value: '06',
              label: '电器制造'
            },
            {
              value: '07',
              label: '钢铁及有色金属冶炼'
            },
            {
              value: '08',
              label: '汽车制造'
            },
            {
              value: '09',
              label: '其他电力行业'
            },
            {
              value: '10',
              label: '电网电信'
            },
            {
              value: '11',
              label: '公路铁路'
            },
            {
              value: '12',
              label: '桥梁港口码头'
            },
            {
              value: '13',
              label: '半导体及光伏'
            },
            {
              value: '14',
              label: '仓储'
            },
            {
              value: '15',
              label: '加工制造业'
            },
            {
              value: '16',
              label: '造纸及木材加工'
            },
            {
              value: '17',
              label: '道路桥梁'
            },
            {
              value: '18',
              label: '船舶建造'
            },
            {
              value: '19',
              label: '金融保险'
            },
            {
              value: '99',
              label: '未说明'
            }
          ],
          educationsList: [
            {
              value: '01',
              label: '本科以下'
            },
            {
              value: '02',
              label: '本科'
            },
            {
              value: '03',
              label: '硕士及硕士以上'
            },
            {
              value: '99',
              label: '未说明'
            }
          ],
          ascNaturesList: [
            {
              value: '01',
              label: '科研院所'
            },
            {
              value: '02',
              label: '再保人'
            },
            {
              value: '03',
              label: '经纪人'
            },
            {
              value: '04',
              label: '公估人'
            },
            {
              value: '05',
              label: '咨询机资质机构'
            },
            {
              value: '99',
              label: '未说明'
            }
          ],
          sendersList: [
            {
              value: '0000',
              label: '总公司'
            },
            {
              value: '1100',
              label: '北京市分公司'
            },
            {
              value: '1200',
              label: '天津市分公司'
            },
            {
              value: '1300',
              label: '河北省分公司'
            },
            {
              value: '1400',
              label: '山西省分公司'
            },
            {
              value: '1500',
              label: '内蒙古自治区分公司'
            },
            {
              value: '2100',
              label: '辽宁省分公司'
            },
            {
              value: '2102',
              label: '大连市分公司'
            },
            {
              value: '2200',
              label: '吉林省分公司'
            },
            {
              value: '2300',
              label: '黑龙江省分公司'
            },
            {
              value: '3100',
              label: '上海市分公司'
            },
            {
              value: '3200',
              label: '江苏省分公司'
            },
            {
              value: '3300',
              label: '浙江省分公司'
            },
            {
              value: '3301',
              label: '杭州市分公司'
            },
            {
              value: '3302',
              label: '宁波市分公司'
            },
            {
              value: '3400',
              label: '安徽省分公司'
            },
            {
              value: '3500',
              label: '福建省分公司'
            },
            {
              value: '3502',
              label: '厦门市分公司'
            },
            {
              value: '3600',
              label: '江西省分公司'
            },
            {
              value: '3700',
              label: '山东省分公司'
            },
            {
              value: '3702',
              label: '青岛市分公司'
            },
            {
              value: '4100',
              label: '河南省分公司'
            },
            {
              value: '4200',
              label: '湖北省分公司'
            },
            {
              value: '4300',
              label: '湖南省分公司'
            },
            {
              value: '4400',
              label: '广东省分公司'
            },
            {
              value: '4401',
              label: '广州市分公司'
            },
            {
              value: '4403',
              label: '深圳市分公司'
            },
            {
              value: '4500',
              label: '广西分公司'
            },
            {
              value: '4600',
              label: '海南省分公司'
            },
            {
              value: '5000',
              label: '重庆市分公司'
            },
            {
              value: '5100',
              label: '四川省分公司'
            },
            {
              value: '5200',
              label: '贵州省分公司'
            },
            {
              value: '5300',
              label: '云南省分公司'
            },
            {
              value: '5400',
              label: '西藏分公司'
            },
            {
              value: '6100',
              label: '陕西省分公司'
            },
            {
              value: '6200',
              label: '甘肃省分公司'
            },
            {
              value: '6300',
              label: '青海省分公司'
            },
            {
              value: '6400',
              label: '宁夏回族自治区分公司'
            },
            {
              value: '6500',
              label: '新疆维吾尔自治区分公司'
            },
            {
              value: 'QC00',
              label: '汽车行业技术基地'
            },
            {
              value: 'SH00',
              label: '石化行业技术基地'
            },
            {
              value: 'HD00',
              label: '火电行业技术基地'
            },
            {
              value: 'DQ00',
              label: '电气制造行业技术基地'
            },
            {
              value: 'FZ00',
              label: '纺织行业技术基地'
            },
            {
              value: 'GD00',
              label: '轨道交通行业技术基地'
            },
            {
              value: 'LY00',
              label: '商业楼宇行业技术基地'
            },
            {
              value: 'GT00',
              label: '钢铁行业技术基地'
            },
            {
              value: '9999',
              label: '未说明'
            }
          ],
          tableData: [],
          pageNo: 1,
          pageSize: 5,
          totalCount: 0,
          Hide: false,
          loading: false,
          orderColumn: 'expertNo',
          orderType: true,
          orderTitle: ''
        }
      },
      created(){},
      methods: {
        query(index) {
          this.pageNo = index
          this.Hide = true
          this.loading = true
          // let pageSize = Cookies.get('pageSize')
          // if (pageSize !== undefined && pageSize !== '') {
          //   this.pageSize = parseInt(pageSize)
          // }
          this.queryExpert()
        },
        queryExpert() {
          this.tableData = []
          queryExpert(this._data).then(res => {
            this.loading = false
            this.tableData = res.dataList
            this.totalCount = res.totalCount
          })
        },
        // 页码改变方法
        changepage(index) {
          this.loading = true
          this.pageNo = index
          this.query(index)
        },
        changepagesize(value) {
          this.pageNo = 1
          this.pageSize = value
          // Cookies.set('pageSize', value)
          this.query()
        },
        reset(name) {
          this.pageNo = 1
          this.Hide = false
          this.tableData = []
          this.totalCount = 0
          this.riskExpertVo.expertName = ''
          this.riskExpertVo.professions = []
          this.riskExpertVo.educations = []
          this.riskExpertVo.ascNatures = []
          this.riskExpertVo.senders = []
          this.orderColumn = 'expertNo'
          this.orderTitle = ''
        },
        queryDetail(row) {
          // this.$store.commit('SET_DATAS', this._data)
          this.$router.push({path: '/riskinfo_riskInfoExpertView', query: {expertNo: row.expertNo}})
        },
        sortMethods(column,prop,order) {
          // $('.ivu-table-cell .ivu-icon.ivu-icon-arrow-down-b').removeClass('on')
          // $('.ivu-table-cell .ivu-icon.ivu-icon-arrow-up-b').removeClass('on')
          this.loading = true
          this.orderTitle = column.column.prop
          this.orderColumn = column.prop
          if (column.order === 'ascending') {
            this.orderType = false
            this.queryExpert()
          }
          if (column.order === 'descending') {
            this.orderType = true
            this.queryExpert()
          }
          if (column.order === 'normal') {
            this.orderColumn = 'expertNo'
            this.queryExpert()
          }
        }
      }
    }
</script>

<style lang="scss" scoped>
  .form1{
    margin-bottom: 32px;
    /*width:1430px;
    height:340px;*/
  }
  .cardclass{
    width:100%;
    height:100%;
    border-radius:4px;
    border:1px solid rgba(205,205,205,1);
    font-size: 14px;
  }

  .inputClass .el-input__inner,.inputClass .el-select-dropdown__item {
      width:200px;
      background:rgba(255,255,255,1);
      border-radius:4px;
      border:1px solid rgba(205,205,205,1);
      height: 32px;
      line-height: 32px;
  }
  .resultClass{
    width: 100%;
    height: 44px;
    background: rgba(237,238,240,1);
    line-height: 44px;
    text-align: left;
    padding-left: 10px;
    font-weight: 600;

  }
  .searchClass{
    width: 100%;
    height: 52px;
    line-height: 52px;
    text-align: left;
    padding-left: 10px;
    font-weight: 600;
  }
  .el-button--dashed{
    padding: 8px 27px;
  }
</style>
