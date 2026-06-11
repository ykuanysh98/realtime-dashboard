<template>
  <div class="dashboard">

    <div class="dashboard__topbar">
      <h1 class="dashboard__title">Dashboard</h1>
      <span class="connection-badge" :class="connected ? 'badge--live' : 'badge--off'">
        {{ connected ? '● Live' : '○ Reconnecting...' }}
      </span>
    </div>

    <AdminPanel v-if="auth.isAdmin" />

    <div class="metrics-grid">
      <StatCard
        v-for="metric in visibleMetrics"
        :key="metric.id"
        :metric="metric"
      />
    </div>

    <div class="bottom-row">
      <LiveChart :metrics="visibleMetrics" />
      <ActivityFeed :items="activity" />
    </div>

  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useAuthStore }    from '../stores/auth.store'
import { useMetricsStore } from '../stores/metrics.store'
import { useWebSocket }    from '../composables/useWebSocket'
import StatCard    from '../components/StatCard.vue'
import LiveChart   from '../components/LiveChart.vue'
import ActivityFeed from '../components/ActivityFeed.vue'
import AdminPanel  from '../components/AdminPanel.vue'

const auth    = useAuthStore()
const store   = useMetricsStore()
const { activity, connected } = storeToRefs(store)
const { connect } = useWebSocket(import.meta.env.VITE_WS_URL)

const visibleMetrics = computed(() => store.visibleMetrics(auth.isAdmin))

onMounted(() => connect())
</script>

<style scoped>
.dashboard {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.dashboard__topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.dashboard__title {
  font-size: var(--text-xl);
  font-weight: 600;
}

.connection-badge {
  font-size: var(--text-xs);
  font-family: var(--font-mono);
  padding: 4px 12px;
  border-radius: 20px;
}

.badge--live { background: rgba(79,207,142,0.1); color: var(--color-success); }
.badge--off  { background: rgba(96,96,96,0.1);   color: var(--color-text-muted); }

.metrics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
}

.bottom-row {
  display: flex;
  gap: 20px;
  align-items: flex-start;
}
</style>