<template>
    <div class="map">
      <div :style="{width:'100%',height:'300px'}">
        <el-amap vid="amap" :plugin="plugin" class="amap-demo" :center="center">
        </el-amap>
      </div>
<!--      <div class="toolbar">-->
<!--&lt;!&ndash;        <span v-if="loaded">&ndash;&gt;-->
<!--&lt;!&ndash;          location: lng = {{ lng }} lat = {{ lat }}&ndash;&gt;-->
<!--&lt;!&ndash;        </span>&ndash;&gt;-->
<!--&lt;!&ndash;        <span v-else>正在定位</span>&ndash;&gt;-->
<!--&lt;!&ndash;        <span  v-if="loaded">地址: {{getCity}}</span>&ndash;&gt;-->
<!--&lt;!&ndash;        <span v-else>正在定位</span>&ndash;&gt;-->
<!--        <br/>-->
<!--      </div>-->
<!--      <div class="fillIn" v-if="userInfo.certificationSate == 0 || userInfo.certificationSate == null || userInfo.certificationSate == '' ">-->
<!--        <el-form>-->
<!--          <el-form-item label="手动填写地址(不填写地址默认为定位地址)">-->
<!--            <el-input v-model="userInfo.storeAddr"></el-input>-->
<!--          </el-form-item>-->
<!--        </el-form>-->
<!--      </div>-->
<!--      <div class="fillIn">-->
<!--        <el-form>-->
<!--          <el-form-item label="详细地址">-->
<!--            <el-input v-model="address" @blur="addressCity"></el-input>-->
<!--          </el-form-item>-->
<!--        </el-form>-->
<!--      </div>-->
<!--      <div-->
<!--        v-on:click="req_post()"-->
<!--      >-->
<!--        查询周边-->
<!--      </div>-->
    </div>
</template>
<script>
  export default {
    name: "Map",
    data () {
      let self = this;
      return {
        key: '7145bb45074782f267ddfac37fc07b18',
        getCity: '', // 自动定位
        getCity1: '', // 手动填写地址
        center: [121.59996, 31.197646],
        lng: 0,
        lat: 0,
        loaded: false,
        plugin: [{
          enableHighAccuracy: true,//是否使用高精度定位，默认:true
          timeout: 10,          //超过10秒后停止定位，默认：无穷大
          maximumAge: 0,           //定位结果缓存0毫秒，默认：0
          convert: true,           //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
          showButton: true,        //显示定位按钮，默认：true
          buttonPosition: 'RB',    //定位按钮停靠位置，默认：'LB'，左下角
          showMarker: true,        //定位成功后在定位到的位置显示点标记，默认：true
          showCircle: true,        //定位成功后用圆圈表示定位精度范围，默认：true
          panToLocation: true,     //定位成功后将定位到的位置作为地图中心点，默认：true
          zoomToAccuracy:true,//定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：f
          extensions:'all',
          pName: 'Geolocation',
          events: {
            init(o) {
              // o 是高德地图定位插件实例
              o.getCurrentPosition((status, result) => {
                console.log('result:',result)
                if (result && result.position) {
                  self.lng = result.position.lng;
                  self.lat = result.position.lat;
                  self.center = [self.lng, self.lat];
                  localStorage.setItem('center',self.center)
                  // console.log(JSON.stringify(self.center))
                  self.loaded = true;
                  self.$nextTick();
                }
              });
            }
          }
        }],
        getLng: null,
        address: '', // 手动输入地址
        location: '', // 输入地址获取 location,
        userInfo: {}
      }
    },
    methods: {
      getCode () {
        this.getLng = localStorage.getItem('center')
        if (this.getLng == null) {
          this.getLng = localStorage.getItem('center')
        }
      },
     // init() {
     //   // let getLng = localStorage.getItem('center')
     //   $.ajax({
     //     // url: `https://restapi.amap.com/v3/geocode/regeo?location=${this.getLng}&key=7145bb45074782f267ddfac37fc07b18`,
     //     url:`https://restapi.amap.com/v3/geocode/regeo?location=${this.getLng}&key=${this.key}&radius=1000&extensions=all`,
     //     method: 'GET',
     //     dataType: 'JSONP',
     //     success: (res) => {
     //       // console.log(res)
     //       let province = res.regeocode.addressComponent.province //省
     //       let city = res.regeocode.addressComponent.city //市
     //       let area = res.regeocode.addressComponent.district // 区
     //       let street = res.regeocode.addressComponent.township // 街道
     //       this.getCity = res.regeocode.formatted_address
     //       // let cityLen = this.getCity.length
     //       let streetIndex = this.getCity.indexOf(street) // 获取街道下标
     //       // console.log(streetIndex)
     //       let spliceAddress =province+'-'+city+'-'+area+'-'+this.getCity.substr(streetIndex)
     //       localStorage.setItem('spliceAddress',spliceAddress)
     //       // console.log(this.getCity.substr(streetIndex))
     //     },
     //     error: (e) => {
     //       this.$message({
     //         message: '定位失败',
     //         type: 'warning',
     //         offset: 80
     //       });
     //     }
     //   })
     // },
      // 手动输入城市
      // addressCity (event) {
      //   if (this.address !== '' && this.address !== null && this.address !== undefined) {
      //     // console.log(this.address)
      //     $.ajax({
      //       method: 'get',
      //       url:`https://restapi.amap.com/v3/geocode/geo?address=${this.address}&key=${this.key}`,
      //       success: (res) => {
      //         console.log(res)
      //         let centent = res.geocodes[0].location.split(',')
      //         let longitudes = centent[0]
      //         let dimensions = centent[1]
      //         localStorage.setItem('longitudes',longitudes)
      //         localStorage.setItem('dimensions',dimensions)
      //         this.location = res.geocodes[0].location
      //         let province = res.geocodes[0].province //省
      //         let city = res.geocodes[0].city //市
      //         let area = res.geocodes[0].district // 区
      //         this.getCity1 = res.geocodes[0].formatted_address
      //         let streetLen = area.length
      //         let cityLen = this.getCity1.length
      //         let streetIndex = this.getCity1.indexOf(area)+streetLen // 获取区的下标
      //         let spliceAddress =province+'-'+city+'-'+area+'-'+this.getCity1.substr(streetIndex)
      //         localStorage.setItem('address',spliceAddress)
      //       },
      //       error: (e) => {
      //         this.$message({
      //           message: '定位失败',
      //           type: 'warning',
      //           offset: 80
      //         });
      //       }
      //     })
      //   } else {
      //     return
      //   }
      // },
      // 获取当前登录用户的店铺信息
      // async byuser () {
      //   let uid = {
      //     uid: localStorage.getItem('uid')
      //   }
      //   let res = await this.$Http.getStoreInfo(uid)
      //   if (res.code === 0) {
      //     this.userInfo = res.data
      //     // this.address = this.userInfo.storeAddr
      //     if (this.userInfo.storeAddr !== '' || this.userInfo.storeAddr !== null) {
      //       this.address =  this.userInfo.storeAddr.toString().split('-').join('')
      //     }
      //   }
      // },
    },
    created () {
      // this.addressCity()
      // this.byuser()
      setTimeout (() => {
        this.getCode()
        // this.init()
      },2000)
    }
  }
</script>

<style lang="less" scoped>
  .amap-demo {
    width: 630px;
    height: 300px;
  }
</style>
