'use client'

import React from 'react'
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi2'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'

type CarouselProps = {
  children: React.ReactNode
  dots?: boolean
  infinite?: boolean
  speed?: number
  slidesToShow?: number
  slidesToScroll?: number
}

type ArrowProps = React.ButtonHTMLAttributes<HTMLButtonElement>

const PrevArrow: React.FC<ArrowProps> = ({ onClick }) => (
  <button
    className="absolute left-0 top-1/2 z-10 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-gray-800 text-white shadow-md transition hover:bg-teal-600 lg:-left-8"
    onClick={onClick}
    aria-label="Previous slide"
  >
    <HiChevronLeft size={20} />
  </button>
)

const NextArrow: React.FC<ArrowProps> = ({ onClick }) => (
  <button
    className="absolute right-0 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-full bg-gray-800 text-white shadow-md transition hover:bg-teal-600 lg:-right-8"
    onClick={onClick}
    aria-label="Next slide"
  >
    <HiChevronRight size={20} />
  </button>
)

const Carousel: React.FC<CarouselProps> = ({
  children,
  dots = false,
  infinite = true,
  speed = 750,
  slidesToShow = 1,
  slidesToScroll = 1,
}) => {
  return (
    <div className="relative flex justify-center">
      <Slider
        className="max-w-[90%]"
        dots={dots}
        infinite={infinite}
        speed={speed}
        slidesToShow={slidesToShow}
        slidesToScroll={slidesToScroll}
        prevArrow={<PrevArrow />}
        nextArrow={<NextArrow />}
      >
        {children}
      </Slider>
    </div>
  )
}

export default Carousel
