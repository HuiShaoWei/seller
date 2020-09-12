<template>
  <v-container fluid
               grid-list-md>
    <v-layout>
      <div class="data-view">
        <div class="view-title">
          <h3>数据概况</h3>
        </div>
        <div class="data-inco">
          <!-- 上半部分 -->
          <el-col :xs="8"
                  :sm="8"
                  :md="8"
                  :lg="4"
                  :xl="4">
            <div class="grid-content">
              <p>今日访客数</p>
              <countTo :separator='separator'
                       class="countNum"
                       :startVal='startVal'
                       :endVal='indexData.num1'
                       :duration='5000'>{{indexData.num1}}</countTo>
            </div>
          </el-col>
          <el-col :xs="8"
                  :sm="8"
                  :md="8"
                  :lg="4"
                  :xl="4">
            <div class="grid-content">
              <p>昨日访客数</p>
              <countTo :separator='separator'
                       class="countNum"
                       :startVal='startVal'
                       :endVal='indexData.num2'
                       :duration='5000'>{{indexData.num2}}</countTo>
            </div>
          </el-col>
          <el-col :xs="8"
                  :sm="8"
                  :md="8"
                  :lg="4"
                  :xl="4">
            <div class="grid-content">
              <p>今日订单数</p>
              <countTo :separator='separator'
                       class="countNum"
                       :startVal='startVal'
                       :endVal='indexData.num3'
                       :duration='5000'>{{indexData.num3}}</countTo>
            </div>
          </el-col>
          <el-col :xs="8"
                  :sm="8"
                  :md="8"
                  :lg="4"
                  :xl="4">
            <div class="grid-content">
              <p>总成交客户数</p>
              <countTo :separator='separator'
                       class="countNum"
                       :startVal='startVal'
                       :endVal='indexData.num4'
                       :duration='5000'>{{indexData.num4}}</countTo>
            </div>
          </el-col>
          <el-col :xs="8"
                  :sm="8"
                  :md="8"
                  :lg="4"
                  :xl="4">
            <div class="grid-content">
              <p>最新一笔成交金额</p>
              <countTo :separator='separator'
                       class="countNum"
                       :startVal='startVal'
                       :decimals="decimals"
                       :endVal='indexData.num5'
                       :duration='5000'>{{indexData.num5}}</countTo>
            </div>
          </el-col>
          <el-col :xs="8"
                  :sm="8"
                  :md="8"
                  :lg="4"
                  :xl="4">
            <div class="grid-content">
              <p>成交总额(元)</p>
              <countTo :separator='separator'
                       class="countNum"
                       :startVal='startVal'
                       :endVal='indexData.num6'
                       :decimals="decimals"
                       :duration='5000'>{{indexData.num6}}</countTo>
            </div>
          </el-col>
          <!-- 下半部分 -->
          <el-col :xs="8"
                  :sm="8"
                  :md="8"
                  :lg="4"
                  :xl="4">
            <div class="grid-content">
              <p>待付款</p>
              <countTo :separator='separator'
                       class="countNum"
                       :startVal='startVal'
                       :endVal='indexData.num7'
                       :duration='5000'>{{indexData.num7}}</countTo>
            </div>
          </el-col>
          <el-col :xs="8"
                  :sm="8"
                  :md="8"
                  :lg="4"
                  :xl="4">
            <div class="grid-content">
              <p>交接中</p>
              <countTo :separator='separator'
                       class="countNum"
                       :startVal='startVal'
                       :endVal='indexData.num8'
                       :duration='5000'>{{indexData.num8}}</countTo>
            </div>
          </el-col>
          <el-col :xs="8"
                  :sm="8"
                  :md="8"
                  :lg="4"
                  :xl="4">
            <div class="grid-content">
              <p>总成交订单</p>
              <countTo :separator='separator'
                       class="countNum"
                       :startVal='startVal'
                       :endVal='indexData.num9'
                       :duration='5000'>{{indexData.num9}}</countTo>
            </div>
          </el-col>
          <el-col :xs="8"
                  :sm="8"
                  :md="8"
                  :lg="4"
                  :xl="4">
            <div class="grid-content">
              <p>退款/售后</p>
              <countTo :separator='separator'
                       class="countNum"
                       :startVal='startVal'
                       :endVal='indexData.num10'
                       :duration='5000'>{{indexData.num10}}</countTo>
            </div>
          </el-col>
          <el-col :xs="8"
                  :sm="8"
                  :md="8"
                  :lg="4"
                  :xl="4">
            <div class="grid-content">
              <p>发布中的服务</p>
              <countTo :separator='separator'
                       class="countNum"
                       :startVal='startVal'
                       :endVal='indexData.num11'
                       :duration='5000'>{{indexData.num11}}</countTo>
            </div>
          </el-col>
          <el-col :xs="8"
                  :sm="8"
                  :md="8"
                  :lg="4"
                  :xl="4">
            <div class="grid-content">
              <p>昨日成交转化率(%)</p>
              <countTo :separator='separator'
                       class="countNum"
                       :startVal='startVal'
                       :endVal='indexData.num12'
                       :duration='5000'>{{indexData.num12}}</countTo>
            </div>
          </el-col>
        </div>
      </div>
    </v-layout>
    <v-layout>
      <div class="comFun">
        <el-row :gutter="20">
          <el-col :xs="24"
                  :sm="24"
                  :md="14"
                  :lg="16"
                  :xl="16">
            <div class="grid-content bg-purple">
              <div class="view-title">
                <h3>常用功能</h3>
              </div>
              <div class="comList">
                <div class="listTop">
                  <div class="listItem">
                    <router-link :to="{path: '/item/productRelease'}">
                      <span><img src="../assets/imgs/inco1.png"
                             alt=""></span>
                      <p>发布商品</p>
                    </router-link>
                  </div>
                  <div class="listItem">
                    <router-link :to="{path: '/finance/income'}">
                      <span><img src="../assets/imgs/inco2.png"
                             alt=""></span>
                      <p>收入提现</p>
                    </router-link>
                  </div>
                  <div class="listItem">
                    <router-link :to="{path: '/item/productList'}">
                      <span><img src="../assets/imgs/inco3.png"
                             alt=""></span>
                      <p>商品列表</p>
                    </router-link>
                  </div>
                  <div class="listItem">
                    <router-link :to="{path: '/transaction/order'}">
                      <span><img src="../assets/imgs/inco4.png"
                             alt=""></span>
                      <p>订单管理</p>
                    </router-link>
                  </div>
                </div>
                <div class="listbottom">
                  <div class="listItem">
                    <router-link :to="{path: '/item/category'}">
                      <span><img src="../assets/imgs/inco5.png"
                             alt=""></span>
                      <p>分类管理</p>
                    </router-link>
                  </div>
                  <div class="listItem">
                    <router-link :to="{path: '/transaction/evaluation'}">
                      <span><img src="../assets/imgs/inco6.png"
                             alt=""></span>
                      <p>评价管理</p>
                    </router-link>
                  </div>
                  <div class="listItem">
                    <router-link :to="{path: '/customerlist/customer'}">
                      <span><img src="../assets/imgs/inco7.png"
                             alt=""></span>
                      <p>客户管理</p>
                    </router-link>
                  </div>
                  <div class="listItem">
                    <router-link :to="{path: '/dataanalysis/Client'}">
                      <span><img src="../assets/imgs/inco8.png"
                             alt=""></span>
                      <p>流量分析</p>
                    </router-link>
                  </div>
                </div>
              </div>
            </div>
          </el-col>
          <el-col :xs="24"
                  :sm="24"
                  :md="10"
                  :lg="8"
                  :xl="8">
            <div class="grid-content bg-purple">
              <div class="getData">
                <h4 class="dataTitel">日历</h4>
                <p class="content1">{{getData}}</p>
                <p class="content2">{{nowWeek}}</p>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </v-layout>
    <p class="dataTime">实时数据</p>
    <v-layout row
              wrap>
      <v-flex xs12
              md6>
        <v-card>
          <v-card-text class="px2">
            <div style="width: 100%;height:250px">
              <p class="money-list3">支付金额</p>
              <p class="money-list2">
                <countTo :separator='separator'
                         :startVal='startVal'
                         :endVal='indexData.num13'
                         :duration='3000'></countTo>
              </p>
              <p class="money-list3">周同比
                <span v-if="indexData.num13_1>0">
                  <span  style="color: #71dd6a">▲</span>
                <countTo :separator='separator'
                         :startVal='startVal'
                         :endVal='indexData.num13_1'
                         :duration='3000'></countTo>
                </span>
                <span v-else>
                   <span  style="color: #ff0000">▼</span>
                <countTo :separator='separator'
                         :startVal='startVal'
                         :endVal='indexData.num13_1'
                         :duration='3000'></countTo>
                </span>
                % 日同比
                <span v-if="indexData.num13_2 > 0">
                  <span style="color: #71dd6a">▲</span>
                  <countTo :separator='separator'
                           :startVal='startVal'
                           :endVal='indexData.num13_2'
                           :duration='3000'></countTo>
                %
                </span>
                <span v-else>
                  <span  style="color: #ff0000">▼</span>
                  <countTo :separator='separator'
                           :startVal='startVal'
                           :endVal='indexData.num13_2'
                           :duration='3000'></countTo>
                %
                </span>
              </p>
            </div>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs12
              md6>
        <v-card>
          <v-card-text class="px2">
            <div style="width: 100%;height:250px">
              <p class="visitors">访客数</p>
              <countTo class="vis-num"
                       :separator='separator'
                       :startVal='startVal'
                       :endVal='indexData.num14'
                       :duration='3000'></countTo>
              <div ref="lines"
                   id="polyline"
                   style="width: 100%;height:250px">
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs12
              md6>
        <v-card>
          <v-card-text class="px2">
            <div style="width: 100%;height:250px">
              <p class="visitors">支付订单数</p>
              <countTo class="vis-num"
                       :separator='separator'
                       :startVal='startVal'
                       :endVal='indexData.num15'
                       :duration='100'></countTo>
              <div ref="sale"
                   id="polyline"
                   style=" padding-top: 20px;width: 100%;height:250px">
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs12
              md6>
        <v-card>
          <v-card-text class="px2">
            <div style="width: 100%;height:250px">
              <p class="visitors">成交转化率</p>
              <p class="vis-num">
                <countTo :separator='separator'
                         :startVal='startVal'
                         :endVal='indexData.num16'
                         :duration='1000'></countTo>%
              </p>
             <div style="width: 100%;text-align: center">
               <el-progress type="circle" :percentage="this.gaugeData[0]" :color="customColor"></el-progress>
             </div>
            </div>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
