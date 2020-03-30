<!--<template>-->
  <!--<div class='mapApp'>-->
    <!--<div>-->
      <!--<el-row>-->
        <!--<el-col :span="20">-->
          <!--<el-form>-->
            <!--<el-form-item label="查勘地址：" label-width="160px">-->
              <!--<el-input type="text" v-model="addressDetail" clearable :disabled="disabledFlag || address ==''">-->
                <!--<el-button slot="prepend" disabled>{{address}}</el-button>-->
              <!--</el-input>-->
            <!--</el-form-item>-->
          <!--</el-form>-->
        <!--</el-col>-->
        <!--<el-col :span="4" style="padding-left: 10px">-->
          <!--<div>-->
            <!--<el-button type="primary" @click="transfer" :disabled="disabledFlag">确定</el-button>-->
          <!--</div>-->
        <!--</el-col>-->
      <!--</el-row>-->
    <!--</div>-->
    <!--<el-card class="ivu-card-height2">-->
      <!--<div class="map-box">-->
        <!--<div class="search">-->
          <!--&lt;!&ndash;搜索&ndash;&gt;-->
          <!--<img :src="require('@/assets/img/picc.png')"  alt="" class="logo" draggable="false">-->
          <!--<div class="iptbox">-->
            <!--<el-input type="text" v-model="mapQuery.keywords" id="searchipt" maxlength="300" autocomplete="off" placeholder="搜索位置" @keyup.enter ="selectAddress(1)" :disabled="disabledFlag"></el-input>-->
          <!--</div>-->
          <!--<div id="searchbtn" @click="selectAddress(1)" title="搜索">-->
            <!--<i type="search" class="el-icon-search"></i>-->
            <!--<span class="searchloading"></span>-->
          <!--</div>-->
        <!--</div>-->
        <!--<div class="buttongroup">-->
          <!--<div class="buttonaddress" v-show="fullFlag">-->
            <!--<div class="addresswrap" v-on:click="showMenu(1)">-->
              <!--<Icon type="pinpoint"></Icon>-->
              <!--<p class="name" style="cursor: pointer;">{{currentCity}}</p>-->
              <!--<i class="fa fa-angle-down" v-if="!addressFlag" aria-hidden="true"></i>-->
              <!--<i class="fa fa-angle-up" v-if="addressFlag" aria-hidden="true"></i>-->
            <!--</div>-->
            <!--<div class="addressbox" v-if="addressFlag">-->
              <!--<div class="addresstitle">-->
                <!--<span>当前城市: {{currentCity}}</span>-->
                <!--<i class="fa fa-times close" v-on:click="showMenu(1)" aria-hidden="true"></i>-->
              <!--</div>-->
              <!--<div class="addresscontent">-->
                <!--&lt;!&ndash;城市内容&ndash;&gt;-->
                <!--<el-row type="flex" justify="start" class="code-row-bg">-->
                  <!--<i-col :span="4" v-for="(province, index) in riskMapCityData.specialCityData" :key="province.name">-->
                    <!--<a  @click="changeCity(province)">{{province.name}}</a>-->
                  <!--</i-col>-->
                  <!--<div class="ant-divider"></div>-->
                <!--</el-row>-->
                <!--<el-row type="flex" justify="start" class="code-row-bg" v-for="(province, index) in riskMapCityData.cityData" :key="province.name">-->
                  <!--<i-col :span="4">-->
                    <!--<a class="province" @click="changeCity(province)">{{province.name}}:</a>-->
                  <!--</i-col>-->
                  <!--<i-col :span="20">-->
                    <!--<el-row style="text-align: left">-->
                      <!--<a class="city" v-for="(city, index) in province.content" @click="changeCity(city)"> {{city.name}}</a>-->
                    <!--</el-row>-->
                  <!--</i-col>-->
                  <!--<div class="ant-divider"></div>-->
                <!--</el-row>-->
              <!--</div>-->
            <!--</div>-->
          <!--</div>-->
        <!--</div>-->
        <!--<div class="connection2" v-show="basicFlag">-->
          <!--<el-card class="connection2-nav" v-show="selectFlag">-->
            <!--&lt;!&ndash;城市循环列表&ndash;&gt;-->
            <!--<div v-show="personflag">-->
              <!--<el-row v-for="(basic, index) in basicList" :key="index" style="padding-top: 12px" class="basicbox">-->
                <!--<div @click="setQueryCenter(basic,pageNo)">-->
                  <!--<el-row>-->
                    <!--<el-col span="3">-->
                      <!--<img :src="require('@/assets/img/map/point/blue'+ (index+1) +'.png')" v-show="highLightFlag === (index+1)"/>-->
                      <!--<img :src="require('@/assets/img/map/point/red'+ (index+1) +'.png')" v-show="highLightFlag !== (index+1)" />-->
                    <!--</el-col>-->
                    <!--<el-col span="21" style="text-align: left">-->
                      <!--<el-row>-->
                        <!--<el-col push ="2" span="22" style="text-align: left">-->
                          <!--<span style="color: #3385ff;">{{basic.name}}</span>-->
                        <!--</el-col>-->
                        <!--<el-col push ="2" span="12" style="text-align: left">-->
                          <!--<span>{{basic.typeName}}</span>-->
                        <!--</el-col>-->
                        <!--<el-col push ="2" span="8" style="text-align: left">-->
                          <!--<span>{{basic.city}}</span>-->
                        <!--</el-col>-->
                        <!--<el-col push ="2" span="22" style="text-align: left">-->
                          <!--<span>{{basic.address}}</span>-->
                        <!--</el-col>-->
                      <!--</el-row>-->
                    <!--</el-col>-->
                  <!--</el-row>-->
                <!--</div>-->
                <!--<div class="ant-divider" style="margin-bottom: 0"></div>-->
              <!--</el-row>-->
              <!--<div>-->
              <!--</div>-->
              <!--<div style="align: center;" v-show="pageDisplay && this.basicList!==null && this.basicList.length!==0">&lt;!&ndash; :total='totalCount':page-size-opts="[10]" @on-page-size-change="changepagesize" show-elevator showSizer&ndash;&gt;-->
                <!--<br>-->
                <!--<el-row>-->
                  <!--<el-col span="6">-->
                    <!--<div style="margin-top: 4px">-->
                      <!--共{{totalCount}}条-->
                    <!--</div>-->
                  <!--</el-col>-->
                  <!--<el-col span="15">-->
                    <!--<Page :total='totalCount' size="small" :page-size='pageSize' :current="pageNo" show-total @on-change='changePage' class='paging' simple></Page>-->
                  <!--</el-col>-->
                <!--</el-row>-->
              <!--</div>-->
            <!--</div>-->
            <!--<div v-show="this.basicList===null || this.basicList.length===0">-->
              <!--<span style="color: #3385ff;">在{{this.currentCity}}并未找到相关与“{{this.mapQuery.keywords}}”相关的地点</span>-->
              <!--<br><br>-->
              <!--<span>您可以：</span>-->
              <!--<br>-->
              <!--<span>1.检查输入文字是否有误</span>-->
              <!--<br>-->
              <!--<span>2.尝试更换其他文字</span>-->
            <!--</div>-->
          <!--</el-card>-->
        <!--</div>-->
        <!--<div id='map' ref='map' style='margin:0 auto;width: 100%;height: 100%'></div>-->
        <!--<div id ="myMenu">-->
          <!--<div class="myMenu-wrap">-->
            <!--<div class="myMenutitle" @click="selectAddressDetail">查勘地址</div>-->
          <!--</div>-->
        <!--</div>-->
      <!--</div>-->
    <!--</el-card>-->
    <!--<el-dialog :visible.sync="modalFlag" class="progressModal" style="z-index: 9999">-->
      <!--<div style="text-align:center;">-->
        <!--<p>{{message}}</p>-->
      <!--</div>-->
      <!--<div slot="footer">-->
        <!--<el-button :type="footerStatus" size="large" long @click="ok">确认</el-button>-->
      <!--</div>-->
    <!--</el-dialog>-->
    <!--<el-dialog :visible.sync="messFlag" class="progressModal" style="z-index: 9999">-->
      <!--<div style="text-align:center;">-->
        <!--<p>{{messText}}</p>-->
      <!--</div>-->
      <!--<div slot="footer">-->
        <!--<el-button :type="footerStatus" size="large" long @click="sure">确认</el-button>-->
      <!--</div>-->
    <!--</el-dialog>-->
  <!--</div>-->
