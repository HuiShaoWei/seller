import Vue from 'vue'

Vue.prototype.verify = function () {
   return this.$http.get("/auth/verify")
 // return this.$http.get("/item-service/brand/page")
};
