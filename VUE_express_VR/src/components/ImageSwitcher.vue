<script setup lang="ts">
import { ref, onMounted } from 'vue'

const images = ref<string[]>([])
const current = ref(0)

// 海龟名字列表，按顺序对应图片
const turtleNames = ['Cinderella', 'Mabel', 'Martha']

onMounted(async () => {
  const res = await fetch('/api/updateturtle')
  const data = await res.json()
  images.value = data.map((item: any) => item.url)
})
</script>

<template>
  <div class="card">
    <!-- 标题文字 -->
    <div class="title">追踪来自拉塞佩德群岛的绿海龟（日更）</div>

    <img v-if="images.length" :src="images[current]" class="img" />

    <div class="btn-group">
      <button
        v-for="(name, index) in turtleNames"
        :key="index"
        :class="['btn', { active: current === index }]"
        @click="current = index"
      >
        {{ name }}
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

.title {
  text-align: center;
  font-size: 15px;
  font-weight: 600;
  color: #303133;
  margin: 4px 0 12px;
  line-height: 1.4;
}

.img {
  width: 100%;
  height: 260px;
  object-fit: cover;
  border-radius: 6px;
  display: block;
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
  white-space: nowrap;
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
