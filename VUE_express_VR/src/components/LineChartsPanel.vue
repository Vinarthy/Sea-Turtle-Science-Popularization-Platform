<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import * as echarts from 'echarts'

const chartRef = ref(null)
let chart: echarts.ECharts | null = null

const datasets = {
  bycatch: {
    title: '渔业附带捕捞威胁',
    x: ['拖网', '延绳钓', '刺网'],
    y: [942, 118, 31],
  },
  habitat: {
    title: '栖息地改变威胁',
    x: ['海滩侵蚀', '光污染', '施工', '交通', '噪音'],
    y: [120, 12, 24, 1, 0],
  },
  interaction: {
    title: '物种间相互作用',
    x: ['本地捕食者', '外来捕食者'],
    y: [132, 133],
  },
}

const currentType = ref<'bycatch' | 'habitat' | 'interaction'>('bycatch')

const renderChart = () => {
  if (!chart) return

  const data = datasets[currentType.value]

  chart.setOption(
    {
      title: {
        text: data.title,
        left: 'center',
        textStyle: {
          fontSize: 14,
          fontWeight: 'bold',
        },
      },
      tooltip: {
        trigger: 'axis',
      },
      xAxis: {
        type: 'category',
        data: data.x,
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          type: 'line',
          data: data.y,
          smooth: true,
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
  { label: '🎣 捕捞', value: 'bycatch' },
  { label: '🏝 栖息地', value: 'habitat' },
  { label: '🦈 物种', value: 'interaction' },
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
  cursor: pointer;
}

.btn.active {
  color: white;
  background: linear-gradient(135deg, #409eff, #66b1ff);
}
</style>
