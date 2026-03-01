<template>
  <aside class="sidebar">
    <div class="menu-items">
      <div class="menu-item"></div>
      <div class="menu-item"></div>
      <div class="menu-item"></div>
      <div class="menu-item"></div>
      <div class="menu-item"></div>
    </div>
  </aside>
</template>

<style scoped>
.sidebar {
  width: 120px;
  background-color: #f5f5f5;
  padding: 40px 20px;
  border-right: 1px solid #e0e0e0;
}

.menu-items {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.menu-item {
  width: 60px;
  height: 40px;
  background-color: #003366;
  border-radius: 8px;
  opacity: 0.8;
  transition: opacity 0.3s ease;
}

.menu-item:hover {
  opacity: 1;
}
</style>
