<template>
  <div class="login-page">
    <div class="login-card">
      <h1>Dashboard</h1>

      <div class="field">
        <label>Email</label>
        <input v-model="form.email" type="email" placeholder="admin@test.com" />
      </div>

      <div class="field">
        <label>Пароль</label>
        <input v-model="form.password" type="password" placeholder="••••••" />
      </div>

      <p v-if="error" class="error">{{ error }}</p>

      <button @click="handleLogin">Войти</button>

      <p class="hint">admin@test.com / user@test.com — пароль: 123456</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth.store'

const router = useRouter()
const auth   = useAuthStore()

const form  = reactive({ email: '', password: '' })
const error = ref('')

// Mock users — 2-дня
const MOCK_USERS = [
  { id: '1', name: 'Admin',    email: 'admin@test.com', role: 'admin' as const },
  { id: '2', name: 'John Doe', email: 'user@test.com',  role: 'user'  as const },
]

function handleLogin() {
  const user = MOCK_USERS.find(u => u.email === form.email)

  if (!user || form.password !== '123456') {
    error.value = 'Неверный email или пароль'
    return
  }

  // Mock JWT token
  const token = btoa(JSON.stringify({ userId: user.id, exp: Date.now() + 86400000 }))
  auth.login(user, token)
  router.push('/dashboard')
}
</script>