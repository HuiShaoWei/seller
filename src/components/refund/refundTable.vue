<template>
    <div class="refundTable">
      <el-table
        ref="multipleTable"
        border
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        id="out-table"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          align="center"
          width="55">
        </el-table-column>
        <el-table-column
          align="center"
          label="商品图片"
          width="120">
          <template slot-scope="scope">
            <img :src="scope.row.itemImage" width="50" height="50" alt="" />
          </template>
        </el-table-column>
        <el-table-column
          label="商品名称"
          show-overflow-tooltip
          align="center"
        >
          <template slot-scope="scope">
            <span style="display: block; text-align: left">订单号: &nbsp;{{scope.row.subOrderId}}</span>
            <span style="display: block; text-align: left">商品名: &nbsp;{{scope.row.itemTitle}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="prices"
          label="单价"
          width="100"
          show-overflow-tooltip
          align="center"
        >
        </el-table-column>
        <el-table-column
          label="退款金额"
          width="100"
          show-overflow-tooltip
          align="center"
          >
          <template slot-scope="scope">
            <span>{{Number(scope.row.refundPrices).toFixed(2)}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="发货状态"
          show-overflow-tooltip
          align="center"
        >
          <template slot-scope="scope">
            <span style="color: #F56C6C" v-if="scope.row.status == 1">待付款</span>
            <span style="color: #F56C6C" v-else-if="scope.row.status == 2">已付款(待发货)</span>
            <span style="color: #F56C6C" v-else-if="scope.row.status == 3">已发货(交接中)</span>
            <span style="color: #67C23A" v-else-if="scope.row.status == 4">交易成功(用户确认收货)</span>
            <span style="color: #F56C6C" v-else-if="scope.row.status == 5">取消订单</span>
            <span style="color: #F56C6C" v-else-if="scope.row.status == 6">退款待处理</span>
            <span style="color: #F56C6C" v-else-if="scope.row.status == 7">已拒绝退款</span>
            <span style="color: #F56C6C" v-else-if="scope.row.status == 8">退款成功</span>
            <span style="color: #F56C6C" v-else-if="scope.row.status == 9">退款关闭</span>
            <span style="color: #F56C6C" v-else>订单未付款，已过期"</span>
          </template>
        </el-table-column>
        <el-table-column
          label="退款方式"
          show-overflow-tooltip
          align="center"
        >
          <template slot-scope="scope">
            <span style="color: #F56C6C" v-if="scope.row.refundType ==1">仅退货（换件商品）</span>
            <span style="color: #F56C6C" v-else-if="scope.row.refundType ==2">退货退款</span>
            <span style="color: #F56C6C" v-else-if="scope.row.refundType == 3">退款</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="refundMessage"
          label="退款原因"
          show-overflow-tooltip
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="refundCreateTime"
          label="申请时间"
          show-overflow-tooltip
          align="center"
        >
        </el-table-column>
        <el-table-column
          label="退款状态"
          show-overflow-tooltip
          align="center"
        >
          <template slot-scope="scope">
            <span style="color: #F56C6C" v-if="scope.row.refundStatus == 1">退款待处理</span>
            <span style="color: #F56C6C" v-else-if="scope.row.refundStatus == 2">已拒绝退款</span>
            <span style="color: #67C23A" v-else-if="scope.row.refundStatus == 3">退款成功</span>
            <span style="color: #F56C6C" v-else>退款关闭</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="操作"
          width="180">
          <template slot-scope="scope">
            <el-link type="primary" :underline="false" :disabled="scope.row.refundStatus !== 1" @click="examineSuccess(scope.row)">同意</el-link>
            &nbsp;
            <el-link type="primary" :underline="false" :disabled="scope.row.refundStatus !== 1" @click="examineDestruction(scope.row)">取消</el-link>
          </template>
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
    </div>
</template>

<script>
  export default {
    name: "refundTable",
    props:['formInline'],
    data () {
      return {
        tableData: [],
        orderDetailsList: [],
        multipleSelection: [],
        // 分页
        rowsPerPage: 10,
        page: 1,
        total:0,
        pageSizes: [10, 15, 20, 25],
      }
    },
    methods: {
      // 搜索
      search () {
        if (this.formInline.orderSeach !== null ) {
          if (this.formInline.proName == '' || this.formInline.proName == null) {
            this.$message({
              type: 'success',
              message: '请选择订单搜索类别',
              offset: 80
            })
          }
        }
        if(localStorage.getItem('id') == 0) {
          this.$message({
            type: 'error',
            message: '请先认证店铺信息',
            offset: 80
          })
        }else {
          if(localStorage.getItem('id') == 0) {
            this.$message({
              type: 'error',
              message: '请先认证店铺信息',
              offset: 80
            })
          }else {
            this.init()
          }
        }
      },
      // 数据初始化
      async init () {
        let shopInfo = {
          page: this.page,
          rows: this.rowsPerPage,
          storeId: localStorage.getItem('id'), // 店铺id
          startTime: this.formInline.starTime,
          endTime: this.formInline.endTime,
          keyType: this.formInline.orderSeach, // 搜索框的类型 : 1 商品名称 2 订单号 3 退款编号 4 运单号 5 买家手机号码
          keyValue: this.formInline.proName, // 搜索框的值
          orderStatus: this.formInline.returns, // 订单状态
          refundStatus: this.formInline.negotiation, // 退款状态 1 退款代处理 2 已拒绝退款 3 退款成功 4 退款关闭
          refundType: this.formInline.ship // 退款的类型 1 换货 2 退货退款  3 退款
        }
        let res = await this.$Http.refundOrder(shopInfo)
        if (res.code === 0) {
          this.total = res.data.total
          this.tableData = res.data.items
          this.orderDetailsList = []
          // for (let i= 0;i<this.tableData.length;i++) {
          //   this.orderDetailsList.push(...this.tableData[i].orderDetailsList)
          // }
          // console.log(this.orderDetailsList)
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
        this.$emit('child-event',val.length)
      },
      // 分页
      handleSizeChange(val) {
        // this.getProductList()
      },
      handleCurrentChange(val) {
        // this.getProductList()
      },
      nextPage() {
        this.page += 1
        // this.getProductList()
      },
      prevPage() {
        this.page -= 1
        // this.getProductList()
      },
    // 导出数据
      async exportData () {
        let idList = []
        for (let i = 0; i <this.multipleSelection.length; i++) {
          idList.push(this.multipleSelection[i].subOrderId)
        }
        let ids = {
          orderId: idList.join() // 需要导出excel的 子订单id
        }
        let res = await this.$Http.refundExport(ids,true,{
          responseType: 'blob' // 防止下载下来的excel文件乱码
        })
        if (res.size> 0) {
          const link = document.createElement('a')
          let blob = new Blob([res], {type: 'application/vnd.ms-excel'})
          link.style.display = 'none'
          link.href = URL.createObjectURL(blob)
          link.download = '趋于一退款列表' //下载的文件名
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link)
        } else {
          this.$message({
            type: 'error',
            message: '导出失败',
            offset: 80
          })
        }
      },
      // 同意
      async examineSuccess (row) {
        this.$confirm('是否同意退款, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then( async () => {
          let orderItem = {
            orderId: row.subOrderId, // 子订单id
            state: 3, // 退款状态 1 退款代处理 2 已拒绝退款 3 退款成功 4 退款关闭
          }
          let res = await this.$Http.examineSuccess(orderItem,true)
          if(res.code === 0) {
            this.$message({
              type: "success",
              message: '退款成功',
              offset: 80
            })
            this.init()
          }
        }).catch(() => {
        });


      },
      // 不同意
      async examineDestruction (row) {
        this.$confirm('是否拒绝退款, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then( async() => {
          let orderItem = {
            orderId: row.subOrderId, // 子订单id
            state: 2, // 退款状态 1 退款代处理 2 已拒绝退款 3 退款成功 4 退款关闭
          }
          let res = await this.$Http.examineSuccess(orderItem,true)
          if(res.code === 0) {
            this.$message({
              type: "success",
              message: '取消退款成功',
              offset: 80
            })
            this.init()
          }
        }).catch(() => {
        });
      },
      monInit (value) {
        this.init()
      }
    },
    created() {
      if(localStorage.getItem('id') == 0) {
        this.$message({
          type: 'error',
          message: '请先认证店铺信息',
          offset: 80
        })
      }else {
        this.init()
      }
    }
  }
</script>

<style lang="less" scoped>
.refundTable {
  & /deep/ .el-table thead {
    color: #606266;
  }
  & /deep/ .el-table th {
    background:rgba(245,247,250,1);
  }
  .pages {
    margin: 24px 0;
    & /deep/ .el-pagination__editor.el-input {
      width: 50px;
    }
    .tablePagin{
      text-align: end;
    }
    /deep/ .el-pagination__sizes .el-input .el-input__inner {
      height: 28px;
      line-height: 28px;
    }
  }
}
/deep/ .el-pagination.is-background .el-pager li:not(.disabled).active {
  background-color: #3c8bfe;
}
</style>
