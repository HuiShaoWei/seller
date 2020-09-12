// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/index'
import Vuetify from 'vuetify'
// import config from './config'
import MyComponent from './components/MyComponent'
import Http from './http'
Vue.prototype.$Http = Http
import 'vuetify/dist/vuetify.min.css'
import qs from 'qs'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/material.css'
//////////////// 高德地图 /////////////////////
import AMap   from 'vue-amap';
Vue.use(AMap );
// 初始化vue-amap
AMap.initAMapApiLoader({
  // 高德key
  key: '7145bb45074782f267ddfac37fc07b18',
  // 插件集合 （插件按需引入）
  plugin: ['AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType'],
  v: '1.4.4'
});
/////////////////////////////////////////////
//////////////////IM//////////////////////////
import Avatar from './components/avatar.vue'
import store from './store/index'
import tim from 'tim'
import TIM from 'tim-js-sdk'
import './assets/icon/iconfont.css'
import './assets/icon/tim.css'
import {MessageBox} from 'element-ui'
window.tim = tim
window.TIM = TIM
window.store = store
Vue.prototype.$bus = new Vue() // event Bus 用于无关系组件间的通信。
Vue.prototype.tim = tim
Vue.prototype.TIM = TIM
Vue.prototype.$store = store
Vue.prototype.$confirm = MessageBox.confirm
Vue.component('avatar', Avatar)
///////////////////////////////////////////

Vue.directive('fo', {
  inserted (el, binding, vnode) {
    // 聚焦元素
    el.querySelector('input').focus()
  }
})
///////////////////////////////////////////

// 引入echarts
import echarts from 'echarts'
Vue.prototype.$echarts = echarts
//////////////////////////////////////////


////////////////// 时间倒计时 ////////////////////////
import VueCountdown from '@chenfengyuan/vue-countdown';
Vue.component(VueCountdown.name, VueCountdown);
////////////////////////////////////////////////////


////////////// 封装图片上传接口  ///////////////
import global_ from './components/Global'//引用文件
Vue.prototype.GLOBAL = global_//挂载到Vue实例上面
/////////////  封装图片上传接口   ///////////////
import Router from "vue-router";

Vue.use(Vuetify)
Vue.use(MyComponent)
Vue.use(ElementUI)
Vue.prototype.$qs = qs
Vue.config.productionTip = false
// Vue.prototype.verify = function () {
//    return this.$http.get("/auth/verify")
// };
/* eslint-disable no-new */
// 路由验证
router.beforeEach(function(to, from, next) {
  if (to.meta === 'isLogin') {
    //页面是否登录
    if (localStorage.getItem("isLogin")) {
      //本地存储中是否有isLogin数据
      next(); //表示已经登录
    } else {
      //next可以传递一个路由对象作为参数 表示需要跳转到的页面
      next({
        name: "Login"
      });
    }
  } else {
    //表示不需要登录
    next(); //继续往后走
  }
});

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
