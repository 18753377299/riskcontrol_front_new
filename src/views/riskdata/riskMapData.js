const riskMapData = {
  // serverName: 'http://10.10.1.156:8090/',
  // 生产环境
  // serverName: 'http://10.133.233.109:8092/',
  // serverName: 'http://11.205.242.60:8090/',
  // serverName: 'http://10.10.2.242:8091/',
  // serverName: 'http://10.10.2.242:8091/',
  serverName: 'http://10.10.2.241:5001/',
  // serverName: 'http://10.10.2.242:7001/',
  mapData: function () {
    return {
      // 查询的表名
      // sqlName: 'SMDTV_60',
      // 查询黑点的表名
      // typhoonName: 'SMDTV_182',
      sqlName: '',
      // 查询黑点的表名
      typhoonName: '',
      // typhoonName: 'SMDTV_82',
      // sqlName: 'SMDTV_2',
      dangerArrayList: [
        {
          dangerName: '综合灾害风险',
          class: 'activeComp',
          // 菜单级别
          listMore: '1',
          // 是否有下一级菜单：1 有，0 无
          classes: '1',
          flag: false,
          // value值单位,菜单级别,最大值,最小值,专题图划分等级颜色,是否有下一级菜单,显隐标志位,数据集,数据源,灾因值,灾因名称,是否覆盖专题图,专题图的透明度，专题图的url,灾因的专题图层
          dangerArray: [
            {'unit': '', 'listMore': '1-1', 'max': '10', 'min': '0', 'color': 'colorCard colorCard1', 'classes': '0', 'flag': false, 'dtname': 'rain_hazard_scale_1km', 'dsname': 'china', 'dangerValue': '', 'dangerName': '暴雨综合风险', 'dangerEname': false, 'dangerSlider': 0, 'dangerUrl': this.serverName + 'iserver/services/map-FXDT/rest/maps/rain_hazard_scale_1km@china', 'themeLayer': ''},
            {'unit': '', 'listMore': '1-2', 'max': '10', 'min': '0', 'color': 'colorCard colorCard7', 'classes': '0', 'flag': false, 'dtname': 'thunderstorm_hazard_scale_1km', 'dsname': 'china', 'dangerValue': '', 'dangerName': '雷电综合风险', 'dangerEname': false, 'dangerSlider': 0, 'dangerUrl': this.serverName + 'iserver/services/map-FXDT/rest/maps/thunderstorm_hazard_scale_1km@china', 'themeLayer': ''},
            {'unit': '', 'listMore': '1-3', 'max': '10', 'min': '0', 'color': 'colorCard colorCard5', 'classes': '0', 'flag': false, 'dtname': 'snowstorm_hazard_scale_1km', 'dsname': 'china', 'dangerValue': '', 'dangerName': '雪灾综合风险', 'dangerEname': false, 'dangerSlider': 0, 'dangerUrl': this.serverName + 'iserver/services/map-FXDT/rest/maps/snowstorm_hazard_scale_1km@china', 'themeLayer': ''},
            {'unit': '', 'listMore': '1-4', 'max': '10', 'min': '0', 'color': 'colorCard colorCard6', 'classes': '0', 'flag': false, 'dtname': 'hail_hazard_scale_1km', 'dsname': 'china', 'dangerValue': '', 'dangerName': '冰雹综合风险', 'dangerEname': false, 'dangerSlider': 0, 'dangerUrl': this.serverName + 'iserver/services/map-FXDT/rest/maps/hail_hazard_scale_1km@china', 'themeLayer': ''},
            {'unit': '', 'listMore': '1-5', 'max': '10', 'min': '0', 'color': 'colorCard colorCard3', 'classes': '0', 'flag': false, 'dtname': 'flood_hazard_scale_1km', 'dsname': 'china', 'dangerValue': '', 'dangerName': '洪水综合风险', 'dangerEname': false, 'dangerSlider': 0, 'dangerUrl': this.serverName + 'iserver/services/map-FXDT/rest/maps/flood_hazard_scale_1km@china', 'themeLayer': ''},
            {'unit': '', 'listMore': '1-6', 'max': '10', 'min': '0', 'color': 'colorCard colorCard2', 'classes': '0', 'flag': false, 'dtname': 'typhoon_hazard_scale_1km', 'dsname': 'china', 'dangerValue': '', 'dangerName': '台风综合风险', 'dangerEname': false, 'dangerSlider': 0, 'dangerUrl': this.serverName + 'iserver/services/map-FXDT/rest/maps/typhoon_hazard_scale_1km@china', 'themeLayer': ''},
            {'unit': '', 'listMore': '1-7', 'max': '10', 'min': '0', 'color': 'colorCard colorCard4', 'classes': '0', 'flag': false, 'dtname': 'landslide_hazard_scale_1km', 'dsname': 'china', 'dangerValue': '', 'dangerName': '泥石流综合风险', 'dangerEname': false, 'dangerSlider': 0, 'dangerUrl': this.serverName + 'iserver/services/map-FXDT/rest/maps/landslide_hazard_scale_1km@china', 'themeLayer': ''},
            {'unit': '', 'listMore': '1-8', 'max': '0.5', 'min': '0', 'color': 'colorCard colorCard8', 'classes': '0', 'flag': false, 'dtname': 'eq_hazard_PGA', 'dsname': 'china', 'dangerValue': '', 'dangerName': '地震峰值加速度', 'dangerEname': false, 'dangerSlider': 0, 'dangerUrl': this.serverName + 'iserver/services/map-FXDT/rest/maps/eq_hazard_PGA@china', 'themeLayer': ''}
          ]
        },
        {
          dangerName: '更多专题图',
          class: 'activeMore',
          listMore: '2',
          flag: false,
          // 是否有下一级菜单
          classes: '1',
          dangerArray: [
            {
              dangerName: '暴雨专题图',
              // 组名
              className: '暴雨',
              class: 'activeRain',
              listMore: '2-1',
              // 是否有下一级菜单
              classes: '1',
              flag: false,
              dangerArray: [
                {'unit': '天', 'listMore': '2-1-1', 'max': '14.80', 'min': '0', 'color': 'colorCard rain', 'classes': '0', 'flag': false, 'dtname': 'rain_n_days_gt_50mm', 'dsname': 'rainNew', value: '', 'dangerName': '暴雨(≥50mm)年均日数', 'dangerEname': false, 'dangerSlider': 0, 'dangerUrl': this.serverName + 'iserver/services/map-FXDT/rest/maps/rain_n_days_gt_50mm@rainNew', 'themeLayer': ''},
                {'unit': '天', 'listMore': '2-1-2', 'max': '5.24', 'min': '0', 'color': 'colorCard rain', 'classes': '0', 'flag': false, 'dtname': 'rain_n_days_gt_100mm', 'dsname': 'rainNew', value: '', 'dangerName': '大暴雨(≥100mm)年均日数', 'dangerEname': false, 'dangerSlider': 0, 'dangerUrl': this.serverName + 'iserver/services/map-FXDT/rest/maps/rain_n_days_gt_100mm@rainNew', 'themeLayer': ''},
                {'unit': '天', 'listMore': '2-1-3', 'max': '0.44', 'min': '0', 'color': 'colorCard rain', 'classes': '0', 'flag': false, 'dtname': 'rain_n_days_gt_200mm', 'dsname': 'rainNew', value: '', 'dangerName': '特大暴雨(≥200mm)年均日数', 'dangerEname': false, 'dangerSlider': 0, 'dangerUrl': this.serverName + 'iserver/services/map-FXDT/rest/maps/rain_n_days_gt_200mm@rainNew', 'themeLayer': ''},
                {'unit': 'mm', 'listMore': '2-1-4', 'max': '223.01', 'min': '0', 'color': 'colorCard rain', 'classes': '0', 'flag': false, 'dtname': 'rain_maxima_annual_avg', 'dsname': 'rainNew', value: '', 'dangerName': '日最大降水量多年平均', 'dangerEname': false, 'dangerSlider': 0, 'dangerUrl': this.serverName + 'iserver/services/map-FXDT/rest/maps/rain_maxima_annual_avg@rainNew', 'themeLayer': ''},
                {'unit': 'mm', 'listMore': '2-1-5', 'max': '637.12', 'min': '0', 'color': 'colorCard rain', 'classes': '0', 'flag': false, 'dtname': 'rain_maxima_daily', 'dsname': 'rainNew', value: '', 'dangerName': '日降水量极大值', 'dangerEname': false, 'dangerSlider': 0, 'dangerUrl': this.serverName + 'iserver/services/map-FXDT/rest/maps/rain_maxima_daily@rainNew', 'themeLayer': ''},
                {'unit': 'mm', 'listMore': '2-1-6', 'max': '345.37', 'min': '0', 'color': 'colorCard rain', 'classes': '0', 'flag': false, 'dtname': 'rain_maxima_3day_avg', 'dsname': 'rainNew', value: '', 'dangerName': '3日最大降水量多年平均', 'dangerEname': false, 'dangerSlider': 0, 'dangerUrl': this.serverName + 'iserver/services/map-FXDT/rest/maps/rain_maxima_3day_avg@rainNew', 'themeLayer': ''},
                {'unit': 'mm', 'listMore': '2-1-7', 'max': '1134.37', 'min': '0', 'color': 'colorCard rain', 'classes': '0', 'flag': false, 'dtname': 'rain_maxima_3day', 'dsname': 'rainNew', value: '', 'dangerName': '3日降水量极大值', 'dangerEname': false, 'dangerSlider': 0, 'dangerUrl': this.serverName + 'iserver/services/map-FXDT/rest/maps/rain_maxima_3day@rainNew', 'themeLayer': ''},
                {'unit': 'mm', 'listMore': '2-1-8', 'max': '324.36', 'min': '0', 'color': 'colorCard rain', 'classes': '0', 'flag': false, 'dtname': 'rain_daily_5a', 'dsname': 'rainNew', value: '', 'dangerName': '5年一遇日最大降水量', 'dangerEname': false, 'dangerSlider': 0, 'dangerUrl': this.serverName + 'iserver/services/map-FXDT/rest/maps/rain_daily_5a@rainNew', 'themeLayer': ''},
                {'unit': 'mm', 'listMore': '2-1-9', 'max': '402.76', 'min': '0', 'color': 'colorCard rain', 'classes': '0', 'flag': false, 'dtname': 'rain_daily_10a', 'dsname': 'rainNew', value: '', 'dangerName': '10年一遇日最大降水量', 'dangerEname': false, 'dangerSlider': 0, 'dangerUrl': this.serverName + 'iserver/services/map-FXDT/rest/maps/rain_daily_10a@rainNew', 'themeLayer': ''},
                {'unit': 'mm', 'listMore': '2-1-10', 'max': '485.17', 'min': '0', 'color': 'colorCard rain', 'classes': '0', 'flag': false, 'dtname': 'rain_daily_20a', 'dsname': 'rainNew', value: '', 'dangerName': '20年一遇日最大降水量', 'dangerEname': false, 'dangerSlider': 0, 'dangerUrl': this.serverName + 'iserver/services/map-FXDT/rest/maps/rain_daily_20a@rainNew', 'themeLayer': ''},
                {'unit': 'mm', 'listMore': '2-1-11', 'max': '603.47', 'min': '0', 'color': 'colorCard rain', 'classes': '0', 'flag': false, 'dtname': 'rain_daily_50a', 'dsname': 'rainNew', value: '', 'dangerName': '50年一遇日最大降水量', 'dangerEname': false, 'dangerSlider': 0, 'dangerUrl': this.serverName + 'iserver/services/map-FXDT/rest/maps/rain_daily_50a@rainNew', 'themeLayer': ''},
                {'unit': 'mm', 'listMore': '2-1-12', 'max': '701.72', 'min': '0', 'color': 'colorCard rain', 'classes': '0', 'flag': false, 'dtname': 'rain_daily_100a', 'dsname': 'rainNew', value: '', 'dangerName': '100年一遇日最大降水量', 'dangerEname': false, 'dangerSlider': 0, 'dangerUrl': this.serverName + 'iserver/services/map-FXDT/rest/maps/rain_daily_100a@rainNew', 'themeLayer': ''}
              ]
            },
            {
              dangerName: '洪水专题图',
              className: '洪水',
              iconType: 'moreRisk-icon flood-icon',
              class: 'activeFlood',
              listMore: '2-2',
              classes: '1',
              flag: false,
              dangerArray: [
                {'unit': '级', 'listMore': '2-2-1', 'max': '10', 'min': '0', 'color': 'colorCard flood', 'classes': '0', 'flag': false, 'dtname': 'flood_hazard_scale_flashflood', 'dsname': 'floodNew', value: '', 'dangerName': '山洪危险性等级', 'dangerEname': false, 'dangerSlider': 0, 'dangerUrl': this.serverName + 'iserver/services/map-FXDT/rest/maps/flood_hazard_scale_flashflood@floodNew', 'themeLayer': ''},
                {'unit': '级', 'listMore': '2-2-2', 'max': '10', 'min': '0', 'color': 'colorCard flood', 'classes': '0', 'flag': false, 'dtname': 'flood_hazard_scale_inundation', 'dsname': 'floodNew', value: '', 'dangerName': '淹没洪水危险性等级', 'dangerEname': false, 'dangerSlider': 0, 'dangerUrl': this.serverName + 'iserver/services/map-FXDT/rest/maps/flood_hazard_scale_inundation@floodNew', 'themeLayer': ''}
              ]
            },
            {
              dangerName: '雷电专题图',
              className: '雷电',
              iconType: 'moreRisk-icon thunder-icon',
              class: 'activeThunderstorm',
              listMore: '2-3',
              classes: '1',
              flag: false,
              dangerArray: [
                {'unit': '天', 'listMore': '2-3-1', 'max': '113.84', 'min': '0', 'color': 'colorCard thunderstorm', 'classes': '0', 'flag': false, 'dtname': 'thunderstorm_n_days_annual_avg', 'dsname': 'thunderstormNew', value: '', 'dangerName': '年均雷暴日数', 'dangerEname': false, 'dangerSlider': 0, 'dangerUrl': this.serverName + 'iserver/services/map-FXDT/rest/maps/thunderstorm_n_days_annual_avg@thunderstormNew', 'themeLayer': ''},
                {'unit': '天', 'listMore': '2-3-2', 'max': '148.32', 'min': '0', 'color': 'colorCard thunderstorm', 'classes': '0', 'flag': false, 'dtname': 'thunderstorm_n_days_annual_max', 'dsname': 'thunderstormNew', value: '', 'dangerName': '最大年雷暴日数', 'dangerEname': false, 'dangerSlider': 0, 'dangerUrl': this.serverName + 'iserver/services/map-FXDT/rest/maps/thunderstorm_n_days_annual_max@thunderstormNew', 'themeLayer': ''},
                {'unit': '天', 'listMore': '2-3-3', 'max': '60.99', 'min': '0', 'color': 'colorCard thunderstorm', 'classes': '0', 'flag': false, 'dtname': 'thunderstorm_lighting_n_days_a', 'dsname': 'thunderstormNew', value: '', 'dangerName': '年均闪电日数', 'dangerEname': false, 'dangerSlider': 0, 'dangerUrl': this.serverName + 'iserver/services/map-FXDT/rest/maps/thunderstorm_lighting_n_days_a@thunderstormNew', 'themeLayer': ''}
              ]
            },
            {
              dangerName: '地震专题图',
              className: '地震',
              iconType: 'moreRisk-icon earthquack-icon',
              class: 'activeEq',
              listMore: '2-4',
              classes: '1',
              flag: false,
              dangerArray: [
                {'unit': '级', 'listMore': '2-4-1', 'max': '8.5', 'min': '0', 'color': 'colorCard eq', 'classes': '0', 'flag': false, 'dtname': 'eq_hazard_source_zone', 'dsname': 'eqNew', value: '', 'dangerName': '中国潜在震源区分布', 'dangerEname': false, 'dangerSlider': 0, 'dangerUrl': this.serverName + 'iserver/services/map-FXDT/rest/maps/eq_hazard_source_zone@eqNew', 'themeLayer': ''}
              ]
            },
            {
              dangerName: '泥石流专题图',
              className: '泥石流',
              iconType: 'moreRisk-icon debrisflow-icon',
              class: 'activeLandslide',
              listMore: '2-5',
              classes: '1',
              flag: false,
              dangerArray: [
                {'unit': '分', 'listMore': '2-5-1', 'max': '10', 'min': '0', 'color': 'colorCard landslide', 'classes': '0', 'flag': false, 'dtname': 'landslide_slope_stability', 'dsname': 'landslideNew', value: '', 'dangerName': '坡度危险性', 'dangerEname': false, 'dangerSlider': 0, 'dangerUrl': this.serverName + 'iserver/services/map-FXDT/rest/maps/landslide_slope_stability@landslideNew', 'themeLayer': ''},
                {'unit': '分', 'listMore': '2-5-2', 'max': '10', 'min': '0', 'color': 'colorCard landslide', 'classes': '0', 'flag': false, 'dtname': 'landslide_rock_stability', 'dsname': 'landslideNew', value: '', 'dangerName': '工程地质岩组危险性', 'dangerEname': false, 'dangerSlider': 0, 'dangerUrl': this.serverName + 'iserver/services/map-FXDT/rest/maps/landslide_rock_stability@landslideNew', 'themeLayer': ''},
                {'unit': '分', 'listMore': '2-5-3', 'max': '10', 'min': '0', 'color': 'colorCard landslide', 'classes': '0', 'flag': false, 'dtname': 'landslide_rain_hazard', 'dsname': 'landslideNew', value: '', 'dangerName': '降雨危险性', 'dangerEname': false, 'dangerSlider': 0, 'dangerUrl': this.serverName + 'iserver/services/map-FXDT/rest/maps/landslide_rain_hazard@landslideNew', 'themeLayer': ''},
                {'unit': '分', 'listMore': '2-5-4', 'max': '10', 'min': '0', 'color': 'colorCard landslide', 'classes': '0', 'flag': false, 'dtname': 'landslide_rain_potential', 'dsname': 'landslideNew', value: '', 'dangerName': '潜在灾害危险性', 'dangerEname': false, 'dangerSlider': 0, 'dangerUrl': this.serverName + 'iserver/services/map-FXDT/rest/maps/landslide_rain_potential@landslideNew', 'themeLayer': ''},
                {'unit': '分', 'listMore': '2-5-5', 'max': '9.94', 'min': '0', 'color': 'colorCard landslide', 'classes': '0', 'flag': false, 'dtname': 'landslide_historical_scale', 'dsname': 'landslideNew', value: '', 'dangerName': '历史滑坡泥石流危险性', 'dangerEname': false, 'dangerSlider': 0, 'dangerUrl': this.serverName + 'iserver/services/map-FXDT/rest/maps/landslide_historical_scale@landslideNew', 'themeLayer': ''}
              ]
            },
            {
              dangerName: '雪灾专题图',
              className: '雪灾',
              iconType: 'moreRisk-icon snow-icon',
              class: 'activeSnowstorm',
              listMore: '2-6',
              classes: '1',
              flag: false,
              dangerArray: [
                {'unit': '天', 'listMore': '2-6-1', 'max': '361.59', 'min': '0', 'color': 'colorCard flood', 'classes': '0', 'flag': false, 'dtname': 'snowstorm_n_days_annual_avg_1', 'dsname': 'snowstormNew', value: '', 'dangerName': '年均降雪日数', 'dangerEname': false, 'dangerSlider': 0, 'dangerUrl': this.serverName + 'iserver/services/map-FXDT/rest/maps/snowstorm_n_days_annual_avg_1@snowstormNew', 'themeLayer': ''},
                {'unit': 'mm', 'listMore': '2-6-2', 'max': '85.76', 'min': '0', 'color': 'colorCard flood', 'classes': '0', 'flag': false, 'dtname': 'snowstorm_dailydepth_annual_ma', 'dsname': 'snowstormNew', value: '', 'dangerName': '日极大降雪深度', 'dangerEname': false, 'dangerSlider': 0, 'dangerUrl': this.serverName + 'iserver/services/map-FXDT/rest/maps/snowstorm_dailydepth_annual_ma@snowstormNew', 'themeLayer': ''},
                {'unit': 'mm', 'listMore': '2-6-3', 'max': '33.88', 'min': '0', 'color': 'colorCard flood', 'classes': '0', 'flag': false, 'dtname': 'snowstorm_dailydepth_annual_av', 'dsname': 'snowstormNew', value: '', 'dangerName': '日最大平均降雪深度', 'dangerEname': false, 'dangerSlider': 0, 'dangerUrl': this.serverName + 'iserver/services/map-FXDT/rest/maps/snowstorm_dailydepth_annual_av@snowstormNew', 'themeLayer': ''},
                {'unit': 'mm', 'listMore': '2-6-4', 'max': '38.87', 'min': '0', 'color': 'colorCard flood', 'classes': '0', 'flag': false, 'dtname': 'snowstorm_dailydepth_5a_1', 'dsname': 'snowstormNew', value: '', 'dangerName': '5年一遇年最大积雪深度', 'dangerEname': false, 'dangerSlider': 0, 'dangerUrl': this.serverName + 'iserver/services/map-FXDT/rest/maps/snowstorm_dailydepth_5a_1@snowstormNew', 'themeLayer': ''},
                {'unit': 'mm', 'listMore': '2-6-5', 'max': '43.69', 'min': '0', 'color': 'colorCard flood', 'classes': '0', 'flag': false, 'dtname': 'snowstorm_dailydepth_10a_1', 'dsname': 'snowstormNew', value: '', 'dangerName': '10年一遇年最大积雪深度', 'dangerEname': false, 'dangerSlider': 0, 'dangerUrl': this.serverName + 'iserver/services/map-FXDT/rest/maps/snowstorm_dailydepth_10a_1@snowstormNew', 'themeLayer': ''},
                {'unit': 'mm', 'listMore': '2-6-6', 'max': '48.32', 'min': '0', 'color': 'colorCard flood', 'classes': '0', 'flag': false, 'dtname': 'snowstorm_dailydepth_20a_1', 'dsname': 'snowstormNew', value: '', 'dangerName': '20年一遇年最大积雪深度', 'dangerEname': false, 'dangerSlider': 0, 'dangerUrl': this.serverName + 'iserver/services/map-FXDT/rest/maps/snowstorm_dailydepth_20a_1@snowstormNew', 'themeLayer': ''}
              ]
            },
            {
              dangerName: '冰雹专题图',
              className: '冰雹',
              iconType: 'moreRisk-icon hail-icon',
              class: 'activeHail',
              listMore: '2-7',
              classes: '1',
              flag: false,
              dangerArray: [
                {'unit': '天', 'listMore': '2-7-1', 'max': '29.53', 'min': '0', 'color': 'colorCard hail', 'classes': '0', 'flag': false, 'dtname': 'hail_n_days_annual_avg', 'dsname': 'hailNew', value: '', 'dangerName': '年均降雹日数', 'dangerEname': false, 'dangerSlider': 0, 'dangerUrl': this.serverName + 'iserver/services/map-FXDT/rest/maps/hail_n_days_annual_avg@hailNew', 'themeLayer': ''},
                {'unit': '天', 'listMore': '2-7-2', 'max': '49.33', 'min': '0', 'color': 'colorCard hail', 'classes': '0', 'flag': false, 'dtname': 'hail_n_days_annual_maxima', 'dsname': 'hailNew', value: '', 'dangerName': '最大年降雹日数', 'dangerEname': false, 'dangerSlider': 0, 'dangerUrl': this.serverName + 'iserver/services/map-FXDT/rest/maps/hail_n_days_annual_maxima@hailNew', 'themeLayer': ''}
              ]
            },
            {
              dangerName: '台风专题图',
              className: '台风',
              iconType: 'moreRisk-icon typhoon-icon',
              class: 'activeTyphoon',
              listMore: '2-8',
              classes: '1',
              flag: false,
              dangerArray: [
                {'unit': '分', 'listMore': '2-8-1', 'max': '10', 'min': '0', 'color': 'colorCard typhoon', 'classes': '0', 'flag': false, 'dtname': 'typhoon_hazard_scale_rain', 'dsname': 'typhoonNew', value: '', 'dangerName': '中国台风降水危险性等级', 'dangerEname': false, 'dangerSlider': 0, 'dangerUrl': this.serverName + 'iserver/services/map-FXDT/rest/maps/typhoon_hazard_scale_rain@typhoonNew', 'themeLayer': ''},
                {'unit': '分', 'listMore': '2-8-2', 'max': '10', 'min': '0', 'color': 'colorCard typhoon', 'classes': '0', 'flag': false, 'dtname': 'typhoon_hazard_scale_wind', 'dsname': 'typhoonNew', value: '', 'dangerName': '中国台风大风危险性等级', 'dangerEname': false, 'dangerSlider': 0, 'dangerUrl': this.serverName + 'iserver/services/map-FXDT/rest/maps/typhoon_hazard_scale_wind@typhoonNew', 'themeLayer': ''}
              ]
            }
          ]
        }
      ],
      // 中心点和缩放比例
      centerPoint: ['108.88', '33.08', 5],
      // 实时台风数据
      SSTF_Array: [],
      // 删除预警台风路径存放的feature
      deleteTyphoonLayerSSTF: [],
      deleteEvTyphoonLayerSSTF: {
        '中国': [],
        '中国香港': [],
        '日本': [],
        '韩国': [],
        '中国台湾': [],
        '美国': []
      },
      // 栅格数据
      rasterDangerArray: [
        {'datasetName': 'rain_hazard_scale_1km', 'dataSourceName': 'china', value: '', valueName: '暴雨'},
        {'datasetName': 'thunderstorm_hazard_scale_1km', 'dataSourceName': 'china', value: '', valueName: '雷电'},
        {'datasetName': 'snowstorm_hazard_scale_1km', 'dataSourceName': 'china', value: '', valueName: '雪灾'},
        {'datasetName': 'hail_hazard_scale_1km', 'dataSourceName': 'china', value: '', valueName: '冰雹'},
        {'datasetName': 'flood_hazard_scale_1km', 'dataSourceName': 'china', value: '', valueName: '洪水'},
        {'datasetName': 'typhoon_hazard_scale_1km', 'dataSourceName': 'china', value: '', valueName: '台风'},
        {'datasetName': 'landslide_hazard_scale_1km', 'dataSourceName': 'china', value: '', valueName: '滑坡泥石流'},
        {'datasetName': 'eq_hazard_PGA', 'dataSourceName': 'china', value: '', valueName: '地震峰值加速度'}
      ],
      // 初始图层
      initLayer: '',
      // 天地图中文标记
      chinaNameLayer: '',
      // 英文标注
      englishNameLayer: '',
      // 矢量图层
      vectorLayer: '',
      // 扇形图层
      sectorLayer: '',
      // 风圈图层
      FQLayer: '',
      // 台风影响标的图层
      typhoonTargetLayer: '',
      // 文本图层
      textLayer: '',
      // 地震图层
      EarthQuakeLayer: '',
      // 泥石流图层
      DebrisFlowLayer: '',
      // 水淹图层
      FloodLayer: '',
      // 台风图层
      typhoonLayer: '',
      textMarkerlayer: '',
      // 台风黑点图层
      markerLayerTFH: '',
      // 线面图层
      vectorLineAreaLayer: '',
      // 标记图层(和左侧查询)
      markerLayer: '',
      // 台风图片标记图层
      markerLayerTF: '',
      markerLeftCLayer: '',
      markerRightSLayer: '',
      markerRightCLayer: '',
      // 实况雨场
      rainLayerSKRain: '',
      // 气象局降雨实况面数据的集合
      rainSKFeature: [],
      // 气象局降雨预警面数据的集合
      rainYJFeature: [],
      // 栅格数据图层
      layerTogether: '',
      layerNight: '',
      // 影像底图
      modifyLayer: '',
      chinaNameModifyLayer: '',
      englishNameModifyLayer: '',
      // 点聚合
      pointTogetherLayer: '',
      // 画圆
      drawCircle: '',
      // 多边形
      drawPolygon: '',
      // 矩形
      drawRectangle: '',
      // 划线
      drawLine: '',
      drawArea: '',
      framedCloud: '',
      infowin: null,
      infoTogether: null,
      // initUrl: this.serverName + 'iserver/services/map-china400/rest/maps/China_4326',
      initUrl: this.serverName + 'iserver/services/map-tianditu/rest/maps/矢量底图_经纬度',
      chinaNameUrl: this.serverName + 'iserver/services/map-tianditu/rest/maps/矢量中文注记_经纬度',
      englishNameUrl: this.serverName + 'iserver/services/map-tianditu/rest/maps/矢量英文注记_经纬度',
      initUrlImage: this.serverName + 'iserver/services/map-tianditu/rest/maps/影像底图_经纬度',
      chinaNameUrlImage: this.serverName + 'iserver/services/map-tianditu/rest/maps/影像中文注记_经纬度',
      englishNameUrlImage: this.serverName + 'iserver/services/map-tianditu/rest/maps/影像英文注记_经纬度',
      // initUrlLand: this.serverName + 'iserver/services/map-tianditu/rest/maps/地形底图_经纬度',
      // chinaNameUrlLand: this.serverName + 'iserver/services/map-tianditu/rest/maps/地形中文注记_经纬度',
      // togetherUrl: this.serverName + 'iserver/services/map-togetherAll/rest/maps/rain_daily_5a_test@together',
      togetherUrl: this.serverName + 'iserver/services/map-FXDT/rest/maps/all_scale_1km',
      // dataUrl: this.serverName + 'iserver/services/data-togetherAll/rest/data',
      dataUrl: this.serverName + 'iserver/services/data-FXDT/rest/data',
      // url3: this.serverName + 'iserver/services/map-ChinaProvinces/rest/maps/ChinaProvinces',
      measureUrl: this.serverName + 'iserver/services/map-china100/rest/maps/China_4326',
      // 业务数据图层
      //  professionUrl: this.serverName + 'iserver/services/map-supermap_oracle_lqk3/rest/maps/China_Province_pg@China'
      professionUrl: this.serverName + 'iserver/services/map-dataLayer/rest/maps/RISKMAP_ADDRESS@ORCL_riskcontrol',
      // 台风黑点数据层
      typhoonBlackUrl: this.serverName + 'iserver/services/map-dataLayer/rest/maps/RISKMAP_DANGER@ORCL_riskcontrol',
      earthQuakeUrl: this.serverName + 'iserver/services/map-FXDT/rest/maps/eq_hazard_catalog@dangerkind',
      eqUrl: this.serverName + 'iserver/services/map-FXDT/rest/maps/eq_hazard_source_zone@eqNew',
      chinaQuakeUrl: this.serverName + 'iserver/services/map-FXDT/rest/maps/china_province@areakind',
      professionTyphoonUrl: this.serverName + 'iserver/services/map-FXDT/rest/maps/typhoon_best_tracks_point@dangerkind',
      professionProvinceUrl: this.serverName + 'iserver/services/map-FXDT/rest/maps/china_province@areakind',
      professionDebrisFlowUrl: this.serverName + 'iserver/services/map-FXDT/rest/maps/landslide_catalog@dangerkind',
      professionTyphoonThemeUrl: this.serverName + 'iserver/services/map-yphoon_wind/rest/maps/'
      // mapurl: 'http://10.10.1.156:8099/iserver/services/map-ChinaProvinces2/rest/maps/ChinaProvinces',
      // mapurl2: 'http://10.10.1.156:8099/iserver/services/map-ChinaProvinces2/rest/maps/Provinces_R@China'
      // url: 'http://10.10.1.156:8099/iserver/services/map-stormRain/rest/maps/vec@t0.tianditu.com_WMTS1',
//       url: 'http://10.10.1.156:8099/iserver/services/map-BaoYu2/rest/maps/vec@t0.tianditu.com_WMTS1',
//       url2: 'http://10.10.1.156:8099/iserver/services/map-BaoYu22/rest/maps/rain_daily_10a_test@a'
    }
  }
}
export default riskMapData
