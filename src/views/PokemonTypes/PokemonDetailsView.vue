<script setup lang="ts">
import { useTypePokemonStore } from '@/stores/useTypePokemonStore';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()
 const tabPaneActiveKey = ref(1)

const idName = route.params.pokemon as string

const pokeDetail = useTypePokemonStore()

const audioRef = ref<HTMLAudioElement | null>(null)
const isPlaying = ref(false)

const toggleAudio = () => {
  if (!audioRef.value) return

  if (isPlaying.value) {
    audioRef.value.pause()
  } else {
    audioRef.value.play()
  }

  isPlaying.value = !isPlaying.value
}

onMounted(() => {
  pokeDetail.loadPokemonType(idName)
})
</script>

<template>
<CContainer>
  <CRow class="g-4 p mb-5">
    <CCol lg="6">
      <div class="my-4">
        <div class="d-flex justify-content-start align-items-start">
          <h1 class="fw-semibold display-4 text-capitalize">
            {{ pokeDetail.pokemon.name }}
          </h1>
          <span class="text-muted fs-3 mx-3">#{{ pokeDetail.pokemon.id }}</span>
        </div>

        <CBadge
          v-for="(type, index) in pokeDetail.pokemon.types"
          :key="index"
          :style="{ backgroundColor: pokeDetail.pokemon.colors[index], color: 'white' }"
          shape="rounded-pill"
          class="fs-5 mx-1"
        >
          {{ type }}
        </CBadge>
        <div class="pt-3 pb-3">
          <div class="d-flex justify-content-center">
           <audio ref="audioRef" :src="pokeDetail.pokemon.crie"></audio>
            <CButton class="poke-button" @click="toggleAudio" v-c-tooltip="{content: 'Da click para escuchar al Pokémon.', placement: 'top'}">
              <div class="poke-center">
                <i :class="isPlaying ? 'bi bi-pause-fill' : 'bi bi-play-fill'" class="text-dark"></i>
              </div>
            </CButton>
          </div>
          <CImage :src="pokeDetail.pokemon.image" class="img-fluid mx-auto text-center"/>
        </div>
      </div>
      <div class="pt-3">
        <h3 class=" fw-semibold pb-3 text-decoration-underline">Evoluciones</h3>
        <CRow class="g-4">
          <CCol
            v-for="(evolution, index) in pokeDetail.pokemon.evolutions"
            :key="index"
            md="4"
          >
            <CCard
              class="border-2 border-danger p-3"
            >
              <CCardImage orientation="top" :src="evolution.image" class="pokemon-img" />
              <CCardBody>
                <CCardTitle class="text-center">
                  <CBadge
                    color="danger"
                  >
                  {{ evolution.nameEs }}
                  </CBadge>
                </CCardTitle>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </div>
    </CCol>
    <CCol lg="6">
      <div class="pt-4 pb-3">
        <h3 class="fw-semibold pb-2 text-decoration-underline">Debilidades</h3>
        <CBadge
          v-for="(weakness, index) in pokeDetail.pokemon.weaknesses"
          :key="index"
          class="fs-5 mx-1 mb-2"
          :style="{
            backgroundColor: pokeDetail.pokemon.weaknessColors[index],
            color: 'white'
          }"
        >
          {{ weakness }}
        </CBadge>
      </div>
      <div class="pt-3 pb-3">
        <h3 class=" fw-semibold pb-2 text-decoration-underline">Descripción</h3>
        <p class="fs-5">
          {{ pokeDetail.pokemon.descriptionEs }}
        </p>
      </div>
      <div class="pt-3 pb-3">
        <CNav variant="enclosed" class="nav-danger bg-body">
          <CNavItem>
            <CNavLink
              href="javascript:void(0);"
              :active="tabPaneActiveKey === 1"
              @click="() => {tabPaneActiveKey = 1}"
              class="text-danger fw-semibold"
            >
              Información
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink
              href="javascript:void(0);"
              :active="tabPaneActiveKey === 2"
              @click="() => {tabPaneActiveKey = 2}"
              class="text-danger fw-semibold"
            >
              Datos Generales
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink
              href="javascript:void(0);"
              :active="tabPaneActiveKey === 3"
              @click="() => {tabPaneActiveKey = 3}"
              class="text-danger fw-semibold"
            >
              Movimientos
            </CNavLink>
          </CNavItem>
        </CNav>
        <CTabContent>
          <CTabPane :visible="tabPaneActiveKey === 1">
            <CRow class="g-4 pt-3">
              <CCol xs="12" md="6" xl="3">
                <div class="border-2 border-danger border p-3 text-center shadow h-100">
                  <i class="bi bi-lightning-charge-fill fs-4 text-warning"></i>
                  <small class="fw-bold fs-6">Habilidades</small>
                  <div class="fw-normal small">
                    <span
                      v-for="(ability, index) in pokeDetail.pokemon.abilities"
                      :key="index"
                    >
                      {{ ability }}<span v-if="index < pokeDetail.pokemon.abilities.length - 1">, </span>
                    </span>
                  </div>
                </div>
              </CCol>
              <CCol xs="12" md="6" xl="3">
                <div class="border-2 border-danger border p-3 text-center shadow h-100">
                  <div class="mx-auto py-2 d-flex flex-column">
                    <i class="bi bi-tags-fill fs-4 text-info"></i>
                    <small class="fw-bold fs-6">Categoría</small>
                    <div class="fw-normal small">{{ pokeDetail.pokemon.specie }}</div>
                  </div>
                </div>
              </CCol>
              <CCol xs="12" md="6" xl="3">
                <div class="border-2 border-danger border p-3 text-center shadow h-100">
                  <div class="mx-auto py-2 d-flex flex-column">
                    <i class="bi bi-layers-fill fs-4 text-secondary"></i>
                    <small class="fw-bold fs-6">Generación</small>
                    <div class="fw-normal small">{{ pokeDetail.pokemon.generation }}</div>
                  </div>
                </div>
              </CCol>
              <CCol xs="12" md="6" xl="3">
                <div class="border-2 border-danger border p-3 text-center shadow h-100">
                  <div class="mx-auto py-2 d-flex flex-column">
                    <i class="bi bi-tree-fill fs-4 text-success"></i>
                    <small class="fw-bold fs-6">Hábitat</small>
                    <div class="fw-normal small text-capitalize">{{ pokeDetail.pokemon.habitat }}</div>
                  </div>
                </div>
              </CCol>
            </CRow>
          </CTabPane>
          <CTabPane :visible="tabPaneActiveKey === 2">
            <CRow class="g-4 pt-3">
              <CCol xs="12" md="6" xl="4">
                <div class="border-2 border-danger border p-3 text-center shadow h-100">
                  <div class="mx-auto py-2 d-flex flex-column">
                    <i class="bi bi-rulers fs-4 text-primary"></i>
                    <small class="fw-bold fs-6">Altura</small>
                    <div class="fw-normal small">{{ pokeDetail.pokemon.height }} mts</div>
                  </div>
                </div>
              </CCol>

              <CCol xs="12" md="6" xl="4">
                <div class="border-2 border-danger border p-3 text-center shadow h-100">
                  <div class="mx-auto py-2 d-flex flex-column">
                    <i class="bi bi-box-fill fs-4 text-danger"></i>
                    <small class="fw-bold fs-6">Peso</small>
                    <div class="fw-normal small">{{ pokeDetail.pokemon.weight }} kg</div>
                  </div>
                </div>
              </CCol>

              <CCol xs="12" md="6" xl="4">
                <div class="border-2 border-danger border p-3 text-center shadow h-100">
                  <div class="mx-auto py-2 d-flex flex-column">
                    <i class="bi bi-star-fill fs-4 text-warning"></i>
                    <small class="fw-bold fs-6">Experiencia Base</small>
                    <div class="fw-normal fs-5">{{ pokeDetail.pokemon.base_experience }} XP</div>
                  </div>
                </div>
              </CCol>
            </CRow>
          </CTabPane>
          <CTabPane :visible="tabPaneActiveKey === 3">
            <div class="border-2 border-danger border p-3 text-center shadow mt-3">
              <i class="bi bi-body-text fs-5 mx-1"></i>
              <small class="fw-bold fs-5">Movimientos</small>
              <div class="fw-normal small text-start mt-2">
                <span
                  v-for="(move, index) in pokeDetail.pokemon.moves"
                  :key="index"
                >
                  {{ move }}<span v-if="index < pokeDetail.pokemon.moves.length - 1">, </span>
                </span>
              </div>
            </div>
          </CTabPane>
        </CTabContent>
      </div>
    </CCol>
  </CRow>
