<template>
   <div class="income">
     <el-card>
        <div class="header-tops">
          <p>可用余额 (元)</p>
          <p>
            <span>
                     <countTo :separator='separator' :decimals="decimals" class="countNum" :startVal='startVal' :endVal="countList.availableBalance === 'null' ? 0 : parseInt(countList.availableBalance)" :duration='2000'>
                 </countTo>
                 <el-button id="withdraw" @click="withdraw">提现</el-button>
            </span>
          </p>
        </div>
       <div class="tables">
         <el-table
           border
           :data="tableData"
           style="width: 100%">
           <el-table-column
             prop="paymentAccount"
             label="提现账号"
             >
           </el-table-column>
           <el-table-column
             show-overflow-tooltip
             prop="createTime"
             label="提现时间"
           >
           </el-table-column>
           <el-table-column
             show-overflow-tooltip
             prop="money"
             label="提现金额">
           </el-table-column>
           <el-table-column
             label="状态">
             <template slot-scope="scope">
               <p v-if="scope.row.status == 1" style="color: #F66060;padding: 0;margin: 0">待审核</p>
               <p v-else-if="scope.row.status == 2" style="color: #67C23A;padding: 0;margin: 0">审核成功</p>
               <p v-else-if="scope.row.status == 3" style="color: #F66060;padding: 0;margin: 0">审核失败</p>
             </template>
           </el-table-column>
           <el-table-column
             label="操作">
             <template slot-scope="scope">
               <el-link type="primary" :underline="false" @click="more(scope.row)">查看详情</el-link>
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
     </el-card>
     <!-- 提现弹窗 -->
     <el-dialog
       title="提现"
       :visible.sync="dialogVisible"
       width="30%"
       :before-close="handleClose">
       <p>
         <span>可提现余额</span>
         <span style="color: #F56C6C">￥{{countList.availableBalance === 'null' ? 0 : parseInt(countList.availableBalance) | numFilter }}</span>
       </p>
       <p v-if="activeName==1">
         <span>提现账号</span>
         <span>{{financeList.payName}}: {{financeList.payAccount}}</span>
         <span><el-link style="margin:0 10px" type="primary" :underline="false" @click="modify">新增</el-link></span>
         <span><el-link type="success" :underline="false" @click="getAccountList">切换</el-link></span>
       </p>
       <p v-else-if="activeName ==2">
         <span>提现账号 微信</span>
         <span>124********12</span>
         <span><el-link type="primary" :underline="false" @click="modify">修改</el-link></span>
       </p>
       <p v-else>
         <span>提现账号 支付宝</span>
         <span>124********12</span>
         <span><el-link type="primary" :underline="false" @click="modify">修改</el-link></span>
       </p>
       <p>
         <span>提现金额</span>
         &nbsp;
         <span><el-input onkeyup="this.value = this.value.replace(/[^\d.]/g,'')" v-model="withdrawNum" placeholder="请输入提现金额"></el-input></span>
       </p>
       <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button @click="withdrawSave">确 定</el-button>
        </span>
     </el-dialog>
     <!-- 新增提现方式弹窗 -->
     <el-dialog
       title="提现方式"
       :visible.sync="withdrawPopup"
       width="30%"
       :before-close="withdrawClose">
       <el-tabs v-model="activeName">
         <el-tab-pane label="银行卡" name="1">
           <div class="withdraw">
             <div class="top">
               <p>1、6~8工作日到账，适合较大金额提现</p>
               <p>2、手续费0.6%，微信商户收取，平台不收取任何费用</p>
             </div>
             <div class="bottom">
               <el-form ref="form" label-width="100px">
                 <el-form-item label="选择银行" style="margin-bottom: 24px;">
                   <el-select v-model="value" value-key="value" placeholder="请选择" @change="getvalues">
                     <el-option
                       v-for="item in options"
                       :key="item.value"
                       :label="item.label"
                       :value="item">
                     </el-option>
                   </el-select>
                 </el-form-item>
                 <el-form-item label="开户银行" style="margin-bottom: 24px;">
                   <el-cascader
                     :options="cityData"
                     v-model="selectedOptions"
                     @change="cityValue"
                     :separator="' '"
                   >
                   </el-cascader>
                 </el-form-item>
                 <el-form-item label="开户支行名称" style="margin-bottom: 24px;">
                   <el-input v-model="subbranch" placeholder="请输入开户支行名称">
                   </el-input>
                 </el-form-item>
                 <el-form-item label="姓名" style="margin-bottom: 24px;">
                   <el-input v-model="payee" placeholder="请输入持卡人姓名"></el-input>
                 </el-form-item>
                 <el-form-item label="银行卡号" style="margin-bottom: 24px;">
                   <el-input v-model="cardnum" placeholder="请输入银行卡号">
                   </el-input>
                 </el-form-item>
               </el-form>
             </div>
           </div>
         </el-tab-pane>
