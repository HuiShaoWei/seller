<template>
    <div class="evaluationTable">
      <el-table
        border
        :data="tableData"
        style="width: 100%">
        <el-table-column
          prop="evaluation"
          label="评价"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="commentContent"
          label="评价内容"
          show-overflow-tooltip
          align="center"
        >
          <template slot-scope="scope">
            <span>{{scope.row.evaluation}}: {{scope.row.commentContent}}</span><br />
            <span v-if="scope.row.review !== ''">追评: {{scope.row.review}}</span>
          </template >
        </el-table-column>
        <el-table-column
          prop="commentTime"
          label="评价时间"
          show-overflow-tooltip
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="commentator"
          label="评论人"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="commodity"
          label="商品"
          show-overflow-tooltip
          align="center"
        >
        </el-table-column>
        <el-table-column
          align="center"
          label="操作">
          <template slot-scope="scope">
            <el-link type="primary" :underline="false" @click="reply(scope.row)">回复</el-link>
          </template >
        </el-table-column>
      </el-table>
    <!-- 回复弹窗 -->
      <el-dialog
        title="商家回复"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose">
        <block>
          <p><span>欧巴桑</span>评论</p>
          <p>好评</p>
        </block>
        <time>2019-09-09 12:09</time><br />
        <p>
          这个商品非常实惠，价钱公道，实惠！下次继续来买！好评哦，加油吧啊，别让我失望！
        </p>
        <el-form>
          <el-form-item label="商家回复">
            <el-input type="textarea" v-model="content" placeholder="请输入想要回复的话"></el-input>
          </el-form-item>
          <el-form-item style="text-align: right">
            <el-button>发送</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
</template>

<script>
  export default {
    name: "EvaluationTable",
    props: ['formInline'],
    data () {
      return {
        tableData: [{
          evaluation: '好评',
          commentContent: '一般般',
          review: '质量还行',
          commentTime: '2020-03-08 11:20:31',
          commentator: '张三',
          commodity: '小黄人限量套餐'
        }],
        dialogVisible: false,
        content: ''
      }
    },
    methods: {
      reply (row) {
        this.dialogVisible = true
        console.log(this.formInline)
      },
      handleClose(done) {
        done()
      },
    }
  }
</script>

<style lang="less" scoped>
.evaluationTable {
  & /deep/ .el-table th {
    background:rgba(245,247,250,1);
  }
  & block {
    display: flex;
    & p {
      flex: 1;
      color:rgba(102,102,102,1);
      padding-bottom: 10px;
      & span {
        letter-spacing: 1px;
        color:rgba(24,112,242,1);
        padding-right: 6px;
      }
    }
    & p:last-child {
      color: #F66060;
    }
    & p:last-child {
      text-align: right;
    }
    & title {
      color: #666666;
    }
  }
  & /deep/ .el-dialog__title {
    font-size: 17px;
    font-weight: bold;
    letter-spacing: 2px;
  }
}

</style>
