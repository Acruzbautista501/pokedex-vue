export interface PokeMoves {
  id: number
  name: string
  nameEs: string
}

export interface MoveListItem {
  name: string
  url: string
}

export interface MoveListResponse {
  count: number
  next: string | null
  previous: string | null
  results: MoveListItem[]
}

export interface NameLanguage {
  name: string
  names: {
    language: {
      name: string
    }
    name: string
  }[]
}

export interface filterSearch {
  moves: {
    nameEs: string
  }[]
  search: string
}

// export interface MoveDetails {
//     id: number
//     name: string
//     names: NameLanguage[]
// }
