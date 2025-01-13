'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }

      const sections = [
        '#home',
        '#about',
        '#skills',
        '#experience',
        '#portfolio',
        '#contact',
      ]
      let currentSection = ''

      sections.forEach((section) => {
        const element = document.querySelector(section) as HTMLElement

        if (element && window.scrollY >= element.offsetTop - 200) {
          currentSection = section
        }
      })

      if (currentSection !== activeSection) {
        setActiveSection(currentSection)
      }
    }

    window.addEventListener('scroll', handleScroll)

    handleScroll() // Call to check the position when loading the page

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [activeSection])

  return (
    <header
      className={`fixed left-0 top-0 z-50 w-full transition-all duration-300 ${isScrolled ? 'bg-zinc-800 py-5 shadow-lg' : 'bg-transparent py-4'} `}
    >
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between py-4 md:justify-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white md:hidden"
            aria-label="Toggle navigation"
          >
            <span className="text-2xl">☰</span>
          </button>

          <div
            className={`md:flex md:items-center md:justify-center ${isOpen ? 'block' : 'hidden'} `}
          >
            <ul className="flex flex-col text-center text-lg font-bold text-white md:flex-row md:space-x-10">
              {[
                { label: 'Inicio', href: '#home' },
                { label: 'Sobre', href: '#about' },
                { label: 'Habilidades', href: '#skills' },
                { label: 'Experiências', href: '#experience' },
                { label: 'Portfólio', href: '#portfolio' },
                { label: 'Contato', href: '#contact' },
              ].map(({ label, href }) => (
                <li key={href} className="py-2 md:py-0">
                  <Link
                    href={href}
                    className={`hover:text-teal-500 ${
                      activeSection === href
                        ? 'border-b-2 border-teal-500 text-teal-500'
                        : ''
                    } `}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </div>
    </header>
  )
}
