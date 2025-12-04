<script setup lang="ts">
import type { PokeSearch } from '@/interfaces/Pokemon';
import { computed } from 'vue'

const props = defineProps<{
  visible: boolean
  pokemon: PokeSearch
}>()

const emit = defineEmits(['close'])

const typeColors: Record<string, string> = {
  Normal: '#A8A77A',
  Fuego: '#EE8130',
  Agua: '#6390F0',
  Eléctrico: '#F7D02C',
  Planta: '#7AC74C',
  Hielo: '#96D9D6',
  Lucha: '#C22E28',
  Veneno: '#A33EA1',
  Tierra: '#E2BF65',
  Volador: '#A98FF3',
  Psíquico: '#F95587',
  Bicho: '#A6B91A',
  Roca: '#B6A136',
  Fantasma: '#735797',
  Dragón: '#6F35FC',
  Siniestro: '#705746',
  Acero: '#B7B7CE',
  Hada: '#D685AD'
}

const statTranslations: Record<string, string> = {
  hp: 'PS',
  attack: 'Ataque',
  defense: 'Defensa',
  'special-attack': 'At. Esp.',
  'special-defense': 'Def. Esp.',
  speed: 'Velocidad'
}

const modalBgColor = computed(() => {
  if (!props.pokemon.types || props.pokemon.types.length === 0) return '#ccc'

  const firstType = props.pokemon.types[0] as keyof typeof typeColors
  return typeColors[firstType] ?? '#ccc'
})

</script>

<template>
<CModal :visible="visible" alignment="center" class="pokemon-modal">

  <!-- HEADER -->
  <div
    class="pokemon-modal-header text-white"
    :style="{ background: `linear-gradient(135deg, ${modalBgColor}, #00000055)` }"
  >
    <div class="d-flex justify-content-between px-3 pt-3">
      <CButton color="link" class="text-white fs-3 p-0">
        <i class="bi bi-star"></i>
      </CButton>

      <CButton
        color="link"
        class="text-white fs-3 p-0"
        @click="emit('close')"
      >
        <i class="bi bi-x-square"></i>
      </CButton>
    </div>

    <div class="px-4 mt-2">
      <h2 class="fw-bold mb-1">{{ pokemon.nameEs }}</h2>
      <span class="pokemon-id fs-4">#{{ pokemon.id }}</span>
    </div>

    <div class="pokemon-image-wrapper">
      <img :src="pokemon.image" class="img-fluid">
    </div>
  </div>

  <!-- BODY -->
  <div class="pokemon-modal-body">

    <div class="text-center mb-3">
      <CBadge class="pokemon-type-badge fs-6" :style="{ backgroundColor: modalBgColor }">
        {{ pokemon.types?.[0] }}
      </CBadge>
    </div>

    <h5 class="fw-bold text-center mb-3 fs-2" :style="{ color: modalBgColor }">
      Acerca de
    </h5>

    <!-- MEDIDAS -->
    <div class="pokemon-info-row text-center">
      <div>
        <i class="bi bi-box fs-4"></i>
        <div class="fw-bold">{{ pokemon.weight }} kg</div>
        <small class="text-muted">Peso</small>
      </div>

      <div>
        <i class="bi bi-rulers fs-4"></i>
        <div class="fw-bold">{{ pokemon.height }} m</div>
        <small class="text-muted">Altura</small>
      </div>

      <div>
        <i class="bi bi-lightning-charge fs-4"></i>
        <div class="fw-bold">
          <span v-for="(ability, index) in pokemon.abilities" :key="index">
            {{ ability }}<span v-if="index < pokemon.abilities.length - 1">, </span>
          </span>
        </div>
        <small class="text-muted">Habilidades</small>
      </div>
    </div>

    <p class="text-muted mt-3">
      {{ pokemon.descriptionEs }}
    </p>

    <!-- STATS -->
    <h5 class="fw-bold mt-4" :style="{ color: modalBgColor }">
      Estadísticas Base
    </h5>

    <div v-for="stat in pokemon.stats" :key="stat.stat.name" class="stat-row">
      <span>
        {{ statTranslations[stat.stat.name] || stat.stat.name.toUpperCase() }}
      </span>

      <div class="stat-bar">
        <div
          class="stat-bar-fill"
          :style="{ width: stat.base_stat + '%', backgroundColor: modalBgColor }"
        ></div>
      </div>
    </div>
  </div>

</CModal>
</template>

<style scoped>
.pokemon-modal {
  border-radius: 30px;
  overflow: hidden;
}

.pokemon-modal-header {
  height: 340px;
  position: relative;
}

.pokemon-id {
  position: absolute;
  top: 70px;
  right: 20px;
  font-weight: bold;
  opacity: 0.4;
}

.pokemon-image-wrapper {
  position: absolute;
  bottom: -90px;
  width: 100%;
  text-align: center;
  z-index: 3;
}

.pokemon-image-wrapper img {
  width: 320px;
}

.pokemon-modal-body {
  border-radius: 35px 35px 0 0;
  padding: 90px 25px 30px;
}

.pokemon-info-row {
  display: flex;
  justify-content: space-between;
  text-align: center;
  font-weight: 600;
}

.stat-row {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 6px;
  font-size: 13px;
}

.stat-bar {
  flex: 1;
  height: 8px;
  background: #eee;
  border-radius: 50px;
  overflow: hidden;
}

.stat-bar-fill {
  height: 100%;
  border-radius: 50px;
}
</style>
