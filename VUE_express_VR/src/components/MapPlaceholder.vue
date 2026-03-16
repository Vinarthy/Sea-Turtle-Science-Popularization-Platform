<template>
  <div class="map-wrapper">
    <div id="map" class="map-container"></div>

    <div class="sidebar">
      <label class="checkbox">
        <input type="checkbox" v-model="showLayer" @change="toggleDistribution" />
        海龟目击点分布
      </label>
      <br />
      <br />
      海龟巢穴分布数据：
      <div style="margin-top: 10px">
        <label class="checkbox">
          <input type="checkbox" v-model="showCaretta" @change="toggleCaretta" />
          <span style="color: #e74c3c">●</span> 红海龟
        </label>

        <br />

        <label class="checkbox">
          <input type="checkbox" v-model="showGreen" @change="toggleGreen" />
          <span style="color: #27ae60">●</span> 绿海龟
        </label>

        <br />

        <label class="checkbox">
          <input type="checkbox" v-model="showOlive" @change="toggleOlive" />
          <span style="color: #f39c12">●</span> 太平洋丽龟
        </label>

        <br />

        <label class="checkbox">
          <input type="checkbox" v-model="showLeather" @change="toggleLeather" />
          <span style="color: #8e44ad">●</span> 棱皮龟
        </label>
        <br />
        <label class="checkbox">
          <input type="checkbox" v-model="showHawksbill" @change="toggleHawksbill" />
          <span style="color: #c7d531">●</span> 玳瑁龟
        </label>
        <br />
        <label class="checkbox">
          <input type="checkbox" v-model="showFlatback" @change="toggleFlatback" />
          <span style="color: #34f1cb">●</span> 平背龟
        </label>
        <br />
        <label class="checkbox">
          <input type="checkbox" v-model="showKemp" @change="toggleKemp" />
          <span style="color: #f494f5">●</span> 肯氏丽龟
        </label>

        <br />
      </div>
      <p class="desc">这些坐标点记录了全球范围内的海龟目击事件及巢穴分布，数据源于SWOT网站。</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

const map = ref<L.Map>()
const showLayer = ref(true) //这个是指分布格网的显示
const showSpecies = ref(true) //这个是指物种点的显示
//根据物种选择
const showCaretta = ref(true)
const showGreen = ref(true)
const showOlive = ref(true)
const showLeather = ref(true)
const showHawksbill = ref(true)
const showFlatback = ref(true)
const showKemp = ref(true)
//选择不同物种

const distributionLayer = ref<L.GeoJSON>()
const speciesLayer = ref<L.LayerGroup>(L.layerGroup())
const carettaLayer = ref<L.LayerGroup>(L.layerGroup())
const greenLayer = ref<L.LayerGroup>(L.layerGroup())
const oliveLayer = ref<L.LayerGroup>(L.layerGroup())
const leatherLayer = ref<L.LayerGroup>(L.layerGroup())
const hawksbillLayer = ref<L.LayerGroup>(L.layerGroup())
const flatbackLayer = ref<L.LayerGroup>(L.layerGroup())
const kempLayer = ref<L.LayerGroup>(L.layerGroup())

function toggleDistribution() {
  if (showLayer.value) {
    distributionLayer.value?.addTo(map.value!)
  } else {
    map.value?.removeLayer(distributionLayer.value!)
  }
}

function toggleSpecies() {
  if (showSpecies.value) {
    speciesLayer.value.addTo(map.value!)
  } else {
    map.value?.removeLayer(speciesLayer.value)
  }
}
function toggleCaretta() {
  if (showCaretta.value) {
    carettaLayer.value.addTo(map.value!)
  } else {
    map.value?.removeLayer(carettaLayer.value)
  }
}

function toggleGreen() {
  if (showGreen.value) {
    greenLayer.value.addTo(map.value!)
  } else {
    map.value?.removeLayer(greenLayer.value)
  }
}

function toggleOlive() {
  if (showOlive.value) {
    oliveLayer.value.addTo(map.value!)
  } else {
    map.value?.removeLayer(oliveLayer.value)
  }
}

