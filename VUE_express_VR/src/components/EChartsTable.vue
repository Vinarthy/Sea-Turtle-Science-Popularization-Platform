<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import * as echarts from 'echarts'

type RowData = {
  stage: string
  region: string
  value: number
  desc: string
}

const props = defineProps<{
  title: string
  data: RowData[]
}>()

const chartRef = ref<HTMLElement | null>(null)
let chart: echarts.ECharts | null = null

const renderChart = () => {
  if (!chart || props.data.length === 0) return

  const xData = props.data.map((d) => `${d.stage}\n(${d.region})`)

  const option: echarts.EChartsOption = {
    title: {
      text: props.title,
      left: 'center',
    },

    tooltip: {
      trigger: 'axis',
      formatter: (params: any) => {
        const i = params[0].dataIndex
        const d = props.data[i]
        return `
          <b>${d.stage}</b><br/>
          区域：${d.region}<br/>
          权重：${d.value}<br/>
          <span style="color:#888">${d.desc}</span>
        `
      },
    },

    grid: {
      top: 80,
      left: 50,
      right: 20,
      bottom: 40, // 调整底部间距，因为去掉了滑块
    },

    xAxis: {
      type: 'category',
      data: xData,
      axisLabel: {
        interval: 0,
      },
    },

    yAxis: {
      type: 'value',
      name: 'RRV',
    },

    series: [
      {
        type: 'bar',
        data: props.data.map((d) => d.value),
        barWidth: 30,
        itemStyle: {
          color: '#5470c6',
          opacity: 1, // 正常不透明度。
        },
      },
    ],
  }

  chart.setOption(option)
}

onMounted(() => {
  if (chartRef.value) {
    chart = echarts.init(chartRef.value)
    renderChart()
  }
})

watch(() => props.data, renderChart, { deep: true })
</script>

<template>
  <div class="card">
    <div ref="chartRef" style="height: 320px"></div>
    <!-- 滑块已移除 -->
  </div>
</template>

<style scoped>
.card {
  background: white;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}
</style>