// 引入 ECharts 主模块
var echarts = require('echarts/lib/echarts')
require('echarts/lib/chart/gauge')
require('echarts/lib/chart/bar')
require('echarts/lib/chart/line')
import countTo from 'vue-count-to'
import { Toast } from 'vant'
export default {
  name: 'dashboard',
  components: { countTo },
  data() {
    return {
      customColor: 'rgb(24,112,242)',
      startVal: 0,
      separator: '',
      decimals: 2,
      getData: '', // 当前日期
      nowWeek: '', // 当前星期
      barTitle: '',
      indexData: {
        num1: 0,
        num2: 0,
        num3: 0,
        num4: 0,
        num5: 0,
        num6: 0,
        num7: 0,
        num8: 0,
        num9: 0,
        num10: 0,
        num11: 0,
        num12: 0,
        num13: 0,
        num13_1: 0,
        num13_2: 0,
        num14: 0,
        num15: 0,
        num16: 0,
      },
      gaugeData: [0], // 表盘数据
      lineInitData: [0,0,0,0,0,0,0], // 柱状图数据
      polyLineData: [0,0,0,0,0,0,0], // 折线数据
    }
  },
  created() {
    let aData = new Date()
    let week = new Date().getDay()
    this.getData =
      aData.getFullYear() +
      '年' +
      (aData.getMonth() + 1) +
      '月' +
      aData.getDate() +
      '日'
    if (week == 1) {
      this.nowWeek = '星期一'
    } else if (week == 2) {
      this.nowWeek = '星期二'
    } else if (week == 3) {
      this.nowWeek = '星期三'
    } else if (week == 4) {
      this.nowWeek = '星期四'
    } else if (week == 5) {
      this.nowWeek = '星期五'
    } else if (week == 6) {
      this.nowWeek = '星期六'
    } else {
      this.nowWeek = '星期日'
    }
    // this.verify().then(() => {
    //
    // }).catch(() => {
    //   this.$router.push("/login");
    // });
  },
  mounted() {
    setTimeout(() =>{
      // 支付订单数
      this.histogram()
      // 访客数
      this.lineChart()
    },1000)
    if (localStorage.getItem('id') ==0 ) {
      this.$message({
        type: 'error',
        message: '请先认证店铺信息',
        offset: 80,
      })
      return false
    } else {
      // 数据初始化
      this.init()
      this.getStoreInfo()
      // 饼图 折线图 柱形图
      // setTimeout(() =>{
      //   this.histogram()
      //   this.lineChart()
      // },1000)
      // 支付订单数数据
      this.columnarData()
      // 访客数
      this.polylineData()
    }
  },
  methods: {
    // 获取店铺信息
    async getStoreInfo() {
      let uid = {
        uid: localStorage.getItem('uid')
      }
      let res = await this.$Http.getStoreInfo(uid)
      if (res.code === 0) {
        let id = 0
        if (res.data == null || res.data == '') {
          id = 0 // 店铺id
        } else {
          id = res.data.id // 店铺id
          let logo = res.data.logo
            .replace(/\[|]/g, '')
            .replace('"', '')
            .replace('"', '') // 店铺logo
          let storeName = res.data.storeName // 店铺名
          let storePhone = res.data.storePhone // 店铺电话
          let uid = res.data.uid // 用户id
          localStorage.setItem('id', id)
          localStorage.setItem('logo', logo)
          localStorage.setItem('storeName', storeName)
          localStorage.setItem('storePhone', storePhone)
          localStorage.setItem('uid', uid)
          setTimeout(() => {
            Toast.clear()
          }, 1000)
        }
        }
    },
    // 获取首页数据统计
    async init () {
      let sid = {
        sid: localStorage.getItem('id'), // 店铺id
      }
      let res = await this.$Http.homeData(sid)
      if (res.code === 0) {
        this.indexData = res.data
        this.gaugeData[0] = this.indexData.num16
      }

    },
    // 柱状图
    histogram () {
      this.$nextTick(() => {
        let xData = this.lineInitData
        var sale = echarts.init(this.$refs.sale)
        // 指定图表的配置项和数据
        var option = {
          itemStyle: {
            // 设置折线图的颜色
            color: 'rgb(24,112,242)'
          },
          title: {
            text: ''
          },
          tooltip: {},
          legend: {
            data: ['销量']
          },
          xAxis: {
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
          },
          yAxis: {},
          series: [
            {
              name: '销量',
              type: 'bar',
              data: xData
            }
          ]
        }
        // 使用刚指定的配置项和数据显示图表。
        sale.setOption(option)
      })
    },
    // 折线图
    lineChart () {
      this.$nextTick(() => {
        let xData = this.polyLineData
        //  折线图
        const lines = echarts.init(this.$refs.lines)
        // 指定图表的配置项和数据
        var option = {
          itemStyle: {
            // 设置折线图的颜色
            color: 'rgb(24,112,242)'
          },
          xAxis: {
            type: 'category',
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
          },
          yAxis: {
            type: 'value'
          },
          series: [
            {
              data: xData,
              type: 'line',
              smooth: true
            }
          ]
        }
        lines.setOption(option)
      })
    },
    // 支付订单数(柱状图数据)
    async columnarData () {
      let userInfo = {
        queryType: 5, // 按周查询
        sid: localStorage.getItem('id'), // 店铺id
      }
      let res = await this.$Http.payOrder(userInfo)
      this.lineInitData = res.data
    },
    // 访客数(折线图数据)
    async polylineData () {
      let storeId = {
        sid: localStorage.getItem('id') // 店铺id
      }
      let res = await this.$Http.isitorsv(storeId)
      this.polyLineData = res.data
    }
  }
}
</script>

