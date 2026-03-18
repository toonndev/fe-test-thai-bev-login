<template>
  <AppHeader title="IT 02-1" />
  <div class="page-wrapper">
    <div class="form-card">
      <div class="form-group">
        <label for="username">User</label>
        <input
          id="username"
          v-model="username"
          type="text"
          placeholder="Username"
          :disabled="loading"
        />
        <span v-if="errors.username" class="field-error">{{ errors.username }}</span>
      </div>

      <div class="form-group">
        <label for="password">Password</label>
        <input
          id="password"
          v-model="password"
          type="password"
          placeholder="Password"
          :disabled="loading"
        />
        <span v-if="errors.password" class="field-error">{{ errors.password }}</span>
      </div>

      <span v-if="apiError" class="api-error">{{ apiError }}</span>

      <button @click="handleLogin" :disabled="loading" class="btn-primary">
        {{ loading ? 'กำลังเข้าสู่ระบบ...' : 'ลงชื่อเข้าใช้งาน' }}
      </button>

      <p class="register-link">
        <router-link to="/register">สมัครสมาชิก</router-link>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import AppHeader from '../components/AppHeader.vue'
import { useAuthStore } from '../stores/auth'
import api from '../api/axios'

const router = useRouter()
const authStore = useAuthStore()

const username = ref('')
const password = ref('')
const loading = ref(false)
const apiError = ref('')
const errors = reactive({ username: '', password: '' })

function validate() {
  errors.username = username.value.trim() ? '' : 'กรุณากรอก User'
  errors.password = password.value.trim() ? '' : 'กรุณากรอก Password'
  return !errors.username && !errors.password
}

async function handleLogin() {
  apiError.value = ''
  if (!validate()) return

  loading.value = true
  try {
    const res = await api.post('/api/v1/auth/login', {
      username: username.value,
      password: password.value,
    })
    const token = res.data.token
    authStore.login(token, username.value)
    router.push('/home')
  } catch (err: any) {
    apiError.value = err.response?.data?.message || 'เข้าสู่ระบบไม่สำเร็จ กรุณาลองอีกครั้ง'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.page-wrapper {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  padding-top: 64px;
}

.form-card {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  max-width: 360px;
  padding: 32px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

label {
  font-weight: 600;
  font-size: 0.9rem;
}

input {
  padding: 10px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  outline: none;
  transition: border-color 0.2s;
}

input:focus {
  border-color: #4CAF50;
}

input:disabled {
  background-color: #f5f5f5;
}

.field-error {
  color: #e53935;
  font-size: 0.8rem;
}

.api-error {
  color: #e53935;
  font-size: 0.875rem;
  text-align: center;
}

.btn-primary {
  padding: 12px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

.btn-primary:hover:not(:disabled) {
  background-color: #43A047;
}

.btn-primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.register-link {
  text-align: center;
  font-size: 0.9rem;
}

.register-link a {
  color: #4CAF50;
  text-decoration: none;
  font-weight: 600;
}

.register-link a:hover {
  text-decoration: underline;
}
</style>
