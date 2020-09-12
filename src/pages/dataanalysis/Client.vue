<template>
  <div class="client">
    <el-card>
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
              <el-button :class="current == 1 ? 'active' : '' " @click="getData(1)">今天</el-button>
              <el-button :class="current == 2 ? 'active'  : '' " @click="getData(2)">昨天</el-button>
              <el-button :class="current == 3 ? 'active'  : '' " @click="getData(3)">最近七天</el-button>
              <el-button :class="current == 4 ? 'active'  : '' " @click="getData(4)">最近30天</el-button>
            </div>
          </div>
        </el-form-item>
        <el-form-item>
          <p class="title">数据概览</p>
          <el-row :gutter="20">
            <el-col :span="8">
              <div class="grid-content bg-purple">
                <p class="visitors">店铺访客数</p>
                <p class="vis-num">
                  <countTo :separator="separator"
                           :startVal="startVal"
                           :endVal="dataAna.storeCount"
                           :duration="3000"></countTo>
                </p>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content bg-purple">
                <p class="visitors">分享访问数</p>
                <p class="vis-num">
                  <countTo :separator="separator"
                           :startVal="startVal"
                           :endVal="dataAna.shareCount"
                           :duration="3000"></countTo>
                </p>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content bg-purple">
                <p class="visitors">商品浏览量</p>
                <p class="vis-num">
                  <countTo :separator="separator"
                           :startVal="startVal"
                           :endVal="dataAna.itemCount"
                           :duration="3000"></countTo>
                </p>
              </div>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item>
          <p class="title">订单统计</p>
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
<!--        <el-form-item>-->
<!--          <p class="title">流量分布</p>-->
<!--          <el-row :gutter="20">-->
<!--            <el-col :span="12">-->
<!--              <div class="grid-content bg-purple">-->
<!--                <template>-->
<!--                  <p class="tabbleTitle">TOP10受访页面</p>-->
<!--                  <el-table border-->
<!--                            :data="tableData"-->
<!--                            style="width: 100%">-->
<!--                    <el-table-column prop="rank"-->
<!--                                     label="排名">-->
<!--                    </el-table-column>-->
<!--                    <el-table-column prop="name"-->
<!--                                     label="名称">-->
<!--                    </el-table-column>-->
<!--                    <el-table-column prop="viewCount"-->
<!--                                     label="浏览数">-->
<!--                    </el-table-column>-->
<!--                    <el-table-column prop="proportion"-->
<!--                                     label="占比">-->
<!--                    </el-table-column>-->
<!--                  </el-table>-->
<!--                </template></div>-->
<!--            </el-col>-->
<!--            <el-col :span="12">-->
<!--              <div class="grid-content bg-purple">-->
<!--                <div class="border">-->
<!--                  <p>来源关键字</p>-->
<!--                  <div ref="bars"-->
<!--                       id="polyline"-->
<!--                       style="width: 100%;height:250px;margin-top: 40px"></div>-->
<!--                </div>-->
<!--              </div>-->
<!--            </el-col>-->
<!--          </el-row>-->
<!--        </el-form-item>-->
<!--        <el-form-item>-->
<!--          <p class="title">地域分布</p>-->
<!--        </el-form-item>-->
      </el-form>
    </el-card>
  </div>
