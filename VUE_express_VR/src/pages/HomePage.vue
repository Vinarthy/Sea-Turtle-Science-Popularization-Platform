<script lang="ts">
import TurtleLifecycle from '@/components/TurtleLifecycle.vue'
import VideoGallery from '@/components/VideoGallery.vue'
export default {
  name: 'HomePage',
  components: {
    TurtleLifecycle,
    VideoGallery,
  },
  data() {
    return {
      images: [
        '/images/Image_1720.jpg',
        '/images/Image_95.jpg',
        '/images/Image_225.jpg',
        '/images/Image_373.jpg',
      ],
      // 每张图片对应的文案（可以自定义数量）
      annotations: [
        {
          title: '海龟综述',
          texts: [
            '海龟，隶属龟鳖目海龟科，是适应海洋生活的爬行动物',
            '全球现存共有7个物种，包括我们熟知的绿海龟、玳瑁、棱皮龟、蠵龟等。它们广泛分布于大西洋、太平洋和印度洋的温暖海域',
            '其中，棱皮龟是体型最大的海龟，体长可达2米以上，体重超过900公斤',
          ],
        },
        {
          title: '海龟的生命周期',
          texts: [
            '海龟拥有独特的生命周期。除了求偶和产卵季，它们一生几乎都在海洋中度过',
            '雌龟通常需要20-50年才能达到性成熟，每隔2-4年，它们会进行上千公里的生殖洄游，返回其出生地（精确度极高的海滩）产卵',
            '一次产卵可达100多枚，但孵化出的小海龟存活率极低，仅有千分之一能长至成年',
          ],
        },
        {
          title: '海龟的保护情况',
          texts: [
            '所有现存的海龟物种均已被列入《濒危野生动植物种国际贸易公约》附录，并被评为IUCN红色名录中的濒危或极危物种，',
            '人类活动是导致其种群数量锐减的主因，',
            '包括：误捕（兼捕）、海洋污染（特别是塑料）、产卵地破坏、以及因传统医药或工艺品需求而进行的非法捕杀',
          ],
        },
        {
          title: '我们将如何保护海龟',
          texts: [
            '保护行动已刻不容缓',
            '目前，国际社会正通过建立海洋保护区、推广“海龟逃生装置”的渔网、开展沙滩巡逻与保育孵化、以及加强公众宣传教育等方式，努力为这些海洋“活化石”争取生存空间',
            '每一份关注与努力，都将为它们的未来增添一份希望',
          ],
        },
      ],

      currentIndex: 0,
      timer: null as number | null,
      isDragging: false,
      startX: 0,
      moveX: 0,
    }
  },
  computed: {
    currentAnnotations() {
      return this.annotations[this.currentIndex] || { title: '', texts: [] }
    },
  },

  mounted() {
    this.preloadImages()
    this.startAutoPlay()
  },

  beforeUnmount() {
    this.stopAutoPlay()
  },

  methods: {
    preloadImages() {
      this.images.forEach((src) => {
        const img = new Image()
        img.src = src
      })
    },

    // ⭐ 多层位置判断
    getImageClass(index: number) {
      const len = this.images.length
      const diff = (index - this.currentIndex + len) % len

      if (diff === 0) return 'active'
      if (diff === 1) return 'next'
      if (diff === 2) return 'next2'
      if (diff === len - 1) return 'prev'
      if (diff === len - 2) return 'prev2'

      return 'hidden'
    },

    prevImage() {
      this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length
    },

    nextImage() {
      this.currentIndex = (this.currentIndex + 1) % this.images.length
    },

    startAutoPlay() {
      this.timer = setInterval(() => {
        this.nextImage()
      }, 3000)
    },

    stopAutoPlay() {
      if (this.timer) {
        clearInterval(this.timer)
        this.timer = null
      }
    },

    handleStart(e: MouseEvent | TouchEvent) {
      this.stopAutoPlay()

      this.isDragging = true
      this.startX = 'touches' in e ? e.touches[0].clientX : e.clientX
    },

    handleMove(e: MouseEvent | TouchEvent) {
      if (!this.isDragging) return
    },

    handleEnd() {
      if (!this.isDragging) return

      const diff = this.moveX - this.startX

      if (diff > 50) {
        this.prevImage()
      } else if (diff < -50) {
        this.nextImage()
      }

      this.isDragging = false
      this.startAutoPlay()
    },
  },
}
</script>
<template>
  <div class="home-page">
    <div class="content-wrapper">
      <!-- 文案 -->
      <div class="annotations">
        <h2 class="annotation-title">{{ currentAnnotations.title }}</h2>

        <div v-for="(text, index) in currentAnnotations.texts" :key="index" class="annotation-item">
          <span class="annotation-arrow">→</span>
          <span class="annotation-text">{{ text }}</span>
        </div>
      </div>

      <!-- 图片堆叠 -->
      <div
        class="main-image-container"
        @mousedown="handleStart"
        @mousemove="handleMove"
        @mouseup="handleEnd"
        @mouseleave="handleEnd"
        @touchstart="handleStart"
        @touchmove="handleMove"
        @touchend="handleEnd"
      >
        <div class="image-stack">
          <img
            v-for="(img, index) in images"
            :key="index"
            :src="img"
            class="stack-image"
            :class="getImageClass(index)"
          />
          <p class="image-hint">点击切换图片</p>
        </div>
        <div class="nav-arrows"></div>
      </div>
    </div>
  </div>

  <TurtleLifecycle />
  <VideoGallery />
