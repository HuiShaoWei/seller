/**
 * 判断月份
 */
var funClass = {
  // 判断月份 是29 30 31
  getMonthDay(dayNum) {
    let count = []
    for (let i = 1; i <= dayNum; i++) {
      count.push(i)
    }
    return count
  },
  // 封装cookie
  //设置cookie
  setCookie(c_phone, c_pwd, exdays) {
    var exdate = new Date(); //获取时间
    exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays); //保存的天数
    //字符串拼接cookie
    window.document.cookie = "phone" + "=" + c_phone + ";path=/;expires=" + exdate.toGMTString();
    window.document.cookie = "password" + "=" + c_pwd + ";path=/;expires=" + exdate.toGMTString();
  },
  //清除cookie
  clearCookie: function() {
    this.setCookie("", "", -1); //修改2值都为空，天数为负1天就好了
  }
}
export default funClass;


