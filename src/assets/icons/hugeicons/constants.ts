import { StyleProp, ViewStyle } from 'react-native'

export const variants = [
  'stroke-rounded' as const,
  'solid-rounded' as const,
]

export type Variant = (typeof variants)[number]

export type HugeIconProps = {
  variant?: Variant
  size?: number
  color?: string
  strokeWidth?: number
  className?: string
  style?: StyleProp<ViewStyle>
}

export const defaultStrokeWidth = 1.5
export const defaultColor = 'currentColor'
export const defaultVariant = 'stroke-rounded'
export const defaultSize = 24
