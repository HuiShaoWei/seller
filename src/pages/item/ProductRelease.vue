<template>
  <v-container fluid grid-list-md
               v-loading="loading"
               element-loading-text="删除中"
               element-loading-spinner="el-icon-loading"
  >
    <div class="commodity-list">
      <el-form class="forms" ref="form" :model="form" label-width="110px">
        <h3>基本信息</h3>
        <el-form-item label="商品标题">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="副标题">
          <el-input v-model="form.alias"></el-input>
        </el-form-item>
        <el-form-item label="商品分类">
          <el-cascader
            ref="getOptions"
            v-model="value"
            :options="getList.classiFication"
            @change="handleChange"></el-cascader>
        </el-form-item>
        <el-form-item label="商品主图">
          <el-upload
            :action="upload_qiniu_url"
            list-type="picture-card"
            :limit = "5"
            :data="qiniuData"
            :before-upload="beforeUpload1"
            :on-preview="handlePictureCardPreview1"
            :on-success="success1"
            :on-error="handleError1"
            :on-remove="handleRemove1">
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible1" width="400px">
            <img width="100%" :src="dialogImageUrl1" alt="">
          </el-dialog>
          <p class="suggest">建议尺寸: 690*690像素(商品主图限制5张)</p>
        </el-form-item>
        <el-form-item label="价格 (必填)">
          <el-input v-model="form.price" oninput = "value=value.replace(/[^\d.]/g,'')"></el-input>
        </el-form-item>
        <el-form-item label="属性">
          <el-input v-model="form.attribues" @focus="attFocus" :disabled="inputDis"></el-input>
          <el-button v-show="showBtn" @click="addAttr1">添加属性</el-button>
        </el-form-item>
        <el-form-item :label="attItems[index].name"  v-for="(item,index) of attItems" :key="item.index">
          <el-input v-model="attItems[index].content" @blur="attblur(attItems)"></el-input>
          <el-button @click="attDel(index)">删除属性</el-button>
        </el-form-item>
        <el-form-item label="规格">
          <el-input v-model="form.specification" @focus="attFocus1"></el-input>
          <el-button v-show="showBtn1" @click="addAttr3">添加属性</el-button>
        </el-form-item>
        <div v-for="(item,index) in items" :key="item.index">
          <el-form-item :label="item[i].name" v-show="showBtn2" v-for="(itemList,i) of item" :key="i">
            <input :id="index+i+'key::'+item[i].name" style="width: 330px; border: 1px solid #DCDFE6;border-radius: 4px;padding-left: 14px"></input>
            <el-button @click="addsss(item,i,items,index)">添加属性</el-button>
            <el-button @click="delsss(index,i)">删除属性</el-button>
          </el-form-item>
        </div>
        <div
          v-for="(item,index) in items" :key="item.index" class="attInfo" v-show="showText1">
          <ul v-for="(itemList,j) in item" :key="item.j">
            <li v-for="(str, l) in itemList.content" :key="l" style="line-height: 28px">
              {{itemList.name}} :
                {{str}} <i class="el-icon-delete" @click="delAttInfosss(index,l)" style="cursor: pointer;color: red"></i> <br>
            </li>
            </ul>
        </div>
        <div style="width: 800px;margin-left: 24px">
          <el-table
            :data="tableData"
          >
            <el-table-column
              prop="content"
              label="规格"
              width="200"
            >
            </el-table-column>
            <el-table-column
              label="价格"
              width="200"
            >
              <template slot-scope="scope">
                <el-input v-model="scope.row.price" style="width: 120px"></el-input>
              </template>
            </el-table-column>
