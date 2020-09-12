<template>
    <div class="orderTable">
      <div class="btns" v-if="this.propData.card == 5">
        <el-button type="danger" v-if="multipleSelection.length>0" @click="delOrder">删除订单</el-button>
        <el-button type="danger" v-else :disabled="true">删除订单</el-button>
<!--        <span v-if="this.propData.card==3">-->
<!--          <el-button v-if="multipleSelection.length>0" @click="condelivery">确认发货</el-button>-->
<!--          <el-button v-else :disabled="true">确认发货</el-button>-->
<!--        </span>-->
      </div>
      <div class="tables"
      >
        <el-table
          v-loading="loading"
          element-loading-text="拼命加载中"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(0, 0, 0, 0.8)"
          ref="multipleTable"
          border
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange">
          <el-table-column
            type="selection"
            align="center"
            width="55">
          </el-table-column>
          <el-table-column
            label="订单号"
            show-overflow-tooltip
            align="center"
           >
            <template slot-scope="scope">
              <span>{{scope.row.id }}</span><br/>
            </template>
          </el-table-column>
          <el-table-column
            label="交易类型"
            show-overflow-tooltip
            align="center"
          >
            <template slot-scope="scope">
            <!-- postType 1.线下交易 2.线上交易 -->
              <span v-if="scope.row.postType == 2">线下交易</span>
              <span v-else>线上交易</span>
            </template>
          </el-table-column>
          <el-table-column
            label="下单时间"
            show-overflow-tooltip
            align="center"
          >
            <template slot-scope="scope">
              <span >{{getCreateTime(scope.row)}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="nickName"
            label="买家"
            show-overflow-tooltip
            align="center"
          >
          </el-table-column>
          <el-table-column
            label="交易状态"
            show-overflow-tooltip
            align="center"
          >
            <template slot-scope="scope">
              <p v-if="scope.row.status == 1" style="color: #F66060;padding: 0;margin: 0">待付款</p>
              <p v-else-if="scope.row.status == 2" style="color: #F66060;padding: 0;margin: 0">待发货</p>
              <p v-else-if="scope.row.status == 3" style="color: #F66060;padding: 0;margin: 0">交接中</p>
              <p v-else-if="scope.row.status == 4" style="color: #67C23A;padding: 0;margin: 0">交易成功(用户确认收货)</p>
              <p v-else-if="scope.row.status == 5" style="color: #F66060;padding: 0;margin: 0">取消订单</p>
              <p v-else-if="scope.row.status == 6" style="color: #F66060;padding: 0;margin: 0">退款待处理</p>
              <p v-else-if="scope.row.status == 7" style="color: #F66060;padding: 0;margin: 0">已拒绝退款</p>
              <p v-else-if="scope.row.status == 8" style="color: #F66060;padding: 0;margin: 0">退款成功</p>
              <p v-else-if="scope.row.status == 9" style="color: #F66060;padding: 0;margin: 0">退款关闭</p>
              <p v-else style="color: #F66060;padding: 0;margin: 0">订单未付款，已过期</p>
            </template>
          </el-table-column>
          <el-table-column
            label="实收金额"
            show-overflow-tooltip
            align="center"
          >
            <template slot-scope="scope">
              <span>{{scope.row.actualPay}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            align="center"
          >
            <template slot-scope="scope">
              <el-link type="primary" :underline="false" @click="more(scope.row)">查看详情</el-link>
              &nbsp;
              <span v-if="propData.card==3">
                <el-link v-if="scope.row.postType == 2"  style="color: #67C23A" type="primary" :underline="false" @click="conDelivery(scope.row)">确认发货</el-link>

                <el-link v-else  style="color: #67C23A" type="primary" :underline="false" @click="startServe(scope.row)">开始服务</el-link>
              </span>

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
      <!--查看详情-->
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
                <span style="color: #67C23A;" v-else-if="moreInfo.status == 4">交易成功(用户确认收货)</span>
                <span style="color: #F66060;" v-else-if="moreInfo.status == 5">取消订单</span>
                <span style="color: #F66060;" v-else-if="moreInfo.status == 6">退款待处理</span>
                <span style="color: #F66060;" v-else-if="moreInfo.status == 7">已拒绝退款</span>
                <span style="color: #F66060;" v-else-if="moreInfo.status == 8">退款成功</span>
                <span style="color: #F66060;" v-else-if="moreInfo.status == 9">退款关闭</span>
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
                <span v-if="moreInfo.nickName == null" class="spanfirst">
                  昵称: <b style="color: #F56C6C">暂无昵称</b>
                </span>
                <span v-else class="spanfirst">昵称: {{moreInfo.nickName}}</span>
                <span class="spanfirst" v-if="moreInfo.receiverAddress !== null">收货地址:
                  {{moreInfo.state}}{{moreInfo.city}}
                  {{moreInfo.district}}{{moreInfo.address}}
                </span>
              </p>
              <p class="commonStyle">
                <span class="spanfirst">联系人: {{moreInfo.name}}</span>
                <span class="spanfirst">联系电话: {{moreInfo.phone}}</span>
              </p>
            </div>
            <div class="buyerInfo">
              <h3>订单消息</h3>
              <p class="commonStyle">
                <span class="spanfirst" v-if="moreInfo.orderDetailsList">订单编号: {{moreInfo.orderDetailsList[0].orderId}}</span>
                <span class="spanfirst" v-if="moreInfo.orderDetailsList">创建时间: {{moreInfo.orderDetailsList[0].createTime}}</span>
              </p>
              <p class="commonStyle">
                <span v-if="moreInfo.status !==1">
                <span class="spanfirst" v-if="moreInfo.orderDetailsList">支付时间: {{moreInfo.orderDetailsList[0].paymentTime}}</span>
               </span>
                <span v-if="moreInfo.status == 1">
                 <span class="spanfirst">支付时间: <b style="color: #F56C6C">用户暂未支付</b></span>
                </span>
                <span class="spanfirst" style="margin-left: 24px">付款方式:
                <b style="color: #F56C6C" v-if="moreInfo.paymentType== 0">银行</b>
                <b style="color: #F56C6C" v-else-if="moreInfo.paymentType== 1">微信</b>
                <b style="color: #F56C6C" v-else-if="moreInfo.paymentType== 2">支付宝</b>
                </span>
              </p>
              <p class="commonStyle">
                <span class="spanfirst">发货地址: </span>
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
                  prop="num"
                  label="数量"
                  >
                </el-table-column>
                <el-table-column
                  label="产品总价"
                  >
                  <template slot-scope="scope">
                    {{(scope.row.num * scope.row.prices).toFixed(2)}}
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
                <span style="display: block; width: 100%; flex: 1" v-if="moreInfo.orderDetailsList">
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
      <!-- 确认发货 -->
      <el-dialog
        title="确认发货"
        :visible.sync="conVisible"
        width="30%"
        :before-close="conClose">
        <el-form label-position="right" label-width="80px">
<!--          <el-form-item label="订单名称">-->
<!--            <el-input v-model="orderForm.name"></el-input>-->
<!--          </el-form-item>-->
          <el-form-item label="快递单号">
            <el-input v-model="orderForm.number" onkeyup="value=value.replace(/[^\w\.\/]/ig,'')"></el-input>
          </el-form-item>
          <el-form-item label="快递名称">
            <el-select v-model="value" placeholder="请选择" @change="getKD">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
    <el-button @click="conVisible = false">取 消</el-button>
    <el-button type="primary" @click="conSave">确 定</el-button>
  </span>
      </el-dialog>
    </div>
</template>

<script>
  import common from '../../assets/js/common'
  export default {
    name: "orderTable",
    props: ['propData'],
    data () {
      return {
        tableData: [],
        multipleSelection: [],
        // 分页
        rowsPerPage: 15,
        page: 1,
        total:0,
        pageSizes: [10, 15, 20, 25],
        // 查看详情
        dialogVisible : false,
        active: 1,
        moreInfo: {},
        arr: [],
        // 加载
        loading: false,
        // 时间倒计时
        realDate: 0,
        // 确认发货弹窗
        conVisible: false,
        orderForm: {
          name: '',
          number: '',
        },
        conInfo: {
          id: '',
          shoppingName: ''
        },
        options: [{
          value: 'SF',
          label: '顺丰速运'
        }, {
          value: 'HTKY',
          label: '百世快递'
        }, {
          value: 'ZTO',
          label: '中通快递'
        }, {
          value: 'STO',
          label: '申通快递'
        }, {
          value: 'YTO',
          label: '圆通快递'
        },{
          value: 'YD',
          label: '韵达速运'
        },{
          value: 'YZPY',
          label: '邮政快递包裹'
        },{
          value: 'EMS',
          label: 'EMS'
        },{
          value: 'HHTT',
          label: '天天快递'
        },{
          value: 'JD',
          label: '京东快递'
        },{
          value: 'UC',
          label: '优速快递'
        },{
          value: 'DBL',
          label: '德邦快递'
        },{
          value: 'ZJS',
          label: '宅急送'
        }],
        value: '',
        expressValue: '',
        expressLabel: ''
      }
    },
    methods: {
      // 搜索
      search () {
        if (this.propData.proName !== '' && this.propData.proName !== null) {
          if (this.propData.value == '' || this.propData.value == null) {
            setTimeout (() => {
              this.$message({
                message: '请选择按什么类型搜索',
                type: 'warning',
                offset: 80
              })
            },1500)
            return
          } else if (this.propData.value == 1) {
            // 商品名称
            if(localStorage.getItem('id') == 0) {
              this.$message({
                type: 'error',
                message: '请先认证店铺信息',
                offset: 80
              })
            }else {
              this.init()
            }
            return
          } else if (this.propData.value == 2) {
            // 订单号
            // let isNum = /^[0-9]+.?[0-9]*$/
            if (this.propData.proName == null || this.propData.proName == '') {
                  this.$message({
                    message: '订单号格式输入错误',
                    type: 'warning',
                    offset: 80
                  })
                  return
                } else  {
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
        }
        if (this.propData.timeArray == null) {
          this.propData.startTime = null
          this.propData.endTime = null
          if(localStorage.getItem('id') == 0) {
            this.$message({
              type: 'error',
              message: '请先认证店铺信息',
              offset: 80
            })
          }else {
            this.init()
          }
        } else {
           if (this.propData.timeArray.length ==0) {
             this.propData.startTime = null
             this.propData.endTime = null
             if(localStorage.getItem('id') == 0) {
               this.$message({
                 type: 'error',
                 message: '请先认证店铺信息',
                 offset: 80
               })
             }else {
               this.init()
             }
           } else  {
             this.propData.startTime = this.propData.timeArray[0]
             this.propData.endTime = this.propData.timeArray[1]
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
           }
        }
      },
      // 数据初始化
      async init () {
        let orderInfo = {
              page: this.page,
              rows: this.rowsPerPage,
              shopId: localStorage.getItem('id'),
              status: this.propData.tableCard, // 0 查询全部 1 待付款 2 代发货 3 交接中 4 已完成
              startTime: this.propData.startTime,
              endTime: this.propData.endTime,
              key: this.propData.proName,
              keyType: this.propData.value,
              payType: this.propData.payWay
        }
       let res = await this.$Http.order(orderInfo,false)
          this.tableData = []
          this.propData.searchLoading = true
          setTimeout(() => {
            this.propData.searchLoading = false
            this.tableData = res.data.items
            this.total = res.data.total
          },1500)
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      // 获取订单的下单时间
      getCreateTime (row) {
        let orderDetailsList = row.orderDetailsList
        let createTime = ''
        for (let i=0;i<orderDetailsList.length;i++) {
          createTime = orderDetailsList[i].createTime
        }
        return createTime
      },
      // 表格图片处理
      getImages (row) {
        let img = row
        if (img == String) {
          img = JSON.parse(row.orderDetailsListList.images)
        }
        return img

      },
      // 删除订单
      async delOrder () {
        let ids = []
        for (let i=0;i<this.multipleSelection.length;i++) {
          ids.push(this.multipleSelection[i].id)
        }
        let idsList = {
          ids: ids.toString().replace(new RegExp(',', "g"), ",")
        }
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          let res = await this.$Http.orderDel(idsList)
          if (res.code == 0) {
            this.$message({
              type: 'success',
              message: '删除成功!',
              offset: 80
            });
            this.init()
          }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
            offset: 80
          });
        });
      },
      // 分页
      handleSizeChange(val) {
       this.init()
      },
      handleCurrentChange(val) {
        this.init()
      },
      nextPage() {
        this.page += 1
        this.init()
      },
      prevPage() {
        this.page -= 1
       this.init()
      },
      // 确认发货
      conDelivery (row) {
        this.conVisible = true
        this.conInfo = row
      },
      // 开始服务
      async startServe (row) {
        this.conInfo = row
        let conDeliveList = {
          // id: this.conInfo.id,
          orderId: this.conInfo.id, // 主订单号
          logisticsCode: this.orderForm.number, // 物流单号
          logisticsName: this.expressLabel // 物流名称
        }
        let res = await this.$Http.conDelivery(conDeliveList)
        if (res.code === 0) {
          this.$confirm('是否要执行此操作?, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            setTimeout(() => {
              this.$message({
                message: '操作成功',
                type: 'success',
                offset: 80
              })
              this.init()
            }, 1000)
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            })
          })
        }
      },
      conClose(done) {
        done()
      },
      async conSave () {
       if (this.orderForm.number == '' || this.orderForm.number == null) {
          this.$message({
            message: '快递单号不能为空',
            type: 'error',
            offset: 80
          });
        } else if (this.value == '' || this.value == null) {
          this.$message({
            message: '快递名称不能为空',
            type: 'error',
            offset: 80
          });
        } else {
          let conDeliveList = {
            // id: this.conInfo.id,
            orderId: this.conInfo.id, // 主订单号
            logisticsCode: this.orderForm.number, // 物流单号
            logisticsName: this.expressLabel // 物流名称
          }
          let res = await this.$Http.conDelivery(conDeliveList)
          if (res.code === 0) {
            setTimeout(() =>{
              this.$message({
                message: '操作成功',
                type: 'success',
                offset: 80
              });
              this.init()
            },1000)
            this.conVisible = false
            this.orderForm.number = ''
            this.value = ''
          }
       }
      },
      // 查看详情
      more (row) {
        this.dialogVisible = true
        this.moreInfo = row
        this.arr = row.orderDetailsList
        /////////////// 时间戳转换 ///////////////////////////
        if (Number(row.closeTime) > 0 ) {
          this.realDate = Number(row.closeTime);
        } else {
          this.realDate = 0
        }
      },
      handleClose(done) {
        done()
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
      // 获取快递下标值
      getKD (value) {
        let obj = {};
        obj = this.options.find((item)=>{//这里的userList就是上面遍历的数据源
          return item.value === value;//筛选出匹配数据
        });
        this.expressValue = obj.value
        this.expressLabel = obj.label
        // console.log('快递编码:',this.expressValue,'快递名称:',this.expressLabel)
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

    },
  }
</script>

<style lang="less" scoped>
.orderTable {
  & .btns {
    margin: 24px 0;
  }
  & /deep/ .el-table th {
    background:rgba(245,247,250,1);
  }
  & .orderMore {
    margin: 12px;
  }
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
    & .spanfirst {
      display: inline-block;
      flex: 1;
      padding-left: 24px;
    }
    & span:first-child {
      flex: 1;
    }
  }
  .pages {
    margin: 24px 0;
    & /deep/ .el-pagination__editor.el-input {
      width: 50px;
    }
    .tablePagin{
      text-align: end;
      & /deep/ .el-pagination__sizes .el-input .el-input__inner {
        height: 28px;
        line-height: 28px;
      }
    }
  }
}
/deep/ .el-pagination.is-background .el-pager li:not(.disabled).active {
  background-color: #3c8bfe;
}
</style>
