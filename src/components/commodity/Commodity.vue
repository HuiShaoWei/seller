<template>
  <div class="commodity"
       v-loading="loading"
       element-loading-text="拼命加载中"
       element-loading-spinner="el-icon-loading"
       element-loading-background="rgba(0, 0, 0, 0.8)"
  >
    <div class="btns">
      <el-button v-if="this.multipleSelection.length>0" @click="pshelves">上架商品</el-button>
      <el-button v-else :disabled="true">上架商品</el-button>
      <el-button v-if="this.multipleSelection.length>0" @click="oshelves">下架商品</el-button>
      <el-button v-else :disabled="true">下架商品</el-button>
      <el-button type="danger" v-if="this.multipleSelection.length>0" @click="delList">删除商品</el-button>
      <el-button type="danger" v-else :disabled="true">删除商品</el-button>
    </div>
    <div class="tables">
      <el-table
        ref="multipleTable"
        :data="tableData"
        border
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange">
        <el-table-column
          fixed
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          fixed
          label="商品图片"
          width="120"
          align="center"
          prop="images"
        >
          <template slot-scope="scope">
            <p v-if="getImgs(scope.row.images) !== undefined" style="height: 68px;padding: 0;margin: 0;font-size: 0;cursor: pointer">
              <img :src="getImgs(scope.row.images)"  width="50" height="50" style="display: inline-block; margin: 9px 0;margin-right: 4px" alt="">
            </p>
            <p v-else style="padding: 0;margin: 0">
              <img src="../../assets/image/null.png"  width="50" height="50" style="display: inline-block; margin: 9px 0;margin-right: 4px" alt="">
            </p>
          </template>
        </el-table-column>
        <el-table-column
          fixed
          prop="title"
          label="商品名称"
          align="center"
        >
        </el-table-column>
        <el-table-column
          label="商品分类"
          prop="cid"
          align="center"
          :formatter="getProClass"
          >
        </el-table-column>
        <el-table-column
          prop="price"
          label="价格"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
<!--        <el-table-column-->
<!--          prop="stock"-->
<!--          label="库存"-->
<!--          align="center"-->
<!--          :formatter="stock"-->
<!--          show-overflow-tooltip>-->
<!--        </el-table-column>-->
        <el-table-column
          prop="saleable"
          label="状态"
          align="center"
          show-overflow-tooltip>
          <template slot-scope="scope">
          <p v-if = "scope.row.saleable == 1">上架</p>
          <p v-else-if = "scope.row.saleable == 2">放入仓库</p>
          <p v-else>下架</p>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="200"
          align="center"
         >
          <template slot-scope="scope">
            <el-link :underline="false" type="primary" @click="more(scope.row)">查看</el-link>&nbsp;
            <el-link :underline="false" type="primary" v-if="scope.row.saleable == 3" @click="shelves(scope.row)">上架</el-link>&nbsp;
            <el-link :underline="false" type="primary" v-if="scope.row.saleable == 1" @click="offShelf(scope.row)">下架</el-link>&nbsp;
            <el-link :underline="false" type="primary" @click="modify(scope.row)">修改</el-link>&nbsp;
            <el-link :underline="false" type="danger" @click="del(scope.row)">删除</el-link>
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
    <!-- 查看弹窗/修改弹窗 -->
    <el-dialog :title="title" :visible.sync="dialogFormVisible" :before-close="handleClose">
      <el-form>
        <el-form-item label="商品标题" :label-width="formLabelWidth">
          <el-input v-model="modifyItem.title" :disabled="isdisable" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="副标题" :label-width="formLabelWidth">
          <el-input v-model="modifyItem.subTitle" :disabled="isdisable" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="商品分类" :label-width="formLabelWidth">
          <el-cascader
            :disabled="isdisable"
            ref="getOptions"
            v-model="modifyItem.cid"
            :options="getList.classiFication"
            @change="handleChange">
          </el-cascader>
        </el-form-item>
        <el-form-item label="商品主图" :label-width="formLabelWidth">
          <el-upload
            :disabled="isdisable"
            :action="upload_qiniu_url"
            :data="qiniuData"
            list-type="picture-card"
            :file-list="dialogImageUrlArray1"
            :limit = "5"
            :before-upload="beforeUpload1"
            :on-preview="handlePictureCardPreview1"
            :on-success="success1"
            :on-error="handleError1"
            :on-remove="handleRemove1">
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="productImg" width="400px" append-to-body>
            <img width="100%"  :src="modifyImages" alt="">
          </el-dialog>
        </el-form-item>
        <el-form-item label="价格" :label-width="formLabelWidth">
          <el-input v-model="modifyItem.price" :disabled="isdisable" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item :label="item.name" :label-width="formLabelWidth" v-for="(item,index) in modifyItem.attributes" :key="index">
          <el-input v-model="item.content" :disabled="isdisable" autocomplete="off"></el-input>
        </el-form-item>
