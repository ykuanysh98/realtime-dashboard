import { defineStore } from 'pinia'
import type { User, AuthState } from '../types' 

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    token: localStorage.getItem('token'),
  }),

  getters: {
    isAuthenticated: (state): boolean => !!state.token,
    isAdmin:         (state): boolean => state.user?.role === 'admin',
    fullName:        (state): string  => state.user?.name ?? 'Guest',
  },

  actions: {
    login(user: User, token: string): void {
      this.user = user
      this.token = token
      localStorage.setItem('token', token)
    },
    logout(): void {
      this.user = null
      this.token = null
      localStorage.removeItem('token')
    },
  },
})