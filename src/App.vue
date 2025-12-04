<script setup lang="ts">
import {RouterView } from 'vue-router'
import Header from './components/HeaderComponent.vue';
</script>

<template>

  <main>
    <Header />
    <RouterView />
  </main>
</template>

