<template>
  <section class="about-page">
    <!-- 背景波浪层 -->
    <div class="wave-bg">
      <div class="wave wave1"></div>
      <div class="wave wave2"></div>
      <div class="wave wave3"></div>
    </div>

    <div class="container">
      <h1 class="main-title fade-in"><span class="highlight">守护</span>海洋的古老旅人</h1>

      <div class="mission-wrapper">
        <div class="mission-card fade-in delay-1">
          <div class="icon turtle-icon">🐢</div>
          <h2>我们的使命</h2>
          <p>
            让更多人认识海龟、了解它们的生命周期与面临的威胁，从而唤醒对海洋生态的保护意识。我们相信——
            <strong>每一次了解，都是保护的开始。</strong>
          </p>
        </div>

        <div class="mission-card fade-in delay-2">
          <div class="icon ocean-icon">🌊</div>
          <h2>为什么是海龟？</h2>
          <p>
            海龟已在地球上生活超过1亿年，它们是海洋健康的指示物种。保护海龟，就是保护珊瑚礁、草海床、远洋生态与整片海洋。
          </p>
        </div>
      </div>

      <div class="problem-section fade-in delay-3">
        <h2>它们正在面临的危机</h2>
        <div class="threat-grid">
          <div class="threat-item" v-for="threat in threats" :key="threat.id">
            <div class="threat-icon">{{ threat.icon }}</div>
            <h3>{{ threat.title }}</h3>
            <p>{{ threat.desc }}</p>
          </div>
        </div>
      </div>

      <div class="call-to-action fade-in delay-4">
        <h2>加入我们，一起守护蓝色星球</h2>
        <p>小小的行动，就能为海龟和海洋带来改变</p>
        <div class="action-buttons">
          <button class="btn primary">了解海龟种类</button>
        </div>
      </div>

      <footer class="page-footer">
        <p>因为我们与海龟共享同一片海洋</p>
      </footer>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const threats = ref([
  {
    id: 1,
    icon: '🪢',
    title: '误捕与渔具缠绕',
    desc: '每年数以十万计的海龟因渔网、绳索缠绕而死亡',
  },
  { id: 2, icon: '🗑️', title: '塑料污染', desc: '海龟常将塑料袋误食为水母，导致消化道堵塞' },
  { id: 3, icon: '🏖️', title: '栖息地破坏', desc: '沿海开发、人工照明干扰产卵与幼龟上岸' },
  { id: 4, icon: '🌡️', title: '气候变化', desc: '沙滩温度升高导致性别比例失衡，极端天气摧毁巢穴' },
])
</script>

<style scoped>
.about-page {
  position: relative;
  min-height: 100vh;
  overflow: hidden;
  color: #003366;
  background: linear-gradient(to bottom, #d0e8f0 0%, #a8d5e2 40%, #7bbdd4 100%);
  padding: 60px 20px 120px;
}

.wave-bg {
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
}

.wave {
  position: absolute;
  left: 0;
  right: 0;
  height: 200px;
  background-repeat: repeat-x;
  background-position: 0 bottom;
  transform-origin: center bottom;
}

.wave1 {
  bottom: 0;
  height: 220px;
  background: url('data:image/svg+xml;utf8,<svg viewBox="0 0 1200 120" preserveAspectRatio="none"><path d="M0,60 C300,20 900,100 1200,60 L1200,120 L0,120 Z" fill="rgba(123,189,212,0.7)"/></svg>')
    repeat-x;
  animation: wave 18s linear infinite;
}

.wave2 {
  bottom: 40px;
  height: 180px;
  background: url('data:image/svg+xml;utf8,<svg viewBox="0 0 1200 120" preserveAspectRatio="none"><path d="M0,80 C400,0 800,160 1200,80 L1200,120 L0,120 Z" fill="rgba(168,213,226,0.6)"/></svg>')
    repeat-x;
  animation: wave 14s linear infinite reverse;
}

.wave3 {
  bottom: 80px;
  height: 140px;
  background: url('data:image/svg+xml;utf8,<svg viewBox="0 0 1200 120" preserveAspectRatio="none"><path d="M0,100 C200,40 1000,160 1200,100 L1200,120 L0,120 Z" fill="rgba(208,232,240,0.5)"/></svg>')
    repeat-x;
  animation: wave 22s linear infinite;
}

@keyframes wave {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-1200px);
  }
}

