<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import * as THREE from 'three'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

const props = defineProps<{
  image: string
  model: string
  label: string
}>()

const is3D = ref(false)
const containerRef = ref<HTMLDivElement | null>(null)

let scene: THREE.Scene
let camera: THREE.PerspectiveCamera
let renderer: THREE.WebGLRenderer
let controls: OrbitControls
let animationId: number

function init3D() {
  if (!containerRef.value) return

  const width = containerRef.value.clientWidth
  const height = containerRef.value.clientHeight

  scene = new THREE.Scene()
  scene.background = new THREE.Color(0xf5f5f5)

  camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000)
  camera.position.set(0, 1.5, 4)

  renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setSize(width, height)
  containerRef.value.appendChild(renderer.domElement)

  controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true
  controls.dampingFactor = 0.05

  controls.enablePan = false
  controls.minDistance = 2
  controls.maxDistance = 10
  renderer.setSize(width, height)
  containerRef.value.appendChild(renderer.domElement)

  const light = new THREE.DirectionalLight(0xffffff, 1)
  light.position.set(5, 5, 5)
  scene.add(light)
  scene.add(new THREE.AmbientLight(0xffffff, 0.6))

  const loader = new FBXLoader()
  loader.load(props.model, (object) => {
    object.scale.set(0.03, 0.03, 0.03)
    object.position.set(0, 1, -1)
    scene.add(object)
    animate()
  })
}

function animate() {
  animationId = requestAnimationFrame(animate)
  controls.update()
  renderer.render(scene, camera)
}

function toggle3D() {
  is3D.value = !is3D.value
  if (is3D.value) {
    setTimeout(init3D)
  } else {
    destroy3D()
  }
}

function destroy3D() {
  if (renderer) {
    renderer.dispose()
    renderer.domElement.remove()
  }

  if (controls) {
    controls.dispose()
  }

  cancelAnimationFrame(animationId)
}

onBeforeUnmount(destroy3D)
</script>

<template>
  <div class="photo-card">
    <!-- 2D 图片 -->
    <img v-if="!is3D" :src="image" class="photo-img" />

    <!-- 3D 容器 -->
    <div v-else ref="containerRef" class="model-container"></div>

    <div class="info">
      <span>{{ label }}</span>
      <button @click="toggle3D">
        {{ is3D ? '返回图片' : '3D' }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.photo-card {
  display: flex;
  flex-direction: column;
  gap: 10px;
  transition:
    transform 0.25s ease,
    box-shadow 0.25s ease;
}
.photo-card:hover {
  transform: translateY(-6px) scale(1.02);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.18);
}
.photo-img,
.model-container {
  width: 100%;
  height: 280px;
  border-radius: 12px;
  background: #eee;
}

.info {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

button {
  padding: 6px 12px;
  border-radius: 8px;
  background: black;
  color: white;
  cursor: pointer;
}
</style>
