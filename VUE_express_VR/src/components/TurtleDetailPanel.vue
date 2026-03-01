<script setup lang="ts">
import type { TurtleSpecies } from '@/lib/turtle-data'

defineProps<{
  species: TurtleSpecies
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()
</script>

<template>
  <div class="detail-panel">
    <!-- 标题栏 -->
    <div class="panel-header">
      <h2>{{ species.name }}</h2>
      <button class="close-btn" @click="emit('close')">
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
          <path d="M18 6 6 18" />
          <path d="m6 6 12 12" />
        </svg>
      </button>
    </div>

    <!-- 分类路径 -->
    <div class="taxonomy-path">
      {{ species.family }} &gt; {{ species.genus }} &gt;
      <span class="highlight">{{ species.name }}</span>
    </div>

    <!-- 内容区域 -->
    <div class="panel-body">
      <!-- 别名 -->
      <div v-if="species.alias" class="alias-tag">别名：{{ species.alias }}</div>

      <!-- 概述 -->
      <div class="info-section">
        <h4>物种概述</h4>
        <p>{{ species.description }}</p>
      </div>

      <!-- 信息卡片 -->
      <div class="info-cards">
        <div class="info-card">
          <div class="card-icon">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#4a9eff"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
              <path d="M2 12h20" />
            </svg>
          </div>
          <div>
            <div class="card-label">栖息地</div>
            <div class="card-value">{{ species.habitat }}</div>
          </div>
        </div>

        <div class="info-card">
          <div class="card-icon">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#4a9eff"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path
                d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"
              />
            </svg>
          </div>
          <div>
            <div class="card-label">保护状态</div>
            <div class="card-value">{{ species.conservation }}</div>
          </div>
        </div>

        <div class="info-card">
          <div class="card-icon">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#4a9eff"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path
                d="M21.3 15.3a2.4 2.4 0 0 1 0 3.4l-2.6 2.6a2.4 2.4 0 0 1-3.4 0L2.7 8.7a2.41 2.41 0 0 1 0-3.4l2.6-2.6a2.41 2.41 0 0 1 3.4 0Z"
              />
              <path d="m14.5 12.5 2-2" />
            </svg>
          </div>
          <div>
            <div class="card-label">体型</div>
            <div class="card-value">{{ species.size }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.detail-panel {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  background-color: #0d1f3c;
  color: #c8daf0;
}

.panel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  border-bottom: 1px solid #1a3a60;
}
.panel-header h2 {
  font-size: 15px;
  font-weight: 700;
  color: #e0ecf8;
  margin: 0;
}
.close-btn {
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  background: none;
  border: none;
  color: #c8daf0;
  cursor: pointer;
  transition: background 0.15s;
}
.close-btn:hover {
  background-color: #1a3a60;
}

.taxonomy-path {
  padding: 8px 16px;
  font-size: 12px;
  color: #6a8ab0;
}
.taxonomy-path .highlight {
  color: #a0c0e0;
}

.panel-body {
  flex: 1;
  overflow-y: auto;
  padding: 0 16px 16px;
}
.alias-tag {
  display: inline-block;
  padding: 2px 8px;
  font-size: 12px;
  border-radius: 999px;
  background-color: #1a3a60;
  color: #7ab0e0;
  margin-bottom: 12px;
}

.info-section {
  margin-bottom: 16px;
}
.info-section h4 {
  font-size: 12px;
  font-weight: 600;
  color: #7a9cc0;
  margin: 0 0 6px;
}
.info-section p {
  font-size: 13px;
  line-height: 1.6;
  color: #b0c8e0;
  margin: 0;
}

.info-cards {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.info-card {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 12px;
  border-radius: 8px;
  background-color: #152d50;
}
.card-icon {
  flex-shrink: 0;
  margin-top: 2px;
}
.card-label {
  font-size: 12px;
  font-weight: 600;
  color: #7a9cc0;
  margin-bottom: 2px;
}
.card-value {
  font-size: 13px;
  color: #b0c8e0;
}
</style>