<!--            <el-table-column-->
<!--              label="库存">-->
<!--              <template slot-scope="scope">-->
<!--                <el-input v-model="scope.row.stock" style="width: 120px"></el-input>-->
<!--              </template>-->
<!--            </el-table-column>-->
          </el-table>
        </div>

        <h3>商品信息</h3>
        <el-form-item label="上架时间" class="shelves" style="z-index: 99999">
          <el-radio-group v-model="sheradio" @change="changeSheradio">
            <el-radio :label="1">立即上架</el-radio>
            <el-radio :label="2">放入仓库</el-radio>
            <el-radio :label="3">下架</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="配送方式" class="delivery">
          <el-radio-group v-model="delMethod">
            <el-radio :label="1">无需发货商品，在线电子发票</el-radio>
            <el-radio :label="2">快递发货</el-radio>
          </el-radio-group>
        </el-form-item>
          <el-form-item label="商品展示图">
            <el-upload
              :action="upload_qiniu_url"
              :data="qiniuData"
              list-type="picture-card"
              :before-upload="beforeUpload2"
              :on-success="success2"
              :on-error="handleError2"
              :on-preview="handlePictureCardPreview2"
              :on-remove="handleRemove2">
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible2" width="400px">
              <img width="100%" :src="dialogImageUrl2" alt="">
            </el-dialog>
            <p class="suggest">建议尺寸: 750*750像素</p>
            <el-button type="primary" :disabled="btnDis" class="post-an-item" @click="release">发布商品</el-button>
          </el-form-item>

      </el-form>
    </div>
  </v-container>
</template>

