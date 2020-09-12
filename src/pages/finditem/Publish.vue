<template>
  <div>
    <div class="publish">
      <div class="headers-top">
        <p>
          <el-steps :active="$store.state.project.step"
                    simple>
            <el-step title=" 基本信息"
                     class="first-step"></el-step>
            <el-step title=" 详情信息"
                     class="second-step"></el-step>
          </el-steps>
        </p>
      </div>
      <div class="publish-content">
        <div v-if="$store.state.project.step == 1">
          <Info ref="getDataValue"></Info>
        </div>
        <div v-else>
          <Detailed></Detailed>
        </div>
      </div>
    </div>
    <div class="btn-list">
      <el-button v-if="$store.state.project.step==1"
                 @click="cancel">取消</el-button>
      <el-button v-if="$store.state.project.step==2"
                 @click="previous">上一步</el-button>
      <el-button v-if="$store.state.project.step==1"
                 type="primary"
                 @click="nextSteps">下一步</el-button>
      <el-button v-if="$store.state.project.step==2"
                 type="primary"
                 @click="carryOut">完成</el-button>
    </div>
  </div>

</template>

<script>
import Info from '../../components/publish/Info'
import Detailed from '../../components/publish/Detailed'

export default {
  inject: ['reload'], // 注入依赖刷新当前页面
  name: 'Publish',
  data() {
    return {
      prevStep: 1,
      nextStep: 2,
    }
  },
  components: {
    Info,
    Detailed,
  },
  mounted() {
    // this.$refs.getDataValue.projectFrom = this.$store.state.project.userInfo
    // console.log(123, this.$refs.getDataValue.projectFrom)
  },
  methods: {
    // stepClick () {
    //   console.log(this.active)
    //   store.commit('getStep', this.nextStep)
    // }
    // 取消
    cancel() {
      this.reload()
    },
    // 上一步
    previous() {
      store.commit('getStep', this.prevStep)
      this.reload()
    },
    // 下一步
    nextSteps() {
      //  this.$refs.getDataValue.projectFrom 获取子组件data中的变量
      console.log(this.$refs.getDataValue.projectFrom)
      if (this.$refs.getDataValue.projectFrom.basicImgList.length == 0) {
        this.$message({
          type: 'error',
          message: '基本信息不能为空',
          offset: 80,
        })
        return false
      } else if (this.$refs.getDataValue.projectFrom.title == '') {
        this.$message({
          type: 'error',
          message: '商品标题不能为空',
          offset: 80,
        })
        return false
      } else if (
        this.$refs.getDataValue.projectFrom.fundsFirst == '' ||
        this.$refs.getDataValue.projectFrom.fundsFirst === 0
      ) {
        this.$message({
          type: 'error',
          message: '请输入正确的投资资金',
          offset: 80,
        })
        return false
      } else if (
        this.$refs.getDataValue.projectFrom.fundsSecond == '' ||
        this.$refs.getDataValue.projectFrom.fundsSecond === 0
      ) {
        this.$message({
          type: 'error',
          message: '请输入正确的投资资金',
          offset: 80,
        })
        return false
      } else if (
        this.$refs.getDataValue.projectFrom.fundsFirst >
        this.$refs.getDataValue.projectFrom.fundsSecond
      ) {
        this.$message({
          type: 'error',
          message: '投资资金范围输入错误',
          offset: 80,
        })
        return false
      } else if (
        this.$refs.getDataValue.projectFrom.basicImgList1.length == 0
      ) {
        this.$message({
          type: 'error',
          message: '商品展示图不能为空',
          offset: 80,
        })
        return false
      } else if (this.$refs.getDataValue.projectFrom.contact == '') {
        this.$message({
          type: 'error',
          message: '联系人不能为空',
          offset: 80,
        })
        return false
      } else if (this.$refs.getDataValue.projectFrom.areaList == '') {
        this.$message({
          type: 'error',
          message: '所在地区不能为空',
          offset: 80,
        })
        return false
      } else if (this.$refs.getDataValue.projectFrom.industryVlue == '') {
        this.$message({
          type: 'error',
          message: '所属行业不能为空',
          offset: 80,
        })
        return false
      } else if (this.$refs.getDataValue.projectFrom.financing == '') {
        this.$message({
          type: 'error',
          message: '融资用途不能为空',
          offset: 80,
        })
        return false
      } else if (
        this.$refs.getDataValue.projectFrom.shareFirst == '' &&
        this.$refs.getDataValue.projectFrom.shareFirst === 0
      ) {
        this.$message({
          type: 'error',
          message: '资金方占股比例不能为空',
          offset: 80,
        })
        return false
      } else if (
        this.$refs.getDataValue.projectFrom.shareSecond == '' &&
        this.$refs.getDataValue.projectFrom.shareSecond === 0
      ) {
        this.$message({
          type: 'error',
          message: '资金方占股比例不能为空',
          offset: 80,
        })
        return false
      } else if (
        this.$refs.getDataValue.projectFrom.shareFirst >
        this.$refs.getDataValue.projectFrom.shareSecond
      ) {
        this.$message({
          type: 'error',
          message: '资金方占股比例范围输入错误',
          offset: 80,
        })
        return false
      } else if (
        this.$refs.getDataValue.projectFrom.minimumYears == '' &&
        this.$refs.getDataValue.projectFrom.minimumYears === 0
      ) {
        this.$message({
          type: 'error',
          message: '请输入正确的最短退出年限',
          offset: 80,
        })
        return false
      }
      store.commit('getUserInfo', this.$refs.getDataValue.projectFrom)
      store.commit('getStep', this.nextStep)
    },
    // 完成
    carryOut() {
      this.reload()
      store.commit('getStep', this.prevStep)
    },
  },
}
</script>

<style lang="less" scoped>
.publish {
  margin: 24px;
  padding: 20px;
  background-color: #ffffff;

  & .headers-top {
    background: #f5f7fa;

    & p {
      width: 400px;
      text-align: center;
      margin: 0 auto;
    }
  }
}

.btn-list {
  position: absolute;
  bottom: -62px;
  width: 100%;
  background-color: #ffffff;
  text-align: center;
  padding: 12px 0;

  /deep/ .el-button {
    padding: 10px 23px;
  }

  /deep/ .el-button--primary {
    background-color: #1870f2;
    border-radius: 2px;
  }
}

/deep/ .el-steps--simple {
  padding: 12px 8%;
}

/deep/ .el-step.is-simple .el-step__icon {
  display: none !important;
}

/deep/ .el-step.is-simple .el-step__arrow::after,
/deep/ .el-step.is-simple .el-step__arrow::before {
  content: '>>>';
  transform: rotate(0deg) translateY(0px);
  width: 0;
  font-size: 18px;
  color: #c0c4cc;
  line-height: 15px;
  margin-left: -12px;
}

/deep/ .el-step.is-simple .el-step__title {
  font-weight: 800;
}

/deep/ .first-step.is-simple .el-step__title:before,
/deep/ .second-step.is-simple .el-step__title:before {
  content: '①';
  font-size: 20px;
  margin-right: 4px;
}

/deep/ .second-step.is-simple .el-step__title:before {
  content: '②';
}

/deep/ .el-step__title.is-finish {
  color: #1870f2;
}

/deep/ .el-step__title.is-process {
  color: #c0c4cc;
}
</style>
