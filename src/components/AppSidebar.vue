<template>
  <aside class="sidebar">
    <div class="sidebar__logo">dash<span>.</span></div>

    <nav class="sidebar__nav">
      <router-link to="/dashboard" class="nav-item">
        <span class="nav-icon">▦</span> Dashboard
      </router-link>
    </nav>

    <div class="sidebar__bottom">
      <div class="sidebar__user">
        <div class="sidebar__avatar">{{ initial }}</div>
        <div class="sidebar__info">
          <span class="sidebar__name">{{ user?.name }}</span>
          <span class="sidebar__role">{{ user?.role }}</span>
        </div>
      </div>
      <button class="sidebar__logout" @click="handleLogout">Выйти</button>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth.store'
import { storeToRefs } from 'pinia'

const auth   = useAuthStore()
const router = useRouter()
const { user } = storeToRefs(auth)

const initial = computed(() => user.value?.name?.[0] ?? '?')

function handleLogout() {
  auth.logout()
  router.push('/login')
}
</script>

<style scoped>
.sidebar {
  width: 220px;
  min-height: 100vh;
  background: var(--color-surface);
  border-right: 1px solid var(--color-border);
  display: flex;
  flex-direction: column;
  padding: 24px 16px;
  gap: 32px;
  flex-shrink: 0;
}

.sidebar__logo {
  font-size: var(--text-lg);
  font-weight: 700;
  padding-left: 8px;
}

.sidebar__logo span { color: var(--color-primary); }

.sidebar__nav { display: flex; flex-direction: column; gap: 4px; }

.nav-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 9px 12px;
  border-radius: var(--radius-md);
  color: var(--color-text-muted);
  text-decoration: none;
  font-size: var(--text-sm);
  transition: background var(--ease), color var(--ease);
}

.nav-item:hover,
.nav-item.router-link-active {
  background: var(--color-surface-2);
  color: var(--color-text);
}

.nav-icon { font-size: 14px; }

.sidebar__bottom { margin-top: auto; display: flex; flex-direction: column; gap: 12px; }

.sidebar__user {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 8px;
  border-radius: var(--radius-md);
  border: 1px solid var(--color-border);
}

.sidebar__avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: var(--color-primary);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: var(--text-sm);
  flex-shrink: 0;
}

.sidebar__info { display: flex; flex-direction: column; }
.sidebar__name { font-size: var(--text-sm); font-weight: 500; }
.sidebar__role { font-size: var(--text-xs); color: var(--color-text-muted); text-transform: capitalize; }

.sidebar__logout {
  background: transparent;
  border: 1px solid var(--color-border);
  color: var(--color-text-muted);
  border-radius: var(--radius-md);
  padding: 8px;
  font-size: var(--text-xs);
  cursor: pointer;
  font-family: var(--font-sans);
  transition: border-color var(--ease), color var(--ease);
}

.sidebar__logout:hover { border-color: var(--color-danger); color: var(--color-danger); }
</style>