</CContainer>
</template>

<style scoped>
  .pokemon-img {
    width: 100%;          /* tamaño uniforme */
    height: 130px;         /* cuadrado consistente */
    object-fit: contain;   /* mantiene proporción sin recortar */
    display: block;
    margin: 0 auto;        /* centrar */
  }

  /* Estilo para tabs tipo "danger" */
  .nav-danger .nav-link {
    color: var(--cui-danger) !important;
    font-weight: 600;
  }

  .nav-danger .nav-link.active {
    background-color: var(--cui-danger) !important;
    color: white !important;
    border-color: var(--cui-danger) !important;
  }

  .nav-danger .nav-link:hover {
    background-color: rgba(220, 53, 69, 0.15) !important;
    border-color: var(--cui-danger) !important;
    color: var(--cui-danger) !important;
  }

  .poke-button {
  width: 90px;
  height: 90px;
  border-radius: 50%;
  border: 6px solid black;
  cursor: pointer;
  padding: 0;
  position: relative;
  overflow: hidden;
  background: white;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: transform .15s ease;
}

/* Animación al hacer clic */
.poke-button:active {
  transform: scale(0.92);
}

/* Parte roja superior */
.poke-button::before {
  content: "";
  position: absolute;
  top: 0;
  width: 100%;
  height: 50%;
  background: red;
}

/* Línea negra */
.poke-button::after {
  content: "";
  position: absolute;
  top: 50%;
  width: 100%;
  height: 8px;
  background: black;
  transform: translateY(-50%);
}

/* Centro de la Pokéball */
.poke-center {
  width: 36px;
  height: 36px;
  background: white;
  border: 5px solid black;
  border-radius: 50%;
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Ícono */
.poke-center i {
  font-size: 20px;
}
</style>
