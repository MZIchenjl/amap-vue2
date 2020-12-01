# 点坐标

## 基础示例

<vuep template="#example"></vuep>

<script v-pre type="text/x-template" id="example">

<template>
  <div class="amap-page-container">
    <el-amap class="amap-demo" :zoom="zoom" :center="center">
      <el-amap-mass-marks :opacity="opacity" :z-index="zIndex" :cursor="cursor" :styles="styles" :data="cityData" @mousemove="onMouseMove"></el-amap-mass-marks>
      <el-amap-marker v-if="!!markerContent" :content="markerContent" :position="markerPosition"></el-amap-marker>
    </el-amap>
  </div>
</template>

<style>
.amap-demo {
  height: 300px;
}

.amap-markers .amap-marker {
    border: 1px solid blue;
    background-color: white;
    white-space: nowrap;
    cursor: default;
    padding: 3px;
    font-size: 12px;
    line-height: 14px;
}
</style>

<script>
module.exports = {
  data() {
    return {
      zoom: 4,
      center: [102.342785, 35.312316],
      opacity: 0.8,
      zIndex: 111,
      cursor: 'pointer',
      cityData: [],
      styles: [{
        url: 'https://a.amap.com/jsapi_demos/static/images/mass0.png',
        anchor: [6, 6],
        size: [11, 11]
      }, {
        url: 'https://a.amap.com/jsapi_demos/static/images/mass1.png',
        anchor: [4, 4],
        size: [7, 7]
      }, {
        url: 'https://a.amap.com/jsapi_demos/static/images/mass2.png',
        anchor: [3, 3],
        size: [5, 5]
      }],
      markerPosition: null,
      markerContent: ''
    }
  },
  created() {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://a.amap.com/jsapi_demos/static/citys.js';
    script.onload = this.onDataLoad.bind(this);
    document.body.appendChild(script);
},
  methods: {
    onDataLoad() {
      this.cityData = window.citys;
    },
    onMouseMove(e) {
      this.markerPosition = e.data.lnglat;
      this.markerContent = e.data.name;
    }
  }
};
</script>

</script>

## 静态属性
仅且可以初始化配置，不支持响应式。

名称 | 类型 | 说明
---|---|---|
vid | String | marker对象id。

## 动态属性
支持响应式。

名称 | 类型 | 说明
---|---|---|
zIndex | Number | 点标记的叠加顺序。地图上存在多个点标记叠加时，通过该属性使级别较高的点标记在上层显示默认zIndex：100。
opacity | Number | 图片透明度，取值范围[0,1]，0表示完全透明，1表示不透明默认值：1
zooms | Array | 地图显示的缩放级别范围，在PC上，默认范围[3,18]，取值范围[3-18]；在移动设备上，默认范围[3-19]，取值范围[3-19]
styles | Object/Array | 海量点样式列表。对应 style 属性。
cursor | String |指定鼠标悬停时的鼠标样式，自定义cursor，IE仅支持cur/ani/ico格式，Opera不支持自定义cursor 

## 事件

<https://a.amap.com/jsapi/static/doc/index.html?v=2#massmarkseventtouchstart>

