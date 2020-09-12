<template>
  <div class="commodity">
    <v-card>
      <el-form :inline="true"
               class="demo-form-inline">
        <el-form-item>
          <div class="header">
            <div>
              <span class="demonstration">选择时段</span> &nbsp;
              <el-date-picker v-model="timeArray"
                              type="daterange"
                              value-format="yyyy-MM-dd"
                              range-separator="至"
                              @change="dataArray"
                              start-placeholder="开始日期"
                              end-placeholder="结束日期">
              </el-date-picker>
            </div>
            <div class="right">
              <el-button @click="getData(1)">今天</el-button>
              <el-button @click="getData(2)">昨天</el-button>
              <el-button @click="getData(3)">最近七天</el-button>
              <el-button @click="getData(4)">最近30天</el-button>
            </div>
          </div>
        </el-form-item>
        <el-form-item>
          <p class="title">数据概览</p>
          <el-row :gutter="20">
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <p class="visitors">新增客户数</p>
                <p class="vis-num">
                  <countTo :separator="separator"
                           :startVal="startVal"
                           :endVal="dataAna[0]"
                           :duration="3000"></countTo>
                </p>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <p class="visitors">累计客户数</p>
                <p class="vis-num">
                  <countTo :separator="separator"
                           :startVal="startVal"
                           :endVal="dataAna[1]"
                           :duration="3000"></countTo>
                </p>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <p class="visitors">付款客户数</p>
                <p class="vis-num">
                  <countTo :separator="separator"
                           :startVal="startVal"
                           :endVal="dataAna[2]"
                           :duration="3000"></countTo>
                </p>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <p class="visitors">累计付款客户数</p>
                <p class="vis-num">
                  <countTo :separator="separator"
                           :startVal="startVal"
                           :endVal="dataAna[3]"
                           :duration="3000"></countTo>
                </p>
              </div>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item>
          <p class="title">客户统计</p>
          <p class="dataView">
            <span v-for="(item, index) in linkBtn"
                  :key="index">
              <el-link type="primary"
                       v-bind:class="{ active: changeActive == index }"
                       @click="dataChanges(index)"
                       :underline="false">{{ item }}</el-link>
            </span>
          </p>
          <div style="width: 100%">
            <div ref="lines"
                 id="polyline"
                 style="width: 100%;height:250px;margin-top: 40px"></div>
          </div>
        </el-form-item>
        <el-form-item>
          <el-table
            :data="tableData"
            style="width: 100%">
            <el-table-column
              prop="time"
              label="时间"
            >
            </el-table-column>
            <el-table-column
              prop="newCustomer"
              label="新增客户"
            >
            </el-table-column>
            <el-table-column
              prop="allCustomer"
              label="累计客户">
            </el-table-column>
            <el-table-column
              prop="payAmount"
              :formatter="payAmountData"
              label="当天付款金额">
            </el-table-column>
          </el-table>
          <!-- 分页 -->
          <div class="pages">
            <el-pagination
              class="tablePagin"
              background
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :page-sizes="pageSizes"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total"
              :pager-count="5"
              :page-size.sync="rowsPerPage"
              :current-page.sync="page"
              @prev-click="prevPage"
              @next-click="nextPage"
            ></el-pagination>
          </div>
        </el-form-item>
      </el-form>
    </v-card>
  </div>
</template>

