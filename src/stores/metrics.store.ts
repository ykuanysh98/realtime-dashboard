import { defineStore } from 'pinia'

export interface Metric {
  id: string
  label: string
  value: number
  unit: string
  trend: 'up' | 'down' | 'stable'
}

export interface ActivityItem {
  id: string
  message: string
  time: string
  type: 'info' | 'warning' | 'danger'
}

interface MetricsState {
  metrics: Metric[]
  activity: ActivityItem[]
  connected: boolean
}

export const useMetricsStore = defineStore('metrics', {
  state: (): MetricsState => ({
    metrics: [],
    activity: [],
    connected: false,
  }),

  actions: {
    setConnected(val: boolean) {
      this.connected = val
    },

    updateMetric(incoming: Metric) {
      const idx = this.metrics.findIndex(m => m.id === incoming.id)
      if (idx !== -1) {
        this.metrics[idx] = incoming
      } else {
        this.metrics.push(incoming)
      }
    },

    addActivity(item: ActivityItem) {
      this.activity.unshift(item)
      if (this.activity.length > 20) {
        this.activity.pop()
      }
    },
  },
})