<template>
   <div class="customer">
     <el-card>
       <div class="header-tops">
         <el-form :inline="true" class="demo-form-inline" label-width="80px">
           <el-form-item label="消费时间">
             <el-date-picker
               v-model="timeArray"
               value-format="yyyy-MM-dd HH:mm:ss"
               type="daterange"
               @change="changeTime"
               range-separator="至"
               start-placeholder="开始日期"
               end-placeholder="结束日期">
             </el-date-picker>
           </el-form-item><br/>
           <el-form-item label="关键词">
             <el-select v-model="value" placeholder="请选择" style="width: 60px" @change="getValue">
               <el-option
                 v-for="item in options"
                 :key="item.value"
                 :label="item.label"
                 :value="item.value">
               </el-option>
             </el-select>
           </el-form-item>
           <el-form-item style="margin-left: 58px">
             <el-input v-model="searchValue" style="width: 220px"></el-input>
           </el-form-item><br/>
           <el-form-item style="margin-left: 80px">
             <el-button id="search"  @click="search">查询</el-button>
             <el-button @click="reset">重置</el-button>
           </el-form-item>
         </el-form>
       </div>
       <el-button v-if="multipleSelection.length>0" @click="delItem" type="danger" style="margin: 24px 0;">删除</el-button>
       <el-button v-else type="danger" disabled style="margin: 24px 0;">删除</el-button>
      <!-- table -->
       <el-table
         border
         ref="multipleTable"
         :data="tableData"
         tooltip-effect="dark"
         style="width: 100%"
         @selection-change="handleSelectionChange">
         <el-table-column
           type="selection"
           width="55">
         </el-table-column>
         <el-table-column
           label="客户"
          >
           <template slot-scope="scope">
              <div style="display: flex;">
                 <span style="display: block;margin-right: 12px;width: 60px;text-align: center;margin-top: 6px">
                 <img v-if="scope.row.image !== null" width="40" height="40" style="border-radius: 50%;" :src="scope.row.image" alt="">
                   <img v-else width="40" height="40" style="border-radius: 50%;" src="../../assets/imgs/avatar.png" alt="">
               </span>
                <span style="display: block;margin-top: 6px">
                 昵称: {{scope.row.name}}<br />
                 手机号码: {{scope.row.phone}}
               </span>
              </div>
           </template>
         </el-table-column>
<!--         <el-table-column-->
<!--           prop=""-->
<!--           label="历史消费次数"-->
<!--          >-->
<!--         </el-table-column>-->
         <el-table-column
           prop="createTime"
           label="消费时间"
           show-overflow-tooltip>
         </el-table-column>
         <el-table-column
           prop="itemTitle"
           label="商品名称"
           show-overflow-tooltip>
         </el-table-column>
         <el-table-column
           prop="checkParams"
           label="商品规格"
           show-overflow-tooltip>
         </el-table-column>
         <el-table-column
           prop="num"
           label="商品数量"
           show-overflow-tooltip>
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
     </el-card>
   </div>
</template>

<script>
  export default {
    inject: ['reload'], // 注入依赖刷新当前页面
    data () {
      return {
        timeArray: [],
        startTime: null,
        endTime: null,
        searchValue: '',
        options: [{
          value: '0',
          label: '手机号'
        }, {
          value: '1',
          label: '昵称'
        }],
        value: '',
        getSelectValue: null,
        ////////////
        tableData: [],
        multipleSelection: [],
        ///////////////////////
        // 分页
        rowsPerPage: 15,
        page: 1,
        total:0,
        pageSizes: [10, 15, 20, 25],
      }
    },
    methods: {
      // 表格数据初始化
      async init () {
        let parameter = {
          storeId: localStorage.getItem('id'), // 店铺id
          createTime: this.startTime, // 开始时间
          endTime: this.endTime, // 结束时间
          key: this.searchValue, // 搜索框的值
          page: this.page, // 显示当前页数
          rows: this.rowsPerPage, // 每页显示的条数
        }
        let res = await this.$Http.customerManagement(parameter)
        this.tableData = res.data.items
        this.total = res.data.total
      },
      delItem () {
        let ids = []
        for (let i=0;i<this.multipleSelection.length;i++) {
          ids.push(this.multipleSelection[i].id)
        }
        let parameter = {
          storeId: localStorage.getItem('id'), // 店铺id
          ids: ids.toString().replace(new RegExp(',', "g"), ","), // 订单id
        }
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {

          let res = await this.$Http.customerDel(parameter)
          this.$message({
            type: 'success',
            message: '删除成功!',
            offset: 80
          });
          this.init()
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
            offset: 80
          });
        });
      },
      // 重置
      reset () {
        this.reload()
      },
      // 查询
      getValue (value) {
        this.getSelectValue = value
      },
      changeTime () {
      },
      search () {
        if (this.timeArray == null) {
          this.startTime = null
          this.endTime = null
        } else if (this.timeArray.length == 0) {
          this.startTime = null
          this.endTime = null
        } else {
          this.startTime = this.timeArray[0]
          this.endTime = this.timeArray[1]
        }
        if (this.getSelectValue == 0) {
          if (this.searchValue == '' || this.searchValue == null) {
            this.$message({
              type: 'error',
              message: '手机号不能为空',
              offset: 80
            })
            return  false
          } else if (!(/^1[3456789]\d{9}$/.test(this.searchValue))) {
            this.$message({
              type: 'error',
              message: '手机号输入错误',
              offset: 80
            })
            return false
          }
        } else if (this.getSelectValue == 1) {
           if (this.searchValue == '' || this.searchValue == null) {
             this.$message({
               type: 'error',
               message: '昵称不能为空',
               offset: 80
             })
             return false
           }
        }
        if(localStorage.getItem('id') == 0) {
          this.$message({
            type: 'error',
            message: '请先认证店铺信息',
            offset: 80
          })
        } else {
          this.init()
        }
      },
      // table 多选
      handleSelectionChange(val) {
        this.multipleSelection = val;
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
    },
    created() {
      if(localStorage.getItem('id') == 0) {
        this.$message({
          type: 'error',
          message: '请先认证店铺信息',
          offset: 80
        })
      } else {
        this.init()
      }
    }
  }
</script>

<style lang="less" scoped>
.customer {
  margin: 24px;
  & .header-tops {
    padding: 12px;
    padding-top: 24px;
    background:rgba(245,247,250,1);
    & #search {
      width: 72px;
      height: 36px;
      background-color: #1870f2;
      border-radius: 2px;
      color: #ffffff;
    }
  }
  & /deep/ .el-select-dropdown {
    width: 120px;
  }
  & /deep/ .el-select>.el-input {
    width: 120px;
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
}
 /deep/ .el-pagination.is-background .el-pager li:not(.disabled).active {
   background-color: #3c8bfe;
 }
</style>