<!--</template>-->
<!--<script>-->
  <!--import riskMapData from '@/views/riskdata/riskMapData.js'-->
  <!--import riskMapCityData from  '@/views/riskdata/riskMapCityData.js'-->
  <!--//  import iView from 'iview'-->
  <!--import { Loading } from 'element-ui'-->
  <!--export default{-->
    <!--props: ['config'],-->
    <!--mounted () {-->
      <!--var MeasureLabel = new SuperMap.Strategy.GeoText({isOverLay: false})-->
      <!--MeasureLabel.style = {-->
        <!--labelAlign: 'lt',-->
        <!--labelXOffset: 3,-->
        <!--labelYOffset: 0,-->
        <!--fontColor: '#333333',-->
        <!--fontWeight: 'normal',-->
        <!--fontSize: '13px',-->
        <!--fill: true,-->
        <!--fillColor: '#FFFFFF',-->
        <!--fillOpacity: 1,-->
        <!--stroke: true,-->
        <!--strokeWidth: 1,-->
        <!--strokeColor: '#FF0000',-->
        <!--radius: '0px',-->
        <!--lineHeight: '20px'-->
      <!--}-->
      <!--// 初始化图层-->
<!--//      this.layer = new SuperMap.Layer.TiledDynamicRESTLayer('vec@t0.tianditu.com_WMTS1', this.url,{transparent: true, cacheEnabled: true,isBaseLayer:true})-->
      <!--this.riskMapData.initLayer = new SuperMap.Layer.TiledDynamicRESTLayer('矢量底图_经纬度', this.riskMapData.initUrl, {transparent: true, cacheEnabled: true, isBaseLayer:true})-->
      <!--this.riskMapData.chinaNameLayer = new SuperMap.Layer.TiledDynamicRESTLayer('矢量中文注记_经纬度', this.riskMapData.chinaNameUrl, { transparent: true, cacheEnabled: true })-->
      <!--// 底图切换-->
      <!--//      this.riskMapData.modifyLayer= new SuperMap.Layer.TiledDynamicRESTLayer('影像底图_经纬度', this.riskMapData.initUrlImage,{transparent: true, cacheEnabled: true,isBaseLayer:true})-->
      <!--// 按照登陆信息初始化省份/直辖市-->
      <!--let userInfo = this.$store.getters.getUserInfo-->
      <!--let codeCode = userInfo.comCode.substring(0, 4)-->
      <!--this.changeCityByCodeCode(codeCode)-->
      <!--// 监听图层信息加载完成事件-->
      <!--this.riskMapData.initLayer.events.on({'layerInitialized': this.addLayer1})-->

      <!--this.riskMapData.vectorLayer = new SuperMap.Layer.Vector('Vector Layer')-->
<!--//      this.riskMapData.DisastersLayers= new SuperMap.Layer.Vector('Vector Layer');-->
      <!--this.riskMapData.EarthQuakeLayer = new SuperMap.Layer.Vector('EarthQuake Layer')-->
      <!--this.riskMapData.DebrisFlowLayer = new SuperMap.Layer.HeatGridLayer('heatGrid')-->
<!--//      this.vectorLayer1 = new SuperMap.Layer.Vector('Vector Layer1');-->
      <!--this.riskMapData.sectorLayer = new SuperMap.Layer.Vector('Vector')-->
      <!--this.riskMapData.textLayer = new SuperMap.Layer.Vector('textLayer', { strategies: [MeasureLabel] })-->
      <!--// 初始化标记图层类-->
      <!--this.riskMapData.markerLayer = new SuperMap.Layer.Markers('Markers')-->
      <!--this.riskMapData.markerLayerTF = new SuperMap.Layer.Markers('Markers1')-->
      <!--this.riskMapData.typhoonLayer = new SuperMap.Layer.Vector('Typhoon Layer')-->
      <!--// 左侧点击单独标记图层类-->
      <!--this.riskMapData.markerLeftCLayer = new SuperMap.Layer.Markers('Markers2')-->
      <!--// 右侧查询标记图层类-->
      <!--this.riskMapData.markerRightSLayer = new SuperMap.Layer.Markers('Markers3')-->
      <!--// 右侧点击单独标记图层类-->
      <!--this.riskMapData.markerRightCLayer = new SuperMap.Layer.Markers('Markers4')-->
      <!--// 对地图的可拖动范围进行控制-->
      <!--var maxExtent = new SuperMap.Bounds(-20, -10, 180, 75)-->
      <!--// 初始化地图-->
      <!--this.map = new SuperMap.Map('map', {-->
        <!--controls: [-->
          <!--new SuperMap.Control.Navigation(),-->
          <!--new SuperMap.Control.MousePosition(),-->
<!--//          this.riskMapData.drawLine,-->
<!--//          this.riskMapData.drawArea-->
        <!--], allOverlays: true, minZoom: 2, restrictedExtent: maxExtent-->
      <!--})-->
      <!--this.map.addControl(new SuperMap.Control.ScaleLine({isImperialUnits: false, geodesic: true}));-->
      <!--document.getElementById("map").oncontextmenu = function(e){-->
        <!--e.preventDefault();-->
<!--//        return false-->
      <!--}-->
      <!--var menu-->
      <!--menu= document.getElementById("myMenu");-->
<!--//      var map = document.querySelector('.mapcompontent').querySelector('.ivu-modal');-->
      <!--var mapbox = document.querySelector('.ivu-card-height2');-->
      <!--var that=this-->
      <!--document.getElementById("map").onmouseup=function(oEvent) {-->
        <!--that.mapLeft = mapbox.offsetLeft-->
        <!--that.offsetTop=mapbox.offsetTop-->
        <!--if (!oEvent) oEvent = window.event;-->
<!--//        console.log(event.clientY)-->
<!--//        console.log(map.scrollTop)-->
<!--//        console.log(mapbox.offsetTop)-->
        <!--if (oEvent.button == 2) {-->
          <!--that.jpsdata=oEvent-->
          <!--menu.style.left = oEvent.clientX - that.mapLeft + "px";-->
          <!--menu.style.top = oEvent.clientY - that.offsetTop + "px";-->
          <!--menu.style.visibility = "visible";-->
        <!--} else {-->
          <!--menu.style.visibility = "hidden";-->
        <!--}-->
      <!--}-->
      <!--this.setUpTag()-->
    <!--},-->
    <!--data () {-->
      <!--return{-->
<!--//        counter: this.config,-->
        <!--riskMapCityData: riskMapCityData.a(),-->
        <!--riskMapData: riskMapData.mapData(),-->
        <!--map: {},-->
        <!--jpsdata: {},-->
        <!--mapQuery: {-->
          <!--keywords: '',-->
          <!--page_num: '',-->
          <!--page_size: '',-->
          <!--city: ''-->
        <!--},-->
        <!--totalCount: 0,-->
        <!--basicList: [],-->
        <!--currentCity: '全国',-->
        <!--personflag: false,-->
        <!--selectFlag: true,-->
        <!--fullFlag: true,-->
        <!--basicFlag: false,-->
        <!--pageDisplay: false,-->
        <!--pageSize: 10,-->
        <!--pageNo: 1,-->
        <!--highLightFlag: 0,-->
        <!--locationCenter: '',-->
        <!--locationZoom: '',-->
        <!--clickFlag: true,-->
        <!--provinceName: '',-->
        <!--provinceCode: '',-->
        <!--cityCode: '',-->
        <!--countryCode: '',-->
        <!--cityName: '',-->
        <!--countryName: '',-->
        <!--addressName: '',-->
        <!--pageNoT: '',-->
        <!--markerobj: {},-->
        <!--address: '',-->
        <!--addressDetail: '',-->
        <!--riskDnatural: {},-->
        <!--addressCode: '',-->
        <!--addressFlag: false,-->
        <!--modalFlag: false,-->
        <!--messFlag: false,-->
        <!--disabledFlag: false,-->
        <!--footerStatus: 'default',-->
        <!--message: '',-->
        <!--messText: '',-->
        <!--editFlag: '',-->
        <!--pointx_2000: '',-->
        <!--pointy_2000: '',-->
        <!--mapLeft: 0,-->
        <!--offsetTop: 0-->
      <!--}-->
    <!--},-->
    <!--methods: {-->
      <!--addLayer1 () {-->
        <!--this.riskMapData.modifyLayer = new SuperMap.Layer.TiledDynamicRESTLayer('影像底图_经纬度', this.riskMapData.initUrlImage, {transparent: true, cacheEnabled: true, isBaseLayer: true})-->
        <!--this.riskMapData.modifyLayer.events.on({'layerInitialized': this.addLayer2})-->
      <!--},-->
      <!--addLayer2 () {-->
        <!--this.riskMapData.layerTogether = new SuperMap.Layer.TiledDynamicRESTLayer('all_scale_1km', this.riskMapData.togetherUrl, {transparent: true, cacheEnabled: true})-->
        <!--this.riskMapData.layerTogether.setOpacity(0)-->
        <!--this.riskMapData.layerTogether.events.on({'layerInitialized': this.addLayer3})-->
      <!--},-->
      <!--addLayer3 () {-->
        <!--// 增加点聚合-->
        <!--this.riskMapData.pointTogetherLayer = new SuperMap.Layer.ClusterLayer('Cluster')-->
<!--//        this.riskMapData.chinaNameLayer = new SuperMap.Layer.TiledDynamicRESTLayer('矢量中文注记_经纬度', this.riskMapData.chinaNameUrl, { transparent: true, cacheEnabled: true });-->
        <!--this.riskMapData.englishNameLayer = new SuperMap.Layer.TiledDynamicRESTLayer('矢量英文注记_经纬度', this.riskMapData.englishNameUrl, { transparent: true, cacheEnabled: true })-->
        <!--this.riskMapData.chinaNameModifyLayer = new SuperMap.Layer.TiledDynamicRESTLayer('影像中文注记_经纬度', this.riskMapData.chinaNameUrlImage, { transparent: true, cacheEnabled: true })-->
        <!--this.riskMapData.englishNameModifyLayer = new SuperMap.Layer.TiledDynamicRESTLayer('影像英文注记_经纬度', this.riskMapData.englishNameUrlImage, { transparent: true, cacheEnabled: true })-->

        <!--this.riskMapData.modifyLayer.setVisibility(false)-->
        <!--this.riskMapData.chinaNameModifyLayer.setVisibility(false)-->
        <!--this.riskMapData.englishNameLayer.setVisibility(false)-->
        <!--this.riskMapData.englishNameModifyLayer.setVisibility(false)-->
<!--//        this.map.addLayers([this.riskMapData.initLayer,this.riskMapData.layerTogether,this.riskMapData.modifyLayer,-->
<!--//          this.riskMapData.pointTogetherLayer-->
<!--//        ])-->
        <!--this.map.addLayers([this.riskMapData.initLayer,this.riskMapData.modifyLayer,this.riskMapData.layerTogether, this.riskMapData.layerTogether,-->
          <!--this.riskMapData.markerLayer, this.riskMapData.markerLayerTF, this.riskMapData.pointTogetherLayer, this.riskMapData.sectorLayer,-->
          <!--this.riskMapData.modifyLayer, this.riskMapData.chinaNameLayer, this.riskMapData.chinaNameModifyLayer,-->
          <!--this.riskMapData.englishNameLayer, this.riskMapData.englishNameModifyLayer, this.riskMapData.markerLeftCLayer, this.riskMapData.markerRightSLayer,-->
          <!--this.riskMapData.markerRightCLayer, this.riskMapData.textLayer]) // this.riskMapData.modifyLayer, this.riskMapData.chinaNameModifyLayer-->
        <!--// 显示地图范围-->
<!--//        this.map.setCenter(new SuperMap.LonLat(108.88,33.08), 5)-->
        <!--this.map.setCenter(new SuperMap.LonLat(this.riskMapData.centerPoint[0], this.riskMapData.centerPoint[1]), this.riskMapData.centerPoint[2])-->
<!--//        this.openInfoWin()-->
      <!--},-->
      <!--//根据登陆获取城市坐标和缩放比例-->
      <!--changeCityByCodeCode (str){-->
        <!--/*        35020000	厦门市分公司-->
                <!--44030000	深圳市分公司-->
                <!--33020000	宁波市分公司-->
                <!--37020000	青岛市分公司-->
                <!--21020000	大连市分公司*/-->
        <!--let specialList = this.riskMapCityData.specialCityData-->
        <!--let cityList = this.riskMapCityData.cityData-->
        <!--let provinceCode = str.substring(0, 2)-->
        <!--for(var index in specialList){-->
          <!--if (specialList[index].codeCode == str){-->
            <!--this.currentCity = specialList[index].name-->
            <!--this.riskMapData.centerPoint[0] = specialList[index].centerPoint.split(",")[0]-->
            <!--this.riskMapData.centerPoint[1] = specialList[index].centerPoint.split(",")[1]-->
            <!--this.riskMapData.centerPoint[2] = specialList[index].mapSize-->
            <!--return 0-->
          <!--}-->
        <!--}-->
        <!--for(var index in cityList){-->
          <!--if (cityList[index].codeCode == provinceCode){-->
            <!--this.currentCity = cityList[index].name-->
            <!--this.riskMapData.centerPoint[0] = cityList[index].centerPoint.split(",")[0]-->
            <!--this.riskMapData.centerPoint[1] = cityList[index].centerPoint.split(",")[1]-->
            <!--this.riskMapData.centerPoint[2] = cityList[index].mapSize-->
            <!--return 0-->
          <!--}-->
        <!--}-->
        <!--for(var index in specialList){-->
          <!--if (specialList[index].codeCode == provinceCode){-->
            <!--this.currentCity = specialList[index].name-->
            <!--this.riskMapData.centerPoint[0] = specialList[index].centerPoint.split(",")[0]-->
            <!--this.riskMapData.centerPoint[1] = specialList[index].centerPoint.split(",")[1]-->
            <!--this.riskMapData.centerPoint[2] = specialList[index].mapSize-->
            <!--return 0-->
          <!--}-->
        <!--}-->
      <!--},-->
      <!--selectAddress (val) {-->
        <!--this.riskMapData.markerLayer.clearMarkers()-->
        <!--this.basicList = []-->
        <!--this.mapQuery.page_num = val-->
        <!--this.mapQuery.page_Size = this.pageSize-->
        <!--this.mapQuery.city = this.currentCity-->
        <!--let mapQuery = this.mapQuery-->
        <!--this.basicFlag=true-->
        <!--queryDetailAddress(mapQuery,true).then((response) =>{-->
          <!--if (response.totalCount !== 0) {-->
            <!--this.pageDisplay = true-->
            <!--this.personflag = true-->
            <!--this.totalCount = response.data.total-->
            <!--this.editFlag='2'-->
<!--//            this.addressCode=response.currentDistrict.adcode-->
            <!--for (let i = 0; i < response.data.pois.length; i++) {-->
              <!--let posi = response.data.pois[i]-->
              <!--this.basicList.push(posi)-->
              <!--let size = new SuperMap.Size(21, 33)-->
              <!--let offset = new SuperMap.Pixel(-(size.w/2), -size.h)-->
              <!--let index = i + 1-->
              <!--let icon = new SuperMap.Icon(require("@/assets/img/map/point/red" + index + ".png"), size, offset)-->
              <!--let temp = new SuperMap.Marker(new SuperMap.LonLat(posi.location.split(',')[0], posi.location.split(',')[1]),icon)-->
              <!--this.riskMapData.markerLayer.addMarker(temp)-->
            <!--}-->
          <!--}-->
        <!--})-->
      <!--},-->
      <!--setQueryCenter(bas,valPage){-->
        <!--this.locationCenter = this.map.getCenter()-->
        <!--this.locationZoom = this.map.getZoom()-->
        <!--this.clickFlag = false-->
        <!--this.pageNoT = valPage-->
        <!--this.markerobj=bas-->
        <!--this.riskMapData.markerLayer.clearMarkers()-->
        <!--this.riskMapData.markerRightSLayer.clearMarkers()-->
        <!--let size = new SuperMap.Size(21, 33)-->
        <!--let offset = new SuperMap.Pixel(-(size.w/2), -size.h)-->
        <!--let icon_blue = new SuperMap.Icon(require("@/assets/img/map/point/redcirle" + ".png"), size, offset)-->
        <!--let blue = new SuperMap.Marker(new SuperMap.LonLat(bas.location.split(',')[0], bas.location.split(',')[1]),icon_blue)-->
        <!--this.riskMapData.markerLayer.addMarker(blue)-->
        <!--let jd = bas.location.split(',')[0]-->
        <!--let wd = bas.location.split(',')[1]-->
        <!--let ms = 15-->
        <!--this.map.setCenter(new SuperMap.LonLat(jd,wd), ms)-->
        <!--this.open()-->
<!--//        this.checkAddress(this.addressCode, "")-->
      <!--},-->
      <!--open(){-->
        <!--this.provinceName=this.markerobj.province-->
        <!--this.cityName=this.markerobj.city-->
        <!--this.countryName=this.markerobj.district-->
        <!--if(this.provinceName===this.cityName){-->
          <!--this.address=this.provinceName+this.countryName-->
        <!--} else if(this.cityName===this.countryName){-->
          <!--this.address=this.provinceName+this.countryName-->
        <!--} else{-->
          <!--this.address=this.provinceName+this.cityName+this.countryName-->
        <!--}-->
        <!--this.addressDetail=this.markerobj.address.split(this.address)[1]-->
        <!--this.pointx_2000=this.markerobj.location.split(',')[0]-->
        <!--this.pointy_2000=this.markerobj.location.split(',')[1]-->
        <!--searchAddress({lon:this.pointx_2000,lat:this.pointy_2000,locaKindFlag:''}).then((response) =>{-->
          <!--if (response.errorFlag ==='1') {-->
            <!--if(response.cityAdCode!==''){-->
              <!--this.checkAddress(response.cityAdCode, response.proAdCode)-->
            <!--}-->
          <!--}-->
        <!--})-->
      <!--},-->
      <!--changePage (index){-->
        <!--this.pageNo = index-->
        <!--this.selectAddress(index)-->
      <!--},-->
      <!--transfer () {-->
        <!--if (this.address === '') {-->
          <!--this.modalFlag=true-->
          <!--this.message = "查勘地址未选定!"-->
<!--//          this.$message.error("查勘地址未选定!")-->
          <!--return-->
        <!--} else if (this.address !== '') {-->
          <!--if (this.addressDetail === '') {-->
            <!--this.messFlag = true-->
            <!--this.messText = "查勘地址详细信息不能为空！"-->
            <!--return-->
          <!--}-->
        <!--}-->
        <!--this.$emit('transfer',this.address, this.addressDetail, this.riskDnatural, this.pointx_2000,this.pointy_2000,this.provinceName,this.cityName,this.countryName,this.provinceCode,this.cityCode,this.countryCode,this.editFlag)-->
        <!--if(this.editFlag ==='2'){-->
          <!--this.modalFlag=true-->
          <!--this.message = "查勘地址已选定!"-->
        <!--}-->
      <!--},-->
      <!--selectAddressDetail(){-->
        <!--this.riskMapData.markerLayer.clearMarkers()-->
        <!--this.basicFlag=false-->
        <!--this.mapQuery.keywords=''-->
        <!--var userAgent = navigator.userAgent-->
        <!--var isIE = userAgent.indexOf('compatible') > -1 && userAgent.indexOf('MSIE') > -1-->
        <!--var isEdge = userAgent.indexOf('Edge') > -1-->
        <!--var isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf('rv:11.0') > -1-->
        <!--let loadingInstance = Loading.service({-->
          <!--render: (h) => {-->
            <!--if (isIE || isEdge || isIE11) {-->
              <!--return h('div', [-->
                <!--h('Icon', {-->
                  <!--'class': {'demo-spin-icon-load': true},-->
                  <!--props: {-->
                    <!--type: 'load-c',-->
                    <!--size: 36-->
                  <!--}-->
                <!--}),-->
                <!--h('div', 'Loading')-->
              <!--])-->
            <!--} else {-->
              <!--return h('div', [-->
                <!--h('img', {-->
                  <!--attrs: {-->
                    <!--src: require('@/assets/svg/loading.svg')-->
                  <!--}-->
                <!--})-->
              <!--])-->
            <!--}-->
          <!--}-->
        <!--})-->
        <!--this.address=''-->
        <!--this.addressDetail=''-->
        <!--var menu= document.getElementById("myMenu");-->
        <!--menu.style.visibility = "hidden";-->
<!--//        var pixel = new SuperMap.Pixel(this.jpsdata.x - this.mapLeft,this.jpsdata.y- this.offsetTop),-->
        <!--let pixel-->
        <!--if (isIE || isEdge || isIE11) {-->
          <!--pixel = new SuperMap.Pixel(this.jpsdata.x, this.jpsdata.y)-->
        <!--} else {-->
          <!--pixel = new SuperMap.Pixel(this.jpsdata.x - this.mapLeft,this.jpsdata.y- this.offsetTop)-->
        <!--}-->
        <!--let lonlat = this.map.getLonLatFromPixel(pixel);-->
        <!--if (lonlat.lon < 72.004 || lonlat.lon > 137.8347){-->
<!--//          iView.Spin.hide()-->
          <!--loadingInstance.close()-->
          <!--this.$message.error("经度不在中国范围之内")-->
          <!--return false-->
        <!--}-->
        <!--console.log('bbbbb')-->
        <!--if (lonlat.lat < 0.8293 || lonlat.lat > 55.8271){-->
<!--//          iView.Spin.hide()-->
          <!--loadingInstance.close()-->
          <!--this.$message.error("纬度不在中国范围之内")-->
          <!--return false-->
        <!--}-->
        <!--this.pointx_2000=lonlat.lon-->
        <!--this.pointy_2000=lonlat.lat-->
        <!--let size = new SuperMap.Size(21, 33)-->
        <!--let offset = new SuperMap.Pixel(-(size.w/2), -size.h)-->
        <!--let icon = new SuperMap.Icon(require("@/assets/img/map/point/redcirle.png"), size, offset)-->
        <!--let temp = new SuperMap.Marker(new SuperMap.LonLat(this.pointx_2000, this.pointy_2000),icon)-->
        <!--this.riskMapData.markerLayer.addMarker(temp)-->
        <!--searchAddress({lon:lonlat.lon,lat:lonlat.lat,locaKindFlag:''}).then((response) =>{-->
          <!--if (response.errorFlag ==='1') {-->
            <!--if(response.cityAdCode!==''){-->
              <!--this.checkAddress(response.cityAdCode, response.proAdCode)-->
            <!--}-->
            <!--this.editFlag = '2'-->
            <!--this.provinceName=response.provinceName-->
            <!--this.provinceCode=response.proAdCode-->
            <!--this.cityCode=response.cityAdCode-->
            <!--this.countryCode=response.adminCode-->
            <!--this.cityName=response.cityName-->
            <!--this.countryName=response.countryName-->
            <!--if(response.provinceName!==''&&response.cityName!==''&&response.countryName!==''){-->
              <!--if(response.provinceName===response.cityName && response.cityName!==response.countryName){-->
                <!--this.address=response.provinceName+response.countryName-->
              <!--}else if(response.provinceName!==response.cityName&&response.cityName===response.countryName){-->
                <!--this.address=response.provinceName+response.cityName-->
              <!--}else{-->
                <!--this.address = response.provinceName+response.cityName+response.countryName-->
              <!--}-->
<!--//              iView.Spin.hide()-->
              <!--loadingInstance.close()-->
            <!--}-->
          <!--} else {-->
<!--//            iView.Spin.hide()-->
            <!--loadingInstance.close()-->
            <!--this.$message.error(response.errorMessage)-->
          <!--}-->
        <!--})-->
      <!--},-->
      <!--checkAddress(val, val2){-->
        <!--checkRiskDnaturalAddress({addressCode: val, addressProCode: val2,exploreDate:this.config.exploreDate }).then((response) =>{-->
          <!--if(response.message==='no'){-->
            <!--this.modalFlag=true-->
            <!--this.message='该标的地址没有对应的环境信息！请重新选择标的....'-->
          <!--}else{-->
            <!--this.riskDnatural=response.dataList[0]-->
          <!--}-->
<!--//          iView.Spin.hide()-->
        <!--})-->
      <!--},-->
      <!--changeCity (sel) {-->
        <!--this.basicFlag = false-->
        <!--this.mapQuery.keywords = ''-->
        <!--this.riskMapData.markerLayer.clearMarkers()-->
        <!--this.riskMapData.markerLeftCLayer.clearMarkers()-->
        <!--this.currentCity = sel.name-->
        <!--let jd = sel.centerPoint.split(',')[0]-->
        <!--let wd = sel.centerPoint.split(',')[1]-->
        <!--let ms = sel.mapSize-->
        <!--this.map.setCenter(new SuperMap.LonLat(jd,wd), ms)-->
        <!--this.showAddress()-->
      <!--},-->
      <!--showAddress () {-->
        <!--if(!this.addressFlag){-->
          <!--this.addressFlag = true;-->
        <!--} else {-->
          <!--this.addressFlag = false;-->
        <!--}-->
      <!--},-->
      <!--showMenu (flag) {-->
        <!--switch(flag){-->
          <!--case 1:-->
            <!--if (!this.addressFlag) {-->
              <!--this.addressFlag = true-->
            <!--} else {-->
              <!--this.addressFlag = false-->
            <!--}-->
            <!--break-->
        <!--}-->
      <!--},-->
      <!--ok () {-->
        <!--this.modalFlag = false-->
        <!--this.address = ''-->
        <!--this.addressDetail = ''-->
        <!--this.riskDnatural = []-->
      <!--},-->
      <!--sure () {-->
        <!--this.messFlag = false-->
        <!--this.addressDetail = ''-->
      <!--},-->
      <!--setUpTag(){-->
        <!--if(this.config.editModel === 'browse'||this.config.editModel==='1'){-->
          <!--this.disabledFlag = true-->
        <!--}-->
        <!--this.pointx_2000=this.config.pointx_2000-->
        <!--this.pointy_2000=this.config.pointy_2000-->
        <!--this.provinceName= this.config.addressProvince-->
        <!--this.cityName = this.config.addressCity-->
        <!--this.countryName = this.config.addressCountry-->
        <!--this.provinceCode=this.config.ProCode-->
        <!--this.cityCode=this.config.cityCode-->
        <!--this.countryCode=this.config.countryCode-->
        <!--this.editFlag=this.config.addressDetail.editFlag-->
        <!--if(this.config.addressDetail!==''){-->
          <!--this.address=this.config.addressDetail.split(this.config.addressCountry)[0]+this.config.addressCountry-->
          <!--this.addressDetail=this.config.addressDetail.split(this.config.addressCountry)[1]-->
        <!--}-->
        <!--let size = new SuperMap.Size(21, 33)-->
        <!--let offset = new SuperMap.Pixel(-(size.w/2), -size.h)-->
        <!--let icon = new SuperMap.Icon(require("@/assets/img/map/point/redcirle.png"), size, offset)-->
        <!--let temp = new SuperMap.Marker(new SuperMap.LonLat(this.config.pointx_2000, this.config.pointy_2000),icon)-->
        <!--this.riskMapData.markerLayer.addMarker(temp)-->
      <!--}-->
    <!--}-->
  <!--}-->
