import { WebSocketServer } from 'ws'

const wss = new WebSocketServer({ port: 8080 })

const METRICS = [
  { id: 'cpu',     label: 'CPU Usage',    unit: '%'   },
  { id: 'memory',  label: 'Memory',       unit: 'GB'  },
  { id: 'requests',label: 'Requests/sec', unit: 'rps' },
  { id: 'errors',  label: 'Error rate',   unit: '%'   },
]

const ACTIVITY_MESSAGES = [
  { message: 'Новый пользователь вошёл в систему',  type: 'info'    },
  { message: 'Высокая нагрузка на CPU',             type: 'warning' },
  { message: 'Ошибка подключения к базе данных',    type: 'danger'  },
  { message: 'Деплой завершён успешно',             type: 'info'    },
  { message: 'Превышен лимит запросов',             type: 'warning' },
]

function randomBetween(min, max) {
  return +(Math.random() * (max - min) + min).toFixed(1)
}

function generateMetric(base) {
  const value = {
    cpu:      randomBetween(20, 95),
    memory:   randomBetween(2, 16),
    requests: randomBetween(100, 1200),
    errors:   randomBetween(0, 5),
  }[base.id]

  return {
    ...base,
    value,
    trend: Math.random() > 0.5 ? 'up' : Math.random() > 0.5 ? 'down' : 'stable',
  }
}

wss.on('connection', (ws) => {
  console.log('Client connected')

  METRICS.forEach(m => {
    ws.send(JSON.stringify({ type: 'metric', payload: generateMetric(m) }))
  })

  const metricInterval = setInterval(() => {
    const metric = METRICS[Math.floor(Math.random() * METRICS.length)]
    ws.send(JSON.stringify({ type: 'metric', payload: generateMetric(metric) }))
  }, 2000)

  const activityInterval = setInterval(() => {
    const item = ACTIVITY_MESSAGES[Math.floor(Math.random() * ACTIVITY_MESSAGES.length)]
    ws.send(JSON.stringify({
      type: 'activity',
      payload: {
        id: Date.now().toString(),
        ...item,
        time: new Date().toLocaleTimeString('ru-RU'),
      },
    }))
  }, 5000)

  ws.on('close', () => {
    clearInterval(metricInterval)
    clearInterval(activityInterval)
    console.log('Client disconnected')
  })
})

console.log('WS server running on ws://localhost:8080')