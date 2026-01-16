import { Medium, Regular, SemiBold } from '@utils/fonts'
import { TouchableOpacity, TouchableOpacityProps } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

type ButtonProps = {
  title?: string
  disabled?: boolean
} & TouchableOpacityProps

const GRADIENT_ACTIVE = ['#3b82f6', '#2563eb']
const GRADIENT_DISABLED = ['#d1d5db', '#9ca3af']
const GRADIENT_END = { x: 1, y: 1 }
const GRADIENT_START = { x: 0, y: 0 }

export default function Button({ title, disabled = false, ...props }: ButtonProps) {
  return (
    <TouchableOpacity activeOpacity={0.7} className='overflow-hidden rounded-3xl' disabled={disabled} {...props}>
      <LinearGradient
        colors={disabled ? GRADIENT_DISABLED : GRADIENT_ACTIVE}
        className='items-center justify-center py-4'
        end={GRADIENT_END}
        start={GRADIENT_START}
      >
        <Regular className={`text-base ${disabled ? 'text-gray-400' : 'text-white'}`}>{title}</Regular>
      </LinearGradient>
    </TouchableOpacity>
  )
}