function toggleLeather() {
  if (showLeather.value) {
    leatherLayer.value.addTo(map.value!)
  } else {
    map.value?.removeLayer(leatherLayer.value)
  }
}

function toggleHawksbill() {
  if (showHawksbill.value) {
    hawksbillLayer.value.addTo(map.value!)
  } else {
    map.value?.removeLayer(hawksbillLayer.value)
  }
}

function toggleFlatback() {
  if (showFlatback.value) {
    flatbackLayer.value.addTo(map.value!)
  } else {
    map.value?.removeLayer(flatbackLayer.value)
  }
}

function toggleKemp() {
  if (showKemp.value) {
    kempLayer.value.addTo(map.value!)
  } else {
    map.value?.removeLayer(kempLayer.value)
  }
}
const speciesColorMap: Record<string, string> = {
  Carettacaretta: '#e74c3c', // 红
  GreenSeaTurtle: '#27ae60', // 绿
  OliveRidley: '#f39c12', // 橙，太平洋丽龟
  Leatherback: '#8e44ad', // 紫，棱皮龟
  Hawksbill: '#c7d531', // 黄绿，玳瑁
  Flatback: '#34f1cb', // 青绿，平背龟
  LepidochelysKempii: '#f494f5', // 亮绿，肯氏龟
}
onMounted(async () => {
  map.value = L.map('map', {
    center: [20, 0],
    zoom: 2,
    worldCopyJump: true,
  })

  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap',
  }).addTo(map.value)

  // ── 分布格网 ────────────────────────────────
  const res1 = await fetch('/mapdata/distribute.geojson')
  const distData = await res1.json()

  distributionLayer.value = L.geoJSON(distData, {
    style: {
      color: '#1e5889', // 边框深蓝
      weight: 1.2,
      fillColor: '#4da6ff', // 填充浅蓝（更明显）
      fillOpacity: 0.35,
    },
  })

  // ── 物种点 ───────────────────────────────────
  const res2 = await fetch('/mapdata/speciese.geojson')
  const speciesData = await res2.json()

  speciesData.features.forEach((f: any) => {
    const speciesName = f.properties.name
    const color = speciesColorMap[speciesName] || '#7f8c8d'
    const marker = L.circleMarker([f.geometry.coordinates[1], f.geometry.coordinates[0]], {
      radius: 6,
      color: color,
      fillColor: color,
      fillOpacity: 0.85,
      weight: 1.5,
    })

    marker.bindPopup(`
      <b>${f.properties.common_name || '未知'}</b><br>
      <span style="color:#555">${f.properties.species || ''}</span>
    `)

    if (speciesName === 'Carettacaretta') {
      carettaLayer.value.addLayer(marker)
    }
    if (speciesName === 'GreenSeaTurtle') {
      greenLayer.value.addLayer(marker)
    }
    if (speciesName === 'OliveRidley') {
      oliveLayer.value.addLayer(marker)
    }
    if (speciesName === 'Leatherback') {
      leatherLayer.value.addLayer(marker)
    }
    if (speciesName === 'Hawksbill') {
      hawksbillLayer.value.addLayer(marker)
    }
    if (speciesName === 'Flatback') {
      flatbackLayer.value.addLayer(marker)
    }
    if (speciesName === 'LepidochelysKempii') {
      kempLayer.value.addLayer(marker)
    }
  })

  // 初始显示（根据默认值）
  if (showLayer.value) distributionLayer.value?.addTo(map.value)
  if (showCaretta.value) carettaLayer.value.addTo(map.value)
  if (showGreen.value) greenLayer.value.addTo(map.value)
  if (showOlive.value) oliveLayer.value.addTo(map.value)
  if (showLeather.value) leatherLayer.value.addTo(map.value)
  if (showHawksbill.value) hawksbillLayer.value.addTo(map.value)
  if (showFlatback.value) flatbackLayer.value.addTo(map.value)
  if (showKemp.value) kempLayer.value.addTo(map.value)
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
  font-weight: 600;
}

.desc {
  font-size: 13px;
  margin-top: 6px;
  color: #666;
}
</style>