<!--         <el-tab-pane label="微信转账" name="2">-->
<!--           <div class="wechat">-->
<!--             <div class="top">-->
<!--               <p> 1、1个工作日到账，红包每次最大金额2w元，超过2w元分次发放</p>-->
<!--               <p>2、无手续费</p>-->
<!--             </div>-->
<!--             <div class="bottom">-->
<!--               <div class="code">-->
<!--                 <div class="code-left"></div>-->
<!--                 <div class="code-right">-->
<!--                   <p>使用收取红包的微信扫描左边的二维码</p>-->
<!--                   <p>(此操作用于绑定提现的账号，扫描后点击确定即可)</p>-->
<!--                 </div>-->
<!--               </div>-->
<!--               <el-form ref="form" label-width="100px">-->
<!--                  <el-form-item label="微信实名认证" style="margin-bottom: 14px;">-->
<!--                 <el-input v-model="wechatAuthen" placeholder="请输入微信实名认证姓名"></el-input>-->
<!--               </el-form-item>-->
<!--                  <el-form-item label="身份证号" style="margin-bottom: 14px;">-->
<!--                 <el-input v-model="idNumber" placeholder="请输入身份证号"></el-input>-->
<!--               </el-form-item>-->
<!--               </el-form>-->
<!--             </div>-->
<!--           </div>-->
<!--         </el-tab-pane>-->
<!--         <el-tab-pane label="支付宝转账" name="3">-->
<!--           <div class="alipay">-->
<!--             <div class="top">-->
<!--               <p> 1、1个工作日到账，红包每次最大金额2w元，超过2w元分次发放</p>-->
<!--               <p>2、无手续费</p>-->
<!--             </div>-->
<!--             <div class="bottom">-->
<!--               <div class="code">-->
<!--                 <div class="code-left"></div>-->
<!--                 <div class="code-right">-->
<!--                   <p>使用收取红包的微信扫描左边的二维码</p>-->
<!--                   <p>(此操作用于绑定提现的账号，扫描后点击确定即可)</p>-->
<!--                 </div>-->
<!--               </div>-->
<!--               <el-form ref="form" label-width="140px">-->
<!--                  <el-form-item label="支付宝实名认证姓名" style="margin-bottom: 14px;">-->
<!--                 <el-input v-model="alipayCert" placeholder="请输入支付宝实名认证姓名"></el-input>-->
<!--               </el-form-item>-->
<!--                  <el-form-item label="身份证号" style="margin-bottom: 14px;">-->
<!--                 <el-input v-model="idCards" placeholder="请输入身份证号"></el-input>-->
<!--               </el-form-item>-->
<!--               </el-form>-->
<!--             </div>-->
<!--           </div>-->
<!--         </el-tab-pane>-->
       </el-tabs>
       <span slot="footer" class="dialog-footer">
    <el-button @click="withdrawPopup = false">取 消</el-button>
    <el-button @click="add">确 定</el-button>
  </span>
     </el-dialog>
     <!-- 修改银行卡方式弹窗 -->
     <el-dialog
       title="银行卡切换"
       :visible.sync="withdrawPopup1"
       width="30%"
       :before-close="withdrawClose">
       <el-tabs v-model="activeName">
         <el-tab-pane label="银行卡" name="1">
           <div class="withdraw">
             <div class="top">
               <p>1、6~8工作日到账，适合较大金额提现</p>
               <p>2、手续费0.6%，微信商户收取，平台不收取任何费用</p>
             </div>
             <div class="bottom">
               <el-form ref="form" label-width="100px">
                 <el-form-item label="已有银行卡">
                   <el-select v-model="obtainValue" value-key="id" placeholder="请选择" @change="changBank">
                     <el-option
                       v-for="item in obtainOptions"
                       :key="item.id"
                       :label="item.payName"
                       :value="item">
                     </el-option>
                   </el-select>
                 </el-form-item>
