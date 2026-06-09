<template>
  <div class="app-layout">
    <AppSidebar v-if="auth.isAuthenticated" />
    <main class="app-main">
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
import AppSidebar from './components/AppSidebar.vue'
import { useAuthStore } from './stores/auth.store'
const auth = useAuthStore()
</script>

<style>
.app-layout {
  display: flex;
  min-height: 100vh;
}
.app-main {
  flex: 1;
  overflow: auto;
  padding: 32px;
}
</style>