<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface Video {
  id: number
  title: string
  url: string
  description: string
}

const videos = ref<Video[]>([])

async function loadVideos() {
  const res = await fetch('/api/videos')
  const data = await res.json()
  videos.value = data
}

onMounted(loadVideos)
</script>

<template>
  <div class="video-section">
    <div class="container">
      <h2 class="video-title">海龟生命周期的影像资料</h2>

      <div class="video-grid">
        <div v-for="video in videos" :key="video.id" class="video-card">
          <video class="video-player" controls :src="video.url"></video>

          <div class="video-info">
            <h3>{{ video.title }}</h3>
            <p>{{ video.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 1100px;
  margin: auto;
}
.video-section {
  padding: 80px 20px;
  background: #ffffff;
}

.video-title {
  text-align: center;
  font-size: 32px;
  font-weight: bold;
  color: #003366;
  margin-bottom: 40px;
}

.video-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 40px;
}

.video-card {
  background: #ffffff;
  padding: 20px;
  border-radius: 8px;
}

.video-player {
  width: 100%;
  display: block; /* 1. 将视频设为块级元素 */
  margin: 0 auto; /* 2. 水平居中 */
  border-radius: 6px;
}

.video-info h3 {
  margin-top: 12px;
  font-size: 20px;
}

.video-info p {
  font-size: 14px;
  color: #666;
} /* 妈的为什么我的代码可读性那么差我好想死（ */
</style>
