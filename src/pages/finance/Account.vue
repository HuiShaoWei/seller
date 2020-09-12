<template>
   <div class="account">
     <el-card>
       <div class="account-top">
         <el-row :gutter="20">
           <el-col :span="8">
             <div class="grid-content bg-purple">
               <p>累计收入 (元) (截止今日0点)</p>
               <span>
                 <countTo :separator='separator' :decimals="decimals" class="countNum" :startVal='startVal' :endVal="countList.accumulatedRevenue === null ? 0 : countList.accumulatedRevenue" :duration='2000'></countTo>
               </span>
             </div>
           </el-col>
           <el-col :span="8">
             <div class="grid-content bg-purple">
               <p>昨日收入 (元)</p>
               <span>
                 <countTo :separator='separator' :decimals="decimals" class="countNum" :startVal='startVal' :endVal="countList.yesterdayRevenue === null ? 0 : countList.yesterdayRevenue" :duration='2000'></countTo>
               </span>
             </div>
           </el-col>
           <el-col :span="8">
             <div class="grid-content bg-purple">
               <p>七日收入 (元)</p>
               <span>
                 <countTo :separator='separator' :decimals="decimals" class="countNum" :startVal='startVal' :endVal="countList.sevenDayRevenue === null ? 0: countList.sevenDayRevenue" :duration='2000'></countTo>
               </span>
             </div>
           </el-col>
         </el-row>
         <el-row :gutter="20">
           <el-col :span="8">
             <div class="grid-content bg-purple">
               <p>待结算总额 (元) (截止今日0点)</p>
               <span>
                 <countTo :separator='separator' :decimals="decimals" class="countNum" :startVal='startVal' :endVal="countList.amountSettled === null ? 0 : countList.amountSettled" :duration='2000'></countTo>
               </span>
             </div>
           </el-col>
           <el-col :span="8">
             <div class="grid-content bg-purple">
               <p>可用余额 (元)</p>
               <span>
                 <countTo :separator='separator' :decimals="decimals" class="countNum" :startVal='startVal' :endVal="countList.availableBalance" :duration='2000'>
                 </countTo>
               </span>
             </div>
           </el-col>
           <el-col :span="8">
             <div class="grid-content bg-purple">
               <p>今日收入 (元)</p>
               <span>
                 <countTo :separator='separator' :decimals="decimals" class="countNum" :startVal='startVal' :endVal="countList.todayRevenue" :duration='2000'>
                 </countTo>
               </span>
             </div>
           </el-col>
         </el-row>
       </div>
        <div class="tabels">
          <el-tabs type="border-card" v-model="propData.card">
            <el-tab-pane name="1" label="账户明细">
              <accountTab v-if="this.propData.card==1" ref="accountTab" :propData="propData"></accountTab>
            </el-tab-pane>
            <el-tab-pane name="0" label="结算记录">
              <accountTab v-if="this.propData.card==0" ref="accountTab" :propData="propData"></accountTab>
            </el-tab-pane>
          </el-tabs>
        </div>
     </el-card>
   </div>
</template>

<script>
  import countTo from 'vue-count-to';
  import accountTab from "../../components/accountTab/accountTab";
  export default {
    components: { countTo, accountTab},
    data () {
      return {
        startVal: 0,
        endVal: 0,
        separator: '',
        withdrawNum: '',
        decimals:2,
        propData: {
          card: '1',
        },
        countList: {
          accumulatedRevenue: 0, // 累计收入
          amountSettled: 0, // 待结算总额
          availableBalance: 0, // 可用余额
          sevenDayRevenue: 0, // 七日收入
          yesterdayRevenue: 0, // 昨日收入
          todayRevenue: 0, // 今日收入
      }
      }
    },
    methods: {
      // 上半部分数据初始化
      async dataInit () {
        let info = {
          storeId: localStorage.getItem('id')
        }
        let res = await this.$Http.financeCount(info)
        this.countList = res.data
      },
    },
    created() {
      if (localStorage.getItem('id') == 0) {
        return false
      } else {
        this.dataInit()
      }

    }
  }
</script>

<style lang="less" scoped>
.account {
  margin: 24px;
  & .account-top {
    background:rgba(245,247,250,1);
    margin-bottom: 24px;
    & p {
      padding-top: 14px;
      padding-left: 24px;
      margin: 0;
    }
    & span {
      font-size: 24px;
      font-weight: bold;
      display: inline-block;
      padding-left: 12px;
      padding-top: 6px;
      padding-bottom: 6px;
      margin: 0;
      & #withdraw {
        width:64px;
        height:32px;
        line-height: 32px;
        padding: 0;
        background:rgba(24,112,242,1);
        border-radius:2px;
        margin-left: 18px;
        color: #ffffff;
      }
    }
  }
}
</style>
