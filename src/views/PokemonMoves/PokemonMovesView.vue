<script setup lang="ts">
import { useMovePokemonStore } from '@/stores/useMovePokemonStore';
import { onMounted, ref, computed, watch } from 'vue';

const movePokemon  = useMovePokemonStore()

const moveLimit = movePokemon.limit

const search = ref<string>("")

const pageSize = ref<number>(20)
const pageOptions = [20, 40, 80, 120]

const currentPage = ref<number>(1)

// Filtrar cards según texto
const filteredMoves = computed(() => {
  if (!search.value.trim()) return movePokemon.pokeMoves

  return movePokemon.pokeMoves.filter(move =>
    move.nameEs.toLowerCase().includes(search.value.toLowerCase()) ||
    String(move.id).includes(search.value)
  )
})


// Total filtrado
const totalItems = computed(() => filteredMoves.value.length)
const totalPages = computed(() => Math.ceil(totalItems.value / pageSize.value))

// Cards visibles
const paginatedMoves = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  return filteredMoves.value.slice(start, start + pageSize.value)
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

onMounted(() => {
   currentPage.value = 1
  movePokemon.loadPokemonMoves(moveLimit)
})


</script>

<template>
  <CContainer>
    <h2 class="text-center pt-4 fw-bold display-3">¿Quieres saber más?</h2>
    <p class="fs-4 fw-semibold text-center pb-5">
      Busca mediante los movimientos diponilbes.
    </p>
    <section>
      <CForm
        class="d-flex justify-content-center align-items-center border p-2 bg-body mt-3 mb-3 mx-auto w-50"
        @submit.prevent="movePokemon.loadPokemonMoves(moveLimit)"
      >
        <CFormInput
          class="border-0"
          type="search"
          label=""
          placeholder="Ejemplo: Pikachu o 25"
          v-model="moveLimit"
        />
        <CButton type="submit" color="info" class="text-white p-2 fw-bold fs-6">
          Buscar
        </CButton>
      </CForm>
    </section>
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
    <CRow class="g-3 mt-3">
      <CCol
        xs="12" md="6" lg="3"
        v-for="move in paginatedMoves"
        :key="move.id"
      >
      <CCard class="border border-danger shadow p-4">
        <CardBoddy class="text-center">
          <span class="fw-semibol text-danger fs-5">
            {{ move.nameEs }}
          </span>
        </CardBoddy>
      </CCard>
      </CCol>
    </CRow>
    <CRow class="pb-5 pt-4">
      <CCol class="mt-2 mb-2 text-center">
        <span class="text-muted fs-5">
          Mostrando de {{ startItem }} a {{ endItem }} movimientos de {{ totalItems }} movimientos
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

<style scoped>

</style>
