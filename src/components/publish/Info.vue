<template>
  <div class="infos-wrapper">
    <div class="infos">
      <h3 class="infos-title">基本信息</h3>
      <el-form :label-position="projectFrom.labelPosition"
               :model="projectFrom"
               ref="projectFrom"
               label-width="130px"
               class="demo-ruleForm">
        <el-form-item id="basic"
                      label="基本信息"
                      required>
          <el-upload :action="upload_qiniu_url"
                     :data="qiniuData"
                     list-type="picture-card"
                     :file-list="projectFrom.basicArray"
                     :limit="1"
                     :before-upload="beforeUpload"
                     :on-preview="handlePictureCardPreview"
                     :on-success="success"
                     :on-error="handleError">
            <i class="el-icon-plus"></i>
          </el-upload>
          <span class="suggest">建议尺寸：690*430px</span>
          <el-dialog :visible.sync="projectFrom.basicImg"
                     width="400px"
                     append-to-body>
            <img width="100%"
                 :src="projectFrom.moreImages"
                 alt="">
          </el-dialog>
        </el-form-item>
        <el-form-item label="商品标题"
                      required
                      class="basic-title">
          <el-input v-model="projectFrom.title"
                    @change="changeValue"
                    placeholder="请输入商品标题"></el-input>
        </el-form-item>
        <el-form-item label="投资资金"
                      required
                      class="basic-funds">
          <el-input v-model.number="projectFrom.fundsFirst"
                    onkeyup="this.value = this.value.replace(/[^\d.]/g,'');">
            <template slot="append">万</template>
          </el-input>
          &nbsp; - &nbsp;
          <el-input v-model.number="projectFrom.fundsSecond"
                    onkeyup="this.value = this.value.replace(/[^\d.]/g,'');">
            <template slot="append">万</template>
          </el-input>
        </el-form-item>
        <el-form-item label="商品展示图"
                      required>
          <el-upload :action="upload_qiniu_url"
                     :data="qiniuData"
                     list-type="picture-card"
                     :file-list="projectFrom.basicArray1"
                     :limit="5"
                     :before-upload="beforeUpload1"
                     :on-preview="handlePictureCardPreview1"
                     :on-success="success1"
                     :multiple='true'>
            <i class="el-icon-plus"></i>
          </el-upload>
          <span class="suggest">建议尺寸：690*690px，最多上传五张</span>
          <el-dialog :visible.sync="projectFrom.basicImg1"
                     width="400px"
                     append-to-body>
            <img width="100%"
                 :src="projectFrom.moreImages1"
                 alt="">
          </el-dialog>
        </el-form-item>
        <el-form-item label="联系人"
                      required>
          <el-input v-model="projectFrom.contact"
                    placeholder="请输入联系人"></el-input>
        </el-form-item>
        <el-form-item label="所在地区"
                      required>
          <el-cascader placeholder="请选择省/市/区"
                       :options="cityData"
                       v-model="projectFrom.area"
                       @change="getArea">
          </el-cascader>
        </el-form-item>
        <el-form-item label="所属行业"
                      required>
          <el-select v-model="projectFrom.industry"
                     placeholder="请选择所属行业"
                     @change="getIndustry">
            <el-option v-for="item in industry"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="融资用途"
                      required
                      class="basic-title">
          <el-input v-model="projectFrom.financing"
                    placeholder="请输入融资用途"></el-input>
        </el-form-item>
        <h3 class="infos-title">股权融资</h3>
        <el-form-item label="资金方占股比例"
                      required
                      class="basic-funds">
          <el-input v-model.number="projectFrom.shareFirst"
                    onkeyup="this.value = this.value.replace(/[^\d.]/g,'');">
            <template slot="append">%</template>
          </el-input>
          &nbsp; - &nbsp;
          <el-input v-model.number="projectFrom.shareSecond"
                    onkeyup="this.value = this.value.replace(/[^\d.]/g,'');">
            <template slot="append">%</template>
          </el-input>
        </el-form-item>
        <el-form-item label="最短退出年限"
                      required>
          <el-input v-model.number="projectFrom.minimumYears"
                    onkeyup="this.value = this.value.replace(/[^\d.]/g,'');">
            <template slot="append">年</template>
          </el-input>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import cityData from '../../components/country-data'
