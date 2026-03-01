<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue'
import type { TurtleFamily, TurtleGenus, TurtleSpecies } from '@/lib/turtle-data'

interface GraphNode {
  id: string
  label: string
  x: number
  y: number
  radius: number
  type: 'center' | 'genus' | 'species'
  data?: TurtleSpecies | TurtleGenus
}

interface GraphEdge {
  from: string
  to: string
}

const props = defineProps<{
  families: TurtleFamily[]
  selectedGenus: TurtleGenus | null
}>()

const emit = defineEmits<{
  (e: 'selectGenus', genus: TurtleGenus): void
  (e: 'selectSpecies', species: TurtleSpecies): void
}>()

const canvasRef = ref<HTMLCanvasElement | null>(null)
const containerRef = ref<HTMLDivElement | null>(null)
const width = ref(800)
const height = ref(600)
const hoveredNode = ref<string | null>(null)

let animationId = 0
let time = 0
let nodes: GraphNode[] = []
let edges: GraphEdge[] = []

function buildGraph() {
  const cx = width.value / 2
  const cy = height.value / 2
  const newNodes: GraphNode[] = []
  const newEdges: GraphEdge[] = []

  if (props.selectedGenus) {
    // 选中某个属：属居中，物种环绕
    newNodes.push({
      id: props.selectedGenus.id,
      label: props.selectedGenus.name,
      x: cx,
      y: cy,
      radius: 45,
      type: 'center',
    })

    const speciesCount = props.selectedGenus.species.length
    const orbitR = Math.min(width.value, height.value) * 0.3

    props.selectedGenus.species.forEach((sp, i) => {
      const angle =
        speciesCount === 1 ? -Math.PI / 2 : (2 * Math.PI * i) / speciesCount - Math.PI / 2
      newNodes.push({
        id: sp.id,
        label: sp.name,
        x: cx + Math.cos(angle) * orbitR,
        y: cy + Math.sin(angle) * orbitR,
        radius: 35,
        type: 'species',
        data: sp,
      })
      newEdges.push({ from: props.selectedGenus!.id, to: sp.id })
    })
  } else {
    // 总览：海龟总科居中，各属环绕
    newNodes.push({
      id: 'superfamily',
      label: '海龟总科',
      x: cx,
      y: cy,
      radius: 48,
      type: 'center',
    })

    const allGenera: TurtleGenus[] = []
    for (const f of props.families) {
      allGenera.push(...f.genera)
    }
    const total = allGenera.length
    const orbitR = Math.min(width.value, height.value) * 0.32

    allGenera.forEach((genus, i) => {
      const angle = (2 * Math.PI * i) / total - Math.PI / 2
      newNodes.push({
        id: genus.id,
        label: genus.name,
        x: cx + Math.cos(angle) * orbitR,
        y: cy + Math.sin(angle) * orbitR,
        radius: 35,
        type: 'genus',
        data: genus as unknown as TurtleSpecies,
      })
      newEdges.push({ from: 'superfamily', to: genus.id })
    })
  }

  nodes = newNodes
  edges = newEdges
}

