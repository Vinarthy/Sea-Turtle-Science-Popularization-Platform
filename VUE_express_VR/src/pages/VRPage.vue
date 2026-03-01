<template>
  <div class="vr-page">
    <div class="vr-container">
      <h1>VR场景体验</h1>
      <p>探索沉浸式的海洋世界</p>

      <!-- 重点：直接 iframe 加载 Unity -->
      <iframe class="vr-frame" src="/unity-build/index.html" />
    </div>
  </div>
</template>

<style scoped>
.vr-page {
  width: 100%;
}

.vr-container {
  text-align: center;
}

.vr-frame {
  width: 1000px;
  height: 660px;
  border: none;
  border-radius: 8px;
}
</style>
