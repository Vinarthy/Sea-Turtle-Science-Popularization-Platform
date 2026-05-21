<template>
  <div class="map-wrapper">
    <div id="map" class="map-container"></div>

    <div class="sidebar">
      <label class="checkbox">
        <input type="checkbox" v-model="showLayer" @change="toggleDistribution" />
        海龟目击点分布
      </label>

      <br /><br />

      海龟巢穴分布数据：
      <div style="margin-top: 10px">
        <label v-for="(v, key) in speciesSwitch" :key="key" class="checkbox">
          <input type="checkbox" v-model="speciesSwitch[key]" @change="updateVisible" />
          <span :style="{ color: speciesColorMap[key] }">●</span> {{ speciesNameMap[key] }}
        </label>
      </div>

      <p class="desc">全球海龟目击与巢穴数据（SWOT）</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

const map = ref<L.Map>()

const showLayer = ref(true)

// 物种开关（统一管理）
const speciesSwitch = ref<Record<string, boolean>>({
  Carettacaretta: true,
  GreenSeaTurtle: true,
  OliveRidley: true,
  Leatherback: true,
  Hawksbill: true,
  Flatback: true,
  LepidochelysKempii: true,
})

const speciesNameMap: Record<string, string> = {
  Carettacaretta: '红海龟',
  GreenSeaTurtle: '绿海龟',
  OliveRidley: '太平洋丽龟',
  Leatherback: '棱皮龟',
  Hawksbill: '玳瑁龟',
  Flatback: '平背龟',
  LepidochelysKempii: '肯氏丽龟',
}

const speciesColorMap: Record<string, string> = {
  Carettacaretta: '#e74c3c',
  GreenSeaTurtle: '#27ae60',
  OliveRidley: '#f39c12',
  Leatherback: '#8e44ad',
  Hawksbill: '#c7d531',
  Flatback: '#34f1cb',
  LepidochelysKempii: '#f494f5',
}

const distributionLayer = ref<L.GeoJSON>()
const speciesLayer = ref<L.LayerGroup>(L.layerGroup())

let rawData: any[] = []
let loaded = false

function chunkLoad(features: any[], chunkSize = 200) {
  let index = 0

  function loadChunk() {
    const end = Math.min(index + chunkSize, features.length)

    for (let i = index; i < end; i++) {
      const f = features[i]
      const name = f.properties.name
      const color = speciesColorMap[name] || '#999'

      const marker = L.circleMarker([f.geometry.coordinates[1], f.geometry.coordinates[0]], {
        radius: 5,
        color,
        fillColor: color,
        fillOpacity: 0.8,
      })

      // ✅ 关键：给 marker 挂物种信息
      ;(marker as any).species = name

      marker.bindPopup(`<b>${f.properties.common_name || '未知'}</b>`)

      speciesLayer.value.addLayer(marker)
    }

    index = end
    if (index < features.length) requestAnimationFrame(loadChunk)
  }

  loadChunk()
}

function updateVisible() {
  speciesLayer.value.eachLayer((layer: any) => {
    const name = layer.species

    if (speciesSwitch.value[name]) {
      layer.setStyle({
        opacity: 1,
        fillOpacity: 0.8,
      })
    } else {
      layer.setStyle({
        opacity: 0,
        fillOpacity: 0,
      })
    }
  })
}

async function loadSpecies() {
  if (loaded) return

  const res = await fetch('/mapdata/speciese.geojson')
  const data = await res.json()

  rawData = data.features
  loaded = true

  chunkLoad(rawData)
}

function toggleDistribution() {
  if (showLayer.value) {
    distributionLayer.value?.addTo(map.value!)
  } else {
    map.value?.removeLayer(distributionLayer.value!)
  }
}

onMounted(async () => {
  map.value = L.map('map', {
    center: [20, 0],
    zoom: 2,
    worldCopyJump: true,
    preferCanvas: true, // 🚀 性能关键
  })

  L.tileLayer('https://wprd0{s}.is.autonavi.com/appmaptile?style=7&x={x}&y={y}&z={z}', {
    subdomains: ['1', '2', '3', '4'],
    attribution: '© 高德地图',
  }).addTo(map.value)

  // 分布图
  const res1 = await fetch('/mapdata/distribute.geojson')
  const distData = await res1.json()

  distributionLayer.value = L.geoJSON(distData, {
    style: {
      color: '#1e5889',
      weight: 1,
      fillColor: '#4da6ff',
      fillOpacity: 0.3,
    },
  })

  if (showLayer.value) distributionLayer.value.addTo(map.value)

  speciesLayer.value.addTo(map.value)

  // 初次加载
  await loadSpecies()
})
</script>

<style scoped>
.map-wrapper {
  display: flex;
  height: 600px;
}

.map-container {
  flex: 1;
}

.sidebar {
  width: 220px;
  padding: 12px;
  background: white;
  border-left: 1px solid #ddd;
}

.checkbox {
  display: block;
  margin-bottom: 6px;
  font-weight: 600;
}

.desc {
  font-size: 13px;
  margin-top: 10px;
  color: #666;
}
</style>