<script>
  import serverList from  '../../serverList'
  import { Toast } from 'vant'
  // import E from "wangeditor";
  export default {
    name: "MyBrand",
    inject: ['reload'], // 注入依赖刷新当前页面
    data() {
      return {
        btnDis: false,
        form: {
          attribues: '',
          attribuesItem: '',
          getItem: '',
          specification: '',
          specification1: '',
          price: '',
        },
        value: [],
        categoryName: '',
        serverList: serverList,
        getList: [],
        // 七牛云 商品主图 start
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
        //  七牛云 商品主图 end
        // 上传图片
        dialogImageUrl1: '',
        dialogVisible1: false,
        imgUrl1: [],
        actionUrl: '',
        uploadUrl:this.GLOBAL.imgApi.replace(/\'/g, ""),
        dialogImageUrl2: '',
        dialogVisible2: false,
        imgUrl2: [],
        showBtn: false, // 按钮显隐
        showInput: false, // input框显隐
        showText: false, // 文本显示
        inputDis: false,
        loading: false, // 加载
        showBtn1: false,
        // 规格
        items: [],
        showText1: false,
        showBtn2: false,
        sheradio: 1,
        sheradioValue: true,
        value1: '',
        delMethod: 1,
        setTime: '',
        speciName: [],
        specifications: [],
        specName: {
          name: '',
          content: ''
        },
        tableData: [],
        // 属性
        attItems: [],
        attTitle: '',
        // 编辑富文本
        // editor: null,
        // editorContent: '',
        // editors: '',
        spec:[],
        idempotency: '',
        // 获取分类名字
        classifica: [],
        userInfo: {},
      }
    },
    methods:{
      // 选择商品列表
      handleChange(value) {
        let getNode =  this.$refs["getOptions"].getCheckedNodes()//获得当前节点，
        let classificaList = getNode[0].pathLabels
        this.classifica = classificaList.toString().replace(/,/g, "_") //获得当前节点，
        this.categoryName = value.toString()
        this.categoryName = this.categoryName.replace(/,/g, "_") // 分类下标
      },
      // 上传商品主图
      beforeUpload1 (file) {
        this.qiniuData.key = this.currentdate +'_'+ file.name;
        const isJPG = file.type === "image/jpeg";
        const isPNG = file.type === "image/png";
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isJPG && !isPNG) {
          this.$message({
            type: 'error',
            message: '图片只能是 JPG/PNG 格式!',
            offset: 80
          })
          return false;
        }
        if (!isLt2M) {
          this.$message({
            type: 'error',
            message: '图片大小不能超过 2MB!',
            offset: 80
          })
          return false;
        }
      },
      handleRemove1(file, fileList) {
        // console.log(file, fileList);
      },
      handlePictureCardPreview1(file) {
        this.dialogImageUrl1 = file.url;
        this.dialogVisible1 = true;
      },
      handleError1 () {
        this.$message({
          message: "上传失败",
          duration: 2000,
          type: "warning",
          offset: 80,
        });
      },
      //图片上传成功
      success1(response, file, fileList) {
        this.imageUrl1 = this.upload_qiniu_addr + response.key;
        this.fileLists = [];
        this.fileLists = [file]
        this.imgUrl1.push(this.upload_qiniu_addr+'/'+response.key)
        this.getTime()
      },
      // 上传商品展示图
      beforeUpload2 (file) {
        this.qiniuData.key = this.currentdate + '_' + file.name
        const isJPG = file.type === "image/jpeg";
        const isPNG = file.type === "image/png";
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isJPG && !isPNG) {
          this.$message({
            type: 'error',
            message: '图片只能是 JPG/PNG 格式!',
            offset: 80
          })
          return false;
        }
        if (!isLt2M) {
          this.$message({
            type: 'error',
            message: '图片大小不能超过 2MB!',
            offset: 80
          })
          return false;
        }
      },
      handleRemove2(file, fileList) {
        // console.log(file, fileList);
      },
      handlePictureCardPreview2(file) {
        this.dialogImageUrl2 = file.url;
        this.dialogVisible2 = true;
      },
      //图片上传成功
      success2(response, file, fileList) {
        this.imageUrl2 = this.upload_qiniu_addr + response.key;
        this.fileLists = [];
        this.fileLists = [file]
        this.imgUrl2.push(this.upload_qiniu_addr+'/'+response.key)
        this.getTime()
      },
      handleError2 () {
        this.$message({
          message: "上传失败",
          duration: 2000,
          type: "warning",
          offset: 80,
        });
      },
      // 添加属性
      attFocus () {
        this.showBtn = true
      },
      addAttr1 () {
        if (this.form.attribues == '' || this.form.attribues == null) {
          this.$message({
            message: '属性名称不能为空',
            type: 'warning'
          });
          return false
        }
        this.attTitle = this.form.attribues
        this.attItems.push({name:this.attTitle,content: ''})
      },
      attDel (index) {
        this.attItems.splice(index,1)
      },
      attblur (attItems) {
        // console.log(JSON.stringify(this.attItems))
      },
      // 规格
      attFocus1 () {
        this.showBtn1 = true
      },
      init () {
        const getCombination=(array)=>{
          // 结果集
          let resultArry=[];
          // 开始遍历二维数据
          array.forEach((arrItem)=>{
            // 这里判断是否为二维数组的第一组数据
            if(resultArry.length===0){
              resultArry=arrItem
            }else{
              // 开始第二组数据的处理
              const emptyArray=[];
              // 开始循环之前处理好的数组里面数据
              resultArry.forEach((item)=>{

                // console.log("item:",item)

                // 开始循环下一组数据的出来
                arrItem.forEach((value)=>{
                  // 组合数据，例如：item: ['大','红色'] value: 轻 ，组合之后就变成  ['大','红色','轻']
                  if( item instanceof Array){
                    emptyArray.push([...item,value])
                  } else{
                    emptyArray.push([item,value])
                  }


                  // console.log("value:",value)
                  // console.log("emptyArray:",emptyArray)
                })
              })
              resultArry=emptyArray
            }
          });
          return resultArry;
        }
        let res = getCombination(this.spec);
        // console.log(this.spec)
        this.tableData = []
        // console.log(res)
        // 组合规格表格数据
        for(let i = 0; i < res.length; i++){
          let b = {}
          let temp =  '';
          if(res[i] instanceof Array ){
            temp =  res[i].join('_')
          }else{
            temp = res[i];
          }



          b.content = temp;
          b.price = '';
          b.stock = '';
          this.tableData.push(b)
        }
      },
      addAttr3 () {
        if (this.form.specification == '' || this.form.specification == null) {
          this.$message({
            message: '属性名称不能为空',
            type: 'warning'
          });
          return false
        }
        this.showBtn2 = true
        this.speciName = this.form.specification
        // this.items.push('')
        this.form.specification = ''
        // this.items.push({name:this.speciName,content: ''})
        let object = [];
        let obj = [];
        obj.push({name:this.speciName,content: []})
        this.items.push(obj)
        this.spec.push(object)
      },
      addsss (item,i,items,index) {
        let inputId = index+i+"key::"+item[i].name
        let paramValue = document.getElementById(inputId).value;
        if (paramValue == '' || paramValue == null) {
          this.$message({
            message: '属性名称不能为空',
            type: 'warning'
          });
          return false
        }
        item[i].content.push(paramValue)
        this.spec[index].push(paramValue)
        this.paramValue = {}
        this.showText1 = true
        document.getElementById(inputId).value = ''
      //////////////////////////
        this.init()
      },
      delsss (i,index) {
        this.items.splice(i,1)
        // this.items.splice(index,1)  // 1
        if(this.items.length <= 0){
          this.showBtn2 = false
        }else{
          this.showBtn2 = true
        }
        this.spec.splice(index,1)
        this.init()
      },
      delAttInfosss (index,l) {
        this.$confirm('确定要删除此项？, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.items[index][0].content.splice(l,1)
          this.spec[index].splice(l,1)
          this.init()
          // this.inputDis = false
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      // 上架商品
      changeSheradio (Radio) {
      },
      // 获取接口幂等性
      async empotency () {
        let res = await this.$Http.empotency()
        if (res.code === 0) {
          Toast.clear()
          this.idempotency = res.data
          localStorage.removeItem("idempotency")
          localStorage.setItem('idempotency',this.idempotency)
        } else {
          Toast.clear()
        }
      },
      // 发布商品
      async release () {
        if (this.form.name == '' || this.form.name == null) {
          this.$message({
            type: "warning",
            message: '商品标题不能为空',
            offset: 80
          })
          return  false
        } else if (this.form.alias == '' || this.form.alias == null) {
          this.$message({
            type: "warning",
            message: '商品副标题不能为空',
            offset: 80
          })
          return  false
        } else if (this.categoryName == '') {
          this.$message({
            type: "warning",
            message: '商品分类不能为空',
            offset: 80
          })
          return  false
        }
        // else if (this.imgUrl1.length == 0) {
        //   this.$message.warning('商品主图不能为空');
        //   return  false
        // } else if (this.imgUrl2.length == 0) {
        //   this.$message.warning('商品展示图不能为空');
        //   return  false
        // }
        else if (this.form.price == '') {
          this.$message({
            type: "warning",
            message: '商品价格不能为空',
            offset: 80
          })
          return false
        } else if (this.tableData.length === 0) {
          this.$message({
            type: "warning",
            message: '规格不能为空',
            offset: 80
          })
          return  false
        }
        else {
          let data = {
            title: this.form.name,  // 商品标题
            subTitle: this.form.alias, // 商品子标题
            storeId:  localStorage.getItem('id'), // 店铺id
            cid: this.categoryName, // 商品的类目名称
            categoryName:  this.classifica, // 分类名称
            images: JSON.stringify(this.imgUrl1), // 商品主图
            price: this.form.price.toString(), // 商品价格
            attributes: JSON.stringify(this.attItems), // 属性
            parameters: JSON.stringify(this.tableData), // 规格
            saleable: this.sheradio, // 上架时间
            distribution : this.delMethod, // 配送方式
            description: JSON.stringify(this.imgUrl2) , // 商品展示图
            storePhone: localStorage.getItem('storePhone'), // 店铺电话
            storeLogo: localStorage.getItem('logo'), // 店铺logo
          }
          if(this.userInfo == null || this.userInfo == '') {
            this.btnDis = false
            this.$message({
              type: 'error',
              message: '店铺未认证',
              offset: 80
            })
          } else if (this.userInfo.states == 2) {
            let res = await this.$Http.relase(data,false,{
              headers: {
                'requestNo': localStorage.getItem('idempotency')
              }
            }).then((res) => {
              if (res.code === 0) {
                this.btnDis = true
                setTimeout(() => {
                  this.$message({
                    message: '添加成功',
                    type: 'success',
                    offset: 80
                  });
                  this.reload() // 刷新当前页面
                },1500)
              }
            })
          } else {
            this.btnDis = false
            this.$message({
              type: 'error',
              message: '店铺未认证',
              offset: 80
            })
          }
        }
      },
      // 获取店铺信息
      async getStoreInfo () {
        let uid =
          {
            uid: localStorage.getItem('uid')
          }
        let res = await this.$Http.getStoreInfo(uid)
        this.userInfo = res.data
      },
      // 获取当前时间
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
      }
    },
    created () {
      this.getList = this.serverList // 获取商品分类
      // console.log(this.getList)
      this.empotency ()
      this.getStoreInfo()
      // 获取当前时间
      this.getTime()
    }
  }