<!--</script>-->
<!--<style lang="scss" >-->
  <!--.ivu-card-height2{-->
    <!--.map-box{-->
      <!--height: 100%;-->
      <!--position: relative;-->
      <!--#map{-->

      <!--}-->
      <!--.search{-->
        <!--position: absolute;-->
        <!--top: 10px;-->
        <!--left: 15px;-->
        <!--z-index: 2201;-->
        <!--width: 300px;-->
        <!--height: 38px;-->
        <!--background: #fff;-->
        <!--box-shadow: 0 2px 2px rgba(0,0,0,.15);-->
        <!--border-radius: 3px;-->
        <!--.logo{-->
          <!--display: block;-->
          <!--position: absolute;-->
          <!--top: 5px;-->
          <!--left: 8px;-->
          <!--width: 27px;-->
          <!--height: 27px;-->
          <!--z-index: 99999;-->
          <!--cursor: pointer;-->
        <!--}-->
        <!--.iptbox{-->
          <!--position: absolute;-->
          <!--left: 50px;-->
          <!--top: 0;-->
          <!--width: 265px;-->
          <!--height: 38px;-->
          <!--box-sizing: border-box;-->
          <!--z-index: 2202;-->
          <!--border-radius: 2px;-->
          <!--#searchipt{-->
            <!--position: absolute;-->
            <!--top: 9.5px;-->
            <!--left: 0;-->
            <!--box-sizing: border-box;-->
            <!--text-indent: 2px;-->
            <!--z-index: 2200;-->
            <!--border: none;-->
            <!--width: 250px;-->
            <!--height: 20px;-->
            <!--line-height: 20px;-->
            <!--padding: 0;-->
            <!--letter-spacing: .5px;-->
            <!--font-size: 14px;-->
            <!--margin: 0;-->
            <!--outline: 0;-->
          <!--}-->
        <!--}-->
        <!--#searchbtn{-->
          <!--width: 55px;-->
          <!--height: 38px;-->
          <!--position: absolute;-->
          <!--right: 0;-->
          <!--top: 0;-->
          <!--z-index: 9308;-->
          <!--box-sizing: border-box;-->
          <!--border-top-right-radius: 3px;-->
          <!--border-bottom-right-radius: 3px;-->
          <!--background-color: #3385ff;-->
          <!--&:hover{-->
            <!--background-color: #2e77e5;-->
          <!--}-->
          <!--.searchlogo{-->
            <!--position: absolute;-->
            <!--top: 8px;-->
            <!--right: 12px;-->
            <!--font-size: 24px;-->
            <!--color: #ffffff;-->
            <!--padding: 0 5px;-->
            <!--cursor: pointer;-->
          <!--}-->
          <!--.searchloading{-->
            <!--position: absolute;-->
            <!--top: 12px;-->
            <!--right: 16px;-->
            <!--z-index: 2212;-->
            <!--display: none;-->
            <!--height: 13px;-->
            <!--width: 13px;-->
            <!--border: 0 solid #ccc;-->
            <!--border-radius: 100%;-->
            <!--border-bottom-color: transparent;-->
            <!--border-width: 1px;-->
            <!--background: 0 0;-->
            <!-- -webkit-animation: fa-spin 1s infinite linear;-->
            <!--animation: fa-spin 1s infinite linear;-->
            <!-- -webkit-font-smoothing: subpixel-antialiased;-->
          <!--}-->
        <!--}-->
      <!--}-->
      <!--.buttongroup{-->
        <!--width: auto;-->
        <!--height: auto;-->
        <!--position: absolute;-->
        <!--top: 10px;-->
        <!--right: 15px;-->
        <!--z-index: 2000;-->
        <!--font-size: 12px;-->
        <!--.ivu-btn{-->
          <!--font-size: 12px;-->
          <!--padding: 7px 15px;-->
        <!--}-->
        <!--.ivu-btn-group{-->
          <!--height: 34px;-->
          <!--.ivu-dropdown{-->
            <!--height: 34px;-->
            <!--line-height: 34px;-->
            <!--margin-left: 0 !important;-->
            <!--border: 1px solid #d7dde4;-->
            <!--border-right: none;-->
            <!--background-color: #F7F7F7;-->
            <!--float: left;-->
            <!--.ivu-dropdown-rel{-->
              <!--a{-->
                <!--display: inline-block;-->
                <!--width: auto;-->
                <!--height: 34px;-->
                <!--color: #657180;-->
                <!--padding: 0 15px;-->
                <!--font-size: 12px;-->
              <!--}-->
            <!--}-->
            <!--.ivu-select-dropdown{-->
              <!--background-color: #F7F7F7;-->
              <!--.ivu-dropdown-menu{-->
                <!--background-color: #F7F7F7;-->
                <!--.ivu-dropdown-item{-->
                  <!--padding: 0;-->
                  <!--background-color: #F7F7F7;-->
                  <!--border-top: 1px solid #d7dde4;-->
                  <!--.ivu-btn{-->
                    <!--border: none;-->
                    <!--&:hover{-->
                      <!--background-color: #F7F7F7;-->
                    <!--}-->
                  <!--}-->
                <!--}-->
              <!--}-->
            <!--}-->
          <!--}-->
        <!--}-->
        <!--.buttonaddress{-->
          <!--width: auto;-->
          <!--height: 34px;-->
          <!--box-sizing: border-box;-->
          <!--padding: 0 15px;-->
          <!--background-color: #F7F7F7;-->
          <!--border: 1px solid #d7dde4;-->
          <!--border-right-color: #F7F7F7;-->
          <!--border-top-left-radius: 3px;-->
          <!--border-bottom-left-radius: 3px;-->
          <!--/*position: absolute;-->
          <!--top: 0;-->
          <!--right: 480px;*/-->
          <!--float: right;-->
          <!--z-index: 2000;-->
          <!--.name{-->
            <!--display: inline-block;-->
            <!--color: #657180;-->
            <!--font-size: 12px;-->
            <!--line-height: 34px;-->
          <!--}-->
          <!--&:hover{-->
            <!--color: #57a3f3;-->
            <!--background-color: white;-->
            <!--border-color: #57a3f3;-->
            <!--.name{-->
              <!--color: #57a3f3;-->
            <!--}-->
          <!--}-->
          <!--.addresswrap{-->
            <!--width: auto;-->
            <!--height: 100%;-->
          <!--}-->
          <!--.addressbox{-->
            <!--width: 450px;-->
            <!--height: 340px;-->
            <!--padding: 0 20px;-->
            <!--background-color: #ffffff;-->
            <!--position: absolute;-->
            <!--top: 40px;-->
            <!--right: 0px;-->
            <!--box-shadow: 0 2px 6px 0 rgba(0,0,0,.2), 0 2px 6px 0 rgba(0,0,0,.19);-->
            <!--.addresstitle{-->
              <!--font-size: 12px;-->
              <!--line-height: 34px;-->
              <!--border-bottom: 1px solid #cbcccd;-->
              <!--position: relative;-->
              <!--text-align: left;-->
              <!--color: #657180;-->
              <!--.close{-->
                <!--position: absolute;-->
                <!--top: 12px;-->
                <!--right: 5px;-->
              <!--}-->
            <!--}-->
            <!--.addresscontent{-->
              <!--width: 100%;-->
              <!--height: 264px;-->
              <!--overflow-y: auto;-->
              <!--margin: 20px 0;-->
              <!--.province{-->
                <!--color: #5f6477;-->
              <!--}-->
              <!--.city{-->
                <!--display: inline-block;-->
                <!--margin-right: 9px;-->
                <!--cursor: pointer;-->
                <!--color: #999;-->
              <!--}-->
            <!--}-->
          <!--}-->
        <!--}-->
        <!--.buttontarget{-->
          <!--width: auto;-->
          <!--height: 34px;-->
          <!--padding: 0 15px;-->
          <!--background-color: #F7F7F7;-->
          <!--border: 1px solid #d7dde4;-->
          <!--box-sizing: border-box;-->
          <!--border-right-color: #F7F7F7;-->
          <!--position: relative;-->
          <!--float: left;-->
          <!--z-index: 2000;-->
          <!--.addresswrap{-->
            <!--width: auto;-->
            <!--height: 100%;-->
          <!--}-->
          <!--&:hover{-->
            <!--background-color: white;-->
            <!--border-color: #57a3f3;-->
            <!--.name{-->
              <!--color: #57a3f3;-->
            <!--}-->
            <!--.addresswrap{-->
              <!--color: #57a3f3;-->
            <!--}-->
          <!--}-->
          <!--.name{-->
            <!--display: inline-block;-->
            <!--color: #657180;-->
            <!--font-size: 12px;-->
            <!--line-height: 34px;-->
          <!--}-->
          <!--.targetbox{-->
            <!--width: 400px;-->
            <!--height: auto;-->
            <!--/*max-height: calc(~"(100vh - 230px)");*/-->
            <!--min-height: 110px;-->
            <!--padding: 0 20px;-->
            <!--background-color: #ffffff;-->
            <!--padding-bottom: 20px;-->
            <!--position: absolute;-->
            <!--top: 40px;-->
            <!--left: 0;-->
            <!--box-shadow: 0 2px 6px 0 rgba(0,0,0,.2), 0 2px 6px 0 rgba(0,0,0,.19);-->
            <!--.targettitle{-->
              <!--width: 34px;-->
              <!--height: 34px;-->
              <!--font-size: 12px;-->
              <!--line-height: 34px;-->
              <!--/*border-bottom: 1px solid #cbcccd;*/-->
              <!--text-align: left;-->
              <!--color: #657180;-->
              <!--position: absolute;-->
              <!--top: 0;-->
              <!--right: 15px;-->
              <!--z-index: 3000;-->
              <!--.close{-->
                <!--position: absolute;-->
                <!--top: 12px;-->
                <!--right: 5px;-->
              <!--}-->
            <!--}-->
            <!--.targetcontent{-->
              <!--width: 100%;-->
              <!--height: 200px;-->
              <!--overflow-y: auto;-->
              <!--margin: 20px 0;-->
            <!--}-->
            <!--.ivu-form-item{-->
              <!--margin-bottom: 14px;-->
            <!--}-->
            <!--.tabsbox{-->
              <!--.ivu-tabs-content{-->
                <!--height: auto;-->
                <!--/*max-height: calc(~"(100vh - 240px)");*/-->
                <!--min-height: 100px;-->
              <!--}-->
            <!--}-->
          <!--}-->
        <!--}-->
        <!--.buttonmeasure{-->
          <!--width: auto;-->
          <!--height: 34px;-->
          <!--padding: 0 15px;-->
          <!--background-color: #F7F7F7;-->
          <!--border: 1px solid #d7dde4;-->
          <!--box-sizing: border-box;-->
          <!--border-right-color: #F7F7F7;-->
          <!--position: relative;-->
          <!--float: left;-->
          <!--z-index: 2000;-->
          <!--.addresswrap{-->
            <!--width: auto;-->
            <!--height: 100%;-->
          <!--}-->
          <!--&:hover{-->
            <!--background-color: white;-->
            <!--border-color: #57a3f3;-->
            <!--.name{-->
              <!--color: #57a3f3;-->
            <!--}-->
            <!--.addresswrap{-->
              <!--color: #57a3f3;-->
            <!--}-->
          <!--}-->
          <!--.name{-->
            <!--display: inline-block;-->
            <!--color: #657180;-->
            <!--font-size: 12px;-->
            <!--line-height: 34px;-->
          <!--}-->
          <!--.measurebox{-->
            <!--width: 220px;-->
            <!--height: 80px;-->
            <!--padding: 0 20px;-->
            <!--background-color: #ffffff;-->
            <!--position: absolute;-->
            <!--top: 40px;-->
            <!--left: 0;-->
            <!--box-shadow: 0 2px 6px 0 rgba(0,0,0,.2), 0 2px 6px 0 rgba(0,0,0,.19);-->
            <!--.targettitle{-->
              <!--font-size: 12px;-->
              <!--line-height: 34px;-->
              <!--border-bottom: 1px solid #cbcccd;-->
              <!--position: relative;-->
              <!--text-align: left;-->
              <!--color: #657180;-->
              <!--.close{-->
                <!--position: absolute;-->
                <!--top: 12px;-->
                <!--right: 5px;-->
              <!--}-->
            <!--}-->
            <!--.targetcontent{-->
              <!--width: 100%;-->
              <!--height: 50px;-->
              <!--overflow-y: auto;-->
              <!--margin: 20px 0 0 0;-->
              <!--.ivu-btn{-->
                <!--float: left;-->
                <!--margin-right: 10px;-->
              <!--}-->
            <!--}-->
          <!--}-->
        <!--}-->
        <!--.buttonspecial{-->
          <!--width: auto;-->
          <!--height: 34px;-->
          <!--padding: 0 15px;-->
          <!--background-color: #F7F7F7;-->
          <!--border: 1px solid #d7dde4;-->
          <!--box-sizing: border-box;-->
          <!--border-right-color: #F7F7F7;-->
          <!--position: relative;-->
          <!--float: left;-->
          <!--z-index: 2000;-->
          <!--.addresswrap{-->
            <!--width: auto;-->
            <!--height: 100%;-->
          <!--}-->
          <!--&:hover{-->
            <!--background-color: white;-->
            <!--border-color: #57a3f3;-->
            <!--.name{-->
              <!--color: #57a3f3;-->
            <!--}-->
            <!--.addresswrap{-->
              <!--color: #57a3f3;-->
            <!--}-->
          <!--}-->
          <!--.name{-->
            <!--display: inline-block;-->
            <!--color: #657180;-->
            <!--font-size: 12px;-->
            <!--line-height: 34px;-->
          <!--}-->
          <!--.specialbox{-->
            <!--width: 260px;-->
            <!--height: 218px;-->
            <!--padding: 0 20px;-->
            <!--background-color: #ffffff;-->
            <!--position: absolute;-->
            <!--top: 40px;-->
            <!--right: 0;-->
            <!--box-shadow: 0 2px 6px 0 rgba(0,0,0,.2), 0 2px 6px 0 rgba(0,0,0,.19);-->
            <!--.targettitle{-->
              <!--font-size: 12px;-->
              <!--line-height: 34px;-->
              <!--border-bottom: 1px solid #cbcccd;-->
              <!--position: relative;-->
              <!--text-align: left;-->
              <!--color: #657180;-->
              <!--.close{-->
                <!--position: absolute;-->
                <!--top: 12px;-->
                <!--right: 5px;-->
              <!--}-->
            <!--}-->
            <!--.targetcontent{-->
              <!--width: 100%;-->
              <!--height: 180px;-->
              <!--margin: 0;-->
              <!--.ivu-btn{-->
                <!--float: left;-->
                <!--margin-right: 10px;-->
              <!--}-->
              <!--.ivu-card-bordered{-->
                <!--border: none;-->
              <!--}-->
              <!--.connection1-nav{-->
                <!--width: 100%;-->
                <!--height: 150px;-->
                <!--/*background-color: red;*/-->
                <!--.grade-title{-->
                  <!--font-size: 14px;-->
                  <!--line-height: 24px;-->
                  <!--color: #657180;-->
                  <!--text-align: left;-->
                <!--}-->
                <!--.grade-eye{-->
                  <!--width: 100%;-->
                  <!--height: 25px;-->
                  <!--.iconwrap{-->
                    <!--width: 25px;-->
                    <!--height: 25px;-->
                    <!--float: left;-->
                    <!--vertical-align: middle;-->
                    <!--font-size: 16px;-->
                  <!--}-->
                  <!--.sliderwrap{-->
                    <!--/*width: calc(~"(100% - 30px)");*/-->
                    <!--height: 100%;-->
                    <!--float: left;-->
                    <!--margin-left: 5px;-->
                    <!--.ivu-slider{-->
                      <!--.ivu-slider-wrap{-->
                        <!--margin: 8px 0;-->
                      <!--}-->
                    <!--}-->
                  <!--}-->
                <!--}-->
                <!--.gradeGroup{-->
                  <!--width: 100%;-->
                  <!--height: 100%;-->
                  <!--.grade-title{-->
                    <!--width: 100%;-->
                    <!--height: 25px;-->
                    <!--.iconwrap{-->
                      <!--width: 25px;-->
                      <!--height: 25px;-->
                      <!--float: left;-->
                    <!--}-->
                    <!--.sliderwrap{-->
                      <!--/*width: calc(~"(100% - 25px)");*/-->
                      <!--height: 100%;-->
                      <!--float: left;-->
                      <!--font-size: 12px;-->
                      <!--line-height: 23px;-->
                    <!--}-->
                  <!--}-->

                <!--}-->
              <!--}-->
            <!--}-->
            <!--.colorCard{-->
              <!--width: 100%;-->
              <!--height: 20px;-->
              <!--margin-top: 20px;-->
              <!--position: relative;-->
              <!--.gradebox{-->
                <!--width: 100%;-->
                <!--height: 14px;-->
                <!--background-color: transparent;-->
                <!--position: absolute;-->
                <!--top: -15px;-->
                <!--left: 0;-->
                <!--.grade{-->
                  <!--width: 29.7px;-->
                  <!--height: 18px;-->
                  <!--font-size: 12px;-->
                  <!--line-height: 18px;-->
                  <!--background-color: #ffffff;-->
                  <!--float: left;-->
                  <!--margin-left: 2px;-->
                  <!--color: #333333;-->
                <!--}-->
              <!--}-->
            <!--}-->
          <!--}-->
        <!--}-->
      <!--}-->
      <!--.connection2{-->
        <!--width: 300px;-->
        <!--height: auto;-->
        <!--/*max-height: calc(~"100vh - 75px");*/-->
        <!--position: absolute;-->
        <!--top: 50px;-->
        <!--left: 15px;-->
        <!--margin: auto;-->
        <!--background-color: #ffffff;-->
        <!--padding-bottom: 20px;-->
        <!--z-index: 2000;-->
        <!--box-shadow: 0 2px 6px 0 rgba(0,0,0,.2), 0 2px 6px 0 rgba(0,0,0,.19);-->
        <!--.connection2-nav{-->
          <!--width: 100%;-->
          <!--height: auto;-->
          <!--/*max-height: calc(~"90vh - 104px");*/-->
          <!--overflow-y: auto;-->
          <!--/*background-color: #d9d7d5;*/-->
          <!--border: none;-->
          <!--font-size: 12px;-->
          <!--&:hover{-->
            <!--box-shadow: none;-->
          <!--}-->
          <!--.basicbox{-->
            <!--&:hover{-->
              <!--background-color: #f6f6f6;-->
            <!--}-->
          <!--}-->
        <!--}-->
      <!--}-->
      <!--#myMenu{-->
        <!--position: absolute;-->
        <!--z-index: 2000;-->
        <!--visibility: hidden;-->
        <!--.myMenu-wrap{-->
          <!--width: 100px;-->
          <!--height: 26px;-->
          <!--background-color: #FFFFFF;-->
          <!--padding: 5px 10px;-->
          <!--box-shadow: 0 2px 6px 0 rgba(0,0,0,.2), 0 2px 6px 0 rgba(0,0,0,.19);-->
          <!--.myMenutitle{-->
            <!--font-size: 12px;-->
            <!--line-height: 18px;-->
            <!--color: #333333;-->
            <!--text-align: center;-->
            <!--cursor: pointer;-->
            <!--float: left;-->
          <!--}-->
        <!--}-->
      <!--}-->
    <!--}-->
  <!--}-->
<!--</style>-->
