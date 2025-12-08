<script setup lang="ts">
import { useTypePokemonStore } from '@/stores/useTypePokemonStore';
import { onMounted, ref, computed, watch } from 'vue';
import { useRoute } from 'vue-router';

const pokemonsType = useTypePokemonStore()
const route = useRoute()

const idParam = route.params.id
const idName = route.params.name
const id = Number(idParam)

// ---------------- BUSCADOR ----------------
const search = ref("")

// ---------------- PAGE SIZE ----------------
const pageSize = ref(9)                     // 9, 18, 36, 72
const pageOptions = [9, 18, 36, 72]

// ---------------- PAGINACIÓN ----------------
const currentPage = ref(1)

// Filtrar cards según texto
const filteredCards = computed(() => {
  if (!search.value.trim()) return pokemonsType.pokeCard

  return pokemonsType.pokeCard.filter(card =>
    card.name.toLowerCase().includes(search.value.toLowerCase()) ||
    String(card.id).includes(search.value)
  )
})

// Total filtrado
const totalItems = computed(() => filteredCards.value.length)
const totalPages = computed(() => Math.ceil(totalItems.value / pageSize.value))

// Cards visibles
const paginatedCards = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  return filteredCards.value.slice(start, start + pageSize.value)
})

// Rango visible estilo DataTable
const startItem = computed(() => {
  if (totalItems.value === 0) return 0
  return (currentPage.value - 1) * pageSize.value + 1
})

const endItem = computed(() => {
  return Math.min(currentPage.value * pageSize.value, totalItems.value)
})

// Reset paginación al cambiar búsqueda o pageSize
watch([search, pageSize], () => {
  currentPage.value = 1
})

// Al iniciar
onMounted(() => {
  currentPage.value = 1
  pokemonsType.loadPokemonsType(id)
})
</script>



<template>
  <CContainer>
    <h2 class="text-center fw-bold display-3">
      {{ idName }}
    </h2>
    <CRow class="pb-3 pt-4">
      <CCol xs="12" md="6">
        <div class="d-flex align-items-center">
          <label class="me-2 fw-bold">Mostrar:</label>
          <select v-model="pageSize" class="form-select w-auto">
            <option v-for="opt in pageOptions" :key="opt" :value="opt">
              {{ opt }}
            </option>
          </select>
          <span class="ms-2">registros</span>
        </div>
      </CCol>

      <CCol xs="12" md="6">
        <div class="d-flex justify-content-md-end mt-3 mt-md-0">
          <input
            type="text"
            class="form-control w-75"
            placeholder="Buscar..."
            v-model="search"
          />
        </div>
      </CCol>
    </CRow>
    <CRow class="g-3">
      <CCol
        xs="12" md="6" xxl="4"
        v-for="card in paginatedCards"
        :key="card.id"
      >
        <CCard
        class="h-100 position-relative overflow-hidden card-type"
        :style="{ backgroundColor: card.color, borderColor: card.color }"
        >
          <div class="d-flex justify-content-center align-content-center position-relative overflow-hidden z-2">
            <CCardBody>
              <CButton color="link" class="text-white fs-5 me-1 p-0">
                <i class="bi bi-star"></i>
              </CButton>
              <span class="text-muted fs-6">#{{ card.id }}</span>
              <CCardTitle class="text-white fw-bold text-capitalize fs-3">{{ card.name }}</CCardTitle>
              <CCardText>
                <div class="text-white">
                  <div>
                    <i class="bi bi-lightning-charge me-1"></i>
                    <span class="fw-bold">Habilides: </span>
                    <span v-for="(ability, index) in card.abilities" :key="index">
                      {{ ability }}<span v-if="index < card.abilities.length - 1">, </span>
                     </span>
                  </div>
                  <div class="mt-2 d-flex flex">
                    <div class="me-3 flex-column">
                      <i class="bi bi-box me-1"></i>
                      <span class="fw-bold">Peso: </span>
                      <span>{{ card.weight }} kg</span>
                    </div>
                    <div class="flex-column">
                      <i class="bi bi-rulers me-1"></i>
                      <span class="fw-bold">Altura: </span>
                      <span>{{ card.height }} m</span>
                    </div>
                  </div>
                </div>
              </CCardText>
            </CCardBody>
            <CCardImage orientation="top" :src="card.image" class="pokemon-img p-3 ps-5" />
          </div>
          <div class="pokeball-container">
            <CImage :src="card.icon" class="pokeball-img"/>
          </div>
        </CCard>
      </CCol>
    </CRow>
    <!-- PAGINACIÓN -->
    <CRow class="pb-5 pt-4">
      <CCol class="mt-2 mb-2 text-center">
        <span class="text-muted fs-5">
          Mostrando de {{ startItem }} a {{ endItem }} Pokémones de {{ totalItems }} Pokémones
        </span>
      </CCol>
      <CCol>
        <CPagination align="center" class="my-pagination flex-wrap pagination-responsive">
          <CPaginationItem
            :disabled="currentPage === 1"
            @click="currentPage--"
            class="page-btn"
          >
            &laquo;
          </CPaginationItem>

          <CPaginationItem
            v-for="page in totalPages"
            :key="page"
            :active="page === currentPage"
            @click="currentPage = page"
            class="page-btn"
          >
            {{ page }}
          </CPaginationItem>

          <CPaginationItem
            :disabled="currentPage === totalPages"
            @click="currentPage++"
            class="page-btn"
          >
            &raquo;
          </CPaginationItem>
        </CPagination>
      </CCol>
    </CRow>
  </CContainer>
</template>

<style>
.pokemon-img {
  width: 200px;          /* tamaño uniforme */
  height: 200px;         /* cuadrado consistente */
  object-fit: contain;   /* mantiene proporción sin recortar */
  display: block;
  margin: 0 auto;        /* centrar */
}

  /* Contenedor de la pokebola */
.pokeball-container {
  position: absolute;
  object-fit: contain;
  top: -10px;
  right: -60px;
  z-index: 1;
  pointer-events: none;
}

/* Imagen pokebola */
.pokeball-img {
  width: 250px;
  opacity: 0.15;
}

.card-type{
  transition: transform 0.2s ease-in-out;
}

.card-type:hover{
  transform: scale(1.05);
}

</style>
