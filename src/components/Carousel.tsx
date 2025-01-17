'use client'

import { ReactNode, useEffect, useRef } from 'react'
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi2'
import { Swiper as SwiperClass } from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import { A11y, Navigation, Pagination, Scrollbar } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

type Slide = {
  id: number
  content: ReactNode
}

interface CarouselProps {
  slides: Slide[]
  navigation?: boolean
  pagination?: boolean
  scrollbar?: boolean
  loop?: boolean
}

export default function Carousel({
  slides,
  navigation = false,
  pagination = false,
  scrollbar = false,
  loop = false,
}: CarouselProps) {
  const prevRef = useRef<HTMLButtonElement | null>(null)
  const nextRef = useRef<HTMLButtonElement | null>(null)

  useEffect(() => {
    if (navigation && prevRef.current && nextRef.current) {
      const swiper: SwiperClass = new SwiperClass('.swiper-container', {
        modules: [Navigation, Pagination, Scrollbar, A11y],
        spaceBetween: 50,
        slidesPerView: 1,
        navigation: {
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        },
        pagination: pagination ? { clickable: true } : false,
        scrollbar: scrollbar ? { draggable: true } : false,
        loop,
      })

      return () => {
        swiper.destroy()
      }
    }
  }, [navigation, pagination, scrollbar, loop])

  return (
    <div className="relative">
      <Swiper
        className="max-w-[92%]"
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={50}
        slidesPerView={1}
        navigation={
          navigation
            ? { prevEl: prevRef.current, nextEl: nextRef.current }
            : false
        }
        pagination={pagination ? { clickable: true } : false}
        scrollbar={scrollbar ? { draggable: true } : false}
        loop={loop}
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>{slide.content}</SwiperSlide>
        ))}
      </Swiper>

      {navigation && (
        <>
          <button
            ref={prevRef}
            className="absolute left-0 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-gray-800 text-white shadow-md transition hover:bg-teal-600 lg:-left-8"
          >
            <HiChevronLeft size={20} />
          </button>
          <button
            ref={nextRef}
            className="absolute right-0 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-gray-800 text-white shadow-md transition hover:bg-teal-600 lg:-right-8"
          >
            <HiChevronRight size={20} />
          </button>
        </>
      )}
    </div>
  )
}
