<template>
  <div class="stat-card">
    <div class="stat-card__top">
      <span class="stat-card__label">{{ metric.label }}</span>
      <span class="stat-card__trend" :class="`trend--${metric.trend}`">
        {{ trendIcon }} {{ metric.trend }}
      </span>
    </div>
    <div class="stat-card__value">
      {{ metric.value }}<span class="stat-card__unit">{{ metric.unit }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Metric } from '../stores/metrics.store'
import { computed } from 'vue'

const props = defineProps<{ metric: Metric }>()

const trendIcon = computed(() => ({
  up: '↑', down: '↓', stable: '→'
}[props.metric.trend]))
</script>

<style scoped>
.stat-card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: 20px 24px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  transition: border-color var(--ease);
}

.stat-card:hover { border-color: #3a3a3a; }

.stat-card__top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.stat-card__label {
  font-size: var(--text-xs);
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-weight: 500;
}

.stat-card__trend {
  font-size: var(--text-xs);
  font-family: var(--font-mono);
  padding: 2px 8px;
  border-radius: 20px;
}

.trend--up     { background: rgba(79,207,142,0.1); color: var(--color-success); }
.trend--down   { background: rgba(247,79,79,0.1);  color: var(--color-danger); }
.trend--stable { background: rgba(96,96,96,0.15);  color: var(--color-text-muted); }

.stat-card__value {
  font-family: var(--font-mono);
  font-size: var(--text-xl);
  font-weight: 500;
  color: var(--color-text);
  line-height: 1;
}

.stat-card__unit {
  font-size: var(--text-sm);
  color: var(--color-text-muted);
  margin-left: 4px;
}
</style>