<script>
  // 引入 ECharts 主模块
  var echarts = require('echarts/lib/echarts')
  require('echarts/lib/chart/line') // 折线图
  import countTo from 'vue-count-to'
  import funClass from '../../assets/js/common' // 引用公共类
  export default {
    data() {
      return {
        timeArray: [],
        startTime: null,
        endTime: null,
        startVal: 0,
        separator: '',
        isActive: true,
        linkBtn: ['周', '月', '年'],
        changeActive: 0,
        type: 99,
        // 折线图
        dataXChange: [],
        dataYchange: [],
        point: [0,0,0,0,0,0,0],
        datalist: [0,0,0,0,0,0,0],
        // 表格数据
        tableData: [],
        // 数据概况
        dataAna: [0,0,0,0],
        // 分页
        rowsPerPage: 15,
        page: 1,
        total: 0,
        pageSizes: [10, 15, 20, 25],
        funLei:funClass
      }
    },
    components: {countTo},
    methods: {
      // 初始化数值
      async init() {
        let storeInfo = {
          sid: localStorage.getItem('id'), // 店铺id
          startTime: this.startTime, // 开始时间
          endTime: this.endTime, // 结束时间
          queryType: this.type // 99 按时间搜索
        }
        let res = await this.$Http.customerOver(storeInfo)
        // console.log(res)
        if (res.code === 0) {
          this.dataAna = res.data
        }
      },
      // 表格数据格式化
      payAmountData (row) {
        return row.payAmount.toFixed(2)
      },
      dataArray() {
        if(localStorage.getItem('id') == 0) {
          this.$message({
            type: 'error',
            message: '请先认证店铺信息',
            offset: 80
          })
        } else {
          if (this.timeArray == null) {
            this.startTime = null
            this.endTime = null
            this.type = 99
            this.init()
            return false
          } else if (this.timeArray.length == 0) {
            this.startTime = null
            this.endTime = null
            this.type = 99
            this.init()
            return false
          } else {
            this.startTime = this.timeArray[0]
            this.endTime = this.timeArray[1]
            this.type = 0
            this.init()
            return  false
          }
        }
      },
      async dataChanges(index) {
        if (index == 1) { // 月
          // this.common.getMonthDay()
          this.datalist = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
          this.type = 6
          let storeInfo = {
            sid: localStorage.getItem('id'), // 店铺id
            queryType: this.type, // 99 查询全部 0 时间段搜索 1 今天 2 昨天 3 最近七天 4 最近30天 5 周 6 月 7 年
            page: this.page,
            rows: this.rowsPerPage
          }
          if(localStorage.getItem('id') == 0) {
            this.$message({
              type: 'error',
              message: '请先认证店铺信息',
              offset: 80
            })
          } else {
            let res = await this.$Http.customerTable(storeInfo) // 表格
            this.tableData = res.data.items
            this.total = res.data.total
            let polyLine = await this.$Http.customerPolyline(storeInfo) // 折线
            this.datalist = polyLine.data
          }
          this.changeActive = index
          switch (this.datalist.length) {
            case 29:
              this.dataXChange = this.funLei.getMonthDay(29)
              break;
            case 30:
              this.dataXChange = this.funLei.getMonthDay(30)
              break;
            case 31:
              this.dataXChange = this.funLei.getMonthDay(31)
              break;
          }

          this.point = this.datalist
          this.polyline()
          this.funLei.getMonthDay(31)
        } else if (index == 2) { // 年
          this.datalist = [0,0,0,0,0,0,0,0,0,0,0,0]
          this.type = 7
          let storeInfo = {
            sid: localStorage.getItem('id'), // 店铺id
            queryType: this.type, // 99 查询全部 0 时间段搜索 1 今天 2 昨天 3 最近七天 4 最近30天 5 周 6 月 7 年
            page: this.page,
            rows: this.rowsPerPage
          }
          if(localStorage.getItem('id') == 0) {
            this.$message({
              type: 'error',
              message: '请先认证店铺信息',
              offset: 80
            })
          } else {
            let res = await this.$Http.customerTable(storeInfo) // 表格
            this.tableData = res.data.items
            this.total = res.data.total
            let polyLine = await this.$Http.customerPolyline(storeInfo) // 折线
            this.datalist = polyLine.data
          }
          this.changeActive = index
          this.dataXChange = [
            '一月',
            '二月',
            '三月',
            '四月',
            '五月',
            '六月',
            '七月',
            '八月',
            '九月',
            '十月',
            '十一月',
            '十二月'
          ]
          this.point = this.datalist
          this.polyline()
        } else { // 周
          this.type = 5
          let storeInfo = {
            sid: localStorage.getItem('id'), // 店铺id
            queryType: this.type, // 99 查询全部 0 时间段搜索 1 今天 2 昨天 3 最近七天 4 最近30天 5 周 6 月 7 年
            page: this.page,
            rows: this.rowsPerPage
          }
          if(localStorage.getItem('id') == 0) {
            this.$message({
              type: 'error',
              message: '请先认证店铺信息',
              offset: 80
            })
          } else {
            let res = await this.$Http.customerTable(storeInfo) // 表格
            this.tableData = res.data.items
            this.total = res.data.total
            let polyLine = await this.$Http.customerPolyline(storeInfo) // 折线
            this.datalist = polyLine.data
          }
          index = 0
          this.changeActive = index
          this.dataXChange = [
            '周一',
            '周二',
            '周三',
            '周四',
            '周五',
            '周六',
            '周日'
          ]
          this.point = this.datalist
          this.polyline()
        }
      },
      getData(type) {
        switch (type) {
          case 1:
            this.type = 1
            if(localStorage.getItem('id') == 0) {
              this.$message({
                type: 'error',
                message: '请先认证店铺信息',
                offset: 80
              })
            } else {
              this.init()
            }
            break;
          case 2:
            this.type = 2
            if(localStorage.getItem('id') == 0) {
              this.$message({
                type: 'error',
                message: '请先认证店铺信息',
                offset: 80
              })
            } else {
              this.init()
            }
            break;
          case 3:
            this.type = 3
            if(localStorage.getItem('id') == 0) {
              this.$message({
                type: 'error',
                message: '请先认证店铺信息',
                offset: 80
              })
            } else {
              this.init()
            }
            break;
          default:
            this.type = 4
            if(localStorage.getItem('id') == 0) {
              this.$message({
                type: 'error',
                message: '请先认证店铺信息',
                offset: 80
              })
            } else {
              this.init()
            }
        }
      },
      // 折线图
      polyline() {
        this.$nextTick(() => {
          let xdata = this.dataXChange
          let ydata = this.dataYchange
          let zdata = this.point
          //  折线图
          const lines = echarts.init(this.$refs.lines)
          // 指定图表的配置项和数据
          var option = {
            title: {
              text: ''
            },
            itemStyle: {
              color: '#3399FF'
            },
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'cross',
                label: {
                  backgroundColor: '#3399FF'
                }
              }
            },
            legend: {
              data: ['客户统计']
            },
            // toolbox: { // 下载图标
            //   feature: {
            //     saveAsImage: {}
            //   }
            // },
            grid: {
              // 设置图表大小
              left: '3%',
              right: '3%',
              bottom: '3%',
              containLabel: true
            },
            xAxis: [
              {
                type: 'category',
                boundaryGap: false,
                data: xdata
              }
            ],
            yAxis: [
              {
                type: 'value'
              }
            ],
            series: [
              {
                name: '客户统计',
                type: 'line',
                stack: '总量',
                label: {
                  normal: {
                    show: true,
                    position: 'top',
                    color: '#3399FF'
                  }
                },
                areaStyle: {},
                data: zdata
              }
            ]
          }
          lines.setOption(option)
        })
      },
      // 分页
      handleSizeChange(val) {
        // this.init()
      },
      handleCurrentChange(val) {
        // this.init()
      },
      nextPage() {
        this.page += 1
        // this.init()
      },
      prevPage() {
        this.page -= 1
        // this.init()
      },
    },
    mounted() {
      this.polyline()
      if(localStorage.getItem('id') == 0) {
        this.$message({
          type: 'error',
          message: '请先认证店铺信息',
          offset: 80
        })
      } else {
        // 初始化数值
        this.dataArray()
        this.dataChanges()
      }
    }
  };
