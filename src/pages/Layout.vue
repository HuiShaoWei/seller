<template>
  <v-app>
    <!-- 左侧导航条 -->
    <v-navigation-drawer persistent
                         :mini-variant="miniVariant"
                         v-model="drawer"
                         enable-resize-watcher
                         fixed
                         app>
      <v-toolbar flat
                 class="transparent">
        <v-list class="pa-0">
          <v-list-tile avatar>
            <v-list-tile-content>
              <img style="margin: 0 auto"
                   src="../assets/imgs/menu-logo.png">
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-toolbar>
      <v-divider />
      <!-- 左侧菜单 -->
      <v-list class="pt-0 menu"
              dense>
        <v-list-group v-model="item.active"
                      v-for="item in items"
                      :key="item.title"
                      no-action>
          <!--一级菜单 -->
          <v-list-tile slot="activator">
            <v-list-tile-content>
              <v-list-tile-title class="title-inco">{{ item.title }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <!-- 二级菜单 -->
          <v-list-tile v-for="subItem in item.items"
                       :key="subItem.title"
                       :to="item.path + subItem.path">
            <v-list-tile-content>
              <v-list-tile-title>{{ subItem.title }}</v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-icon>{{ subItem.action }}</v-icon>
            </v-list-tile-action>
          </v-list-tile>
        </v-list-group>
      </v-list>
      <!--底部内容-->
      <div class="footer">
        <p class="footer-right"><img @click="loginOut"
                                     src="../assets/imgs/out.png"
                                     alt=""></p>
        |
        <p class="footer-left">
          <img @click="messaging"
               src="../assets/imgs/liaotian.png"
               alt="">
          <sup class="unread"
               v-if="totalUnreadCount !== 0">
            <template v-if="totalUnreadCount > 99">99+</template>
            <template v-else>{{totalUnreadCount}}</template>
          </sup>
        </p>
      </div>
    </v-navigation-drawer>
    <!--头部工具条-->
    <v-toolbar app
               :class="[drawer === false ? 'pad-200': '']"
               class="header-top">
      <!-- 隐藏左侧菜单的按钮-->
      <v-toolbar-side-icon @click.stop="drawer = !drawer" />
      <!-- 顶部导航标题 -->
      <!-- 顶部导航用户菜单 -->
      <v-breadcrumbs>
        <!--        <v-icon slot="divider">chevron_right</v-icon>-->
        <v-breadcrumbs-item id="item1">{{item1}}</v-breadcrumbs-item>
        <v-breadcrumbs-item id="item2"> {{item2}}</v-breadcrumbs-item>
      </v-breadcrumbs>
      <div class="user-info">
        <div class="user-style">
          <img v-if="userLoginInfo.image == null"
               @click="dialogAvatar = true"
               class="user-avatar"
               src="../assets/imgs/avatar.png"
               alt="">
          <img v-else
               class="user-avatar"
               @click="dialogAvatar = true"
               :src="userLoginInfo.image"
               alt="">
          <el-popover placement="bottom"
                      width="280"
                      trigger="hover">
            <p style="text-align: left;color: #333333">我的店铺</p>
            <p style="text-align: center">
              <img width="100"
                   height="100"
                   src="../assets/imgs/avatar.png"
                   alt="">
            </p>
            <p style="text-align: center">使用手机扫一扫打开查看</p>
            <p class="user-name"
               slot="reference">我的店铺</p>
          </el-popover>

          <el-button type="primary"
                     class="reload"
                     @click="Refreshs">刷新</el-button>
        </div>
      </div>
    </v-toolbar>
    <!--点击我的头像弹框-->
    <el-dialog title="个人信息修改"
               :visible.sync="dialogAvatar"
               width="580px">
      <el-form v-model="form"
               label-width="120px">
        <el-form-item label="头像">
          <el-upload class="avatar-uploader"
                     :action="upload_qiniu_url"
                     :show-file-list="false"
                     :data="qiniuData"
                     :on-success="handleAvatarSuccess"
                     :on-error="handleError"
                     :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl"
                 :src="imageUrl"
                 class="avatar">
            <i v-else
               class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>

        <el-form-item label="姓名">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <!--        <el-form-item label="账号">-->
        <!--          <el-input v-model="form.account"></el-input>-->
        <!--        </el-form-item>-->
        <el-form-item label="设置新密码">
          <el-input type="password"
                    v-model.trim="form.pass"></el-input>
        </el-form-item>
        <el-form-item label="确认新密码">
          <el-input type="password"
                    v-model.trim="form.newPass"></el-input>
        </el-form-item>
        <el-form-item label="手机号码">
          <el-input v-model="form.phone"></el-input>
          <el-button type="primary"
                     id="getCodes"
                     :disabled="flag"
                     @click="sendCode1">{{buttonmsg}}</el-button>
        </el-form-item>
        <el-form-item label="验证码">
          <el-input v-model="form.code"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="dialogAvatar = false">取消</el-button>
        <el-button class="confirm"
                   @click="save">确认修改</el-button>
      </div>
    </el-dialog>
    <!--中间内容-->
    <v-content :class="[drawer === false ? 'pad-200': '']">
<!--      <v-breadcrumbs>-->
<!--&lt;!&ndash;        <v-icon slot="divider">chevron_right</v-icon>&ndash;&gt;-->
<!--        <v-breadcrumbs-item id="item1">{{item1}}</v-breadcrumbs-item>-->
<!--        <v-breadcrumbs-item id="item2"> {{item2}}</v-breadcrumbs-item>-->
<!--      </v-breadcrumbs>-->
      <div>
          <!--锚点-->
          <router-view></router-view>
          </div>
    </v-content>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex'
import menus from '../menu'
import funClass from '../assets/js/common' // 引用公共类
import { mapState } from 'vuex'
export default {
  inject: ['reload'], // 注入依赖刷新当前页面
  data() {
    return {
      uploadUrl: this.GLOBAL.imgApi.replace(/\'/g, ''),
      drawer: true, // 左侧导航是否隐藏
      miniVariant: false, // 左侧导航是否收起
      menuMap: {},
      username: '123', //管理员信息
      centerDialogVisible: false, // 我的店铺弹窗
      dialogAvatar: false, // 我的头像弹窗
      form: {},
      formLabelWidth: '120px',
      // 头像上传
      dialogImageUrl: '',
      dialogVisible: false,
      flag: false,
      buttonmsg: '获取验证码',
      imageUrl: '', // 用户头像
      userLoginInfo: {}, // 用户登录返回信息
      fenlei: funClass,
      qiniuData: {
        key: "",
        // 七牛云 tooken 有效期 50年
        token: "0tJG2oh5JnpsneBzCn3CnP4N1bH3HZgn6HJoHQAt:yuA83mJmMRtMHE53vBPuTr8kZcw=:eyJzY29wZSI6InF1eXV5aWltYWdlIiwiZGVhZGxpbmUiOjMxNzM1MDA1ODV9"
      },
      // 七牛云上传储存区域的上传域名（华东、华北、华南、北美、东南亚）
      upload_qiniu_url: "http://upload-z2.qiniup.com", // 华南
      // 七牛云返回储存图片的子域名
      upload_qiniu_addr: "http://image.quyuyi.com",
      currentdate: '', // 年月日时分秒
    }
  },
  methods: {
    //提交数据到后台
    handleSubmit() {

    },
    // 退出登录
    async logOut() {
      let phone = {
        phone: localStorage.getItem('isLogin')
      }
      let res = await this.$Http.loginOut(phone)
    },
    loginOut() {
      this.$confirm('确定要退出登录？', '退出登录', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          const loading = this.$loading({
            lock: true,
            text: '正在退出登录...',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          })
          setTimeout(() => {
            loading.close()
            this.$message({
              type: 'success',
              message: '退出成功!'
            })
            this.logOut()
            // localStorage.removeItem('isLogin')
            // localStorage.removeItem('Authorization')
            localStorage.clear() // 清除所有缓存
            this.fenlei.setCookie('', '', -1) // 清除cookie 缓存
            this.$router.replace('/login')
            this.$router.go(0)
          }, 500)
        })
        .catch(() => {})
    },
    // 刷新
    Refreshs() {
      this.reload()
    },
    // 头像上传
    // 获取时间
    getTime () {
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
    beforeAvatarUpload: function(file) {
      this.qiniuData.key = this.currentdate +'_'+ file.name;
      const isJPG = file.type === "image/jpeg";
      const isPNG = file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG && !isPNG) {
        this.$message({
          type: 'error',
          message: "图片只能是 JPG/PNG 格式!",
          offset: 80
        });
        return false;
      }
      if (!isLt2M) {
        this.$message({
          type: 'error',
          message: "图片大小不能超过 2MB!",
          offset: 80
        });
        return false;
      }
    },
    handleAvatarSuccess: function(res, file) {
      this.imageUrl = this.upload_qiniu_addr + res.key;
      this.imageUrl = this.upload_qiniu_addr+'/'+file.response.key
      this.getTime()
      // console.log("file =>",this.upload_qiniu_addr+'/'+file.response.key); // 图片回显
    },
    handleError: function(res) {
      this.$message({
        message: "上传失败",
        duration: 2000,
        type: "warning",
        offset: 80
      });
    },
    // 获取验证码
    async getCode() {
      let phone = {
        phone: this.form.phone
      }
      let res = await this.$Http.sms(phone)
    },
    code() {
      var phone = /^[1][3,4,5,7,8][0-9]{9}$/ // 验证手机号
      if (this.form.phone == '' || !phone.test(this.form.phone)) {
        this.$message.error('手机号输入错误')
        return false
      } else {
        let time = 60
        let timer
        timer = setInterval(() => {
          time--
          if (time === 0) {
            clearInterval(timer)
            this.flag = false
            this.buttonmsg = '获取验证码'
            return
          }
          this.flag = true
          this.buttonmsg = time + '秒后重新发送'
        }, 1000)
        this.getCode() // 获取短信
      }
    },
    sendCode1() {
      this.code()
    },
    // 确认修改
    async save() {
      if (this.form.name == '' || this.form.name == null) {
        this.$message({
          type: 'warning',
          message: '姓名不能为空',
          offset: 80
        })
        return
      } else if (this.form.pass == '' || this.form.pass == null) {
        this.$message({
          type: 'warning',
          message: '新密码不能为空',
          offset: 80
        })
        return
      } else if (this.form.newPass == '' || this.form.newPass == null) {
        this.$message({
          type: 'warning',
          message: '确认密码不能为空',
          offset: 80
        })
        return
      } else if (this.form.pass !== this.form.newPass) {
        this.$message({
          type: 'warning',
          message: '新密码与确认密码输入不一致',
          offset: 80
        })
        return
      } else if (this.form.phone == '' || this.form.phone == null) {
        this.$message({
          type: 'warning',
          message: '手机号码输入错误',
          offset: 80
        })
        return
      } else if (!/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.form.phone)) {
        this.$message({
          type: 'warning',
          message: '手机号码格式错误',
          offset: 80
        })
        return
      } else if (
        this.form.code == '' ||
        this.form.code == null ||
        this.form.code.length < 6
      ) {
        this.$message({
          type: 'warning',
          message: '验证码输入错误',
          offset: 80
        })
        return
      }
      let userStore = {
        actualName: this.form.name, // 姓名
        checkPass: this.form.pass, // 设置新密码
        code: this.form.code, // 验证码
        imageUrl: this.imageUrl, // 头像
        pass: this.form.newPass, // 确认新密码
        phone: this.form.phone, // 手机号码
        accountId: localStorage.getItem('uid') // 用户id
      }
      let res = await this.$Http.userInfoStore(userStore)
      if (res.code === 0) {
        setTimeout(() => {
          this.$message({
            type: 'success',
            message: '修改成功',
            offset: 80
          })
          this.$router.push({
            path: '/login'
          })
          this.dialogAvatar = false
          this.reload() // 刷新当前页面
        }, 1000)
      }
    },
    // 聊天
    messaging() {
      setTimeout(() => {
        this.$router.push({
          path: '/im/index'
        })
      }, 50)

      //         this.$router.push({path: '/im/index'})
    },
  },
  computed: {
    ...mapGetters(['totalUnreadCount']),
    items() {
      return menus
    },
    item1() {
      const arr = this.$route.path.split('/')
      return this.menuMap[arr[1]].name
    },
    item2() {
      const arr = this.$route.path.split('/')
      return this.menuMap[arr[1]][arr[2]]
    }
  },
  name: 'App',
  watch: {},
  created() {
    this.getTime()
    this.userLoginInfo = JSON.parse(localStorage.getItem('loginInfo'))
    this.imageUrl = this.userLoginInfo.image.replace("\"","").replace("\"","");
    this.$set(this.form, 'phone', this.userLoginInfo.phone)
    this.$set(this.form, 'name', this.userLoginInfo.actualName)
    menus.forEach(m => {
      const p1 = m.path.slice(1)
      this.menuMap[p1] = { name: m.title }
      m.items.forEach(i => {
        this.menuMap[p1][i.path.slice(1)] = i.title
      })
    })
  }
}
</script>

