import api from "@/api/PokeAPI"

export default {
  getPokemon(pokemon: string){
    return api.get(`/pokemon/${pokemon}`)
  },
  getPokemonSpecies(url: string) {
    return api.get(url)
  },
  getEvolutionChain(url: string){
    return api.get(url)
  },
  getPokemonType(url: string) {
    return api.get(url)
  },
  getPokemonAbilitie(url: string) {
    return api.get(url)
  },
  getPokemonMove(url: string) {
    return api.get(url)
  },
  getPokemonGeneration(url: string) {
    return api.get(url)
  },
  getPokemonHabitat(url: string) {
    return api.get(url)
  },
  getTypes() {
    return api.get('/type')
  },
  getAbilities() {
    return api.get('/ability')
  },
  getPokemonsType(id: string) {
    return api.get(`/type/${id}`)
  },
  getPokemonUrl(url: string){
    return api.get(url)
  }
}
