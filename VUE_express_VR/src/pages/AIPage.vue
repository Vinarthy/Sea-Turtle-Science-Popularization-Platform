<template>
  <div class="page-header">
    <h1 class="main-title">海龟智能识别系统</h1>
    <div class="flow-title">
      <span>放入海龟照片</span>
      <span class="arrow">→</span>
      <span>识别海龟种类</span>
    </div>
  </div>
  <div class="detection-container">
    <div class="main-wrapper">
      <!-- 左侧栏 -->
      <div class="sidebar">
        <div class="menu-section">
          <h3 class="menu-title">
            <span class="icon">📊</span>
            <span>图像检测</span>
          </h3>
        </div>

        <div class="menu-item">
          <span class="icon">🔍</span>
          <span>识别分析</span>
        </div>

        <div class="model-info">
          <span class="icon">⚠️</span>
          <span class="text">连接模型信息</span>
        </div>

        <div class="model-detail">
          <p>yolov8-目标检测(优秀)</p>
        </div>

        <div class="upload-area" @click="triggerUpload" @dragover.prevent @drop="handleDrop">
          <div class="upload-icon">☁️</div>
          <p class="upload-text">点击上传</p>
          <p class="file-info" v-if="uploadedFile">已选择: {{ uploadedFile.name }}</p>
          <p class="file-info" v-else>支持: jpg,png</p>
          <input
            type="file"
            ref="fileInput"
            @change="handleFileSelect"
            accept="image/*"
            style="display: none"
          />
        </div>

        <button class="detect-btn" @click="startDetection" :disabled="!uploadedFile || isLoading">
          {{ isLoading ? '检测中...' : '开始检测' }}
        </button>
      </div>

      <!-- 中央预览区 -->
      <div class="preview-section">
        <div class="image-preview">
          <img v-if="previewUrl" :src="previewUrl" alt="Preview" class="preview-img" />
          <div v-else class="no-image">
            <p>选择图像进行检测</p>
          </div>

          <div v-if="isLoading" class="loading-overlay">
            <div class="spinner"></div>
            <p>检测中...</p>
          </div>

          <div v-if="detectionResult" class="result-badge">
            <span class="badge-title">{{ detectionResult.category }}</span>
          </div>
        </div>
      </div>

      <!-- 右侧结果面板 -->
      <div class="results-panel" v-if="detectionResult">
        <div class="panel-header">
          <span class="icon">📋</span>
          <span>检测详情</span>
        </div>

        <div class="confidence-section">
          <p class="label">置信度</p>
          <p class="value">{{ detectionResult.confidence }}%</p>
        </div>

        <div class="category-section">
          <div class="category-title">主要识别结果</div>
          <div class="category-name">{{ detectionResult.category }}</div>
        </div>

        <div class="info-section">
          <p class="info-text">
            {{ detectionResult.description }}
          </p>
        </div>
      </div>
    </div>
  </div>
  <div class="main-wrapper history-wrapper">
    <div class="history-section">
      <h3>检测记录（最近10条）</h3>

      <div v-for="item in historyList" :key="item.id" class="history-item">
        <div class="history-info">
          <div>{{ item.detect_time }}</div>
          <div>物种：{{ item.class_name }}</div>
          <div>置信度：{{ (item.confidence * 100).toFixed(1) }}%</div>
        </div>

        <button
          @click="previewUrl = `http://localhost:8000${item.result_img_path}`"
          class="view-btn"
        >
          查看结果图
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface DetectionResult {
  category: string
  confidence: number
  description: string
}

const uploadedFile = ref<File | null>(null)
const previewUrl = ref<string | null>(null)
const isLoading = ref<boolean>(false)
const detectionResult = ref<DetectionResult | null>(null)

const fileInput = ref<HTMLInputElement | null>(null)

// 点击上传（触发隐藏的 file input）
const triggerUpload = (): void => {
  fileInput.value?.click()
}

