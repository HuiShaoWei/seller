webpackJsonp([18],{WGlp:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=a("Xxa5"),s=a.n(r),n=a("WBHA"),i=a.n(n),o=a("2Uyi");function l(t){return function(){var e=t.apply(this,arguments);return new Promise(function(t,a){return function r(s,n){try{var i=e[s](n),o=i.value}catch(t){return void a(t)}if(!i.done)return Promise.resolve(o).then(function(t){r("next",t)},function(t){r("throw",t)});t(o)}("next")})}}var c=a("Icdr");a("4UDB");var p={data:function(){return{timeArray:[],startTime:null,endTime:null,startVal:0,separator:"",isActive:!0,linkBtn:["周","月","年"],changeActive:0,type:99,dataXChange:[],dataYchange:[],point:[0,0,0,0,0,0,0],datalist:[0,0,0,0,0,0,0],tableData:[],dataAna:[0,0,0,0],rowsPerPage:15,page:1,total:0,pageSizes:[10,15,20,25],funLei:o.a}},components:{countTo:i.a},methods:{init:function(){var t=this;return l(s.a.mark(function e(){var a,r;return s.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return a={sid:localStorage.getItem("id"),startTime:t.startTime,endTime:t.endTime,queryType:t.type},e.next=3,t.$Http.customerOver(a);case 3:0===(r=e.sent).code&&(t.dataAna=r.data);case 5:case"end":return e.stop()}},e,t)}))()},payAmountData:function(t){return t.payAmount.toFixed(2)},dataArray:function(){if(0!=localStorage.getItem("id"))return null==this.timeArray?(this.startTime=null,this.endTime=null,this.type=99,this.init(),!1):0==this.timeArray.length?(this.startTime=null,this.endTime=null,this.type=99,this.init(),!1):(this.startTime=this.timeArray[0],this.endTime=this.timeArray[1],this.type=0,this.init(),!1);this.$message({type:"error",message:"请先认证店铺信息",offset:80})},dataChanges:function(t){var e=this;return l(s.a.mark(function a(){var r,n,i,o,l,c,p,u,d;return s.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:if(1!=t){a.next=32;break}if(e.datalist=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],e.type=6,r={sid:localStorage.getItem("id"),queryType:e.type,page:e.page,rows:e.rowsPerPage},0!=localStorage.getItem("id")){a.next=8;break}e.$message({type:"error",message:"请先认证店铺信息",offset:80}),a.next=17;break;case 8:return a.next=10,e.$Http.customerTable(r);case 10:return n=a.sent,e.tableData=n.data.items,e.total=n.data.total,a.next=15,e.$Http.customerPolyline(r);case 15:i=a.sent,e.datalist=i.data;case 17:e.changeActive=t,a.t0=e.datalist.length,a.next=29===a.t0?21:30===a.t0?23:31===a.t0?25:27;break;case 21:return e.dataXChange=e.funLei.getMonthDay(29),a.abrupt("break",27);case 23:return e.dataXChange=e.funLei.getMonthDay(30),a.abrupt("break",27);case 25:return e.dataXChange=e.funLei.getMonthDay(31),a.abrupt("break",27);case 27:e.point=e.datalist,e.polyline(),e.funLei.getMonthDay(31),a.next=75;break;case 32:if(2!=t){a.next=55;break}if(e.datalist=[0,0,0,0,0,0,0,0,0,0,0,0],e.type=7,o={sid:localStorage.getItem("id"),queryType:e.type,page:e.page,rows:e.rowsPerPage},0!=localStorage.getItem("id")){a.next=40;break}e.$message({type:"error",message:"请先认证店铺信息",offset:80}),a.next=49;break;case 40:return a.next=42,e.$Http.customerTable(o);case 42:return l=a.sent,e.tableData=l.data.items,e.total=l.data.total,a.next=47,e.$Http.customerPolyline(o);case 47:c=a.sent,e.datalist=c.data;case 49:e.changeActive=t,e.dataXChange=["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"],e.point=e.datalist,e.polyline(),a.next=75;break;case 55:if(e.type=5,p={sid:localStorage.getItem("id"),queryType:e.type,page:e.page,rows:e.rowsPerPage},0!=localStorage.getItem("id")){a.next=61;break}e.$message({type:"error",message:"请先认证店铺信息",offset:80}),a.next=70;break;case 61:return a.next=63,e.$Http.customerTable(p);case 63:return u=a.sent,e.tableData=u.data.items,e.total=u.data.total,a.next=68,e.$Http.customerPolyline(p);case 68:d=a.sent,e.datalist=d.data;case 70:t=0,e.changeActive=t,e.dataXChange=["周一","周二","周三","周四","周五","周六","周日"],e.point=e.datalist,e.polyline();case 75:case"end":return a.stop()}},a,e)}))()},getData:function(t){switch(t){case 1:this.type=1,0==localStorage.getItem("id")?this.$message({type:"error",message:"请先认证店铺信息",offset:80}):this.init();break;case 2:this.type=2,0==localStorage.getItem("id")?this.$message({type:"error",message:"请先认证店铺信息",offset:80}):this.init();break;case 3:this.type=3,0==localStorage.getItem("id")?this.$message({type:"error",message:"请先认证店铺信息",offset:80}):this.init();break;default:this.type=4,0==localStorage.getItem("id")?this.$message({type:"error",message:"请先认证店铺信息",offset:80}):this.init()}},polyline:function(){var t=this;this.$nextTick(function(){var e=t.dataXChange,a=(t.dataYchange,{title:{text:""},itemStyle:{color:"#3399FF"},tooltip:{trigger:"axis",axisPointer:{type:"cross",label:{backgroundColor:"#3399FF"}}},legend:{data:["客户统计"]},grid:{left:"3%",right:"3%",bottom:"3%",containLabel:!0},xAxis:[{type:"category",boundaryGap:!1,data:e}],yAxis:[{type:"value"}],series:[{name:"客户统计",type:"line",stack:"总量",label:{normal:{show:!0,position:"top",color:"#3399FF"}},areaStyle:{},data:t.point}]});c.init(t.$refs.lines).setOption(a)})},handleSizeChange:function(t){},handleCurrentChange:function(t){},nextPage:function(){this.page+=1},prevPage:function(){this.page-=1}},mounted:function(){this.polyline(),0==localStorage.getItem("id")?this.$message({type:"error",message:"请先认证店铺信息",offset:80}):(this.dataArray(),this.dataChanges())}},u={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"commodity"},[a("v-card",[a("el-form",{staticClass:"demo-form-inline",attrs:{inline:!0}},[a("el-form-item",[a("div",{staticClass:"header"},[a("div",[a("span",{staticClass:"demonstration"},[t._v("选择时段")]),t._v("  \n            "),a("el-date-picker",{attrs:{type:"daterange","value-format":"yyyy-MM-dd","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期"},on:{change:t.dataArray},model:{value:t.timeArray,callback:function(e){t.timeArray=e},expression:"timeArray"}})],1),t._v(" "),a("div",{staticClass:"right"},[a("el-button",{on:{click:function(e){return t.getData(1)}}},[t._v("今天")]),t._v(" "),a("el-button",{on:{click:function(e){return t.getData(2)}}},[t._v("昨天")]),t._v(" "),a("el-button",{on:{click:function(e){return t.getData(3)}}},[t._v("最近七天")]),t._v(" "),a("el-button",{on:{click:function(e){return t.getData(4)}}},[t._v("最近30天")])],1)])]),t._v(" "),a("el-form-item",[a("p",{staticClass:"title"},[t._v("数据概览")]),t._v(" "),a("el-row",{attrs:{gutter:20}},[a("el-col",{attrs:{span:6}},[a("div",{staticClass:"grid-content bg-purple"},[a("p",{staticClass:"visitors"},[t._v("新增客户数")]),t._v(" "),a("p",{staticClass:"vis-num"},[a("countTo",{attrs:{separator:t.separator,startVal:t.startVal,endVal:t.dataAna[0],duration:3e3}})],1)])]),t._v(" "),a("el-col",{attrs:{span:6}},[a("div",{staticClass:"grid-content bg-purple"},[a("p",{staticClass:"visitors"},[t._v("累计客户数")]),t._v(" "),a("p",{staticClass:"vis-num"},[a("countTo",{attrs:{separator:t.separator,startVal:t.startVal,endVal:t.dataAna[1],duration:3e3}})],1)])]),t._v(" "),a("el-col",{attrs:{span:6}},[a("div",{staticClass:"grid-content bg-purple"},[a("p",{staticClass:"visitors"},[t._v("付款客户数")]),t._v(" "),a("p",{staticClass:"vis-num"},[a("countTo",{attrs:{separator:t.separator,startVal:t.startVal,endVal:t.dataAna[2],duration:3e3}})],1)])]),t._v(" "),a("el-col",{attrs:{span:6}},[a("div",{staticClass:"grid-content bg-purple"},[a("p",{staticClass:"visitors"},[t._v("累计付款客户数")]),t._v(" "),a("p",{staticClass:"vis-num"},[a("countTo",{attrs:{separator:t.separator,startVal:t.startVal,endVal:t.dataAna[3],duration:3e3}})],1)])])],1)],1),t._v(" "),a("el-form-item",[a("p",{staticClass:"title"},[t._v("客户统计")]),t._v(" "),a("p",{staticClass:"dataView"},t._l(t.linkBtn,function(e,r){return a("span",{key:r},[a("el-link",{class:{active:t.changeActive==r},attrs:{type:"primary",underline:!1},on:{click:function(e){return t.dataChanges(r)}}},[t._v(t._s(e))])],1)}),0),t._v(" "),a("div",{staticStyle:{width:"100%"}},[a("div",{ref:"lines",staticStyle:{width:"100%",height:"250px","margin-top":"40px"},attrs:{id:"polyline"}})])]),t._v(" "),a("el-form-item",[a("el-table",{staticStyle:{width:"100%"},attrs:{data:t.tableData}},[a("el-table-column",{attrs:{prop:"time",label:"时间"}}),t._v(" "),a("el-table-column",{attrs:{prop:"newCustomer",label:"新增客户"}}),t._v(" "),a("el-table-column",{attrs:{prop:"allCustomer",label:"累计客户"}}),t._v(" "),a("el-table-column",{attrs:{prop:"payAmount",formatter:t.payAmountData,label:"当天付款金额"}})],1),t._v(" "),a("div",{staticClass:"pages"},[a("el-pagination",{staticClass:"tablePagin",attrs:{background:"","page-sizes":t.pageSizes,layout:"total, sizes, prev, pager, next, jumper",total:t.total,"pager-count":5,"page-size":t.rowsPerPage,"current-page":t.page},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange,"update:pageSize":function(e){t.rowsPerPage=e},"update:page-size":function(e){t.rowsPerPage=e},"update:currentPage":function(e){t.page=e},"update:current-page":function(e){t.page=e},"prev-click":t.prevPage,"next-click":t.nextPage}})],1)],1)],1)],1)],1)},staticRenderFns:[]};var d=a("VU/8")(p,u,!1,function(t){a("piUD")},"data-v-b463c3ba",null);e.default=d.exports},piUD:function(t,e){}});
//# sourceMappingURL=18.202d562e7eb5f45a244e.js.map