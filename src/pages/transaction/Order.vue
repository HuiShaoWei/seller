<template>
  <div class="order">
    <el-card class="box-card">
      <!--search-form-->
      <div class="search-form">
        <el-form :inline="true"
                 class="demo-form-inline">
          <el-form-item label="订单搜索"
                        class="btn-01">
            <el-select v-model="propData.value"
                       placeholder="请选择">
              <el-option v-for="item in options"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="btn-02">
            <el-input v-model="propData.proName"
                      placeholder="输入订单号"></el-input>
          </el-form-item>
          <br />
          <el-form-item label="下单时间"
                        class="btn-03">
            <div class="block">
              <el-date-picker v-model="propData.timeArray"
                              value-format="yyyy-MM-dd"
                              type="daterange"
                              range-separator="至"
                              start-placeholder="开始日期"
                              end-placeholder="结束日期">
              </el-date-picker>
            </div>
          </el-form-item>
          <br />
          <el-form-item label="支付方式"
                        class="btn-04">
            <el-select v-model="propData.payWay"
                       placeholder="请选择">
              <el-option v-for="item in payoptions"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <br />
          <el-form-item class="btn-05">
            <el-button type="primary"
                       @click="seach">查询</el-button>
          </el-form-item>
          <el-form-item>
            <el-button @click="reset">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <!--card-->
      <el-tabs type="border-card"
               v-model="propData.card"
               @tab-click="tabClick">
        <el-tab-pane name="1"
                     label="全部">
          <OrderTable v-if="this.propData.card==1"
                      ref="OrderTable"
                      :propData="propData"></OrderTable>
        </el-tab-pane>
        <el-tab-pane name="2"
                     label="待付款">
          <OrderTable v-if="this.propData.card==2"
                      ref="OrderTable"
                      :propData="propData"></OrderTable>
        </el-tab-pane>
        <el-tab-pane name="3"
                     label="待发货">
          <OrderTable v-if="this.propData.card==3"
                      ref="OrderTable"
                      :propData="propData"></OrderTable>
        </el-tab-pane>
        <el-tab-pane name="4"
                     label="交接中">
          <OrderTable v-if="this.propData.card==4"
                      ref="OrderTable"
                      :propData="propData"></OrderTable>
        </el-tab-pane>
        <el-tab-pane name="5"
                     label="已完成">
          <OrderTable v-if="this.propData.card==5"
                      ref="OrderTable"
                      :propData="propData"></OrderTable>
        </el-tab-pane>
        <!--         <el-tab-pane name="6" label="售后/退款">-->
        <!--           <OrderTable v-if="this.propData.card==6" ref="OrderTable" :propData="propData"></OrderTable>-->
        <!--         </el-tab-pane>-->
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import OrderTable from '../../components/transaction/orderTable'
export default {
  name: 'Order',
  inject: ['reload'], // 注入依赖刷新当前页面
  data() {
    return {
      options: [
        //   {
        //   value: 1,
        //   label: '商品名称'
        // },
        {
          value: 2,
          label: '订单号',
        },
      ],
      // 支付方式
      payoptions: [
        {
          value: 0,
          label: '全部',
        },
        {
          value: 1,
          label: '微信',
        },
        {
          value: 2,
          label: '支付宝',
        },
      ],
      propData: {
        card: '1',
        value: '',
        proName: null,
        startTime: null,
        endTime: null,
        payWay: null,
        tableCard: 0,
        timeArray: [],
        ////// 搜索 ///////
        searchLoading: false,
      },
    }
  },
  components: {
    OrderTable,
  },
  methods: {
    // 搜索
    seach() {
      this.$refs.OrderTable.search() // search 传到子组件的方法
    },
    // 重置
    reset() {
      this.reload()
    },
    // tabs 切换
    tabClick() {
      // console.log(this.propData.card)
      if (this.propData.card == 1) {
        this.propData.tableCard = 0
      } else if (this.propData.card == 2) {
        this.propData.tableCard = 1
      } else if (this.propData.card == 3) {
        this.propData.tableCard = 2
      } else if (this.propData.card == 4) {
        this.propData.tableCard = 3
      } else if (this.propData.card == 5) {
        this.propData.tableCard = 4
      } else {
        this.propData.tableCard = 6
      }
    },
  },
}
</script>

<style lang="less" scoped>
.order {
  & .box-card {
    margin: 24px;
    & .search-form {
      padding: 12px;
      background: rgba(245, 247, 250, 1);
      margin-bottom: 20px;
    }
  }
  & /deep/ .el-button--primary {
    background: rgba(24, 112, 242, 1);
    margin: 0;
  }
  & /deep/ .el-button {
    padding: 11px 21px;
    border-radius: 2px;
  }
}
/deep/ .btn-01,
/deep/ .btn-04 {
  width: 228px;
}
/deep/ .btn-01 .el-input,
/deep/ .btn-04 .el-input {
  width: 160px;
}
/deep/ .btn-02 {
  width: 200px;
}
/deep/ .btn-02 .el-input {
  width: 200px;
}
/deep/ .btn-03 {
  width: 440px;
}
/deep/ .btn-03 .el-input__inner {
  width: 370px;
}
/deep/ .btn-05 {
  margin-left: 70px;
}
</style>
