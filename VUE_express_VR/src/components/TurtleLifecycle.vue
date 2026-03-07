<template>
  <section class="lifecycle">
    <div class="container">
      <h2 class="title">海龟的生命周期</h2>

      <!-- 物种选择 -->
      <div class="species-selector">
        <button
          v-for="species in turtleSpecies"
          :key="species.id"
          :class="['species-btn', selectedSpecies.id === species.id ? 'active' : '']"
          @click="selectedSpecies = species"
        >
          {{ species.name }}
        </button>
      </div>

      <!-- 生命周期布局 -->
      <div class="grid-layout">
        <!-- 卵 -->
        <StageCard
          :imageSrc="selectedSpecies.folder + '/egg.jpg'"
          :title="selectedSpecies.stages.egg.title"
          :description="selectedSpecies.stages.egg.description"
          position="top-left"
        />

        <div class="arrow">←</div>

        <!-- 成年 -->
        <StageCard
          :imageSrc="selectedSpecies.folder + '/adult.jpg'"
          :title="selectedSpecies.stages.adult.title"
          :description="selectedSpecies.stages.adult.description"
          position="top-right"
        />

        <div class="arrow">↓</div>

        <!-- 中间分布 -->
        <div class="distribution">
          <img :src="selectedSpecies.folder + '/distribution.jpg'" alt="distribution" />

          <div class="dist-text">
            <h3>分布区域</h3>
            <p>{{ selectedSpecies.distribution }}</p>
          </div>
        </div>

        <div class="arrow">↑</div>

        <!-- 稚龟 -->
        <StageCard
          :imageSrc="selectedSpecies.folder + '/hatchling.jpg'"
          :title="selectedSpecies.stages.hatchling.title"
          :description="selectedSpecies.stages.hatchling.description"
          position="bottom-left"
        />

        <div class="arrow">→</div>

        <!-- 幼龟 -->
        <StageCard
          :imageSrc="selectedSpecies.folder + '/juvenile.jpg'"
          :title="selectedSpecies.stages.juvenile.title"
          :description="selectedSpecies.stages.juvenile.description"
          position="bottom-right"
        />
      </div>

      <p class="bottom-tip">点击上方按钮切换不同海龟种类，查看其生命周期</p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import StageCard from './StageCard.vue'

const turtleSpecies = [
  {
    id: 'green-turtle',
    name: '绿海龟',
    folder: '/lifecycle/green-turtle',

    stages: {
      egg: { title: '卵期', description: '雌龟产下100-200枚卵' },
      hatchling: { title: '幼年期', description: '幼龟奔向大海' },
      juvenile: { title: '青年期', description: '成长10-20年' },
      adult: { title: '成年期', description: '体长可达1.5米' },
    },

    distribution: '绿海龟分布于全球热带海域',
  },

  {
    id: 'hawksbill',
    name: '玳瑁',
    folder: '/lifecycle/hawksbill',

    stages: {
      egg: { title: '卵期', description: '每窝约140枚' },
      hatchling: { title: '幼年期', description: '夜间出巢' },
      juvenile: { title: '青年期', description: '生活在珊瑚礁' },
      adult: { title: '成年期', description: '以鳞片闻名' },
    },

    distribution: '玳瑁主要分布在热带珊瑚礁',
  },
]

const selectedSpecies = ref(turtleSpecies[0])
</script>

<style scoped>
.lifecycle {
  padding: 80px 20px;
  background: linear-gradient(#e8f4f8, #d0e8f0);
}

.container {
  max-width: 1100px;
  margin: auto;
}

.title {
  text-align: center;
  font-size: 32px;
  font-weight: bold;
  color: #003366;
  margin-bottom: 40px;
}

.species-selector {
  display: flex;
  justify-content: center;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 50px;
}

.species-btn {
  padding: 10px 22px;
  border-radius: 30px;
  border: 2px solid #003366;
  background: white;
  cursor: pointer;
  font-weight: 600;
}

.species-btn.active {
  background: #003366;
  color: white;
  transform: scale(1.05);
}

.grid-layout {
  display: grid;

  grid-template-columns: 1fr auto 1fr;

  grid-template-rows: auto auto auto;

  gap: 30px;

  align-items: center;

  justify-items: center;
}

.arrow {
  font-size: 28px;
  color: #003366;
}

.distribution {
  text-align: center;
}

.distribution img {
  width: 260px;
  border-radius: 12px;
  border: 4px solid #0077b6;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
}

.dist-text {
  margin-top: 10px;
  max-width: 280px;
}

.bottom-tip {
  margin-top: 40px;
  text-align: center;
  color: #003366;
}
</style>
