import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useThemeStore = defineStore('theme', () => {
  const darkMode = ref(false)

  // Persistencia en localStorage
  if (localStorage.getItem('darkMode')) {
    darkMode.value = localStorage.getItem('darkMode') === 'true'
  }

  // Aplicar modo de Bootstrap
  watch(darkMode, (value) => {
    document.body.setAttribute('data-bs-theme', value ? 'dark' : 'light')
    localStorage.setItem('darkMode', value.toString())
  }, { immediate: true })

  const toggleDarkMode = () => {
    darkMode.value = !darkMode.value
  }

  return { darkMode, toggleDarkMode }
})
