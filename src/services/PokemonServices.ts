import api from "@/api/PokeAPI"

export default {
  getPokemon(pokemon: string){
    return api.get(`/pokemon/${pokemon}`)
  },
  getPokemonSpecies(url: string) {
    return api.get(url)
  },
  getPokemonTypes(url: string) {
    return api.get(url)
  },
  getPokemonAbilities(url: string) {
    return api.get(url)
  },
  getTypes() {
    return api.get('/type')
  },
  getAbilities() {
    return api.get('/ability')
  },

}