// 选择文件处理
const handleFileSelect = (e: Event) => {
  const target = e.target as HTMLInputElement
  const file = target.files?.[0]
  if (file) {
    uploadedFile.value = file
    previewUrl.value = URL.createObjectURL(file)
  }
}

// 处理拖拽事件
const handleDrop = (e: DragEvent) => {
  e.preventDefault()
  const files = e.dataTransfer?.files
  if (files && files[0]) {
    uploadedFile.value = files[0]
    previewUrl.value = URL.createObjectURL(files[0])
  }
}

// 开始检测
const startDetection = async () => {
  if (!uploadedFile.value) {
    console.log('没有选择文件')
    return
  }

  isLoading.value = true
  detectionResult.value = null

  const formData = new FormData()
  formData.append('image', uploadedFile.value)

  try {
    const response = await fetch('/api/detect', {
      method: 'POST',
      body: formData,
    })

    if (!response.ok) {
      throw new Error('检测请求失败')
    }

    const data = await response.json()
    console.log('后端返回数据:', data)

    // ✅ 关键新增：替换为带框图片
    previewUrl.value = `http://localhost:8000${data.image_url}`
    detectionResult.value = {
      category: data.detections[0]?.label || '未知',
      confidence: data.detections[0]?.confidence * 100 || 0,
      description: '请填写物种描述',
    }
  } catch (error) {
    console.error('检测失败', error)
    alert('检测失败，请重试')
  } finally {
    isLoading.value = false
  }
  await loadHistory()
}
//新增数据库以及种种
interface HistoryItem {
  id: number
  detect_time: string
  class_name: string
  confidence: number
  result_img_path: string
}
const historyList = ref<HistoryItem[]>([])
const loadHistory = async () => {
  try {
    const res = await fetch('/api/history')
    const data = await res.json()
    historyList.value = data.records
  } catch (err) {
    console.error('获取历史失败', err)
  }
}
onMounted(() => {
  loadHistory()
})
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.detection-container {
  min-height: 80vh;
  background-color: #f5f5f5;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  padding-bottom: 0;
}