<!--                 <el-form-item label="选择银行" style="margin-bottom: 24px;">-->
<!--                   <el-select v-model="obtainValue" placeholder="请选择">-->
<!--                     <el-option-->
<!--                       v-for="item in options"-->
<!--                       :key="item.value"-->
<!--                       :label="item.label"-->
<!--                       :value="item.value">-->
<!--                     </el-option>-->
<!--                   </el-select>-->
<!--                 </el-form-item>-->
                 <el-form-item label="开户银行" style="margin-bottom: 24px;">
                   <el-input v-model="switchBank"></el-input>
                 </el-form-item>
                 <el-form-item label="开户支行名称" style="margin-bottom: 24px;">
                   <el-input v-model="switchBankName" placeholder="请输入开户支行名称">
                   </el-input>
                 </el-form-item>
                 <el-form-item label="姓名" style="margin-bottom: 24px;">
                   <el-input v-model="payee" placeholder="请输入持卡人姓名">
                   </el-input>
                 </el-form-item>
                 <el-form-item label="银行卡号" style="margin-bottom: 24px;">
                   <el-input v-model="switchBankCard" placeholder="请输入银行卡号">
                   </el-input>
                 </el-form-item>
               </el-form>
             </div>
           </div>
         </el-tab-pane>
         <!--         <el-tab-pane label="微信转账" name="2">-->
         <!--           <div class="wechat">-->
         <!--             <div class="top">-->
         <!--               <p> 1、1个工作日到账，红包每次最大金额2w元，超过2w元分次发放</p>-->
         <!--               <p>2、无手续费</p>-->
         <!--             </div>-->
         <!--             <div class="bottom">-->
         <!--               <div class="code">-->
         <!--                 <div class="code-left"></div>-->
         <!--                 <div class="code-right">-->
         <!--                   <p>使用收取红包的微信扫描左边的二维码</p>-->
         <!--                   <p>(此操作用于绑定提现的账号，扫描后点击确定即可)</p>-->
         <!--                 </div>-->
         <!--               </div>-->
         <!--               <el-form ref="form" label-width="100px">-->
         <!--                  <el-form-item label="微信实名认证" style="margin-bottom: 14px;">-->
         <!--                 <el-input v-model="wechatAuthen" placeholder="请输入微信实名认证姓名"></el-input>-->
         <!--               </el-form-item>-->
         <!--                  <el-form-item label="身份证号" style="margin-bottom: 14px;">-->
         <!--                 <el-input v-model="idNumber" placeholder="请输入身份证号"></el-input>-->
         <!--               </el-form-item>-->
         <!--               </el-form>-->
         <!--             </div>-->
         <!--           </div>-->
         <!--         </el-tab-pane>-->
         <!--         <el-tab-pane label="支付宝转账" name="3">-->
         <!--           <div class="alipay">-->
         <!--             <div class="top">-->
         <!--               <p> 1、1个工作日到账，红包每次最大金额2w元，超过2w元分次发放</p>-->
         <!--               <p>2、无手续费</p>-->
         <!--             </div>-->
         <!--             <div class="bottom">-->
         <!--               <div class="code">-->
         <!--                 <div class="code-left"></div>-->
         <!--                 <div class="code-right">-->
         <!--                   <p>使用收取红包的微信扫描左边的二维码</p>-->
         <!--                   <p>(此操作用于绑定提现的账号，扫描后点击确定即可)</p>-->
         <!--                 </div>-->
         <!--               </div>-->
         <!--               <el-form ref="form" label-width="140px">-->
         <!--                  <el-form-item label="支付宝实名认证姓名" style="margin-bottom: 14px;">-->
         <!--                 <el-input v-model="alipayCert" placeholder="请输入支付宝实名认证姓名"></el-input>-->
         <!--               </el-form-item>-->
         <!--                  <el-form-item label="身份证号" style="margin-bottom: 14px;">-->
         <!--                 <el-input v-model="idCards" placeholder="请输入身份证号"></el-input>-->
         <!--               </el-form-item>-->
         <!--               </el-form>-->
         <!--             </div>-->
         <!--           </div>-->
         <!--         </el-tab-pane>-->
       </el-tabs>
       <span slot="footer" class="dialog-footer">
    <el-button @click="withdrawPopup1 = false">取 消</el-button>
    <el-button @click="switchSave">确 定</el-button>
  </span>
     </el-dialog>
     <!-- 查看详情弹窗 -->
     <el-dialog
       title="提现详情"
       :visible.sync="moreDialog"
       width="30%"
       :before-close="moreClose">
       <p>
         <span class="pad-right">提现账号</span>
         <span>{{financeInfo.title}}</span>
         <span>{{financeInfo.paymentAccount}}</span>
       </p>
       <p>
         <span class="pad-right">提现时间</span>
         <span>{{financeInfo.createTime}}</span>
       </p>
       <p>
         <span class="pad-right">提现金额</span>
         <span>￥{{financeInfo.money | numFilter}}</span>
       </p>
       <p>
         <span class="pad-right">商品状态</span>
           <span style="color: #F66060;" v-if="financeInfo.status == 1">待审核</span>
           <span style="color: #67C23A;" v-else-if="financeInfo.status == 2">审核成功</span>
           <span style="color: #F66060;" v-else-if="financeInfo.status == 3">审核失败</span>
       </p>
     </el-dialog>
   </div>
