<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

interface Article {
  id: number
  title: string
  cover: string
  category: string
  subCategory: string
  content: string
}

const article = ref<Article | null>(null)

async function loadArticle() {
  const res = await fetch('/api/articles/' + route.params.id)
  article.value = await res.json()
}

function goBack() {
  router.push('/protect')
}

onMounted(loadArticle)
</script>

<template>
  <div class="article-page">
    <!-- 顶部背景 -->
    <div class="top-bg"></div>

    <div class="container" v-if="article">
      <button class="back-btn" @click="goBack">← 返回保护页面</button>

      <div class="article-card">
        <h1 class="title">
          {{ article.title }}
        </h1>

        <img :src="article.cover" class="cover" />

        <div class="content" v-html="article.content"></div>
      </div>
    </div>

    <!-- 底部背景 -->
  </div>
</template>

<style scoped>
.article-page {
  background:
    url('/images/ocean-bottom.png') bottom center / cover no-repeat,
    #f4f9fc;
  min-height: 100vh;
}

/* 顶部背景 */

.top-bg {
  width: 100%;
  height: 260px;
  background: url('/images/ocean-top.png') center/cover no-repeat;
}

/* 底部背景 */

.bottom-bg {
  width: 100%;
  height: 260px;
  background: url('/images/ocean-bottom.png') center/cover no-repeat;
  margin-top: 80px;
}

/* 中间容器 */

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: -120px;
  padding-bottom: 60px;
}

/* 返回按钮 */

.back-btn {
  align-self: flex-start;
  margin-bottom: 20px;
  background: #0f6aa6;
  color: white;
  border: none;
  padding: 10px 16px;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.2s;
}

.back-btn:hover {
  background: #0c5a8c;
}

/* 文章卡片 */

.article-card {
  width: 820px;
  background: white;
  border-radius: 18px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  padding: 40px;
}

/* 标题 */

.title {
  text-align: center;
  font-size: 32px;
  color: #0f3a63;
  margin-bottom: 20px;
}

/* 封面 */

.cover {
  width: 100%;
  border-radius: 12px;
  margin-bottom: 25px;
}

/* 内容 */

.content {
  line-height: 1.8;
  font-size: 16px;
  color: #333;
}

.content h2 {
  margin-top: 30px;
  color: #0f3a63;
}

.content img {
  width: 100%;
  margin: 20px 0;
  border-radius: 10px;
}

.content p {
  margin: 15px 0;
}
</style>
