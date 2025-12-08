<script setup lang="ts">
import { useRoute } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()

const breadcrumbs = computed(() => {
  const pathArray = route.path
    .split('/')
    .filter((segment) => segment && isNaN(Number(segment))); // <-- evita que salga el "1"

  const crumbs = pathArray.map((segment, index) => {
    const fullPath = '/' + pathArray.slice(0, index + 1).join('/');

    let label = route.matched[index]?.name || segment;

    // Para el tipo Pokémon, sustituir por el nombre del parámetro
    if (route.params.name && segment === route.params.name) {
      label = route.params.name as string;
    }

    return {
      label,
      path: fullPath,
      active: index === pathArray.length - 1,
    };
  });

  if (route.path === '/') {
    return [{ label: 'Inicio', path: '/', active: true }];
  }

  return [
    { label: 'Inicio', path: '/', active: false },
    ...crumbs
  ];
});

</script>

<template>
  <CContainer class="py-3">
    <CBreadcrumb>
      <CBreadcrumbItem
        v-for="(item, idx) in breadcrumbs"
        :key="idx"
        :active="item.active"
      >
        <RouterLink
          v-if="!item.active"
          :to="item.path"
          class="text-decoration-none breadcrumb-link"
        >
          {{ item.label }}
        </RouterLink>

        <span v-else>
          {{ item.label }}
        </span>
      </CBreadcrumbItem>
    </CBreadcrumb>
  </CContainer>
</template>
