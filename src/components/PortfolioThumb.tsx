import { Project } from '@/types/Project'
import {
  Button,
  Link,
  Modal,
  ModalBody,
  ModalContent,
  useDisclosure,
} from '@heroui/react'
import clsx from 'clsx'
import Image from 'next/image'
import { AiFillGithub, AiFillGitlab } from 'react-icons/ai'
import { ImGit } from 'react-icons/im'
import { PiMagnifyingGlassBold } from 'react-icons/pi'
import { useMediaQuery } from 'react-responsive'

type PortfolioThumbProps = {
  project: Project
}

const getPlatformIcon = (platform: string) => {
  switch (platform) {
    case 'GitHub':
      return <AiFillGithub size={25} />
    case 'GitLab':
      return <AiFillGitlab size={25} />
    default:
      return <ImGit size={25} />
  }
}

export default function PortfolioThumb({ project }: PortfolioThumbProps) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const isMobile = useMediaQuery({ maxWidth: 768 })

  const { featuredImage, heading } = project

  return (
    <>
      <div
        className={clsx(
          'group relative cursor-pointer outline-none',
          'focus-within:rounded-lg focus-within:ring-4 focus-within:ring-teal-600',
        )}
        onClick={onOpen}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault() // Prevent accidental scrolling with Space
            onOpen()
          }
        }}
      >
        <Image
          src={featuredImage.src}
          alt={`Imagem destacada do projeto ${heading}`}
          className="rounded-lg shadow-xl transition"
          width={featuredImage.width}
          height={featuredImage.height}
        />
        <div
          className={clsx(
            'absolute inset-0 flex cursor-pointer flex-col items-center justify-center rounded-lg',
            'duration-600 bg-teal-600 bg-opacity-90 text-white opacity-0 transition-opacity ease-in-out',
            'group-hover:opacity-100',
          )}
          onClick={onOpen}
        >
          <PiMagnifyingGlassBold size={30} className="mb-4" />
          <h4 className="mb-2 text-xl font-bold">{heading}</h4>
          <span className="text-sm uppercase tracking-wide">Ver mais</span>
        </div>
      </div>

      <Modal
        isOpen={isOpen}
        size={isMobile ? 'sm' : '5xl'}
        scrollBehavior={'outside'}
        onClose={onClose}
        backdrop="opaque"
        classNames={{
          closeButton:
            'p-2 m-2 bg-teal-600 text-white rounded-full transition-background ease-in-out duration-300',
          backdrop: 'bg-black/90 backdrop-opacity-90 transition-opacity',
          base: 'transition-transform transition-opacity duration-300 ease-in-out transform scale-95',
        }}
      >
        <ModalContent>
          <ModalBody className="flex flex-col gap-8 p-6 pt-14 sm:pt-6 lg:flex-row">
            <ModalContentBody project={project} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

function ModalContentBody({ project }: { project: Project }) {
  const {
    featuredImage,
    category,
    heading,
    subheading,
    description,
    technologies,
    url,
    urlLabel,
    repositories,
  } = project

  return (
    <div className="flex columns-2 flex-col gap-8 sm:flex-col sm:gap-4 lg:flex-row">
      <div className="flex-1">
        <Image
          src={featuredImage.src}
          alt={`Imagem destacada do projeto ${project.heading}`}
          width={featuredImage.width}
          height={featuredImage.height}
          className="rounded-lg"
        />
      </div>
      <div className="flex flex-1 flex-col items-center lg:items-start">
        <span className="bold text-1xl mb-2 uppercase text-teal-600">
          {category}
        </span>
        <h4 className="bold mb-2 text-3xl uppercase">{heading}</h4>
        <h5 className="mb-4 uppercase">{subheading}</h5>
        <p className="mb-8 text-center lg:text-left">{description}</p>
        {technologies.length > 0 && (
          <ul className="mb-8 flex flex-wrap justify-center gap-4 lg:justify-start">
            {technologies.map((tech) => (
              <li
                key={tech}
                className="rounded border border-solid border-teal-600 px-3 py-1"
              >
                {tech}
              </li>
            ))}
          </ul>
        )}
        <ul className="flex flex-col flex-wrap gap-4 md:flex-row">
          {/* Link do site do projeto */}
          {url && (
            <li>
              <Button
                size="lg"
                radius="full"
                as={Link}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${urlLabel || 'Visitar site'} do projeto ${heading}`}
                role="link"
                className={clsx(
                  'flex items-center gap-2 px-8 py-3',
                  'bg-teal-600 font-bold text-white transition-all',
                  'hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500',
                )}
              >
                {urlLabel || 'Visitar site'}
              </Button>
            </li>
          )}

          {/* Links dos repositórios */}
          {repositories &&
            repositories.length > 0 &&
            repositories.map((repo) => (
              <li key={repo.url}>
                <Button
                  size="lg"
                  radius="full"
                  as={Link}
                  href={repo.url}
                  startContent={getPlatformIcon(repo.platform)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={clsx(
                    'flex items-center gap-2 px-4 py-3',
                    'bg-teal-600 font-bold text-white transition-all',
                    'hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500',
                  )}
                >
                  <span>{repo.type}</span>
                </Button>
              </li>
            ))}
        </ul>
      </div>
    </div>
  )
}
