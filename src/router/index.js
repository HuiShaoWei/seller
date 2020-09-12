import Vue from 'vue'
import Router from 'vue-router'

//vue router 报错： Uncaught (in promise) NavigationDuplicated {_name:""NavigationDuplicated"... 的解决方法
// 如果你的改了push还是没有生效，可以考虑改replace方法
// 修改路由replace方法,阻止重复点击报错
const originalReplace = Router.prototype.replace;
Router.prototype.replace = function replace (location) {
  return originalReplace.call(this, location).catch(err => err);
};

Vue.use(Router)

function route (path, file, name, meta, children, redirect) {
  return {
    exact: true,
    path,
    name,
    meta,
    children,
    redirect,
    component: () => import('../pages' + file)
  }
}
export default new Router({
  // mode: 'hash', // 打包的时候要换成 hash 模式
  routes: [
    route("/login", '/Login', "Login"),
    {
      path: "/",
      component: () => import('../pages/Layout'),  //异步加载
      redirect: "/login",
      children: [
        route("/login", "/Login", "Login"),
        route("/index/dashboard", "/Dashboard", "Dashboard", "isLogin"),
        route("/item/category", '/item/Category', "Category"),
        route("/item/productRelease", '/item/ProductRelease', "ProductRelease", "isLogin"),
        route("/item/productList", '/item/ProductList', 'ProductList', "isLogin"),
        // 交易管理
        route("/transaction/order", '/transaction/Order', "Order", "isLogin"),
        route("/transaction/refund", '/transaction/Refund', "Refund", "isLogin"),
        route("/transaction/evaluation", '/transaction/Evaluation', "Evaluation", "isLogin"),
        // 店铺管理
        route("/store/shop", '/store/Shop', "Shop", "isLogin"),
        // 财务管理
        route("/finance/account", '/finance/Account', "Account", "isLogin"),
        route("/finance/income", '/finance/Income', "Income", "isLogin"),
        // 系统设置
        route("/setting/storeInfo", '/setting/StoreInfo', "StoreInfo", "isLogin"),
        route("/setting/storeCertification", '/setting/StoreCertification', "StoreCertification", "isLogin"),
        // 客户列表
        route("/customerlist/customer", '/customerlist/Customer', "Customer", "isLogin"),
        // 找项目
        route("/finditem/publish", '/finditem/Publish', "Publish", "isLogin"),
        route("/finditem/management", '/finditem/Management', "Management", "isLogin"),
        route("/finditem/interview", '/finditem/Interview', "Interview", "isLogin"),
        // 数据分析
        route("/dataanalysis/client", '/dataanalysis/Client', "Client", "isLogin"),
        route("/dataanalysis/commodity", '/dataanalysis/Commodity', "Commodity", "isLogin"),
        route("/dataanalysis/traffic", '/dataanalysis/Traffic', "Trafic", "isLogin"),
        // 即时通讯
        route("/im/index", "/im/index", "index", "isLogin"),
      ]
    },
    {
      path: '/error/Error',
      component: () => import('../pages/error/Error'),
      hidden: true
    },
    {
      path: '*',
      component: () => import('../pages/error/Error'),
      hidden: true
    }
  ]
})
