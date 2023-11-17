export type places = place[]

export interface place {
  name: string
  local_names: LocalNames
  lat: number
  lon: number
  country: string
  state: string
}

export interface LocalNames {
  es: string
}