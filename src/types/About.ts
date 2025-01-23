import { Icon } from './Icon'

export type Feature = {
  title: string
  description: string
  icon: Icon
}

export type About = {
  name: string
  title: string
  description: string
  email: string
  address: string
  social: {
    gitlab: string
    github: string
    linkedin: string
  }
  features: Feature[]
}
