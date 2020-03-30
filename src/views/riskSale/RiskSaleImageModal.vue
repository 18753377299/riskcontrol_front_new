<template>
  <!--<el-dialog v-show="!modalDetailFlag" v-model="modalFlag" :closable="true" :mask-closable="true" @on-visible-change="onVisibleChange">-->
  <el-dialog title="整改历史" :visible.sync="modalDetailFlag" style="border-radius: 1px">
    <!--<el-divider></el-divider>-->
    <el-card style="text-align:center">
      <el-table :loading="loading" :columns="columnTitles" :data="modalData">
        <el-table-column property="date" label="标题" ></el-table-column>
        <el-table-column property="name" label="整改意见" ></el-table-column>
        <el-table-column property="address" label="图片名称"></el-table-column>
        <el-table-column property="name" label="提交日期"></el-table-column>
        <el-table-column property="address" label="有无反馈"></el-table-column>
        <el-table-column property="name" label="整改标记"></el-table-column>
        <el-table-column property="address" label="查看"></el-table-column>
      </el-table>
    </el-card>
    <!--分页-->
    <div style="textAlign:center">
      <el-pagination
        :current-page="pageNo"
        :page-sizes="[5,10]"
        :page-size="pageSize"
        :total="totalCount"
        layout="total,prev, pager, next, jumper,sizes"
        @size-change="changepagesize"
        @current-change="changePage" />
    </div>
  </el-dialog>
</template>
<script>
  export default {
    data() {
      return {
        pageNo: 1,
        pageSize: 5,
        total: 10,
        modalFlag: false,
        modalDetailFlag: true,
        loading: true,
        modalData: [],
        columnTitles: [
          {title: '标题', key: 'col1', align: 'center'},
          {title: '整改意见', key: 'col2', align: 'center'},
          {title: '图片名称', key: 'col3', align: 'center'},
          {title: '提交日期', key: 'col4', align: 'center'},
          {title: '有无反馈', key: 'col5', align: 'center'},
          {title: '整改标记', key: 'col6', align: 'center'},
          {
            title: '查看',
            key: 'action',
            width: 200,
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Poptip', {
                  props: {
                    confirm: true,
                    title: '确定查看吗？'
                  },
                  style: {
                    color: '#2d8cf0',
                    textAlign: 'left',
                    marginLeft: '15px'
                  },
                  on: {
                    'on-ok': () => {
                      this.onRowClick(params)
                    },
                    'on-cancel': () => {}
                  }
                }, [
                  h('Button', {
                    props: {
                      type: 'success',
                      size: 'small',
                      icon: 'eye'
                    },
                    style: {
                      marginRight: '5px'
                    }
                  })
                ])
              ])
            }
          }
        ],
      }
    },

    methods:{
      // 页码改变方法
      changePage(index) {
        this.pageNo = index
        this.search(index)
      },
      changepagesize(value) {
        this.pageNo = 1
        this.pageSize = value
        this.search(this.pageNo)
      },

    }
  }
</script>
<style lang="scss" scoped>
  .el-dialog__title {
    line-height: 24px;
    font-size: 18px;
    color:#f9840b;
    text-align:left
  }
</style>
