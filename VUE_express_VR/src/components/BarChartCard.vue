<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'

interface BarArea {
  x: number
  y: number
  width: number
  height: number
  label: string
  value: number
}

const barAreas: BarArea[] = []
interface ChartDataItem {
  label: string
  value: number
  secondaryValue?: number
}

const props = withDefaults(
  defineProps<{
    title: string
    data: ChartDataItem[]
    color?: string
    secondaryColor?: string
    legendLabels?: [string, string?]
  }>(),
  {
    color: '#1e3a5f',
    secondaryColor: '#4a90c4',
  },
)

const canvasRef = ref<HTMLCanvasElement | null>(null)

function drawChart() {
  const canvas = canvasRef.value
  barAreas.length = 0
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  const dpr = window.devicePixelRatio || 1
  const rect = canvas.getBoundingClientRect()
  canvas.width = rect.width * dpr
  canvas.height = rect.height * dpr
  ctx.scale(dpr, dpr)

  const w = rect.width
  const h = rect.height
  const padding = { top: 20, right: 20, bottom: 40, left: 50 }
  const chartW = w - padding.left - padding.right
  const chartH = h - padding.top - padding.bottom

  // Clear
  ctx.clearRect(0, 0, w, h)
  ctx.fillStyle = '#ffffff'
  ctx.fillRect(0, 0, w, h)

  if (props.data.length === 0) return

  // Calculate max
  let maxVal = 0
  for (const item of props.data) {
    if (item.value > maxVal) maxVal = item.value
    if (item.secondaryValue !== undefined && item.secondaryValue > maxVal)
      maxVal = item.secondaryValue
  }
  maxVal = Math.ceil(maxVal / 100) * 100 || 100

  // Grid lines
  const gridCount = 5
  ctx.strokeStyle = '#e0e8f0'
  ctx.lineWidth = 0.5
  ctx.font = '11px system-ui, sans-serif'
  ctx.fillStyle = '#4a6280'
  ctx.textAlign = 'right'
  ctx.textBaseline = 'middle'

  for (let i = 0; i <= gridCount; i++) {
    const y = padding.top + chartH - (chartH * i) / gridCount
    const val = Math.round((maxVal * i) / gridCount)

    ctx.beginPath()
    ctx.setLineDash([3, 3])
    ctx.moveTo(padding.left, y)
    ctx.lineTo(w - padding.right, y)
    ctx.stroke()
    ctx.setLineDash([])

    ctx.fillText(String(val), padding.left - 8, y)
  }

  // Bars
  const hasSecondary = props.data.some((d) => d.secondaryValue !== undefined)
  const groupCount = props.data.length
  const groupWidth = chartW / groupCount
  const barGap = groupWidth * 0.25
  const barsPerGroup = hasSecondary ? 2 : 1
  const barWidth = (groupWidth - barGap) / barsPerGroup

  props.data.forEach((item, i) => {
    const groupX = padding.left + i * groupWidth + barGap / 2

    // Primary bar
    const barH1 = (item.value / maxVal) * chartH
    const x1 = groupX
    const y1 = padding.top + chartH - barH1

    // Rounded top
    const radius = 3
    ctx.fillStyle = props.color
    ctx.beginPath()
    ctx.moveTo(x1, y1 + radius)
    ctx.arcTo(x1, y1, x1 + barWidth, y1, radius)
    ctx.arcTo(x1 + barWidth, y1, x1 + barWidth, y1 + barH1, radius)
    ctx.lineTo(x1 + barWidth, padding.top + chartH)
    ctx.lineTo(x1, padding.top + chartH)
    ctx.closePath()
    ctx.fill()
    barAreas.push({
      x: x1,
      y: y1,
      width: barWidth,
      height: barH1,
      label: item.label,
      value: item.value,
    })

    // Secondary bar
    if (hasSecondary && item.secondaryValue !== undefined) {
      const barH2 = (item.secondaryValue / maxVal) * chartH
      const x2 = groupX + barWidth
      const y2 = padding.top + chartH - barH2

      ctx.fillStyle = props.secondaryColor
      ctx.beginPath()
      ctx.moveTo(x2, y2 + radius)
      ctx.arcTo(x2, y2, x2 + barWidth, y2, radius)
      ctx.arcTo(x2 + barWidth, y2, x2 + barWidth, y2 + barH2, radius)
      ctx.lineTo(x2 + barWidth, padding.top + chartH)
      ctx.lineTo(x2, padding.top + chartH)
      ctx.closePath()
      ctx.fill()
      barAreas.push({
        x: x2,
        y: y2,
        width: barWidth,
        height: barH2,
        label: item.label,
        value: item.secondaryValue!,
      })
    }

    // X-axis label
    ctx.fillStyle = '#4a6280'
    ctx.font = '10px system-ui, sans-serif'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'top'
    const labelX = groupX + (groupWidth - barGap) / 2
    ctx.fillText(item.label, labelX, padding.top + chartH + 8)
  })
  if (!props.legendLabels?.[0]) return // 没传图例文字就不画

  const legendY = padding.top + chartH + 28 // 图例在 X 标签下方
  ctx.font = '10px system-ui, sans-serif'
  ctx.textAlign = 'left'
  ctx.textBaseline = 'middle'

  let legendX = padding.left

  // 主图例
  ctx.fillStyle = props.color
  ctx.fillRect(legendX, legendY - 5, 12, 10) // 小色块
  ctx.fillStyle = '#4a6280'
  ctx.fillText(props.legendLabels[0], legendX + 16, legendY)

  // 副图例（如果有）
  if (props.legendLabels[1] && hasSecondary) {
    legendX += 80 // 间隔
    ctx.fillStyle = props.secondaryColor
    ctx.fillRect(legendX, legendY - 5, 12, 10)
    ctx.fillStyle = '#4a6280'
    ctx.fillText(props.legendLabels[1], legendX + 16, legendY)
  }
}

