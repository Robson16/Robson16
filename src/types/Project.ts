export type Project = {
  id: number
  featured: boolean
  featuredImage: {
    title: string
    src: string
    width: number
    height: number
  }
  category: string
  heading: string
  subheading: string
  description: string
  url: string
}
