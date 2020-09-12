<template>
  <div class="evaluation">
    <el-card>
      <div class="header">
        <el-form :inline="true"
                 :model="formInline"
                 class="demo-form-inline">
          <el-form-item label="评价时间"
                        class="btn-01">
            <el-date-picker v-model="timeArray"
                            value-format="yyyy-MM-dd"
                            type="daterange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item><br />
          <el-form-item label="评价类型"
                        class="btn-02">
            <el-select v-model="formInline.commentType"
                       placeholder="请选择">
              <el-option v-for="item in typeOptions"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="评论内容"
                        class="btn-03">
            <el-select v-model="formInline.comments"
                       placeholder="请选择">
              <el-option v-for="item in commentsOptions"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>
          </el-form-item><br />
          <el-form-item class="btn-04">
            <el-button @click="seachs">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="tables">
        <elevatable :formInline="formInline"></elevatable>
      </div>
    </el-card>
  </div>
</template>

<script>
import elevatable from '../../components/evaluation/EvaluationTable'
export default {
  name: 'Evaluation',
  data() {
    return {
      timeArray: [],
      formInline: {
        commentType: 0,
        comments: 0,
        startTime: '',
        endTime: '',
      },
      typeOptions: [
        {
          value: 0,
          label: '全部',
        },
        {
          value: 1,
          label: '好评',
        },
        {
          value: 2,
          label: '中评',
        },
        {
          value: 3,
          label: '差评',
        },
      ],
      commentsOptions: [
        {
          value: 0,
          label: '全部评论',
        },
        {
          value: 1,
          label: '有评论内容',
        },
        {
          value: 2,
          label: '无评论内容',
        },
        {
          value: 3,
          label: '有追加评论',
        },
      ],
    }
  },
  components: {
    elevatable,
  },
  methods: {
    seachs() {
      this.formInline.startTime = this.timeArray[0]
      this.formInline.endTime = this.timeArray[1]
    },
  },
  created() {},
}
</script>

<style lang="less" scoped>
.evaluation {
  margin: 24px;
  & .header {
    background: rgba(245, 247, 250, 1);
    padding: 24px;
    margin-bottom: 20px;
  }
}
/deep/ .btn-01 .el-range-editor.el-input__inner {
  width: 370px;
}
/deep/ .el-date-editor .el-range__icon {
  line-height: 29px;
}
/deep/ .btn-02 .el-input,
/deep/ .btn-03 .el-input {
  width: 160px;
}
/deep/ .btn-02 .el-input {
  margin-right: 49px;
}
/deep/ .btn-04 .el-button {
  margin-left: 70px;
  background-color: #1870f2;
  border-color: #1870f2;
  border-radius: 2px;
  color: #ffffff;
}
</style>
