<template>
  <div class="login">
    <div class="header">
      <div class="header-item">
        <div class="header-left">
          <img src="../assets/imgs/logo.png"
               alt="">
        </div>
        <div class="header-right">
          <p class="login-title">欢迎登陆</p>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="login-card"
           v-show="showCard">
        <el-card shadow="hover">
          <el-tabs v-model.trim="activeName"
                   @tab-click="handleClick">
            <el-tab-pane label="密码登录"
                         name="1">
              <div class="pass-login">
                <el-form label-width="70px"
                         class="demo-ruleForm">
                  <el-form-item label="手机号码">
                    <el-input v-model="phone"
                              maxlength="11"
                              name="手机号"
                              placeholder="请输入手机号"
                              label="手机号码">
                    </el-input>
                  </el-form-item>
                </el-form>
                <van-form>
                  <!--                  <van-field v-model="phone"-->
                  <!--                             type="number"-->
                  <!--                             maxlength="11"-->
                  <!--                             name="手机号"-->
                  <!--                             placeholder="请输入手机号"-->
                  <!--                             label="手机号码" />-->
                  <div class="pass">
                    <van-field v-model="password"
                               :type="inputType"
                               name="密码"
                               label="登录密码"
                               :formatter="formatter3"
                               placeholder="请输入密码" />
                    <van-icon v-if="eye"
                              name="eye-o"
                              :disable="disable"
                              size="20"
                              @click="hidenPass" />
                    <van-icon v-else
                              name="closed-eye"
                              :disable="disable"
                              size="20"
                              @click="showPass" />
                  </div>

                  <p class="forget-pass">
                    <el-checkbox v-model="checked">记住密码</el-checkbox>
                    <span @click="forget">忘记密码</span>
                  </p>
                  <van-button type="info"
                              :loading="loading"
                              @click="doLogin">登录</van-button>
                  <!--                   <p class="not-num">未有账号？<span class="reg">立即注册</span></p>-->
                </van-form>
              </div>
            </el-tab-pane>
            <el-tab-pane label="验证码登录"
                         name="2">
              <div class="pass-login">
                <el-form label-width="70px"
                         class="demo-ruleForm">
                  <el-form-item label="手机号码">
                    <el-input v-model="phoneSms"
                              maxlength="11"
                              name="手机号"
                              placeholder="请输入手机号">

                    </el-input>
                  </el-form-item>
                </el-form>
                <van-form>
                  <!--                  <van-field v-model="phoneSms"-->
                  <!--                             type="number"-->
                  <!--                             maxlength="11"-->
                  <!--                             name="手机号"-->
                  <!--                             placeholder="请输入手机号"-->
                  <!--                             label="手机号码" />-->
                  <div class="mess">
                    <van-field v-model="msm"
                               type="text"
                               maxlength="6"
                               name="验证码"
                               label="验证码"
                               placeholder="输入验证码" />
                    <van-button class="mess-btn"
                                :disabled="flag1"
                                size="small"
                                type="default"
                                @click="sendCode1">{{buttonmsg1}}</van-button>
                  </div>
                  <p class="forget-pass"></p>
                  <van-button type="info"
                              :loading="loading"
                              @click="smsLogin">登录</van-button>
                  <!--                   <p class="not-num">未有账号？<span class="reg">立即注册</span></p>-->
                </van-form>
              </div>
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </div>
    </div>
    <div class="footer"></div>
<!--    // 修改密码弹框-->
    <el-dialog title="修改密码"
               :visible.sync="dialogVisible"
               width="400px"
               :before-close="handleClose">
      <div class="pass-login">
        <el-form label-width="70px"
                 class="demo-ruleForm">
          <el-form-item label="手机号码">
            <el-input maxlength="11" v-model="changePhone"
                      placeholder="请输入手机号"></el-input>
          </el-form-item>
        </el-form>
        <van-form>
          <!--          <van-field v-model="changePhone"-->
          <!--                     type="number"-->
          <!--                     maxlength="11"-->
          <!--                     name="手机号"-->
          <!--                     placeholder="请输入手机号"-->
          <!--                     label="手机号码" />-->
          <div class="mess">
            <van-field v-model="changeCode"
                       type="number"
                       maxlength="6"
                       name="验证码"
                       label="验证码"
                       placeholder="输入验证码" />
            <van-button class="mess-btn"
                        :disabled="flag2"
                        size="small"
                        type="default"
                        @click="sendCode2">{{buttonmsg2}}</van-button>
            <van-field v-model="changePassword"
                       type="password"
                       name="密码"
                       label="登录密码"
                       :formatter="formatter1"
                       placeholder="请输入密码" />
            <van-field v-model.trim="conPassword"
                       type="password"
                       name="密码"
                       label="确认密码"
                       :formatter="formatter2"
                       placeholder="请输入密码" />

            <van-field />
          </div>
          <p class="forget-pass"></p>
        </van-form>
      </div>
      <span slot="footer"
            class="dialog-footer">
        <el-button type="primary"
                   @click="save">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>
