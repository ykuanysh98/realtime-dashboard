<template>
  <div class="chart-card">
    <div class="chart-card__header">
      <span class="chart-card__title">Live Metrics</span>
      <span class="chart-card__badge">● live</span>
    </div>

    <div class="chart-wrap">
      <svg :viewBox="`0 0 ${W} ${H}`" preserveAspectRatio="none" class="chart-svg">
        <defs>
          <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stop-color="#4f8ef7" stop-opacity="0.3"/>
            <stop offset="100%" stop-color="#4f8ef7" stop-opacity="0"/>
          </linearGradient>
        </defs>

        <!-- Area fill -->
        <path :d="areaPath" fill="url(#chartGrad)" />

        <!-- Line -->
        <path :d="linePath" fill="none" stroke="#4f8ef7" stroke-width="2" stroke-linejoin="round" />

        <!-- Last point dot -->
        <circle v-if="points.length" :cx="points[points.length-1].x" :cy="points[points.length-1].y" r="4" fill="#4f8ef7" />
      </svg>
    </div>

    <!-- Legend -->
    <div class="chart-legend">
      <span v-for="m in metrics" :key="m.id" class="legend-item">
        {{ m.label }}: <b>{{ m.value }}{{ m.unit }}</b>
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import type { Metric } from '../stores/metrics.store'

const props = defineProps<{ metrics: Metric[] }>()

const W = 400
const H = 120
const MAX_POINTS = 30

// CPU  
const history = ref<number[]>([])

watch(
  () => props.metrics.find(m => m.id === 'cpu')?.value,
  (val) => {
    if (val === undefined) return
    history.value.push(val)
    if (history.value.length > MAX_POINTS) history.value.shift()
  }
)

const points = computed(() => {
  const data = history.value
  if (data.length < 2) return []
  const max = Math.max(...data, 1)
  return data.map((v, i) => ({
    x: (i / (MAX_POINTS - 1)) * W,
    y: H - (v / max) * (H - 10) - 5,
  }))
})

const linePath = computed(() => {
  if (points.value.length < 2) return ''
  return points.value
    .map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`)
    .join(' ')
})

const areaPath = computed(() => {
  if (points.value.length < 2) return ''
  const first = points.value[0]
  const last  = points.value[points.value.length - 1]
  return `${linePath.value} L${last.x},${H} L${first.x},${H} Z`
})
</script>

<style scoped>
.chart-card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: 20px 24px;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.chart-card__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.chart-card__title {
  font-size: var(--text-sm);
  font-weight: 600;
}

.chart-card__badge {
  font-size: var(--text-xs);
  color: var(--color-success);
  font-family: var(--font-mono);
}

.chart-wrap { width: 100%; }

.chart-svg {
  width: 100%;
  height: 120px;
  display: block;
}

.chart-legend {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.legend-item {
  font-size: var(--text-xs);
  color: var(--color-text-muted);
  font-family: var(--font-mono);
}

.legend-item b {
  color: var(--color-text);
  font-weight: 500;
}
</style>