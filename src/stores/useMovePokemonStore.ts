import type { PokeMoves, MoveListItem, NameLanguage } from "@/interfaces/PokemonMoves"
import PokemonServices from "@/services/PokemonServices"
import { defineStore } from "pinia"
import { ref } from "vue"
import { useSwalStore } from "./Swal"

const swal = useSwalStore()

export const useMovePokemonStore = defineStore('moveStore', () => {
  const limit = ref<number>(0)
  const pokeMoves = ref<PokeMoves[]>([])

  async function loadPokemonMoves(limitMove: number) {
    try {
      const movePoke = await PokemonServices.getPokemonMoves(limitMove)
      const { data } = await movePoke


      const detailMoves = await Promise.all(
        (data.results as MoveListItem[]).map(async (m) => {
          const detail = await PokemonServices.getPokemonMove(m.url)
          const moveDetail = detail.data as NameLanguage

          const movesEs = moveDetail.names.find(n => n.language.name === 'es')?.name || moveDetail.name

          return {
            id: detail.data.id,
            name: detail.data.name,
            nameEs: movesEs
          }
        })
      )
      pokeMoves.value = detailMoves
      console.log(pokeMoves.value)

    } catch (error) {
      console.log('Error al cargar movimientos:', error)
      swal.error('Error', 'Error al cargar los movimientos de los pokemones.')
    }
  }
  return {
    limit,
    pokeMoves,
    loadPokemonMoves
  }
})
