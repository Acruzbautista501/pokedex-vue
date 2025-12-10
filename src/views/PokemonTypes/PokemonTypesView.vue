<script setup lang="ts">
import { useTypePokemonStore } from '@/stores/useTypePokemonStore';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

const typePoke = useTypePokemonStore()

const router = useRouter()

const goToPokeType = (name: string, nameEs: string) => {
  router.push({
    name: 'PokemonTipo',
    params: { name },
    query: {nameEs }
  })
}


onMounted(()=> {
  typePoke.loadTypesPoke()
})
</script>

<template>
  <CContainer>
    <h2 class="text-center pt-4 fw-bold display-3">¿Quieres saber más?</h2>
    <p class="fs-4 fw-semibold text-center pb-5">
      Busca mediante los filtados diponilbe.
    </p>
    <CRow class="g-4 g-lg-5 pb-5">
      <CCol
        xs="12" md="6" xl="3"
        v-for="type in typePoke.pokeTypes"
        :key="type.name"
      >
        <CButton
          class="border btn-type rounded rounded-5 p-4 w-100 d-flex justify-content-start position-relative z-2 text-white"
          :style="{ backgroundColor: type.color, borderColor: type.color }"
          @click="goToPokeType(type.name, type.nameEs)"
        >
          <span class="fw-bold fs-2">{{ type.nameEs }}</span>
          <div class="pokeball-container">
            <CImage :src="type.icon" class="pokeball-img"/>
          </div>
        </CButton>
      </CCol>
    </CRow>
  </CContainer>
</template>

<style scoped>

  /* Contenedor de la pokebola */
.pokeball-container {
  position: absolute;
  top: 0px;
  right: 10px;
  z-index: 1;
  pointer-events: none;
}

/* Imagen pokebola */
.pokeball-img {
  width: 90px;
  opacity: 0.25;
}

/* Responsive para móviles */
@media (max-width: 768px) {


  .pokeball-img {
    width: 85px;
    opacity: 0.10;
  }
}

.btn-type{
  transition: transform 0.2s ease-in-out;
}

.btn-type:hover{
  transform: scale(1.1);
}
</style>
