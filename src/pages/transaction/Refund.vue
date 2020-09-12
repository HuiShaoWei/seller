<template>
  <div class="refund">
    <el-card class="box-card">
      <div class="search-form">
        <el-form :inline="true"
                 :model="formInline"
                 class="demo-form-inline">
          <el-form-item label="订单搜索"
                        class="btn-01">
            <el-select v-model="formInline.orderSeach"
                       placeholder="请选择">
              <el-option v-for="item in orderOptions"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item v-if="formInline.orderSeach !== null"
                        class="btn-02">
            <el-input v-model="formInline.proName"
                      placeholder="请输入关键词"></el-input>
          </el-form-item><br />
          <el-form-item label="申请时间"
                        class="btn-03">
            <el-date-picker v-model="timeArray"
                            value-format="yyyy-MM-dd"
                            type="daterange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item><br />
          <el-form-item label="订单状态"
                        class="btn-04">
            <el-select v-model="formInline.returns"
                       placeholder="请选择">
              <el-option v-for="item in returnsOptions"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="退款方式"
                        class="btn-05">
            <el-select v-model="formInline.ship"
                       placeholder="请选择">
              <el-option v-for="item in shipOptions"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>
          </el-form-item><br />
          <el-form-item label="退款状态"
                        class="btn-06">
            <el-select v-model="formInline.negotiation"
                       placeholder="请选择"
                       @change="monInit">
              <el-option v-for="item in negotiationOptions"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>
          </el-form-item><br />
          <el-form-item class="btn-07">
            <el-button @click="search">查询</el-button>
            <el-button @click="reset">重置</el-button>
            <el-button v-if="num == 0"
                       :disabled="true">导出数据</el-button>
            <el-button v-else
                       @click="exportData">导出数据</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="tables">
        <refundTable :formInline="formInline"
                     ref="refundTable"
                     @child-event="parentEvent"></refundTable>
      </div>
    </el-card>
  </div>
</template>

<script>
import refundTable from '../../components/refund/refundTable'
export default {
  name: 'Refund',
  inject: ['reload'], // 注入依赖刷新当前页面
  data() {
    return {
      // 搜索
      timeArray: [],
      formInline: {
        orderSeach: null,
        proName: '',
        starTime: '',
        endTime: '',
        refund: 0,
        returns: 6,
        ship: null,
        negotiation: '',
      },
      orderOptions: [
        {
          value: 0,
          label: '商品名称',
        },
        {
          value: 1,
          label: '退款编号',
        },
        {
          value: 2,
          label: '运单号',
        },
        {
          value: 3,
          label: '手机号',
        },
      ],
      returnsOptions: [
        {
          value: 1,
          label: '待付款',
        },
        {
          value: 2,
          label: '已付款',
        },
        {
          value: 3,
          label: '已发货',
        },
        {
          value: 4,
          label: '交易已成功',
        },
        {
          value: 5,
          label: '交易关闭',
        },
        {
          value: 6,
          label: '退款/售后',
        },
      ],
      shipOptions: [
        {
          value: 1,
          label: '仅退货（换件商品）',
        },
        {
          value: 2,
          label: '退货退款',
        },
        {
          value: 3,
          label: '退款',
        },
      ],
      negotiationOptions: [
        {
          value: 1,
          label: '退款待处理',
        },
        {
          value: 2,
          label: '已拒绝退款',
        },
        {
          value: 3,
          label: '退款成功',
        },
        {
          value: 4,
          label: '退款关闭',
        },
      ],
      num: 0,
    }
  },
  components: {
    refundTable,
  },
  methods: {
    // 搜索
    search() {
      this.formInline.starTime = this.timeArray[0]
      this.formInline.endTime = this.timeArray[1]
      this.$refs.refundTable.search()
    },
    // 重置
    reset() {
      this.reload()
    },
    // 到处数据
    exportData() {
      this.$refs.refundTable.exportData()
    },
    // 退款状态
    monInit(value) {
      this.$refs.refundTable.monInit(value)
    },
    // 子组件传过来的值
    parentEvent(data) {
      this.num = data
      console.log('this.num', this.num)
    },
  },
}
</script>

<style lang="less" scoped>
.refund {
  & .box-card {
    margin: 24px;
    & .search-form {
      padding: 14px;
      background: rgba(245, 247, 250, 1);
    }
    & .tables {
      margin: 24px 0;
    }
  }
}
/deep/ .btn-01 .el-input {
  width: 160px;
}
/deep/ .btn-02 .el-input {
  width: 200px;
}
/deep/ .btn-03 .el-input__inner {
  width: 370px;
}
/deep/ .btn-04 .el-input,
/deep/ .btn-05 .el-input,
/deep/ .btn-06 .el-input {
  width: 150px;
}
/deep/ .btn-04 .el-input {
  margin-right: 49px;
}
/deep/ .btn-07 .el-button:first-child {
  margin-left: 70px;
}
</style>
