'use client'

import { Modal } from '@heroui/react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { PiMagnifyingGlassBold } from 'react-icons/pi'

interface ProjectImageModalProps {
  src: string
  alt: string
  triggerClassName: string
  imageClassName: string
  sizes: string
}

export default function ProjectImageModal({
  src,
  alt,
  triggerClassName,
  imageClassName,
  sizes,
}: ProjectImageModalProps) {
  const t = useTranslations('ProjectDetails')

  return (
    <Modal>
      <Modal.Trigger
        aria-label={`Ver imagem ampliada: ${alt}`}
        className={`${triggerClassName} group cursor-zoom-in focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:outline-none`}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          className={imageClassName}
        />
        <span
          aria-hidden="true"
          className="absolute inset-0 flex flex-col items-center justify-center rounded-xl bg-emerald-800/90 text-white opacity-0 transition-opacity duration-600 ease-in-out group-hover:opacity-100 group-focus-visible:opacity-100"
        >
          <PiMagnifyingGlassBold size={30} className="mb-4" />
          <span className="text-sm tracking-wide uppercase">
            {t('viewImage')}
          </span>
        </span>
      </Modal.Trigger>

      <Modal.Backdrop className="bg-black/90 backdrop-opacity-90 transition-opacity">
        <Modal.Container>
          <Modal.Dialog className="relative h-[85vh] w-[94vw] max-w-7xl overflow-hidden bg-zinc-950 p-2 shadow-none sm:p-4">
            <Modal.CloseTrigger className="absolute top-3 right-3 z-10 rounded-full bg-zinc-800/90 p-2 text-white transition-colors hover:bg-emerald-700 focus-visible:ring-2 focus-visible:ring-emerald-400" />
            <Modal.Body className="relative size-full">
              <Image
                src={src}
                alt={alt}
                fill
                sizes="94vw"
                className="object-contain"
                priority
              />
            </Modal.Body>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  )
}
