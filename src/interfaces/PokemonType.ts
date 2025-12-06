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

export interface PokemonType {
  damage_relations: DamageRelations;
  game_indices: GameIndex[];
  generation: NamedAPIResource;
  id: number;
  move_damage_class: NamedAPIResource;
  moves: NamedAPIResource[];
  name: string;
  names: TypeName[];
  past_damage_relations: PastDamageRelation[];
  pokemon: TypePokemon[];
}

export interface DamageRelations {
  double_damage_from: NamedAPIResource[];
  double_damage_to: NamedAPIResource[];
  half_damage_from: NamedAPIResource[];
  half_damage_to: NamedAPIResource[];
  no_damage_from: NamedAPIResource[];
  no_damage_to: NamedAPIResource[];
}

export interface GameIndex {
  game_index: number;
  generation: NamedAPIResource;
}

export interface TypeName {
  name: string;
  language: NamedAPIResource;
}

export interface PastDamageRelation {
  generation: NamedAPIResource;
  damage_relations: DamageRelations;
}

export interface TypePokemon {
  slot: number;
  pokemon: NamedAPIResource;
}

export interface NamedAPIResource {
  name: string;
  url: string;
}


export interface PokeCard {
  id: number
  name: string
  image: string
  abilities: string[]
  height: number
  weight: number
}
