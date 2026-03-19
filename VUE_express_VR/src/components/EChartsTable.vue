<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import * as echarts from 'echarts'

interface Column {
  label: string
  key: string
}

type RowData = Record<string, any>

const props = defineProps<{
  title: string
  columns: Column[]
  data: RowData[]
}>()

const chartRef = ref<HTMLElement | null>(null)
let chart: echarts.ECharts | null = null

const renderChart = () => {
  if (!chart || !props.data || props.data.length === 0) return

  // x轴：物种
  const xData = props.data.map((row) => row.species)

  const option: echarts.EChartsOption = {
    title: {
      text: props.title,
      left: 'center',
    },

    tooltip: {
      trigger: 'axis',
    },

    legend: {
      data: ['幼体', '成体'],
      top: 30,
    },

    grid: {
      top: 80,
      left: 50,
      right: 20,
      bottom: 40,
    },

    xAxis: {
      type: 'category',
      data: xData,
    },

    yAxis: {
      type: 'value',
      name: 'cm',
    },

    series: [
      {
        name: '幼体',
        type: 'bar',
        data: props.data.map((row) => row.juvenile),
        itemStyle: {
          color: '#4a90c4',
        },
      },
      {
        name: '成体',
        type: 'bar',
        data: props.data.map((row) => row.adult),
        itemStyle: {
          color: '#1e3a5f',
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
