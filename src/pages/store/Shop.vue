<template>
    <div class="shop">
      <el-card
        v-loading.fullscreen.lock="fullscreenLoading">
        <h3>{{title}}</h3>
        <div class="shop-box">
          <div class="box-left">
            <div class="header"><img src="../../assets/imgs/shop1.png" alt=""></div>
            <div class="content">
              <div class="first">
                <div class="img-list" v-for="(item,index) in addForm1.pics" :key="index">
                  <img width="100%" :src="item.pic" alt="">
                  <i class="el-icon-close" @click="delImagesItem(index)"></i>
                </div>
              </div>
            </div>
            <div class="footer"><img src="../../assets/imgs/shop2.png" alt=""></div>
          </div>
          <div class="box-right">
            <h4>{{shopTitle}}</h4>
            <p>{{content}}</p>
            <div class="border-upload">
              <p>模块一</p>
              <el-upload
                :action="upload_qiniu_url"
                list-type="picture-card"
                :data="qiniuData"
                :limit="6"
                :multiple = "true"
                :on-success="handlesuccess1"
                :before-upload="beforeUpload1"
                :on-preview="handlePictureCardPreview1"
                :on-remove="handleRemove1">
                <i class="el-icon-plus"></i>
              </el-upload>
              <el-dialog :visible.sync="dialogVisible1">
                <img width="100%" :src="dialogImageUrl1" alt="">
              </el-dialog>
<!--              <p>模块二</p>-->
<!--              <el-upload-->
<!--                :action="uploadUrl"-->
<!--                list-type="picture-card"-->
<!--                :limit="6"-->
<!--                :multiple = "true"-->
<!--                :on-success="handlesuccess2"-->
<!--                :before-upload="beforeUpload2"-->
<!--                :on-preview="handlePictureCardPreview2"-->
<!--                :on-remove="handleRemove2">-->
<!--                <i class="el-icon-plus"></i>-->
<!--              </el-upload>-->
<!--              <el-dialog :visible.sync="dialogVisible2">-->
<!--                <img width="100%" :src="dialogImageUrl2" alt="">-->
<!--              </el-dialog>-->
            </div>
          </div>
        </div>
          <div class="save">
            <el-button @click="save">保存</el-button>
          </div>
      </el-card>
    </div>
</template>

