export default function SocialLink({
  href,
  Icon,
}: {
  href: string
  Icon: React.ElementType
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-gray-300 hover:text-teal-600"
    >
      <Icon size={24} />
    </a>
  )
}
