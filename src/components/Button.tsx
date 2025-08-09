import { Medium } from '@utils/fonts'
import { TouchableOpacity, TouchableOpacityProps } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

type ButtonProps = {
  title?: string
} & TouchableOpacityProps

export default function Button({ title, ...props }: ButtonProps) {
  return (
    <TouchableOpacity activeOpacity={0.7} className='overflow-hidden rounded-[13]' {...props}>
      <LinearGradient
        colors={['#3b82f6', '#2563eb']}
        className='items-center justify-center px-6 py-[16]'
        end={{ x: 1, y: 1 }}
        start={{ x: 0, y: 0 }}
      >
        <Medium className='text-sm text-white'>{title}</Medium>
      </LinearGradient>
    </TouchableOpacity>
  )
}
