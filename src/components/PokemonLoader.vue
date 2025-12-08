<template>
  <div v-if="visible" class="overlay bg-body">
    <div
      class="pokeball-loader"
      :style="computedStyle"
      role="status"
      :aria-label="ariaLabel"
      aria-busy="true"
    >
      <div class="top" />
      <div class="bottom" />
      <div class="band" />
      <div class="button">
        <div class="button-inner" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import type { CSSProperties } from 'vue'

const props = defineProps({
  size: { type: Number, default: 64 },
  speed: { type: Number, default: 1 },
  ariaLabel: { type: String, default: 'Cargando' }
})

const visible = ref(true)

onMounted(() => {
  setTimeout(() => {
    visible.value = false
  }, 1500) // 3 segundos
})

const computedStyle = computed<CSSProperties>(() => ({
  width: `${props.size}px`,
  height: `${props.size}px`,
  '--pb-duration': `${props.speed}s`
}))
</script>

<style scoped>
/* Fondo que cubre toda la pantalla */
.overlay {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;/* semitransparente */
  z-index: 9999;
}

.pokeball-loader {
  position: relative;
  border-radius: 50%;
  overflow: hidden; /* Cambiado de visible a hidden */
  display: inline-block;
  transform-origin: center center;
  animation: pb-spin var(--pb-duration, 1s) linear infinite;
  box-shadow: 0 2px 6px rgba(0,0,0,0.15);
}

.pokeball-loader .top,
.pokeball-loader .bottom {
  position: absolute;
  left: 0;
  right: 0;
  width: 100%;
  height: 50%;
}

.pokeball-loader .top {
  top: 0;
  background: linear-gradient(#f04b4b, #d93636);
}

.pokeball-loader .bottom {
  bottom: 0;
  background: linear-gradient(#fff, #f3f3f3);
}

.pokeball-loader .band {
  position: absolute;
  left: 6%;
  right: 6%;
  top: calc(50% - 8%);
  height: 16%;
  background: #111;
  border-radius: 6px;
  box-shadow: inset 0 -2px rgba(255,255,255,0.08);
}

.pokeball-loader .button {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 34%;
  height: 34%;
  background: #fff;
  border: 4px solid #111;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  z-index: 2;
  animation: pb-button-pulse calc(var(--pb-duration, 1s) * 0.9) ease-in-out infinite;
}

.pokeball-loader .button-inner {
  width: 55%;
  height: 55%;
  background: #eee;
  border-radius: 50%;
  border: 2px solid rgba(0,0,0,0.08);
}

.pokeball-loader::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 50%;
  border: 4px solid rgba(0,0,0,0.06);
  pointer-events: none;
}

@keyframes pb-spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@keyframes pb-button-pulse {
  0% { transform: translate(-50%, -50%) scale(1); }
  50% { transform: translate(-50%, -50%) scale(0.92); }
  100% { transform: translate(-50%, -50%) scale(1); }
}
</style>