</script>

<style lang="less" scoped>
  .commodity-list {
    background-color: #ffffff;
    & .forms {
      padding: 20px;
    }
    & h3 {
      padding: 0;
      margin: 0;
      font-size: 18px;
      height: 44px;
      line-height: 44px !important;
      font-weight:bold;
      color:rgba(51,51,51,1);
      padding-left: 20px;
      background:rgba(245,247,250,1);
      vertical-align: middle;
      margin-bottom: 20px;
    }
    & h3:before {
      content: '';
      display: inline-block;
      font-size: 0;
      width: 4px;
      height: 20px;
      vertical-align: middle !important;
      margin-right: 12px;
      background:rgba(24,112,242,1);
    }
    & /deep/ .el-input {
      width: 330px;
    }
    & /deep/ .el-form-item__label {
      font-size:14px;
      font-family:Microsoft YaHei;
      font-weight:400;
      color:rgba(102,102,102,1);
      line-height:36px;
    }
    & .suggest {
      font-size:15px;
      font-family:Microsoft YaHei;
      font-weight:400;
      color:rgba(153,153,153,1);
      line-height:36px;
      letter-spacing: 1px;
    }
    & .attInfo {
      width: 400px;
      padding-left: 42px;
      margin-right: 20px;
    }
    & /deep/ .el-icon-delete {
      text-indent: 30px;
    }
    & /deep/ .el-icon-delete:after {
      content: '删除';
      display: inline-block;
      cursor: pointer;
      text-indent: 2px;
      color: red;
    }
    & .shelves /deep/ .el-radio {
      line-height: 40px;
    }
    & .post-an-item {
      width:96px;
      height:36px;
      background:rgba(24,112,242,1);
      border-radius:2px;
      border-color: rgba(24,112,242,1);
    }
    &  /deep/ .el-icon-delete:after {
      content: ''
    }
    & /deep/ .el-icon-delete {
      text-indent: 3px;
    }
    /deep/ .el-upload--picture-card {
      width: 100px;
      height: 100px;
    }
    /deep/ .el-upload--picture-card i {
      line-height: 100px;
    }
    /deep/ .el-upload-list--picture-card .el-upload-list__item {
      width: 100px;
      height: 100px;
    }
  }
  .el-cascader-node__postfix {
    right: 22px;
  }
  /deep/.el-radio__input.is-checked+.el-radio__label
  {
    color: #1870f2;
  }
  /deep/ .el-radio__input.is-checked .el-radio__inner {
    border-color: #1870f2;
    background: #1870f2;
  }
  /deep/ .el-form-item__content {
    line-height: 32px;
  }
</style>
