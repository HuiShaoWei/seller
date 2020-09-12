<template>
  <v-container fluid grid-list-md>
    <div class="product-list">
    <div class="pro-form">
      <el-form :model="searchValue">
        <el-form-item label="商品名称">
          <el-input v-model="searchValue.proName" placeholder="输入商品名称"></el-input>
        </el-form-item>
        <el-form-item label="商品分类">
          <el-cascader
            ref="getOptions"
            v-model="searchValue.value1"
            @change="getValue1"
            :options="getList.classiFication"
            ></el-cascader>
        </el-form-item>
        <el-form-item label="商品状态">
          <el-select v-model="searchValue.value" placeholder="请选择" @change="handleChange">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item> <br />
        <el-form-item label="" label-width="80px" class="search-btns">
          <el-button  type="primary" @click="search">查询</el-button>
          <el-button @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="form-card">
      <el-tabs type="border-card">
        <el-tab-pane label="商品列表">
          <Commodity ref="Commodity" :searchValue="searchValue"></Commodity>
        </el-tab-pane>
<!--        <el-tab-pane label="已上架">-->
<!--          <Commodity ref="Commodity" v-if="searchValue.card == 2" :searchValue="searchValue"></Commodity>-->
<!--        </el-tab-pane>-->
<!--        <el-tab-pane label="待上架">-->
<!--          <Commodity ref="Commodity" v-if="searchValue.card == 3" :searchValue="searchValue"></Commodity>-->
<!--        </el-tab-pane>-->
      </el-tabs>
    </div>
    </div>
  </v-container>
</template>

<script>
import serverList from "../../serverList";
import Commodity from "../../components/commodity/Commodity";
export default {
  inject: ['reload'], // 注入依赖刷新当前页面
  name: "MyGoods",
    data(){
      return {
        searchValue: {
          proName: '',
          value1: '',
          value: '',
          proStatus: '',
          searchLoading: false
        },
        serverList: serverList,
        options: [{
          value: 0,
          label: '全部'
        },{
          value: 1,
          label: '上架'
        }, {
          value: 2,
          label: '待上架'
        }, {
          value: 3,
          label: '下架'
        }],
      }
    },
     created(){
       this.getList = this.serverList // 获取商品分类
     },
     methods:{
       search () {
         this.$refs.Commodity.search(); // search 传到子组件的方法
       },
       // 选择商品列表
       handleChange(value) {
         if (value == 1) {
            this.searchValue.proStatus = 1
         } else if (value == 2) {
           this.searchValue.proStatus = 2
         } else if (value == 3) {
           this.searchValue.proStatus = 3
         } else {
           this.searchValue.proStatus = null
         }
       },
       // 重置
       reset () {
         this.reload()
       },
       //
       getValue1 (value) {
         // console.log(value.toString())
       }
     },
     components:{
       Commodity
     }
    }
</script>

<style lang="less" scoped>
.product-list {
  background-color: #ffffff !important;
  padding: 24px;
  & .pro-form {
    background:rgba(245,247,250,1);
    padding: 30px 0;
    /deep/ .el-form-item {
      display: inline-block;
      width:300px;
      height:30px;
      border-radius:2px;
     & /deep/ .el-form-item__label {
       width: 80px;
     }
    }
    & /deep/ .el-button {
      width: 72px;
      padding: 11px 20px;
      background:rgba(255,255,255,1);
      border:1px solid rgba(204,204,204,1);
      border-radius:2px;
    }
    & /deep/ .el-button--primary {
      width: 72px;
      padding: 11px 20px;
      background:rgba(24,112,242,1);
      border-color: rgba(24,112,242,1);
      border-radius:2px;
    }
  }
  .form-card {
    margin-top: 40px;
  }
}
/deep/ .el-tabs--border-card>.el-tabs__header {
  z-index: 0
}
/deep/ .el-input {
  width: 200px;
}
.search-btns {
  margin-top: 20px;
}
/deep/.el-radio__input.is-checked+.el-radio__label
{
  color: #1870f2;
}
/deep/ .el-radio__input.is-checked .el-radio__inner {
  border-color: #1870f2;
  background: #1870f2;
}
</style>
