<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter()

const goToTypesPokemon = () => {
  router.push({ path: '/tipos'})
}

</script>

<template>
  <CContainer>
    <h2 class="text-center pt-4 fw-bold display-3">¿Quieres saber más?</h2>
    <p class="fs-4 fw-semibold text-center pb-5">
      Busca mediante los filtros diponibles.
    </p>
    <CRow class="g-4 g-lg-5 d-flex justify-content-center">
      <CCol xs="12" md="6" xl="4">
        <CButton
          class="border rounded rounded-5 p-4 w-100 bg-type d-flex justify-content-start position-relative z-2"
          @click="goToTypesPokemon()"
        >
          <span class="fw-bold fs-2">Tipos</span>
          <div class="pokeball-container">
            <CImage src="/img/pokebola-blanca.png" class="pokeball-img"/>
          </div>
        </CButton>
      </CCol>
      <CCol xs="12" md="6" xl="4">
        <CButton class="border rounded rounded-5 p-4 w-100 bg-abilities d-flex justify-content-start position-relative z-2">
          <span class="fw-bold fs-2">Habilidades</span>
          <div class="pokeball-container">
            <CImage src="/img/pokebola-blanca.png" class="pokeball-img"/>
          </div>
        </CButton>
      </CCol>
      <CCol xs="12" md="6" xl="4">
        <CButton class="border rounded rounded-5 p-4 w-100 bg-moves d-flex justify-content-start position-relative z-2">
          <span class="fw-bold fs-2">Movimientos</span>
          <div class="pokeball-container">
            <CImage src="/img/pokebola-blanca.png" class="pokeball-img"/>
          </div>
        </CButton>
      </CCol>
      <CCol xs="12" md="6" xl="4">
        <CButton class="border rounded rounded-5 p-4 w-100 bg-items d-flex justify-content-start position-relative z-2">
          <span class="fw-bold fs-2">Objetos</span>
          <div class="pokeball-container">
            <CImage src="/img/pokebola-blanca.png" class="pokeball-img"/>
          </div>
        </CButton>
      </CCol>
      <CCol xs="12" md="6" xl="4">
        <CButton class="border rounded rounded-5 p-4 w-100 bg-generation d-flex justify-content-start position-relative z-2">
          <span class="fw-bold fs-2">Generación</span>
          <div class="pokeball-container">
            <CImage src="/img/pokebola-blanca.png" class="pokeball-img"/>
          </div>
        </CButton>
      </CCol>
    </CRow>
  </CContainer>
</template>

<style scoped>
  .border-search {
    border: 2px solid var(--border) !important
  }
  .title-search {
    color: var(--text-secondary);
  }
  .btn-search {
    background-color: var(--brand-yellow-soft);
    color: var(--text-secondary);
    width: 15%;
  }
  .btn-search:hover {
    border: 2px solid var(--brand-yellow-soft);
    color: var(--text-secondary);
  }

  .bg-type {
    background-color: #D2968F;
    color: #FFFFFF;
  }
  .bg-abilities {
    background-color: #6BB4F6;
    color: #FFFFFF;
  }
  .bg-moves {
    background-color: #F78276;
    color: #FFFFFF;
  }
  .bg-items {
    background-color: #FFD055;
    color: #FFFFFF;
  }
  .bg-generation {
    background-color: #AB70C3;
    color: #FFFFFF;
  }


  /* Contenedor de la pokebola */
.pokeball-container {
  position: absolute;
  top: 0px;
  right: 0px;
  z-index: 1;
  pointer-events: none;
}

/* Imagen pokebola */
.pokeball-img {
  width: 93px;
  opacity: 0.12;
}

/* Responsive para móviles */
@media (max-width: 768px) {


  .pokeball-img {
    width: 85px;
    opacity: 0.10;
  }
}

</style>
