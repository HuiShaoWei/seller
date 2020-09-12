<template>
  <div class="management">
    <div class="forms">
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="">
          <el-input v-model="searchTableInfo" placeholder="搜索分类">
          </el-input>
        </el-form-item>
<!--        <el-form-item>-->
<!--          <el-button @click="search">搜索</el-button>-->
<!--        </el-form-item>-->
      </el-form>
    </div>
    <div class="tabs">
      <el-table
        :data="tableData.slice((currpage - 1) * pagesize, currpage * pagesize)"
        border
        row-key="id"
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
        style="width: 100%">
        <el-table-column
          prop="value"
          label="分类id">
        </el-table-column>
        <el-table-column
          prop="label"
          label="分类名称"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="section"
          label="分类级别">
        </el-table-column>
      </el-table>
        <div class="pages">
          <el-pagination
            class="tablePagin"
            center
            background
            layout="prev, pager, next, sizes, total, jumper"
            :page-sizes="[10,15,20,25,30]"
            :page-size="pagesize"
            :total="tableData.length"
            @current-change="handleCurrentChange"
            @size-change="handleSizeChange"
          >
          </el-pagination>
        </div>
    </div>
  </div>
</template>

<script>
  import serverList from "../../serverList";
  export default {
    name: "category",
    data() {
      return {
        serverList: serverList,
        // 分页
        searchTableInfo: '',
        pagesize: 10,
        currpage: 1,
        getSearchInfo: [],
      }
    },
    methods: {
      // 搜索
      search() {
      },
      handleCurrentChange(cpage) {
        this.currpage = cpage;
      },
      handleSizeChange(psize) {
        this.pagesize = psize;
      },
      //操作多选
      // handleSelectionChange(val) {
      //   this.multipleSelection = val;
      // },
      info () {
        this.getSearchInfo = this.serverList.classiFication;
      },
    },
    computed: {
      // 根据计算属性模糊搜索
      tableData() {
        const searchTableInfo = this.searchTableInfo
        if (searchTableInfo) {
          // filter() 方法创建一个新的数组，新数组中的元素是通过检查指定数组中符合条件的所有元素。
          // 注意： filter() 不会对空数组进行检测。
          // 注意： filter() 不会改变原始数组。
          return this.getSearchInfo.filter(data => {
            // console.log("success" + data)
            // some() 方法用于检测数组中的元素是否满足指定条件;
            // some() 方法会依次执行数组的每个元素：
            // 如果有一个元素满足条件，则表达式返回true , 剩余的元素不会再执行检测;
            // 如果没有满足条件的元素，则返回false。
            // 注意： some() 不会对空数组进行检测。
            // 注意： some() 不会改变原始数组。
            return Object.keys(data).some(key => {
              // indexOf() 返回某个指定的字符在某个字符串中首次出现的位置，如果没有找到就返回-1；
              // 该方法对大小写敏感！所以之前需要toLowerCase()方法将所有查询到内容变为小写。
              return String(data[key]).toLowerCase().indexOf(searchTableInfo) > -1
            })
          })
        }
        return this.getSearchInfo
      }
    },
    created() {
      this.info();
    }
  }
</script>

<style lang="less" scoped>
.management {
  margin: 24px;
  padding-top: 16px;
  padding-bottom: 16px;
  background-color: #ffffff;
  & .forms {
    margin: 0 16px 16px 16px;
  }
  & .tabs {
    margin: 16px;
  }
  & .pages {
    margin-top: 24px;
    & /deep/ .el-pagination__editor.el-input {
      width: 50px;
    }
    .tablePagin{
      text-align: end;
    }
  }
}
</style>
