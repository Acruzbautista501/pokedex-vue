import type { PokemonAbilitieApi, PokemonAbilitieSlot, PokemonGenera, PokemonName, PokemonSpecies, PokemonTypeApi, PokemonTypeSlot, PokeSearch } from "@/interfaces/Pokemon"
import PokemonServices from "@/services/PokemonServices"
import { reactive, ref, toRaw } from "vue"

export default function useSearchPokemon () {
  const showPokeSearchModal = ref<boolean>(false)
  const searchPokemon = ref<string>('')
  const pokemon = reactive<PokeSearch>({
    id: 0,
    name: "",
    nameEs: "",
    image: "",
    types: [],
    abilities: [],
    height: 0,
    weight: 0,
    stats: [],
    descriptionEs: "",
    specie: ""
  })

  const loadPokemon = async (pokeName: string) => {
    showPokeSearchModal.value = true
    try {
      const pokeSearch = PokemonServices.getPokemon(pokeName)
      const pokeData = await pokeSearch

      const data = pokeData.data

      const dataSpecies = await PokemonServices.getPokemonSpecies(data.species.url)
      const species = dataSpecies.data

      const nameEs =
      species.names.find(
        (name: PokemonName) => name.language.name === 'es'
      )?.name || data.name

      const descriptionEs = species.flavor_text_entries.find(
        (flavor: PokemonSpecies) => flavor.language.name === 'es'
      )?.flavor_text.replace(/\f/g, ' ') || 'Sin descripción'

      const genereEs = species.genera.find(
        (genera: PokemonGenera) => genera.language.name === 'es'
      )?.genus || data.name


    const dataTypes = await Promise.all(
      (data.types as PokemonTypeSlot[]).map(async (t) => {
        const res = await PokemonServices.getPokemonTypes(t.type.url)
        return res.data as PokemonTypeApi
      })
    )

    const typesEs = dataTypes.map(type =>
      type.names.find(n => n.language.name === 'es')?.name || type.name
    )

    const dataAbilities = await Promise.all(
      (data.abilities as PokemonAbilitieSlot[]).map(async (t) => {
        const res = await PokemonServices.getPokemonAbilities(t.ability.url)
        return res.data as PokemonAbilitieApi
      })
    )

    const abilitiesEs = dataAbilities.map(ability =>
      ability.names.find(n => n.language.name === 'es')?.name || ability.name
    )

    Object.assign(pokemon, {
      id: data.id,
      name: data.name,
      nameEs: nameEs,
      image: data.sprites.other['official-artwork'].front_default,
      types: typesEs,
      abilities: abilitiesEs,
      height: data.height / 10,
      weight: data.weight / 10,
      stats: data.stats,
      descriptionEs: descriptionEs,
      specie: genereEs
    })

    console.log(toRaw(pokemon))

    } catch (error) {
      console.log('Error al cargar el pokémon:', error)
    }
  }

  return {
    pokemon,
    searchPokemon,
    showPokeSearchModal,
    loadPokemon,
  }
}
