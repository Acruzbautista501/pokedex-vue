<script lang="ts" setup>
import useSearchPokemon from '@/composable/useSearchPokemon';
import { useThemeStore } from '@/stores/theme'
import PokemonModal from './PokemonModal.vue';

const themeStore = useThemeStore()

const { loadPokemon, searchPokemon, showPokeSearchModal, pokemon } = useSearchPokemon()

</script>

<template>
  <CHeader class="d-flex flex-wrap justify-content-center py-3 mb-4 border-0 align-items-center bg-poke">
    <CContainer class="position-relative z-2">
      <!-- Logo -->
      <RouterLink
        to="/"
        class="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none"
      >
        <CImage src="/img/logo.png" width="180"/>
      </RouterLink>

      <!-- Navegación -->
      <CNav class="fs-4 me-3">
        <CNavItem>
          <router-link class="nav-link" to="/">Inicio</router-link>
        </CNavItem>
        <CNavItem>
          <router-link class="nav-link" to="/">Favoritos</router-link>
        </CNavItem>
      </CNav>

      <!-- Switch plano con iconos -->
      <div class="form-check form-switch d-flex align-items-center">
        <input
          class="form-check-input"
          type="checkbox"
          id="darkModeSwitch"
          :checked="themeStore.darkMode"
          @change="themeStore.toggleDarkMode"
        />
        <label class="form-check-label ms-2 d-flex align-items-center" for="darkModeSwitch">
          <i
            class="bi bi-sun-fill transition-opacity text-white fs-4 mt-1"
            :class="{'opacity-100': !themeStore.darkMode, 'opacity-0': themeStore.darkMode}"
          ></i>
          <i
            class="bi bi-moon-fill transition-opacity ms-n2 mt-1"
            :class="{'opacity-100': themeStore.darkMode, 'opacity-0': !themeStore.darkMode}"
          ></i>
        </label>
      </div>
    </CContainer>
    <CContainer class="d-inline position-relative z-2">
        <h1 class="display-6 fw-bold mt-5 text-center text-white">
          ¿Qué Pokémon deseas búscar?
        </h1>
        <section class="p-3 mb-3">
        <CForm
          class="d-flex justify-content-center align-items-center rounded-5 border p-2 bg-body"
          style="background-color: #fff;"
          @submit.prevent="loadPokemon(searchPokemon)"
        >
          <CInputGroup class="rounded-5 overflow-hidden">
            <!-- Icono de búsqueda -->
            <CInputGroupText class="text-body bg-body border-0">
              <i class="bi bi-search"></i>
            </CInputGroupText>

            <!-- Input con placeholder personalizado -->
            <CFormInput
              class="border-0"
              type="search"
              placeholder="Busca el Pokémon por nombre"
              v-model="searchPokemon"
            />

            <!-- Botón dentro del input -->
            <CButton type="submit" color="danger" class="border-0 rounded-0 px-3 fw-bold">
              Buscar
            </CButton>
          </CInputGroup>
        </CForm>
        </section>
    </CContainer>
    <div class="pokeball-container">
      <CImage src="/img/pokebola-blanca.png" class="pokeball-img"/>
    </div>
  </CHeader>
  <PokemonModal
    :visible="showPokeSearchModal"
    :pokemon="pokemon"
    @close="showPokeSearchModal = false"
  />
</template>

<style scoped>
/* Animación simple de desvanecimiento de iconos */
.transition-opacity {
  transition: opacity 0.3s ease;
}

.nav-link {
  color: #FFFFFF !important;
}

.bg-poke {
  position: relative;
  overflow: hidden;

  /* Gradiente estilo Pokédex */
  background: linear-gradient( 135deg, #ee0000 0%, #cc0000 55%, #b30000 100% );
}

/* Contenedor de la pokebola */
.pokeball-container {
  position: absolute;
  top: -60px;
  right: -60px;
  z-index: 1;
  pointer-events: none;
}

/* Imagen pokebola */
.pokeball-img {
  width: 555px;
  opacity: 0.12;
}

/* Responsive para móviles */
@media (max-width: 768px) {
  .pokeball-container {
    top: -40px;
    right: -40px;
  }

  .pokeball-img {
    width: 480px;
    opacity: 0.10;
  }
}
</style>