</template>
<script>
// 引入 ECharts 主模块
var echarts = require('echarts/lib/echarts')
require('echarts/lib/chart/line') // 折线图
require('echarts/lib/chart/bar') // 柱状图
import funClass from '../../assets/js/common' // 引用公共类
import countTo from 'vue-count-to'
export default {
  data() {
    return {
      timeArray: [],
      startTime: null,
      endTime: null,
      type: 99,
      startVal: 0,
      separator: '',
      isActive: true,
      linkBtn: ['周', '月', '年'],
      changeActive: 0,
      // 折线图
      dataXChange: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
      dataYchange: [20, 30, 40, 50, 60, 70, 80, 90],
      point: [0,0,0,0,0,0,0],
      datalist: [],
      // 表格数据
      tableData: [
        {
          rank: '1',
          name: '小猪佩奇',
          viewCount: '浏览数',
          proportion: '50%'
        }
      ],
      // 柱状图
      dataXColumnar: [
        'Axure',
        '原型',
        'axure web',
        'web原型',
        '电商后台',
        '设计原型'
      ],
      // 数据概况
      dataAna: {
        itemCount: 0, // 商品浏览量
        shareCount: 0,// 分享访客数
        storeCount: 0, // 店铺访客数
      },
      current: 0,
      funLei:funClass
    }
  },
  components: { countTo },
  methods: {
    // 数据概览初始化数值
    async init() {
      let storeInfo = {
        sid: localStorage.getItem('id'), // 店铺id
        startTime: this.startTime, // 开始时间
        endTime: this.endTime, // 结束时间
        queryType: this.type // 99 查询全部 0 时间段搜索 1 今天 2 昨天 3 最近七天 4 最近30天 5 周 6 月 7 年
      }
      let res = await this.$Http.dataAnalysis(storeInfo)
      if (res.code === 0) {
        this.dataAna = res.data
        console.log(this.dataAna)
      }
    },
    // 今天 昨天 最近七天 最近30天
    getData (type) {
      switch (type) {
        case 1: // 今天
          this.type = 1
          this.current = type
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
        case 2: // 昨天
          this.type = 2
          this.current = type
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
        case 3: // 最近七天
          this.type = 3
          this.current = type
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
        default:  // 最近30天
          this.type = 4
          this.current = type
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
            data: ['订单统计']
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
              name: '订单统计',
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
    // 订单统计初始化数值
    dataArray() {
      if (this.timeArray == null) {
        this.type = 99
        this.startTime = null
        this.endTime = null
        if (localStorage.getItem('id') == 0) {
          this.$message({
            type: 'error',
            message: '请先认证店铺信息',
            offset: 80
          })
        } else {
          this.init()
        }
      } else if (this.timeArray.length == 0) {
        this.type = 99
        this.startTime = null
        this.endTime = null
        if (localStorage.getItem('id') == 0) {
          this.$message({
            type: 'error',
            message: '请先认证店铺信息',
            offset: 80
          })
        } else {
          this.init()
        }
      } else {
        this.type = 0
        this.startTime = this.timeArray[0]
        this.endTime = this.timeArray[1]
        if (localStorage.getItem('id') == 0) {
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
    async dataChanges(index) {
      if (index == 1) { // 月
        // this.common.getMonthDay()
        this.datalist = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
        this.type = 6
        let storeInfo = {
          sid: localStorage.getItem('id'), // 店铺id
          queryType: this.type, // 99 查询全部 0 时间段搜索 1 今天 2 昨天 3 最近七天 4 最近30天 5 周 6 月 7 年
        }
        if (localStorage.getItem('id') == 0) {
          this.$message({
            type: 'error',
            message: '请先认证店铺信息',
            offset: 80
          })
        } else {
          let res = await this.$Http.orderCount(storeInfo)
          this.datalist = res.data
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
        }
        if(localStorage.getItem('id') ==0) {
          this.$message({
            type: 'error',
            message: '请先认证店铺信息',
            offset: 80
          })
        } else {
          let res = await this.$Http.orderCount(storeInfo)
          this.datalist = res.data
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
        }
        if (localStorage.getItem('id') ==0) {
          this.$message({
            type: 'error',
            message: '请先认证店铺信息',
            offset: 80
          })
        } else {
          let res = await this.$Http.orderCount(storeInfo)
          this.datalist = res.data
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
    // 柱状图
    // columnar() {
    //   this.$nextTick(() => {
    //     let xdata = this.dataXColumnar
    //     //  柱状图
    //     const bars = echarts.init(this.$refs.bars)
    //     // 指定图表的配置项和数据
    //     var option = {
    //       color: ['#3398DB'],
    //       tooltip: {
    //         trigger: 'axis',
    //         axisPointer: {
    //           // 坐标轴指示器，坐标轴触发有效
    //           type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
    //         }
    //       },
    //       grid: {
    //         left: '3%',
    //         right: '4%',
    //         bottom: '3%',
    //         containLabel: true
    //       },
    //       xAxis: [
    //         {
    //           type: 'category',
    //           data: xdata,
    //           axisTick: {
    //             alignWithLabel: true
    //           }
    //         }
    //       ],
    //       yAxis: [
    //         {
    //           type: 'value'
    //         }
    //       ],
    //       series: [
    //         {
    //           name: '直接访问',
    //           type: 'bar',
    //           barWidth: '60%',
    //           data: [10, 52, 200, 334, 390, 330],
    //           label: {
    //             show: true,
    //             position: 'top'
    //           }
    //         }
    //       ]
    //     }
    //
    //     bars.setOption(option)
    //   })
    // }
  },
  mounted() {
    // 订单统计
    this.polyline()
    if (localStorage.getItem('id') == 0) {
      this.$message({
        type: 'error',
        message: '请先认证店铺信息',
        offset: 80
      })
    }else {
      this.dataChanges()
      // this.columnar()
      // 数据概览初始化数值
      this.dataArray()
    }
  }
}
</script>

<style lang="less" scoped>
.client {
  padding: 24px;
  /deep/ .el-form-item {
    width: 100%;
    /deep/ .el-form-item__content {
      width: 100%;
    }
  }
  .header {
    display: flex;
    width: 100%;
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
</style>
