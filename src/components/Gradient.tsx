import { ViewProps } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

export default function Gradient({ children, ...props }: ViewProps) {
  return (
    <LinearGradient colors={['#3b82f6', '#2563eb']} end={{ x: 1, y: 1 }} start={{ x: 0, y: 0 }} {...props}>
      {children}
    </LinearGradient>
  )
}
