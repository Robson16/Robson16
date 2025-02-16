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
      className={`fixed left-0 top-0 z-50 w-full transition-all duration-300 ${isScrolled ? 'bg-zinc-800 shadow-lg lg:py-6' : 'bg-transparent lg:py-5'}`}
    >
      <div className="container mx-auto">
        <nav className="flex items-start justify-between transition-all max-lg:px-4 max-lg:py-6 lg:items-center lg:justify-center lg:space-x-10">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="z-[1081] flex flex-col gap-2 text-white lg:hidden"
            aria-label="Toggle navigation"
            aria-expanded={isOpen}
          >
            <span className="block h-[2px] w-8 rounded bg-white"></span>
            <span className="block h-[2px] w-8 rounded bg-white"></span>
            <span className="block h-[2px] w-8 rounded bg-white"></span>
          </button>

          <div
            className={`z-[1080] flex transition-all max-lg:absolute max-lg:left-0 max-lg:top-0 max-lg:h-screen max-lg:w-80 max-lg:bg-emerald-800 max-lg:px-4 max-lg:pt-20 lg:items-center lg:justify-center ${isOpen ? 'max-lg:translate-x-0' : 'max-lg:-translate-x-[120%]'}`}
          >
            <ul className="flex flex-col text-lg font-bold text-white lg:flex-row lg:space-x-10 lg:text-center">
              {[
                { label: 'Início', href: 'home' },
                { label: 'Sobre', href: 'about' },
                { label: 'Habilidades', href: 'skills' },
                { label: 'Experiências', href: 'experience' },
                { label: 'Portfólio', href: 'portfolio' },
                { label: 'Contato', href: 'contact' },
              ].map(({ label, href }) => (
                <li key={href} className="flex items-center py-2 lg:py-0">
                  <Link
                    onClick={() => setIsOpen(false)}
                    href={`#${href}`}
                    className={`lg:hover:text-emerald-500 ${activeSection === href ? 'border-b-2 border-white' : ''}`}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <LocalSwitcher />
        </nav>
      </div>
    </header>
  )
}
