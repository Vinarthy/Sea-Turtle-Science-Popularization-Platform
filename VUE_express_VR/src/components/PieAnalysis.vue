<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import * as echarts from 'echarts'

const chartRef = ref(null)
let chart: echarts.ECharts | null = null

// 三种数据
const datasets = {
  region: [
    { name: '陆地', value: 410 },
    { name: '浅海', value: 1004 },
    { name: '深海', value: 112 },
  ],
  threat: [
    { name: '附带捕捞', value: 1090 },
    { name: '栖息地改变', value: 156 },
    { name: '物种相互作用', value: 265 },
    { name: '资源利用', value: 14 },
    { name: '污染', value: 1 },
    { name: '气候变化', value: 0 },
  ],
  age: [
    { name: '产卵雌龟', value: 2 },
    { name: '卵', value: 372 },
    { name: '初孵幼体', value: 36 },
    { name: '过渡期', value: 0 },
    { name: '青年', value: 807 },
    { name: '成年', value: 309 },
  ],
}

const currentType = ref<'region' | 'threat' | 'age'>('region')

const renderChart = () => {
  if (!chart) return

  chart.setOption(
    {
      title: {
        text: '绿海龟各生命阶段在不同生态系统中面临的威胁源',
        left: 'center',
        top: 0,
        textStyle: {
          fontSize: 14,
          fontWeight: 'bold',
        },
      },
      tooltip: { trigger: 'item' },
      series: [
        {
          name: currentType.value,
          type: 'pie',
          radius: '60%',
          data: datasets[currentType.value],
        },
      ],
    },
    {
      replaceMerge: ['series'],
    },
  )
}

onMounted(() => {
  chart = echarts.init(chartRef.value!)
  renderChart()
})

watch(currentType, renderChart)
const btnList = [
  { label: '🌊 海区', value: 'region' },
  { label: '⚠️ 威胁', value: 'threat' },
  { label: '🎂 年龄', value: 'age' },
] as const
</script>

<template>
  <div class="card">
    <div ref="chartRef" style="height: 260px"></div>

    <div class="btn-group">
      <button
        v-for="item in btnList"
        :key="item.value"
        :class="['btn', { active: currentType === item.value }]"
        @click="currentType = item.value"
      >
        {{ item.label }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.card {
  background: white;
  padding: 12px;
  border-radius: 8px;
}

.btn-group {
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 16px;
  padding: 4px;
  background: #f5f7fa;
  border-radius: 10px;
  inline-size: fit-content;
  margin-inline: auto;
}

.btn {
  padding: 8px 20px;
  border: none;
  border-radius: 8px;
  background: transparent;
  color: #606266;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.25s ease;
  position: relative;
}

.btn:hover {
  color: #409eff;
  background: rgba(64, 158, 255, 0.1);
}

.btn.active {
  color: white;
  background: linear-gradient(135deg, #409eff, #66b1ff);
  box-shadow: 0 4px 12px rgba(64, 158, 255, 0.35);
}

.btn:active {
  transform: scale(0.98);
}
</style>