.container {
  position: relative;
  max-width: 1100px;
  margin: 0 auto;
  z-index: 2;
}

.main-title {
  text-align: center;
  font-size: 3.4rem;
  font-weight: 800;
  margin: 40px 0 60px;
  color: #002244;
  line-height: 1.15;
}

.highlight {
  color: #0077b6;
  position: relative;
}

.highlight::after {
  content: '';
  position: absolute;
  bottom: 4px;
  left: 0;
  right: 0;
  height: 12px;
  background: rgba(0, 119, 182, 0.18);
  z-index: -1;
  border-radius: 8px;
}

.mission-wrapper {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
  gap: 32px;
  margin-bottom: 80px;
}

.mission-card {
  background: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 40px 32px;
  box-shadow: 0 12px 40px rgba(0, 51, 102, 0.12);
  border: 1px solid rgba(123, 189, 212, 0.3);
  transition: all 0.4s ease;
}

.mission-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 60px rgba(0, 51, 102, 0.18);
}

.icon {
  font-size: 3.8rem;
  margin-bottom: 20px;
  text-align: center;
}

.mission-card h2 {
  font-size: 1.8rem;
  margin-bottom: 20px;
  color: #003366;
  text-align: center;
}

.mission-card p {
  font-size: 1.1rem;
  line-height: 1.7;
  color: #334455;
}

.problem-section {
  text-align: center;
  margin: 100px 0 80px;
}

.problem-section h2 {
  font-size: 2.6rem;
  margin-bottom: 50px;
  color: #002244;
}

.threat-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 28px;
}

.threat-item {
  background: rgba(255, 255, 255, 0.88);
  border-radius: 16px;
  padding: 28px 24px;
  box-shadow: 0 8px 30px rgba(0, 51, 102, 0.1);
  transition: all 0.35s ease;
}

.threat-item:hover {
  transform: scale(1.04);
}

.threat-icon {
  font-size: 3.2rem;
  margin-bottom: 16px;
}

.threat-item h3 {
  font-size: 1.4rem;
  margin-bottom: 12px;
  color: #c94b4b;
}

.call-to-action {
  text-align: center;
  margin: 100px 0 80px;
  padding: 60px 30px;
  background: linear-gradient(135deg, #0077b6 0%, #005f8d 100%);
  color: white;
  border-radius: 24px;
  box-shadow: 0 20px 60px rgba(0, 51, 102, 0.25);
}

.call-to-action h2 {
  font-size: 2.4rem;
  margin-bottom: 20px;
}

.action-buttons {
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
  margin-top: 36px;
}

.btn {
  padding: 14px 32px;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn.primary {
  background: white;
  color: #003366;
  border: none;
}

.btn.primary:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 30px rgba(255, 255, 255, 0.4);
}

.btn.secondary {
  background: transparent;
  color: white;
  border: 2px solid white;
}

.btn.secondary:hover {
  background: rgba(255, 255, 255, 0.15);
}

.btn.outline {
  background: transparent;
  color: white;
  border: 2px solid rgba(255, 255, 255, 0.6);
}

.btn.outline:hover {
  border-color: white;
}

.page-footer {
  text-align: center;
  color: #004080;
  font-size: 1.1rem;
  margin-top: 100px;
  opacity: 0.9;
}

/* 淡入动画 */
.fade-in {
  opacity: 0;
  transform: translateY(30px);
  animation: fadeInUp 1s forwards;
}

.delay-1 {
  animation-delay: 0.3s;
}
.delay-2 {
  animation-delay: 0.6s;
}
.delay-3 {
  animation-delay: 0.9s;
}
.delay-4 {
  animation-delay: 1.2s;
}

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 响应式调整 */
@media (max-width: 768px) {
  .main-title {
    font-size: 2.6rem;
  }
  .call-to-action {
    padding: 50px 20px;
  }
  .action-buttons {
    flex-direction: column;
  }
}
</style>
