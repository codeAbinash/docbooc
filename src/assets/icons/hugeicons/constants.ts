import { StyleProp, ViewStyle } from 'react-native'

export type HugeIconProps = {
  size?: number
  color?: string
  strokeWidth?: number
  className?: string
  style?: StyleProp<ViewStyle>
}

export const defaultStrokeWidth = 1.5
export const defaultColor = 'currentColor'
export const defaultSize = 24
