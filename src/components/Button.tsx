import { Medium, SemiBold } from '@utils/fonts'
import { TouchableOpacity, TouchableOpacityProps } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

type ButtonProps = {
  title?: string
  disabled?: boolean
} & TouchableOpacityProps

export default function Button({ title, disabled = false, ...props }: ButtonProps) {
  return (
    <TouchableOpacity activeOpacity={0.7} className='overflow-hidden rounded-[13]' disabled={disabled} {...props}>
      <LinearGradient
        colors={disabled ? ['#d1d5db', '#9ca3af'] : ['#3b82f6', '#2563eb']}
        className='items-center justify-center px-6 py-[16]'
        end={{ x: 1, y: 1 }}
        start={{ x: 0, y: 0 }}
      >
        <SemiBold className={`text-sm ${disabled ? 'text-gray-400' : 'text-white'}`}>{title}</SemiBold>
      </LinearGradient>
    </TouchableOpacity>
  )
}
