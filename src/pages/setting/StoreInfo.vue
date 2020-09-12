<template>
  <div class="StoreInfo">
    <el-card>
      <el-form ref="form"
               label-width="120px">
        <el-form-item label="店铺名称">
          <el-input v-model="userInfo.storeName"></el-input>
          <br />
        </el-form-item>
        <el-form-item label="店铺认证状态">
          <span v-if="userInfo.states == 0 || userInfo.states == '' || userInfo.states == null"
                style="margin-right: 6px;color: #F56C6C">
            未认证
          </span>
          <span v-if="userInfo.states == 1"
                style="margin-right: 6px;color: #F56C6C">审核中</span>
          <span v-if="userInfo.states == 2"
                style="margin-right: 6px;color: #67C23A">审核通过</span>
          <span v-if="userInfo.states == 3"
                style="margin-right: 6px;color: #F56C6C">审核失败</span>
          <span v-if="userInfo.states !== 0">
            <span v-if="userInfo.isCompany == 1"
                  style="margin-right: 6px;color: #409EFF">( 企业认证 )</span>
            <span v-if="userInfo.isCompany == 0"
                  style="margin-right: 6px;color: #409EFF">( 个人认证 )</span>
          </span>
        </el-form-item>
        <!--        <el-form-item label="店铺LOGO" v-if="userInfo.logo == null || userInfo.logo == '' ">-->
        <!--          <el-upload-->
        <!--            :action="upload_qiniu_url"-->
        <!--            list-type="picture-card"-->
        <!--            :limit="limit"-->
        <!--            :data="qiniuData"-->
        <!--            :on-exceed="exceed1"-->
        <!--            :before-upload="beforeUpload1"-->
        <!--            :on-preview="handlePictureCardPreview"-->
        <!--            :on-success="success1"-->
        <!--            :on-remove="handleRemove1">-->
        <!--            <i class="el-icon-plus"></i>-->
        <!--          </el-upload>-->
        <!--          <el-dialog width="540px" :visible.sync="dialogVisible">-->
        <!--            <img width="100%" :src="dialogImageUrl" alt="">-->
        <!--          </el-dialog>-->
        <!--        </el-form-item>-->
        <el-form-item label="店铺LOGO">
          <!--          <el-upload-->
          <!--            :action="upload_qiniu_url"-->
          <!--            list-type="picture-card"-->
          <!--            :limit="limit"-->
          <!--            :data="qiniuData"-->
          <!--            :on-exceed="exceed1"-->
          <!--            :before-upload="beforeUpload1"-->
          <!--            :on-preview="handlePictureCardPreview"-->
          <!--            :on-success="success1"-->
          <!--            :on-remove="handleRemove1">-->
          <!--            <i class="el-icon-plus"></i>-->
          <!--          </el-upload>-->
          <el-upload class="avatar-uploader"
                     :action="upload_qiniu_url"
                     :data="qiniuData"
                     :show-file-list="false"
                     :on-success="success"
                     :before-upload="beforeUpload">
            <span>
              <img v-if="imgUrl"
                   :src="imgUrl"
                   class="avatar">
              <i v-else
                 class="el-icon-plus avatar-uploader-icon"></i>
            </span>
          </el-upload>
        </el-form-item>
        <el-form-item label="店铺电话"
                      v-if="hidden">
          <el-input v-model="userInfo.storePhone"></el-input>
        </el-form-item>
        <el-form-item label="联系电话">
          <el-input v-model="userInfo.storePhone2"
                    onkeyup="value=value.replace(/[^\d.]/g,'');"
                    maxLength='11'></el-input>
        </el-form-item>
        <el-form-item label="经营地址">
          <Map></Map>
        </el-form-item>
        <el-form-item label="详细地址">
          <el-input v-model="userInfo.storeAddr"
                    @blur="addressCity"></el-input>
        </el-form-item>
        <el-form-item label="店铺简介">
          <el-input type="textarea"
                    v-model="userInfo.remark"
                    rows="6"
                    placeholder="输入简介，200个字以内"></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-checkbox v-model="form.checked">
            <p style="width: 410px;display: block;white-space: normal;color: #999999">
              {{content}}
            </p>
          </el-checkbox>
          <br />
          <el-button v-if="form.checked"
                     :loading="loading"
                     @click="save">保存</el-button>
          <el-button v-else
                     disabled>保存</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import Map from '../../components/map/MapInfo'
