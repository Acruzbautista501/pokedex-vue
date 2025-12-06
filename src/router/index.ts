import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/tipos',
      name: 'Tipos de Pokémon',
      component: () => import('../views/PokemonTypes/PokemonTypesView.vue'),
    },
    {
      path: '/tipos/tipo/:id',
      name: 'Tipo de Pokémon',
      component: () => import('../views/PokemonTypes/PokemonTypeView.vue')
    }
  ],
})

export default router