/* 顶部蓝色条 */
.header-bar {
  height: 40px;
  background: linear-gradient(90deg, #0052cc 0%, #0084ff 50%, #00d4ff 100%);
  border-radius: 0 0 16px 16px;
}

/* 主容器 */
.main-wrapper {
  display: flex;
  gap: 20px;
  padding: 20px;
  max-width: 1400px;
  margin: 0 auto;
}

/* 左侧栏 */
.sidebar {
  width: 200px;
  background: white;
  border-radius: 12px;
  padding: 40px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.menu-section {
  margin-bottom: 20px;
  padding-bottom: 12px;
  border-bottom: 2px solid #0052cc;
}

.menu-title {
  font-size: 14px;
  font-weight: 650;
  color: #0052cc;
  display: flex;
  align-items: center;
  gap: 6px;
}

.icon {
  font-size: 16px;
}

.menu-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px;
  color: #666;
  font-size: 14px;
  margin-bottom: 10px;
  cursor: pointer;
  border-radius: 6px;
  transition: background-color 0.2s;
}

.menu-item:hover {
  background-color: #f0f0f0;
}

.model-info {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  padding: 12px;
  background-color: #fff3e0;
  border-radius: 6px;
  margin-bottom: 10px;
  font-size: 13px;
  color: #666;
}

.model-detail {
  font-size: 12px;
  color: #999;
  padding: 0 0 20px 0;
  line-height: 1.6;
}

/* 上传区域 */
.upload-area {
  border: 2px dashed #ddd;
  border-radius: 8px;
  padding: 20px;
  text-align: center;
  margin-bottom: 15px;
  cursor: pointer;
  transition: all 0.3s;
  background-color: #f9f9f9;
}

.upload-area:hover {
  border-color: #0052cc;
  background-color: #f0f7ff;
}

.upload-icon {
  font-size: 32px;
  margin-bottom: 8px;
}

.upload-text {
  font-size: 14px;
  color: #0052cc;
  font-weight: 600;
  margin-bottom: 6px;
}

.file-info {
  font-size: 11px;
  color: #999;
}

/* 检测按钮 */
.detect-btn {
  width: 100%;
  padding: 12px;
  background-color: #0052cc;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.detect-btn:hover:not(:disabled) {
  background-color: #0040b3;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 82, 204, 0.3);
}

.detect-btn:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

/* 中央预览区 */
.preview-section {
  flex: 1;
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  display: flex;
  align-items: center;
  justify-content: center;
}

.image-preview {
  position: relative;
  width: 100%;
  max-width: 500px;
  aspect-ratio: 16 / 9;
  border-radius: 8px;
  overflow: hidden;
  background-color: #f0f0f0;
}

.preview-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.no-image {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  color: #999;
  font-size: 16px;
}

/* 加载动画 */
.loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.loading-overlay p {
  color: white;
  font-size: 14px;
}

/* 结果徽章 */
.result-badge {
  position: absolute;
  top: 12px;
  right: 12px;
  background-color: #00d4ff;
  color: #0052cc;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
}

/* 右侧结果面板 */
.results-panel {
  width: 240px;
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  align-self: stretch;
}

.panel-header {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 2px solid #e0e0e0;
}

.confidence-section {
  text-align: center;
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 1px solid #e0e0e0;
}

.confidence-section .label {
  font-size: 12px;
  color: #999;
  margin-bottom: 4px;
}

.confidence-section .value {
  font-size: 28px;
  font-weight: 700;
  color: #0052cc;
}

.category-section {
  margin-bottom: 16px;
  padding-bottom: 16px;
  border-bottom: 1px solid #e0e0e0;
}

.category-title {
  font-size: 12px;
  color: #999;
  margin-bottom: 6px;
}

.category-name {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin-bottom: 6px;
}

.category-section p {
  font-size: 12px;
  color: #666;
  line-height: 1.6;
}

.info-section {
  margin-top: 16px;
}

.info-text {
  font-size: 12px;
  color: #666;
  line-height: 1.6;
}

/* 响应式设计 */
@media (max-width: 1200px) {
  .main-wrapper {
    flex-direction: column;
  }

  .sidebar {
    width: 100%;
  }

  .results-panel {
    width: 100%;
    min-height: auto;
  }
  .preview-section {
    min-height: 300px;
  }
}

/*历史记录的css部分*/
/* 历史记录区域 - 改成和上面一样的卡片风格 */
.history-section {
  margin: 20px auto; /* 和主内容区对齐 + 适当间距 */
  max-width: 1400px; /* 与 .main-wrapper 宽度一致 */
  width: 100%;
  background: inherit;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08); /* 和其他卡片一样的阴影 */
  padding: 20px;
  box-sizing: border-box;
}

/* 标题样式统一 */
.history-section h3 {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin: 0 0 16px 0; /* 标题和内容间距 */
  padding-bottom: 12px;
  border-bottom: 1px solid #e8e8e8; /* 加一条分割线，更像卡片 */
}

/* 每条记录的样式 - 更像列表项 */
.history-item {
  display: flex;
  justify-content: space-between;
  align-items: center; /* 垂直居中对齐 */
  padding: 12px 0;
  border-bottom: 1px solid #f0f0f0;
}

.history-item:last-child {
  border-bottom: none; /* 最后一条不要下边框 */
}

.history-info {
  flex: 1;
  font-size: 14px;
  color: #444;
  line-height: 1.6;
}

.history-info div {
  margin-bottom: 4px;
}

.view-btn {
  background: #0052cc;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 13px;
  cursor: pointer;
  transition: background 0.2s;
  white-space: nowrap;
}

.view-btn:hover {
  background: #0040b3;
}
.page-header {
  text-align: center;
  padding: 30px 20px 10px 20px;
}

.main-title {
  font-size: 26px;
  font-weight: 700;
  color: #0052cc;
  margin-bottom: 10px;
}

.flow-title {
  font-size: 16px;
  color: #666;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  font-weight: 500;
}

.arrow {
  color: #0052cc;
  font-weight: 700;
}
</style>
