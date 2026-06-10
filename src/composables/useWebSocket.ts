import { ref, onUnmounted } from 'vue'
import { useMetricsStore } from '../stores/metrics.store'
import type { WsMessage } from '../types'  // discriminated union

const RECONNECT_DELAY = 3000
const MAX_RETRIES     = 5

export function useWebSocket(url: string) {
  const metrics = useMetricsStore()
  const retries = ref<number>(0)

  let ws: WebSocket | null = null
  let reconnectTimer: ReturnType<typeof setTimeout> | null = null

  function handleMessage(raw: string): void {
    let data: WsMessage

    try {
      data = JSON.parse(raw) as WsMessage
    } catch {
      console.error('WS: failed to parse message')
      return
    }

    // Discriminated union 
    switch (data.type) {
      case 'metric':
        metrics.updateMetric(data.payload)
        break
      case 'activity':
        metrics.addActivity(data.payload)
        break
    }
  }

  function connect(): void {
    ws = new WebSocket(url)

    ws.onopen = () => {
      metrics.setConnected(true)
      retries.value = 0
    }

    ws.onmessage = (event: MessageEvent<string>) => handleMessage(event.data)

    ws.onclose = () => {
      metrics.setConnected(false)
      if (retries.value < MAX_RETRIES) {
        retries.value++
        reconnectTimer = setTimeout(connect, RECONNECT_DELAY)
      }
    }

    ws.onerror = () => ws?.close()
  }

  function disconnect(): void {
    if (reconnectTimer) clearTimeout(reconnectTimer)
    ws?.close()
  }

  onUnmounted(disconnect)

  return { connect, disconnect, retries }
}