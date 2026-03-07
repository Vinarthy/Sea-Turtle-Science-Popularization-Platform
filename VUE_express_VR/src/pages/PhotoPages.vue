<template>
  <div class="head">
    <header class="page-header">
      <h1>海龟3d模型网页呈现</h1>
    </header>
    <div class="photos-page">
      <div class="grid-container">
        <PhotoCard
          v-for="(photo, index) in photos"
          :key="index"
          :image="photo.image"
          :model="photo.model"
          :label="photo.label"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import PhotoCard from '@/components/PhotoCard.vue'

import img_daimaogui from '../images/daimaogui (37).jpg'
import img_honghaigui from '../images/honghaigui (16).jpg'
import img_lengpigui from '../images/lengpigui (8).jpg'
import img_lvhaigui from '../images/lvhaigui (7).jpg'
import img_pingbeigui from '../images/pingbeigui.png'
import img_ligui from '../images/ligui.jpg'

// import model_daimaogui from '/models/daimao.fbx'
// import model_honghaigui from '/models/honghaigui.fbx'
// import model_lengpigui from '/models/lengpigui.fbx'
// import model_lvhaigui from '/models/lvhaigui.fbx'

const photos = ref([
  {
    image: img_daimaogui,
    model: '/models/daimao.fbx',
    label: '玳瑁龟',
  },
  {
    image: img_honghaigui,
    model: '/models/honghaigui.fbx',
    label: '红海龟',
  },
  {
    image: img_lengpigui,
    model: '/models/lengpigui.fbx',
    label: '棱皮龟',
  },
  {
    image: img_lvhaigui,
    model: '/models/lvhaigui.fbx',
    label: '绿海龟',
  },
  {
    image: img_pingbeigui,
    model: '/models/pingbeigui.fbx',
    label: '平背龟',
  },
  {
    image: img_ligui,
    model: '/models/ligui.fbx',
    label: '丽龟',
  },
])
</script>

<style scoped>
.photos-page {
  width: 100%;
  background: #f5f7fa;
  padding-bottom: 40px;
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, 300px);
  justify-content: center;
  gap: 50px;
  padding: 20px;
}
.page-header {
  text-align: center;
  padding: 24px 16px;
}
.page-header h1 {
  font-size: 32px;
  font-weight: 700;
  color: #1a1a1a;
  letter-spacing: 1px;
}
@media (max-width: 1024px) {
  .grid-container {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .grid-container {
    grid-template-columns: 1fr;
  }
}
</style>
