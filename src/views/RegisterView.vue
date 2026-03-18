<template>
  <AppHeader title="IT 02-2" />
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

      <div class="form-group">
        <label for="confirmPassword">Confirm Password</label>
        <input
          id="confirmPassword"
          v-model="confirmPassword"
          type="password"
          placeholder="Confirm Password"
          :disabled="loading"
        />
        <span v-if="errors.confirmPassword" class="field-error">{{ errors.confirmPassword }}</span>
      </div>

      <span v-if="apiError" class="api-error">{{ apiError }}</span>

      <button @click="handleRegister" :disabled="loading" class="btn-primary">
        {{ loading ? 'กำลังสมัครสมาชิก...' : 'สมัครสมาชิก' }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import AppHeader from '../components/AppHeader.vue'
import api from '../api/axios'

const router = useRouter()

const username = ref('')
const password = ref('')
const confirmPassword = ref('')
const loading = ref(false)
const apiError = ref('')
const errors = reactive({ username: '', password: '', confirmPassword: '' })

function validate() {
  errors.username = username.value.trim() ? '' : 'กรุณากรอก User'
  errors.password = password.value.trim() ? '' : 'กรุณากรอก Password'
  errors.confirmPassword = confirmPassword.value.trim() ? '' : 'กรุณากรอก Confirm Password'
  if (!errors.password )  {
    errors.password = password.value.length < 8 ? 'กรุณากรอก Password อย่างน้อย 8 ตัวอักษร' : ''
  }

  if (errors.username || errors.password || errors.confirmPassword) return false

  if (password.value !== confirmPassword.value) {
    errors.confirmPassword = 'Password และ Confirm Password ไม่ตรงกัน'
    return false
  }

  return true
}

async function handleRegister() {
  apiError.value = ''
  if (!validate()) return

  loading.value = true
  try {
    await api.post('/api/v1/auth/register', {
      username: username.value,
      password: password.value,
      confirm_password:confirmPassword.value
    })
    router.push('/')
  } catch (err: any) {
    apiError.value = err.response?.data?.message || 'สมัครสมาชิกไม่สำเร็จ กรุณาลองอีกครั้ง'
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
</style>
