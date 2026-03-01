<template>
  <div id="map" class="map-container"></div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

onMounted(() => {
  // 初始化地图
  const map = L.map('map', {
    center: [20, 0],
    zoom: 2,
    worldCopyJump: true,
  })

  // 添加底图（OpenStreetMap）
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap',
  }).addTo(map)

  // 加载你的 GeoJSON
  fetch('/mapdata/distribute.geojson')
    .then((res) => res.json())
    .then((data) => {
      L.geoJSON(data, {
        style: {
          color: '#1e3a5f',
          weight: 0.5,
          fillColor: '#2e7d32',
          fillOpacity: 0.6,
        },
      }).addTo(map)
    })
})
</script>

<style scoped>
.map-container {
  width: 100%;
  height: 600px;
  border-radius: 8px;
  overflow: hidden;
}
</style>
