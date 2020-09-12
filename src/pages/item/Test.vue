<template>
  <div class="container">
    <div class="title"><h2>ElementUI的Upload上传图片到七牛云</h2></div>
    <el-upload
      class="upload-demo"
      drag
      :action="upload_qiniu_url"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :on-error="handleError"
      :before-upload="beforeAvatarUpload"
      :data="qiniuData">
      <img v-if="imageUrl" :src="imageUrl" class="avatar">
      <div v-else class="el-default">
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      </div>
      <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过2MB</div>
    </el-upload>
  </div>
</template>

<script>
  export default {
    inject: ['reload'], // 注入依赖刷新当前页面
    data() {
      return {
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
      };
    },
    created() {
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
    methods: {
      beforeAvatarUpload: function(file) {
        this.qiniuData.key = this.currentdate +'_'+ file.name;
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
      handleAvatarSuccess: function(res, file) {
        this.imageUrl = this.upload_qiniu_addr + res.key;
        console.log("res =>",res);
        console.log("file =>",this.upload_qiniu_addr+'/'+file.response.key); // 图片回显
      },
      handleError: function(res) {
        this.$message({
          message: "上传失败",
          duration: 2000,
          type: "warning"
        });
      }
    }
  };
</script>

<style scode>
  .title{
    margin:90px 0 40px 0;
  }
  .el-default .el-icon-upload {
    margin-top: 125px;
  }
  .el-upload-dragger {
    width: 350px;
    height: 350px;
  }
  .avatar {
    width: 350px;
    height: 350px;
    display: block;
  }
</style>
