<template>
  <div :class="['stage-wrapper', isTop ? 'top' : 'bottom']">
    <div v-if="isTop" class="text">
      <h3>{{ title }}</h3>
      <p>{{ description }}</p>
    </div>

    <div class="circle">
      <img :src="imageSrc" :alt="title" />
    </div>

    <div v-if="!isTop" class="text">
      <h3>{{ title }}</h3>
      <p>{{ description }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  imageSrc: string
  title: string
  description: string
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
}>()

const isTop = props.position.includes('top')
</script>

<style scoped>
.stage-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.stage-wrapper.bottom {
  flex-direction: column-reverse;
}

.circle {
  width: 160px;
  height: 160px;
  border-radius: 50%;
  overflow: hidden;
  border: 4px solid #003366;
  background: white;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
}

.circle img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.text {
  max-width: 200px;
  margin: 10px 0;
}

.text h3 {
  font-size: 18px;
  font-weight: bold;
  color: #003366;
}

.text p {
  font-size: 14px;
  color: #555;
  line-height: 1.5;
}
</style>
