<template>
  <div class="app">
    <Header />
    <div class="main-content">
      <Sidebar />

      <div class="page-container">
        <router-view />
      </div>
    </div>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import Header from './components/Head_er.vue'
// import Sidebar from './components/Side_bar.vue'
import Footer from './components/Foot_er.vue'
</script>