<style scoped>
.box {
  width: 90%;
}
.v-breadcrumbs {
  padding: 18px 24px;
  padding-bottom: 0;
}
/deep/ .theme--light.v-navigation-drawer {
  width: 200px !important;
  background-color: #1a1e29;
}
/deep/ .v-list__tile {
  padding: 0;
}
.v-list__tile__title {
  width: 100%;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #c0c4cc;
  /*padding-left: 100px;*/
  padding-left: 60px;
}
/deep/ .theme--light.v-icon {
  color: #c0c4cc;
}
/deep/ .v-list__group:nth-child(1) .title-inco,
/deep/ .v-list__group:nth-child(2) .title-inco,
/deep/ .v-list__group:nth-child(3) .title-inco,
/deep/ .v-list__group:nth-child(4) .title-inco,
/deep/ .v-list__group:nth-child(5) .title-inco,
/deep/ .v-list__group:nth-child(6) .title-inco,
/deep/ .v-list__group:nth-child(7) .title-inco,
/deep/ .v-list__group:nth-child(8) .title-inco,
/deep/ .v-list__group:nth-child(9) .title-inco {
  background-image: url('../assets/imgs/gaikuang.png');
  background-size: 16px 16px;
  background-repeat: no-repeat;
  /*background-position: 70px center;*/
  background-position: 26px center;
}
/deep/ .v-list__group:nth-child(2) .title-inco {
  background-image: url('../assets/imgs/supply.png');
}
/deep/ .v-list__group:nth-child(3) .title-inco {
  background-image: url('../assets/imgs/Nav_jiaoyiguanli.png');
}
/deep/ .v-list__group:nth-child(4) .title-inco {
  background-image: url('../assets/imgs/dianpuguanli.png');
}
/deep/ .v-list__group:nth-child(5) .title-inco {
  background-image: url('../assets/imgs/财务.png');
}
/deep/ .v-list__group:nth-child(6) .title-inco {
  background-image: url('../assets/imgs/people.png');
}
/deep/ .v-list__group:nth-child(7) .title-inco {
  background-image: url('../assets/imgs/shuju.png');
}
/deep/ .v-list__group:nth-child(8) .title-inco {
  background-image: url('../assets/imgs/barrage.png');
}
/deep/ .v-list__group:nth-child(9) .title-inco {
  background-image: url('../assets/imgs/setup.png');
}
.theme--light.v-footer {
  background: none;
  color: none;
}
.footer {
  position: fixed;
  bottom: 0px;
  background-color: #353841;
  width: 100%;
  display: flex;
  height: 46px;
  line-height: 46px;
  color: #ffffff;
}
.footer-left,
.footer-right {
  flex: 1;
  text-align: center;
  line-height: 46px;
  margin-bottom: 0;
}
.footer-left img,
.footer-right img {
  margin: 11px 0;
  cursor: pointer;
}
/*header-top*/
.theme--light.v-toolbar {
  background-color: #ffffff;
}
.user-info {
  width: 100%;
  height: 64px;
  text-align: right;
  margin-right: 20px;
}
.user-style {
  display: flex;
  float: right;
  height: 100%;
}
.user-avatar {
  width: 48px;
  height: 48px;
  display: inline-block;
  border-radius: 50%;
  margin: 8px 0;
  cursor: pointer;
}
.user-name {
  width: 64px;
  height: 64px;
  line-height: 64px;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  color: #333333;
  margin-right: 48px;
  cursor: pointer;
}
/deep/ .reload {
  flex: 0 0 50px;
  width: 50px;
  height: 24px;
  border-radius: 12px;
  background-color: #1870f2;
  line-height: 24px;
  padding: 0 !important;
  color: #ffffff;
  margin: 20px 0;
  border-color: #1870f2;
}
/deep/ .el-dialog--center .el-dialog__body {
  padding: 25px 25px 0px;
}
/deep/ .el-upload--picture-card {
  width: 100px;
  height: 100px;
  line-height: 100px;
}
/deep/ .el-upload--picture-card i {
  line-height: 100px;
}
/deep/ .avatar {
  width: 100px;
  height: 100px;
}
/deep/ .avatar-uploader-icon {
  width: 100px;
  height: 100px;
  line-height: 100px;
}
/deep/ .el-upload {
  /*border: 1px dashed #c0ccda;*/
  border-radius: 6px;
  line-height: 0;
}
/deep/ .el-input {
  width: 240px;
}
#getCodes,
.confirm {
  color: #ffffff;
  background-color: #1870f2;
  border-radius: 2px;
  border: none;
  padding: 11px 20px;
  margin: 0;
  margin-left: 10px;
}
[data-v-17e601ce] .theme--light.v-navigation-drawer {
  z-index: 99999;
  overflow: hidden;
}
.theme--light.v-toolbar[data-v-17e601ce] {
  z-index: 9999;
}
.footer-left {
  position: relative;
}
.unread {
  position: absolute;
  top: 5px;
  right: 50px;
  z-index: 999;
  display: inline-block;
  height: 18px;
  padding: 0 6px;
  font-size: 12px;
  color: #fff;
  line-height: 18px;
  text-align: center;
  white-space: nowrap;
  border-radius: 10px;
  background-color: #f35f5f;
}
.menu > div:last-child {
  display: none;
}
/deep/ .header-top  {
  padding-left: 200px !important;
}
/deep/ .v-content {
  padding: 64px 0 0 200px !important;
}
.pad-200 {
  padding-left: 0 !important;
}
/deep/ .el-form-item {
  margin-bottom: 12px;
}
/deep/ .el-input__inner {
  height: 36px;
  line-height: 36px;
}
/deep/ .el-button {
  padding: 11px 20px;
}
/deep/ #item1 a {
color: #999999;
}
/deep/ #item2 a {
  font-weight: bold;
  color: #000000;
}
/deep/ .v-breadcrumbs {
  float: left;
  width: 100%;
  padding: 0;
}
/*
   单独设置火狐样式
  */
/*@media screen and (min--moz-device-pixel-ratio:0) {*/
/*  .footer {*/
/*    bottom: 0px !important;*/
/*  }*/
/*}*/
</style>
