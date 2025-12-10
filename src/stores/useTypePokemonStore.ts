
import type { PokemonName } from '@/interfaces/Pokemon'
import type { EvolutionChain, EvolutionChainResponse, PokeCard, PokemonAbilitieApi, PokemonAbilitieSlot, PokemonGenera, PokemonGenerationApi, PokemonHabitatApi, PokemonMove, PokemonMoveApi, PokemonSlot, PokemonSpecies, PokemonSpeciesName, PokemonType, PokemonTypeApi, PokemonTypeListItem, PokemonTypeSlot, PokemonWeaknessApi, PokeTypes } from '@/interfaces/PokemonType'
import PokemonServices from '@/services/PokemonServices'
import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'

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
  const pokemon = reactive<PokemonType>({
    id: '',
    name: '',
    nameEs: '',
    image: '',
    types: '',
    weaknesses: '',
    abilities: '',
    height: '',
    weight: '',
    stats: '',
    descriptionEs: '',
    specie: '',
    base_experience: '',
    crie: '',
    moves: '',
    generation: '',
    habitat: '',
    colors: '',
    evolutions: []
  })
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

   async function loadPokemonsType(id: string) {
    try {
      const typePokes = PokemonServices.getPokemonsType(id)
      const { data } = await typePokes


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

   async function loadPokemonType(id: string) {
    try {
      const pokeId = PokemonServices.getPokemon(id)
      const pokeData = await pokeId

      const data = pokeData.data

      const dataSpecies = await PokemonServices.getPokemonUrl(data.species.url)
      const species = dataSpecies.data

      const nameEs = species.names.find(
        (n: PokemonName) => n.language.name === 'es'
      )?.name || data.name


      const descriptionEs = species.flavor_text_entries.find(
        (flavor: PokemonSpecies) => flavor.language.name === 'es'
      )?.flavor_text.replace(/\f/g, ' ') || 'Sin descripción'


      const genereEs = species.genera.find(
        (g: PokemonGenera) => g.language.name === 'es'
      )?.genus || data.name

      const genResponse = await PokemonServices.getPokemonGeneration(species.generation.url)
      const genData = genResponse.data as PokemonGenerationApi

      const generationEs =
        genData.names.find(n => n.language.name === 'es')?.name || genData.name

      const habitatResponse = await PokemonServices.getPokemonGeneration(species.habitat.url)
      const habitatData = habitatResponse.data as PokemonHabitatApi

      const habitatEs =
        habitatData.names.find(n => n.language.name === 'es')?.name || habitatData.name

      const dataTypes: PokemonTypeApi[] = await Promise.all(
        (data.types as PokemonSlot[]).map(async (t) => {
          const res = await PokemonServices.getPokemonType(t.type.url)
          return res.data as PokemonTypeApi
        })
      )

      const typeEs = dataTypes.map(
        type => type.names.find(n => n.language.name === 'es')?.name || type.name
      )

      const typeColorsArray = data.types.map((t: PokemonSlot) => {
        const typeNameEn = dataTypes.find(dt => dt.name === t.type.name)?.names
          .find(n => n.language.name === 'en')?.name
          ?? t.type.name

        return typeColors[typeNameEn.toLowerCase()] ?? "#999"
      })
      const dataWeaknesses = await Promise.all(
        dataTypes.flatMap((type) =>
          (type as PokemonWeaknessApi).damage_relations.double_damage_from.map(async (w) => {
            const res = await PokemonServices.getPokemonType(w.url)
            return res.data as PokemonWeaknessApi
          })
        )
      )

      const weaknessEs = dataWeaknesses.map((type) =>
        type.names.find((n) => n.language.name === 'es')?.name || type.name
      )

      const dataAbilities = await Promise.all(
        (data.abilities as PokemonAbilitieSlot[]).map(async (t) => {
          const res = await PokemonServices.getPokemonAbilitie(t.ability.url)
          return res.data as PokemonAbilitieApi
        })
      )

      const abilitiesEs = dataAbilities.map(ability =>
        ability.names.find(n => n.language.name === 'es')?.name || ability.name
      )

      const dataMoves = await Promise.all(
        (data.moves as PokemonMove[]).map(async (m) => {
          const res = await PokemonServices.getPokemonMove(m.move.url)
          return res.data as PokemonMoveApi
        })
      )

      const moveEs = dataMoves.map(move =>
        move.names.find(n => n.language.name === 'es')?.name || move.name
      )

      const evoChainUrl = species.evolution_chain.url
      const evoResponse = await PokemonServices.getEvolutionChain(evoChainUrl)
      const evoData = evoResponse.data as EvolutionChainResponse

      const evolutions: { name: string; nameEs: string; image: string }[] = []

      // función recursiva tipada
      const parseEvolutionChain = async (chain: EvolutionChain): Promise<void> => {
        const pokeName = chain.species.name

        const pData = await PokemonServices.getPokemon(pokeName)

        const pSpecies = await PokemonServices.getPokemonUrl(pData.data.species.url)

        const nameEs =
          pSpecies.data.names.find((n: PokemonSpeciesName) => n.language.name === 'es')
            ?.name || pokeName

        evolutions.push({
          name: pokeName,
          nameEs,
          image: pData.data.sprites.other['official-artwork'].front_default
        })

        if (chain.evolves_to.length > 0) {
          for (const evo of chain.evolves_to) {
            await parseEvolutionChain(evo)
          }
        }
      }

      await parseEvolutionChain(evoData.chain)

      Object.assign(pokemon, {
        id: data.id,
        name: data.name,
        nameEs: nameEs,
        image: data.sprites.other['official-artwork'].front_default,
        types: typeEs,
        weaknesses: weaknessEs,
        abilities: abilitiesEs,
        height: data.height / 10,
        weight: data.weight / 10,
        stats: data.stats,
        descriptionEs: descriptionEs,
        specie: genereEs,
        evolutions: evolutions,
        crie: data.cries.latest,
        moves: moveEs,
        generation: generationEs,
        habitat:habitatEs,
        base_experience: data.base_experience,
        colors: typeColorsArray
      },

      console.log(pokemon)
      )

    } catch (error) {
      console.log('Erro al cargar pokemón:', error)
    }

   }
  return {
    pokeTypes,
    pokeCard,
    pokemon,
    loadTypesPoke,
    loadPokemonsType,
    loadPokemonType
  }
})
