import Image from 'next/image'

export default function FeaturedProject({
  imageSrc,
  category,
  heading,
  subheading,
  description,
  href,
}: {
  imageSrc: string
  category: string
  heading: string
  subheading?: string
  description: string
  href: string
}) {
  return (
    <div className="flex columns-2 flex-col gap-8 lg:flex-row">
      <div className="flex flex-1 flex-col items-center">
        <Image
          src={imageSrc}
          priority={true}
          alt={heading}
          width={800}
          height={600}
        />
      </div>
      <div className="flex flex-1 flex-col items-center lg:items-start">
        <span className="bold text-1xl mb-2 uppercase text-teal-600">
          {category}
        </span>
        <h4 className="bold mb-2 text-3xl uppercase">{heading}</h4>
        <h5 className="mb-4 uppercase">{subheading}</h5>
        <p className="mb-8 text-center lg:text-left">{description}</p>
        <a
          className="flex items-center gap-2 rounded-full bg-teal-600 px-8 py-3 font-bold text-white transition-all hover:bg-teal-700"
          href={href}
        >
          Ver detalhes
        </a>
      </div>
    </div>
  )
}
