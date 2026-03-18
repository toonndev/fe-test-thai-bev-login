<template>
  <header class="app-header">
    <span class="header-title">{{ title }}</span>
  </header>
</template>

<script setup lang="ts">
defineProps<{ title: string }>()
</script>

<style scoped>
.app-header {
  width: 100%;
  background-color: #4CAF50;
  color: white;
  padding: 16px 24px;
  font-size: 1.25rem;
  font-weight: bold;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
}
</style>
