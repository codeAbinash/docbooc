import { HugeIconProps } from '@hugeicons/constants'
import Colors from '@utils/colors'
import { Medium, SemiBold } from '@utils/fonts'
import { useColorScheme } from 'nativewind'
import React from 'react'
import { TouchableOpacity, TouchableOpacityProps } from 'react-native'

type ChipProps = {
  label: string
  icon: React.ComponentType<HugeIconProps>
  isActive?: boolean
  onPress?: () => void
  variant?: 'default' | 'deepAccent' | 'transparentAccent'
} & TouchableOpacityProps

const Chip = ({ label, icon: IconComponent, isActive = false, onPress, variant = 'default' }: ChipProps) => {
  const { colorScheme } = useColorScheme()
  const dark = colorScheme === 'dark'

  const getBackgroundStyle = () => {
    switch (variant) {
      case 'deepAccent':
        return 'bg-accent'
      case 'transparentAccent':
        return 'bg-accent/10'
      default:
        return isActive ? 'bg-accent/15' : 'bg-white'
    }
  }

  const getIconColor = () => {
    switch (variant) {
      case 'deepAccent':
        return Colors.text.dark
      case 'transparentAccent':
        return Colors.accent
      default:
        return isActive ? Colors.accent : dark ? Colors.text.dark + 'aa' : Colors.text.DEFAULT + 'aa'
    }
  }

  const getTextColor = () => {
    switch (variant) {
      case 'deepAccent':
        return Colors.text.dark
      case 'transparentAccent':
        return Colors.accent
      default:
        return isActive ? Colors.accent : dark ? Colors.text.dark + 'aa' : Colors.text.DEFAULT + 'aa'
    }
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      className={`flex-row p-1 ${getBackgroundStyle()} items-center gap-2 rounded-xl px-5 py-3.5 pr-6`}
      activeOpacity={0.7}
    >
      <IconComponent color={getIconColor()} size={20} strokeWidth={2} />
      {isActive || variant === 'deepAccent' || variant === 'transparentAccent' ? (
        <SemiBold style={{ color: getTextColor() }}>{label}</SemiBold>
      ) : (
        <Medium style={{ color: getTextColor() }}>{label}</Medium>
      )}
    </TouchableOpacity>
  )
}

export default Chip