export default {
  name: 'StoreInfo',
  components: {
    Map,
  },
  inject: ['reload'], // 注入依赖刷新当前页面
  data() {
    return {
      key: '7145bb45074782f267ddfac37fc07b18',
      address: '',
      uploadUrl: this.GLOBAL.imgApi.replace(/\'/g, ''),
      form: {
        name: '',
        imageUrl: '',
        phone: '',
        Introduction: '',
        checked: true,
      },
      content:
        '我声明，此页面所填写内容均真实有效，特别是经营地址为店铺最新可联系到的地址，同时可以作为行政机关和司法机关送达法律文件的地址。如果上述地址信息有误，愿意承担由此带来的平台处罚 (处罚细则)、行政监管和司法诉讼风险。',
      disable: false,
      dialogImageUrl1: '',
      dialogVisible1: false,
      imgUrl: '',
      loading: false,
      userInfo: {
        storeName: '',
        logo: '',
        storePhone: '',
        storePhone2: '',
        remark: '',
        address: '',
        storeAddr: '',
      },
      storeAddr: '',
      userCode: '',
      midItem: '',
      dialogImageUrl: '',
      dialogVisible: false,
      // 店铺电话(登录IM)
      hidden: false,
      storePhone: '',
      // 七牛云图片上传
      qiniuData: {
        key: '',
        // 七牛云 tooken 有效期 50年
        token:
          '0tJG2oh5JnpsneBzCn3CnP4N1bH3HZgn6HJoHQAt:yuA83mJmMRtMHE53vBPuTr8kZcw=:eyJzY29wZSI6InF1eXV5aWltYWdlIiwiZGVhZGxpbmUiOjMxNzM1MDA1ODV9',
      },
      // 七牛云上传储存区域的上传域名（华东、华北、华南、北美、东南亚）
      upload_qiniu_url: 'http://upload-z2.qiniup.com', // 华南
      // 七牛云返回储存图片的子域名
      upload_qiniu_addr: 'http://image.quyuyi.com',
      imageUrl: '',
      currentdate: '', // 年月日时分秒
    }
  },
  methods: {
    // 地址反编译
    addressCity(event) {
      if (
        this.userInfo.address !== '' &&
        this.userInfo.address !== null &&
        this.userInfo.address !== undefined
      ) {
        // console.log(this.address)
        $.ajax({
          method: 'get',
          url: `https://restapi.amap.com/v3/geocode/geo?address=${this.userInfo.address}&key=${this.key}`,
          success: (res) => {
            let centent = res.geocodes[0].location.split(',')
            let longitudes = centent[0]
            let dimensions = centent[1]
            localStorage.setItem('longitudes', longitudes)
            localStorage.setItem('dimensions', dimensions)
            this.location = res.geocodes[0].location
            let province = res.geocodes[0].province //省
            let city = res.geocodes[0].city //市
            let area = res.geocodes[0].district // 区
            this.getCity1 = res.geocodes[0].formatted_address
            let streetLen = area.length
            let cityLen = this.getCity1.length
            let streetIndex = this.getCity1.indexOf(area) + streetLen // 获取区的下标
            let spliceAddress =
              province +
              '-' +
              city +
              '-' +
              area +
              '-' +
              this.getCity1.substr(streetIndex)
            localStorage.setItem('address', spliceAddress)
          },
          error: (e) => {
            this.$message({
              message: '定位失败',
              type: 'warning',
              offset: 80,
            })
          },
        })
      } else {
        return
      }
    },
    // 删除logo
    delImgbox(index) {
      this.userInfo.logo.splice(index, 1)
    },
    // 店铺logo
    // 获取时分秒
    getTime() {
      var date = new Date()
      var seperator1 = '-'
      var seperator2 = ':'
      var month = date.getMonth() + 1
      var strDate = date.getDate()
      if (month >= 1 && month <= 9) {
        month = '0' + month
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = '0' + strDate
      }
      this.currentdate =
        date.getFullYear() +
        seperator1 +
        month +
        seperator1 +
        strDate +
        '_' +
        date.getHours() +
        seperator2 +
        date.getMinutes() +
        seperator2 +
        date.getSeconds() //年月日时分秒
      var currentmonth = date.getFullYear() + seperator1 + month //获取年月
    },
    beforeUpload(file) {
      this.qiniuData.key = this.currentdate + '_' + file.name
      const isJPG = file.type === 'image/jpeg'
      const isPNG = file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isJPG && !isPNG) {
        this.$message.error('图片只能是 JPG/PNG 格式!')
        return false
      }
      if (!isLt2M) {
        this.$message.error('图片大小不能超过 2MB!')
        return false
      }
    },
    handleRemove1(file, fileList) {
      // console.log(file, fileList);
    },
    handlePictureCardPreview(fileList) {
      this.dialogImageUrl = this.upload_qiniu_addr + '/' + fileList.response.key
      this.dialogVisible = true
    },
    userLgon(url) {
      this.dialogImageUrl = url
      this.dialogVisible = true
    },
    exceed1(files, fileList) {
      // console.log(fileList)
      if (fileList.length === 1) {
        this.$message({
          message: '店铺logo只能上传一张',
          type: 'error',
          offset: 80,
        })
      }
    },
    //图片上传成功
    success(response, file, fileList) {
      this.imgUrl = []
      this.imgUrl.push(this.upload_qiniu_addr + '/' + response.key)
      this.getTime()
    },
    // 认证
    certification() {
      this.$message({
        message: '请点击店铺认证进行认证',
        type: 'warning',
        offset: 80,
      })
    },
    // 获取当前登录用户的店铺信息
    async byuser() {
      let sid = {
        uid: localStorage.getItem('uid'),
      }
      let res = await this.$Http.getStoreInfo(sid)
      if (res.code === 0) {
        if (res.data == null || res.data == '') {
          return false
        } else {
          this.userInfo = res.data
          // this.userInfo.storeAddr = this.storeAddr
          this.userInfo.storeAddr = this.userInfo.storeAddr.replace(/-/g, '')
          localStorage.removeItem('id')
          localStorage.setItem('id', this.userInfo.id)
          if (this.userInfo.logo !== '' || this.userInfo.logo !== null) {
            this.userInfo.logo = JSON.parse(this.userInfo.logo)
            this.imgUrl = this.userInfo.logo
            localStorage.removeItem('logo')
            localStorage.setItem('logo', this.imgUrl)
          }
          localStorage.removeItem('storeName')
          localStorage.setItem('storeName', this.userInfo.storeName)
          let storeName = this.userInfo.storeName // 店铺名
          let storePhone = this.userInfo.storePhone // 店铺电话
          localStorage.setItem('storeName', storeName)
          localStorage.setItem('storePhone', storePhone)
        }
      }
    },
    // 保存
    // 幂等性
    async midList() {
      let res = await this.$Http.empotency()
      if (res.code === 0) {
        localStorage.removeItem('idempotency')
        localStorage.setItem('idempotency', res.data)
      }
    },
    async save() {
      let onOFF = false // 标识(新增还是更新)默认值更新
      // 新增操作
      if (this.checked) {
        this.$message({
          message: '请勾选并同意',
          type: 'warning',
          offset: 80,
        })
        return false
      } else if (
        this.userInfo.storeName == null ||
        this.userInfo.storeName == ''
      ) {
        this.$message({
          message: '店铺名称不能为空',
          type: 'warning',
          offset: 80,
        })
        return false
      } else if (this.imgUrl.length === 0) {
        this.$message({
          message: '店铺Logo不能为空',
          type: 'warning',
          offset: 80,
        })
        return false
      } else if (
        this.userInfo.storePhone2 === '' ||
        this.userInfo.storePhone2 === null ||
        !/^1[3456789]\d{9}$/.test(this.userInfo.storePhone2)
      ) {
        this.$message({
          message: '手机号输入错误',
          type: 'warning',
          offset: 80,
        })
        return false
      } else if (
        this.userInfo.storeAddr == '' ||
        this.userInfo.storeAddr == null
      ) {
        this.$message({
          message: '地址不能为空',
          type: 'warning',
          offset: 80,
        })
        return false
      } else {
        if (typeof this.userInfo.id !== 'undefined') {
          // 更新操作
          let shopStoreVo = {
            storeName: this.userInfo.storeName, // 店铺名称
            storePhone: this.userInfo.storePhone, // 店铺电话
            storePhone2: this.userInfo.storePhone2, // 联系电话
            logo: JSON.stringify(this.imgUrl), // 店铺logo
            storeAddr: this.userInfo.storeAddr, // 经营地址
            remark: this.userInfo.remark, // 备注
            id: localStorage.getItem('id'),
            uid: localStorage.getItem('uid'), // 用户id
            longitude: localStorage.getItem('longitudes'), // 经度
            dimension: localStorage.getItem('dimensions'), // 维度
            type: 1, // 1就是卖家店 0 是自营店
            // isCompany: null // 认证方式
          }
          let res = await this.$Http.storeModify(shopStoreVo)
          if (res.code === 0) {
            this.$message({
              message: '店铺信息更新成功',
              type: 'warning',
              offset: 80,
            })
          }
          this.byuser()
          this.reload()
        } else {
          // 新增
          let shopStoreVo = {
            storeName: this.userInfo.storeName, // 店铺名称
            storePhone: this.userInfo.storePhone, // 店铺电话
            storePhone2: this.userInfo.storePhone2, // 联系电话
            logo: JSON.stringify(this.imgUrl), // 店铺logo
            storeAddr: this.userInfo.storeAddr, // 经营地址
            remark: this.userInfo.remark, // 备注
            uid: localStorage.getItem('uid'), // 用户id
            longitude: localStorage.getItem('longitudes'), // 经度
            dimension: localStorage.getItem('dimensions'), // 维度
            type: 1, // 1就是卖家店 0 是自营店
            // isCompany: null // 认证方式
          }
          /////////////// 请求  ///////////////////
          let res = await this.$Http.newStore(shopStoreVo, false, {
            headers: {
              requestNo: localStorage.getItem('idempotency'),
            },
          })
          if (res.code === 0) {
            this.$message({
              message: '店铺信息已提交完毕,请前往店铺认证填写资料',
              type: 'warning',
              offset: 80,
            })
            setTimeout(() => {
              this.$confirm('是否切换到店铺认证进行认证', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
              })
                .then(() => {
                  this.$router.push({
                    path: '/setting/storeCertification',
                  })
                })
                .catch(() => {})
            }, 1000)
            this.byuser()
            this.reload()
          }
        }
      }
    },
  },
  created() {
    this.byuser()
    this.midList()
    this.getTime()
    this.userInfo.storePhone = localStorage.getItem('isLogin')
  },
}
</script>

<style lang="less" scoped>
.StoreInfo {
  .el-card {
    margin: 24px;
  }

  .avatar-uploader {
    width: 178px;
    height: 178px;
    line-height: 178px;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }

  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }

  /deep/ .el-upload--picture-card {
    width: 100px;
    height: 100px;
    line-height: 100px;
  }

  .el-textarea {
    width: 630px;
  }

  /deep/ .el-checkbox__input {
    vertical-align: top;
  }

  /deep/ .el-button {
    color: #ffffff;
    background: rgba(24, 112, 242, 1);
  }

  /deep/ .el-checkbox__input.is-checked .el-checkbox__inner {
    background-color: rgba(24, 112, 242, 1);
    border-color: rgba(24, 112, 242, 1);
  }

  /deep/ .el-upload-list--picture-card .el-upload-list__item-actions,
  /deep/ .el-upload-list--picture-card .el-upload-list__item {
    width: 100px;
    height: 100px;
  }

  .img-box {
    position: relative;

    & img {
      cursor: pointer;
    }

    & i {
      position: absolute;
      top: 3px;
      left: 160px;
      font-size: 18px;
      cursor: pointer;
      color: #000000;
      font-weight: bold;
    }
  }
}
</style>
