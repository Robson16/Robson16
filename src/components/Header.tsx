'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import LocalSwitcher from './LocalSwitcher'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)

      const sections = [
        { id: 'home', offset: 0 },
        { id: 'about', offset: 200 },
        { id: 'skills', offset: 200 },
        { id: 'experience', offset: 200 },
        { id: 'portfolio', offset: 200 },
        { id: 'contact', offset: 200 },
      ]

      let currentSection = 'home'

      sections.forEach(({ id, offset }) => {
        const element = document.getElementById(id)
        if (element && window.scrollY >= element.offsetTop - offset) {
          currentSection = id
        }
      })

      setActiveSection((prevSection) =>
        prevSection !== currentSection ? currentSection : prevSection,
      )
    }

    window.addEventListener('scroll', handleScroll)

    handleScroll() // Call to check the position when loading the page

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <header
      className={`fixed left-0 top-0 z-50 w-full transition-all duration-300 ${isScrolled ? 'bg-zinc-800 shadow-lg md:py-6' : 'bg-transparent md:py-5'}`}
    >
      <div className="container mx-auto">
        <nav className="flex flex-col items-start justify-between transition-all max-md:px-4 max-md:py-6 md:flex-row md:items-center md:justify-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="z-10 flex flex-col gap-2 text-white md:hidden"
            aria-label="Toggle navigation"
            aria-expanded={isOpen}
          >
            <span className="block h-[2px] w-8 rounded bg-white"></span>
            <span className="block h-[2px] w-8 rounded bg-white"></span>
            <span className="block h-[2px] w-8 rounded bg-white"></span>
          </button>

          <div
            className={`flex transition-all max-md:absolute max-md:left-0 max-md:top-0 max-md:h-screen max-md:w-80 max-md:bg-emerald-800 max-md:px-4 max-md:pt-20 md:items-center md:justify-center ${isOpen ? 'max-md:translate-x-0' : 'max-md:-translate-x-[120%]'}`}
          >
            <ul className="flex flex-col text-lg font-bold text-white md:flex-row md:space-x-10 md:text-center">
              {[
                { label: 'Início', href: 'home' },
                { label: 'Sobre', href: 'about' },
                { label: 'Habilidades', href: 'skills' },
                { label: 'Experiências', href: 'experience' },
                { label: 'Portfólio', href: 'portfolio' },
                { label: 'Contato', href: 'contact' },
              ].map(({ label, href }) => (
                <li key={href} className="py-2 md:py-0">
                  <Link
                    onClick={() => setIsOpen(false)}
                    href={`#${href}`}
                    className={`md:hover:text-teal-500 ${activeSection === href ? 'border-b-2 border-white' : ''}`}
                  >
                    {label}
                  </Link>
                </li>
              ))}
              <li className="py-2 md:py-0">
                <LocalSwitcher />
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </header>
  )
}
