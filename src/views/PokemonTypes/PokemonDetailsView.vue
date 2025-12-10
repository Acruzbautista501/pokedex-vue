<script setup lang="ts">
import { useTypePokemonStore } from '@/stores/useTypePokemonStore';
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()

const idName = route.params.pokemon as string

const pokeDetail = useTypePokemonStore()

onMounted(() => {
  pokeDetail.loadPokemonType(idName)
})
</script>

<template>
<CContainer>
  <CRow class="g-3">
    <CCol sm="6">
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
          class="fs-6 mx-1"
        >
          {{ type }}
        </CBadge>
        <div class="pt-3 pb-3">
          <CImage :src="pokeDetail.pokemon.image" class="img-fluid"/>
        </div>
      </div>
    <div class="pt-3">
      <CRow class="g-3">
        <CCol
          v-for="(evolution, index) in pokeDetail.pokemon.evolutions"
          :key="index"
          md="4"
        >
          <CCard>
            <CCardImage orientation="top" :src="evolution.image" class="w-75 mx-auto" />
            <CCardBody>
              <CCardTitle>{{ evolution.nameEs }}</CCardTitle>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </div>

    </CCol>
    <CCol sm="6">
      One of three columns
    </CCol>
  </CRow>
</CContainer>
</template>

<style scoped>

</style>
