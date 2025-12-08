
import type { PokeCard, PokemonAbilitieApi, PokemonAbilitieSlot, PokemonTypeApi, PokemonTypeListItem, PokemonTypeSlot, PokeTypes } from '@/interfaces/PokemonType'
import PokemonServices from '@/services/PokemonServices'
import { defineStore } from 'pinia'
import { ref } from 'vue'

const typeColors: Record<string, string> = {
  normal: "#A8A77A",
  fire: "#EE8130",
  water: "#6390F0",
  electric: "#F7D02C",
  grass: "#7AC74C",
  ice: "#96D9D6",
  fighting: "#C22E28",
  poison: "#A33EA1",
  ground: "#E2BF65",
  flying: "#A98FF3",
  psychic: "#F95587",
  bug: "#A6B91A",
  rock: "#B6A136",
  ghost: "#735797",
  dragon: "#6F35FC",
  dark: "#705746",
  steel: "#B7B7CE",
  fairy: "#D685AD"
}

export const useTypePokemonStore = defineStore('typeStore', () => {
  const pokeTypes = ref<PokeTypes[]>([])
  const pokeCard = ref<PokeCard[]>([])
   async function loadTypesPoke() {
    try {
      const typesPoke = PokemonServices.getTypes()
      const { data } = await typesPoke

      const detailTypes = await Promise.all(
        (data.results as PokemonTypeListItem[]).map(async (t) => {
          const detail = await PokemonServices.getPokemonType(t.url)
          const pokeDetail = detail.data as PokemonTypeApi

          const typesEs = pokeDetail.names.find(n => n.language.name === 'es')?.name || pokeDetail.name

          // Asignamos iconos según el tipo
          let iconUrl: string
          switch (pokeDetail.name) {
            case 'stellar':
              iconUrl = 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/stellar.svg' // SVG genérico Stellar
              break
            case 'unknown':
              iconUrl = "https://cdn.jsdelivr.net/npm/feather-icons/dist/icons/help-circle.svg"; // SVG genérico Unknown
              break
            default:
              iconUrl = `https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/master/icons/${pokeDetail.name}.svg`
          }
          return {
            id: detail.data.id,
            name: detail.data.name,
            nameEs: typesEs,
            color: typeColors[pokeDetail.name] || "#999",
            icon: iconUrl
          }
        })
      )
      pokeTypes.value = detailTypes

    } catch (error) {
      console.log('Error al cargar tipos:', error)
    }
   }

   async function loadPokemonsType(id: number) {
    try {
      const typePokes = PokemonServices.getPokemonsType(id)
      const { data } = await typePokes
      console.log(data)

      const pokemonDetails = await Promise.all (
        (data.pokemon as PokemonTypeSlot[]).map(async (p) => {
          const res = await PokemonServices.getPokemonUrl(p.pokemon.url)
          const response = res.data
          // console.log(response)

        const dataAbilities = await Promise.all(
          (response.abilities as PokemonAbilitieSlot[]).map(async (t) => {
            const res = await PokemonServices.getPokemonAbilitie(t.ability.url)
            return res.data as PokemonAbilitieApi
          })
        )
        const abilitiesEs = dataAbilities.map(ability =>
          ability.names.find(n => n.language.name === 'es')?.name || ability.name
        )

          let iconLink: string
          switch (data.name) {
            case 'stellar':
              iconLink = 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/stellar.svg' // SVG genérico Stellar
              break
            case 'unknown':
              iconLink = "https://cdn.jsdelivr.net/npm/feather-icons/dist/icons/help-circle.svg"; // SVG genérico Unknown
              break
            default:
              iconLink = `https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/master/icons/${data.name}.svg`
          }

        return {
          id: res.data.id,
          name: res.data.name,
          image: res.data.sprites.other['showdown'].front_default,
          abilities: abilitiesEs,
          height: res.data.height / 10,
          color: typeColors[data.name] || "#999",
          icon: iconLink,
          weight: res.data.weight / 10,
        }
        })
      )
      pokeCard.value = pokemonDetails

    } catch (error) {
      console.log('Error al cargar los pokémon:', error)
    }
   }

  //  async function loadPokemonType(id: string) {
  //   try {
  //     const pokeId = PokemonServices.getPokemon(id)
  //     const pokeData = await pokeId

  //     const data = pokeData.data

  //   } catch (error) {

  //   }

  //  }
  return {
    pokeTypes,
    pokeCard,
    loadTypesPoke,
    loadPokemonsType,
    // loadPokemonType
  }
})
