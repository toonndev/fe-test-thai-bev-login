<template>
  <AppHeader title="IT 02-3" />
  <div class="page-wrapper">
    <p class="welcome-text">Welcome  User : {{ authStore.username }}</p>
    <button @click="handleLogout" :disabled="loading" class="btn-logout">
      {{ loading ? 'กำลังออกจากระบบ...' : 'ออกจากระบบ' }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import AppHeader from '../components/AppHeader.vue'
import { useAuthStore } from '../stores/auth'
import api from '../api/axios'

const router = useRouter()
const authStore = useAuthStore()
const loading = ref(false)

async function handleLogout() {
  loading.value = true
  try {
    await api.post('/api/v1/auth/logout')
  } finally {
    authStore.logout()
    router.push('/')
  }
}
</script>

<style scoped>
.page-wrapper {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  padding-top: 64px;
  gap: 24px;
}

.welcome-text {
  font-size: 1.5rem;
  font-weight: 600;
  color: #333;
}

.btn-logout {
  padding: 10px 24px;
  background-color: #e53935;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

.btn-logout:hover {
  background-color: #c62828;
}
</style>