let resizeObserver: ResizeObserver | null = null

onMounted(() => {
  drawChart()
  if (canvasRef.value) {
    resizeObserver = new ResizeObserver(() => drawChart())
    resizeObserver.observe(canvasRef.value.parentElement!)
  }
  canvasRef.value?.addEventListener('mousemove', handleMouseMove)
})

onBeforeUnmount(() => {
  resizeObserver?.disconnect()
  canvasRef.value?.removeEventListener('mousemove', handleMouseMove)
})

watch(() => props.data, drawChart, { deep: true })
const tooltip = ref({
  show: false,
  x: 0,
  y: 0,
  text: '',
})
function handleMouseMove(e: MouseEvent) {
  const canvas = canvasRef.value
  if (!canvas) return

  const rect = canvas.getBoundingClientRect()
  const x = e.clientX - rect.left
  const y = e.clientY - rect.top

  tooltip.value.show = false

  for (const bar of barAreas) {
    if (x >= bar.x && x <= bar.x + bar.width && y >= bar.y && y <= bar.y + bar.height) {
      tooltip.value = {
        show: true,
        x,
        y,
        text: `${bar.label}: ${bar.value}`,
      }
      break
    }
  }
}
</script>

<template>
  <div class="chart-card">
    <div class="chart-header">{{ title }}</div>
    <div class="chart-body">
      <canvas ref="canvasRef" class="chart-canvas"></canvas>
      <div
        v-if="tooltip.show"
        class="chart-tooltip"
        :style="{ left: tooltip.x + 'px', top: tooltip.y + 'px' }"
      >
        {{ tooltip.text }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.chart-card {
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
  height: 100%;
}
.chart-header {
  background-color: #1e3a5f;
  color: #ffffff;
  padding: 12px 16px;
  font-size: 14px;
  font-weight: 600;
}
.chart-body {
  position: relative;
}

.chart-tooltip {
  position: absolute;
  background: rgba(0, 0, 0, 0.75);
  color: white;
  padding: 4px 8px;
  font-size: 12px;
  border-radius: 4px;
  pointer-events: none;
  transform: translate(10px, -10px);
}
.chart-canvas {
  width: 100%;
  height: 220px;
}
</style>