</template>

<script>
  import countTo from 'vue-count-to'
  import cityData from "../../components/country-data";
  export default {
    components: { countTo},
    data () {
      return {
        startVal: 0,
        separator: '',
        withdrawNum: '',
        decimals: 2,
        countList: {
          availableBalance: 0,
        },
        dialogVisible: false,
        tableData: [],
        withdrawPopup: false,
        withdrawPopup1: false,
        activeName: '1',
        options: [{
          value: '1',
          label: '国家开发银行'
        },{
          value: '2',
          label: '中国进出口银行'
        },{
          value: '3',
          label: '中国农业发展银行'
        },{
          value: '4',
          label: '中国银行'
        },{
          value: '5',
          label: '中国工商银行'
        },{
          value: '6',
          label: '中国建设银行'
        },{
          value: '7',
          label: '中国农业银行'
        },{
          value: '8',
          label: '中国光大银行'
        },{
          value: '9',
          label: '中国民生银行'
        },{
          value: '10',
          label: '中信银行'
        },{
          value: '11',
          label: '交通银行'
        },{
          value: '12',
          label: '华夏银行'
        },{
          value: '13',
          label: '招商银行'
        },{
          value: '14',
          label: '兴业银行'
        },{
          value: '15',
          label: '广发银行'
        },{
          value: '16',
          label: '平安银行'
        },{
          value: '17',
          label: '上海浦东发展银行'
        },{
          value: '18',
          label: '恒丰银行'
        },{
          value: '19',
          label: '浙商银行'
        },{
          value: '20',
          label: '渤海银行'
        },{
          value: '21',
          label: '中国邮政储蓄银行'
        },{
          value: '22',
          label: '城市商业银行'
        },{
          value: '23',
          label: '北京银行'
        },{
          value: '24',
          label: '天津银行'
        },{
          value: '25',
          label: '河北银行'
        },{
          value: '26',
          label: '沧州银行'
        },{
          value: '27',
          label: '唐山市商业银行'
        },{
          value: '28',
          label: '承德银行'
        },{
          value: '29',
          label: '张家口市商业银行'
        },{
          value: '30',
          label: '秦皇岛银行'
        },{
          value: '31',
          label: '邢台银行'
        },{
          value: '32',
          label: '廊坊银行'
        },{
          value: '33',
          label: '保定银行'
        },{
          value: '34',
          label: '邯郸银行'
        },{
          value: '35',
          label: '衡水银行'
        },{
          value: '36',
          label: '晋商银行'
        },{
          value: '37',
          label: '大同市商业银行'
        },{
          value: '38',
          label: '长治银行'
        },{
          value: '39',
          label: '其他'
        }],
        value: '中国工商银行',
        selectedOptions: [],//存放默认值
        cityData: cityData,   //存放城市数据
        subbranch: '',
        cardnum: '',
        wechatAuthen: '', // 开户支行名称
        idNumber: '', // 银行卡号
        alipayCert: '', // 支付宝实名认证姓名
        idCards: '', // 身份证号，
        payee: '', // 持卡人姓名
        ////////////
        moreDialog: false,
        // 分页
        rowsPerPage: 15,
        page: 1,
        total:0,
        pageSizes: [10, 15, 20, 25],
        financeInfo: {},
        ////////////////////
        financeList: {}, // 体现数据信息
        ///////////////  获取已有账号列表  ///////////////
        obtainValue: '',
        obtainOptions: [],
        obtainBank: '',
        switchBank: '',
        switchBankName: '',
        switchBankCard: '',
        switchBankId: '',
      }
    },
    methods: {
      // 上半部分数据初始化
      async dataInit () {
        let info = {
          storeId: localStorage.getItem('id')
        }
        let res = await this.$Http.financeCount(info)
        this.countList = res.data
      },
      // 数据初始化
      async init () {
        let info = {
          page: this.page,
          rows: this.rowsPerPage,
          storeId: localStorage.getItem('id'), // 店铺id
          status: 0 // 查全部
        }
        let res = await this.$Http.financeIncome(info)
        this.tableData = res.data.items
        this.total = res.data.total
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
      // 提现查询接口(账号信息)
      async withdrawInit () {
        let info = {
          sid: localStorage.getItem('id') // 店铺
        }
        let res = await this.$Http.financeAccount(info)
        this.financeList = res.data
      },
       withdraw () {
        if(localStorage.getItem('id') == 0) {
          this.$message({
            type: 'error',
            message: '请先认证店铺信息',
            offset: 80
          })
        } else {
          this.dialogVisible = true
          this.withdrawInit()
        }
      },
      handleClose(done) {
        done ()
      },
      // 添加账号
      async add () {
        if (this.subbranch == '' || this.subbranch == null) {
           this.$message({
             type: 'error',
             message: '开户支行不能为空',
             offset: 80
           })
          return  false
        }else if (this.payee == '' || this.payee == null) {
          this.$message({
            type: 'error',
            message: '持卡人姓名不能为空',
            offset: 80
          })
          return  false
        } else if (this.cardnum == '' || this.cardnum == null) {
           this.$message({
             type: 'error',
             message: '银行卡号不能为空',
             offset: 80
           })
          return  false
        } else if (this.selectedOptions.length == 0) {
           this.$message({
             type: 'error',
             message: '开户银行不能为空',
             offset: 80
           })
          return  false
        } else if (this.value == '' || this.value == null) {
           this.$message({
             type: 'error',
             message: '选择银行不能为空',
             offset: 80
           })
          return  false
        }
        let info = {
          bankBranch: this.subbranch, // 开户支行
          payAccount: this.cardnum, // 银行卡号
          payAddr: this.selectedOptions.join().replace(/,/g,'-'), // 开户银行
          payName: this.value, // 选择银行
          sid: localStorage.getItem('id'), // 店铺id
          uid: localStorage.getItem('uid'), // 用户id
          payee: this.payee
        }
        let res = await this.$Http.financeAddAccount(info)
        this.$message({
          type: 'success',
          message: '添加成功',
          offset: 80
        })
        this.subbranch = ''
        this.cardnum = ''
        this.selectedOptions = []
        this.value = ''
        this.withdrawInit()
        this.withdrawPopup = false
      },
      getvalues (selval) {
        this.value = selval.label
      },
      // 查看详情
      more (row) {
        this.moreDialog = true
        this.financeInfo = row
      },
      moreClose (done) {
        done ()
      },
      // 修改
      modify () {
        this.withdrawPopup = true
        this.withdrawInit()
      },
      // 修改支付方式
      async getAccountList(){
        this.withdrawPopup1 = true
        let info = {
          sid: localStorage.getItem('id'), //店铺id
        }
        let res = await this.$Http.financeList(info)
        this.obtainOptions = res.data
        // 默认绑定第一个
        if (this.obtainValue == '') {
          this.obtainValue =this.obtainOptions[0].payName
        }
        if (this.switchBank == '') {
          this.switchBank = this.obtainOptions[0].payAddr;
        }
        if ( this.switchBankName == '') {
          this.switchBankName = this.obtainOptions[0].payAccount;
        }
        if (this.switchBankCard == '') {
          this.switchBankCard = this.obtainOptions[0].bankBranch;
        }

      },
      changBank (selVal) {
        this.obtainBank = selVal.payName;
        this.switchBank = selVal.payAddr;
        this.switchBankName = selVal.payAccount;
        this.switchBankCard = selVal.bankBranch;
        this.switchBankId = selVal.id
      },
      async switchSave () {
        let info = {
          sid: localStorage.getItem('id'), // 店铺id
          accountId: this.switchBankId, // 账号id
        }
        let res = await this.$Http.financeBing(info)
        this.withdrawInit()
        this.withdrawPopup1 = false
      },
      withdrawClose (done) {
        done ()
      },
      // 三级联动
      cityValue(value) {
        // console.log(value.join().replace(/,/g,'-'));
      },
      // 提现操作
      async withdrawSave () {
        if (this.withdrawNum == '' || this.withdrawNum ==null) {
          this.$message({
            type: 'error',
            message: '提现金额不能为空',
            offset: 80
          })
          return false
        }
        else if (this.withdrawNum > Number(this.countList.availableBalance)) {
          // 输入余额不能大于可提现余额
          this.$message({
            type: 'error',
            message: '提现余额不能大于可提现余额',
            offset: 80
          })
          return  false
        } else if (this.withdrawNum == 0) {
          // 输入余额不能大于可提现余额
          this.$message({
            type: 'error',
            message: '提现余额不能为0',
            offset: 80
          })
          return  false
        } else if (this.withdrawNum == '' || this.withdrawNum == null) {
          this.$message({
            type: 'error',
            message: '提现余额不能为空',
            offset: 80
          })
          return  false
        } else if (this.withdrawNum < 0) {
          this.$message({
            type: 'error',
            message: '提现余额不能小于0',
            offset: 80
          })
          return  false
        }
        else {
          // financeWithdraw
          let accountInfo = {
            money: this.withdrawNum, // 提现金额
            balance: this.countList.availableBalance, // 账户余额
            storeId: localStorage.getItem('id'), // 店铺ID
          }
          let res = await this.$Http.financeWithdraw(accountInfo)
          this.dialogVisible = false
          this.withdrawNum = ''
          this.dataInit()
          this.init()
          console.log(res)
        }

      },
    },
    filters: {
      numFilter (value) {
        let realVal = ''
        if (!isNaN(value) && value!== '') {
          // 截取当前数据到小数点后两位
          realVal = parseFloat(value).toFixed(2)
        } else {
          realVal = '--'
        }
        return realVal
      }
    },
    created() {
      if(localStorage.getItem('id') == 0) {
        this.$message({
          type: 'error',
          message: '请先认证店铺信息',
          offset:80
        })
      } else {
        this.init()
        this.dataInit()
      }
    }
  }
</script>

<style lang="less" scoped>
.income {
  margin: 24px;
  & .header-tops {
    background:rgba(245,247,250,1);
    margin-bottom: 20px;
    & p {
      padding-top: 14px;
      padding-left: 24px;
      margin: 0;
    }
    & span {
      font-size: 24px;
      font-weight: bold;
      display: inline-block;
      padding-bottom: 6px;
      margin: 0;
      & #withdraw {
        width:64px;
        height:32px;
        line-height: 32px;
        padding: 0;
        background:rgba(24,112,242,1);
        border-radius:2px;
        margin-left: 18px;
        color: #ffffff;
      }
    }
  }
  & .wechat,& .alipay {
    width: 480px;
    margin-left: 6px;
    margin-bottom: 6px;
    & .top
    {
      background:rgba(245,245,245,1);
      & p {
        color: #333333 !important;
        margin-bottom: 0;
        line-height: 30px;
        font-weight: normal;
        padding-left: 6px;
      }
    }
    & .bottom {
      padding: 12px 0 12px 12px;
      background-color: #ffffff;
      box-shadow:0px 6px 10px 0px rgba(0, 0, 0, 0.06);
      & .code {
        display: flex;
        margin: 20px 0;
        & .code-left {
          width: 80px;
          height: 80px;
          background-color: red;
          flex: 0 0 80px;
        }
        & .code-right {
          flex: 1;
          padding: 10px 0;
          & p {
            color: #333333 !important;
            margin-bottom: 0;
            line-height: 30px;
            font-weight: normal;
            padding-left: 24px;
          }
          & p:last-child {
            color: #999999 !important;
          }
        }
      }
    }
  }
  & .pad-right {
    display: inline-block;
    padding-left: 12px;
    padding-right: 12px;
  }
  .pages {
    margin: 24px 0;
    & /deep/ .el-pagination__editor.el-input {
      width: 50px;
    }
    .tablePagin{
      text-align: end;
    }
    /deep/.el-pagination .el-select .el-input .el-input__inner {
      height: 28px;
    }
  }
}
/deep/ .el-pagination.is-background .el-pager li:not(.disabled).active {
  background-color: #3c8bfe;
}
</style>