<style lang="less" scoped>
.layout {
  margin: 0px !important;
  margin-bottom: 24px !important;
  background-color: #ffffff;
}
.data-view {
  width: 100%;
  padding-bottom: 24px;
  & .view-title {
    & h3 {
      font-family: MicrosoftYaHei-Bold;
      font-stretch: normal;
      font-size: 18px;
      height: 32px;
      line-height: 32px;
      letter-spacing: 2px;
      color: #303133;
      padding: 0;
      padding-left: 12px;
      padding-right: 12px;
      margin: 20px 0 10px 0;
    }
  }
  & .grid-content {
    & p {
      font-family: MicrosoftYaHei;
      font-size: 16px;
      font-weight: normal;
      font-stretch: normal;
      line-height: 32px;
      letter-spacing: 2px;
      color: #999999;
      padding: 0;
      margin: 0;
      padding-left: 12px;
      padding-bottom: 12px;
    }
    & .countNum {
      font-family: Barlow-Medium;
      font-size: 24px;
      font-weight: bold;
      font-stretch: normal;
      line-height: 32px;
      letter-spacing: 0px;
      color: #333333;
      padding-left: 12px;
      display: inline-block;
      padding-bottom: 38px;
    }
  }
}
.comFun {
  width: 100% !important;
  background-color: #fafafa;
  & .view-title {
    display: flex;
    & h3 {
      font-family: MicrosoftYaHei-Bold;
      flex: 1;
      font-stretch: normal;
      font-size: 18px;
      height: 32px;
      line-height: 32px;
      letter-spacing: 2px;
      color: #303133;
      padding: 0;
      padding-left: 12px;
      padding-right: 12px;
      margin: 20px 0 10px 0;
    }
  }
}
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple {
  background: #ffffff;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
.listTop,
.listbottom {
  display: flex;
  margin-bottom: 20px;
  & .listItem {
    flex: 1;
    font-size: 0;
    height: 40px;
    margin-bottom: 20px;
    & span {
      display: inline-block;
      padding: 0;
      margin: 0;
      margin-left: 12px;
      margin-right: 12px;
      & img {
        width: 40px;
        height: 40px;
      }
    }
    & p {
      display: inline-block;
      font-family: MicrosoftYaHei-Bold;
      font-weight: bold;
      font-size: 16px;
      color: #333333;
      vertical-align: top;
      padding: 0;
      margin: 0;
      line-height: 40px;
      letter-spacing: 2px;
    }
  }
}
.getData {
  & .dataTitel {
    font-family: MicrosoftYaHei-Bold;
    font-weight: bold;
    font-size: 16px;
    height: 44px;
    line-height: 44px;
    letter-spacing: 2px;
    padding-left: 18px;
    color: #ffffff;
    background-color: #1870f2;
  }
  & .content1 {
    padding-top: 45px;
    text-align: center;
    font-family: MicrosoftYaHei-Bold;
    font-size: 20px;
    font-weight: bold;
    line-height: 32px;
    letter-spacing: 2px;
    color: #666666;
  }
  & .content2 {
    text-align: center;
    font-family: MicrosoftYaHei-Bold;
    font-size: 20px;
    font-weight: bold;
    line-height: 32px;
    letter-spacing: 2px;
    color: #666666;
    padding-bottom: 32px;
  }
}
.dataTime {
  background-color: #ffffff;
  margin-bottom: 0;
  font-family: MicrosoftYaHei-Bold;
  font-weight: bold;
  font-size: 18px;
  height: 32px;
  line-height: 32px;
  letter-spacing: 2px;
  color: #303133;
  padding-left: 12px;
  padding-right: 12px;
  padding-top: 24px;
  padding-bottom: 50px;
}
.money-list1,
.money-list3 {
  font-family: MicrosoftYaHei;
  font-size: 16px;
  line-height: 32px;
  letter-spacing: 2px;
  color: #909399;
}
.money-list1 {
  padding-top: 60px;
}
.money-list2 {
  font-family: Barlow-Medium;
  font-size: 24px;
  font-weight: bold;
  line-height: 32px;
  color: #333333;
}
#polyline {
  margin-top: -55px;
}
.visitors {
  font-family: MicrosoftYaHei;
  font-size: 16px;
  font-weight: normal;
  line-height: 32px;
  letter-spacing: 2px;
  color: #909399;
  margin-bottom: 0;
  padding-bottom: 0;
}
.vis-num {
  font-family: Barlow-Medium;
  font-size: 24px;
  font-weight: bold;
  line-height: 32px;
  letter-spacing: 2px;
  color: #333333;
}
</style>
