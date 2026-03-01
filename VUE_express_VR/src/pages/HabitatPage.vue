<script setup lang="ts">
import BarChartCard from '@/components/BarChartCard.vue'
import MapPlaceholder from '@/components/MapPlaceholder.vue'

const populationData = [
  { label: '绿海龟', value: 4.7, secondaryValue: 95 },
  { label: '红海龟', value: 4.5, secondaryValue: 92 },
  { label: '玳瑁', value: 4.3, secondaryValue: 85 },
  { label: '棱皮龟', value: 6, secondaryValue: 160 },
  { label: '肯氏丽龟', value: 4.5, secondaryValue: 65 },
  { label: '平背龟', value: 6, secondaryValue: 83 },
  { label: '橄榄丽龟', value: 4.5, secondaryValue: 68 },
]

const nestingData = [
  { label: '其他', value: 12 },
  { label: '太平洋', value: 1190 },
  { label: '印度洋', value: 825 },
  { label: '大西洋', value: 2332 },
]

//以下是月均洄游距离，最好从api里面扒下来
const migrationData = [
  { label: '红海中南部', value: 1300 },
  { label: '南海', value: 1942 },
  { label: '​西南佛罗里达', value: 748.8 },
]
</script>

<template>
  <div class="habitat-page">
    <!-- 标题 -->
    <header class="page-header">
      <h1>海龟被目击分布范围图谱</h1>
    </header>

    <!-- 主内容 -->
    <main class="page-content">
      <!-- 灰色链接条 -->
      <router-link to="/classification" class="link-bar">
        <span>链接：跳转到海龟分类页面，该页面为物种分类信息</span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
          <polyline points="15 3 21 3 21 9" />
          <line x1="10" y1="14" x2="21" y2="3" />
        </svg>
      </router-link>

      <!-- 地图区域 -->
      <div class="map-area">
        <MapPlaceholder />
      </div>

      <!-- 三个柱状图 -->
      <div class="charts-row">
        <BarChartCard
          title="数据表 1 - 各海龟物种幼体和成体体系差别（单位：cm）"
          :data="populationData"
          :legendLabels="['幼体长度', '成体长度']"
          color="#1e3a5f"
          secondary-color="#4a90c4"
        />
        <BarChartCard
          title="数据表 2 - 各海域繁殖巢穴监测站点数据"
          :data="nestingData"
          :legendLabels="['数量']"
          color="#1e3a5f"
          secondary-color="#6db3a8"
        />
        <BarChartCard
          title="数据表 3 - 不同海域海龟迁徙距离（单位：km）"
          :data="migrationData"
          color="#1e3a5f"
        />
      </div>
    </main>
  </div>
</template>

<style scoped>
.habitat-page {
  min-height: 100%;
  background-color: #f5f5f5;
}
.page-header {
  text-align: center;
  padding: 24px 16px;
}
.page-header h1 {
  font-size: 22px;
  font-weight: 700;
  color: #1a1a1a;
  letter-spacing: 1px;
}
.page-content {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 16px 32px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

/* 灰色链接条 */
.link-bar {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  padding: 12px 24px;
  border-radius: 6px;
  background-color: #b0bec5;
  color: #1e3a5f;
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  transition: opacity 0.2s;
}
.link-bar:hover {
  opacity: 0.88;
}

/* 地图 */
.map-area {
  width: 100%;
  min-height: 420px;
}

/* 图表行 */
.charts-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}
@media (max-width: 900px) {
  .charts-row {
    grid-template-columns: 1fr;
  }
}
</style>
