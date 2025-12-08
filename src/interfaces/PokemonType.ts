export interface PokemonTypes {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonTypeListItem[];
}

export interface PokeTypes {
  id: number
  name: string
  nameEs: string
  color: string
  icon: string
}

export interface PokemonTypeApi {
  name: string
  names: {
    language: {
      name: string
    }
    name: string
  }[]
}

export interface PokemonTypeSlot {
  pokemon: {
    name: string
    url: string
  }
  slot: number
}

export interface PokemonAbilitieSlot {
  slot: number
  is_hidden: boolean
  ability: {
    name: string
    url: string
  }
}

export interface PokemonAbilitieApi {
  name: string
  names: {
    language: {
      name: string
    }
    name: string
  }[]
}

export interface PokemonTypeListItem {
  name: string;
  url: string;
}

export interface PokeCard {
  id: number
  name: string
  image: string
  abilities: string[]
  color: string
  icon: string
  height: number
  weight: number
}