<!--        <el-form-item label="运费设置" :label-width="formLabelWidth">-->
<!--          <el-input v-model="form.name" :disabled="isdisable" autocomplete="off"></el-input>-->
<!--        </el-form-item>-->
        <el-form-item :label="item.name" :label-width="formLabelWidth" v-for="(item,index) in modifyItem.genericSpec" :key="index">
          <el-input v-model="item.content" :disabled="isdisable" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-table
            border
            :data="modifyItem.parameters"
            style="width: 100%">
            <el-table-column
              prop="content"
              label="规格"
              align="center"
              >
            </el-table-column>
            <el-table-column
              label="价格"
              align="center"
              >
              <template slot-scope="scope">
                <el-input v-model="scope.row.price" :disabled="isdisable" style="width: 120px"></el-input>
              </template>
            </el-table-column>
<!--            <el-table-column-->
<!--              label="库存"-->
<!--              align="center"-->
<!--            >-->
<!--              <template slot-scope="scope">-->
<!--                <el-input v-model="scope.row.stock" :disabled="isdisable" style="width: 120px"></el-input>-->
<!--              </template>-->
<!--            </el-table-column>-->
          </el-table>
        </el-form-item>
        <el-form-item label="上架时间" :label-width="formLabelWidth">
          <el-radio-group v-model="modifyItem.saleable">
            <el-radio :label="1" :disabled="isdisable">立即上架</el-radio>
            <el-radio :label="2" :disabled="isdisable">放入仓库</el-radio>
            <el-radio :label="3" :disabled="isdisable">下架</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="配送方式" :label-width="formLabelWidth">
          <el-radio-group v-model="modifyItem.distribution">
            <el-radio :label="1" :disabled="isdisable">无需发货产品，在线电子发票</el-radio>
            <el-radio :label="2" :disabled="isdisable">快递发货</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="商品展示图" :label-width="formLabelWidth">
          <el-upload
            :disabled="isdisable"
            :action="upload_qiniu_url"
            :data="qiniuData"
            list-type="picture-card"
            :file-list="dialogImageUrlArray2"
            :before-upload="beforeUpload2"
            :on-preview="handlePictureCardPreview2"
            :on-success="success2"
            :on-remove="handleRemove2">
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog v-if="modifyItem.description" :visible.sync="description" width="400px" append-to-body>
            <img width="100%"  :src="modifyItem.description" alt="">
          </el-dialog>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" v-if="modyfiys">
        <el-button @click="save">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import serverList from "../../serverList";
