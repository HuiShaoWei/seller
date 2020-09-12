const CONTACT_API = {
  // 登录(@)
  login: {
    method: 'post',
    url: '/auth/accredit'
  },
  // 退出
  loginOut: {
    method: 'get',
    url: '/auth/logout'
  },
  // 获取验证码(@)
  sms: {
    method: 'get',
    url: '/sms/code'
  },
  // 验证登录(@)
  smsLogin: {
    method: 'post',
    url: 'auth/accredit/phone'
  },
  // 修改密码(@)
  changePassword: {
    method: 'put',
    url: '/user/password'
  },
  // 用户更新数据
  userInfoStore: {
    method: 'put',
    url: 'user/backstage/store'
  },
  // 首页数据统计(@)
  homeData: {
    method: 'get',
    url: 'finance/seller/home'
  },
  // 首页访客数统计(@)
  isitorsv:{
    method: 'get',
    url: 'finance/seller/home/caller'
  },
  // 首页支付订单数统计(@)
  payOrder: {
    method: 'get',
    url: 'finance/seller/home/order'
  },
  // 获取店铺信息(@)
  getStoreInfo: {
    method: 'get',
    url: '/shop/store/byAccount'
  },
  // 表单请求获取唯一的请求id,用来保证接口的幂等性(@)
  empotency: {
    method: 'get',
    url: '/auth/idempotency'
  },
  // 发布商品(@)
  relase: {
    method: 'post',
    url: '/item/items',
  },
  // 根据店铺分页查询商品(@)
  getProductList: {
    method: 'get',
    url: '/item/query/shop/2'
  },
  // 批量/单个删除商品
  delPro: {
    method: 'delete',
    url: '/item/items'
  },
  // 批量/单个上下架商品(@)
  shelves: {
    method: 'put',
    url: '/item/saleable'
  },
  // 修改商品(@)
  editPro: {
    method: 'put',
    url: '/item/items'
  },
  // 根据店铺id查询订单 (@)
  order: {
    method: 'get',
    url: '/order/query/shop'
  },
  // 根据店铺id查询店铺信息
  shopInfo: {
    method: 'get',
    url: '/shop/store'
  },
  // 根据店铺查询退款订单列表
  refundOrder: {
    method: 'get',
    url: 'order/refund/list/shop'
  },
  // 添加店铺装饰列表 (@)
  shopDecoration: {
    method: 'post',
    url: '/shop/theme',
  },
  // 查询一个店铺装饰(@)
  findDecoration: {
    method: 'get',
    url: '/shop/theme'
  },
  // 删除订单
  orderDel: {
    method: 'delete',
    url: '/order/delete'
  },
  //  审核通过（同意）退款订单 退款状态 1 退款代处理 2 已拒绝退款 3 退款成功 4 退款关闭
  examineSuccess: {
    method: 'post',
    url: '/order/refund/examine'
  },
  // 审核通过（不同意）退款订单(废除)
  examineDestruction: {
    method: 'post',
    url: 'order/refund/examine/destruction'
  },
  // 导出退款列表
  refundExport: {
    method: 'post',
    url: '/order/refund/export',
  },

  // 确认发货
  conDelivery: {
    method: 'put',
    url: '/order/confirm/deliver'
  },
  ///////////////////////////
  // 店铺相关接口
  // 根据店铺id查询店铺信息
  store: {
    method: 'get',
    url: '/shop/store'
  },
  // 新增店铺
  newStore: {
    method: 'post',
    url: '/shop/store'
  },
  // 修改店铺
  storeModify: {
    method: 'put',
    url: '/shop/store'
  },
  // 填写认证信息(@)
  certification: {
    method: 'post',
    url: 'shop/certification'
  },
  // 查询本系统存储所有支付类型（通用）
  paykind: {
    method: 'get',
    url: '/shop/paykind'
  },
  // 获取一个入驻申请详情(@)
  one: {
    method: 'get',
    url: '/shop/certification/byAccount'
  },
  // 清除店铺认证信息
  delCertificataion: {
    method: 'delete',
    url: 'shop/certification'
  },
  // 根据店铺查询退款订单列表
  afterSale: {
    method: 'get',
    url: '/order/refund/shop'
  },
  checkStore: {
    method: 'get',
    url: '/shop/store/check'
  },
  /////// 财务管理 //////
  // A 1.财务总览 (数据统计)(@)
  financeCount: {
    method: 'get',
    url: 'finance/query/store/overview'
  },
  // A 2.财务总览 (表格数据) 调用订单管理接口
  financeTable: {
    method: 'get',
    url: 'finance/query/flow',
  },
  // B 3.收入体现 (表格数据)(@)
  financeIncome: {
    method: 'get',
    url: 'finance/query/withdrawal'
  },
  // B 4.收入提现(点击体现按钮调用)
  financeWithdraw: {
    method: 'post',
    url: 'finance/withdrawal',
  },
  // B 5.点击体现查询当前账号
  financeAccount: {
    method: 'get',
    url: 'shop/account',
  },
  // B 6.新增一个体现账号
  financeAddAccount: {
    method: 'post',
    url: 'shop/account'
  },
  // B 7.根据店铺id查询所有提现账号列表
  financeList: {
    method: 'get',
    url: 'shop/account/list'
  },
  // B 8.根据店铺id查询所有提现账号列表
  financeBing: {
    method: 'get',
    url: 'shop/account/bing'
  },
  ////// 客户管理 ///////
  /// 表格数据（报 500）
  customerManagement: {
    method: 'get',
    url: 'shop/clientList'
  },
  //// 删除用户
  customerDel: {
    method: 'delete',
    url: 'shop/delClient'
  },
  ////// 数据分析 ///////
  // A 1.流量分析 数据概况 (@)
  dataAnalysis: {
    method: 'get',
    url: 'finance/seller/data/count'
  },
  //A 2.流量分析 订单统计(折线图)(@)
  orderCount: {
    method: 'get',
    url: 'finance/seller/order/count'
  },
  //B 1.客户分析 数据概况(@)
  customerOver: {
    method: 'get',
    url: 'finance/seller/customer/count'
  },
  // B 2.客户分析 折现数据 (报500)
  customerPolyline: {
    method: 'get',
    url: 'finance/seller/customer/count2'
  },
  // B 3.客户分析 表格数据 (@)
  customerTable: {
    method: 'get',
    url: 'finance/seller/customer/count3'
  },
  // 3.商品分析
  // C 1.商品分析 数据概况
  productOver: {
    method: 'get',
    url: 'finance/seller/item/count1'
  },
  // c 2.商品分析 商品趋势(折线图)
  productTrend: {
    method: 'get',
    url: 'finance/seller/item/count2'
  },
  // c 3.商品分析 商品趋势(表格)
  productTable: {
    method: 'get',
    url: 'finance/seller/item/count3'
  },
  // c 4.商品分析(TOP 10) (报500)
  productTop: {
    method: 'get',
    url: 'finance/seller/item/count4'
  },
}
export default CONTACT_API
