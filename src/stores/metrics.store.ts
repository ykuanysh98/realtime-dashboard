import { defineStore } from 'pinia'
import type { Metric, ActivityItem, MetricsState } from '../types'

export const useMetricsStore = defineStore('metrics', {
  state: (): MetricsState => ({
    metrics: [],
    activity: [],
    connected: false,
  }),

  getters: {
    visibleMetrics: (state) => (isAdmin: boolean): Metric[] => {
      if (isAdmin) return state.metrics
      return state.metrics.filter(m => ['cpu', 'memory'].includes(m.id))
    },
  },

  actions: {
    setConnected(val: boolean): void {
      this.connected = val
    },
    updateMetric(incoming: Metric): void {
      const idx = this.metrics.findIndex(m => m.id === incoming.id)
      idx !== -1 ? (this.metrics[idx] = incoming) : this.metrics.push(incoming)
    },
    addActivity(item: ActivityItem): void {
      this.activity.unshift(item)
      if (this.activity.length > 20) this.activity.pop()
    },
  },
})