import { Toast } from 'vant'
export default {
  props: ['searchValue'],
  inject: ['reload'], // 注入依赖刷新当前页面
  data () {
    return {
      uploadUrl:this.GLOBAL.imgApi.replace(/\'/g, ""),
      loading: false,
      // 表格
      tableData: [],
      tableImages: [],
      tableCid: [],
      multipleSelection: [],
      // 分页
      rowsPerPage: 15,
      page: 1,
      total:0,
      pageSizes: [10, 15, 20, 25],
      // 查看修改弹窗
      title: '',
      dialogFormVisible: false,
      modifyItem: {},
      modifyArr: [],
      formLabelWidth: '120px',
      modyfiys: false, // 弹窗是否显示提交按钮
      serverList: serverList,
      value1: '',
      dialogImageUrl1: '',
      dialogVisible1: false,
      dialogImageUrl2: '',
      dialogVisible2: false,
      isdisable: false, // 是否禁用
      dialogImages: false,
      imagesList: [], // 商品主图
      descriptionImages: [], // 详情图片
      cid: '',
      classifica: [], //类目名字
      special: [],
      genericSpec: [],
      imgUrl1: [],
      //////////////////////
      modifyData: {},
      isLook: false,
      // 七牛云 图片上传
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
      productImg: false,
      dialogImageUrlArray1: [],
      description: false,
      dialogImageUrlArray2: [],
      modifyImages: '',
    }
  },
  methods: {
    // 表格图片
    getImgs (row) {
      return row[0]
    },
    // 获取库存数量
    stock (row) {
          let a = row.parameters
          let num = 0
          a.forEach(stockNum => {
            num += Number(stockNum.stock)
          })

      return num
    },
    // 获取商品列表
    async getProductList () {
      let productInfo = {
        page: this.page, // 页码
        rows: this.rowsPerPage, // 条数
        shopId: localStorage.getItem('id'), // 类目的id
        category: this.searchValue.value1.toString().replace(/,/g,'_'), // 商品分类
        key: this.searchValue.proName, // 搜索框的值,可传null和''空字符串
        saleable: this.searchValue.proStatus, // 是否使用上下架进行筛选,默认为null，上架为true,下架为false
      }
      let res = await this.$Http.getProductList(productInfo)
      if (res.code === 0) {
            this.tableData = []
            this.searchValue.searchLoading = true
            // this.loading = true
            setTimeout(()=>{
            this.searchValue.searchLoading = false
            // this.loading = false
            this.total = res.data.total
            this.tableData = res.data.items

            // 数据转化
            for(let i = 0; i < this.tableData.length; i++){
              this.tableData[i].price = parseFloat(this.tableData[i].price)

              if(this.tableData[i].attributes !== null || this.tableData[i].attributes !== ""){
                this.tableData[i].attributes = JSON.parse(this.tableData[i].attributes)
              }

              if(this.tableData[i].cid !== null || this.tableData[i].cid !== "") {
                this.tableData[i].cid =  this.tableData[i].cid.split('_').map(parseFloat)
              }

              if(this.tableData[i].description !== null || this.tableData[i].description !== ""){
                this.tableData[i].description = JSON.parse(this.tableData[i].description)
              }

              if(this.tableData[i].images !== null || this.tableData[i].images !== ""){
                this.tableData[i].images = JSON.parse(this.tableData[i].images)
              }

              if(this.tableData[i].parameters !== null || this.tableData[i].parameters !== ""){
                this.tableData[i].parameters = JSON.parse(this.tableData[i].parameters)
              }

            }
              // this.modifyArr = res.data.items

            },1500)
      } else {
        Toast.clear()
      }
    },
    getProClass (row, column, cellValue, index) {
      return row.categoryName
      // let cellArr = row.cid
      // cellArr = cellArr.toString()
      // cellArr = cellArr.split(',') // 报 split 不是function 的时间先转成 tostring() 类型
      // cellArr = cellArr.map(parseFloat) // ["13","1"] 变成 [13,1] 去掉双引号
      // let cellStr = '';
      // let len = cellArr.length
      // if(len == 1){
      //   return  this.getList.classiFication[cellValue].label
      // } else if(len == 2){
      //   return  this.getList.classiFication[cellArr[0]].label +" - "+this.getList.classiFication[cellArr[0]].children[cellArr[1]].label
      // } else if(len == 3){
      //   return  this.getList.classiFication[cellArr[0]].label +" - "+this.getList.classiFication[cellArr[0]].children[cellArr[1]].label+" - "+this.getList.classiFication[cellArr[0]].children[cellArr[1]].children[cellArr[2]].label
      // }
    },
    search () {
      this.getProductList()
    },
    // 表格
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 查看
    more(row) {
      this.title  = '查看'
      this.modyfiys = false
      this.dialogFormVisible = true
      this.isdisable = true
      this.modifyItem = row
      // 商品分类
      let cid = row.cid.toString()
      // this.modifyItem.cid = cid.split(',').map(parseFloat)
      for (let i = 0; i < row.images.length; i++) {
        let urlList = {}
        urlList.url = this.modifyItem.images[i]
        this.dialogImageUrlArray1.push(urlList)
      }
      for (let i = 0; i < row.description.length; i++) {
        let urlList = {}
        urlList.url = this.modifyItem.description[i]
        this.dialogImageUrlArray2.push(urlList)
      }
      // 商品主图
      // this.modifyItem.images = row.images
      // if (typeof this.modifyItem.images == 'string') {
      //   this.modifyItem.images = JSON.parse(row.images)
      // }
      // 属性
      // this.modifyItem.attributes = row.attributes
    // if (typeof this.modifyItem.genericSpec == 'string') {
    //     this.modifyItem.genericSpec = JSON.parse(row.genericSpec)
    //   }
      // 规格
      // this.modifyItem.parameters = row.parameters
     // if (typeof this.modifyItem.parameters == 'string') {
     //    this.modifyItem.parameters = JSON.parse(row.parameters)
     //  }
      // 商品展示图
      // this.modifyItem.description = row.description
     // if (typeof this.modifyItem.description == 'string') {
     //    this.modifyItem.description = JSON.parse(row.description)
     //  }
    },
    // 获取年月日时分秒
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
    // 上传商品主图
    beforeUpload1 (file) {
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
    handleRemove1(file, fileList) {
      //  1. 获取将要删除的图片的临时路径
      const filePath = file.url
      // 2. 从 pics 数组中，找到这个图片对应的索引值
      const i = this.modifyItem.images.findIndex(val => {
        return val === filePath
      })
      // 3. 调用数组的 splice 方法，把图片信息对象，从 pics 数组中移除
      this.modifyItem.images.splice(i, 1)
    },
    handlePictureCardPreview1 (file) {
      this.modifyImages = file.url;
      this.productImg = true;
    },
    handleError1 () {
      this.$message({
        message: "上传失败",
        duration: 2000,
        type: "warning"
      });
    },
    //图片上传成功
    success1(response, file, fileList) {
      this.modifyItem.images.push(this.upload_qiniu_addr +'/'+response.key)
      this.getTime()
    },
    // 商品展示图
    beforeUpload2 (file) {
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
    handleRemove2(file, fileList) {
      //  1. 获取将要删除的图片的临时路径
      const filePath = file.url
      // 2. 从 pics 数组中，找到这个图片对应的索引值
      const i = this.modifyItem.description.findIndex(val => {
        return val === filePath
      })
      // 3. 调用数组的 splice 方法，把图片信息对象，从 pics 数组中移除
      this.modifyItem.description.splice(i, 1)
    },
    handlePictureCardPreview2 (file) {
      this.modifyItem.description = file.url;
      this.description = true;
    },
    //图片上传成功
    success2(response, file, fileList) {
      this.modifyItem.description.push(this.upload_qiniu_addr +'/'+response.key)
      this.getTime()
    },
    // 上架
    async shelves(row) {
      if (row.saleable === 1) {
        this.$message({
          message: '该商场已上架无需重复此操作',
          type: 'warning',
          offset: 80
        });
        return false
      } else {
        let ids = {
          ids: row.id,
          type: 1
        }
        let res = await this.$Http.shelves(ids,true)
        if (res.code === 0) {
          setTimeout(() => {
            this.getProductList()
            this.$message({
              message: '上架成功',
                type: 'success',
                offset: 80
            });
          },500)
        }
      }
    },
    // 下架
    async offShelf(row) {
      let ids = {
        ids: row.id,
        type: 3
      }
      let res = await this.$Http.shelves(ids,true)
      if (res.code === 0) {
        setTimeout(() => {
          this.getProductList()
          this.$message({
            message: '下架成功',
            type: 'success',
            offset: 80
          });
        },500)
      }
    },
    // 修改
    modify(row) {
      this.title = '修改'
      if(row.saleable == 1) {
        this.$message({
          type: 'error',
          message: '请先下架该商品',
          offset: 80
        })
      } else {
        this.modyfiys = true
        this.isdisable = false
        this.dialogFormVisible = true
        this.modifyItem = row
        this.classifica = row.categoryName
        for (let i = 0; i < row.images.length; i++) {
          let urlList = {}
          urlList.url = this.modifyItem.images[i]
          this.dialogImageUrlArray1.push(urlList)
        }
        for (let i = 0; i < row.description.length; i++) {
          let urlList = {}
          urlList.url = this.modifyItem.description[i]
          this.dialogImageUrlArray2.push(urlList)
        }
        // 商品分类
        let cid = row.cid.toString()
        // this.modifyItem.cid = cid.split(',').map(parseFloat)
      }
    },
    handleClose (done) {
      // this.dialogVisible = false
      // this.getProductList()
      this.dialogImageUrlArray1 = []
      this.dialogImageUrlArray2 = []
      done()
    },
    // 保存
     async save () {
     let data = {
          title: this.modifyItem.title,  // 商品标题
          subTitle: this.modifyItem.subTitle, // 商品子标题
          storeId: parseInt(localStorage.getItem('id')), // 店铺id
          cid: this.modifyItem.cid.toString().replace(/,/g,"_"), // 商品的类目名称
          categoryName:  this.classifica, // 分类名称
          images: JSON.stringify(this.modifyItem.images), // 商品主图
          price: this.modifyItem.price.toString(), // 商品价格
          attributes: JSON.stringify(this.modifyItem.attributes), // 属性
          parameters: JSON.stringify(this.modifyItem.parameters), // 规格
          saleable: this.modifyItem.saleable, // 上架时间
          distribution: this.modifyItem.distribution, // 配送方式
          description: JSON.stringify(this.modifyItem.description) , // 商品展示图
          id: this.modifyItem.id  // 商品id
      }
      let res = await this.$Http.editPro(data)
       if (res.code == 0) {
         setTimeout(() =>{
           this.$message({
             message: '修改成功',
             type: "success",
             offset: 80
           });
         })
       }
      this.dialogFormVisible = false
      this.dialogImageUrlArray1 = []
      this.dialogImageUrlArray2 = []
      this.getProductList()
    },
    // 删除 (单条)
    async del(row) {
      // this.loading = true
      let id = {
        ids: row.id
      }
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then( async () => {
        if (row.saleable == 3 ) {
          let res = await this.$Http.delPro(id)
          this.$message({
            type: 'success',
            message: '删除成功!',
            offset: 80
          });
          this.getProductList()
        } else {
          this.$message({
            type: 'error',
            message: '请先下架该商品',
            offset: 80
          });
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除',
          offset: 80
        });
      });
    },
    // 删除 (多条)
    async delList () {
      let ids = []
      let saleableList = []
      for (let i=0;i<this.multipleSelection.length;i++) {
        ids.push(this.multipleSelection[i].id)
        saleableList.push(this.multipleSelection[i].saleable)
      }
      let idList = {
        ids: ids.toString().replace(new RegExp(',', "g"), ",")
      }
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        for (let i=0;i<this.multipleSelection.length;i++) {
          if (this.multipleSelection[i].saleable !== 3) {
            this.$message({
              type: 'error',
              message: '选项中含有上架商品，请先下架改商品',
              offset: 80
            });
            return  false
          }
        }
          let res = await this.$Http.delPro(idList)
          this.$message({
            type: 'success',
            message: '删除成功!',
            offset: 80
          });
          this.getProductList()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除',
          offset: 80
        });
      });
      // this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
      //   confirmButtonText: '确定',
      //   cancelButtonText: '取消',
      //   type: 'warning'
      // }).then(() => {
      //   this.$http({
      //     url: '/item/batch',
      //     method: 'delete',
      //     params: {ids: ids.toString().replace(new RegExp(',', "g"), ",") }
      //   }).then((res) => {
      //     this.loading = true
      //     setTimeout(() =>{
      //       this.$message({
      //         type: 'success',
      //         message: '删除成功!'
      //       });
      //       this.loading = false
      //       this.getProductList()
      //     },1500)
      //   })
      // }).catch(() => {
      //   this.$message({
      //     type: 'info',
      //     message: '已取消删除'
      //   });
      // });
    },
    // 批量上架下架
    async pshelves () {
      let ids = []
      let saleType = 1
      for (let i=0;i<this.multipleSelection.length;i++) {
        ids.push(this.multipleSelection[i].id)
        if (this.multipleSelection[i].saleable === 1) {
          this.$message({
            type: 'warning',
            message: '该选项中有已上架商品，请重新操作!',
            offset: 80
          });
          return false
        }
      }
      let idList = {
        ids: ids.toString().replace(new RegExp(',', "g"), ","),
        type: 1
      }
      let res = await this.$Http.shelves(idList,true)
      setTimeout(() => {
        this.getProductList()
        this.$message({
          message: '上架成功',
          type: 'success',
          offset: 80
        });
      },500)
    },
    async oshelves () {
      let ids = []
      let saleType = 3
      for (let i=0;i<this.multipleSelection.length;i++) {
        ids.push(this.multipleSelection[i].id)
        if (this.multipleSelection[i].saleable === 3) {
          this.$message({
            type: 'warning',
            message: '该选项中有含有下架商品，请重新操作!',
            offset: 80
          });
          return false
        }
      }
      let idList = {
        ids: ids.toString().replace(new RegExp(',', "g"), ","),
        type: 3
      }
      let res = await this.$Http.shelves(idList,true)
      setTimeout(() => {
        this.getProductList()
        this.$message({
          message: '下架成功',
          type: 'success',
          offset: 80
        });
      },500)
    },
    // 分页
    handleSizeChange(val) {
      this.getProductList()
    },
    handleCurrentChange(val) {
      this.getProductList()
    },
    nextPage() {
      this.page += 1
      this.getProductList()
    },
    prevPage() {
      this.page -= 1
      this.getProductList()
    },
    // 选择商品列表
    handleChange(value) {
      let getNode =  this.$refs["getOptions"].getCheckedNodes()//获得当前节点，
      let classificaList = getNode[0].pathLabels
      this.classifica = classificaList.toString().replace(/,/g, "_") //获得当前节点，
      this.categoryName = value.toString()
      this.categoryName = this.categoryName.replace(/,/g, "_") // 分类下标
    },
  },
  created() {
    this.getList = this.serverList // 获取商品分类
    if (localStorage.getItem('id') == 0) {
      this.$message({
        type: 'error',
        message: '请先认证店铺信息',
        offset: 80
      })
    } else {
      this.getProductList()
    }
    this.getTime()
  }
}
</script>

