<template>
  <div class="StoreCertification">
    <el-card>
      <p class="title">{{title}}</p><br/>
      <div class="box">
        <div class="personal" @click="personal">
          <p>{{certificationf}}</p>
          <span>{{bankf}}</span><br/>
          <span>{{infof}}</span>
        </div>
        <div class="enterprise" @click="enterprise">
          <p>{{certifications}}</p>
          <span>{{banks}}</span><br/>
          <span>{{infos}}</span>
        </div>
      </div>
    </el-card>
    <!-- 认证弹窗 -->
    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      width="800px"
      :before-close="handleClose">
      <div class="dialogInfo">
        <h3>认证方式: {{certificationt}}</h3>
        <el-form v-if="storeState == 0 || storeState == '' || storeState == null" label-width="140px">
          <p>{{customizefirst}}</p>
          <el-form-item :label="labelNameFirst">
            <el-input v-model="name"></el-input>
          </el-form-item>
          <el-form-item :label="labelNameSecond">
            <el-input v-model="num"></el-input>
          </el-form-item>
          <el-form-item :label="labelNameThird">
            <el-upload
              :limit="1"
              :action="upload_qiniu_url"
              :data="qiniuData"
              list-type="picture-card"
              :before-upload="beforeAvatarUpload"
              :on-success="handleSuccess"
              :on-preview="handlePictureCardPreview1"
              :on-remove="handleRemove">
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="imgVisible" width="400px" :append-to-body="true">
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
          </el-form-item>
          <el-form-item label="联系方式">
            <el-input v-model="phone"></el-input>
          </el-form-item>
          <el-form-item label="验证码">
            <el-input v-model="sms"></el-input>
            <el-button :disabled="flag" @click="sendCode2">{{buttonmsg2}}</el-button>
          </el-form-item>
          <p>{{customizeSconed}}</p>
          <el-form-item label="提现方式">
            <el-tabs v-model="activeName">
              <el-tab-pane label="银行卡支付" name="1">
                <div class="withdraw">
                  <div class="top">
                    <p>1、6~8工作日到账，适合较大金额提现</p>
                    <p>2、手续费0.6%，微信商户收取，平台不收取任何费用</p>
                  </div>
                  <div class="bottom">
                    <el-form-item label="选择银行" style="margin-bottom: 24px;">
                      <el-select v-model="value" placeholder="请选择银行卡类型" @change="bankType">
                        <el-option
                          v-for="item in bankClass"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
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
                    <el-form-item label="银行卡号" style="margin-bottom: 24px;">
                      <el-input v-model="cardnum" placeholder="请输入银行卡号">
                      </el-input>
                    </el-form-item>
                  </div>
                </div>
              </el-tab-pane>
              <!--               <el-tab-pane label="微信转账" name="second">-->
              <!--                  <div class="wechat">-->
              <!--                    <div class="top">-->
              <!--                      <p> 1、1个工作日到账，红包每次最大金额2w元，超过2w元分次发放</p>-->
              <!--                      <p>2、无手续费</p>-->
              <!--                    </div>-->
              <!--                    <div class="bottom">-->
              <!--                      <div class="code">-->
              <!--                        <div class="code-left"></div>-->
              <!--                        <div class="code-right">-->
              <!--                          <p>使用收取红包的微信扫描左边的二维码</p>-->
              <!--                          <p>(此操作用于绑定提现的账号，扫描后点击确定即可)</p>-->
              <!--                        </div>-->
              <!--                      </div>-->
              <!--                      <el-form-item label="微信实名认证" style="margin-bottom: 14px;">-->
              <!--                        <el-input v-model="wechatAuthen" placeholder="请输入微信实名认证姓名"></el-input>-->
              <!--                      </el-form-item>-->
              <!--                      <el-form-item label="身份证号" style="margin-bottom: 14px;">-->
              <!--                        <el-input v-model="idNumber" placeholder="请输入身份证号"></el-input>-->
              <!--                      </el-form-item>-->
              <!--                    </div>-->
              <!--                  </div>-->
              <!--               </el-tab-pane>-->
              <!--               <el-tab-pane label="支付宝转账" name="third">-->
              <!--                  <div class="alipay">-->
              <!--                    <div class="top">-->
              <!--                      <p> 1、1个工作日到账，红包每次最大金额2w元，超过2w元分次发放</p>-->
              <!--                      <p>2、无手续费</p>-->
              <!--                    </div>-->
              <!--                    <div class="bottom">-->
              <!--                      <div class="code">-->
              <!--                        <div class="code-left"></div>-->
              <!--                        <div class="code-right">-->
              <!--                          <p>使用收取红包的微信扫描左边的二维码</p>-->
              <!--                          <p>(此操作用于绑定提现的账号，扫描后点击确定即可)</p>-->
              <!--                        </div>-->
              <!--                      </div>-->
              <!--                      <el-form-item label="支付宝实名认证姓名" style="margin-bottom: 14px;">-->
              <!--                        <el-input v-model="alipayCert" placeholder="请输入支付宝实名认证姓名"></el-input>-->
              <!--                      </el-form-item>-->
              <!--                      <el-form-item label="身份证号" style="margin-bottom: 14px;">-->
              <!--                        <el-input v-model="idCards" placeholder="请输入身份证号"></el-input>-->
              <!--                      </el-form-item>-->
              <!--                    </div>-->
              <!--                  </div>-->
              <!--               </el-tab-pane>-->
            </el-tabs>

          </el-form-item>
        </el-form>
        <el-form v-else label-width="140px">
          <p>{{customizefirst}}</p>
          <el-form-item v-if="oneList.isCompany == 1" :label="labelNameFirst">
            <el-input v-model="oneList.companyName"></el-input>
          </el-form-item>
          <el-form-item v-if="oneList.isCompany == 0" :label="labelNameFirst">
            <el-input v-model="oneList.own"></el-input>
          </el-form-item>
          <el-form-item v-if="oneList.isCompany == 1" :label="labelNameSecond">
            <el-input v-model="oneList.socialCode"></el-input>
          </el-form-item>
          <el-form-item v-if="oneList.isCompany == 0" :label="labelNameSecond">
            <el-input v-model="oneList.idCode"></el-input>
          </el-form-item>
          <el-form-item :label="labelNameThird">
            <span v-for="(item,index) in oneList.sources" :key="index">
               <img width="150" height="150" :src="item" @click="handlePictureCardPreview(item)" alt="">
            </span>
            <el-dialog width="800px" :visible.sync="imgIvew" :append-to-body="true">
              <img width="100%" :src="imgUrl" alt="">
            </el-dialog>
          </el-form-item>
          <el-form-item label="联系方式">
            <el-input v-model="oneList.contactInformation"></el-input>
          </el-form-item>
          <p>{{customizeSconed}}</p>
          <el-form-item label="提现方式">
            <el-tabs v-model="activeName">
              <el-tab-pane label="银行卡支付" name="1">
                <div class="withdraw">
                  <div class="top">
                    <p>1、6~8工作日到账，适合较大金额提现</p>
                    <p>2、手续费0.6%，微信商户收取，平台不收取任何费用</p>
                  </div>
                  <div class="bottom">
                    <el-form-item label="选择银行" style="margin-bottom: 24px;">
                      <el-input v-model="oneList.payName"></el-input>
                    </el-form-item>
                    <el-form-item label="开户银行" style="margin-bottom: 24px;">
                      <el-input v-model="oneList.payaddr"></el-input>
                    </el-form-item>
                    <el-form-item label="开户支行名称" style="margin-bottom: 24px;">
                      <el-input v-model="oneList.bankBranch" placeholder="请输入开户支行名称">
                      </el-input>
                    </el-form-item>
                    <el-form-item label="银行卡号" style="margin-bottom: 24px;">
                      <el-input v-model="oneList.payAccount" placeholder="请输入银行卡号">
                      </el-input>
                    </el-form-item>
                  </div>
                </div>
              </el-tab-pane>
              <!--               <el-tab-pane label="微信转账" name="second">-->
              <!--                  <div class="wechat">-->
              <!--                    <div class="top">-->
              <!--                      <p> 1、1个工作日到账，红包每次最大金额2w元，超过2w元分次发放</p>-->
              <!--                      <p>2、无手续费</p>-->
              <!--                    </div>-->
              <!--                    <div class="bottom">-->
              <!--                      <div class="code">-->
              <!--                        <div class="code-left"></div>-->
              <!--                        <div class="code-right">-->
              <!--                          <p>使用收取红包的微信扫描左边的二维码</p>-->
              <!--                          <p>(此操作用于绑定提现的账号，扫描后点击确定即可)</p>-->
              <!--                        </div>-->
              <!--                      </div>-->
              <!--                      <el-form-item label="微信实名认证" style="margin-bottom: 14px;">-->
              <!--                        <el-input v-model="wechatAuthen" placeholder="请输入微信实名认证姓名"></el-input>-->
              <!--                      </el-form-item>-->
              <!--                      <el-form-item label="身份证号" style="margin-bottom: 14px;">-->
              <!--                        <el-input v-model="idNumber" placeholder="请输入身份证号"></el-input>-->
              <!--                      </el-form-item>-->
              <!--                    </div>-->
              <!--                  </div>-->
              <!--               </el-tab-pane>-->
              <!--               <el-tab-pane label="支付宝转账" name="third">-->
              <!--                  <div class="alipay">-->
              <!--                    <div class="top">-->
              <!--                      <p> 1、1个工作日到账，红包每次最大金额2w元，超过2w元分次发放</p>-->
              <!--                      <p>2、无手续费</p>-->
              <!--                    </div>-->
              <!--                    <div class="bottom">-->
              <!--                      <div class="code">-->
              <!--                        <div class="code-left"></div>-->
              <!--                        <div class="code-right">-->
              <!--                          <p>使用收取红包的微信扫描左边的二维码</p>-->
              <!--                          <p>(此操作用于绑定提现的账号，扫描后点击确定即可)</p>-->
              <!--                        </div>-->
              <!--                      </div>-->
              <!--                      <el-form-item label="支付宝实名认证姓名" style="margin-bottom: 14px;">-->
              <!--                        <el-input v-model="alipayCert" placeholder="请输入支付宝实名认证姓名"></el-input>-->
              <!--                      </el-form-item>-->
              <!--                      <el-form-item label="身份证号" style="margin-bottom: 14px;">-->
              <!--                        <el-input v-model="idCards" placeholder="请输入身份证号"></el-input>-->
              <!--                      </el-form-item>-->
              <!--                    </div>-->
              <!--                  </div>-->
              <!--               </el-tab-pane>-->
            </el-tabs>

          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
          <el-button v-if="storeState !==3" @click="handleClose">取 消</el-button>
          <span v-if="certificationt == '企业认证'">
            <el-button v-if="storeState ==0 || storeState == '' || storeState == null"
                       @click="certification">认证</el-button>
            <el-button v-if="storeState == 1" disabled>审核中</el-button>
            <el-button v-if="storeState == 2" disabled>审核通过</el-button>
            <el-button v-if="storeState ==3" disabled>审核失败</el-button>
          </span>
          <span v-else>
            <el-button v-if="storeState == 0 || storeState == '' || storeState == null"
                       @click="personalCert">认证</el-button>
            <el-button v-if="storeState == 1" disabled>审核中</el-button>
            <el-button v-if="storeState == 2" disabled>审核通过</el-button>
            <el-button v-if="storeState ==3" disabled>审核失败</el-button>
          </span>
             <el-button v-if="storeState ==3" @click="recertify">清除认证</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
  import cityData from '../../components/country-data'

  export default {
    inject: ['reload'], // 注入依赖刷新当前页面
    name: "StoreCertification",
    data() {
      return {
        name: '',
        num: '',
        phone: '',
        sms: '',
        title: '选择认证的类型并点击下一步：（认证通过后类型不可更改）',
        certificationf: '企业认证',
        bankf: '对公银行卡号',
        infof: '针对已具备登记证书的社群/营业执照的企业，可提现至公司银行账户，审核周期为1个工作日',
        certifications: '个人认证',
        banks: '个人银行卡号',
        infos: '针对以人名义用大陆身份证认证，可提现至个人银行账户，审核周期为1个工作日',
        dialogVisible: false,
        certificationt: '',
        dialogTitle: '',
        customizefirst: '',
        customizeSconed: '',
        labelNameFirst: '',
        labelNameSecond: '',
        labelNameThird: '',
        imgVisible: false,
        dialogImageUrl: '',
        activeName: '1',
        buttonmsg2: '获取验证码',
        flag: false, // 点击获取验证码按钮后，禁用按钮点击
        bankClass: [{
          value: '1',
          label: '国家开发银行'
        }, {
          value: '2',
          label: '中国进出口银行'
        }, {
          value: '3',
          label: '中国农业发展银行'
        }, {
          value: '4',
          label: '中国银行'
        }, {
          value: '5',
          label: '中国工商银行'
        }, {
          value: '6',
          label: '中国建设银行'
        }, {
          value: '7',
          label: '中国农业银行'
        }, {
          value: '8',
          label: '中国光大银行'
        }, {
          value: '9',
          label: '中国民生银行'
        }, {
          value: '10',
          label: '中信银行'
        }, {
          value: '11',
          label: '交通银行'
        }, {
          value: '12',
          label: '华夏银行'
        }, {
          value: '13',
          label: '招商银行'
        }, {
          value: '14',
          label: '兴业银行'
        }, {
          value: '15',
          label: '广发银行'
        }, {
          value: '16',
          label: '平安银行'
        }, {
          value: '17',
          label: '上海浦东发展银行'
        }, {
          value: '18',
          label: '恒丰银行'
        }, {
          value: '19',
          label: '浙商银行'
        }, {
          value: '20',
          label: '渤海银行'
        }, {
          value: '21',
          label: '中国邮政储蓄银行'
        }, {
          value: '22',
          label: '城市商业银行'
        }, {
          value: '23',
          label: '北京银行'
        }, {
          value: '24',
          label: '天津银行'
        }, {
          value: '25',
          label: '河北银行'
        }, {
          value: '26',
          label: '沧州银行'
        }, {
          value: '27',
          label: '唐山市商业银行'
        }, {
          value: '28',
          label: '承德银行'
        }, {
          value: '29',
          label: '张家口市商业银行'
        }, {
          value: '30',
          label: '秦皇岛银行'
        }, {
          value: '31',
          label: '邢台银行'
        }, {
          value: '32',
          label: '廊坊银行'
        }, {
          value: '33',
          label: '保定银行'
        }, {
          value: '34',
          label: '邯郸银行'
        }, {
          value: '35',
          label: '衡水银行'
        }, {
          value: '36',
          label: '晋商银行'
        }, {
          value: '37',
          label: '大同市商业银行'
        }, {
          value: '38',
          label: '长治银行'
        }, {
          value: '39',
          label: '其他'
        }],
        value: '',
        selectedOptions: [],//存放默认值
        cityData: cityData,   //存放城市数据
        subbranch: '',
        cardnum: '',
        wechatAuthen: '', // 开户支行名称
        idNumber: '', // 银行卡号
        alipayCert: '', // 支付宝实名认证姓名
        idCards: '', // 身份证号
        uploadUrl: this.GLOBAL.imgApi.replace(/\'/g, ""), // 图片上传地址
        imgUrlList: [], // 存放图片url
        getPayInfo: {}, // 提现方式
        oneList: {}, // 认证信息
        cityInfo: '', // 地区
        bankCard: '', // 银行卡
        //////////// 查看认证 ////////////////
        imgIvew: false,
        imgUrl: '',
        storeState: '',
        // 七牛云图片上传
        qiniuData: {
          key: "",
          // 七牛云 tooken 有效期 50年
          token: "0tJG2oh5JnpsneBzCn3CnP4N1bH3HZgn6HJoHQAt:yuA83mJmMRtMHE53vBPuTr8kZcw=:eyJzY29wZSI6InF1eXV5aWltYWdlIiwiZGVhZGxpbmUiOjMxNzM1MDA1ODV9"
        },
        // 七牛云上传储存区域的上传域名（华东、华北、华南、北美、东南亚）
        upload_qiniu_url: "http://upload-z2.qiniup.com", // 华南
        // 七牛云返回储存图片的子域名
        upload_qiniu_addr: "http://image.quyuyi.com",
        imageUrl: "",
        currentdate: '', // 年月日时分秒
      }
    },
    methods: {
      //检查号码是否符合规范，包括长度，类型
      isCardNo(num) {
        //身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X
        let reg = /(^\d{15}$)|(^\d{17}(\d|X)$)/;
        if (reg.test(this.num) === false) {
          return false;
        }
        return true;
      },
      // 银行卡号(16~19)位正则验证
      isBankCard(cardnum) {
        let regExp = /^([1-9]{1})(\d{15}|\d{18})$/
        if (regExp.test(this.cardnum) === false) {
          return false
        }
        return  true
      },
      // 统一社会信用代码正则表达式(同时支持18位和15位社会信用代码)
      isCreditCode(num) {
        let regExp = /^([0-9A-HJ-NPQRTUWXY]{2}\d{6}[0-9A-HJ-NPQRTUWXY]{10}|[1-9]\d{14})$/
        if (regExp.test(this.num) === false) {
          return false
        }
        return true
      },
      // 检查店铺状态
      async checkStore() {
        let uid = {
          uid: localStorage.getItem('uid')
        }
        let res = await this.$Http.checkStore(uid)
        this.storeState = res.data // 0，null, '' 未审核，1审核中，2审核通过 3 审核失败
      },
      // 企业
      personal() {
        if (localStorage.getItem('id') == 0) {
          this.$message({
            type: 'error',
            message: '请先认证店铺信息',
            offset: 80
          })
        } else {
          this.checkStore()
          // console.log('this.oneList =>', this.oneList)
          // 是否有认证过企业或者是个人(1是企业0是个人)
          if (this.storeState !== null) {
            if (this.oneList == '' || this.oneList == null) { // 没有认证信息
              this.dialogVisible = true
            } else {
              if (this.oneList.isCompany == 0) {
                this.dialogVisible = false
                setTimeout(() => {
                  // 已进行个人认证
                  this.$confirm('您已进行个人认证,此操作将会清除掉您个人认证的所有信息，是否执行此操作?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                  }).then(() => {
                    // 清除认证状态
                    let info = {
                      sid: localStorage.getItem('id'),
                      // isCompany: this.oneList.isCompany
                    }
                    let res = this.$Http.delCertificataion(info)
                    this.$message({
                      type: 'success',
                      message: '清除个人认证成功!',
                      offset: 80
                    })
                    // this.oneList.states == ''
                    // this.oneInfo()
                    this.reload()
                  }).catch(() => {
                  });
                }, 500)
              } else {
                // 认证成功
                this.dialogVisible = true
              }
            }
          } else {
            this.$message({
              type: 'error',
              message: '请先完善店铺信息',
              offset: 80
            })
          }

          this.certificationt = '企业认证'
          this.dialogTitle = '企业认证'
          this.customizefirst = '组织资料'
          this.customizeSconed = '提现信息'
          this.labelNameFirst = '组织/企业全称'
          this.labelNameSecond = '机构/社会信用代码'
          this.labelNameThird = '上传证件'
        }
      },
      // 个人
      // 获取时分秒
      getTime() {
        var date = new Date();
        var seperator1 = "-";
        var seperator2 = ":";
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
          month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
          strDate = "0" + strDate;
        }
        this.currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
          + "_" + date.getHours() + seperator2 + date.getMinutes()
          + seperator2 + date.getSeconds();//年月日时分秒
        var currentmonth = date.getFullYear() + seperator1 + month;//获取年月
      },
      enterprise() {
        if (localStorage.getItem('id') == 0) {
          this.$message({
            type: 'error',
            message: '请先认证店铺信息',
            offset: 80
          })
        } else {
          if (this.storeState !== null) { //判断店铺是否有填写信息
            if (this.oneList == '' || this.oneList == null) { // 没有认证信息
              this.dialogVisible = true
            } else {
              if (this.oneList.isCompany == 1) {
                // 是否已进行企业认证
                this.dialogVisible = false
                setTimeout(() => {
                  // 已进行个人认证
                  this.$confirm('您已进行企业认证,此操作将会清除掉您个人认证的所有信息，是否执行此操作?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                  }).then(() => {
                    // 清除认证状态
                    let info = {
                      sid: localStorage.getItem('id'),
                      // isCompany: this.oneList.isCompany
                    }
                    let res = this.$Http.delCertificataion(info)
                    this.$message({
                      type: 'success',
                      message: '清除企业认证成功!',
                      offset: 80
                    })
                    // this.oneInfo()
                    this.reload()
                  }).catch(() => {
                  });
                }, 500)
              } else {
                this.dialogVisible = true
              }
            }

          } else {
            this.$message({
              type: 'error',
              message: '请先完善店铺信息',
              offset: 80
            })
          }
          this.certificationt = '个人认证'
          this.dialogTitle = '个人认证'
          this.customizefirst = '个人资料'
          this.customizeSconed = '提现信息'
          this.labelNameFirst = '真实姓名'
          this.labelNameSecond = '身份证号'
          this.labelNameThird = '上传证件'
        }
      },
      handleClose() {
        this.dialogVisible = false
        this.reload() // 刷新单前页面
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview1(file) {
        this.dialogImageUrl = file.url;
        this.imgVisible = true;
      },
      handleSuccess(response, file, fileList) {
        this.imgUrlList.push(this.upload_qiniu_addr + '/' + response.key)
        this.getTime()
      },
      beforeAvatarUpload(file) {
        this.qiniuData.key = this.currentdate + '_' + file.name;
        const isJPG = file.type === "image/jpeg";
        const isPNG = file.type === "image/png";
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isJPG && !isPNG) {
          this.$message.error("图片只能是 JPG/PNG 格式!");
          return false;
        }
        if (!isLt2M) {
          this.$message.error("图片大小不能超过 2MB!");
          return false;
        }
      },
      // 验证码
      // 短信登录验证码
      async getCode() {
        let phone = {
          phone: this.phone
        }
        let res = await this.$Http.sms(phone)
      },
      code1() {
        let time = 60
        let timer
        timer = setInterval(() => {
          time--
          if (time === 0) {
            clearInterval(timer)
            this.flag = false
            this.buttonmsg2 = '点击发送验证码'
            return
          }
          this.flag = true
          this.buttonmsg2 = time + '秒后重新发送'
        }, 1000)
        this.getCode()  //获取短信
      },
      sendCode2() {
        let regPhone = /^[1][3,4,5,7,8][0-9]{9}$/
        if (this.phone == '' || this.phone == null || !regPhone.test(this.phone)) {
          this.$message({
            type: 'error',
            message: '手机输入错误',
            offset: 80
          })
        } else {
          this.code1()
        }
      },
      // 银行类型
      bankType(value) {
        let obj = {};
        obj = this.bankClass.find((item) => {
          return item.value === value;
        });
        this.bankCard = obj.label
      },
      // 三级联动
      cityValue(value) {
        this.cityInfo = value.toString().replace(/,/g, '-')
      },
      // 企业认证
      async certification() {
        // this.dialogVisible = false
        if (this.activeName == '1') {
          if (this.name == '' || this.name == null) {
            this.$message({
              type: 'error',
              message: '组织/企业全称不能为空',
              offset: 80
            })
          } else if (this.num == '' || this.num == null) {
            this.$message({
              type: 'error',
              message: '机构/社会信用代码不能为空',
              offset: 80
            })
          } else if (this.isCreditCode(this.num) === false) {
            this.$message({
              type: 'error',
              message: '机构/社会信用代码输入错误',
              offset: 80
            })
          } else if (this.imgUrlList.length == 0) {
            this.$message({
              type: 'error',
              message: '证件不能为空',
              offset: 80
            })
          } else if (this.phone == '' || this.phone == null) {
            this.$message({
              type: 'error',
              message: '手机号码输入错误',
              offset: 80
            })
          } else if (this.sms == '' || this.sms == null) {
            this.$message({
              type: 'error',
              message: '验证码错误',
              offset: 80
            })
          } else if (this.selectedOptions.length == 0) {
            this.$message({
              type: 'error',
              message: '开户银行不能为空',
              offset: 80
            })
          } else if (this.subbranch == '' || this.subbranch == null) {
            this.$message({
              type: 'error',
              message: '开户支行名称不能为空',
              offset: 80
            })
          } else if (this.cardnum == '' || this.cardnum == null) {
            this.$message({
              type: 'error',
              message: '银行卡号不能为空',
              offset: 80
            })
          }  else if (this.isBankCard(this.cardnum) === false) {
            this.$message({
              type: 'error',
              message: '银行卡号输入错误',
              offset: 80
            })
          } else {
            let certificationInfo = {
              shopAuthenticationDetails: {
                companyName: this.name, // 组织/企业全称
                own: '', // 法人姓名
                idCode: '', // 法人身份证
                socialCode: this.num, // 机构/社会信用代码
                sources: JSON.stringify(this.imgUrlList), // 上传证件（图片json数组）
                sid: localStorage.getItem('id'), // 店铺id（该字段从填写店铺信息时候一起传过来）
                contactInformation: this.phone, // 联系方式
                isCompany: 1, // 认证类型（1是企业，0是个人）
              },
              payAccount: {
                payName: this.bankCard, //支付类型的名字 银行卡支付的对应：银行名称
                pid: this.activeName, //支付类型的id
                payAccount: this.cardnum, // 银行卡号
                payAddr: this.cityInfo, //支付地址 银行支付的对应：广东省-广州市-天河区-盈彩支行
                bankBranch: this.subbranch  // 开户支行名称
              },
              code: this.sms, // 验证码
            }
            let res = await this.$Http.certification(certificationInfo, false, {
              headers: {
                'requestNo': localStorage.getItem('idempotency')
              }
            })
            if (res.code === 0) {
              setTimeout(() => {
                this.$message({
                  type: 'success',
                  message: '信息提交成功',
                  offset: 80
                })
                this.dialogVisible = false
                this.reload()
              }, 1000)
            }
            return
          }
        } else if (this.activeName == '2') {
          console.log(2)
          return
        } else {
          console.log(3)
          return
        }
      },
      // 个人认证
      async personalCert() {
        if (this.activeName == '1') {
          if (this.name == '' || this.name == null) {
            this.$message({
              type: 'error',
              message: '组织/企业全称不能为空',
              offset: 80
            })
          } else if (this.num == '' || this.num == null) {
            this.$message({
              type: 'error',
              message: '身份证号码不能为空',
              offset: 80
            })
          } else if (this.isCardNo(this.num) === false) {
            this.$message({
              type: 'error',
              message: '您输入的身份证号码不正确',
              offset: 80
            })
          }
          else if (this.imgUrlList.length == 0) {
            this.$message({
              type: 'error',
              message: '证件不能为空',
              offset: 80
            })
          } else if (this.phone == '' || this.phone == null) {
            this.$message({
              type: 'error',
              message: '手机号码输入错误',
              offset: 80
            })
          } else if (this.sms == '' || this.sms == null) {
            this.$message({
              type: 'error',
              message: '验证码错误',
              offset: 80
            })
          } else if (this.selectedOptions.length == 0) {
            this.$message({
              type: 'error',
              message: '开户银行不能为空',
              offset: 80
            })
          } else if (this.subbranch == '' || this.subbranch == null) {
            this.$message({
              type: 'error',
              message: '开户支行名称不能为空',
              offset: 80
            })
          } else if (this.cardnum == '' || this.cardnum == null) {
            this.$message({
              type: 'error',
              message: '银行卡号不能为空',
              offset: 80
            })
          } else if (this.isBankCard(this.cardnum) === false) {
            this.$message({
              type: 'error',
              message: '银行卡号输入错误',
              offset: 80
            })
          } else {
            let certificationInfo = {
              shopAuthenticationDetails: {
                own: this.name, // 法人姓名
                idCode: this.num, // 法人身份证
                sources: JSON.stringify(this.imgUrlList), // 上传证件（图片json数组）
                sid: localStorage.getItem('id'), // 店铺id（该字段从填写店铺信息时候一起传过来）
                contactInformation: this.phone, // 联系方式
                isCompany: 0, // 认证类型（1是企业，0是个人）
              },
              payAccount: {
                payName: this.bankCard, //支付类型的名字 银行卡支付的对应：银行名称
                pid: this.activeName, //支付类型的id
                payAccount: this.cardnum, // 银行卡号
                payAddr: this.cityInfo, //支付地址 银行支付的对应：广东省-广州市-天河区-盈彩支行
                bankBranch: this.subbranch  // 开户支行名称
              },
              code: this.sms, // 验证码
            }
            let res = await this.$Http.certification(certificationInfo, false, {
              headers: {
                'requestNo': localStorage.getItem('idempotency')
              }
            })
            if (res.code === 0) {
              setTimeout(() => {
                this.$message({
                  type: 'success',
                  message: '信息提交成功',
                  offset: 80
                })
                this.dialogVisible = false
                this.reload()
              }, 1000)
            }
            return
          }
        } else if (this.activeName == '2') {
          console.log(2)
          return
        } else {
          console.log(3)
          return
        }
      },
      // 获取幂等性
      async empotencyId() {
        let res = await this.$Http.empotency()
        if (res.code === 0) {
          localStorage.removeItem('idempotency')
          localStorage.setItem('idempotency', res.data)
        }
      },
      // 查询企业认证信息
      async oneInfo() {
        let uid = {
          uid: localStorage.getItem('uid')
        }
        let res = await this.$Http.one(uid)
        if (res.code === 0) {
          this.oneList = res.data
          if (this.oneList.sources == '' || this.oneList.sources == null) {
            return false
          } else {
            this.oneList.sources = JSON.parse(this.oneList.sources)
          }
          if (this.oneList.payaddr == '' || this.oneList.payaddr == null) {
            return false
          } else {
            this.oneList.payaddr = this.oneList.payaddr.replace(/-/g, '')
          }
        }
      },
      // 查看图片
      handlePictureCardPreview(file) {
        this.imgIvew = true
        this.imgUrl = file
        console.log(file)
      },
      // 重新认证
      async recertify() {
        let recertifyInfo = {
          sid: localStorage.getItem('id'),
          // isCompany: this.oneList.isCompany // 1
        }
        let res = await this.$Http.delCertificataion(recertifyInfo)
        setTimeout(() => {
          this.$message({
            type: 'success',
            message: '清除认证信息成功',
            offset: 80
          })
          this.reload() // 刷新单前页面
        }, 1500)
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
        this.checkStore()
        this.oneInfo()
        this.empotencyId()
      }
      this.getTime()
    }
  }
