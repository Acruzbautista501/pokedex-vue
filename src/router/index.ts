import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { resolveComponent, h } from 'vue'
import { ref } from 'vue'

// Estado global de loader
export const isLoading = ref(false)

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'inicio',
      component: HomeView,
    },
    {
      path: '/tipos',
      name: 'Tipos de Pokémon',
      component: {
        render() {
          const RouterView = resolveComponent('router-view')
          return h(RouterView)
        },
      },
      children: [
        {
          path: '',
          name: 'PokemonTipos',
          component: () => import('../views/PokemonTypes/PokemonTypesView.vue'),
        },
        {
          path: ':name/:id',
          name: 'PokemonTipo',
          component: () => import('../views/PokemonTypes/PokemonTypeView.vue')
        },
      ]
    },
  ],
})

// Mostrar loader al iniciar cambio de ruta
router.beforeEach((to, from, next) => {
  isLoading.value = true
  next()
})

// Ocultar loader después de 3 segundos
router.afterEach(() => {
  setTimeout(() => {
    isLoading.value = false
  }, 3000)
})

export default router
