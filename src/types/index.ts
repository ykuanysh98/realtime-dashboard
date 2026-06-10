export type Role = 'admin' | 'user'

export type TrendDirection = 'up' | 'down' | 'stable'

export type ActivityType = 'info' | 'warning' | 'danger'

export interface User {
  id: string
  name: string
  email: string
  role: Role
}

export interface AuthState {
  user: User | null
  token: string | null
}

export interface Metric {
  id: string
  label: string
  value: number
  unit: string
  trend: TrendDirection
}

export interface ActivityItem {
  id: string
  message: string
  time: string
  type: ActivityType
}

export interface MetricsState {
  metrics: Metric[]
  activity: ActivityItem[]
  connected: boolean
}

// WebSocket message 
export type WsMessage =
  | { type: 'metric';   payload: Metric }
  | { type: 'activity'; payload: ActivityItem }