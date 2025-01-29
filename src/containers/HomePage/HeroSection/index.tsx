import DynamicIcon from '@/components/DynamicIcon'
import { About } from '@/types/About'
import { Button, Link } from '@heroui/react'
import Image from 'next/image'
import { AiOutlineMail } from 'react-icons/ai'
import { FaMapMarkerAlt } from 'react-icons/fa'

type HeroSectionProps = Omit<About, 'description' | 'features'>

export default function HeroSection({
  photoUrl,
  name,
  title,
  email,
  location,
  social,
}: HeroSectionProps) {
  return (
    <section
      id="home"
      className="bg-[url('/images/code.jpg')] bg-cover bg-center"
    >
      <div className="bg-black bg-opacity-70">
        <div className="container mx-auto max-w-screen-lg px-4 py-20 md:py-40 lg:py-56">
          <div className="flex flex-col-reverse gap-8 lg:flex-row">
            <div className="flex flex-1 flex-col items-center justify-center lg:items-start">
              <span className="mb-4 rounded-r-[20px] rounded-tl-[20px] bg-emerald-800 px-8 py-2">
                Olá, me chamo
              </span>
              <h1 className="mb-4 text-center text-5xl font-bold lg:text-left">
                {name}
              </h1>
              <h2 className="text-2xl font-medium">{title}</h2>
              <ul className="my-10">
                <li className="group my-2 flex items-center">
                  <AiOutlineMail
                    size={22}
                    className="mr-2 text-gray-500 transition-colors group-hover:text-emerald-600"
                  />
                  <a href={`mailto:${email}`}>{email}</a>
                </li>
                <li className="group my-2 flex items-center">
                  <FaMapMarkerAlt
                    size={22}
                    className="mr-2 text-gray-500 transition-colors group-hover:text-emerald-600"
                  />
                  <a
                    href={location.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {location.name}
                  </a>
                </li>
              </ul>
              <div className="flex items-center gap-4">
                {social.map((item) => {
                  console.log(item.icon.color)

                  return (
                    <Button
                      key={item.name}
                      isIconOnly
                      as={Link}
                      href={item.url}
                      aria-label={`Meu ${item.name}`}
                      className="group flex h-auto w-auto min-w-0 items-start justify-center bg-transparent p-0"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <DynamicIcon
                        icon={item.icon.name}
                        iconFamily={item.icon.family}
                        size={30}
                        className="transition-colors group-hover:text-emerald-600"
                      />
                    </Button>
                  )
                })}
              </div>
            </div>
            <div className="flex flex-1 flex-col items-center lg:items-end">
              <figure className="rounded-full border-[20px] border-zinc-950">
                <Image
                  src={photoUrl}
                  priority={true}
                  alt={`Foto de ${name}`}
                  width={360}
                  height={360}
                  className="mx-auto max-w-[240px] rounded-full border-[20px] border-zinc-900 lg:max-w-none"
                />
              </figure>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