<script>
  import { Form, Field, Button, Icon, Toast } from 'vant'
  import funClass from '../assets/js/common' // 引用公共类
  export default {
    inject: ['reload'], // 注入依赖刷新当前页面
    data() {
      return {
        activeName: '1',
        phone: '', // 手机号
        password: '', // 密码
        inputType: 'password', // 密码显隐
        eye: false, // 密码图标显示切换
        disable: true, // 是否禁用
        loading: false, // 加载状态
        phoneSms: '', // 验证码登录的手机号码
        checked: true, // 记住密码
        fenlei: funClass, // 引用公共类
        msm: '', // 验证码
        buttonmsg1: '获取验证码',
        buttonmsg2: '获取验证码',
        sms: '', //验证码
        flag1: false, // 点击获取验证码按钮后，禁用按钮点击
        dialogVisible: false, // 修改密码弹窗
        showCard: true, // 是否显示登录界面
        // 修改密码弹窗
        changePhone: '',
        changeCode: '',
        changePassword: '',
        conPassword: '',
        flag2: false // 点击获取验证码按钮后，禁用按钮点击
      }
    },
    // beforeRouteEnter(to, from, next) {
    //   next(vm => {
    //     vm._data.backPath = from.path;  // '/' 登录页
    //   });
    // },
    methods: {
      // 去除空格
      formatter1(changePassword) {
        // 过滤输入的空格
        return changePassword.replace(/ /g,'');
      },
      formatter2(conPassword) {
        // 过滤输入的空格
        return conPassword.replace(/ /g,'');
      },
      formatter3(password) {
        // 过滤输入的空格
        return password.replace(/ /g,'');
      },
      // 将手机号和密码存入缓存
      //读取cookie
      getCookie: function() {
        if (document.cookie.length > 0) {
          var arr = document.cookie.split('; ') //这里显示的格式需要切割一下自己可输出看下
          for (var i = 0; i < arr.length; i++) {
            var arr2 = arr[i].split('=') //再次切割
            //判断查找相对应的值
            if (arr2[0] == 'phone') {
              this.phone = arr2[1] //保存到保存数据的地方
            } else if (arr2[0] == 'password') {
              this.password = arr2[1]
            }
          }
        }
      },
      handleClick(tab, event) {
        // console.log(tab, event);
        let that = this
        if (tab.name == 1) {
          // 密码登录
          document.onkeypress = function(e) {
            var keycode = document.all ? event.keyCode : e.which
            if (keycode == 13) {
              that.doLogin() // 登录方法名
              return false
            }
          }
        } else {
          // 验证码登录
          document.onkeypress = function(e) {
            var keycode = document.all ? event.keyCode : e.which
            if (keycode == 13) {
              that.smsLogin() // 登录方法名
              return false
            }
          }
        }
      },
      // 密码登录
      async doLogin() {
        var phone = /^[1][3,4,5,7,8][0-9]{9}$/ // 验证手机号
        if (this.phone == '' || !phone.test(this.phone)) {
          this.$message({
            message: '手机号输入错误',
            type: 'error'
          })
          return false
        } else if (this.password == '') {
          this.$message({
            message: '密码输入错误',
            type: 'error'
          })
          return false
        } else {
          //判断复选框是否被勾选 勾选则调用配置cookie方法
          if (this.checked == true) {
            // console.log("checked == true");
            //传入账号名，密码，和保存天数3个参数
            this.fenlei.setCookie(this.phone, this.password, 7)
          } else {
            // console.log("清空Cookie");
            //清空Cookie
            this.fenlei.clearCookie()
          }
          let loginInfo = {
            phone: this.phone,
            pass: this.password,
            loginTerminal: 3,
            type: 2
          }
          let res = await this.$Http.login(loginInfo)
          if (res.code === 0) {
            Toast.clear()
            localStorage.setItem('loginInfo', JSON.stringify(res.data))
            localStorage.setItem('isLogin', this.phone)
            localStorage.setItem('Authorization', 'Bearer ' + res.data.token)
            localStorage.setItem('uid', res.data.id)
            if (res.data.storeId == null || res.data.storeId == '') {
              localStorage.setItem('id', 0)
            } else {
              localStorage.setItem('id', res.data.storeId)
            }
            setTimeout(() =>{
              this.$router.push('/index/dashboard')
            },1000)
          } else {
            Toast.clear()
          }
        }
      },
      // 验证码登录
      async smsLogin() {
        var phone = /^[1][3,4,5,7,8][0-9]{9}$/ // 验证手机号
        if (this.phoneSms == '' || !phone.test(this.phoneSms)) {
          this.$message.error('手机号码输入错误')
          return false
        } else if (this.msm == '' || this.msm == null) {
          this.$message.error('验证码输入错误')
          return false
        } else {
          let smsLoginInfo = {
            code: this.msm,
            phone: this.phoneSms,
            loginTerminal: 3,
            type: 2
          }
          let res = await this.$Http.smsLogin(smsLoginInfo)
          if (res.code === 0) {
            localStorage.setItem('loginInfo', JSON.stringify(res.data))
            localStorage.setItem('isLogin', this.phoneSms)
            localStorage.setItem('Authorization', 'Bearer ' + res.data.token)
            localStorage.setItem('uid', res.data.id)
            if (res.data.storeId == null || res.data.storeId == '') {
              localStorage.setItem('id', 0)
            } else {
              localStorage.setItem('id', res.data.storeId)
            }
            this.$router.push('/index/dashboard')
            Toast.clear()
          } else {
            Toast.clear()
          }
        }
      },
      // 验证码
      code() {
        var phone = /^[1][3,4,5,7,8][0-9]{9}$/ // 验证手机号
        if (this.phoneSms == '' || !phone.test(this.phoneSms)) {
          this.$message.error('手机号输入错误')
          return false
        } else {
          let time = 60
          let timer
          timer = setInterval(() => {
            time--
            if (time === 0) {
              clearInterval(timer)
              this.flag1 = false
              this.buttonmsg1 = '点击发送验证码'
              return
            }
            this.flag1 = true
            this.buttonmsg1 = time + '秒后重新发送'
          }, 1000)
          this.getCode1() //获取短信
        }
      },
      // 修改密码
      code1() {
        var phone = /^[1][3,4,5,7,8][0-9]{9}$/ // 验证手机号
        if (this.changePhone == '' || !phone.test(this.changePhone)) {
          this.$message.error('手机号输入错误')
          return false
        } else {
          let time = 60
          let timer
          timer = setInterval(() => {
            time--
            if (time === 0) {
              clearInterval(timer)
              this.flag2 = false
              this.buttonmsg2 = '点击发送验证码'
              return
            }
            this.flag2 = true
            this.buttonmsg2 = time + '秒后重新发送'
          }, 1000)
          this.getCode2() //获取短信
        }
      },
      // 短信登录验证码
      async getCode1() {
        let smsInfo = {
          phone: this.phoneSms
        }
        let res = await this.$Http.sms(smsInfo)
        if (res.code === 0) {
          Toast.clear()
        } else {
          Toast.clear()
        }
      },
      async getCode2() {
        let smsInfo = {
          phone: this.changePhone
        }
        let res = await this.$Http.sms(smsInfo)
        if (res.code === 0) {
          Toast.clear()
        } else {
          Toast.clear()
        }
      },
      // 验证码倒计时
      sendCode1() {
        this.code()
      },
      sendCode2() {
        this.code1()
      },
      // 密码显隐切换
      hidenPass() {
        if (this.password.length != 0) {
          this.disable = false
          this.eye = false
          this.inputType = 'password'
          return false
        } else {
          Toast('请输入密码')
          this.disable = true
        }
      },
      showPass() {
        if (this.password != 0) {
          this.disable = false
          this.eye = true
          this.inputType = 'text'
          return false
        } else {
          Toast('请输入密码')
          this.disable = true
        }
      },
      // 修改密码弹窗
      forget() {
        this.dialogVisible = true
        this.showCard = false
      },
      handleClose(done) {
        done()
        this.showCard = true
      },
      async save() {
        let userVo = {
          phone: this.changePhone,
          pass: this.changePassword,
          code: this.changeCode
        }
        let res = await this.$Http.changePassword(userVo)
        if (res.code === 0) {
          this.$message({
            type: 'success',
            message: '修改成功',
            offset: 80,
          })
          Toast.clear()
          this.dialogVisible = false
          this.showCard = true
        } else {
          Toast.clear()
        }
      }
    },
    components: {
      [Field.name]: Field,
      [Form.name]: Form,
      [Button.name]: Button,
      [Icon.name]: Icon
    },
    mounted() {
      this.getCookie()
    }
  }
