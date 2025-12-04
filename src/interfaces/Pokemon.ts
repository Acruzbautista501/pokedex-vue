export interface PokemonStat {
  base_stat: number,
  effort: number,
  stat: {
      name: string,
  }
}

export interface PokemonName {
  name: string
  language: {
    name: string
  }
}

export interface PokemonType {
  name: string
  language: {
    name: string
  }
}

export interface PokemonTypeSlot {
  slot: number
  type: {
    name: string
    url: string
  }
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


export interface PokemonAbilitieApi {
  name: string
  names: {
    language: {
      name: string
    }
    name: string
  }[]
}

export interface PokemonSpecies {
  name: string
  language: {
    name: string
  }
}

export interface PokemonGenera {
  genus: string,
  language: {
      name: string,
  }
}

export interface PokeSearch {
  id: number
  name: string
  nameEs: string
  image: string
  types: string[]
  specie: string
  abilities: string[]
  height: number
  weight: number
  stats: PokemonStat[]
  descriptionEs: string
}
