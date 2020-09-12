<template>
    <div class="accountTab">
      <el-table
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
          prop="itemTitle"
          label="商品名称"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          label="支付时间"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <span style="color: rgb(245, 108, 108);" v-if="scope.row.status == 1">用户暂未支付</span>
            <span v-else>{{scope.row.paymentTime}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="subOrderId"
          label="订单号"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="buyerNick"
          label="客户昵称"
        >
          <template slot-scope="scope">
            <span style="color: rgb(245, 108, 108);"  v-if="scope.row.buyerNick == null">暂无昵称</span>
            <span v-else>{{scope.row.buyerNick}}</span>
          </template>
        </el-table-column>
        <el-table-column
          v-if="propData.card !=0"
          prop="status"
          label="状态"
        >
         <template  slot-scope="scope">
           <p v-if="scope.row.status == 1" style="color: #F66060;padding: 0;margin: 0">待付款</p>
           <p v-else-if="scope.row.status == 2" style="color: #F66060;padding: 0;margin: 0">待发货</p>
           <p v-else-if="scope.row.status == 3" style="color: #F66060;padding: 0;margin: 0">交接中</p>
           <p v-else-if="scope.row.status == 4" style="color: #67C23A;padding: 0;margin: 0">交易成功（用户确认收货）</p>
           <p v-else-if="scope.row.status == 5" style="color: #F66060;padding: 0;margin: 0">取消订单</p>
           <p v-else-if="scope.row.status == 6" style="color: #F66060;padding: 0;margin: 0">退款待处理</p>
           <p v-else-if="scope.row.status == 7" style="color: #F66060;padding: 0;margin: 0">已拒绝退款</p>
           <p v-else-if="scope.row.status == 8" style="color: #F66060;padding: 0;margin: 0">退款成功</p>
           <p v-else-if="scope.row.status == 9" style="color: #F66060;padding: 0;margin: 0">退款关闭</p>
           <p v-else style="color: #F66060;padding: 0;margin: 0">订单未付款，已过期</p>
         </template>
        </el-table-column>
        <el-table-column
          prop="amount"
          label="金额(元)"
        >
        </el-table-column>
        <el-table-column
          label="订单抽成(元)"
          v-if="propData.card == 0"
        >
          <template slot-scope="scope">
          <!--  抽成按3%   -->
            <p style="padding: 0;margin: 0">{{scope.row.amount * 0.03}}</p>
          </template>
        </el-table-column>
        <el-table-column
          label="最终金额(元)"
          v-if="propData.card == 0"
        >
          <template slot-scope="scope">
            <p style="padding: 0;margin: 0">{{scope.row.amount - (scope.row.amount * 0.03) }}</p>
          </template>
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-link type="primary" :underline="false" @click="more(scope.row)">详情</el-link>
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
      <!--查看详情弹窗-->
      <el-dialog
        title="查看详情"
        :visible.sync="dialogVisible"
        width="860px"
        :before-close="handleClose">
        <div class="orderMore">
          <div class="orderSteps">
            <el-steps :active="moreInfo.status" finish-status="success">
              <el-step title="买家下单" :description="moreInfo.createTime"></el-step>
              <el-step title="买家付款" description=""></el-step>
              <el-step title="交接中" description=""></el-step>
              <el-step title="买家确认验收" description=""></el-step>
            </el-steps>
            <p style="margin-top: 20px">
              <span class="status">当前订单状态:</span>
              <span style="color: #F66060;" v-if="moreInfo.status == 1">待付款</span>
              <span style="color: #F66060;" v-else-if="moreInfo.status == 2">待发货</span>
              <span style="color: #F66060;" v-else-if="moreInfo.status == 3">交接中</span>
              <span style="color: #67C23A" v-else-if="moreInfo.status == 4">用户确认收货</span>
              <span style="color: #F66060;" v-else-if="moreInfo.status == 5">交易关闭</span>
              <span style="color: #F66060;" v-else-if="moreInfo.status == 6">售后/退款</span>
              <span style="color: #F66060;" v-else-if="moreInfo.status == 99">订单未付款，已过期</span>
              <span v-if="moreInfo.status == 1 && realDate > 0" class="orderInfo">(买家已下单，等待付款中，
                  <countdown :time="realDate"  :transform="transform">
                    <template slot-scope="props">{{props.totalHours}} : {{ props.minutes }} : {{ props.seconds }}</template>
                  </countdown>
                  关闭订单)</span>
            </p>
            <!--              <p>-->
            <!--&lt;!&ndash;                <el-link type="primary" :underline="false">提现付款</el-link>&ndash;&gt;-->
            <!--                <el-link type="primary" :underline="false">关闭订单</el-link>-->
            <!--              </p>-->
          </div>
          <div class="buyerInfo">
            <h3>买家信息</h3>
            <p class="commonStyle">
              <span v-if="moreInfo.buyerNick == null">昵称:
              <b style="color: #F56C6C">暂无昵称</b>
              </span>
              <span v-else>昵称: {{moreInfo.buyerNick}}</span>
              <span>收货地址:
              {{moreInfo.state}}{{moreInfo.city}}{{moreInfo.district}}{{moreInfo.address}}
              </span>
            </p>
            <p class="commonStyle">
              <span>联系人: {{moreInfo.name}}</span>
              <span>联系电话: {{moreInfo.phone}}</span>
            </p>
          </div>
          <div class="buyerInfo">
            <h3>订单消息</h3>
            <p class="commonStyle">
              <span v-if="moreInfo.orderDetails">订单编号: {{moreInfo.orderDetails[0].orderId}}</span>
              <span>创建时间: {{moreInfo.createTime}}</span>
              <span>付款方式:
                <b style="color: #F56C6C" v-if="moreInfo.paymentType== 0">银行</b>
                <b style="color: #F56C6C" v-else-if="moreInfo.paymentType== 1">微信</b>
                <b style="color: #F56C6C" v-else>支付宝</b>
                </span>
            </p>
            <p class="commonStyle">
              <span v-if="moreInfo.status == 1">支付时间:
              <b style="color: rgb(245, 108, 108)">用户暂未付款</b>
              </span>
              <span v-else>支付时间: {{moreInfo.paymentTime}}</span>
              <span>发货地址:</span>
            </p>
          </div>
          <div class="tables" style="margin-top: 20px">
            <el-table
              :data="arr"
              style="width: 100%">
              <el-table-column
                label="产品图片"
              >
                <template slot-scope="scope">
                  <p  v-if="scope.row.images" style="padding: 0;margin: 0">
                    <img  width="60" height="60" :src="scope.row.images" alt="">
                  </p>
                  <p v-else style="padding: 0;margin: 0">
                    <img  width="60" height="60" src="../../assets/image/null.png" alt="">
                  </p>
                </template>
              </el-table-column>
              <el-table-column
                prop="itemTitle"
                label="产品名称"
              >
              </el-table-column>
              <el-table-column
                prop="checkParams"
                label="产品规格"
              >
              </el-table-column>
              <el-table-column
                prop="prices"
                label="价格"
              >
              </el-table-column>
              <el-table-column
                prop="postFee"
                label="运费"
              >
              </el-table-column>
              <el-table-column
                prop="num"
                label="数量"
              >
              </el-table-column>
              <el-table-column
                label="产品总价"
              >
                <template slot-scope="scope">
                  {{scope.row.num * scope.row.prices}}
                </template>
              </el-table-column>
              <el-table-column
                label="合计金额"
              >
                <template slot-scope="scope">
                  {{(scope.row.num * scope.row.prices + parseFloat(scope.row.postFee)).toFixed(2)}}
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="buyerInfo" v-if="moreInfo.postType == 2">
            <h3>物流消息 <span style="font-size: 14px;color:rgba(153,153,153,1); "></span> </h3>
            <p class="commonStyle">
              <span>物流地址: {{moreInfo.receiverAddress}}</span>
              <span>配送方式: 快递发货</span>
            </p>
            <p class="commonStyle">
              <span>物流公司: {{moreInfo.shoppingName}}</span>
              <span>快递单号: {{moreInfo.shippingCode}}</span>
            </p>
          </div>
          <div class="buyerInfo">
            <h3>备注</h3>
            <p class="commonStyle">
                <span style="display: block; width: 100%; flex: 1">
                  <el-table
                    :data="arr"
                    style="width: 100%">
                <el-table-column
                  prop="itemTitle"
                  label="产品名称"
                >
                </el-table-column>
                    <el-table-column
                      prop="buyerMessage"
                      label="留言"
                    >
                </el-table-column>
                  </el-table>
                </span>
            </p>
          </div>
        </div>
      </el-dialog>
    </div>
</template>

<script>
  export default {
    props: ['propData'],
    data () {
      return {
        tableData: [],
        // 分页
        rowsPerPage: 15,
        page: 1,
        total:0,
        pageSizes: [10, 15, 20, 25],
        /////////////
        dialogVisible: false,
        status: 1,
        moreInfo: {},
        arr: [],
        // 时间倒计时
        realDate: 0,
        type: null,
      }
    },
    methods: {
      // 下半部分表格数据初始化
      async tableInit () {
        if (this.propData.card == 1) {
          this.type = 1
        } else {
          this.type = 0
        }
        let info = {
          storeId: localStorage.getItem('id'), // 店铺ID
          page: this.page, // 页数
          rows: this.rowsPerPage, // 条数
          status: this.type, // 1 账号明细(查询所有订单状态)， 0 结算记录 (只查询已成功状态)
        }
        let res= await this.$Http.financeTable(info)
        this.tableData = res.data.items
        this.total = res.data.total
      },
      // 获取商品名称
      // getItemTitle (row) {
      //   let productName = []
      //   let proTitle = ''
      //   row.orderDetailsList.forEach((item) =>{
      //     productName.push(item.itemTitle)
      //   })
      //   proTitle = productName.join().replace(/,/g,"_")
      //   return proTitle
      // },
      // 获取订单号
      getOrderId (row) {
        let orderIdList = []
        let orderId = ''
        row.orderDetailsList.forEach((item) =>{
          orderIdList.push(item.orderId)
        })
        orderId = orderIdList.join().replace(/,/g,"_")
        return orderId
      },
      // 获取总金额
      getPrice(row) {
        let priceSum = 0
         let price = []
        for (let i = 0; i <row.orderDetailsList.length ; i++) {
          priceSum = priceSum + parseFloat(row.orderDetailsList[i].prices)
        }
        return priceSum
      },
      // 时间倒计时
      transform(props) {
        Object.entries(props).forEach(([key, value]) => {
          // Adds leading zero
          const digits = value < 10 ? `0${value}` : value;
          // uses singular form when the value is less than 2
          // const word = value < 2 ? key.replace(/s$/, '') : key;
          props[key] = `${digits}`;
        });
        return props;
      },
      // 详情
      more (row) {
        this.arr = []
        this.dialogVisible = true
        this.moreInfo = row
        this.arr.push(row)
        /////////////// 时间戳转换 ///////////////////////////
        if (Number(row.closeTime) > 0 ) {
          this.realDate = Number(row.closeTime);
        } else {
          this.realDate = 0
        }
      },
      // 分页
      handleSizeChange(val) {
        this.tableInit()
      },
      handleCurrentChange(val) {
        this.tableInit()
      },
      nextPage() {
        this.page += 1
        this.tableInit()
      },
      prevPage() {
        this.page -= 1
        this.tableInit()
      },
      handleClose(done) {
        done()
      }
    },
    created() {
      if (localStorage.getItem('id') == 0) {
        this.$message({
          type: 'error',
          message: '请先认证店铺信息',
          offset: 80
        })
      } else {
        this.tableInit()
      }
    }
  }
</script>

<style lang="less" scoped>
.accountTab {
  & .orderSteps {
    margin-bottom: 20px;
  }
  & .status {
    font-size: 15px;
    font-weight: bold;
    color:rgba(51,51,51,1);
    line-height:32px;
  }
  & .orderInfo {
    font-size:15px;
    font-weight:400;
    color:rgba(246,96,96,1);
    line-height:32px;
    padding-left: 6px;
  }
  & .buyerInfo {
    font-size: 15px;
    letter-spacing: 1px;
    color:rgba(51,51,51,1);
    line-height:36px;
    & h3 {
      background:rgba(245,247,250,1);
      margin-top: 20px;
    }
    & h3:before {
      content: '|';
      font-size: 24px;
      font-weight: bold;
      padding: 0 6px;
      color: rgba(24,112,242,1);
    }
  }
  & .commonStyle {
    display: flex;
    padding-top: 10px;
    margin-bottom: 0;
    & span {
      display: inline-block;
      flex: 1;
      padding-left: 24px;
    }
    & span:first-child {
      width: 280px;
      flex: 0 0 280px;
    }
  }
  & .pages {
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
  & .pad-right {
    display: inline-block;
    padding-left: 12px;
    padding-right: 12px;
  }
}
/deep/ .el-pagination.is-background .el-pager li:not(.disabled).active {
  background-color: #3c8bfe;
}
</style>
