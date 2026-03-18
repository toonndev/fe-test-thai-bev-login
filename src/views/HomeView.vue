<template>
  <AppHeader title="IT 02-3" />
  <div class="page-wrapper">
    <p class="welcome-text">Welcome  User : {{ authStore.username }}</p>
  </div>
</template>

<script setup lang="ts">
import AppHeader from '../components/AppHeader.vue'
import { useAuthStore } from '../stores/auth'

const authStore = useAuthStore()
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

.welcome-text {
  font-size: 1.5rem;
  font-weight: 600;
  color: #333;
}
</style>
