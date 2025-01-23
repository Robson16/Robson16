/* eslint-disable prettier/prettier */
import dynamic from 'next/dynamic'
import React from 'react'
import type { IconBaseProps } from 'react-icons'
import { FaRegCircle } from 'react-icons/fa'
import { FiCircle } from 'react-icons/fi'
import { GoCircle } from 'react-icons/go'
import { IoEllipseOutline } from 'react-icons/io5'
import { PiCircle } from 'react-icons/pi'

interface DynamicIconProps extends IconBaseProps {
  iconFamily: string
  icon: string
}

type IconsMapping = {
  [key: string]: React.ComponentType<IconBaseProps>
}

const DynamicIcon: React.FC<DynamicIconProps> = ({
  iconFamily,
  icon,
  size,
  className,
  color,
}) => {
  const Icons: IconsMapping = {
    fa: dynamic(
      () =>
        import('react-icons/fa')
          .then((mod) => mod[icon])
          .then((e) => (e === undefined ? FaRegCircle : e)) as Promise<
            React.ComponentType<IconBaseProps>
          >,
    ),
    fi: dynamic(
      () =>
        import('react-icons/fi')
          .then((mod) => mod[icon])
          .then((e) => (e === undefined ? FiCircle : e)) as Promise<
            React.ComponentType<IconBaseProps>
          >,
    ),
    go: dynamic(
      () =>
        import('react-icons/go')
          .then((mod) => mod[icon])
          .then((e) => (e === undefined ? GoCircle : e)) as Promise<
            React.ComponentType<IconBaseProps>
          >,
    ),
    io5: dynamic(
      () =>
        import('react-icons/io5')
          .then((mod) => mod[icon])
          .then((e) => (e === undefined ? IoEllipseOutline : e)) as Promise<
            React.ComponentType<IconBaseProps>
          >,
    ),
    pi: dynamic(
      () =>
        import('react-icons/pi')
          .then((mod) => mod[icon])
          .then((e) => (e === undefined ? PiCircle : e)) as Promise<
            React.ComponentType<IconBaseProps>
          >,
    ),
  }

  const Icon = iconFamily && icon ? Icons[iconFamily] : null

  return <>{Icon && <Icon size={size} color={color} className={className} />}</>
}

export default DynamicIcon
