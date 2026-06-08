import { ref, onUnmounted } from 'vue'
import { useMetricsStore } from '../stores/metrics.store'

const RECONNECT_DELAY = 3000
const MAX_RETRIES     = 5

export function useWebSocket(url: string) {
  const metrics = useMetricsStore()
  const retries = ref(0)

  let ws: WebSocket | null = null
  let reconnectTimer: ReturnType<typeof setTimeout> | null = null

  function connect() {
    ws = new WebSocket(url)

    ws.onopen = () => {
      console.log('WS connected')
      metrics.setConnected(true)
      retries.value = 0
    }

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data)

        if (data.type === 'metric') {
          metrics.updateMetric(data.payload)
        }

        if (data.type === 'activity') {
          metrics.addActivity(data.payload)
        }
      } catch (e) {
        console.error('WS parse error:', e)
      }
    }

    ws.onclose = () => {
      metrics.setConnected(false)

      if (retries.value < MAX_RETRIES) {
        retries.value++
        console.log(`Reconnecting... attempt ${retries.value}`)
        reconnectTimer = setTimeout(connect, RECONNECT_DELAY)
      }
    }

    ws.onerror = (err) => {
      console.error('WS error:', err)
      ws?.close()
    }
  }

  function disconnect() {
    if (reconnectTimer) clearTimeout(reconnectTimer)
    ws?.close()
  }

  onUnmounted(disconnect)

  return { connect, disconnect, retries }
}