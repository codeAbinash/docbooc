import { SemiBold } from '@utils/fonts'
import { memo } from 'react'
import { TouchableOpacity, TouchableOpacityProps } from 'react-native'

type ProfilePictureProps = {
  name: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
} & TouchableOpacityProps

const BG_COLORS = [
  'bg-red-500/30',
  'bg-blue-500/30',
  'bg-green-500/30',
  'bg-yellow-500/30',
  'bg-purple-500/30',
  'bg-pink-500/30',
  'bg-indigo-500/30',
  'bg-teal-500/30',
  'bg-orange-500/30',
  'bg-cyan-500/30',
  'bg-emerald-500/30',
  'bg-rose-500/30',
]

const TEXT_COLORS = [
  'text-red-500',
  'text-blue-500',
  'text-green-500',
  'text-yellow-500',
  'text-purple-500',
  'text-pink-500',
  'text-indigo-500',
  'text-teal-500',
  'text-orange-500',
  'text-cyan-500',
  'text-emerald-500',
  'text-rose-500',
]

const SIZES = {
  sm: { size: 'size-8', text: 'text-[11px]' },
  md: { size: 'size-10', text: 'text-[13px]' },
  lg: { size: 'size-12', text: 'text-[15px]' },
  xl: { size: 'size-16', text: 'text-[19px]' },
}

function getHash(str: string) {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
    hash = hash & hash
  }
  return hash
}

const getBgColor = (hash: number) => {
  return BG_COLORS[Math.abs(hash) % BG_COLORS.length]!
}

const getTextColor = (hash: number) => {
  return TEXT_COLORS[Math.abs(hash) % TEXT_COLORS.length]!
}

const getInitials = (name: string) => {
  const words = name.trim().split(' ').filter(Boolean)
  return words.length === 1 ? words[0]![0] : `${words[0]![0]}${words[words.length - 1]![0]}`
}

function ProfilePicture({ name, size = 'md', ...props }: ProfilePictureProps) {
  const hash = getHash(name)
  const { size: sizeClass, text: textClass } = SIZES[size]

  return (
    <TouchableOpacity
      className={`${sizeClass} items-center justify-center rounded-full ${getBgColor(hash)}`}
      {...props}
    >
      <SemiBold className={`${textClass} text-center uppercase ${getTextColor(hash)}`}>{getInitials(name)}</SemiBold>
    </TouchableOpacity>
  )
}

export default memo(ProfilePicture)