<style lang="less" scoped>
.commodity {
  & .btns {
    margin: 24px 0;
  }
  & /deep/ .el-button--primary {
    padding: 12px 20px;
    font-size: 14px;
    border-radius: 4px;
    color: #fff;
    background-color: #409eff;
    border-color: #409eff;
  }
  & .delInco {
    display: inline-block;
    position: relative;
  }
  & .del {
    content: 'x';
    font-size: 18px;
    position: absolute;
    top: 24px;
    right: 12px;
    color: #ffffff;
    cursor: pointer;
    font-weight: bold;
  }
}
.pages {
  margin: 24px 0;
  & /deep/ .el-pagination__editor.el-input {
    width: 50px;
  }
  .tablePagin{
    text-align: end;
  }
  /deep/ .el-pagination__sizes .el-input .el-input__inner {
    height: 28px;
    line-height: 28px;
  }
}
 /deep/ .el-pagination.is-background .el-pager li:not(.disabled).active {
  background-color: #3c8bfe !important;
}
/deep/ .el-table__fixed-header-wrapper {
  z-index: 0;
}
/deep/ .el-upload-list--picture-card .el-upload-list__item {
  width: 100px !important;
  height: 100px !important;
  line-height: 100px !important;
}
/deep/ .el-upload-list--picture-card .el-upload-list__item-status-label i {
  float: right;
  margin-right: 14px;
  margin-top: 10px;
}
</style>
