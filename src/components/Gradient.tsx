import { gradientColors } from '@utils/colors'
import { ViewProps } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

type GradientProps = Omit<LinearGradient['props'], 'colors'> & {
  colors?: string[]
}

export default function Gradient({ children, colors, start, end, ...props }: GradientProps) {
  return (
    <LinearGradient
      colors={colors || gradientColors}
      end={end || { x: 1, y: 1 }}
      start={start || { x: 0, y: 0 }}
      {...props}
    >
      {children}
    </LinearGradient>
  )
}
