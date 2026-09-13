export type Language = {
  key: string
  label: string
}

export type Locale = {
  languages: Language[]
  default: string
}
