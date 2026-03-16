<template>
  <header class="header">
    <nav class="nav-container">
      <router-link to="/" class="nav-item">首页</router-link>
      <router-link to="/photo" class="nav-item">海龟模型及照片</router-link>
      <router-link to="/vr" class="nav-item">VR场景</router-link>
      <router-link to="/habitat" class="nav-item">海龟栖息地图谱</router-link>
      <router-link to="/protect" class="nav-item">海龟与保护</router-link>
      <router-link to="/ai" class="nav-item">海龟AI识别</router-link>
      <router-link to="/about" class="nav-item">关于</router-link>
    </nav>
  </header>
</template>

<script setup lang="ts">
defineEmits(['navigate'])
</script>

<style scoped>
.header {
  background-color: #003366;
  padding: 20px 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.nav-container {
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  gap: 60px;
  padding: 0 40px;
}

.nav-item {
  background: none;
  border: none;
  color: white;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  padding: 8px 0;
  border-bottom: 3px solid transparent;
  transition: border-color 0.3s ease;
}

.nav-item:hover {
  border-bottom-color: #4da6ff;
}
</style>