function draw() {
  const canvas = canvasRef.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  const dpr = window.devicePixelRatio || 1
  canvas.width = width.value * dpr
  canvas.height = height.value * dpr
  ctx.scale(dpr, dpr)

  time += 0.005
  const w = width.value
  const h = height.value

  // 背景渐变
  const bgGrad = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, Math.max(w, h) * 0.7)
  bgGrad.addColorStop(0, '#0f2744')
  bgGrad.addColorStop(1, '#071428')
  ctx.fillStyle = bgGrad
  ctx.fillRect(0, 0, w, h)

  // 星空
  for (let i = 0; i < 80; i++) {
    const sx = (i * 137.5 + 50) % w
    const sy = (i * 97.3 + 30) % h
    const flicker = 0.4 + 0.6 * Math.sin(time * 2 + i * 0.7)
    ctx.fillStyle = `rgba(180, 210, 255, ${0.15 * flicker})`
    ctx.beginPath()
    ctx.arc(sx, sy, 1.2, 0, Math.PI * 2)
    ctx.fill()
  }

  // 连接线
  edges.forEach((edge, idx) => {
    const from = nodes.find((n) => n.id === edge.from)
    const to = nodes.find((n) => n.id === edge.to)
    if (!from || !to) return

    const pulse = 0.4 + 0.3 * Math.sin(time * 3 + idx * 0.8)
    ctx.strokeStyle = `rgba(100, 180, 255, ${pulse})`
    ctx.lineWidth = 1.5
    ctx.beginPath()
    ctx.moveTo(from.x, from.y)
    ctx.lineTo(to.x, to.y)
    ctx.stroke()

    // 流动光点
    const dotP = (time * 0.5 + idx * 0.3) % 1
    const dotX = from.x + (to.x - from.x) * dotP
    const dotY = from.y + (to.y - from.y) * dotP
    ctx.fillStyle = 'rgba(140, 200, 255, 0.8)'
    ctx.beginPath()
    ctx.arc(dotX, dotY, 2, 0, Math.PI * 2)
    ctx.fill()
  })

  // 节点
  nodes.forEach((node, idx) => {
    const isHovered = hoveredNode.value === node.id
    const pulseScale = 1 + 0.03 * Math.sin(time * 2 + idx)
    const r = node.radius * pulseScale * (isHovered ? 1.15 : 1)

    // 外发光
    if (node.type === 'center' || isHovered) {
      const glowGrad = ctx.createRadialGradient(node.x, node.y, r * 0.5, node.x, node.y, r * 2)
      glowGrad.addColorStop(0, 'rgba(80, 160, 255, 0.25)')
      glowGrad.addColorStop(1, 'rgba(80, 160, 255, 0)')
      ctx.fillStyle = glowGrad
      ctx.beginPath()
      ctx.arc(node.x, node.y, r * 2, 0, Math.PI * 2)
      ctx.fill()
    }

    // 节点圆
    const nodeGrad = ctx.createRadialGradient(
      node.x - r * 0.2,
      node.y - r * 0.2,
      0,
      node.x,
      node.y,
      r,
    )
    if (node.type === 'center') {
      nodeGrad.addColorStop(0, '#4a9eff')
      nodeGrad.addColorStop(1, '#1a5caa')
    } else if (node.type === 'genus') {
      nodeGrad.addColorStop(0, '#2a6eb8')
      nodeGrad.addColorStop(1, '#154080')
    } else {
      nodeGrad.addColorStop(0, '#2878b8')
      nodeGrad.addColorStop(1, '#1a5090')
    }
    ctx.fillStyle = nodeGrad
    ctx.beginPath()
    ctx.arc(node.x, node.y, r, 0, Math.PI * 2)
    ctx.fill()

    // 边框
    ctx.strokeStyle = isHovered ? 'rgba(140, 210, 255, 0.9)' : 'rgba(100, 180, 255, 0.5)'
    ctx.lineWidth = isHovered ? 2.5 : 1.5
    ctx.stroke()

    // 文字
    ctx.fillStyle = '#ffffff'
    ctx.font =
      node.type === 'center' ? 'bold 15px system-ui, sans-serif' : '13px system-ui, sans-serif'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(node.label, node.x, node.y)
  })

  animationId = requestAnimationFrame(draw)
}

function onMouseMove(e: MouseEvent) {
  const canvas = canvasRef.value
  if (!canvas) return
  const rect = canvas.getBoundingClientRect()
  const mx = e.clientX - rect.left
  const my = e.clientY - rect.top

  let found: string | null = null
  for (const node of nodes) {
    const dx = mx - node.x
    const dy = my - node.y
    if (Math.sqrt(dx * dx + dy * dy) <= node.radius * 1.2) {
      found = node.id
      break
    }
  }
  hoveredNode.value = found
  canvas.style.cursor = found ? 'pointer' : 'default'
}

function onClick(e: MouseEvent) {
  const canvas = canvasRef.value
  if (!canvas) return
  const rect = canvas.getBoundingClientRect()
  const mx = e.clientX - rect.left
  const my = e.clientY - rect.top

  for (const node of nodes) {
    const dx = mx - node.x
    const dy = my - node.y
    if (Math.sqrt(dx * dx + dy * dy) <= node.radius * 1.2) {
      if (node.type === 'genus') {
        for (const family of props.families) {
          const genus = family.genera.find((g) => g.id === node.id)
          if (genus) {
            emit('selectGenus', genus)
            break
          }
        }
      } else if (node.type === 'species' && node.data) {
        emit('selectSpecies', node.data as TurtleSpecies)
      }
      break
    }
  }
}

function updateSize() {
  if (!containerRef.value) return
  width.value = containerRef.value.clientWidth
  height.value = containerRef.value.clientHeight
}

let resizeObserver: ResizeObserver | null = null

onMounted(() => {
  updateSize()
  buildGraph()
  animationId = requestAnimationFrame(draw)

  if (containerRef.value) {
    resizeObserver = new ResizeObserver(() => {
      updateSize()
      buildGraph()
    })
    resizeObserver.observe(containerRef.value)
  }
})

onBeforeUnmount(() => {
  cancelAnimationFrame(animationId)
  resizeObserver?.disconnect()
})

watch(
  () => [props.selectedGenus, width.value, height.value],
  () => {
    buildGraph()
  },
)
</script>

<template>
  <div ref="containerRef" class="graph-container">
    <canvas
      ref="canvasRef"
      :style="{ width: width + 'px', height: height + 'px' }"
      @mousemove="onMouseMove"
      @click="onClick"
    />
  </div>
</template>

<style scoped>
.graph-container {
  width: 100%;
  height: 100%;
  min-height: 500px;
  position: relative;
}
</style>
