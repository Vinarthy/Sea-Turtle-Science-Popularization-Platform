<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import TurtleGraph from '@/components/TurtleGraph.vue'
import TurtleSidebar from '@/components/TurtleSiderbar.vue'
import TurtleDetailPanel from '@/components/TurtleDetailPanel.vue'
import { turtleFamilies } from '@/lib/turtle-data'
import type { TurtleGenus, TurtleSpecies } from '@/lib/turtle-data'

const router = useRouter()

const selectedGenus = ref<TurtleGenus | null>(null)
const selectedSpecies = ref<TurtleSpecies | null>(null)

function handleSelectGenus(genus: TurtleGenus) {
  selectedGenus.value = genus
  selectedSpecies.value = null
}

function handleSelectSpecies(species: TurtleSpecies) {
  selectedSpecies.value = species
}

function handleGoBack() {
  selectedGenus.value = null
  selectedSpecies.value = null
}

function handleCloseDetail() {
  selectedSpecies.value = null
}
</script>

<template>
  <div class="classification-page">
    <!-- 顶部导航栏 -->
    <div class="top-bar">
      <router-link to="/habitat" class="back-link">
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
          <path d="m12 19-7-7 7-7" />
          <path d="M19 12H5" />
        </svg>
        <span>返回主页</span>
      </router-link>

      <button v-if="selectedGenus" class="back-level-btn" @click="handleGoBack">
        &lt; 上一层级：海龟总科
      </button>
    </div>

    <!-- 主内容区 -->
    <div class="main-area">
      <!-- 左侧边栏 -->
      <div class="left-sidebar">
        <TurtleSidebar
          :families="turtleFamilies"
          :selected-genus="selectedGenus"
          @select-genus="handleSelectGenus"
          @select-species="handleSelectSpecies"
          @go-back="handleGoBack"
        />
      </div>

      <!-- 中间图谱 -->
      <div class="center-graph">
        <TurtleGraph
          :families="turtleFamilies"
          :selected-genus="selectedGenus"
          @select-genus="handleSelectGenus"
          @select-species="handleSelectSpecies"
        />
      </div>

      <!-- 右侧详情面板 -->
      <div v-if="selectedSpecies" class="right-panel">
        <TurtleDetailPanel :species="selectedSpecies" @close="handleCloseDetail" />
      </div>
    </div>

    <!-- 底部状态栏 -->
    <div class="bottom-bar">
      <div class="breadcrumb-info">
        <span>
          龟鳖目 &gt; 海龟总科
          <template v-if="selectedGenus">
            &gt; {{ selectedGenus.family }} &gt; {{ selectedGenus.name }}
          </template>
        </span>
      </div>
      <div class="relation-info">
        <span>全部关系</span>
        <span class="relation-dot"></span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.classification-page {
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background-color: #071428;
}

/* 顶部栏 */
.top-bar {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 8px 16px;
  background-color: #0d1f3c;
  border-bottom: 1px solid #1a3a60;
  color: #c8daf0;
}
.back-link {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: #7ab0e0;
  text-decoration: none;
  transition: opacity 0.2s;
}
.back-link:hover {
  opacity: 0.8;
}
.back-level-btn {
  background: none;
  border: none;
  font-size: 13px;
  color: #7ab0e0;
  cursor: pointer;
  padding: 0;
  transition: opacity 0.2s;
}
.back-level-btn:hover {
  opacity: 0.8;
}

/* 主内容三栏 */
.main-area {
  flex: 1;
  display: flex;
  overflow: hidden;
}
.left-sidebar {
  width: 256px;
  flex-shrink: 0;
  border-right: 1px solid #1a3a60;
}
.center-graph {
  flex: 1;
  overflow: hidden;
}
.right-panel {
  width: 288px;
  flex-shrink: 0;
  border-left: 1px solid #1a3a60;
}

/* 底部栏 */
.bottom-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 16px;
  background-color: #0d1f3c;
  border-top: 1px solid #1a3a60;
  font-size: 12px;
  color: #6a8ab0;
}
.relation-info {
  display: flex;
  align-items: center;
  gap: 8px;
}
.relation-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: #4a9eff;
}
</style>
