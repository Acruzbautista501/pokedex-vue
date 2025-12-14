<script setup lang="ts">
import {RouterView } from 'vue-router'
import Header from './components/HeaderComponent.vue';
import AppBreadcrumb from './components/AppBreadcrumb.vue';
import PokemonLoader from './components/PokemonLoader.vue';
import { isLoading } from './router';
import FooterComponent from './components/FooterComponent.vue';

</script>

<template>

  <main>
    <PokemonLoader v-if="isLoading" :size="100" :speed="0.8" aria-label="Cargando..." />
    <Header />
    <AppBreadcrumb />
    <RouterView />
    <FooterComponent />
  </main>
</template>

