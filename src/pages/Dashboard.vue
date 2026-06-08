<template>
  <div class="dashboard">

    <div class="connection-badge" :class="connected ? 'online' : 'offline'">
      {{ connected ? '● Live' : '○ Reconnecting...' }}
    </div>

    <div class="metrics-grid">
      <StatCard
        v-for="metric in metrics"
        :key="metric.id"
        :metric="metric"
      />
    </div>

    <div class="bottom-row">
      <LiveChart :metrics="metrics" />
      <ActivityFeed :items="activity" />
    </div>

  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useMetricsStore } from '../stores/metrics.store'
import { useWebSocket } from '../composables/useWebSocket'
import StatCard      from '../components/StatCard.vue'
import LiveChart     from '../components/LiveChart.vue'
import ActivityFeed  from '../components/ActivityFeed.vue'

const metricsStore       = useMetricsStore()
const { metrics, activity, connected } = storeToRefs(metricsStore)
const { connect }        = useWebSocket('ws://localhost:8080')

onMounted(() => connect())
</script>