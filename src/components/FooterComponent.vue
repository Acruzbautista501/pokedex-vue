<script setup lang="ts">
  const currentYear: number = new Date().getFullYear()
</script>

<template>
  <CFooter class="px-4 border-0 text-center p-4 justify-content-center fs-5">
    <span class="ms-1">&copy; {{ currentYear }} | Desarrollado por</span>
    <a href="https://aldair-cruz-bautista.netlify.app/" target="_blank" class="text-decoration-none text-danger ms-1">
      Aldair Cruz Bautista
    </a>
  </CFooter>
</template>