</script>

<style lang="less" scoped>
  .commodity {
    margin: 24px;

    /deep/ .el-form-item {
      width: 100%;
      padding: 0 24px;

      /deep/ .el-form-item__content {
        width: 100%;
      }

      & .title {
        width: 100%;
        font-size: 18px !important;
        font-weight: bold;
        font-stretch: normal;
        line-height: 44px !important;
        letter-spacing: 0px;
        padding-left: 24px;
        color: #303133;
        height: 44px;
        background-color: #f5f7fa;
      }
    }

    .header {
      display: flex;
      width: 100%;
      padding: 24px 24px 0 0;

      & div {
        flex: 1;
      }

      & .demonstration {
        padding-left: 24px;
      }

      & .right {
        text-align: right;
      }
    }

    & .title:before {
      content: '';
      width: 1px;
      background-color: #1870f2;
      padding-right: 4px;
      margin-right: 12px;
    }

    & .grid-content {
      padding-left: 40px;

      & .visitors {
        font-size: 17px;
        font-weight: normal;
        font-stretch: normal;
        line-height: 32px;
        letter-spacing: 0px;
        color: #999999;
        margin-bottom: 18px;
        margin-top: 8px;
      }
    }

    & .vis-num {
      font-size: 24px;
      font-weight: bold;
      font-stretch: normal;
      line-height: 32px;
      letter-spacing: 0px;
      color: #333333;
    }

    & .dataView {
      float: right;
      margin-right: 110px;
      /* 打包样式 start */
      margin-top: -20px;
      /* 打包样式 end */
      & .el-link {
        margin: 0 20px;
        font-size: 14px;
        font-weight: normal;
        font-stretch: normal;
        line-height: 36px;
        letter-spacing: 0px;
        color: #666666;
      }
    }
  }

  .active {
    color: #1870f2 !important;
  }

  .errors {
    color: #666666;
  }

  .tabbleTitle {
    background-color: #f5f7fa;
    margin-bottom: 0;
    border: solid 1px #ebeef5;
    border-bottom: none;
    font-size: 16px;
    font-weight: bold;
    font-stretch: normal;
    line-height: 36px;
    letter-spacing: 0px;
    color: #333333;
    padding-left: 20px;
  }

  .border {
    border: solid 1px #ebeef5;

    & p {
      margin-bottom: 0;
      background: #f5f7fa;
      font-size: 16px;
      font-weight: bold;
      font-stretch: normal;
      line-height: 36px;
      letter-spacing: 0px;
      color: #333333;
      padding-left: 20px;
    }
  }

  /deep/ .el-table th {
    background-color: #f5f7fa;
  }

  /deep/ .el-form-item__content {
    line-height: 22px;
  }

  .pages {
    margin: 24px 0;

    & /deep/ .el-pagination__editor.el-input {
      width: 50px;
    }

    .tablePagin {
      text-align: end;
    }
  }
  /deep/ .el-pagination.is-background .el-pager li:not(.disabled).active {
    background-color: #3c8bfe;
  }
</style>
