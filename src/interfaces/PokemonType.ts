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

export interface PokeTypeApi {
  name: string;
  damage_relations: {
    double_damage_from: { name: string; url: string }[];
  };
  names: { language: { name: string }; name: string }[];
}


export interface PokemonTypeSlot {
  pokemon: {
    name: string
    url: string
  }
  slot: number
}

export interface PokemonSlot {
  slot: number
  type: {
    name: string
    url: string
  }
}

export interface PokemonGenerationSlot {
    name: string
    url: string
}

export interface PokemonGenerationApi {
  name: string
  names: {
    language: {
      name: string
    }
    name: string
  }[]
}


export interface PokemonHabitatSlot {
    name: string
    url: string
}

export interface PokemonHabitatApi {
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

export interface PokemonName {
  name: string
  language: {
    name: string
  }
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

export interface PokemonAbilitieSlot {
  slot: number
  is_hidden: boolean
  ability: {
    name: string
    url: string
  }
}

export interface PokemonType {
  id: string
  base_experience: string
  name: string
  nameEs: string
  image: string
  types: string
  crie: string
  weaknesses: string
  abilities: string
  height: string
  weight: string
  stats: PokemonStat[]
  descriptionEs: string
  specie: string
  evolutions: Evolution[]
  moves: string
  generation: string
  habitat?: string
  colors: string[]
  weaknessColors: string[]
}

export interface Evolution {
  name: string
  nameEs: string
  image: string
}


export interface PokeWeaknesses {
  name: string;
  url: string;
}

export interface EvolutionChainResponse {
  id: number
  chain: EvolutionChain
}

export interface EvolutionChain {
  species: {
    name: string
    url: string
  }
  evolves_to: EvolutionChain[]
}

export interface PokemonSpeciesName {
  language: {
    name: string
    url: string
  }
  name: string
}

export interface PokemonMoveApi {
  name: string
  names: {
    language: {
      name: string
    }
    name: string
  }[]
}

export interface PokemonMove {
  move: MoveInfo;
  version_group_details: VersionGroupDetail[];
}

export interface MoveInfo {
  name: string;
  url: string;
}

export interface VersionGroupDetail {
  level_learned_at: number;
  move_learn_method: MoveLearnMethod;
  order: number | null;
  version_group: VersionGroup;
}

export interface MoveLearnMethod {
  name: string;
  url: string;
}

export interface VersionGroup {
  name: string;
  url: string;
}


export interface WeaknessReference {
  name: string
  url: string
}

// LanguageName.ts
export interface LanguageName {
  name: string
  language: {
    name: string
  }
}


export interface PokemonTypeApiFull {
  name: string
  names: LanguageName[]

  damage_relations: {
    double_damage_from: WeaknessReference[]
    double_damage_to: WeaknessReference[]
    half_damage_from: WeaknessReference[]
    half_damage_to: WeaknessReference[]
    no_damage_from: WeaknessReference[]
    no_damage_to: WeaknessReference[]
  }
}

export interface PokemonWeaknessApi {
  name: string
  names: LanguageName[]
  damage_relations: {
    double_damage_from: WeaknessReference[]
    double_damage_to: WeaknessReference[]
    half_damage_from: WeaknessReference[]
    half_damage_to: WeaknessReference[]
    no_damage_from: WeaknessReference[]
    no_damage_to: WeaknessReference[]
  }
}

export interface PokemonStat {
  base_stat: number,
  effort: number,
  stat: {
      name: string,
  }
}
