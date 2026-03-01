<template>
  <footer class="footer">
    <nav class="nav-container">
      <button @click="$emit('navigate', 'home')" class="nav-item">首页</button>
      <button @click="$emit('navigate', 'photos')" class="nav-item">海龟模型及照片</button>
      <button @click="$emit('navigate', 'vr')" class="nav-item">VR场景</button>
      <button @click="$emit('navigate', 'habitat')" class="nav-item">海龟栖息地及迁移路线</button>
      <button @click="$emit('navigate', 'AI')" class="nav-item">海龟AI识别</button>
    </nav>
  </footer>
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
