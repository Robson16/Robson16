import { Icon } from './Icon'

export type Feature = {
  title: string
  description: string
  icon: Icon
}

export type SocialNetwork = {
  name: string
  url: string
  icon: Icon
}

export type About = {
  photoUrl: string
  name: string
  title: string
  description: string
  email: string
  location: {
    url: string
    name: string
  }
  social: SocialNetwork[]
  features: Feature[]
}
