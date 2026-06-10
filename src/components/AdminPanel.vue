<template>
  <div class="admin-panel">
    <div class="admin-panel__header">
      <span class="admin-panel__title">Admin Panel</span>
      <span class="admin-badge">admin only</span>
    </div>

    <div class="admin-panel__grid">
      <div class="admin-stat">
        <span class="admin-stat__label">Total Metrics</span>
        <span class="admin-stat__value">{{ metrics.length }}</span>
      </div>
      <div class="admin-stat">
        <span class="admin-stat__label">Active Users</span>
        <span class="admin-stat__value">{{ randomUsers }}</span>
      </div>
      <div class="admin-stat">
        <span class="admin-stat__label">Uptime</span>
        <span class="admin-stat__value">{{ uptime }}</span>
      </div>
      <div class="admin-stat">
        <span class="admin-stat__label">WS Status</span>
        <span class="admin-stat__value" :class="connected ? 'status--ok' : 'status--err'">
          {{ connected ? 'Connected' : 'Disconnected' }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useMetricsStore } from '../stores/metrics.store'

const store = useMetricsStore()
const { metrics, connected } = storeToRefs(store)

const randomUsers = ref(Math.floor(Math.random() * 40) + 10)

// Uptime таймері
const seconds = ref(0)
onMounted(() => setInterval(() => seconds.value++, 1000))

const uptime = computed(() => {
  const h = Math.floor(seconds.value / 3600)
  const m = Math.floor((seconds.value % 3600) / 60)
  const s = seconds.value % 60
  return `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`
})
</script>

<style scoped>
.admin-panel {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: 20px 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.admin-panel__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.admin-panel__title { font-size: var(--text-sm); font-weight: 600; }

.admin-badge {
  font-size: var(--text-xs);
  font-family: var(--font-mono);
  padding: 2px 8px;
  border-radius: 20px;
  background: rgba(247,163,79,0.12);
  color: var(--color-warning);
}

.admin-panel__grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
}

.admin-stat {
  background: var(--color-surface-2);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: 12px 16px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.admin-stat__label {
  font-size: var(--text-xs);
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.admin-stat__value {
  font-family: var(--font-mono);
  font-size: var(--text-md);
  font-weight: 500;
}

.status--ok  { color: var(--color-success); }
.status--err { color: var(--color-danger); }
</style>