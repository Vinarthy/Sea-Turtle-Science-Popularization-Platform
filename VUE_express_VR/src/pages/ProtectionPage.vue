<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface ArticleCard {
  id: number
  title: string
  cover: string
}

const articles = ref<ArticleCard[]>([])
const currentCategory = ref('threat')

const categories = [
  { key: 'threat', title: '海龟面临的主要威胁' },
  { key: 'china', title: '中国对海龟的保护行为' },
  { key: 'research', title: '保护技术和科学研究' },
  { key: 'action', title: '我们可以怎么做' },
]

async function loadArticles(category: string) {
  currentCategory.value = category
  // 模拟数据加载时的重置效果（可选）
  articles.value = []

  try {
    const res = await fetch('/api/articles?category=' + category)
    if (res.ok) {
      articles.value = await res.json()
    } else {
      console.error('Failed to fetch articles')
      // 如果没有后端，这里可以放一些假数据用于测试动画效果
      /*
      articles.value = [
        { id: 1, title: '测试文章1', cover: 'https://via.placeholder.com/300x200' },
        { id: 2, title: '测试文章2', cover: 'https://via.placeholder.com/300x200' },
        { id: 3, title: '测试文章3', cover: 'https://via.placeholder.com/300x200' },
      ]
      */
    }
  } catch (e) {
    console.error(e)
  }
}

// 页面加载时自动调用
onMounted(() => {
  loadArticles('threat')
})
</script>

<template>
  <div class="page">
    <h1 class="title fade-in">海龟保护行动</h1>

    <div class="category-grid">
      <div
        v-for="(c, index) in categories"
        :key="c.key"
        class="category-card float-up"
        :style="{ animationDelay: index * 0.1 + 's' }"
        @click="loadArticles(c.key)"
      >
        <h3>{{ c.title }}</h3>
      </div>
    </div>

    <div class="article-grid">
      <div
        v-for="(a, index) in articles"
        :key="a.id"
        class="article-card float-up"
        :style="{ animationDelay: 0.4 + index * 0.15 + 's' }"
      >
        <img :src="a.cover" alt="cover" />
        <h4>{{ a.title }}</h4>
        <router-link :to="'/article/' + a.id"> 阅读 </router-link>
      </div>
    </div>

    <!-- 如果列表为空，显示一个占位提示，也会带动画 -->
    <div v-if="articles.length === 0" class="empty-state float-up" style="animation-delay: 0.5s">
      加载中...
    </div>
  </div>
</template>

<style scoped>
/* 1. 设置蓝白渐变背景 */
.page {
  min-height: 100vh; /* 确保背景铺满全屏 */
  padding: 60px 40px;
  text-align: center;
  /* 从上到下的线性渐变：浅蓝 (#e0f7fa) 到 纯白 (#ffffff) */
  background: linear-gradient(180deg, #54bcc9 0%, #eef9f9 100%);
  color: #0f3a63;
}

.title {
  font-size: 40px;
  margin-bottom: 40px;
  color: #0f3a63;
  font-weight: bold;
}

/* 网格布局保持不变 */
.category-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px;
  margin-bottom: 50px;
}

.article-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, 260px);
  gap: 30px;
  justify-content: center;
}

/* 卡片基础样式 */
.category-card,
.article-card {
  background: rgba(255, 255, 255, 0.9); /* 稍微透明一点，更有层次感 */
  border-radius: 16px;
  padding: 30px;
  box-shadow: 0 8px 20px rgba(15, 58, 99, 0.1); /* 阴影带一点蓝色调 */
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
  cursor: pointer;

  /* 2. 应用动画：名字 时长 曲线 填充模式 */
  opacity: 0; /* 初始状态隐藏 */
  animation: floatUp 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
}

.category-card:hover,
.article-card:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 0 12px 25px rgba(15, 58, 99, 0.15);
}

.article-card img {
  width: 100%;
  height: 160px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 10px;
}

.article-card h4 {
  padding: 10px 0;
  font-size: 16px;
  line-height: 1.4;
  color: #333;
}

.article-card a {
  display: block;
  padding-top: 10px;
  color: #0f6aa6;
  text-decoration: none;
  font-weight: 500;
}

.article-card a:hover {
  text-decoration: underline;
}

.empty-state {
  grid-column: 1 / -1;
  padding: 20px;
  color: #666;
}

/* 3. 定义关键帧动画：从下方浮现并变清晰 */
@keyframes floatUp {
  0% {
    opacity: 0;
    transform: translateY(40px); /* 初始位置在下方 40px */
  }
  100% {
    opacity: 1;
    transform: translateY(0); /* 最终位置归位 */
  }
}

/* 标题也可以加一个简单的淡入效果 */
.fade-in {
  animation: fadeIn 1s ease-out forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 响应式调整：小屏幕上分类网格变为2列或1列 */
@media (max-width: 768px) {
  .category-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 480px) {
  .category-grid {
    grid-template-columns: 1fr;
  }
  .page {
    padding: 30px 20px;
  }
}
</style>
