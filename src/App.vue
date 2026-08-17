<template>
  <div class="app-layout">
    <AppSidebar />
    <main class="app-main">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import AppSidebar from '@/components/AppSidebar.vue'
</script>

<style>
.app-layout {
  display: flex;
  min-height: 100vh;
  background-color: #f5f5f7;
}

.app-main {
  flex: 1;
  padding: 32px 40px;
}
</style>