</script>
<style lang="less" scoped>
  .login {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  .header {
    position: fixed;
    top: 0;
    width: 100%;
    height: 90px;
    background-color: #ffffff;
  }
  .header-item {
    display: flex;
  }
  .header-left {
    width: 325px;
    flex: 0 0 325px;
    padding: 27px 0;
    padding-left: 178px;
  }
  .header-left:after {
    content: '';
    width: 1px;
    height: 39px;
    background-color: #e5e5e5;
    display: inline-block;
    margin-left: 33px;
  }
  .header-right {
    width: 100%;
    flex: 1;
  }
  .login-title {
    font-weight: bold;
    font-size: 28px;
    font-style: italic;
    font-style: oblique;
    color: #1870f2;
    letter-spacing: 4px;
    line-height: 90px;
    padding-left: 26px;
  }
  .content {
    margin: 90px 0 110px 0;
    flex: 1;
    background-image: url('.././assets/imgs/loginBg.png');
    background-repeat: no-repeat;
    background-size: cover;
    position: relative;
  }
  .login-card {
    position: absolute;
    width: 400px;
    margin: 0 auto;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
  /deep/ .el-card__body {
    padding: 0;
  }
  /deep/ .el-tabs__nav-wrap::after {
    height: 0;
  }
  /deep/ .el-tabs__active-bar {
    height: 0;
  }
  /deep/ .el-tabs__header {
    padding-top: 24px;
    padding-bottom: 30px;
  }
  /deep/ .el-card {
    border-radius: 8px;
  }
  /deep/ .el-tabs__nav-scroll {
    text-align: center;
  }
  /deep/ .el-tabs__nav {
    width: 100%;
    display: flex;
  }
  /deep/ .el-tabs__item {
    padding-right: 0;
    padding-top: 6px;
    flex: 1;
    text-align: center;
    font-size: 18px;
    font-weight: bold;
    color: #666666;
    line-height: 30px;
  }
  /deep/ .el-tabs__item.is-active {
    color: #1870f2;
  }
  /deep/ .el-tabs__item {
    &::after {
      content: '';
      width: 1px;
      height: 24px;
      position: absolute;
      right: -2px;
      top: 12px;
      background-color: #e5e5e5;
      display: inline-block;
    }
  }
  .pass-login {
    padding: 0 20px;
    & .forget-pass {
      text-align: right;
      letter-spacing: 1px;
      font-size: 14px;
    }
    & /deep/ .van-cell {
      font-size: 14px;
      color: #333333;
      margin-bottom: 16px;
    }
    & .forget-pass {
      font-size: 14px;
      color: #1870f2;
      margin: 17px 0 50px 0;
      & span {
        cursor: pointer;
      }
    }
    & /deep/ .van-cell:not(:last-child)::after {
      border-bottom: 1px solid #e5e5e5;
      transform: scaleY(0.7);
    }
    & /deep/ .van-button--info {
      width: 100%;
      font-size: 18px;
      letter-spacing: 2px;
      border-radius: 20px;
      height: 40px;
      line-height: 40px;
      background-color: #1870f2;
      margin-bottom: 50px;
    }
    & /deep/ .not-num {
      text-align: center;
      padding: 18px 0 28px 0;
      & .reg {
        color: #1870f2;
        cursor: pointer;
      }
    }
    & .mess {
      position: relative;
      & .mess-btn {
        position: absolute;
        display: block;
        top: 0px;
        right: 0;
      }
      & /deep/ .van-button--small {
        border: none;
        color: #1870f2;
        font-size: 14px;
        height: 43px;
      }
    }
  }
  /deep/ .el-dialog {
    background-color: #ffffff;
    border-radius: 8px;
  }
  /deep/ .el-dialog__body {
    padding: 30px 0;
  }
  /deep/ .el-dialog__title {
    font-weight: bold;
  }
  /deep/ .el-dialog__footer {
    text-align: center;
    & /deep/ .el-button {
      width: 100%;
      border-radius: 20px;
      background-color: #1870f2;
      height: 40px;
    }
  }
  .pass {
    position: relative;
    & /deep/ .van-icon {
      position: absolute;
      top: 10px;
      right: 0;
      cursor: pointer;
    }
  }
  .footer {
    position: fixed;
    width: 100%;
    height: 110px;
    bottom: 0;
    background-color: #ffffff;
  }
  /deep/ .el-form-item {
    border-bottom: 1px solid #e5e5e5;
    margin: 0 0 20px 15px;
    /deep/ .el-form-item__label {
      width: auto !important;
      font-size: 14px;
      color: #333333;
    }
  }
  /deep/ .el-input__inner {
    border: none;
  }
  /deep/ .el-input__inner::placeholder {
    color: rgb(150, 152, 153);
  }
  .pass-login[data-v-15717af5] .van-cell:not(:last-child)::after {
    webkit-transform: scaleY(1.5);
    transform: scaleY(1.5);
  }
  .el-checkbox:last-of-type {
    float: left;
    margin-left: 16px;
  }
  /deep/ .el-checkbox__input.is-checked .el-checkbox__inner {
    background-color: #1870f2 !important;
    border-color: #1870f2 !important;
  }
  /deep/ .el-checkbox__input.is-checked + .el-checkbox__label {
    color: #1870f2 !important;
  }
</style>
