# 标签标记

## 基本用法

<vuep template="#example"></vuep>

<script v-pre type="text/x-template" id="example">

<template>
  <div class="amap-page-container">
    <el-amap class="amap-demo" :show-lable="showLabel" :view-mode="viewMode" :pitch="pitch" :expand-zoom-range="expandZoomRange" :zoom="zoom" :center="center" :map-style="mapStyle">
        <el-amap-marker v-if="!!markerContent" :content="markerContent" :position="markerPosition"></el-amap-marker>
        <el-amap-labels-layer :z-index="layerZIndex" :animation="layerAnimation" :collision="layerCollision">
            <el-amap-label-marker v-for="(position, index) in positionData" :key="index" :icon="icon" :position="position" @mouseover="onMouseOver" @mouseout="onMouseOut"></el-amap-label-marker>
        </el-amap-labels-layer>
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
        zoom: 9,
        center: [116.12, 40.11],
        showLabel: false,
        expandZoomRange: true,
        viewMode: '3D',
        pitch: 60,
        mapStyle: 'amap://styles/whitesmoke',
        zooms: [3, 20],
        layerZIndex: 111,
        layerAnimation: false,
        layerCollision: false,
        positionData: [],
        markerPosition: null,
        markerContent: '',
        icon: {
            type: 'image',
            image: 'https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png',
            size: [6, 9],
            anchor: 'bottom-center',
            angel: 0,
            retina: true
        }
    }
  },
  created() {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://a.amap.com/jsapi_demos/static/demo-center/data/mock_position.js';
    script.onload = this.onDataLoad.bind(this);
    document.body.appendChild(script);
},
  methods: {
    onDataLoad() {
      this.positionData = window.Positions.slice(0, 3e3);
    },
    onMouseOver(e) {
      this.markerPosition = [e.lnglat.getLng(), e.lnglat.getLat()];
      this.markerContent = e.lnglat.toString();
    },
    onMouseOut() {
        this.markerPosition = null;
        this.markerContent = '';
    }
  }
};
</script>

</script>

# 文档

<https://a.amap.com/jsapi/static/doc/index.html?v=2#labelmarker>