import industry from '../../components/industry'
export default {
  name: 'Infos',
  data() {
    return {
      cityData: cityData, //存放城市数据
      industry: industry, // 所属行业
      projectFrom: {
        labelPosition: 'right',
        basicImg: false,
        basicArray: [], // 上传的图片列表,
        moreImages: '', // 点击查看图片
        basicImgList: [], // 基本信息图片
        title: '', // 商品标题
        fundsFirst: 0, // 投资资金
        fundsSecond: 0, // 投资资金
        // 商品展示图
        basicImg1: false,
        basicArray1: [], // 上传的图片列表,
        moreImages1: '', // 点击查看图片
        basicImgList1: [], // 基本信息图片
        contact: '', // 联系人
        area: '', // 地区
        areaList: '', // 省市区
        industry: '', // 行业
        industryVlue: '', // 选中行业的值
        financing: '', // 融资用途
        shareFirst: 0, // 占股比例
        shareSecond: 0, // 占股比例
        minimumYears: 0, // 最短退出年限
      },
      // 七牛云 图片上传
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
    // 基本信息
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
    handlePictureCardPreview(file) {
      this.projectFrom.moreImages = file.url
      this.projectFrom.basicImg = true
    },
    handleError() {
      this.$message({
        message: '上传失败',
        duration: 2000,
        type: 'warning',
      })
    },
    //图片上传成功
    success(response, file, fileList) {
      this.projectFrom.basicImgList.push(
        this.upload_qiniu_addr + '/' + response.key
      )
      this.getTime()
    },
    // 商品展示图
    beforeUpload1(file) {
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
    handlePictureCardPreview1(file) {
      this.projectFrom.moreImages1 = file.url
      this.projectFrom.basicImg1 = true
    },
    handleError1() {
      this.$message({
        message: '上传失败',
        duration: 2000,
        type: 'warning',
      })
    },
    //图片上传成功
    success1(response, file, fileList) {
      this.projectFrom.basicImgList1.push(
        this.upload_qiniu_addr + '/' + response.key
      )
      this.getTime()
    },
    // 获取地区
    getArea(value) {
      console.log('value',value)
      this.projectFrom.areaList = value.toString().replace(/,/g, '-')
      console.log('this.projectFrom.areaList',this.projectFrom.areaList)
    },
    // 获取行业
    getIndustry(val) {
      let obj = {}
      obj = this.industry.find(function (item) {
        return item.value === val
      })
      this.projectFrom.industryVlue = obj.label
      //obj 就是被选中的那个对象，也就能拿到label值了。
      // console.log(obj.label)//label值
      // console.log(val)//value值
    },
    // 子组件向父组件传值
    changeValue() {
      this.$emit('changeValue', this.projectFrom)
    },
  },
  created() {
    this.getTime()
  },
}
</script>

<style lang="less" scoped>
.infos-wrapper {
  width: 100%;
  margin: 0;
  padding: 0;
}
.infos {
  padding: 0;
  margin: 0;
  margin-top: 24px;
  & .infos-title {
    line-height: 44px;
    background-color: #f5f7fa;
    margin-bottom: 24px;
  }

  & .infos-title:before {
    content: '';
    display: inline-block;
    width: 4px;
    height: 14px;
    line-height: 44px;
    margin-left: 10px;
    margin-right: 15px;
    background-color: #1870f2;
  }

  /deep/ .el-form {
    margin-left: 12px;
  }

  /deep/ .el-upload-list--picture-card .el-upload-list__item,
  /deep/ .el-upload--picture-card {
    width: 120px;
    height: 120px;
    line-height: 120px;
  }

  /deep/ .el-upload--picture-card i {
    line-height: 120px;
  }

  /deep/ #basic .el-form-item__label {
    line-height: 120px;
  }

  /deep/ .suggest {
    font-size: 12px;
    color: #c0c4cc;
    line-height: 36px;
  }

  /deep/ .basic-title .el-input {
    width: 380px;
  }

  /deep/ .basic-funds .el-input {
    width: 108px;
  }

  /deep/ .basic-funds .el-input__inner {
    padding: 0 6px;
  }

  /deep/ .el-icon-check:before {
    position: absolute;
    right: -40px;
    top: -40px;
  }
  /deep/ .el-form-item {
    margin-bottom: 26px;
  }
}
</style>
