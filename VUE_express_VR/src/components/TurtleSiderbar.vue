<script setup lang="ts">
import type { TurtleFamily, TurtleGenus, TurtleSpecies } from '@/lib/turtle-data'

defineProps<{
  families: TurtleFamily[]
  selectedGenus: TurtleGenus | null
}>()

const emit = defineEmits<{
  (e: 'selectGenus', genus: TurtleGenus): void
  (e: 'selectSpecies', species: TurtleSpecies): void
  (e: 'goBack'): void
}>()
</script>

<template>
  <div class="sidebar">
    <!-- 标题 -->
    <div class="sidebar-header">
      <div class="logo-circle">龟</div>
      <span class="logo-text">海龟分类图谱</span>
    </div>

    <!-- 搜索（占位） -->
    <div class="search-bar">
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.3-4.3" />
      </svg>
      <span>搜索图谱中的物种...</span>
    </div>

    <!-- 面包屑 -->
    <div class="breadcrumb">
      <button @click="emit('goBack')">龟鳖目</button>
      <span class="sep">&gt;</span>
      <button @click="emit('goBack')">海龟总科</button>
      <template v-if="selectedGenus">
        <span class="sep">&gt;</span>
        <span class="active">{{ selectedGenus.family }}</span>
        <span class="sep">&gt;</span>
        <span class="active">{{ selectedGenus.name }}</span>
      </template>
    </div>

    <!-- 列表内容 -->
    <div class="list-content">
      <!-- 选中属：显示下属物种 -->
      <template v-if="selectedGenus">
        <div class="list-header">
          <h3>
            {{ selectedGenus.name }}
            <span class="count">下属分类 {{ selectedGenus.species.length }} 个</span>
          </h3>
        </div>
        <button
          v-for="sp in selectedGenus.species"
          :key="sp.id"
          class="list-item"
          @click="emit('selectSpecies', sp)"
        >
          <span class="dot"></span>
          <span>{{ sp.name }}</span>
          <span v-if="sp.alias" class="alias">({{ sp.alias }})</span>
        </button>
      </template>

      <!-- 总览：显示所有科/属 -->
      <template v-else>
        <div v-for="family in families" :key="family.id" class="family-group">
          <div class="list-header">
            <h3>
              {{ family.name }}
              <span class="count">{{ family.genera.length }} 属</span>
            </h3>
          </div>
          <button
            v-for="genus in family.genera"
            :key="genus.id"
            class="list-item"
            @click="emit('selectGenus', genus)"
          >
            <span class="dot"></span>
            <span>{{ genus.name }}</span>
            <span class="species-count">{{ genus.species.length }} 种</span>
          </button>
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped>
.sidebar {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  background-color: #0d1f3c;
  color: #c8daf0;
}

.sidebar-header {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 16px;
}
.logo-circle {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #1a5caa;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 700;
}
.logo-text {
  font-weight: 700;
  font-size: 15px;
  color: #e0ecf8;
}

.search-bar {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0 16px 12px;
  padding: 8px 12px;
  border-radius: 6px;
  background-color: #152d50;
  color: #7a9cc0;
  font-size: 13px;
}

.breadcrumb {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 4px;
  padding: 0 16px 8px;
  font-size: 12px;
  color: #6a8ab0;
}
.breadcrumb button {
  background: none;
  border: none;
  color: #6a8ab0;
  cursor: pointer;
  padding: 0;
  font-size: 12px;
}
.breadcrumb button:hover {
  text-decoration: underline;
}
.breadcrumb .sep {
  flex-shrink: 0;
}
.breadcrumb .active {
  color: #a0c0e0;
}

.list-content {
  flex: 1;
  overflow-y: auto;
  padding: 0 16px 16px;
}
.family-group {
  margin-bottom: 16px;
}
.list-header {
  padding: 8px 0;
  margin-bottom: 4px;
  border-bottom: 1px solid #1a3a60;
}
.list-header h3 {
  font-size: 13px;
  font-weight: 700;
  color: #e0ecf8;
  margin: 0;
}
.count {
  font-weight: 400;
  margin-left: 4px;
  color: #7a9cc0;
}

.list-item {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  text-align: left;
  padding: 8px;
  border-radius: 6px;
  font-size: 13px;
  color: #c8daf0;
  background: none;
  border: none;
  cursor: pointer;
  transition: background 0.15s;
}
.list-item:hover {
  background-color: #1a3a60;
}
.dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: #4a9eff;
  flex-shrink: 0;
}
.alias {
  font-size: 12px;
  color: #6a8ab0;
}
.species-count {
  font-size: 12px;
  color: #6a8ab0;
  margin-left: auto;
}
</style>
