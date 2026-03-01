<template>
  <div class="home-page">
    <div class="content-wrapper">
      <div class="annotations">
        <h2 class="annotation-title">{{ currentAnnotations.title }}</h2>

        <div v-for="(text, index) in currentAnnotations.texts" :key="index" class="annotation-item">
          <span class="annotation-arrow">→</span>
          <span class="annotation-text">{{ text }}</span>
        </div>
      </div>

      <div class="main-image-container">
        <img class="main-image" :src="images[currentIndex]" alt="图片展示" />

        <div class="nav-arrows">
          <button class="arrow-button prev" @click="prevImage">‹</button>
          <button class="arrow-button next" @click="nextImage">›</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'HomePage',
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
    }
  },
  computed: {
    // 计算当前显示的文案
    currentAnnotations() {
      return this.annotations[this.currentIndex] || { title: '', texts: [] }
    },
  },
  methods: {
    prevImage() {
      this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length
    },
    nextImage() {
      this.currentIndex = (this.currentIndex + 1) % this.images.length
    },
  },
}
</script>

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
  justify-content: space-between;
  width: 100%;
  height: 100%;
  gap: 40px;
  position: relative;
}

.annotations {
  flex: 0 0 350px; /*容器大小*/
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 0 20px 0 95px; /*位置调整*/
}

.annotation-title {
  font-size: 22px;
  font-weight: 700;
  color: #00264d;
  border-left: 4px solid #003366;
  padding-left: 8px;
  margin-bottom: 10px;
}

.annotation-item {
  display: flex;
  align-items: flex-start;
  gap: 6px;
}

.annotation-text {
  font-size: 18px;
  color: #333;
  font-weight: 500;
  writing-mode: horizontal-tb;
}

.annotation-arrow {
  font-size: 24px;
  color: #003366;
  font-weight: bold;
}

.main-image-container {
  max-width: 750px; /* 上限，避免超大 */
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;

  --offset-x: -50px; /*下面是qwq的调位置*/
  --offset-y: 0px;
  transform: translate(var(--offset-x), var(--offset-y));
  transition: transform 0.18s ease;
  background-color: #add8e6;
}

.main-image {
  width: 100%;
  height: auto;
  object-fit: contain;
}

.nav-arrows {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 20px;
  right: 20px;
  display: flex;
  justify-content: space-between;
  width: calc(100% - 40px);
  pointer-events: none;
}

.arrow-button {
  width: 35px;
  height: 80px;
  background-color: #003366;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 28px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s ease;
  pointer-events: auto;
}

.arrow-button:hover {
  background-color: #004c99;
}

.arrow-button.prev {
  margin-left: -70px;
}

.arrow-button.next {
  margin-right: -70px;
}
</style>
