import router from "./router";

var menus = [
  {
    // action: "home",
    title: "首页",
    path: "/index",
    items: [{ title: "店铺概况", path: "/dashboard" }]
  },
  {
    // action: "apps",
    title: "商品管理",
    path: "/item",
    items: [
      { title: "发布商品", path: "/productRelease" },
      { title: "商品列表", path: "/productList" },
      { title: "分类管理", path: "/category" },
      // { title: "品牌管理",path: "/myBrand"},
      // { title: "规格参数", path: "/specification" }
    ]
  },
  {
    // action: "people",
    title: "交易管理",
    path: "/transaction",
    items: [
      { title: "订单管理", path: "/order" },
      { title: "退款/售后", path: "/refund" },
      // { title: "评价管理", path: "/evaluation" }(第一版本不需要)
    ]
  },
  {
    // action: "attach_money",
    title: "店铺管理",
    path: "/store",
    items: [
      { title: "店铺装饰", path: "/shop" },
    ]
  },
  {
    // action: "settings",
    title: "财务管理",
    path: "/finance",
    items: [
      { title: "财务总览", path: "/account" },
      { title: "收入提现", path: "/income" },
    ]
  },
  {
    // action: "settings",
    title: "客户管理",
    path: "/customerlist",
    items: [
      { title: "客户列表", path: "/customer" },
    ]
  },
  {
    // action: "settings",
    title: "找项目",
    path: "/finditem",
    items: [
      { title: "发布项目", path: "/publish" },
      { title: "项目管理", path: "/management" },
      { title: "收到的约谈", path: "/Interview" },
    ]
  },
  {
    // action: "settings",
    title: "数据分析",
    path: "/dataanalysis",
    items: [
      { title: "流量分析", path: "/Client" },
      { title: "客户分析", path: "/Commodity" },
      { title: "商品分析", path: "/Traffic" }
    ]
  },
  {
    // action: "settings",
    title: "系统设置",
    path: "/setting",
    items: [
      { title: "店铺信息", path: "/storeInfo" },
      { title: "店铺认证", path: "/storeCertification" },
    ]
  },
  {
    // action: "settings",
    title: "联系我们",
    path: "/im",
    items: [
      { title: "客服", path: "/index" },
    ]
  }
]
export default menus;