</script>

<style lang="less" scoped>
  .StoreCertification {
    .el-card {
      margin: 24px;

      & .title {
        margin: 0 !important;
        margin-left: 40px !important;
        color: #666666;
        font-size: 16px !important;
        line-height: 36px !important;
      }

      & .box {
        display: flex;
        width: 900px;

        & div {
          margin-left: 40px;
          cursor: pointer;
          flex: 1;

          & p {
            font-size: 18px;
            color: #ffffff;
            line-height: 36px;
            padding: 22px 0;
            margin: 0;
            text-align: center;
          }

          & span {
            display: inline-block;
            width: 100%;
            font-size: 16px;
            text-align: center;
            color: #ffffff;
            padding: 0 24px 12px 24px;
          }

          & span:last-child {
            margin-bottom: 38px;
          }
        }

        & .personal {
          background-color: #6080F6;
          box-shadow: 0px 6px 16px 0px rgba(0, 52, 242, 0.16);
          border-radius: 6px;
        }

        & .enterprise {
          background-color: #F66060;
          box-shadow: 0px 6px 16px 0px rgba(253, 0, 0, 0.16);
          border-radius: 6px;
        }
      }
    }

    & /deep/ .el-dialog__title {
      font-size: 18px;
      letter-spacing: 2px;
      color: #000000;
      font-weight: bold;
    }

    & /deep/ .el-dialog__body {
      padding: 10px 20px;

      & .dialogInfo {
        & h3 {
          font-size: 15px;
          letter-spacing: 2px;
          color: #000000;
          line-height: 44px;
          padding-left: 14px;
          margin-bottom: 10px;
          background: rgba(245, 247, 250, 1);
        }

        & h3:before {
          content: "|";
          font-size: 22px;
          color: rgba(24, 112, 242, 1);
          display: inline-block;
          font-weight: bold;
          padding-right: 12px;
        }

        & p {
          font-size: 14px;
          color: rgba(51, 51, 51, 1);
          line-height: 36px;
          font-weight: bold;
        }
      }

    }

    & .withdraw {
      background: rgba(245, 245, 245, 1);
      width: 480px;
      margin-left: 6px;
      margin-bottom: 6px;

      & .top {
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
        box-shadow: 0px 6px 10px 0px rgba(0, 0, 0, 0.06);
      }
    }

    & .wechat, & .alipay {
      width: 480px;
      margin-left: 6px;
      margin-bottom: 6px;

      & .top {
        background: rgba(245, 245, 245, 1);

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
        box-shadow: 0px 6px 10px 0px rgba(0, 0, 0, 0.06);

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
  }

  /deep/ .el-input {
    width: 300px;
  }

  /deep/ .el-upload-list--picture-card .el-upload-list__item {
    width: 100px;
    height: 100px;
  }

  @media (max-width: 1000px) {
    .box {
      width: 100% !important;
      display: block !important;
    }

    .personal {
      display: block !important;
      width: 360px;
      margin-left: 0 !important;
      margin: 24px auto !important;
    }

    .enterprise {
      display: block !important;
      width: 360px;
      margin-left: 0 !important;
      margin: 24px auto !important;
    }
  }
</style>
