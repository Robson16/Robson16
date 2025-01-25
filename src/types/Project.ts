type Image = {
  title: string
  src: string
  width: number
  height: number
}

export type Project = {
  id: number
  featured: boolean
  featuredImage: Image
  gallery: Image[]
  category: string
  heading: string
  subheading: string
  description: string
  technologies: string[]
  url?: string
  urlLabel?: string
}
