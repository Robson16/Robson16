type Localized = {
  [key: string]: string
}

type Image = {
  title: Localized
  src: string
  width: number
  height: number
}

type Repository = {
  type: Localized
  platform: string
  url: string
}

export type Project = {
  id: number
  featured: boolean
  featuredImage: Image
  gallery: Image[]
  category: Localized
  heading: Localized
  subheading: Localized
  description: Localized
  technologies: string[]
  url?: string
  urlLabel?: Localized
  repositories?: Repository[]
}
