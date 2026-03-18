import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(null)
  const username = ref<string | null>(null)

  const isAuthenticated = computed(() => !!token.value)

  function login(newToken: string, newUsername: string) {
    token.value = newToken
    username.value = newUsername
    localStorage.setItem('token', newToken)
  }

  function logout() {
    token.value = null
    username.value = null
    localStorage.removeItem('token')
  }

  function initFromStorage() {
    const savedToken = localStorage.getItem('token')
    if (savedToken) {
      token.value = savedToken
    }
  }

  return { token, username, isAuthenticated, login, logout, initFromStorage }
})