<script>
  export default {
    inject: ['reload'], // 注入依赖刷新当前页面
    name: "shop",
    data () {
      return {
        fullscreenLoading: false,
        title: '卖家根据自己店铺实际提供服务，可根据当前店铺自己服务产品设计相关店铺宣传图片作为店铺的首页展览。',
        shopTitle: '上传店铺装饰图',
        content: '建议尺寸：105*105像素， 最多上传6张',
        dialogImageUrl1: '',
        dialogVisible1: false,
        uploadUrl: this.GLOBAL.imgApi.replace(/\'/g, ""),
        dialogImageUrl2: '',
        dialogVisible2: false,
        addForm1: {
          pics: []
        },
        addForm2: {
          pics: []
        },
        storeImg: [], // 查询店铺图片
        //七牛云上传
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
      handleRemove1(file) {
        // console.log(file)
        //  1. 获取将要删除的图片的临时路径
        const filePath = file.response.data
        // 2. 从 pics 数组中，找到这个图片对应的索引值
        const i = this.addForm1.pics.findIndex(val => {
          return val.pic === filePath
        })
        // 3. 调用数组的 splice 方法，把图片信息对象，从 pics 数组中移除
        this.addForm1.pics.splice(i, 1)
        // console.log(this.addForm)
      },
      handlesuccess1(response, file, fileList) {
        // tmp_path上传文件的临时路径
        const picInfo = { pic: this.upload_qiniu_addr +'/'+ response.key }
        this.addForm1.pics.push(picInfo)
        this.addForm1.pics.reverse() // 数组排序颠倒
        this.getTime()
      },
      beforeUpload1 (file, fileList) {
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
      handlePictureCardPreview1 (file, fileList) {
        this.dialogImageUrl1 = file.url
        this.dialogVisible1 = true
      },
      delImagesItem (index) {
        // //  1. 获取将要删除的图片的临时路径
        // const urlImg = file.pic
        // console.log(urlImg)
        // // 2. 从 pics 数组中，找到这个图片对应的索引值
        // const i = this.addForm1.pics.findIndex(val => {
        //   return val.pic === urlImg
        // })
        // // // 3. 调用数组的 splice 方法，把图片信息对象，从 pics 数组中移除
        // this.addForm1.pics.splice(i, 1)
        // console.log(this.addForm)
        this.addForm1.pics.splice(index,1)
      },
      ////////////////////////////////////////////
      // handleRemove2(file) {
      //   // console.log(file)
      //   //  1. 获取将要删除的图片的临时路径
      //   const filePath = file.response
      //   // 2. 从 pics 数组中，找到这个图片对应的索引值
      //   const i = this.addForm2.pics.findIndex(val => {
      //     return val.pic === filePath
      //   })
      //   // 3. 调用数组的 splice 方法，把图片信息对象，从 pics 数组中移除
      //   this.addForm2.pics.splice(i, 1)
      //   // console.log(this.addForm)
      // },
      // handlesuccess2(response, file, fileList) {
      //   // tmp_path上传文件的临时路径
      //   const picInfo = { pic: response }
      //   this.addForm2.pics.push(picInfo)
      //   // console.log(this.addForm.pics)
      // },
      // beforeUpload2 (file, fileList) {
      // },
      // handlePictureCardPreview2 (file, fileList) {
      //   this.dialogImageUrl2 = file.url
      //   this.dialogVisible2 = true
      // },
      ///////////////////////////////////////////////////
    async save () {
        console.log(this.addForm1.pics)
        if (localStorage.getItem('id') == 0) {
          this.$message({
            type: 'error',
            message: '请先认证店铺信息',
            offset: 80
          })
        } else if (this.addForm1.pics.length == 0) {
          this.$message({
            type: 'error',
            message: '请先上传图片',
            offset: 80
          })
        }
        else {
          // JSON.stringify()的作用是将 JavaScript 对象转换为 JSON 字符串，
          // console.log('addForm2:',JSON.stringify(this.addForm2.pics))
          let imglist = JSON.stringify(this.addForm1.pics)
          this.addForm1.content = imglist
          // this.fullscreenLoading = true;
          let shopInfo = {
            sid: localStorage.getItem('id'),
            content: imglist
          }
          let res = await this.$Http.shopDecoration(shopInfo,false)
          if (res.code === 0 ) {
            this.$message({
              type: 'success',
              message: '更新成功',
              offset: 80
            })
            this.reload()
          }
        }
      },
      // 查询店铺装饰
      async findStore () {
        let id = {
          sid: localStorage.getItem('id')
        }
        let res = await this.$Http.findDecoration(id)
        console.log(res)
        if (res.code === 0) {
          if(res.data.content == '' || res.data.content == null) {
            return
          } else {
            this.storeImg = JSON.parse(res.data.content)
            this.addForm1.pics = this.storeImg
          }
        }
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
        this.findStore()
      }
      this.getTime()
    }
  }
</script>

<style lang="less" scoped>
.shop {
  & .el-card {
    margin: 24px;
  }
  & h3 {
    font-family: 'Microsof-YaHei';
    font-size: 14px;
    line-height: 32px;
    padding-left: 24px;
    color:rgba(51,51,51,1);
    background:rgba(243,248,255,1);
    border:1px solid rgba(212,229,253,1);
    margin-bottom: 20px;
  }
  & .shop-box {
    width: 1000px;
    overflow: hidden;
    display: flex;
    & .box-left {
      width: 379px;
      position: relative;
      flex: 0 0 375px;
      height:667px;
      border:1px solid rgba(204,204,204,1);
      margin-left: 30px;
      margin-right: 30px;
      & .header {
        z-index: 999999;
        overflow: hidden;
      }
      & .content {
        height: 500px;
        overflow: hidden;
        overflow-y: scroll;
        & .first {
           & .title {
             & .num-title:after {
               content: '包装设计';
               color: #ffffff;
               padding-left: 4px;
             }
           }
          & .img-list {
            margin: 12px;
            position: relative;
            & /deep/ .el-icon-close {
              position: absolute;
              top: 10px;
              right: 10px;
              font-size: 16px;
              font-weight: bold;
              background-color: #000000;
              color: #ffffff;
              cursor: pointer;
            }
          }
         }
      }
      & .footer {
        z-index: 99999;
        overflow: hidden;
      }
    }
    & .box-right {
      flex: 1;
      & .border-upload {
        width: 350px;
        border:1px solid rgba(204,204,204,1);
        border-style: dashed;
        padding: 12px;
      }
      & p {
        color: #999999;
        padding: 16px 0;
        margin: 0;
      }
    }
  }
  .element::-webkit-scrollbar {display:none}
  & .content::-webkit-scrollbar {
    display: none;
  }
  & .save {
    margin: 24px;
    margin-left: 28px;
  }
}
/deep/ .el-upload-list--picture-card .el-upload-list__item
{
  display: none;
}
</style>