</template>

<style scoped>
.home-page {
  width: 100%;
  height: 600px;
  background-color: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
}

.content-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 60px;
}

/* 文案 */
.annotations {
  width: 350px;
}

.annotation-title {
  font-size: 28px;
  margin-bottom: 15px;
}

.annotation-item {
  margin-bottom: 10px;
}

/* ⭐ 轮播容器 */
.main-image-container {
  width: 750px;
  height: 450px;
  position: relative;
  perspective: 1200px;
  overflow: hidden;
}

.image-stack {
  width: 100%;
  height: 100%;
  position: relative;
}

.stack-image {
  position: absolute;
  top: 50%;
  left: 50%;

  width: 520px;
  height: 320px;
  object-fit: cover;
  border-radius: 12px;

  transform: translate(-50%, -50%) scale(0.5);
  transition: all 0.5s ease;

  opacity: 0;
}

/* 中间 */
.stack-image.active {
  transform: translate(-50%, -50%) scale(1);
  opacity: 1;
  z-index: 5;
}

/* 第一层 */
.stack-image.prev {
  transform: translate(-120%, -50%) scale(0.75) rotateY(25deg);
  opacity: 0.5;
  z-index: 4;
}

.stack-image.next {
  transform: translate(20%, -50%) scale(0.75) rotateY(-25deg);
  opacity: 0.5;
  z-index: 4;
}

/* 第二层 */
.stack-image.prev2 {
  transform: translate(-200%, -50%) scale(0.6) rotateY(35deg);
  opacity: 0.3;
  z-index: 3;
}

.stack-image.next2 {
  transform: translate(100%, -50%) scale(0.6) rotateY(-35deg);
  opacity: 0.3;
  z-index: 3;
}

.stack-image.hidden {
  opacity: 0;
}

/* 按钮 */
.nav-arrows {
  position: absolute;
  top: 50%;
  width: 100%;
  display: flex;
  justify-content: space-between;
  transform: translateY(-50%);
}

.arrow-button {
  width: 40px;
  height: 60px;
  background: #003366;
  color: white;
  border: none;
  cursor: pointer;
}
.image-hint {
  text-align: center;
  margin-top: 12px;
  font-size: 15px;
  font-weight: 500;
  color: #004080; /* 深蓝色，与海洋保护主题呼应 */
  background: rgba(255, 255, 255, 0.8); /* 半透明白底，保证可读性 */
  padding: 6px 12px;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 64, 128, 0.2); /* 柔和阴影 */
  transition: all 0.3s ease;
}
</style>
