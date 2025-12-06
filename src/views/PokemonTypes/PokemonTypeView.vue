<script setup lang="ts">
import { useTypePokemonStore } from '@/stores/useTypePokemonStore';
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';

const pokemonsType = useTypePokemonStore()
const route = useRoute()

const idParam = route.params.id
// Convertimos a number (parseInt o Number), manejando undefined
const id =  Number(idParam)

onMounted(() => {
  pokemonsType.loadPokemonsType(id)
})
</script>

<template>
  <CContainer>
    <CRow class="g-3">
      <CCol
        xs="12" md="6" xl="3"
        v-for="card in pokemonsType.pokeCard"
        :key="card.id"
      >
        <CCard style="width: 18rem">
          <CCardImage orientation="top" :src="card.image" class="img-fluid" />
          <CCardBody>
            <CCardTitle class="text-capitalize">{{ card.name }}</CCardTitle>
            <CCardText></CCardText>
          </CCardBody>
          <CListGroup flush>
            <CListGroupItem>{{ card.height }} mts</CListGroupItem>
            <CListGroupItem>{{ card.weight}} kg</CListGroupItem>
            <CListGroupItem>{{ card.abilities   }}</CListGroupItem>
          </CListGroup>
          <!-- <CCardBody>
            <CCardLink href="#">Card link</CCardLink>
            <CCardLink href="#">Another link</CCardLink>
          </CCardBody> -->
        </CCard>
      </CCol>
    </CRow>
  </CContainer>
</template>

<style scoped>

</style>
